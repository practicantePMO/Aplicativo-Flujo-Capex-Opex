import axiosClient from '../../../api/axiosClient';
import type { Usuario, RolDisponible, AsignarRolDto } from '../types/usuario.types';

export const obtenerUsuarios = async (): Promise<Usuario[]> => {
  const response = await axiosClient.get<Usuario[]>('/usuarios');
  return response.data;
};

export const obtenerRolesDisponibles = async (): Promise<RolDisponible[]> => {
  const response = await axiosClient.get<RolDisponible[]>('/usuarios/roles-disponibles');
  return response.data;
};

export const asignarRol = async (dto: AsignarRolDto) => {
  const response = await axiosClient.post('/usuarios/asignar-rol', dto);
  return response.data;
};

export const quitarRol = async (asignacionId: number) => {
  const response = await axiosClient.delete(`/usuarios/roles/${asignacionId}`);
  return response.data;
};

export const cambiarActivoUsuario = async (usuarioId: number, activo: boolean) => {
  const response = await axiosClient.patch(`/usuarios/${usuarioId}/activo`, { activo });
  return response.data;
};

export const editarAreaUsuario = async (usuarioId: number, area: string) => {
  const response = await axiosClient.patch(`/usuarios/${usuarioId}/area`, { area });
  return response.data;
};

// 🆕 empresaId en null = "quitar la empresa asignada" (es opcional)
export const editarEmpresaUsuario = async (usuarioId: number, empresaId: number | null) => {
  const response = await axiosClient.patch(`/usuarios/${usuarioId}/empresa`, { empresa_id: empresaId });
  return response.data;
};
