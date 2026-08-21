import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models.js";
import { type PrismaClient } from "./class.js";
export type * from '../models.js';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: runtime.DbNullClass;
export declare const JsonNull: runtime.JsonNullClass;
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> = [
    PrismaClientOptions
] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? ((Without<T, U> & U) | (Without<U, T> & T)) & object : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly asignaciones_proceso: "asignaciones_proceso";
    readonly companias: "companias";
    readonly grupos: "grupos";
    readonly historico_aprobaciones: "historico_aprobaciones";
    readonly procesos: "procesos";
    readonly programas: "programas";
    readonly proyectos: "proyectos";
    readonly roles: "roles";
    readonly solicitud_evaluacion_financiera: "solicitud_evaluacion_financiera";
    readonly solicitud_flujo_caja: "solicitud_flujo_caja";
    readonly solicitud_metas: "solicitud_metas";
    readonly solicitud_valores: "solicitud_valores";
    readonly solicitudes_inversion: "solicitudes_inversion";
    readonly subprogramas: "subprogramas";
    readonly usuario_roles_compania: "usuario_roles_compania";
    readonly usuarios: "usuarios";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "asignaciones_proceso" | "companias" | "grupos" | "historico_aprobaciones" | "procesos" | "programas" | "proyectos" | "roles" | "solicitud_evaluacion_financiera" | "solicitud_flujo_caja" | "solicitud_metas" | "solicitud_valores" | "solicitudes_inversion" | "subprogramas" | "usuario_roles_compania" | "usuarios";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        asignaciones_proceso: {
            payload: Prisma.$asignaciones_procesoPayload<ExtArgs>;
            fields: Prisma.asignaciones_procesoFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.asignaciones_procesoFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$asignaciones_procesoPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.asignaciones_procesoFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$asignaciones_procesoPayload>;
                };
                findFirst: {
                    args: Prisma.asignaciones_procesoFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$asignaciones_procesoPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.asignaciones_procesoFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$asignaciones_procesoPayload>;
                };
                findMany: {
                    args: Prisma.asignaciones_procesoFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$asignaciones_procesoPayload>[];
                };
                create: {
                    args: Prisma.asignaciones_procesoCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$asignaciones_procesoPayload>;
                };
                createMany: {
                    args: Prisma.asignaciones_procesoCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.asignaciones_procesoCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$asignaciones_procesoPayload>[];
                };
                delete: {
                    args: Prisma.asignaciones_procesoDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$asignaciones_procesoPayload>;
                };
                update: {
                    args: Prisma.asignaciones_procesoUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$asignaciones_procesoPayload>;
                };
                deleteMany: {
                    args: Prisma.asignaciones_procesoDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.asignaciones_procesoUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.asignaciones_procesoUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$asignaciones_procesoPayload>[];
                };
                upsert: {
                    args: Prisma.asignaciones_procesoUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$asignaciones_procesoPayload>;
                };
                aggregate: {
                    args: Prisma.Asignaciones_procesoAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAsignaciones_proceso>;
                };
                groupBy: {
                    args: Prisma.asignaciones_procesoGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Asignaciones_procesoGroupByOutputType>[];
                };
                count: {
                    args: Prisma.asignaciones_procesoCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Asignaciones_procesoCountAggregateOutputType> | number;
                };
            };
        };
        companias: {
            payload: Prisma.$companiasPayload<ExtArgs>;
            fields: Prisma.companiasFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.companiasFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$companiasPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.companiasFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$companiasPayload>;
                };
                findFirst: {
                    args: Prisma.companiasFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$companiasPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.companiasFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$companiasPayload>;
                };
                findMany: {
                    args: Prisma.companiasFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$companiasPayload>[];
                };
                create: {
                    args: Prisma.companiasCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$companiasPayload>;
                };
                createMany: {
                    args: Prisma.companiasCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.companiasCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$companiasPayload>[];
                };
                delete: {
                    args: Prisma.companiasDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$companiasPayload>;
                };
                update: {
                    args: Prisma.companiasUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$companiasPayload>;
                };
                deleteMany: {
                    args: Prisma.companiasDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.companiasUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.companiasUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$companiasPayload>[];
                };
                upsert: {
                    args: Prisma.companiasUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$companiasPayload>;
                };
                aggregate: {
                    args: Prisma.CompaniasAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCompanias>;
                };
                groupBy: {
                    args: Prisma.companiasGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CompaniasGroupByOutputType>[];
                };
                count: {
                    args: Prisma.companiasCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CompaniasCountAggregateOutputType> | number;
                };
            };
        };
        grupos: {
            payload: Prisma.$gruposPayload<ExtArgs>;
            fields: Prisma.gruposFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.gruposFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$gruposPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.gruposFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$gruposPayload>;
                };
                findFirst: {
                    args: Prisma.gruposFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$gruposPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.gruposFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$gruposPayload>;
                };
                findMany: {
                    args: Prisma.gruposFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$gruposPayload>[];
                };
                create: {
                    args: Prisma.gruposCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$gruposPayload>;
                };
                createMany: {
                    args: Prisma.gruposCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.gruposCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$gruposPayload>[];
                };
                delete: {
                    args: Prisma.gruposDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$gruposPayload>;
                };
                update: {
                    args: Prisma.gruposUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$gruposPayload>;
                };
                deleteMany: {
                    args: Prisma.gruposDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.gruposUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.gruposUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$gruposPayload>[];
                };
                upsert: {
                    args: Prisma.gruposUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$gruposPayload>;
                };
                aggregate: {
                    args: Prisma.GruposAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateGrupos>;
                };
                groupBy: {
                    args: Prisma.gruposGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.GruposGroupByOutputType>[];
                };
                count: {
                    args: Prisma.gruposCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.GruposCountAggregateOutputType> | number;
                };
            };
        };
        historico_aprobaciones: {
            payload: Prisma.$historico_aprobacionesPayload<ExtArgs>;
            fields: Prisma.historico_aprobacionesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.historico_aprobacionesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$historico_aprobacionesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.historico_aprobacionesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$historico_aprobacionesPayload>;
                };
                findFirst: {
                    args: Prisma.historico_aprobacionesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$historico_aprobacionesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.historico_aprobacionesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$historico_aprobacionesPayload>;
                };
                findMany: {
                    args: Prisma.historico_aprobacionesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$historico_aprobacionesPayload>[];
                };
                create: {
                    args: Prisma.historico_aprobacionesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$historico_aprobacionesPayload>;
                };
                createMany: {
                    args: Prisma.historico_aprobacionesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.historico_aprobacionesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$historico_aprobacionesPayload>[];
                };
                delete: {
                    args: Prisma.historico_aprobacionesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$historico_aprobacionesPayload>;
                };
                update: {
                    args: Prisma.historico_aprobacionesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$historico_aprobacionesPayload>;
                };
                deleteMany: {
                    args: Prisma.historico_aprobacionesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.historico_aprobacionesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.historico_aprobacionesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$historico_aprobacionesPayload>[];
                };
                upsert: {
                    args: Prisma.historico_aprobacionesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$historico_aprobacionesPayload>;
                };
                aggregate: {
                    args: Prisma.Historico_aprobacionesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateHistorico_aprobaciones>;
                };
                groupBy: {
                    args: Prisma.historico_aprobacionesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Historico_aprobacionesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.historico_aprobacionesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Historico_aprobacionesCountAggregateOutputType> | number;
                };
            };
        };
        procesos: {
            payload: Prisma.$procesosPayload<ExtArgs>;
            fields: Prisma.procesosFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.procesosFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$procesosPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.procesosFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$procesosPayload>;
                };
                findFirst: {
                    args: Prisma.procesosFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$procesosPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.procesosFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$procesosPayload>;
                };
                findMany: {
                    args: Prisma.procesosFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$procesosPayload>[];
                };
                create: {
                    args: Prisma.procesosCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$procesosPayload>;
                };
                createMany: {
                    args: Prisma.procesosCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.procesosCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$procesosPayload>[];
                };
                delete: {
                    args: Prisma.procesosDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$procesosPayload>;
                };
                update: {
                    args: Prisma.procesosUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$procesosPayload>;
                };
                deleteMany: {
                    args: Prisma.procesosDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.procesosUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.procesosUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$procesosPayload>[];
                };
                upsert: {
                    args: Prisma.procesosUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$procesosPayload>;
                };
                aggregate: {
                    args: Prisma.ProcesosAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProcesos>;
                };
                groupBy: {
                    args: Prisma.procesosGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProcesosGroupByOutputType>[];
                };
                count: {
                    args: Prisma.procesosCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProcesosCountAggregateOutputType> | number;
                };
            };
        };
        programas: {
            payload: Prisma.$programasPayload<ExtArgs>;
            fields: Prisma.programasFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.programasFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$programasPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.programasFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$programasPayload>;
                };
                findFirst: {
                    args: Prisma.programasFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$programasPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.programasFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$programasPayload>;
                };
                findMany: {
                    args: Prisma.programasFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$programasPayload>[];
                };
                create: {
                    args: Prisma.programasCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$programasPayload>;
                };
                createMany: {
                    args: Prisma.programasCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.programasCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$programasPayload>[];
                };
                delete: {
                    args: Prisma.programasDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$programasPayload>;
                };
                update: {
                    args: Prisma.programasUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$programasPayload>;
                };
                deleteMany: {
                    args: Prisma.programasDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.programasUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.programasUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$programasPayload>[];
                };
                upsert: {
                    args: Prisma.programasUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$programasPayload>;
                };
                aggregate: {
                    args: Prisma.ProgramasAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProgramas>;
                };
                groupBy: {
                    args: Prisma.programasGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProgramasGroupByOutputType>[];
                };
                count: {
                    args: Prisma.programasCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProgramasCountAggregateOutputType> | number;
                };
            };
        };
        proyectos: {
            payload: Prisma.$proyectosPayload<ExtArgs>;
            fields: Prisma.proyectosFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.proyectosFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$proyectosPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.proyectosFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$proyectosPayload>;
                };
                findFirst: {
                    args: Prisma.proyectosFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$proyectosPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.proyectosFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$proyectosPayload>;
                };
                findMany: {
                    args: Prisma.proyectosFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$proyectosPayload>[];
                };
                create: {
                    args: Prisma.proyectosCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$proyectosPayload>;
                };
                createMany: {
                    args: Prisma.proyectosCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.proyectosCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$proyectosPayload>[];
                };
                delete: {
                    args: Prisma.proyectosDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$proyectosPayload>;
                };
                update: {
                    args: Prisma.proyectosUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$proyectosPayload>;
                };
                deleteMany: {
                    args: Prisma.proyectosDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.proyectosUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.proyectosUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$proyectosPayload>[];
                };
                upsert: {
                    args: Prisma.proyectosUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$proyectosPayload>;
                };
                aggregate: {
                    args: Prisma.ProyectosAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProyectos>;
                };
                groupBy: {
                    args: Prisma.proyectosGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProyectosGroupByOutputType>[];
                };
                count: {
                    args: Prisma.proyectosCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProyectosCountAggregateOutputType> | number;
                };
            };
        };
        roles: {
            payload: Prisma.$rolesPayload<ExtArgs>;
            fields: Prisma.rolesFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.rolesFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$rolesPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.rolesFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$rolesPayload>;
                };
                findFirst: {
                    args: Prisma.rolesFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$rolesPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.rolesFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$rolesPayload>;
                };
                findMany: {
                    args: Prisma.rolesFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$rolesPayload>[];
                };
                create: {
                    args: Prisma.rolesCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$rolesPayload>;
                };
                createMany: {
                    args: Prisma.rolesCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.rolesCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$rolesPayload>[];
                };
                delete: {
                    args: Prisma.rolesDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$rolesPayload>;
                };
                update: {
                    args: Prisma.rolesUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$rolesPayload>;
                };
                deleteMany: {
                    args: Prisma.rolesDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.rolesUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.rolesUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$rolesPayload>[];
                };
                upsert: {
                    args: Prisma.rolesUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$rolesPayload>;
                };
                aggregate: {
                    args: Prisma.RolesAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRoles>;
                };
                groupBy: {
                    args: Prisma.rolesGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RolesGroupByOutputType>[];
                };
                count: {
                    args: Prisma.rolesCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RolesCountAggregateOutputType> | number;
                };
            };
        };
        solicitud_evaluacion_financiera: {
            payload: Prisma.$solicitud_evaluacion_financieraPayload<ExtArgs>;
            fields: Prisma.solicitud_evaluacion_financieraFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.solicitud_evaluacion_financieraFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_evaluacion_financieraPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.solicitud_evaluacion_financieraFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_evaluacion_financieraPayload>;
                };
                findFirst: {
                    args: Prisma.solicitud_evaluacion_financieraFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_evaluacion_financieraPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.solicitud_evaluacion_financieraFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_evaluacion_financieraPayload>;
                };
                findMany: {
                    args: Prisma.solicitud_evaluacion_financieraFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_evaluacion_financieraPayload>[];
                };
                create: {
                    args: Prisma.solicitud_evaluacion_financieraCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_evaluacion_financieraPayload>;
                };
                createMany: {
                    args: Prisma.solicitud_evaluacion_financieraCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.solicitud_evaluacion_financieraCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_evaluacion_financieraPayload>[];
                };
                delete: {
                    args: Prisma.solicitud_evaluacion_financieraDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_evaluacion_financieraPayload>;
                };
                update: {
                    args: Prisma.solicitud_evaluacion_financieraUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_evaluacion_financieraPayload>;
                };
                deleteMany: {
                    args: Prisma.solicitud_evaluacion_financieraDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.solicitud_evaluacion_financieraUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.solicitud_evaluacion_financieraUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_evaluacion_financieraPayload>[];
                };
                upsert: {
                    args: Prisma.solicitud_evaluacion_financieraUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_evaluacion_financieraPayload>;
                };
                aggregate: {
                    args: Prisma.Solicitud_evaluacion_financieraAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSolicitud_evaluacion_financiera>;
                };
                groupBy: {
                    args: Prisma.solicitud_evaluacion_financieraGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Solicitud_evaluacion_financieraGroupByOutputType>[];
                };
                count: {
                    args: Prisma.solicitud_evaluacion_financieraCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Solicitud_evaluacion_financieraCountAggregateOutputType> | number;
                };
            };
        };
        solicitud_flujo_caja: {
            payload: Prisma.$solicitud_flujo_cajaPayload<ExtArgs>;
            fields: Prisma.solicitud_flujo_cajaFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.solicitud_flujo_cajaFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_flujo_cajaPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.solicitud_flujo_cajaFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_flujo_cajaPayload>;
                };
                findFirst: {
                    args: Prisma.solicitud_flujo_cajaFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_flujo_cajaPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.solicitud_flujo_cajaFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_flujo_cajaPayload>;
                };
                findMany: {
                    args: Prisma.solicitud_flujo_cajaFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_flujo_cajaPayload>[];
                };
                create: {
                    args: Prisma.solicitud_flujo_cajaCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_flujo_cajaPayload>;
                };
                createMany: {
                    args: Prisma.solicitud_flujo_cajaCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.solicitud_flujo_cajaCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_flujo_cajaPayload>[];
                };
                delete: {
                    args: Prisma.solicitud_flujo_cajaDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_flujo_cajaPayload>;
                };
                update: {
                    args: Prisma.solicitud_flujo_cajaUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_flujo_cajaPayload>;
                };
                deleteMany: {
                    args: Prisma.solicitud_flujo_cajaDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.solicitud_flujo_cajaUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.solicitud_flujo_cajaUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_flujo_cajaPayload>[];
                };
                upsert: {
                    args: Prisma.solicitud_flujo_cajaUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_flujo_cajaPayload>;
                };
                aggregate: {
                    args: Prisma.Solicitud_flujo_cajaAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSolicitud_flujo_caja>;
                };
                groupBy: {
                    args: Prisma.solicitud_flujo_cajaGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Solicitud_flujo_cajaGroupByOutputType>[];
                };
                count: {
                    args: Prisma.solicitud_flujo_cajaCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Solicitud_flujo_cajaCountAggregateOutputType> | number;
                };
            };
        };
        solicitud_metas: {
            payload: Prisma.$solicitud_metasPayload<ExtArgs>;
            fields: Prisma.solicitud_metasFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.solicitud_metasFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_metasPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.solicitud_metasFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_metasPayload>;
                };
                findFirst: {
                    args: Prisma.solicitud_metasFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_metasPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.solicitud_metasFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_metasPayload>;
                };
                findMany: {
                    args: Prisma.solicitud_metasFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_metasPayload>[];
                };
                create: {
                    args: Prisma.solicitud_metasCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_metasPayload>;
                };
                createMany: {
                    args: Prisma.solicitud_metasCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.solicitud_metasCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_metasPayload>[];
                };
                delete: {
                    args: Prisma.solicitud_metasDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_metasPayload>;
                };
                update: {
                    args: Prisma.solicitud_metasUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_metasPayload>;
                };
                deleteMany: {
                    args: Prisma.solicitud_metasDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.solicitud_metasUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.solicitud_metasUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_metasPayload>[];
                };
                upsert: {
                    args: Prisma.solicitud_metasUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_metasPayload>;
                };
                aggregate: {
                    args: Prisma.Solicitud_metasAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSolicitud_metas>;
                };
                groupBy: {
                    args: Prisma.solicitud_metasGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Solicitud_metasGroupByOutputType>[];
                };
                count: {
                    args: Prisma.solicitud_metasCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Solicitud_metasCountAggregateOutputType> | number;
                };
            };
        };
        solicitud_valores: {
            payload: Prisma.$solicitud_valoresPayload<ExtArgs>;
            fields: Prisma.solicitud_valoresFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.solicitud_valoresFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_valoresPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.solicitud_valoresFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_valoresPayload>;
                };
                findFirst: {
                    args: Prisma.solicitud_valoresFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_valoresPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.solicitud_valoresFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_valoresPayload>;
                };
                findMany: {
                    args: Prisma.solicitud_valoresFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_valoresPayload>[];
                };
                create: {
                    args: Prisma.solicitud_valoresCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_valoresPayload>;
                };
                createMany: {
                    args: Prisma.solicitud_valoresCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.solicitud_valoresCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_valoresPayload>[];
                };
                delete: {
                    args: Prisma.solicitud_valoresDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_valoresPayload>;
                };
                update: {
                    args: Prisma.solicitud_valoresUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_valoresPayload>;
                };
                deleteMany: {
                    args: Prisma.solicitud_valoresDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.solicitud_valoresUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.solicitud_valoresUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_valoresPayload>[];
                };
                upsert: {
                    args: Prisma.solicitud_valoresUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitud_valoresPayload>;
                };
                aggregate: {
                    args: Prisma.Solicitud_valoresAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSolicitud_valores>;
                };
                groupBy: {
                    args: Prisma.solicitud_valoresGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Solicitud_valoresGroupByOutputType>[];
                };
                count: {
                    args: Prisma.solicitud_valoresCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Solicitud_valoresCountAggregateOutputType> | number;
                };
            };
        };
        solicitudes_inversion: {
            payload: Prisma.$solicitudes_inversionPayload<ExtArgs>;
            fields: Prisma.solicitudes_inversionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.solicitudes_inversionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitudes_inversionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.solicitudes_inversionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitudes_inversionPayload>;
                };
                findFirst: {
                    args: Prisma.solicitudes_inversionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitudes_inversionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.solicitudes_inversionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitudes_inversionPayload>;
                };
                findMany: {
                    args: Prisma.solicitudes_inversionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitudes_inversionPayload>[];
                };
                create: {
                    args: Prisma.solicitudes_inversionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitudes_inversionPayload>;
                };
                createMany: {
                    args: Prisma.solicitudes_inversionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.solicitudes_inversionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitudes_inversionPayload>[];
                };
                delete: {
                    args: Prisma.solicitudes_inversionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitudes_inversionPayload>;
                };
                update: {
                    args: Prisma.solicitudes_inversionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitudes_inversionPayload>;
                };
                deleteMany: {
                    args: Prisma.solicitudes_inversionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.solicitudes_inversionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.solicitudes_inversionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitudes_inversionPayload>[];
                };
                upsert: {
                    args: Prisma.solicitudes_inversionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$solicitudes_inversionPayload>;
                };
                aggregate: {
                    args: Prisma.Solicitudes_inversionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSolicitudes_inversion>;
                };
                groupBy: {
                    args: Prisma.solicitudes_inversionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Solicitudes_inversionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.solicitudes_inversionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Solicitudes_inversionCountAggregateOutputType> | number;
                };
            };
        };
        subprogramas: {
            payload: Prisma.$subprogramasPayload<ExtArgs>;
            fields: Prisma.subprogramasFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.subprogramasFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$subprogramasPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.subprogramasFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$subprogramasPayload>;
                };
                findFirst: {
                    args: Prisma.subprogramasFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$subprogramasPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.subprogramasFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$subprogramasPayload>;
                };
                findMany: {
                    args: Prisma.subprogramasFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$subprogramasPayload>[];
                };
                create: {
                    args: Prisma.subprogramasCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$subprogramasPayload>;
                };
                createMany: {
                    args: Prisma.subprogramasCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.subprogramasCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$subprogramasPayload>[];
                };
                delete: {
                    args: Prisma.subprogramasDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$subprogramasPayload>;
                };
                update: {
                    args: Prisma.subprogramasUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$subprogramasPayload>;
                };
                deleteMany: {
                    args: Prisma.subprogramasDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.subprogramasUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.subprogramasUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$subprogramasPayload>[];
                };
                upsert: {
                    args: Prisma.subprogramasUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$subprogramasPayload>;
                };
                aggregate: {
                    args: Prisma.SubprogramasAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSubprogramas>;
                };
                groupBy: {
                    args: Prisma.subprogramasGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SubprogramasGroupByOutputType>[];
                };
                count: {
                    args: Prisma.subprogramasCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SubprogramasCountAggregateOutputType> | number;
                };
            };
        };
        usuario_roles_compania: {
            payload: Prisma.$usuario_roles_companiaPayload<ExtArgs>;
            fields: Prisma.usuario_roles_companiaFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.usuario_roles_companiaFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usuario_roles_companiaPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.usuario_roles_companiaFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usuario_roles_companiaPayload>;
                };
                findFirst: {
                    args: Prisma.usuario_roles_companiaFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usuario_roles_companiaPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.usuario_roles_companiaFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usuario_roles_companiaPayload>;
                };
                findMany: {
                    args: Prisma.usuario_roles_companiaFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usuario_roles_companiaPayload>[];
                };
                create: {
                    args: Prisma.usuario_roles_companiaCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usuario_roles_companiaPayload>;
                };
                createMany: {
                    args: Prisma.usuario_roles_companiaCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.usuario_roles_companiaCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usuario_roles_companiaPayload>[];
                };
                delete: {
                    args: Prisma.usuario_roles_companiaDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usuario_roles_companiaPayload>;
                };
                update: {
                    args: Prisma.usuario_roles_companiaUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usuario_roles_companiaPayload>;
                };
                deleteMany: {
                    args: Prisma.usuario_roles_companiaDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.usuario_roles_companiaUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.usuario_roles_companiaUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usuario_roles_companiaPayload>[];
                };
                upsert: {
                    args: Prisma.usuario_roles_companiaUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usuario_roles_companiaPayload>;
                };
                aggregate: {
                    args: Prisma.Usuario_roles_companiaAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUsuario_roles_compania>;
                };
                groupBy: {
                    args: Prisma.usuario_roles_companiaGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Usuario_roles_companiaGroupByOutputType>[];
                };
                count: {
                    args: Prisma.usuario_roles_companiaCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.Usuario_roles_companiaCountAggregateOutputType> | number;
                };
            };
        };
        usuarios: {
            payload: Prisma.$usuariosPayload<ExtArgs>;
            fields: Prisma.usuariosFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.usuariosFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usuariosPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.usuariosFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usuariosPayload>;
                };
                findFirst: {
                    args: Prisma.usuariosFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usuariosPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.usuariosFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usuariosPayload>;
                };
                findMany: {
                    args: Prisma.usuariosFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usuariosPayload>[];
                };
                create: {
                    args: Prisma.usuariosCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usuariosPayload>;
                };
                createMany: {
                    args: Prisma.usuariosCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.usuariosCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usuariosPayload>[];
                };
                delete: {
                    args: Prisma.usuariosDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usuariosPayload>;
                };
                update: {
                    args: Prisma.usuariosUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usuariosPayload>;
                };
                deleteMany: {
                    args: Prisma.usuariosDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.usuariosUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.usuariosUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usuariosPayload>[];
                };
                upsert: {
                    args: Prisma.usuariosUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$usuariosPayload>;
                };
                aggregate: {
                    args: Prisma.UsuariosAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUsuarios>;
                };
                groupBy: {
                    args: Prisma.usuariosGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UsuariosGroupByOutputType>[];
                };
                count: {
                    args: Prisma.usuariosCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UsuariosCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const Asignaciones_procesoScalarFieldEnum: {
    readonly id: "id";
    readonly proceso_id: "proceso_id";
    readonly etapa: "etapa";
    readonly rol_id: "rol_id";
    readonly usuario_id: "usuario_id";
    readonly estado_asignacion: "estado_asignacion";
    readonly fecha_asignacion: "fecha_asignacion";
    readonly fecha_resolucion: "fecha_resolucion";
};
export type Asignaciones_procesoScalarFieldEnum = (typeof Asignaciones_procesoScalarFieldEnum)[keyof typeof Asignaciones_procesoScalarFieldEnum];
export declare const CompaniasScalarFieldEnum: {
    readonly id: "id";
    readonly nombre: "nombre";
    readonly activa: "activa";
};
export type CompaniasScalarFieldEnum = (typeof CompaniasScalarFieldEnum)[keyof typeof CompaniasScalarFieldEnum];
export declare const GruposScalarFieldEnum: {
    readonly id: "id";
    readonly nombre: "nombre";
};
export type GruposScalarFieldEnum = (typeof GruposScalarFieldEnum)[keyof typeof GruposScalarFieldEnum];
export declare const Historico_aprobacionesScalarFieldEnum: {
    readonly id: "id";
    readonly proceso_id: "proceso_id";
    readonly etapa_origen: "etapa_origen";
    readonly etapa_destino: "etapa_destino";
    readonly accion: "accion";
    readonly razon_rechazo: "razon_rechazo";
    readonly usuario_id: "usuario_id";
    readonly fecha_registro: "fecha_registro";
};
export type Historico_aprobacionesScalarFieldEnum = (typeof Historico_aprobacionesScalarFieldEnum)[keyof typeof Historico_aprobacionesScalarFieldEnum];
export declare const ProcesosScalarFieldEnum: {
    readonly id: "id";
    readonly proyecto_id: "proyecto_id";
    readonly tipo_proceso: "tipo_proceso";
    readonly estado_actual: "estado_actual";
    readonly fecha_creacion: "fecha_creacion";
    readonly eliminado_el: "eliminado_el";
};
export type ProcesosScalarFieldEnum = (typeof ProcesosScalarFieldEnum)[keyof typeof ProcesosScalarFieldEnum];
export declare const ProgramasScalarFieldEnum: {
    readonly id: "id";
    readonly id_grupo: "id_grupo";
    readonly nombre: "nombre";
};
export type ProgramasScalarFieldEnum = (typeof ProgramasScalarFieldEnum)[keyof typeof ProgramasScalarFieldEnum];
export declare const ProyectosScalarFieldEnum: {
    readonly id: "id";
    readonly nombre: "nombre";
    readonly compania_id: "compania_id";
    readonly fecha_proyecto: "fecha_proyecto";
    readonly anio_proyecto: "anio_proyecto";
    readonly consecutivo: "consecutivo";
    readonly creado_por: "creado_por";
    readonly fecha_creacion: "fecha_creacion";
    readonly eliminado_el: "eliminado_el";
};
export type ProyectosScalarFieldEnum = (typeof ProyectosScalarFieldEnum)[keyof typeof ProyectosScalarFieldEnum];
export declare const RolesScalarFieldEnum: {
    readonly id: "id";
    readonly codigo: "codigo";
    readonly nombre: "nombre";
};
export type RolesScalarFieldEnum = (typeof RolesScalarFieldEnum)[keyof typeof RolesScalarFieldEnum];
export declare const Solicitud_evaluacion_financieraScalarFieldEnum: {
    readonly id: "id";
    readonly solicitud_id: "solicitud_id";
    readonly tir: "tir";
    readonly vpn: "vpn";
    readonly payback: "payback";
};
export type Solicitud_evaluacion_financieraScalarFieldEnum = (typeof Solicitud_evaluacion_financieraScalarFieldEnum)[keyof typeof Solicitud_evaluacion_financieraScalarFieldEnum];
export declare const Solicitud_flujo_cajaScalarFieldEnum: {
    readonly id: "id";
    readonly solicitud_id: "solicitud_id";
    readonly tipo: "tipo";
    readonly anio: "anio";
    readonly monto: "monto";
};
export type Solicitud_flujo_cajaScalarFieldEnum = (typeof Solicitud_flujo_cajaScalarFieldEnum)[keyof typeof Solicitud_flujo_cajaScalarFieldEnum];
export declare const Solicitud_metasScalarFieldEnum: {
    readonly id: "id";
    readonly solicitud_id: "solicitud_id";
    readonly compromiso: "compromiso";
    readonly fecha_inicio: "fecha_inicio";
    readonly indicador: "indicador";
};
export type Solicitud_metasScalarFieldEnum = (typeof Solicitud_metasScalarFieldEnum)[keyof typeof Solicitud_metasScalarFieldEnum];
export declare const Solicitud_valoresScalarFieldEnum: {
    readonly id: "id";
    readonly solicitud_id: "solicitud_id";
    readonly categoria: "categoria";
    readonly usd: "usd";
    readonly cop: "cop";
};
export type Solicitud_valoresScalarFieldEnum = (typeof Solicitud_valoresScalarFieldEnum)[keyof typeof Solicitud_valoresScalarFieldEnum];
export declare const Solicitudes_inversionScalarFieldEnum: {
    readonly id: "id";
    readonly proceso_id: "proceso_id";
    readonly subprograma_id: "subprograma_id";
    readonly entregable_planeado: "entregable_planeado";
    readonly tiene_evaluacion_financiera: "tiene_evaluacion_financiera";
    readonly justificacion_sin_evaluacion: "justificacion_sin_evaluacion";
    readonly responsable_pm_id: "responsable_pm_id";
    readonly link_acta_aprobacion: "link_acta_aprobacion";
    readonly link_plan_proyecto: "link_plan_proyecto";
    readonly link_presentacion_puertas_3: "link_presentacion_puertas_3";
};
export type Solicitudes_inversionScalarFieldEnum = (typeof Solicitudes_inversionScalarFieldEnum)[keyof typeof Solicitudes_inversionScalarFieldEnum];
export declare const SubprogramasScalarFieldEnum: {
    readonly id: "id";
    readonly programa_id: "programa_id";
    readonly nombre: "nombre";
    readonly requiere_evaluacion_obligatoria: "requiere_evaluacion_obligatoria";
};
export type SubprogramasScalarFieldEnum = (typeof SubprogramasScalarFieldEnum)[keyof typeof SubprogramasScalarFieldEnum];
export declare const Usuario_roles_companiaScalarFieldEnum: {
    readonly id: "id";
    readonly usuario_id: "usuario_id";
    readonly rol_id: "rol_id";
    readonly compania_id: "compania_id";
};
export type Usuario_roles_companiaScalarFieldEnum = (typeof Usuario_roles_companiaScalarFieldEnum)[keyof typeof Usuario_roles_companiaScalarFieldEnum];
export declare const UsuariosScalarFieldEnum: {
    readonly id: "id";
    readonly nombre: "nombre";
    readonly email: "email";
    readonly password_hash: "password_hash";
    readonly proveedor_auth: "proveedor_auth";
    readonly area: "area";
    readonly activo: "activo";
    readonly fecha_creacion: "fecha_creacion";
    readonly eliminado_el: "eliminado_el";
};
export type UsuariosScalarFieldEnum = (typeof UsuariosScalarFieldEnum)[keyof typeof UsuariosScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>;
export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export interface PrismaClientBaseOptions {
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    omit?: GlobalOmitConfig;
    comments?: runtime.SqlCommenterPlugin[];
    queryPlanCacheMaxSize?: number;
}
export interface PrismaClientOptionsWithAccelerateUrl extends PrismaClientBaseOptions {
    accelerateUrl: string;
    adapter?: never;
}
export interface PrismaClientOptionsWithAdapter extends PrismaClientBaseOptions {
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
}
export type PrismaClientOptions = PrismaClientOptionsWithAccelerateUrl | PrismaClientOptionsWithAdapter;
export type GlobalOmitConfig = {
    asignaciones_proceso?: Prisma.asignaciones_procesoOmit;
    companias?: Prisma.companiasOmit;
    grupos?: Prisma.gruposOmit;
    historico_aprobaciones?: Prisma.historico_aprobacionesOmit;
    procesos?: Prisma.procesosOmit;
    programas?: Prisma.programasOmit;
    proyectos?: Prisma.proyectosOmit;
    roles?: Prisma.rolesOmit;
    solicitud_evaluacion_financiera?: Prisma.solicitud_evaluacion_financieraOmit;
    solicitud_flujo_caja?: Prisma.solicitud_flujo_cajaOmit;
    solicitud_metas?: Prisma.solicitud_metasOmit;
    solicitud_valores?: Prisma.solicitud_valoresOmit;
    solicitudes_inversion?: Prisma.solicitudes_inversionOmit;
    subprogramas?: Prisma.subprogramasOmit;
    usuario_roles_compania?: Prisma.usuario_roles_companiaOmit;
    usuarios?: Prisma.usuariosOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
