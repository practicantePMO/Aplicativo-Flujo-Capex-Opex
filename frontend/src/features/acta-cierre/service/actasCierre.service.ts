import axiosClient from '../../../api/axiosClient';
import type { CrearActaCierrePayload, ActaCierreResumen, ActaCierreDetalle } from '../types/actaCierre.types';

export const crearActaCierre = async (dto: CrearActaCierrePayload) => {
  const { data } = await axiosClient.post('/actas-cierre', dto);
  return data as { proceso_id: number; acta_cierre_id: number; mensaje: string };
};

export const actualizarActaCierre = async (procesoId: number, dto: CrearActaCierrePayload) => {
  const { data } = await axiosClient.put(`/actas-cierre/borrador/${procesoId}`, dto);
  return data;
};

export const obtenerActaCierrePorProyecto = async (proyectoId: string): Promise<ActaCierreResumen | null> => {
  const { data } = await axiosClient.get(`/actas-cierre/proyecto/${proyectoId}`);
  return data;
};

export const obtenerActaCierreDetalle = async (procesoId: number): Promise<ActaCierreDetalle> => {
  const { data } = await axiosClient.get(`/actas-cierre/${procesoId}`);
  return data;
};

export const enviarActaCierre = async (procesoId: number) => {
  const { data } = await axiosClient.post(`/actas-cierre/${procesoId}/enviar`);
  return data;
};

// 🆕 activosFijosId: solo se manda cuando se aprueba la etapa CONTROL_GESTION
// (Control Gestión elige a quién de Activos Fijos sigue el proceso).
export const aprobarActaCierre = async (
  procesoId: number,
  comentarios: string,
  enviarAPresidencia?: boolean,
  gerenteId?: number,
  activosFijosId?: number,
) => {
  const { data } = await axiosClient.post(`/actas-cierre/${procesoId}/aprobar`, {
    comentarios,
    ...(enviarAPresidencia !== undefined ? { enviar_a_presidencia: enviarAPresidencia } : {}),
    ...(gerenteId !== undefined ? { gerente_id: gerenteId } : {}),
    ...(activosFijosId !== undefined ? { activos_fijos_id: activosFijosId } : {}),
  });
  return data;
};

export const rechazarActaCierre = async (procesoId: number, razonRechazo: string) => {
  const { data } = await axiosClient.post(`/actas-cierre/${procesoId}/rechazar`, { razon_rechazo: razonRechazo });
  return data;
};

export const actualizarPartesInteresadasAc = async (procesoId: number, ids: number[]) => {
  const { data } = await axiosClient.post(`/actas-cierre/${procesoId}/partes-interesadas`, { partes_interesadas_ids: ids });
  return data;
};
