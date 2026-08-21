"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineExtension = exports.NullsOrder = exports.QueryMode = exports.SortOrder = exports.UsuariosScalarFieldEnum = exports.Usuario_roles_companiaScalarFieldEnum = exports.SubprogramasScalarFieldEnum = exports.Solicitudes_inversionScalarFieldEnum = exports.Solicitud_valoresScalarFieldEnum = exports.Solicitud_metasScalarFieldEnum = exports.Solicitud_flujo_cajaScalarFieldEnum = exports.Solicitud_evaluacion_financieraScalarFieldEnum = exports.RolesScalarFieldEnum = exports.ProyectosScalarFieldEnum = exports.ProgramasScalarFieldEnum = exports.ProcesosScalarFieldEnum = exports.Historico_aprobacionesScalarFieldEnum = exports.GruposScalarFieldEnum = exports.CompaniasScalarFieldEnum = exports.Asignaciones_procesoScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
const runtime = __importStar(require("@prisma/client/runtime/client"));
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "7.9.1",
    engine: "e922089b7d7502aff4249d5da3420f6fa55fc6ad"
};
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    asignaciones_proceso: 'asignaciones_proceso',
    companias: 'companias',
    grupos: 'grupos',
    historico_aprobaciones: 'historico_aprobaciones',
    procesos: 'procesos',
    programas: 'programas',
    proyectos: 'proyectos',
    roles: 'roles',
    solicitud_evaluacion_financiera: 'solicitud_evaluacion_financiera',
    solicitud_flujo_caja: 'solicitud_flujo_caja',
    solicitud_metas: 'solicitud_metas',
    solicitud_valores: 'solicitud_valores',
    solicitudes_inversion: 'solicitudes_inversion',
    subprogramas: 'subprogramas',
    usuario_roles_compania: 'usuario_roles_compania',
    usuarios: 'usuarios'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.Asignaciones_procesoScalarFieldEnum = {
    id: 'id',
    proceso_id: 'proceso_id',
    etapa: 'etapa',
    rol_id: 'rol_id',
    usuario_id: 'usuario_id',
    estado_asignacion: 'estado_asignacion',
    fecha_asignacion: 'fecha_asignacion',
    fecha_resolucion: 'fecha_resolucion'
};
exports.CompaniasScalarFieldEnum = {
    id: 'id',
    nombre: 'nombre',
    activa: 'activa'
};
exports.GruposScalarFieldEnum = {
    id: 'id',
    nombre: 'nombre'
};
exports.Historico_aprobacionesScalarFieldEnum = {
    id: 'id',
    proceso_id: 'proceso_id',
    etapa_origen: 'etapa_origen',
    etapa_destino: 'etapa_destino',
    accion: 'accion',
    razon_rechazo: 'razon_rechazo',
    usuario_id: 'usuario_id',
    fecha_registro: 'fecha_registro'
};
exports.ProcesosScalarFieldEnum = {
    id: 'id',
    proyecto_id: 'proyecto_id',
    tipo_proceso: 'tipo_proceso',
    estado_actual: 'estado_actual',
    fecha_creacion: 'fecha_creacion',
    eliminado_el: 'eliminado_el'
};
exports.ProgramasScalarFieldEnum = {
    id: 'id',
    id_grupo: 'id_grupo',
    nombre: 'nombre'
};
exports.ProyectosScalarFieldEnum = {
    id: 'id',
    nombre: 'nombre',
    compania_id: 'compania_id',
    fecha_proyecto: 'fecha_proyecto',
    anio_proyecto: 'anio_proyecto',
    consecutivo: 'consecutivo',
    creado_por: 'creado_por',
    fecha_creacion: 'fecha_creacion',
    eliminado_el: 'eliminado_el'
};
exports.RolesScalarFieldEnum = {
    id: 'id',
    codigo: 'codigo',
    nombre: 'nombre'
};
exports.Solicitud_evaluacion_financieraScalarFieldEnum = {
    id: 'id',
    solicitud_id: 'solicitud_id',
    tir: 'tir',
    vpn: 'vpn',
    payback: 'payback'
};
exports.Solicitud_flujo_cajaScalarFieldEnum = {
    id: 'id',
    solicitud_id: 'solicitud_id',
    tipo: 'tipo',
    anio: 'anio',
    monto: 'monto'
};
exports.Solicitud_metasScalarFieldEnum = {
    id: 'id',
    solicitud_id: 'solicitud_id',
    compromiso: 'compromiso',
    fecha_inicio: 'fecha_inicio',
    indicador: 'indicador'
};
exports.Solicitud_valoresScalarFieldEnum = {
    id: 'id',
    solicitud_id: 'solicitud_id',
    categoria: 'categoria',
    usd: 'usd',
    cop: 'cop'
};
exports.Solicitudes_inversionScalarFieldEnum = {
    id: 'id',
    proceso_id: 'proceso_id',
    subprograma_id: 'subprograma_id',
    entregable_planeado: 'entregable_planeado',
    tiene_evaluacion_financiera: 'tiene_evaluacion_financiera',
    justificacion_sin_evaluacion: 'justificacion_sin_evaluacion',
    responsable_pm_id: 'responsable_pm_id',
    link_acta_aprobacion: 'link_acta_aprobacion',
    link_plan_proyecto: 'link_plan_proyecto',
    link_presentacion_puertas_3: 'link_presentacion_puertas_3'
};
exports.SubprogramasScalarFieldEnum = {
    id: 'id',
    programa_id: 'programa_id',
    nombre: 'nombre',
    requiere_evaluacion_obligatoria: 'requiere_evaluacion_obligatoria'
};
exports.Usuario_roles_companiaScalarFieldEnum = {
    id: 'id',
    usuario_id: 'usuario_id',
    rol_id: 'rol_id',
    compania_id: 'compania_id'
};
exports.UsuariosScalarFieldEnum = {
    id: 'id',
    nombre: 'nombre',
    email: 'email',
    password_hash: 'password_hash',
    proveedor_auth: 'proveedor_auth',
    area: 'area',
    activo: 'activo',
    fecha_creacion: 'fecha_creacion',
    eliminado_el: 'eliminado_el'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map