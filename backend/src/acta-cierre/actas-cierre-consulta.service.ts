import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PermisosService } from '../permisos/permisos.service';

@Injectable()
export class ActasCierreConsultaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly permisos: PermisosService,
  ) {}

  private async validarAcceso(usuarioId: number, proyecto: { creado_por: number | null; compania_id: number | null }, proyectoId: string) {
    if (proyecto.creado_por === usuarioId) return;

    const esAdmin = await this.permisos.esAdminGlobal(usuarioId);
    if (esAdmin) return;

    if (proyecto.compania_id) {
      const tieneRol = await this.permisos.tieneRolParaCompania(
        usuarioId,
        ['PMO', 'DIRECTOR_PMO', 'GERENCIA', 'PRESIDENCIA', 'CONTROL_GESTION'],
        proyecto.compania_id,
      );
      if (tieneRol) return;
    }

    const esAsignado = await this.prisma.asignaciones_proceso.findFirst({
      where: { usuario_id: usuarioId, procesos: { proyecto_id: proyectoId, tipo_proceso: 'ACTA_CIERRE' } },
    });
    if (esAsignado) return;

    throw new ForbiddenException('No tienes acceso al Acta de Cierre de este proyecto.');
  }

  // 📋 Existe o no un Acta de Cierre para este proyecto (para que el frontend
  // decida entre mostrar "Crear" o el detalle existente — solo puede haber una).
  async obtenerPorProyecto(usuarioId: number, proyectoId: string) {
    const proyecto = await this.prisma.proyectos.findFirst({ where: { id: proyectoId, eliminado_el: null } });
    if (!proyecto) throw new NotFoundException('Proyecto no encontrado.');

    await this.validarAcceso(usuarioId, proyecto, proyectoId);

    return this.prisma.actas_cierre.findUnique({
      where: { proyecto_id: proyectoId },
      include: { procesos: { select: { id: true, estado_actual: true, fecha_creacion: true } } },
    });
  }

  // 🔍 Detalle completo + datos de comparación de SI y de la última OI de CC.
  async obtenerDetalle(usuarioId: number, procesoId: number) {
    const acta = await this.prisma.actas_cierre.findUnique({
      where: { proceso_id: procesoId },
      include: {
        procesos: {
          include: {
            historico_aprobaciones: { include: { usuarios: { select: { id: true, nombre: true } } }, orderBy: { fecha_registro: 'desc' } },
            asignaciones_proceso: { include: { usuarios: { select: { id: true, nombre: true, email: true } } } },
          },
        },
        pm: { select: { id: true, nombre: true, email: true } },
        control_gestion: { select: { id: true, nombre: true, email: true } },
        acta_cierre_metas: { include: { solicitud_metas: true } },
        acta_cierre_valores: true,
        acta_cierre_flujo_caja: true,
        acta_cierre_entregables: true,
        acta_cierre_oi_valores_reales: {
          include: { ordenes_internas: { select: { id: true, numero_oi: true, nombre_descriptivo: true, tipo_orden: true, presupuesto: true, presupuesto_moneda: true } } },
        },
      },
    });
    if (!acta) throw new NotFoundException('Acta de Cierre no encontrada.');

    const proyecto = await this.prisma.proyectos.findFirst({ where: { id: acta.proyecto_id } });
    if (!proyecto) throw new NotFoundException('Proyecto no encontrado.');

    await this.validarAcceso(usuarioId, proyecto, acta.proyecto_id);

    // --- Comparación: Solicitud de Inversión (planeado/inicial) ---
    const procesoSi = await this.prisma.procesos.findFirst({
      where: { proyecto_id: acta.proyecto_id, tipo_proceso: 'SOLICITUD_INVERSION', estado_actual: 'APROBADO_FINAL', eliminado_el: null },
      include: {
        solicitudes_inversion: {
          include: { solicitud_metas: true, solicitud_valores: true, solicitud_flujo_caja: true },
        },
      },
    });
    const si = procesoSi?.solicitudes_inversion;

    // --- Comparación: última Orden Interna de Control de Cambios aprobada ---
    const ultimaOiCc = await this.prisma.ordenes_internas.findFirst({
      where: {
        grupos_ordenes_internas: { proyecto_id: acta.proyecto_id },
        control_cambio_id: { not: null },
        procesos: { estado_actual: { in: ['APROBADA', 'CERRADA'] } },
      },
      include: { oi_valores: true },
      orderBy: { id: 'desc' },
    });

    // --- Todas las Órdenes Internas del proyecto (para la tabla del Acta) ---
    const todasLasOi = await this.prisma.ordenes_internas.findMany({
      where: { grupos_ordenes_internas: { proyecto_id: acta.proyecto_id } },
      select: { id: true, numero_oi: true, nombre_descriptivo: true, tipo_orden: true, presupuesto: true, presupuesto_moneda: true },
      orderBy: { id: 'asc' },
    });

    return {
      ...acta,
      proyecto_nombre: proyecto.nombre,
      comparacion: {
        entregable_inicial: si?.entregable_planeado ?? null,
        valores_si: si?.solicitud_valores ?? [],
        valores_cc: ultimaOiCc?.oi_valores ?? [],
        flujo_caja_planeado: si?.solicitud_flujo_caja ?? [],
        todas_las_ordenes_internas: todasLasOi,
      },
    };
  }

  // 🔔 Usado por "Mis Pendientes"
  async obtenerMisPendientes(usuarioId: number) {
    const rolesUsuario = await this.prisma.usuario_roles_compania.findMany({
      where: { usuario_id: usuarioId },
      include: { roles: true },
    });

    const codigosGlobales = rolesUsuario.filter((r) => r.compania_id === null && r.roles).map((r) => r.roles!.codigo);
    const rolesPorCompania = rolesUsuario
      .filter((r) => r.compania_id !== null && r.roles)
      .map((r) => ({ rol: r.roles!.codigo, companiaId: r.compania_id as number }));

    const etapasRolesMap: Record<string, string[]> = {
      PENDIENTE_PMO: ['PMO', 'ADMIN'],
      DIRECCION_PMO: ['DIRECTOR_PMO', 'ADMIN'],
      GERENCIA: ['ADMIN'],
      PRESIDENCIA: ['PRESIDENCIA', 'ADMIN'],
    };

    const condicionesEtapas: any[] = [];

    Object.entries(etapasRolesMap).forEach(([etapa, rolesPermitidos]) => {
      const tieneGlobal = codigosGlobales.some((rol) => rolesPermitidos.includes(rol));

      if (tieneGlobal) {
        condicionesEtapas.push({ estado_actual: etapa });
      } else {
        const companiasValidas = rolesPorCompania.filter((r) => rolesPermitidos.includes(r.rol)).map((r) => r.companiaId);
        if (companiasValidas.length > 0) {
          condicionesEtapas.push({ estado_actual: etapa, proyectos: { compania_id: { in: companiasValidas } } });
        }
      }
    });

    return this.prisma.procesos.findMany({
      where: {
        eliminado_el: null,
        tipo_proceso: 'ACTA_CIERRE',
        OR: [
          ...condicionesEtapas,
          {
            estado_actual: 'CONTROL_GESTION',
            asignaciones_proceso: { some: { usuario_id: usuarioId, etapa: 'CONTROL_GESTION', estado_asignacion: 'PENDIENTE' } },
          },
          {
            estado_actual: 'VERIFICACION_PARTES_INTERESADAS',
            asignaciones_proceso: { some: { usuario_id: usuarioId, etapa: 'VERIFICACION_PARTES_INTERESADAS', estado_asignacion: 'PENDIENTE' } },
          },
          {
            estado_actual: 'GERENCIA',
            asignaciones_proceso: { some: { usuario_id: usuarioId, etapa: 'GERENCIA', estado_asignacion: 'PENDIENTE' } },
          },
        ],
      },
      include: {
        proyectos: { select: { id: true, nombre: true, anio_asignado: true, companias: { select: { id: true, nombre: true } } } },
        actas_cierre: { select: { id: true, tipo_cierre: true, pm: { select: { id: true, nombre: true } } } },
        historico_aprobaciones: { take: 1, orderBy: { fecha_registro: 'desc' }, select: { fecha_registro: true } },
      },
      orderBy: { id: 'desc' },
    });
  }
}