import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private readonly usuariosService;
    private readonly jwtService;
    private readonly prisma;
    private googleClient;
    private microsoftJwksClient;
    constructor(usuariosService: UsuariosService, jwtService: JwtService, prisma: PrismaService);
    private validarDominioCorporativo;
    verificarTokenGoogle(idToken: string): Promise<{
        email: string;
        nombre: string;
    }>;
    private obtenerLlaveFirmaMicrosoft;
    verificarTokenMicrosoft(idToken: string): Promise<{
        email: string;
        nombre: string;
    }>;
    loginSSO(idToken: string, proveedor?: string): Promise<{
        access_token: string;
        usuario: {
            id: number;
            nombre: string;
            email: string;
            esPendiente: boolean;
            rolesCompania: {
                companiaId: number | undefined;
                companiaNombre: string | undefined;
                rolCodigo: string | undefined;
                rolNombre: string | undefined;
            }[];
        };
    }>;
    loginDev(usuarioId?: number): Promise<{
        access_token: string;
        usuario: {
            id: number;
            nombre: string;
            email: string;
            roles: {
                id: number;
                usuario_id: number | null;
                rol_id: number | null;
                compania_id: number | null;
                rol: {
                    id: number;
                    codigo: string;
                    nombre: string;
                } | null;
                compania: {
                    id: number;
                    nombre: string;
                } | null;
            }[];
        };
    }>;
}
