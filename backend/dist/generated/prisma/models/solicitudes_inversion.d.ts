import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type solicitudes_inversionModel = runtime.Types.Result.DefaultSelection<Prisma.$solicitudes_inversionPayload>;
export type AggregateSolicitudes_inversion = {
    _count: Solicitudes_inversionCountAggregateOutputType | null;
    _avg: Solicitudes_inversionAvgAggregateOutputType | null;
    _sum: Solicitudes_inversionSumAggregateOutputType | null;
    _min: Solicitudes_inversionMinAggregateOutputType | null;
    _max: Solicitudes_inversionMaxAggregateOutputType | null;
};
export type Solicitudes_inversionAvgAggregateOutputType = {
    id: number | null;
    proceso_id: number | null;
    subprograma_id: number | null;
    responsable_pm_id: number | null;
};
export type Solicitudes_inversionSumAggregateOutputType = {
    id: number | null;
    proceso_id: number | null;
    subprograma_id: number | null;
    responsable_pm_id: number | null;
};
export type Solicitudes_inversionMinAggregateOutputType = {
    id: number | null;
    proceso_id: number | null;
    subprograma_id: number | null;
    entregable_planeado: string | null;
    tiene_evaluacion_financiera: boolean | null;
    justificacion_sin_evaluacion: string | null;
    responsable_pm_id: number | null;
    link_acta_aprobacion: string | null;
    link_plan_proyecto: string | null;
    link_presentacion_puertas_3: string | null;
};
export type Solicitudes_inversionMaxAggregateOutputType = {
    id: number | null;
    proceso_id: number | null;
    subprograma_id: number | null;
    entregable_planeado: string | null;
    tiene_evaluacion_financiera: boolean | null;
    justificacion_sin_evaluacion: string | null;
    responsable_pm_id: number | null;
    link_acta_aprobacion: string | null;
    link_plan_proyecto: string | null;
    link_presentacion_puertas_3: string | null;
};
export type Solicitudes_inversionCountAggregateOutputType = {
    id: number;
    proceso_id: number;
    subprograma_id: number;
    entregable_planeado: number;
    tiene_evaluacion_financiera: number;
    justificacion_sin_evaluacion: number;
    responsable_pm_id: number;
    link_acta_aprobacion: number;
    link_plan_proyecto: number;
    link_presentacion_puertas_3: number;
    _all: number;
};
export type Solicitudes_inversionAvgAggregateInputType = {
    id?: true;
    proceso_id?: true;
    subprograma_id?: true;
    responsable_pm_id?: true;
};
export type Solicitudes_inversionSumAggregateInputType = {
    id?: true;
    proceso_id?: true;
    subprograma_id?: true;
    responsable_pm_id?: true;
};
export type Solicitudes_inversionMinAggregateInputType = {
    id?: true;
    proceso_id?: true;
    subprograma_id?: true;
    entregable_planeado?: true;
    tiene_evaluacion_financiera?: true;
    justificacion_sin_evaluacion?: true;
    responsable_pm_id?: true;
    link_acta_aprobacion?: true;
    link_plan_proyecto?: true;
    link_presentacion_puertas_3?: true;
};
export type Solicitudes_inversionMaxAggregateInputType = {
    id?: true;
    proceso_id?: true;
    subprograma_id?: true;
    entregable_planeado?: true;
    tiene_evaluacion_financiera?: true;
    justificacion_sin_evaluacion?: true;
    responsable_pm_id?: true;
    link_acta_aprobacion?: true;
    link_plan_proyecto?: true;
    link_presentacion_puertas_3?: true;
};
export type Solicitudes_inversionCountAggregateInputType = {
    id?: true;
    proceso_id?: true;
    subprograma_id?: true;
    entregable_planeado?: true;
    tiene_evaluacion_financiera?: true;
    justificacion_sin_evaluacion?: true;
    responsable_pm_id?: true;
    link_acta_aprobacion?: true;
    link_plan_proyecto?: true;
    link_presentacion_puertas_3?: true;
    _all?: true;
};
export type Solicitudes_inversionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.solicitudes_inversionWhereInput;
    orderBy?: Prisma.solicitudes_inversionOrderByWithRelationInput | Prisma.solicitudes_inversionOrderByWithRelationInput[];
    cursor?: Prisma.solicitudes_inversionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Solicitudes_inversionCountAggregateInputType;
    _avg?: Solicitudes_inversionAvgAggregateInputType;
    _sum?: Solicitudes_inversionSumAggregateInputType;
    _min?: Solicitudes_inversionMinAggregateInputType;
    _max?: Solicitudes_inversionMaxAggregateInputType;
};
export type GetSolicitudes_inversionAggregateType<T extends Solicitudes_inversionAggregateArgs> = {
    [P in keyof T & keyof AggregateSolicitudes_inversion]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSolicitudes_inversion[P]> : Prisma.GetScalarType<T[P], AggregateSolicitudes_inversion[P]>;
};
export type solicitudes_inversionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.solicitudes_inversionWhereInput;
    orderBy?: Prisma.solicitudes_inversionOrderByWithAggregationInput | Prisma.solicitudes_inversionOrderByWithAggregationInput[];
    by: Prisma.Solicitudes_inversionScalarFieldEnum[] | Prisma.Solicitudes_inversionScalarFieldEnum;
    having?: Prisma.solicitudes_inversionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Solicitudes_inversionCountAggregateInputType | true;
    _avg?: Solicitudes_inversionAvgAggregateInputType;
    _sum?: Solicitudes_inversionSumAggregateInputType;
    _min?: Solicitudes_inversionMinAggregateInputType;
    _max?: Solicitudes_inversionMaxAggregateInputType;
};
export type Solicitudes_inversionGroupByOutputType = {
    id: number;
    proceso_id: number | null;
    subprograma_id: number | null;
    entregable_planeado: string | null;
    tiene_evaluacion_financiera: boolean;
    justificacion_sin_evaluacion: string | null;
    responsable_pm_id: number | null;
    link_acta_aprobacion: string | null;
    link_plan_proyecto: string | null;
    link_presentacion_puertas_3: string | null;
    _count: Solicitudes_inversionCountAggregateOutputType | null;
    _avg: Solicitudes_inversionAvgAggregateOutputType | null;
    _sum: Solicitudes_inversionSumAggregateOutputType | null;
    _min: Solicitudes_inversionMinAggregateOutputType | null;
    _max: Solicitudes_inversionMaxAggregateOutputType | null;
};
export type GetSolicitudes_inversionGroupByPayload<T extends solicitudes_inversionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Solicitudes_inversionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Solicitudes_inversionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Solicitudes_inversionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Solicitudes_inversionGroupByOutputType[P]>;
}>>;
export type solicitudes_inversionWhereInput = {
    AND?: Prisma.solicitudes_inversionWhereInput | Prisma.solicitudes_inversionWhereInput[];
    OR?: Prisma.solicitudes_inversionWhereInput[];
    NOT?: Prisma.solicitudes_inversionWhereInput | Prisma.solicitudes_inversionWhereInput[];
    id?: Prisma.IntFilter<"solicitudes_inversion"> | number;
    proceso_id?: Prisma.IntNullableFilter<"solicitudes_inversion"> | number | null;
    subprograma_id?: Prisma.IntNullableFilter<"solicitudes_inversion"> | number | null;
    entregable_planeado?: Prisma.StringNullableFilter<"solicitudes_inversion"> | string | null;
    tiene_evaluacion_financiera?: Prisma.BoolFilter<"solicitudes_inversion"> | boolean;
    justificacion_sin_evaluacion?: Prisma.StringNullableFilter<"solicitudes_inversion"> | string | null;
    responsable_pm_id?: Prisma.IntNullableFilter<"solicitudes_inversion"> | number | null;
    link_acta_aprobacion?: Prisma.StringNullableFilter<"solicitudes_inversion"> | string | null;
    link_plan_proyecto?: Prisma.StringNullableFilter<"solicitudes_inversion"> | string | null;
    link_presentacion_puertas_3?: Prisma.StringNullableFilter<"solicitudes_inversion"> | string | null;
    solicitud_evaluacion_financiera?: Prisma.XOR<Prisma.Solicitud_evaluacion_financieraNullableScalarRelationFilter, Prisma.solicitud_evaluacion_financieraWhereInput> | null;
    solicitud_flujo_caja?: Prisma.Solicitud_flujo_cajaListRelationFilter;
    solicitud_metas?: Prisma.Solicitud_metasListRelationFilter;
    solicitud_valores?: Prisma.Solicitud_valoresListRelationFilter;
    procesos?: Prisma.XOR<Prisma.ProcesosNullableScalarRelationFilter, Prisma.procesosWhereInput> | null;
    usuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
    subprogramas?: Prisma.XOR<Prisma.SubprogramasNullableScalarRelationFilter, Prisma.subprogramasWhereInput> | null;
};
export type solicitudes_inversionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    proceso_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    subprograma_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    entregable_planeado?: Prisma.SortOrderInput | Prisma.SortOrder;
    tiene_evaluacion_financiera?: Prisma.SortOrder;
    justificacion_sin_evaluacion?: Prisma.SortOrderInput | Prisma.SortOrder;
    responsable_pm_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    link_acta_aprobacion?: Prisma.SortOrderInput | Prisma.SortOrder;
    link_plan_proyecto?: Prisma.SortOrderInput | Prisma.SortOrder;
    link_presentacion_puertas_3?: Prisma.SortOrderInput | Prisma.SortOrder;
    solicitud_evaluacion_financiera?: Prisma.solicitud_evaluacion_financieraOrderByWithRelationInput;
    solicitud_flujo_caja?: Prisma.solicitud_flujo_cajaOrderByRelationAggregateInput;
    solicitud_metas?: Prisma.solicitud_metasOrderByRelationAggregateInput;
    solicitud_valores?: Prisma.solicitud_valoresOrderByRelationAggregateInput;
    procesos?: Prisma.procesosOrderByWithRelationInput;
    usuarios?: Prisma.usuariosOrderByWithRelationInput;
    subprogramas?: Prisma.subprogramasOrderByWithRelationInput;
};
export type solicitudes_inversionWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    proceso_id?: number;
    AND?: Prisma.solicitudes_inversionWhereInput | Prisma.solicitudes_inversionWhereInput[];
    OR?: Prisma.solicitudes_inversionWhereInput[];
    NOT?: Prisma.solicitudes_inversionWhereInput | Prisma.solicitudes_inversionWhereInput[];
    subprograma_id?: Prisma.IntNullableFilter<"solicitudes_inversion"> | number | null;
    entregable_planeado?: Prisma.StringNullableFilter<"solicitudes_inversion"> | string | null;
    tiene_evaluacion_financiera?: Prisma.BoolFilter<"solicitudes_inversion"> | boolean;
    justificacion_sin_evaluacion?: Prisma.StringNullableFilter<"solicitudes_inversion"> | string | null;
    responsable_pm_id?: Prisma.IntNullableFilter<"solicitudes_inversion"> | number | null;
    link_acta_aprobacion?: Prisma.StringNullableFilter<"solicitudes_inversion"> | string | null;
    link_plan_proyecto?: Prisma.StringNullableFilter<"solicitudes_inversion"> | string | null;
    link_presentacion_puertas_3?: Prisma.StringNullableFilter<"solicitudes_inversion"> | string | null;
    solicitud_evaluacion_financiera?: Prisma.XOR<Prisma.Solicitud_evaluacion_financieraNullableScalarRelationFilter, Prisma.solicitud_evaluacion_financieraWhereInput> | null;
    solicitud_flujo_caja?: Prisma.Solicitud_flujo_cajaListRelationFilter;
    solicitud_metas?: Prisma.Solicitud_metasListRelationFilter;
    solicitud_valores?: Prisma.Solicitud_valoresListRelationFilter;
    procesos?: Prisma.XOR<Prisma.ProcesosNullableScalarRelationFilter, Prisma.procesosWhereInput> | null;
    usuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
    subprogramas?: Prisma.XOR<Prisma.SubprogramasNullableScalarRelationFilter, Prisma.subprogramasWhereInput> | null;
}, "id" | "proceso_id">;
export type solicitudes_inversionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    proceso_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    subprograma_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    entregable_planeado?: Prisma.SortOrderInput | Prisma.SortOrder;
    tiene_evaluacion_financiera?: Prisma.SortOrder;
    justificacion_sin_evaluacion?: Prisma.SortOrderInput | Prisma.SortOrder;
    responsable_pm_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    link_acta_aprobacion?: Prisma.SortOrderInput | Prisma.SortOrder;
    link_plan_proyecto?: Prisma.SortOrderInput | Prisma.SortOrder;
    link_presentacion_puertas_3?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.solicitudes_inversionCountOrderByAggregateInput;
    _avg?: Prisma.solicitudes_inversionAvgOrderByAggregateInput;
    _max?: Prisma.solicitudes_inversionMaxOrderByAggregateInput;
    _min?: Prisma.solicitudes_inversionMinOrderByAggregateInput;
    _sum?: Prisma.solicitudes_inversionSumOrderByAggregateInput;
};
export type solicitudes_inversionScalarWhereWithAggregatesInput = {
    AND?: Prisma.solicitudes_inversionScalarWhereWithAggregatesInput | Prisma.solicitudes_inversionScalarWhereWithAggregatesInput[];
    OR?: Prisma.solicitudes_inversionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.solicitudes_inversionScalarWhereWithAggregatesInput | Prisma.solicitudes_inversionScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"solicitudes_inversion"> | number;
    proceso_id?: Prisma.IntNullableWithAggregatesFilter<"solicitudes_inversion"> | number | null;
    subprograma_id?: Prisma.IntNullableWithAggregatesFilter<"solicitudes_inversion"> | number | null;
    entregable_planeado?: Prisma.StringNullableWithAggregatesFilter<"solicitudes_inversion"> | string | null;
    tiene_evaluacion_financiera?: Prisma.BoolWithAggregatesFilter<"solicitudes_inversion"> | boolean;
    justificacion_sin_evaluacion?: Prisma.StringNullableWithAggregatesFilter<"solicitudes_inversion"> | string | null;
    responsable_pm_id?: Prisma.IntNullableWithAggregatesFilter<"solicitudes_inversion"> | number | null;
    link_acta_aprobacion?: Prisma.StringNullableWithAggregatesFilter<"solicitudes_inversion"> | string | null;
    link_plan_proyecto?: Prisma.StringNullableWithAggregatesFilter<"solicitudes_inversion"> | string | null;
    link_presentacion_puertas_3?: Prisma.StringNullableWithAggregatesFilter<"solicitudes_inversion"> | string | null;
};
export type solicitudes_inversionCreateInput = {
    entregable_planeado?: string | null;
    tiene_evaluacion_financiera?: boolean;
    justificacion_sin_evaluacion?: string | null;
    link_acta_aprobacion?: string | null;
    link_plan_proyecto?: string | null;
    link_presentacion_puertas_3?: string | null;
    solicitud_evaluacion_financiera?: Prisma.solicitud_evaluacion_financieraCreateNestedOneWithoutSolicitudes_inversionInput;
    solicitud_flujo_caja?: Prisma.solicitud_flujo_cajaCreateNestedManyWithoutSolicitudes_inversionInput;
    solicitud_metas?: Prisma.solicitud_metasCreateNestedManyWithoutSolicitudes_inversionInput;
    solicitud_valores?: Prisma.solicitud_valoresCreateNestedManyWithoutSolicitudes_inversionInput;
    procesos?: Prisma.procesosCreateNestedOneWithoutSolicitudes_inversionInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutSolicitudes_inversionInput;
    subprogramas?: Prisma.subprogramasCreateNestedOneWithoutSolicitudes_inversionInput;
};
export type solicitudes_inversionUncheckedCreateInput = {
    id?: number;
    proceso_id?: number | null;
    subprograma_id?: number | null;
    entregable_planeado?: string | null;
    tiene_evaluacion_financiera?: boolean;
    justificacion_sin_evaluacion?: string | null;
    responsable_pm_id?: number | null;
    link_acta_aprobacion?: string | null;
    link_plan_proyecto?: string | null;
    link_presentacion_puertas_3?: string | null;
    solicitud_evaluacion_financiera?: Prisma.solicitud_evaluacion_financieraUncheckedCreateNestedOneWithoutSolicitudes_inversionInput;
    solicitud_flujo_caja?: Prisma.solicitud_flujo_cajaUncheckedCreateNestedManyWithoutSolicitudes_inversionInput;
    solicitud_metas?: Prisma.solicitud_metasUncheckedCreateNestedManyWithoutSolicitudes_inversionInput;
    solicitud_valores?: Prisma.solicitud_valoresUncheckedCreateNestedManyWithoutSolicitudes_inversionInput;
};
export type solicitudes_inversionUpdateInput = {
    entregable_planeado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tiene_evaluacion_financiera?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    justificacion_sin_evaluacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_acta_aprobacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_plan_proyecto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_presentacion_puertas_3?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    solicitud_evaluacion_financiera?: Prisma.solicitud_evaluacion_financieraUpdateOneWithoutSolicitudes_inversionNestedInput;
    solicitud_flujo_caja?: Prisma.solicitud_flujo_cajaUpdateManyWithoutSolicitudes_inversionNestedInput;
    solicitud_metas?: Prisma.solicitud_metasUpdateManyWithoutSolicitudes_inversionNestedInput;
    solicitud_valores?: Prisma.solicitud_valoresUpdateManyWithoutSolicitudes_inversionNestedInput;
    procesos?: Prisma.procesosUpdateOneWithoutSolicitudes_inversionNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutSolicitudes_inversionNestedInput;
    subprogramas?: Prisma.subprogramasUpdateOneWithoutSolicitudes_inversionNestedInput;
};
export type solicitudes_inversionUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    proceso_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    subprograma_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    entregable_planeado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tiene_evaluacion_financiera?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    justificacion_sin_evaluacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsable_pm_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    link_acta_aprobacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_plan_proyecto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_presentacion_puertas_3?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    solicitud_evaluacion_financiera?: Prisma.solicitud_evaluacion_financieraUncheckedUpdateOneWithoutSolicitudes_inversionNestedInput;
    solicitud_flujo_caja?: Prisma.solicitud_flujo_cajaUncheckedUpdateManyWithoutSolicitudes_inversionNestedInput;
    solicitud_metas?: Prisma.solicitud_metasUncheckedUpdateManyWithoutSolicitudes_inversionNestedInput;
    solicitud_valores?: Prisma.solicitud_valoresUncheckedUpdateManyWithoutSolicitudes_inversionNestedInput;
};
export type solicitudes_inversionCreateManyInput = {
    id?: number;
    proceso_id?: number | null;
    subprograma_id?: number | null;
    entregable_planeado?: string | null;
    tiene_evaluacion_financiera?: boolean;
    justificacion_sin_evaluacion?: string | null;
    responsable_pm_id?: number | null;
    link_acta_aprobacion?: string | null;
    link_plan_proyecto?: string | null;
    link_presentacion_puertas_3?: string | null;
};
export type solicitudes_inversionUpdateManyMutationInput = {
    entregable_planeado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tiene_evaluacion_financiera?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    justificacion_sin_evaluacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_acta_aprobacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_plan_proyecto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_presentacion_puertas_3?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type solicitudes_inversionUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    proceso_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    subprograma_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    entregable_planeado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tiene_evaluacion_financiera?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    justificacion_sin_evaluacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsable_pm_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    link_acta_aprobacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_plan_proyecto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_presentacion_puertas_3?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type Solicitudes_inversionNullableScalarRelationFilter = {
    is?: Prisma.solicitudes_inversionWhereInput | null;
    isNot?: Prisma.solicitudes_inversionWhereInput | null;
};
export type solicitudes_inversionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    proceso_id?: Prisma.SortOrder;
    subprograma_id?: Prisma.SortOrder;
    entregable_planeado?: Prisma.SortOrder;
    tiene_evaluacion_financiera?: Prisma.SortOrder;
    justificacion_sin_evaluacion?: Prisma.SortOrder;
    responsable_pm_id?: Prisma.SortOrder;
    link_acta_aprobacion?: Prisma.SortOrder;
    link_plan_proyecto?: Prisma.SortOrder;
    link_presentacion_puertas_3?: Prisma.SortOrder;
};
export type solicitudes_inversionAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    proceso_id?: Prisma.SortOrder;
    subprograma_id?: Prisma.SortOrder;
    responsable_pm_id?: Prisma.SortOrder;
};
export type solicitudes_inversionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    proceso_id?: Prisma.SortOrder;
    subprograma_id?: Prisma.SortOrder;
    entregable_planeado?: Prisma.SortOrder;
    tiene_evaluacion_financiera?: Prisma.SortOrder;
    justificacion_sin_evaluacion?: Prisma.SortOrder;
    responsable_pm_id?: Prisma.SortOrder;
    link_acta_aprobacion?: Prisma.SortOrder;
    link_plan_proyecto?: Prisma.SortOrder;
    link_presentacion_puertas_3?: Prisma.SortOrder;
};
export type solicitudes_inversionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    proceso_id?: Prisma.SortOrder;
    subprograma_id?: Prisma.SortOrder;
    entregable_planeado?: Prisma.SortOrder;
    tiene_evaluacion_financiera?: Prisma.SortOrder;
    justificacion_sin_evaluacion?: Prisma.SortOrder;
    responsable_pm_id?: Prisma.SortOrder;
    link_acta_aprobacion?: Prisma.SortOrder;
    link_plan_proyecto?: Prisma.SortOrder;
    link_presentacion_puertas_3?: Prisma.SortOrder;
};
export type solicitudes_inversionSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    proceso_id?: Prisma.SortOrder;
    subprograma_id?: Prisma.SortOrder;
    responsable_pm_id?: Prisma.SortOrder;
};
export type Solicitudes_inversionListRelationFilter = {
    every?: Prisma.solicitudes_inversionWhereInput;
    some?: Prisma.solicitudes_inversionWhereInput;
    none?: Prisma.solicitudes_inversionWhereInput;
};
export type solicitudes_inversionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type solicitudes_inversionCreateNestedOneWithoutProcesosInput = {
    create?: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutProcesosInput, Prisma.solicitudes_inversionUncheckedCreateWithoutProcesosInput>;
    connectOrCreate?: Prisma.solicitudes_inversionCreateOrConnectWithoutProcesosInput;
    connect?: Prisma.solicitudes_inversionWhereUniqueInput;
};
export type solicitudes_inversionUncheckedCreateNestedOneWithoutProcesosInput = {
    create?: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutProcesosInput, Prisma.solicitudes_inversionUncheckedCreateWithoutProcesosInput>;
    connectOrCreate?: Prisma.solicitudes_inversionCreateOrConnectWithoutProcesosInput;
    connect?: Prisma.solicitudes_inversionWhereUniqueInput;
};
export type solicitudes_inversionUpdateOneWithoutProcesosNestedInput = {
    create?: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutProcesosInput, Prisma.solicitudes_inversionUncheckedCreateWithoutProcesosInput>;
    connectOrCreate?: Prisma.solicitudes_inversionCreateOrConnectWithoutProcesosInput;
    upsert?: Prisma.solicitudes_inversionUpsertWithoutProcesosInput;
    disconnect?: Prisma.solicitudes_inversionWhereInput | boolean;
    delete?: Prisma.solicitudes_inversionWhereInput | boolean;
    connect?: Prisma.solicitudes_inversionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.solicitudes_inversionUpdateToOneWithWhereWithoutProcesosInput, Prisma.solicitudes_inversionUpdateWithoutProcesosInput>, Prisma.solicitudes_inversionUncheckedUpdateWithoutProcesosInput>;
};
export type solicitudes_inversionUncheckedUpdateOneWithoutProcesosNestedInput = {
    create?: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutProcesosInput, Prisma.solicitudes_inversionUncheckedCreateWithoutProcesosInput>;
    connectOrCreate?: Prisma.solicitudes_inversionCreateOrConnectWithoutProcesosInput;
    upsert?: Prisma.solicitudes_inversionUpsertWithoutProcesosInput;
    disconnect?: Prisma.solicitudes_inversionWhereInput | boolean;
    delete?: Prisma.solicitudes_inversionWhereInput | boolean;
    connect?: Prisma.solicitudes_inversionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.solicitudes_inversionUpdateToOneWithWhereWithoutProcesosInput, Prisma.solicitudes_inversionUpdateWithoutProcesosInput>, Prisma.solicitudes_inversionUncheckedUpdateWithoutProcesosInput>;
};
export type solicitudes_inversionCreateNestedOneWithoutSolicitud_evaluacion_financieraInput = {
    create?: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutSolicitud_evaluacion_financieraInput, Prisma.solicitudes_inversionUncheckedCreateWithoutSolicitud_evaluacion_financieraInput>;
    connectOrCreate?: Prisma.solicitudes_inversionCreateOrConnectWithoutSolicitud_evaluacion_financieraInput;
    connect?: Prisma.solicitudes_inversionWhereUniqueInput;
};
export type solicitudes_inversionUpdateOneWithoutSolicitud_evaluacion_financieraNestedInput = {
    create?: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutSolicitud_evaluacion_financieraInput, Prisma.solicitudes_inversionUncheckedCreateWithoutSolicitud_evaluacion_financieraInput>;
    connectOrCreate?: Prisma.solicitudes_inversionCreateOrConnectWithoutSolicitud_evaluacion_financieraInput;
    upsert?: Prisma.solicitudes_inversionUpsertWithoutSolicitud_evaluacion_financieraInput;
    disconnect?: Prisma.solicitudes_inversionWhereInput | boolean;
    delete?: Prisma.solicitudes_inversionWhereInput | boolean;
    connect?: Prisma.solicitudes_inversionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.solicitudes_inversionUpdateToOneWithWhereWithoutSolicitud_evaluacion_financieraInput, Prisma.solicitudes_inversionUpdateWithoutSolicitud_evaluacion_financieraInput>, Prisma.solicitudes_inversionUncheckedUpdateWithoutSolicitud_evaluacion_financieraInput>;
};
export type solicitudes_inversionCreateNestedOneWithoutSolicitud_flujo_cajaInput = {
    create?: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutSolicitud_flujo_cajaInput, Prisma.solicitudes_inversionUncheckedCreateWithoutSolicitud_flujo_cajaInput>;
    connectOrCreate?: Prisma.solicitudes_inversionCreateOrConnectWithoutSolicitud_flujo_cajaInput;
    connect?: Prisma.solicitudes_inversionWhereUniqueInput;
};
export type solicitudes_inversionUpdateOneWithoutSolicitud_flujo_cajaNestedInput = {
    create?: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutSolicitud_flujo_cajaInput, Prisma.solicitudes_inversionUncheckedCreateWithoutSolicitud_flujo_cajaInput>;
    connectOrCreate?: Prisma.solicitudes_inversionCreateOrConnectWithoutSolicitud_flujo_cajaInput;
    upsert?: Prisma.solicitudes_inversionUpsertWithoutSolicitud_flujo_cajaInput;
    disconnect?: Prisma.solicitudes_inversionWhereInput | boolean;
    delete?: Prisma.solicitudes_inversionWhereInput | boolean;
    connect?: Prisma.solicitudes_inversionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.solicitudes_inversionUpdateToOneWithWhereWithoutSolicitud_flujo_cajaInput, Prisma.solicitudes_inversionUpdateWithoutSolicitud_flujo_cajaInput>, Prisma.solicitudes_inversionUncheckedUpdateWithoutSolicitud_flujo_cajaInput>;
};
export type solicitudes_inversionCreateNestedOneWithoutSolicitud_metasInput = {
    create?: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutSolicitud_metasInput, Prisma.solicitudes_inversionUncheckedCreateWithoutSolicitud_metasInput>;
    connectOrCreate?: Prisma.solicitudes_inversionCreateOrConnectWithoutSolicitud_metasInput;
    connect?: Prisma.solicitudes_inversionWhereUniqueInput;
};
export type solicitudes_inversionUpdateOneWithoutSolicitud_metasNestedInput = {
    create?: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutSolicitud_metasInput, Prisma.solicitudes_inversionUncheckedCreateWithoutSolicitud_metasInput>;
    connectOrCreate?: Prisma.solicitudes_inversionCreateOrConnectWithoutSolicitud_metasInput;
    upsert?: Prisma.solicitudes_inversionUpsertWithoutSolicitud_metasInput;
    disconnect?: Prisma.solicitudes_inversionWhereInput | boolean;
    delete?: Prisma.solicitudes_inversionWhereInput | boolean;
    connect?: Prisma.solicitudes_inversionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.solicitudes_inversionUpdateToOneWithWhereWithoutSolicitud_metasInput, Prisma.solicitudes_inversionUpdateWithoutSolicitud_metasInput>, Prisma.solicitudes_inversionUncheckedUpdateWithoutSolicitud_metasInput>;
};
export type solicitudes_inversionCreateNestedOneWithoutSolicitud_valoresInput = {
    create?: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutSolicitud_valoresInput, Prisma.solicitudes_inversionUncheckedCreateWithoutSolicitud_valoresInput>;
    connectOrCreate?: Prisma.solicitudes_inversionCreateOrConnectWithoutSolicitud_valoresInput;
    connect?: Prisma.solicitudes_inversionWhereUniqueInput;
};
export type solicitudes_inversionUpdateOneWithoutSolicitud_valoresNestedInput = {
    create?: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutSolicitud_valoresInput, Prisma.solicitudes_inversionUncheckedCreateWithoutSolicitud_valoresInput>;
    connectOrCreate?: Prisma.solicitudes_inversionCreateOrConnectWithoutSolicitud_valoresInput;
    upsert?: Prisma.solicitudes_inversionUpsertWithoutSolicitud_valoresInput;
    disconnect?: Prisma.solicitudes_inversionWhereInput | boolean;
    delete?: Prisma.solicitudes_inversionWhereInput | boolean;
    connect?: Prisma.solicitudes_inversionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.solicitudes_inversionUpdateToOneWithWhereWithoutSolicitud_valoresInput, Prisma.solicitudes_inversionUpdateWithoutSolicitud_valoresInput>, Prisma.solicitudes_inversionUncheckedUpdateWithoutSolicitud_valoresInput>;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type solicitudes_inversionCreateNestedManyWithoutSubprogramasInput = {
    create?: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutSubprogramasInput, Prisma.solicitudes_inversionUncheckedCreateWithoutSubprogramasInput> | Prisma.solicitudes_inversionCreateWithoutSubprogramasInput[] | Prisma.solicitudes_inversionUncheckedCreateWithoutSubprogramasInput[];
    connectOrCreate?: Prisma.solicitudes_inversionCreateOrConnectWithoutSubprogramasInput | Prisma.solicitudes_inversionCreateOrConnectWithoutSubprogramasInput[];
    createMany?: Prisma.solicitudes_inversionCreateManySubprogramasInputEnvelope;
    connect?: Prisma.solicitudes_inversionWhereUniqueInput | Prisma.solicitudes_inversionWhereUniqueInput[];
};
export type solicitudes_inversionUncheckedCreateNestedManyWithoutSubprogramasInput = {
    create?: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutSubprogramasInput, Prisma.solicitudes_inversionUncheckedCreateWithoutSubprogramasInput> | Prisma.solicitudes_inversionCreateWithoutSubprogramasInput[] | Prisma.solicitudes_inversionUncheckedCreateWithoutSubprogramasInput[];
    connectOrCreate?: Prisma.solicitudes_inversionCreateOrConnectWithoutSubprogramasInput | Prisma.solicitudes_inversionCreateOrConnectWithoutSubprogramasInput[];
    createMany?: Prisma.solicitudes_inversionCreateManySubprogramasInputEnvelope;
    connect?: Prisma.solicitudes_inversionWhereUniqueInput | Prisma.solicitudes_inversionWhereUniqueInput[];
};
export type solicitudes_inversionUpdateManyWithoutSubprogramasNestedInput = {
    create?: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutSubprogramasInput, Prisma.solicitudes_inversionUncheckedCreateWithoutSubprogramasInput> | Prisma.solicitudes_inversionCreateWithoutSubprogramasInput[] | Prisma.solicitudes_inversionUncheckedCreateWithoutSubprogramasInput[];
    connectOrCreate?: Prisma.solicitudes_inversionCreateOrConnectWithoutSubprogramasInput | Prisma.solicitudes_inversionCreateOrConnectWithoutSubprogramasInput[];
    upsert?: Prisma.solicitudes_inversionUpsertWithWhereUniqueWithoutSubprogramasInput | Prisma.solicitudes_inversionUpsertWithWhereUniqueWithoutSubprogramasInput[];
    createMany?: Prisma.solicitudes_inversionCreateManySubprogramasInputEnvelope;
    set?: Prisma.solicitudes_inversionWhereUniqueInput | Prisma.solicitudes_inversionWhereUniqueInput[];
    disconnect?: Prisma.solicitudes_inversionWhereUniqueInput | Prisma.solicitudes_inversionWhereUniqueInput[];
    delete?: Prisma.solicitudes_inversionWhereUniqueInput | Prisma.solicitudes_inversionWhereUniqueInput[];
    connect?: Prisma.solicitudes_inversionWhereUniqueInput | Prisma.solicitudes_inversionWhereUniqueInput[];
    update?: Prisma.solicitudes_inversionUpdateWithWhereUniqueWithoutSubprogramasInput | Prisma.solicitudes_inversionUpdateWithWhereUniqueWithoutSubprogramasInput[];
    updateMany?: Prisma.solicitudes_inversionUpdateManyWithWhereWithoutSubprogramasInput | Prisma.solicitudes_inversionUpdateManyWithWhereWithoutSubprogramasInput[];
    deleteMany?: Prisma.solicitudes_inversionScalarWhereInput | Prisma.solicitudes_inversionScalarWhereInput[];
};
export type solicitudes_inversionUncheckedUpdateManyWithoutSubprogramasNestedInput = {
    create?: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutSubprogramasInput, Prisma.solicitudes_inversionUncheckedCreateWithoutSubprogramasInput> | Prisma.solicitudes_inversionCreateWithoutSubprogramasInput[] | Prisma.solicitudes_inversionUncheckedCreateWithoutSubprogramasInput[];
    connectOrCreate?: Prisma.solicitudes_inversionCreateOrConnectWithoutSubprogramasInput | Prisma.solicitudes_inversionCreateOrConnectWithoutSubprogramasInput[];
    upsert?: Prisma.solicitudes_inversionUpsertWithWhereUniqueWithoutSubprogramasInput | Prisma.solicitudes_inversionUpsertWithWhereUniqueWithoutSubprogramasInput[];
    createMany?: Prisma.solicitudes_inversionCreateManySubprogramasInputEnvelope;
    set?: Prisma.solicitudes_inversionWhereUniqueInput | Prisma.solicitudes_inversionWhereUniqueInput[];
    disconnect?: Prisma.solicitudes_inversionWhereUniqueInput | Prisma.solicitudes_inversionWhereUniqueInput[];
    delete?: Prisma.solicitudes_inversionWhereUniqueInput | Prisma.solicitudes_inversionWhereUniqueInput[];
    connect?: Prisma.solicitudes_inversionWhereUniqueInput | Prisma.solicitudes_inversionWhereUniqueInput[];
    update?: Prisma.solicitudes_inversionUpdateWithWhereUniqueWithoutSubprogramasInput | Prisma.solicitudes_inversionUpdateWithWhereUniqueWithoutSubprogramasInput[];
    updateMany?: Prisma.solicitudes_inversionUpdateManyWithWhereWithoutSubprogramasInput | Prisma.solicitudes_inversionUpdateManyWithWhereWithoutSubprogramasInput[];
    deleteMany?: Prisma.solicitudes_inversionScalarWhereInput | Prisma.solicitudes_inversionScalarWhereInput[];
};
export type solicitudes_inversionCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutUsuariosInput, Prisma.solicitudes_inversionUncheckedCreateWithoutUsuariosInput> | Prisma.solicitudes_inversionCreateWithoutUsuariosInput[] | Prisma.solicitudes_inversionUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.solicitudes_inversionCreateOrConnectWithoutUsuariosInput | Prisma.solicitudes_inversionCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.solicitudes_inversionCreateManyUsuariosInputEnvelope;
    connect?: Prisma.solicitudes_inversionWhereUniqueInput | Prisma.solicitudes_inversionWhereUniqueInput[];
};
export type solicitudes_inversionUncheckedCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutUsuariosInput, Prisma.solicitudes_inversionUncheckedCreateWithoutUsuariosInput> | Prisma.solicitudes_inversionCreateWithoutUsuariosInput[] | Prisma.solicitudes_inversionUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.solicitudes_inversionCreateOrConnectWithoutUsuariosInput | Prisma.solicitudes_inversionCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.solicitudes_inversionCreateManyUsuariosInputEnvelope;
    connect?: Prisma.solicitudes_inversionWhereUniqueInput | Prisma.solicitudes_inversionWhereUniqueInput[];
};
export type solicitudes_inversionUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutUsuariosInput, Prisma.solicitudes_inversionUncheckedCreateWithoutUsuariosInput> | Prisma.solicitudes_inversionCreateWithoutUsuariosInput[] | Prisma.solicitudes_inversionUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.solicitudes_inversionCreateOrConnectWithoutUsuariosInput | Prisma.solicitudes_inversionCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.solicitudes_inversionUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.solicitudes_inversionUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.solicitudes_inversionCreateManyUsuariosInputEnvelope;
    set?: Prisma.solicitudes_inversionWhereUniqueInput | Prisma.solicitudes_inversionWhereUniqueInput[];
    disconnect?: Prisma.solicitudes_inversionWhereUniqueInput | Prisma.solicitudes_inversionWhereUniqueInput[];
    delete?: Prisma.solicitudes_inversionWhereUniqueInput | Prisma.solicitudes_inversionWhereUniqueInput[];
    connect?: Prisma.solicitudes_inversionWhereUniqueInput | Prisma.solicitudes_inversionWhereUniqueInput[];
    update?: Prisma.solicitudes_inversionUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.solicitudes_inversionUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.solicitudes_inversionUpdateManyWithWhereWithoutUsuariosInput | Prisma.solicitudes_inversionUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.solicitudes_inversionScalarWhereInput | Prisma.solicitudes_inversionScalarWhereInput[];
};
export type solicitudes_inversionUncheckedUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutUsuariosInput, Prisma.solicitudes_inversionUncheckedCreateWithoutUsuariosInput> | Prisma.solicitudes_inversionCreateWithoutUsuariosInput[] | Prisma.solicitudes_inversionUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.solicitudes_inversionCreateOrConnectWithoutUsuariosInput | Prisma.solicitudes_inversionCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.solicitudes_inversionUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.solicitudes_inversionUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.solicitudes_inversionCreateManyUsuariosInputEnvelope;
    set?: Prisma.solicitudes_inversionWhereUniqueInput | Prisma.solicitudes_inversionWhereUniqueInput[];
    disconnect?: Prisma.solicitudes_inversionWhereUniqueInput | Prisma.solicitudes_inversionWhereUniqueInput[];
    delete?: Prisma.solicitudes_inversionWhereUniqueInput | Prisma.solicitudes_inversionWhereUniqueInput[];
    connect?: Prisma.solicitudes_inversionWhereUniqueInput | Prisma.solicitudes_inversionWhereUniqueInput[];
    update?: Prisma.solicitudes_inversionUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.solicitudes_inversionUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.solicitudes_inversionUpdateManyWithWhereWithoutUsuariosInput | Prisma.solicitudes_inversionUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.solicitudes_inversionScalarWhereInput | Prisma.solicitudes_inversionScalarWhereInput[];
};
export type solicitudes_inversionCreateWithoutProcesosInput = {
    entregable_planeado?: string | null;
    tiene_evaluacion_financiera?: boolean;
    justificacion_sin_evaluacion?: string | null;
    link_acta_aprobacion?: string | null;
    link_plan_proyecto?: string | null;
    link_presentacion_puertas_3?: string | null;
    solicitud_evaluacion_financiera?: Prisma.solicitud_evaluacion_financieraCreateNestedOneWithoutSolicitudes_inversionInput;
    solicitud_flujo_caja?: Prisma.solicitud_flujo_cajaCreateNestedManyWithoutSolicitudes_inversionInput;
    solicitud_metas?: Prisma.solicitud_metasCreateNestedManyWithoutSolicitudes_inversionInput;
    solicitud_valores?: Prisma.solicitud_valoresCreateNestedManyWithoutSolicitudes_inversionInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutSolicitudes_inversionInput;
    subprogramas?: Prisma.subprogramasCreateNestedOneWithoutSolicitudes_inversionInput;
};
export type solicitudes_inversionUncheckedCreateWithoutProcesosInput = {
    id?: number;
    subprograma_id?: number | null;
    entregable_planeado?: string | null;
    tiene_evaluacion_financiera?: boolean;
    justificacion_sin_evaluacion?: string | null;
    responsable_pm_id?: number | null;
    link_acta_aprobacion?: string | null;
    link_plan_proyecto?: string | null;
    link_presentacion_puertas_3?: string | null;
    solicitud_evaluacion_financiera?: Prisma.solicitud_evaluacion_financieraUncheckedCreateNestedOneWithoutSolicitudes_inversionInput;
    solicitud_flujo_caja?: Prisma.solicitud_flujo_cajaUncheckedCreateNestedManyWithoutSolicitudes_inversionInput;
    solicitud_metas?: Prisma.solicitud_metasUncheckedCreateNestedManyWithoutSolicitudes_inversionInput;
    solicitud_valores?: Prisma.solicitud_valoresUncheckedCreateNestedManyWithoutSolicitudes_inversionInput;
};
export type solicitudes_inversionCreateOrConnectWithoutProcesosInput = {
    where: Prisma.solicitudes_inversionWhereUniqueInput;
    create: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutProcesosInput, Prisma.solicitudes_inversionUncheckedCreateWithoutProcesosInput>;
};
export type solicitudes_inversionUpsertWithoutProcesosInput = {
    update: Prisma.XOR<Prisma.solicitudes_inversionUpdateWithoutProcesosInput, Prisma.solicitudes_inversionUncheckedUpdateWithoutProcesosInput>;
    create: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutProcesosInput, Prisma.solicitudes_inversionUncheckedCreateWithoutProcesosInput>;
    where?: Prisma.solicitudes_inversionWhereInput;
};
export type solicitudes_inversionUpdateToOneWithWhereWithoutProcesosInput = {
    where?: Prisma.solicitudes_inversionWhereInput;
    data: Prisma.XOR<Prisma.solicitudes_inversionUpdateWithoutProcesosInput, Prisma.solicitudes_inversionUncheckedUpdateWithoutProcesosInput>;
};
export type solicitudes_inversionUpdateWithoutProcesosInput = {
    entregable_planeado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tiene_evaluacion_financiera?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    justificacion_sin_evaluacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_acta_aprobacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_plan_proyecto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_presentacion_puertas_3?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    solicitud_evaluacion_financiera?: Prisma.solicitud_evaluacion_financieraUpdateOneWithoutSolicitudes_inversionNestedInput;
    solicitud_flujo_caja?: Prisma.solicitud_flujo_cajaUpdateManyWithoutSolicitudes_inversionNestedInput;
    solicitud_metas?: Prisma.solicitud_metasUpdateManyWithoutSolicitudes_inversionNestedInput;
    solicitud_valores?: Prisma.solicitud_valoresUpdateManyWithoutSolicitudes_inversionNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutSolicitudes_inversionNestedInput;
    subprogramas?: Prisma.subprogramasUpdateOneWithoutSolicitudes_inversionNestedInput;
};
export type solicitudes_inversionUncheckedUpdateWithoutProcesosInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    subprograma_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    entregable_planeado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tiene_evaluacion_financiera?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    justificacion_sin_evaluacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsable_pm_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    link_acta_aprobacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_plan_proyecto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_presentacion_puertas_3?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    solicitud_evaluacion_financiera?: Prisma.solicitud_evaluacion_financieraUncheckedUpdateOneWithoutSolicitudes_inversionNestedInput;
    solicitud_flujo_caja?: Prisma.solicitud_flujo_cajaUncheckedUpdateManyWithoutSolicitudes_inversionNestedInput;
    solicitud_metas?: Prisma.solicitud_metasUncheckedUpdateManyWithoutSolicitudes_inversionNestedInput;
    solicitud_valores?: Prisma.solicitud_valoresUncheckedUpdateManyWithoutSolicitudes_inversionNestedInput;
};
export type solicitudes_inversionCreateWithoutSolicitud_evaluacion_financieraInput = {
    entregable_planeado?: string | null;
    tiene_evaluacion_financiera?: boolean;
    justificacion_sin_evaluacion?: string | null;
    link_acta_aprobacion?: string | null;
    link_plan_proyecto?: string | null;
    link_presentacion_puertas_3?: string | null;
    solicitud_flujo_caja?: Prisma.solicitud_flujo_cajaCreateNestedManyWithoutSolicitudes_inversionInput;
    solicitud_metas?: Prisma.solicitud_metasCreateNestedManyWithoutSolicitudes_inversionInput;
    solicitud_valores?: Prisma.solicitud_valoresCreateNestedManyWithoutSolicitudes_inversionInput;
    procesos?: Prisma.procesosCreateNestedOneWithoutSolicitudes_inversionInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutSolicitudes_inversionInput;
    subprogramas?: Prisma.subprogramasCreateNestedOneWithoutSolicitudes_inversionInput;
};
export type solicitudes_inversionUncheckedCreateWithoutSolicitud_evaluacion_financieraInput = {
    id?: number;
    proceso_id?: number | null;
    subprograma_id?: number | null;
    entregable_planeado?: string | null;
    tiene_evaluacion_financiera?: boolean;
    justificacion_sin_evaluacion?: string | null;
    responsable_pm_id?: number | null;
    link_acta_aprobacion?: string | null;
    link_plan_proyecto?: string | null;
    link_presentacion_puertas_3?: string | null;
    solicitud_flujo_caja?: Prisma.solicitud_flujo_cajaUncheckedCreateNestedManyWithoutSolicitudes_inversionInput;
    solicitud_metas?: Prisma.solicitud_metasUncheckedCreateNestedManyWithoutSolicitudes_inversionInput;
    solicitud_valores?: Prisma.solicitud_valoresUncheckedCreateNestedManyWithoutSolicitudes_inversionInput;
};
export type solicitudes_inversionCreateOrConnectWithoutSolicitud_evaluacion_financieraInput = {
    where: Prisma.solicitudes_inversionWhereUniqueInput;
    create: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutSolicitud_evaluacion_financieraInput, Prisma.solicitudes_inversionUncheckedCreateWithoutSolicitud_evaluacion_financieraInput>;
};
export type solicitudes_inversionUpsertWithoutSolicitud_evaluacion_financieraInput = {
    update: Prisma.XOR<Prisma.solicitudes_inversionUpdateWithoutSolicitud_evaluacion_financieraInput, Prisma.solicitudes_inversionUncheckedUpdateWithoutSolicitud_evaluacion_financieraInput>;
    create: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutSolicitud_evaluacion_financieraInput, Prisma.solicitudes_inversionUncheckedCreateWithoutSolicitud_evaluacion_financieraInput>;
    where?: Prisma.solicitudes_inversionWhereInput;
};
export type solicitudes_inversionUpdateToOneWithWhereWithoutSolicitud_evaluacion_financieraInput = {
    where?: Prisma.solicitudes_inversionWhereInput;
    data: Prisma.XOR<Prisma.solicitudes_inversionUpdateWithoutSolicitud_evaluacion_financieraInput, Prisma.solicitudes_inversionUncheckedUpdateWithoutSolicitud_evaluacion_financieraInput>;
};
export type solicitudes_inversionUpdateWithoutSolicitud_evaluacion_financieraInput = {
    entregable_planeado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tiene_evaluacion_financiera?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    justificacion_sin_evaluacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_acta_aprobacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_plan_proyecto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_presentacion_puertas_3?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    solicitud_flujo_caja?: Prisma.solicitud_flujo_cajaUpdateManyWithoutSolicitudes_inversionNestedInput;
    solicitud_metas?: Prisma.solicitud_metasUpdateManyWithoutSolicitudes_inversionNestedInput;
    solicitud_valores?: Prisma.solicitud_valoresUpdateManyWithoutSolicitudes_inversionNestedInput;
    procesos?: Prisma.procesosUpdateOneWithoutSolicitudes_inversionNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutSolicitudes_inversionNestedInput;
    subprogramas?: Prisma.subprogramasUpdateOneWithoutSolicitudes_inversionNestedInput;
};
export type solicitudes_inversionUncheckedUpdateWithoutSolicitud_evaluacion_financieraInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    proceso_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    subprograma_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    entregable_planeado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tiene_evaluacion_financiera?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    justificacion_sin_evaluacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsable_pm_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    link_acta_aprobacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_plan_proyecto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_presentacion_puertas_3?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    solicitud_flujo_caja?: Prisma.solicitud_flujo_cajaUncheckedUpdateManyWithoutSolicitudes_inversionNestedInput;
    solicitud_metas?: Prisma.solicitud_metasUncheckedUpdateManyWithoutSolicitudes_inversionNestedInput;
    solicitud_valores?: Prisma.solicitud_valoresUncheckedUpdateManyWithoutSolicitudes_inversionNestedInput;
};
export type solicitudes_inversionCreateWithoutSolicitud_flujo_cajaInput = {
    entregable_planeado?: string | null;
    tiene_evaluacion_financiera?: boolean;
    justificacion_sin_evaluacion?: string | null;
    link_acta_aprobacion?: string | null;
    link_plan_proyecto?: string | null;
    link_presentacion_puertas_3?: string | null;
    solicitud_evaluacion_financiera?: Prisma.solicitud_evaluacion_financieraCreateNestedOneWithoutSolicitudes_inversionInput;
    solicitud_metas?: Prisma.solicitud_metasCreateNestedManyWithoutSolicitudes_inversionInput;
    solicitud_valores?: Prisma.solicitud_valoresCreateNestedManyWithoutSolicitudes_inversionInput;
    procesos?: Prisma.procesosCreateNestedOneWithoutSolicitudes_inversionInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutSolicitudes_inversionInput;
    subprogramas?: Prisma.subprogramasCreateNestedOneWithoutSolicitudes_inversionInput;
};
export type solicitudes_inversionUncheckedCreateWithoutSolicitud_flujo_cajaInput = {
    id?: number;
    proceso_id?: number | null;
    subprograma_id?: number | null;
    entregable_planeado?: string | null;
    tiene_evaluacion_financiera?: boolean;
    justificacion_sin_evaluacion?: string | null;
    responsable_pm_id?: number | null;
    link_acta_aprobacion?: string | null;
    link_plan_proyecto?: string | null;
    link_presentacion_puertas_3?: string | null;
    solicitud_evaluacion_financiera?: Prisma.solicitud_evaluacion_financieraUncheckedCreateNestedOneWithoutSolicitudes_inversionInput;
    solicitud_metas?: Prisma.solicitud_metasUncheckedCreateNestedManyWithoutSolicitudes_inversionInput;
    solicitud_valores?: Prisma.solicitud_valoresUncheckedCreateNestedManyWithoutSolicitudes_inversionInput;
};
export type solicitudes_inversionCreateOrConnectWithoutSolicitud_flujo_cajaInput = {
    where: Prisma.solicitudes_inversionWhereUniqueInput;
    create: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutSolicitud_flujo_cajaInput, Prisma.solicitudes_inversionUncheckedCreateWithoutSolicitud_flujo_cajaInput>;
};
export type solicitudes_inversionUpsertWithoutSolicitud_flujo_cajaInput = {
    update: Prisma.XOR<Prisma.solicitudes_inversionUpdateWithoutSolicitud_flujo_cajaInput, Prisma.solicitudes_inversionUncheckedUpdateWithoutSolicitud_flujo_cajaInput>;
    create: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutSolicitud_flujo_cajaInput, Prisma.solicitudes_inversionUncheckedCreateWithoutSolicitud_flujo_cajaInput>;
    where?: Prisma.solicitudes_inversionWhereInput;
};
export type solicitudes_inversionUpdateToOneWithWhereWithoutSolicitud_flujo_cajaInput = {
    where?: Prisma.solicitudes_inversionWhereInput;
    data: Prisma.XOR<Prisma.solicitudes_inversionUpdateWithoutSolicitud_flujo_cajaInput, Prisma.solicitudes_inversionUncheckedUpdateWithoutSolicitud_flujo_cajaInput>;
};
export type solicitudes_inversionUpdateWithoutSolicitud_flujo_cajaInput = {
    entregable_planeado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tiene_evaluacion_financiera?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    justificacion_sin_evaluacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_acta_aprobacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_plan_proyecto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_presentacion_puertas_3?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    solicitud_evaluacion_financiera?: Prisma.solicitud_evaluacion_financieraUpdateOneWithoutSolicitudes_inversionNestedInput;
    solicitud_metas?: Prisma.solicitud_metasUpdateManyWithoutSolicitudes_inversionNestedInput;
    solicitud_valores?: Prisma.solicitud_valoresUpdateManyWithoutSolicitudes_inversionNestedInput;
    procesos?: Prisma.procesosUpdateOneWithoutSolicitudes_inversionNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutSolicitudes_inversionNestedInput;
    subprogramas?: Prisma.subprogramasUpdateOneWithoutSolicitudes_inversionNestedInput;
};
export type solicitudes_inversionUncheckedUpdateWithoutSolicitud_flujo_cajaInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    proceso_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    subprograma_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    entregable_planeado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tiene_evaluacion_financiera?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    justificacion_sin_evaluacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsable_pm_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    link_acta_aprobacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_plan_proyecto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_presentacion_puertas_3?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    solicitud_evaluacion_financiera?: Prisma.solicitud_evaluacion_financieraUncheckedUpdateOneWithoutSolicitudes_inversionNestedInput;
    solicitud_metas?: Prisma.solicitud_metasUncheckedUpdateManyWithoutSolicitudes_inversionNestedInput;
    solicitud_valores?: Prisma.solicitud_valoresUncheckedUpdateManyWithoutSolicitudes_inversionNestedInput;
};
export type solicitudes_inversionCreateWithoutSolicitud_metasInput = {
    entregable_planeado?: string | null;
    tiene_evaluacion_financiera?: boolean;
    justificacion_sin_evaluacion?: string | null;
    link_acta_aprobacion?: string | null;
    link_plan_proyecto?: string | null;
    link_presentacion_puertas_3?: string | null;
    solicitud_evaluacion_financiera?: Prisma.solicitud_evaluacion_financieraCreateNestedOneWithoutSolicitudes_inversionInput;
    solicitud_flujo_caja?: Prisma.solicitud_flujo_cajaCreateNestedManyWithoutSolicitudes_inversionInput;
    solicitud_valores?: Prisma.solicitud_valoresCreateNestedManyWithoutSolicitudes_inversionInput;
    procesos?: Prisma.procesosCreateNestedOneWithoutSolicitudes_inversionInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutSolicitudes_inversionInput;
    subprogramas?: Prisma.subprogramasCreateNestedOneWithoutSolicitudes_inversionInput;
};
export type solicitudes_inversionUncheckedCreateWithoutSolicitud_metasInput = {
    id?: number;
    proceso_id?: number | null;
    subprograma_id?: number | null;
    entregable_planeado?: string | null;
    tiene_evaluacion_financiera?: boolean;
    justificacion_sin_evaluacion?: string | null;
    responsable_pm_id?: number | null;
    link_acta_aprobacion?: string | null;
    link_plan_proyecto?: string | null;
    link_presentacion_puertas_3?: string | null;
    solicitud_evaluacion_financiera?: Prisma.solicitud_evaluacion_financieraUncheckedCreateNestedOneWithoutSolicitudes_inversionInput;
    solicitud_flujo_caja?: Prisma.solicitud_flujo_cajaUncheckedCreateNestedManyWithoutSolicitudes_inversionInput;
    solicitud_valores?: Prisma.solicitud_valoresUncheckedCreateNestedManyWithoutSolicitudes_inversionInput;
};
export type solicitudes_inversionCreateOrConnectWithoutSolicitud_metasInput = {
    where: Prisma.solicitudes_inversionWhereUniqueInput;
    create: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutSolicitud_metasInput, Prisma.solicitudes_inversionUncheckedCreateWithoutSolicitud_metasInput>;
};
export type solicitudes_inversionUpsertWithoutSolicitud_metasInput = {
    update: Prisma.XOR<Prisma.solicitudes_inversionUpdateWithoutSolicitud_metasInput, Prisma.solicitudes_inversionUncheckedUpdateWithoutSolicitud_metasInput>;
    create: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutSolicitud_metasInput, Prisma.solicitudes_inversionUncheckedCreateWithoutSolicitud_metasInput>;
    where?: Prisma.solicitudes_inversionWhereInput;
};
export type solicitudes_inversionUpdateToOneWithWhereWithoutSolicitud_metasInput = {
    where?: Prisma.solicitudes_inversionWhereInput;
    data: Prisma.XOR<Prisma.solicitudes_inversionUpdateWithoutSolicitud_metasInput, Prisma.solicitudes_inversionUncheckedUpdateWithoutSolicitud_metasInput>;
};
export type solicitudes_inversionUpdateWithoutSolicitud_metasInput = {
    entregable_planeado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tiene_evaluacion_financiera?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    justificacion_sin_evaluacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_acta_aprobacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_plan_proyecto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_presentacion_puertas_3?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    solicitud_evaluacion_financiera?: Prisma.solicitud_evaluacion_financieraUpdateOneWithoutSolicitudes_inversionNestedInput;
    solicitud_flujo_caja?: Prisma.solicitud_flujo_cajaUpdateManyWithoutSolicitudes_inversionNestedInput;
    solicitud_valores?: Prisma.solicitud_valoresUpdateManyWithoutSolicitudes_inversionNestedInput;
    procesos?: Prisma.procesosUpdateOneWithoutSolicitudes_inversionNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutSolicitudes_inversionNestedInput;
    subprogramas?: Prisma.subprogramasUpdateOneWithoutSolicitudes_inversionNestedInput;
};
export type solicitudes_inversionUncheckedUpdateWithoutSolicitud_metasInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    proceso_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    subprograma_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    entregable_planeado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tiene_evaluacion_financiera?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    justificacion_sin_evaluacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsable_pm_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    link_acta_aprobacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_plan_proyecto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_presentacion_puertas_3?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    solicitud_evaluacion_financiera?: Prisma.solicitud_evaluacion_financieraUncheckedUpdateOneWithoutSolicitudes_inversionNestedInput;
    solicitud_flujo_caja?: Prisma.solicitud_flujo_cajaUncheckedUpdateManyWithoutSolicitudes_inversionNestedInput;
    solicitud_valores?: Prisma.solicitud_valoresUncheckedUpdateManyWithoutSolicitudes_inversionNestedInput;
};
export type solicitudes_inversionCreateWithoutSolicitud_valoresInput = {
    entregable_planeado?: string | null;
    tiene_evaluacion_financiera?: boolean;
    justificacion_sin_evaluacion?: string | null;
    link_acta_aprobacion?: string | null;
    link_plan_proyecto?: string | null;
    link_presentacion_puertas_3?: string | null;
    solicitud_evaluacion_financiera?: Prisma.solicitud_evaluacion_financieraCreateNestedOneWithoutSolicitudes_inversionInput;
    solicitud_flujo_caja?: Prisma.solicitud_flujo_cajaCreateNestedManyWithoutSolicitudes_inversionInput;
    solicitud_metas?: Prisma.solicitud_metasCreateNestedManyWithoutSolicitudes_inversionInput;
    procesos?: Prisma.procesosCreateNestedOneWithoutSolicitudes_inversionInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutSolicitudes_inversionInput;
    subprogramas?: Prisma.subprogramasCreateNestedOneWithoutSolicitudes_inversionInput;
};
export type solicitudes_inversionUncheckedCreateWithoutSolicitud_valoresInput = {
    id?: number;
    proceso_id?: number | null;
    subprograma_id?: number | null;
    entregable_planeado?: string | null;
    tiene_evaluacion_financiera?: boolean;
    justificacion_sin_evaluacion?: string | null;
    responsable_pm_id?: number | null;
    link_acta_aprobacion?: string | null;
    link_plan_proyecto?: string | null;
    link_presentacion_puertas_3?: string | null;
    solicitud_evaluacion_financiera?: Prisma.solicitud_evaluacion_financieraUncheckedCreateNestedOneWithoutSolicitudes_inversionInput;
    solicitud_flujo_caja?: Prisma.solicitud_flujo_cajaUncheckedCreateNestedManyWithoutSolicitudes_inversionInput;
    solicitud_metas?: Prisma.solicitud_metasUncheckedCreateNestedManyWithoutSolicitudes_inversionInput;
};
export type solicitudes_inversionCreateOrConnectWithoutSolicitud_valoresInput = {
    where: Prisma.solicitudes_inversionWhereUniqueInput;
    create: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutSolicitud_valoresInput, Prisma.solicitudes_inversionUncheckedCreateWithoutSolicitud_valoresInput>;
};
export type solicitudes_inversionUpsertWithoutSolicitud_valoresInput = {
    update: Prisma.XOR<Prisma.solicitudes_inversionUpdateWithoutSolicitud_valoresInput, Prisma.solicitudes_inversionUncheckedUpdateWithoutSolicitud_valoresInput>;
    create: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutSolicitud_valoresInput, Prisma.solicitudes_inversionUncheckedCreateWithoutSolicitud_valoresInput>;
    where?: Prisma.solicitudes_inversionWhereInput;
};
export type solicitudes_inversionUpdateToOneWithWhereWithoutSolicitud_valoresInput = {
    where?: Prisma.solicitudes_inversionWhereInput;
    data: Prisma.XOR<Prisma.solicitudes_inversionUpdateWithoutSolicitud_valoresInput, Prisma.solicitudes_inversionUncheckedUpdateWithoutSolicitud_valoresInput>;
};
export type solicitudes_inversionUpdateWithoutSolicitud_valoresInput = {
    entregable_planeado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tiene_evaluacion_financiera?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    justificacion_sin_evaluacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_acta_aprobacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_plan_proyecto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_presentacion_puertas_3?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    solicitud_evaluacion_financiera?: Prisma.solicitud_evaluacion_financieraUpdateOneWithoutSolicitudes_inversionNestedInput;
    solicitud_flujo_caja?: Prisma.solicitud_flujo_cajaUpdateManyWithoutSolicitudes_inversionNestedInput;
    solicitud_metas?: Prisma.solicitud_metasUpdateManyWithoutSolicitudes_inversionNestedInput;
    procesos?: Prisma.procesosUpdateOneWithoutSolicitudes_inversionNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutSolicitudes_inversionNestedInput;
    subprogramas?: Prisma.subprogramasUpdateOneWithoutSolicitudes_inversionNestedInput;
};
export type solicitudes_inversionUncheckedUpdateWithoutSolicitud_valoresInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    proceso_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    subprograma_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    entregable_planeado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tiene_evaluacion_financiera?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    justificacion_sin_evaluacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsable_pm_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    link_acta_aprobacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_plan_proyecto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_presentacion_puertas_3?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    solicitud_evaluacion_financiera?: Prisma.solicitud_evaluacion_financieraUncheckedUpdateOneWithoutSolicitudes_inversionNestedInput;
    solicitud_flujo_caja?: Prisma.solicitud_flujo_cajaUncheckedUpdateManyWithoutSolicitudes_inversionNestedInput;
    solicitud_metas?: Prisma.solicitud_metasUncheckedUpdateManyWithoutSolicitudes_inversionNestedInput;
};
export type solicitudes_inversionCreateWithoutSubprogramasInput = {
    entregable_planeado?: string | null;
    tiene_evaluacion_financiera?: boolean;
    justificacion_sin_evaluacion?: string | null;
    link_acta_aprobacion?: string | null;
    link_plan_proyecto?: string | null;
    link_presentacion_puertas_3?: string | null;
    solicitud_evaluacion_financiera?: Prisma.solicitud_evaluacion_financieraCreateNestedOneWithoutSolicitudes_inversionInput;
    solicitud_flujo_caja?: Prisma.solicitud_flujo_cajaCreateNestedManyWithoutSolicitudes_inversionInput;
    solicitud_metas?: Prisma.solicitud_metasCreateNestedManyWithoutSolicitudes_inversionInput;
    solicitud_valores?: Prisma.solicitud_valoresCreateNestedManyWithoutSolicitudes_inversionInput;
    procesos?: Prisma.procesosCreateNestedOneWithoutSolicitudes_inversionInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutSolicitudes_inversionInput;
};
export type solicitudes_inversionUncheckedCreateWithoutSubprogramasInput = {
    id?: number;
    proceso_id?: number | null;
    entregable_planeado?: string | null;
    tiene_evaluacion_financiera?: boolean;
    justificacion_sin_evaluacion?: string | null;
    responsable_pm_id?: number | null;
    link_acta_aprobacion?: string | null;
    link_plan_proyecto?: string | null;
    link_presentacion_puertas_3?: string | null;
    solicitud_evaluacion_financiera?: Prisma.solicitud_evaluacion_financieraUncheckedCreateNestedOneWithoutSolicitudes_inversionInput;
    solicitud_flujo_caja?: Prisma.solicitud_flujo_cajaUncheckedCreateNestedManyWithoutSolicitudes_inversionInput;
    solicitud_metas?: Prisma.solicitud_metasUncheckedCreateNestedManyWithoutSolicitudes_inversionInput;
    solicitud_valores?: Prisma.solicitud_valoresUncheckedCreateNestedManyWithoutSolicitudes_inversionInput;
};
export type solicitudes_inversionCreateOrConnectWithoutSubprogramasInput = {
    where: Prisma.solicitudes_inversionWhereUniqueInput;
    create: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutSubprogramasInput, Prisma.solicitudes_inversionUncheckedCreateWithoutSubprogramasInput>;
};
export type solicitudes_inversionCreateManySubprogramasInputEnvelope = {
    data: Prisma.solicitudes_inversionCreateManySubprogramasInput | Prisma.solicitudes_inversionCreateManySubprogramasInput[];
    skipDuplicates?: boolean;
};
export type solicitudes_inversionUpsertWithWhereUniqueWithoutSubprogramasInput = {
    where: Prisma.solicitudes_inversionWhereUniqueInput;
    update: Prisma.XOR<Prisma.solicitudes_inversionUpdateWithoutSubprogramasInput, Prisma.solicitudes_inversionUncheckedUpdateWithoutSubprogramasInput>;
    create: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutSubprogramasInput, Prisma.solicitudes_inversionUncheckedCreateWithoutSubprogramasInput>;
};
export type solicitudes_inversionUpdateWithWhereUniqueWithoutSubprogramasInput = {
    where: Prisma.solicitudes_inversionWhereUniqueInput;
    data: Prisma.XOR<Prisma.solicitudes_inversionUpdateWithoutSubprogramasInput, Prisma.solicitudes_inversionUncheckedUpdateWithoutSubprogramasInput>;
};
export type solicitudes_inversionUpdateManyWithWhereWithoutSubprogramasInput = {
    where: Prisma.solicitudes_inversionScalarWhereInput;
    data: Prisma.XOR<Prisma.solicitudes_inversionUpdateManyMutationInput, Prisma.solicitudes_inversionUncheckedUpdateManyWithoutSubprogramasInput>;
};
export type solicitudes_inversionScalarWhereInput = {
    AND?: Prisma.solicitudes_inversionScalarWhereInput | Prisma.solicitudes_inversionScalarWhereInput[];
    OR?: Prisma.solicitudes_inversionScalarWhereInput[];
    NOT?: Prisma.solicitudes_inversionScalarWhereInput | Prisma.solicitudes_inversionScalarWhereInput[];
    id?: Prisma.IntFilter<"solicitudes_inversion"> | number;
    proceso_id?: Prisma.IntNullableFilter<"solicitudes_inversion"> | number | null;
    subprograma_id?: Prisma.IntNullableFilter<"solicitudes_inversion"> | number | null;
    entregable_planeado?: Prisma.StringNullableFilter<"solicitudes_inversion"> | string | null;
    tiene_evaluacion_financiera?: Prisma.BoolFilter<"solicitudes_inversion"> | boolean;
    justificacion_sin_evaluacion?: Prisma.StringNullableFilter<"solicitudes_inversion"> | string | null;
    responsable_pm_id?: Prisma.IntNullableFilter<"solicitudes_inversion"> | number | null;
    link_acta_aprobacion?: Prisma.StringNullableFilter<"solicitudes_inversion"> | string | null;
    link_plan_proyecto?: Prisma.StringNullableFilter<"solicitudes_inversion"> | string | null;
    link_presentacion_puertas_3?: Prisma.StringNullableFilter<"solicitudes_inversion"> | string | null;
};
export type solicitudes_inversionCreateWithoutUsuariosInput = {
    entregable_planeado?: string | null;
    tiene_evaluacion_financiera?: boolean;
    justificacion_sin_evaluacion?: string | null;
    link_acta_aprobacion?: string | null;
    link_plan_proyecto?: string | null;
    link_presentacion_puertas_3?: string | null;
    solicitud_evaluacion_financiera?: Prisma.solicitud_evaluacion_financieraCreateNestedOneWithoutSolicitudes_inversionInput;
    solicitud_flujo_caja?: Prisma.solicitud_flujo_cajaCreateNestedManyWithoutSolicitudes_inversionInput;
    solicitud_metas?: Prisma.solicitud_metasCreateNestedManyWithoutSolicitudes_inversionInput;
    solicitud_valores?: Prisma.solicitud_valoresCreateNestedManyWithoutSolicitudes_inversionInput;
    procesos?: Prisma.procesosCreateNestedOneWithoutSolicitudes_inversionInput;
    subprogramas?: Prisma.subprogramasCreateNestedOneWithoutSolicitudes_inversionInput;
};
export type solicitudes_inversionUncheckedCreateWithoutUsuariosInput = {
    id?: number;
    proceso_id?: number | null;
    subprograma_id?: number | null;
    entregable_planeado?: string | null;
    tiene_evaluacion_financiera?: boolean;
    justificacion_sin_evaluacion?: string | null;
    link_acta_aprobacion?: string | null;
    link_plan_proyecto?: string | null;
    link_presentacion_puertas_3?: string | null;
    solicitud_evaluacion_financiera?: Prisma.solicitud_evaluacion_financieraUncheckedCreateNestedOneWithoutSolicitudes_inversionInput;
    solicitud_flujo_caja?: Prisma.solicitud_flujo_cajaUncheckedCreateNestedManyWithoutSolicitudes_inversionInput;
    solicitud_metas?: Prisma.solicitud_metasUncheckedCreateNestedManyWithoutSolicitudes_inversionInput;
    solicitud_valores?: Prisma.solicitud_valoresUncheckedCreateNestedManyWithoutSolicitudes_inversionInput;
};
export type solicitudes_inversionCreateOrConnectWithoutUsuariosInput = {
    where: Prisma.solicitudes_inversionWhereUniqueInput;
    create: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutUsuariosInput, Prisma.solicitudes_inversionUncheckedCreateWithoutUsuariosInput>;
};
export type solicitudes_inversionCreateManyUsuariosInputEnvelope = {
    data: Prisma.solicitudes_inversionCreateManyUsuariosInput | Prisma.solicitudes_inversionCreateManyUsuariosInput[];
    skipDuplicates?: boolean;
};
export type solicitudes_inversionUpsertWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.solicitudes_inversionWhereUniqueInput;
    update: Prisma.XOR<Prisma.solicitudes_inversionUpdateWithoutUsuariosInput, Prisma.solicitudes_inversionUncheckedUpdateWithoutUsuariosInput>;
    create: Prisma.XOR<Prisma.solicitudes_inversionCreateWithoutUsuariosInput, Prisma.solicitudes_inversionUncheckedCreateWithoutUsuariosInput>;
};
export type solicitudes_inversionUpdateWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.solicitudes_inversionWhereUniqueInput;
    data: Prisma.XOR<Prisma.solicitudes_inversionUpdateWithoutUsuariosInput, Prisma.solicitudes_inversionUncheckedUpdateWithoutUsuariosInput>;
};
export type solicitudes_inversionUpdateManyWithWhereWithoutUsuariosInput = {
    where: Prisma.solicitudes_inversionScalarWhereInput;
    data: Prisma.XOR<Prisma.solicitudes_inversionUpdateManyMutationInput, Prisma.solicitudes_inversionUncheckedUpdateManyWithoutUsuariosInput>;
};
export type solicitudes_inversionCreateManySubprogramasInput = {
    id?: number;
    proceso_id?: number | null;
    entregable_planeado?: string | null;
    tiene_evaluacion_financiera?: boolean;
    justificacion_sin_evaluacion?: string | null;
    responsable_pm_id?: number | null;
    link_acta_aprobacion?: string | null;
    link_plan_proyecto?: string | null;
    link_presentacion_puertas_3?: string | null;
};
export type solicitudes_inversionUpdateWithoutSubprogramasInput = {
    entregable_planeado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tiene_evaluacion_financiera?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    justificacion_sin_evaluacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_acta_aprobacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_plan_proyecto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_presentacion_puertas_3?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    solicitud_evaluacion_financiera?: Prisma.solicitud_evaluacion_financieraUpdateOneWithoutSolicitudes_inversionNestedInput;
    solicitud_flujo_caja?: Prisma.solicitud_flujo_cajaUpdateManyWithoutSolicitudes_inversionNestedInput;
    solicitud_metas?: Prisma.solicitud_metasUpdateManyWithoutSolicitudes_inversionNestedInput;
    solicitud_valores?: Prisma.solicitud_valoresUpdateManyWithoutSolicitudes_inversionNestedInput;
    procesos?: Prisma.procesosUpdateOneWithoutSolicitudes_inversionNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutSolicitudes_inversionNestedInput;
};
export type solicitudes_inversionUncheckedUpdateWithoutSubprogramasInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    proceso_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    entregable_planeado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tiene_evaluacion_financiera?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    justificacion_sin_evaluacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsable_pm_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    link_acta_aprobacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_plan_proyecto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_presentacion_puertas_3?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    solicitud_evaluacion_financiera?: Prisma.solicitud_evaluacion_financieraUncheckedUpdateOneWithoutSolicitudes_inversionNestedInput;
    solicitud_flujo_caja?: Prisma.solicitud_flujo_cajaUncheckedUpdateManyWithoutSolicitudes_inversionNestedInput;
    solicitud_metas?: Prisma.solicitud_metasUncheckedUpdateManyWithoutSolicitudes_inversionNestedInput;
    solicitud_valores?: Prisma.solicitud_valoresUncheckedUpdateManyWithoutSolicitudes_inversionNestedInput;
};
export type solicitudes_inversionUncheckedUpdateManyWithoutSubprogramasInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    proceso_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    entregable_planeado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tiene_evaluacion_financiera?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    justificacion_sin_evaluacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    responsable_pm_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    link_acta_aprobacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_plan_proyecto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_presentacion_puertas_3?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type solicitudes_inversionCreateManyUsuariosInput = {
    id?: number;
    proceso_id?: number | null;
    subprograma_id?: number | null;
    entregable_planeado?: string | null;
    tiene_evaluacion_financiera?: boolean;
    justificacion_sin_evaluacion?: string | null;
    link_acta_aprobacion?: string | null;
    link_plan_proyecto?: string | null;
    link_presentacion_puertas_3?: string | null;
};
export type solicitudes_inversionUpdateWithoutUsuariosInput = {
    entregable_planeado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tiene_evaluacion_financiera?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    justificacion_sin_evaluacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_acta_aprobacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_plan_proyecto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_presentacion_puertas_3?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    solicitud_evaluacion_financiera?: Prisma.solicitud_evaluacion_financieraUpdateOneWithoutSolicitudes_inversionNestedInput;
    solicitud_flujo_caja?: Prisma.solicitud_flujo_cajaUpdateManyWithoutSolicitudes_inversionNestedInput;
    solicitud_metas?: Prisma.solicitud_metasUpdateManyWithoutSolicitudes_inversionNestedInput;
    solicitud_valores?: Prisma.solicitud_valoresUpdateManyWithoutSolicitudes_inversionNestedInput;
    procesos?: Prisma.procesosUpdateOneWithoutSolicitudes_inversionNestedInput;
    subprogramas?: Prisma.subprogramasUpdateOneWithoutSolicitudes_inversionNestedInput;
};
export type solicitudes_inversionUncheckedUpdateWithoutUsuariosInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    proceso_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    subprograma_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    entregable_planeado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tiene_evaluacion_financiera?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    justificacion_sin_evaluacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_acta_aprobacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_plan_proyecto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_presentacion_puertas_3?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    solicitud_evaluacion_financiera?: Prisma.solicitud_evaluacion_financieraUncheckedUpdateOneWithoutSolicitudes_inversionNestedInput;
    solicitud_flujo_caja?: Prisma.solicitud_flujo_cajaUncheckedUpdateManyWithoutSolicitudes_inversionNestedInput;
    solicitud_metas?: Prisma.solicitud_metasUncheckedUpdateManyWithoutSolicitudes_inversionNestedInput;
    solicitud_valores?: Prisma.solicitud_valoresUncheckedUpdateManyWithoutSolicitudes_inversionNestedInput;
};
export type solicitudes_inversionUncheckedUpdateManyWithoutUsuariosInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    proceso_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    subprograma_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    entregable_planeado?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tiene_evaluacion_financiera?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    justificacion_sin_evaluacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_acta_aprobacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_plan_proyecto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    link_presentacion_puertas_3?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type Solicitudes_inversionCountOutputType = {
    solicitud_flujo_caja: number;
    solicitud_metas: number;
    solicitud_valores: number;
};
export type Solicitudes_inversionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    solicitud_flujo_caja?: boolean | Solicitudes_inversionCountOutputTypeCountSolicitud_flujo_cajaArgs;
    solicitud_metas?: boolean | Solicitudes_inversionCountOutputTypeCountSolicitud_metasArgs;
    solicitud_valores?: boolean | Solicitudes_inversionCountOutputTypeCountSolicitud_valoresArgs;
};
export type Solicitudes_inversionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.Solicitudes_inversionCountOutputTypeSelect<ExtArgs> | null;
};
export type Solicitudes_inversionCountOutputTypeCountSolicitud_flujo_cajaArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.solicitud_flujo_cajaWhereInput;
};
export type Solicitudes_inversionCountOutputTypeCountSolicitud_metasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.solicitud_metasWhereInput;
};
export type Solicitudes_inversionCountOutputTypeCountSolicitud_valoresArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.solicitud_valoresWhereInput;
};
export type solicitudes_inversionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    proceso_id?: boolean;
    subprograma_id?: boolean;
    entregable_planeado?: boolean;
    tiene_evaluacion_financiera?: boolean;
    justificacion_sin_evaluacion?: boolean;
    responsable_pm_id?: boolean;
    link_acta_aprobacion?: boolean;
    link_plan_proyecto?: boolean;
    link_presentacion_puertas_3?: boolean;
    solicitud_evaluacion_financiera?: boolean | Prisma.solicitudes_inversion$solicitud_evaluacion_financieraArgs<ExtArgs>;
    solicitud_flujo_caja?: boolean | Prisma.solicitudes_inversion$solicitud_flujo_cajaArgs<ExtArgs>;
    solicitud_metas?: boolean | Prisma.solicitudes_inversion$solicitud_metasArgs<ExtArgs>;
    solicitud_valores?: boolean | Prisma.solicitudes_inversion$solicitud_valoresArgs<ExtArgs>;
    procesos?: boolean | Prisma.solicitudes_inversion$procesosArgs<ExtArgs>;
    usuarios?: boolean | Prisma.solicitudes_inversion$usuariosArgs<ExtArgs>;
    subprogramas?: boolean | Prisma.solicitudes_inversion$subprogramasArgs<ExtArgs>;
    _count?: boolean | Prisma.Solicitudes_inversionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["solicitudes_inversion"]>;
