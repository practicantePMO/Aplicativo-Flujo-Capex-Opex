export interface EvaluacionFinanciera {
  tir?: number;
  vpn?: number;
  payback?: number;
}

export interface Meta {
  compromiso: string;
  fecha_inicio: string;
  indicador: string;
}

export interface Valor {
  categoria: 'ACTIVO' | 'GASTO' | 'TOTAL';
  usd: number;
  cop: number;
}

export interface FlujoCaja {
  id?: number;
  tipo: 'CAPEX' | 'GCAPEX' | 'OPEX';
  moneda: 'USD' | 'COP';
  anio: number;
  mes: number; // 1 = Enero, 12 = Diciembre
  monto: number;
}
export interface CrearSolicitudInversionDto {
  proyecto_id: string;
  incluye_tradicional?: boolean;
  incluye_nueva?: boolean;
  subprograma_id?: number;
  categoria_id?: number;
  entregable_planeado?: string;
  tiene_evaluacion_financiera: boolean;
  trm?: number;
  justificacion_sin_evaluacion?: string;
  evaluacion_financiera?: EvaluacionFinanciera;
  metas?: Meta[];
  flujos_caja?: FlujoCaja[];
  partes_interesadas_ids?: number[];
  link_acta_aprobacion?: string;
  link_plan_proyecto?: string;
  link_presentacion_puertas_3?: string;
}

export interface Subprograma { id: number; nombre: string; requiere_evaluacion_obligatoria: boolean; }
export interface Programa { id: number; nombre: string; subprogramas: Subprograma[]; }
export interface Grupo { id: number; nombre: string; programas: Programa[]; }
export interface Categoria { id: number; nombre: string; requiere_evaluacion_obligatoria: boolean; }

export interface UsuarioActivo { id: number; nombre: string; email: string; area?: string; }

export interface HistoricoAprobacion {
  id: number;
  etapa_origen: string;
  etapa_destino: string;
  accion: string;
  razon_rechazo?: string | null;
  fecha_registro: string;
  usuarios?: { id: number; nombre: string } | null;
}

export interface AsignacionProceso {
  id: number;
  etapa: string;
  estado_asignacion: string;
  usuarios?: { id: number; nombre: string; email: string } | null;
}

export interface SolicitudInversionDetalle {
  id: number;
  proceso_id: number;
  estado_actual: string;
  proyectos: {
    id: string;
    nombre: string;
    compania_id?: number;
    companias?: {
      id: number;
      nombre: string;
    };
    usuarios?: {
      id: number;
      nombre: string;
      email: string;
    };
  };
  solicitudes_inversion?: {
    id: number;
    entregable_planeado?: string | null;
    tiene_evaluacion_financiera: boolean;
    trm?: number;
    justificacion_sin_evaluacion?: string | null;
    link_acta_aprobacion?: string | null;
    link_plan_proyecto?: string | null;
    link_presentacion_puertas_3?: string | null;
    usuarios?: {
      id: number;
      nombre: string;
      email: string;
    };
    subprogramas?: {
      id: number;
      nombre: string;
      programa_id: number; // 👈 Prisma lo trae solo (usa "include", no "select")
      programas: {
        id: number;
        nombre: string;
        id_grupo: number; // 👈 Prisma lo trae solo (usa "include", no "select")
        grupos: {
          id: number;
          nombre: string;
        };
      };
    };
    solicitud_evaluacion_financiera?: {
      tir?: number | null;
      vpn?: number | null;
      payback?: number | null;
    } | null;
    solicitud_metas: Meta[];
    solicitud_valores: Valor[];
    solicitud_flujo_caja: FlujoCaja[];
  };
  asignaciones_proceso: Array<{
    id: number;
    etapa: string;
    estado_asignacion: string;
    usuarios?: {
      id: number;
      nombre: string;
      email?: string;
    };
  }>;
  historico_aprobaciones: Array<{
    id: number;
    fecha_registro: string;
    etapa_origen: string;
    etapa_destino: string;
    accion: string;
    razon_rechazo?: string | null;
    usuarios?: {
      id: number;
      nombre: string;
      area?: string | null;
    } | null;
  }>;

}
export interface CrearSolicitudPayload {
  proyecto_id: string;
  incluye_tradicional?: boolean;
  incluye_nueva?: boolean;
  subprograma_id?: number;
  categoria_id?: number;
  entregable_planeado?: string;
  tiene_evaluacion_financiera: boolean;
  trm?: number;
  justificacion_sin_evaluacion?: string;
  evaluacion_financiera?: {
    tir?: number;
    vpn?: number;
    payback?: number;
  };
  metas?: Array<{
    compromiso: string;
    fecha_inicio: string;
    indicador: string;
  }>;
  flujos_caja: Array<{
    anio: number;
    tipo: 'CAPEX' | 'GCAPEX' | 'OPEX';
    moneda: 'USD' | 'COP';
    mes: number;
    monto: number;
  }>;
  partes_interesadas_ids: number[];
  link_acta_aprobacion?: string;
  link_plan_proyecto?: string;
  link_presentacion_puertas_3?: string;
}