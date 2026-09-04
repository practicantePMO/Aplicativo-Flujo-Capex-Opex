export interface RolAsignado {
  id: number; // id de la fila usuario_roles_compania (se necesita para poder quitarlo)
  roles: { id: number; codigo: string; nombre: string } | null;
  companias: { id: number; nombre: string } | null;
}

// 🆕 Empresa dentro de una compañía (ej. "Noel" dentro de "Galletas")
export interface EmpresaAsignada {
  id: number;
  nombre: string;
  compania_id: number;
  companias: { id: number; nombre: string } | null;
}

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  area?: string | null;
  empresa?: EmpresaAsignada | null;
  activo: boolean;
  fecha_creacion?: string;
  usuario_roles_compania: RolAsignado[];
}

export interface RolDisponible {
  id: number;
  codigo: string;
  nombre: string;
}

export interface AsignarRolDto {
  usuario_id: number;
  rol_id: number;
  compania_id?: number;
}
