import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type usuario_roles_companiaModel = runtime.Types.Result.DefaultSelection<Prisma.$usuario_roles_companiaPayload>;
export type AggregateUsuario_roles_compania = {
    _count: Usuario_roles_companiaCountAggregateOutputType | null;
    _avg: Usuario_roles_companiaAvgAggregateOutputType | null;
    _sum: Usuario_roles_companiaSumAggregateOutputType | null;
    _min: Usuario_roles_companiaMinAggregateOutputType | null;
    _max: Usuario_roles_companiaMaxAggregateOutputType | null;
};
export type Usuario_roles_companiaAvgAggregateOutputType = {
    id: number | null;
    usuario_id: number | null;
    rol_id: number | null;
    compania_id: number | null;
};
export type Usuario_roles_companiaSumAggregateOutputType = {
    id: number | null;
    usuario_id: number | null;
    rol_id: number | null;
    compania_id: number | null;
};
export type Usuario_roles_companiaMinAggregateOutputType = {
    id: number | null;
    usuario_id: number | null;
    rol_id: number | null;
    compania_id: number | null;
};
export type Usuario_roles_companiaMaxAggregateOutputType = {
    id: number | null;
    usuario_id: number | null;
    rol_id: number | null;
    compania_id: number | null;
};
export type Usuario_roles_companiaCountAggregateOutputType = {
    id: number;
    usuario_id: number;
    rol_id: number;
    compania_id: number;
    _all: number;
};
export type Usuario_roles_companiaAvgAggregateInputType = {
    id?: true;
    usuario_id?: true;
    rol_id?: true;
    compania_id?: true;
};
export type Usuario_roles_companiaSumAggregateInputType = {
    id?: true;
    usuario_id?: true;
    rol_id?: true;
    compania_id?: true;
};
export type Usuario_roles_companiaMinAggregateInputType = {
    id?: true;
    usuario_id?: true;
    rol_id?: true;
    compania_id?: true;
};
export type Usuario_roles_companiaMaxAggregateInputType = {
    id?: true;
    usuario_id?: true;
    rol_id?: true;
    compania_id?: true;
};
export type Usuario_roles_companiaCountAggregateInputType = {
    id?: true;
    usuario_id?: true;
    rol_id?: true;
    compania_id?: true;
    _all?: true;
};
export type Usuario_roles_companiaAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.usuario_roles_companiaWhereInput;
    orderBy?: Prisma.usuario_roles_companiaOrderByWithRelationInput | Prisma.usuario_roles_companiaOrderByWithRelationInput[];
    cursor?: Prisma.usuario_roles_companiaWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | Usuario_roles_companiaCountAggregateInputType;
    _avg?: Usuario_roles_companiaAvgAggregateInputType;
    _sum?: Usuario_roles_companiaSumAggregateInputType;
    _min?: Usuario_roles_companiaMinAggregateInputType;
    _max?: Usuario_roles_companiaMaxAggregateInputType;
};
export type GetUsuario_roles_companiaAggregateType<T extends Usuario_roles_companiaAggregateArgs> = {
    [P in keyof T & keyof AggregateUsuario_roles_compania]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUsuario_roles_compania[P]> : Prisma.GetScalarType<T[P], AggregateUsuario_roles_compania[P]>;
};
export type usuario_roles_companiaGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.usuario_roles_companiaWhereInput;
    orderBy?: Prisma.usuario_roles_companiaOrderByWithAggregationInput | Prisma.usuario_roles_companiaOrderByWithAggregationInput[];
    by: Prisma.Usuario_roles_companiaScalarFieldEnum[] | Prisma.Usuario_roles_companiaScalarFieldEnum;
    having?: Prisma.usuario_roles_companiaScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Usuario_roles_companiaCountAggregateInputType | true;
    _avg?: Usuario_roles_companiaAvgAggregateInputType;
    _sum?: Usuario_roles_companiaSumAggregateInputType;
    _min?: Usuario_roles_companiaMinAggregateInputType;
    _max?: Usuario_roles_companiaMaxAggregateInputType;
};
export type Usuario_roles_companiaGroupByOutputType = {
    id: number;
    usuario_id: number | null;
    rol_id: number | null;
    compania_id: number | null;
    _count: Usuario_roles_companiaCountAggregateOutputType | null;
    _avg: Usuario_roles_companiaAvgAggregateOutputType | null;
    _sum: Usuario_roles_companiaSumAggregateOutputType | null;
    _min: Usuario_roles_companiaMinAggregateOutputType | null;
    _max: Usuario_roles_companiaMaxAggregateOutputType | null;
};
export type GetUsuario_roles_companiaGroupByPayload<T extends usuario_roles_companiaGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Usuario_roles_companiaGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Usuario_roles_companiaGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Usuario_roles_companiaGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Usuario_roles_companiaGroupByOutputType[P]>;
}>>;
export type usuario_roles_companiaWhereInput = {
    AND?: Prisma.usuario_roles_companiaWhereInput | Prisma.usuario_roles_companiaWhereInput[];
    OR?: Prisma.usuario_roles_companiaWhereInput[];
    NOT?: Prisma.usuario_roles_companiaWhereInput | Prisma.usuario_roles_companiaWhereInput[];
    id?: Prisma.IntFilter<"usuario_roles_compania"> | number;
    usuario_id?: Prisma.IntNullableFilter<"usuario_roles_compania"> | number | null;
    rol_id?: Prisma.IntNullableFilter<"usuario_roles_compania"> | number | null;
    compania_id?: Prisma.IntNullableFilter<"usuario_roles_compania"> | number | null;
    companias?: Prisma.XOR<Prisma.CompaniasNullableScalarRelationFilter, Prisma.companiasWhereInput> | null;
    roles?: Prisma.XOR<Prisma.RolesNullableScalarRelationFilter, Prisma.rolesWhereInput> | null;
    usuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
};
export type usuario_roles_companiaOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    usuario_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    rol_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    compania_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    companias?: Prisma.companiasOrderByWithRelationInput;
    roles?: Prisma.rolesOrderByWithRelationInput;
    usuarios?: Prisma.usuariosOrderByWithRelationInput;
};
export type usuario_roles_companiaWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    usuario_id_rol_id_compania_id?: Prisma.usuario_roles_companiaUsuario_idRol_idCompania_idCompoundUniqueInput;
    AND?: Prisma.usuario_roles_companiaWhereInput | Prisma.usuario_roles_companiaWhereInput[];
    OR?: Prisma.usuario_roles_companiaWhereInput[];
    NOT?: Prisma.usuario_roles_companiaWhereInput | Prisma.usuario_roles_companiaWhereInput[];
    usuario_id?: Prisma.IntNullableFilter<"usuario_roles_compania"> | number | null;
    rol_id?: Prisma.IntNullableFilter<"usuario_roles_compania"> | number | null;
    compania_id?: Prisma.IntNullableFilter<"usuario_roles_compania"> | number | null;
    companias?: Prisma.XOR<Prisma.CompaniasNullableScalarRelationFilter, Prisma.companiasWhereInput> | null;
    roles?: Prisma.XOR<Prisma.RolesNullableScalarRelationFilter, Prisma.rolesWhereInput> | null;
    usuarios?: Prisma.XOR<Prisma.UsuariosNullableScalarRelationFilter, Prisma.usuariosWhereInput> | null;
}, "id" | "usuario_id_rol_id_compania_id">;
export type usuario_roles_companiaOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    usuario_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    rol_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    compania_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.usuario_roles_companiaCountOrderByAggregateInput;
    _avg?: Prisma.usuario_roles_companiaAvgOrderByAggregateInput;
    _max?: Prisma.usuario_roles_companiaMaxOrderByAggregateInput;
    _min?: Prisma.usuario_roles_companiaMinOrderByAggregateInput;
    _sum?: Prisma.usuario_roles_companiaSumOrderByAggregateInput;
};
export type usuario_roles_companiaScalarWhereWithAggregatesInput = {
    AND?: Prisma.usuario_roles_companiaScalarWhereWithAggregatesInput | Prisma.usuario_roles_companiaScalarWhereWithAggregatesInput[];
    OR?: Prisma.usuario_roles_companiaScalarWhereWithAggregatesInput[];
    NOT?: Prisma.usuario_roles_companiaScalarWhereWithAggregatesInput | Prisma.usuario_roles_companiaScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"usuario_roles_compania"> | number;
    usuario_id?: Prisma.IntNullableWithAggregatesFilter<"usuario_roles_compania"> | number | null;
    rol_id?: Prisma.IntNullableWithAggregatesFilter<"usuario_roles_compania"> | number | null;
    compania_id?: Prisma.IntNullableWithAggregatesFilter<"usuario_roles_compania"> | number | null;
};
export type usuario_roles_companiaCreateInput = {
    companias?: Prisma.companiasCreateNestedOneWithoutUsuario_roles_companiaInput;
    roles?: Prisma.rolesCreateNestedOneWithoutUsuario_roles_companiaInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutUsuario_roles_companiaInput;
};
export type usuario_roles_companiaUncheckedCreateInput = {
    id?: number;
    usuario_id?: number | null;
    rol_id?: number | null;
    compania_id?: number | null;
};
export type usuario_roles_companiaUpdateInput = {
    companias?: Prisma.companiasUpdateOneWithoutUsuario_roles_companiaNestedInput;
    roles?: Prisma.rolesUpdateOneWithoutUsuario_roles_companiaNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutUsuario_roles_companiaNestedInput;
};
export type usuario_roles_companiaUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    usuario_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    rol_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    compania_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type usuario_roles_companiaCreateManyInput = {
    id?: number;
    usuario_id?: number | null;
    rol_id?: number | null;
    compania_id?: number | null;
};
export type usuario_roles_companiaUpdateManyMutationInput = {};
export type usuario_roles_companiaUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    usuario_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    rol_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    compania_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type Usuario_roles_companiaListRelationFilter = {
    every?: Prisma.usuario_roles_companiaWhereInput;
    some?: Prisma.usuario_roles_companiaWhereInput;
    none?: Prisma.usuario_roles_companiaWhereInput;
};
export type usuario_roles_companiaOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type usuario_roles_companiaUsuario_idRol_idCompania_idCompoundUniqueInput = {
    usuario_id: number;
    rol_id: number;
    compania_id: number;
};
export type usuario_roles_companiaCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    usuario_id?: Prisma.SortOrder;
    rol_id?: Prisma.SortOrder;
    compania_id?: Prisma.SortOrder;
};
export type usuario_roles_companiaAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    usuario_id?: Prisma.SortOrder;
    rol_id?: Prisma.SortOrder;
    compania_id?: Prisma.SortOrder;
};
export type usuario_roles_companiaMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    usuario_id?: Prisma.SortOrder;
    rol_id?: Prisma.SortOrder;
    compania_id?: Prisma.SortOrder;
};
export type usuario_roles_companiaMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    usuario_id?: Prisma.SortOrder;
    rol_id?: Prisma.SortOrder;
    compania_id?: Prisma.SortOrder;
};
export type usuario_roles_companiaSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    usuario_id?: Prisma.SortOrder;
    rol_id?: Prisma.SortOrder;
    compania_id?: Prisma.SortOrder;
};
export type usuario_roles_companiaCreateNestedManyWithoutCompaniasInput = {
    create?: Prisma.XOR<Prisma.usuario_roles_companiaCreateWithoutCompaniasInput, Prisma.usuario_roles_companiaUncheckedCreateWithoutCompaniasInput> | Prisma.usuario_roles_companiaCreateWithoutCompaniasInput[] | Prisma.usuario_roles_companiaUncheckedCreateWithoutCompaniasInput[];
    connectOrCreate?: Prisma.usuario_roles_companiaCreateOrConnectWithoutCompaniasInput | Prisma.usuario_roles_companiaCreateOrConnectWithoutCompaniasInput[];
    createMany?: Prisma.usuario_roles_companiaCreateManyCompaniasInputEnvelope;
    connect?: Prisma.usuario_roles_companiaWhereUniqueInput | Prisma.usuario_roles_companiaWhereUniqueInput[];
};
export type usuario_roles_companiaUncheckedCreateNestedManyWithoutCompaniasInput = {
    create?: Prisma.XOR<Prisma.usuario_roles_companiaCreateWithoutCompaniasInput, Prisma.usuario_roles_companiaUncheckedCreateWithoutCompaniasInput> | Prisma.usuario_roles_companiaCreateWithoutCompaniasInput[] | Prisma.usuario_roles_companiaUncheckedCreateWithoutCompaniasInput[];
    connectOrCreate?: Prisma.usuario_roles_companiaCreateOrConnectWithoutCompaniasInput | Prisma.usuario_roles_companiaCreateOrConnectWithoutCompaniasInput[];
    createMany?: Prisma.usuario_roles_companiaCreateManyCompaniasInputEnvelope;
    connect?: Prisma.usuario_roles_companiaWhereUniqueInput | Prisma.usuario_roles_companiaWhereUniqueInput[];
};
export type usuario_roles_companiaUpdateManyWithoutCompaniasNestedInput = {
    create?: Prisma.XOR<Prisma.usuario_roles_companiaCreateWithoutCompaniasInput, Prisma.usuario_roles_companiaUncheckedCreateWithoutCompaniasInput> | Prisma.usuario_roles_companiaCreateWithoutCompaniasInput[] | Prisma.usuario_roles_companiaUncheckedCreateWithoutCompaniasInput[];
    connectOrCreate?: Prisma.usuario_roles_companiaCreateOrConnectWithoutCompaniasInput | Prisma.usuario_roles_companiaCreateOrConnectWithoutCompaniasInput[];
    upsert?: Prisma.usuario_roles_companiaUpsertWithWhereUniqueWithoutCompaniasInput | Prisma.usuario_roles_companiaUpsertWithWhereUniqueWithoutCompaniasInput[];
    createMany?: Prisma.usuario_roles_companiaCreateManyCompaniasInputEnvelope;
    set?: Prisma.usuario_roles_companiaWhereUniqueInput | Prisma.usuario_roles_companiaWhereUniqueInput[];
    disconnect?: Prisma.usuario_roles_companiaWhereUniqueInput | Prisma.usuario_roles_companiaWhereUniqueInput[];
    delete?: Prisma.usuario_roles_companiaWhereUniqueInput | Prisma.usuario_roles_companiaWhereUniqueInput[];
    connect?: Prisma.usuario_roles_companiaWhereUniqueInput | Prisma.usuario_roles_companiaWhereUniqueInput[];
    update?: Prisma.usuario_roles_companiaUpdateWithWhereUniqueWithoutCompaniasInput | Prisma.usuario_roles_companiaUpdateWithWhereUniqueWithoutCompaniasInput[];
    updateMany?: Prisma.usuario_roles_companiaUpdateManyWithWhereWithoutCompaniasInput | Prisma.usuario_roles_companiaUpdateManyWithWhereWithoutCompaniasInput[];
    deleteMany?: Prisma.usuario_roles_companiaScalarWhereInput | Prisma.usuario_roles_companiaScalarWhereInput[];
};
export type usuario_roles_companiaUncheckedUpdateManyWithoutCompaniasNestedInput = {
    create?: Prisma.XOR<Prisma.usuario_roles_companiaCreateWithoutCompaniasInput, Prisma.usuario_roles_companiaUncheckedCreateWithoutCompaniasInput> | Prisma.usuario_roles_companiaCreateWithoutCompaniasInput[] | Prisma.usuario_roles_companiaUncheckedCreateWithoutCompaniasInput[];
    connectOrCreate?: Prisma.usuario_roles_companiaCreateOrConnectWithoutCompaniasInput | Prisma.usuario_roles_companiaCreateOrConnectWithoutCompaniasInput[];
    upsert?: Prisma.usuario_roles_companiaUpsertWithWhereUniqueWithoutCompaniasInput | Prisma.usuario_roles_companiaUpsertWithWhereUniqueWithoutCompaniasInput[];
    createMany?: Prisma.usuario_roles_companiaCreateManyCompaniasInputEnvelope;
    set?: Prisma.usuario_roles_companiaWhereUniqueInput | Prisma.usuario_roles_companiaWhereUniqueInput[];
    disconnect?: Prisma.usuario_roles_companiaWhereUniqueInput | Prisma.usuario_roles_companiaWhereUniqueInput[];
    delete?: Prisma.usuario_roles_companiaWhereUniqueInput | Prisma.usuario_roles_companiaWhereUniqueInput[];
    connect?: Prisma.usuario_roles_companiaWhereUniqueInput | Prisma.usuario_roles_companiaWhereUniqueInput[];
    update?: Prisma.usuario_roles_companiaUpdateWithWhereUniqueWithoutCompaniasInput | Prisma.usuario_roles_companiaUpdateWithWhereUniqueWithoutCompaniasInput[];
    updateMany?: Prisma.usuario_roles_companiaUpdateManyWithWhereWithoutCompaniasInput | Prisma.usuario_roles_companiaUpdateManyWithWhereWithoutCompaniasInput[];
    deleteMany?: Prisma.usuario_roles_companiaScalarWhereInput | Prisma.usuario_roles_companiaScalarWhereInput[];
};
export type usuario_roles_companiaCreateNestedManyWithoutRolesInput = {
    create?: Prisma.XOR<Prisma.usuario_roles_companiaCreateWithoutRolesInput, Prisma.usuario_roles_companiaUncheckedCreateWithoutRolesInput> | Prisma.usuario_roles_companiaCreateWithoutRolesInput[] | Prisma.usuario_roles_companiaUncheckedCreateWithoutRolesInput[];
    connectOrCreate?: Prisma.usuario_roles_companiaCreateOrConnectWithoutRolesInput | Prisma.usuario_roles_companiaCreateOrConnectWithoutRolesInput[];
    createMany?: Prisma.usuario_roles_companiaCreateManyRolesInputEnvelope;
    connect?: Prisma.usuario_roles_companiaWhereUniqueInput | Prisma.usuario_roles_companiaWhereUniqueInput[];
};
export type usuario_roles_companiaUncheckedCreateNestedManyWithoutRolesInput = {
    create?: Prisma.XOR<Prisma.usuario_roles_companiaCreateWithoutRolesInput, Prisma.usuario_roles_companiaUncheckedCreateWithoutRolesInput> | Prisma.usuario_roles_companiaCreateWithoutRolesInput[] | Prisma.usuario_roles_companiaUncheckedCreateWithoutRolesInput[];
    connectOrCreate?: Prisma.usuario_roles_companiaCreateOrConnectWithoutRolesInput | Prisma.usuario_roles_companiaCreateOrConnectWithoutRolesInput[];
    createMany?: Prisma.usuario_roles_companiaCreateManyRolesInputEnvelope;
    connect?: Prisma.usuario_roles_companiaWhereUniqueInput | Prisma.usuario_roles_companiaWhereUniqueInput[];
};
export type usuario_roles_companiaUpdateManyWithoutRolesNestedInput = {
    create?: Prisma.XOR<Prisma.usuario_roles_companiaCreateWithoutRolesInput, Prisma.usuario_roles_companiaUncheckedCreateWithoutRolesInput> | Prisma.usuario_roles_companiaCreateWithoutRolesInput[] | Prisma.usuario_roles_companiaUncheckedCreateWithoutRolesInput[];
    connectOrCreate?: Prisma.usuario_roles_companiaCreateOrConnectWithoutRolesInput | Prisma.usuario_roles_companiaCreateOrConnectWithoutRolesInput[];
    upsert?: Prisma.usuario_roles_companiaUpsertWithWhereUniqueWithoutRolesInput | Prisma.usuario_roles_companiaUpsertWithWhereUniqueWithoutRolesInput[];
    createMany?: Prisma.usuario_roles_companiaCreateManyRolesInputEnvelope;
    set?: Prisma.usuario_roles_companiaWhereUniqueInput | Prisma.usuario_roles_companiaWhereUniqueInput[];
    disconnect?: Prisma.usuario_roles_companiaWhereUniqueInput | Prisma.usuario_roles_companiaWhereUniqueInput[];
    delete?: Prisma.usuario_roles_companiaWhereUniqueInput | Prisma.usuario_roles_companiaWhereUniqueInput[];
    connect?: Prisma.usuario_roles_companiaWhereUniqueInput | Prisma.usuario_roles_companiaWhereUniqueInput[];
    update?: Prisma.usuario_roles_companiaUpdateWithWhereUniqueWithoutRolesInput | Prisma.usuario_roles_companiaUpdateWithWhereUniqueWithoutRolesInput[];
    updateMany?: Prisma.usuario_roles_companiaUpdateManyWithWhereWithoutRolesInput | Prisma.usuario_roles_companiaUpdateManyWithWhereWithoutRolesInput[];
    deleteMany?: Prisma.usuario_roles_companiaScalarWhereInput | Prisma.usuario_roles_companiaScalarWhereInput[];
};
export type usuario_roles_companiaUncheckedUpdateManyWithoutRolesNestedInput = {
    create?: Prisma.XOR<Prisma.usuario_roles_companiaCreateWithoutRolesInput, Prisma.usuario_roles_companiaUncheckedCreateWithoutRolesInput> | Prisma.usuario_roles_companiaCreateWithoutRolesInput[] | Prisma.usuario_roles_companiaUncheckedCreateWithoutRolesInput[];
    connectOrCreate?: Prisma.usuario_roles_companiaCreateOrConnectWithoutRolesInput | Prisma.usuario_roles_companiaCreateOrConnectWithoutRolesInput[];
    upsert?: Prisma.usuario_roles_companiaUpsertWithWhereUniqueWithoutRolesInput | Prisma.usuario_roles_companiaUpsertWithWhereUniqueWithoutRolesInput[];
    createMany?: Prisma.usuario_roles_companiaCreateManyRolesInputEnvelope;
    set?: Prisma.usuario_roles_companiaWhereUniqueInput | Prisma.usuario_roles_companiaWhereUniqueInput[];
    disconnect?: Prisma.usuario_roles_companiaWhereUniqueInput | Prisma.usuario_roles_companiaWhereUniqueInput[];
    delete?: Prisma.usuario_roles_companiaWhereUniqueInput | Prisma.usuario_roles_companiaWhereUniqueInput[];
    connect?: Prisma.usuario_roles_companiaWhereUniqueInput | Prisma.usuario_roles_companiaWhereUniqueInput[];
    update?: Prisma.usuario_roles_companiaUpdateWithWhereUniqueWithoutRolesInput | Prisma.usuario_roles_companiaUpdateWithWhereUniqueWithoutRolesInput[];
    updateMany?: Prisma.usuario_roles_companiaUpdateManyWithWhereWithoutRolesInput | Prisma.usuario_roles_companiaUpdateManyWithWhereWithoutRolesInput[];
    deleteMany?: Prisma.usuario_roles_companiaScalarWhereInput | Prisma.usuario_roles_companiaScalarWhereInput[];
};
export type usuario_roles_companiaCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.usuario_roles_companiaCreateWithoutUsuariosInput, Prisma.usuario_roles_companiaUncheckedCreateWithoutUsuariosInput> | Prisma.usuario_roles_companiaCreateWithoutUsuariosInput[] | Prisma.usuario_roles_companiaUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.usuario_roles_companiaCreateOrConnectWithoutUsuariosInput | Prisma.usuario_roles_companiaCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.usuario_roles_companiaCreateManyUsuariosInputEnvelope;
    connect?: Prisma.usuario_roles_companiaWhereUniqueInput | Prisma.usuario_roles_companiaWhereUniqueInput[];
};
export type usuario_roles_companiaUncheckedCreateNestedManyWithoutUsuariosInput = {
    create?: Prisma.XOR<Prisma.usuario_roles_companiaCreateWithoutUsuariosInput, Prisma.usuario_roles_companiaUncheckedCreateWithoutUsuariosInput> | Prisma.usuario_roles_companiaCreateWithoutUsuariosInput[] | Prisma.usuario_roles_companiaUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.usuario_roles_companiaCreateOrConnectWithoutUsuariosInput | Prisma.usuario_roles_companiaCreateOrConnectWithoutUsuariosInput[];
    createMany?: Prisma.usuario_roles_companiaCreateManyUsuariosInputEnvelope;
    connect?: Prisma.usuario_roles_companiaWhereUniqueInput | Prisma.usuario_roles_companiaWhereUniqueInput[];
};
export type usuario_roles_companiaUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.usuario_roles_companiaCreateWithoutUsuariosInput, Prisma.usuario_roles_companiaUncheckedCreateWithoutUsuariosInput> | Prisma.usuario_roles_companiaCreateWithoutUsuariosInput[] | Prisma.usuario_roles_companiaUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.usuario_roles_companiaCreateOrConnectWithoutUsuariosInput | Prisma.usuario_roles_companiaCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.usuario_roles_companiaUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.usuario_roles_companiaUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.usuario_roles_companiaCreateManyUsuariosInputEnvelope;
    set?: Prisma.usuario_roles_companiaWhereUniqueInput | Prisma.usuario_roles_companiaWhereUniqueInput[];
    disconnect?: Prisma.usuario_roles_companiaWhereUniqueInput | Prisma.usuario_roles_companiaWhereUniqueInput[];
    delete?: Prisma.usuario_roles_companiaWhereUniqueInput | Prisma.usuario_roles_companiaWhereUniqueInput[];
    connect?: Prisma.usuario_roles_companiaWhereUniqueInput | Prisma.usuario_roles_companiaWhereUniqueInput[];
    update?: Prisma.usuario_roles_companiaUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.usuario_roles_companiaUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.usuario_roles_companiaUpdateManyWithWhereWithoutUsuariosInput | Prisma.usuario_roles_companiaUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.usuario_roles_companiaScalarWhereInput | Prisma.usuario_roles_companiaScalarWhereInput[];
};
export type usuario_roles_companiaUncheckedUpdateManyWithoutUsuariosNestedInput = {
    create?: Prisma.XOR<Prisma.usuario_roles_companiaCreateWithoutUsuariosInput, Prisma.usuario_roles_companiaUncheckedCreateWithoutUsuariosInput> | Prisma.usuario_roles_companiaCreateWithoutUsuariosInput[] | Prisma.usuario_roles_companiaUncheckedCreateWithoutUsuariosInput[];
    connectOrCreate?: Prisma.usuario_roles_companiaCreateOrConnectWithoutUsuariosInput | Prisma.usuario_roles_companiaCreateOrConnectWithoutUsuariosInput[];
    upsert?: Prisma.usuario_roles_companiaUpsertWithWhereUniqueWithoutUsuariosInput | Prisma.usuario_roles_companiaUpsertWithWhereUniqueWithoutUsuariosInput[];
    createMany?: Prisma.usuario_roles_companiaCreateManyUsuariosInputEnvelope;
    set?: Prisma.usuario_roles_companiaWhereUniqueInput | Prisma.usuario_roles_companiaWhereUniqueInput[];
    disconnect?: Prisma.usuario_roles_companiaWhereUniqueInput | Prisma.usuario_roles_companiaWhereUniqueInput[];
    delete?: Prisma.usuario_roles_companiaWhereUniqueInput | Prisma.usuario_roles_companiaWhereUniqueInput[];
    connect?: Prisma.usuario_roles_companiaWhereUniqueInput | Prisma.usuario_roles_companiaWhereUniqueInput[];
    update?: Prisma.usuario_roles_companiaUpdateWithWhereUniqueWithoutUsuariosInput | Prisma.usuario_roles_companiaUpdateWithWhereUniqueWithoutUsuariosInput[];
    updateMany?: Prisma.usuario_roles_companiaUpdateManyWithWhereWithoutUsuariosInput | Prisma.usuario_roles_companiaUpdateManyWithWhereWithoutUsuariosInput[];
    deleteMany?: Prisma.usuario_roles_companiaScalarWhereInput | Prisma.usuario_roles_companiaScalarWhereInput[];
};
export type usuario_roles_companiaCreateWithoutCompaniasInput = {
    roles?: Prisma.rolesCreateNestedOneWithoutUsuario_roles_companiaInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutUsuario_roles_companiaInput;
};
export type usuario_roles_companiaUncheckedCreateWithoutCompaniasInput = {
    id?: number;
    usuario_id?: number | null;
    rol_id?: number | null;
};
export type usuario_roles_companiaCreateOrConnectWithoutCompaniasInput = {
    where: Prisma.usuario_roles_companiaWhereUniqueInput;
    create: Prisma.XOR<Prisma.usuario_roles_companiaCreateWithoutCompaniasInput, Prisma.usuario_roles_companiaUncheckedCreateWithoutCompaniasInput>;
};
export type usuario_roles_companiaCreateManyCompaniasInputEnvelope = {
    data: Prisma.usuario_roles_companiaCreateManyCompaniasInput | Prisma.usuario_roles_companiaCreateManyCompaniasInput[];
    skipDuplicates?: boolean;
};
export type usuario_roles_companiaUpsertWithWhereUniqueWithoutCompaniasInput = {
    where: Prisma.usuario_roles_companiaWhereUniqueInput;
    update: Prisma.XOR<Prisma.usuario_roles_companiaUpdateWithoutCompaniasInput, Prisma.usuario_roles_companiaUncheckedUpdateWithoutCompaniasInput>;
    create: Prisma.XOR<Prisma.usuario_roles_companiaCreateWithoutCompaniasInput, Prisma.usuario_roles_companiaUncheckedCreateWithoutCompaniasInput>;
};
export type usuario_roles_companiaUpdateWithWhereUniqueWithoutCompaniasInput = {
    where: Prisma.usuario_roles_companiaWhereUniqueInput;
    data: Prisma.XOR<Prisma.usuario_roles_companiaUpdateWithoutCompaniasInput, Prisma.usuario_roles_companiaUncheckedUpdateWithoutCompaniasInput>;
};
export type usuario_roles_companiaUpdateManyWithWhereWithoutCompaniasInput = {
    where: Prisma.usuario_roles_companiaScalarWhereInput;
    data: Prisma.XOR<Prisma.usuario_roles_companiaUpdateManyMutationInput, Prisma.usuario_roles_companiaUncheckedUpdateManyWithoutCompaniasInput>;
};
export type usuario_roles_companiaScalarWhereInput = {
    AND?: Prisma.usuario_roles_companiaScalarWhereInput | Prisma.usuario_roles_companiaScalarWhereInput[];
    OR?: Prisma.usuario_roles_companiaScalarWhereInput[];
    NOT?: Prisma.usuario_roles_companiaScalarWhereInput | Prisma.usuario_roles_companiaScalarWhereInput[];
    id?: Prisma.IntFilter<"usuario_roles_compania"> | number;
    usuario_id?: Prisma.IntNullableFilter<"usuario_roles_compania"> | number | null;
    rol_id?: Prisma.IntNullableFilter<"usuario_roles_compania"> | number | null;
    compania_id?: Prisma.IntNullableFilter<"usuario_roles_compania"> | number | null;
};
export type usuario_roles_companiaCreateWithoutRolesInput = {
    companias?: Prisma.companiasCreateNestedOneWithoutUsuario_roles_companiaInput;
    usuarios?: Prisma.usuariosCreateNestedOneWithoutUsuario_roles_companiaInput;
};
export type usuario_roles_companiaUncheckedCreateWithoutRolesInput = {
    id?: number;
    usuario_id?: number | null;
    compania_id?: number | null;
};
export type usuario_roles_companiaCreateOrConnectWithoutRolesInput = {
    where: Prisma.usuario_roles_companiaWhereUniqueInput;
    create: Prisma.XOR<Prisma.usuario_roles_companiaCreateWithoutRolesInput, Prisma.usuario_roles_companiaUncheckedCreateWithoutRolesInput>;
};
export type usuario_roles_companiaCreateManyRolesInputEnvelope = {
    data: Prisma.usuario_roles_companiaCreateManyRolesInput | Prisma.usuario_roles_companiaCreateManyRolesInput[];
    skipDuplicates?: boolean;
};
export type usuario_roles_companiaUpsertWithWhereUniqueWithoutRolesInput = {
    where: Prisma.usuario_roles_companiaWhereUniqueInput;
    update: Prisma.XOR<Prisma.usuario_roles_companiaUpdateWithoutRolesInput, Prisma.usuario_roles_companiaUncheckedUpdateWithoutRolesInput>;
    create: Prisma.XOR<Prisma.usuario_roles_companiaCreateWithoutRolesInput, Prisma.usuario_roles_companiaUncheckedCreateWithoutRolesInput>;
};
export type usuario_roles_companiaUpdateWithWhereUniqueWithoutRolesInput = {
    where: Prisma.usuario_roles_companiaWhereUniqueInput;
    data: Prisma.XOR<Prisma.usuario_roles_companiaUpdateWithoutRolesInput, Prisma.usuario_roles_companiaUncheckedUpdateWithoutRolesInput>;
};
export type usuario_roles_companiaUpdateManyWithWhereWithoutRolesInput = {
    where: Prisma.usuario_roles_companiaScalarWhereInput;
    data: Prisma.XOR<Prisma.usuario_roles_companiaUpdateManyMutationInput, Prisma.usuario_roles_companiaUncheckedUpdateManyWithoutRolesInput>;
};
export type usuario_roles_companiaCreateWithoutUsuariosInput = {
    companias?: Prisma.companiasCreateNestedOneWithoutUsuario_roles_companiaInput;
    roles?: Prisma.rolesCreateNestedOneWithoutUsuario_roles_companiaInput;
};
export type usuario_roles_companiaUncheckedCreateWithoutUsuariosInput = {
    id?: number;
    rol_id?: number | null;
    compania_id?: number | null;
};
export type usuario_roles_companiaCreateOrConnectWithoutUsuariosInput = {
    where: Prisma.usuario_roles_companiaWhereUniqueInput;
    create: Prisma.XOR<Prisma.usuario_roles_companiaCreateWithoutUsuariosInput, Prisma.usuario_roles_companiaUncheckedCreateWithoutUsuariosInput>;
};
export type usuario_roles_companiaCreateManyUsuariosInputEnvelope = {
    data: Prisma.usuario_roles_companiaCreateManyUsuariosInput | Prisma.usuario_roles_companiaCreateManyUsuariosInput[];
    skipDuplicates?: boolean;
};
export type usuario_roles_companiaUpsertWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.usuario_roles_companiaWhereUniqueInput;
    update: Prisma.XOR<Prisma.usuario_roles_companiaUpdateWithoutUsuariosInput, Prisma.usuario_roles_companiaUncheckedUpdateWithoutUsuariosInput>;
    create: Prisma.XOR<Prisma.usuario_roles_companiaCreateWithoutUsuariosInput, Prisma.usuario_roles_companiaUncheckedCreateWithoutUsuariosInput>;
};
export type usuario_roles_companiaUpdateWithWhereUniqueWithoutUsuariosInput = {
    where: Prisma.usuario_roles_companiaWhereUniqueInput;
    data: Prisma.XOR<Prisma.usuario_roles_companiaUpdateWithoutUsuariosInput, Prisma.usuario_roles_companiaUncheckedUpdateWithoutUsuariosInput>;
};
export type usuario_roles_companiaUpdateManyWithWhereWithoutUsuariosInput = {
    where: Prisma.usuario_roles_companiaScalarWhereInput;
    data: Prisma.XOR<Prisma.usuario_roles_companiaUpdateManyMutationInput, Prisma.usuario_roles_companiaUncheckedUpdateManyWithoutUsuariosInput>;
};
export type usuario_roles_companiaCreateManyCompaniasInput = {
    id?: number;
    usuario_id?: number | null;
    rol_id?: number | null;
};
export type usuario_roles_companiaUpdateWithoutCompaniasInput = {
    roles?: Prisma.rolesUpdateOneWithoutUsuario_roles_companiaNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutUsuario_roles_companiaNestedInput;
};
export type usuario_roles_companiaUncheckedUpdateWithoutCompaniasInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    usuario_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    rol_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type usuario_roles_companiaUncheckedUpdateManyWithoutCompaniasInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    usuario_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    rol_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type usuario_roles_companiaCreateManyRolesInput = {
    id?: number;
    usuario_id?: number | null;
    compania_id?: number | null;
};
export type usuario_roles_companiaUpdateWithoutRolesInput = {
    companias?: Prisma.companiasUpdateOneWithoutUsuario_roles_companiaNestedInput;
    usuarios?: Prisma.usuariosUpdateOneWithoutUsuario_roles_companiaNestedInput;
};
export type usuario_roles_companiaUncheckedUpdateWithoutRolesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    usuario_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    compania_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type usuario_roles_companiaUncheckedUpdateManyWithoutRolesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    usuario_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    compania_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type usuario_roles_companiaCreateManyUsuariosInput = {
    id?: number;
    rol_id?: number | null;
    compania_id?: number | null;
};
export type usuario_roles_companiaUpdateWithoutUsuariosInput = {
    companias?: Prisma.companiasUpdateOneWithoutUsuario_roles_companiaNestedInput;
    roles?: Prisma.rolesUpdateOneWithoutUsuario_roles_companiaNestedInput;
};
export type usuario_roles_companiaUncheckedUpdateWithoutUsuariosInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    rol_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    compania_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type usuario_roles_companiaUncheckedUpdateManyWithoutUsuariosInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    rol_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    compania_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type usuario_roles_companiaSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    usuario_id?: boolean;
    rol_id?: boolean;
    compania_id?: boolean;
    companias?: boolean | Prisma.usuario_roles_compania$companiasArgs<ExtArgs>;
    roles?: boolean | Prisma.usuario_roles_compania$rolesArgs<ExtArgs>;
    usuarios?: boolean | Prisma.usuario_roles_compania$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["usuario_roles_compania"]>;
