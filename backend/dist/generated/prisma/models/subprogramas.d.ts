import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type subprogramasModel = runtime.Types.Result.DefaultSelection<Prisma.$subprogramasPayload>;
export type AggregateSubprogramas = {
    _count: SubprogramasCountAggregateOutputType | null;
    _avg: SubprogramasAvgAggregateOutputType | null;
    _sum: SubprogramasSumAggregateOutputType | null;
    _min: SubprogramasMinAggregateOutputType | null;
    _max: SubprogramasMaxAggregateOutputType | null;
};
export type SubprogramasAvgAggregateOutputType = {
    id: number | null;
    programa_id: number | null;
};
export type SubprogramasSumAggregateOutputType = {
    id: number | null;
    programa_id: number | null;
};
export type SubprogramasMinAggregateOutputType = {
    id: number | null;
    programa_id: number | null;
    nombre: string | null;
    requiere_evaluacion_obligatoria: boolean | null;
};
export type SubprogramasMaxAggregateOutputType = {
    id: number | null;
    programa_id: number | null;
    nombre: string | null;
    requiere_evaluacion_obligatoria: boolean | null;
};
export type SubprogramasCountAggregateOutputType = {
    id: number;
    programa_id: number;
    nombre: number;
    requiere_evaluacion_obligatoria: number;
    _all: number;
};
export type SubprogramasAvgAggregateInputType = {
    id?: true;
    programa_id?: true;
};
export type SubprogramasSumAggregateInputType = {
    id?: true;
    programa_id?: true;
};
export type SubprogramasMinAggregateInputType = {
    id?: true;
    programa_id?: true;
    nombre?: true;
    requiere_evaluacion_obligatoria?: true;
};
export type SubprogramasMaxAggregateInputType = {
    id?: true;
    programa_id?: true;
    nombre?: true;
    requiere_evaluacion_obligatoria?: true;
};
export type SubprogramasCountAggregateInputType = {
    id?: true;
    programa_id?: true;
    nombre?: true;
    requiere_evaluacion_obligatoria?: true;
    _all?: true;
};
export type SubprogramasAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.subprogramasWhereInput;
    orderBy?: Prisma.subprogramasOrderByWithRelationInput | Prisma.subprogramasOrderByWithRelationInput[];
    cursor?: Prisma.subprogramasWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SubprogramasCountAggregateInputType;
    _avg?: SubprogramasAvgAggregateInputType;
    _sum?: SubprogramasSumAggregateInputType;
    _min?: SubprogramasMinAggregateInputType;
    _max?: SubprogramasMaxAggregateInputType;
};
export type GetSubprogramasAggregateType<T extends SubprogramasAggregateArgs> = {
    [P in keyof T & keyof AggregateSubprogramas]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSubprogramas[P]> : Prisma.GetScalarType<T[P], AggregateSubprogramas[P]>;
};
export type subprogramasGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.subprogramasWhereInput;
    orderBy?: Prisma.subprogramasOrderByWithAggregationInput | Prisma.subprogramasOrderByWithAggregationInput[];
    by: Prisma.SubprogramasScalarFieldEnum[] | Prisma.SubprogramasScalarFieldEnum;
    having?: Prisma.subprogramasScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SubprogramasCountAggregateInputType | true;
    _avg?: SubprogramasAvgAggregateInputType;
    _sum?: SubprogramasSumAggregateInputType;
    _min?: SubprogramasMinAggregateInputType;
    _max?: SubprogramasMaxAggregateInputType;
};
export type SubprogramasGroupByOutputType = {
    id: number;
    programa_id: number | null;
    nombre: string;
    requiere_evaluacion_obligatoria: boolean | null;
    _count: SubprogramasCountAggregateOutputType | null;
    _avg: SubprogramasAvgAggregateOutputType | null;
    _sum: SubprogramasSumAggregateOutputType | null;
    _min: SubprogramasMinAggregateOutputType | null;
    _max: SubprogramasMaxAggregateOutputType | null;
};
export type GetSubprogramasGroupByPayload<T extends subprogramasGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SubprogramasGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SubprogramasGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SubprogramasGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SubprogramasGroupByOutputType[P]>;
}>>;
export type subprogramasWhereInput = {
    AND?: Prisma.subprogramasWhereInput | Prisma.subprogramasWhereInput[];
    OR?: Prisma.subprogramasWhereInput[];
    NOT?: Prisma.subprogramasWhereInput | Prisma.subprogramasWhereInput[];
    id?: Prisma.IntFilter<"subprogramas"> | number;
    programa_id?: Prisma.IntNullableFilter<"subprogramas"> | number | null;
    nombre?: Prisma.StringFilter<"subprogramas"> | string;
    requiere_evaluacion_obligatoria?: Prisma.BoolNullableFilter<"subprogramas"> | boolean | null;
    solicitudes_inversion?: Prisma.Solicitudes_inversionListRelationFilter;
    programas?: Prisma.XOR<Prisma.ProgramasNullableScalarRelationFilter, Prisma.programasWhereInput> | null;
};
export type subprogramasOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    programa_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    requiere_evaluacion_obligatoria?: Prisma.SortOrderInput | Prisma.SortOrder;
    solicitudes_inversion?: Prisma.solicitudes_inversionOrderByRelationAggregateInput;
    programas?: Prisma.programasOrderByWithRelationInput;
};
export type subprogramasWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.subprogramasWhereInput | Prisma.subprogramasWhereInput[];
    OR?: Prisma.subprogramasWhereInput[];
    NOT?: Prisma.subprogramasWhereInput | Prisma.subprogramasWhereInput[];
    programa_id?: Prisma.IntNullableFilter<"subprogramas"> | number | null;
    nombre?: Prisma.StringFilter<"subprogramas"> | string;
    requiere_evaluacion_obligatoria?: Prisma.BoolNullableFilter<"subprogramas"> | boolean | null;
    solicitudes_inversion?: Prisma.Solicitudes_inversionListRelationFilter;
    programas?: Prisma.XOR<Prisma.ProgramasNullableScalarRelationFilter, Prisma.programasWhereInput> | null;
}, "id">;
export type subprogramasOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    programa_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    requiere_evaluacion_obligatoria?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.subprogramasCountOrderByAggregateInput;
    _avg?: Prisma.subprogramasAvgOrderByAggregateInput;
    _max?: Prisma.subprogramasMaxOrderByAggregateInput;
    _min?: Prisma.subprogramasMinOrderByAggregateInput;
    _sum?: Prisma.subprogramasSumOrderByAggregateInput;
};
export type subprogramasScalarWhereWithAggregatesInput = {
    AND?: Prisma.subprogramasScalarWhereWithAggregatesInput | Prisma.subprogramasScalarWhereWithAggregatesInput[];
    OR?: Prisma.subprogramasScalarWhereWithAggregatesInput[];
    NOT?: Prisma.subprogramasScalarWhereWithAggregatesInput | Prisma.subprogramasScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"subprogramas"> | number;
    programa_id?: Prisma.IntNullableWithAggregatesFilter<"subprogramas"> | number | null;
    nombre?: Prisma.StringWithAggregatesFilter<"subprogramas"> | string;
    requiere_evaluacion_obligatoria?: Prisma.BoolNullableWithAggregatesFilter<"subprogramas"> | boolean | null;
};
export type subprogramasCreateInput = {
    nombre: string;
    requiere_evaluacion_obligatoria?: boolean | null;
    solicitudes_inversion?: Prisma.solicitudes_inversionCreateNestedManyWithoutSubprogramasInput;
    programas?: Prisma.programasCreateNestedOneWithoutSubprogramasInput;
};
export type subprogramasUncheckedCreateInput = {
    id?: number;
    programa_id?: number | null;
    nombre: string;
    requiere_evaluacion_obligatoria?: boolean | null;
    solicitudes_inversion?: Prisma.solicitudes_inversionUncheckedCreateNestedManyWithoutSubprogramasInput;
};
export type subprogramasUpdateInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    requiere_evaluacion_obligatoria?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    solicitudes_inversion?: Prisma.solicitudes_inversionUpdateManyWithoutSubprogramasNestedInput;
    programas?: Prisma.programasUpdateOneWithoutSubprogramasNestedInput;
};
export type subprogramasUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    programa_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    requiere_evaluacion_obligatoria?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    solicitudes_inversion?: Prisma.solicitudes_inversionUncheckedUpdateManyWithoutSubprogramasNestedInput;
};
export type subprogramasCreateManyInput = {
    id?: number;
    programa_id?: number | null;
    nombre: string;
    requiere_evaluacion_obligatoria?: boolean | null;
};
export type subprogramasUpdateManyMutationInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    requiere_evaluacion_obligatoria?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
};
export type subprogramasUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    programa_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    requiere_evaluacion_obligatoria?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
};
export type SubprogramasListRelationFilter = {
    every?: Prisma.subprogramasWhereInput;
    some?: Prisma.subprogramasWhereInput;
    none?: Prisma.subprogramasWhereInput;
};
export type subprogramasOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SubprogramasNullableScalarRelationFilter = {
    is?: Prisma.subprogramasWhereInput | null;
    isNot?: Prisma.subprogramasWhereInput | null;
};
export type subprogramasCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    programa_id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    requiere_evaluacion_obligatoria?: Prisma.SortOrder;
};
export type subprogramasAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    programa_id?: Prisma.SortOrder;
};
export type subprogramasMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    programa_id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    requiere_evaluacion_obligatoria?: Prisma.SortOrder;
};
export type subprogramasMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    programa_id?: Prisma.SortOrder;
    nombre?: Prisma.SortOrder;
    requiere_evaluacion_obligatoria?: Prisma.SortOrder;
};
export type subprogramasSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    programa_id?: Prisma.SortOrder;
};
export type subprogramasCreateNestedManyWithoutProgramasInput = {
    create?: Prisma.XOR<Prisma.subprogramasCreateWithoutProgramasInput, Prisma.subprogramasUncheckedCreateWithoutProgramasInput> | Prisma.subprogramasCreateWithoutProgramasInput[] | Prisma.subprogramasUncheckedCreateWithoutProgramasInput[];
    connectOrCreate?: Prisma.subprogramasCreateOrConnectWithoutProgramasInput | Prisma.subprogramasCreateOrConnectWithoutProgramasInput[];
    createMany?: Prisma.subprogramasCreateManyProgramasInputEnvelope;
    connect?: Prisma.subprogramasWhereUniqueInput | Prisma.subprogramasWhereUniqueInput[];
};
export type subprogramasUncheckedCreateNestedManyWithoutProgramasInput = {
    create?: Prisma.XOR<Prisma.subprogramasCreateWithoutProgramasInput, Prisma.subprogramasUncheckedCreateWithoutProgramasInput> | Prisma.subprogramasCreateWithoutProgramasInput[] | Prisma.subprogramasUncheckedCreateWithoutProgramasInput[];
    connectOrCreate?: Prisma.subprogramasCreateOrConnectWithoutProgramasInput | Prisma.subprogramasCreateOrConnectWithoutProgramasInput[];
    createMany?: Prisma.subprogramasCreateManyProgramasInputEnvelope;
    connect?: Prisma.subprogramasWhereUniqueInput | Prisma.subprogramasWhereUniqueInput[];
};
export type subprogramasUpdateManyWithoutProgramasNestedInput = {
    create?: Prisma.XOR<Prisma.subprogramasCreateWithoutProgramasInput, Prisma.subprogramasUncheckedCreateWithoutProgramasInput> | Prisma.subprogramasCreateWithoutProgramasInput[] | Prisma.subprogramasUncheckedCreateWithoutProgramasInput[];
    connectOrCreate?: Prisma.subprogramasCreateOrConnectWithoutProgramasInput | Prisma.subprogramasCreateOrConnectWithoutProgramasInput[];
    upsert?: Prisma.subprogramasUpsertWithWhereUniqueWithoutProgramasInput | Prisma.subprogramasUpsertWithWhereUniqueWithoutProgramasInput[];
    createMany?: Prisma.subprogramasCreateManyProgramasInputEnvelope;
    set?: Prisma.subprogramasWhereUniqueInput | Prisma.subprogramasWhereUniqueInput[];
    disconnect?: Prisma.subprogramasWhereUniqueInput | Prisma.subprogramasWhereUniqueInput[];
    delete?: Prisma.subprogramasWhereUniqueInput | Prisma.subprogramasWhereUniqueInput[];
    connect?: Prisma.subprogramasWhereUniqueInput | Prisma.subprogramasWhereUniqueInput[];
    update?: Prisma.subprogramasUpdateWithWhereUniqueWithoutProgramasInput | Prisma.subprogramasUpdateWithWhereUniqueWithoutProgramasInput[];
    updateMany?: Prisma.subprogramasUpdateManyWithWhereWithoutProgramasInput | Prisma.subprogramasUpdateManyWithWhereWithoutProgramasInput[];
    deleteMany?: Prisma.subprogramasScalarWhereInput | Prisma.subprogramasScalarWhereInput[];
};
export type subprogramasUncheckedUpdateManyWithoutProgramasNestedInput = {
    create?: Prisma.XOR<Prisma.subprogramasCreateWithoutProgramasInput, Prisma.subprogramasUncheckedCreateWithoutProgramasInput> | Prisma.subprogramasCreateWithoutProgramasInput[] | Prisma.subprogramasUncheckedCreateWithoutProgramasInput[];
    connectOrCreate?: Prisma.subprogramasCreateOrConnectWithoutProgramasInput | Prisma.subprogramasCreateOrConnectWithoutProgramasInput[];
    upsert?: Prisma.subprogramasUpsertWithWhereUniqueWithoutProgramasInput | Prisma.subprogramasUpsertWithWhereUniqueWithoutProgramasInput[];
    createMany?: Prisma.subprogramasCreateManyProgramasInputEnvelope;
    set?: Prisma.subprogramasWhereUniqueInput | Prisma.subprogramasWhereUniqueInput[];
    disconnect?: Prisma.subprogramasWhereUniqueInput | Prisma.subprogramasWhereUniqueInput[];
    delete?: Prisma.subprogramasWhereUniqueInput | Prisma.subprogramasWhereUniqueInput[];
    connect?: Prisma.subprogramasWhereUniqueInput | Prisma.subprogramasWhereUniqueInput[];
    update?: Prisma.subprogramasUpdateWithWhereUniqueWithoutProgramasInput | Prisma.subprogramasUpdateWithWhereUniqueWithoutProgramasInput[];
    updateMany?: Prisma.subprogramasUpdateManyWithWhereWithoutProgramasInput | Prisma.subprogramasUpdateManyWithWhereWithoutProgramasInput[];
    deleteMany?: Prisma.subprogramasScalarWhereInput | Prisma.subprogramasScalarWhereInput[];
};
export type subprogramasCreateNestedOneWithoutSolicitudes_inversionInput = {
    create?: Prisma.XOR<Prisma.subprogramasCreateWithoutSolicitudes_inversionInput, Prisma.subprogramasUncheckedCreateWithoutSolicitudes_inversionInput>;
    connectOrCreate?: Prisma.subprogramasCreateOrConnectWithoutSolicitudes_inversionInput;
    connect?: Prisma.subprogramasWhereUniqueInput;
};
export type subprogramasUpdateOneWithoutSolicitudes_inversionNestedInput = {
    create?: Prisma.XOR<Prisma.subprogramasCreateWithoutSolicitudes_inversionInput, Prisma.subprogramasUncheckedCreateWithoutSolicitudes_inversionInput>;
    connectOrCreate?: Prisma.subprogramasCreateOrConnectWithoutSolicitudes_inversionInput;
    upsert?: Prisma.subprogramasUpsertWithoutSolicitudes_inversionInput;
    disconnect?: Prisma.subprogramasWhereInput | boolean;
    delete?: Prisma.subprogramasWhereInput | boolean;
    connect?: Prisma.subprogramasWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.subprogramasUpdateToOneWithWhereWithoutSolicitudes_inversionInput, Prisma.subprogramasUpdateWithoutSolicitudes_inversionInput>, Prisma.subprogramasUncheckedUpdateWithoutSolicitudes_inversionInput>;
};
export type subprogramasCreateWithoutProgramasInput = {
    nombre: string;
    requiere_evaluacion_obligatoria?: boolean | null;
    solicitudes_inversion?: Prisma.solicitudes_inversionCreateNestedManyWithoutSubprogramasInput;
};
export type subprogramasUncheckedCreateWithoutProgramasInput = {
    id?: number;
    nombre: string;
    requiere_evaluacion_obligatoria?: boolean | null;
    solicitudes_inversion?: Prisma.solicitudes_inversionUncheckedCreateNestedManyWithoutSubprogramasInput;
};
export type subprogramasCreateOrConnectWithoutProgramasInput = {
    where: Prisma.subprogramasWhereUniqueInput;
    create: Prisma.XOR<Prisma.subprogramasCreateWithoutProgramasInput, Prisma.subprogramasUncheckedCreateWithoutProgramasInput>;
};
export type subprogramasCreateManyProgramasInputEnvelope = {
    data: Prisma.subprogramasCreateManyProgramasInput | Prisma.subprogramasCreateManyProgramasInput[];
    skipDuplicates?: boolean;
};
export type subprogramasUpsertWithWhereUniqueWithoutProgramasInput = {
    where: Prisma.subprogramasWhereUniqueInput;
    update: Prisma.XOR<Prisma.subprogramasUpdateWithoutProgramasInput, Prisma.subprogramasUncheckedUpdateWithoutProgramasInput>;
    create: Prisma.XOR<Prisma.subprogramasCreateWithoutProgramasInput, Prisma.subprogramasUncheckedCreateWithoutProgramasInput>;
};
export type subprogramasUpdateWithWhereUniqueWithoutProgramasInput = {
    where: Prisma.subprogramasWhereUniqueInput;
    data: Prisma.XOR<Prisma.subprogramasUpdateWithoutProgramasInput, Prisma.subprogramasUncheckedUpdateWithoutProgramasInput>;
};
export type subprogramasUpdateManyWithWhereWithoutProgramasInput = {
    where: Prisma.subprogramasScalarWhereInput;
    data: Prisma.XOR<Prisma.subprogramasUpdateManyMutationInput, Prisma.subprogramasUncheckedUpdateManyWithoutProgramasInput>;
};
export type subprogramasScalarWhereInput = {
    AND?: Prisma.subprogramasScalarWhereInput | Prisma.subprogramasScalarWhereInput[];
    OR?: Prisma.subprogramasScalarWhereInput[];
    NOT?: Prisma.subprogramasScalarWhereInput | Prisma.subprogramasScalarWhereInput[];
    id?: Prisma.IntFilter<"subprogramas"> | number;
    programa_id?: Prisma.IntNullableFilter<"subprogramas"> | number | null;
    nombre?: Prisma.StringFilter<"subprogramas"> | string;
    requiere_evaluacion_obligatoria?: Prisma.BoolNullableFilter<"subprogramas"> | boolean | null;
};
export type subprogramasCreateWithoutSolicitudes_inversionInput = {
    nombre: string;
    requiere_evaluacion_obligatoria?: boolean | null;
    programas?: Prisma.programasCreateNestedOneWithoutSubprogramasInput;
};
export type subprogramasUncheckedCreateWithoutSolicitudes_inversionInput = {
    id?: number;
    programa_id?: number | null;
    nombre: string;
    requiere_evaluacion_obligatoria?: boolean | null;
};
export type subprogramasCreateOrConnectWithoutSolicitudes_inversionInput = {
    where: Prisma.subprogramasWhereUniqueInput;
    create: Prisma.XOR<Prisma.subprogramasCreateWithoutSolicitudes_inversionInput, Prisma.subprogramasUncheckedCreateWithoutSolicitudes_inversionInput>;
};
export type subprogramasUpsertWithoutSolicitudes_inversionInput = {
    update: Prisma.XOR<Prisma.subprogramasUpdateWithoutSolicitudes_inversionInput, Prisma.subprogramasUncheckedUpdateWithoutSolicitudes_inversionInput>;
    create: Prisma.XOR<Prisma.subprogramasCreateWithoutSolicitudes_inversionInput, Prisma.subprogramasUncheckedCreateWithoutSolicitudes_inversionInput>;
    where?: Prisma.subprogramasWhereInput;
};
export type subprogramasUpdateToOneWithWhereWithoutSolicitudes_inversionInput = {
    where?: Prisma.subprogramasWhereInput;
    data: Prisma.XOR<Prisma.subprogramasUpdateWithoutSolicitudes_inversionInput, Prisma.subprogramasUncheckedUpdateWithoutSolicitudes_inversionInput>;
};
export type subprogramasUpdateWithoutSolicitudes_inversionInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    requiere_evaluacion_obligatoria?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    programas?: Prisma.programasUpdateOneWithoutSubprogramasNestedInput;
};
export type subprogramasUncheckedUpdateWithoutSolicitudes_inversionInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    programa_id?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    requiere_evaluacion_obligatoria?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
};
export type subprogramasCreateManyProgramasInput = {
    id?: number;
    nombre: string;
    requiere_evaluacion_obligatoria?: boolean | null;
};
export type subprogramasUpdateWithoutProgramasInput = {
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    requiere_evaluacion_obligatoria?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    solicitudes_inversion?: Prisma.solicitudes_inversionUpdateManyWithoutSubprogramasNestedInput;
};
export type subprogramasUncheckedUpdateWithoutProgramasInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    requiere_evaluacion_obligatoria?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    solicitudes_inversion?: Prisma.solicitudes_inversionUncheckedUpdateManyWithoutSubprogramasNestedInput;
};
export type subprogramasUncheckedUpdateManyWithoutProgramasInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    nombre?: Prisma.StringFieldUpdateOperationsInput | string;
    requiere_evaluacion_obligatoria?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
};
export type SubprogramasCountOutputType = {
    solicitudes_inversion: number;
};
export type SubprogramasCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    solicitudes_inversion?: boolean | SubprogramasCountOutputTypeCountSolicitudes_inversionArgs;
};
export type SubprogramasCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubprogramasCountOutputTypeSelect<ExtArgs> | null;
};
export type SubprogramasCountOutputTypeCountSolicitudes_inversionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.solicitudes_inversionWhereInput;
};
export type subprogramasSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    programa_id?: boolean;
    nombre?: boolean;
    requiere_evaluacion_obligatoria?: boolean;
    solicitudes_inversion?: boolean | Prisma.subprogramas$solicitudes_inversionArgs<ExtArgs>;
    programas?: boolean | Prisma.subprogramas$programasArgs<ExtArgs>;
    _count?: boolean | Prisma.SubprogramasCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["subprogramas"]>;
