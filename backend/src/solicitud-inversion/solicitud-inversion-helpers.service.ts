import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PermisosService } from '../permisos/permisos.service';

export const REGLA_POR_ETAPA: Record<string, { tipo: 'ROL_COMPANIA' | 'ASIGNACION_INDIVIDUAL'; roles?: string[] }> = {
  PENDIENTE_PMO: { tipo: 'ROL_COMPANIA', roles: ['PMO', 'ADMIN'] },
  VERIFICACION_PARTES_INTERESADAS: { tipo: 'ASIGNACION_INDIVIDUAL' },
  DIRECCION_PMO: { tipo: 'ROL_COMPANIA', roles: ['DIRECTOR_PMO', 'ADMIN'] },
  GERENCIA: { tipo: 'ASIGNACION_INDIVIDUAL' },
  PRESIDENCIA: { tipo: 'ROL_COMPANIA', roles: ['PRESIDENCIA', 'ADMIN'] },
};
@Injectable()
export class SolicitudInversionHelpersService {
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
        solicitudes_inversion: { include: { usuarios: { select: { id: true, nombre: true, email: true } } } },
      },
    });
    if (!proceso || proceso.eliminado_el || proceso.tipo_proceso !== 'SOLICITUD_INVERSION') {
      throw new NotFoundException('Proceso no encontrado.');
    }
    if (!proceso.proyectos?.compania_id) throw new InternalServerErrorException('El proyecto no tiene compañía.');

    return { proceso, proyecto: proceso.proyectos, companiaId: proceso.proyectos.compania_id };
  }

  async validarPermisoParaEtapa(usuarioId: number, procesoId: number, companiaId: number, etapa: string) {
    const regla = REGLA_POR_ETAPA[etapa];
    if (!regla) throw new BadRequestException(`No hay regla definida para la etapa "${etapa}".`);
    if (regla.tipo === 'ROL_COMPANIA') await this.permisos.exigirRolParaCompania(usuarioId, regla.roles ?? [], companiaId);
    else await this.permisos.exigirAsignacionAEtapa(usuarioId, procesoId, etapa);
  }

  async validarClasificacion(
    prismaClient: Prisma.TransactionClient,
    dto: { incluye_tradicional?: boolean; incluye_nueva?: boolean; subprograma_id?: number; categoria_id?: number; tiene_evaluacion_financiera: boolean },
  ): Promise<{ tipoClasificacion: 'TRADICIONAL' | 'NUEVA' | 'AMBAS' }> {
    if (!dto.incluye_tradicional && !dto.incluye_nueva) {
      throw new BadRequestException('Debes marcar al menos una clasificación: Tradicional, Nueva, o ambas.');
    }

    let requiereObligatoria = false;

    if (dto.incluye_tradicional) {
      if (!dto.subprograma_id) throw new BadRequestException('Debes seleccionar un Subprograma.');
      const subprograma = await prismaClient.subprogramas.findUnique({ where: { id: dto.subprograma_id } });
      if (!subprograma) throw new NotFoundException('El subprograma seleccionado no existe.');
      if (subprograma.requiere_evaluacion_obligatoria) requiereObligatoria = true;
    }

    if (dto.incluye_nueva) {
      if (!dto.categoria_id) throw new BadRequestException('Debes seleccionar una Categoría.');
      const categoria = await prismaClient.categorias.findUnique({ where: { id: dto.categoria_id } });
      if (!categoria) throw new NotFoundException('La categoría seleccionada no existe.');
      if (categoria.requiere_evaluacion_obligatoria) requiereObligatoria = true;
    }

    if (requiereObligatoria && !dto.tiene_evaluacion_financiera) {
      throw new BadRequestException(
        'La clasificación seleccionada (Crecimiento Estratégico o Productividad y Mejora) exige evaluación financiera obligatoria.',
      );
    }

    const tipoClasificacion =
      dto.incluye_tradicional && dto.incluye_nueva ? 'AMBAS' : dto.incluye_tradicional ? 'TRADICIONAL' : 'NUEVA';

    return { tipoClasificacion };
  }

  calcularValoresDesdeFlujo(
    flujos: { tipo: string; moneda: string; monto: number }[],
  ): { categoria: 'ACTIVO' | 'GASTO'; usd: number; cop: number }[] {
    const sumar = (tipos: string[], moneda: string) =>
      flujos
        .filter((f) => tipos.includes(f.tipo) && f.moneda === moneda)
        .reduce((acc, f) => acc + Number(f.monto || 0), 0);

    return [
      {
        categoria: 'ACTIVO',
        usd: sumar(['CAPEX'], 'USD'),
        cop: sumar(['CAPEX'], 'COP'),
      },
      {
        categoria: 'GASTO',
        usd: sumar(['GCAPEX', 'OPEX'], 'USD'),
        cop: sumar(['GCAPEX', 'OPEX'], 'COP'),
      },
    ];
  }
}