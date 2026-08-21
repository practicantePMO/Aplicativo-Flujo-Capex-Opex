import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type historico_aprobacionesModel = runtime.Types.Result.DefaultSelection<Prisma.$historico_aprobacionesPayload>;
export type AggregateHistorico_aprobaciones = {
    _count: Historico_aprobacionesCountAggregateOutputType | null;
    _avg: Historico_aprobacionesAvgAggregateOutputType | null;
    _sum: Historico_aprobacionesSumAggregateOutputType | null;
    _min: Historico_aprobacionesMinAggregateOutputType | null;
    _max: Historico_aprobacionesMaxAggregateOutputType | null;
};
export type Historico_aprobacionesAvgAggregateOutputType = {
    id: number | null;
    proceso_id: number | null;
    usuario_id: number | null;
};
export type Historico_aprobacionesSumAggregateOutputType = {
    id: number | null;
    proceso_id: number | null;
    usuario_id: number | null;
};
export type Historico_aprobacionesMinAggregateOutputType = {
    id: number | null;
    proceso_id: number | null;
    etapa_origen: string | null;
    etapa_destino: string | null;
    accion: string | null;
    razon_rechazo: string | null;
    usuario_id: number | null;
    fecha_registro: Date | null;
};
export type Historico_aprobacionesMaxAggregateOutputType = {
    id: number | null;
    proceso_id: number | null;
    etapa_origen: string | null;
    etapa_destino: string | null;
    accion: string | null;
    razon_rechazo: string | null;
    usuario_id: number | null;
    fecha_registro: Date | null;
};
export type Historico_aprobacionesCountAggregateOutputType = {
    id: number;
    proceso_id: number;
    etapa_origen: number;
    etapa_destino: number;
    accion: number;
    razon_rechazo: number;
    usuario_id: number;
    fecha_registro: number;
    _all: number;
};
export type Historico_aprobacionesAvgAggregateInputType = {
    id?: true;
    proceso_id?: true;
    usuario_id?: true;
};
export type Historico_aprobacionesSumAggregateInputType = {
    id?: true;
    proceso_id?: true;
    usuario_id?: true;
};
export type Historico_aprobacionesMinAggregateInputType = {
    id?: true;
    proceso_id?: true;
    etapa_origen?: true;
    etapa_destino?: true;
    accion?: true;
    razon_rechazo?: true;
    usuario_id?: true;
    fecha_registro?: true;
};
export type Historico_aprobacionesMaxAggregateInputType = {
    id?: true;
    proceso_id?: true;
    etapa_origen?: true;
    etapa_destino?: true;
    accion?: true;
    razon_rechazo?: true;
    usuario_id?: true;
    fecha_registro?: true;
};
export type Historico_aprobacionesCountAggregateInputType = {
    id?: true;
    proceso_id?: true;
    etapa_origen?: true;
    etapa_destino?: true;
    accion?: true;
    razon_rechazo?: true;
    usuario_id?: true;
    fecha_registro?: true;
    _all?: true;
};
export type Historico_aprobacionesAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.historico_aprobacionesWhereInput;
    orderBy?: Prisma.historico_aprobacionesOrderByWithRelationInput | Prisma.historico_aprobacionesOrderByWithRelationInput[];
    cursor?: Prisma.historico_aprobacionesWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Historico_aprobacionesCountAggregateInputType;
    _avg?: Historico_aprobacionesAvgAggregateInputType;
    _sum?: Historico_aprobacionesSumAggregateInputType;
    _min?: Historico_aprobacionesMinAggregateInputType;
    _max?: Historico_aprobacionesMaxAggregateInputType;
};
export type GetHistorico_aprobacionesAggregateType<T extends Historico_aprobacionesAggregateArgs> = {
    [P in keyof T & keyof AggregateHistorico_aprobaciones]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateHistorico_aprobaciones[P]> : Prisma.GetScalarType<T[P], AggregateHistorico_aprobaciones[P]>;
};
export type historico_aprobacionesGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.historico_aprobacionesWhereInput;
    orderBy?: Prisma.historico_aprobacionesOrderByWithAggregationInput | Prisma.historico_aprobacionesOrderByWithAggregationInput[];
    by: Prisma.Historico_aprobacionesScalarFieldEnum[] | Prisma.Historico_aprobacionesScalarFieldEnum;
    having?: Prisma.historico_aprobacionesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Historico_aprobacionesCountAggregateInputType | true;
    _avg?: Historico_aprobacionesAvgAggregateInputType;
    _sum?: Historico_aprobacionesSumAggregateInputType;
    _min?: Historico_aprobacionesMinAggregateInputType;
    _max?: Historico_aprobacionesMaxAggregateInputType;
};
export type Historico_aprobacionesGroupByOutputType = {
    id: number;
    proceso_id: number | null;
    etapa_origen: string;
    etapa_destino: string;
    accion: string;
    razon_rechazo: string | null;
    usuario_id: number | null;
    fecha_registro: Date | null;
    _count: Historico_aprobacionesCountAggregateOutputType | null;
    _avg: Historico_aprobacionesAvgAggregateOutputType | null;
    _sum: Historico_aprobacionesSumAggregateOutputType | null;
    _min: Historico_aprobacionesMinAggregateOutputType | null;
    _max: Historico_aprobacionesMaxAggregateOutputType | null;
};
export type GetHistorico_aprobacionesGroupByPayload<T extends historico_aprobacionesGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Historico_aprobacionesGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Historico_aprobacionesGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Historico_aprobacionesGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Historico_aprobacionesGroupByOutputType[P]>;
}>>;
export type historico_aprobacionesWhereInput = {
    AND?: Prisma.historico_aprobacionesWhereInput | Prisma.historico_aprobacionesWhereInput[];
    OR?: Prisma.historico_aprobacionesWhereInput[];
    NOT?: Prisma.historico_aprobacionesWhereInput | Prisma.historico_aprobacionesWhereInput[];
    id?: Prisma.IntFilter<"historico_aprobaciones"> | number;
    proceso_id?: Prisma.IntNullableFilter<"historico_aprobaciones"> | number | null;
    etapa_origen?: Prisma.StringFilter<"historico_aprobaciones"> | string;
    etapa_destino?: Prisma.StringFilter<"historico_aprobaciones"> | string;
    accion?: Prisma.StringFilter<"historico_aprobaciones"> | string;
    razon_rechazo?: Prisma.StringNullableFilter<"historico_aprobaciones"> | string | null;
    usuario_id?: Prisma.IntNullableFilter<"historico_aprobaciones"> | number | null;
    fecha_registro?: Prisma.DateTimeNullableFilter<"historico_aprobaciones"> | Date | string | null;
    procesos?: Prisma.XOR<Prisma.ProcesosNullableScalarRelationFilter, Prisma.procesosWhereInput> | null;
    usuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
};
export type historico_aprobacionesOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    proceso_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    etapa_origen?: Prisma.SortOrder;
    etapa_destino?: Prisma.SortOrder;
    accion?: Prisma.SortOrder;
    razon_rechazo?: Prisma.SortOrderInput | Prisma.SortOrder;
    usuario_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_registro?: Prisma.SortOrderInput | Prisma.SortOrder;
    procesos?: Prisma.procesosOrderByWithRelationInput;
    usuarios?: Prisma.usuariosOrderByWithRelationInput;
};
export type historico_aprobacionesWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.historico_aprobacionesWhereInput | Prisma.historico_aprobacionesWhereInput[];
    OR?: Prisma.historico_aprobacionesWhereInput[];
    NOT?: Prisma.historico_aprobacionesWhereInput | Prisma.historico_aprobacionesWhereInput[];
    proceso_id?: Prisma.IntNullableFilter<"historico_aprobaciones"> | number | null;
    etapa_origen?: Prisma.StringFilter<"historico_aprobaciones"> | string;
    etapa_destino?: Prisma.StringFilter<"historico_aprobaciones"> | string;
    accion?: Prisma.StringFilter<"historico_aprobaciones"> | string;
    razon_rechazo?: Prisma.StringNullableFilter<"historico_aprobaciones"> | string | null;
    usuario_id?: Prisma.IntNullableFilter<"historico_aprobaciones"> | number | null;
    fecha_registro?: Prisma.DateTimeNullableFilter<"historico_aprobaciones"> | Date | string | null;
    procesos?: Prisma.XOR<Prisma.ProcesosNullableScalarRelationFilter, Prisma.procesosWhereInput> | null;
    usuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
}, "id">;
export type historico_aprobacionesOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    proceso_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    etapa_origen?: Prisma.SortOrder;
    etapa_destino?: Prisma.SortOrder;
    accion?: Prisma.SortOrder;
    razon_rechazo?: Prisma.SortOrderInput | Prisma.SortOrder;
    usuario_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_registro?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.historico_aprobacionesCountOrderByAggregateInput;
    _avg?: Prisma.historico_aprobacionesAvgOrderByAggregateInput;
    _max?: Prisma.historico_aprobacionesMaxOrderByAggregateInput;
    _min?: Prisma.historico_aprobacionesMinOrderByAggregateInput;
    _sum?: Prisma.historico_aprobacionesSumOrderByAggregateInput;
};
export type historico_aprobacionesScalarWhereWithAggregatesInput = {
    AND?: Prisma.historico_aprobacionesScalarWhereWithAggregatesInput | Prisma.historico_aprobacionesScalarWhereWithAggregatesInput[];
    OR?: Prisma.historico_aprobacionesScalarWhereWithAggregatesInput[];
    NOT?: Prisma.historico_aprobacionesScalarWhereWithAggregatesInput | Prisma.historico_aprobacionesScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"historico_aprobaciones"> | number;
    proceso_id?: Prisma.IntNullableWithAggregatesFilter<"historico_aprobaciones"> | number | null;
    etapa_origen?: Prisma.StringWithAggregatesFilter<"historico_aprobaciones"> | string;
    etapa_destino?: Prisma.StringWithAggregatesFilter<"historico_aprobaciones"> | string;
    accion?: Prisma.StringWithAggregatesFilter<"historico_aprobaciones"> | string;
    razon_rechazo?: Prisma.StringNullableWithAggregatesFilter<"historico_aprobaciones"> | string | null;
    usuario_id?: Prisma.IntNullableWithAggregatesFilter<"historico_aprobaciones"> | number | null;
    fecha_registro?: Prisma.DateTimeNullableWithAggregatesFilter<"historico_aprobaciones"> | Date | string | null;
};
export type historico_aprobacionesCreateInput = {
    etapa_origen: string;
    etapa_destino: string;
    accion: string;
    razon_rechazo?: string | null;
    fecha_registro?: Date | string | null;
    procesos?: Prisma.procesosCreateNestedOneWithoutHistorico_aprobacionesInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutHistorico_aprobacionesInput;
};
export type historico_aprobacionesUncheckedCreateInput = {
    id?: number;
    proceso_id?: number | null;
    etapa_origen: string;
    etapa_destino: string;
    accion: string;
    razon_rechazo?: string | null;
    usuario_id?: number | null;
    fecha_registro?: Date | string | null;
};
export type historico_aprobacionesUpdateInput = {
    etapa_origen?: Prisma.StringFieldUpdateOperationsInput | string;
    etapa_destino?: Prisma.StringFieldUpdateOperationsInput | string;
    accion?: Prisma.StringFieldUpdateOperationsInput | string;
    razon_rechazo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_registro?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    procesos?: Prisma.procesosUpdateOneWithoutHistorico_aprobacionesNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutHistorico_aprobacionesNestedInput;
};
export type historico_aprobacionesUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    proceso_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    etapa_origen?: Prisma.StringFieldUpdateOperationsInput | string;
    etapa_destino?: Prisma.StringFieldUpdateOperationsInput | string;
    accion?: Prisma.StringFieldUpdateOperationsInput | string;
    razon_rechazo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    usuario_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_registro?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type historico_aprobacionesCreateManyInput = {
    id?: number;
    proceso_id?: number | null;
    etapa_origen: string;
    etapa_destino: string;
    accion: string;
    razon_rechazo?: string | null;
    usuario_id?: number | null;
    fecha_registro?: Date | string | null;
};
export type historico_aprobacionesUpdateManyMutationInput = {
    etapa_origen?: Prisma.StringFieldUpdateOperationsInput | string;
    etapa_destino?: Prisma.StringFieldUpdateOperationsInput | string;
    accion?: Prisma.StringFieldUpdateOperationsInput | string;
    razon_rechazo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_registro?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type historico_aprobacionesUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    proceso_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    etapa_origen?: Prisma.StringFieldUpdateOperationsInput | string;
    etapa_destino?: Prisma.StringFieldUpdateOperationsInput | string;
    accion?: Prisma.StringFieldUpdateOperationsInput | string;
    razon_rechazo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    usuario_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_registro?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type historico_aprobacionesCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    proceso_id?: Prisma.SortOrder;
    etapa_origen?: Prisma.SortOrder;
    etapa_destino?: Prisma.SortOrder;
    accion?: Prisma.SortOrder;
    razon_rechazo?: Prisma.SortOrder;
    usuario_id?: Prisma.SortOrder;
    fecha_registro?: Prisma.SortOrder;
};
export type historico_aprobacionesAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    proceso_id?: Prisma.SortOrder;
    usuario_id?: Prisma.SortOrder;
};
export type historico_aprobacionesMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    proceso_id?: Prisma.SortOrder;
    etapa_origen?: Prisma.SortOrder;
    etapa_destino?: Prisma.SortOrder;
    accion?: Prisma.SortOrder;
    razon_rechazo?: Prisma.SortOrder;
    usuario_id?: Prisma.SortOrder;
    fecha_registro?: Prisma.SortOrder;
};
export type historico_aprobacionesMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    proceso_id?: Prisma.SortOrder;
    etapa_origen?: Prisma.SortOrder;
    etapa_destino?: Prisma.SortOrder;
    accion?: Prisma.SortOrder;
    razon_rechazo?: Prisma.SortOrder;
    usuario_id?: Prisma.SortOrder;
    fecha_registro?: Prisma.SortOrder;
};
export type historico_aprobacionesSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    proceso_id?: Prisma.SortOrder;
    usuario_id?: Prisma.SortOrder;
};
export type Historico_aprobacionesListRelationFilter = {
    every?: Prisma.historico_aprobacionesWhereInput;
    some?: Prisma.historico_aprobacionesWhereInput;
    none?: Prisma.historico_aprobacionesWhereInput;
};
export type historico_aprobacionesOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type historico_aprobacionesCreateNestedManyWithoutProcesosInput = {
    create?: Prisma.XOR<Prisma.historico_aprobacionesCreateWithoutProcesosInput, Prisma.historico_aprobacionesUncheckedCreateWithoutProcesosInput> | Prisma.historico_aprobacionesCreateWithoutProcesosInput[] | Prisma.historico_aprobacionesUncheckedCreateWithoutProcesosInput[];
    connectOrCreate?: Prisma.historico_aprobacionesCreateOrConnectWithoutProcesosInput | Prisma.historico_aprobacionesCreateOrConnectWithoutProcesosInput[];
    createMany?: Prisma.historico_aprobacionesCreateManyProcesosInputEnvelope;
    connect?: Prisma.historico_aprobacionesWhereUniqueInput | Prisma.historico_aprobacionesWhereUniqueInput[];
};
export type historico_aprobacionesUncheckedCreateNestedManyWithoutProcesosInput = {
    create?: Prisma.XOR<Prisma.historico_aprobacionesCreateWithoutProcesosInput, Prisma.historico_aprobacionesUncheckedCreateWithoutProcesosInput> | Prisma.historico_aprobacionesCreateWithoutProcesosInput[] | Prisma.historico_aprobacionesUncheckedCreateWithoutProcesosInput[];
    connectOrCreate?: Prisma.historico_aprobacionesCreateOrConnectWithoutProcesosInput | Prisma.historico_aprobacionesCreateOrConnectWithoutProcesosInput[];
    createMany?: Prisma.historico_aprobacionesCreateManyProcesosInputEnvelope;
    connect?: Prisma.historico_aprobacionesWhereUniqueInput | Prisma.historico_aprobacionesWhereUniqueInput[];
};
export type historico_aprobacionesUpdateManyWithoutProcesosNestedInput = {
    create?: Prisma.XOR<Prisma.historico_aprobacionesCreateWithoutProcesosInput, Prisma.historico_aprobacionesUncheckedCreateWithoutProcesosInput> | Prisma.historico_aprobacionesCreateWithoutProcesosInput[] | Prisma.historico_aprobacionesUncheckedCreateWithoutProcesosInput[];
    connectOrCreate?: Prisma.historico_aprobacionesCreateOrConnectWithoutProcesosInput | Prisma.historico_aprobacionesCreateOrConnectWithoutProcesosInput[];
    upsert?: Prisma.historico_aprobacionesUpsertWithWhereUniqueWithoutProcesosInput | Prisma.historico_aprobacionesUpsertWithWhereUniqueWithoutProcesosInput[];
    createMany?: Prisma.historico_aprobacionesCreateManyProcesosInputEnvelope;
    set?: Prisma.historico_aprobacionesWhereUniqueInput | Prisma.historico_aprobacionesWhereUniqueInput[];
    disconnect?: Prisma.historico_aprobacionesWhereUniqueInput | Prisma.historico_aprobacionesWhereUniqueInput[];
    delete?: Prisma.historico_aprobacionesWhereUniqueInput | Prisma.historico_aprobacionesWhereUniqueInput[];
    connect?: Prisma.historico_aprobacionesWhereUniqueInput | Prisma.historico_aprobacionesWhereUniqueInput[];
    update?: Prisma.historico_aprobacionesUpdateWithWhereUniqueWithoutProcesosInput | Prisma.historico_aprobacionesUpdateWithWhereUniqueWithoutProcesosInput[];
    updateMany?: Prisma.historico_aprobacionesUpdateManyWithWhereWithoutProcesosInput | Prisma.historico_aprobacionesUpdateManyWithWhereWithoutProcesosInput[];
    deleteMany?: Prisma.historico_aprobacionesScalarWhereInput | Prisma.historico_aprobacionesScalarWhereInput[];
};
export type historico_aprobacionesUncheckedUpdateManyWithoutProcesosNestedInput = {
    create?: Prisma.XOR<Prisma.historico_aprobacionesCreateWithoutProcesosInput, Prisma.historico_aprobacionesUncheckedCreateWithoutProcesosInput> | Prisma.historico_aprobacionesCreateWithoutProcesosInput[] | Prisma.historico_aprobacionesUncheckedCreateWithoutProcesosInput[];
    connectOrCreate?: Prisma.historico_aprobacionesCreateOrConnectWithoutProcesosInput | Prisma.historico_aprobacionesCreateOrConnectWithoutProcesosInput[];
    upsert?: Prisma.historico_aprobacionesUpsertWithWhereUniqueWithoutProcesosInput | Prisma.historico_aprobacionesUpsertWithWhereUniqueWithoutProcesosInput[];
    createMany?: Prisma.historico_aprobacionesCreateManyProcesosInputEnvelope;
    set?: Prisma.historico_aprobacionesWhereUniqueInput | Prisma.historico_aprobacionesWhereUniqueInput[];
    disconnect?: Prisma.historico_aprobacionesWhereUniqueInput | Prisma.historico_aprobacionesWhereUniqueInput[];
    delete?: Prisma.historico_aprobacionesWhereUniqueInput | Prisma.historico_aprobacionesWhereUniqueInput[];
    connect?: Prisma.historico_aprobacionesWhereUniqueInput | Prisma.historico_aprobacionesWhereUniqueInput[];
    update?: Prisma.historico_aprobacionesUpdateWithWhereUniqueWithoutProcesosInput | Prisma.historico_aprobacionesUpdateWithWhereUniqueWithoutProcesosInput[];
    updateMany?: Prisma.historico_aprobacionesUpdateManyWithWhereWithoutProcesosInput | Prisma.historico_aprobacionesUpdateManyWithWhereWithoutProcesosInput[];
    deleteMany?: Prisma.historico_aprobacionesScalarWhereInput | Prisma.historico_aprobacionesScalarWhereInput[];
};
export type historico_aprobacionesCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.historico_aprobacionesCreateWithoutUsuariosInput, Prisma.historico_aprobacionesUncheckedCreateWithoutUsuariosInput> | Prisma.historico_aprobacionesCreateWithoutUsuariosInput[] | Prisma.historico_aprobacionesUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.historico_aprobacionesCreateOrConnectWithoutUsuariosInput | Prisma.historico_aprobacionesCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.historico_aprobacionesCreateManyUsuariosInputEnvelope;
    connect?: Prisma.historico_aprobacionesWhereUniqueInput | Prisma.historico_aprobacionesWhereUniqueInput[];
};
export type historico_aprobacionesUncheckedCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.historico_aprobacionesCreateWithoutUsuariosInput, Prisma.historico_aprobacionesUncheckedCreateWithoutUsuariosInput> | Prisma.historico_aprobacionesCreateWithoutUsuariosInput[] | Prisma.historico_aprobacionesUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.historico_aprobacionesCreateOrConnectWithoutUsuariosInput | Prisma.historico_aprobacionesCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.historico_aprobacionesCreateManyUsuariosInputEnvelope;
    connect?: Prisma.historico_aprobacionesWhereUniqueInput | Prisma.historico_aprobacionesWhereUniqueInput[];
};
export type historico_aprobacionesUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.historico_aprobacionesCreateWithoutUsuariosInput, Prisma.historico_aprobacionesUncheckedCreateWithoutUsuariosInput> | Prisma.historico_aprobacionesCreateWithoutUsuariosInput[] | Prisma.historico_aprobacionesUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.historico_aprobacionesCreateOrConnectWithoutUsuariosInput | Prisma.historico_aprobacionesCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.historico_aprobacionesUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.historico_aprobacionesUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.historico_aprobacionesCreateManyUsuariosInputEnvelope;
    set?: Prisma.historico_aprobacionesWhereUniqueInput | Prisma.historico_aprobacionesWhereUniqueInput[];
    disconnect?: Prisma.historico_aprobacionesWhereUniqueInput | Prisma.historico_aprobacionesWhereUniqueInput[];
    delete?: Prisma.historico_aprobacionesWhereUniqueInput | Prisma.historico_aprobacionesWhereUniqueInput[];
    connect?: Prisma.historico_aprobacionesWhereUniqueInput | Prisma.historico_aprobacionesWhereUniqueInput[];
    update?: Prisma.historico_aprobacionesUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.historico_aprobacionesUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.historico_aprobacionesUpdateManyWithWhereWithoutUsuariosInput | Prisma.historico_aprobacionesUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.historico_aprobacionesScalarWhereInput | Prisma.historico_aprobacionesScalarWhereInput[];
};
export type historico_aprobacionesUncheckedUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.historico_aprobacionesCreateWithoutUsuariosInput, Prisma.historico_aprobacionesUncheckedCreateWithoutUsuariosInput> | Prisma.historico_aprobacionesCreateWithoutUsuariosInput[] | Prisma.historico_aprobacionesUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.historico_aprobacionesCreateOrConnectWithoutUsuariosInput | Prisma.historico_aprobacionesCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.historico_aprobacionesUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.historico_aprobacionesUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.historico_aprobacionesCreateManyUsuariosInputEnvelope;
    set?: Prisma.historico_aprobacionesWhereUniqueInput | Prisma.historico_aprobacionesWhereUniqueInput[];
    disconnect?: Prisma.historico_aprobacionesWhereUniqueInput | Prisma.historico_aprobacionesWhereUniqueInput[];
    delete?: Prisma.historico_aprobacionesWhereUniqueInput | Prisma.historico_aprobacionesWhereUniqueInput[];
    connect?: Prisma.historico_aprobacionesWhereUniqueInput | Prisma.historico_aprobacionesWhereUniqueInput[];
    update?: Prisma.historico_aprobacionesUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.historico_aprobacionesUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.historico_aprobacionesUpdateManyWithWhereWithoutUsuariosInput | Prisma.historico_aprobacionesUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.historico_aprobacionesScalarWhereInput | Prisma.historico_aprobacionesScalarWhereInput[];
};
export type historico_aprobacionesCreateWithoutProcesosInput = {
    etapa_origen: string;
    etapa_destino: string;
    accion: string;
    razon_rechazo?: string | null;
    fecha_registro?: Date | string | null;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutHistorico_aprobacionesInput;
};
export type historico_aprobacionesUncheckedCreateWithoutProcesosInput = {
    id?: number;
    etapa_origen: string;
    etapa_destino: string;
    accion: string;
    razon_rechazo?: string | null;
    usuario_id?: number | null;
    fecha_registro?: Date | string | null;
};
export type historico_aprobacionesCreateOrConnectWithoutProcesosInput = {
    where: Prisma.historico_aprobacionesWhereUniqueInput;
    create: Prisma.XOR<Prisma.historico_aprobacionesCreateWithoutProcesosInput, Prisma.historico_aprobacionesUncheckedCreateWithoutProcesosInput>;
};
export type historico_aprobacionesCreateManyProcesosInputEnvelope = {
    data: Prisma.historico_aprobacionesCreateManyProcesosInput | Prisma.historico_aprobacionesCreateManyProcesosInput[];
    skipDuplicates?: boolean;
};
export type historico_aprobacionesUpsertWithWhereUniqueWithoutProcesosInput = {
    where: Prisma.historico_aprobacionesWhereUniqueInput;
    update: Prisma.XOR<Prisma.historico_aprobacionesUpdateWithoutProcesosInput, Prisma.historico_aprobacionesUncheckedUpdateWithoutProcesosInput>;
    create: Prisma.XOR<Prisma.historico_aprobacionesCreateWithoutProcesosInput, Prisma.historico_aprobacionesUncheckedCreateWithoutProcesosInput>;
};
export type historico_aprobacionesUpdateWithWhereUniqueWithoutProcesosInput = {
    where: Prisma.historico_aprobacionesWhereUniqueInput;
    data: Prisma.XOR<Prisma.historico_aprobacionesUpdateWithoutProcesosInput, Prisma.historico_aprobacionesUncheckedUpdateWithoutProcesosInput>;
};
export type historico_aprobacionesUpdateManyWithWhereWithoutProcesosInput = {
    where: Prisma.historico_aprobacionesScalarWhereInput;
    data: Prisma.XOR<Prisma.historico_aprobacionesUpdateManyMutationInput, Prisma.historico_aprobacionesUncheckedUpdateManyWithoutProcesosInput>;
};
export type historico_aprobacionesScalarWhereInput = {
    AND?: Prisma.historico_aprobacionesScalarWhereInput | Prisma.historico_aprobacionesScalarWhereInput[];
    OR?: Prisma.historico_aprobacionesScalarWhereInput[];
    NOT?: Prisma.historico_aprobacionesScalarWhereInput | Prisma.historico_aprobacionesScalarWhereInput[];
    id?: Prisma.IntFilter<"historico_aprobaciones"> | number;
    proceso_id?: Prisma.IntNullableFilter<"historico_aprobaciones"> | number | null;
    etapa_origen?: Prisma.StringFilter<"historico_aprobaciones"> | string;
    etapa_destino?: Prisma.StringFilter<"historico_aprobaciones"> | string;
    accion?: Prisma.StringFilter<"historico_aprobaciones"> | string;
    razon_rechazo?: Prisma.StringNullableFilter<"historico_aprobaciones"> | string | null;
    usuario_id?: Prisma.IntNullableFilter<"historico_aprobaciones"> | number | null;
    fecha_registro?: Prisma.DateTimeNullableFilter<"historico_aprobaciones"> | Date | string | null;
};
export type historico_aprobacionesCreateWithoutUsuariosInput = {
    etapa_origen: string;
    etapa_destino: string;
    accion: string;
    razon_rechazo?: string | null;
    fecha_registro?: Date | string | null;
    procesos?: Prisma.procesosCreateNestedOneWithoutHistorico_aprobacionesInput;
};
export type historico_aprobacionesUncheckedCreateWithoutUsuariosInput = {
    id?: number;
    proceso_id?: number | null;
    etapa_origen: string;
    etapa_destino: string;
    accion: string;
    razon_rechazo?: string | null;
    fecha_registro?: Date | string | null;
};
export type historico_aprobacionesCreateOrConnectWithoutUsuariosInput = {
    where: Prisma.historico_aprobacionesWhereUniqueInput;
    create: Prisma.XOR<Prisma.historico_aprobacionesCreateWithoutUsuariosInput, Prisma.historico_aprobacionesUncheckedCreateWithoutUsuariosInput>;
};
export type historico_aprobacionesCreateManyUsuariosInputEnvelope = {
    data: Prisma.historico_aprobacionesCreateManyUsuariosInput | Prisma.historico_aprobacionesCreateManyUsuariosInput[];
    skipDuplicates?: boolean;
};
export type historico_aprobacionesUpsertWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.historico_aprobacionesWhereUniqueInput;
    update: Prisma.XOR<Prisma.historico_aprobacionesUpdateWithoutUsuariosInput, Prisma.historico_aprobacionesUncheckedUpdateWithoutUsuariosInput>;
    create: Prisma.XOR<Prisma.historico_aprobacionesCreateWithoutUsuariosInput, Prisma.historico_aprobacionesUncheckedCreateWithoutUsuariosInput>;
};
export type historico_aprobacionesUpdateWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.historico_aprobacionesWhereUniqueInput;
    data: Prisma.XOR<Prisma.historico_aprobacionesUpdateWithoutUsuariosInput, Prisma.historico_aprobacionesUncheckedUpdateWithoutUsuariosInput>;
};
export type historico_aprobacionesUpdateManyWithWhereWithoutUsuariosInput = {
    where: Prisma.historico_aprobacionesScalarWhereInput;
    data: Prisma.XOR<Prisma.historico_aprobacionesUpdateManyMutationInput, Prisma.historico_aprobacionesUncheckedUpdateManyWithoutUsuariosInput>;
};
export type historico_aprobacionesCreateManyProcesosInput = {
    id?: number;
    etapa_origen: string;
    etapa_destino: string;
    accion: string;
    razon_rechazo?: string | null;
    usuario_id?: number | null;
    fecha_registro?: Date | string | null;
};
export type historico_aprobacionesUpdateWithoutProcesosInput = {
    etapa_origen?: Prisma.StringFieldUpdateOperationsInput | string;
    etapa_destino?: Prisma.StringFieldUpdateOperationsInput | string;
    accion?: Prisma.StringFieldUpdateOperationsInput | string;
    razon_rechazo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_registro?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    usuarios?: Prisma.usuariosUpdateOneWithoutHistorico_aprobacionesNestedInput;
};
export type historico_aprobacionesUncheckedUpdateWithoutProcesosInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    etapa_origen?: Prisma.StringFieldUpdateOperationsInput | string;
    etapa_destino?: Prisma.StringFieldUpdateOperationsInput | string;
    accion?: Prisma.StringFieldUpdateOperationsInput | string;
    razon_rechazo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    usuario_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_registro?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type historico_aprobacionesUncheckedUpdateManyWithoutProcesosInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    etapa_origen?: Prisma.StringFieldUpdateOperationsInput | string;
    etapa_destino?: Prisma.StringFieldUpdateOperationsInput | string;
    accion?: Prisma.StringFieldUpdateOperationsInput | string;
    razon_rechazo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    usuario_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_registro?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type historico_aprobacionesCreateManyUsuariosInput = {
    id?: number;
    proceso_id?: number | null;
    etapa_origen: string;
    etapa_destino: string;
    accion: string;
    razon_rechazo?: string | null;
    fecha_registro?: Date | string | null;
};
export type historico_aprobacionesUpdateWithoutUsuariosInput = {
    etapa_origen?: Prisma.StringFieldUpdateOperationsInput | string;
    etapa_destino?: Prisma.StringFieldUpdateOperationsInput | string;
    accion?: Prisma.StringFieldUpdateOperationsInput | string;
    razon_rechazo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_registro?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    procesos?: Prisma.procesosUpdateOneWithoutHistorico_aprobacionesNestedInput;
};
export type historico_aprobacionesUncheckedUpdateWithoutUsuariosInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    proceso_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    etapa_origen?: Prisma.StringFieldUpdateOperationsInput | string;
    etapa_destino?: Prisma.StringFieldUpdateOperationsInput | string;
    accion?: Prisma.StringFieldUpdateOperationsInput | string;
    razon_rechazo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_registro?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type historico_aprobacionesUncheckedUpdateManyWithoutUsuariosInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    proceso_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    etapa_origen?: Prisma.StringFieldUpdateOperationsInput | string;
    etapa_destino?: Prisma.StringFieldUpdateOperationsInput | string;
    accion?: Prisma.StringFieldUpdateOperationsInput | string;
    razon_rechazo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_registro?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type historico_aprobacionesSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    proceso_id?: boolean;
    etapa_origen?: boolean;
    etapa_destino?: boolean;
    accion?: boolean;
    razon_rechazo?: boolean;
    usuario_id?: boolean;
    fecha_registro?: boolean;
    procesos?: boolean | Prisma.historico_aprobaciones$procesosArgs<ExtArgs>;
    usuarios?: boolean | Prisma.historico_aprobaciones$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["historico_aprobaciones"]>;
