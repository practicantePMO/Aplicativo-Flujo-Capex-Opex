// Rol del usuario en una compañía. Con /auth/me y /auth/login-dev llegan
// todos los campos; con /auth/login-sso solo llegan "rol" y "compania".
export interface RolCompania {
  id?: number;
  usuario_id?: number;
  rol_id?: number;
  compania_id?: number | null;
  rol: {
    id?: number;
    codigo?: string;
    nombre?: string;
  } | null;
  compania?: {
    id: number;
    nombre?: string;
  } | null;
}

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  area?: string;
  activo?: boolean;  
  roles?: RolCompania[];
}

export interface AuthResponse {
  access_token: string;
  usuario: Usuario;
}

// Rol tal como lo envía /auth/login-sso (formato plano)
export interface RolCompaniaToken {
  companiaId?: number;
  companiaNombre?: string;
  rolCodigo?: string;
  rolNombre?: string;
}

export interface AuthResponseSso {
  access_token: string;
  usuario: Usuario & { rolesCompania?: RolCompaniaToken[] };
}