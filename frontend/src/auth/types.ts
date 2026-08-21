export interface RolCompania {
  id: number;
  usuario_id: number;
  rol_id: number;
  compania_id: number | null;
  rol: {
    id: number;
    codigo: string;
    nombre: string;
  };
  compania?: {
    id: number;
    nombre: string;
  } | null;
}

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  area?: string;
  activo?: boolean;   // 👈 nueva línea
  roles?: RolCompania[];
}

export interface AuthResponse {
  access_token: string;
  usuario: Usuario;
}