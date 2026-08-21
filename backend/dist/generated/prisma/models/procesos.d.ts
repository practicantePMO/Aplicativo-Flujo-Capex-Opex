import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type procesosModel = runtime.Types.Result.DefaultSelection<Prisma.$procesosPayload>;
export type AggregateProcesos = {
    _count: ProcesosCountAggregateOutputType | null;
    _avg: ProcesosAvgAggregateOutputType | null;
    _sum: ProcesosSumAggregateOutputType | null;
    _min: ProcesosMinAggregateOutputType | null;
    _max: ProcesosMaxAggregateOutputType | null;
};
export type ProcesosAvgAggregateOutputType = {
    id: number | null;
};
export type ProcesosSumAggregateOutputType = {
    id: number | null;
};
export type ProcesosMinAggregateOutputType = {
    id: number | null;
    proyecto_id: string | null;
    tipo_proceso: string | null;
    estado_actual: string | null;
    fecha_creacion: Date | null;
    eliminado_el: Date | null;
};
export type ProcesosMaxAggregateOutputType = {
    id: number | null;
    proyecto_id: string | null;
    tipo_proceso: string | null;
    estado_actual: string | null;
    fecha_creacion: Date | null;
    eliminado_el: Date | null;
};
export type ProcesosCountAggregateOutputType = {
    id: number;
    proyecto_id: number;
    tipo_proceso: number;
    estado_actual: number;
    fecha_creacion: number;
    eliminado_el: number;
    _all: number;
};
export type ProcesosAvgAggregateInputType = {
    id?: true;
};
export type ProcesosSumAggregateInputType = {
    id?: true;
};
export type ProcesosMinAggregateInputType = {
    id?: true;
    proyecto_id?: true;
    tipo_proceso?: true;
    estado_actual?: true;
    fecha_creacion?: true;
    eliminado_el?: true;
};
export type ProcesosMaxAggregateInputType = {
    id?: true;
    proyecto_id?: true;
    tipo_proceso?: true;
    estado_actual?: true;
    fecha_creacion?: true;
    eliminado_el?: true;
};
export type ProcesosCountAggregateInputType = {
    id?: true;
    proyecto_id?: true;
    tipo_proceso?: true;
    estado_actual?: true;
    fecha_creacion?: true;
    eliminado_el?: true;
    _all?: true;
};
export type ProcesosAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.procesosWhereInput;
    orderBy?: Prisma.procesosOrderByWithRelationInput | Prisma.procesosOrderByWithRelationInput[];
    cursor?: Prisma.procesosWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProcesosCountAggregateInputType;
    _avg?: ProcesosAvgAggregateInputType;
    _sum?: ProcesosSumAggregateInputType;
    _min?: ProcesosMinAggregateInputType;
    _max?: ProcesosMaxAggregateInputType;
};
export type GetProcesosAggregateType<T extends ProcesosAggregateArgs> = {
    [P in keyof T & keyof AggregateProcesos]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProcesos[P]> : Prisma.GetScalarType<T[P], AggregateProcesos[P]>;
};
export type procesosGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.procesosWhereInput;
    orderBy?: Prisma.procesosOrderByWithAggregationInput | Prisma.procesosOrderByWithAggregationInput[];
    by: Prisma.ProcesosScalarFieldEnum[] | Prisma.ProcesosScalarFieldEnum;
    having?: Prisma.procesosScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProcesosCountAggregateInputType | true;
    _avg?: ProcesosAvgAggregateInputType;
    _sum?: ProcesosSumAggregateInputType;
    _min?: ProcesosMinAggregateInputType;
    _max?: ProcesosMaxAggregateInputType;
};
export type ProcesosGroupByOutputType = {
    id: number;
    proyecto_id: string | null;
    tipo_proceso: string;
    estado_actual: string;
    fecha_creacion: Date | null;
    eliminado_el: Date | null;
    _count: ProcesosCountAggregateOutputType | null;
    _avg: ProcesosAvgAggregateOutputType | null;
    _sum: ProcesosSumAggregateOutputType | null;
    _min: ProcesosMinAggregateOutputType | null;
    _max: ProcesosMaxAggregateOutputType | null;
};
export type GetProcesosGroupByPayload<T extends procesosGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProcesosGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProcesosGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProcesosGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProcesosGroupByOutputType[P]>;
}>>;
export type procesosWhereInput = {
    AND?: Prisma.procesosWhereInput | Prisma.procesosWhereInput[];
    OR?: Prisma.procesosWhereInput[];
    NOT?: Prisma.procesosWhereInput | Prisma.procesosWhereInput[];
    id?: Prisma.IntFilter<"procesos"> | number;
    proyecto_id?: Prisma.StringNullableFilter<"procesos"> | string | null;
    tipo_proceso?: Prisma.StringFilter<"procesos"> | string;
    estado_actual?: Prisma.StringFilter<"procesos"> | string;
    fecha_creacion?: Prisma.DateTimeNullableFilter<"procesos"> | Date | string | null;
    eliminado_el?: Prisma.DateTimeNullableFilter<"procesos"> | Date | string | null;
    asignaciones_proceso?: Prisma.Asignaciones_procesoListRelationFilter;
    historico_aprobaciones?: Prisma.Historico_aprobacionesListRelationFilter;
    proyectos?: Prisma.XOR<Prisma.ProyectosNullableScalarRelationFilter, Prisma.proyectosWhereInput> | null;
    solicitudes_inversion?: Prisma.XOR<Prisma.Solicitudes_inversionNullableScalarRelationFilter, Prisma.solicitudes_inversionWhereInput> | null;
};
export type procesosOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    proyecto_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    tipo_proceso?: Prisma.SortOrder;
    estado_actual?: Prisma.SortOrder;
    fecha_creacion?: Prisma.SortOrderInput | Prisma.SortOrder;
    eliminado_el?: Prisma.SortOrderInput | Prisma.SortOrder;
    asignaciones_proceso?: Prisma.asignaciones_procesoOrderByRelationAggregateInput;
    historico_aprobaciones?: Prisma.historico_aprobacionesOrderByRelationAggregateInput;
    proyectos?: Prisma.proyectosOrderByWithRelationInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionOrderByWithRelationInput;
};
export type procesosWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.procesosWhereInput | Prisma.procesosWhereInput[];
    OR?: Prisma.procesosWhereInput[];
    NOT?: Prisma.procesosWhereInput | Prisma.procesosWhereInput[];
    proyecto_id?: Prisma.StringNullableFilter<"procesos"> | string | null;
    tipo_proceso?: Prisma.StringFilter<"procesos"> | string;
    estado_actual?: Prisma.StringFilter<"procesos"> | string;
    fecha_creacion?: Prisma.DateTimeNullableFilter<"procesos"> | Date | string | null;
    eliminado_el?: Prisma.DateTimeNullableFilter<"procesos"> | Date | string | null;
    asignaciones_proceso?: Prisma.Asignaciones_procesoListRelationFilter;
    historico_aprobaciones?: Prisma.Historico_aprobacionesListRelationFilter;
    proyectos?: Prisma.XOR<Prisma.ProyectosNullableScalarRelationFilter, Prisma.proyectosWhereInput> | null;
    solicitudes_inversion?: Prisma.XOR<Prisma.Solicitudes_inversionNullableScalarRelationFilter, Prisma.solicitudes_inversionWhereInput> | null;
}, "id">;
export type procesosOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    proyecto_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    tipo_proceso?: Prisma.SortOrder;
    estado_actual?: Prisma.SortOrder;
    fecha_creacion?: Prisma.SortOrderInput | Prisma.SortOrder;
    eliminado_el?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.procesosCountOrderByAggregateInput;
    _avg?: Prisma.procesosAvgOrderByAggregateInput;
    _max?: Prisma.procesosMaxOrderByAggregateInput;
    _min?: Prisma.procesosMinOrderByAggregateInput;
    _sum?: Prisma.procesosSumOrderByAggregateInput;
};
export type procesosScalarWhereWithAggregatesInput = {
    AND?: Prisma.procesosScalarWhereWithAggregatesInput | Prisma.procesosScalarWhereWithAggregatesInput[];
    OR?: Prisma.procesosScalarWhereWithAggregatesInput[];
    NOT?: Prisma.procesosScalarWhereWithAggregatesInput | Prisma.procesosScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"procesos"> | number;
    proyecto_id?: Prisma.StringNullableWithAggregatesFilter<"procesos"> | string | null;
    tipo_proceso?: Prisma.StringWithAggregatesFilter<"procesos"> | string;
    estado_actual?: Prisma.StringWithAggregatesFilter<"procesos"> | string;
    fecha_creacion?: Prisma.DateTimeNullableWithAggregatesFilter<"procesos"> | Date | string | null;
    eliminado_el?: Prisma.DateTimeNullableWithAggregatesFilter<"procesos"> | Date | string | null;
};
export type procesosCreateInput = {
    tipo_proceso: string;
    estado_actual?: string;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoCreateNestedManyWithoutProcesosInput;
    historico_aprobaciones?: Prisma.historico_aprobacionesCreateNestedManyWithoutProcesosInput;
    proyectos?: Prisma.proyectosCreateNestedOneWithoutProcesosInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionCreateNestedOneWithoutProcesosInput;
};
export type procesosUncheckedCreateInput = {
    id?: number;
    proyecto_id?: string | null;
    tipo_proceso: string;
    estado_actual?: string;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoUncheckedCreateNestedManyWithoutProcesosInput;
    historico_aprobaciones?: Prisma.historico_aprobacionesUncheckedCreateNestedManyWithoutProcesosInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionUncheckedCreateNestedOneWithoutProcesosInput;
};
export type procesosUpdateInput = {
    tipo_proceso?: Prisma.StringFieldUpdateOperationsInput | string;
    estado_actual?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoUpdateManyWithoutProcesosNestedInput;
    historico_aprobaciones?: Prisma.historico_aprobacionesUpdateManyWithoutProcesosNestedInput;
    proyectos?: Prisma.proyectosUpdateOneWithoutProcesosNestedInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionUpdateOneWithoutProcesosNestedInput;
};
export type procesosUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    proyecto_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo_proceso?: Prisma.StringFieldUpdateOperationsInput | string;
    estado_actual?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoUncheckedUpdateManyWithoutProcesosNestedInput;
    historico_aprobaciones?: Prisma.historico_aprobacionesUncheckedUpdateManyWithoutProcesosNestedInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionUncheckedUpdateOneWithoutProcesosNestedInput;
};
export type procesosCreateManyInput = {
    id?: number;
    proyecto_id?: string | null;
    tipo_proceso: string;
    estado_actual?: string;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
};
export type procesosUpdateManyMutationInput = {
    tipo_proceso?: Prisma.StringFieldUpdateOperationsInput | string;
    estado_actual?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type procesosUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    proyecto_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo_proceso?: Prisma.StringFieldUpdateOperationsInput | string;
    estado_actual?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ProcesosNullableScalarRelationFilter = {
    is?: Prisma.procesosWhereInput | null;
    isNot?: Prisma.procesosWhereInput | null;
};
export type procesosCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    proyecto_id?: Prisma.SortOrder;
    tipo_proceso?: Prisma.SortOrder;
    estado_actual?: Prisma.SortOrder;
    fecha_creacion?: Prisma.SortOrder;
    eliminado_el?: Prisma.SortOrder;
};
export type procesosAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type procesosMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    proyecto_id?: Prisma.SortOrder;
    tipo_proceso?: Prisma.SortOrder;
    estado_actual?: Prisma.SortOrder;
    fecha_creacion?: Prisma.SortOrder;
    eliminado_el?: Prisma.SortOrder;
};
export type procesosMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    proyecto_id?: Prisma.SortOrder;
    tipo_proceso?: Prisma.SortOrder;
    estado_actual?: Prisma.SortOrder;
    fecha_creacion?: Prisma.SortOrder;
    eliminado_el?: Prisma.SortOrder;
};
export type procesosSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type ProcesosListRelationFilter = {
    every?: Prisma.procesosWhereInput;
    some?: Prisma.procesosWhereInput;
    none?: Prisma.procesosWhereInput;
};
export type procesosOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type procesosCreateNestedOneWithoutAsignaciones_procesoInput = {
    create?: Prisma.XOR<Prisma.procesosCreateWithoutAsignaciones_procesoInput, Prisma.procesosUncheckedCreateWithoutAsignaciones_procesoInput>;
    connectOrCreate?: Prisma.procesosCreateOrConnectWithoutAsignaciones_procesoInput;
    connect?: Prisma.procesosWhereUniqueInput;
};
export type procesosUpdateOneWithoutAsignaciones_procesoNestedInput = {
    create?: Prisma.XOR<Prisma.procesosCreateWithoutAsignaciones_procesoInput, Prisma.procesosUncheckedCreateWithoutAsignaciones_procesoInput>;
    connectOrCreate?: Prisma.procesosCreateOrConnectWithoutAsignaciones_procesoInput;
    upsert?: Prisma.procesosUpsertWithoutAsignaciones_procesoInput;
    disconnect?: Prisma.procesosWhereInput | boolean;
    delete?: Prisma.procesosWhereInput | boolean;
    connect?: Prisma.procesosWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.procesosUpdateToOneWithWhereWithoutAsignaciones_procesoInput, Prisma.procesosUpdateWithoutAsignaciones_procesoInput>, Prisma.procesosUncheckedUpdateWithoutAsignaciones_procesoInput>;
};
export type procesosCreateNestedOneWithoutHistorico_aprobacionesInput = {
    create?: Prisma.XOR<Prisma.procesosCreateWithoutHistorico_aprobacionesInput, Prisma.procesosUncheckedCreateWithoutHistorico_aprobacionesInput>;
    connectOrCreate?: Prisma.procesosCreateOrConnectWithoutHistorico_aprobacionesInput;
    connect?: Prisma.procesosWhereUniqueInput;
};
export type procesosUpdateOneWithoutHistorico_aprobacionesNestedInput = {
    create?: Prisma.XOR<Prisma.procesosCreateWithoutHistorico_aprobacionesInput, Prisma.procesosUncheckedCreateWithoutHistorico_aprobacionesInput>;
    connectOrCreate?: Prisma.procesosCreateOrConnectWithoutHistorico_aprobacionesInput;
    upsert?: Prisma.procesosUpsertWithoutHistorico_aprobacionesInput;
    disconnect?: Prisma.procesosWhereInput | boolean;
    delete?: Prisma.procesosWhereInput | boolean;
    connect?: Prisma.procesosWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.procesosUpdateToOneWithWhereWithoutHistorico_aprobacionesInput, Prisma.procesosUpdateWithoutHistorico_aprobacionesInput>, Prisma.procesosUncheckedUpdateWithoutHistorico_aprobacionesInput>;
};
export type procesosCreateNestedManyWithoutProyectosInput = {
    create?: Prisma.XOR<Prisma.procesosCreateWithoutProyectosInput, Prisma.procesosUncheckedCreateWithoutProyectosInput> | Prisma.procesosCreateWithoutProyectosInput[] | Prisma.procesosUncheckedCreateWithoutProyectosInput[];
    connectOrCreate?: Prisma.procesosCreateOrConnectWithoutProyectosInput | Prisma.procesosCreateOrConnectWithoutProyectosInput[];
    createMany?: Prisma.procesosCreateManyProyectosInputEnvelope;
    connect?: Prisma.procesosWhereUniqueInput | Prisma.procesosWhereUniqueInput[];
};
export type procesosUncheckedCreateNestedManyWithoutProyectosInput = {
    create?: Prisma.XOR<Prisma.procesosCreateWithoutProyectosInput, Prisma.procesosUncheckedCreateWithoutProyectosInput> | Prisma.procesosCreateWithoutProyectosInput[] | Prisma.procesosUncheckedCreateWithoutProyectosInput[];
    connectOrCreate?: Prisma.procesosCreateOrConnectWithoutProyectosInput | Prisma.procesosCreateOrConnectWithoutProyectosInput[];
    createMany?: Prisma.procesosCreateManyProyectosInputEnvelope;
    connect?: Prisma.procesosWhereUniqueInput | Prisma.procesosWhereUniqueInput[];
};
export type procesosUpdateManyWithoutProyectosNestedInput = {
    create?: Prisma.XOR<Prisma.procesosCreateWithoutProyectosInput, Prisma.procesosUncheckedCreateWithoutProyectosInput> | Prisma.procesosCreateWithoutProyectosInput[] | Prisma.procesosUncheckedCreateWithoutProyectosInput[];
    connectOrCreate?: Prisma.procesosCreateOrConnectWithoutProyectosInput | Prisma.procesosCreateOrConnectWithoutProyectosInput[];
    upsert?: Prisma.procesosUpsertWithWhereUniqueWithoutProyectosInput | Prisma.procesosUpsertWithWhereUniqueWithoutProyectosInput[];
    createMany?: Prisma.procesosCreateManyProyectosInputEnvelope;
    set?: Prisma.procesosWhereUniqueInput | Prisma.procesosWhereUniqueInput[];
    disconnect?: Prisma.procesosWhereUniqueInput | Prisma.procesosWhereUniqueInput[];
    delete?: Prisma.procesosWhereUniqueInput | Prisma.procesosWhereUniqueInput[];
    connect?: Prisma.procesosWhereUniqueInput | Prisma.procesosWhereUniqueInput[];
    update?: Prisma.procesosUpdateWithWhereUniqueWithoutProyectosInput | Prisma.procesosUpdateWithWhereUniqueWithoutProyectosInput[];
    updateMany?: Prisma.procesosUpdateManyWithWhereWithoutProyectosInput | Prisma.procesosUpdateManyWithWhereWithoutProyectosInput[];
    deleteMany?: Prisma.procesosScalarWhereInput | Prisma.procesosScalarWhereInput[];
};
export type procesosUncheckedUpdateManyWithoutProyectosNestedInput = {
    create?: Prisma.XOR<Prisma.procesosCreateWithoutProyectosInput, Prisma.procesosUncheckedCreateWithoutProyectosInput> | Prisma.procesosCreateWithoutProyectosInput[] | Prisma.procesosUncheckedCreateWithoutProyectosInput[];
    connectOrCreate?: Prisma.procesosCreateOrConnectWithoutProyectosInput | Prisma.procesosCreateOrConnectWithoutProyectosInput[];
    upsert?: Prisma.procesosUpsertWithWhereUniqueWithoutProyectosInput | Prisma.procesosUpsertWithWhereUniqueWithoutProyectosInput[];
    createMany?: Prisma.procesosCreateManyProyectosInputEnvelope;
    set?: Prisma.procesosWhereUniqueInput | Prisma.procesosWhereUniqueInput[];
    disconnect?: Prisma.procesosWhereUniqueInput | Prisma.procesosWhereUniqueInput[];
    delete?: Prisma.procesosWhereUniqueInput | Prisma.procesosWhereUniqueInput[];
    connect?: Prisma.procesosWhereUniqueInput | Prisma.procesosWhereUniqueInput[];
    update?: Prisma.procesosUpdateWithWhereUniqueWithoutProyectosInput | Prisma.procesosUpdateWithWhereUniqueWithoutProyectosInput[];
    updateMany?: Prisma.procesosUpdateManyWithWhereWithoutProyectosInput | Prisma.procesosUpdateManyWithWhereWithoutProyectosInput[];
    deleteMany?: Prisma.procesosScalarWhereInput | Prisma.procesosScalarWhereInput[];
};
export type procesosCreateNestedOneWithoutSolicitudes_inversionInput = {
    create?: Prisma.XOR<Prisma.procesosCreateWithoutSolicitudes_inversionInput, Prisma.procesosUncheckedCreateWithoutSolicitudes_inversionInput>;
    connectOrCreate?: Prisma.procesosCreateOrConnectWithoutSolicitudes_inversionInput;
    connect?: Prisma.procesosWhereUniqueInput;
};
export type procesosUpdateOneWithoutSolicitudes_inversionNestedInput = {
    create?: Prisma.XOR<Prisma.procesosCreateWithoutSolicitudes_inversionInput, Prisma.procesosUncheckedCreateWithoutSolicitudes_inversionInput>;
    connectOrCreate?: Prisma.procesosCreateOrConnectWithoutSolicitudes_inversionInput;
    upsert?: Prisma.procesosUpsertWithoutSolicitudes_inversionInput;
    disconnect?: Prisma.procesosWhereInput | boolean;
    delete?: Prisma.procesosWhereInput | boolean;
    connect?: Prisma.procesosWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.procesosUpdateToOneWithWhereWithoutSolicitudes_inversionInput, Prisma.procesosUpdateWithoutSolicitudes_inversionInput>, Prisma.procesosUncheckedUpdateWithoutSolicitudes_inversionInput>;
};
export type procesosCreateWithoutAsignaciones_procesoInput = {
    tipo_proceso: string;
    estado_actual?: string;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
    historico_aprobaciones?: Prisma.historico_aprobacionesCreateNestedManyWithoutProcesosInput;
    proyectos?: Prisma.proyectosCreateNestedOneWithoutProcesosInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionCreateNestedOneWithoutProcesosInput;
};
export type procesosUncheckedCreateWithoutAsignaciones_procesoInput = {
    id?: number;
    proyecto_id?: string | null;
    tipo_proceso: string;
    estado_actual?: string;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
    historico_aprobaciones?: Prisma.historico_aprobacionesUncheckedCreateNestedManyWithoutProcesosInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionUncheckedCreateNestedOneWithoutProcesosInput;
};
export type procesosCreateOrConnectWithoutAsignaciones_procesoInput = {
    where: Prisma.procesosWhereUniqueInput;
    create: Prisma.XOR<Prisma.procesosCreateWithoutAsignaciones_procesoInput, Prisma.procesosUncheckedCreateWithoutAsignaciones_procesoInput>;
};
export type procesosUpsertWithoutAsignaciones_procesoInput = {
    update: Prisma.XOR<Prisma.procesosUpdateWithoutAsignaciones_procesoInput, Prisma.procesosUncheckedUpdateWithoutAsignaciones_procesoInput>;
    create: Prisma.XOR<Prisma.procesosCreateWithoutAsignaciones_procesoInput, Prisma.procesosUncheckedCreateWithoutAsignaciones_procesoInput>;
    where?: Prisma.procesosWhereInput;
};
export type procesosUpdateToOneWithWhereWithoutAsignaciones_procesoInput = {
    where?: Prisma.procesosWhereInput;
    data: Prisma.XOR<Prisma.procesosUpdateWithoutAsignaciones_procesoInput, Prisma.procesosUncheckedUpdateWithoutAsignaciones_procesoInput>;
};
export type procesosUpdateWithoutAsignaciones_procesoInput = {
    tipo_proceso?: Prisma.StringFieldUpdateOperationsInput | string;
    estado_actual?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    historico_aprobaciones?: Prisma.historico_aprobacionesUpdateManyWithoutProcesosNestedInput;
    proyectos?: Prisma.proyectosUpdateOneWithoutProcesosNestedInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionUpdateOneWithoutProcesosNestedInput;
};
export type procesosUncheckedUpdateWithoutAsignaciones_procesoInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    proyecto_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo_proceso?: Prisma.StringFieldUpdateOperationsInput | string;
    estado_actual?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    historico_aprobaciones?: Prisma.historico_aprobacionesUncheckedUpdateManyWithoutProcesosNestedInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionUncheckedUpdateOneWithoutProcesosNestedInput;
};
export type procesosCreateWithoutHistorico_aprobacionesInput = {
    tipo_proceso: string;
    estado_actual?: string;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoCreateNestedManyWithoutProcesosInput;
    proyectos?: Prisma.proyectosCreateNestedOneWithoutProcesosInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionCreateNestedOneWithoutProcesosInput;
};
export type procesosUncheckedCreateWithoutHistorico_aprobacionesInput = {
    id?: number;
    proyecto_id?: string | null;
    tipo_proceso: string;
    estado_actual?: string;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoUncheckedCreateNestedManyWithoutProcesosInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionUncheckedCreateNestedOneWithoutProcesosInput;
};
export type procesosCreateOrConnectWithoutHistorico_aprobacionesInput = {
    where: Prisma.procesosWhereUniqueInput;
    create: Prisma.XOR<Prisma.procesosCreateWithoutHistorico_aprobacionesInput, Prisma.procesosUncheckedCreateWithoutHistorico_aprobacionesInput>;
};
export type procesosUpsertWithoutHistorico_aprobacionesInput = {
    update: Prisma.XOR<Prisma.procesosUpdateWithoutHistorico_aprobacionesInput, Prisma.procesosUncheckedUpdateWithoutHistorico_aprobacionesInput>;
    create: Prisma.XOR<Prisma.procesosCreateWithoutHistorico_aprobacionesInput, Prisma.procesosUncheckedCreateWithoutHistorico_aprobacionesInput>;
    where?: Prisma.procesosWhereInput;
};
export type procesosUpdateToOneWithWhereWithoutHistorico_aprobacionesInput = {
    where?: Prisma.procesosWhereInput;
    data: Prisma.XOR<Prisma.procesosUpdateWithoutHistorico_aprobacionesInput, Prisma.procesosUncheckedUpdateWithoutHistorico_aprobacionesInput>;
};
export type procesosUpdateWithoutHistorico_aprobacionesInput = {
    tipo_proceso?: Prisma.StringFieldUpdateOperationsInput | string;
    estado_actual?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoUpdateManyWithoutProcesosNestedInput;
    proyectos?: Prisma.proyectosUpdateOneWithoutProcesosNestedInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionUpdateOneWithoutProcesosNestedInput;
};
export type procesosUncheckedUpdateWithoutHistorico_aprobacionesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    proyecto_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo_proceso?: Prisma.StringFieldUpdateOperationsInput | string;
    estado_actual?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoUncheckedUpdateManyWithoutProcesosNestedInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionUncheckedUpdateOneWithoutProcesosNestedInput;
};
export type procesosCreateWithoutProyectosInput = {
    tipo_proceso: string;
    estado_actual?: string;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoCreateNestedManyWithoutProcesosInput;
    historico_aprobaciones?: Prisma.historico_aprobacionesCreateNestedManyWithoutProcesosInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionCreateNestedOneWithoutProcesosInput;
};
export type procesosUncheckedCreateWithoutProyectosInput = {
    id?: number;
    tipo_proceso: string;
    estado_actual?: string;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoUncheckedCreateNestedManyWithoutProcesosInput;
    historico_aprobaciones?: Prisma.historico_aprobacionesUncheckedCreateNestedManyWithoutProcesosInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionUncheckedCreateNestedOneWithoutProcesosInput;
};
export type procesosCreateOrConnectWithoutProyectosInput = {
    where: Prisma.procesosWhereUniqueInput;
    create: Prisma.XOR<Prisma.procesosCreateWithoutProyectosInput, Prisma.procesosUncheckedCreateWithoutProyectosInput>;
};
export type procesosCreateManyProyectosInputEnvelope = {
    data: Prisma.procesosCreateManyProyectosInput | Prisma.procesosCreateManyProyectosInput[];
    skipDuplicates?: boolean;
};
export type procesosUpsertWithWhereUniqueWithoutProyectosInput = {
    where: Prisma.procesosWhereUniqueInput;
    update: Prisma.XOR<Prisma.procesosUpdateWithoutProyectosInput, Prisma.procesosUncheckedUpdateWithoutProyectosInput>;
    create: Prisma.XOR<Prisma.procesosCreateWithoutProyectosInput, Prisma.procesosUncheckedCreateWithoutProyectosInput>;
};
export type procesosUpdateWithWhereUniqueWithoutProyectosInput = {
    where: Prisma.procesosWhereUniqueInput;
    data: Prisma.XOR<Prisma.procesosUpdateWithoutProyectosInput, Prisma.procesosUncheckedUpdateWithoutProyectosInput>;
};
export type procesosUpdateManyWithWhereWithoutProyectosInput = {
    where: Prisma.procesosScalarWhereInput;
    data: Prisma.XOR<Prisma.procesosUpdateManyMutationInput, Prisma.procesosUncheckedUpdateManyWithoutProyectosInput>;
};
export type procesosScalarWhereInput = {
    AND?: Prisma.procesosScalarWhereInput | Prisma.procesosScalarWhereInput[];
    OR?: Prisma.procesosScalarWhereInput[];
    NOT?: Prisma.procesosScalarWhereInput | Prisma.procesosScalarWhereInput[];
    id?: Prisma.IntFilter<"procesos"> | number;
    proyecto_id?: Prisma.StringNullableFilter<"procesos"> | string | null;
    tipo_proceso?: Prisma.StringFilter<"procesos"> | string;
    estado_actual?: Prisma.StringFilter<"procesos"> | string;
    fecha_creacion?: Prisma.DateTimeNullableFilter<"procesos"> | Date | string | null;
    eliminado_el?: Prisma.DateTimeNullableFilter<"procesos"> | Date | string | null;
};
export type procesosCreateWithoutSolicitudes_inversionInput = {
    tipo_proceso: string;
    estado_actual?: string;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoCreateNestedManyWithoutProcesosInput;
    historico_aprobaciones?: Prisma.historico_aprobacionesCreateNestedManyWithoutProcesosInput;
    proyectos?: Prisma.proyectosCreateNestedOneWithoutProcesosInput;
};
export type procesosUncheckedCreateWithoutSolicitudes_inversionInput = {
    id?: number;
    proyecto_id?: string | null;
    tipo_proceso: string;
    estado_actual?: string;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoUncheckedCreateNestedManyWithoutProcesosInput;
    historico_aprobaciones?: Prisma.historico_aprobacionesUncheckedCreateNestedManyWithoutProcesosInput;
};
export type procesosCreateOrConnectWithoutSolicitudes_inversionInput = {
    where: Prisma.procesosWhereUniqueInput;
    create: Prisma.XOR<Prisma.procesosCreateWithoutSolicitudes_inversionInput, Prisma.procesosUncheckedCreateWithoutSolicitudes_inversionInput>;
};
export type procesosUpsertWithoutSolicitudes_inversionInput = {
    update: Prisma.XOR<Prisma.procesosUpdateWithoutSolicitudes_inversionInput, Prisma.procesosUncheckedUpdateWithoutSolicitudes_inversionInput>;
    create: Prisma.XOR<Prisma.procesosCreateWithoutSolicitudes_inversionInput, Prisma.procesosUncheckedCreateWithoutSolicitudes_inversionInput>;
    where?: Prisma.procesosWhereInput;
};
export type procesosUpdateToOneWithWhereWithoutSolicitudes_inversionInput = {
    where?: Prisma.procesosWhereInput;
    data: Prisma.XOR<Prisma.procesosUpdateWithoutSolicitudes_inversionInput, Prisma.procesosUncheckedUpdateWithoutSolicitudes_inversionInput>;
};
export type procesosUpdateWithoutSolicitudes_inversionInput = {
    tipo_proceso?: Prisma.StringFieldUpdateOperationsInput | string;
    estado_actual?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoUpdateManyWithoutProcesosNestedInput;
    historico_aprobaciones?: Prisma.historico_aprobacionesUpdateManyWithoutProcesosNestedInput;
    proyectos?: Prisma.proyectosUpdateOneWithoutProcesosNestedInput;
};
export type procesosUncheckedUpdateWithoutSolicitudes_inversionInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    proyecto_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tipo_proceso?: Prisma.StringFieldUpdateOperationsInput | string;
    estado_actual?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoUncheckedUpdateManyWithoutProcesosNestedInput;
    historico_aprobaciones?: Prisma.historico_aprobacionesUncheckedUpdateManyWithoutProcesosNestedInput;
};
export type procesosCreateManyProyectosInput = {
    id?: number;
    tipo_proceso: string;
    estado_actual?: string;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
};
export type procesosUpdateWithoutProyectosInput = {
    tipo_proceso?: Prisma.StringFieldUpdateOperationsInput | string;
    estado_actual?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoUpdateManyWithoutProcesosNestedInput;
    historico_aprobaciones?: Prisma.historico_aprobacionesUpdateManyWithoutProcesosNestedInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionUpdateOneWithoutProcesosNestedInput;
};
export type procesosUncheckedUpdateWithoutProyectosInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    tipo_proceso?: Prisma.StringFieldUpdateOperationsInput | string;
    estado_actual?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoUncheckedUpdateManyWithoutProcesosNestedInput;
    historico_aprobaciones?: Prisma.historico_aprobacionesUncheckedUpdateManyWithoutProcesosNestedInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionUncheckedUpdateOneWithoutProcesosNestedInput;
};
export type procesosUncheckedUpdateManyWithoutProyectosInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    tipo_proceso?: Prisma.StringFieldUpdateOperationsInput | string;
    estado_actual?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ProcesosCountOutputType = {
    asignaciones_proceso: number;
    historico_aprobaciones: number;
};
export type ProcesosCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    asignaciones_proceso?: boolean | ProcesosCountOutputTypeCountAsignaciones_procesoArgs;
    historico_aprobaciones?: boolean | ProcesosCountOutputTypeCountHistorico_aprobacionesArgs;
};
export type ProcesosCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProcesosCountOutputTypeSelect<ExtArgs> | null;
};
export type ProcesosCountOutputTypeCountAsignaciones_procesoArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.asignaciones_procesoWhereInput;
};
export type ProcesosCountOutputTypeCountHistorico_aprobacionesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.historico_aprobacionesWhereInput;
};
export type procesosSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    proyecto_id?: boolean;
    tipo_proceso?: boolean;
    estado_actual?: boolean;
    fecha_creacion?: boolean;
    eliminado_el?: boolean;
    asignaciones_proceso?: boolean | Prisma.procesos$asignaciones_procesoArgs<ExtArgs>;
    historico_aprobaciones?: boolean | Prisma.procesos$historico_aprobacionesArgs<ExtArgs>;
    proyectos?: boolean | Prisma.procesos$proyectosArgs<ExtArgs>;
    solicitudes_inversion?: boolean | Prisma.procesos$solicitudes_inversionArgs<ExtArgs>;
    _count?: boolean | Prisma.ProcesosCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["procesos"]>;
