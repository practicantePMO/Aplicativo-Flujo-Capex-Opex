import { AuthService } from './auth.service';
import { LoginSsoDto } from './dto/login-sso.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    loginSSO(dto: LoginSsoDto): Promise<{
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
    loginDev(body: {
        usuarioId: number;
    }): Promise<{
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
