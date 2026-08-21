import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PermisosService } from '../permisos/permisos.service';

// 📖 Todo lo que SOLO LEE datos, nunca cambia el estado de un proceso.
// Separado de SolicitudInversionService a propósito: la máquina de estados
// (crear/aprobar/rechazar/etc.) es la parte más sensible del sistema, y
// mantenerla libre de métodos de consulta la hace más fácil de leer y de
// mantener sin tener que hacer scroll entre lógica de escritura y de lectura.
@Injectable()
export class SolicitudInversionConsultaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly permisos: PermisosService,
  ) {}

  async obtenerPorProcesoId(usuarioId: number, procesoId: number) {
    const proceso = await this.prisma.procesos.findUnique({
      where: { id: procesoId },
      include: {
        proyectos: { select: { id: true, nombre: true, fecha_proyecto: true, compania_id: true, companias: { select: { id: true, nombre: true } } } },
        solicitudes_inversion: {
          include: {
            subprogramas: { include: { programas: { include: { grupos: true } } } },
            categorias: true,
            solicitud_evaluacion_financiera: true,
            solicitud_metas: true,
            solicitud_valores: true,
            solicitud_flujo_caja: true,
            usuarios: { select: { id: true, nombre: true, email: true } },
          },
        },
        asignaciones_proceso: { include: { usuarios: { select: { id: true, nombre: true, email: true } } } },
        historico_aprobaciones: { include: { usuarios: { select: { id: true, nombre: true } } }, orderBy: { fecha_registro: 'desc' } },
      },
    });
    if (!proceso || proceso.eliminado_el) throw new NotFoundException('Proceso no encontrado.');

    // 🛡️ Validamos que el usuario tenga relación real con este proceso o su compañía
    const companiaId = proceso.proyectos?.compania_id;
    const esAdmin = await this.permisos.esAdminGlobal(usuarioId);
    const esResponsable = proceso.solicitudes_inversion?.responsable_pm_id === usuarioId;
    const esAsignado = proceso.asignaciones_proceso.some((a) => a.usuario_id === usuarioId);
    const tieneRolEnCompania = companiaId
      ? await this.permisos.tieneRolParaCompania(
          usuarioId,
          ['PMO', 'DIRECTOR_PMO', 'GERENCIA', 'PRESIDENCIA'],
          companiaId,
        )
      : false;

    if (!esAdmin && !esResponsable && !esAsignado && !tieneRolEnCompania) {
      throw new ForbiddenException('No tienes acceso a este proceso.');
    }

    return proceso;
  }

  async obtenerPartesInteresadasPorCompania(companiaId: number) {
    return await this.prisma.usuarios.findMany({
      where: {
        activo: true,
        eliminado_el: null,
        usuario_roles_compania: {
          some: {
            roles: { codigo: 'PARTE_INTERESADA' },
            OR: [{ compania_id: null }, { compania_id: companiaId }],
          },
        },
      },
      select: {
        id: true,
        nombre: true,
        email: true,
      },
      orderBy: { nombre: 'asc' },
    });
  }

  async obtenerMisPendientes(usuarioId: number) {
    const rolesUsuario = await this.prisma.usuario_roles_compania.findMany({
      where: { usuario_id: usuarioId },
      include: { roles: true },
    });

    const codigosGlobales = rolesUsuario
      .filter((r) => r.compania_id === null && r.roles)
      .map((r) => r.roles!.codigo);

    const rolesPorCompania = rolesUsuario
      .filter((r) => r.compania_id !== null && r.roles)
      .map((r) => ({ rol: r.roles!.codigo, companiaId: r.compania_id as number }));

    const etapasRolesMap: Record<string, string[]> = {
      PENDIENTE_PMO: ['PMO', 'ADMIN'],
      DIRECCION_PMO: ['DIRECTOR_PMO', 'ADMIN'],
      GERENCIA: ['GERENCIA', 'PMO', 'ADMIN'],
      PRESIDENCIA: ['PRESIDENCIA', 'ADMIN'],
    };

    const condicionesEtapas: any[] = [];

    Object.entries(etapasRolesMap).forEach(([etapa, rolesPermitidos]) => {
      const tieneGlobal = codigosGlobales.some((rol) => rolesPermitidos.includes(rol));

      if (tieneGlobal) {
        condicionesEtapas.push({ estado_actual: etapa });
      } else {
        const companiasValidas = rolesPorCompania
          .filter((r) => rolesPermitidos.includes(r.rol))
          .map((r) => r.companiaId);

        if (companiasValidas.length > 0) {
          condicionesEtapas.push({
            estado_actual: etapa,
            proyectos: { compania_id: { in: companiasValidas } },
          });
        }
      }
    });

    return await this.prisma.procesos.findMany({
      where: {
        eliminado_el: null,
        tipo_proceso: 'SOLICITUD_INVERSION',
        OR: [
          ...condicionesEtapas,
          {
            asignaciones_proceso: {
              some: {
                usuario_id: usuarioId,
                estado_asignacion: 'PENDIENTE',
              },
            },
          },
        ],
      },
      include: {
        proyectos: {
          select: {
            id: true,
            nombre: true,
            anio_asignado: true,
            companias: { select: { id: true, nombre: true } },
            usuarios: { select: { id: true, nombre: true } },
          },
        },
        solicitudes_inversion: {
          select: {
            id: true,
            tipo_clasificacion: true,
            entregable_planeado: true,
            categorias: { select: { nombre: true } },
            subprogramas: {
              select: {
                nombre: true,
                programas: { select: { nombre: true } },
              },
            },
          },
        },
        historico_aprobaciones: {
          take: 1,
          orderBy: { fecha_registro: 'desc' },
          select: { fecha_registro: true },
        },
      },
      orderBy: { id: 'desc' },
    });
  }

  // 👈 Método para consultar las categorías del catálogo (Clasificación Nueva)
  async obtenerCategorias() {
    return this.prisma.categorias.findMany({
      where: { eliminado_el: null },
      select: { id: true, nombre: true },
      orderBy: { nombre: 'asc' },
    });
  }
}