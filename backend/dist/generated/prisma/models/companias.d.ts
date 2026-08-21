import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type companiasModel = runtime.Types.Result.DefaultSelection<Prisma.$companiasPayload>;
export type AggregateCompanias = {
    _count: CompaniasCountAggregateOutputType | null;
    _avg: CompaniasAvgAggregateOutputType | null;
    _sum: CompaniasSumAggregateOutputType | null;
    _min: CompaniasMinAggregateOutputType | null;
    _max: CompaniasMaxAggregateOutputType | null;
};
export type CompaniasAvgAggregateOutputType = {
    id: number | null;
};
export type CompaniasSumAggregateOutputType = {
    id: number | null;
};
export type CompaniasMinAggregateOutputType = {
    id: number | null;
    nombre: string | null;
    activa: boolean | null;
};
export type CompaniasMaxAggregateOutputType = {
    id: number | null;
    nombre: string | null;
    activa: boolean | null;
};
export type CompaniasCountAggregateOutputType = {
    id: number;
    nombre: number;
    activa: number;
    _all: number;
};
export type CompaniasAvgAggregateInputType = {
    id?: true;
};
export type CompaniasSumAggregateInputType = {
    id?: true;
};
export type CompaniasMinAggregateInputType = {
    id?: true;
    nombre?: true;
    activa?: true;
};
export type CompaniasMaxAggregateInputType = {
    id?: true;
    nombre?: true;
    activa?: true;
};
export type CompaniasCountAggregateInputType = {
    id?: true;
    nombre?: true;
    activa?: true;
    _all?: true;
};
export type CompaniasAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.companiasWhereInput;
    orderBy?: Prisma.companiasOrderByWithRelationInput | Prisma.companiasOrderByWithRelationInput[];
    cursor?: Prisma.companiasWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CompaniasCountAggregateInputType;
    _avg?: CompaniasAvgAggregateInputType;
    _sum?: CompaniasSumAggregateInputType;
    _min?: CompaniasMinAggregateInputType;
    _max?: CompaniasMaxAggregateInputType;
};
export type GetCompaniasAggregateType<T extends CompaniasAggregateArgs> = {
    [P in keyof T & keyof AggregateCompanias]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCompanias[P]> : Prisma.GetScalarType<T[P], AggregateCompanias[P]>;
};
export type companiasGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.companiasWhereInput;
    orderBy?: Prisma.companiasOrderByWithAggregationInput | Prisma.companiasOrderByWithAggregationInput[];
    by: Prisma.CompaniasScalarFieldEnum[] | Prisma.CompaniasScalarFieldEnum;
    having?: Prisma.companiasScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CompaniasCountAggregateInputType | true;
    _avg?: CompaniasAvgAggregateInputType;
    _sum?: CompaniasSumAggregateInputType;
    _min?: CompaniasMinAggregateInputType;
    _max?: CompaniasMaxAggregateInputType;
};
export type CompaniasGroupByOutputType = {
    id: number;
    nombre: string;
    activa: boolean | null;
    _count: CompaniasCountAggregateOutputType | null;
    _avg: CompaniasAvgAggregateOutputType | null;
    _sum: CompaniasSumAggregateOutputType | null;
    _min: CompaniasMinAggregateOutputType | null;
    _max: CompaniasMaxAggregateOutputType | null;
};
export type GetCompaniasGroupByPayload<T extends companiasGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CompaniasGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CompaniasGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CompaniasGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CompaniasGroupByOutputType[P]>;
}>>;
export type companiasWhereInput = {
    AND?: Prisma.companiasWhereInput | Prisma.companiasWhereInput[];
    OR?: Prisma.companiasWhereInput[];
    NOT?: Prisma.companiasWhereInput | Prisma.companiasWhereInput[];
    id?: Prisma.IntFilter<"companias"> | number;
    nombre?: Prisma.StringFilter<"companias"> | string;
    activa?: Prisma.BoolNullableFilter<"companias"> | boolean | null;
    proyectos?: Prisma.ProyectosListRelationFilter;
    usuario_roles_compania?: Prisma.Usuario_roles_companiaListRelationFilter;
};
export type companiasOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    activa?: Prisma.SortOrderInput | Prisma.SortOrder;
    proyectos?: Prisma.proyectosOrderByRelationAggregateInput;
    usuario_roles_compania?: Prisma.usuario_roles_companiaOrderByRelationAggregateInput;
};
export type companiasWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    nombre?: string;
    AND?: Prisma.companiasWhereInput | Prisma.companiasWhereInput[];
    OR?: Prisma.companiasWhereInput[];
    NOT?: Prisma.companiasWhereInput | Prisma.companiasWhereInput[];
    activa?: Prisma.BoolNullableFilter<"companias"> | boolean | null;
    proyectos?: Prisma.ProyectosListRelationFilter;
    usuario_roles_compania?: Prisma.Usuario_roles_companiaListRelationFilter;
}, "id" | "nombre">;
export type companiasOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    activa?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.companiasCountOrderByAggregateInput;
    _avg?: Prisma.companiasAvgOrderByAggregateInput;
    _max?: Prisma.companiasMaxOrderByAggregateInput;
    _min?: Prisma.companiasMinOrderByAggregateInput;
    _sum?: Prisma.companiasSumOrderByAggregateInput;
};
export type companiasScalarWhereWithAggregatesInput = {
    AND?: Prisma.companiasScalarWhereWithAggregatesInput | Prisma.companiasScalarWhereWithAggregatesInput[];
    OR?: Prisma.companiasScalarWhereWithAggregatesInput[];
    NOT?: Prisma.companiasScalarWhereWithAggregatesInput | Prisma.companiasScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"companias"> | number;
    nombre?: Prisma.StringWithAggregatesFilter<"companias"> | string;
    activa?: Prisma.BoolNullableWithAggregatesFilter<"companias"> | boolean | null;
};
export type companiasCreateInput = {
    nombre: string;
    activa?: boolean | null;
    proyectos?: Prisma.proyectosCreateNestedManyWithoutCompaniasInput;
    usuario_roles_compania?: Prisma.usuario_roles_companiaCreateNestedManyWithoutCompaniasInput;
};
export type companiasUncheckedCreateInput = {
    id?: number;
    nombre: string;
    activa?: boolean | null;
    proyectos?: Prisma.proyectosUncheckedCreateNestedManyWithoutCompaniasInput;
    usuario_roles_compania?: Prisma.usuario_roles_companiaUncheckedCreateNestedManyWithoutCompaniasInput;
};
export type companiasUpdateInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    activa?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    proyectos?: Prisma.proyectosUpdateManyWithoutCompaniasNestedInput;
    usuario_roles_compania?: Prisma.usuario_roles_companiaUpdateManyWithoutCompaniasNestedInput;
};
export type companiasUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    activa?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    proyectos?: Prisma.proyectosUncheckedUpdateManyWithoutCompaniasNestedInput;
    usuario_roles_compania?: Prisma.usuario_roles_companiaUncheckedUpdateManyWithoutCompaniasNestedInput;
};
export type companiasCreateManyInput = {
    id?: number;
    nombre: string;
    activa?: boolean | null;
};
export type companiasUpdateManyMutationInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    activa?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
};
export type companiasUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    activa?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
};
export type companiasCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    activa?: Prisma.SortOrder;
};
export type companiasAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type companiasMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    activa?: Prisma.SortOrder;
};
export type companiasMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    activa?: Prisma.SortOrder;
};
export type companiasSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type CompaniasNullableScalarRelationFilter = {
    is?: Prisma.companiasWhereInput | null;
    isNot?: Prisma.companiasWhereInput | null;
};
export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null;
};
export type companiasCreateNestedOneWithoutProyectosInput = {
    create?: Prisma.XOR<Prisma.companiasCreateWithoutProyectosInput, Prisma.companiasUncheckedCreateWithoutProyectosInput>;
    connectOrCreate?: Prisma.companiasCreateOrConnectWithoutProyectosInput;
    connect?: Prisma.companiasWhereUniqueInput;
};
export type companiasUpdateOneWithoutProyectosNestedInput = {
    create?: Prisma.XOR<Prisma.companiasCreateWithoutProyectosInput, Prisma.companiasUncheckedCreateWithoutProyectosInput>;
    connectOrCreate?: Prisma.companiasCreateOrConnectWithoutProyectosInput;
    upsert?: Prisma.companiasUpsertWithoutProyectosInput;
    disconnect?: Prisma.companiasWhereInput | boolean;
    delete?: Prisma.companiasWhereInput | boolean;
    connect?: Prisma.companiasWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.companiasUpdateToOneWithWhereWithoutProyectosInput, Prisma.companiasUpdateWithoutProyectosInput>, Prisma.companiasUncheckedUpdateWithoutProyectosInput>;
};
export type companiasCreateNestedOneWithoutUsuario_roles_companiaInput = {
    create?: Prisma.XOR<Prisma.companiasCreateWithoutUsuario_roles_companiaInput, Prisma.companiasUncheckedCreateWithoutUsuario_roles_companiaInput>;
    connectOrCreate?: Prisma.companiasCreateOrConnectWithoutUsuario_roles_companiaInput;
    connect?: Prisma.companiasWhereUniqueInput;
};
export type companiasUpdateOneWithoutUsuario_roles_companiaNestedInput = {
    create?: Prisma.XOR<Prisma.companiasCreateWithoutUsuario_roles_companiaInput, Prisma.companiasUncheckedCreateWithoutUsuario_roles_companiaInput>;
    connectOrCreate?: Prisma.companiasCreateOrConnectWithoutUsuario_roles_companiaInput;
    upsert?: Prisma.companiasUpsertWithoutUsuario_roles_companiaInput;
    disconnect?: Prisma.companiasWhereInput | boolean;
    delete?: Prisma.companiasWhereInput | boolean;
    connect?: Prisma.companiasWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.companiasUpdateToOneWithWhereWithoutUsuario_roles_companiaInput, Prisma.companiasUpdateWithoutUsuario_roles_companiaInput>, Prisma.companiasUncheckedUpdateWithoutUsuario_roles_companiaInput>;
};
export type companiasCreateWithoutProyectosInput = {
    nombre: string;
    activa?: boolean | null;
    usuario_roles_compania?: Prisma.usuario_roles_companiaCreateNestedManyWithoutCompaniasInput;
};
export type companiasUncheckedCreateWithoutProyectosInput = {
    id?: number;
    nombre: string;
    activa?: boolean | null;
    usuario_roles_compania?: Prisma.usuario_roles_companiaUncheckedCreateNestedManyWithoutCompaniasInput;
};
export type companiasCreateOrConnectWithoutProyectosInput = {
    where: Prisma.companiasWhereUniqueInput;
    create: Prisma.XOR<Prisma.companiasCreateWithoutProyectosInput, Prisma.companiasUncheckedCreateWithoutProyectosInput>;
};
export type companiasUpsertWithoutProyectosInput = {
    update: Prisma.XOR<Prisma.companiasUpdateWithoutProyectosInput, Prisma.companiasUncheckedUpdateWithoutProyectosInput>;
    create: Prisma.XOR<Prisma.companiasCreateWithoutProyectosInput, Prisma.companiasUncheckedCreateWithoutProyectosInput>;
    where?: Prisma.companiasWhereInput;
};
export type companiasUpdateToOneWithWhereWithoutProyectosInput = {
    where?: Prisma.companiasWhereInput;
    data: Prisma.XOR<Prisma.companiasUpdateWithoutProyectosInput, Prisma.companiasUncheckedUpdateWithoutProyectosInput>;
};
export type companiasUpdateWithoutProyectosInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    activa?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    usuario_roles_compania?: Prisma.usuario_roles_companiaUpdateManyWithoutCompaniasNestedInput;
};
export type companiasUncheckedUpdateWithoutProyectosInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    activa?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    usuario_roles_compania?: Prisma.usuario_roles_companiaUncheckedUpdateManyWithoutCompaniasNestedInput;
};
export type companiasCreateWithoutUsuario_roles_companiaInput = {
    nombre: string;
    activa?: boolean | null;
    proyectos?: Prisma.proyectosCreateNestedManyWithoutCompaniasInput;
};
export type companiasUncheckedCreateWithoutUsuario_roles_companiaInput = {
    id?: number;
    nombre: string;
    activa?: boolean | null;
    proyectos?: Prisma.proyectosUncheckedCreateNestedManyWithoutCompaniasInput;
};
export type companiasCreateOrConnectWithoutUsuario_roles_companiaInput = {
    where: Prisma.companiasWhereUniqueInput;
    create: Prisma.XOR<Prisma.companiasCreateWithoutUsuario_roles_companiaInput, Prisma.companiasUncheckedCreateWithoutUsuario_roles_companiaInput>;
};
export type companiasUpsertWithoutUsuario_roles_companiaInput = {
    update: Prisma.XOR<Prisma.companiasUpdateWithoutUsuario_roles_companiaInput, Prisma.companiasUncheckedUpdateWithoutUsuario_roles_companiaInput>;
    create: Prisma.XOR<Prisma.companiasCreateWithoutUsuario_roles_companiaInput, Prisma.companiasUncheckedCreateWithoutUsuario_roles_companiaInput>;
    where?: Prisma.companiasWhereInput;
};
export type companiasUpdateToOneWithWhereWithoutUsuario_roles_companiaInput = {
    where?: Prisma.companiasWhereInput;
    data: Prisma.XOR<Prisma.companiasUpdateWithoutUsuario_roles_companiaInput, Prisma.companiasUncheckedUpdateWithoutUsuario_roles_companiaInput>;
};
export type companiasUpdateWithoutUsuario_roles_companiaInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    activa?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    proyectos?: Prisma.proyectosUpdateManyWithoutCompaniasNestedInput;
};
export type companiasUncheckedUpdateWithoutUsuario_roles_companiaInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    activa?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    proyectos?: Prisma.proyectosUncheckedUpdateManyWithoutCompaniasNestedInput;
};
export type CompaniasCountOutputType = {
    proyectos: number;
    usuario_roles_compania: number;
};
export type CompaniasCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    proyectos?: boolean | CompaniasCountOutputTypeCountProyectosArgs;
    usuario_roles_compania?: boolean | CompaniasCountOutputTypeCountUsuario_roles_companiaArgs;
};
export type CompaniasCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompaniasCountOutputTypeSelect<ExtArgs> | null;
};
export type CompaniasCountOutputTypeCountProyectosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.proyectosWhereInput;
};
export type CompaniasCountOutputTypeCountUsuario_roles_companiaArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.usuario_roles_companiaWhereInput;
};
export type companiasSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nombre?: boolean;
    activa?: boolean;
    proyectos?: boolean | Prisma.companias$proyectosArgs<ExtArgs>;
    usuario_roles_compania?: boolean | Prisma.companias$usuario_roles_companiaArgs<ExtArgs>;
    _count?: boolean | Prisma.CompaniasCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["companias"]>;