export type subprogramasSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    programa_id?: boolean;
    nombre?: boolean;
    requiere_evaluacion_obligatoria?: boolean;
    programas?: boolean | Prisma.subprogramas$programasArgs<ExtArgs>;
}, ExtArgs["result"]["subprogramas"]>;
export type subprogramasSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    programa_id?: boolean;
    nombre?: boolean;
    requiere_evaluacion_obligatoria?: boolean;
    programas?: boolean | Prisma.subprogramas$programasArgs<ExtArgs>;
}, ExtArgs["result"]["subprogramas"]>;
export type subprogramasSelectScalar = {
    id?: boolean;
    programa_id?: boolean;
    nombre?: boolean;
    requiere_evaluacion_obligatoria?: boolean;
};
export type subprogramasOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "programa_id" | "nombre" | "requiere_evaluacion_obligatoria", ExtArgs["result"]["subprogramas"]>;
export type subprogramasInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    solicitudes_inversion?: boolean | Prisma.subprogramas$solicitudes_inversionArgs<ExtArgs>;
    programas?: boolean | Prisma.subprogramas$programasArgs<ExtArgs>;
    _count?: boolean | Prisma.SubprogramasCountOutputTypeDefaultArgs<ExtArgs>;
};
export type subprogramasIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    programas?: boolean | Prisma.subprogramas$programasArgs<ExtArgs>;
};
export type subprogramasIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    programas?: boolean | Prisma.subprogramas$programasArgs<ExtArgs>;
};
export type $subprogramasPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "subprogramas";
    objects: {
        solicitudes_inversion: Prisma.$solicitudes_inversionPayload<ExtArgs>[];
        programas: Prisma.$programasPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        programa_id: number | null;
        nombre: string;
        requiere_evaluacion_obligatoria: boolean | null;
    }, ExtArgs["result"]["subprogramas"]>;
    composites: {};
};
export type subprogramasGetPayload<S extends boolean | null | undefined | subprogramasDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$subprogramasPayload, S>;
export type subprogramasCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<subprogramasFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SubprogramasCountAggregateInputType | true;
};
export interface subprogramasDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['subprogramas'];
        meta: {
            name: 'subprogramas';
        };
    };
    findUnique<T extends subprogramasFindUniqueArgs>(args: Prisma.SelectSubset<T, subprogramasFindUniqueArgs<ExtArgs>>): Prisma.Prisma__subprogramasClient<runtime.Types.Result.GetResult<Prisma.$subprogramasPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends subprogramasFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, subprogramasFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__subprogramasClient<runtime.Types.Result.GetResult<Prisma.$subprogramasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends subprogramasFindFirstArgs>(args?: Prisma.SelectSubset<T, subprogramasFindFirstArgs<ExtArgs>>): Prisma.Prisma__subprogramasClient<runtime.Types.Result.GetResult<Prisma.$subprogramasPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends subprogramasFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, subprogramasFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__subprogramasClient<runtime.Types.Result.GetResult<Prisma.$subprogramasPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends subprogramasFindManyArgs>(args?: Prisma.SelectSubset<T, subprogramasFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$subprogramasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends subprogramasCreateArgs>(args: Prisma.SelectSubset<T, subprogramasCreateArgs<ExtArgs>>): Prisma.Prisma__subprogramasClient<runtime.Types.Result.GetResult<Prisma.$subprogramasPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends subprogramasCreateManyArgs>(args?: Prisma.SelectSubset<T, subprogramasCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends subprogramasCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, subprogramasCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$subprogramasPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends subprogramasDeleteArgs>(args: Prisma.SelectSubset<T, subprogramasDeleteArgs<ExtArgs>>): Prisma.Prisma__subprogramasClient<runtime.Types.Result.GetResult<Prisma.$subprogramasPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends subprogramasUpdateArgs>(args: Prisma.SelectSubset<T, subprogramasUpdateArgs<ExtArgs>>): Prisma.Prisma__subprogramasClient<runtime.Types.Result.GetResult<Prisma.$subprogramasPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends subprogramasDeleteManyArgs>(args?: Prisma.SelectSubset<T, subprogramasDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends subprogramasUpdateManyArgs>(args: Prisma.SelectSubset<T, subprogramasUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends subprogramasUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, subprogramasUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$subprogramasPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends subprogramasUpsertArgs>(args: Prisma.SelectSubset<T, subprogramasUpsertArgs<ExtArgs>>): Prisma.Prisma__subprogramasClient<runtime.Types.Result.GetResult<Prisma.$subprogramasPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends subprogramasCountArgs>(args?: Prisma.Subset<T, subprogramasCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SubprogramasCountAggregateOutputType> : number>;
    aggregate<T extends SubprogramasAggregateArgs>(args: Prisma.Subset<T, SubprogramasAggregateArgs>): Prisma.PrismaPromise<GetSubprogramasAggregateType<T>>;
    groupBy<T extends subprogramasGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: subprogramasGroupByArgs['orderBy'];
    } : {
        orderBy?: subprogramasGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, subprogramasGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubprogramasGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: subprogramasFieldRefs;
}
export interface Prisma__subprogramasClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    solicitudes_inversion<T extends Prisma.subprogramas$solicitudes_inversionArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.subprogramas$solicitudes_inversionArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$solicitudes_inversionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    programas<T extends Prisma.subprogramas$programasArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.subprogramas$programasArgs<ExtArgs>>): Prisma.Prisma__programasClient<runtime.Types.Result.GetResult<Prisma.$programasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface subprogramasFieldRefs {
    readonly id: Prisma.FieldRef<"subprogramas", 'Int'>;
    readonly programa_id: Prisma.FieldRef<"subprogramas", 'Int'>;
    readonly nombre: Prisma.FieldRef<"subprogramas", 'String'>;
    readonly requiere_evaluacion_obligatoria: Prisma.FieldRef<"subprogramas", 'Boolean'>;
}
export type subprogramasFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.subprogramasSelect<ExtArgs> | null;
    omit?: Prisma.subprogramasOmit<ExtArgs> | null;
    include?: Prisma.subprogramasInclude<ExtArgs> | null;
    where: Prisma.subprogramasWhereUniqueInput;
};
export type subprogramasFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.subprogramasSelect<ExtArgs> | null;
    omit?: Prisma.subprogramasOmit<ExtArgs> | null;
    include?: Prisma.subprogramasInclude<ExtArgs> | null;
    where: Prisma.subprogramasWhereUniqueInput;
};
export type subprogramasFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type subprogramasFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type subprogramasFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type subprogramasCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.subprogramasSelect<ExtArgs> | null;
    omit?: Prisma.subprogramasOmit<ExtArgs> | null;
    include?: Prisma.subprogramasInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.subprogramasCreateInput, Prisma.subprogramasUncheckedCreateInput>;
};
export type subprogramasCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.subprogramasCreateManyInput | Prisma.subprogramasCreateManyInput[];
    skipDuplicates?: boolean;
};
export type subprogramasCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.subprogramasSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.subprogramasOmit<ExtArgs> | null;
    data: Prisma.subprogramasCreateManyInput | Prisma.subprogramasCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.subprogramasIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type subprogramasUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.subprogramasSelect<ExtArgs> | null;
    omit?: Prisma.subprogramasOmit<ExtArgs> | null;
    include?: Prisma.subprogramasInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.subprogramasUpdateInput, Prisma.subprogramasUncheckedUpdateInput>;
    where: Prisma.subprogramasWhereUniqueInput;
};
export type subprogramasUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.subprogramasUpdateManyMutationInput, Prisma.subprogramasUncheckedUpdateManyInput>;
    where?: Prisma.subprogramasWhereInput;
    limit?: number;
};
export type subprogramasUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.subprogramasSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.subprogramasOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.subprogramasUpdateManyMutationInput, Prisma.subprogramasUncheckedUpdateManyInput>;
    where?: Prisma.subprogramasWhereInput;
    limit?: number;
    include?: Prisma.subprogramasIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type subprogramasUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.subprogramasSelect<ExtArgs> | null;
    omit?: Prisma.subprogramasOmit<ExtArgs> | null;
    include?: Prisma.subprogramasInclude<ExtArgs> | null;
    where: Prisma.subprogramasWhereUniqueInput;
    create: Prisma.XOR<Prisma.subprogramasCreateInput, Prisma.subprogramasUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.subprogramasUpdateInput, Prisma.subprogramasUncheckedUpdateInput>;
};
export type subprogramasDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.subprogramasSelect<ExtArgs> | null;
    omit?: Prisma.subprogramasOmit<ExtArgs> | null;
    include?: Prisma.subprogramasInclude<ExtArgs> | null;
    where: Prisma.subprogramasWhereUniqueInput;
};
export type subprogramasDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.subprogramasWhereInput;
    limit?: number;
};
export type subprogramas$solicitudes_inversionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type subprogramas$programasArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.programasSelect<ExtArgs> | null;
    omit?: Prisma.programasOmit<ExtArgs> | null;
    include?: Prisma.programasInclude<ExtArgs> | null;
    where?: Prisma.programasWhereInput;
};
export type subprogramasDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.subprogramasSelect<ExtArgs> | null;
    omit?: Prisma.subprogramasOmit<ExtArgs> | null;
    include?: Prisma.subprogramasInclude<ExtArgs> | null;
};