export type solicitudes_inversionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    proceso_id?: boolean;
    subprograma_id?: boolean;
    entregable_planeado?: boolean;
    tiene_evaluacion_financiera?: boolean;
    justificacion_sin_evaluacion?: boolean;
    responsable_pm_id?: boolean;
    link_acta_aprobacion?: boolean;
    link_plan_proyecto?: boolean;
    link_presentacion_puertas_3?: boolean;
    procesos?: boolean | Prisma.solicitudes_inversion$procesosArgs<ExtArgs>;
    usuarios?: boolean | Prisma.solicitudes_inversion$usuariosArgs<ExtArgs>;
    subprogramas?: boolean | Prisma.solicitudes_inversion$subprogramasArgs<ExtArgs>;
}, ExtArgs["result"]["solicitudes_inversion"]>;
export type solicitudes_inversionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    proceso_id?: boolean;
    subprograma_id?: boolean;
    entregable_planeado?: boolean;
    tiene_evaluacion_financiera?: boolean;
    justificacion_sin_evaluacion?: boolean;
    responsable_pm_id?: boolean;
    link_acta_aprobacion?: boolean;
    link_plan_proyecto?: boolean;
    link_presentacion_puertas_3?: boolean;
    procesos?: boolean | Prisma.solicitudes_inversion$procesosArgs<ExtArgs>;
    usuarios?: boolean | Prisma.solicitudes_inversion$usuariosArgs<ExtArgs>;
    subprogramas?: boolean | Prisma.solicitudes_inversion$subprogramasArgs<ExtArgs>;
}, ExtArgs["result"]["solicitudes_inversion"]>;
export type solicitudes_inversionSelectScalar = {
    id?: boolean;
    proceso_id?: boolean;
    subprograma_id?: boolean;
    entregable_planeado?: boolean;
    tiene_evaluacion_financiera?: boolean;
    justificacion_sin_evaluacion?: boolean;
    responsable_pm_id?: boolean;
    link_acta_aprobacion?: boolean;
    link_plan_proyecto?: boolean;
    link_presentacion_puertas_3?: boolean;
};
export type solicitudes_inversionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "proceso_id" | "subprograma_id" | "entregable_planeado" | "tiene_evaluacion_financiera" | "justificacion_sin_evaluacion" | "responsable_pm_id" | "link_acta_aprobacion" | "link_plan_proyecto" | "link_presentacion_puertas_3", ExtArgs["result"]["solicitudes_inversion"]>;
export type solicitudes_inversionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    solicitud_evaluacion_financiera?: boolean | Prisma.solicitudes_inversion$solicitud_evaluacion_financieraArgs<ExtArgs>;
    solicitud_flujo_caja?: boolean | Prisma.solicitudes_inversion$solicitud_flujo_cajaArgs<ExtArgs>;
    solicitud_metas?: boolean | Prisma.solicitudes_inversion$solicitud_metasArgs<ExtArgs>;
    solicitud_valores?: boolean | Prisma.solicitudes_inversion$solicitud_valoresArgs<ExtArgs>;
    procesos?: boolean | Prisma.solicitudes_inversion$procesosArgs<ExtArgs>;
    usuarios?: boolean | Prisma.solicitudes_inversion$usuariosArgs<ExtArgs>;
    subprogramas?: boolean | Prisma.solicitudes_inversion$subprogramasArgs<ExtArgs>;
    _count?: boolean | Prisma.Solicitudes_inversionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type solicitudes_inversionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    procesos?: boolean | Prisma.solicitudes_inversion$procesosArgs<ExtArgs>;
    usuarios?: boolean | Prisma.solicitudes_inversion$usuariosArgs<ExtArgs>;
    subprogramas?: boolean | Prisma.solicitudes_inversion$subprogramasArgs<ExtArgs>;
};
export type solicitudes_inversionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    procesos?: boolean | Prisma.solicitudes_inversion$procesosArgs<ExtArgs>;
    usuarios?: boolean | Prisma.solicitudes_inversion$usuariosArgs<ExtArgs>;
    subprogramas?: boolean | Prisma.solicitudes_inversion$subprogramasArgs<ExtArgs>;
};
export type $solicitudes_inversionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "solicitudes_inversion";
    objects: {
        solicitud_evaluacion_financiera: Prisma.$solicitud_evaluacion_financieraPayload<ExtArgs> | null;
        solicitud_flujo_caja: Prisma.$solicitud_flujo_cajaPayload<ExtArgs>[];
        solicitud_metas: Prisma.$solicitud_metasPayload<ExtArgs>[];
        solicitud_valores: Prisma.$solicitud_valoresPayload<ExtArgs>[];
        procesos: Prisma.$procesosPayload<ExtArgs> | null;
        usuarios: Prisma.$usuariosPayload<ExtArgs> | null;
        subprogramas: Prisma.$subprogramasPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        proceso_id: number | null;
        subprograma_id: number | null;
        entregable_planeado: string | null;
        tiene_evaluacion_financiera: boolean;
        justificacion_sin_evaluacion: string | null;
        responsable_pm_id: number | null;
        link_acta_aprobacion: string | null;
        link_plan_proyecto: string | null;
        link_presentacion_puertas_3: string | null;
    }, ExtArgs["result"]["solicitudes_inversion"]>;
    composites: {};
};
export type solicitudes_inversionGetPayload<S extends boolean | null | undefined | solicitudes_inversionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$solicitudes_inversionPayload, S>;
export type solicitudes_inversionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<solicitudes_inversionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Solicitudes_inversionCountAggregateInputType | true;
};
export interface solicitudes_inversionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['solicitudes_inversion'];
        meta: {
            name: 'solicitudes_inversion';
        };
    };
    findUnique<T extends solicitudes_inversionFindUniqueArgs>(args: Prisma.SelectSubset<T, solicitudes_inversionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__solicitudes_inversionClient<runtime.Types.Result.GetResult<Prisma.$solicitudes_inversionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends solicitudes_inversionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, solicitudes_inversionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__solicitudes_inversionClient<runtime.Types.Result.GetResult<Prisma.$solicitudes_inversionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends solicitudes_inversionFindFirstArgs>(args?: Prisma.SelectSubset<T, solicitudes_inversionFindFirstArgs<ExtArgs>>): Prisma.Prisma__solicitudes_inversionClient<runtime.Types.Result.GetResult<Prisma.$solicitudes_inversionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends solicitudes_inversionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, solicitudes_inversionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__solicitudes_inversionClient<runtime.Types.Result.GetResult<Prisma.$solicitudes_inversionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends solicitudes_inversionFindManyArgs>(args?: Prisma.SelectSubset<T, solicitudes_inversionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$solicitudes_inversionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends solicitudes_inversionCreateArgs>(args: Prisma.SelectSubset<T, solicitudes_inversionCreateArgs<ExtArgs>>): Prisma.Prisma__solicitudes_inversionClient<runtime.Types.Result.GetResult<Prisma.$solicitudes_inversionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends solicitudes_inversionCreateManyArgs>(args?: Prisma.SelectSubset<T, solicitudes_inversionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends solicitudes_inversionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, solicitudes_inversionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$solicitudes_inversionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends solicitudes_inversionDeleteArgs>(args: Prisma.SelectSubset<T, solicitudes_inversionDeleteArgs<ExtArgs>>): Prisma.Prisma__solicitudes_inversionClient<runtime.Types.Result.GetResult<Prisma.$solicitudes_inversionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends solicitudes_inversionUpdateArgs>(args: Prisma.SelectSubset<T, solicitudes_inversionUpdateArgs<ExtArgs>>): Prisma.Prisma__solicitudes_inversionClient<runtime.Types.Result.GetResult<Prisma.$solicitudes_inversionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends solicitudes_inversionDeleteManyArgs>(args?: Prisma.SelectSubset<T, solicitudes_inversionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends solicitudes_inversionUpdateManyArgs>(args: Prisma.SelectSubset<T, solicitudes_inversionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends solicitudes_inversionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, solicitudes_inversionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$solicitudes_inversionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends solicitudes_inversionUpsertArgs>(args: Prisma.SelectSubset<T, solicitudes_inversionUpsertArgs<ExtArgs>>): Prisma.Prisma__solicitudes_inversionClient<runtime.Types.Result.GetResult<Prisma.$solicitudes_inversionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends solicitudes_inversionCountArgs>(args?: Prisma.Subset<T, solicitudes_inversionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Solicitudes_inversionCountAggregateOutputType> : number>;
    aggregate<T extends Solicitudes_inversionAggregateArgs>(args: Prisma.Subset<T, Solicitudes_inversionAggregateArgs>): Prisma.PrismaPromise<GetSolicitudes_inversionAggregateType<T>>;
    groupBy<T extends solicitudes_inversionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: solicitudes_inversionGroupByArgs['orderBy'];
    } : {
        orderBy?: solicitudes_inversionGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, solicitudes_inversionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSolicitudes_inversionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: solicitudes_inversionFieldRefs;
}
export interface Prisma__solicitudes_inversionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    solicitud_evaluacion_financiera<T extends Prisma.solicitudes_inversion$solicitud_evaluacion_financieraArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.solicitudes_inversion$solicitud_evaluacion_financieraArgs<ExtArgs>>): Prisma.Prisma__solicitud_evaluacion_financieraClient<runtime.Types.Result.GetResult<Prisma.$solicitud_evaluacion_financieraPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    solicitud_flujo_caja<T extends Prisma.solicitudes_inversion$solicitud_flujo_cajaArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.solicitudes_inversion$solicitud_flujo_cajaArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$solicitud_flujo_cajaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    solicitud_metas<T extends Prisma.solicitudes_inversion$solicitud_metasArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.solicitudes_inversion$solicitud_metasArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$solicitud_metasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    solicitud_valores<T extends Prisma.solicitudes_inversion$solicitud_valoresArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.solicitudes_inversion$solicitud_valoresArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$solicitud_valoresPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    procesos<T extends Prisma.solicitudes_inversion$procesosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.solicitudes_inversion$procesosArgs<ExtArgs>>): Prisma.Prisma__procesosClient<runtime.Types.Result.GetResult<Prisma.$procesosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    usuarios<T extends Prisma.solicitudes_inversion$usuariosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.solicitudes_inversion$usuariosArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    subprogramas<T extends Prisma.solicitudes_inversion$subprogramasArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.solicitudes_inversion$subprogramasArgs<ExtArgs>>): Prisma.Prisma__subprogramasClient<runtime.Types.Result.GetResult<Prisma.$subprogramasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface solicitudes_inversionFieldRefs {
    readonly id: Prisma.FieldRef<"solicitudes_inversion", 'Int'>;
    readonly proceso_id: Prisma.FieldRef<"solicitudes_inversion", 'Int'>;
    readonly subprograma_id: Prisma.FieldRef<"solicitudes_inversion", 'Int'>;
    readonly entregable_planeado: Prisma.FieldRef<"solicitudes_inversion", 'String'>;
    readonly tiene_evaluacion_financiera: Prisma.FieldRef<"solicitudes_inversion", 'Boolean'>;
    readonly justificacion_sin_evaluacion: Prisma.FieldRef<"solicitudes_inversion", 'String'>;
    readonly responsable_pm_id: Prisma.FieldRef<"solicitudes_inversion", 'Int'>;
    readonly link_acta_aprobacion: Prisma.FieldRef<"solicitudes_inversion", 'String'>;
    readonly link_plan_proyecto: Prisma.FieldRef<"solicitudes_inversion", 'String'>;
    readonly link_presentacion_puertas_3: Prisma.FieldRef<"solicitudes_inversion", 'String'>;
}
export type solicitudes_inversionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitudes_inversionSelect<ExtArgs> | null;
    omit?: Prisma.solicitudes_inversionOmit<ExtArgs> | null;
    include?: Prisma.solicitudes_inversionInclude<ExtArgs> | null;
    where: Prisma.solicitudes_inversionWhereUniqueInput;
};
export type solicitudes_inversionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitudes_inversionSelect<ExtArgs> | null;
    omit?: Prisma.solicitudes_inversionOmit<ExtArgs> | null;
    include?: Prisma.solicitudes_inversionInclude<ExtArgs> | null;
    where: Prisma.solicitudes_inversionWhereUniqueInput;
};
export type solicitudes_inversionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitudes_inversionSelect<ExtArgs> | null;
    omit?: Prisma.solicitudes_inversionOmit<ExtArgs> | null;
    include?: Prisma.solicitudes_inversionInclude<ExtArgs> | null;
    where?: Prisma.solicitudes_inversionWhereInput;
    orderBy?: Prisma.solicitudes_inversionOrderByWithRelationInput | Prisma.solicitudes_inversionOrderByWithRelationInput[];
    cursor?: Prisma.solicitudes_inversionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Solicitudes_inversionScalarFieldEnum | Prisma.Solicitudes_inversionScalarFieldEnum[];
};
export type solicitudes_inversionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitudes_inversionSelect<ExtArgs> | null;
    omit?: Prisma.solicitudes_inversionOmit<ExtArgs> | null;
    include?: Prisma.solicitudes_inversionInclude<ExtArgs> | null;
    where?: Prisma.solicitudes_inversionWhereInput;
    orderBy?: Prisma.solicitudes_inversionOrderByWithRelationInput | Prisma.solicitudes_inversionOrderByWithRelationInput[];
    cursor?: Prisma.solicitudes_inversionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Solicitudes_inversionScalarFieldEnum | Prisma.Solicitudes_inversionScalarFieldEnum[];
};
export type solicitudes_inversionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitudes_inversionSelect<ExtArgs> | null;
    omit?: Prisma.solicitudes_inversionOmit<ExtArgs> | null;
    include?: Prisma.solicitudes_inversionInclude<ExtArgs> | null;
    where?: Prisma.solicitudes_inversionWhereInput;
    orderBy?: Prisma.solicitudes_inversionOrderByWithRelationInput | Prisma.solicitudes_inversionOrderByWithRelationInput[];
    cursor?: Prisma.solicitudes_inversionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Solicitudes_inversionScalarFieldEnum | Prisma.Solicitudes_inversionScalarFieldEnum[];
};
export type solicitudes_inversionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitudes_inversionSelect<ExtArgs> | null;
    omit?: Prisma.solicitudes_inversionOmit<ExtArgs> | null;
    include?: Prisma.solicitudes_inversionInclude<ExtArgs> | null;
    data?: Prisma.XOR<Prisma.solicitudes_inversionCreateInput, Prisma.solicitudes_inversionUncheckedCreateInput>;
};
export type solicitudes_inversionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.solicitudes_inversionCreateManyInput | Prisma.solicitudes_inversionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type solicitudes_inversionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitudes_inversionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.solicitudes_inversionOmit<ExtArgs> | null;
    data: Prisma.solicitudes_inversionCreateManyInput | Prisma.solicitudes_inversionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.solicitudes_inversionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type solicitudes_inversionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitudes_inversionSelect<ExtArgs> | null;
    omit?: Prisma.solicitudes_inversionOmit<ExtArgs> | null;
    include?: Prisma.solicitudes_inversionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.solicitudes_inversionUpdateInput, Prisma.solicitudes_inversionUncheckedUpdateInput>;
    where: Prisma.solicitudes_inversionWhereUniqueInput;
};
export type solicitudes_inversionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.solicitudes_inversionUpdateManyMutationInput, Prisma.solicitudes_inversionUncheckedUpdateManyInput>;
    where?: Prisma.solicitudes_inversionWhereInput;
    limit?: number;
};
export type solicitudes_inversionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitudes_inversionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.solicitudes_inversionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.solicitudes_inversionUpdateManyMutationInput, Prisma.solicitudes_inversionUncheckedUpdateManyInput>;
    where?: Prisma.solicitudes_inversionWhereInput;
    limit?: number;
    include?: Prisma.solicitudes_inversionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type solicitudes_inversionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitudes_inversionSelect<ExtArgs> | null;
    omit?: Prisma.solicitudes_inversionOmit<ExtArgs> | null;
    include?: Prisma.solicitudes_inversionInclude<ExtArgs> | null;
    where: Prisma.solicitudes_inversionWhereUniqueInput;
    create: Prisma.XOR<Prisma.solicitudes_inversionCreateInput, Prisma.solicitudes_inversionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.solicitudes_inversionUpdateInput, Prisma.solicitudes_inversionUncheckedUpdateInput>;
};
export type solicitudes_inversionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitudes_inversionSelect<ExtArgs> | null;
    omit?: Prisma.solicitudes_inversionOmit<ExtArgs> | null;
    include?: Prisma.solicitudes_inversionInclude<ExtArgs> | null;
    where: Prisma.solicitudes_inversionWhereUniqueInput;
};
export type solicitudes_inversionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.solicitudes_inversionWhereInput;
    limit?: number;
};
export type solicitudes_inversion$solicitud_evaluacion_financieraArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_evaluacion_financieraSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_evaluacion_financieraOmit<ExtArgs> | null;
    include?: Prisma.solicitud_evaluacion_financieraInclude<ExtArgs> | null;
    where?: Prisma.solicitud_evaluacion_financieraWhereInput;
};
export type solicitudes_inversion$solicitud_flujo_cajaArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_flujo_cajaSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_flujo_cajaOmit<ExtArgs> | null;
    include?: Prisma.solicitud_flujo_cajaInclude<ExtArgs> | null;
    where?: Prisma.solicitud_flujo_cajaWhereInput;
    orderBy?: Prisma.solicitud_flujo_cajaOrderByWithRelationInput | Prisma.solicitud_flujo_cajaOrderByWithRelationInput[];
    cursor?: Prisma.solicitud_flujo_cajaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Solicitud_flujo_cajaScalarFieldEnum | Prisma.Solicitud_flujo_cajaScalarFieldEnum[];
};
export type solicitudes_inversion$solicitud_metasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_metasSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_metasOmit<ExtArgs> | null;
    include?: Prisma.solicitud_metasInclude<ExtArgs> | null;
    where?: Prisma.solicitud_metasWhereInput;
    orderBy?: Prisma.solicitud_metasOrderByWithRelationInput | Prisma.solicitud_metasOrderByWithRelationInput[];
    cursor?: Prisma.solicitud_metasWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Solicitud_metasScalarFieldEnum | Prisma.Solicitud_metasScalarFieldEnum[];
};
export type solicitudes_inversion$solicitud_valoresArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_valoresSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_valoresOmit<ExtArgs> | null;
    include?: Prisma.solicitud_valoresInclude<ExtArgs> | null;
    where?: Prisma.solicitud_valoresWhereInput;
    orderBy?: Prisma.solicitud_valoresOrderByWithRelationInput | Prisma.solicitud_valoresOrderByWithRelationInput[];
    cursor?: Prisma.solicitud_valoresWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Solicitud_valoresScalarFieldEnum | Prisma.Solicitud_valoresScalarFieldEnum[];
};
export type solicitudes_inversion$procesosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.procesosSelect<ExtArgs> | null;
    omit?: Prisma.procesosOmit<ExtArgs> | null;
    include?: Prisma.procesosInclude<ExtArgs> | null;
    where?: Prisma.procesosWhereInput;
};
export type solicitudes_inversion$usuariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usuariosSelect<ExtArgs> | null;
    omit?: Prisma.usuariosOmit<ExtArgs> | null;
    include?: Prisma.usuariosInclude<ExtArgs> | null;
    where?: Prisma.usuariosWhereInput;
};
export type solicitudes_inversion$subprogramasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.subprogramasSelect<ExtArgs> | null;
    omit?: Prisma.subprogramasOmit<ExtArgs> | null;
    include?: Prisma.subprogramasInclude<ExtArgs> | null;
    where?: Prisma.subprogramasWhereInput;
};
export type solicitudes_inversionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitudes_inversionSelect<ExtArgs> | null;
    omit?: Prisma.solicitudes_inversionOmit<ExtArgs> | null;
    include?: Prisma.solicitudes_inversionInclude<ExtArgs> | null;
};
