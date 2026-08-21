import { PrismaService } from '../prisma/prisma.service';
export declare class PermisosService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    esAdminGlobal(usuarioId: number): Promise<boolean>;
    tieneRolParaCompania(usuarioId: number, codigosRol: string[], companiaId: number): Promise<boolean>;
    exigirRolParaCompania(usuarioId: number, codigosRol: string[], companiaId: number): Promise<void>;
    estaAsignadoAEtapa(usuarioId: number, procesoId: number, etapa: string): Promise<boolean>;
    exigirAsignacionAEtapa(usuarioId: number, procesoId: number, etapa: string): Promise<void>;
}
