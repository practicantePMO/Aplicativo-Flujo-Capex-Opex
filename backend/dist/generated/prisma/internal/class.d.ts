import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace.js";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.PrismaClientConstructorArgs<Options>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = Prisma.PrismaClientOptions['omit'], in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    $connect(): runtime.Types.Utils.JsPromise<void>;
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    get asignaciones_proceso(): Prisma.asignaciones_procesoDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get companias(): Prisma.companiasDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get grupos(): Prisma.gruposDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get historico_aprobaciones(): Prisma.historico_aprobacionesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get procesos(): Prisma.procesosDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get programas(): Prisma.programasDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get proyectos(): Prisma.proyectosDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get roles(): Prisma.rolesDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get solicitud_evaluacion_financiera(): Prisma.solicitud_evaluacion_financieraDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get solicitud_flujo_caja(): Prisma.solicitud_flujo_cajaDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get solicitud_metas(): Prisma.solicitud_metasDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get solicitud_valores(): Prisma.solicitud_valoresDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get solicitudes_inversion(): Prisma.solicitudes_inversionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get subprogramas(): Prisma.subprogramasDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get usuario_roles_compania(): Prisma.usuario_roles_companiaDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get usuarios(): Prisma.usuariosDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
