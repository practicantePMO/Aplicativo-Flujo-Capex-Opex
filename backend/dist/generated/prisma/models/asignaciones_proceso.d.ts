import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type asignaciones_procesoModel = runtime.Types.Result.DefaultSelection<Prisma.$asignaciones_procesoPayload>;
export type AggregateAsignaciones_proceso = {
    _count: Asignaciones_procesoCountAggregateOutputType | null;
    _avg: Asignaciones_procesoAvgAggregateOutputType | null;
    _sum: Asignaciones_procesoSumAggregateOutputType | null;
    _min: Asignaciones_procesoMinAggregateOutputType | null;
    _max: Asignaciones_procesoMaxAggregateOutputType | null;
};
export type Asignaciones_procesoAvgAggregateOutputType = {
    id: number | null;
    proceso_id: number | null;
    rol_id: number | null;
    usuario_id: number | null;
};
export type Asignaciones_procesoSumAggregateOutputType = {
    id: number | null;
    proceso_id: number | null;
    rol_id: number | null;
    usuario_id: number | null;
};
export type Asignaciones_procesoMinAggregateOutputType = {
    id: number | null;
    proceso_id: number | null;
    etapa: string | null;
    rol_id: number | null;
    usuario_id: number | null;
    estado_asignacion: string | null;
    fecha_asignacion: Date | null;
    fecha_resolucion: Date | null;
};
export type Asignaciones_procesoMaxAggregateOutputType = {
    id: number | null;
    proceso_id: number | null;
    etapa: string | null;
    rol_id: number | null;
    usuario_id: number | null;
    estado_asignacion: string | null;
    fecha_asignacion: Date | null;
    fecha_resolucion: Date | null;
};
export type Asignaciones_procesoCountAggregateOutputType = {
    id: number;
    proceso_id: number;
    etapa: number;
    rol_id: number;
    usuario_id: number;
    estado_asignacion: number;
    fecha_asignacion: number;
    fecha_resolucion: number;
    _all: number;
};
export type Asignaciones_procesoAvgAggregateInputType = {
    id?: true;
    proceso_id?: true;
    rol_id?: true;
    usuario_id?: true;
};
export type Asignaciones_procesoSumAggregateInputType = {
    id?: true;
    proceso_id?: true;
    rol_id?: true;
    usuario_id?: true;
};
export type Asignaciones_procesoMinAggregateInputType = {
    id?: true;
    proceso_id?: true;
    etapa?: true;
    rol_id?: true;
    usuario_id?: true;
    estado_asignacion?: true;
    fecha_asignacion?: true;
    fecha_resolucion?: true;
};
export type Asignaciones_procesoMaxAggregateInputType = {
    id?: true;
    proceso_id?: true;
    etapa?: true;
    rol_id?: true;
    usuario_id?: true;
    estado_asignacion?: true;
    fecha_asignacion?: true;
    fecha_resolucion?: true;
};
export type Asignaciones_procesoCountAggregateInputType = {
    id?: true;
    proceso_id?: true;
    etapa?: true;
    rol_id?: true;
    usuario_id?: true;
    estado_asignacion?: true;
    fecha_asignacion?: true;
    fecha_resolucion?: true;
    _all?: true;
};
export type Asignaciones_procesoAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.asignaciones_procesoWhereInput;
    orderBy?: Prisma.asignaciones_procesoOrderByWithRelationInput | Prisma.asignaciones_procesoOrderByWithRelationInput[];
    cursor?: Prisma.asignaciones_procesoWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Asignaciones_procesoCountAggregateInputType;
    _avg?: Asignaciones_procesoAvgAggregateInputType;
    _sum?: Asignaciones_procesoSumAggregateInputType;
    _min?: Asignaciones_procesoMinAggregateInputType;
    _max?: Asignaciones_procesoMaxAggregateInputType;
};
export type GetAsignaciones_procesoAggregateType<T extends Asignaciones_procesoAggregateArgs> = {
    [P in keyof T & keyof AggregateAsignaciones_proceso]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAsignaciones_proceso[P]> : Prisma.GetScalarType<T[P], AggregateAsignaciones_proceso[P]>;
};
export type asignaciones_procesoGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.asignaciones_procesoWhereInput;
    orderBy?: Prisma.asignaciones_procesoOrderByWithAggregationInput | Prisma.asignaciones_procesoOrderByWithAggregationInput[];
    by: Prisma.Asignaciones_procesoScalarFieldEnum[] | Prisma.Asignaciones_procesoScalarFieldEnum;
    having?: Prisma.asignaciones_procesoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Asignaciones_procesoCountAggregateInputType | true;
    _avg?: Asignaciones_procesoAvgAggregateInputType;
    _sum?: Asignaciones_procesoSumAggregateInputType;
    _min?: Asignaciones_procesoMinAggregateInputType;
    _max?: Asignaciones_procesoMaxAggregateInputType;
};
export type Asignaciones_procesoGroupByOutputType = {
    id: number;
    proceso_id: number | null;
    etapa: string;
    rol_id: number | null;
    usuario_id: number | null;
    estado_asignacion: string | null;
    fecha_asignacion: Date | null;
    fecha_resolucion: Date | null;
    _count: Asignaciones_procesoCountAggregateOutputType | null;
    _avg: Asignaciones_procesoAvgAggregateOutputType | null;
    _sum: Asignaciones_procesoSumAggregateOutputType | null;
    _min: Asignaciones_procesoMinAggregateOutputType | null;
    _max: Asignaciones_procesoMaxAggregateOutputType | null;
};
export type GetAsignaciones_procesoGroupByPayload<T extends asignaciones_procesoGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Asignaciones_procesoGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Asignaciones_procesoGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Asignaciones_procesoGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Asignaciones_procesoGroupByOutputType[P]>;
}>>;
export type asignaciones_procesoWhereInput = {
    AND?: Prisma.asignaciones_procesoWhereInput | Prisma.asignaciones_procesoWhereInput[];
    OR?: Prisma.asignaciones_procesoWhereInput[];
    NOT?: Prisma.asignaciones_procesoWhereInput | Prisma.asignaciones_procesoWhereInput[];
    id?: Prisma.IntFilter<"asignaciones_proceso"> | number;
    proceso_id?: Prisma.IntNullableFilter<"asignaciones_proceso"> | number | null;
    etapa?: Prisma.StringFilter<"asignaciones_proceso"> | string;
    rol_id?: Prisma.IntNullableFilter<"asignaciones_proceso"> | number | null;
    usuario_id?: Prisma.IntNullableFilter<"asignaciones_proceso"> | number | null;
    estado_asignacion?: Prisma.StringNullableFilter<"asignaciones_proceso"> | string | null;
    fecha_asignacion?: Prisma.DateTimeNullableFilter<"asignaciones_proceso"> | Date | string | null;
    fecha_resolucion?: Prisma.DateTimeNullableFilter<"asignaciones_proceso"> | Date | string | null;
    procesos?: Prisma.XOR<Prisma.ProcesosNullableScalarRelationFilter, Prisma.procesosWhereInput> | null;
    roles?: Prisma.XOR<Prisma.RolesNullableScalarRelationFilter, Prisma.rolesWhereInput> | null;
    usuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
};
export type asignaciones_procesoOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    proceso_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    etapa?: Prisma.SortOrder;
    rol_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    usuario_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    estado_asignacion?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_asignacion?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_resolucion?: Prisma.SortOrderInput | Prisma.SortOrder;
    procesos?: Prisma.procesosOrderByWithRelationInput;
    roles?: Prisma.rolesOrderByWithRelationInput;
    usuarios?: Prisma.usuariosOrderByWithRelationInput;
};
export type asignaciones_procesoWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.asignaciones_procesoWhereInput | Prisma.asignaciones_procesoWhereInput[];
    OR?: Prisma.asignaciones_procesoWhereInput[];
    NOT?: Prisma.asignaciones_procesoWhereInput | Prisma.asignaciones_procesoWhereInput[];
    proceso_id?: Prisma.IntNullableFilter<"asignaciones_proceso"> | number | null;
    etapa?: Prisma.StringFilter<"asignaciones_proceso"> | string;
    rol_id?: Prisma.IntNullableFilter<"asignaciones_proceso"> | number | null;
    usuario_id?: Prisma.IntNullableFilter<"asignaciones_proceso"> | number | null;
    estado_asignacion?: Prisma.StringNullableFilter<"asignaciones_proceso"> | string | null;
    fecha_asignacion?: Prisma.DateTimeNullableFilter<"asignaciones_proceso"> | Date | string | null;
    fecha_resolucion?: Prisma.DateTimeNullableFilter<"asignaciones_proceso"> | Date | string | null;
    procesos?: Prisma.XOR<Prisma.ProcesosNullableScalarRelationFilter, Prisma.procesosWhereInput> | null;
    roles?: Prisma.XOR<Prisma.RolesNullableScalarRelationFilter, Prisma.rolesWhereInput> | null;
    usuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
}, "id">;
export type asignaciones_procesoOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    proceso_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    etapa?: Prisma.SortOrder;
    rol_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    usuario_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    estado_asignacion?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_asignacion?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_resolucion?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.asignaciones_procesoCountOrderByAggregateInput;
    _avg?: Prisma.asignaciones_procesoAvgOrderByAggregateInput;
    _max?: Prisma.asignaciones_procesoMaxOrderByAggregateInput;
    _min?: Prisma.asignaciones_procesoMinOrderByAggregateInput;
    _sum?: Prisma.asignaciones_procesoSumOrderByAggregateInput;
};
export type asignaciones_procesoScalarWhereWithAggregatesInput = {
    AND?: Prisma.asignaciones_procesoScalarWhereWithAggregatesInput | Prisma.asignaciones_procesoScalarWhereWithAggregatesInput[];
    OR?: Prisma.asignaciones_procesoScalarWhereWithAggregatesInput[];
    NOT?: Prisma.asignaciones_procesoScalarWhereWithAggregatesInput | Prisma.asignaciones_procesoScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"asignaciones_proceso"> | number;
    proceso_id?: Prisma.IntNullableWithAggregatesFilter<"asignaciones_proceso"> | number | null;
    etapa?: Prisma.StringWithAggregatesFilter<"asignaciones_proceso"> | string;
    rol_id?: Prisma.IntNullableWithAggregatesFilter<"asignaciones_proceso"> | number | null;
    usuario_id?: Prisma.IntNullableWithAggregatesFilter<"asignaciones_proceso"> | number | null;
    estado_asignacion?: Prisma.StringNullableWithAggregatesFilter<"asignaciones_proceso"> | string | null;
    fecha_asignacion?: Prisma.DateTimeNullableWithAggregatesFilter<"asignaciones_proceso"> | Date | string | null;
    fecha_resolucion?: Prisma.DateTimeNullableWithAggregatesFilter<"asignaciones_proceso"> | Date | string | null;
};
export type asignaciones_procesoCreateInput = {
    etapa: string;
    estado_asignacion?: string | null;
    fecha_asignacion?: Date | string | null;
    fecha_resolucion?: Date | string | null;
    procesos?: Prisma.procesosCreateNestedOneWithoutAsignaciones_procesoInput;
    roles?: Prisma.rolesCreateNestedOneWithoutAsignaciones_procesoInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutAsignaciones_procesoInput;
};
export type asignaciones_procesoUncheckedCreateInput = {
    id?: number;
    proceso_id?: number | null;
    etapa: string;
    rol_id?: number | null;
    usuario_id?: number | null;
    estado_asignacion?: string | null;
    fecha_asignacion?: Date | string | null;
    fecha_resolucion?: Date | string | null;
};
export type asignaciones_procesoUpdateInput = {
    etapa?: Prisma.StringFieldUpdateOperationsInput | string;
    estado_asignacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_asignacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_resolucion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    procesos?: Prisma.procesosUpdateOneWithoutAsignaciones_procesoNestedInput;
    roles?: Prisma.rolesUpdateOneWithoutAsignaciones_procesoNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutAsignaciones_procesoNestedInput;
};
export type asignaciones_procesoUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    proceso_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    etapa?: Prisma.StringFieldUpdateOperationsInput | string;
    rol_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usuario_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_asignacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_asignacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_resolucion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type asignaciones_procesoCreateManyInput = {
    id?: number;
    proceso_id?: number | null;
    etapa: string;
    rol_id?: number | null;
    usuario_id?: number | null;
    estado_asignacion?: string | null;
    fecha_asignacion?: Date | string | null;
    fecha_resolucion?: Date | string | null;
};
export type asignaciones_procesoUpdateManyMutationInput = {
    etapa?: Prisma.StringFieldUpdateOperationsInput | string;
    estado_asignacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_asignacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_resolucion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type asignaciones_procesoUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    proceso_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    etapa?: Prisma.StringFieldUpdateOperationsInput | string;
    rol_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usuario_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_asignacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_asignacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_resolucion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type asignaciones_procesoCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    proceso_id?: Prisma.SortOrder;
    etapa?: Prisma.SortOrder;
    rol_id?: Prisma.SortOrder;
    usuario_id?: Prisma.SortOrder;
    estado_asignacion?: Prisma.SortOrder;
    fecha_asignacion?: Prisma.SortOrder;
    fecha_resolucion?: Prisma.SortOrder;
};
export type asignaciones_procesoAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    proceso_id?: Prisma.SortOrder;
    rol_id?: Prisma.SortOrder;
    usuario_id?: Prisma.SortOrder;
};
export type asignaciones_procesoMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    proceso_id?: Prisma.SortOrder;
    etapa?: Prisma.SortOrder;
    rol_id?: Prisma.SortOrder;
    usuario_id?: Prisma.SortOrder;
    estado_asignacion?: Prisma.SortOrder;
    fecha_asignacion?: Prisma.SortOrder;
    fecha_resolucion?: Prisma.SortOrder;
};
export type asignaciones_procesoMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    proceso_id?: Prisma.SortOrder;
    etapa?: Prisma.SortOrder;
    rol_id?: Prisma.SortOrder;
    usuario_id?: Prisma.SortOrder;
    estado_asignacion?: Prisma.SortOrder;
    fecha_asignacion?: Prisma.SortOrder;
    fecha_resolucion?: Prisma.SortOrder;
};
export type asignaciones_procesoSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    proceso_id?: Prisma.SortOrder;
    rol_id?: Prisma.SortOrder;
    usuario_id?: Prisma.SortOrder;
};
export type Asignaciones_procesoListRelationFilter = {
    every?: Prisma.asignaciones_procesoWhereInput;
    some?: Prisma.asignaciones_procesoWhereInput;
    none?: Prisma.asignaciones_procesoWhereInput;
};
export type asignaciones_procesoOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type asignaciones_procesoCreateNestedManyWithoutProcesosInput = {
    create?: Prisma.XOR<Prisma.asignaciones_procesoCreateWithoutProcesosInput, Prisma.asignaciones_procesoUncheckedCreateWithoutProcesosInput> | Prisma.asignaciones_procesoCreateWithoutProcesosInput[] | Prisma.asignaciones_procesoUncheckedCreateWithoutProcesosInput[];
    connectOrCreate?: Prisma.asignaciones_procesoCreateOrConnectWithoutProcesosInput | Prisma.asignaciones_procesoCreateOrConnectWithoutProcesosInput[];
    createMany?: Prisma.asignaciones_procesoCreateManyProcesosInputEnvelope;
    connect?: Prisma.asignaciones_procesoWhereUniqueInput | Prisma.asignaciones_procesoWhereUniqueInput[];
};
export type asignaciones_procesoUncheckedCreateNestedManyWithoutProcesosInput = {
    create?: Prisma.XOR<Prisma.asignaciones_procesoCreateWithoutProcesosInput, Prisma.asignaciones_procesoUncheckedCreateWithoutProcesosInput> | Prisma.asignaciones_procesoCreateWithoutProcesosInput[] | Prisma.asignaciones_procesoUncheckedCreateWithoutProcesosInput[];
    connectOrCreate?: Prisma.asignaciones_procesoCreateOrConnectWithoutProcesosInput | Prisma.asignaciones_procesoCreateOrConnectWithoutProcesosInput[];
    createMany?: Prisma.asignaciones_procesoCreateManyProcesosInputEnvelope;
    connect?: Prisma.asignaciones_procesoWhereUniqueInput | Prisma.asignaciones_procesoWhereUniqueInput[];
};
export type asignaciones_procesoUpdateManyWithoutProcesosNestedInput = {
    create?: Prisma.XOR<Prisma.asignaciones_procesoCreateWithoutProcesosInput, Prisma.asignaciones_procesoUncheckedCreateWithoutProcesosInput> | Prisma.asignaciones_procesoCreateWithoutProcesosInput[] | Prisma.asignaciones_procesoUncheckedCreateWithoutProcesosInput[];
    connectOrCreate?: Prisma.asignaciones_procesoCreateOrConnectWithoutProcesosInput | Prisma.asignaciones_procesoCreateOrConnectWithoutProcesosInput[];
    upsert?: Prisma.asignaciones_procesoUpsertWithWhereUniqueWithoutProcesosInput | Prisma.asignaciones_procesoUpsertWithWhereUniqueWithoutProcesosInput[];
    createMany?: Prisma.asignaciones_procesoCreateManyProcesosInputEnvelope;
    set?: Prisma.asignaciones_procesoWhereUniqueInput | Prisma.asignaciones_procesoWhereUniqueInput[];
    disconnect?: Prisma.asignaciones_procesoWhereUniqueInput | Prisma.asignaciones_procesoWhereUniqueInput[];
    delete?: Prisma.asignaciones_procesoWhereUniqueInput | Prisma.asignaciones_procesoWhereUniqueInput[];
    connect?: Prisma.asignaciones_procesoWhereUniqueInput | Prisma.asignaciones_procesoWhereUniqueInput[];
    update?: Prisma.asignaciones_procesoUpdateWithWhereUniqueWithoutProcesosInput | Prisma.asignaciones_procesoUpdateWithWhereUniqueWithoutProcesosInput[];
    updateMany?: Prisma.asignaciones_procesoUpdateManyWithWhereWithoutProcesosInput | Prisma.asignaciones_procesoUpdateManyWithWhereWithoutProcesosInput[];
    deleteMany?: Prisma.asignaciones_procesoScalarWhereInput | Prisma.asignaciones_procesoScalarWhereInput[];
};
export type asignaciones_procesoUncheckedUpdateManyWithoutProcesosNestedInput = {
    create?: Prisma.XOR<Prisma.asignaciones_procesoCreateWithoutProcesosInput, Prisma.asignaciones_procesoUncheckedCreateWithoutProcesosInput> | Prisma.asignaciones_procesoCreateWithoutProcesosInput[] | Prisma.asignaciones_procesoUncheckedCreateWithoutProcesosInput[];
    connectOrCreate?: Prisma.asignaciones_procesoCreateOrConnectWithoutProcesosInput | Prisma.asignaciones_procesoCreateOrConnectWithoutProcesosInput[];
    upsert?: Prisma.asignaciones_procesoUpsertWithWhereUniqueWithoutProcesosInput | Prisma.asignaciones_procesoUpsertWithWhereUniqueWithoutProcesosInput[];
    createMany?: Prisma.asignaciones_procesoCreateManyProcesosInputEnvelope;
    set?: Prisma.asignaciones_procesoWhereUniqueInput | Prisma.asignaciones_procesoWhereUniqueInput[];
    disconnect?: Prisma.asignaciones_procesoWhereUniqueInput | Prisma.asignaciones_procesoWhereUniqueInput[];
    delete?: Prisma.asignaciones_procesoWhereUniqueInput | Prisma.asignaciones_procesoWhereUniqueInput[];
    connect?: Prisma.asignaciones_procesoWhereUniqueInput | Prisma.asignaciones_procesoWhereUniqueInput[];
    update?: Prisma.asignaciones_procesoUpdateWithWhereUniqueWithoutProcesosInput | Prisma.asignaciones_procesoUpdateWithWhereUniqueWithoutProcesosInput[];
    updateMany?: Prisma.asignaciones_procesoUpdateManyWithWhereWithoutProcesosInput | Prisma.asignaciones_procesoUpdateManyWithWhereWithoutProcesosInput[];
    deleteMany?: Prisma.asignaciones_procesoScalarWhereInput | Prisma.asignaciones_procesoScalarWhereInput[];
};
export type asignaciones_procesoCreateNestedManyWithoutRolesInput = {
    create?: Prisma.XOR<Prisma.asignaciones_procesoCreateWithoutRolesInput, Prisma.asignaciones_procesoUncheckedCreateWithoutRolesInput> | Prisma.asignaciones_procesoCreateWithoutRolesInput[] | Prisma.asignaciones_procesoUncheckedCreateWithoutRolesInput[];
    connectOrCreate?: Prisma.asignaciones_procesoCreateOrConnectWithoutRolesInput | Prisma.asignaciones_procesoCreateOrConnectWithoutRolesInput[];
    createMany?: Prisma.asignaciones_procesoCreateManyRolesInputEnvelope;
    connect?: Prisma.asignaciones_procesoWhereUniqueInput | Prisma.asignaciones_procesoWhereUniqueInput[];
};
export type asignaciones_procesoUncheckedCreateNestedManyWithoutRolesInput = {
    create?: Prisma.XOR<Prisma.asignaciones_procesoCreateWithoutRolesInput, Prisma.asignaciones_procesoUncheckedCreateWithoutRolesInput> | Prisma.asignaciones_procesoCreateWithoutRolesInput[] | Prisma.asignaciones_procesoUncheckedCreateWithoutRolesInput[];
    connectOrCreate?: Prisma.asignaciones_procesoCreateOrConnectWithoutRolesInput | Prisma.asignaciones_procesoCreateOrConnectWithoutRolesInput[];
    createMany?: Prisma.asignaciones_procesoCreateManyRolesInputEnvelope;
    connect?: Prisma.asignaciones_procesoWhereUniqueInput | Prisma.asignaciones_procesoWhereUniqueInput[];
};
export type asignaciones_procesoUpdateManyWithoutRolesNestedInput = {
    create?: Prisma.XOR<Prisma.asignaciones_procesoCreateWithoutRolesInput, Prisma.asignaciones_procesoUncheckedCreateWithoutRolesInput> | Prisma.asignaciones_procesoCreateWithoutRolesInput[] | Prisma.asignaciones_procesoUncheckedCreateWithoutRolesInput[];
    connectOrCreate?: Prisma.asignaciones_procesoCreateOrConnectWithoutRolesInput | Prisma.asignaciones_procesoCreateOrConnectWithoutRolesInput[];
    upsert?: Prisma.asignaciones_procesoUpsertWithWhereUniqueWithoutRolesInput | Prisma.asignaciones_procesoUpsertWithWhereUniqueWithoutRolesInput[];
    createMany?: Prisma.asignaciones_procesoCreateManyRolesInputEnvelope;
    set?: Prisma.asignaciones_procesoWhereUniqueInput | Prisma.asignaciones_procesoWhereUniqueInput[];
    disconnect?: Prisma.asignaciones_procesoWhereUniqueInput | Prisma.asignaciones_procesoWhereUniqueInput[];
    delete?: Prisma.asignaciones_procesoWhereUniqueInput | Prisma.asignaciones_procesoWhereUniqueInput[];
    connect?: Prisma.asignaciones_procesoWhereUniqueInput | Prisma.asignaciones_procesoWhereUniqueInput[];
    update?: Prisma.asignaciones_procesoUpdateWithWhereUniqueWithoutRolesInput | Prisma.asignaciones_procesoUpdateWithWhereUniqueWithoutRolesInput[];
    updateMany?: Prisma.asignaciones_procesoUpdateManyWithWhereWithoutRolesInput | Prisma.asignaciones_procesoUpdateManyWithWhereWithoutRolesInput[];
    deleteMany?: Prisma.asignaciones_procesoScalarWhereInput | Prisma.asignaciones_procesoScalarWhereInput[];
};
export type asignaciones_procesoUncheckedUpdateManyWithoutRolesNestedInput = {
    create?: Prisma.XOR<Prisma.asignaciones_procesoCreateWithoutRolesInput, Prisma.asignaciones_procesoUncheckedCreateWithoutRolesInput> | Prisma.asignaciones_procesoCreateWithoutRolesInput[] | Prisma.asignaciones_procesoUncheckedCreateWithoutRolesInput[];
    connectOrCreate?: Prisma.asignaciones_procesoCreateOrConnectWithoutRolesInput | Prisma.asignaciones_procesoCreateOrConnectWithoutRolesInput[];
    upsert?: Prisma.asignaciones_procesoUpsertWithWhereUniqueWithoutRolesInput | Prisma.asignaciones_procesoUpsertWithWhereUniqueWithoutRolesInput[];
    createMany?: Prisma.asignaciones_procesoCreateManyRolesInputEnvelope;
    set?: Prisma.asignaciones_procesoWhereUniqueInput | Prisma.asignaciones_procesoWhereUniqueInput[];
    disconnect?: Prisma.asignaciones_procesoWhereUniqueInput | Prisma.asignaciones_procesoWhereUniqueInput[];
    delete?: Prisma.asignaciones_procesoWhereUniqueInput | Prisma.asignaciones_procesoWhereUniqueInput[];
    connect?: Prisma.asignaciones_procesoWhereUniqueInput | Prisma.asignaciones_procesoWhereUniqueInput[];
    update?: Prisma.asignaciones_procesoUpdateWithWhereUniqueWithoutRolesInput | Prisma.asignaciones_procesoUpdateWithWhereUniqueWithoutRolesInput[];
    updateMany?: Prisma.asignaciones_procesoUpdateManyWithWhereWithoutRolesInput | Prisma.asignaciones_procesoUpdateManyWithWhereWithoutRolesInput[];
    deleteMany?: Prisma.asignaciones_procesoScalarWhereInput | Prisma.asignaciones_procesoScalarWhereInput[];
};
export type asignaciones_procesoCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.asignaciones_procesoCreateWithoutUsuariosInput, Prisma.asignaciones_procesoUncheckedCreateWithoutUsuariosInput> | Prisma.asignaciones_procesoCreateWithoutUsuariosInput[] | Prisma.asignaciones_procesoUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.asignaciones_procesoCreateOrConnectWithoutUsuariosInput | Prisma.asignaciones_procesoCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.asignaciones_procesoCreateManyUsuariosInputEnvelope;
    connect?: Prisma.asignaciones_procesoWhereUniqueInput | Prisma.asignaciones_procesoWhereUniqueInput[];
};
export type asignaciones_procesoUncheckedCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.asignaciones_procesoCreateWithoutUsuariosInput, Prisma.asignaciones_procesoUncheckedCreateWithoutUsuariosInput> | Prisma.asignaciones_procesoCreateWithoutUsuariosInput[] | Prisma.asignaciones_procesoUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.asignaciones_procesoCreateOrConnectWithoutUsuariosInput | Prisma.asignaciones_procesoCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.asignaciones_procesoCreateManyUsuariosInputEnvelope;
    connect?: Prisma.asignaciones_procesoWhereUniqueInput | Prisma.asignaciones_procesoWhereUniqueInput[];
};
export type asignaciones_procesoUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.asignaciones_procesoCreateWithoutUsuariosInput, Prisma.asignaciones_procesoUncheckedCreateWithoutUsuariosInput> | Prisma.asignaciones_procesoCreateWithoutUsuariosInput[] | Prisma.asignaciones_procesoUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.asignaciones_procesoCreateOrConnectWithoutUsuariosInput | Prisma.asignaciones_procesoCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.asignaciones_procesoUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.asignaciones_procesoUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.asignaciones_procesoCreateManyUsuariosInputEnvelope;
    set?: Prisma.asignaciones_procesoWhereUniqueInput | Prisma.asignaciones_procesoWhereUniqueInput[];
    disconnect?: Prisma.asignaciones_procesoWhereUniqueInput | Prisma.asignaciones_procesoWhereUniqueInput[];
    delete?: Prisma.asignaciones_procesoWhereUniqueInput | Prisma.asignaciones_procesoWhereUniqueInput[];
    connect?: Prisma.asignaciones_procesoWhereUniqueInput | Prisma.asignaciones_procesoWhereUniqueInput[];
    update?: Prisma.asignaciones_procesoUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.asignaciones_procesoUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.asignaciones_procesoUpdateManyWithWhereWithoutUsuariosInput | Prisma.asignaciones_procesoUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.asignaciones_procesoScalarWhereInput | Prisma.asignaciones_procesoScalarWhereInput[];
};
export type asignaciones_procesoUncheckedUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.asignaciones_procesoCreateWithoutUsuariosInput, Prisma.asignaciones_procesoUncheckedCreateWithoutUsuariosInput> | Prisma.asignaciones_procesoCreateWithoutUsuariosInput[] | Prisma.asignaciones_procesoUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.asignaciones_procesoCreateOrConnectWithoutUsuariosInput | Prisma.asignaciones_procesoCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.asignaciones_procesoUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.asignaciones_procesoUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.asignaciones_procesoCreateManyUsuariosInputEnvelope;
    set?: Prisma.asignaciones_procesoWhereUniqueInput | Prisma.asignaciones_procesoWhereUniqueInput[];
    disconnect?: Prisma.asignaciones_procesoWhereUniqueInput | Prisma.asignaciones_procesoWhereUniqueInput[];
    delete?: Prisma.asignaciones_procesoWhereUniqueInput | Prisma.asignaciones_procesoWhereUniqueInput[];
    connect?: Prisma.asignaciones_procesoWhereUniqueInput | Prisma.asignaciones_procesoWhereUniqueInput[];
    update?: Prisma.asignaciones_procesoUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.asignaciones_procesoUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.asignaciones_procesoUpdateManyWithWhereWithoutUsuariosInput | Prisma.asignaciones_procesoUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.asignaciones_procesoScalarWhereInput | Prisma.asignaciones_procesoScalarWhereInput[];
};
export type asignaciones_procesoCreateWithoutProcesosInput = {
    etapa: string;
    estado_asignacion?: string | null;
    fecha_asignacion?: Date | string | null;
    fecha_resolucion?: Date | string | null;
    roles?: Prisma.rolesCreateNestedOneWithoutAsignaciones_procesoInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutAsignaciones_procesoInput;
};
export type asignaciones_procesoUncheckedCreateWithoutProcesosInput = {
    id?: number;
    etapa: string;
    rol_id?: number | null;
    usuario_id?: number | null;
    estado_asignacion?: string | null;
    fecha_asignacion?: Date | string | null;
    fecha_resolucion?: Date | string | null;
};
export type asignaciones_procesoCreateOrConnectWithoutProcesosInput = {
    where: Prisma.asignaciones_procesoWhereUniqueInput;
    create: Prisma.XOR<Prisma.asignaciones_procesoCreateWithoutProcesosInput, Prisma.asignaciones_procesoUncheckedCreateWithoutProcesosInput>;
};
export type asignaciones_procesoCreateManyProcesosInputEnvelope = {
    data: Prisma.asignaciones_procesoCreateManyProcesosInput | Prisma.asignaciones_procesoCreateManyProcesosInput[];
    skipDuplicates?: boolean;
};
export type asignaciones_procesoUpsertWithWhereUniqueWithoutProcesosInput = {
    where: Prisma.asignaciones_procesoWhereUniqueInput;
    update: Prisma.XOR<Prisma.asignaciones_procesoUpdateWithoutProcesosInput, Prisma.asignaciones_procesoUncheckedUpdateWithoutProcesosInput>;
    create: Prisma.XOR<Prisma.asignaciones_procesoCreateWithoutProcesosInput, Prisma.asignaciones_procesoUncheckedCreateWithoutProcesosInput>;
};
export type asignaciones_procesoUpdateWithWhereUniqueWithoutProcesosInput = {
    where: Prisma.asignaciones_procesoWhereUniqueInput;
    data: Prisma.XOR<Prisma.asignaciones_procesoUpdateWithoutProcesosInput, Prisma.asignaciones_procesoUncheckedUpdateWithoutProcesosInput>;
};
export type asignaciones_procesoUpdateManyWithWhereWithoutProcesosInput = {
    where: Prisma.asignaciones_procesoScalarWhereInput;
    data: Prisma.XOR<Prisma.asignaciones_procesoUpdateManyMutationInput, Prisma.asignaciones_procesoUncheckedUpdateManyWithoutProcesosInput>;
};
export type asignaciones_procesoScalarWhereInput = {
    AND?: Prisma.asignaciones_procesoScalarWhereInput | Prisma.asignaciones_procesoScalarWhereInput[];
    OR?: Prisma.asignaciones_procesoScalarWhereInput[];
    NOT?: Prisma.asignaciones_procesoScalarWhereInput | Prisma.asignaciones_procesoScalarWhereInput[];
    id?: Prisma.IntFilter<"asignaciones_proceso"> | number;
    proceso_id?: Prisma.IntNullableFilter<"asignaciones_proceso"> | number | null;
    etapa?: Prisma.StringFilter<"asignaciones_proceso"> | string;
    rol_id?: Prisma.IntNullableFilter<"asignaciones_proceso"> | number | null;
    usuario_id?: Prisma.IntNullableFilter<"asignaciones_proceso"> | number | null;
    estado_asignacion?: Prisma.StringNullableFilter<"asignaciones_proceso"> | string | null;
    fecha_asignacion?: Prisma.DateTimeNullableFilter<"asignaciones_proceso"> | Date | string | null;
    fecha_resolucion?: Prisma.DateTimeNullableFilter<"asignaciones_proceso"> | Date | string | null;
};
export type asignaciones_procesoCreateWithoutRolesInput = {
    etapa: string;
    estado_asignacion?: string | null;
    fecha_asignacion?: Date | string | null;
    fecha_resolucion?: Date | string | null;
    procesos?: Prisma.procesosCreateNestedOneWithoutAsignaciones_procesoInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutAsignaciones_procesoInput;
};
export type asignaciones_procesoUncheckedCreateWithoutRolesInput = {
    id?: number;
    proceso_id?: number | null;
    etapa: string;
    usuario_id?: number | null;
    estado_asignacion?: string | null;
    fecha_asignacion?: Date | string | null;
    fecha_resolucion?: Date | string | null;
};
export type asignaciones_procesoCreateOrConnectWithoutRolesInput = {
    where: Prisma.asignaciones_procesoWhereUniqueInput;
    create: Prisma.XOR<Prisma.asignaciones_procesoCreateWithoutRolesInput, Prisma.asignaciones_procesoUncheckedCreateWithoutRolesInput>;
};
export type asignaciones_procesoCreateManyRolesInputEnvelope = {
    data: Prisma.asignaciones_procesoCreateManyRolesInput | Prisma.asignaciones_procesoCreateManyRolesInput[];
    skipDuplicates?: boolean;
};
export type asignaciones_procesoUpsertWithWhereUniqueWithoutRolesInput = {
    where: Prisma.asignaciones_procesoWhereUniqueInput;
    update: Prisma.XOR<Prisma.asignaciones_procesoUpdateWithoutRolesInput, Prisma.asignaciones_procesoUncheckedUpdateWithoutRolesInput>;
    create: Prisma.XOR<Prisma.asignaciones_procesoCreateWithoutRolesInput, Prisma.asignaciones_procesoUncheckedCreateWithoutRolesInput>;
};
export type asignaciones_procesoUpdateWithWhereUniqueWithoutRolesInput = {
    where: Prisma.asignaciones_procesoWhereUniqueInput;
    data: Prisma.XOR<Prisma.asignaciones_procesoUpdateWithoutRolesInput, Prisma.asignaciones_procesoUncheckedUpdateWithoutRolesInput>;
};
export type asignaciones_procesoUpdateManyWithWhereWithoutRolesInput = {
    where: Prisma.asignaciones_procesoScalarWhereInput;
    data: Prisma.XOR<Prisma.asignaciones_procesoUpdateManyMutationInput, Prisma.asignaciones_procesoUncheckedUpdateManyWithoutRolesInput>;
};
export type asignaciones_procesoCreateWithoutUsuariosInput = {
    etapa: string;
    estado_asignacion?: string | null;
    fecha_asignacion?: Date | string | null;
    fecha_resolucion?: Date | string | null;
    procesos?: Prisma.procesosCreateNestedOneWithoutAsignaciones_procesoInput;
    roles?: Prisma.rolesCreateNestedOneWithoutAsignaciones_procesoInput;
};
export type asignaciones_procesoUncheckedCreateWithoutUsuariosInput = {
    id?: number;
    proceso_id?: number | null;
    etapa: string;
    rol_id?: number | null;
    estado_asignacion?: string | null;
    fecha_asignacion?: Date | string | null;
    fecha_resolucion?: Date | string | null;
};
export type asignaciones_procesoCreateOrConnectWithoutUsuariosInput = {
    where: Prisma.asignaciones_procesoWhereUniqueInput;
    create: Prisma.XOR<Prisma.asignaciones_procesoCreateWithoutUsuariosInput, Prisma.asignaciones_procesoUncheckedCreateWithoutUsuariosInput>;
};
export type asignaciones_procesoCreateManyUsuariosInputEnvelope = {
    data: Prisma.asignaciones_procesoCreateManyUsuariosInput | Prisma.asignaciones_procesoCreateManyUsuariosInput[];
    skipDuplicates?: boolean;
};
export type asignaciones_procesoUpsertWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.asignaciones_procesoWhereUniqueInput;
    update: Prisma.XOR<Prisma.asignaciones_procesoUpdateWithoutUsuariosInput, Prisma.asignaciones_procesoUncheckedUpdateWithoutUsuariosInput>;
    create: Prisma.XOR<Prisma.asignaciones_procesoCreateWithoutUsuariosInput, Prisma.asignaciones_procesoUncheckedCreateWithoutUsuariosInput>;
};
export type asignaciones_procesoUpdateWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.asignaciones_procesoWhereUniqueInput;
    data: Prisma.XOR<Prisma.asignaciones_procesoUpdateWithoutUsuariosInput, Prisma.asignaciones_procesoUncheckedUpdateWithoutUsuariosInput>;
};
export type asignaciones_procesoUpdateManyWithWhereWithoutUsuariosInput = {
    where: Prisma.asignaciones_procesoScalarWhereInput;
    data: Prisma.XOR<Prisma.asignaciones_procesoUpdateManyMutationInput, Prisma.asignaciones_procesoUncheckedUpdateManyWithoutUsuariosInput>;
};
export type asignaciones_procesoCreateManyProcesosInput = {
    id?: number;
    etapa: string;
    rol_id?: number | null;
    usuario_id?: number | null;
    estado_asignacion?: string | null;
    fecha_asignacion?: Date | string | null;
    fecha_resolucion?: Date | string | null;
};
export type asignaciones_procesoUpdateWithoutProcesosInput = {
    etapa?: Prisma.StringFieldUpdateOperationsInput | string;
    estado_asignacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_asignacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_resolucion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    roles?: Prisma.rolesUpdateOneWithoutAsignaciones_procesoNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutAsignaciones_procesoNestedInput;
};
export type asignaciones_procesoUncheckedUpdateWithoutProcesosInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    etapa?: Prisma.StringFieldUpdateOperationsInput | string;
    rol_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usuario_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_asignacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_asignacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_resolucion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type asignaciones_procesoUncheckedUpdateManyWithoutProcesosInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    etapa?: Prisma.StringFieldUpdateOperationsInput | string;
    rol_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    usuario_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_asignacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_asignacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_resolucion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type asignaciones_procesoCreateManyRolesInput = {
    id?: number;
    proceso_id?: number | null;
    etapa: string;
    usuario_id?: number | null;
    estado_asignacion?: string | null;
    fecha_asignacion?: Date | string | null;
    fecha_resolucion?: Date | string | null;
};
export type asignaciones_procesoUpdateWithoutRolesInput = {
    etapa?: Prisma.StringFieldUpdateOperationsInput | string;
    estado_asignacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_asignacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_resolucion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    procesos?: Prisma.procesosUpdateOneWithoutAsignaciones_procesoNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutAsignaciones_procesoNestedInput;
};
export type asignaciones_procesoUncheckedUpdateWithoutRolesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    proceso_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    etapa?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_asignacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_asignacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_resolucion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type asignaciones_procesoUncheckedUpdateManyWithoutRolesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    proceso_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    etapa?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_asignacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_asignacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_resolucion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type asignaciones_procesoCreateManyUsuariosInput = {
    id?: number;
    proceso_id?: number | null;
    etapa: string;
    rol_id?: number | null;
    estado_asignacion?: string | null;
    fecha_asignacion?: Date | string | null;
    fecha_resolucion?: Date | string | null;
};
export type asignaciones_procesoUpdateWithoutUsuariosInput = {
    etapa?: Prisma.StringFieldUpdateOperationsInput | string;
    estado_asignacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_asignacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_resolucion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    procesos?: Prisma.procesosUpdateOneWithoutAsignaciones_procesoNestedInput;
    roles?: Prisma.rolesUpdateOneWithoutAsignaciones_procesoNestedInput;
};
export type asignaciones_procesoUncheckedUpdateWithoutUsuariosInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    proceso_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    etapa?: Prisma.StringFieldUpdateOperationsInput | string;
    rol_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_asignacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_asignacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_resolucion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type asignaciones_procesoUncheckedUpdateManyWithoutUsuariosInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    proceso_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    etapa?: Prisma.StringFieldUpdateOperationsInput | string;
    rol_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    estado_asignacion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fecha_asignacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fecha_resolucion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type asignaciones_procesoSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    proceso_id?: boolean;
    etapa?: boolean;
    rol_id?: boolean;
    usuario_id?: boolean;
    estado_asignacion?: boolean;
    fecha_asignacion?: boolean;
    fecha_resolucion?: boolean;
    procesos?: boolean | Prisma.asignaciones_proceso$procesosArgs<ExtArgs>;
    roles?: boolean | Prisma.asignaciones_proceso$rolesArgs<ExtArgs>;
    usuarios?: boolean | Prisma.asignaciones_proceso$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["asignaciones_proceso"]>;
