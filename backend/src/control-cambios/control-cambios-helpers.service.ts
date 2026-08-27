import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PermisosService } from '../permisos/permisos.service';

// 🔁 Mismas reglas de etapa que Solicitud de Inversión — el flujo de
// aprobación de Control de Cambios es un calco intencional del de SI.
export const REGLA_POR_ETAPA: Record<string, { tipo: 'ROL_COMPANIA' | 'ASIGNACION_INDIVIDUAL'; roles?: string[] }> = {
  PENDIENTE_PMO: { tipo: 'ROL_COMPANIA', roles: ['PMO', 'ADMIN'] },
  VERIFICACION_PARTES_INTERESADAS: { tipo: 'ASIGNACION_INDIVIDUAL' },
  DIRECCION_PMO: { tipo: 'ROL_COMPANIA', roles: ['DIRECTOR_PMO', 'ADMIN'] },
  GERENCIA: { tipo: 'ASIGNACION_INDIVIDUAL' },
  PRESIDENCIA: { tipo: 'ROL_COMPANIA', roles: ['PRESIDENCIA', 'ADMIN'] },
};

@Injectable()
export class ControlCambiosHelpersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly permisos: PermisosService,
  ) {}

  async obtenerEmailsPorRol(codigosRol: string[], companiaId: number): Promise<string[]> {
    const usuarios = await this.prisma.usuarios.findMany({
      where: {
        activo: true,
        eliminado_el: null,
        usuario_roles_compania: {
          some: { roles: { codigo: { in: codigosRol } }, OR: [{ compania_id: null }, { compania_id: companiaId }] },
        },
      },
      select: { email: true },
    });
    return Array.from(new Set(usuarios.map((u) => u.email).filter((e): e is string => Boolean(e))));
  }

  async obtenerAsignados(procesoId: number, etapa: string): Promise<{ email: string; nombre: string }[]> {
    const asignaciones = await this.prisma.asignaciones_proceso.findMany({
      where: { proceso_id: procesoId, etapa, estado_asignacion: 'PENDIENTE' },
      include: { usuarios: { select: { email: true, nombre: true } } },
    });
    const vistos = new Set<string>();
    const resultado: { email: string; nombre: string }[] = [];
    for (const a of asignaciones) {
      const email = a.usuarios?.email;
      if (!email || vistos.has(email)) continue;
      vistos.add(email);
      resultado.push({ email, nombre: a.usuarios?.nombre || 'Usuario' });
    }
    return resultado;
  }

  async obtenerProcesoConCompania(procesoId: number) {
    const proceso = await this.prisma.procesos.findUnique({
      where: { id: procesoId },
      include: {
        proyectos: { select: { id: true, nombre: true, consecutivo: true, compania_id: true } },
        controles_cambio: { include: { usuarios: { select: { id: true, nombre: true, email: true } } } },
      },
    });
    if (!proceso || proceso.eliminado_el) throw new NotFoundException('Proceso no encontrado.');
    if (!proceso.proyectos?.compania_id) throw new InternalServerErrorException('El proyecto no tiene compañía.');

    return { proceso, proyecto: proceso.proyectos, companiaId: proceso.proyectos.compania_id };
  }

  async validarPermisoParaEtapa(usuarioId: number, procesoId: number, companiaId: number, etapa: string) {
    const regla = REGLA_POR_ETAPA[etapa];
    if (!regla) throw new BadRequestException(`No hay regla definida para la etapa "${etapa}".`);
    if (regla.tipo === 'ROL_COMPANIA') await this.permisos.exigirRolParaCompania(usuarioId, regla.roles!, companiaId);
    else await this.permisos.exigirAsignacionAEtapa(usuarioId, procesoId, etapa);
  }
}
