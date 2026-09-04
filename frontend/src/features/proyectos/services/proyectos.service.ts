import axiosClient from '../../../api/axiosClient';
import type { Proyecto, CrearProyectoDto, Compania, Empresa, Proceso, FiltrosProyectos, AplazarProyectoDto } from '../types/proyecto.types';

export const obtenerProyectos = async (filtros?: FiltrosProyectos): Promise<Proyecto[]> => {
  const params: Record<string, string> = {};
  if (filtros?.id) params.id = filtros.id;
  if (filtros?.anio) params.anio = String(filtros.anio);
  if (filtros?.companiaId) params.companiaId = String(filtros.companiaId);
  if (filtros?.aplazados !== undefined) params.aplazados = String(filtros.aplazados);

  const response = await axiosClient.get<Proyecto[]>('/proyectos', { params });
  return response.data;
};

export const crearProyecto = async (datos: CrearProyectoDto): Promise<Proyecto> => {
  const response = await axiosClient.post<Proyecto>('/proyectos', datos);
  return response.data;
};

export const obtenerCompanias = async (): Promise<Compania[]> => {
  const response = await axiosClient.get<Compania[]>('/companias');
  return response.data;
};

// 🆕 Todas las empresas de todas las compañías (ej. Noel, Pozuelo...)
export const obtenerEmpresas = async (): Promise<Empresa[]> => {
  const response = await axiosClient.get<Empresa[]>('/catalogos/empresas');
  return response.data;
};

export const obtenerProcesosPorProyecto = async (proyectoId: string): Promise<Proceso[]> => {
  const response = await axiosClient.get<Proceso[]>(`/proyectos/${proyectoId}/procesos`);
  return response.data;
};

export const crearProcesoInicial = async (proyectoId: string, tipoProceso: string): Promise<Proceso> => {
  const response = await axiosClient.post<Proceso>(`/proyectos/${proyectoId}/procesos`, {
    tipo_proceso: tipoProceso,
  });
  return response.data;
};

export const aplazarProyecto = async (proyectoId: string, dto: AplazarProyectoDto) => {
  const response = await axiosClient.patch(`/proyectos/${proyectoId}/aplazar`, dto);
  return response.data;
};
