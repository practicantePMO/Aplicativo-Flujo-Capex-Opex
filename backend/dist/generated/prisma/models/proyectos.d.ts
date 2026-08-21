import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type proyectosModel = runtime.Types.Result.DefaultSelection<Prisma.$proyectosPayload>;
export type AggregateProyectos = {
    _count: ProyectosCountAggregateOutputType | null;
    _avg: ProyectosAvgAggregateOutputType | null;
    _sum: ProyectosSumAggregateOutputType | null;
    _min: ProyectosMinAggregateOutputType | null;
    _max: ProyectosMaxAggregateOutputType | null;
};
export type ProyectosAvgAggregateOutputType = {
    compania_id: number | null;
    anio_proyecto: number | null;
    consecutivo: number | null;
    creado_por: number | null;
};
export type ProyectosSumAggregateOutputType = {
    compania_id: number | null;
    anio_proyecto: number | null;
    consecutivo: number | null;
    creado_por: number | null;
};
export type ProyectosMinAggregateOutputType = {
    id: string | null;
    nombre: string | null;
    compania_id: number | null;
    fecha_proyecto: Date | null;
    anio_proyecto: number | null;
    consecutivo: number | null;
    creado_por: number | null;
    fecha_creacion: Date | null;
    eliminado_el: Date | null;
};
export type ProyectosMaxAggregateOutputType = {
    id: string | null;
    nombre: string | null;
    compania_id: number | null;
    fecha_proyecto: Date | null;
    anio_proyecto: number | null;
    consecutivo: number | null;
    creado_por: number | null;
    fecha_creacion: Date | null;
    eliminado_el: Date | null;
};
export type ProyectosCountAggregateOutputType = {
    id: number;
    nombre: number;
    compania_id: number;
    fecha_proyecto: number;
    anio_proyecto: number;
    consecutivo: number;
    creado_por: number;
    fecha_creacion: number;
    eliminado_el: number;
    _all: number;
};
export type ProyectosAvgAggregateInputType = {
    compania_id?: true;
    anio_proyecto?: true;
    consecutivo?: true;
    creado_por?: true;
};
export type ProyectosSumAggregateInputType = {
    compania_id?: true;
    anio_proyecto?: true;
    consecutivo?: true;
    creado_por?: true;
};
export type ProyectosMinAggregateInputType = {
    id?: true;
    nombre?: true;
    compania_id?: true;
    fecha_proyecto?: true;
    anio_proyecto?: true;
    consecutivo?: true;
    creado_por?: true;
    fecha_creacion?: true;
    eliminado_el?: true;
};
export type ProyectosMaxAggregateInputType = {
    id?: true;
    nombre?: true;
    compania_id?: true;
    fecha_proyecto?: true;
    anio_proyecto?: true;
    consecutivo?: true;
    creado_por?: true;
    fecha_creacion?: true;
    eliminado_el?: true;
};
export type ProyectosCountAggregateInputType = {
    id?: true;
    nombre?: true;
    compania_id?: true;
    fecha_proyecto?: true;
    anio_proyecto?: true;
    consecutivo?: true;
    creado_por?: true;
    fecha_creacion?: true;
    eliminado_el?: true;
    _all?: true;
};
export type ProyectosAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.proyectosWhereInput;
    orderBy?: Prisma.proyectosOrderByWithRelationInput | Prisma.proyectosOrderByWithRelationInput[];
    cursor?: Prisma.proyectosWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProyectosCountAggregateInputType;
    _avg?: ProyectosAvgAggregateInputType;
    _sum?: ProyectosSumAggregateInputType;
    _min?: ProyectosMinAggregateInputType;
    _max?: ProyectosMaxAggregateInputType;
};
export type GetProyectosAggregateType<T extends ProyectosAggregateArgs> = {
    [P in keyof T & keyof AggregateProyectos]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProyectos[P]> : Prisma.GetScalarType<T[P], AggregateProyectos[P]>;
};
export type proyectosGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.proyectosWhereInput;
    orderBy?: Prisma.proyectosOrderByWithAggregationInput | Prisma.proyectosOrderByWithAggregationInput[];
    by: Prisma.ProyectosScalarFieldEnum[] | Prisma.ProyectosScalarFieldEnum;
    having?: Prisma.proyectosScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProyectosCountAggregateInputType | true;
    _avg?: ProyectosAvgAggregateInputType;
    _sum?: ProyectosSumAggregateInputType;
    _min?: ProyectosMinAggregateInputType;
    _max?: ProyectosMaxAggregateInputType;
};
export type ProyectosGroupByOutputType = {
    id: string;
    nombre: string;
    compania_id: number | null;
    fecha_proyecto: Date;
    anio_proyecto: number;
    consecutivo: number;
    creado_por: number | null;
    fecha_creacion: Date | null;
    eliminado_el: Date | null;
    _count: ProyectosCountAggregateOutputType | null;
    _avg: ProyectosAvgAggregateOutputType | null;
    _sum: ProyectosSumAggregateOutputType | null;
    _min: ProyectosMinAggregateOutputType | null;
    _max: ProyectosMaxAggregateOutputType | null;
};
export type GetProyectosGroupByPayload<T extends proyectosGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProyectosGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProyectosGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProyectosGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProyectosGroupByOutputType[P]>;
}>>;
export type proyectosWhereInput = {
    AND?: Prisma.proyectosWhereInput | Prisma.proyectosWhereInput[];
    OR?: Prisma.proyectosWhereInput[];
    NOT?: Prisma.proyectosWhereInput | Prisma.proyectosWhereInput[];
    id?: Prisma.StringFilter<"proyectos"> | string;
    nombre?: Prisma.StringFilter<"proyectos"> | string;
    compania_id?: Prisma.IntNullableFilter<"proyectos"> | number | null;
    fecha_proyecto?: Prisma.DateTimeFilter<"proyectos"> | Date | string;
    anio_proyecto?: Prisma.IntFilter<"proyectos"> | number;
    consecutivo?: Prisma.IntFilter<"proyectos"> | number;
    creado_por?: Prisma.IntNullableFilter<"proyectos"> | number | null;
    fecha_creacion?: Prisma.DateTimeNullableFilter<"proyectos"> | Date | string | null;
    eliminado_el?: Prisma.DateTimeNullableFilter<"proyectos"> | Date | string | null;
    procesos?: Prisma.ProcesosListRelationFilter;
    companias?: Prisma.XOR<Prisma.CompaniasNullableScalarRelationFilter, Prisma.companiasWhereInput> | null;
    usuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
};
export type proyectosOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    compania_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_proyecto?: Prisma.SortOrder;
    anio_proyecto?: Prisma.SortOrder;
    consecutivo?: Prisma.SortOrder;
    creado_por?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_creacion?: Prisma.SortOrderInput | Prisma.SortOrder;
    eliminado_el?: Prisma.SortOrderInput | Prisma.SortOrder;
    procesos?: Prisma.procesosOrderByRelationAggregateInput;
    companias?: Prisma.companiasOrderByWithRelationInput;
    usuarios?: Prisma.usuariosOrderByWithRelationInput;
};
export type proyectosWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.proyectosWhereInput | Prisma.proyectosWhereInput[];
    OR?: Prisma.proyectosWhereInput[];
    NOT?: Prisma.proyectosWhereInput | Prisma.proyectosWhereInput[];
    nombre?: Prisma.StringFilter<"proyectos"> | string;
    compania_id?: Prisma.IntNullableFilter<"proyectos"> | number | null;
    fecha_proyecto?: Prisma.DateTimeFilter<"proyectos"> | Date | string;
    anio_proyecto?: Prisma.IntFilter<"proyectos"> | number;
    consecutivo?: Prisma.IntFilter<"proyectos"> | number;
    creado_por?: Prisma.IntNullableFilter<"proyectos"> | number | null;
    fecha_creacion?: Prisma.DateTimeNullableFilter<"proyectos"> | Date | string | null;
    eliminado_el?: Prisma.DateTimeNullableFilter<"proyectos"> | Date | string | null;
    procesos?: Prisma.ProcesosListRelationFilter;
    companias?: Prisma.XOR<Prisma.CompaniasNullableScalarRelationFilter, Prisma.companiasWhereInput> | null;
    usuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
}, "id">;
export type proyectosOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    compania_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_proyecto?: Prisma.SortOrder;
    anio_proyecto?: Prisma.SortOrder;
    consecutivo?: Prisma.SortOrder;
    creado_por?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_creacion?: Prisma.SortOrderInput | Prisma.SortOrder;
    eliminado_el?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.proyectosCountOrderByAggregateInput;
    _avg?: Prisma.proyectosAvgOrderByAggregateInput;
    _max?: Prisma.proyectosMaxOrderByAggregateInput;
    _min?: Prisma.proyectosMinOrderByAggregateInput;
    _sum?: Prisma.proyectosSumOrderByAggregateInput;
};
export type proyectosScalarWhereWithAggregatesInput = {
    AND?: Prisma.proyectosScalarWhereWithAggregatesInput | Prisma.proyectosScalarWhereWithAggregatesInput[];
    OR?: Prisma.proyectosScalarWhereWithAggregatesInput[];
    NOT?: Prisma.proyectosScalarWhereWithAggregatesInput | Prisma.proyectosScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"proyectos"> | string;
    nombre?: Prisma.StringWithAggregatesFilter<"proyectos"> | string;
    compania_id?: Prisma.IntNullableWithAggregatesFilter<"proyectos"> | number | null;
    fecha_proyecto?: Prisma.DateTimeWithAggregatesFilter<"proyectos"> | Date | string;
    anio_proyecto?: Prisma.IntWithAggregatesFilter<"proyectos"> | number;
    consecutivo?: Prisma.IntWithAggregatesFilter<"proyectos"> | number;
    creado_por?: Prisma.IntNullableWithAggregatesFilter<"proyectos"> | number | null;
    fecha_creacion?: Prisma.DateTimeNullableWithAggregatesFilter<"proyectos"> | Date | string | null;
    eliminado_el?: Prisma.DateTimeNullableWithAggregatesFilter<"proyectos"> | Date | string | null;
};
export type proyectosCreateInput = {
    id: string;
    nombre: string;
    fecha_proyecto: Date | string;
    anio_proyecto: number;
    consecutivo: number;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
    procesos?: Prisma.procesosCreateNestedManyWithoutProyectosInput;
    companias?: Prisma.companiasCreateNestedOneWithoutProyectosInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutProyectosInput;
};
export type proyectosUncheckedCreateInput = {
    id: string;
    nombre: string;
    compania_id?: number | null;
    fecha_proyecto: Date | string;
    anio_proyecto: number;
    consecutivo: number;
    creado_por?: number | null;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
    procesos?: Prisma.procesosUncheckedCreateNestedManyWithoutProyectosInput;
};
export type proyectosUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_proyecto?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    anio_proyecto?: Prisma.IntFieldUpdateOperationsInput | number;
    consecutivo?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    procesos?: Prisma.procesosUpdateManyWithoutProyectosNestedInput;
    companias?: Prisma.companiasUpdateOneWithoutProyectosNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutProyectosNestedInput;
};
export type proyectosUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    compania_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_proyecto?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    anio_proyecto?: Prisma.IntFieldUpdateOperationsInput | number;
    consecutivo?: Prisma.IntFieldUpdateOperationsInput | number;
    creado_por?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    procesos?: Prisma.procesosUncheckedUpdateManyWithoutProyectosNestedInput;
};
export type proyectosCreateManyInput = {
    id: string;
    nombre: string;
    compania_id?: number | null;
    fecha_proyecto: Date | string;
    anio_proyecto: number;
    consecutivo: number;
    creado_por?: number | null;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
};
export type proyectosUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_proyecto?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    anio_proyecto?: Prisma.IntFieldUpdateOperationsInput | number;
    consecutivo?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type proyectosUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    compania_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_proyecto?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    anio_proyecto?: Prisma.IntFieldUpdateOperationsInput | number;
    consecutivo?: Prisma.IntFieldUpdateOperationsInput | number;
    creado_por?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ProyectosListRelationFilter = {
    every?: Prisma.proyectosWhereInput;
    some?: Prisma.proyectosWhereInput;
    none?: Prisma.proyectosWhereInput;
};
export type proyectosOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProyectosNullableScalarRelationFilter = {
    is?: Prisma.proyectosWhereInput | null;
    isNot?: Prisma.proyectosWhereInput | null;
};
export type proyectosCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    compania_id?: Prisma.SortOrder;
    fecha_proyecto?: Prisma.SortOrder;
    anio_proyecto?: Prisma.SortOrder;
    consecutivo?: Prisma.SortOrder;
    creado_por?: Prisma.SortOrder;
    fecha_creacion?: Prisma.SortOrder;
    eliminado_el?: Prisma.SortOrder;
};
export type proyectosAvgOrderByAggregateInput = {
    compania_id?: Prisma.SortOrder;
    anio_proyecto?: Prisma.SortOrder;
    consecutivo?: Prisma.SortOrder;
    creado_por?: Prisma.SortOrder;
};
export type proyectosMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    compania_id?: Prisma.SortOrder;
    fecha_proyecto?: Prisma.SortOrder;
    anio_proyecto?: Prisma.SortOrder;
    consecutivo?: Prisma.SortOrder;
    creado_por?: Prisma.SortOrder;
    fecha_creacion?: Prisma.SortOrder;
    eliminado_el?: Prisma.SortOrder;
};
export type proyectosMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    compania_id?: Prisma.SortOrder;
    fecha_proyecto?: Prisma.SortOrder;
    anio_proyecto?: Prisma.SortOrder;
    consecutivo?: Prisma.SortOrder;
    creado_por?: Prisma.SortOrder;
    fecha_creacion?: Prisma.SortOrder;
    eliminado_el?: Prisma.SortOrder;
};
export type proyectosSumOrderByAggregateInput = {
    compania_id?: Prisma.SortOrder;
    anio_proyecto?: Prisma.SortOrder;
    consecutivo?: Prisma.SortOrder;
    creado_por?: Prisma.SortOrder;
};
export type proyectosCreateNestedManyWithoutCompaniasInput = {
    create?: Prisma.XOR<Prisma.proyectosCreateWithoutCompaniasInput, Prisma.proyectosUncheckedCreateWithoutCompaniasInput> | Prisma.proyectosCreateWithoutCompaniasInput[] | Prisma.proyectosUncheckedCreateWithoutCompaniasInput[];
    connectOrCreate?: Prisma.proyectosCreateOrConnectWithoutCompaniasInput | Prisma.proyectosCreateOrConnectWithoutCompaniasInput[];
    createMany?: Prisma.proyectosCreateManyCompaniasInputEnvelope;
    connect?: Prisma.proyectosWhereUniqueInput | Prisma.proyectosWhereUniqueInput[];
};
export type proyectosUncheckedCreateNestedManyWithoutCompaniasInput = {
    create?: Prisma.XOR<Prisma.proyectosCreateWithoutCompaniasInput, Prisma.proyectosUncheckedCreateWithoutCompaniasInput> | Prisma.proyectosCreateWithoutCompaniasInput[] | Prisma.proyectosUncheckedCreateWithoutCompaniasInput[];
    connectOrCreate?: Prisma.proyectosCreateOrConnectWithoutCompaniasInput | Prisma.proyectosCreateOrConnectWithoutCompaniasInput[];
    createMany?: Prisma.proyectosCreateManyCompaniasInputEnvelope;
    connect?: Prisma.proyectosWhereUniqueInput | Prisma.proyectosWhereUniqueInput[];
};
export type proyectosUpdateManyWithoutCompaniasNestedInput = {
    create?: Prisma.XOR<Prisma.proyectosCreateWithoutCompaniasInput, Prisma.proyectosUncheckedCreateWithoutCompaniasInput> | Prisma.proyectosCreateWithoutCompaniasInput[] | Prisma.proyectosUncheckedCreateWithoutCompaniasInput[];
    connectOrCreate?: Prisma.proyectosCreateOrConnectWithoutCompaniasInput | Prisma.proyectosCreateOrConnectWithoutCompaniasInput[];
    upsert?: Prisma.proyectosUpsertWithWhereUniqueWithoutCompaniasInput | Prisma.proyectosUpsertWithWhereUniqueWithoutCompaniasInput[];
    createMany?: Prisma.proyectosCreateManyCompaniasInputEnvelope;
    set?: Prisma.proyectosWhereUniqueInput | Prisma.proyectosWhereUniqueInput[];
    disconnect?: Prisma.proyectosWhereUniqueInput | Prisma.proyectosWhereUniqueInput[];
    delete?: Prisma.proyectosWhereUniqueInput | Prisma.proyectosWhereUniqueInput[];
    connect?: Prisma.proyectosWhereUniqueInput | Prisma.proyectosWhereUniqueInput[];
    update?: Prisma.proyectosUpdateWithWhereUniqueWithoutCompaniasInput | Prisma.proyectosUpdateWithWhereUniqueWithoutCompaniasInput[];
    updateMany?: Prisma.proyectosUpdateManyWithWhereWithoutCompaniasInput | Prisma.proyectosUpdateManyWithWhereWithoutCompaniasInput[];
    deleteMany?: Prisma.proyectosScalarWhereInput | Prisma.proyectosScalarWhereInput[];
};
export type proyectosUncheckedUpdateManyWithoutCompaniasNestedInput = {
    create?: Prisma.XOR<Prisma.proyectosCreateWithoutCompaniasInput, Prisma.proyectosUncheckedCreateWithoutCompaniasInput> | Prisma.proyectosCreateWithoutCompaniasInput[] | Prisma.proyectosUncheckedCreateWithoutCompaniasInput[];
    connectOrCreate?: Prisma.proyectosCreateOrConnectWithoutCompaniasInput | Prisma.proyectosCreateOrConnectWithoutCompaniasInput[];
    upsert?: Prisma.proyectosUpsertWithWhereUniqueWithoutCompaniasInput | Prisma.proyectosUpsertWithWhereUniqueWithoutCompaniasInput[];
    createMany?: Prisma.proyectosCreateManyCompaniasInputEnvelope;
    set?: Prisma.proyectosWhereUniqueInput | Prisma.proyectosWhereUniqueInput[];
    disconnect?: Prisma.proyectosWhereUniqueInput | Prisma.proyectosWhereUniqueInput[];
    delete?: Prisma.proyectosWhereUniqueInput | Prisma.proyectosWhereUniqueInput[];
    connect?: Prisma.proyectosWhereUniqueInput | Prisma.proyectosWhereUniqueInput[];
    update?: Prisma.proyectosUpdateWithWhereUniqueWithoutCompaniasInput | Prisma.proyectosUpdateWithWhereUniqueWithoutCompaniasInput[];
    updateMany?: Prisma.proyectosUpdateManyWithWhereWithoutCompaniasInput | Prisma.proyectosUpdateManyWithWhereWithoutCompaniasInput[];
    deleteMany?: Prisma.proyectosScalarWhereInput | Prisma.proyectosScalarWhereInput[];
};
export type proyectosCreateNestedOneWithoutProcesosInput = {
    create?: Prisma.XOR<Prisma.proyectosCreateWithoutProcesosInput, Prisma.proyectosUncheckedCreateWithoutProcesosInput>;
    connectOrCreate?: Prisma.proyectosCreateOrConnectWithoutProcesosInput;
    connect?: Prisma.proyectosWhereUniqueInput;
};
export type proyectosUpdateOneWithoutProcesosNestedInput = {
    create?: Prisma.XOR<Prisma.proyectosCreateWithoutProcesosInput, Prisma.proyectosUncheckedCreateWithoutProcesosInput>;
    connectOrCreate?: Prisma.proyectosCreateOrConnectWithoutProcesosInput;
    upsert?: Prisma.proyectosUpsertWithoutProcesosInput;
    disconnect?: Prisma.proyectosWhereInput | boolean;
    delete?: Prisma.proyectosWhereInput | boolean;
    connect?: Prisma.proyectosWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.proyectosUpdateToOneWithWhereWithoutProcesosInput, Prisma.proyectosUpdateWithoutProcesosInput>, Prisma.proyectosUncheckedUpdateWithoutProcesosInput>;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type proyectosCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.proyectosCreateWithoutUsuariosInput, Prisma.proyectosUncheckedCreateWithoutUsuariosInput> | Prisma.proyectosCreateWithoutUsuariosInput[] | Prisma.proyectosUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.proyectosCreateOrConnectWithoutUsuariosInput | Prisma.proyectosCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.proyectosCreateManyUsuariosInputEnvelope;
    connect?: Prisma.proyectosWhereUniqueInput | Prisma.proyectosWhereUniqueInput[];
};
export type proyectosUncheckedCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.proyectosCreateWithoutUsuariosInput, Prisma.proyectosUncheckedCreateWithoutUsuariosInput> | Prisma.proyectosCreateWithoutUsuariosInput[] | Prisma.proyectosUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.proyectosCreateOrConnectWithoutUsuariosInput | Prisma.proyectosCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.proyectosCreateManyUsuariosInputEnvelope;
    connect?: Prisma.proyectosWhereUniqueInput | Prisma.proyectosWhereUniqueInput[];
};
export type proyectosUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.proyectosCreateWithoutUsuariosInput, Prisma.proyectosUncheckedCreateWithoutUsuariosInput> | Prisma.proyectosCreateWithoutUsuariosInput[] | Prisma.proyectosUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.proyectosCreateOrConnectWithoutUsuariosInput | Prisma.proyectosCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.proyectosUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.proyectosUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.proyectosCreateManyUsuariosInputEnvelope;
    set?: Prisma.proyectosWhereUniqueInput | Prisma.proyectosWhereUniqueInput[];
    disconnect?: Prisma.proyectosWhereUniqueInput | Prisma.proyectosWhereUniqueInput[];
    delete?: Prisma.proyectosWhereUniqueInput | Prisma.proyectosWhereUniqueInput[];
    connect?: Prisma.proyectosWhereUniqueInput | Prisma.proyectosWhereUniqueInput[];
    update?: Prisma.proyectosUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.proyectosUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.proyectosUpdateManyWithWhereWithoutUsuariosInput | Prisma.proyectosUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.proyectosScalarWhereInput | Prisma.proyectosScalarWhereInput[];
};
export type proyectosUncheckedUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.proyectosCreateWithoutUsuariosInput, Prisma.proyectosUncheckedCreateWithoutUsuariosInput> | Prisma.proyectosCreateWithoutUsuariosInput[] | Prisma.proyectosUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.proyectosCreateOrConnectWithoutUsuariosInput | Prisma.proyectosCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.proyectosUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.proyectosUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.proyectosCreateManyUsuariosInputEnvelope;
    set?: Prisma.proyectosWhereUniqueInput | Prisma.proyectosWhereUniqueInput[];
    disconnect?: Prisma.proyectosWhereUniqueInput | Prisma.proyectosWhereUniqueInput[];
    delete?: Prisma.proyectosWhereUniqueInput | Prisma.proyectosWhereUniqueInput[];
    connect?: Prisma.proyectosWhereUniqueInput | Prisma.proyectosWhereUniqueInput[];
    update?: Prisma.proyectosUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.proyectosUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.proyectosUpdateManyWithWhereWithoutUsuariosInput | Prisma.proyectosUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.proyectosScalarWhereInput | Prisma.proyectosScalarWhereInput[];
};
export type proyectosCreateWithoutCompaniasInput = {
    id: string;
    nombre: string;
    fecha_proyecto: Date | string;
    anio_proyecto: number;
    consecutivo: number;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
    procesos?: Prisma.procesosCreateNestedManyWithoutProyectosInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutProyectosInput;
};
export type proyectosUncheckedCreateWithoutCompaniasInput = {
    id: string;
    nombre: string;
    fecha_proyecto: Date | string;
    anio_proyecto: number;
    consecutivo: number;
    creado_por?: number | null;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
    procesos?: Prisma.procesosUncheckedCreateNestedManyWithoutProyectosInput;
};
export type proyectosCreateOrConnectWithoutCompaniasInput = {
    where: Prisma.proyectosWhereUniqueInput;
    create: Prisma.XOR<Prisma.proyectosCreateWithoutCompaniasInput, Prisma.proyectosUncheckedCreateWithoutCompaniasInput>;
};
export type proyectosCreateManyCompaniasInputEnvelope = {
    data: Prisma.proyectosCreateManyCompaniasInput | Prisma.proyectosCreateManyCompaniasInput[];
    skipDuplicates?: boolean;
};
export type proyectosUpsertWithWhereUniqueWithoutCompaniasInput = {
    where: Prisma.proyectosWhereUniqueInput;
    update: Prisma.XOR<Prisma.proyectosUpdateWithoutCompaniasInput, Prisma.proyectosUncheckedUpdateWithoutCompaniasInput>;
    create: Prisma.XOR<Prisma.proyectosCreateWithoutCompaniasInput, Prisma.proyectosUncheckedCreateWithoutCompaniasInput>;
};
export type proyectosUpdateWithWhereUniqueWithoutCompaniasInput = {
    where: Prisma.proyectosWhereUniqueInput;
    data: Prisma.XOR<Prisma.proyectosUpdateWithoutCompaniasInput, Prisma.proyectosUncheckedUpdateWithoutCompaniasInput>;
};
export type proyectosUpdateManyWithWhereWithoutCompaniasInput = {
    where: Prisma.proyectosScalarWhereInput;
    data: Prisma.XOR<Prisma.proyectosUpdateManyMutationInput, Prisma.proyectosUncheckedUpdateManyWithoutCompaniasInput>;
};
export type proyectosScalarWhereInput = {
    AND?: Prisma.proyectosScalarWhereInput | Prisma.proyectosScalarWhereInput[];
    OR?: Prisma.proyectosScalarWhereInput[];
    NOT?: Prisma.proyectosScalarWhereInput | Prisma.proyectosScalarWhereInput[];
    id?: Prisma.StringFilter<"proyectos"> | string;
    nombre?: Prisma.StringFilter<"proyectos"> | string;
    compania_id?: Prisma.IntNullableFilter<"proyectos"> | number | null;
    fecha_proyecto?: Prisma.DateTimeFilter<"proyectos"> | Date | string;
    anio_proyecto?: Prisma.IntFilter<"proyectos"> | number;
    consecutivo?: Prisma.IntFilter<"proyectos"> | number;
    creado_por?: Prisma.IntNullableFilter<"proyectos"> | number | null;
    fecha_creacion?: Prisma.DateTimeNullableFilter<"proyectos"> | Date | string | null;
    eliminado_el?: Prisma.DateTimeNullableFilter<"proyectos"> | Date | string | null;
};
export type proyectosCreateWithoutProcesosInput = {
    id: string;
    nombre: string;
    fecha_proyecto: Date | string;
    anio_proyecto: number;
    consecutivo: number;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
    companias?: Prisma.companiasCreateNestedOneWithoutProyectosInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutProyectosInput;
};
export type proyectosUncheckedCreateWithoutProcesosInput = {
    id: string;
    nombre: string;
    compania_id?: number | null;
    fecha_proyecto: Date | string;
    anio_proyecto: number;
    consecutivo: number;
    creado_por?: number | null;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
};
export type proyectosCreateOrConnectWithoutProcesosInput = {
    where: Prisma.proyectosWhereUniqueInput;
    create: Prisma.XOR<Prisma.proyectosCreateWithoutProcesosInput, Prisma.proyectosUncheckedCreateWithoutProcesosInput>;
};
export type proyectosUpsertWithoutProcesosInput = {
    update: Prisma.XOR<Prisma.proyectosUpdateWithoutProcesosInput, Prisma.proyectosUncheckedUpdateWithoutProcesosInput>;
    create: Prisma.XOR<Prisma.proyectosCreateWithoutProcesosInput, Prisma.proyectosUncheckedCreateWithoutProcesosInput>;
    where?: Prisma.proyectosWhereInput;
};
export type proyectosUpdateToOneWithWhereWithoutProcesosInput = {
    where?: Prisma.proyectosWhereInput;
    data: Prisma.XOR<Prisma.proyectosUpdateWithoutProcesosInput, Prisma.proyectosUncheckedUpdateWithoutProcesosInput>;
};
export type proyectosUpdateWithoutProcesosInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_proyecto?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    anio_proyecto?: Prisma.IntFieldUpdateOperationsInput | number;
    consecutivo?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    companias?: Prisma.companiasUpdateOneWithoutProyectosNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutProyectosNestedInput;
};
export type proyectosUncheckedUpdateWithoutProcesosInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    compania_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_proyecto?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    anio_proyecto?: Prisma.IntFieldUpdateOperationsInput | number;
    consecutivo?: Prisma.IntFieldUpdateOperationsInput | number;
    creado_por?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type proyectosCreateWithoutUsuariosInput = {
    id: string;
    nombre: string;
    fecha_proyecto: Date | string;
    anio_proyecto: number;
    consecutivo: number;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
    procesos?: Prisma.procesosCreateNestedManyWithoutProyectosInput;
    companias?: Prisma.companiasCreateNestedOneWithoutProyectosInput;
};
export type proyectosUncheckedCreateWithoutUsuariosInput = {
    id: string;
    nombre: string;
    compania_id?: number | null;
    fecha_proyecto: Date | string;
    anio_proyecto: number;
    consecutivo: number;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
    procesos?: Prisma.procesosUncheckedCreateNestedManyWithoutProyectosInput;
};
export type proyectosCreateOrConnectWithoutUsuariosInput = {
    where: Prisma.proyectosWhereUniqueInput;
    create: Prisma.XOR<Prisma.proyectosCreateWithoutUsuariosInput, Prisma.proyectosUncheckedCreateWithoutUsuariosInput>;
};
export type proyectosCreateManyUsuariosInputEnvelope = {
    data: Prisma.proyectosCreateManyUsuariosInput | Prisma.proyectosCreateManyUsuariosInput[];
    skipDuplicates?: boolean;
};
export type proyectosUpsertWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.proyectosWhereUniqueInput;
    update: Prisma.XOR<Prisma.proyectosUpdateWithoutUsuariosInput, Prisma.proyectosUncheckedUpdateWithoutUsuariosInput>;
    create: Prisma.XOR<Prisma.proyectosCreateWithoutUsuariosInput, Prisma.proyectosUncheckedCreateWithoutUsuariosInput>;
};
export type proyectosUpdateWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.proyectosWhereUniqueInput;
    data: Prisma.XOR<Prisma.proyectosUpdateWithoutUsuariosInput, Prisma.proyectosUncheckedUpdateWithoutUsuariosInput>;
};
export type proyectosUpdateManyWithWhereWithoutUsuariosInput = {
    where: Prisma.proyectosScalarWhereInput;
    data: Prisma.XOR<Prisma.proyectosUpdateManyMutationInput, Prisma.proyectosUncheckedUpdateManyWithoutUsuariosInput>;
};
export type proyectosCreateManyCompaniasInput = {
    id: string;
    nombre: string;
    fecha_proyecto: Date | string;
    anio_proyecto: number;
    consecutivo: number;
    creado_por?: number | null;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
};
export type proyectosUpdateWithoutCompaniasInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_proyecto?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    anio_proyecto?: Prisma.IntFieldUpdateOperationsInput | number;
    consecutivo?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    procesos?: Prisma.procesosUpdateManyWithoutProyectosNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutProyectosNestedInput;
};
export type proyectosUncheckedUpdateWithoutCompaniasInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_proyecto?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    anio_proyecto?: Prisma.IntFieldUpdateOperationsInput | number;
    consecutivo?: Prisma.IntFieldUpdateOperationsInput | number;
    creado_por?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    procesos?: Prisma.procesosUncheckedUpdateManyWithoutProyectosNestedInput;
};
export type proyectosUncheckedUpdateManyWithoutCompaniasInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_proyecto?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    anio_proyecto?: Prisma.IntFieldUpdateOperationsInput | number;
    consecutivo?: Prisma.IntFieldUpdateOperationsInput | number;
    creado_por?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type proyectosCreateManyUsuariosInput = {
    id: string;
    nombre: string;
    compania_id?: number | null;
    fecha_proyecto: Date | string;
    anio_proyecto: number;
    consecutivo: number;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
};
export type proyectosUpdateWithoutUsuariosInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_proyecto?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    anio_proyecto?: Prisma.IntFieldUpdateOperationsInput | number;
    consecutivo?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    procesos?: Prisma.procesosUpdateManyWithoutProyectosNestedInput;
    companias?: Prisma.companiasUpdateOneWithoutProyectosNestedInput;
};
export type proyectosUncheckedUpdateWithoutUsuariosInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    compania_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_proyecto?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    anio_proyecto?: Prisma.IntFieldUpdateOperationsInput | number;
    consecutivo?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    procesos?: Prisma.procesosUncheckedUpdateManyWithoutProyectosNestedInput;
};
export type proyectosUncheckedUpdateManyWithoutUsuariosInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    compania_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    fecha_proyecto?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    anio_proyecto?: Prisma.IntFieldUpdateOperationsInput | number;
    consecutivo?: Prisma.IntFieldUpdateOperationsInput | number;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ProyectosCountOutputType = {
    procesos: number;
};
export type ProyectosCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    procesos?: boolean | ProyectosCountOutputTypeCountProcesosArgs;
};
export type ProyectosCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProyectosCountOutputTypeSelect<ExtArgs> | null;
};
export type ProyectosCountOutputTypeCountProcesosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.procesosWhereInput;
};
export type proyectosSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nombre?: boolean;
    compania_id?: boolean;
    fecha_proyecto?: boolean;
    anio_proyecto?: boolean;
    consecutivo?: boolean;
    creado_por?: boolean;
    fecha_creacion?: boolean;
    eliminado_el?: boolean;
    procesos?: boolean | Prisma.proyectos$procesosArgs<ExtArgs>;
    companias?: boolean | Prisma.proyectos$companiasArgs<ExtArgs>;
    usuarios?: boolean | Prisma.proyectos$usuariosArgs<ExtArgs>;
    _count?: boolean | Prisma.ProyectosCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["proyectos"]>;
