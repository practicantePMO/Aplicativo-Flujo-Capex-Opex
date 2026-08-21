import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type gruposModel = runtime.Types.Result.DefaultSelection<Prisma.$gruposPayload>;
export type AggregateGrupos = {
    _count: GruposCountAggregateOutputType | null;
    _avg: GruposAvgAggregateOutputType | null;
    _sum: GruposSumAggregateOutputType | null;
    _min: GruposMinAggregateOutputType | null;
    _max: GruposMaxAggregateOutputType | null;
};
export type GruposAvgAggregateOutputType = {
    id: number | null;
};
export type GruposSumAggregateOutputType = {
    id: number | null;
};
export type GruposMinAggregateOutputType = {
    id: number | null;
    nombre: string | null;
};
export type GruposMaxAggregateOutputType = {
    id: number | null;
    nombre: string | null;
};
export type GruposCountAggregateOutputType = {
    id: number;
    nombre: number;
    _all: number;
};
export type GruposAvgAggregateInputType = {
    id?: true;
};
export type GruposSumAggregateInputType = {
    id?: true;
};
export type GruposMinAggregateInputType = {
    id?: true;
    nombre?: true;
};
export type GruposMaxAggregateInputType = {
    id?: true;
    nombre?: true;
};
export type GruposCountAggregateInputType = {
    id?: true;
    nombre?: true;
    _all?: true;
};
export type GruposAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.gruposWhereInput;
    orderBy?: Prisma.gruposOrderByWithRelationInput | Prisma.gruposOrderByWithRelationInput[];
    cursor?: Prisma.gruposWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | GruposCountAggregateInputType;
    _avg?: GruposAvgAggregateInputType;
    _sum?: GruposSumAggregateInputType;
    _min?: GruposMinAggregateInputType;
    _max?: GruposMaxAggregateInputType;
};
export type GetGruposAggregateType<T extends GruposAggregateArgs> = {
    [P in keyof T & keyof AggregateGrupos]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateGrupos[P]> : Prisma.GetScalarType<T[P], AggregateGrupos[P]>;
};
export type gruposGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.gruposWhereInput;
    orderBy?: Prisma.gruposOrderByWithAggregationInput | Prisma.gruposOrderByWithAggregationInput[];
    by: Prisma.GruposScalarFieldEnum[] | Prisma.GruposScalarFieldEnum;
    having?: Prisma.gruposScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: GruposCountAggregateInputType | true;
    _avg?: GruposAvgAggregateInputType;
    _sum?: GruposSumAggregateInputType;
    _min?: GruposMinAggregateInputType;
    _max?: GruposMaxAggregateInputType;
};
export type GruposGroupByOutputType = {
    id: number;
    nombre: string;
    _count: GruposCountAggregateOutputType | null;
    _avg: GruposAvgAggregateOutputType | null;
    _sum: GruposSumAggregateOutputType | null;
    _min: GruposMinAggregateOutputType | null;
    _max: GruposMaxAggregateOutputType | null;
};
export type GetGruposGroupByPayload<T extends gruposGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<GruposGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof GruposGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], GruposGroupByOutputType[P]> : Prisma.GetScalarType<T[P], GruposGroupByOutputType[P]>;
}>>;
export type gruposWhereInput = {
    AND?: Prisma.gruposWhereInput | Prisma.gruposWhereInput[];
    OR?: Prisma.gruposWhereInput[];
    NOT?: Prisma.gruposWhereInput | Prisma.gruposWhereInput[];
    id?: Prisma.IntFilter<"grupos"> | number;
    nombre?: Prisma.StringFilter<"grupos"> | string;
    programas?: Prisma.ProgramasListRelationFilter;
};
export type gruposOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    programas?: Prisma.programasOrderByRelationAggregateInput;
};
export type gruposWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.gruposWhereInput | Prisma.gruposWhereInput[];
    OR?: Prisma.gruposWhereInput[];
    NOT?: Prisma.gruposWhereInput | Prisma.gruposWhereInput[];
    nombre?: Prisma.StringFilter<"grupos"> | string;
    programas?: Prisma.ProgramasListRelationFilter;
}, "id">;
export type gruposOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    _count?: Prisma.gruposCountOrderByAggregateInput;
    _avg?: Prisma.gruposAvgOrderByAggregateInput;
    _max?: Prisma.gruposMaxOrderByAggregateInput;
    _min?: Prisma.gruposMinOrderByAggregateInput;
    _sum?: Prisma.gruposSumOrderByAggregateInput;
};
export type gruposScalarWhereWithAggregatesInput = {
    AND?: Prisma.gruposScalarWhereWithAggregatesInput | Prisma.gruposScalarWhereWithAggregatesInput[];
    OR?: Prisma.gruposScalarWhereWithAggregatesInput[];
    NOT?: Prisma.gruposScalarWhereWithAggregatesInput | Prisma.gruposScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"grupos"> | number;
    nombre?: Prisma.StringWithAggregatesFilter<"grupos"> | string;
};
export type gruposCreateInput = {
    nombre: string;
    programas?: Prisma.programasCreateNestedManyWithoutGruposInput;
};
export type gruposUncheckedCreateInput = {
    id?: number;
    nombre: string;
    programas?: Prisma.programasUncheckedCreateNestedManyWithoutGruposInput;
};
export type gruposUpdateInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    programas?: Prisma.programasUpdateManyWithoutGruposNestedInput;
};
export type gruposUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    programas?: Prisma.programasUncheckedUpdateManyWithoutGruposNestedInput;
};
export type gruposCreateManyInput = {
    id?: number;
    nombre: string;
};
export type gruposUpdateManyMutationInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type gruposUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type gruposCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
};
export type gruposAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type gruposMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
};
export type gruposMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
};
export type gruposSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type GruposNullableScalarRelationFilter = {
    is?: Prisma.gruposWhereInput | null;
    isNot?: Prisma.gruposWhereInput | null;
};
export type gruposCreateNestedOneWithoutProgramasInput = {
    create?: Prisma.XOR<Prisma.gruposCreateWithoutProgramasInput, Prisma.gruposUncheckedCreateWithoutProgramasInput>;
    connectOrCreate?: Prisma.gruposCreateOrConnectWithoutProgramasInput;
    connect?: Prisma.gruposWhereUniqueInput;
};
export type gruposUpdateOneWithoutProgramasNestedInput = {
    create?: Prisma.XOR<Prisma.gruposCreateWithoutProgramasInput, Prisma.gruposUncheckedCreateWithoutProgramasInput>;
    connectOrCreate?: Prisma.gruposCreateOrConnectWithoutProgramasInput;
    upsert?: Prisma.gruposUpsertWithoutProgramasInput;
    disconnect?: Prisma.gruposWhereInput | boolean;
    delete?: Prisma.gruposWhereInput | boolean;
    connect?: Prisma.gruposWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.gruposUpdateToOneWithWhereWithoutProgramasInput, Prisma.gruposUpdateWithoutProgramasInput>, Prisma.gruposUncheckedUpdateWithoutProgramasInput>;
};
export type gruposCreateWithoutProgramasInput = {
    nombre: string;
};
export type gruposUncheckedCreateWithoutProgramasInput = {
    id?: number;
    nombre: string;
};
export type gruposCreateOrConnectWithoutProgramasInput = {
    where: Prisma.gruposWhereUniqueInput;
    create: Prisma.XOR<Prisma.gruposCreateWithoutProgramasInput, Prisma.gruposUncheckedCreateWithoutProgramasInput>;
};
export type gruposUpsertWithoutProgramasInput = {
    update: Prisma.XOR<Prisma.gruposUpdateWithoutProgramasInput, Prisma.gruposUncheckedUpdateWithoutProgramasInput>;
    create: Prisma.XOR<Prisma.gruposCreateWithoutProgramasInput, Prisma.gruposUncheckedCreateWithoutProgramasInput>;
    where?: Prisma.gruposWhereInput;
};
export type gruposUpdateToOneWithWhereWithoutProgramasInput = {
    where?: Prisma.gruposWhereInput;
    data: Prisma.XOR<Prisma.gruposUpdateWithoutProgramasInput, Prisma.gruposUncheckedUpdateWithoutProgramasInput>;
};
export type gruposUpdateWithoutProgramasInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type gruposUncheckedUpdateWithoutProgramasInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type GruposCountOutputType = {
    programas: number;
};
export type GruposCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    programas?: boolean | GruposCountOutputTypeCountProgramasArgs;
};
export type GruposCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GruposCountOutputTypeSelect<ExtArgs> | null;
};
export type GruposCountOutputTypeCountProgramasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.programasWhereInput;
};
export type gruposSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nombre?: boolean;
    programas?: boolean | Prisma.grupos$programasArgs<ExtArgs>;
    _count?: boolean | Prisma.GruposCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["grupos"]>;
