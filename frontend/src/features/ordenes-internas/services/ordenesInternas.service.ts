import axiosClient from '../../../api/axiosClient';
import type { CrearOrdenInternaPayload, GrupoOrdenesInternas, OrdenInternaDetalle } from '../types/ordenInterna.types';

export const obtenerOrdenesInternasPorProyecto = async (proyectoId: string): Promise<GrupoOrdenesInternas | null> => {
  const { data } = await axiosClient.get<GrupoOrdenesInternas | null>(`/ordenes-internas/proyecto/${proyectoId}`);
  return data;
};

export const obtenerOrdenInternaDetalle = async (id: number): Promise<OrdenInternaDetalle> => {
  const { data } = await axiosClient.get<OrdenInternaDetalle>(`/ordenes-internas/${id}`);
  return data;
};

export const crearOrdenInterna = async (dto: CrearOrdenInternaPayload) => {
  const { data } = await axiosClient.post(`/ordenes-internas`, dto);
  return data as { orden_interna_id: number; proceso_id: number; mensaje: string };
};

export const actualizarOrdenInterna = async (id: number, dto: CrearOrdenInternaPayload) => {
  const { data } = await axiosClient.put(`/ordenes-internas/${id}`, dto);
  return data;
};

export const enviarOrdenInterna = async (id: number, controlGestionId: number) => {
  const { data } = await axiosClient.post(`/ordenes-internas/${id}/enviar`, { control_gestion_id: controlGestionId });
  return data;
};

export const aprobarOrdenInterna = async (id: number, grupoTexto: string, observaciones?: string) => {
  const { data } = await axiosClient.post(`/ordenes-internas/${id}/aprobar`, { grupo_texto: grupoTexto, observaciones });
  return data;
};

export const rechazarOrdenInterna = async (id: number, observaciones: string) => {
  const { data } = await axiosClient.post(`/ordenes-internas/${id}/rechazar`, { observaciones });
  return data;
};

export const cerrarOrdenInterna = async (id: number) => {
  const { data } = await axiosClient.post(`/ordenes-internas/${id}/cerrar`);
  return data;
};

export const solicitarCierreGrupoOi = async (proyectoId: string, observaciones?: string) => {
  const { data } = await axiosClient.post(`/ordenes-internas/grupo/${proyectoId}/solicitar-cierre`, { observaciones });
  return data;
};