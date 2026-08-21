import { PrismaService } from '../prisma/prisma.service';
import { PermisosService } from '../permisos/permisos.service';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { CrearSolicitudInversionDto } from './dto/crear-solicitud-inversion.dto';
import { RechazarSolicitudDto, AprobarSolicitudDto } from './dto/cambiar-estado-solicitud.dto';
import { ActualizarPartesInteresadasDto } from './dto/actualizar-partes-interesadas.dto';
import { CancelarSolicitudDto } from './dto/cancelar-solicitud.dto';
export declare class SolicitudInversionService {
    private readonly prisma;
    private readonly permisos;
    private readonly notificaciones;
    private readonly logger;
    constructor(prisma: PrismaService, permisos: PermisosService, notificaciones: NotificacionesService);
    private obtenerEmailsPorRol;
    private obtenerEmailsAsignados;
    private obtenerProcesoConCompania;
    private validarPermisoParaEtapa;
    crear(usuarioId: number, dto: CrearSolicitudInversionDto): Promise<{
        proceso_id: number;
        estado_actual: string;
        mensaje: string;
    }>;
    obtenerPorProcesoId(usuarioId: number, procesoId: number): Promise<{
        asignaciones_proceso: ({
            usuarios: {
                id: number;
                email: string;
                nombre: string;
            } | null;
        } & {
            usuario_id: number | null;
            rol_id: number | null;
            id: number;
            proceso_id: number | null;
            etapa: string;
            estado_asignacion: string | null;
            fecha_asignacion: Date | null;
            fecha_resolucion: Date | null;
        })[];
        historico_aprobaciones: ({
            usuarios: {
                id: number;
                nombre: string;
            } | null;
        } & {
            usuario_id: number;
            id: number;
            proceso_id: number | null;
            razon_rechazo: string | null;
            fecha_registro: Date | null;
            etapa_origen: string;
            etapa_destino: string;
            accion: string;
        })[];
        proyectos: {
            companias: {
                id: number;
                nombre: string;
            } | null;
            compania_id: number | null;
            id: string;
            nombre: string;
            fecha_proyecto: Date;
        } | null;
        solicitudes_inversion: ({
            categorias: {
                id: number;
                nombre: string;
                fecha_creacion: Date | null;
                eliminado_el: Date | null;
            } | null;
            solicitud_evaluacion_financiera: {
                id: number;
                tir: import("@prisma/client-runtime-utils").Decimal | null;
                vpn: import("@prisma/client-runtime-utils").Decimal | null;
                payback: import("@prisma/client-runtime-utils").Decimal | null;
                solicitud_id: number | null;
            } | null;
            solicitud_flujo_caja: {
                id: number;
                tipo: string;
                anio: number;
                mes: number;
                monto: import("@prisma/client-runtime-utils").Decimal | null;
                solicitud_id: number | null;
            }[];
            solicitud_metas: {
                id: number;
                compromiso: string;
                fecha_inicio: Date;
                indicador: string;
                solicitud_id: number | null;
            }[];
            solicitud_valores: {
                id: number;
                categoria: string;
                usd: import("@prisma/client-runtime-utils").Decimal | null;
                cop: import("@prisma/client-runtime-utils").Decimal | null;
                solicitud_id: number | null;
            }[];
            subprogramas: ({
                programas: ({
                    grupos: {
                        id: number;
                        nombre: string;
                    } | null;
                } & {
                    id: number;
                    nombre: string;
                    id_grupo: number | null;
                }) | null;
            } & {
                id: number;
                nombre: string;
                programa_id: number | null;
                requiere_evaluacion_obligatoria: boolean | null;
            }) | null;
            usuarios: {
                id: number;
                email: string;
                nombre: string;
            } | null;
        } & {
            id: number;
            proceso_id: number | null;
            tipo_clasificacion: import("@prisma/client").$Enums.TipoClasificacion;
            subprograma_id: number | null;
            categoria_id: number | null;
            entregable_planeado: string | null;
            trm: import("@prisma/client-runtime-utils").Decimal | null;
            tiene_evaluacion_financiera: boolean;
            justificacion_sin_evaluacion: string | null;
            link_acta_aprobacion: string | null;
            link_plan_proyecto: string | null;
            link_presentacion_puertas_3: string | null;
            responsable_pm_id: number | null;
        }) | null;
    } & {
        id: number;
        fecha_creacion: Date | null;
        eliminado_el: Date | null;
        proyecto_id: string | null;
        tipo_proceso: string;
        estado_actual: string;
    }>;
    enviarARevision(procesoId: number, usuarioId: number): Promise<{
        procesoId: number;
        estado_actual: string;
        mensaje: string;
    }>;
    aprobarEtapa(procesoId: number, usuarioId: number, dto: AprobarSolicitudDto): Promise<{
        procesoId: number;
        estado_anterior: "VERIFICACION_PARTES_INTERESADAS";
        estado_actual: string;
        mensaje: string;
    } | {
        procesoId: number;
        estado_anterior: "GERENCIA" | "PRESIDENCIA" | "PENDIENTE_PMO" | "DIRECCION_PMO";
        estado_actual: string;
        mensaje: string;
    }>;
    rechazarEtapa(procesoId: number, usuarioId: number, dto: RechazarSolicitudDto): Promise<{
        procesoId: number;
        estado_anterior: string;
        estado_actual: string;
        mensaje: string;
    }>;
    cancelarDefinitivamente(procesoId: number, usuarioId: number, dto: CancelarSolicitudDto): Promise<{
        procesoId: number;
        estado_anterior: string;
        estado_actual: string;
        mensaje: string;
    }>;
    actualizarPartesInteresadas(procesoId: number, usuarioId: number, dto: ActualizarPartesInteresadasDto): Promise<{
        procesoId: number;
        mensaje: string;
    }>;
    obtenerPartesInteresadasPorCompania(companiaId: number): Promise<{
        id: number;
        email: string;
        nombre: string;
    }[]>;
    actualizarBorrador(procesoId: number, usuarioId: number, dto: CrearSolicitudInversionDto): Promise<{
        proceso_id: number;
        mensaje: string;
    }>;
    obtenerMisPendientes(usuarioId: number): Promise<({
        historico_aprobaciones: {
            fecha_registro: Date | null;
        }[];
        proyectos: {
            companias: {
                id: number;
                nombre: string;
            } | null;
            usuarios: {
                id: number;
                nombre: string;
            } | null;
            id: string;
            nombre: string;
        } | null;
        solicitudes_inversion: {
            categorias: {
                nombre: string;
            } | null;
            subprogramas: {
                programas: {
                    nombre: string;
                } | null;
                nombre: string;
            } | null;
            id: number;
            tipo_clasificacion: import("@prisma/client").$Enums.TipoClasificacion;
            entregable_planeado: string | null;
        } | null;
    } & {
        id: number;
        fecha_creacion: Date | null;
        eliminado_el: Date | null;
        proyecto_id: string | null;
        tipo_proceso: string;
        estado_actual: string;
    })[]>;
    obtenerCategorias(): Promise<{
        id: number;
        nombre: string;
    }[]>;
}
