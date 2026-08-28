export interface UsuarioResumenAc {
  id: number;
  nombre: string;
  email?: string;
}

export type TipoCierre = 'CANCELACION' | 'CULMINACION';

export interface ActaCierreMetaPayload {
  solicitud_meta_id: number;
  resultado_cierre?: string;
}

export interface ActaCierreValorPayload {
  categoria: 'ACTIVO' | 'GASTO';
  real_usd?: number;
  real_cop?: number;
}

export interface ActaCierreFlujoCajaPayload {
  tipo: 'CAPEX' | 'GCAPEX' | 'OPEX';
  moneda: 'USD' | 'COP';
  anio: number;
  mes: number;
  monto_real?: number;
}

export interface ActaCierreEntregablePayload {
  equipo_sistema: string;
  codigo_activo_produccion?: string;
  codigo_activo_montaje?: string;
  unidad_vida_util?: string;
  vida_util?: number;
  observaciones?: string;
  anexo_url?: string;
}

export interface ActaCierreOiValorRealPayload {
  orden_interna_id: number;
  valor_real?: number;
  valor_real_moneda?: 'USD' | 'COP';
}

export interface CrearActaCierrePayload {
  proyecto_id: string;
  tipo_cierre: TipoCierre;
  control_gestion_asignado_id: number;
  presentacion_p5_link?: string;
  entregable_real?: string;
  explicacion_ejecucion?: string;
  otros_entregables?: string;
  metas?: ActaCierreMetaPayload[];
  valores?: ActaCierreValorPayload[];
  flujo_caja?: ActaCierreFlujoCajaPayload[];
  entregables?: ActaCierreEntregablePayload[];
  oi_valores_reales?: ActaCierreOiValorRealPayload[];
}

export interface ActaCierreResumen {
  id: number;
  proceso_id: number;
  proyecto_id: string;
  tipo_cierre: TipoCierre;
  fecha_creacion: string;
  procesos: { id: number; estado_actual: string; fecha_creacion: string };
}

export interface AsignacionAc {
  id: number;
  etapa: string;
  estado_asignacion: string;
  usuarios?: UsuarioResumenAc | null;
}

export interface HistoricoAprobacionAc {
  id: number;
  etapa_origen: string;
  etapa_destino: string;
  accion: string;
  razon_rechazo?: string | null;
  observaciones?: string | null;
  fecha_registro: string;
  usuarios?: UsuarioResumenAc | null;
}

export interface ActaCierreMetaDetalle {
  id: number;
  solicitud_meta_id: number;
  resultado_cierre?: string | null;
  solicitud_metas: { id: number; compromiso: string; fecha_inicio: string; indicador: string };
}

export interface ActaCierreValorDetalle {
  id: number;
  categoria: 'ACTIVO' | 'GASTO';
  real_usd?: number | null;
  real_cop?: number | null;
}

export interface ActaCierreFlujoCajaDetalle {
  id: number;
  tipo: 'CAPEX' | 'GCAPEX' | 'OPEX';
  moneda: 'USD' | 'COP';
  anio: number;
  mes: number;
  monto_real?: number | null;
}

export interface ActaCierreEntregableDetalle {
  id: number;
  equipo_sistema: string;
  codigo_activo_produccion?: string | null;
  codigo_activo_montaje?: string | null;
  unidad_vida_util?: string | null;
  vida_util?: number | null;
  observaciones?: string | null;
  anexo_url?: string | null;
}

export interface ActaCierreOiValorRealDetalle {
  id: number;
  orden_interna_id: number;
  valor_real?: number | null;
  valor_real_moneda?: string | null;
  ordenes_internas: {
    id: number; numero_oi: string; nombre_descriptivo: string; tipo_orden: string;
    presupuesto?: number | null; presupuesto_moneda?: string | null;
  };
}

export interface ComparacionActaCierre {
  entregable_inicial: string | null;
  valores_si: { categoria: string; usd?: number | null; cop?: number | null }[];
  valores_cc: { categoria: string; usd?: number | null; cop?: number | null }[];
  flujo_caja_planeado: { tipo: string; moneda: string; anio: number; mes: number; monto?: number | null }[];
  todas_las_ordenes_internas: {
    id: number; numero_oi: string; nombre_descriptivo: string; tipo_orden: string;
    presupuesto?: number | null; presupuesto_moneda?: string | null;
  }[];
}

export interface ActaCierreDetalle {
  id: number;
  proceso_id: number;
  proyecto_id: string;
  tipo_cierre: TipoCierre;
  responsable_pm_id?: number | null;
  control_gestion_asignado_id?: number | null;
  presentacion_p5_link?: string | null;
  entregable_real?: string | null;
  explicacion_ejecucion?: string | null;
  otros_entregables?: string | null;
  fecha_creacion: string;
  pm?: UsuarioResumenAc | null;
  control_gestion?: UsuarioResumenAc | null;
  acta_cierre_metas: ActaCierreMetaDetalle[];
  acta_cierre_valores: ActaCierreValorDetalle[];
  acta_cierre_flujo_caja: ActaCierreFlujoCajaDetalle[];
  acta_cierre_entregables: ActaCierreEntregableDetalle[];
  acta_cierre_oi_valores_reales: ActaCierreOiValorRealDetalle[];
  comparacion: ComparacionActaCierre;
  procesos: {
    estado_actual: string;
    historico_aprobaciones: HistoricoAprobacionAc[];
    asignaciones_proceso: AsignacionAc[];
  };
  proyecto_nombre?: string;
}