export type historico_aprobacionesSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    proceso_id?: boolean;
    etapa_origen?: boolean;
    etapa_destino?: boolean;
    accion?: boolean;
    razon_rechazo?: boolean;
    usuario_id?: boolean;
    fecha_registro?: boolean;
    procesos?: boolean | Prisma.historico_aprobaciones$procesosArgs<ExtArgs>;
    usuarios?: boolean | Prisma.historico_aprobaciones$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["historico_aprobaciones"]>;
export type historico_aprobacionesSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    proceso_id?: boolean;
    etapa_origen?: boolean;
    etapa_destino?: boolean;
    accion?: boolean;
    razon_rechazo?: boolean;
    usuario_id?: boolean;
    fecha_registro?: boolean;
    procesos?: boolean | Prisma.historico_aprobaciones$procesosArgs<ExtArgs>;
    usuarios?: boolean | Prisma.historico_aprobaciones$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["historico_aprobaciones"]>;
export type historico_aprobacionesSelectScalar = {
    id?: boolean;
    proceso_id?: boolean;
    etapa_origen?: boolean;
    etapa_destino?: boolean;
    accion?: boolean;
    razon_rechazo?: boolean;
    usuario_id?: boolean;
    fecha_registro?: boolean;
};
export type historico_aprobacionesOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "proceso_id" | "etapa_origen" | "etapa_destino" | "accion" | "razon_rechazo" | "usuario_id" | "fecha_registro", ExtArgs["result"]["historico_aprobaciones"]>;
export type historico_aprobacionesInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    procesos?: boolean | Prisma.historico_aprobaciones$procesosArgs<ExtArgs>;
    usuarios?: boolean | Prisma.historico_aprobaciones$usuariosArgs<ExtArgs>;
};
export type historico_aprobacionesIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    procesos?: boolean | Prisma.historico_aprobaciones$procesosArgs<ExtArgs>;
    usuarios?: boolean | Prisma.historico_aprobaciones$usuariosArgs<ExtArgs>;
};
export type historico_aprobacionesIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    procesos?: boolean | Prisma.historico_aprobaciones$procesosArgs<ExtArgs>;
    usuarios?: boolean | Prisma.historico_aprobaciones$usuariosArgs<ExtArgs>;
};
export type $historico_aprobacionesPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "historico_aprobaciones";
    objects: {
        procesos: Prisma.$procesosPayload<ExtArgs> | null;
        usuarios: Prisma.$usuariosPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        proceso_id: number | null;
        etapa_origen: string;
        etapa_destino: string;
        accion: string;
        razon_rechazo: string | null;
        usuario_id: number | null;
        fecha_registro: Date | null;
    }, ExtArgs["result"]["historico_aprobaciones"]>;
    composites: {};
};
export type historico_aprobacionesGetPayload<S extends boolean | null | undefined | historico_aprobacionesDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$historico_aprobacionesPayload, S>;
export type historico_aprobacionesCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<historico_aprobacionesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Historico_aprobacionesCountAggregateInputType | true;
};
export interface historico_aprobacionesDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['historico_aprobaciones'];
        meta: {
            name: 'historico_aprobaciones';
        };
    };
    findUnique<T extends historico_aprobacionesFindUniqueArgs>(args: Prisma.SelectSubset<T, historico_aprobacionesFindUniqueArgs<ExtArgs>>): Prisma.Prisma__historico_aprobacionesClient<runtime.Types.Result.GetResult<Prisma.$historico_aprobacionesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends historico_aprobacionesFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, historico_aprobacionesFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__historico_aprobacionesClient<runtime.Types.Result.GetResult<Prisma.$historico_aprobacionesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends historico_aprobacionesFindFirstArgs>(args?: Prisma.SelectSubset<T, historico_aprobacionesFindFirstArgs<ExtArgs>>): Prisma.Prisma__historico_aprobacionesClient<runtime.Types.Result.GetResult<Prisma.$historico_aprobacionesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends historico_aprobacionesFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, historico_aprobacionesFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__historico_aprobacionesClient<runtime.Types.Result.GetResult<Prisma.$historico_aprobacionesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends historico_aprobacionesFindManyArgs>(args?: Prisma.SelectSubset<T, historico_aprobacionesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$historico_aprobacionesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends historico_aprobacionesCreateArgs>(args: Prisma.SelectSubset<T, historico_aprobacionesCreateArgs<ExtArgs>>): Prisma.Prisma__historico_aprobacionesClient<runtime.Types.Result.GetResult<Prisma.$historico_aprobacionesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends historico_aprobacionesCreateManyArgs>(args?: Prisma.SelectSubset<T, historico_aprobacionesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends historico_aprobacionesCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, historico_aprobacionesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$historico_aprobacionesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends historico_aprobacionesDeleteArgs>(args: Prisma.SelectSubset<T, historico_aprobacionesDeleteArgs<ExtArgs>>): Prisma.Prisma__historico_aprobacionesClient<runtime.Types.Result.GetResult<Prisma.$historico_aprobacionesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends historico_aprobacionesUpdateArgs>(args: Prisma.SelectSubset<T, historico_aprobacionesUpdateArgs<ExtArgs>>): Prisma.Prisma__historico_aprobacionesClient<runtime.Types.Result.GetResult<Prisma.$historico_aprobacionesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends historico_aprobacionesDeleteManyArgs>(args?: Prisma.SelectSubset<T, historico_aprobacionesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends historico_aprobacionesUpdateManyArgs>(args: Prisma.SelectSubset<T, historico_aprobacionesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends historico_aprobacionesUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, historico_aprobacionesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$historico_aprobacionesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends historico_aprobacionesUpsertArgs>(args: Prisma.SelectSubset<T, historico_aprobacionesUpsertArgs<ExtArgs>>): Prisma.Prisma__historico_aprobacionesClient<runtime.Types.Result.GetResult<Prisma.$historico_aprobacionesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends historico_aprobacionesCountArgs>(args?: Prisma.Subset<T, historico_aprobacionesCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Historico_aprobacionesCountAggregateOutputType> : number>;
    aggregate<T extends Historico_aprobacionesAggregateArgs>(args: Prisma.Subset<T, Historico_aprobacionesAggregateArgs>): Prisma.PrismaPromise<GetHistorico_aprobacionesAggregateType<T>>;
    groupBy<T extends historico_aprobacionesGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: historico_aprobacionesGroupByArgs['orderBy'];
    } : {
        orderBy?: historico_aprobacionesGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, historico_aprobacionesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHistorico_aprobacionesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: historico_aprobacionesFieldRefs;
}
export interface Prisma__historico_aprobacionesClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    procesos<T extends Prisma.historico_aprobaciones$procesosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.historico_aprobaciones$procesosArgs<ExtArgs>>): Prisma.Prisma__procesosClient<runtime.Types.Result.GetResult<Prisma.$procesosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    usuarios<T extends Prisma.historico_aprobaciones$usuariosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.historico_aprobaciones$usuariosArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface historico_aprobacionesFieldRefs {
    readonly id: Prisma.FieldRef<"historico_aprobaciones", 'Int'>;
    readonly proceso_id: Prisma.FieldRef<"historico_aprobaciones", 'Int'>;
    readonly etapa_origen: Prisma.FieldRef<"historico_aprobaciones", 'String'>;
    readonly etapa_destino: Prisma.FieldRef<"historico_aprobaciones", 'String'>;
    readonly accion: Prisma.FieldRef<"historico_aprobaciones", 'String'>;
    readonly razon_rechazo: Prisma.FieldRef<"historico_aprobaciones", 'String'>;
    readonly usuario_id: Prisma.FieldRef<"historico_aprobaciones", 'Int'>;
    readonly fecha_registro: Prisma.FieldRef<"historico_aprobaciones", 'DateTime'>;
}
export type historico_aprobacionesFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.historico_aprobacionesSelect<ExtArgs> | null;
    omit?: Prisma.historico_aprobacionesOmit<ExtArgs> | null;
    include?: Prisma.historico_aprobacionesInclude<ExtArgs> | null;
    where: Prisma.historico_aprobacionesWhereUniqueInput;
};
export type historico_aprobacionesFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.historico_aprobacionesSelect<ExtArgs> | null;
    omit?: Prisma.historico_aprobacionesOmit<ExtArgs> | null;
    include?: Prisma.historico_aprobacionesInclude<ExtArgs> | null;
    where: Prisma.historico_aprobacionesWhereUniqueInput;
};
export type historico_aprobacionesFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type historico_aprobacionesFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type historico_aprobacionesFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type historico_aprobacionesCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.historico_aprobacionesSelect<ExtArgs> | null;
    omit?: Prisma.historico_aprobacionesOmit<ExtArgs> | null;
    include?: Prisma.historico_aprobacionesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.historico_aprobacionesCreateInput, Prisma.historico_aprobacionesUncheckedCreateInput>;
};
export type historico_aprobacionesCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.historico_aprobacionesCreateManyInput | Prisma.historico_aprobacionesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type historico_aprobacionesCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.historico_aprobacionesSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.historico_aprobacionesOmit<ExtArgs> | null;
    data: Prisma.historico_aprobacionesCreateManyInput | Prisma.historico_aprobacionesCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.historico_aprobacionesIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type historico_aprobacionesUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.historico_aprobacionesSelect<ExtArgs> | null;
    omit?: Prisma.historico_aprobacionesOmit<ExtArgs> | null;
    include?: Prisma.historico_aprobacionesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.historico_aprobacionesUpdateInput, Prisma.historico_aprobacionesUncheckedUpdateInput>;
    where: Prisma.historico_aprobacionesWhereUniqueInput;
};
export type historico_aprobacionesUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.historico_aprobacionesUpdateManyMutationInput, Prisma.historico_aprobacionesUncheckedUpdateManyInput>;
    where?: Prisma.historico_aprobacionesWhereInput;
    limit?: number;
};
export type historico_aprobacionesUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.historico_aprobacionesSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.historico_aprobacionesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.historico_aprobacionesUpdateManyMutationInput, Prisma.historico_aprobacionesUncheckedUpdateManyInput>;
    where?: Prisma.historico_aprobacionesWhereInput;
    limit?: number;
    include?: Prisma.historico_aprobacionesIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type historico_aprobacionesUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.historico_aprobacionesSelect<ExtArgs> | null;
    omit?: Prisma.historico_aprobacionesOmit<ExtArgs> | null;
    include?: Prisma.historico_aprobacionesInclude<ExtArgs> | null;
    where: Prisma.historico_aprobacionesWhereUniqueInput;
    create: Prisma.XOR<Prisma.historico_aprobacionesCreateInput, Prisma.historico_aprobacionesUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.historico_aprobacionesUpdateInput, Prisma.historico_aprobacionesUncheckedUpdateInput>;
};
export type historico_aprobacionesDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.historico_aprobacionesSelect<ExtArgs> | null;
    omit?: Prisma.historico_aprobacionesOmit<ExtArgs> | null;
    include?: Prisma.historico_aprobacionesInclude<ExtArgs> | null;
    where: Prisma.historico_aprobacionesWhereUniqueInput;
};
export type historico_aprobacionesDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.historico_aprobacionesWhereInput;
    limit?: number;
};
export type historico_aprobaciones$procesosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.procesosSelect<ExtArgs> | null;
    omit?: Prisma.procesosOmit<ExtArgs> | null;
    include?: Prisma.procesosInclude<ExtArgs> | null;
    where?: Prisma.procesosWhereInput;
};
export type historico_aprobaciones$usuariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usuariosSelect<ExtArgs> | null;
    omit?: Prisma.usuariosOmit<ExtArgs> | null;
    include?: Prisma.usuariosInclude<ExtArgs> | null;
    where?: Prisma.usuariosWhereInput;
};
export type historico_aprobacionesDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.historico_aprobacionesSelect<ExtArgs> | null;
    omit?: Prisma.historico_aprobacionesOmit<ExtArgs> | null;
    include?: Prisma.historico_aprobacionesInclude<ExtArgs> | null;
};
