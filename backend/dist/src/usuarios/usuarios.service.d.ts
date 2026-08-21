import { PrismaService } from '../prisma/prisma.service';
import { AsignarRolDto } from './dto/asignar-rol.dto';
export declare class UsuariosService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<{
        usuario_roles_compania: {
            companias: {
                id: number;
                nombre: string;
            } | null;
            roles: {
                id: number;
                nombre: string;
                codigo: string;
            } | null;
        }[];
        id: number;
        email: string;
        nombre: string;
        proveedor_auth: string | null;
        area: string | null;
        activo: boolean | null;
        fecha_creacion: Date | null;
    } | null>;
    findOrCreateSSOUser(data: {
        email: string;
        nombre: string;
        proveedor_auth?: string;
    }): Promise<{
        usuario_roles_compania: {
            companias: {
                id: number;
                nombre: string;
            } | null;
            roles: {
                id: number;
                nombre: string;
                codigo: string;
            } | null;
        }[];
        id: number;
        email: string;
        nombre: string;
        proveedor_auth: string | null;
        area: string | null;
        activo: boolean | null;
        fecha_creacion: Date | null;
    } | null>;
    findPendientes(): Promise<{
        id: number;
        email: string;
        nombre: string;
        area: string | null;
        fecha_creacion: Date | null;
    }[]>;
    asignarRolCompania(dto: AsignarRolDto): Promise<{
        companias: {
            nombre: string;
        } | null;
        roles: {
            nombre: string;
            codigo: string;
        } | null;
        id: number;
    }>;
    findActivos(): Promise<{
        id: number;
        email: string;
        nombre: string;
        area: string | null;
    }[]>;
}
