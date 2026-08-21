import { PrismaService } from '../prisma/prisma.service';
export declare class CatalogosService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    obtenerJerarquiaCompleta(): Promise<{
        programas: {
            subprogramas: {
                id: number;
                nombre: string;
                requiere_evaluacion_obligatoria: boolean | null;
            }[];
            id: number;
            nombre: string;
        }[];
        id: number;
        nombre: string;
    }[]>;
    obtenerGrupos(): Promise<{
        id: number;
        nombre: string;
    }[]>;
    obtenerProgramasPorGrupo(grupoId: number): Promise<{
        id: number;
        nombre: string;
    }[]>;
    obtenerSubprogramasPorPrograma(programaId: number): Promise<{
        id: number;
        nombre: string;
        requiere_evaluacion_obligatoria: boolean | null;
    }[]>;
}
