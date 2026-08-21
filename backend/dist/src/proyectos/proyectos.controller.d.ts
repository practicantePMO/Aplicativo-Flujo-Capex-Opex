import { ProyectosService } from './proyectos.service';
import { CrearProyectoDto } from './dto/crear-proyecto.dto';
export declare class ProyectosController {
    private readonly proyectosService;
    constructor(proyectosService: ProyectosService);
    crearProyecto(req: any, dto: CrearProyectoDto): Promise<{
        companias: {
            id: number;
            nombre: string;
        } | null;
        usuarios: {
            id: number;
            email: string;
            nombre: string;
        } | null;
        id: string;
        nombre: string;
        fecha_creacion: Date | null;
        fecha_proyecto: Date;
        anio_proyecto: number;
        consecutivo: number;
    }>;
    listarProyectos(req: any): Promise<{
        companias: {
            id: number;
            nombre: string;
        } | null;
        usuarios: {
            id: number;
            nombre: string;
        } | null;
        id: string;
        nombre: string;
        fecha_creacion: Date | null;
        fecha_proyecto: Date;
        anio_proyecto: number;
        consecutivo: number;
    }[]>;
    obtenerProcesos(req: any, id: string): Promise<{
        id: number;
        fecha_creacion: Date | null;
        proyecto_id: string | null;
        tipo_proceso: string;
        estado_actual: string;
    }[]>;
}