export type asignaciones_procesoSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    proceso_id?: boolean;
    etapa?: boolean;
    rol_id?: boolean;
    usuario_id?: boolean;
    estado_asignacion?: boolean;
    fecha_asignacion?: boolean;
    fecha_resolucion?: boolean;
    procesos?: boolean | Prisma.asignaciones_proceso$procesosArgs<ExtArgs>;
    roles?: boolean | Prisma.asignaciones_proceso$rolesArgs<ExtArgs>;
    usuarios?: boolean | Prisma.asignaciones_proceso$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["asignaciones_proceso"]>;
export type asignaciones_procesoSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    proceso_id?: boolean;
    etapa?: boolean;
    rol_id?: boolean;
    usuario_id?: boolean;
    estado_asignacion?: boolean;
    fecha_asignacion?: boolean;
    fecha_resolucion?: boolean;
    procesos?: boolean | Prisma.asignaciones_proceso$procesosArgs<ExtArgs>;
    roles?: boolean | Prisma.asignaciones_proceso$rolesArgs<ExtArgs>;
    usuarios?: boolean | Prisma.asignaciones_proceso$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["asignaciones_proceso"]>;
export type asignaciones_procesoSelectScalar = {
    id?: boolean;
    proceso_id?: boolean;
    etapa?: boolean;
    rol_id?: boolean;
    usuario_id?: boolean;
    estado_asignacion?: boolean;
    fecha_asignacion?: boolean;
    fecha_resolucion?: boolean;
};
export type asignaciones_procesoOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "proceso_id" | "etapa" | "rol_id" | "usuario_id" | "estado_asignacion" | "fecha_asignacion" | "fecha_resolucion", ExtArgs["result"]["asignaciones_proceso"]>;
export type asignaciones_procesoInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    procesos?: boolean | Prisma.asignaciones_proceso$procesosArgs<ExtArgs>;
    roles?: boolean | Prisma.asignaciones_proceso$rolesArgs<ExtArgs>;
    usuarios?: boolean | Prisma.asignaciones_proceso$usuariosArgs<ExtArgs>;
};
export type asignaciones_procesoIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    procesos?: boolean | Prisma.asignaciones_proceso$procesosArgs<ExtArgs>;
    roles?: boolean | Prisma.asignaciones_proceso$rolesArgs<ExtArgs>;
    usuarios?: boolean | Prisma.asignaciones_proceso$usuariosArgs<ExtArgs>;
};
export type asignaciones_procesoIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    procesos?: boolean | Prisma.asignaciones_proceso$procesosArgs<ExtArgs>;
    roles?: boolean | Prisma.asignaciones_proceso$rolesArgs<ExtArgs>;
    usuarios?: boolean | Prisma.asignaciones_proceso$usuariosArgs<ExtArgs>;
};
export type $asignaciones_procesoPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "asignaciones_proceso";
    objects: {
        procesos: Prisma.$procesosPayload<ExtArgs> | null;
        roles: Prisma.$rolesPayload<ExtArgs> | null;
        usuarios: Prisma.$usuariosPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        proceso_id: number | null;
        etapa: string;
        rol_id: number | null;
        usuario_id: number | null;
        estado_asignacion: string | null;
        fecha_asignacion: Date | null;
        fecha_resolucion: Date | null;
    }, ExtArgs["result"]["asignaciones_proceso"]>;
    composites: {};
};
export type asignaciones_procesoGetPayload<S extends boolean | null | undefined | asignaciones_procesoDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$asignaciones_procesoPayload, S>;
export type asignaciones_procesoCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<asignaciones_procesoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Asignaciones_procesoCountAggregateInputType | true;
};
export interface asignaciones_procesoDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['asignaciones_proceso'];
        meta: {
            name: 'asignaciones_proceso';
        };
    };
    findUnique<T extends asignaciones_procesoFindUniqueArgs>(args: Prisma.SelectSubset<T, asignaciones_procesoFindUniqueArgs<ExtArgs>>): Prisma.Prisma__asignaciones_procesoClient<runtime.Types.Result.GetResult<Prisma.$asignaciones_procesoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends asignaciones_procesoFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, asignaciones_procesoFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__asignaciones_procesoClient<runtime.Types.Result.GetResult<Prisma.$asignaciones_procesoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends asignaciones_procesoFindFirstArgs>(args?: Prisma.SelectSubset<T, asignaciones_procesoFindFirstArgs<ExtArgs>>): Prisma.Prisma__asignaciones_procesoClient<runtime.Types.Result.GetResult<Prisma.$asignaciones_procesoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends asignaciones_procesoFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, asignaciones_procesoFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__asignaciones_procesoClient<runtime.Types.Result.GetResult<Prisma.$asignaciones_procesoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends asignaciones_procesoFindManyArgs>(args?: Prisma.SelectSubset<T, asignaciones_procesoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$asignaciones_procesoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends asignaciones_procesoCreateArgs>(args: Prisma.SelectSubset<T, asignaciones_procesoCreateArgs<ExtArgs>>): Prisma.Prisma__asignaciones_procesoClient<runtime.Types.Result.GetResult<Prisma.$asignaciones_procesoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends asignaciones_procesoCreateManyArgs>(args?: Prisma.SelectSubset<T, asignaciones_procesoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends asignaciones_procesoCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, asignaciones_procesoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$asignaciones_procesoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends asignaciones_procesoDeleteArgs>(args: Prisma.SelectSubset<T, asignaciones_procesoDeleteArgs<ExtArgs>>): Prisma.Prisma__asignaciones_procesoClient<runtime.Types.Result.GetResult<Prisma.$asignaciones_procesoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends asignaciones_procesoUpdateArgs>(args: Prisma.SelectSubset<T, asignaciones_procesoUpdateArgs<ExtArgs>>): Prisma.Prisma__asignaciones_procesoClient<runtime.Types.Result.GetResult<Prisma.$asignaciones_procesoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends asignaciones_procesoDeleteManyArgs>(args?: Prisma.SelectSubset<T, asignaciones_procesoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends asignaciones_procesoUpdateManyArgs>(args: Prisma.SelectSubset<T, asignaciones_procesoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends asignaciones_procesoUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, asignaciones_procesoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$asignaciones_procesoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends asignaciones_procesoUpsertArgs>(args: Prisma.SelectSubset<T, asignaciones_procesoUpsertArgs<ExtArgs>>): Prisma.Prisma__asignaciones_procesoClient<runtime.Types.Result.GetResult<Prisma.$asignaciones_procesoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends asignaciones_procesoCountArgs>(args?: Prisma.Subset<T, asignaciones_procesoCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Asignaciones_procesoCountAggregateOutputType> : number>;
    aggregate<T extends Asignaciones_procesoAggregateArgs>(args: Prisma.Subset<T, Asignaciones_procesoAggregateArgs>): Prisma.PrismaPromise<GetAsignaciones_procesoAggregateType<T>>;
    groupBy<T extends asignaciones_procesoGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: asignaciones_procesoGroupByArgs['orderBy'];
    } : {
        orderBy?: asignaciones_procesoGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, asignaciones_procesoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAsignaciones_procesoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: asignaciones_procesoFieldRefs;
}
export interface Prisma__asignaciones_procesoClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    procesos<T extends Prisma.asignaciones_proceso$procesosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.asignaciones_proceso$procesosArgs<ExtArgs>>): Prisma.Prisma__procesosClient<runtime.Types.Result.GetResult<Prisma.$procesosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    roles<T extends Prisma.asignaciones_proceso$rolesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.asignaciones_proceso$rolesArgs<ExtArgs>>): Prisma.Prisma__rolesClient<runtime.Types.Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    usuarios<T extends Prisma.asignaciones_proceso$usuariosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.asignaciones_proceso$usuariosArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface asignaciones_procesoFieldRefs {
    readonly id: Prisma.FieldRef<"asignaciones_proceso", 'Int'>;
    readonly proceso_id: Prisma.FieldRef<"asignaciones_proceso", 'Int'>;
    readonly etapa: Prisma.FieldRef<"asignaciones_proceso", 'String'>;
    readonly rol_id: Prisma.FieldRef<"asignaciones_proceso", 'Int'>;
    readonly usuario_id: Prisma.FieldRef<"asignaciones_proceso", 'Int'>;
    readonly estado_asignacion: Prisma.FieldRef<"asignaciones_proceso", 'String'>;
    readonly fecha_asignacion: Prisma.FieldRef<"asignaciones_proceso", 'DateTime'>;
    readonly fecha_resolucion: Prisma.FieldRef<"asignaciones_proceso", 'DateTime'>;
}
export type asignaciones_procesoFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.asignaciones_procesoSelect<ExtArgs> | null;
    omit?: Prisma.asignaciones_procesoOmit<ExtArgs> | null;
    include?: Prisma.asignaciones_procesoInclude<ExtArgs> | null;
    where: Prisma.asignaciones_procesoWhereUniqueInput;
};
export type asignaciones_procesoFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.asignaciones_procesoSelect<ExtArgs> | null;
    omit?: Prisma.asignaciones_procesoOmit<ExtArgs> | null;
    include?: Prisma.asignaciones_procesoInclude<ExtArgs> | null;
    where: Prisma.asignaciones_procesoWhereUniqueInput;
};
export type asignaciones_procesoFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type asignaciones_procesoFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type asignaciones_procesoFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type asignaciones_procesoCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.asignaciones_procesoSelect<ExtArgs> | null;
    omit?: Prisma.asignaciones_procesoOmit<ExtArgs> | null;
    include?: Prisma.asignaciones_procesoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.asignaciones_procesoCreateInput, Prisma.asignaciones_procesoUncheckedCreateInput>;
};
export type asignaciones_procesoCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.asignaciones_procesoCreateManyInput | Prisma.asignaciones_procesoCreateManyInput[];
    skipDuplicates?: boolean;
};
export type asignaciones_procesoCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.asignaciones_procesoSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.asignaciones_procesoOmit<ExtArgs> | null;
    data: Prisma.asignaciones_procesoCreateManyInput | Prisma.asignaciones_procesoCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.asignaciones_procesoIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type asignaciones_procesoUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.asignaciones_procesoSelect<ExtArgs> | null;
    omit?: Prisma.asignaciones_procesoOmit<ExtArgs> | null;
    include?: Prisma.asignaciones_procesoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.asignaciones_procesoUpdateInput, Prisma.asignaciones_procesoUncheckedUpdateInput>;
    where: Prisma.asignaciones_procesoWhereUniqueInput;
};
export type asignaciones_procesoUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.asignaciones_procesoUpdateManyMutationInput, Prisma.asignaciones_procesoUncheckedUpdateManyInput>;
    where?: Prisma.asignaciones_procesoWhereInput;
    limit?: number;
};
export type asignaciones_procesoUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.asignaciones_procesoSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.asignaciones_procesoOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.asignaciones_procesoUpdateManyMutationInput, Prisma.asignaciones_procesoUncheckedUpdateManyInput>;
    where?: Prisma.asignaciones_procesoWhereInput;
    limit?: number;
    include?: Prisma.asignaciones_procesoIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type asignaciones_procesoUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.asignaciones_procesoSelect<ExtArgs> | null;
    omit?: Prisma.asignaciones_procesoOmit<ExtArgs> | null;
    include?: Prisma.asignaciones_procesoInclude<ExtArgs> | null;
    where: Prisma.asignaciones_procesoWhereUniqueInput;
    create: Prisma.XOR<Prisma.asignaciones_procesoCreateInput, Prisma.asignaciones_procesoUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.asignaciones_procesoUpdateInput, Prisma.asignaciones_procesoUncheckedUpdateInput>;
};
export type asignaciones_procesoDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.asignaciones_procesoSelect<ExtArgs> | null;
    omit?: Prisma.asignaciones_procesoOmit<ExtArgs> | null;
    include?: Prisma.asignaciones_procesoInclude<ExtArgs> | null;
    where: Prisma.asignaciones_procesoWhereUniqueInput;
};
export type asignaciones_procesoDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.asignaciones_procesoWhereInput;
    limit?: number;
};
export type asignaciones_proceso$procesosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.procesosSelect<ExtArgs> | null;
    omit?: Prisma.procesosOmit<ExtArgs> | null;
    include?: Prisma.procesosInclude<ExtArgs> | null;
    where?: Prisma.procesosWhereInput;
};
export type asignaciones_proceso$rolesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.rolesSelect<ExtArgs> | null;
    omit?: Prisma.rolesOmit<ExtArgs> | null;
    include?: Prisma.rolesInclude<ExtArgs> | null;
    where?: Prisma.rolesWhereInput;
};
export type asignaciones_proceso$usuariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usuariosSelect<ExtArgs> | null;
    omit?: Prisma.usuariosOmit<ExtArgs> | null;
    include?: Prisma.usuariosInclude<ExtArgs> | null;
    where?: Prisma.usuariosWhereInput;
};
export type asignaciones_procesoDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.asignaciones_procesoSelect<ExtArgs> | null;
    omit?: Prisma.asignaciones_procesoOmit<ExtArgs> | null;
    include?: Prisma.asignaciones_procesoInclude<ExtArgs> | null;
};
