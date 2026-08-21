import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type programasModel = runtime.Types.Result.DefaultSelection<Prisma.$programasPayload>;
export type AggregateProgramas = {
    _count: ProgramasCountAggregateOutputType | null;
    _avg: ProgramasAvgAggregateOutputType | null;
    _sum: ProgramasSumAggregateOutputType | null;
    _min: ProgramasMinAggregateOutputType | null;
    _max: ProgramasMaxAggregateOutputType | null;
};
export type ProgramasAvgAggregateOutputType = {
    id: number | null;
    id_grupo: number | null;
};
export type ProgramasSumAggregateOutputType = {
    id: number | null;
    id_grupo: number | null;
};
export type ProgramasMinAggregateOutputType = {
    id: number | null;
    id_grupo: number | null;
    nombre: string | null;
};
export type ProgramasMaxAggregateOutputType = {
    id: number | null;
    id_grupo: number | null;
    nombre: string | null;
};
export type ProgramasCountAggregateOutputType = {
    id: number;
    id_grupo: number;
    nombre: number;
    _all: number;
};
export type ProgramasAvgAggregateInputType = {
    id?: true;
    id_grupo?: true;
};
export type ProgramasSumAggregateInputType = {
    id?: true;
    id_grupo?: true;
};
export type ProgramasMinAggregateInputType = {
    id?: true;
    id_grupo?: true;
    nombre?: true;
};
export type ProgramasMaxAggregateInputType = {
    id?: true;
    id_grupo?: true;
    nombre?: true;
};
export type ProgramasCountAggregateInputType = {
    id?: true;
    id_grupo?: true;
    nombre?: true;
    _all?: true;
};
export type ProgramasAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.programasWhereInput;
    orderBy?: Prisma.programasOrderByWithRelationInput | Prisma.programasOrderByWithRelationInput[];
    cursor?: Prisma.programasWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProgramasCountAggregateInputType;
    _avg?: ProgramasAvgAggregateInputType;
    _sum?: ProgramasSumAggregateInputType;
    _min?: ProgramasMinAggregateInputType;
    _max?: ProgramasMaxAggregateInputType;
};
export type GetProgramasAggregateType<T extends ProgramasAggregateArgs> = {
    [P in keyof T & keyof AggregateProgramas]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProgramas[P]> : Prisma.GetScalarType<T[P], AggregateProgramas[P]>;
};
export type programasGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.programasWhereInput;
    orderBy?: Prisma.programasOrderByWithAggregationInput | Prisma.programasOrderByWithAggregationInput[];
    by: Prisma.ProgramasScalarFieldEnum[] | Prisma.ProgramasScalarFieldEnum;
    having?: Prisma.programasScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProgramasCountAggregateInputType | true;
    _avg?: ProgramasAvgAggregateInputType;
    _sum?: ProgramasSumAggregateInputType;
    _min?: ProgramasMinAggregateInputType;
    _max?: ProgramasMaxAggregateInputType;
};
export type ProgramasGroupByOutputType = {
    id: number;
    id_grupo: number | null;
    nombre: string;
    _count: ProgramasCountAggregateOutputType | null;
    _avg: ProgramasAvgAggregateOutputType | null;
    _sum: ProgramasSumAggregateOutputType | null;
    _min: ProgramasMinAggregateOutputType | null;
    _max: ProgramasMaxAggregateOutputType | null;
};
export type GetProgramasGroupByPayload<T extends programasGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProgramasGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProgramasGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProgramasGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProgramasGroupByOutputType[P]>;
}>>;
export type programasWhereInput = {
    AND?: Prisma.programasWhereInput | Prisma.programasWhereInput[];
    OR?: Prisma.programasWhereInput[];
    NOT?: Prisma.programasWhereInput | Prisma.programasWhereInput[];
    id?: Prisma.IntFilter<"programas"> | number;
    id_grupo?: Prisma.IntNullableFilter<"programas"> | number | null;
    nombre?: Prisma.StringFilter<"programas"> | string;
    grupos?: Prisma.XOR<Prisma.GruposNullableScalarRelationFilter, Prisma.gruposWhereInput> | null;
    subprogramas?: Prisma.SubprogramasListRelationFilter;
};
export type programasOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    id_grupo?: Prisma.SortOrderInput | Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    grupos?: Prisma.gruposOrderByWithRelationInput;
    subprogramas?: Prisma.subprogramasOrderByRelationAggregateInput;
};
export type programasWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.programasWhereInput | Prisma.programasWhereInput[];
    OR?: Prisma.programasWhereInput[];
    NOT?: Prisma.programasWhereInput | Prisma.programasWhereInput[];
    id_grupo?: Prisma.IntNullableFilter<"programas"> | number | null;
    nombre?: Prisma.StringFilter<"programas"> | string;
    grupos?: Prisma.XOR<Prisma.GruposNullableScalarRelationFilter, Prisma.gruposWhereInput> | null;
    subprogramas?: Prisma.SubprogramasListRelationFilter;
}, "id">;
export type programasOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    id_grupo?: Prisma.SortOrderInput | Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    _count?: Prisma.programasCountOrderByAggregateInput;
    _avg?: Prisma.programasAvgOrderByAggregateInput;
    _max?: Prisma.programasMaxOrderByAggregateInput;
    _min?: Prisma.programasMinOrderByAggregateInput;
    _sum?: Prisma.programasSumOrderByAggregateInput;
};
export type programasScalarWhereWithAggregatesInput = {
    AND?: Prisma.programasScalarWhereWithAggregatesInput | Prisma.programasScalarWhereWithAggregatesInput[];
    OR?: Prisma.programasScalarWhereWithAggregatesInput[];
    NOT?: Prisma.programasScalarWhereWithAggregatesInput | Prisma.programasScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"programas"> | number;
    id_grupo?: Prisma.IntNullableWithAggregatesFilter<"programas"> | number | null;
    nombre?: Prisma.StringWithAggregatesFilter<"programas"> | string;
};
export type programasCreateInput = {
    nombre: string;
    grupos?: Prisma.gruposCreateNestedOneWithoutProgramasInput;
    subprogramas?: Prisma.subprogramasCreateNestedManyWithoutProgramasInput;
};
export type programasUncheckedCreateInput = {
    id?: number;
    id_grupo?: number | null;
    nombre: string;
    subprogramas?: Prisma.subprogramasUncheckedCreateNestedManyWithoutProgramasInput;
};
export type programasUpdateInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    grupos?: Prisma.gruposUpdateOneWithoutProgramasNestedInput;
    subprogramas?: Prisma.subprogramasUpdateManyWithoutProgramasNestedInput;
};
export type programasUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    id_grupo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    subprogramas?: Prisma.subprogramasUncheckedUpdateManyWithoutProgramasNestedInput;
};
export type programasCreateManyInput = {
    id?: number;
    id_grupo?: number | null;
    nombre: string;
};
export type programasUpdateManyMutationInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type programasUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    id_grupo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProgramasListRelationFilter = {
    every?: Prisma.programasWhereInput;
    some?: Prisma.programasWhereInput;
    none?: Prisma.programasWhereInput;
};
export type programasOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type programasCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    id_grupo?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
};
export type programasAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    id_grupo?: Prisma.SortOrder;
};
export type programasMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    id_grupo?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
};
export type programasMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    id_grupo?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
};
export type programasSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    id_grupo?: Prisma.SortOrder;
};
export type ProgramasNullableScalarRelationFilter = {
    is?: Prisma.programasWhereInput | null;
    isNot?: Prisma.programasWhereInput | null;
};
export type programasCreateNestedManyWithoutGruposInput = {
    create?: Prisma.XOR<Prisma.programasCreateWithoutGruposInput, Prisma.programasUncheckedCreateWithoutGruposInput> | Prisma.programasCreateWithoutGruposInput[] | Prisma.programasUncheckedCreateWithoutGruposInput[];
    connectOrCreate?: Prisma.programasCreateOrConnectWithoutGruposInput | Prisma.programasCreateOrConnectWithoutGruposInput[];
    createMany?: Prisma.programasCreateManyGruposInputEnvelope;
    connect?: Prisma.programasWhereUniqueInput | Prisma.programasWhereUniqueInput[];
};
export type programasUncheckedCreateNestedManyWithoutGruposInput = {
    create?: Prisma.XOR<Prisma.programasCreateWithoutGruposInput, Prisma.programasUncheckedCreateWithoutGruposInput> | Prisma.programasCreateWithoutGruposInput[] | Prisma.programasUncheckedCreateWithoutGruposInput[];
    connectOrCreate?: Prisma.programasCreateOrConnectWithoutGruposInput | Prisma.programasCreateOrConnectWithoutGruposInput[];
    createMany?: Prisma.programasCreateManyGruposInputEnvelope;
    connect?: Prisma.programasWhereUniqueInput | Prisma.programasWhereUniqueInput[];
};
export type programasUpdateManyWithoutGruposNestedInput = {
    create?: Prisma.XOR<Prisma.programasCreateWithoutGruposInput, Prisma.programasUncheckedCreateWithoutGruposInput> | Prisma.programasCreateWithoutGruposInput[] | Prisma.programasUncheckedCreateWithoutGruposInput[];
    connectOrCreate?: Prisma.programasCreateOrConnectWithoutGruposInput | Prisma.programasCreateOrConnectWithoutGruposInput[];
    upsert?: Prisma.programasUpsertWithWhereUniqueWithoutGruposInput | Prisma.programasUpsertWithWhereUniqueWithoutGruposInput[];
    createMany?: Prisma.programasCreateManyGruposInputEnvelope;
    set?: Prisma.programasWhereUniqueInput | Prisma.programasWhereUniqueInput[];
    disconnect?: Prisma.programasWhereUniqueInput | Prisma.programasWhereUniqueInput[];
    delete?: Prisma.programasWhereUniqueInput | Prisma.programasWhereUniqueInput[];
    connect?: Prisma.programasWhereUniqueInput | Prisma.programasWhereUniqueInput[];
    update?: Prisma.programasUpdateWithWhereUniqueWithoutGruposInput | Prisma.programasUpdateWithWhereUniqueWithoutGruposInput[];
    updateMany?: Prisma.programasUpdateManyWithWhereWithoutGruposInput | Prisma.programasUpdateManyWithWhereWithoutGruposInput[];
    deleteMany?: Prisma.programasScalarWhereInput | Prisma.programasScalarWhereInput[];
};
export type programasUncheckedUpdateManyWithoutGruposNestedInput = {
    create?: Prisma.XOR<Prisma.programasCreateWithoutGruposInput, Prisma.programasUncheckedCreateWithoutGruposInput> | Prisma.programasCreateWithoutGruposInput[] | Prisma.programasUncheckedCreateWithoutGruposInput[];
    connectOrCreate?: Prisma.programasCreateOrConnectWithoutGruposInput | Prisma.programasCreateOrConnectWithoutGruposInput[];
    upsert?: Prisma.programasUpsertWithWhereUniqueWithoutGruposInput | Prisma.programasUpsertWithWhereUniqueWithoutGruposInput[];
    createMany?: Prisma.programasCreateManyGruposInputEnvelope;
    set?: Prisma.programasWhereUniqueInput | Prisma.programasWhereUniqueInput[];
    disconnect?: Prisma.programasWhereUniqueInput | Prisma.programasWhereUniqueInput[];
    delete?: Prisma.programasWhereUniqueInput | Prisma.programasWhereUniqueInput[];
    connect?: Prisma.programasWhereUniqueInput | Prisma.programasWhereUniqueInput[];
    update?: Prisma.programasUpdateWithWhereUniqueWithoutGruposInput | Prisma.programasUpdateWithWhereUniqueWithoutGruposInput[];
    updateMany?: Prisma.programasUpdateManyWithWhereWithoutGruposInput | Prisma.programasUpdateManyWithWhereWithoutGruposInput[];
    deleteMany?: Prisma.programasScalarWhereInput | Prisma.programasScalarWhereInput[];
};
export type programasCreateNestedOneWithoutSubprogramasInput = {
    create?: Prisma.XOR<Prisma.programasCreateWithoutSubprogramasInput, Prisma.programasUncheckedCreateWithoutSubprogramasInput>;
    connectOrCreate?: Prisma.programasCreateOrConnectWithoutSubprogramasInput;
    connect?: Prisma.programasWhereUniqueInput;
};
export type programasUpdateOneWithoutSubprogramasNestedInput = {
    create?: Prisma.XOR<Prisma.programasCreateWithoutSubprogramasInput, Prisma.programasUncheckedCreateWithoutSubprogramasInput>;
    connectOrCreate?: Prisma.programasCreateOrConnectWithoutSubprogramasInput;
    upsert?: Prisma.programasUpsertWithoutSubprogramasInput;
    disconnect?: Prisma.programasWhereInput | boolean;
    delete?: Prisma.programasWhereInput | boolean;
    connect?: Prisma.programasWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.programasUpdateToOneWithWhereWithoutSubprogramasInput, Prisma.programasUpdateWithoutSubprogramasInput>, Prisma.programasUncheckedUpdateWithoutSubprogramasInput>;
};
export type programasCreateWithoutGruposInput = {
    nombre: string;
    subprogramas?: Prisma.subprogramasCreateNestedManyWithoutProgramasInput;
};
export type programasUncheckedCreateWithoutGruposInput = {
    id?: number;
    nombre: string;
    subprogramas?: Prisma.subprogramasUncheckedCreateNestedManyWithoutProgramasInput;
};
export type programasCreateOrConnectWithoutGruposInput = {
    where: Prisma.programasWhereUniqueInput;
    create: Prisma.XOR<Prisma.programasCreateWithoutGruposInput, Prisma.programasUncheckedCreateWithoutGruposInput>;
};
export type programasCreateManyGruposInputEnvelope = {
    data: Prisma.programasCreateManyGruposInput | Prisma.programasCreateManyGruposInput[];
    skipDuplicates?: boolean;
};
export type programasUpsertWithWhereUniqueWithoutGruposInput = {
    where: Prisma.programasWhereUniqueInput;
    update: Prisma.XOR<Prisma.programasUpdateWithoutGruposInput, Prisma.programasUncheckedUpdateWithoutGruposInput>;
    create: Prisma.XOR<Prisma.programasCreateWithoutGruposInput, Prisma.programasUncheckedCreateWithoutGruposInput>;
};
export type programasUpdateWithWhereUniqueWithoutGruposInput = {
    where: Prisma.programasWhereUniqueInput;
    data: Prisma.XOR<Prisma.programasUpdateWithoutGruposInput, Prisma.programasUncheckedUpdateWithoutGruposInput>;
};
export type programasUpdateManyWithWhereWithoutGruposInput = {
    where: Prisma.programasScalarWhereInput;
    data: Prisma.XOR<Prisma.programasUpdateManyMutationInput, Prisma.programasUncheckedUpdateManyWithoutGruposInput>;
};
export type programasScalarWhereInput = {
    AND?: Prisma.programasScalarWhereInput | Prisma.programasScalarWhereInput[];
    OR?: Prisma.programasScalarWhereInput[];
    NOT?: Prisma.programasScalarWhereInput | Prisma.programasScalarWhereInput[];
    id?: Prisma.IntFilter<"programas"> | number;
    id_grupo?: Prisma.IntNullableFilter<"programas"> | number | null;
    nombre?: Prisma.StringFilter<"programas"> | string;
};
export type programasCreateWithoutSubprogramasInput = {
    nombre: string;
    grupos?: Prisma.gruposCreateNestedOneWithoutProgramasInput;
};
export type programasUncheckedCreateWithoutSubprogramasInput = {
    id?: number;
    id_grupo?: number | null;
    nombre: string;
};
export type programasCreateOrConnectWithoutSubprogramasInput = {
    where: Prisma.programasWhereUniqueInput;
    create: Prisma.XOR<Prisma.programasCreateWithoutSubprogramasInput, Prisma.programasUncheckedCreateWithoutSubprogramasInput>;
};
export type programasUpsertWithoutSubprogramasInput = {
    update: Prisma.XOR<Prisma.programasUpdateWithoutSubprogramasInput, Prisma.programasUncheckedUpdateWithoutSubprogramasInput>;
    create: Prisma.XOR<Prisma.programasCreateWithoutSubprogramasInput, Prisma.programasUncheckedCreateWithoutSubprogramasInput>;
    where?: Prisma.programasWhereInput;
};
export type programasUpdateToOneWithWhereWithoutSubprogramasInput = {
    where?: Prisma.programasWhereInput;
    data: Prisma.XOR<Prisma.programasUpdateWithoutSubprogramasInput, Prisma.programasUncheckedUpdateWithoutSubprogramasInput>;
};
export type programasUpdateWithoutSubprogramasInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    grupos?: Prisma.gruposUpdateOneWithoutProgramasNestedInput;
};
export type programasUncheckedUpdateWithoutSubprogramasInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    id_grupo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type programasCreateManyGruposInput = {
    id?: number;
    nombre: string;
};
export type programasUpdateWithoutGruposInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    subprogramas?: Prisma.subprogramasUpdateManyWithoutProgramasNestedInput;
};
export type programasUncheckedUpdateWithoutGruposInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    subprogramas?: Prisma.subprogramasUncheckedUpdateManyWithoutProgramasNestedInput;
};
export type programasUncheckedUpdateManyWithoutGruposInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProgramasCountOutputType = {
    subprogramas: number;
};
export type ProgramasCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    subprogramas?: boolean | ProgramasCountOutputTypeCountSubprogramasArgs;
};
export type ProgramasCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProgramasCountOutputTypeSelect<ExtArgs> | null;
};
export type ProgramasCountOutputTypeCountSubprogramasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.subprogramasWhereInput;
};
export type programasSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    id_grupo?: boolean;
    nombre?: boolean;
    grupos?: boolean | Prisma.programas$gruposArgs<ExtArgs>;
    subprogramas?: boolean | Prisma.programas$subprogramasArgs<ExtArgs>;
    _count?: boolean | Prisma.ProgramasCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["programas"]>;
