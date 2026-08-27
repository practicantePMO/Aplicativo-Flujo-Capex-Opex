import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PermisosService } from '../permisos/permisos.service';
import { CrearProyectoDto } from './dto/crear-proyecto.dto';
import { FiltrarProyectosDto } from './dto/filtrar-proyectos.dto';
import { AplazarProyectoDto } from './dto/aplazar-proyecto.dto';

const ROLES_QUE_PUEDEN_APLAZAR = ['PMO', 'ADMIN'];

// 👀 Una parte interesada solo debe ver el proyecto desde que el proceso llega
// a "Verificación de Partes Interesadas" en adelante — nunca mientras está en
// BORRADOR ni en PENDIENTE_PMO (todavía no le corresponde actuar).
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

    // 🛡️ Si viene pm_asignado_id, el proyecto queda "de" ese PM (como si él
    // mismo lo hubiera creado) — solo un PMO/ADMIN puede hacer esto.
    let propietarioId = usuarioId;

    if (dto.pm_asignado_id) {
      const esAdmin = await this.permisos.esAdminGlobal(usuarioId);
      const esPmo = esAdmin || (await this.permisos.tieneAlgunRol(usuarioId, ['PMO']));
      if (!esPmo) {
        throw new ForbiddenException('Solo un PMO o Administrador puede asignar el proyecto a otro PM.');
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

    // 🔒 Solo estos 3 roles ven TODOS los proyectos. Todos los demás (incluido
    // GERENCIA y PRESIDENCIA) solo ven los proyectos con los que tuvieron o
    // tienen relación directa (PM: los suyos; Gerencia/Presidencia/Parte
    // Interesada: solo los que necesitaron o necesitan su aprobación).
    const rolesAccesoTotal = ['PMO', 'DIRECTOR_PMO', 'ADMIN'];
    const tieneAccesoTotal = codigosRoles.some((rol) => rolesAccesoTotal.includes(rol));

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
      // 👈 Necesario para calcular el "estado" del proyecto (Cancelado si algún
      // proceso suyo terminó cancelado)
      procesos: {
        where: { eliminado_el: null },
        select: {
          estado_actual: true,
          tipo_proceso: true,
          actas_cierre: { select: { tipo_cierre: true } },
        },
      },
    };

    const condicionesFiltro: any = { eliminado_el: null };
    if (filtros.id) condicionesFiltro.id = { contains: filtros.id };
    if (filtros.anio) condicionesFiltro.anio_asignado = filtros.anio;
    if (filtros.companiaId) condicionesFiltro.compania_id = filtros.companiaId;

    let proyectos: any[];

    if (tieneAccesoTotal) {
      proyectos = await this.prisma.proyectos.findMany({
        where: condicionesFiltro,
        select: selectCampos,
        orderBy: { fecha_creacion: 'desc' },
      });
    } else {
      const condicionesOR: any[] = [];

      // PM: solo los proyectos que él mismo creó (no los de otros PM)
      if (codigosRoles.includes('PM')) {
        condicionesOR.push({ creado_por: usuarioId });
      }

      // Parte interesada: solo los que le asignaron, y solo desde que el
      // proceso llega a "Verificación de Partes Interesadas" en adelante.
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

      // Gerencia: solo los proyectos donde Dirección PMO lo eligió a ÉL como
      // gerente (asignación individual) — sea que ya haya actuado o esté
      // pendiente. No ve los proyectos de otros gerentes de su compañía.
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

      // Presidencia: solo proyectos DE SU COMPAÑÍA cuyo proceso llegó o está
      // en la etapa PRESIDENCIA (no ve toda la compañía, solo lo que le tocó).
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

      // 🆕 Control Gestión (Órdenes Internas): solo proyectos donde le
      // asignaron AL MENOS una Orden Interna a él puntualmente — igual que
      // Gerencia, no ve todo, solo lo suyo.
      if (codigosRoles.includes('CONTROL_GESTION')) {
        condicionesOR.push({
          grupos_ordenes_internas: {
            ordenes_internas: { some: { control_gestion_asignado_id: usuarioId } },
          },
        });
      }

      if (condicionesOR.length === 0) {
        // Sin ningún rol reconocido: por seguridad, solo lo propio o donde
        // tenga una asignación individual directa.
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

      proyectos = await this.prisma.proyectos.findMany({
        where: { ...condicionesFiltro, OR: condicionesOR },
        select: selectCampos,
        orderBy: { fecha_creacion: 'desc' },
      });
    }

    // 🎯 Calculamos el "estado" de cada proyecto (no es una columna guardada,
    // se deriva de sus propios datos):
    //   CANCELADO             -> el proceso "Acta de Cierre" quedó CERRADO (aún no existe este módulo)
    //   EN_PROCESO_DE_CANCELACION -> algún proceso (ej. Solicitud de Inversión) quedó CANCELADO,
    //                             pero el proyecto sigue abierto hasta que se cierre el Acta de Cierre
    //   APLAZADO              -> anio_asignado es distinto al anio_proyecto original
    //   ACTIVO                -> ninguna de las anteriores
    //   SUSPENDIDO            -> todavía no hay ninguna acción que lo dispare (queda reservado)
    proyectos = proyectos.map((p) => {
      const procesosProyecto = p.procesos || [];
      const actaCierreCerrada = procesosProyecto.find(
        (proc: any) => proc.tipo_proceso === 'ACTA_CIERRE' && proc.estado_actual === 'CERRADO',
      );
      const tieneProcesoCancelado = procesosProyecto.some((proc: any) => proc.estado_actual === 'CANCELADO');

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

    // 🔒 Misma regla que en listarProyectos: solo estos 3 roles tienen acceso
    // total. GERENCIA/PRESIDENCIA deben pasar por su condición puntual.
    const rolesAccesoTotal = ['PMO', 'DIRECTOR_PMO', 'ADMIN'];
    if (codigosRoles.some((rol) => rolesAccesoTotal.includes(rol))) return;

    if (codigosRoles.includes('PM') && proyecto.creado_por === usuarioId) return;

    // Parte interesada o Gerencia: asignación individual directa (en cualquiera
    // de las 2 etapas que usan asignación puntual).
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

    // Presidencia: solo si es de su compañía Y el proceso llegó o está en esa etapa.
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

    // 🆕 Control Gestión: puede ver el proyecto si tiene AL MENOS una Orden
    // Interna asignada a él puntualmente (igual que Gerencia con Solicitud
    // de Inversión).
    if (codigosRoles.includes('CONTROL_GESTION')) {
      const tieneOiAsignada = await this.prisma.ordenes_internas.findFirst({
        where: { grupos_ordenes_internas: { proyecto_id: proyecto.id }, control_gestion_asignado_id: usuarioId },
      });
      if (tieneOiAsignada) return;
    }

    throw new ForbiddenException('No tienes acceso a este proyecto.');
  }
}