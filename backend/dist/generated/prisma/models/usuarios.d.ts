import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type usuariosModel = runtime.Types.Result.DefaultSelection<Prisma.$usuariosPayload>;
export type AggregateUsuarios = {
    _count: UsuariosCountAggregateOutputType | null;
    _avg: UsuariosAvgAggregateOutputType | null;
    _sum: UsuariosSumAggregateOutputType | null;
    _min: UsuariosMinAggregateOutputType | null;
    _max: UsuariosMaxAggregateOutputType | null;
};
export type UsuariosAvgAggregateOutputType = {
    id: number | null;
};
export type UsuariosSumAggregateOutputType = {
    id: number | null;
};
export type UsuariosMinAggregateOutputType = {
    id: number | null;
    nombre: string | null;
    email: string | null;
    password_hash: string | null;
    proveedor_auth: string | null;
    area: string | null;
    activo: boolean | null;
    fecha_creacion: Date | null;
    eliminado_el: Date | null;
};
export type UsuariosMaxAggregateOutputType = {
    id: number | null;
    nombre: string | null;
    email: string | null;
    password_hash: string | null;
    proveedor_auth: string | null;
    area: string | null;
    activo: boolean | null;
    fecha_creacion: Date | null;
    eliminado_el: Date | null;
};
export type UsuariosCountAggregateOutputType = {
    id: number;
    nombre: number;
    email: number;
    password_hash: number;
    proveedor_auth: number;
    area: number;
    activo: number;
    fecha_creacion: number;
    eliminado_el: number;
    _all: number;
};
export type UsuariosAvgAggregateInputType = {
    id?: true;
};
export type UsuariosSumAggregateInputType = {
    id?: true;
};
export type UsuariosMinAggregateInputType = {
    id?: true;
    nombre?: true;
    email?: true;
    password_hash?: true;
    proveedor_auth?: true;
    area?: true;
    activo?: true;
    fecha_creacion?: true;
    eliminado_el?: true;
};
export type UsuariosMaxAggregateInputType = {
    id?: true;
    nombre?: true;
    email?: true;
    password_hash?: true;
    proveedor_auth?: true;
    area?: true;
    activo?: true;
    fecha_creacion?: true;
    eliminado_el?: true;
};
export type UsuariosCountAggregateInputType = {
    id?: true;
    nombre?: true;
    email?: true;
    password_hash?: true;
    proveedor_auth?: true;
    area?: true;
    activo?: true;
    fecha_creacion?: true;
    eliminado_el?: true;
    _all?: true;
};
export type UsuariosAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.usuariosWhereInput;
    orderBy?: Prisma.usuariosOrderByWithRelationInput | Prisma.usuariosOrderByWithRelationInput[];
    cursor?: Prisma.usuariosWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UsuariosCountAggregateInputType;
    _avg?: UsuariosAvgAggregateInputType;
    _sum?: UsuariosSumAggregateInputType;
    _min?: UsuariosMinAggregateInputType;
    _max?: UsuariosMaxAggregateInputType;
};
export type GetUsuariosAggregateType<T extends UsuariosAggregateArgs> = {
    [P in keyof T & keyof AggregateUsuarios]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUsuarios[P]> : Prisma.GetScalarType<T[P], AggregateUsuarios[P]>;
};
export type usuariosGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.usuariosWhereInput;
    orderBy?: Prisma.usuariosOrderByWithAggregationInput | Prisma.usuariosOrderByWithAggregationInput[];
    by: Prisma.UsuariosScalarFieldEnum[] | Prisma.UsuariosScalarFieldEnum;
    having?: Prisma.usuariosScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UsuariosCountAggregateInputType | true;
    _avg?: UsuariosAvgAggregateInputType;
    _sum?: UsuariosSumAggregateInputType;
    _min?: UsuariosMinAggregateInputType;
    _max?: UsuariosMaxAggregateInputType;
};
export type UsuariosGroupByOutputType = {
    id: number;
    nombre: string;
    email: string;
    password_hash: string | null;
    proveedor_auth: string | null;
    area: string | null;
    activo: boolean | null;
    fecha_creacion: Date | null;
    eliminado_el: Date | null;
    _count: UsuariosCountAggregateOutputType | null;
    _avg: UsuariosAvgAggregateOutputType | null;
    _sum: UsuariosSumAggregateOutputType | null;
    _min: UsuariosMinAggregateOutputType | null;
    _max: UsuariosMaxAggregateOutputType | null;
};
export type GetUsuariosGroupByPayload<T extends usuariosGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UsuariosGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UsuariosGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UsuariosGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UsuariosGroupByOutputType[P]>;
}>>;
export type usuariosWhereInput = {
    AND?: Prisma.usuariosWhereInput | Prisma.usuariosWhereInput[];
    OR?: Prisma.usuariosWhereInput[];
    NOT?: Prisma.usuariosWhereInput | Prisma.usuariosWhereInput[];
    id?: Prisma.IntFilter<"usuarios"> | number;
    nombre?: Prisma.StringFilter<"usuarios"> | string;
    email?: Prisma.StringFilter<"usuarios"> | string;
    password_hash?: Prisma.StringNullableFilter<"usuarios"> | string | null;
    proveedor_auth?: Prisma.StringNullableFilter<"usuarios"> | string | null;
    area?: Prisma.StringNullableFilter<"usuarios"> | string | null;
    activo?: Prisma.BoolNullableFilter<"usuarios"> | boolean | null;
    fecha_creacion?: Prisma.DateTimeNullableFilter<"usuarios"> | Date | string | null;
    eliminado_el?: Prisma.DateTimeNullableFilter<"usuarios"> | Date | string | null;
    asignaciones_proceso?: Prisma.Asignaciones_procesoListRelationFilter;
    historico_aprobaciones?: Prisma.Historico_aprobacionesListRelationFilter;
    proyectos?: Prisma.ProyectosListRelationFilter;
    solicitudes_inversion?: Prisma.Solicitudes_inversionListRelationFilter;
    usuario_roles_compania?: Prisma.Usuario_roles_companiaListRelationFilter;
};
export type usuariosOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password_hash?: Prisma.SortOrderInput | Prisma.SortOrder;
    proveedor_auth?: Prisma.SortOrderInput | Prisma.SortOrder;
    area?: Prisma.SortOrderInput | Prisma.SortOrder;
    activo?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_creacion?: Prisma.SortOrderInput | Prisma.SortOrder;
    eliminado_el?: Prisma.SortOrderInput | Prisma.SortOrder;
    asignaciones_proceso?: Prisma.asignaciones_procesoOrderByRelationAggregateInput;
    historico_aprobaciones?: Prisma.historico_aprobacionesOrderByRelationAggregateInput;
    proyectos?: Prisma.proyectosOrderByRelationAggregateInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionOrderByRelationAggregateInput;
    usuario_roles_compania?: Prisma.usuario_roles_companiaOrderByRelationAggregateInput;
};
export type usuariosWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    email?: string;
    AND?: Prisma.usuariosWhereInput | Prisma.usuariosWhereInput[];
    OR?: Prisma.usuariosWhereInput[];
    NOT?: Prisma.usuariosWhereInput | Prisma.usuariosWhereInput[];
    nombre?: Prisma.StringFilter<"usuarios"> | string;
    password_hash?: Prisma.StringNullableFilter<"usuarios"> | string | null;
    proveedor_auth?: Prisma.StringNullableFilter<"usuarios"> | string | null;
    area?: Prisma.StringNullableFilter<"usuarios"> | string | null;
    activo?: Prisma.BoolNullableFilter<"usuarios"> | boolean | null;
    fecha_creacion?: Prisma.DateTimeNullableFilter<"usuarios"> | Date | string | null;
    eliminado_el?: Prisma.DateTimeNullableFilter<"usuarios"> | Date | string | null;
    asignaciones_proceso?: Prisma.Asignaciones_procesoListRelationFilter;
    historico_aprobaciones?: Prisma.Historico_aprobacionesListRelationFilter;
    proyectos?: Prisma.ProyectosListRelationFilter;
    solicitudes_inversion?: Prisma.Solicitudes_inversionListRelationFilter;
    usuario_roles_compania?: Prisma.Usuario_roles_companiaListRelationFilter;
}, "id" | "email">;
export type usuariosOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password_hash?: Prisma.SortOrderInput | Prisma.SortOrder;
    proveedor_auth?: Prisma.SortOrderInput | Prisma.SortOrder;
    area?: Prisma.SortOrderInput | Prisma.SortOrder;
    activo?: Prisma.SortOrderInput | Prisma.SortOrder;
    fecha_creacion?: Prisma.SortOrderInput | Prisma.SortOrder;
    eliminado_el?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.usuariosCountOrderByAggregateInput;
    _avg?: Prisma.usuariosAvgOrderByAggregateInput;
    _max?: Prisma.usuariosMaxOrderByAggregateInput;
    _min?: Prisma.usuariosMinOrderByAggregateInput;
    _sum?: Prisma.usuariosSumOrderByAggregateInput;
};
export type usuariosScalarWhereWithAggregatesInput = {
    AND?: Prisma.usuariosScalarWhereWithAggregatesInput | Prisma.usuariosScalarWhereWithAggregatesInput[];
    OR?: Prisma.usuariosScalarWhereWithAggregatesInput[];
    NOT?: Prisma.usuariosScalarWhereWithAggregatesInput | Prisma.usuariosScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"usuarios"> | number;
    nombre?: Prisma.StringWithAggregatesFilter<"usuarios"> | string;
    email?: Prisma.StringWithAggregatesFilter<"usuarios"> | string;
    password_hash?: Prisma.StringNullableWithAggregatesFilter<"usuarios"> | string | null;
    proveedor_auth?: Prisma.StringNullableWithAggregatesFilter<"usuarios"> | string | null;
    area?: Prisma.StringNullableWithAggregatesFilter<"usuarios"> | string | null;
    activo?: Prisma.BoolNullableWithAggregatesFilter<"usuarios"> | boolean | null;
    fecha_creacion?: Prisma.DateTimeNullableWithAggregatesFilter<"usuarios"> | Date | string | null;
    eliminado_el?: Prisma.DateTimeNullableWithAggregatesFilter<"usuarios"> | Date | string | null;
};
export type usuariosCreateInput = {
    nombre: string;
    email: string;
    password_hash?: string | null;
    proveedor_auth?: string | null;
    area?: string | null;
    activo?: boolean | null;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoCreateNestedManyWithoutUsuariosInput;
    historico_aprobaciones?: Prisma.historico_aprobacionesCreateNestedManyWithoutUsuariosInput;
    proyectos?: Prisma.proyectosCreateNestedManyWithoutUsuariosInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionCreateNestedManyWithoutUsuariosInput;
    usuario_roles_compania?: Prisma.usuario_roles_companiaCreateNestedManyWithoutUsuariosInput;
};
export type usuariosUncheckedCreateInput = {
    id?: number;
    nombre: string;
    email: string;
    password_hash?: string | null;
    proveedor_auth?: string | null;
    area?: string | null;
    activo?: boolean | null;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoUncheckedCreateNestedManyWithoutUsuariosInput;
    historico_aprobaciones?: Prisma.historico_aprobacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    proyectos?: Prisma.proyectosUncheckedCreateNestedManyWithoutUsuariosInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionUncheckedCreateNestedManyWithoutUsuariosInput;
    usuario_roles_compania?: Prisma.usuario_roles_companiaUncheckedCreateNestedManyWithoutUsuariosInput;
};
export type usuariosUpdateInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proveedor_auth?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activo?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoUpdateManyWithoutUsuariosNestedInput;
    historico_aprobaciones?: Prisma.historico_aprobacionesUpdateManyWithoutUsuariosNestedInput;
    proyectos?: Prisma.proyectosUpdateManyWithoutUsuariosNestedInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionUpdateManyWithoutUsuariosNestedInput;
    usuario_roles_compania?: Prisma.usuario_roles_companiaUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proveedor_auth?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activo?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoUncheckedUpdateManyWithoutUsuariosNestedInput;
    historico_aprobaciones?: Prisma.historico_aprobacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    proyectos?: Prisma.proyectosUncheckedUpdateManyWithoutUsuariosNestedInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionUncheckedUpdateManyWithoutUsuariosNestedInput;
    usuario_roles_compania?: Prisma.usuario_roles_companiaUncheckedUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosCreateManyInput = {
    id?: number;
    nombre: string;
    email: string;
    password_hash?: string | null;
    proveedor_auth?: string | null;
    area?: string | null;
    activo?: boolean | null;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
};
export type usuariosUpdateManyMutationInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proveedor_auth?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activo?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type usuariosUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proveedor_auth?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activo?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type UsuariosNullableScalarRelationFilter = {
    is?: Prisma.usuariosWhereInput | null;
    isNot?: Prisma.usuariosWhereInput | null;
};
export type usuariosCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password_hash?: Prisma.SortOrder;
    proveedor_auth?: Prisma.SortOrder;
    area?: Prisma.SortOrder;
    activo?: Prisma.SortOrder;
    fecha_creacion?: Prisma.SortOrder;
    eliminado_el?: Prisma.SortOrder;
};
export type usuariosAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type usuariosMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password_hash?: Prisma.SortOrder;
    proveedor_auth?: Prisma.SortOrder;
    area?: Prisma.SortOrder;
    activo?: Prisma.SortOrder;
    fecha_creacion?: Prisma.SortOrder;
    eliminado_el?: Prisma.SortOrder;
};
export type usuariosMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password_hash?: Prisma.SortOrder;
    proveedor_auth?: Prisma.SortOrder;
    area?: Prisma.SortOrder;
    activo?: Prisma.SortOrder;
    fecha_creacion?: Prisma.SortOrder;
    eliminado_el?: Prisma.SortOrder;
};
export type usuariosSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type usuariosCreateNestedOneWithoutAsignaciones_procesoInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutAsignaciones_procesoInput, Prisma.usuariosUncheckedCreateWithoutAsignaciones_procesoInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutAsignaciones_procesoInput;
    connect?: Prisma.usuariosWhereUniqueInput;
};
export type usuariosUpdateOneWithoutAsignaciones_procesoNestedInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutAsignaciones_procesoInput, Prisma.usuariosUncheckedCreateWithoutAsignaciones_procesoInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutAsignaciones_procesoInput;
    upsert?: Prisma.usuariosUpsertWithoutAsignaciones_procesoInput;
    disconnect?: Prisma.usuariosWhereInput | boolean;
    delete?: Prisma.usuariosWhereInput | boolean;
    connect?: Prisma.usuariosWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usuariosUpdateToOneWithWhereWithoutAsignaciones_procesoInput, Prisma.usuariosUpdateWithoutAsignaciones_procesoInput>, Prisma.usuariosUncheckedUpdateWithoutAsignaciones_procesoInput>;
};
export type usuariosCreateNestedOneWithoutHistorico_aprobacionesInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutHistorico_aprobacionesInput, Prisma.usuariosUncheckedCreateWithoutHistorico_aprobacionesInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutHistorico_aprobacionesInput;
    connect?: Prisma.usuariosWhereUniqueInput;
};
export type usuariosUpdateOneWithoutHistorico_aprobacionesNestedInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutHistorico_aprobacionesInput, Prisma.usuariosUncheckedCreateWithoutHistorico_aprobacionesInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutHistorico_aprobacionesInput;
    upsert?: Prisma.usuariosUpsertWithoutHistorico_aprobacionesInput;
    disconnect?: Prisma.usuariosWhereInput | boolean;
    delete?: Prisma.usuariosWhereInput | boolean;
    connect?: Prisma.usuariosWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usuariosUpdateToOneWithWhereWithoutHistorico_aprobacionesInput, Prisma.usuariosUpdateWithoutHistorico_aprobacionesInput>, Prisma.usuariosUncheckedUpdateWithoutHistorico_aprobacionesInput>;
};
export type usuariosCreateNestedOneWithoutProyectosInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutProyectosInput, Prisma.usuariosUncheckedCreateWithoutProyectosInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutProyectosInput;
    connect?: Prisma.usuariosWhereUniqueInput;
};
export type usuariosUpdateOneWithoutProyectosNestedInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutProyectosInput, Prisma.usuariosUncheckedCreateWithoutProyectosInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutProyectosInput;
    upsert?: Prisma.usuariosUpsertWithoutProyectosInput;
    disconnect?: Prisma.usuariosWhereInput | boolean;
    delete?: Prisma.usuariosWhereInput | boolean;
    connect?: Prisma.usuariosWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usuariosUpdateToOneWithWhereWithoutProyectosInput, Prisma.usuariosUpdateWithoutProyectosInput>, Prisma.usuariosUncheckedUpdateWithoutProyectosInput>;
};
export type usuariosCreateNestedOneWithoutSolicitudes_inversionInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutSolicitudes_inversionInput, Prisma.usuariosUncheckedCreateWithoutSolicitudes_inversionInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutSolicitudes_inversionInput;
    connect?: Prisma.usuariosWhereUniqueInput;
};
export type usuariosUpdateOneWithoutSolicitudes_inversionNestedInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutSolicitudes_inversionInput, Prisma.usuariosUncheckedCreateWithoutSolicitudes_inversionInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutSolicitudes_inversionInput;
    upsert?: Prisma.usuariosUpsertWithoutSolicitudes_inversionInput;
    disconnect?: Prisma.usuariosWhereInput | boolean;
    delete?: Prisma.usuariosWhereInput | boolean;
    connect?: Prisma.usuariosWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usuariosUpdateToOneWithWhereWithoutSolicitudes_inversionInput, Prisma.usuariosUpdateWithoutSolicitudes_inversionInput>, Prisma.usuariosUncheckedUpdateWithoutSolicitudes_inversionInput>;
};
export type usuariosCreateNestedOneWithoutUsuario_roles_companiaInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutUsuario_roles_companiaInput, Prisma.usuariosUncheckedCreateWithoutUsuario_roles_companiaInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutUsuario_roles_companiaInput;
    connect?: Prisma.usuariosWhereUniqueInput;
};
export type usuariosUpdateOneWithoutUsuario_roles_companiaNestedInput = {
    create?: Prisma.XOR<Prisma.usuariosCreateWithoutUsuario_roles_companiaInput, Prisma.usuariosUncheckedCreateWithoutUsuario_roles_companiaInput>;
    connectOrCreate?: Prisma.usuariosCreateOrConnectWithoutUsuario_roles_companiaInput;
    upsert?: Prisma.usuariosUpsertWithoutUsuario_roles_companiaInput;
    disconnect?: Prisma.usuariosWhereInput | boolean;
    delete?: Prisma.usuariosWhereInput | boolean;
    connect?: Prisma.usuariosWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.usuariosUpdateToOneWithWhereWithoutUsuario_roles_companiaInput, Prisma.usuariosUpdateWithoutUsuario_roles_companiaInput>, Prisma.usuariosUncheckedUpdateWithoutUsuario_roles_companiaInput>;
};
export type usuariosCreateWithoutAsignaciones_procesoInput = {
    nombre: string;
    email: string;
    password_hash?: string | null;
    proveedor_auth?: string | null;
    area?: string | null;
    activo?: boolean | null;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
    historico_aprobaciones?: Prisma.historico_aprobacionesCreateNestedManyWithoutUsuariosInput;
    proyectos?: Prisma.proyectosCreateNestedManyWithoutUsuariosInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionCreateNestedManyWithoutUsuariosInput;
    usuario_roles_compania?: Prisma.usuario_roles_companiaCreateNestedManyWithoutUsuariosInput;
};
export type usuariosUncheckedCreateWithoutAsignaciones_procesoInput = {
    id?: number;
    nombre: string;
    email: string;
    password_hash?: string | null;
    proveedor_auth?: string | null;
    area?: string | null;
    activo?: boolean | null;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
    historico_aprobaciones?: Prisma.historico_aprobacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    proyectos?: Prisma.proyectosUncheckedCreateNestedManyWithoutUsuariosInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionUncheckedCreateNestedManyWithoutUsuariosInput;
    usuario_roles_compania?: Prisma.usuario_roles_companiaUncheckedCreateNestedManyWithoutUsuariosInput;
};
export type usuariosCreateOrConnectWithoutAsignaciones_procesoInput = {
    where: Prisma.usuariosWhereUniqueInput;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutAsignaciones_procesoInput, Prisma.usuariosUncheckedCreateWithoutAsignaciones_procesoInput>;
};
export type usuariosUpsertWithoutAsignaciones_procesoInput = {
    update: Prisma.XOR<Prisma.usuariosUpdateWithoutAsignaciones_procesoInput, Prisma.usuariosUncheckedUpdateWithoutAsignaciones_procesoInput>;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutAsignaciones_procesoInput, Prisma.usuariosUncheckedCreateWithoutAsignaciones_procesoInput>;
    where?: Prisma.usuariosWhereInput;
};
export type usuariosUpdateToOneWithWhereWithoutAsignaciones_procesoInput = {
    where?: Prisma.usuariosWhereInput;
    data: Prisma.XOR<Prisma.usuariosUpdateWithoutAsignaciones_procesoInput, Prisma.usuariosUncheckedUpdateWithoutAsignaciones_procesoInput>;
};
export type usuariosUpdateWithoutAsignaciones_procesoInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proveedor_auth?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activo?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    historico_aprobaciones?: Prisma.historico_aprobacionesUpdateManyWithoutUsuariosNestedInput;
    proyectos?: Prisma.proyectosUpdateManyWithoutUsuariosNestedInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionUpdateManyWithoutUsuariosNestedInput;
    usuario_roles_compania?: Prisma.usuario_roles_companiaUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosUncheckedUpdateWithoutAsignaciones_procesoInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proveedor_auth?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activo?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    historico_aprobaciones?: Prisma.historico_aprobacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    proyectos?: Prisma.proyectosUncheckedUpdateManyWithoutUsuariosNestedInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionUncheckedUpdateManyWithoutUsuariosNestedInput;
    usuario_roles_compania?: Prisma.usuario_roles_companiaUncheckedUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosCreateWithoutHistorico_aprobacionesInput = {
    nombre: string;
    email: string;
    password_hash?: string | null;
    proveedor_auth?: string | null;
    area?: string | null;
    activo?: boolean | null;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoCreateNestedManyWithoutUsuariosInput;
    proyectos?: Prisma.proyectosCreateNestedManyWithoutUsuariosInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionCreateNestedManyWithoutUsuariosInput;
    usuario_roles_compania?: Prisma.usuario_roles_companiaCreateNestedManyWithoutUsuariosInput;
};
export type usuariosUncheckedCreateWithoutHistorico_aprobacionesInput = {
    id?: number;
    nombre: string;
    email: string;
    password_hash?: string | null;
    proveedor_auth?: string | null;
    area?: string | null;
    activo?: boolean | null;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoUncheckedCreateNestedManyWithoutUsuariosInput;
    proyectos?: Prisma.proyectosUncheckedCreateNestedManyWithoutUsuariosInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionUncheckedCreateNestedManyWithoutUsuariosInput;
    usuario_roles_compania?: Prisma.usuario_roles_companiaUncheckedCreateNestedManyWithoutUsuariosInput;
};
export type usuariosCreateOrConnectWithoutHistorico_aprobacionesInput = {
    where: Prisma.usuariosWhereUniqueInput;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutHistorico_aprobacionesInput, Prisma.usuariosUncheckedCreateWithoutHistorico_aprobacionesInput>;
};
export type usuariosUpsertWithoutHistorico_aprobacionesInput = {
    update: Prisma.XOR<Prisma.usuariosUpdateWithoutHistorico_aprobacionesInput, Prisma.usuariosUncheckedUpdateWithoutHistorico_aprobacionesInput>;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutHistorico_aprobacionesInput, Prisma.usuariosUncheckedCreateWithoutHistorico_aprobacionesInput>;
    where?: Prisma.usuariosWhereInput;
};
export type usuariosUpdateToOneWithWhereWithoutHistorico_aprobacionesInput = {
    where?: Prisma.usuariosWhereInput;
    data: Prisma.XOR<Prisma.usuariosUpdateWithoutHistorico_aprobacionesInput, Prisma.usuariosUncheckedUpdateWithoutHistorico_aprobacionesInput>;
};
export type usuariosUpdateWithoutHistorico_aprobacionesInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proveedor_auth?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activo?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoUpdateManyWithoutUsuariosNestedInput;
    proyectos?: Prisma.proyectosUpdateManyWithoutUsuariosNestedInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionUpdateManyWithoutUsuariosNestedInput;
    usuario_roles_compania?: Prisma.usuario_roles_companiaUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosUncheckedUpdateWithoutHistorico_aprobacionesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proveedor_auth?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activo?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoUncheckedUpdateManyWithoutUsuariosNestedInput;
    proyectos?: Prisma.proyectosUncheckedUpdateManyWithoutUsuariosNestedInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionUncheckedUpdateManyWithoutUsuariosNestedInput;
    usuario_roles_compania?: Prisma.usuario_roles_companiaUncheckedUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosCreateWithoutProyectosInput = {
    nombre: string;
    email: string;
    password_hash?: string | null;
    proveedor_auth?: string | null;
    area?: string | null;
    activo?: boolean | null;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoCreateNestedManyWithoutUsuariosInput;
    historico_aprobaciones?: Prisma.historico_aprobacionesCreateNestedManyWithoutUsuariosInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionCreateNestedManyWithoutUsuariosInput;
    usuario_roles_compania?: Prisma.usuario_roles_companiaCreateNestedManyWithoutUsuariosInput;
};
export type usuariosUncheckedCreateWithoutProyectosInput = {
    id?: number;
    nombre: string;
    email: string;
    password_hash?: string | null;
    proveedor_auth?: string | null;
    area?: string | null;
    activo?: boolean | null;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoUncheckedCreateNestedManyWithoutUsuariosInput;
    historico_aprobaciones?: Prisma.historico_aprobacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionUncheckedCreateNestedManyWithoutUsuariosInput;
    usuario_roles_compania?: Prisma.usuario_roles_companiaUncheckedCreateNestedManyWithoutUsuariosInput;
};
export type usuariosCreateOrConnectWithoutProyectosInput = {
    where: Prisma.usuariosWhereUniqueInput;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutProyectosInput, Prisma.usuariosUncheckedCreateWithoutProyectosInput>;
};
export type usuariosUpsertWithoutProyectosInput = {
    update: Prisma.XOR<Prisma.usuariosUpdateWithoutProyectosInput, Prisma.usuariosUncheckedUpdateWithoutProyectosInput>;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutProyectosInput, Prisma.usuariosUncheckedCreateWithoutProyectosInput>;
    where?: Prisma.usuariosWhereInput;
};
export type usuariosUpdateToOneWithWhereWithoutProyectosInput = {
    where?: Prisma.usuariosWhereInput;
    data: Prisma.XOR<Prisma.usuariosUpdateWithoutProyectosInput, Prisma.usuariosUncheckedUpdateWithoutProyectosInput>;
};
export type usuariosUpdateWithoutProyectosInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proveedor_auth?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activo?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoUpdateManyWithoutUsuariosNestedInput;
    historico_aprobaciones?: Prisma.historico_aprobacionesUpdateManyWithoutUsuariosNestedInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionUpdateManyWithoutUsuariosNestedInput;
    usuario_roles_compania?: Prisma.usuario_roles_companiaUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosUncheckedUpdateWithoutProyectosInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proveedor_auth?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activo?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoUncheckedUpdateManyWithoutUsuariosNestedInput;
    historico_aprobaciones?: Prisma.historico_aprobacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionUncheckedUpdateManyWithoutUsuariosNestedInput;
    usuario_roles_compania?: Prisma.usuario_roles_companiaUncheckedUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosCreateWithoutSolicitudes_inversionInput = {
    nombre: string;
    email: string;
    password_hash?: string | null;
    proveedor_auth?: string | null;
    area?: string | null;
    activo?: boolean | null;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoCreateNestedManyWithoutUsuariosInput;
    historico_aprobaciones?: Prisma.historico_aprobacionesCreateNestedManyWithoutUsuariosInput;
    proyectos?: Prisma.proyectosCreateNestedManyWithoutUsuariosInput;
    usuario_roles_compania?: Prisma.usuario_roles_companiaCreateNestedManyWithoutUsuariosInput;
};
export type usuariosUncheckedCreateWithoutSolicitudes_inversionInput = {
    id?: number;
    nombre: string;
    email: string;
    password_hash?: string | null;
    proveedor_auth?: string | null;
    area?: string | null;
    activo?: boolean | null;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoUncheckedCreateNestedManyWithoutUsuariosInput;
    historico_aprobaciones?: Prisma.historico_aprobacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    proyectos?: Prisma.proyectosUncheckedCreateNestedManyWithoutUsuariosInput;
    usuario_roles_compania?: Prisma.usuario_roles_companiaUncheckedCreateNestedManyWithoutUsuariosInput;
};
export type usuariosCreateOrConnectWithoutSolicitudes_inversionInput = {
    where: Prisma.usuariosWhereUniqueInput;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutSolicitudes_inversionInput, Prisma.usuariosUncheckedCreateWithoutSolicitudes_inversionInput>;
};
export type usuariosUpsertWithoutSolicitudes_inversionInput = {
    update: Prisma.XOR<Prisma.usuariosUpdateWithoutSolicitudes_inversionInput, Prisma.usuariosUncheckedUpdateWithoutSolicitudes_inversionInput>;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutSolicitudes_inversionInput, Prisma.usuariosUncheckedCreateWithoutSolicitudes_inversionInput>;
    where?: Prisma.usuariosWhereInput;
};
export type usuariosUpdateToOneWithWhereWithoutSolicitudes_inversionInput = {
    where?: Prisma.usuariosWhereInput;
    data: Prisma.XOR<Prisma.usuariosUpdateWithoutSolicitudes_inversionInput, Prisma.usuariosUncheckedUpdateWithoutSolicitudes_inversionInput>;
};
export type usuariosUpdateWithoutSolicitudes_inversionInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proveedor_auth?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activo?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoUpdateManyWithoutUsuariosNestedInput;
    historico_aprobaciones?: Prisma.historico_aprobacionesUpdateManyWithoutUsuariosNestedInput;
    proyectos?: Prisma.proyectosUpdateManyWithoutUsuariosNestedInput;
    usuario_roles_compania?: Prisma.usuario_roles_companiaUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosUncheckedUpdateWithoutSolicitudes_inversionInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proveedor_auth?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activo?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoUncheckedUpdateManyWithoutUsuariosNestedInput;
    historico_aprobaciones?: Prisma.historico_aprobacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    proyectos?: Prisma.proyectosUncheckedUpdateManyWithoutUsuariosNestedInput;
    usuario_roles_compania?: Prisma.usuario_roles_companiaUncheckedUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosCreateWithoutUsuario_roles_companiaInput = {
    nombre: string;
    email: string;
    password_hash?: string | null;
    proveedor_auth?: string | null;
    area?: string | null;
    activo?: boolean | null;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoCreateNestedManyWithoutUsuariosInput;
    historico_aprobaciones?: Prisma.historico_aprobacionesCreateNestedManyWithoutUsuariosInput;
    proyectos?: Prisma.proyectosCreateNestedManyWithoutUsuariosInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionCreateNestedManyWithoutUsuariosInput;
};
export type usuariosUncheckedCreateWithoutUsuario_roles_companiaInput = {
    id?: number;
    nombre: string;
    email: string;
    password_hash?: string | null;
    proveedor_auth?: string | null;
    area?: string | null;
    activo?: boolean | null;
    fecha_creacion?: Date | string | null;
    eliminado_el?: Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoUncheckedCreateNestedManyWithoutUsuariosInput;
    historico_aprobaciones?: Prisma.historico_aprobacionesUncheckedCreateNestedManyWithoutUsuariosInput;
    proyectos?: Prisma.proyectosUncheckedCreateNestedManyWithoutUsuariosInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionUncheckedCreateNestedManyWithoutUsuariosInput;
};
export type usuariosCreateOrConnectWithoutUsuario_roles_companiaInput = {
    where: Prisma.usuariosWhereUniqueInput;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutUsuario_roles_companiaInput, Prisma.usuariosUncheckedCreateWithoutUsuario_roles_companiaInput>;
};
export type usuariosUpsertWithoutUsuario_roles_companiaInput = {
    update: Prisma.XOR<Prisma.usuariosUpdateWithoutUsuario_roles_companiaInput, Prisma.usuariosUncheckedUpdateWithoutUsuario_roles_companiaInput>;
    create: Prisma.XOR<Prisma.usuariosCreateWithoutUsuario_roles_companiaInput, Prisma.usuariosUncheckedCreateWithoutUsuario_roles_companiaInput>;
    where?: Prisma.usuariosWhereInput;
};
export type usuariosUpdateToOneWithWhereWithoutUsuario_roles_companiaInput = {
    where?: Prisma.usuariosWhereInput;
    data: Prisma.XOR<Prisma.usuariosUpdateWithoutUsuario_roles_companiaInput, Prisma.usuariosUncheckedUpdateWithoutUsuario_roles_companiaInput>;
};
export type usuariosUpdateWithoutUsuario_roles_companiaInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proveedor_auth?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activo?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoUpdateManyWithoutUsuariosNestedInput;
    historico_aprobaciones?: Prisma.historico_aprobacionesUpdateManyWithoutUsuariosNestedInput;
    proyectos?: Prisma.proyectosUpdateManyWithoutUsuariosNestedInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionUpdateManyWithoutUsuariosNestedInput;
};
export type usuariosUncheckedUpdateWithoutUsuario_roles_companiaInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password_hash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proveedor_auth?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    area?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    activo?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    fecha_creacion?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    eliminado_el?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    asignaciones_proceso?: Prisma.asignaciones_procesoUncheckedUpdateManyWithoutUsuariosNestedInput;
    historico_aprobaciones?: Prisma.historico_aprobacionesUncheckedUpdateManyWithoutUsuariosNestedInput;
    proyectos?: Prisma.proyectosUncheckedUpdateManyWithoutUsuariosNestedInput;
    solicitudes_inversion?: Prisma.solicitudes_inversionUncheckedUpdateManyWithoutUsuariosNestedInput;
};
export type UsuariosCountOutputType = {
    asignaciones_proceso: number;
    historico_aprobaciones: number;
    proyectos: number;
    solicitudes_inversion: number;
    usuario_roles_compania: number;
};
export type UsuariosCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    asignaciones_proceso?: boolean | UsuariosCountOutputTypeCountAsignaciones_procesoArgs;
    historico_aprobaciones?: boolean | UsuariosCountOutputTypeCountHistorico_aprobacionesArgs;
    proyectos?: boolean | UsuariosCountOutputTypeCountProyectosArgs;
    solicitudes_inversion?: boolean | UsuariosCountOutputTypeCountSolicitudes_inversionArgs;
    usuario_roles_compania?: boolean | UsuariosCountOutputTypeCountUsuario_roles_companiaArgs;
};
export type UsuariosCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UsuariosCountOutputTypeSelect<ExtArgs> | null;
};
export type UsuariosCountOutputTypeCountAsignaciones_procesoArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.asignaciones_procesoWhereInput;
};
export type UsuariosCountOutputTypeCountHistorico_aprobacionesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.historico_aprobacionesWhereInput;
};
export type UsuariosCountOutputTypeCountProyectosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.proyectosWhereInput;
};
export type UsuariosCountOutputTypeCountSolicitudes_inversionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.solicitudes_inversionWhereInput;
};
export type UsuariosCountOutputTypeCountUsuario_roles_companiaArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.usuario_roles_companiaWhereInput;
};
export type usuariosSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nombre?: boolean;
    email?: boolean;
    password_hash?: boolean;
    proveedor_auth?: boolean;
    area?: boolean;
    activo?: boolean;
    fecha_creacion?: boolean;
    eliminado_el?: boolean;
    asignaciones_proceso?: boolean | Prisma.usuarios$asignaciones_procesoArgs<ExtArgs>;
    historico_aprobaciones?: boolean | Prisma.usuarios$historico_aprobacionesArgs<ExtArgs>;
    proyectos?: boolean | Prisma.usuarios$proyectosArgs<ExtArgs>;
    solicitudes_inversion?: boolean | Prisma.usuarios$solicitudes_inversionArgs<ExtArgs>;
    usuario_roles_compania?: boolean | Prisma.usuarios$usuario_roles_companiaArgs<ExtArgs>;
    _count?: boolean | Prisma.UsuariosCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["usuarios"]>;
