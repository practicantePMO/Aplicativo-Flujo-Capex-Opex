import axiosClient from '../../../api/axiosClient';

// 🎯 Este endpoint junta los pendientes de TODOS los procesos (Solicitud de
// Inversión, Órdenes Internas, y los que se agreguen después) — a diferencia
// del viejo /solicitud-inversion/mis-pendientes que solo traía ese proceso.
export const obtenerMisPendientes = async () => {
  const { data } = await axiosClient.get('/pendientes/mis-pendientes');
  return data;
};