export type usuario_roles_companiaSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    usuario_id?: boolean;
    rol_id?: boolean;
    compania_id?: boolean;
    companias?: boolean | Prisma.usuario_roles_compania$companiasArgs<ExtArgs>;
    roles?: boolean | Prisma.usuario_roles_compania$rolesArgs<ExtArgs>;
    usuarios?: boolean | Prisma.usuario_roles_compania$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["usuario_roles_compania"]>;
export type usuario_roles_companiaSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    usuario_id?: boolean;
    rol_id?: boolean;
    compania_id?: boolean;
    companias?: boolean | Prisma.usuario_roles_compania$companiasArgs<ExtArgs>;
    roles?: boolean | Prisma.usuario_roles_compania$rolesArgs<ExtArgs>;
    usuarios?: boolean | Prisma.usuario_roles_compania$usuariosArgs<ExtArgs>;
}, ExtArgs["result"]["usuario_roles_compania"]>;
export type usuario_roles_companiaSelectScalar = {
    id?: boolean;
    usuario_id?: boolean;
    rol_id?: boolean;
    compania_id?: boolean;
};
export type usuario_roles_companiaOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "usuario_id" | "rol_id" | "compania_id", ExtArgs["result"]["usuario_roles_compania"]>;
export type usuario_roles_companiaInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    companias?: boolean | Prisma.usuario_roles_compania$companiasArgs<ExtArgs>;
    roles?: boolean | Prisma.usuario_roles_compania$rolesArgs<ExtArgs>;
    usuarios?: boolean | Prisma.usuario_roles_compania$usuariosArgs<ExtArgs>;
};
export type usuario_roles_companiaIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    companias?: boolean | Prisma.usuario_roles_compania$companiasArgs<ExtArgs>;
    roles?: boolean | Prisma.usuario_roles_compania$rolesArgs<ExtArgs>;
    usuarios?: boolean | Prisma.usuario_roles_compania$usuariosArgs<ExtArgs>;
};
export type usuario_roles_companiaIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    companias?: boolean | Prisma.usuario_roles_compania$companiasArgs<ExtArgs>;
    roles?: boolean | Prisma.usuario_roles_compania$rolesArgs<ExtArgs>;
    usuarios?: boolean | Prisma.usuario_roles_compania$usuariosArgs<ExtArgs>;
};
export type $usuario_roles_companiaPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "usuario_roles_compania";
    objects: {
        companias: Prisma.$companiasPayload<ExtArgs> | null;
        roles: Prisma.$rolesPayload<ExtArgs> | null;
        usuarios: Prisma.$usuariosPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        usuario_id: number | null;
        rol_id: number | null;
        compania_id: number | null;
    }, ExtArgs["result"]["usuario_roles_compania"]>;
    composites: {};
};
export type usuario_roles_companiaGetPayload<S extends boolean | null | undefined | usuario_roles_companiaDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$usuario_roles_companiaPayload, S>;
export type usuario_roles_companiaCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<usuario_roles_companiaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Usuario_roles_companiaCountAggregateInputType | true;
};
export interface usuario_roles_companiaDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['usuario_roles_compania'];
        meta: {
            name: 'usuario_roles_compania';
        };
    };
    findUnique<T extends usuario_roles_companiaFindUniqueArgs>(args: Prisma.SelectSubset<T, usuario_roles_companiaFindUniqueArgs<ExtArgs>>): Prisma.Prisma__usuario_roles_companiaClient<runtime.Types.Result.GetResult<Prisma.$usuario_roles_companiaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends usuario_roles_companiaFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, usuario_roles_companiaFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__usuario_roles_companiaClient<runtime.Types.Result.GetResult<Prisma.$usuario_roles_companiaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends usuario_roles_companiaFindFirstArgs>(args?: Prisma.SelectSubset<T, usuario_roles_companiaFindFirstArgs<ExtArgs>>): Prisma.Prisma__usuario_roles_companiaClient<runtime.Types.Result.GetResult<Prisma.$usuario_roles_companiaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends usuario_roles_companiaFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, usuario_roles_companiaFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__usuario_roles_companiaClient<runtime.Types.Result.GetResult<Prisma.$usuario_roles_companiaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends usuario_roles_companiaFindManyArgs>(args?: Prisma.SelectSubset<T, usuario_roles_companiaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$usuario_roles_companiaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends usuario_roles_companiaCreateArgs>(args: Prisma.SelectSubset<T, usuario_roles_companiaCreateArgs<ExtArgs>>): Prisma.Prisma__usuario_roles_companiaClient<runtime.Types.Result.GetResult<Prisma.$usuario_roles_companiaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends usuario_roles_companiaCreateManyArgs>(args?: Prisma.SelectSubset<T, usuario_roles_companiaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends usuario_roles_companiaCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, usuario_roles_companiaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$usuario_roles_companiaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends usuario_roles_companiaDeleteArgs>(args: Prisma.SelectSubset<T, usuario_roles_companiaDeleteArgs<ExtArgs>>): Prisma.Prisma__usuario_roles_companiaClient<runtime.Types.Result.GetResult<Prisma.$usuario_roles_companiaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends usuario_roles_companiaUpdateArgs>(args: Prisma.SelectSubset<T, usuario_roles_companiaUpdateArgs<ExtArgs>>): Prisma.Prisma__usuario_roles_companiaClient<runtime.Types.Result.GetResult<Prisma.$usuario_roles_companiaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends usuario_roles_companiaDeleteManyArgs>(args?: Prisma.SelectSubset<T, usuario_roles_companiaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends usuario_roles_companiaUpdateManyArgs>(args: Prisma.SelectSubset<T, usuario_roles_companiaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends usuario_roles_companiaUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, usuario_roles_companiaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$usuario_roles_companiaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends usuario_roles_companiaUpsertArgs>(args: Prisma.SelectSubset<T, usuario_roles_companiaUpsertArgs<ExtArgs>>): Prisma.Prisma__usuario_roles_companiaClient<runtime.Types.Result.GetResult<Prisma.$usuario_roles_companiaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends usuario_roles_companiaCountArgs>(args?: Prisma.Subset<T, usuario_roles_companiaCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Usuario_roles_companiaCountAggregateOutputType> : number>;
    aggregate<T extends Usuario_roles_companiaAggregateArgs>(args: Prisma.Subset<T, Usuario_roles_companiaAggregateArgs>): Prisma.PrismaPromise<GetUsuario_roles_companiaAggregateType<T>>;
    groupBy<T extends usuario_roles_companiaGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: usuario_roles_companiaGroupByArgs['orderBy'];
    } : {
        orderBy?: usuario_roles_companiaGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, usuario_roles_companiaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuario_roles_companiaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: usuario_roles_companiaFieldRefs;
}
export interface Prisma__usuario_roles_companiaClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    companias<T extends Prisma.usuario_roles_compania$companiasArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usuario_roles_compania$companiasArgs<ExtArgs>>): Prisma.Prisma__companiasClient<runtime.Types.Result.GetResult<Prisma.$companiasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    roles<T extends Prisma.usuario_roles_compania$rolesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usuario_roles_compania$rolesArgs<ExtArgs>>): Prisma.Prisma__rolesClient<runtime.Types.Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    usuarios<T extends Prisma.usuario_roles_compania$usuariosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usuario_roles_compania$usuariosArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface usuario_roles_companiaFieldRefs {
    readonly id: Prisma.FieldRef<"usuario_roles_compania", 'Int'>;
    readonly usuario_id: Prisma.FieldRef<"usuario_roles_compania", 'Int'>;
    readonly rol_id: Prisma.FieldRef<"usuario_roles_compania", 'Int'>;
    readonly compania_id: Prisma.FieldRef<"usuario_roles_compania", 'Int'>;
}
export type usuario_roles_companiaFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usuario_roles_companiaSelect<ExtArgs> | null;
    omit?: Prisma.usuario_roles_companiaOmit<ExtArgs> | null;
    include?: Prisma.usuario_roles_companiaInclude<ExtArgs> | null;
    where: Prisma.usuario_roles_companiaWhereUniqueInput;
};
export type usuario_roles_companiaFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usuario_roles_companiaSelect<ExtArgs> | null;
    omit?: Prisma.usuario_roles_companiaOmit<ExtArgs> | null;
    include?: Prisma.usuario_roles_companiaInclude<ExtArgs> | null;
    where: Prisma.usuario_roles_companiaWhereUniqueInput;
};
export type usuario_roles_companiaFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type usuario_roles_companiaFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type usuario_roles_companiaFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type usuario_roles_companiaCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usuario_roles_companiaSelect<ExtArgs> | null;
    omit?: Prisma.usuario_roles_companiaOmit<ExtArgs> | null;
    include?: Prisma.usuario_roles_companiaInclude<ExtArgs> | null;
    data?: Prisma.XOR<Prisma.usuario_roles_companiaCreateInput, Prisma.usuario_roles_companiaUncheckedCreateInput>;
};
export type usuario_roles_companiaCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.usuario_roles_companiaCreateManyInput | Prisma.usuario_roles_companiaCreateManyInput[];
    skipDuplicates?: boolean;
};
export type usuario_roles_companiaCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usuario_roles_companiaSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.usuario_roles_companiaOmit<ExtArgs> | null;
    data: Prisma.usuario_roles_companiaCreateManyInput | Prisma.usuario_roles_companiaCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.usuario_roles_companiaIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type usuario_roles_companiaUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usuario_roles_companiaSelect<ExtArgs> | null;
    omit?: Prisma.usuario_roles_companiaOmit<ExtArgs> | null;
    include?: Prisma.usuario_roles_companiaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.usuario_roles_companiaUpdateInput, Prisma.usuario_roles_companiaUncheckedUpdateInput>;
    where: Prisma.usuario_roles_companiaWhereUniqueInput;
};
export type usuario_roles_companiaUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.usuario_roles_companiaUpdateManyMutationInput, Prisma.usuario_roles_companiaUncheckedUpdateManyInput>;
    where?: Prisma.usuario_roles_companiaWhereInput;
    limit?: number;
};
export type usuario_roles_companiaUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usuario_roles_companiaSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.usuario_roles_companiaOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.usuario_roles_companiaUpdateManyMutationInput, Prisma.usuario_roles_companiaUncheckedUpdateManyInput>;
    where?: Prisma.usuario_roles_companiaWhereInput;
    limit?: number;
    include?: Prisma.usuario_roles_companiaIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type usuario_roles_companiaUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usuario_roles_companiaSelect<ExtArgs> | null;
    omit?: Prisma.usuario_roles_companiaOmit<ExtArgs> | null;
    include?: Prisma.usuario_roles_companiaInclude<ExtArgs> | null;
    where: Prisma.usuario_roles_companiaWhereUniqueInput;
    create: Prisma.XOR<Prisma.usuario_roles_companiaCreateInput, Prisma.usuario_roles_companiaUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.usuario_roles_companiaUpdateInput, Prisma.usuario_roles_companiaUncheckedUpdateInput>;
};
export type usuario_roles_companiaDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usuario_roles_companiaSelect<ExtArgs> | null;
    omit?: Prisma.usuario_roles_companiaOmit<ExtArgs> | null;
    include?: Prisma.usuario_roles_companiaInclude<ExtArgs> | null;
    where: Prisma.usuario_roles_companiaWhereUniqueInput;
};
export type usuario_roles_companiaDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.usuario_roles_companiaWhereInput;
    limit?: number;
};
export type usuario_roles_compania$companiasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.companiasSelect<ExtArgs> | null;
    omit?: Prisma.companiasOmit<ExtArgs> | null;
    include?: Prisma.companiasInclude<ExtArgs> | null;
    where?: Prisma.companiasWhereInput;
};
export type usuario_roles_compania$rolesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.rolesSelect<ExtArgs> | null;
    omit?: Prisma.rolesOmit<ExtArgs> | null;
    include?: Prisma.rolesInclude<ExtArgs> | null;
    where?: Prisma.rolesWhereInput;
};
export type usuario_roles_compania$usuariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usuariosSelect<ExtArgs> | null;
    omit?: Prisma.usuariosOmit<ExtArgs> | null;
    include?: Prisma.usuariosInclude<ExtArgs> | null;
    where?: Prisma.usuariosWhereInput;
};
export type usuario_roles_companiaDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usuario_roles_companiaSelect<ExtArgs> | null;
    omit?: Prisma.usuario_roles_companiaOmit<ExtArgs> | null;
    include?: Prisma.usuario_roles_companiaInclude<ExtArgs> | null;
};