export type programasSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    id_grupo?: boolean;
    nombre?: boolean;
    grupos?: boolean | Prisma.programas$gruposArgs<ExtArgs>;
}, ExtArgs["result"]["programas"]>;
export type programasSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    id_grupo?: boolean;
    nombre?: boolean;
    grupos?: boolean | Prisma.programas$gruposArgs<ExtArgs>;
}, ExtArgs["result"]["programas"]>;
export type programasSelectScalar = {
    id?: boolean;
    id_grupo?: boolean;
    nombre?: boolean;
};
export type programasOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "id_grupo" | "nombre", ExtArgs["result"]["programas"]>;
export type programasInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    grupos?: boolean | Prisma.programas$gruposArgs<ExtArgs>;
    subprogramas?: boolean | Prisma.programas$subprogramasArgs<ExtArgs>;
    _count?: boolean | Prisma.ProgramasCountOutputTypeDefaultArgs<ExtArgs>;
};
export type programasIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    grupos?: boolean | Prisma.programas$gruposArgs<ExtArgs>;
};
export type programasIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    grupos?: boolean | Prisma.programas$gruposArgs<ExtArgs>;
};
export type $programasPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "programas";
    objects: {
        grupos: Prisma.$gruposPayload<ExtArgs> | null;
        subprogramas: Prisma.$subprogramasPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        id_grupo: number | null;
        nombre: string;
    }, ExtArgs["result"]["programas"]>;
    composites: {};
};
export type programasGetPayload<S extends boolean | null | undefined | programasDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$programasPayload, S>;
export type programasCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<programasFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProgramasCountAggregateInputType | true;
};
export interface programasDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['programas'];
        meta: {
            name: 'programas';
        };
    };
    findUnique<T extends programasFindUniqueArgs>(args: Prisma.SelectSubset<T, programasFindUniqueArgs<ExtArgs>>): Prisma.Prisma__programasClient<runtime.Types.Result.GetResult<Prisma.$programasPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends programasFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, programasFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__programasClient<runtime.Types.Result.GetResult<Prisma.$programasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends programasFindFirstArgs>(args?: Prisma.SelectSubset<T, programasFindFirstArgs<ExtArgs>>): Prisma.Prisma__programasClient<runtime.Types.Result.GetResult<Prisma.$programasPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends programasFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, programasFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__programasClient<runtime.Types.Result.GetResult<Prisma.$programasPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends programasFindManyArgs>(args?: Prisma.SelectSubset<T, programasFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$programasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends programasCreateArgs>(args: Prisma.SelectSubset<T, programasCreateArgs<ExtArgs>>): Prisma.Prisma__programasClient<runtime.Types.Result.GetResult<Prisma.$programasPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends programasCreateManyArgs>(args?: Prisma.SelectSubset<T, programasCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends programasCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, programasCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$programasPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends programasDeleteArgs>(args: Prisma.SelectSubset<T, programasDeleteArgs<ExtArgs>>): Prisma.Prisma__programasClient<runtime.Types.Result.GetResult<Prisma.$programasPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends programasUpdateArgs>(args: Prisma.SelectSubset<T, programasUpdateArgs<ExtArgs>>): Prisma.Prisma__programasClient<runtime.Types.Result.GetResult<Prisma.$programasPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends programasDeleteManyArgs>(args?: Prisma.SelectSubset<T, programasDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends programasUpdateManyArgs>(args: Prisma.SelectSubset<T, programasUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends programasUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, programasUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$programasPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends programasUpsertArgs>(args: Prisma.SelectSubset<T, programasUpsertArgs<ExtArgs>>): Prisma.Prisma__programasClient<runtime.Types.Result.GetResult<Prisma.$programasPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends programasCountArgs>(args?: Prisma.Subset<T, programasCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProgramasCountAggregateOutputType> : number>;
    aggregate<T extends ProgramasAggregateArgs>(args: Prisma.Subset<T, ProgramasAggregateArgs>): Prisma.PrismaPromise<GetProgramasAggregateType<T>>;
    groupBy<T extends programasGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: programasGroupByArgs['orderBy'];
    } : {
        orderBy?: programasGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, programasGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProgramasGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: programasFieldRefs;
}
export interface Prisma__programasClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    grupos<T extends Prisma.programas$gruposArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.programas$gruposArgs<ExtArgs>>): Prisma.Prisma__gruposClient<runtime.Types.Result.GetResult<Prisma.$gruposPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    subprogramas<T extends Prisma.programas$subprogramasArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.programas$subprogramasArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$subprogramasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface programasFieldRefs {
    readonly id: Prisma.FieldRef<"programas", 'Int'>;
    readonly id_grupo: Prisma.FieldRef<"programas", 'Int'>;
    readonly nombre: Prisma.FieldRef<"programas", 'String'>;
}
export type programasFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.programasSelect<ExtArgs> | null;
    omit?: Prisma.programasOmit<ExtArgs> | null;
    include?: Prisma.programasInclude<ExtArgs> | null;
    where: Prisma.programasWhereUniqueInput;
};
export type programasFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.programasSelect<ExtArgs> | null;
    omit?: Prisma.programasOmit<ExtArgs> | null;
    include?: Prisma.programasInclude<ExtArgs> | null;
    where: Prisma.programasWhereUniqueInput;
};
export type programasFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.programasSelect<ExtArgs> | null;
    omit?: Prisma.programasOmit<ExtArgs> | null;
    include?: Prisma.programasInclude<ExtArgs> | null;
    where?: Prisma.programasWhereInput;
    orderBy?: Prisma.programasOrderByWithRelationInput | Prisma.programasOrderByWithRelationInput[];
    cursor?: Prisma.programasWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProgramasScalarFieldEnum | Prisma.ProgramasScalarFieldEnum[];
};
export type programasFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.programasSelect<ExtArgs> | null;
    omit?: Prisma.programasOmit<ExtArgs> | null;
    include?: Prisma.programasInclude<ExtArgs> | null;
    where?: Prisma.programasWhereInput;
    orderBy?: Prisma.programasOrderByWithRelationInput | Prisma.programasOrderByWithRelationInput[];
    cursor?: Prisma.programasWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProgramasScalarFieldEnum | Prisma.ProgramasScalarFieldEnum[];
};
export type programasFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.programasSelect<ExtArgs> | null;
    omit?: Prisma.programasOmit<ExtArgs> | null;
    include?: Prisma.programasInclude<ExtArgs> | null;
    where?: Prisma.programasWhereInput;
    orderBy?: Prisma.programasOrderByWithRelationInput | Prisma.programasOrderByWithRelationInput[];
    cursor?: Prisma.programasWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProgramasScalarFieldEnum | Prisma.ProgramasScalarFieldEnum[];
};
export type programasCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.programasSelect<ExtArgs> | null;
    omit?: Prisma.programasOmit<ExtArgs> | null;
    include?: Prisma.programasInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.programasCreateInput, Prisma.programasUncheckedCreateInput>;
};
export type programasCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.programasCreateManyInput | Prisma.programasCreateManyInput[];
    skipDuplicates?: boolean;
};
export type programasCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.programasSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.programasOmit<ExtArgs> | null;
    data: Prisma.programasCreateManyInput | Prisma.programasCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.programasIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type programasUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.programasSelect<ExtArgs> | null;
    omit?: Prisma.programasOmit<ExtArgs> | null;
    include?: Prisma.programasInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.programasUpdateInput, Prisma.programasUncheckedUpdateInput>;
    where: Prisma.programasWhereUniqueInput;
};
export type programasUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.programasUpdateManyMutationInput, Prisma.programasUncheckedUpdateManyInput>;
    where?: Prisma.programasWhereInput;
    limit?: number;
};
export type programasUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.programasSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.programasOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.programasUpdateManyMutationInput, Prisma.programasUncheckedUpdateManyInput>;
    where?: Prisma.programasWhereInput;
    limit?: number;
    include?: Prisma.programasIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type programasUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.programasSelect<ExtArgs> | null;
    omit?: Prisma.programasOmit<ExtArgs> | null;
    include?: Prisma.programasInclude<ExtArgs> | null;
    where: Prisma.programasWhereUniqueInput;
    create: Prisma.XOR<Prisma.programasCreateInput, Prisma.programasUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.programasUpdateInput, Prisma.programasUncheckedUpdateInput>;
};
export type programasDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.programasSelect<ExtArgs> | null;
    omit?: Prisma.programasOmit<ExtArgs> | null;
    include?: Prisma.programasInclude<ExtArgs> | null;
    where: Prisma.programasWhereUniqueInput;
};
export type programasDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.programasWhereInput;
    limit?: number;
};
export type programas$gruposArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.gruposSelect<ExtArgs> | null;
    omit?: Prisma.gruposOmit<ExtArgs> | null;
    include?: Prisma.gruposInclude<ExtArgs> | null;
    where?: Prisma.gruposWhereInput;
};
export type programas$subprogramasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.subprogramasSelect<ExtArgs> | null;
    omit?: Prisma.subprogramasOmit<ExtArgs> | null;
    include?: Prisma.subprogramasInclude<ExtArgs> | null;
    where?: Prisma.subprogramasWhereInput;
    orderBy?: Prisma.subprogramasOrderByWithRelationInput | Prisma.subprogramasOrderByWithRelationInput[];
    cursor?: Prisma.subprogramasWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SubprogramasScalarFieldEnum | Prisma.SubprogramasScalarFieldEnum[];
};
export type programasDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.programasSelect<ExtArgs> | null;
    omit?: Prisma.programasOmit<ExtArgs> | null;
    include?: Prisma.programasInclude<ExtArgs> | null;
};
