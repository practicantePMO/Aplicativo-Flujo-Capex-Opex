import axiosClient from '../../../api/axiosClient';
import type { Pendiente } from '../types/pendiente.types';

export const obtenerMisPendientes = async (): Promise<Pendiente[]> => {
  const { data } = await axiosClient.get<Pendiente[]>('/pendientes/mis-pendientes');
  return data;
};