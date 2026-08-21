import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type solicitud_metasModel = runtime.Types.Result.DefaultSelection<Prisma.$solicitud_metasPayload>;
export type AggregateSolicitud_metas = {
    _count: Solicitud_metasCountAggregateOutputType | null;
    _avg: Solicitud_metasAvgAggregateOutputType | null;
    _sum: Solicitud_metasSumAggregateOutputType | null;
    _min: Solicitud_metasMinAggregateOutputType | null;
    _max: Solicitud_metasMaxAggregateOutputType | null;
};
export type Solicitud_metasAvgAggregateOutputType = {
    id: number | null;
    solicitud_id: number | null;
};
export type Solicitud_metasSumAggregateOutputType = {
    id: number | null;
    solicitud_id: number | null;
};
export type Solicitud_metasMinAggregateOutputType = {
    id: number | null;
    solicitud_id: number | null;
    compromiso: string | null;
    fecha_inicio: Date | null;
    indicador: string | null;
};
export type Solicitud_metasMaxAggregateOutputType = {
    id: number | null;
    solicitud_id: number | null;
    compromiso: string | null;
    fecha_inicio: Date | null;
    indicador: string | null;
};
export type Solicitud_metasCountAggregateOutputType = {
    id: number;
    solicitud_id: number;
    compromiso: number;
    fecha_inicio: number;
    indicador: number;
    _all: number;
};
export type Solicitud_metasAvgAggregateInputType = {
    id?: true;
    solicitud_id?: true;
};
export type Solicitud_metasSumAggregateInputType = {
    id?: true;
    solicitud_id?: true;
};
export type Solicitud_metasMinAggregateInputType = {
    id?: true;
    solicitud_id?: true;
    compromiso?: true;
    fecha_inicio?: true;
    indicador?: true;
};
export type Solicitud_metasMaxAggregateInputType = {
    id?: true;
    solicitud_id?: true;
    compromiso?: true;
    fecha_inicio?: true;
    indicador?: true;
};
export type Solicitud_metasCountAggregateInputType = {
    id?: true;
    solicitud_id?: true;
    compromiso?: true;
    fecha_inicio?: true;
    indicador?: true;
    _all?: true;
};
export type Solicitud_metasAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.solicitud_metasWhereInput;
    orderBy?: Prisma.solicitud_metasOrderByWithRelationInput | Prisma.solicitud_metasOrderByWithRelationInput[];
    cursor?: Prisma.solicitud_metasWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Solicitud_metasCountAggregateInputType;
    _avg?: Solicitud_metasAvgAggregateInputType;
    _sum?: Solicitud_metasSumAggregateInputType;
    _min?: Solicitud_metasMinAggregateInputType;
    _max?: Solicitud_metasMaxAggregateInputType;
};
export type GetSolicitud_metasAggregateType<T extends Solicitud_metasAggregateArgs> = {
    [P in keyof T & keyof AggregateSolicitud_metas]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSolicitud_metas[P]> : Prisma.GetScalarType<T[P], AggregateSolicitud_metas[P]>;
};
export type solicitud_metasGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.solicitud_metasWhereInput;
    orderBy?: Prisma.solicitud_metasOrderByWithAggregationInput | Prisma.solicitud_metasOrderByWithAggregationInput[];
    by: Prisma.Solicitud_metasScalarFieldEnum[] | Prisma.Solicitud_metasScalarFieldEnum;
    having?: Prisma.solicitud_metasScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Solicitud_metasCountAggregateInputType | true;
    _avg?: Solicitud_metasAvgAggregateInputType;
    _sum?: Solicitud_metasSumAggregateInputType;
    _min?: Solicitud_metasMinAggregateInputType;
    _max?: Solicitud_metasMaxAggregateInputType;
};
export type Solicitud_metasGroupByOutputType = {
    id: number;
    solicitud_id: number | null;
    compromiso: string;
    fecha_inicio: Date;
    indicador: string;
    _count: Solicitud_metasCountAggregateOutputType | null;
    _avg: Solicitud_metasAvgAggregateOutputType | null;
    _sum: Solicitud_metasSumAggregateOutputType | null;
    _min: Solicitud_metasMinAggregateOutputType | null;
    _max: Solicitud_metasMaxAggregateOutputType | null;
};
export type GetSolicitud_metasGroupByPayload<T extends solicitud_metasGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Solicitud_metasGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Solicitud_metasGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Solicitud_metasGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Solicitud_metasGroupByOutputType[P]>;
}>>;
export type solicitud_metasWhereInput = {
    AND?: Prisma.solicitud_metasWhereInput | Prisma.solicitud_metasWhereInput[];
    OR?: Prisma.solicitud_metasWhereInput[];
    NOT?: Prisma.solicitud_metasWhereInput | Prisma.solicitud_metasWhereInput[];
    id?: Prisma.IntFilter<"solicitud_metas"> | number;
    solicitud_id?: Prisma.IntNullableFilter<"solicitud_metas"> | number | null;
    compromiso?: Prisma.StringFilter<"solicitud_metas"> | string;
    fecha_inicio?: Prisma.DateTimeFilter<"solicitud_metas"> | Date | string;
    indicador?: Prisma.StringFilter<"solicitud_metas"> | string;
    solicitudes_inversion?: Prisma.XOR<Prisma.Solicitudes_inversionNullableScalarRelationFilter, Prisma.solicitudes_inversionWhereInput> | null;
};
export type solicitud_metasOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    solicitud_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    compromiso?: Prisma.SortOrder;
    fecha_inicio?: Prisma.SortOrder;
    indicador?: Prisma.SortOrder;
    solicitudes_inversion?: Prisma.solicitudes_inversionOrderByWithRelationInput;
};
export type solicitud_metasWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.solicitud_metasWhereInput | Prisma.solicitud_metasWhereInput[];
    OR?: Prisma.solicitud_metasWhereInput[];
    NOT?: Prisma.solicitud_metasWhereInput | Prisma.solicitud_metasWhereInput[];
    solicitud_id?: Prisma.IntNullableFilter<"solicitud_metas"> | number | null;
    compromiso?: Prisma.StringFilter<"solicitud_metas"> | string;
    fecha_inicio?: Prisma.DateTimeFilter<"solicitud_metas"> | Date | string;
    indicador?: Prisma.StringFilter<"solicitud_metas"> | string;
    solicitudes_inversion?: Prisma.XOR<Prisma.Solicitudes_inversionNullableScalarRelationFilter, Prisma.solicitudes_inversionWhereInput> | null;
}, "id">;
export type solicitud_metasOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    solicitud_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    compromiso?: Prisma.SortOrder;
    fecha_inicio?: Prisma.SortOrder;
    indicador?: Prisma.SortOrder;
    _count?: Prisma.solicitud_metasCountOrderByAggregateInput;
    _avg?: Prisma.solicitud_metasAvgOrderByAggregateInput;
    _max?: Prisma.solicitud_metasMaxOrderByAggregateInput;
    _min?: Prisma.solicitud_metasMinOrderByAggregateInput;
    _sum?: Prisma.solicitud_metasSumOrderByAggregateInput;
};
export type solicitud_metasScalarWhereWithAggregatesInput = {
    AND?: Prisma.solicitud_metasScalarWhereWithAggregatesInput | Prisma.solicitud_metasScalarWhereWithAggregatesInput[];
    OR?: Prisma.solicitud_metasScalarWhereWithAggregatesInput[];
    NOT?: Prisma.solicitud_metasScalarWhereWithAggregatesInput | Prisma.solicitud_metasScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"solicitud_metas"> | number;
    solicitud_id?: Prisma.IntNullableWithAggregatesFilter<"solicitud_metas"> | number | null;
    compromiso?: Prisma.StringWithAggregatesFilter<"solicitud_metas"> | string;
    fecha_inicio?: Prisma.DateTimeWithAggregatesFilter<"solicitud_metas"> | Date | string;
    indicador?: Prisma.StringWithAggregatesFilter<"solicitud_metas"> | string;
};
export type solicitud_metasCreateInput = {
    compromiso: string;
    fecha_inicio: Date | string;
    indicador: string;
    solicitudes_inversion?: Prisma.solicitudes_inversionCreateNestedOneWithoutSolicitud_metasInput;
};
export type solicitud_metasUncheckedCreateInput = {
    id?: number;
    solicitud_id?: number | null;
    compromiso: string;
    fecha_inicio: Date | string;
    indicador: string;
};
export type solicitud_metasUpdateInput = {
    compromiso?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_inicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    indicador?: Prisma.StringFieldUpdateOperationsInput | string;
    solicitudes_inversion?: Prisma.solicitudes_inversionUpdateOneWithoutSolicitud_metasNestedInput;
};
export type solicitud_metasUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    solicitud_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    compromiso?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_inicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    indicador?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type solicitud_metasCreateManyInput = {
    id?: number;
    solicitud_id?: number | null;
    compromiso: string;
    fecha_inicio: Date | string;
    indicador: string;
};
export type solicitud_metasUpdateManyMutationInput = {
    compromiso?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_inicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    indicador?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type solicitud_metasUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    solicitud_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    compromiso?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_inicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    indicador?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type solicitud_metasCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    solicitud_id?: Prisma.SortOrder;
    compromiso?: Prisma.SortOrder;
    fecha_inicio?: Prisma.SortOrder;
    indicador?: Prisma.SortOrder;
};
export type solicitud_metasAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    solicitud_id?: Prisma.SortOrder;
};
export type solicitud_metasMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    solicitud_id?: Prisma.SortOrder;
    compromiso?: Prisma.SortOrder;
    fecha_inicio?: Prisma.SortOrder;
    indicador?: Prisma.SortOrder;
};
export type solicitud_metasMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    solicitud_id?: Prisma.SortOrder;
    compromiso?: Prisma.SortOrder;
    fecha_inicio?: Prisma.SortOrder;
    indicador?: Prisma.SortOrder;
};
export type solicitud_metasSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    solicitud_id?: Prisma.SortOrder;
};
export type Solicitud_metasListRelationFilter = {
    every?: Prisma.solicitud_metasWhereInput;
    some?: Prisma.solicitud_metasWhereInput;
    none?: Prisma.solicitud_metasWhereInput;
};
export type solicitud_metasOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type solicitud_metasCreateNestedManyWithoutSolicitudes_inversionInput = {
    create?: Prisma.XOR<Prisma.solicitud_metasCreateWithoutSolicitudes_inversionInput, Prisma.solicitud_metasUncheckedCreateWithoutSolicitudes_inversionInput> | Prisma.solicitud_metasCreateWithoutSolicitudes_inversionInput[] | Prisma.solicitud_metasUncheckedCreateWithoutSolicitudes_inversionInput[];
    connectOrCreate?: Prisma.solicitud_metasCreateOrConnectWithoutSolicitudes_inversionInput | Prisma.solicitud_metasCreateOrConnectWithoutSolicitudes_inversionInput[];
    createMany?: Prisma.solicitud_metasCreateManySolicitudes_inversionInputEnvelope;
    connect?: Prisma.solicitud_metasWhereUniqueInput | Prisma.solicitud_metasWhereUniqueInput[];
};
export type solicitud_metasUncheckedCreateNestedManyWithoutSolicitudes_inversionInput = {
    create?: Prisma.XOR<Prisma.solicitud_metasCreateWithoutSolicitudes_inversionInput, Prisma.solicitud_metasUncheckedCreateWithoutSolicitudes_inversionInput> | Prisma.solicitud_metasCreateWithoutSolicitudes_inversionInput[] | Prisma.solicitud_metasUncheckedCreateWithoutSolicitudes_inversionInput[];
    connectOrCreate?: Prisma.solicitud_metasCreateOrConnectWithoutSolicitudes_inversionInput | Prisma.solicitud_metasCreateOrConnectWithoutSolicitudes_inversionInput[];
    createMany?: Prisma.solicitud_metasCreateManySolicitudes_inversionInputEnvelope;
    connect?: Prisma.solicitud_metasWhereUniqueInput | Prisma.solicitud_metasWhereUniqueInput[];
};
export type solicitud_metasUpdateManyWithoutSolicitudes_inversionNestedInput = {
    create?: Prisma.XOR<Prisma.solicitud_metasCreateWithoutSolicitudes_inversionInput, Prisma.solicitud_metasUncheckedCreateWithoutSolicitudes_inversionInput> | Prisma.solicitud_metasCreateWithoutSolicitudes_inversionInput[] | Prisma.solicitud_metasUncheckedCreateWithoutSolicitudes_inversionInput[];
    connectOrCreate?: Prisma.solicitud_metasCreateOrConnectWithoutSolicitudes_inversionInput | Prisma.solicitud_metasCreateOrConnectWithoutSolicitudes_inversionInput[];
    upsert?: Prisma.solicitud_metasUpsertWithWhereUniqueWithoutSolicitudes_inversionInput | Prisma.solicitud_metasUpsertWithWhereUniqueWithoutSolicitudes_inversionInput[];
    createMany?: Prisma.solicitud_metasCreateManySolicitudes_inversionInputEnvelope;
    set?: Prisma.solicitud_metasWhereUniqueInput | Prisma.solicitud_metasWhereUniqueInput[];
    disconnect?: Prisma.solicitud_metasWhereUniqueInput | Prisma.solicitud_metasWhereUniqueInput[];
    delete?: Prisma.solicitud_metasWhereUniqueInput | Prisma.solicitud_metasWhereUniqueInput[];
    connect?: Prisma.solicitud_metasWhereUniqueInput | Prisma.solicitud_metasWhereUniqueInput[];
    update?: Prisma.solicitud_metasUpdateWithWhereUniqueWithoutSolicitudes_inversionInput | Prisma.solicitud_metasUpdateWithWhereUniqueWithoutSolicitudes_inversionInput[];
    updateMany?: Prisma.solicitud_metasUpdateManyWithWhereWithoutSolicitudes_inversionInput | Prisma.solicitud_metasUpdateManyWithWhereWithoutSolicitudes_inversionInput[];
    deleteMany?: Prisma.solicitud_metasScalarWhereInput | Prisma.solicitud_metasScalarWhereInput[];
};
export type solicitud_metasUncheckedUpdateManyWithoutSolicitudes_inversionNestedInput = {
    create?: Prisma.XOR<Prisma.solicitud_metasCreateWithoutSolicitudes_inversionInput, Prisma.solicitud_metasUncheckedCreateWithoutSolicitudes_inversionInput> | Prisma.solicitud_metasCreateWithoutSolicitudes_inversionInput[] | Prisma.solicitud_metasUncheckedCreateWithoutSolicitudes_inversionInput[];
    connectOrCreate?: Prisma.solicitud_metasCreateOrConnectWithoutSolicitudes_inversionInput | Prisma.solicitud_metasCreateOrConnectWithoutSolicitudes_inversionInput[];
    upsert?: Prisma.solicitud_metasUpsertWithWhereUniqueWithoutSolicitudes_inversionInput | Prisma.solicitud_metasUpsertWithWhereUniqueWithoutSolicitudes_inversionInput[];
    createMany?: Prisma.solicitud_metasCreateManySolicitudes_inversionInputEnvelope;
    set?: Prisma.solicitud_metasWhereUniqueInput | Prisma.solicitud_metasWhereUniqueInput[];
    disconnect?: Prisma.solicitud_metasWhereUniqueInput | Prisma.solicitud_metasWhereUniqueInput[];
    delete?: Prisma.solicitud_metasWhereUniqueInput | Prisma.solicitud_metasWhereUniqueInput[];
    connect?: Prisma.solicitud_metasWhereUniqueInput | Prisma.solicitud_metasWhereUniqueInput[];
    update?: Prisma.solicitud_metasUpdateWithWhereUniqueWithoutSolicitudes_inversionInput | Prisma.solicitud_metasUpdateWithWhereUniqueWithoutSolicitudes_inversionInput[];
    updateMany?: Prisma.solicitud_metasUpdateManyWithWhereWithoutSolicitudes_inversionInput | Prisma.solicitud_metasUpdateManyWithWhereWithoutSolicitudes_inversionInput[];
    deleteMany?: Prisma.solicitud_metasScalarWhereInput | Prisma.solicitud_metasScalarWhereInput[];
};
export type solicitud_metasCreateWithoutSolicitudes_inversionInput = {
    compromiso: string;
    fecha_inicio: Date | string;
    indicador: string;
};
export type solicitud_metasUncheckedCreateWithoutSolicitudes_inversionInput = {
    id?: number;
    compromiso: string;
    fecha_inicio: Date | string;
    indicador: string;
};
export type solicitud_metasCreateOrConnectWithoutSolicitudes_inversionInput = {
    where: Prisma.solicitud_metasWhereUniqueInput;
    create: Prisma.XOR<Prisma.solicitud_metasCreateWithoutSolicitudes_inversionInput, Prisma.solicitud_metasUncheckedCreateWithoutSolicitudes_inversionInput>;
};
export type solicitud_metasCreateManySolicitudes_inversionInputEnvelope = {
    data: Prisma.solicitud_metasCreateManySolicitudes_inversionInput | Prisma.solicitud_metasCreateManySolicitudes_inversionInput[];
    skipDuplicates?: boolean;
};
export type solicitud_metasUpsertWithWhereUniqueWithoutSolicitudes_inversionInput = {
    where: Prisma.solicitud_metasWhereUniqueInput;
    update: Prisma.XOR<Prisma.solicitud_metasUpdateWithoutSolicitudes_inversionInput, Prisma.solicitud_metasUncheckedUpdateWithoutSolicitudes_inversionInput>;
    create: Prisma.XOR<Prisma.solicitud_metasCreateWithoutSolicitudes_inversionInput, Prisma.solicitud_metasUncheckedCreateWithoutSolicitudes_inversionInput>;
};
export type solicitud_metasUpdateWithWhereUniqueWithoutSolicitudes_inversionInput = {
    where: Prisma.solicitud_metasWhereUniqueInput;
    data: Prisma.XOR<Prisma.solicitud_metasUpdateWithoutSolicitudes_inversionInput, Prisma.solicitud_metasUncheckedUpdateWithoutSolicitudes_inversionInput>;
};
export type solicitud_metasUpdateManyWithWhereWithoutSolicitudes_inversionInput = {
    where: Prisma.solicitud_metasScalarWhereInput;
    data: Prisma.XOR<Prisma.solicitud_metasUpdateManyMutationInput, Prisma.solicitud_metasUncheckedUpdateManyWithoutSolicitudes_inversionInput>;
};
export type solicitud_metasScalarWhereInput = {
    AND?: Prisma.solicitud_metasScalarWhereInput | Prisma.solicitud_metasScalarWhereInput[];
    OR?: Prisma.solicitud_metasScalarWhereInput[];
    NOT?: Prisma.solicitud_metasScalarWhereInput | Prisma.solicitud_metasScalarWhereInput[];
    id?: Prisma.IntFilter<"solicitud_metas"> | number;
    solicitud_id?: Prisma.IntNullableFilter<"solicitud_metas"> | number | null;
    compromiso?: Prisma.StringFilter<"solicitud_metas"> | string;
    fecha_inicio?: Prisma.DateTimeFilter<"solicitud_metas"> | Date | string;
    indicador?: Prisma.StringFilter<"solicitud_metas"> | string;
};
export type solicitud_metasCreateManySolicitudes_inversionInput = {
    id?: number;
    compromiso: string;
    fecha_inicio: Date | string;
    indicador: string;
};
export type solicitud_metasUpdateWithoutSolicitudes_inversionInput = {
    compromiso?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_inicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    indicador?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type solicitud_metasUncheckedUpdateWithoutSolicitudes_inversionInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    compromiso?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_inicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    indicador?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type solicitud_metasUncheckedUpdateManyWithoutSolicitudes_inversionInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    compromiso?: Prisma.StringFieldUpdateOperationsInput | string;
    fecha_inicio?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    indicador?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type solicitud_metasSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    solicitud_id?: boolean;
    compromiso?: boolean;
    fecha_inicio?: boolean;
    indicador?: boolean;
    solicitudes_inversion?: boolean | Prisma.solicitud_metas$solicitudes_inversionArgs<ExtArgs>;
}, ExtArgs["result"]["solicitud_metas"]>;
export type solicitud_metasSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    solicitud_id?: boolean;
    compromiso?: boolean;
    fecha_inicio?: boolean;
    indicador?: boolean;
    solicitudes_inversion?: boolean | Prisma.solicitud_metas$solicitudes_inversionArgs<ExtArgs>;
}, ExtArgs["result"]["solicitud_metas"]>;
export type solicitud_metasSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    solicitud_id?: boolean;
    compromiso?: boolean;
    fecha_inicio?: boolean;
    indicador?: boolean;
    solicitudes_inversion?: boolean | Prisma.solicitud_metas$solicitudes_inversionArgs<ExtArgs>;
}, ExtArgs["result"]["solicitud_metas"]>;
export type solicitud_metasSelectScalar = {
    id?: boolean;
    solicitud_id?: boolean;
    compromiso?: boolean;
    fecha_inicio?: boolean;
    indicador?: boolean;
};
export type solicitud_metasOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "solicitud_id" | "compromiso" | "fecha_inicio" | "indicador", ExtArgs["result"]["solicitud_metas"]>;
export type solicitud_metasInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    solicitudes_inversion?: boolean | Prisma.solicitud_metas$solicitudes_inversionArgs<ExtArgs>;
};
export type solicitud_metasIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    solicitudes_inversion?: boolean | Prisma.solicitud_metas$solicitudes_inversionArgs<ExtArgs>;
};
export type solicitud_metasIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    solicitudes_inversion?: boolean | Prisma.solicitud_metas$solicitudes_inversionArgs<ExtArgs>;
};
export type $solicitud_metasPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "solicitud_metas";
    objects: {
        solicitudes_inversion: Prisma.$solicitudes_inversionPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        solicitud_id: number | null;
        compromiso: string;
        fecha_inicio: Date;
        indicador: string;
    }, ExtArgs["result"]["solicitud_metas"]>;
    composites: {};
};
export type solicitud_metasGetPayload<S extends boolean | null | undefined | solicitud_metasDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$solicitud_metasPayload, S>;
export type solicitud_metasCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<solicitud_metasFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Solicitud_metasCountAggregateInputType | true;
};
export interface solicitud_metasDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['solicitud_metas'];
        meta: {
            name: 'solicitud_metas';
        };
    };
    findUnique<T extends solicitud_metasFindUniqueArgs>(args: Prisma.SelectSubset<T, solicitud_metasFindUniqueArgs<ExtArgs>>): Prisma.Prisma__solicitud_metasClient<runtime.Types.Result.GetResult<Prisma.$solicitud_metasPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends solicitud_metasFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, solicitud_metasFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__solicitud_metasClient<runtime.Types.Result.GetResult<Prisma.$solicitud_metasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends solicitud_metasFindFirstArgs>(args?: Prisma.SelectSubset<T, solicitud_metasFindFirstArgs<ExtArgs>>): Prisma.Prisma__solicitud_metasClient<runtime.Types.Result.GetResult<Prisma.$solicitud_metasPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends solicitud_metasFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, solicitud_metasFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__solicitud_metasClient<runtime.Types.Result.GetResult<Prisma.$solicitud_metasPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends solicitud_metasFindManyArgs>(args?: Prisma.SelectSubset<T, solicitud_metasFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$solicitud_metasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends solicitud_metasCreateArgs>(args: Prisma.SelectSubset<T, solicitud_metasCreateArgs<ExtArgs>>): Prisma.Prisma__solicitud_metasClient<runtime.Types.Result.GetResult<Prisma.$solicitud_metasPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends solicitud_metasCreateManyArgs>(args?: Prisma.SelectSubset<T, solicitud_metasCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends solicitud_metasCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, solicitud_metasCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$solicitud_metasPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends solicitud_metasDeleteArgs>(args: Prisma.SelectSubset<T, solicitud_metasDeleteArgs<ExtArgs>>): Prisma.Prisma__solicitud_metasClient<runtime.Types.Result.GetResult<Prisma.$solicitud_metasPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends solicitud_metasUpdateArgs>(args: Prisma.SelectSubset<T, solicitud_metasUpdateArgs<ExtArgs>>): Prisma.Prisma__solicitud_metasClient<runtime.Types.Result.GetResult<Prisma.$solicitud_metasPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends solicitud_metasDeleteManyArgs>(args?: Prisma.SelectSubset<T, solicitud_metasDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends solicitud_metasUpdateManyArgs>(args: Prisma.SelectSubset<T, solicitud_metasUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends solicitud_metasUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, solicitud_metasUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$solicitud_metasPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends solicitud_metasUpsertArgs>(args: Prisma.SelectSubset<T, solicitud_metasUpsertArgs<ExtArgs>>): Prisma.Prisma__solicitud_metasClient<runtime.Types.Result.GetResult<Prisma.$solicitud_metasPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends solicitud_metasCountArgs>(args?: Prisma.Subset<T, solicitud_metasCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Solicitud_metasCountAggregateOutputType> : number>;
    aggregate<T extends Solicitud_metasAggregateArgs>(args: Prisma.Subset<T, Solicitud_metasAggregateArgs>): Prisma.PrismaPromise<GetSolicitud_metasAggregateType<T>>;
    groupBy<T extends solicitud_metasGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: solicitud_metasGroupByArgs['orderBy'];
    } : {
        orderBy?: solicitud_metasGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, solicitud_metasGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSolicitud_metasGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: solicitud_metasFieldRefs;
}
export interface Prisma__solicitud_metasClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    solicitudes_inversion<T extends Prisma.solicitud_metas$solicitudes_inversionArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.solicitud_metas$solicitudes_inversionArgs<ExtArgs>>): Prisma.Prisma__solicitudes_inversionClient<runtime.Types.Result.GetResult<Prisma.$solicitudes_inversionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface solicitud_metasFieldRefs {
    readonly id: Prisma.FieldRef<"solicitud_metas", 'Int'>;
    readonly solicitud_id: Prisma.FieldRef<"solicitud_metas", 'Int'>;
    readonly compromiso: Prisma.FieldRef<"solicitud_metas", 'String'>;
    readonly fecha_inicio: Prisma.FieldRef<"solicitud_metas", 'DateTime'>;
    readonly indicador: Prisma.FieldRef<"solicitud_metas", 'String'>;
}
export type solicitud_metasFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_metasSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_metasOmit<ExtArgs> | null;
    include?: Prisma.solicitud_metasInclude<ExtArgs> | null;
    where: Prisma.solicitud_metasWhereUniqueInput;
};
export type solicitud_metasFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_metasSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_metasOmit<ExtArgs> | null;
    include?: Prisma.solicitud_metasInclude<ExtArgs> | null;
    where: Prisma.solicitud_metasWhereUniqueInput;
};
export type solicitud_metasFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type solicitud_metasFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type solicitud_metasFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type solicitud_metasCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_metasSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_metasOmit<ExtArgs> | null;
    include?: Prisma.solicitud_metasInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.solicitud_metasCreateInput, Prisma.solicitud_metasUncheckedCreateInput>;
};
export type solicitud_metasCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.solicitud_metasCreateManyInput | Prisma.solicitud_metasCreateManyInput[];
    skipDuplicates?: boolean;
};
export type solicitud_metasCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_metasSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.solicitud_metasOmit<ExtArgs> | null;
    data: Prisma.solicitud_metasCreateManyInput | Prisma.solicitud_metasCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.solicitud_metasIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type solicitud_metasUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_metasSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_metasOmit<ExtArgs> | null;
    include?: Prisma.solicitud_metasInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.solicitud_metasUpdateInput, Prisma.solicitud_metasUncheckedUpdateInput>;
    where: Prisma.solicitud_metasWhereUniqueInput;
};
export type solicitud_metasUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.solicitud_metasUpdateManyMutationInput, Prisma.solicitud_metasUncheckedUpdateManyInput>;
    where?: Prisma.solicitud_metasWhereInput;
    limit?: number;
};
export type solicitud_metasUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_metasSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.solicitud_metasOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.solicitud_metasUpdateManyMutationInput, Prisma.solicitud_metasUncheckedUpdateManyInput>;
    where?: Prisma.solicitud_metasWhereInput;
    limit?: number;
    include?: Prisma.solicitud_metasIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type solicitud_metasUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_metasSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_metasOmit<ExtArgs> | null;
    include?: Prisma.solicitud_metasInclude<ExtArgs> | null;
    where: Prisma.solicitud_metasWhereUniqueInput;
    create: Prisma.XOR<Prisma.solicitud_metasCreateInput, Prisma.solicitud_metasUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.solicitud_metasUpdateInput, Prisma.solicitud_metasUncheckedUpdateInput>;
};
export type solicitud_metasDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_metasSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_metasOmit<ExtArgs> | null;
    include?: Prisma.solicitud_metasInclude<ExtArgs> | null;
    where: Prisma.solicitud_metasWhereUniqueInput;
};
export type solicitud_metasDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.solicitud_metasWhereInput;
    limit?: number;
};
export type solicitud_metas$solicitudes_inversionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitudes_inversionSelect<ExtArgs> | null;
    omit?: Prisma.solicitudes_inversionOmit<ExtArgs> | null;
    include?: Prisma.solicitudes_inversionInclude<ExtArgs> | null;
    where?: Prisma.solicitudes_inversionWhereInput;
};
export type solicitud_metasDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_metasSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_metasOmit<ExtArgs> | null;
    include?: Prisma.solicitud_metasInclude<ExtArgs> | null;
};
