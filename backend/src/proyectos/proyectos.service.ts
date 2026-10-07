import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException, ForbiddenException } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PermisosService } from '../permisos/permisos.service';
import { CrearProyectoDto } from './dto/crear-proyecto.dto';
import { FiltrarProyectosDto } from './dto/filtrar-proyectos.dto';
import { AplazarProyectoDto } from './dto/aplazar-proyecto.dto';

const ROLES_QUE_PUEDEN_APLAZAR = ['PMO', 'ADMIN'];
const ESTADOS_VISIBLES_PARA_PARTE_INTERESADA = {
  not: { in: ['BORRADOR', 'PENDIENTE_PMO'] },
};

@Injectable()
export class ProyectosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly permisos: PermisosService,
  ) {}

  // 1. Crear la cabecera del proyecto
  async crearProyecto(usuarioId: number, dto: CrearProyectoDto) {
    const compania = await this.prisma.companias.findUnique({
      where: { id: dto.compania_id },
    });

    if (!compania) {
      throw new NotFoundException('La compañía seleccionada no existe.');
    }

    let propietarioId = usuarioId;
    const esAdminCrear = await this.permisos.esAdminGlobal(usuarioId);

    if (dto.pm_asignado_id) {
      const esPmo = esAdminCrear || (await this.permisos.tieneRolParaCompania(usuarioId, ['PMO'], dto.compania_id));
      if (!esPmo) {
        throw new ForbiddenException('Solo un PMO de esta compañía (o Administrador) puede asignar el proyecto a otro PM.');
      }

      const pmAsignadoTieneRol = await this.permisos.tieneRolParaCompania(
        dto.pm_asignado_id,
        ['PM'],
        dto.compania_id,
      );
      if (!pmAsignadoTieneRol) {
        throw new BadRequestException('El usuario seleccionado no tiene el rol PM (para esta compañía o global).');
      }

      propietarioId = dto.pm_asignado_id;
    } else {
      const puedeCrear = esAdminCrear || (await this.permisos.tieneRolParaCompania(usuarioId, ['PM', 'PMO'], dto.compania_id));
      if (!puedeCrear) {
        throw new ForbiddenException('No tienes el rol PM o PMO para esta compañía.');
      }
    }

    try {
      return await this.prisma.proyectos.create({
        data: {
          nombre: dto.nombre,
          compania_id: dto.compania_id,
          fecha_proyecto: new Date(dto.fecha_proyecto),
          creado_por: propietarioId,
        },
        select: {
          id: true,
          nombre: true,
          fecha_proyecto: true,
          anio_proyecto: true,
          anio_asignado: true,
          consecutivo: true,
          fecha_creacion: true,
          creado_por: true,
          companias: { select: { id: true, nombre: true } },
          usuarios: { select: { id: true, nombre: true, email: true } },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al registrar el proyecto en la base de datos.');
    }
  }

  // 2. Consultar proyectos con reglas de visibilidad por Rol + filtros opcionales
  async listarProyectos(usuarioId: number, filtros: FiltrarProyectosDto = {}) {
    const rolesUsuario = await this.prisma.usuario_roles_compania.findMany({
      where: { usuario_id: usuarioId },
      include: { roles: true },
    });

    const codigosGlobales = rolesUsuario.filter((r) => r.compania_id === null && r.roles).map((r) => r.roles!.codigo);
    const rolesPorCompania = rolesUsuario
      .filter((r) => r.compania_id !== null && r.roles)
      .map((r) => ({ rol: r.roles!.codigo, companiaId: r.compania_id as number }));
    const codigosRoles = [...codigosGlobales, ...rolesPorCompania.map((r) => r.rol)];

    const rolesAccesoTotal = ['PMO', 'DIRECTOR_PMO', 'ADMIN'];
    const tieneAccesoTotal = codigosGlobales.some((rol) => rolesAccesoTotal.includes(rol));

    const selectCampos = {
      id: true,
      nombre: true,
      fecha_proyecto: true,
      anio_proyecto: true,
      anio_asignado: true,
      consecutivo: true,
      fecha_creacion: true,
      creado_por: true,
      companias: { select: { id: true, nombre: true } },
      usuarios: { select: { id: true, nombre: true } },
      procesos: {
        where: { eliminado_el: null },
        select: {
          estado_actual: true,
          tipo_proceso: true,
          actas_cierre: { select: { tipo_cierre: true } },
        },
      },
    };

    const condicionesFiltro: Prisma.proyectosWhereInput = { eliminado_el: null };
    if (filtros.id) condicionesFiltro.id = { contains: filtros.id };
    if (filtros.anio) condicionesFiltro.anio_asignado = filtros.anio;
    if (filtros.companiaId) condicionesFiltro.compania_id = filtros.companiaId;

    let where: Prisma.proyectosWhereInput = condicionesFiltro;

    if (!tieneAccesoTotal) {
      const condicionesOR: Prisma.proyectosWhereInput[] = [];

      if (codigosRoles.includes('PM')) {
        condicionesOR.push({ creado_por: usuarioId });
      }

      if (codigosRoles.includes('PARTE_INTERESADA')) {
        condicionesOR.push({
          procesos: {
            some: {
              eliminado_el: null,
              estado_actual: ESTADOS_VISIBLES_PARA_PARTE_INTERESADA,
              asignaciones_proceso: { some: { usuario_id: usuarioId, etapa: 'VERIFICACION_PARTES_INTERESADAS' } },
            },
          },
        });
      }

      if (codigosRoles.includes('GERENCIA')) {
        condicionesOR.push({
          procesos: {
            some: {
              eliminado_el: null,
              asignaciones_proceso: { some: { usuario_id: usuarioId, etapa: 'GERENCIA' } },
            },
          },
        });
      }

      if (codigosRoles.includes('PRESIDENCIA')) {
        const tienePresidenciaGlobal = codigosGlobales.includes('PRESIDENCIA');
        const companiasPresidencia = rolesPorCompania.filter((r) => r.rol === 'PRESIDENCIA').map((r) => r.companiaId);

        condicionesOR.push({
          ...(tienePresidenciaGlobal ? {} : { compania_id: { in: companiasPresidencia } }),
          procesos: {
            some: {
              eliminado_el: null,
              OR: [
                { estado_actual: 'PRESIDENCIA' },
                { historico_aprobaciones: { some: { etapa_origen: 'PRESIDENCIA' } } },
              ],
            },
          },
        });
      }

      if (codigosRoles.includes('CONTROL_GESTION')) {
        condicionesOR.push({
          OR: [
            { grupos_ordenes_internas: { ordenes_internas: { some: { control_gestion_asignado_id: usuarioId } } } },
            {
              procesos: {
                some: {
                  eliminado_el: null,
                  asignaciones_proceso: { some: { usuario_id: usuarioId, etapa: 'CONTROL_GESTION' } },
                },
              },
            },
          ],
        });
      }

      if (codigosRoles.includes('ACTIVOS_FIJOS')) {
        condicionesOR.push({
          procesos: {
            some: {
              eliminado_el: null,
              asignaciones_proceso: { some: { usuario_id: usuarioId, etapa: 'ACTIVOS_FIJOS' } },
            },
          },
        });
      }

      const companiasPmoDirector = rolesPorCompania
        .filter((r) => r.rol === 'PMO' || r.rol === 'DIRECTOR_PMO')
        .map((r) => r.companiaId);
      if (companiasPmoDirector.length > 0) {
        condicionesOR.push({ compania_id: { in: companiasPmoDirector } });
      }

      if (condicionesOR.length === 0) {
        condicionesOR.push(
          { creado_por: usuarioId },
          {
            procesos: {
              some: {
                eliminado_el: null,
                asignaciones_proceso: { some: { usuario_id: usuarioId } },
              },
            },
          },
        );
      }

      where = { ...condicionesFiltro, OR: condicionesOR };
    }

    const proyectosBD = await this.prisma.proyectos.findMany({
      where,
      select: selectCampos,
      orderBy: { fecha_creacion: 'desc' },
    });

    let proyectos = proyectosBD.map((p) => {
      const procesosProyecto = p.procesos || [];
      const actaCierreCerrada = procesosProyecto.find(
        (proc) => proc.tipo_proceso === 'ACTA_CIERRE' && proc.estado_actual === 'CERRADO',
      );
      const tieneProcesoCancelado = procesosProyecto.some((proc) => proc.estado_actual === 'CANCELADO');

      let estado: 'ACTIVO' | 'APLAZADO' | 'CANCELADO' | 'FINALIZADO' | 'EN_PROCESO_DE_CANCELACION' | 'SUSPENDIDO' = 'ACTIVO';
      if (actaCierreCerrada) {
        estado = actaCierreCerrada.actas_cierre?.tipo_cierre === 'CULMINACION' ? 'FINALIZADO' : 'CANCELADO';
      } else if (tieneProcesoCancelado) {
        estado = 'EN_PROCESO_DE_CANCELACION';
      } else if (p.anio_asignado !== p.anio_proyecto) {
        estado = 'APLAZADO';
      }

      const { procesos, ...resto } = p;
      return { ...resto, estado };
    });

    if (filtros.aplazados === 'true') {
      proyectos = proyectos.filter((p) => p.estado === 'APLAZADO');
    } else if (filtros.aplazados === 'false') {
      proyectos = proyectos.filter((p) => p.estado !== 'APLAZADO');
    }

    return proyectos;
  }

  // 3. Eliminar proyecto (Soft Delete)
  async eliminarProyecto(usuarioId: number, proyectoId: string) {
    const proyecto = await this.prisma.proyectos.findFirst({
      where: { id: proyectoId, eliminado_el: null },
      include: { procesos: { where: { eliminado_el: null } } },
    });

    if (!proyecto) throw new NotFoundException('Proyecto no encontrado o ya eliminado.');

    const tieneProcesoAvanzado = proyecto.procesos.some((p) => p.estado_actual !== 'BORRADOR');
    if (tieneProcesoAvanzado) {
      throw new BadRequestException(
        'No se puede eliminar: este proyecto ya tiene procesos que avanzaron más allá de Borrador. Contacta a un Administrador.',
      );
    }

    return await this.prisma.$transaction(async (tx) => {
      const ahora = new Date();
      await tx.procesos.updateMany({
        where: { proyecto_id: proyectoId, eliminado_el: null },
        data: { eliminado_el: ahora },
      });
      await tx.proyectos.update({
        where: { id: proyectoId },
        data: { eliminado_el: ahora },
      });
      return { proyectoId, mensaje: 'Proyecto eliminado (lógicamente) exitosamente.' };
    });
  }

  // 4. Consultar los procesos activos de un proyecto específico
  async obtenerProcesosPorProyecto(usuarioId: number, proyectoId: string) {
    const proyecto = await this.prisma.proyectos.findFirst({
      where: { id: proyectoId, eliminado_el: null },
    });

    if (!proyecto) {
      throw new NotFoundException('El proyecto no existe o fue eliminado.');
    }

    await this.validarAccesoAProyecto(usuarioId, proyecto);

    return await this.prisma.procesos.findMany({
      where: {
        proyecto_id: proyectoId,
        eliminado_el: null,
      },
      select: {
        id: true,
        proyecto_id: true,
        tipo_proceso: true,
        estado_actual: true,
        fecha_creacion: true,
        actas_cierre: { select: { tipo_cierre: true } },
      },
      orderBy: { fecha_creacion: 'desc' },
    });
  }

  // 5. Aplazar un proyecto a otro año (sin tocar el ID ni anio_proyecto)
  async aplazarProyecto(usuarioId: number, proyectoId: string, dto: AplazarProyectoDto) {
    const proyecto = await this.prisma.proyectos.findFirst({
      where: { id: proyectoId, eliminado_el: null },
      include: {
        procesos: {
          where: { eliminado_el: null, tipo_proceso: 'SOLICITUD_INVERSION' },
          select: { estado_actual: true },
        },
      },
    });
    if (!proyecto) throw new NotFoundException('El proyecto no existe o fue eliminado.');

    let tienePermiso = false;
    if (proyecto.compania_id) {
      tienePermiso = await this.permisos.tieneRolParaCompania(usuarioId, ROLES_QUE_PUEDEN_APLAZAR, proyecto.compania_id);
    }
    if (!tienePermiso) {
      tienePermiso = await this.permisos.esAdminGlobal(usuarioId);
    }
    if (!tienePermiso) {
      throw new ForbiddenException('No tienes permiso para aplazar este proyecto.');
    }

    const tieneSolicitudAprobada = proyecto.procesos.some((p) => p.estado_actual === 'APROBADO_FINAL');
    if (tieneSolicitudAprobada) {
      throw new BadRequestException(
        'Este proyecto ya tiene una Solicitud de Inversión aprobada. El cambio de año requiere generar un Control de Cambios (funcionalidad próxima). Contacta a la PMO.',
      );
    }

    if (dto.anio_nuevo === proyecto.anio_asignado) {
      throw new BadRequestException('El nuevo año debe ser distinto al año actualmente asignado.');
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.proyectos_aplazamientos.create({
        data: {
          proyecto_id: proyectoId,
          anio_anterior: proyecto.anio_asignado,
          anio_nuevo: dto.anio_nuevo,
          motivo: dto.motivo,
          usuario_id: usuarioId,
        },
      });

      await tx.proyectos.update({
        where: { id: proyectoId },
        data: { anio_asignado: dto.anio_nuevo },
      });

      return {
        proyectoId,
        anio_anterior: proyecto.anio_asignado,
        anio_nuevo: dto.anio_nuevo,
        mensaje: 'Proyecto aplazado exitosamente.',
      };
    });
  }

  private async validarAccesoAProyecto(usuarioId: number, proyecto: { id: string; creado_por: number | null; compania_id?: number | null }) {
    const rolesUsuario = await this.prisma.usuario_roles_compania.findMany({
      where: { usuario_id: usuarioId },
      include: { roles: true },
    });
    const codigosGlobales = rolesUsuario.filter((r) => r.compania_id === null && r.roles).map((r) => r.roles!.codigo);
    const rolesPorCompania = rolesUsuario
      .filter((r) => r.compania_id !== null && r.roles)
      .map((r) => ({ rol: r.roles!.codigo, companiaId: r.compania_id as number }));
    const codigosRoles = [...codigosGlobales, ...rolesPorCompania.map((r) => r.rol)];

    const rolesAccesoTotal = ['PMO', 'DIRECTOR_PMO', 'ADMIN'];
    if (codigosGlobales.some((rol) => rolesAccesoTotal.includes(rol))) return;

    if (proyecto.compania_id) {
      const esPmoDirectorDeEstaCompania = rolesPorCompania.some(
        (r) => (r.rol === 'PMO' || r.rol === 'DIRECTOR_PMO') && r.companiaId === proyecto.compania_id,
      );
      if (esPmoDirectorDeEstaCompania) return;
    }

    if (codigosRoles.includes('PM') && proyecto.creado_por === usuarioId) return;

    const estaAsignado = await this.prisma.procesos.findFirst({
      where: {
        proyecto_id: proyecto.id,
        eliminado_el: null,
        OR: [
          {
            estado_actual: ESTADOS_VISIBLES_PARA_PARTE_INTERESADA,
            asignaciones_proceso: { some: { usuario_id: usuarioId, etapa: 'VERIFICACION_PARTES_INTERESADAS' } },
          },
          { asignaciones_proceso: { some: { usuario_id: usuarioId, etapa: 'GERENCIA' } } },
        ],
      },
    });
    if (estaAsignado) return;

    if (codigosRoles.includes('PRESIDENCIA')) {
      const tienePresidenciaGlobal = codigosGlobales.includes('PRESIDENCIA');
      const companiasPresidencia = rolesPorCompania.filter((r) => r.rol === 'PRESIDENCIA').map((r) => r.companiaId);
      const esDeSuCompania = tienePresidenciaGlobal || (proyecto.compania_id != null && companiasPresidencia.includes(proyecto.compania_id));

      if (esDeSuCompania) {
        const llegoAPresidencia = await this.prisma.procesos.findFirst({
          where: {
            proyecto_id: proyecto.id,
            eliminado_el: null,
            OR: [
              { estado_actual: 'PRESIDENCIA' },
              { historico_aprobaciones: { some: { etapa_origen: 'PRESIDENCIA' } } },
            ],
          },
        });
        if (llegoAPresidencia) return;
      }
    }

    if (codigosRoles.includes('CONTROL_GESTION')) {
      const tieneOiAsignada = await this.prisma.ordenes_internas.findFirst({
        where: { grupos_ordenes_internas: { proyecto_id: proyecto.id }, control_gestion_asignado_id: usuarioId },
      });
      if (tieneOiAsignada) return;

      const tieneAsignacionAc = await this.prisma.procesos.findFirst({
        where: {
          proyecto_id: proyecto.id,
          eliminado_el: null,
          asignaciones_proceso: { some: { usuario_id: usuarioId, etapa: 'CONTROL_GESTION' } },
        },
      });
      if (tieneAsignacionAc) return;
    }

    if (codigosRoles.includes('ACTIVOS_FIJOS')) {
      const tieneAsignacionActivosFijos = await this.prisma.procesos.findFirst({
        where: {
          proyecto_id: proyecto.id,
          eliminado_el: null,
          asignaciones_proceso: { some: { usuario_id: usuarioId, etapa: 'ACTIVOS_FIJOS' } },
        },
      });
      if (tieneAsignacionActivosFijos) return;
    }

    throw new ForbiddenException('No tienes acceso a este proyecto.');
  }
}
