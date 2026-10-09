import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CatalogosService {
  constructor(private readonly prisma: PrismaService) {}

  // precargar los desplegables del Frontend
  obtenerJerarquiaCompleta() {
    return this.prisma.grupos.findMany({
      select: {
        id: true,
        nombre: true,
        programas: {
          select: {
            id: true,
            nombre: true,
            subprogramas: {
              select: {
                id: true,
                nombre: true,
                requiere_evaluacion_obligatoria: true,
              },
            },
          },
        },
      },
      orderBy: { id: 'asc' },
    });
  }

  // 2. Obtener solo la lista de Grupos
  obtenerGrupos() {
    return this.prisma.grupos.findMany({
      select: { id: true, nombre: true },
      orderBy: { id: 'asc' },
    });
  }

  // 3. Obtener Programas pertenecientes a un Grupo específico
  obtenerProgramasPorGrupo(grupoId: number) {
    return this.prisma.programas.findMany({
      where: { id_grupo: grupoId },
      select: { id: true, nombre: true },
      orderBy: { id: 'asc' },
    });
  }

  // 4. Obtener Subprogramas pertenecientes a un Programa específico
  obtenerSubprogramasPorPrograma(programaId: number) {
    return this.prisma.subprogramas.findMany({
      where: { programa_id: programaId },
      select: {
        id: true,
        nombre: true,
        requiere_evaluacion_obligatoria: true,
      },
      orderBy: { id: 'asc' },
    });
  }

  obtenerEmpresas() {
    return this.prisma.empresas.findMany({
      select: {
        id: true,
        nombre: true,
        compania_id: true,
        companias: { select: { id: true, nombre: true } },
      },
      orderBy: [{ compania_id: 'asc' }, { nombre: 'asc' }],
    });
  }
}
