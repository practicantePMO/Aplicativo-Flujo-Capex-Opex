import { UsuariosService } from './usuarios.service';
import { AsignarRolDto } from './dto/asignar-rol.dto';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    obtenerPendientes(): Promise<{
        id: number;
        email: string;
        nombre: string;
        area: string | null;
        fecha_creacion: Date | null;
    }[]>;
    asignarRol(dto: AsignarRolDto): Promise<{
        companias: {
            nombre: string;
        } | null;
        roles: {
            nombre: string;
            codigo: string;
        } | null;
        id: number;
    }>;
    obtenerActivos(): Promise<{
        id: number;
        email: string;
        nombre: string;
        area: string | null;
    }[]>;
}
