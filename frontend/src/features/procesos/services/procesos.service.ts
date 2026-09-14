import axiosClient from '../../../api/axiosClient';

export const obtenerMisPendientes = async () => {
  const { data } = await axiosClient.get('/pendientes/mis-pendientes');
  return data;
};