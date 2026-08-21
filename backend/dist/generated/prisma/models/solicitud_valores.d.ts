import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type solicitud_valoresModel = runtime.Types.Result.DefaultSelection<Prisma.$solicitud_valoresPayload>;
export type AggregateSolicitud_valores = {
    _count: Solicitud_valoresCountAggregateOutputType | null;
    _avg: Solicitud_valoresAvgAggregateOutputType | null;
    _sum: Solicitud_valoresSumAggregateOutputType | null;
    _min: Solicitud_valoresMinAggregateOutputType | null;
    _max: Solicitud_valoresMaxAggregateOutputType | null;
};
export type Solicitud_valoresAvgAggregateOutputType = {
    id: number | null;
    solicitud_id: number | null;
    usd: runtime.Decimal | null;
    cop: runtime.Decimal | null;
};
export type Solicitud_valoresSumAggregateOutputType = {
    id: number | null;
    solicitud_id: number | null;
    usd: runtime.Decimal | null;
    cop: runtime.Decimal | null;
};
export type Solicitud_valoresMinAggregateOutputType = {
    id: number | null;
    solicitud_id: number | null;
    categoria: string | null;
    usd: runtime.Decimal | null;
    cop: runtime.Decimal | null;
};
export type Solicitud_valoresMaxAggregateOutputType = {
    id: number | null;
    solicitud_id: number | null;
    categoria: string | null;
    usd: runtime.Decimal | null;
    cop: runtime.Decimal | null;
};
export type Solicitud_valoresCountAggregateOutputType = {
    id: number;
    solicitud_id: number;
    categoria: number;
    usd: number;
    cop: number;
    _all: number;
};
export type Solicitud_valoresAvgAggregateInputType = {
    id?: true;
    solicitud_id?: true;
    usd?: true;
    cop?: true;
};
export type Solicitud_valoresSumAggregateInputType = {
    id?: true;
    solicitud_id?: true;
    usd?: true;
    cop?: true;
};
export type Solicitud_valoresMinAggregateInputType = {
    id?: true;
    solicitud_id?: true;
    categoria?: true;
    usd?: true;
    cop?: true;
};
export type Solicitud_valoresMaxAggregateInputType = {
    id?: true;
    solicitud_id?: true;
    categoria?: true;
    usd?: true;
    cop?: true;
};
export type Solicitud_valoresCountAggregateInputType = {
    id?: true;
    solicitud_id?: true;
    categoria?: true;
    usd?: true;
    cop?: true;
    _all?: true;
};
export type Solicitud_valoresAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.solicitud_valoresWhereInput;
    orderBy?: Prisma.solicitud_valoresOrderByWithRelationInput | Prisma.solicitud_valoresOrderByWithRelationInput[];
    cursor?: Prisma.solicitud_valoresWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Solicitud_valoresCountAggregateInputType;
    _avg?: Solicitud_valoresAvgAggregateInputType;
    _sum?: Solicitud_valoresSumAggregateInputType;
    _min?: Solicitud_valoresMinAggregateInputType;
    _max?: Solicitud_valoresMaxAggregateInputType;
};
export type GetSolicitud_valoresAggregateType<T extends Solicitud_valoresAggregateArgs> = {
    [P in keyof T & keyof AggregateSolicitud_valores]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSolicitud_valores[P]> : Prisma.GetScalarType<T[P], AggregateSolicitud_valores[P]>;
};
export type solicitud_valoresGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.solicitud_valoresWhereInput;
    orderBy?: Prisma.solicitud_valoresOrderByWithAggregationInput | Prisma.solicitud_valoresOrderByWithAggregationInput[];
    by: Prisma.Solicitud_valoresScalarFieldEnum[] | Prisma.Solicitud_valoresScalarFieldEnum;
    having?: Prisma.solicitud_valoresScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Solicitud_valoresCountAggregateInputType | true;
    _avg?: Solicitud_valoresAvgAggregateInputType;
    _sum?: Solicitud_valoresSumAggregateInputType;
    _min?: Solicitud_valoresMinAggregateInputType;
    _max?: Solicitud_valoresMaxAggregateInputType;
};
export type Solicitud_valoresGroupByOutputType = {
    id: number;
    solicitud_id: number | null;
    categoria: string;
    usd: runtime.Decimal | null;
    cop: runtime.Decimal | null;
    _count: Solicitud_valoresCountAggregateOutputType | null;
    _avg: Solicitud_valoresAvgAggregateOutputType | null;
    _sum: Solicitud_valoresSumAggregateOutputType | null;
    _min: Solicitud_valoresMinAggregateOutputType | null;
    _max: Solicitud_valoresMaxAggregateOutputType | null;
};
export type GetSolicitud_valoresGroupByPayload<T extends solicitud_valoresGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Solicitud_valoresGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Solicitud_valoresGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Solicitud_valoresGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Solicitud_valoresGroupByOutputType[P]>;
}>>;
export type solicitud_valoresWhereInput = {
    AND?: Prisma.solicitud_valoresWhereInput | Prisma.solicitud_valoresWhereInput[];
    OR?: Prisma.solicitud_valoresWhereInput[];
    NOT?: Prisma.solicitud_valoresWhereInput | Prisma.solicitud_valoresWhereInput[];
    id?: Prisma.IntFilter<"solicitud_valores"> | number;
    solicitud_id?: Prisma.IntNullableFilter<"solicitud_valores"> | number | null;
    categoria?: Prisma.StringFilter<"solicitud_valores"> | string;
    usd?: Prisma.DecimalNullableFilter<"solicitud_valores"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    cop?: Prisma.DecimalNullableFilter<"solicitud_valores"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    solicitudes_inversion?: Prisma.XOR<Prisma.Solicitudes_inversionNullableScalarRelationFilter, Prisma.solicitudes_inversionWhereInput> | null;
};
export type solicitud_valoresOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    solicitud_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    categoria?: Prisma.SortOrder;
    usd?: Prisma.SortOrderInput | Prisma.SortOrder;
    cop?: Prisma.SortOrderInput | Prisma.SortOrder;
    solicitudes_inversion?: Prisma.solicitudes_inversionOrderByWithRelationInput;
};
export type solicitud_valoresWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.solicitud_valoresWhereInput | Prisma.solicitud_valoresWhereInput[];
    OR?: Prisma.solicitud_valoresWhereInput[];
    NOT?: Prisma.solicitud_valoresWhereInput | Prisma.solicitud_valoresWhereInput[];
    solicitud_id?: Prisma.IntNullableFilter<"solicitud_valores"> | number | null;
    categoria?: Prisma.StringFilter<"solicitud_valores"> | string;
    usd?: Prisma.DecimalNullableFilter<"solicitud_valores"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    cop?: Prisma.DecimalNullableFilter<"solicitud_valores"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    solicitudes_inversion?: Prisma.XOR<Prisma.Solicitudes_inversionNullableScalarRelationFilter, Prisma.solicitudes_inversionWhereInput> | null;
}, "id">;
export type solicitud_valoresOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    solicitud_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    categoria?: Prisma.SortOrder;
    usd?: Prisma.SortOrderInput | Prisma.SortOrder;
    cop?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.solicitud_valoresCountOrderByAggregateInput;
    _avg?: Prisma.solicitud_valoresAvgOrderByAggregateInput;
    _max?: Prisma.solicitud_valoresMaxOrderByAggregateInput;
    _min?: Prisma.solicitud_valoresMinOrderByAggregateInput;
    _sum?: Prisma.solicitud_valoresSumOrderByAggregateInput;
};
export type solicitud_valoresScalarWhereWithAggregatesInput = {
    AND?: Prisma.solicitud_valoresScalarWhereWithAggregatesInput | Prisma.solicitud_valoresScalarWhereWithAggregatesInput[];
    OR?: Prisma.solicitud_valoresScalarWhereWithAggregatesInput[];
    NOT?: Prisma.solicitud_valoresScalarWhereWithAggregatesInput | Prisma.solicitud_valoresScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"solicitud_valores"> | number;
    solicitud_id?: Prisma.IntNullableWithAggregatesFilter<"solicitud_valores"> | number | null;
    categoria?: Prisma.StringWithAggregatesFilter<"solicitud_valores"> | string;
    usd?: Prisma.DecimalNullableWithAggregatesFilter<"solicitud_valores"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    cop?: Prisma.DecimalNullableWithAggregatesFilter<"solicitud_valores"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_valoresCreateInput = {
    categoria: string;
    usd?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    cop?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    solicitudes_inversion?: Prisma.solicitudes_inversionCreateNestedOneWithoutSolicitud_valoresInput;
};
export type solicitud_valoresUncheckedCreateInput = {
    id?: number;
    solicitud_id?: number | null;
    categoria: string;
    usd?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    cop?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_valoresUpdateInput = {
    categoria?: Prisma.StringFieldUpdateOperationsInput | string;
    usd?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    cop?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    solicitudes_inversion?: Prisma.solicitudes_inversionUpdateOneWithoutSolicitud_valoresNestedInput;
};
export type solicitud_valoresUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    solicitud_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    categoria?: Prisma.StringFieldUpdateOperationsInput | string;
    usd?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    cop?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_valoresCreateManyInput = {
    id?: number;
    solicitud_id?: number | null;
    categoria: string;
    usd?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    cop?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_valoresUpdateManyMutationInput = {
    categoria?: Prisma.StringFieldUpdateOperationsInput | string;
    usd?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    cop?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_valoresUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    solicitud_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    categoria?: Prisma.StringFieldUpdateOperationsInput | string;
    usd?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    cop?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_valoresCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    solicitud_id?: Prisma.SortOrder;
    categoria?: Prisma.SortOrder;
    usd?: Prisma.SortOrder;
    cop?: Prisma.SortOrder;
};
export type solicitud_valoresAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    solicitud_id?: Prisma.SortOrder;
    usd?: Prisma.SortOrder;
    cop?: Prisma.SortOrder;
};
export type solicitud_valoresMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    solicitud_id?: Prisma.SortOrder;
    categoria?: Prisma.SortOrder;
    usd?: Prisma.SortOrder;
    cop?: Prisma.SortOrder;
};
export type solicitud_valoresMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    solicitud_id?: Prisma.SortOrder;
    categoria?: Prisma.SortOrder;
    usd?: Prisma.SortOrder;
    cop?: Prisma.SortOrder;
};
export type solicitud_valoresSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    solicitud_id?: Prisma.SortOrder;
    usd?: Prisma.SortOrder;
    cop?: Prisma.SortOrder;
};
export type Solicitud_valoresListRelationFilter = {
    every?: Prisma.solicitud_valoresWhereInput;
    some?: Prisma.solicitud_valoresWhereInput;
    none?: Prisma.solicitud_valoresWhereInput;
};
export type solicitud_valoresOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type solicitud_valoresCreateNestedManyWithoutSolicitudes_inversionInput = {
    create?: Prisma.XOR<Prisma.solicitud_valoresCreateWithoutSolicitudes_inversionInput, Prisma.solicitud_valoresUncheckedCreateWithoutSolicitudes_inversionInput> | Prisma.solicitud_valoresCreateWithoutSolicitudes_inversionInput[] | Prisma.solicitud_valoresUncheckedCreateWithoutSolicitudes_inversionInput[];
    connectOrCreate?: Prisma.solicitud_valoresCreateOrConnectWithoutSolicitudes_inversionInput | Prisma.solicitud_valoresCreateOrConnectWithoutSolicitudes_inversionInput[];
    createMany?: Prisma.solicitud_valoresCreateManySolicitudes_inversionInputEnvelope;
    connect?: Prisma.solicitud_valoresWhereUniqueInput | Prisma.solicitud_valoresWhereUniqueInput[];
};
export type solicitud_valoresUncheckedCreateNestedManyWithoutSolicitudes_inversionInput = {
    create?: Prisma.XOR<Prisma.solicitud_valoresCreateWithoutSolicitudes_inversionInput, Prisma.solicitud_valoresUncheckedCreateWithoutSolicitudes_inversionInput> | Prisma.solicitud_valoresCreateWithoutSolicitudes_inversionInput[] | Prisma.solicitud_valoresUncheckedCreateWithoutSolicitudes_inversionInput[];
    connectOrCreate?: Prisma.solicitud_valoresCreateOrConnectWithoutSolicitudes_inversionInput | Prisma.solicitud_valoresCreateOrConnectWithoutSolicitudes_inversionInput[];
    createMany?: Prisma.solicitud_valoresCreateManySolicitudes_inversionInputEnvelope;
    connect?: Prisma.solicitud_valoresWhereUniqueInput | Prisma.solicitud_valoresWhereUniqueInput[];
};
export type solicitud_valoresUpdateManyWithoutSolicitudes_inversionNestedInput = {
    create?: Prisma.XOR<Prisma.solicitud_valoresCreateWithoutSolicitudes_inversionInput, Prisma.solicitud_valoresUncheckedCreateWithoutSolicitudes_inversionInput> | Prisma.solicitud_valoresCreateWithoutSolicitudes_inversionInput[] | Prisma.solicitud_valoresUncheckedCreateWithoutSolicitudes_inversionInput[];
    connectOrCreate?: Prisma.solicitud_valoresCreateOrConnectWithoutSolicitudes_inversionInput | Prisma.solicitud_valoresCreateOrConnectWithoutSolicitudes_inversionInput[];
    upsert?: Prisma.solicitud_valoresUpsertWithWhereUniqueWithoutSolicitudes_inversionInput | Prisma.solicitud_valoresUpsertWithWhereUniqueWithoutSolicitudes_inversionInput[];
    createMany?: Prisma.solicitud_valoresCreateManySolicitudes_inversionInputEnvelope;
    set?: Prisma.solicitud_valoresWhereUniqueInput | Prisma.solicitud_valoresWhereUniqueInput[];
    disconnect?: Prisma.solicitud_valoresWhereUniqueInput | Prisma.solicitud_valoresWhereUniqueInput[];
    delete?: Prisma.solicitud_valoresWhereUniqueInput | Prisma.solicitud_valoresWhereUniqueInput[];
    connect?: Prisma.solicitud_valoresWhereUniqueInput | Prisma.solicitud_valoresWhereUniqueInput[];
    update?: Prisma.solicitud_valoresUpdateWithWhereUniqueWithoutSolicitudes_inversionInput | Prisma.solicitud_valoresUpdateWithWhereUniqueWithoutSolicitudes_inversionInput[];
    updateMany?: Prisma.solicitud_valoresUpdateManyWithWhereWithoutSolicitudes_inversionInput | Prisma.solicitud_valoresUpdateManyWithWhereWithoutSolicitudes_inversionInput[];
    deleteMany?: Prisma.solicitud_valoresScalarWhereInput | Prisma.solicitud_valoresScalarWhereInput[];
};
export type solicitud_valoresUncheckedUpdateManyWithoutSolicitudes_inversionNestedInput = {
    create?: Prisma.XOR<Prisma.solicitud_valoresCreateWithoutSolicitudes_inversionInput, Prisma.solicitud_valoresUncheckedCreateWithoutSolicitudes_inversionInput> | Prisma.solicitud_valoresCreateWithoutSolicitudes_inversionInput[] | Prisma.solicitud_valoresUncheckedCreateWithoutSolicitudes_inversionInput[];
    connectOrCreate?: Prisma.solicitud_valoresCreateOrConnectWithoutSolicitudes_inversionInput | Prisma.solicitud_valoresCreateOrConnectWithoutSolicitudes_inversionInput[];
    upsert?: Prisma.solicitud_valoresUpsertWithWhereUniqueWithoutSolicitudes_inversionInput | Prisma.solicitud_valoresUpsertWithWhereUniqueWithoutSolicitudes_inversionInput[];
    createMany?: Prisma.solicitud_valoresCreateManySolicitudes_inversionInputEnvelope;
    set?: Prisma.solicitud_valoresWhereUniqueInput | Prisma.solicitud_valoresWhereUniqueInput[];
    disconnect?: Prisma.solicitud_valoresWhereUniqueInput | Prisma.solicitud_valoresWhereUniqueInput[];
    delete?: Prisma.solicitud_valoresWhereUniqueInput | Prisma.solicitud_valoresWhereUniqueInput[];
    connect?: Prisma.solicitud_valoresWhereUniqueInput | Prisma.solicitud_valoresWhereUniqueInput[];
    update?: Prisma.solicitud_valoresUpdateWithWhereUniqueWithoutSolicitudes_inversionInput | Prisma.solicitud_valoresUpdateWithWhereUniqueWithoutSolicitudes_inversionInput[];
    updateMany?: Prisma.solicitud_valoresUpdateManyWithWhereWithoutSolicitudes_inversionInput | Prisma.solicitud_valoresUpdateManyWithWhereWithoutSolicitudes_inversionInput[];
    deleteMany?: Prisma.solicitud_valoresScalarWhereInput | Prisma.solicitud_valoresScalarWhereInput[];
};
export type solicitud_valoresCreateWithoutSolicitudes_inversionInput = {
    categoria: string;
    usd?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    cop?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_valoresUncheckedCreateWithoutSolicitudes_inversionInput = {
    id?: number;
    categoria: string;
    usd?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    cop?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_valoresCreateOrConnectWithoutSolicitudes_inversionInput = {
    where: Prisma.solicitud_valoresWhereUniqueInput;
    create: Prisma.XOR<Prisma.solicitud_valoresCreateWithoutSolicitudes_inversionInput, Prisma.solicitud_valoresUncheckedCreateWithoutSolicitudes_inversionInput>;
};
export type solicitud_valoresCreateManySolicitudes_inversionInputEnvelope = {
    data: Prisma.solicitud_valoresCreateManySolicitudes_inversionInput | Prisma.solicitud_valoresCreateManySolicitudes_inversionInput[];
    skipDuplicates?: boolean;
};
export type solicitud_valoresUpsertWithWhereUniqueWithoutSolicitudes_inversionInput = {
    where: Prisma.solicitud_valoresWhereUniqueInput;
    update: Prisma.XOR<Prisma.solicitud_valoresUpdateWithoutSolicitudes_inversionInput, Prisma.solicitud_valoresUncheckedUpdateWithoutSolicitudes_inversionInput>;
    create: Prisma.XOR<Prisma.solicitud_valoresCreateWithoutSolicitudes_inversionInput, Prisma.solicitud_valoresUncheckedCreateWithoutSolicitudes_inversionInput>;
};
export type solicitud_valoresUpdateWithWhereUniqueWithoutSolicitudes_inversionInput = {
    where: Prisma.solicitud_valoresWhereUniqueInput;
    data: Prisma.XOR<Prisma.solicitud_valoresUpdateWithoutSolicitudes_inversionInput, Prisma.solicitud_valoresUncheckedUpdateWithoutSolicitudes_inversionInput>;
};
export type solicitud_valoresUpdateManyWithWhereWithoutSolicitudes_inversionInput = {
    where: Prisma.solicitud_valoresScalarWhereInput;
    data: Prisma.XOR<Prisma.solicitud_valoresUpdateManyMutationInput, Prisma.solicitud_valoresUncheckedUpdateManyWithoutSolicitudes_inversionInput>;
};
export type solicitud_valoresScalarWhereInput = {
    AND?: Prisma.solicitud_valoresScalarWhereInput | Prisma.solicitud_valoresScalarWhereInput[];
    OR?: Prisma.solicitud_valoresScalarWhereInput[];
    NOT?: Prisma.solicitud_valoresScalarWhereInput | Prisma.solicitud_valoresScalarWhereInput[];
    id?: Prisma.IntFilter<"solicitud_valores"> | number;
    solicitud_id?: Prisma.IntNullableFilter<"solicitud_valores"> | number | null;
    categoria?: Prisma.StringFilter<"solicitud_valores"> | string;
    usd?: Prisma.DecimalNullableFilter<"solicitud_valores"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    cop?: Prisma.DecimalNullableFilter<"solicitud_valores"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_valoresCreateManySolicitudes_inversionInput = {
    id?: number;
    categoria: string;
    usd?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    cop?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_valoresUpdateWithoutSolicitudes_inversionInput = {
    categoria?: Prisma.StringFieldUpdateOperationsInput | string;
    usd?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    cop?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_valoresUncheckedUpdateWithoutSolicitudes_inversionInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    categoria?: Prisma.StringFieldUpdateOperationsInput | string;
    usd?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    cop?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_valoresUncheckedUpdateManyWithoutSolicitudes_inversionInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    categoria?: Prisma.StringFieldUpdateOperationsInput | string;
    usd?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    cop?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_valoresSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    solicitud_id?: boolean;
    categoria?: boolean;
    usd?: boolean;
    cop?: boolean;
    solicitudes_inversion?: boolean | Prisma.solicitud_valores$solicitudes_inversionArgs<ExtArgs>;
}, ExtArgs["result"]["solicitud_valores"]>;
export type solicitud_valoresSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    solicitud_id?: boolean;
    categoria?: boolean;
    usd?: boolean;
    cop?: boolean;
    solicitudes_inversion?: boolean | Prisma.solicitud_valores$solicitudes_inversionArgs<ExtArgs>;
}, ExtArgs["result"]["solicitud_valores"]>;
export type solicitud_valoresSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    solicitud_id?: boolean;
    categoria?: boolean;
    usd?: boolean;
    cop?: boolean;
    solicitudes_inversion?: boolean | Prisma.solicitud_valores$solicitudes_inversionArgs<ExtArgs>;
}, ExtArgs["result"]["solicitud_valores"]>;
export type solicitud_valoresSelectScalar = {
    id?: boolean;
    solicitud_id?: boolean;
    categoria?: boolean;
    usd?: boolean;
    cop?: boolean;
};
export type solicitud_valoresOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "solicitud_id" | "categoria" | "usd" | "cop", ExtArgs["result"]["solicitud_valores"]>;
export type solicitud_valoresInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    solicitudes_inversion?: boolean | Prisma.solicitud_valores$solicitudes_inversionArgs<ExtArgs>;
};
export type solicitud_valoresIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    solicitudes_inversion?: boolean | Prisma.solicitud_valores$solicitudes_inversionArgs<ExtArgs>;
};
export type solicitud_valoresIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    solicitudes_inversion?: boolean | Prisma.solicitud_valores$solicitudes_inversionArgs<ExtArgs>;
};
export type $solicitud_valoresPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "solicitud_valores";
    objects: {
        solicitudes_inversion: Prisma.$solicitudes_inversionPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        solicitud_id: number | null;
        categoria: string;
        usd: runtime.Decimal | null;
        cop: runtime.Decimal | null;
    }, ExtArgs["result"]["solicitud_valores"]>;
    composites: {};
};
export type solicitud_valoresGetPayload<S extends boolean | null | undefined | solicitud_valoresDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$solicitud_valoresPayload, S>;
export type solicitud_valoresCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<solicitud_valoresFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Solicitud_valoresCountAggregateInputType | true;
};
export interface solicitud_valoresDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['solicitud_valores'];
        meta: {
            name: 'solicitud_valores';
        };
    };
    findUnique<T extends solicitud_valoresFindUniqueArgs>(args: Prisma.SelectSubset<T, solicitud_valoresFindUniqueArgs<ExtArgs>>): Prisma.Prisma__solicitud_valoresClient<runtime.Types.Result.GetResult<Prisma.$solicitud_valoresPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends solicitud_valoresFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, solicitud_valoresFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__solicitud_valoresClient<runtime.Types.Result.GetResult<Prisma.$solicitud_valoresPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends solicitud_valoresFindFirstArgs>(args?: Prisma.SelectSubset<T, solicitud_valoresFindFirstArgs<ExtArgs>>): Prisma.Prisma__solicitud_valoresClient<runtime.Types.Result.GetResult<Prisma.$solicitud_valoresPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends solicitud_valoresFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, solicitud_valoresFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__solicitud_valoresClient<runtime.Types.Result.GetResult<Prisma.$solicitud_valoresPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends solicitud_valoresFindManyArgs>(args?: Prisma.SelectSubset<T, solicitud_valoresFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$solicitud_valoresPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends solicitud_valoresCreateArgs>(args: Prisma.SelectSubset<T, solicitud_valoresCreateArgs<ExtArgs>>): Prisma.Prisma__solicitud_valoresClient<runtime.Types.Result.GetResult<Prisma.$solicitud_valoresPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends solicitud_valoresCreateManyArgs>(args?: Prisma.SelectSubset<T, solicitud_valoresCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends solicitud_valoresCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, solicitud_valoresCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$solicitud_valoresPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends solicitud_valoresDeleteArgs>(args: Prisma.SelectSubset<T, solicitud_valoresDeleteArgs<ExtArgs>>): Prisma.Prisma__solicitud_valoresClient<runtime.Types.Result.GetResult<Prisma.$solicitud_valoresPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends solicitud_valoresUpdateArgs>(args: Prisma.SelectSubset<T, solicitud_valoresUpdateArgs<ExtArgs>>): Prisma.Prisma__solicitud_valoresClient<runtime.Types.Result.GetResult<Prisma.$solicitud_valoresPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends solicitud_valoresDeleteManyArgs>(args?: Prisma.SelectSubset<T, solicitud_valoresDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends solicitud_valoresUpdateManyArgs>(args: Prisma.SelectSubset<T, solicitud_valoresUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends solicitud_valoresUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, solicitud_valoresUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$solicitud_valoresPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends solicitud_valoresUpsertArgs>(args: Prisma.SelectSubset<T, solicitud_valoresUpsertArgs<ExtArgs>>): Prisma.Prisma__solicitud_valoresClient<runtime.Types.Result.GetResult<Prisma.$solicitud_valoresPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends solicitud_valoresCountArgs>(args?: Prisma.Subset<T, solicitud_valoresCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Solicitud_valoresCountAggregateOutputType> : number>;
    aggregate<T extends Solicitud_valoresAggregateArgs>(args: Prisma.Subset<T, Solicitud_valoresAggregateArgs>): Prisma.PrismaPromise<GetSolicitud_valoresAggregateType<T>>;
    groupBy<T extends solicitud_valoresGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: solicitud_valoresGroupByArgs['orderBy'];
    } : {
        orderBy?: solicitud_valoresGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, solicitud_valoresGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSolicitud_valoresGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: solicitud_valoresFieldRefs;
}
export interface Prisma__solicitud_valoresClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    solicitudes_inversion<T extends Prisma.solicitud_valores$solicitudes_inversionArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.solicitud_valores$solicitudes_inversionArgs<ExtArgs>>): Prisma.Prisma__solicitudes_inversionClient<runtime.Types.Result.GetResult<Prisma.$solicitudes_inversionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface solicitud_valoresFieldRefs {
    readonly id: Prisma.FieldRef<"solicitud_valores", 'Int'>;
    readonly solicitud_id: Prisma.FieldRef<"solicitud_valores", 'Int'>;
    readonly categoria: Prisma.FieldRef<"solicitud_valores", 'String'>;
    readonly usd: Prisma.FieldRef<"solicitud_valores", 'Decimal'>;
    readonly cop: Prisma.FieldRef<"solicitud_valores", 'Decimal'>;
}
export type solicitud_valoresFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_valoresSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_valoresOmit<ExtArgs> | null;
    include?: Prisma.solicitud_valoresInclude<ExtArgs> | null;
    where: Prisma.solicitud_valoresWhereUniqueInput;
};
export type solicitud_valoresFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_valoresSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_valoresOmit<ExtArgs> | null;
    include?: Prisma.solicitud_valoresInclude<ExtArgs> | null;
    where: Prisma.solicitud_valoresWhereUniqueInput;
};
export type solicitud_valoresFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type solicitud_valoresFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type solicitud_valoresFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type solicitud_valoresCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_valoresSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_valoresOmit<ExtArgs> | null;
    include?: Prisma.solicitud_valoresInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.solicitud_valoresCreateInput, Prisma.solicitud_valoresUncheckedCreateInput>;
};
export type solicitud_valoresCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.solicitud_valoresCreateManyInput | Prisma.solicitud_valoresCreateManyInput[];
    skipDuplicates?: boolean;
};
export type solicitud_valoresCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_valoresSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.solicitud_valoresOmit<ExtArgs> | null;
    data: Prisma.solicitud_valoresCreateManyInput | Prisma.solicitud_valoresCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.solicitud_valoresIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type solicitud_valoresUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_valoresSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_valoresOmit<ExtArgs> | null;
    include?: Prisma.solicitud_valoresInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.solicitud_valoresUpdateInput, Prisma.solicitud_valoresUncheckedUpdateInput>;
    where: Prisma.solicitud_valoresWhereUniqueInput;
};
export type solicitud_valoresUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.solicitud_valoresUpdateManyMutationInput, Prisma.solicitud_valoresUncheckedUpdateManyInput>;
    where?: Prisma.solicitud_valoresWhereInput;
    limit?: number;
};
export type solicitud_valoresUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_valoresSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.solicitud_valoresOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.solicitud_valoresUpdateManyMutationInput, Prisma.solicitud_valoresUncheckedUpdateManyInput>;
    where?: Prisma.solicitud_valoresWhereInput;
    limit?: number;
    include?: Prisma.solicitud_valoresIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type solicitud_valoresUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_valoresSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_valoresOmit<ExtArgs> | null;
    include?: Prisma.solicitud_valoresInclude<ExtArgs> | null;
    where: Prisma.solicitud_valoresWhereUniqueInput;
    create: Prisma.XOR<Prisma.solicitud_valoresCreateInput, Prisma.solicitud_valoresUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.solicitud_valoresUpdateInput, Prisma.solicitud_valoresUncheckedUpdateInput>;
};
export type solicitud_valoresDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_valoresSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_valoresOmit<ExtArgs> | null;
    include?: Prisma.solicitud_valoresInclude<ExtArgs> | null;
    where: Prisma.solicitud_valoresWhereUniqueInput;
};
export type solicitud_valoresDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.solicitud_valoresWhereInput;
    limit?: number;
};
export type solicitud_valores$solicitudes_inversionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitudes_inversionSelect<ExtArgs> | null;
    omit?: Prisma.solicitudes_inversionOmit<ExtArgs> | null;
    include?: Prisma.solicitudes_inversionInclude<ExtArgs> | null;
    where?: Prisma.solicitudes_inversionWhereInput;
};
export type solicitud_valoresDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_valoresSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_valoresOmit<ExtArgs> | null;
    include?: Prisma.solicitud_valoresInclude<ExtArgs> | null;
};