export type proyectosSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nombre?: boolean;
    compania_id?: boolean;
    fecha_proyecto?: boolean;
    anio_proyecto?: boolean;
    consecutivo?: boolean;
    creado_por?: boolean;
    fecha_creacion?: boolean;
    eliminado_el?: boolean;
    companias?: boolean | Prisma.proyectos$companiasArgs<ExtArgs>;
    usuarios?: boolean | Prisma.proyectos$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["proyectos"]>;
export type proyectosSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nombre?: boolean;
    compania_id?: boolean;
    fecha_proyecto?: boolean;
    anio_proyecto?: boolean;
    consecutivo?: boolean;
    creado_por?: boolean;
    fecha_creacion?: boolean;
    eliminado_el?: boolean;
    companias?: boolean | Prisma.proyectos$companiasArgs<ExtArgs>;
    usuarios?: boolean | Prisma.proyectos$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["proyectos"]>;
export type proyectosSelectScalar = {
    id?: boolean;
    nombre?: boolean;
    compania_id?: boolean;
    fecha_proyecto?: boolean;
    anio_proyecto?: boolean;
    consecutivo?: boolean;
    creado_por?: boolean;
    fecha_creacion?: boolean;
    eliminado_el?: boolean;
};
export type proyectosOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "nombre" | "compania_id" | "fecha_proyecto" | "anio_proyecto" | "consecutivo" | "creado_por" | "fecha_creacion" | "eliminado_el", ExtArgs["result"]["proyectos"]>;
export type proyectosInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    procesos?: boolean | Prisma.proyectos$procesosArgs<ExtArgs>;
    companias?: boolean | Prisma.proyectos$companiasArgs<ExtArgs>;
    usuarios?: boolean | Prisma.proyectos$usuariosArgs<ExtArgs>;
    _count?: boolean | Prisma.ProyectosCountOutputTypeDefaultArgs<ExtArgs>;
};
export type proyectosIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    companias?: boolean | Prisma.proyectos$companiasArgs<ExtArgs>;
    usuarios?: boolean | Prisma.proyectos$usuariosArgs<ExtArgs>;
};
export type proyectosIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    companias?: boolean | Prisma.proyectos$companiasArgs<ExtArgs>;
    usuarios?: boolean | Prisma.proyectos$usuariosArgs<ExtArgs>;
};
export type $proyectosPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "proyectos";
    objects: {
        procesos: Prisma.$procesosPayload<ExtArgs>[];
        companias: Prisma.$companiasPayload<ExtArgs> | null;
        usuarios: Prisma.$usuariosPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        nombre: string;
        compania_id: number | null;
        fecha_proyecto: Date;
        anio_proyecto: number;
        consecutivo: number;
        creado_por: number | null;
        fecha_creacion: Date | null;
        eliminado_el: Date | null;
    }, ExtArgs["result"]["proyectos"]>;
    composites: {};
};
export type proyectosGetPayload<S extends boolean | null | undefined | proyectosDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$proyectosPayload, S>;
export type proyectosCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<proyectosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProyectosCountAggregateInputType | true;
};
export interface proyectosDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['proyectos'];
        meta: {
            name: 'proyectos';
        };
    };
    findUnique<T extends proyectosFindUniqueArgs>(args: Prisma.SelectSubset<T, proyectosFindUniqueArgs<ExtArgs>>): Prisma.Prisma__proyectosClient<runtime.Types.Result.GetResult<Prisma.$proyectosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends proyectosFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, proyectosFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__proyectosClient<runtime.Types.Result.GetResult<Prisma.$proyectosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends proyectosFindFirstArgs>(args?: Prisma.SelectSubset<T, proyectosFindFirstArgs<ExtArgs>>): Prisma.Prisma__proyectosClient<runtime.Types.Result.GetResult<Prisma.$proyectosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends proyectosFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, proyectosFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__proyectosClient<runtime.Types.Result.GetResult<Prisma.$proyectosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends proyectosFindManyArgs>(args?: Prisma.SelectSubset<T, proyectosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$proyectosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends proyectosCreateArgs>(args: Prisma.SelectSubset<T, proyectosCreateArgs<ExtArgs>>): Prisma.Prisma__proyectosClient<runtime.Types.Result.GetResult<Prisma.$proyectosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends proyectosCreateManyArgs>(args?: Prisma.SelectSubset<T, proyectosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends proyectosCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, proyectosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$proyectosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends proyectosDeleteArgs>(args: Prisma.SelectSubset<T, proyectosDeleteArgs<ExtArgs>>): Prisma.Prisma__proyectosClient<runtime.Types.Result.GetResult<Prisma.$proyectosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends proyectosUpdateArgs>(args: Prisma.SelectSubset<T, proyectosUpdateArgs<ExtArgs>>): Prisma.Prisma__proyectosClient<runtime.Types.Result.GetResult<Prisma.$proyectosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends proyectosDeleteManyArgs>(args?: Prisma.SelectSubset<T, proyectosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends proyectosUpdateManyArgs>(args: Prisma.SelectSubset<T, proyectosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends proyectosUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, proyectosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$proyectosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends proyectosUpsertArgs>(args: Prisma.SelectSubset<T, proyectosUpsertArgs<ExtArgs>>): Prisma.Prisma__proyectosClient<runtime.Types.Result.GetResult<Prisma.$proyectosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends proyectosCountArgs>(args?: Prisma.Subset<T, proyectosCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProyectosCountAggregateOutputType> : number>;
    aggregate<T extends ProyectosAggregateArgs>(args: Prisma.Subset<T, ProyectosAggregateArgs>): Prisma.PrismaPromise<GetProyectosAggregateType<T>>;
    groupBy<T extends proyectosGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: proyectosGroupByArgs['orderBy'];
    } : {
        orderBy?: proyectosGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, proyectosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProyectosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: proyectosFieldRefs;
}
export interface Prisma__proyectosClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    procesos<T extends Prisma.proyectos$procesosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.proyectos$procesosArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$procesosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    companias<T extends Prisma.proyectos$companiasArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.proyectos$companiasArgs<ExtArgs>>): Prisma.Prisma__companiasClient<runtime.Types.Result.GetResult<Prisma.$companiasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    usuarios<T extends Prisma.proyectos$usuariosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.proyectos$usuariosArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface proyectosFieldRefs {
    readonly id: Prisma.FieldRef<"proyectos", 'String'>;
    readonly nombre: Prisma.FieldRef<"proyectos", 'String'>;
    readonly compania_id: Prisma.FieldRef<"proyectos", 'Int'>;
    readonly fecha_proyecto: Prisma.FieldRef<"proyectos", 'DateTime'>;
    readonly anio_proyecto: Prisma.FieldRef<"proyectos", 'Int'>;
    readonly consecutivo: Prisma.FieldRef<"proyectos", 'Int'>;
    readonly creado_por: Prisma.FieldRef<"proyectos", 'Int'>;
    readonly fecha_creacion: Prisma.FieldRef<"proyectos", 'DateTime'>;
    readonly eliminado_el: Prisma.FieldRef<"proyectos", 'DateTime'>;
}
export type proyectosFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.proyectosSelect<ExtArgs> | null;
    omit?: Prisma.proyectosOmit<ExtArgs> | null;
    include?: Prisma.proyectosInclude<ExtArgs> | null;
    where: Prisma.proyectosWhereUniqueInput;
};
export type proyectosFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.proyectosSelect<ExtArgs> | null;
    omit?: Prisma.proyectosOmit<ExtArgs> | null;
    include?: Prisma.proyectosInclude<ExtArgs> | null;
    where: Prisma.proyectosWhereUniqueInput;
};
export type proyectosFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.proyectosSelect<ExtArgs> | null;
    omit?: Prisma.proyectosOmit<ExtArgs> | null;
    include?: Prisma.proyectosInclude<ExtArgs> | null;
    where?: Prisma.proyectosWhereInput;
    orderBy?: Prisma.proyectosOrderByWithRelationInput | Prisma.proyectosOrderByWithRelationInput[];
    cursor?: Prisma.proyectosWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProyectosScalarFieldEnum | Prisma.ProyectosScalarFieldEnum[];
};
export type proyectosFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.proyectosSelect<ExtArgs> | null;
    omit?: Prisma.proyectosOmit<ExtArgs> | null;
    include?: Prisma.proyectosInclude<ExtArgs> | null;
    where?: Prisma.proyectosWhereInput;
    orderBy?: Prisma.proyectosOrderByWithRelationInput | Prisma.proyectosOrderByWithRelationInput[];
    cursor?: Prisma.proyectosWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProyectosScalarFieldEnum | Prisma.ProyectosScalarFieldEnum[];
};
export type proyectosFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.proyectosSelect<ExtArgs> | null;
    omit?: Prisma.proyectosOmit<ExtArgs> | null;
    include?: Prisma.proyectosInclude<ExtArgs> | null;
    where?: Prisma.proyectosWhereInput;
    orderBy?: Prisma.proyectosOrderByWithRelationInput | Prisma.proyectosOrderByWithRelationInput[];
    cursor?: Prisma.proyectosWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProyectosScalarFieldEnum | Prisma.ProyectosScalarFieldEnum[];
};
export type proyectosCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.proyectosSelect<ExtArgs> | null;
    omit?: Prisma.proyectosOmit<ExtArgs> | null;
    include?: Prisma.proyectosInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.proyectosCreateInput, Prisma.proyectosUncheckedCreateInput>;
};
export type proyectosCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.proyectosCreateManyInput | Prisma.proyectosCreateManyInput[];
    skipDuplicates?: boolean;
};
export type proyectosCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.proyectosSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.proyectosOmit<ExtArgs> | null;
    data: Prisma.proyectosCreateManyInput | Prisma.proyectosCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.proyectosIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type proyectosUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.proyectosSelect<ExtArgs> | null;
    omit?: Prisma.proyectosOmit<ExtArgs> | null;
    include?: Prisma.proyectosInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.proyectosUpdateInput, Prisma.proyectosUncheckedUpdateInput>;
    where: Prisma.proyectosWhereUniqueInput;
};
export type proyectosUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.proyectosUpdateManyMutationInput, Prisma.proyectosUncheckedUpdateManyInput>;
    where?: Prisma.proyectosWhereInput;
    limit?: number;
};
export type proyectosUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.proyectosSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.proyectosOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.proyectosUpdateManyMutationInput, Prisma.proyectosUncheckedUpdateManyInput>;
    where?: Prisma.proyectosWhereInput;
    limit?: number;
    include?: Prisma.proyectosIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type proyectosUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.proyectosSelect<ExtArgs> | null;
    omit?: Prisma.proyectosOmit<ExtArgs> | null;
    include?: Prisma.proyectosInclude<ExtArgs> | null;
    where: Prisma.proyectosWhereUniqueInput;
    create: Prisma.XOR<Prisma.proyectosCreateInput, Prisma.proyectosUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.proyectosUpdateInput, Prisma.proyectosUncheckedUpdateInput>;
};
export type proyectosDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.proyectosSelect<ExtArgs> | null;
    omit?: Prisma.proyectosOmit<ExtArgs> | null;
    include?: Prisma.proyectosInclude<ExtArgs> | null;
    where: Prisma.proyectosWhereUniqueInput;
};
export type proyectosDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.proyectosWhereInput;
    limit?: number;
};
export type proyectos$procesosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type proyectos$companiasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.companiasSelect<ExtArgs> | null;
    omit?: Prisma.companiasOmit<ExtArgs> | null;
    include?: Prisma.companiasInclude<ExtArgs> | null;
    where?: Prisma.companiasWhereInput;
};
export type proyectos$usuariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usuariosSelect<ExtArgs> | null;
    omit?: Prisma.usuariosOmit<ExtArgs> | null;
    include?: Prisma.usuariosInclude<ExtArgs> | null;
    where?: Prisma.usuariosWhereInput;
};
export type proyectosDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.proyectosSelect<ExtArgs> | null;
    omit?: Prisma.proyectosOmit<ExtArgs> | null;
    include?: Prisma.proyectosInclude<ExtArgs> | null;
};
