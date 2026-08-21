import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type rolesModel = runtime.Types.Result.DefaultSelection<Prisma.$rolesPayload>;
export type AggregateRoles = {
    _count: RolesCountAggregateOutputType | null;
    _avg: RolesAvgAggregateOutputType | null;
    _sum: RolesSumAggregateOutputType | null;
    _min: RolesMinAggregateOutputType | null;
    _max: RolesMaxAggregateOutputType | null;
};
export type RolesAvgAggregateOutputType = {
    id: number | null;
};
export type RolesSumAggregateOutputType = {
    id: number | null;
};
export type RolesMinAggregateOutputType = {
    id: number | null;
    codigo: string | null;
    nombre: string | null;
};
export type RolesMaxAggregateOutputType = {
    id: number | null;
    codigo: string | null;
    nombre: string | null;
};
export type RolesCountAggregateOutputType = {
    id: number;
    codigo: number;
    nombre: number;
    _all: number;
};
export type RolesAvgAggregateInputType = {
    id?: true;
};
export type RolesSumAggregateInputType = {
    id?: true;
};
export type RolesMinAggregateInputType = {
    id?: true;
    codigo?: true;
    nombre?: true;
};
export type RolesMaxAggregateInputType = {
    id?: true;
    codigo?: true;
    nombre?: true;
};
export type RolesCountAggregateInputType = {
    id?: true;
    codigo?: true;
    nombre?: true;
    _all?: true;
};
export type RolesAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.rolesWhereInput;
    orderBy?: Prisma.rolesOrderByWithRelationInput | Prisma.rolesOrderByWithRelationInput[];
    cursor?: Prisma.rolesWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RolesCountAggregateInputType;
    _avg?: RolesAvgAggregateInputType;
    _sum?: RolesSumAggregateInputType;
    _min?: RolesMinAggregateInputType;
    _max?: RolesMaxAggregateInputType;
};
export type GetRolesAggregateType<T extends RolesAggregateArgs> = {
    [P in keyof T & keyof AggregateRoles]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRoles[P]> : Prisma.GetScalarType<T[P], AggregateRoles[P]>;
};
export type rolesGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.rolesWhereInput;
    orderBy?: Prisma.rolesOrderByWithAggregationInput | Prisma.rolesOrderByWithAggregationInput[];
    by: Prisma.RolesScalarFieldEnum[] | Prisma.RolesScalarFieldEnum;
    having?: Prisma.rolesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RolesCountAggregateInputType | true;
    _avg?: RolesAvgAggregateInputType;
    _sum?: RolesSumAggregateInputType;
    _min?: RolesMinAggregateInputType;
    _max?: RolesMaxAggregateInputType;
};
export type RolesGroupByOutputType = {
    id: number;
    codigo: string;
    nombre: string;
    _count: RolesCountAggregateOutputType | null;
    _avg: RolesAvgAggregateOutputType | null;
    _sum: RolesSumAggregateOutputType | null;
    _min: RolesMinAggregateOutputType | null;
    _max: RolesMaxAggregateOutputType | null;
};
export type GetRolesGroupByPayload<T extends rolesGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RolesGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RolesGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RolesGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RolesGroupByOutputType[P]>;
}>>;
export type rolesWhereInput = {
    AND?: Prisma.rolesWhereInput | Prisma.rolesWhereInput[];
    OR?: Prisma.rolesWhereInput[];
    NOT?: Prisma.rolesWhereInput | Prisma.rolesWhereInput[];
    id?: Prisma.IntFilter<"roles"> | number;
    codigo?: Prisma.StringFilter<"roles"> | string;
    nombre?: Prisma.StringFilter<"roles"> | string;
    asignaciones_proceso?: Prisma.Asignaciones_procesoListRelationFilter;
    usuario_roles_compania?: Prisma.Usuario_roles_companiaListRelationFilter;
};
export type rolesOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    codigo?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    asignaciones_proceso?: Prisma.asignaciones_procesoOrderByRelationAggregateInput;
    usuario_roles_compania?: Prisma.usuario_roles_companiaOrderByRelationAggregateInput;
};
export type rolesWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    codigo?: string;
    AND?: Prisma.rolesWhereInput | Prisma.rolesWhereInput[];
    OR?: Prisma.rolesWhereInput[];
    NOT?: Prisma.rolesWhereInput | Prisma.rolesWhereInput[];
    nombre?: Prisma.StringFilter<"roles"> | string;
    asignaciones_proceso?: Prisma.Asignaciones_procesoListRelationFilter;
    usuario_roles_compania?: Prisma.Usuario_roles_companiaListRelationFilter;
}, "id" | "codigo">;
export type rolesOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    codigo?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    _count?: Prisma.rolesCountOrderByAggregateInput;
    _avg?: Prisma.rolesAvgOrderByAggregateInput;
    _max?: Prisma.rolesMaxOrderByAggregateInput;
    _min?: Prisma.rolesMinOrderByAggregateInput;
    _sum?: Prisma.rolesSumOrderByAggregateInput;
};
export type rolesScalarWhereWithAggregatesInput = {
    AND?: Prisma.rolesScalarWhereWithAggregatesInput | Prisma.rolesScalarWhereWithAggregatesInput[];
    OR?: Prisma.rolesScalarWhereWithAggregatesInput[];
    NOT?: Prisma.rolesScalarWhereWithAggregatesInput | Prisma.rolesScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"roles"> | number;
    codigo?: Prisma.StringWithAggregatesFilter<"roles"> | string;
    nombre?: Prisma.StringWithAggregatesFilter<"roles"> | string;
};
export type rolesCreateInput = {
    codigo: string;
    nombre: string;
    asignaciones_proceso?: Prisma.asignaciones_procesoCreateNestedManyWithoutRolesInput;
    usuario_roles_compania?: Prisma.usuario_roles_companiaCreateNestedManyWithoutRolesInput;
};
export type rolesUncheckedCreateInput = {
    id?: number;
    codigo: string;
    nombre: string;
    asignaciones_proceso?: Prisma.asignaciones_procesoUncheckedCreateNestedManyWithoutRolesInput;
    usuario_roles_compania?: Prisma.usuario_roles_companiaUncheckedCreateNestedManyWithoutRolesInput;
};
export type rolesUpdateInput = {
    codigo?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    asignaciones_proceso?: Prisma.asignaciones_procesoUpdateManyWithoutRolesNestedInput;
    usuario_roles_compania?: Prisma.usuario_roles_companiaUpdateManyWithoutRolesNestedInput;
};
export type rolesUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    asignaciones_proceso?: Prisma.asignaciones_procesoUncheckedUpdateManyWithoutRolesNestedInput;
    usuario_roles_compania?: Prisma.usuario_roles_companiaUncheckedUpdateManyWithoutRolesNestedInput;
};
export type rolesCreateManyInput = {
    id?: number;
    codigo: string;
    nombre: string;
};
export type rolesUpdateManyMutationInput = {
    codigo?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type rolesUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type RolesNullableScalarRelationFilter = {
    is?: Prisma.rolesWhereInput | null;
    isNot?: Prisma.rolesWhereInput | null;
};
export type rolesCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    codigo?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
};
export type rolesAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type rolesMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    codigo?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
};
export type rolesMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    codigo?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
};
export type rolesSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type rolesCreateNestedOneWithoutAsignaciones_procesoInput = {
    create?: Prisma.XOR<Prisma.rolesCreateWithoutAsignaciones_procesoInput, Prisma.rolesUncheckedCreateWithoutAsignaciones_procesoInput>;
    connectOrCreate?: Prisma.rolesCreateOrConnectWithoutAsignaciones_procesoInput;
    connect?: Prisma.rolesWhereUniqueInput;
};
export type rolesUpdateOneWithoutAsignaciones_procesoNestedInput = {
    create?: Prisma.XOR<Prisma.rolesCreateWithoutAsignaciones_procesoInput, Prisma.rolesUncheckedCreateWithoutAsignaciones_procesoInput>;
    connectOrCreate?: Prisma.rolesCreateOrConnectWithoutAsignaciones_procesoInput;
    upsert?: Prisma.rolesUpsertWithoutAsignaciones_procesoInput;
    disconnect?: Prisma.rolesWhereInput | boolean;
    delete?: Prisma.rolesWhereInput | boolean;
    connect?: Prisma.rolesWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.rolesUpdateToOneWithWhereWithoutAsignaciones_procesoInput, Prisma.rolesUpdateWithoutAsignaciones_procesoInput>, Prisma.rolesUncheckedUpdateWithoutAsignaciones_procesoInput>;
};
export type rolesCreateNestedOneWithoutUsuario_roles_companiaInput = {
    create?: Prisma.XOR<Prisma.rolesCreateWithoutUsuario_roles_companiaInput, Prisma.rolesUncheckedCreateWithoutUsuario_roles_companiaInput>;
    connectOrCreate?: Prisma.rolesCreateOrConnectWithoutUsuario_roles_companiaInput;
    connect?: Prisma.rolesWhereUniqueInput;
};
export type rolesUpdateOneWithoutUsuario_roles_companiaNestedInput = {
    create?: Prisma.XOR<Prisma.rolesCreateWithoutUsuario_roles_companiaInput, Prisma.rolesUncheckedCreateWithoutUsuario_roles_companiaInput>;
    connectOrCreate?: Prisma.rolesCreateOrConnectWithoutUsuario_roles_companiaInput;
    upsert?: Prisma.rolesUpsertWithoutUsuario_roles_companiaInput;
    disconnect?: Prisma.rolesWhereInput | boolean;
    delete?: Prisma.rolesWhereInput | boolean;
    connect?: Prisma.rolesWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.rolesUpdateToOneWithWhereWithoutUsuario_roles_companiaInput, Prisma.rolesUpdateWithoutUsuario_roles_companiaInput>, Prisma.rolesUncheckedUpdateWithoutUsuario_roles_companiaInput>;
};
export type rolesCreateWithoutAsignaciones_procesoInput = {
    codigo: string;
    nombre: string;
    usuario_roles_compania?: Prisma.usuario_roles_companiaCreateNestedManyWithoutRolesInput;
};
export type rolesUncheckedCreateWithoutAsignaciones_procesoInput = {
    id?: number;
    codigo: string;
    nombre: string;
    usuario_roles_compania?: Prisma.usuario_roles_companiaUncheckedCreateNestedManyWithoutRolesInput;
};
export type rolesCreateOrConnectWithoutAsignaciones_procesoInput = {
    where: Prisma.rolesWhereUniqueInput;
    create: Prisma.XOR<Prisma.rolesCreateWithoutAsignaciones_procesoInput, Prisma.rolesUncheckedCreateWithoutAsignaciones_procesoInput>;
};
export type rolesUpsertWithoutAsignaciones_procesoInput = {
    update: Prisma.XOR<Prisma.rolesUpdateWithoutAsignaciones_procesoInput, Prisma.rolesUncheckedUpdateWithoutAsignaciones_procesoInput>;
    create: Prisma.XOR<Prisma.rolesCreateWithoutAsignaciones_procesoInput, Prisma.rolesUncheckedCreateWithoutAsignaciones_procesoInput>;
    where?: Prisma.rolesWhereInput;
};
export type rolesUpdateToOneWithWhereWithoutAsignaciones_procesoInput = {
    where?: Prisma.rolesWhereInput;
    data: Prisma.XOR<Prisma.rolesUpdateWithoutAsignaciones_procesoInput, Prisma.rolesUncheckedUpdateWithoutAsignaciones_procesoInput>;
};
export type rolesUpdateWithoutAsignaciones_procesoInput = {
    codigo?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario_roles_compania?: Prisma.usuario_roles_companiaUpdateManyWithoutRolesNestedInput;
};
export type rolesUncheckedUpdateWithoutAsignaciones_procesoInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    usuario_roles_compania?: Prisma.usuario_roles_companiaUncheckedUpdateManyWithoutRolesNestedInput;
};
export type rolesCreateWithoutUsuario_roles_companiaInput = {
    codigo: string;
    nombre: string;
    asignaciones_proceso?: Prisma.asignaciones_procesoCreateNestedManyWithoutRolesInput;
};
export type rolesUncheckedCreateWithoutUsuario_roles_companiaInput = {
    id?: number;
    codigo: string;
    nombre: string;
    asignaciones_proceso?: Prisma.asignaciones_procesoUncheckedCreateNestedManyWithoutRolesInput;
};
export type rolesCreateOrConnectWithoutUsuario_roles_companiaInput = {
    where: Prisma.rolesWhereUniqueInput;
    create: Prisma.XOR<Prisma.rolesCreateWithoutUsuario_roles_companiaInput, Prisma.rolesUncheckedCreateWithoutUsuario_roles_companiaInput>;
};
export type rolesUpsertWithoutUsuario_roles_companiaInput = {
    update: Prisma.XOR<Prisma.rolesUpdateWithoutUsuario_roles_companiaInput, Prisma.rolesUncheckedUpdateWithoutUsuario_roles_companiaInput>;
    create: Prisma.XOR<Prisma.rolesCreateWithoutUsuario_roles_companiaInput, Prisma.rolesUncheckedCreateWithoutUsuario_roles_companiaInput>;
    where?: Prisma.rolesWhereInput;
};
export type rolesUpdateToOneWithWhereWithoutUsuario_roles_companiaInput = {
    where?: Prisma.rolesWhereInput;
    data: Prisma.XOR<Prisma.rolesUpdateWithoutUsuario_roles_companiaInput, Prisma.rolesUncheckedUpdateWithoutUsuario_roles_companiaInput>;
};
export type rolesUpdateWithoutUsuario_roles_companiaInput = {
    codigo?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    asignaciones_proceso?: Prisma.asignaciones_procesoUpdateManyWithoutRolesNestedInput;
};
export type rolesUncheckedUpdateWithoutUsuario_roles_companiaInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    codigo?: Prisma.StringFieldUpdateOperationsInput | string;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    asignaciones_proceso?: Prisma.asignaciones_procesoUncheckedUpdateManyWithoutRolesNestedInput;
};
export type RolesCountOutputType = {
    asignaciones_proceso: number;
    usuario_roles_compania: number;
};
export type RolesCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    asignaciones_proceso?: boolean | RolesCountOutputTypeCountAsignaciones_procesoArgs;
    usuario_roles_compania?: boolean | RolesCountOutputTypeCountUsuario_roles_companiaArgs;
};
export type RolesCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RolesCountOutputTypeSelect<ExtArgs> | null;
};
export type RolesCountOutputTypeCountAsignaciones_procesoArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.asignaciones_procesoWhereInput;
};
export type RolesCountOutputTypeCountUsuario_roles_companiaArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.usuario_roles_companiaWhereInput;
};
export type rolesSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    codigo?: boolean;
    nombre?: boolean;
    asignaciones_proceso?: boolean | Prisma.roles$asignaciones_procesoArgs<ExtArgs>;
    usuario_roles_compania?: boolean | Prisma.roles$usuario_roles_companiaArgs<ExtArgs>;
    _count?: boolean | Prisma.RolesCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["roles"]>;