export type gruposSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nombre?: boolean;
}, ExtArgs["result"]["grupos"]>;
export type gruposSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nombre?: boolean;
}, ExtArgs["result"]["grupos"]>;
export type gruposSelectScalar = {
    id?: boolean;
    nombre?: boolean;
};
export type gruposOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "nombre", ExtArgs["result"]["grupos"]>;
export type gruposInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    programas?: boolean | Prisma.grupos$programasArgs<ExtArgs>;
    _count?: boolean | Prisma.GruposCountOutputTypeDefaultArgs<ExtArgs>;
};
export type gruposIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type gruposIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $gruposPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "grupos";
    objects: {
        programas: Prisma.$programasPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        nombre: string;
    }, ExtArgs["result"]["grupos"]>;
    composites: {};
};
export type gruposGetPayload<S extends boolean | null | undefined | gruposDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$gruposPayload, S>;
export type gruposCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<gruposFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: GruposCountAggregateInputType | true;
};
export interface gruposDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['grupos'];
        meta: {
            name: 'grupos';
        };
    };
    findUnique<T extends gruposFindUniqueArgs>(args: Prisma.SelectSubset<T, gruposFindUniqueArgs<ExtArgs>>): Prisma.Prisma__gruposClient<runtime.Types.Result.GetResult<Prisma.$gruposPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends gruposFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, gruposFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__gruposClient<runtime.Types.Result.GetResult<Prisma.$gruposPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends gruposFindFirstArgs>(args?: Prisma.SelectSubset<T, gruposFindFirstArgs<ExtArgs>>): Prisma.Prisma__gruposClient<runtime.Types.Result.GetResult<Prisma.$gruposPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends gruposFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, gruposFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__gruposClient<runtime.Types.Result.GetResult<Prisma.$gruposPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends gruposFindManyArgs>(args?: Prisma.SelectSubset<T, gruposFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$gruposPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends gruposCreateArgs>(args: Prisma.SelectSubset<T, gruposCreateArgs<ExtArgs>>): Prisma.Prisma__gruposClient<runtime.Types.Result.GetResult<Prisma.$gruposPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends gruposCreateManyArgs>(args?: Prisma.SelectSubset<T, gruposCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends gruposCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, gruposCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$gruposPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends gruposDeleteArgs>(args: Prisma.SelectSubset<T, gruposDeleteArgs<ExtArgs>>): Prisma.Prisma__gruposClient<runtime.Types.Result.GetResult<Prisma.$gruposPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends gruposUpdateArgs>(args: Prisma.SelectSubset<T, gruposUpdateArgs<ExtArgs>>): Prisma.Prisma__gruposClient<runtime.Types.Result.GetResult<Prisma.$gruposPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends gruposDeleteManyArgs>(args?: Prisma.SelectSubset<T, gruposDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends gruposUpdateManyArgs>(args: Prisma.SelectSubset<T, gruposUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends gruposUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, gruposUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$gruposPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends gruposUpsertArgs>(args: Prisma.SelectSubset<T, gruposUpsertArgs<ExtArgs>>): Prisma.Prisma__gruposClient<runtime.Types.Result.GetResult<Prisma.$gruposPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends gruposCountArgs>(args?: Prisma.Subset<T, gruposCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], GruposCountAggregateOutputType> : number>;
    aggregate<T extends GruposAggregateArgs>(args: Prisma.Subset<T, GruposAggregateArgs>): Prisma.PrismaPromise<GetGruposAggregateType<T>>;
    groupBy<T extends gruposGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: gruposGroupByArgs['orderBy'];
    } : {
        orderBy?: gruposGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, gruposGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGruposGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: gruposFieldRefs;
}
export interface Prisma__gruposClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    programas<T extends Prisma.grupos$programasArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.grupos$programasArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$programasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface gruposFieldRefs {
    readonly id: Prisma.FieldRef<"grupos", 'Int'>;
    readonly nombre: Prisma.FieldRef<"grupos", 'String'>;
}
export type gruposFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.gruposSelect<ExtArgs> | null;
    omit?: Prisma.gruposOmit<ExtArgs> | null;
    include?: Prisma.gruposInclude<ExtArgs> | null;
    where: Prisma.gruposWhereUniqueInput;
};
export type gruposFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.gruposSelect<ExtArgs> | null;
    omit?: Prisma.gruposOmit<ExtArgs> | null;
    include?: Prisma.gruposInclude<ExtArgs> | null;
    where: Prisma.gruposWhereUniqueInput;
};
export type gruposFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.gruposSelect<ExtArgs> | null;
    omit?: Prisma.gruposOmit<ExtArgs> | null;
    include?: Prisma.gruposInclude<ExtArgs> | null;
    where?: Prisma.gruposWhereInput;
    orderBy?: Prisma.gruposOrderByWithRelationInput | Prisma.gruposOrderByWithRelationInput[];
    cursor?: Prisma.gruposWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GruposScalarFieldEnum | Prisma.GruposScalarFieldEnum[];
};
export type gruposFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.gruposSelect<ExtArgs> | null;
    omit?: Prisma.gruposOmit<ExtArgs> | null;
    include?: Prisma.gruposInclude<ExtArgs> | null;
    where?: Prisma.gruposWhereInput;
    orderBy?: Prisma.gruposOrderByWithRelationInput | Prisma.gruposOrderByWithRelationInput[];
    cursor?: Prisma.gruposWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GruposScalarFieldEnum | Prisma.GruposScalarFieldEnum[];
};
export type gruposFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.gruposSelect<ExtArgs> | null;
    omit?: Prisma.gruposOmit<ExtArgs> | null;
    include?: Prisma.gruposInclude<ExtArgs> | null;
    where?: Prisma.gruposWhereInput;
    orderBy?: Prisma.gruposOrderByWithRelationInput | Prisma.gruposOrderByWithRelationInput[];
    cursor?: Prisma.gruposWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GruposScalarFieldEnum | Prisma.GruposScalarFieldEnum[];
};
export type gruposCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.gruposSelect<ExtArgs> | null;
    omit?: Prisma.gruposOmit<ExtArgs> | null;
    include?: Prisma.gruposInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.gruposCreateInput, Prisma.gruposUncheckedCreateInput>;
};
export type gruposCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.gruposCreateManyInput | Prisma.gruposCreateManyInput[];
    skipDuplicates?: boolean;
};
export type gruposCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.gruposSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.gruposOmit<ExtArgs> | null;
    data: Prisma.gruposCreateManyInput | Prisma.gruposCreateManyInput[];
    skipDuplicates?: boolean;
};
export type gruposUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.gruposSelect<ExtArgs> | null;
    omit?: Prisma.gruposOmit<ExtArgs> | null;
    include?: Prisma.gruposInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.gruposUpdateInput, Prisma.gruposUncheckedUpdateInput>;
    where: Prisma.gruposWhereUniqueInput;
};
export type gruposUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.gruposUpdateManyMutationInput, Prisma.gruposUncheckedUpdateManyInput>;
    where?: Prisma.gruposWhereInput;
    limit?: number;
};
export type gruposUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.gruposSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.gruposOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.gruposUpdateManyMutationInput, Prisma.gruposUncheckedUpdateManyInput>;
    where?: Prisma.gruposWhereInput;
    limit?: number;
};
export type gruposUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.gruposSelect<ExtArgs> | null;
    omit?: Prisma.gruposOmit<ExtArgs> | null;
    include?: Prisma.gruposInclude<ExtArgs> | null;
    where: Prisma.gruposWhereUniqueInput;
    create: Prisma.XOR<Prisma.gruposCreateInput, Prisma.gruposUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.gruposUpdateInput, Prisma.gruposUncheckedUpdateInput>;
};
export type gruposDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.gruposSelect<ExtArgs> | null;
    omit?: Prisma.gruposOmit<ExtArgs> | null;
    include?: Prisma.gruposInclude<ExtArgs> | null;
    where: Prisma.gruposWhereUniqueInput;
};
export type gruposDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.gruposWhereInput;
    limit?: number;
};
export type grupos$programasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type gruposDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.gruposSelect<ExtArgs> | null;
    omit?: Prisma.gruposOmit<ExtArgs> | null;
    include?: Prisma.gruposInclude<ExtArgs> | null;
};