export type procesosSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    proyecto_id?: boolean;
    tipo_proceso?: boolean;
    estado_actual?: boolean;
    fecha_creacion?: boolean;
    eliminado_el?: boolean;
    proyectos?: boolean | Prisma.procesos$proyectosArgs<ExtArgs>;
}, ExtArgs["result"]["procesos"]>;
export type procesosSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    proyecto_id?: boolean;
    tipo_proceso?: boolean;
    estado_actual?: boolean;
    fecha_creacion?: boolean;
    eliminado_el?: boolean;
    proyectos?: boolean | Prisma.procesos$proyectosArgs<ExtArgs>;
}, ExtArgs["result"]["procesos"]>;
export type procesosSelectScalar = {
    id?: boolean;
    proyecto_id?: boolean;
    tipo_proceso?: boolean;
    estado_actual?: boolean;
    fecha_creacion?: boolean;
    eliminado_el?: boolean;
};
export type procesosOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "proyecto_id" | "tipo_proceso" | "estado_actual" | "fecha_creacion" | "eliminado_el", ExtArgs["result"]["procesos"]>;
export type procesosInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    asignaciones_proceso?: boolean | Prisma.procesos$asignaciones_procesoArgs<ExtArgs>;
    historico_aprobaciones?: boolean | Prisma.procesos$historico_aprobacionesArgs<ExtArgs>;
    proyectos?: boolean | Prisma.procesos$proyectosArgs<ExtArgs>;
    solicitudes_inversion?: boolean | Prisma.procesos$solicitudes_inversionArgs<ExtArgs>;
    _count?: boolean | Prisma.ProcesosCountOutputTypeDefaultArgs<ExtArgs>;
};
export type procesosIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    proyectos?: boolean | Prisma.procesos$proyectosArgs<ExtArgs>;
};
export type procesosIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    proyectos?: boolean | Prisma.procesos$proyectosArgs<ExtArgs>;
};
export type $procesosPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "procesos";
    objects: {
        asignaciones_proceso: Prisma.$asignaciones_procesoPayload<ExtArgs>[];
        historico_aprobaciones: Prisma.$historico_aprobacionesPayload<ExtArgs>[];
        proyectos: Prisma.$proyectosPayload<ExtArgs> | null;
        solicitudes_inversion: Prisma.$solicitudes_inversionPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        proyecto_id: string | null;
        tipo_proceso: string;
        estado_actual: string;
        fecha_creacion: Date | null;
        eliminado_el: Date | null;
    }, ExtArgs["result"]["procesos"]>;
    composites: {};
};
export type procesosGetPayload<S extends boolean | null | undefined | procesosDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$procesosPayload, S>;
export type procesosCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<procesosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProcesosCountAggregateInputType | true;
};
export interface procesosDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['procesos'];
        meta: {
            name: 'procesos';
        };
    };
    findUnique<T extends procesosFindUniqueArgs>(args: Prisma.SelectSubset<T, procesosFindUniqueArgs<ExtArgs>>): Prisma.Prisma__procesosClient<runtime.Types.Result.GetResult<Prisma.$procesosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends procesosFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, procesosFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__procesosClient<runtime.Types.Result.GetResult<Prisma.$procesosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends procesosFindFirstArgs>(args?: Prisma.SelectSubset<T, procesosFindFirstArgs<ExtArgs>>): Prisma.Prisma__procesosClient<runtime.Types.Result.GetResult<Prisma.$procesosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends procesosFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, procesosFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__procesosClient<runtime.Types.Result.GetResult<Prisma.$procesosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends procesosFindManyArgs>(args?: Prisma.SelectSubset<T, procesosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$procesosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends procesosCreateArgs>(args: Prisma.SelectSubset<T, procesosCreateArgs<ExtArgs>>): Prisma.Prisma__procesosClient<runtime.Types.Result.GetResult<Prisma.$procesosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends procesosCreateManyArgs>(args?: Prisma.SelectSubset<T, procesosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends procesosCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, procesosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$procesosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends procesosDeleteArgs>(args: Prisma.SelectSubset<T, procesosDeleteArgs<ExtArgs>>): Prisma.Prisma__procesosClient<runtime.Types.Result.GetResult<Prisma.$procesosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends procesosUpdateArgs>(args: Prisma.SelectSubset<T, procesosUpdateArgs<ExtArgs>>): Prisma.Prisma__procesosClient<runtime.Types.Result.GetResult<Prisma.$procesosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends procesosDeleteManyArgs>(args?: Prisma.SelectSubset<T, procesosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends procesosUpdateManyArgs>(args: Prisma.SelectSubset<T, procesosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends procesosUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, procesosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$procesosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends procesosUpsertArgs>(args: Prisma.SelectSubset<T, procesosUpsertArgs<ExtArgs>>): Prisma.Prisma__procesosClient<runtime.Types.Result.GetResult<Prisma.$procesosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends procesosCountArgs>(args?: Prisma.Subset<T, procesosCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProcesosCountAggregateOutputType> : number>;
    aggregate<T extends ProcesosAggregateArgs>(args: Prisma.Subset<T, ProcesosAggregateArgs>): Prisma.PrismaPromise<GetProcesosAggregateType<T>>;
    groupBy<T extends procesosGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: procesosGroupByArgs['orderBy'];
    } : {
        orderBy?: procesosGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, procesosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProcesosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: procesosFieldRefs;
}
export interface Prisma__procesosClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    asignaciones_proceso<T extends Prisma.procesos$asignaciones_procesoArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.procesos$asignaciones_procesoArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$asignaciones_procesoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    historico_aprobaciones<T extends Prisma.procesos$historico_aprobacionesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.procesos$historico_aprobacionesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$historico_aprobacionesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    proyectos<T extends Prisma.procesos$proyectosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.procesos$proyectosArgs<ExtArgs>>): Prisma.Prisma__proyectosClient<runtime.Types.Result.GetResult<Prisma.$proyectosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    solicitudes_inversion<T extends Prisma.procesos$solicitudes_inversionArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.procesos$solicitudes_inversionArgs<ExtArgs>>): Prisma.Prisma__solicitudes_inversionClient<runtime.Types.Result.GetResult<Prisma.$solicitudes_inversionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface procesosFieldRefs {
    readonly id: Prisma.FieldRef<"procesos", 'Int'>;
    readonly proyecto_id: Prisma.FieldRef<"procesos", 'String'>;
    readonly tipo_proceso: Prisma.FieldRef<"procesos", 'String'>;
    readonly estado_actual: Prisma.FieldRef<"procesos", 'String'>;
    readonly fecha_creacion: Prisma.FieldRef<"procesos", 'DateTime'>;
    readonly eliminado_el: Prisma.FieldRef<"procesos", 'DateTime'>;
}
export type procesosFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.procesosSelect<ExtArgs> | null;
    omit?: Prisma.procesosOmit<ExtArgs> | null;
    include?: Prisma.procesosInclude<ExtArgs> | null;
    where: Prisma.procesosWhereUniqueInput;
};
export type procesosFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.procesosSelect<ExtArgs> | null;
    omit?: Prisma.procesosOmit<ExtArgs> | null;
    include?: Prisma.procesosInclude<ExtArgs> | null;
    where: Prisma.procesosWhereUniqueInput;
};
export type procesosFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.procesosSelect<ExtArgs> | null;
    omit?: Prisma.procesosOmit<ExtArgs> | null;
    include?: Prisma.procesosInclude<ExtArgs> | null;
    where?: Prisma.procesosWhereInput;
    orderBy?: Prisma.procesosOrderByWithRelationInput | Prisma.procesosOrderByWithRelationInput[];
    cursor?: Prisma.procesosWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProcesosScalarFieldEnum | Prisma.ProcesosScalarFieldEnum[];
};
export type procesosFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.procesosSelect<ExtArgs> | null;
    omit?: Prisma.procesosOmit<ExtArgs> | null;
    include?: Prisma.procesosInclude<ExtArgs> | null;
    where?: Prisma.procesosWhereInput;
    orderBy?: Prisma.procesosOrderByWithRelationInput | Prisma.procesosOrderByWithRelationInput[];
    cursor?: Prisma.procesosWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProcesosScalarFieldEnum | Prisma.ProcesosScalarFieldEnum[];
};
export type procesosFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.procesosSelect<ExtArgs> | null;
    omit?: Prisma.procesosOmit<ExtArgs> | null;
    include?: Prisma.procesosInclude<ExtArgs> | null;
    where?: Prisma.procesosWhereInput;
    orderBy?: Prisma.procesosOrderByWithRelationInput | Prisma.procesosOrderByWithRelationInput[];
    cursor?: Prisma.procesosWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProcesosScalarFieldEnum | Prisma.ProcesosScalarFieldEnum[];
};
export type procesosCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.procesosSelect<ExtArgs> | null;
    omit?: Prisma.procesosOmit<ExtArgs> | null;
    include?: Prisma.procesosInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.procesosCreateInput, Prisma.procesosUncheckedCreateInput>;
};
export type procesosCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.procesosCreateManyInput | Prisma.procesosCreateManyInput[];
    skipDuplicates?: boolean;
};
export type procesosCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.procesosSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.procesosOmit<ExtArgs> | null;
    data: Prisma.procesosCreateManyInput | Prisma.procesosCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.procesosIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type procesosUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.procesosSelect<ExtArgs> | null;
    omit?: Prisma.procesosOmit<ExtArgs> | null;
    include?: Prisma.procesosInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.procesosUpdateInput, Prisma.procesosUncheckedUpdateInput>;
    where: Prisma.procesosWhereUniqueInput;
};
export type procesosUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.procesosUpdateManyMutationInput, Prisma.procesosUncheckedUpdateManyInput>;
    where?: Prisma.procesosWhereInput;
    limit?: number;
};
export type procesosUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.procesosSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.procesosOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.procesosUpdateManyMutationInput, Prisma.procesosUncheckedUpdateManyInput>;
    where?: Prisma.procesosWhereInput;
    limit?: number;
    include?: Prisma.procesosIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type procesosUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.procesosSelect<ExtArgs> | null;
    omit?: Prisma.procesosOmit<ExtArgs> | null;
    include?: Prisma.procesosInclude<ExtArgs> | null;
    where: Prisma.procesosWhereUniqueInput;
    create: Prisma.XOR<Prisma.procesosCreateInput, Prisma.procesosUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.procesosUpdateInput, Prisma.procesosUncheckedUpdateInput>;
};
export type procesosDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.procesosSelect<ExtArgs> | null;
    omit?: Prisma.procesosOmit<ExtArgs> | null;
    include?: Prisma.procesosInclude<ExtArgs> | null;
    where: Prisma.procesosWhereUniqueInput;
};
export type procesosDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.procesosWhereInput;
    limit?: number;
};
export type procesos$asignaciones_procesoArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.asignaciones_procesoSelect<ExtArgs> | null;
    omit?: Prisma.asignaciones_procesoOmit<ExtArgs> | null;
    include?: Prisma.asignaciones_procesoInclude<ExtArgs> | null;
    where?: Prisma.asignaciones_procesoWhereInput;
    orderBy?: Prisma.asignaciones_procesoOrderByWithRelationInput | Prisma.asignaciones_procesoOrderByWithRelationInput[];
    cursor?: Prisma.asignaciones_procesoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Asignaciones_procesoScalarFieldEnum | Prisma.Asignaciones_procesoScalarFieldEnum[];
};
export type procesos$historico_aprobacionesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.historico_aprobacionesSelect<ExtArgs> | null;
    omit?: Prisma.historico_aprobacionesOmit<ExtArgs> | null;
    include?: Prisma.historico_aprobacionesInclude<ExtArgs> | null;
    where?: Prisma.historico_aprobacionesWhereInput;
    orderBy?: Prisma.historico_aprobacionesOrderByWithRelationInput | Prisma.historico_aprobacionesOrderByWithRelationInput[];
    cursor?: Prisma.historico_aprobacionesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Historico_aprobacionesScalarFieldEnum | Prisma.Historico_aprobacionesScalarFieldEnum[];
};
export type procesos$proyectosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.proyectosSelect<ExtArgs> | null;
    omit?: Prisma.proyectosOmit<ExtArgs> | null;
    include?: Prisma.proyectosInclude<ExtArgs> | null;
    where?: Prisma.proyectosWhereInput;
};
export type procesos$solicitudes_inversionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitudes_inversionSelect<ExtArgs> | null;
    omit?: Prisma.solicitudes_inversionOmit<ExtArgs> | null;
    include?: Prisma.solicitudes_inversionInclude<ExtArgs> | null;
    where?: Prisma.solicitudes_inversionWhereInput;
};
export type procesosDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.procesosSelect<ExtArgs> | null;
    omit?: Prisma.procesosOmit<ExtArgs> | null;
    include?: Prisma.procesosInclude<ExtArgs> | null;
};
