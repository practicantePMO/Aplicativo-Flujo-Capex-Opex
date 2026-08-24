import axiosClient from '../../../api/axiosClient';
import type { CrearSolicitudInversionDto, SolicitudInversionDetalle, Grupo, UsuarioActivo, CrearSolicitudPayload, Categoria } from '../types/solicitud.types';

// 👈 OBTENER CATÁLOGO DE CATEGORÍAS (CLASIFICACIÓN NUEVA)
export const obtenerCategorias = async (): Promise<Categoria[]> => {
  const { data } = await axiosClient.get<Categoria[]>('/solicitud-inversion/categorias');
  return data;
};

export const obtenerJerarquia = async (): Promise<Grupo[]> => {
  const { data } = await axiosClient.get<Grupo[]>('/catalogos/jerarquia');
  return data;
};

export const obtenerUsuariosActivos = async (): Promise<UsuarioActivo[]> => {
  const { data } = await axiosClient.get<UsuarioActivo[]>('/usuarios/activos');
  return data;
};

// 🎯 Usuarios con un rol puntual en una compañía — usado para que Dirección
// PMO elija a qué gerente enviar el proceso (hay varias gerencias).
export const obtenerUsuariosPorRol = async (rol: string, companiaId: number): Promise<UsuarioActivo[]> => {
  const { data } = await axiosClient.get<UsuarioActivo[]>('/usuarios/por-rol', { params: { rol, companiaId } });
  return data;
};

export const crearSolicitudInversion = async (dto: CrearSolicitudPayload) => {
  const { data } = await axiosClient.post('/solicitud-inversion', dto);
  return data as { proceso_id: number; estado_actual: string; mensaje: string };
};

export const obtenerSolicitudInversion = async (procesoId: number): Promise<SolicitudInversionDetalle> => {
  const { data } = await axiosClient.get<SolicitudInversionDetalle>(`/solicitud-inversion/${procesoId}`);
  return data;
};

export const enviarARevision = async (procesoId: number) => {
  const { data } = await axiosClient.post(`/solicitud-inversion/${procesoId}/enviar`);
  return data;
};

export const aprobarEtapa = async (procesoId: number, comentarios?: string, enviarAPresidencia?: boolean, gerenteId?: number) => {
  const { data } = await axiosClient.post(`/solicitud-inversion/${procesoId}/aprobar`, {
    comentarios,
    ...(enviarAPresidencia !== undefined ? { enviar_a_presidencia: enviarAPresidencia } : {}),
    ...(gerenteId !== undefined ? { gerente_id: gerenteId } : {}),
  });
  return data;
};

export const rechazarEtapa = async (procesoId: number, razonRechazo: string) => {
  const { data } = await axiosClient.post(`/solicitud-inversion/${procesoId}/rechazar`, { razon_rechazo: razonRechazo });
  return data;
};

export const cancelarDefinitivamente = async (procesoId: number, razonCancelacion: string) => {
  const { data } = await axiosClient.post(`/solicitud-inversion/${procesoId}/cancelar`, { razon_cancelacion: razonCancelacion });
  return data;
};

export const actualizarPartesInteresadas = async (procesoId: number, ids: number[]) => {
  const { data } = await axiosClient.post(`/solicitud-inversion/${procesoId}/partes-interesadas`, {
    partes_interesadas_ids: ids,
  });
  return data;
};

export async function obtenerPartesInteresadas(companiaId: number): Promise<UsuarioActivo[]> {
  const response = await axiosClient.get(`/solicitud-inversion/partes-interesadas/${companiaId}`);
  return response.data;
}

export async function actualizarSolicitudInversion(procesoId: number, data: CrearSolicitudPayload) {
  const response = await axiosClient.put(`/solicitud-inversion/borrador/${procesoId}`, data);
  return response.data;
}

export const obtenerMisPendientes = async () => {
  const { data } = await axiosClient.get('/solicitud-inversion/mis-pendientes');
  return data;
};