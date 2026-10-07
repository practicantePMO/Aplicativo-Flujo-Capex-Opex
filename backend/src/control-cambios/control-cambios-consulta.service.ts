import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PermisosService } from '../permisos/permisos.service';

@Injectable()
export class ControlCambiosConsultaService {
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
        ['PMO', 'DIRECTOR_PMO', 'GERENCIA', 'PRESIDENCIA'],
        proyecto.compania_id,
      );
      if (tieneRol) return;
    }

    const esAsignado = await this.prisma.asignaciones_proceso.findFirst({
      where: { usuario_id: usuarioId, procesos: { proyecto_id: proyectoId, tipo_proceso: 'CONTROL_CAMBIO' } },
    });
    if (esAsignado) return;

    throw new ForbiddenException('No tienes acceso a los Control de Cambios de este proyecto.');
  }

  async obtenerPorProyecto(usuarioId: number, proyectoId: string) {
    const proyecto = await this.prisma.proyectos.findFirst({ where: { id: proyectoId, eliminado_el: null } });
    if (!proyecto) throw new NotFoundException('Proyecto no encontrado.');

    await this.validarAcceso(usuarioId, proyecto, proyectoId);

    return this.prisma.controles_cambio.findMany({
      where: { proyecto_id: proyectoId, procesos: { eliminado_el: null } },
      include: {
        procesos: { select: { id: true, estado_actual: true, fecha_creacion: true } },
        usuarios: { select: { id: true, nombre: true } },
        control_cambio_anexos: true,
      },
      orderBy: { fecha_creacion: 'desc' },
    });
  }

  async obtenerDetalle(usuarioId: number, procesoId: number) {
    const controlCambio = await this.prisma.controles_cambio.findUnique({
      where: { proceso_id: procesoId },
        include: {
        procesos: {
          include: {
            historico_aprobaciones: { include: { usuarios: { select: { id: true, nombre: true } } }, orderBy: { fecha_registro: 'desc' } },
            asignaciones_proceso: { include: { usuarios: { select: { id: true, nombre: true, email: true } } } },
          },
        },
        usuarios: { select: { id: true, nombre: true, email: true } },
        control_cambio_anexos: true,
        ordenes_internas: {
          select: { id: true, proceso_id: true, numero_oi: true, nombre_descriptivo: true, procesos: { select: { estado_actual: true } } },
        },
      },
    });
    if (!controlCambio) throw new NotFoundException('Control de Cambios no encontrado.');

    const proyecto = await this.prisma.proyectos.findFirst({ where: { id: controlCambio.proyecto_id } });
    if (!proyecto) throw new NotFoundException('Proyecto no encontrado.');

    await this.validarAcceso(usuarioId, proyecto, controlCambio.proyecto_id);

    return { ...controlCambio, proyecto_nombre: proyecto.nombre };
  }

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

    const condicionesEtapas: Prisma.procesosWhereInput[] = [];

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
        tipo_proceso: 'CONTROL_CAMBIO',
        OR: [
          ...condicionesEtapas,
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
        controles_cambio: { select: { id: true, descripcion_cambio: true, usuarios: { select: { id: true, nombre: true } } } },
        historico_aprobaciones: { take: 1, orderBy: { fecha_registro: 'desc' }, select: { fecha_registro: true } },
      },
      orderBy: { id: 'desc' },
    });
  }
}