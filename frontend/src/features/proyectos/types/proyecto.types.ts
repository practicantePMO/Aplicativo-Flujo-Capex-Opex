export interface Compania {
  id: number;
  nombre: string;
  activa?: boolean;
}

export interface Proyecto {
  id: string;
  nombre: string;
  compania_id: number;
  companias?: Compania;
  fecha_proyecto: string;
  anio_proyecto?: number;
  anio_asignado?: number;
  consecutivo?: number;
  creado_por?: number;
  fecha_creacion?: string;
  estado?: 'ACTIVO' | 'APLAZADO' | 'CANCELADO' | 'FINALIZADO' | 'EN_PROCESO_DE_CANCELACION' | 'SUSPENDIDO';
}

export interface CrearProyectoDto {
  nombre: string;
  compania_id: number;
  fecha_proyecto: string;
  pm_asignado_id?: number;
}

export interface FiltrosProyectos {
  id?: string;
  anio?: number;
  companiaId?: number;
  aplazados?: boolean;
}

export interface AplazarProyectoDto {
  anio_nuevo: number;
  motivo: string;
}

export interface Proceso {
  id: number;
  proyecto_id: string;
  tipo_proceso: string;
  estado_actual: string;
  fecha_creacion: string;
}