export type usuariosSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nombre?: boolean;
    email?: boolean;
    password_hash?: boolean;
    proveedor_auth?: boolean;
    area?: boolean;
    activo?: boolean;
    fecha_creacion?: boolean;
    eliminado_el?: boolean;
}, ExtArgs["result"]["usuarios"]>;
export type usuariosSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    nombre?: boolean;
    email?: boolean;
    password_hash?: boolean;
    proveedor_auth?: boolean;
    area?: boolean;
    activo?: boolean;
    fecha_creacion?: boolean;
    eliminado_el?: boolean;
}, ExtArgs["result"]["usuarios"]>;
export type usuariosSelectScalar = {
    id?: boolean;
    nombre?: boolean;
    email?: boolean;
    password_hash?: boolean;
    proveedor_auth?: boolean;
    area?: boolean;
    activo?: boolean;
    fecha_creacion?: boolean;
    eliminado_el?: boolean;
};
export type usuariosOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "nombre" | "email" | "password_hash" | "proveedor_auth" | "area" | "activo" | "fecha_creacion" | "eliminado_el", ExtArgs["result"]["usuarios"]>;
export type usuariosInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    asignaciones_proceso?: boolean | Prisma.usuarios$asignaciones_procesoArgs<ExtArgs>;
    historico_aprobaciones?: boolean | Prisma.usuarios$historico_aprobacionesArgs<ExtArgs>;
    proyectos?: boolean | Prisma.usuarios$proyectosArgs<ExtArgs>;
    solicitudes_inversion?: boolean | Prisma.usuarios$solicitudes_inversionArgs<ExtArgs>;
    usuario_roles_compania?: boolean | Prisma.usuarios$usuario_roles_companiaArgs<ExtArgs>;
    _count?: boolean | Prisma.UsuariosCountOutputTypeDefaultArgs<ExtArgs>;
};
export type usuariosIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type usuariosIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $usuariosPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "usuarios";
    objects: {
        asignaciones_proceso: Prisma.$asignaciones_procesoPayload<ExtArgs>[];
        historico_aprobaciones: Prisma.$historico_aprobacionesPayload<ExtArgs>[];
        proyectos: Prisma.$proyectosPayload<ExtArgs>[];
        solicitudes_inversion: Prisma.$solicitudes_inversionPayload<ExtArgs>[];
        usuario_roles_compania: Prisma.$usuario_roles_companiaPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        nombre: string;
        email: string;
        password_hash: string | null;
        proveedor_auth: string | null;
        area: string | null;
        activo: boolean | null;
        fecha_creacion: Date | null;
        eliminado_el: Date | null;
    }, ExtArgs["result"]["usuarios"]>;
    composites: {};
};
export type usuariosGetPayload<S extends boolean | null | undefined | usuariosDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$usuariosPayload, S>;
export type usuariosCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<usuariosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UsuariosCountAggregateInputType | true;
};
export interface usuariosDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['usuarios'];
        meta: {
            name: 'usuarios';
        };
    };
    findUnique<T extends usuariosFindUniqueArgs>(args: Prisma.SelectSubset<T, usuariosFindUniqueArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends usuariosFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, usuariosFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends usuariosFindFirstArgs>(args?: Prisma.SelectSubset<T, usuariosFindFirstArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends usuariosFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, usuariosFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends usuariosFindManyArgs>(args?: Prisma.SelectSubset<T, usuariosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends usuariosCreateArgs>(args: Prisma.SelectSubset<T, usuariosCreateArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends usuariosCreateManyArgs>(args?: Prisma.SelectSubset<T, usuariosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends usuariosCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, usuariosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends usuariosDeleteArgs>(args: Prisma.SelectSubset<T, usuariosDeleteArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends usuariosUpdateArgs>(args: Prisma.SelectSubset<T, usuariosUpdateArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends usuariosDeleteManyArgs>(args?: Prisma.SelectSubset<T, usuariosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends usuariosUpdateManyArgs>(args: Prisma.SelectSubset<T, usuariosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends usuariosUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, usuariosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends usuariosUpsertArgs>(args: Prisma.SelectSubset<T, usuariosUpsertArgs<ExtArgs>>): Prisma.Prisma__usuariosClient<runtime.Types.Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends usuariosCountArgs>(args?: Prisma.Subset<T, usuariosCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UsuariosCountAggregateOutputType> : number>;
    aggregate<T extends UsuariosAggregateArgs>(args: Prisma.Subset<T, UsuariosAggregateArgs>): Prisma.PrismaPromise<GetUsuariosAggregateType<T>>;
    groupBy<T extends usuariosGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: usuariosGroupByArgs['orderBy'];
    } : {
        orderBy?: usuariosGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, usuariosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuariosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: usuariosFieldRefs;
}
export interface Prisma__usuariosClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    asignaciones_proceso<T extends Prisma.usuarios$asignaciones_procesoArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usuarios$asignaciones_procesoArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$asignaciones_procesoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    historico_aprobaciones<T extends Prisma.usuarios$historico_aprobacionesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usuarios$historico_aprobacionesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$historico_aprobacionesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    proyectos<T extends Prisma.usuarios$proyectosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usuarios$proyectosArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$proyectosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    solicitudes_inversion<T extends Prisma.usuarios$solicitudes_inversionArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usuarios$solicitudes_inversionArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$solicitudes_inversionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    usuario_roles_compania<T extends Prisma.usuarios$usuario_roles_companiaArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.usuarios$usuario_roles_companiaArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$usuario_roles_companiaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface usuariosFieldRefs {
    readonly id: Prisma.FieldRef<"usuarios", 'Int'>;
    readonly nombre: Prisma.FieldRef<"usuarios", 'String'>;
    readonly email: Prisma.FieldRef<"usuarios", 'String'>;
    readonly password_hash: Prisma.FieldRef<"usuarios", 'String'>;
    readonly proveedor_auth: Prisma.FieldRef<"usuarios", 'String'>;
    readonly area: Prisma.FieldRef<"usuarios", 'String'>;
    readonly activo: Prisma.FieldRef<"usuarios", 'Boolean'>;
    readonly fecha_creacion: Prisma.FieldRef<"usuarios", 'DateTime'>;
    readonly eliminado_el: Prisma.FieldRef<"usuarios", 'DateTime'>;
}
export type usuariosFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usuariosSelect<ExtArgs> | null;
    omit?: Prisma.usuariosOmit<ExtArgs> | null;
    include?: Prisma.usuariosInclude<ExtArgs> | null;
    where: Prisma.usuariosWhereUniqueInput;
};
export type usuariosFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usuariosSelect<ExtArgs> | null;
    omit?: Prisma.usuariosOmit<ExtArgs> | null;
    include?: Prisma.usuariosInclude<ExtArgs> | null;
    where: Prisma.usuariosWhereUniqueInput;
};
export type usuariosFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usuariosSelect<ExtArgs> | null;
    omit?: Prisma.usuariosOmit<ExtArgs> | null;
    include?: Prisma.usuariosInclude<ExtArgs> | null;
    where?: Prisma.usuariosWhereInput;
    orderBy?: Prisma.usuariosOrderByWithRelationInput | Prisma.usuariosOrderByWithRelationInput[];
    cursor?: Prisma.usuariosWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UsuariosScalarFieldEnum | Prisma.UsuariosScalarFieldEnum[];
};
export type usuariosFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usuariosSelect<ExtArgs> | null;
    omit?: Prisma.usuariosOmit<ExtArgs> | null;
    include?: Prisma.usuariosInclude<ExtArgs> | null;
    where?: Prisma.usuariosWhereInput;
    orderBy?: Prisma.usuariosOrderByWithRelationInput | Prisma.usuariosOrderByWithRelationInput[];
    cursor?: Prisma.usuariosWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UsuariosScalarFieldEnum | Prisma.UsuariosScalarFieldEnum[];
};
export type usuariosFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usuariosSelect<ExtArgs> | null;
    omit?: Prisma.usuariosOmit<ExtArgs> | null;
    include?: Prisma.usuariosInclude<ExtArgs> | null;
    where?: Prisma.usuariosWhereInput;
    orderBy?: Prisma.usuariosOrderByWithRelationInput | Prisma.usuariosOrderByWithRelationInput[];
    cursor?: Prisma.usuariosWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UsuariosScalarFieldEnum | Prisma.UsuariosScalarFieldEnum[];
};
export type usuariosCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usuariosSelect<ExtArgs> | null;
    omit?: Prisma.usuariosOmit<ExtArgs> | null;
    include?: Prisma.usuariosInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.usuariosCreateInput, Prisma.usuariosUncheckedCreateInput>;
};
export type usuariosCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.usuariosCreateManyInput | Prisma.usuariosCreateManyInput[];
    skipDuplicates?: boolean;
};
export type usuariosCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usuariosSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.usuariosOmit<ExtArgs> | null;
    data: Prisma.usuariosCreateManyInput | Prisma.usuariosCreateManyInput[];
    skipDuplicates?: boolean;
};
export type usuariosUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usuariosSelect<ExtArgs> | null;
    omit?: Prisma.usuariosOmit<ExtArgs> | null;
    include?: Prisma.usuariosInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.usuariosUpdateInput, Prisma.usuariosUncheckedUpdateInput>;
    where: Prisma.usuariosWhereUniqueInput;
};
export type usuariosUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.usuariosUpdateManyMutationInput, Prisma.usuariosUncheckedUpdateManyInput>;
    where?: Prisma.usuariosWhereInput;
    limit?: number;
};
export type usuariosUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usuariosSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.usuariosOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.usuariosUpdateManyMutationInput, Prisma.usuariosUncheckedUpdateManyInput>;
    where?: Prisma.usuariosWhereInput;
    limit?: number;
};
export type usuariosUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usuariosSelect<ExtArgs> | null;
    omit?: Prisma.usuariosOmit<ExtArgs> | null;
    include?: Prisma.usuariosInclude<ExtArgs> | null;
    where: Prisma.usuariosWhereUniqueInput;
    create: Prisma.XOR<Prisma.usuariosCreateInput, Prisma.usuariosUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.usuariosUpdateInput, Prisma.usuariosUncheckedUpdateInput>;
};
export type usuariosDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usuariosSelect<ExtArgs> | null;
    omit?: Prisma.usuariosOmit<ExtArgs> | null;
    include?: Prisma.usuariosInclude<ExtArgs> | null;
    where: Prisma.usuariosWhereUniqueInput;
};
export type usuariosDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.usuariosWhereInput;
    limit?: number;
};
export type usuarios$asignaciones_procesoArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type usuarios$historico_aprobacionesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.historico_aprobacionesSelect<ExtArgs> | null;
    omit?: Prisma.historico_aprobacionesOmit<ExtArgs> | null;
    include?: Prisma.historico_aprobacionesInclude<ExtArgs> | null;
    where?: Prisma.historico_aprobacionesWhereInput;
    orderBy?: Prisma.historico_aprobacionesOrderByWithRelationInput | Prisma.historico_aprobacionesOrderByWithRelationInput[];
    cursor?: Prisma.historico_aprobacionesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Historico_aprobacionesScalarFieldEnum | Prisma.Historico_aprobacionesScalarFieldEnum[];
};
export type usuarios$proyectosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type usuarios$solicitudes_inversionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.solicitudes_inversionSelect<ExtArgs> | null;
    omit?: Prisma.solicitudes_inversionOmit<ExtArgs> | null;
    include?: Prisma.solicitudes_inversionInclude<ExtArgs> | null;
    where?: Prisma.solicitudes_inversionWhereInput;
    orderBy?: Prisma.solicitudes_inversionOrderByWithRelationInput | Prisma.solicitudes_inversionOrderByWithRelationInput[];
    cursor?: Prisma.solicitudes_inversionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.Solicitudes_inversionScalarFieldEnum | Prisma.Solicitudes_inversionScalarFieldEnum[];
};
export type usuarios$usuario_roles_companiaArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type usuariosDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.usuariosSelect<ExtArgs> | null;
    omit?: Prisma.usuariosOmit<ExtArgs> | null;
    include?: Prisma.usuariosInclude<ExtArgs> | null;
};