export type rolesSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    codigo?: boolean;
    nombre?: boolean;
}, ExtArgs["result"]["roles"]>;
export type rolesSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    codigo?: boolean;
    nombre?: boolean;
}, ExtArgs["result"]["roles"]>;
export type rolesSelectScalar = {
    id?: boolean;
    codigo?: boolean;
    nombre?: boolean;
};
export type rolesOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "codigo" | "nombre", ExtArgs["result"]["roles"]>;
export type rolesInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    asignaciones_proceso?: boolean | Prisma.roles$asignaciones_procesoArgs<ExtArgs>;
    usuario_roles_compania?: boolean | Prisma.roles$usuario_roles_companiaArgs<ExtArgs>;
    _count?: boolean | Prisma.RolesCountOutputTypeDefaultArgs<ExtArgs>;
};
export type rolesIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type rolesIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $rolesPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "roles";
    objects: {
        asignaciones_proceso: Prisma.$asignaciones_procesoPayload<ExtArgs>[];
        usuario_roles_compania: Prisma.$usuario_roles_companiaPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        codigo: string;
        nombre: string;
    }, ExtArgs["result"]["roles"]>;
    composites: {};
};
export type rolesGetPayload<S extends boolean | null | undefined | rolesDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$rolesPayload, S>;
export type rolesCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<rolesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RolesCountAggregateInputType | true;
};
export interface rolesDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['roles'];
        meta: {
            name: 'roles';
        };
    };
    findUnique<T extends rolesFindUniqueArgs>(args: Prisma.SelectSubset<T, rolesFindUniqueArgs<ExtArgs>>): Prisma.Prisma__rolesClient<runtime.Types.Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends rolesFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, rolesFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__rolesClient<runtime.Types.Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends rolesFindFirstArgs>(args?: Prisma.SelectSubset<T, rolesFindFirstArgs<ExtArgs>>): Prisma.Prisma__rolesClient<runtime.Types.Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends rolesFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, rolesFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__rolesClient<runtime.Types.Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends rolesFindManyArgs>(args?: Prisma.SelectSubset<T, rolesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends rolesCreateArgs>(args: Prisma.SelectSubset<T, rolesCreateArgs<ExtArgs>>): Prisma.Prisma__rolesClient<runtime.Types.Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends rolesCreateManyArgs>(args?: Prisma.SelectSubset<T, rolesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends rolesCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, rolesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends rolesDeleteArgs>(args: Prisma.SelectSubset<T, rolesDeleteArgs<ExtArgs>>): Prisma.Prisma__rolesClient<runtime.Types.Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends rolesUpdateArgs>(args: Prisma.SelectSubset<T, rolesUpdateArgs<ExtArgs>>): Prisma.Prisma__rolesClient<runtime.Types.Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends rolesDeleteManyArgs>(args?: Prisma.SelectSubset<T, rolesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends rolesUpdateManyArgs>(args: Prisma.SelectSubset<T, rolesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends rolesUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, rolesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends rolesUpsertArgs>(args: Prisma.SelectSubset<T, rolesUpsertArgs<ExtArgs>>): Prisma.Prisma__rolesClient<runtime.Types.Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends rolesCountArgs>(args?: Prisma.Subset<T, rolesCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RolesCountAggregateOutputType> : number>;
    aggregate<T extends RolesAggregateArgs>(args: Prisma.Subset<T, RolesAggregateArgs>): Prisma.PrismaPromise<GetRolesAggregateType<T>>;
    groupBy<T extends rolesGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: rolesGroupByArgs['orderBy'];
    } : {
        orderBy?: rolesGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, rolesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRolesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: rolesFieldRefs;
}
export interface Prisma__rolesClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    asignaciones_proceso<T extends Prisma.roles$asignaciones_procesoArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.roles$asignaciones_procesoArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$asignaciones_procesoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    usuario_roles_compania<T extends Prisma.roles$usuario_roles_companiaArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.roles$usuario_roles_companiaArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$usuario_roles_companiaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface rolesFieldRefs {
    readonly id: Prisma.FieldRef<"roles", 'Int'>;
    readonly codigo: Prisma.FieldRef<"roles", 'String'>;
    readonly nombre: Prisma.FieldRef<"roles", 'String'>;
}
export type rolesFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.rolesSelect<ExtArgs> | null;
    omit?: Prisma.rolesOmit<ExtArgs> | null;
    include?: Prisma.rolesInclude<ExtArgs> | null;
    where: Prisma.rolesWhereUniqueInput;
};
export type rolesFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.rolesSelect<ExtArgs> | null;
    omit?: Prisma.rolesOmit<ExtArgs> | null;
    include?: Prisma.rolesInclude<ExtArgs> | null;
    where: Prisma.rolesWhereUniqueInput;
};
export type rolesFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.rolesSelect<ExtArgs> | null;
    omit?: Prisma.rolesOmit<ExtArgs> | null;
    include?: Prisma.rolesInclude<ExtArgs> | null;
    where?: Prisma.rolesWhereInput;
    orderBy?: Prisma.rolesOrderByWithRelationInput | Prisma.rolesOrderByWithRelationInput[];
    cursor?: Prisma.rolesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RolesScalarFieldEnum | Prisma.RolesScalarFieldEnum[];
};
export type rolesFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.rolesSelect<ExtArgs> | null;
    omit?: Prisma.rolesOmit<ExtArgs> | null;
    include?: Prisma.rolesInclude<ExtArgs> | null;
    where?: Prisma.rolesWhereInput;
    orderBy?: Prisma.rolesOrderByWithRelationInput | Prisma.rolesOrderByWithRelationInput[];
    cursor?: Prisma.rolesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RolesScalarFieldEnum | Prisma.RolesScalarFieldEnum[];
};
export type rolesFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.rolesSelect<ExtArgs> | null;
    omit?: Prisma.rolesOmit<ExtArgs> | null;
    include?: Prisma.rolesInclude<ExtArgs> | null;
    where?: Prisma.rolesWhereInput;
    orderBy?: Prisma.rolesOrderByWithRelationInput | Prisma.rolesOrderByWithRelationInput[];
    cursor?: Prisma.rolesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RolesScalarFieldEnum | Prisma.RolesScalarFieldEnum[];
};
export type rolesCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.rolesSelect<ExtArgs> | null;
    omit?: Prisma.rolesOmit<ExtArgs> | null;
    include?: Prisma.rolesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.rolesCreateInput, Prisma.rolesUncheckedCreateInput>;
};
export type rolesCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.rolesCreateManyInput | Prisma.rolesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type rolesCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.rolesSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.rolesOmit<ExtArgs> | null;
    data: Prisma.rolesCreateManyInput | Prisma.rolesCreateManyInput[];
    skipDuplicates?: boolean;
};
export type rolesUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.rolesSelect<ExtArgs> | null;
    omit?: Prisma.rolesOmit<ExtArgs> | null;
    include?: Prisma.rolesInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.rolesUpdateInput, Prisma.rolesUncheckedUpdateInput>;
    where: Prisma.rolesWhereUniqueInput;
};
export type rolesUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.rolesUpdateManyMutationInput, Prisma.rolesUncheckedUpdateManyInput>;
    where?: Prisma.rolesWhereInput;
    limit?: number;
};
export type rolesUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.rolesSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.rolesOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.rolesUpdateManyMutationInput, Prisma.rolesUncheckedUpdateManyInput>;
    where?: Prisma.rolesWhereInput;
    limit?: number;
};
export type rolesUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.rolesSelect<ExtArgs> | null;
    omit?: Prisma.rolesOmit<ExtArgs> | null;
    include?: Prisma.rolesInclude<ExtArgs> | null;
    where: Prisma.rolesWhereUniqueInput;
    create: Prisma.XOR<Prisma.rolesCreateInput, Prisma.rolesUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.rolesUpdateInput, Prisma.rolesUncheckedUpdateInput>;
};
export type rolesDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.rolesSelect<ExtArgs> | null;
    omit?: Prisma.rolesOmit<ExtArgs> | null;
    include?: Prisma.rolesInclude<ExtArgs> | null;
    where: Prisma.rolesWhereUniqueInput;
};
export type rolesDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.rolesWhereInput;
    limit?: number;
};
export type roles$asignaciones_procesoArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type roles$usuario_roles_companiaArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type rolesDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.rolesSelect<ExtArgs> | null;
    omit?: Prisma.rolesOmit<ExtArgs> | null;
    include?: Prisma.rolesInclude<ExtArgs> | null;
};
