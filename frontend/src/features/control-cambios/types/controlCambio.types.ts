export interface AnexoControlCambio {
  id?: number;
  tipo: string;
  url: string;
  descripcion?: string;
}

export interface CrearControlCambioPayload {
  proyecto_id: string;
  requiere_orden_interna: boolean;
  descripcion_cambio?: string;
  antecedentes?: string;
  justificacion?: string;
  impacto_alcance?: string;
  impacto_tiempo?: string;
  anexos?: AnexoControlCambio[];
}

export interface UsuarioResumenCc {
  id: number;
  nombre: string;
  email?: string;
}

export interface ControlCambioResumen {
  id: number;
  proyecto_id: string;
  requiere_orden_interna: boolean;
  descripcion_cambio?: string | null;
  fecha_creacion: string;
  procesos: { id: number; estado_actual: string; fecha_creacion: string };
  usuarios?: UsuarioResumenCc | null;
  control_cambio_anexos: AnexoControlCambio[];
}

export interface AsignacionCc {
  id: number;
  etapa: string;
  estado_asignacion: string;
  usuarios?: UsuarioResumenCc | null;
}

export interface HistoricoAprobacionCc {
  id: number;
  etapa_origen: string;
  etapa_destino: string;
  accion: string;
  razon_rechazo?: string | null;
  observaciones?: string | null;
  fecha_registro: string;
  usuarios?: UsuarioResumenCc | null;
}

export interface ControlCambioDetalle {
  id: number;
  proceso_id: number;
  proyecto_id: string;
  responsable_pm_id?: number | null;
  requiere_orden_interna: boolean;
  descripcion_cambio?: string | null;
  antecedentes?: string | null;
  justificacion?: string | null;
  impacto_alcance?: string | null;
  impacto_tiempo?: string | null;
  fecha_creacion: string;
  usuarios?: UsuarioResumenCc | null;
  control_cambio_anexos: AnexoControlCambio[];
  procesos: {
    estado_actual: string;
    historico_aprobaciones: HistoricoAprobacionCc[];
    asignaciones_proceso: AsignacionCc[];
  };
}