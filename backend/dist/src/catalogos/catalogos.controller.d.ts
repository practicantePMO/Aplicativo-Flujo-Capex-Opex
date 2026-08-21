import { CatalogosService } from './catalogos.service';
export declare class CatalogosController {
    private readonly catalogosService;
    constructor(catalogosService: CatalogosService);
    obtenerJerarquia(): Promise<{
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
