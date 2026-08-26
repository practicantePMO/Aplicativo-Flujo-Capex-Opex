import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PermisosService {
  constructor(private readonly prisma: PrismaService) {}

  // ¿Es administrador global? (compañía NULL)
  async esAdminGlobal(usuarioId: number): Promise<boolean> {
    const asignacion = await this.prisma.usuario_roles_compania.findFirst({
      where: { usuario_id: usuarioId, roles: { codigo: 'ADMIN' } },
    });
    return !!asignacion;
  }

  // ¿Tiene el rol para esta compañía específica (o de forma global)?
  async tieneRolParaCompania(usuarioId: number, codigosRol: string[], companiaId: number): Promise<boolean> {
    const asignacion = await this.prisma.usuario_roles_compania.findFirst({
      where: {
        usuario_id: usuarioId,
        roles: { codigo: { in: codigosRol } },
        OR: [{ compania_id: null }, { compania_id: companiaId }],
      },
    });
    return !!asignacion;
  }

  async exigirRolParaCompania(usuarioId: number, codigosRol: string[], companiaId: number): Promise<void> {
    const tiene = await this.tieneRolParaCompania(usuarioId, codigosRol, companiaId);
    if (!tiene) {
      throw new ForbiddenException(`No tienes el rol requerido [${codigosRol.join(', ')}] para esta compañía.`);
    }
  }

  // ¿Fue asignado Específicamente a esta etapa (Partes interesadas)?
  async estaAsignadoAEtapa(usuarioId: number, procesoId: number, etapa: string): Promise<boolean> {
    const asignacion = await this.prisma.asignaciones_proceso.findFirst({
      where: {
        usuario_id: usuarioId,
        proceso_id: procesoId,
        etapa,
        estado_asignacion: 'PENDIENTE',
      },
    });
    return !!asignacion;
  }

  async exigirAsignacionAEtapa(usuarioId: number, procesoId: number, etapa: string): Promise<void> {
    const asignado = await this.estaAsignadoAEtapa(usuarioId, procesoId, etapa);
    if (!asignado) {
      throw new ForbiddenException('No fuiste asignado como verificador para esta solicitud.');
    }
  }

    // ¿Tiene este usuario alguno de estos roles, en CUALQUIER compañía (o global)?
  // A diferencia de tieneRolParaCompania, este no necesita una compañía de referencia.
  async tieneAlgunRol(usuarioId: number, codigosRol: string[]): Promise<boolean> {
    const asignacion = await this.prisma.usuario_roles_compania.findFirst({
      where: { usuario_id: usuarioId, roles: { codigo: { in: codigosRol } } },
    });
    return !!asignacion;
  }
}