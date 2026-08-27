import axiosClient from '../../../api/axiosClient';
import type { CrearControlCambioPayload, ControlCambioResumen, ControlCambioDetalle } from '../types/controlCambio.types';

export const obtenerControlCambiosPorProyecto = async (proyectoId: string): Promise<ControlCambioResumen[]> => {
  const { data } = await axiosClient.get<ControlCambioResumen[]>(`/control-cambios/proyecto/${proyectoId}`);
  return data;
};

export const obtenerControlCambioDetalle = async (procesoId: number): Promise<ControlCambioDetalle> => {
  const { data } = await axiosClient.get<ControlCambioDetalle>(`/control-cambios/${procesoId}`);
  return data;
};

export const crearControlCambio = async (dto: CrearControlCambioPayload) => {
  const { data } = await axiosClient.post(`/control-cambios`, dto);
  return data as { proceso_id: number; control_cambio_id: number; mensaje: string };
};

export const actualizarControlCambio = async (procesoId: number, dto: CrearControlCambioPayload) => {
  const { data } = await axiosClient.put(`/control-cambios/borrador/${procesoId}`, dto);
  return data;
};

export const enviarControlCambio = async (procesoId: number) => {
  const { data } = await axiosClient.post(`/control-cambios/${procesoId}/enviar`);
  return data;
};

export const aprobarControlCambio = async (procesoId: number, comentarios?: string, enviarAPresidencia?: boolean, gerenteId?: number) => {
  const { data } = await axiosClient.post(`/control-cambios/${procesoId}/aprobar`, {
    comentarios,
    ...(enviarAPresidencia !== undefined ? { enviar_a_presidencia: enviarAPresidencia } : {}),
    ...(gerenteId !== undefined ? { gerente_id: gerenteId } : {}),
  });
  return data;
};

export const rechazarControlCambio = async (procesoId: number, razonRechazo: string) => {
  const { data } = await axiosClient.post(`/control-cambios/${procesoId}/rechazar`, { razon_rechazo: razonRechazo });
  return data;
};

export const actualizarPartesInteresadasCc = async (procesoId: number, ids: number[]) => {
  const { data } = await axiosClient.post(`/control-cambios/${procesoId}/partes-interesadas`, { partes_interesadas_ids: ids });
  return data;
};

export const obtenerMisPendientesCc = async () => {
  const { data } = await axiosClient.get('/control-cambios/mis-pendientes');
  return data;
};