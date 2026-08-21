import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type solicitud_evaluacion_financieraModel = runtime.Types.Result.DefaultSelection<Prisma.$solicitud_evaluacion_financieraPayload>;
export type AggregateSolicitud_evaluacion_financiera = {
    _count: Solicitud_evaluacion_financieraCountAggregateOutputType | null;
    _avg: Solicitud_evaluacion_financieraAvgAggregateOutputType | null;
    _sum: Solicitud_evaluacion_financieraSumAggregateOutputType | null;
    _min: Solicitud_evaluacion_financieraMinAggregateOutputType | null;
    _max: Solicitud_evaluacion_financieraMaxAggregateOutputType | null;
};
export type Solicitud_evaluacion_financieraAvgAggregateOutputType = {
    id: number | null;
    solicitud_id: number | null;
    tir: runtime.Decimal | null;
    vpn: runtime.Decimal | null;
    payback: runtime.Decimal | null;
};
export type Solicitud_evaluacion_financieraSumAggregateOutputType = {
    id: number | null;
    solicitud_id: number | null;
    tir: runtime.Decimal | null;
    vpn: runtime.Decimal | null;
    payback: runtime.Decimal | null;
};
export type Solicitud_evaluacion_financieraMinAggregateOutputType = {
    id: number | null;
    solicitud_id: number | null;
    tir: runtime.Decimal | null;
    vpn: runtime.Decimal | null;
    payback: runtime.Decimal | null;
};
export type Solicitud_evaluacion_financieraMaxAggregateOutputType = {
    id: number | null;
    solicitud_id: number | null;
    tir: runtime.Decimal | null;
    vpn: runtime.Decimal | null;
    payback: runtime.Decimal | null;
};
export type Solicitud_evaluacion_financieraCountAggregateOutputType = {
    id: number;
    solicitud_id: number;
    tir: number;
    vpn: number;
    payback: number;
    _all: number;
};
export type Solicitud_evaluacion_financieraAvgAggregateInputType = {
    id?: true;
    solicitud_id?: true;
    tir?: true;
    vpn?: true;
    payback?: true;
};
export type Solicitud_evaluacion_financieraSumAggregateInputType = {
    id?: true;
    solicitud_id?: true;
    tir?: true;
    vpn?: true;
    payback?: true;
};
export type Solicitud_evaluacion_financieraMinAggregateInputType = {
    id?: true;
    solicitud_id?: true;
    tir?: true;
    vpn?: true;
    payback?: true;
};
export type Solicitud_evaluacion_financieraMaxAggregateInputType = {
    id?: true;
    solicitud_id?: true;
    tir?: true;
    vpn?: true;
    payback?: true;
};
export type Solicitud_evaluacion_financieraCountAggregateInputType = {
    id?: true;
    solicitud_id?: true;
    tir?: true;
    vpn?: true;
    payback?: true;
    _all?: true;
};
export type Solicitud_evaluacion_financieraAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.solicitud_evaluacion_financieraWhereInput;
    orderBy?: Prisma.solicitud_evaluacion_financieraOrderByWithRelationInput | Prisma.solicitud_evaluacion_financieraOrderByWithRelationInput[];
    cursor?: Prisma.solicitud_evaluacion_financieraWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Solicitud_evaluacion_financieraCountAggregateInputType;
    _avg?: Solicitud_evaluacion_financieraAvgAggregateInputType;
    _sum?: Solicitud_evaluacion_financieraSumAggregateInputType;
    _min?: Solicitud_evaluacion_financieraMinAggregateInputType;
    _max?: Solicitud_evaluacion_financieraMaxAggregateInputType;
};
export type GetSolicitud_evaluacion_financieraAggregateType<T extends Solicitud_evaluacion_financieraAggregateArgs> = {
    [P in keyof T & keyof AggregateSolicitud_evaluacion_financiera]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSolicitud_evaluacion_financiera[P]> : Prisma.GetScalarType<T[P], AggregateSolicitud_evaluacion_financiera[P]>;
};
export type solicitud_evaluacion_financieraGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.solicitud_evaluacion_financieraWhereInput;
    orderBy?: Prisma.solicitud_evaluacion_financieraOrderByWithAggregationInput | Prisma.solicitud_evaluacion_financieraOrderByWithAggregationInput[];
    by: Prisma.Solicitud_evaluacion_financieraScalarFieldEnum[] | Prisma.Solicitud_evaluacion_financieraScalarFieldEnum;
    having?: Prisma.solicitud_evaluacion_financieraScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Solicitud_evaluacion_financieraCountAggregateInputType | true;
    _avg?: Solicitud_evaluacion_financieraAvgAggregateInputType;
    _sum?: Solicitud_evaluacion_financieraSumAggregateInputType;
    _min?: Solicitud_evaluacion_financieraMinAggregateInputType;
    _max?: Solicitud_evaluacion_financieraMaxAggregateInputType;
};
export type Solicitud_evaluacion_financieraGroupByOutputType = {
    id: number;
    solicitud_id: number | null;
    tir: runtime.Decimal | null;
    vpn: runtime.Decimal | null;
    payback: runtime.Decimal | null;
    _count: Solicitud_evaluacion_financieraCountAggregateOutputType | null;
    _avg: Solicitud_evaluacion_financieraAvgAggregateOutputType | null;
    _sum: Solicitud_evaluacion_financieraSumAggregateOutputType | null;
    _min: Solicitud_evaluacion_financieraMinAggregateOutputType | null;
    _max: Solicitud_evaluacion_financieraMaxAggregateOutputType | null;
};
export type GetSolicitud_evaluacion_financieraGroupByPayload<T extends solicitud_evaluacion_financieraGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Solicitud_evaluacion_financieraGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Solicitud_evaluacion_financieraGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Solicitud_evaluacion_financieraGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Solicitud_evaluacion_financieraGroupByOutputType[P]>;
}>>;
export type solicitud_evaluacion_financieraWhereInput = {
    AND?: Prisma.solicitud_evaluacion_financieraWhereInput | Prisma.solicitud_evaluacion_financieraWhereInput[];
    OR?: Prisma.solicitud_evaluacion_financieraWhereInput[];
    NOT?: Prisma.solicitud_evaluacion_financieraWhereInput | Prisma.solicitud_evaluacion_financieraWhereInput[];
    id?: Prisma.IntFilter<"solicitud_evaluacion_financiera"> | number;
    solicitud_id?: Prisma.IntNullableFilter<"solicitud_evaluacion_financiera"> | number | null;
    tir?: Prisma.DecimalNullableFilter<"solicitud_evaluacion_financiera"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    vpn?: Prisma.DecimalNullableFilter<"solicitud_evaluacion_financiera"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    payback?: Prisma.DecimalNullableFilter<"solicitud_evaluacion_financiera"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    solicitudes_inversion?: Prisma.XOR<Prisma.Solicitudes_inversionNullableScalarRelationFilter, Prisma.solicitudes_inversionWhereInput> | null;
};
export type solicitud_evaluacion_financieraOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    solicitud_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    tir?: Prisma.SortOrderInput | Prisma.SortOrder;
    vpn?: Prisma.SortOrderInput | Prisma.SortOrder;
    payback?: Prisma.SortOrderInput | Prisma.SortOrder;
    solicitudes_inversion?: Prisma.solicitudes_inversionOrderByWithRelationInput;
};
export type solicitud_evaluacion_financieraWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    solicitud_id?: number;
    AND?: Prisma.solicitud_evaluacion_financieraWhereInput | Prisma.solicitud_evaluacion_financieraWhereInput[];
    OR?: Prisma.solicitud_evaluacion_financieraWhereInput[];
    NOT?: Prisma.solicitud_evaluacion_financieraWhereInput | Prisma.solicitud_evaluacion_financieraWhereInput[];
    tir?: Prisma.DecimalNullableFilter<"solicitud_evaluacion_financiera"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    vpn?: Prisma.DecimalNullableFilter<"solicitud_evaluacion_financiera"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    payback?: Prisma.DecimalNullableFilter<"solicitud_evaluacion_financiera"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    solicitudes_inversion?: Prisma.XOR<Prisma.Solicitudes_inversionNullableScalarRelationFilter, Prisma.solicitudes_inversionWhereInput> | null;
}, "id" | "solicitud_id">;
export type solicitud_evaluacion_financieraOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    solicitud_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    tir?: Prisma.SortOrderInput | Prisma.SortOrder;
    vpn?: Prisma.SortOrderInput | Prisma.SortOrder;
    payback?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.solicitud_evaluacion_financieraCountOrderByAggregateInput;
    _avg?: Prisma.solicitud_evaluacion_financieraAvgOrderByAggregateInput;
    _max?: Prisma.solicitud_evaluacion_financieraMaxOrderByAggregateInput;
    _min?: Prisma.solicitud_evaluacion_financieraMinOrderByAggregateInput;
    _sum?: Prisma.solicitud_evaluacion_financieraSumOrderByAggregateInput;
};
export type solicitud_evaluacion_financieraScalarWhereWithAggregatesInput = {
    AND?: Prisma.solicitud_evaluacion_financieraScalarWhereWithAggregatesInput | Prisma.solicitud_evaluacion_financieraScalarWhereWithAggregatesInput[];
    OR?: Prisma.solicitud_evaluacion_financieraScalarWhereWithAggregatesInput[];
    NOT?: Prisma.solicitud_evaluacion_financieraScalarWhereWithAggregatesInput | Prisma.solicitud_evaluacion_financieraScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"solicitud_evaluacion_financiera"> | number;
    solicitud_id?: Prisma.IntNullableWithAggregatesFilter<"solicitud_evaluacion_financiera"> | number | null;
    tir?: Prisma.DecimalNullableWithAggregatesFilter<"solicitud_evaluacion_financiera"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    vpn?: Prisma.DecimalNullableWithAggregatesFilter<"solicitud_evaluacion_financiera"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    payback?: Prisma.DecimalNullableWithAggregatesFilter<"solicitud_evaluacion_financiera"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_evaluacion_financieraCreateInput = {
    tir?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    vpn?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    payback?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    solicitudes_inversion?: Prisma.solicitudes_inversionCreateNestedOneWithoutSolicitud_evaluacion_financieraInput;
};
export type solicitud_evaluacion_financieraUncheckedCreateInput = {
    id?: number;
    solicitud_id?: number | null;
    tir?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    vpn?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    payback?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_evaluacion_financieraUpdateInput = {
    tir?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    vpn?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    payback?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    solicitudes_inversion?: Prisma.solicitudes_inversionUpdateOneWithoutSolicitud_evaluacion_financieraNestedInput;
};
export type solicitud_evaluacion_financieraUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    solicitud_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tir?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    vpn?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    payback?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_evaluacion_financieraCreateManyInput = {
    id?: number;
    solicitud_id?: number | null;
    tir?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    vpn?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    payback?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_evaluacion_financieraUpdateManyMutationInput = {
    tir?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    vpn?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    payback?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_evaluacion_financieraUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    solicitud_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    tir?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    vpn?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    payback?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_evaluacion_financieraCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    solicitud_id?: Prisma.SortOrder;
    tir?: Prisma.SortOrder;
    vpn?: Prisma.SortOrder;
    payback?: Prisma.SortOrder;
};
export type solicitud_evaluacion_financieraAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    solicitud_id?: Prisma.SortOrder;
    tir?: Prisma.SortOrder;
    vpn?: Prisma.SortOrder;
    payback?: Prisma.SortOrder;
};
export type solicitud_evaluacion_financieraMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    solicitud_id?: Prisma.SortOrder;
    tir?: Prisma.SortOrder;
    vpn?: Prisma.SortOrder;
    payback?: Prisma.SortOrder;
};
export type solicitud_evaluacion_financieraMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    solicitud_id?: Prisma.SortOrder;
    tir?: Prisma.SortOrder;
    vpn?: Prisma.SortOrder;
    payback?: Prisma.SortOrder;
};
export type solicitud_evaluacion_financieraSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    solicitud_id?: Prisma.SortOrder;
    tir?: Prisma.SortOrder;
    vpn?: Prisma.SortOrder;
    payback?: Prisma.SortOrder;
};
export type Solicitud_evaluacion_financieraNullableScalarRelationFilter = {
    is?: Prisma.solicitud_evaluacion_financieraWhereInput | null;
    isNot?: Prisma.solicitud_evaluacion_financieraWhereInput | null;
};
export type NullableDecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type solicitud_evaluacion_financieraCreateNestedOneWithoutSolicitudes_inversionInput = {
    create?: Prisma.XOR<Prisma.solicitud_evaluacion_financieraCreateWithoutSolicitudes_inversionInput, Prisma.solicitud_evaluacion_financieraUncheckedCreateWithoutSolicitudes_inversionInput>;
    connectOrCreate?: Prisma.solicitud_evaluacion_financieraCreateOrConnectWithoutSolicitudes_inversionInput;
    connect?: Prisma.solicitud_evaluacion_financieraWhereUniqueInput;
};
export type solicitud_evaluacion_financieraUncheckedCreateNestedOneWithoutSolicitudes_inversionInput = {
    create?: Prisma.XOR<Prisma.solicitud_evaluacion_financieraCreateWithoutSolicitudes_inversionInput, Prisma.solicitud_evaluacion_financieraUncheckedCreateWithoutSolicitudes_inversionInput>;
    connectOrCreate?: Prisma.solicitud_evaluacion_financieraCreateOrConnectWithoutSolicitudes_inversionInput;
    connect?: Prisma.solicitud_evaluacion_financieraWhereUniqueInput;
};
export type solicitud_evaluacion_financieraUpdateOneWithoutSolicitudes_inversionNestedInput = {
    create?: Prisma.XOR<Prisma.solicitud_evaluacion_financieraCreateWithoutSolicitudes_inversionInput, Prisma.solicitud_evaluacion_financieraUncheckedCreateWithoutSolicitudes_inversionInput>;
    connectOrCreate?: Prisma.solicitud_evaluacion_financieraCreateOrConnectWithoutSolicitudes_inversionInput;
    upsert?: Prisma.solicitud_evaluacion_financieraUpsertWithoutSolicitudes_inversionInput;
    disconnect?: Prisma.solicitud_evaluacion_financieraWhereInput | boolean;
    delete?: Prisma.solicitud_evaluacion_financieraWhereInput | boolean;
    connect?: Prisma.solicitud_evaluacion_financieraWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.solicitud_evaluacion_financieraUpdateToOneWithWhereWithoutSolicitudes_inversionInput, Prisma.solicitud_evaluacion_financieraUpdateWithoutSolicitudes_inversionInput>, Prisma.solicitud_evaluacion_financieraUncheckedUpdateWithoutSolicitudes_inversionInput>;
};
export type solicitud_evaluacion_financieraUncheckedUpdateOneWithoutSolicitudes_inversionNestedInput = {
    create?: Prisma.XOR<Prisma.solicitud_evaluacion_financieraCreateWithoutSolicitudes_inversionInput, Prisma.solicitud_evaluacion_financieraUncheckedCreateWithoutSolicitudes_inversionInput>;
    connectOrCreate?: Prisma.solicitud_evaluacion_financieraCreateOrConnectWithoutSolicitudes_inversionInput;
    upsert?: Prisma.solicitud_evaluacion_financieraUpsertWithoutSolicitudes_inversionInput;
    disconnect?: Prisma.solicitud_evaluacion_financieraWhereInput | boolean;
    delete?: Prisma.solicitud_evaluacion_financieraWhereInput | boolean;
    connect?: Prisma.solicitud_evaluacion_financieraWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.solicitud_evaluacion_financieraUpdateToOneWithWhereWithoutSolicitudes_inversionInput, Prisma.solicitud_evaluacion_financieraUpdateWithoutSolicitudes_inversionInput>, Prisma.solicitud_evaluacion_financieraUncheckedUpdateWithoutSolicitudes_inversionInput>;
};
export type solicitud_evaluacion_financieraCreateWithoutSolicitudes_inversionInput = {
    tir?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    vpn?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    payback?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_evaluacion_financieraUncheckedCreateWithoutSolicitudes_inversionInput = {
    id?: number;
    tir?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    vpn?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    payback?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_evaluacion_financieraCreateOrConnectWithoutSolicitudes_inversionInput = {
    where: Prisma.solicitud_evaluacion_financieraWhereUniqueInput;
    create: Prisma.XOR<Prisma.solicitud_evaluacion_financieraCreateWithoutSolicitudes_inversionInput, Prisma.solicitud_evaluacion_financieraUncheckedCreateWithoutSolicitudes_inversionInput>;
};
export type solicitud_evaluacion_financieraUpsertWithoutSolicitudes_inversionInput = {
    update: Prisma.XOR<Prisma.solicitud_evaluacion_financieraUpdateWithoutSolicitudes_inversionInput, Prisma.solicitud_evaluacion_financieraUncheckedUpdateWithoutSolicitudes_inversionInput>;
    create: Prisma.XOR<Prisma.solicitud_evaluacion_financieraCreateWithoutSolicitudes_inversionInput, Prisma.solicitud_evaluacion_financieraUncheckedCreateWithoutSolicitudes_inversionInput>;
    where?: Prisma.solicitud_evaluacion_financieraWhereInput;
};
export type solicitud_evaluacion_financieraUpdateToOneWithWhereWithoutSolicitudes_inversionInput = {
    where?: Prisma.solicitud_evaluacion_financieraWhereInput;
    data: Prisma.XOR<Prisma.solicitud_evaluacion_financieraUpdateWithoutSolicitudes_inversionInput, Prisma.solicitud_evaluacion_financieraUncheckedUpdateWithoutSolicitudes_inversionInput>;
};
export type solicitud_evaluacion_financieraUpdateWithoutSolicitudes_inversionInput = {
    tir?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    vpn?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    payback?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_evaluacion_financieraUncheckedUpdateWithoutSolicitudes_inversionInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    tir?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    vpn?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    payback?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type solicitud_evaluacion_financieraSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    solicitud_id?: boolean;
    tir?: boolean;
    vpn?: boolean;
    payback?: boolean;
    solicitudes_inversion?: boolean | Prisma.solicitud_evaluacion_financiera$solicitudes_inversionArgs<ExtArgs>;
}, ExtArgs["result"]["solicitud_evaluacion_financiera"]>;
export type solicitud_evaluacion_financieraSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    solicitud_id?: boolean;
    tir?: boolean;
    vpn?: boolean;
    payback?: boolean;
    solicitudes_inversion?: boolean | Prisma.solicitud_evaluacion_financiera$solicitudes_inversionArgs<ExtArgs>;
}, ExtArgs["result"]["solicitud_evaluacion_financiera"]>;
export type solicitud_evaluacion_financieraSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    solicitud_id?: boolean;
    tir?: boolean;
    vpn?: boolean;
    payback?: boolean;
    solicitudes_inversion?: boolean | Prisma.solicitud_evaluacion_financiera$solicitudes_inversionArgs<ExtArgs>;
}, ExtArgs["result"]["solicitud_evaluacion_financiera"]>;
export type solicitud_evaluacion_financieraSelectScalar = {
    id?: boolean;
    solicitud_id?: boolean;
    tir?: boolean;
    vpn?: boolean;
    payback?: boolean;
};
export type solicitud_evaluacion_financieraOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "solicitud_id" | "tir" | "vpn" | "payback", ExtArgs["result"]["solicitud_evaluacion_financiera"]>;
export type solicitud_evaluacion_financieraInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    solicitudes_inversion?: boolean | Prisma.solicitud_evaluacion_financiera$solicitudes_inversionArgs<ExtArgs>;
};
export type solicitud_evaluacion_financieraIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    solicitudes_inversion?: boolean | Prisma.solicitud_evaluacion_financiera$solicitudes_inversionArgs<ExtArgs>;
};
export type solicitud_evaluacion_financieraIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    solicitudes_inversion?: boolean | Prisma.solicitud_evaluacion_financiera$solicitudes_inversionArgs<ExtArgs>;
};
export type $solicitud_evaluacion_financieraPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "solicitud_evaluacion_financiera";
    objects: {
        solicitudes_inversion: Prisma.$solicitudes_inversionPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        solicitud_id: number | null;
        tir: runtime.Decimal | null;
        vpn: runtime.Decimal | null;
        payback: runtime.Decimal | null;
    }, ExtArgs["result"]["solicitud_evaluacion_financiera"]>;
    composites: {};
};
export type solicitud_evaluacion_financieraGetPayload<S extends boolean | null | undefined | solicitud_evaluacion_financieraDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$solicitud_evaluacion_financieraPayload, S>;
export type solicitud_evaluacion_financieraCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<solicitud_evaluacion_financieraFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Solicitud_evaluacion_financieraCountAggregateInputType | true;
};
export interface solicitud_evaluacion_financieraDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['solicitud_evaluacion_financiera'];
        meta: {
            name: 'solicitud_evaluacion_financiera';
        };
    };
    findUnique<T extends solicitud_evaluacion_financieraFindUniqueArgs>(args: Prisma.SelectSubset<T, solicitud_evaluacion_financieraFindUniqueArgs<ExtArgs>>): Prisma.Prisma__solicitud_evaluacion_financieraClient<runtime.Types.Result.GetResult<Prisma.$solicitud_evaluacion_financieraPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends solicitud_evaluacion_financieraFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, solicitud_evaluacion_financieraFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__solicitud_evaluacion_financieraClient<runtime.Types.Result.GetResult<Prisma.$solicitud_evaluacion_financieraPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends solicitud_evaluacion_financieraFindFirstArgs>(args?: Prisma.SelectSubset<T, solicitud_evaluacion_financieraFindFirstArgs<ExtArgs>>): Prisma.Prisma__solicitud_evaluacion_financieraClient<runtime.Types.Result.GetResult<Prisma.$solicitud_evaluacion_financieraPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends solicitud_evaluacion_financieraFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, solicitud_evaluacion_financieraFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__solicitud_evaluacion_financieraClient<runtime.Types.Result.GetResult<Prisma.$solicitud_evaluacion_financieraPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends solicitud_evaluacion_financieraFindManyArgs>(args?: Prisma.SelectSubset<T, solicitud_evaluacion_financieraFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$solicitud_evaluacion_financieraPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends solicitud_evaluacion_financieraCreateArgs>(args: Prisma.SelectSubset<T, solicitud_evaluacion_financieraCreateArgs<ExtArgs>>): Prisma.Prisma__solicitud_evaluacion_financieraClient<runtime.Types.Result.GetResult<Prisma.$solicitud_evaluacion_financieraPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends solicitud_evaluacion_financieraCreateManyArgs>(args?: Prisma.SelectSubset<T, solicitud_evaluacion_financieraCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends solicitud_evaluacion_financieraCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, solicitud_evaluacion_financieraCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$solicitud_evaluacion_financieraPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends solicitud_evaluacion_financieraDeleteArgs>(args: Prisma.SelectSubset<T, solicitud_evaluacion_financieraDeleteArgs<ExtArgs>>): Prisma.Prisma__solicitud_evaluacion_financieraClient<runtime.Types.Result.GetResult<Prisma.$solicitud_evaluacion_financieraPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends solicitud_evaluacion_financieraUpdateArgs>(args: Prisma.SelectSubset<T, solicitud_evaluacion_financieraUpdateArgs<ExtArgs>>): Prisma.Prisma__solicitud_evaluacion_financieraClient<runtime.Types.Result.GetResult<Prisma.$solicitud_evaluacion_financieraPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends solicitud_evaluacion_financieraDeleteManyArgs>(args?: Prisma.SelectSubset<T, solicitud_evaluacion_financieraDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends solicitud_evaluacion_financieraUpdateManyArgs>(args: Prisma.SelectSubset<T, solicitud_evaluacion_financieraUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends solicitud_evaluacion_financieraUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, solicitud_evaluacion_financieraUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$solicitud_evaluacion_financieraPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends solicitud_evaluacion_financieraUpsertArgs>(args: Prisma.SelectSubset<T, solicitud_evaluacion_financieraUpsertArgs<ExtArgs>>): Prisma.Prisma__solicitud_evaluacion_financieraClient<runtime.Types.Result.GetResult<Prisma.$solicitud_evaluacion_financieraPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends solicitud_evaluacion_financieraCountArgs>(args?: Prisma.Subset<T, solicitud_evaluacion_financieraCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Solicitud_evaluacion_financieraCountAggregateOutputType> : number>;
    aggregate<T extends Solicitud_evaluacion_financieraAggregateArgs>(args: Prisma.Subset<T, Solicitud_evaluacion_financieraAggregateArgs>): Prisma.PrismaPromise<GetSolicitud_evaluacion_financieraAggregateType<T>>;
    groupBy<T extends solicitud_evaluacion_financieraGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: solicitud_evaluacion_financieraGroupByArgs['orderBy'];
    } : {
        orderBy?: solicitud_evaluacion_financieraGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, solicitud_evaluacion_financieraGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSolicitud_evaluacion_financieraGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: solicitud_evaluacion_financieraFieldRefs;
}
export interface Prisma__solicitud_evaluacion_financieraClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    solicitudes_inversion<T extends Prisma.solicitud_evaluacion_financiera$solicitudes_inversionArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.solicitud_evaluacion_financiera$solicitudes_inversionArgs<ExtArgs>>): Prisma.Prisma__solicitudes_inversionClient<runtime.Types.Result.GetResult<Prisma.$solicitudes_inversionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface solicitud_evaluacion_financieraFieldRefs {
    readonly id: Prisma.FieldRef<"solicitud_evaluacion_financiera", 'Int'>;
    readonly solicitud_id: Prisma.FieldRef<"solicitud_evaluacion_financiera", 'Int'>;
    readonly tir: Prisma.FieldRef<"solicitud_evaluacion_financiera", 'Decimal'>;
    readonly vpn: Prisma.FieldRef<"solicitud_evaluacion_financiera", 'Decimal'>;
    readonly payback: Prisma.FieldRef<"solicitud_evaluacion_financiera", 'Decimal'>;
}
export type solicitud_evaluacion_financieraFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_evaluacion_financieraSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_evaluacion_financieraOmit<ExtArgs> | null;
    include?: Prisma.solicitud_evaluacion_financieraInclude<ExtArgs> | null;
    where: Prisma.solicitud_evaluacion_financieraWhereUniqueInput;
};
export type solicitud_evaluacion_financieraFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_evaluacion_financieraSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_evaluacion_financieraOmit<ExtArgs> | null;
    include?: Prisma.solicitud_evaluacion_financieraInclude<ExtArgs> | null;
    where: Prisma.solicitud_evaluacion_financieraWhereUniqueInput;
};
export type solicitud_evaluacion_financieraFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_evaluacion_financieraSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_evaluacion_financieraOmit<ExtArgs> | null;
    include?: Prisma.solicitud_evaluacion_financieraInclude<ExtArgs> | null;
    where?: Prisma.solicitud_evaluacion_financieraWhereInput;
    orderBy?: Prisma.solicitud_evaluacion_financieraOrderByWithRelationInput | Prisma.solicitud_evaluacion_financieraOrderByWithRelationInput[];
    cursor?: Prisma.solicitud_evaluacion_financieraWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Solicitud_evaluacion_financieraScalarFieldEnum | Prisma.Solicitud_evaluacion_financieraScalarFieldEnum[];
};
export type solicitud_evaluacion_financieraFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_evaluacion_financieraSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_evaluacion_financieraOmit<ExtArgs> | null;
    include?: Prisma.solicitud_evaluacion_financieraInclude<ExtArgs> | null;
    where?: Prisma.solicitud_evaluacion_financieraWhereInput;
    orderBy?: Prisma.solicitud_evaluacion_financieraOrderByWithRelationInput | Prisma.solicitud_evaluacion_financieraOrderByWithRelationInput[];
    cursor?: Prisma.solicitud_evaluacion_financieraWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Solicitud_evaluacion_financieraScalarFieldEnum | Prisma.Solicitud_evaluacion_financieraScalarFieldEnum[];
};
export type solicitud_evaluacion_financieraFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_evaluacion_financieraSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_evaluacion_financieraOmit<ExtArgs> | null;
    include?: Prisma.solicitud_evaluacion_financieraInclude<ExtArgs> | null;
    where?: Prisma.solicitud_evaluacion_financieraWhereInput;
    orderBy?: Prisma.solicitud_evaluacion_financieraOrderByWithRelationInput | Prisma.solicitud_evaluacion_financieraOrderByWithRelationInput[];
    cursor?: Prisma.solicitud_evaluacion_financieraWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Solicitud_evaluacion_financieraScalarFieldEnum | Prisma.Solicitud_evaluacion_financieraScalarFieldEnum[];
};
export type solicitud_evaluacion_financieraCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_evaluacion_financieraSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_evaluacion_financieraOmit<ExtArgs> | null;
    include?: Prisma.solicitud_evaluacion_financieraInclude<ExtArgs> | null;
    data?: Prisma.XOR<Prisma.solicitud_evaluacion_financieraCreateInput, Prisma.solicitud_evaluacion_financieraUncheckedCreateInput>;
};
export type solicitud_evaluacion_financieraCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.solicitud_evaluacion_financieraCreateManyInput | Prisma.solicitud_evaluacion_financieraCreateManyInput[];
    skipDuplicates?: boolean;
};
export type solicitud_evaluacion_financieraCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_evaluacion_financieraSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.solicitud_evaluacion_financieraOmit<ExtArgs> | null;
    data: Prisma.solicitud_evaluacion_financieraCreateManyInput | Prisma.solicitud_evaluacion_financieraCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.solicitud_evaluacion_financieraIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type solicitud_evaluacion_financieraUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_evaluacion_financieraSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_evaluacion_financieraOmit<ExtArgs> | null;
    include?: Prisma.solicitud_evaluacion_financieraInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.solicitud_evaluacion_financieraUpdateInput, Prisma.solicitud_evaluacion_financieraUncheckedUpdateInput>;
    where: Prisma.solicitud_evaluacion_financieraWhereUniqueInput;
};
export type solicitud_evaluacion_financieraUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.solicitud_evaluacion_financieraUpdateManyMutationInput, Prisma.solicitud_evaluacion_financieraUncheckedUpdateManyInput>;
    where?: Prisma.solicitud_evaluacion_financieraWhereInput;
    limit?: number;
};
export type solicitud_evaluacion_financieraUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_evaluacion_financieraSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.solicitud_evaluacion_financieraOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.solicitud_evaluacion_financieraUpdateManyMutationInput, Prisma.solicitud_evaluacion_financieraUncheckedUpdateManyInput>;
    where?: Prisma.solicitud_evaluacion_financieraWhereInput;
    limit?: number;
    include?: Prisma.solicitud_evaluacion_financieraIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type solicitud_evaluacion_financieraUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_evaluacion_financieraSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_evaluacion_financieraOmit<ExtArgs> | null;
    include?: Prisma.solicitud_evaluacion_financieraInclude<ExtArgs> | null;
    where: Prisma.solicitud_evaluacion_financieraWhereUniqueInput;
    create: Prisma.XOR<Prisma.solicitud_evaluacion_financieraCreateInput, Prisma.solicitud_evaluacion_financieraUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.solicitud_evaluacion_financieraUpdateInput, Prisma.solicitud_evaluacion_financieraUncheckedUpdateInput>;
};
export type solicitud_evaluacion_financieraDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_evaluacion_financieraSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_evaluacion_financieraOmit<ExtArgs> | null;
    include?: Prisma.solicitud_evaluacion_financieraInclude<ExtArgs> | null;
    where: Prisma.solicitud_evaluacion_financieraWhereUniqueInput;
};
export type solicitud_evaluacion_financieraDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.solicitud_evaluacion_financieraWhereInput;
    limit?: number;
};
export type solicitud_evaluacion_financiera$solicitudes_inversionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitudes_inversionSelect<ExtArgs> | null;
    omit?: Prisma.solicitudes_inversionOmit<ExtArgs> | null;
    include?: Prisma.solicitudes_inversionInclude<ExtArgs> | null;
    where?: Prisma.solicitudes_inversionWhereInput;
};
export type solicitud_evaluacion_financieraDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitud_evaluacion_financieraSelect<ExtArgs> | null;
    omit?: Prisma.solicitud_evaluacion_financieraOmit<ExtArgs> | null;
    include?: Prisma.solicitud_evaluacion_financieraInclude<ExtArgs> | null;
};
