import { PrismaService } from '../prisma/prisma.service';
import { CrearProyectoDto } from './dto/crear-proyecto.dto';
export declare class ProyectosService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    crearProyecto(usuarioId: number, dto: CrearProyectoDto): Promise<{
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
    listarProyectos(usuarioId: number): Promise<{
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
    eliminarProyecto(usuarioId: number, proyectoId: string): Promise<{
        proyectoId: string;
        mensaje: string;
    }>;
    obtenerProcesosPorProyecto(usuarioId: number, proyectoId: string): Promise<{
        id: number;
        fecha_creacion: Date | null;
        proyecto_id: string | null;
        tipo_proceso: string;
        estado_actual: string;
    }[]>;
    private validarAccesoAProyecto;
}
