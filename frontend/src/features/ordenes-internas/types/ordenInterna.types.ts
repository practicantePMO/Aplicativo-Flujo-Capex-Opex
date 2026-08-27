export interface OiValor {
  id?: number;
  categoria: 'ACTIVO' | 'GASTO';
  usd: number;
  cop: number;
}

export interface CrearOrdenInternaPayload {
  proyecto_id: string;
  numero_oi: string;
  nombre_descriptivo: string;
  tipo_orden: 'ACTIVO' | 'GASTO';
  centro_costos?: string;
  oficina_ventas?: string;
  linea_marca?: string;
  cliente?: string;
  ramo?: string;
  porcentaje_1?: number;
  es_control_cambios?: boolean;
  control_cambio_id?: number;
  activo_fijo_curso?: string;
  tipo_activo?: string;
  porcentaje_2?: number;
  presupuesto: number;
  presupuesto_moneda?: 'USD' | 'COP';
  activo_real_productivo?: string;
  valores?: OiValor[];
}

export interface UsuarioResumen {
  id: number;
  nombre: string;
  email?: string;
}

export interface OrdenInternaResumen {
  id: number;
  grupo_id: number;
  proceso_id: number;
  numero_oi: string;
  nombre_descriptivo: string;
  tipo_orden: 'ACTIVO' | 'GASTO';
  presupuesto?: number;
  presupuesto_moneda?: 'USD' | 'COP';
  fecha_creacion: string;
  procesos: { estado_actual: string };
  pm?: UsuarioResumen | null;
  control_gestion?: UsuarioResumen | null;
}

export interface HistoricoCierreItem {
  id: number;
  accion: 'SOLICITADO' | 'CERRADO';
  observaciones?: string | null;
  fecha_registro: string;
  usuarios?: UsuarioResumen;
}

export interface GrupoOrdenesInternas {
  id: number;
  proyecto_id: string;
  nombre?: string | null;
  estado: 'ABIERTO' | 'SOLICITADO_CIERRE' | 'CERRADO';
  fecha_creacion: string;
  ordenes_internas: OrdenInternaResumen[];
  grupo_oi_historico_cierre: HistoricoCierreItem[];
}

export interface HistoricoAprobacionOi {
  id: number;
  etapa_origen: string;
  etapa_destino: string;
  accion: string;
  razon_rechazo?: string | null;
  observaciones?: string | null;
  fecha_registro: string;
  usuarios?: UsuarioResumen | null;
}

export interface OrdenInternaDetalle extends OrdenInternaResumen {
  centro_costos?: string | null;
  oficina_ventas?: string | null;
  linea_marca?: string | null;
  cliente?: string | null;
  ramo?: string | null;
  porcentaje_1?: number | null;
  es_control_cambios: boolean;
  control_cambio_id?: number | null;
  controles_cambio?: { id: number; proceso_id: number; descripcion_cambio?: string | null } | null;
  activo_fijo_curso?: string | null;
  tipo_activo?: string | null;
  porcentaje_2?: number | null;
  activo_real_productivo?: string | null;
  grupo_texto?: string | null;
  observaciones_cg?: string | null;
  procesos: {
    estado_actual: string;
    historico_aprobaciones: HistoricoAprobacionOi[];
  };
  grupos_ordenes_internas: GrupoOrdenesInternas;
  oi_valores: OiValor[];
}