export type companiasSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nombre?: boolean;
    activa?: boolean;
}, ExtArgs["result"]["companias"]>;
export type companiasSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nombre?: boolean;
    activa?: boolean;
}, ExtArgs["result"]["companias"]>;
export type companiasSelectScalar = {
    id?: boolean;
    nombre?: boolean;
    activa?: boolean;
};
export type companiasOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "nombre" | "activa", ExtArgs["result"]["companias"]>;
export type companiasInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    proyectos?: boolean | Prisma.companias$proyectosArgs<ExtArgs>;
    usuario_roles_compania?: boolean | Prisma.companias$usuario_roles_companiaArgs<ExtArgs>;
    _count?: boolean | Prisma.CompaniasCountOutputTypeDefaultArgs<ExtArgs>;
};
export type companiasIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type companiasIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $companiasPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "companias";
    objects: {
        proyectos: Prisma.$proyectosPayload<ExtArgs>[];
        usuario_roles_compania: Prisma.$usuario_roles_companiaPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        nombre: string;
        activa: boolean | null;
    }, ExtArgs["result"]["companias"]>;
    composites: {};
};
export type companiasGetPayload<S extends boolean | null | undefined | companiasDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$companiasPayload, S>;
export type companiasCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<companiasFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CompaniasCountAggregateInputType | true;
};
export interface companiasDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['companias'];
        meta: {
            name: 'companias';
        };
    };
    findUnique<T extends companiasFindUniqueArgs>(args: Prisma.SelectSubset<T, companiasFindUniqueArgs<ExtArgs>>): Prisma.Prisma__companiasClient<runtime.Types.Result.GetResult<Prisma.$companiasPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends companiasFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, companiasFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__companiasClient<runtime.Types.Result.GetResult<Prisma.$companiasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends companiasFindFirstArgs>(args?: Prisma.SelectSubset<T, companiasFindFirstArgs<ExtArgs>>): Prisma.Prisma__companiasClient<runtime.Types.Result.GetResult<Prisma.$companiasPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends companiasFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, companiasFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__companiasClient<runtime.Types.Result.GetResult<Prisma.$companiasPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends companiasFindManyArgs>(args?: Prisma.SelectSubset<T, companiasFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$companiasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends companiasCreateArgs>(args: Prisma.SelectSubset<T, companiasCreateArgs<ExtArgs>>): Prisma.Prisma__companiasClient<runtime.Types.Result.GetResult<Prisma.$companiasPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends companiasCreateManyArgs>(args?: Prisma.SelectSubset<T, companiasCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends companiasCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, companiasCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$companiasPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends companiasDeleteArgs>(args: Prisma.SelectSubset<T, companiasDeleteArgs<ExtArgs>>): Prisma.Prisma__companiasClient<runtime.Types.Result.GetResult<Prisma.$companiasPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends companiasUpdateArgs>(args: Prisma.SelectSubset<T, companiasUpdateArgs<ExtArgs>>): Prisma.Prisma__companiasClient<runtime.Types.Result.GetResult<Prisma.$companiasPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends companiasDeleteManyArgs>(args?: Prisma.SelectSubset<T, companiasDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends companiasUpdateManyArgs>(args: Prisma.SelectSubset<T, companiasUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends companiasUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, companiasUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$companiasPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends companiasUpsertArgs>(args: Prisma.SelectSubset<T, companiasUpsertArgs<ExtArgs>>): Prisma.Prisma__companiasClient<runtime.Types.Result.GetResult<Prisma.$companiasPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends companiasCountArgs>(args?: Prisma.Subset<T, companiasCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CompaniasCountAggregateOutputType> : number>;
    aggregate<T extends CompaniasAggregateArgs>(args: Prisma.Subset<T, CompaniasAggregateArgs>): Prisma.PrismaPromise<GetCompaniasAggregateType<T>>;
    groupBy<T extends companiasGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: companiasGroupByArgs['orderBy'];
    } : {
        orderBy?: companiasGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, companiasGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompaniasGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: companiasFieldRefs;
}
export interface Prisma__companiasClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    proyectos<T extends Prisma.companias$proyectosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.companias$proyectosArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$proyectosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    usuario_roles_compania<T extends Prisma.companias$usuario_roles_companiaArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.companias$usuario_roles_companiaArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$usuario_roles_companiaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface companiasFieldRefs {
    readonly id: Prisma.FieldRef<"companias", 'Int'>;
    readonly nombre: Prisma.FieldRef<"companias", 'String'>;
    readonly activa: Prisma.FieldRef<"companias", 'Boolean'>;
}
export type companiasFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.companiasSelect<ExtArgs> | null;
    omit?: Prisma.companiasOmit<ExtArgs> | null;
    include?: Prisma.companiasInclude<ExtArgs> | null;
    where: Prisma.companiasWhereUniqueInput;
};
export type companiasFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.companiasSelect<ExtArgs> | null;
    omit?: Prisma.companiasOmit<ExtArgs> | null;
    include?: Prisma.companiasInclude<ExtArgs> | null;
    where: Prisma.companiasWhereUniqueInput;
};
export type companiasFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.companiasSelect<ExtArgs> | null;
    omit?: Prisma.companiasOmit<ExtArgs> | null;
    include?: Prisma.companiasInclude<ExtArgs> | null;
    where?: Prisma.companiasWhereInput;
    orderBy?: Prisma.companiasOrderByWithRelationInput | Prisma.companiasOrderByWithRelationInput[];
    cursor?: Prisma.companiasWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CompaniasScalarFieldEnum | Prisma.CompaniasScalarFieldEnum[];
};
export type companiasFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.companiasSelect<ExtArgs> | null;
    omit?: Prisma.companiasOmit<ExtArgs> | null;
    include?: Prisma.companiasInclude<ExtArgs> | null;
    where?: Prisma.companiasWhereInput;
    orderBy?: Prisma.companiasOrderByWithRelationInput | Prisma.companiasOrderByWithRelationInput[];
    cursor?: Prisma.companiasWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CompaniasScalarFieldEnum | Prisma.CompaniasScalarFieldEnum[];
};
export type companiasFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.companiasSelect<ExtArgs> | null;
    omit?: Prisma.companiasOmit<ExtArgs> | null;
    include?: Prisma.companiasInclude<ExtArgs> | null;
    where?: Prisma.companiasWhereInput;
    orderBy?: Prisma.companiasOrderByWithRelationInput | Prisma.companiasOrderByWithRelationInput[];
    cursor?: Prisma.companiasWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CompaniasScalarFieldEnum | Prisma.CompaniasScalarFieldEnum[];
};
export type companiasCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.companiasSelect<ExtArgs> | null;
    omit?: Prisma.companiasOmit<ExtArgs> | null;
    include?: Prisma.companiasInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.companiasCreateInput, Prisma.companiasUncheckedCreateInput>;
};
export type companiasCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.companiasCreateManyInput | Prisma.companiasCreateManyInput[];
    skipDuplicates?: boolean;
};
export type companiasCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.companiasSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.companiasOmit<ExtArgs> | null;
    data: Prisma.companiasCreateManyInput | Prisma.companiasCreateManyInput[];
    skipDuplicates?: boolean;
};
export type companiasUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.companiasSelect<ExtArgs> | null;
    omit?: Prisma.companiasOmit<ExtArgs> | null;
    include?: Prisma.companiasInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.companiasUpdateInput, Prisma.companiasUncheckedUpdateInput>;
    where: Prisma.companiasWhereUniqueInput;
};
export type companiasUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.companiasUpdateManyMutationInput, Prisma.companiasUncheckedUpdateManyInput>;
    where?: Prisma.companiasWhereInput;
    limit?: number;
};
export type companiasUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.companiasSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.companiasOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.companiasUpdateManyMutationInput, Prisma.companiasUncheckedUpdateManyInput>;
    where?: Prisma.companiasWhereInput;
    limit?: number;
};
export type companiasUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.companiasSelect<ExtArgs> | null;
    omit?: Prisma.companiasOmit<ExtArgs> | null;
    include?: Prisma.companiasInclude<ExtArgs> | null;
    where: Prisma.companiasWhereUniqueInput;
    create: Prisma.XOR<Prisma.companiasCreateInput, Prisma.companiasUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.companiasUpdateInput, Prisma.companiasUncheckedUpdateInput>;
};
export type companiasDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.companiasSelect<ExtArgs> | null;
    omit?: Prisma.companiasOmit<ExtArgs> | null;
    include?: Prisma.companiasInclude<ExtArgs> | null;
    where: Prisma.companiasWhereUniqueInput;
};
export type companiasDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.companiasWhereInput;
    limit?: number;
};
export type companias$proyectosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type companias$usuario_roles_companiaArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usuario_roles_companiaSelect<ExtArgs> | null;
    omit?: Prisma.usuario_roles_companiaOmit<ExtArgs> | null;
    include?: Prisma.usuario_roles_companiaInclude<ExtArgs> | null;
    where?: Prisma.usuario_roles_companiaWhereInput;
    orderBy?: Prisma.usuario_roles_companiaOrderByWithRelationInput | Prisma.usuario_roles_companiaOrderByWithRelationInput[];
    cursor?: Prisma.usuario_roles_companiaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Usuario_roles_companiaScalarFieldEnum | Prisma.Usuario_roles_companiaScalarFieldEnum[];
};
export type companiasDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.companiasSelect<ExtArgs> | null;
    omit?: Prisma.companiasOmit<ExtArgs> | null;
    include?: Prisma.companiasInclude<ExtArgs> | null;
};
