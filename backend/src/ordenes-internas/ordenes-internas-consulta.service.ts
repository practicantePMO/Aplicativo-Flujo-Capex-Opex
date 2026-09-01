import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PermisosService } from '../permisos/permisos.service';

@Injectable()
export class OrdenesInternasConsultaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly permisos: PermisosService,
  ) {}

  // 👀 Visibilidad: PM dueño del proyecto, PMO/Director PMO/Admin (ven todo,
  // pero no pueden aprobar), o quien fue elegido como Control Gestión de
  // AL MENOS una Orden Interna de este proyecto.
  private async validarAcceso(usuarioId: number, proyecto: { creado_por: number | null; compania_id: number | null }, proyectoId: string) {
    if (proyecto.creado_por === usuarioId) return;

    const esAdmin = await this.permisos.esAdminGlobal(usuarioId);
    if (esAdmin) return;

    if (proyecto.compania_id) {
      const esPmoODirector = await this.permisos.tieneRolParaCompania(usuarioId, ['PMO', 'DIRECTOR_PMO'], proyecto.compania_id);
      if (esPmoODirector) return;
    }

    const esControlGestionAsignado = await this.prisma.ordenes_internas.findFirst({
      where: { grupos_ordenes_internas: { proyecto_id: proyectoId }, control_gestion_asignado_id: usuarioId },
    });
    if (esControlGestionAsignado) return;

    throw new ForbiddenException('No tienes acceso a las Órdenes Internas de este proyecto.');
  }

  // 📋 Panel completo: el grupo + la lista de OI (resumen para los acordeones)
  async obtenerPorProyecto(usuarioId: number, proyectoId: string) {
    const proyecto = await this.prisma.proyectos.findFirst({ where: { id: proyectoId, eliminado_el: null } });
    if (!proyecto) throw new NotFoundException('Proyecto no encontrado.');

    await this.validarAcceso(usuarioId, proyecto, proyectoId);

    let grupo = await this.prisma.grupos_ordenes_internas.findUnique({
      where: { proyecto_id: proyectoId },
      include: {
        ordenes_internas: {
          where: { procesos: { eliminado_el: null } },
          include: {
            procesos: { select: { estado_actual: true } },
            pm: { select: { id: true, nombre: true } },
            control_gestion: { select: { id: true, nombre: true } },
          },
          orderBy: { fecha_creacion: 'desc' },
        },
        grupo_oi_historico_cierre: {
          include: { usuarios: { select: { id: true, nombre: true } } },
          orderBy: { fecha_registro: 'desc' },
        },
      },
    });

    // 🩹 Red de seguridad para proyectos que ya llegaron a APROBADO_FINAL
    // ANTES de que existiera este módulo: el grupo nunca se creó porque esa
    // creación solo se dispara EN EL MOMENTO exacto de la aprobación. Si la SI
    // ya está aprobada pero el grupo no existe, lo creamos aquí (retroactivo).
    if (!grupo) {
      const siAprobada = await this.prisma.procesos.findFirst({
        where: { proyecto_id: proyectoId, tipo_proceso: 'SOLICITUD_INVERSION', estado_actual: 'APROBADO_FINAL', eliminado_el: null },
      });
      if (siAprobada) {
        grupo = await this.prisma.grupos_ordenes_internas.create({
          data: { proyecto_id: proyectoId },
          include: {
            ordenes_internas: {
              where: { procesos: { eliminado_el: null } },
              include: { procesos: { select: { estado_actual: true } }, pm: { select: { id: true, nombre: true } }, control_gestion: { select: { id: true, nombre: true } } },
              orderBy: { fecha_creacion: 'desc' },
            },
            grupo_oi_historico_cierre: { include: { usuarios: { select: { id: true, nombre: true } } }, orderBy: { fecha_registro: 'desc' } },
          },
        });
      }
    }

    // Si la SI aún no llegó a APROBADO_FINAL, el grupo no existe todavía —
    // no es un error, simplemente el panel de OI no se muestra en el frontend.
    if (!grupo) return null;

    return grupo;
  }

  // 🔍 Detalle completo de UNA Orden Interna + su histórico de aprobaciones
  async obtenerDetalle(usuarioId: number, ordenInternaId: number) {
    const orden = await this.prisma.ordenes_internas.findUnique({
      where: { id: ordenInternaId },
        include: {
        procesos: { include: { historico_aprobaciones: { include: { usuarios: { select: { id: true, nombre: true } } }, orderBy: { fecha_registro: 'desc' } } } },
        grupos_ordenes_internas: true,
        pm: { select: { id: true, nombre: true, email: true } },
        control_gestion: { select: { id: true, nombre: true, email: true } },
        oi_valores: true,
        controles_cambio: { select: { id: true, proceso_id: true, descripcion_cambio: true } },
      },
    });
    if (!orden) throw new NotFoundException('Orden Interna no encontrada.');

    const proyecto = await this.prisma.proyectos.findFirst({ where: { id: orden.grupos_ordenes_internas.proyecto_id } });
    if (!proyecto) throw new NotFoundException('Proyecto no encontrado.');

    await this.validarAcceso(usuarioId, proyecto, orden.grupos_ordenes_internas.proyecto_id);

    return { ...orden, proyecto_nombre: proyecto.nombre };
  }

  // 🔔 Usado por el módulo general "Mis Pendientes" (ver backend/src/pendientes/).
  // Solo trae OI donde el usuario TIENE algo que hacer:
  //  - PM dueño con la orden en BORRADOR (falta enviarla)
  //  - Control Gestión asignado con la orden en PENDIENTE (falta aprobar/rechazar)
  //  - Control Gestión asignado con la orden APROBADA y el grupo en SOLICITADO_CIERRE (falta cerrarla)
  async obtenerMisPendientes(usuarioId: number) {
    return this.prisma.ordenes_internas.findMany({
      where: {
        OR: [
          { responsable_pm_id: usuarioId, procesos: { estado_actual: 'BORRADOR' } },
          { control_gestion_asignado_id: usuarioId, procesos: { estado_actual: 'PENDIENTE' } },
          {
            control_gestion_asignado_id: usuarioId,
            procesos: { estado_actual: 'APROBADA' },
            grupos_ordenes_internas: { estado: 'SOLICITADO_CIERRE' },
          },
        ],
      },
      include: {
        procesos: { select: { id: true, estado_actual: true, tipo_proceso: true, historico_aprobaciones: { take: 1, orderBy: { fecha_registro: 'desc' }, select: { fecha_registro: true } } } },
        grupos_ordenes_internas: { include: { proyectos: { select: { id: true, nombre: true, anio_asignado: true, companias: { select: { id: true, nombre: true } } } } } },
      },
      orderBy: { fecha_creacion: 'desc' },
    });
  }
}