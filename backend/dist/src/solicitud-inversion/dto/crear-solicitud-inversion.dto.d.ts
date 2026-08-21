export declare class EvaluacionFinancieraDto {
    tir: number;
    vpn: number;
    payback: number;
}
export declare class SolicitudMetaDto {
    compromiso: string;
    fecha_inicio: string;
    indicador: string;
}
export declare class SolicitudValorDto {
    categoria: string;
    usd: number;
    cop: number;
}
export declare class SolicitudFlujoCajaDto {
    tipo: string;
    anio: number;
    mes: number;
    monto: number;
}
export declare class CrearSolicitudInversionDto {
    proyecto_id: string;
    tipo_clasificacion?: 'TRADICIONAL' | 'NUEVA';
    subprograma_id?: number;
    categoria_id?: number;
    entregable_planeado: string;
    trm: number;
    tiene_evaluacion_financiera: boolean;
    justificacion_sin_evaluacion?: string;
    evaluacion_financiera?: EvaluacionFinancieraDto;
    metas: SolicitudMetaDto[];
    valores?: SolicitudValorDto[];
    flujos_caja: SolicitudFlujoCajaDto[];
    partes_interesadas_ids: number[];
    link_acta_aprobacion: string;
    link_plan_proyecto: string;
    link_presentacion_puertas_3: string;
}
