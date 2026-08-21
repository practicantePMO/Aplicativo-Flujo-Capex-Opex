import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
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
