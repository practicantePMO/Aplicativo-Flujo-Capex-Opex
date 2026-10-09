import { Injectable, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PermisosService {
  constructor(private readonly prisma: PrismaService) {}

  // ¿Es administrador global? 
  async esAdminGlobal(usuarioId: number): Promise<boolean> {
    const asignacion = await this.prisma.usuario_roles_compania.findFirst({
      where: { usuario_id: usuarioId, roles: { codigo: 'ADMIN' } },
    });
    return Boolean(asignacion);
  }

  // ¿Tiene el rol para esta compañía específica?
  async tieneRolParaCompania(usuarioId: number, codigosRol: string[], companiaId: number): Promise<boolean> {
    const asignacion = await this.prisma.usuario_roles_compania.findFirst({
      where: {
        usuario_id: usuarioId,
        roles: { codigo: { in: codigosRol } },
        OR: [{ compania_id: null }, { compania_id: companiaId }],
      },
    });
    return Boolean(asignacion);
  }

  async exigirRolParaCompania(usuarioId: number, codigosRol: string[], companiaId: number): Promise<void> {
    const tiene = await this.tieneRolParaCompania(usuarioId, codigosRol, companiaId);
    if (!tiene) {
      throw new ForbiddenException(`No tienes el rol requerido [${codigosRol.join(', ')}] para esta compañía.`);
    }
  }

  // ¿Fue asignado Específicamente a esta etapa?
  async estaAsignadoAEtapa(usuarioId: number, procesoId: number, etapa: string): Promise<boolean> {
    const asignacion = await this.prisma.asignaciones_proceso.findFirst({
      where: {
        usuario_id: usuarioId,
        proceso_id: procesoId,
        etapa,
        estado_asignacion: 'PENDIENTE',
      },
    });
    return Boolean(asignacion);
  }

  async exigirAsignacionAEtapa(usuarioId: number, procesoId: number, etapa: string): Promise<void> {
    const esAdmin = await this.esAdminGlobal(usuarioId);
    if (esAdmin) return;
    const asignado = await this.estaAsignadoAEtapa(usuarioId, procesoId, etapa);
    if (!asignado) {
      throw new ForbiddenException('No fuiste asignado como verificador para esta solicitud.');
    }
  }

  // ¿Tiene este usuario alguno de estos roles, en CUALQUIER compañía?
  // A diferencia de tieneRolParaCompania, este no necesita una compañía de referencia.
  async tieneAlgunRol(usuarioId: number, codigosRol: string[]): Promise<boolean> {
    const asignacion = await this.prisma.usuario_roles_compania.findFirst({
      where: { usuario_id: usuarioId, roles: { codigo: { in: codigosRol } } },
    });
    return Boolean(asignacion);
  }

  // ¿Tiene este rol de forma GLOBAL? A diferencia de
  // tieneAlgunRol, un rol asignado solo para una compañía puntual NO cuenta.
  async tieneRolGlobal(usuarioId: number, codigosRol: string[]): Promise<boolean> {
    const asignacion = await this.prisma.usuario_roles_compania.findFirst({
      where: { usuario_id: usuarioId, compania_id: null, roles: { codigo: { in: codigosRol } } },
    });
    return Boolean(asignacion);
  }

    // Valida que la lista de partes interesadas sea legítima:
  //  - cada usuario existe, está activo y no fue eliminado,
  //  - tiene el rol PARTE_INTERESADA (global o de la compañía del proyecto),
  //  - y NO es el PM responsable (nadie puede verificar su propio proceso).
  // Una lista vacía se acepta aquí; exigir "al menos una" lo hace cada flujo.
  async validarPartesInteresadas(ids: number[] | undefined, companiaId: number | null, responsablePmId: number | null) {
    if (!ids || ids.length === 0) return;

    const idsUnicos = Array.from(new Set(ids));

    if (responsablePmId !== null && idsUnicos.includes(responsablePmId)) {
      throw new BadRequestException('El PM responsable no puede ser parte interesada de su propio proceso.');
    }

    const validos = await this.prisma.usuarios.findMany({
      where: {
        id: { in: idsUnicos },
        activo: true,
        eliminado_el: null,
        usuario_roles_compania: {
          some: {
            roles: { codigo: 'PARTE_INTERESADA' },
            OR: companiaId ? [{ compania_id: null }, { compania_id: companiaId }] : [{ compania_id: null }],
          },
        },
      },
      select: { id: true },
    });

    if (validos.length !== idsUnicos.length) {
      throw new BadRequestException(
        'Una o más partes interesadas seleccionadas no son válidas (no existen, están inactivas o no tienen el rol Parte Interesada para esta compañía).',
      );
    }
  }

  // Antes de enviar a revisión: el proceso debe tener al menos una parte
  // interesada asignada; si no, quedaría atascado en la etapa de verificación.
  async exigirPartesInteresadasAsignadas(procesoId: number) {
    const cantidad = await this.prisma.asignaciones_proceso.count({
      where: { proceso_id: procesoId, etapa: 'VERIFICACION_PARTES_INTERESADAS', estado_asignacion: 'PENDIENTE' },
    });
    if (cantidad === 0) {
      throw new BadRequestException('Debes asignar al menos una parte interesada antes de enviar a revisión.');
    }
  }
}
