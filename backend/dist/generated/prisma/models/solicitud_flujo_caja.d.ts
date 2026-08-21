import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type solicitud_flujo_cajaModel = runtime.Types.Result.DefaultSelection<Prisma.$solicitud_flujo_cajaPayload>;
export type AggregateSolicitud_flujo_caja = {
    _count: Solicitud_flujo_cajaCountAggregateOutputType | null;
    _avg: Solicitud_flujo_cajaAvgAggregateOutputType | null;
    _sum: Solicitud_flujo_cajaSumAggregateOutputType | null;
    _min: Solicitud_flujo_cajaMinAggregateOutputType | null;
    _max: Solicitud_flujo_cajaMaxAggregateOutputType | null;
};
export type Solicitud_flujo_cajaAvgAggregateOutputType = {
    id: number | null;
    solicitud_id: number | null;
    anio: number | null;
    monto: runtime.Decimal | null;
};
export type Solicitud_flujo_cajaSumAggregateOutputType = {
    id: number | null;
    solicitud_id: number | null;
    anio: number | null;
    monto: runtime.Decimal | null;
};
export type Solicitud_flujo_cajaMinAggregateOutputType = {
    id: number | null;
    solicitud_id: number | null;
    tipo: string | null;
    anio: number | null;
    monto: runtime.Decimal | null;
};
export type Solicitud_flujo_cajaMaxAggregateOutputType = {
    id: number | null;
    solicitud_id: number | null;
    tipo: string | null;
    anio: number | null;
    monto: runtime.Decimal | null;
};
export type Solicitud_flujo_cajaCountAggregateOutputType = {
    id: number;
    solicitud_id: number;
    tipo: number;
    anio: number;
    monto: number;
    _all: number;
};
export type Solicitud_flujo_cajaAvgAggregateInputType = {
    id?: true;
    solicitud_id?: true;
    anio?: true;
    monto?: true;
};
export type Solicitud_flujo_cajaSumAggregateInputType = {
    id?: true;
    solicitud_id?: true;
    anio?: true;
    monto?: true;
};
export type Solicitud_flujo_cajaMinAggregateInputType = {
    id?: true;
    solicitud_id?: true;
    tipo?: true;
    anio?: true;
    monto?: true;
};
export type Solicitud_flujo_cajaMaxAggregateInputType = {
    id?: true;
    solicitud_id?: true;
    tipo?: true;
    anio?: true;
    monto?: true;
};
export type Solicitud_flujo_cajaCountAggregateInputType = {
    id?: true;
    solicitud_id?: true;
    tipo?: true;
    anio?: true;
    monto?: true;
    _all?: true;
};
export type Solicitud_flujo_cajaAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.solicitud_flujo_cajaWhereInput;
    orderBy?: Prisma.solicitud_flujo_cajaOrderByWithRelationInput | Prisma.solicitud_flujo_cajaOrderByWithRelationInput[];
    cursor?: Prisma.solicitud_flujo_cajaWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Solicitud_flujo_cajaCountAggregateInputType;
    _avg?: Solicitud_flujo_cajaAvgAggregateInputType;
    _sum?: Solicitud_flujo_cajaSumAggregateInputType;
    _min?: Solicitud_flujo_cajaMinAggregateInputType;
    _max?: Solicitud_flujo_cajaMaxAggregateInputType;
};
export type GetSolicitud_flujo_cajaAggregateType<T extends Solicitud_flujo_cajaAggregateArgs> = {
    [P in keyof T & keyof AggregateSolicitud_flujo_caja]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSolicitud_flujo_caja[P]> : Prisma.GetScalarType<T[P], AggregateSolicitud_flujo_caja[P]>;
};
export type solicitud_flujo_cajaGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.solicitud_flujo_cajaWhereInput;
    orderBy?: Prisma.solicitud_flujo_cajaOrderByWithAggregationInput | Prisma.solicitud_flujo_cajaOrderByWithAggregationInput[];
    by: Prisma.Solicitud_flujo_cajaScalarFieldEnum[] | Prisma.Solicitud_flujo_cajaScalarFieldEnum;
    having?: Prisma.solicitud_flujo_cajaScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Solicitud_flujo_cajaCountAggregateInputType | true;
    _avg?: Solicitud_flujo_cajaAvgAggregateInputType;
    _sum?: Solicitud_flujo_cajaSumAggregateInputType;
    _min?: Solicitud_flujo_cajaMinAggregateInputType;
    _max?: Solicitud_flujo_cajaMaxAggregateInputType;
};
export type Solicitud_flujo_cajaGroupByOutputType = {
    id: number;
    solicitud_id: number | null;
    tipo: string;
    anio: number;
    monto: runtime.Decimal | null;
    _count: Solicitud_flujo_cajaCountAggregateOutputType | null;
    _avg: Solicitud_flujo_cajaAvgAggregateOutputType | null;
    _sum: Solicitud_flujo_cajaSumAggregateOutputType | null;
    _min: Solicitud_flujo_cajaMinAggregateOutputType | null;
    _max: Solicitud_flujo_cajaMaxAggregateOutputType | null;
};
export type GetSolicitud_flujo_cajaGroupByPayload<T extends solicitud_flujo_cajaGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Solicitud_flujo_cajaGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Solicitud_flujo_cajaGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Solicitud_flujo_cajaGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Solicitud_flujo_cajaGroupByOutputType[P]>;
}>>;
export type solicitud_flujo_cajaWhereInput = {
    AND?: Prisma.solicitud_flujo_cajaWhereInput | Prisma.solicitud_flujo_cajaWhereInput[];
    OR?: Prisma.solicitud_flujo_cajaWhereInput[];
    NOT?: Prisma.solicitud_flujo_cajaWhereInput | Prisma.solicitud_flujo_cajaWhereInput[];
    id?: Prisma.IntFilter<"solicitud_flujo_caja"> | number;
    solicitud_id?: Prisma.IntNullableFilter<"solicitud_flujo_caja"> | number | null;
    tipo?: Prisma.StringFilter<"solicitud_flujo_caja"> | string;
    anio?: Prisma.IntFilter<"solicitud_flujo_caja"> | number;
    monto?: Prisma.DecimalNullableFilter<"solicitud_flujo_caja"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    solicitudes_inversion?: Prisma.XOR<Prisma.Solicitudes_inversionNullableScalarRelationFilter, Prisma.solicitudes_inversionWhereInput> | null;
};
export type solicitud_flujo_cajaOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    solicitud_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    anio?: Prisma.SortOrder;
    monto?: Prisma.SortOrderInput | Prisma.SortOrder;
    solicitudes_inversion?: Prisma.solicitudes_inversionOrderByWithRelationInput;
};
export type solicitud_flujo_cajaWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.solicitud_flujo_cajaWhereInput | Prisma.solicitud_flujo_cajaWhereInput[];
    OR?: Prisma.solicitud_flujo_cajaWhereInput[];
    NOT?: Prisma.solicitud_flujo_cajaWhereInput | Prisma.solicitud_flujo_cajaWhereInput[];
    solicitud_id?: Prisma.IntNullableFilter<"solicitud_flujo_caja"> | number | null;
    tipo?: Prisma.StringFilter<"solicitud_flujo_caja"> | string;
    anio?: Prisma.IntFilter<"solicitud_flujo_caja"> | number;
    monto?: Prisma.DecimalNullableFilter<"solicitud_flujo_caja"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    solicitudes_inversion?: Prisma.XOR<Prisma.Solicitudes_inversionNullableScalarRelationFilter, Prisma.solicitudes_inversionWhereInput> | null;
}, "id">;
export type solicitud_flujo_cajaOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    solicitud_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    anio?: Prisma.SortOrder;
    monto?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.solicitud_flujo_cajaCountOrderByAggregateInput;
    _avg?: Prisma.solicitud_flujo_cajaAvgOrderByAggregateInput;
    _max?: Prisma.solicitud_flujo_cajaMaxOrderByAggregateInput;
    _min?: Prisma.solicitud_flujo_cajaMinOrderByAggregateInput;
    _sum?: Prisma.solicitud_flujo_cajaSumOrderByAggregateInput;
};
export type solicitud_flujo_cajaScalarWhereWithAggregatesInput = {
    AND?: Prisma.solicitud_flujo_cajaScalarWhereWithAggregatesInput | Prisma.solicitud_flujo_cajaScalarWhereWithAggregatesInput[];
    OR?: Prisma.solicitud_flujo_cajaScalarWhereWithAggregatesInput[];
    NOT?: Prisma.solicitud_flujo_cajaScalarWhereWithAggregatesInput | Prisma.solicitud_flujo_cajaScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"solicitud_flujo_caja"> | number;
    solicitud_id?: Prisma.IntNullableWithAggregatesFilter<"solicitud_flujo_caja"> | number | null;
    tipo?: Prisma.StringWithAggregatesFilter<"solicitud_flujo_caja"> | string;
    anio?: Prisma.IntWithAggregatesFilter<"solicitud_flujo_caja"> | number;
    monto?: Prisma.DecimalNullableWithAggregatesFilter<"solicitud_flujo_caja"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_flujo_cajaCreateInput = {
    tipo: string;
    anio: number;
    monto?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    solicitudes_inversion?: Prisma.solicitudes_inversionCreateNestedOneWithoutSolicitud_flujo_cajaInput;
};
export type solicitud_flujo_cajaUncheckedCreateInput = {
    id?: number;
    solicitud_id?: number | null;
    tipo: string;
    anio: number;
    monto?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_flujo_cajaUpdateInput = {
    tipo?: Prisma.StringFieldUpdateOperationsInput | string;
    anio?: Prisma.IntFieldUpdateOperationsInput | number;
    monto?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    solicitudes_inversion?: Prisma.solicitudes_inversionUpdateOneWithoutSolicitud_flujo_cajaNestedInput;
};
export type solicitud_flujo_cajaUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    solicitud_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo?: Prisma.StringFieldUpdateOperationsInput | string;
    anio?: Prisma.IntFieldUpdateOperationsInput | number;
    monto?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_flujo_cajaCreateManyInput = {
    id?: number;
    solicitud_id?: number | null;
    tipo: string;
    anio: number;
    monto?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_flujo_cajaUpdateManyMutationInput = {
    tipo?: Prisma.StringFieldUpdateOperationsInput | string;
    anio?: Prisma.IntFieldUpdateOperationsInput | number;
    monto?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_flujo_cajaUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    solicitud_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tipo?: Prisma.StringFieldUpdateOperationsInput | string;
    anio?: Prisma.IntFieldUpdateOperationsInput | number;
    monto?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_flujo_cajaCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    solicitud_id?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    anio?: Prisma.SortOrder;
    monto?: Prisma.SortOrder;
};
export type solicitud_flujo_cajaAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    solicitud_id?: Prisma.SortOrder;
    anio?: Prisma.SortOrder;
    monto?: Prisma.SortOrder;
};
export type solicitud_flujo_cajaMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    solicitud_id?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    anio?: Prisma.SortOrder;
    monto?: Prisma.SortOrder;
};
export type solicitud_flujo_cajaMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    solicitud_id?: Prisma.SortOrder;
    tipo?: Prisma.SortOrder;
    anio?: Prisma.SortOrder;
    monto?: Prisma.SortOrder;
};
export type solicitud_flujo_cajaSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    solicitud_id?: Prisma.SortOrder;
    anio?: Prisma.SortOrder;
    monto?: Prisma.SortOrder;
};
export type Solicitud_flujo_cajaListRelationFilter = {
    every?: Prisma.solicitud_flujo_cajaWhereInput;
    some?: Prisma.solicitud_flujo_cajaWhereInput;
    none?: Prisma.solicitud_flujo_cajaWhereInput;
};
export type solicitud_flujo_cajaOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type solicitud_flujo_cajaCreateNestedManyWithoutSolicitudes_inversionInput = {
    create?: Prisma.XOR<Prisma.solicitud_flujo_cajaCreateWithoutSolicitudes_inversionInput, Prisma.solicitud_flujo_cajaUncheckedCreateWithoutSolicitudes_inversionInput> | Prisma.solicitud_flujo_cajaCreateWithoutSolicitudes_inversionInput[] | Prisma.solicitud_flujo_cajaUncheckedCreateWithoutSolicitudes_inversionInput[];
    connectOrCreate?: Prisma.solicitud_flujo_cajaCreateOrConnectWithoutSolicitudes_inversionInput | Prisma.solicitud_flujo_cajaCreateOrConnectWithoutSolicitudes_inversionInput[];
    createMany?: Prisma.solicitud_flujo_cajaCreateManySolicitudes_inversionInputEnvelope;
    connect?: Prisma.solicitud_flujo_cajaWhereUniqueInput | Prisma.solicitud_flujo_cajaWhereUniqueInput[];
};
export type solicitud_flujo_cajaUncheckedCreateNestedManyWithoutSolicitudes_inversionInput = {
    create?: Prisma.XOR<Prisma.solicitud_flujo_cajaCreateWithoutSolicitudes_inversionInput, Prisma.solicitud_flujo_cajaUncheckedCreateWithoutSolicitudes_inversionInput> | Prisma.solicitud_flujo_cajaCreateWithoutSolicitudes_inversionInput[] | Prisma.solicitud_flujo_cajaUncheckedCreateWithoutSolicitudes_inversionInput[];
    connectOrCreate?: Prisma.solicitud_flujo_cajaCreateOrConnectWithoutSolicitudes_inversionInput | Prisma.solicitud_flujo_cajaCreateOrConnectWithoutSolicitudes_inversionInput[];
    createMany?: Prisma.solicitud_flujo_cajaCreateManySolicitudes_inversionInputEnvelope;
    connect?: Prisma.solicitud_flujo_cajaWhereUniqueInput | Prisma.solicitud_flujo_cajaWhereUniqueInput[];
};
export type solicitud_flujo_cajaUpdateManyWithoutSolicitudes_inversionNestedInput = {
    create?: Prisma.XOR<Prisma.solicitud_flujo_cajaCreateWithoutSolicitudes_inversionInput, Prisma.solicitud_flujo_cajaUncheckedCreateWithoutSolicitudes_inversionInput> | Prisma.solicitud_flujo_cajaCreateWithoutSolicitudes_inversionInput[] | Prisma.solicitud_flujo_cajaUncheckedCreateWithoutSolicitudes_inversionInput[];
    connectOrCreate?: Prisma.solicitud_flujo_cajaCreateOrConnectWithoutSolicitudes_inversionInput | Prisma.solicitud_flujo_cajaCreateOrConnectWithoutSolicitudes_inversionInput[];
    upsert?: Prisma.solicitud_flujo_cajaUpsertWithWhereUniqueWithoutSolicitudes_inversionInput | Prisma.solicitud_flujo_cajaUpsertWithWhereUniqueWithoutSolicitudes_inversionInput[];
    createMany?: Prisma.solicitud_flujo_cajaCreateManySolicitudes_inversionInputEnvelope;
    set?: Prisma.solicitud_flujo_cajaWhereUniqueInput | Prisma.solicitud_flujo_cajaWhereUniqueInput[];
    disconnect?: Prisma.solicitud_flujo_cajaWhereUniqueInput | Prisma.solicitud_flujo_cajaWhereUniqueInput[];
    delete?: Prisma.solicitud_flujo_cajaWhereUniqueInput | Prisma.solicitud_flujo_cajaWhereUniqueInput[];
    connect?: Prisma.solicitud_flujo_cajaWhereUniqueInput | Prisma.solicitud_flujo_cajaWhereUniqueInput[];
    update?: Prisma.solicitud_flujo_cajaUpdateWithWhereUniqueWithoutSolicitudes_inversionInput | Prisma.solicitud_flujo_cajaUpdateWithWhereUniqueWithoutSolicitudes_inversionInput[];
    updateMany?: Prisma.solicitud_flujo_cajaUpdateManyWithWhereWithoutSolicitudes_inversionInput | Prisma.solicitud_flujo_cajaUpdateManyWithWhereWithoutSolicitudes_inversionInput[];
    deleteMany?: Prisma.solicitud_flujo_cajaScalarWhereInput | Prisma.solicitud_flujo_cajaScalarWhereInput[];
};
export type solicitud_flujo_cajaUncheckedUpdateManyWithoutSolicitudes_inversionNestedInput = {
    create?: Prisma.XOR<Prisma.solicitud_flujo_cajaCreateWithoutSolicitudes_inversionInput, Prisma.solicitud_flujo_cajaUncheckedCreateWithoutSolicitudes_inversionInput> | Prisma.solicitud_flujo_cajaCreateWithoutSolicitudes_inversionInput[] | Prisma.solicitud_flujo_cajaUncheckedCreateWithoutSolicitudes_inversionInput[];
    connectOrCreate?: Prisma.solicitud_flujo_cajaCreateOrConnectWithoutSolicitudes_inversionInput | Prisma.solicitud_flujo_cajaCreateOrConnectWithoutSolicitudes_inversionInput[];
    upsert?: Prisma.solicitud_flujo_cajaUpsertWithWhereUniqueWithoutSolicitudes_inversionInput | Prisma.solicitud_flujo_cajaUpsertWithWhereUniqueWithoutSolicitudes_inversionInput[];
    createMany?: Prisma.solicitud_flujo_cajaCreateManySolicitudes_inversionInputEnvelope;
    set?: Prisma.solicitud_flujo_cajaWhereUniqueInput | Prisma.solicitud_flujo_cajaWhereUniqueInput[];
    disconnect?: Prisma.solicitud_flujo_cajaWhereUniqueInput | Prisma.solicitud_flujo_cajaWhereUniqueInput[];
    delete?: Prisma.solicitud_flujo_cajaWhereUniqueInput | Prisma.solicitud_flujo_cajaWhereUniqueInput[];
    connect?: Prisma.solicitud_flujo_cajaWhereUniqueInput | Prisma.solicitud_flujo_cajaWhereUniqueInput[];
    update?: Prisma.solicitud_flujo_cajaUpdateWithWhereUniqueWithoutSolicitudes_inversionInput | Prisma.solicitud_flujo_cajaUpdateWithWhereUniqueWithoutSolicitudes_inversionInput[];
    updateMany?: Prisma.solicitud_flujo_cajaUpdateManyWithWhereWithoutSolicitudes_inversionInput | Prisma.solicitud_flujo_cajaUpdateManyWithWhereWithoutSolicitudes_inversionInput[];
    deleteMany?: Prisma.solicitud_flujo_cajaScalarWhereInput | Prisma.solicitud_flujo_cajaScalarWhereInput[];
};
export type solicitud_flujo_cajaCreateWithoutSolicitudes_inversionInput = {
    tipo: string;
    anio: number;
    monto?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_flujo_cajaUncheckedCreateWithoutSolicitudes_inversionInput = {
    id?: number;
    tipo: string;
    anio: number;
    monto?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_flujo_cajaCreateOrConnectWithoutSolicitudes_inversionInput = {
    where: Prisma.solicitud_flujo_cajaWhereUniqueInput;
    create: Prisma.XOR<Prisma.solicitud_flujo_cajaCreateWithoutSolicitudes_inversionInput, Prisma.solicitud_flujo_cajaUncheckedCreateWithoutSolicitudes_inversionInput>;
};
export type solicitud_flujo_cajaCreateManySolicitudes_inversionInputEnvelope = {
    data: Prisma.solicitud_flujo_cajaCreateManySolicitudes_inversionInput | Prisma.solicitud_flujo_cajaCreateManySolicitudes_inversionInput[];
    skipDuplicates?: boolean;
};
export type solicitud_flujo_cajaUpsertWithWhereUniqueWithoutSolicitudes_inversionInput = {
    where: Prisma.solicitud_flujo_cajaWhereUniqueInput;
    update: Prisma.XOR<Prisma.solicitud_flujo_cajaUpdateWithoutSolicitudes_inversionInput, Prisma.solicitud_flujo_cajaUncheckedUpdateWithoutSolicitudes_inversionInput>;
    create: Prisma.XOR<Prisma.solicitud_flujo_cajaCreateWithoutSolicitudes_inversionInput, Prisma.solicitud_flujo_cajaUncheckedCreateWithoutSolicitudes_inversionInput>;
};
export type solicitud_flujo_cajaUpdateWithWhereUniqueWithoutSolicitudes_inversionInput = {
    where: Prisma.solicitud_flujo_cajaWhereUniqueInput;
    data: Prisma.XOR<Prisma.solicitud_flujo_cajaUpdateWithoutSolicitudes_inversionInput, Prisma.solicitud_flujo_cajaUncheckedUpdateWithoutSolicitudes_inversionInput>;
};
export type solicitud_flujo_cajaUpdateManyWithWhereWithoutSolicitudes_inversionInput = {
    where: Prisma.solicitud_flujo_cajaScalarWhereInput;
    data: Prisma.XOR<Prisma.solicitud_flujo_cajaUpdateManyMutationInput, Prisma.solicitud_flujo_cajaUncheckedUpdateManyWithoutSolicitudes_inversionInput>;
};
export type solicitud_flujo_cajaScalarWhereInput = {
    AND?: Prisma.solicitud_flujo_cajaScalarWhereInput | Prisma.solicitud_flujo_cajaScalarWhereInput[];
    OR?: Prisma.solicitud_flujo_cajaScalarWhereInput[];
    NOT?: Prisma.solicitud_flujo_cajaScalarWhereInput | Prisma.solicitud_flujo_cajaScalarWhereInput[];
    id?: Prisma.IntFilter<"solicitud_flujo_caja"> | number;
    solicitud_id?: Prisma.IntNullableFilter<"solicitud_flujo_caja"> | number | null;
    tipo?: Prisma.StringFilter<"solicitud_flujo_caja"> | string;
    anio?: Prisma.IntFilter<"solicitud_flujo_caja"> | number;
    monto?: Prisma.DecimalNullableFilter<"solicitud_flujo_caja"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_flujo_cajaCreateManySolicitudes_inversionInput = {
    id?: number;
    tipo: string;
    anio: number;
    monto?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_flujo_cajaUpdateWithoutSolicitudes_inversionInput = {
    tipo?: Prisma.StringFieldUpdateOperationsInput | string;
    anio?: Prisma.IntFieldUpdateOperationsInput | number;
    monto?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_flujo_cajaUncheckedUpdateWithoutSolicitudes_inversionInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    tipo?: Prisma.StringFieldUpdateOperationsInput | string;
    anio?: Prisma.IntFieldUpdateOperationsInput | number;
    monto?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_flujo_cajaUncheckedUpdateManyWithoutSolicitudes_inversionInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    tipo?: Prisma.StringFieldUpdateOperationsInput | string;
    anio?: Prisma.IntFieldUpdateOperationsInput | number;
    monto?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_flujo_cajaSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    solicitud_id?: boolean;
    tipo?: boolean;
    anio?: boolean;
    monto?: boolean;
    solicitudes_inversion?: boolean | Prisma.solicitud_flujo_caja$solicitudes_inversionArgs<ExtArgs>;
}, ExtArgs["result"]["solicitud_flujo_caja"]>;
export type solicitud_flujo_cajaSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    solicitud_id?: boolean;
    tipo?: boolean;
    anio?: boolean;
    monto?: boolean;
    solicitudes_inversion?: boolean | Prisma.solicitud_flujo_caja$solicitudes_inversionArgs<ExtArgs>;
}, ExtArgs["result"]["solicitud_flujo_caja"]>;
export type solicitud_flujo_cajaSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    solicitud_id?: boolean;
    tipo?: boolean;
    anio?: boolean;
    monto?: boolean;
    solicitudes_inversion?: boolean | Prisma.solicitud_flujo_caja$solicitudes_inversionArgs<ExtArgs>;
}, ExtArgs["result"]["solicitud_flujo_caja"]>;
export type solicitud_flujo_cajaSelectScalar = {
    id?: boolean;
    solicitud_id?: boolean;
    tipo?: boolean;
    anio?: boolean;
    monto?: boolean;
};
export type solicitud_flujo_cajaOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "solicitud_id" | "tipo" | "anio" | "monto", ExtArgs["result"]["solicitud_flujo_caja"]>;
export type solicitud_flujo_cajaInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    solicitudes_inversion?: boolean | Prisma.solicitud_flujo_caja$solicitudes_inversionArgs<ExtArgs>;
};
export type solicitud_flujo_cajaIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    solicitudes_inversion?: boolean | Prisma.solicitud_flujo_caja$solicitudes_inversionArgs<ExtArgs>;
};
export type solicitud_flujo_cajaIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    solicitudes_inversion?: boolean | Prisma.solicitud_flujo_caja$solicitudes_inversionArgs<ExtArgs>;
};
export type $solicitud_flujo_cajaPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "solicitud_flujo_caja";
    objects: {
        solicitudes_inversion: Prisma.$solicitudes_inversionPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        solicitud_id: number | null;
        tipo: string;
        anio: number;
        monto: runtime.Decimal | null;
    }, ExtArgs["result"]["solicitud_flujo_caja"]>;
    composites: {};
};
export type solicitud_flujo_cajaGetPayload<S extends boolean | null | undefined | solicitud_flujo_cajaDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$solicitud_flujo_cajaPayload, S>;
export type solicitud_flujo_cajaCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<solicitud_flujo_cajaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Solicitud_flujo_cajaCountAggregateInputType | true;
};
export interface solicitud_flujo_cajaDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['solicitud_flujo_caja'];
        meta: {
            name: 'solicitud_flujo_caja';
        };
    };
    findUnique<T extends solicitud_flujo_cajaFindUniqueArgs>(args: Prisma.SelectSubset<T, solicitud_flujo_cajaFindUniqueArgs<ExtArgs>>): Prisma.Prisma__solicitud_flujo_cajaClient<runtime.Types.Result.GetResult<Prisma.$solicitud_flujo_cajaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends solicitud_flujo_cajaFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, solicitud_flujo_cajaFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__solicitud_flujo_cajaClient<runtime.Types.Result.GetResult<Prisma.$solicitud_flujo_cajaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends solicitud_flujo_cajaFindFirstArgs>(args?: Prisma.SelectSubset<T, solicitud_flujo_cajaFindFirstArgs<ExtArgs>>): Prisma.Prisma__solicitud_flujo_cajaClient<runtime.Types.Result.GetResult<Prisma.$solicitud_flujo_cajaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends solicitud_flujo_cajaFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, solicitud_flujo_cajaFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__solicitud_flujo_cajaClient<runtime.Types.Result.GetResult<Prisma.$solicitud_flujo_cajaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends solicitud_flujo_cajaFindManyArgs>(args?: Prisma.SelectSubset<T, solicitud_flujo_cajaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$solicitud_flujo_cajaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends solicitud_flujo_cajaCreateArgs>(args: Prisma.SelectSubset<T, solicitud_flujo_cajaCreateArgs<ExtArgs>>): Prisma.Prisma__solicitud_flujo_cajaClient<runtime.Types.Result.GetResult<Prisma.$solicitud_flujo_cajaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends solicitud_flujo_cajaCreateManyArgs>(args?: Prisma.SelectSubset<T, solicitud_flujo_cajaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends solicitud_flujo_cajaCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, solicitud_flujo_cajaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$solicitud_flujo_cajaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends solicitud_flujo_cajaDeleteArgs>(args: Prisma.SelectSubset<T, solicitud_flujo_cajaDeleteArgs<ExtArgs>>): Prisma.Prisma__solicitud_flujo_cajaClient<runtime.Types.Result.GetResult<Prisma.$solicitud_flujo_cajaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends solicitud_flujo_cajaUpdateArgs>(args: Prisma.SelectSubset<T, solicitud_flujo_cajaUpdateArgs<ExtArgs>>): Prisma.Prisma__solicitud_flujo_cajaClient<runtime.Types.Result.GetResult<Prisma.$solicitud_flujo_cajaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends solicitud_flujo_cajaDeleteManyArgs>(args?: Prisma.SelectSubset<T, solicitud_flujo_cajaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends solicitud_flujo_cajaUpdateManyArgs>(args: Prisma.SelectSubset<T, solicitud_flujo_cajaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends solicitud_flujo_cajaUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, solicitud_flujo_cajaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$solicitud_flujo_cajaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends solicitud_flujo_cajaUpsertArgs>(args: Prisma.SelectSubset<T, solicitud_flujo_cajaUpsertArgs<ExtArgs>>): Prisma.Prisma__solicitud_flujo_cajaClient<runtime.Types.Result.GetResult<Prisma.$solicitud_flujo_cajaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends solicitud_flujo_cajaCountArgs>(args?: Prisma.Subset<T, solicitud_flujo_cajaCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Solicitud_flujo_cajaCountAggregateOutputType> : number>;
    aggregate<T extends Solicitud_flujo_cajaAggregateArgs>(args: Prisma.Subset<T, Solicitud_flujo_cajaAggregateArgs>): Prisma.PrismaPromise<GetSolicitud_flujo_cajaAggregateType<T>>;
    groupBy<T extends solicitud_flujo_cajaGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: solicitud_flujo_cajaGroupByArgs['orderBy'];
    } : {
        orderBy?: solicitud_flujo_cajaGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, solicitud_flujo_cajaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSolicitud_flujo_cajaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: solicitud_flujo_cajaFieldRefs;
}
export interface Prisma__solicitud_flujo_cajaClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    solicitudes_inversion<T extends Prisma.solicitud_flujo_caja$solicitudes_inversionArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.solicitud_flujo_caja$solicitudes_inversionArgs<ExtArgs>>): Prisma.Prisma__solicitudes_inversionClient<runtime.Types.Result.GetResult<Prisma.$solicitudes_inversionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface solicitud_flujo_cajaFieldRefs {
    readonly id: Prisma.FieldRef<"solicitud_flujo_caja", 'Int'>;
    readonly solicitud_id: Prisma.FieldRef<"solicitud_flujo_caja", 'Int'>;
    readonly tipo: Prisma.FieldRef<"solicitud_flujo_caja", 'String'>;
    readonly anio: Prisma.FieldRef<"solicitud_flujo_caja", 'Int'>;
    readonly monto: Prisma.FieldRef<"solicitud_flujo_caja", 'Decimal'>;
}
export type solicitud_flujo_cajaFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_flujo_cajaSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_flujo_cajaOmit<ExtArgs> | null;
    include?: Prisma.solicitud_flujo_cajaInclude<ExtArgs> | null;
    where: Prisma.solicitud_flujo_cajaWhereUniqueInput;
};
export type solicitud_flujo_cajaFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_flujo_cajaSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_flujo_cajaOmit<ExtArgs> | null;
    include?: Prisma.solicitud_flujo_cajaInclude<ExtArgs> | null;
    where: Prisma.solicitud_flujo_cajaWhereUniqueInput;
};
export type solicitud_flujo_cajaFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type solicitud_flujo_cajaFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type solicitud_flujo_cajaFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type solicitud_flujo_cajaCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_flujo_cajaSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_flujo_cajaOmit<ExtArgs> | null;
    include?: Prisma.solicitud_flujo_cajaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.solicitud_flujo_cajaCreateInput, Prisma.solicitud_flujo_cajaUncheckedCreateInput>;
};
export type solicitud_flujo_cajaCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.solicitud_flujo_cajaCreateManyInput | Prisma.solicitud_flujo_cajaCreateManyInput[];
    skipDuplicates?: boolean;
};
export type solicitud_flujo_cajaCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_flujo_cajaSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.solicitud_flujo_cajaOmit<ExtArgs> | null;
    data: Prisma.solicitud_flujo_cajaCreateManyInput | Prisma.solicitud_flujo_cajaCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.solicitud_flujo_cajaIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type solicitud_flujo_cajaUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_flujo_cajaSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_flujo_cajaOmit<ExtArgs> | null;
    include?: Prisma.solicitud_flujo_cajaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.solicitud_flujo_cajaUpdateInput, Prisma.solicitud_flujo_cajaUncheckedUpdateInput>;
    where: Prisma.solicitud_flujo_cajaWhereUniqueInput;
};
export type solicitud_flujo_cajaUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.solicitud_flujo_cajaUpdateManyMutationInput, Prisma.solicitud_flujo_cajaUncheckedUpdateManyInput>;
    where?: Prisma.solicitud_flujo_cajaWhereInput;
    limit?: number;
};
export type solicitud_flujo_cajaUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_flujo_cajaSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.solicitud_flujo_cajaOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.solicitud_flujo_cajaUpdateManyMutationInput, Prisma.solicitud_flujo_cajaUncheckedUpdateManyInput>;
    where?: Prisma.solicitud_flujo_cajaWhereInput;
    limit?: number;
    include?: Prisma.solicitud_flujo_cajaIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type solicitud_flujo_cajaUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_flujo_cajaSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_flujo_cajaOmit<ExtArgs> | null;
    include?: Prisma.solicitud_flujo_cajaInclude<ExtArgs> | null;
    where: Prisma.solicitud_flujo_cajaWhereUniqueInput;
    create: Prisma.XOR<Prisma.solicitud_flujo_cajaCreateInput, Prisma.solicitud_flujo_cajaUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.solicitud_flujo_cajaUpdateInput, Prisma.solicitud_flujo_cajaUncheckedUpdateInput>;
};
export type solicitud_flujo_cajaDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_flujo_cajaSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_flujo_cajaOmit<ExtArgs> | null;
    include?: Prisma.solicitud_flujo_cajaInclude<ExtArgs> | null;
    where: Prisma.solicitud_flujo_cajaWhereUniqueInput;
};
export type solicitud_flujo_cajaDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.solicitud_flujo_cajaWhereInput;
    limit?: number;
};
export type solicitud_flujo_caja$solicitudes_inversionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitudes_inversionSelect<ExtArgs> | null;
    omit?: Prisma.solicitudes_inversionOmit<ExtArgs> | null;
    include?: Prisma.solicitudes_inversionInclude<ExtArgs> | null;
    where?: Prisma.solicitudes_inversionWhereInput;
};
export type solicitud_flujo_cajaDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_flujo_cajaSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_flujo_cajaOmit<ExtArgs> | null;
    include?: Prisma.solicitud_flujo_cajaInclude<ExtArgs> | null;
};
