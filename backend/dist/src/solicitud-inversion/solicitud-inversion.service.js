"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SolicitudInversionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolicitudInversionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const permisos_service_1 = require("../permisos/permisos.service");
const notificaciones_service_1 = require("../notificaciones/notificaciones.service");
const REGLA_POR_ETAPA = {
    PENDIENTE_PMO: { tipo: 'ROL_COMPANIA', roles: ['PMO', 'ADMIN'] },
    VERIFICACION_PARTES_INTERESADAS: { tipo: 'ASIGNACION_INDIVIDUAL' },
    DIRECCION_PMO: { tipo: 'ROL_COMPANIA', roles: ['DIRECTOR_PMO', 'ADMIN'] },
    GERENCIA: { tipo: 'ROL_COMPANIA', roles: ['GERENCIA', 'PMO', 'ADMIN'] },
    PRESIDENCIA: { tipo: 'ROL_COMPANIA', roles: ['PRESIDENCIA', 'ADMIN'] },
};
let SolicitudInversionService = SolicitudInversionService_1 = class SolicitudInversionService {
    prisma;
    permisos;
    notificaciones;
    logger = new common_1.Logger(SolicitudInversionService_1.name);
    constructor(prisma, permisos, notificaciones) {
        this.prisma = prisma;
        this.permisos = permisos;
        this.notificaciones = notificaciones;
    }
    async obtenerEmailsPorRol(codigosRol, companiaId) {
        const usuarios = await this.prisma.usuarios.findMany({
            where: {
                activo: true,
                eliminado_el: null,
                usuario_roles_compania: {
                    some: { roles: { codigo: { in: codigosRol } }, OR: [{ compania_id: null }, { compania_id: companiaId }] },
                },
            },
            select: { email: true },
        });
        return Array.from(new Set(usuarios.map((u) => u.email).filter((e) => Boolean(e))));
    }
    async obtenerEmailsAsignados(procesoId, etapa) {
        const asignaciones = await this.prisma.asignaciones_proceso.findMany({
            where: { proceso_id: procesoId, etapa, estado_asignacion: 'PENDIENTE' },
            include: { usuarios: { select: { email: true } } },
        });
        return Array.from(new Set(asignaciones.map((a) => a.usuarios?.email).filter((e) => Boolean(e))));
    }
    async obtenerProcesoConCompania(procesoId) {
        const proceso = await this.prisma.procesos.findUnique({
            where: { id: procesoId },
            include: {
                proyectos: { select: { id: true, nombre: true, consecutivo: true, compania_id: true } },
                solicitudes_inversion: { include: { usuarios: { select: { id: true, nombre: true, email: true } } } },
            },
        });
        if (!proceso || proceso.eliminado_el)
            throw new common_1.NotFoundException('Proceso no encontrado.');
        if (!proceso.proyectos?.compania_id)
            throw new common_1.InternalServerErrorException('El proyecto no tiene compañía.');
        return { proceso, proyecto: proceso.proyectos, companiaId: proceso.proyectos.compania_id };
    }
    async validarPermisoParaEtapa(usuarioId, procesoId, companiaId, etapa) {
        const regla = REGLA_POR_ETAPA[etapa];
        if (!regla)
            throw new common_1.BadRequestException(`No hay regla definida para la etapa "${etapa}".`);
        if (regla.tipo === 'ROL_COMPANIA')
            await this.permisos.exigirRolParaCompania(usuarioId, regla.roles, companiaId);
        else
            await this.permisos.exigirAsignacionAEtapa(usuarioId, procesoId, etapa);
    }
    async crear(usuarioId, dto) {
        const proyecto = await this.prisma.proyectos.findFirst({ where: { id: dto.proyecto_id, eliminado_el: null } });
        if (!proyecto)
            throw new common_1.NotFoundException('El proyecto no existe.');
        if (proyecto.compania_id) {
            const esAdmin = await this.permisos.esAdminGlobal(usuarioId);
            if (!esAdmin) {
                await this.permisos.exigirRolParaCompania(usuarioId, ['PM'], proyecto.compania_id);
            }
        }
        const procesoExistente = await this.prisma.procesos.findFirst({
            where: {
                proyecto_id: dto.proyecto_id,
                tipo_proceso: 'SOLICITUD_INVERSION',
                eliminado_el: null,
            },
        });
        if (procesoExistente) {
            throw new common_1.BadRequestException(`El proyecto ${dto.proyecto_id} ya cuenta con una Solicitud de Inversión (Proceso ID: ${procesoExistente.id}).`);
        }
        if (dto.tipo_clasificacion === 'NUEVA') {
            if (!dto.categoria_id) {
                throw new common_1.BadRequestException('Debes seleccionar una Categoría.');
            }
            const categoria = await this.prisma.categorias.findUnique({ where: { id: dto.categoria_id } });
            if (!categoria)
                throw new common_1.NotFoundException('La categoría seleccionada no existe.');
        }
        else {
            if (!dto.subprograma_id) {
                throw new common_1.BadRequestException('Debes seleccionar un Subprograma.');
            }
            const subprograma = await this.prisma.subprogramas.findUnique({ where: { id: dto.subprograma_id } });
            if (subprograma?.requiere_evaluacion_obligatoria && !dto.tiene_evaluacion_financiera) {
                throw new common_1.BadRequestException('El subprograma requiere evaluación financiera obligatoria.');
            }
        }
        try {
            return await this.prisma.$transaction(async (tx) => {
                const proceso = await tx.procesos.create({
                    data: { proyecto_id: dto.proyecto_id, tipo_proceso: 'SOLICITUD_INVERSION', estado_actual: 'BORRADOR' },
                });
                const solicitud = await tx.solicitudes_inversion.create({
                    data: {
                        proceso_id: proceso.id,
                        tipo_clasificacion: dto.tipo_clasificacion || 'TRADICIONAL',
                        subprograma_id: dto.tipo_clasificacion === 'NUEVA' ? null : dto.subprograma_id,
                        categoria_id: dto.tipo_clasificacion === 'TRADICIONAL' ? null : dto.categoria_id,
                        entregable_planeado: dto.entregable_planeado,
                        tiene_evaluacion_financiera: dto.tiene_evaluacion_financiera,
                        trm: dto.trm,
                        justificacion_sin_evaluacion: dto.tiene_evaluacion_financiera ? null : dto.justificacion_sin_evaluacion,
                        responsable_pm_id: usuarioId,
                        link_acta_aprobacion: dto.link_acta_aprobacion,
                        link_plan_proyecto: dto.link_plan_proyecto,
                        link_presentacion_puertas_3: dto.link_presentacion_puertas_3,
                    },
                });
                if (dto.tiene_evaluacion_financiera && dto.evaluacion_financiera) {
                    await tx.solicitud_evaluacion_financiera.create({
                        data: { ...dto.evaluacion_financiera, solicitud_id: solicitud.id },
                    });
                }
                if (dto.metas?.length) {
                    await tx.solicitud_metas.createMany({
                        data: dto.metas.map((m) => ({ ...m, fecha_inicio: new Date(m.fecha_inicio), solicitud_id: solicitud.id })),
                    });
                }
                if (dto.valores?.length) {
                    await tx.solicitud_valores.createMany({
                        data: dto.valores.map((v) => ({ ...v, solicitud_id: solicitud.id })),
                    });
                }
                if (dto.flujos_caja?.length) {
                    await tx.solicitud_flujo_caja.createMany({
                        data: dto.flujos_caja.map((f) => ({ ...f, solicitud_id: solicitud.id })),
                    });
                }
                if (dto.partes_interesadas_ids?.length) {
                    await tx.asignaciones_proceso.createMany({
                        data: dto.partes_interesadas_ids.map((piId) => ({
                            proceso_id: proceso.id,
                            etapa: 'VERIFICACION_PARTES_INTERESADAS',
                            usuario_id: piId,
                            estado_asignacion: 'PENDIENTE',
                        })),
                    });
                }
                return { proceso_id: proceso.id, estado_actual: proceso.estado_actual, mensaje: 'Solicitud guardada en BORRADOR.' };
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.BadRequestException('Este proyecto ya tiene una Solicitud de Inversión activa.');
            }
            this.logger.error('Error guardando la solicitud', error.stack);
            throw new common_1.InternalServerErrorException('Error al guardar la solicitud en la base de datos.');
        }
    }
    async obtenerPorProcesoId(usuarioId, procesoId) {
        const proceso = await this.prisma.procesos.findUnique({
            where: { id: procesoId },
            include: {
                proyectos: { select: { id: true, nombre: true, fecha_proyecto: true, compania_id: true, companias: { select: { id: true, nombre: true } } } },
                solicitudes_inversion: {
                    include: {
                        subprogramas: { include: { programas: { include: { grupos: true } } } },
                        categorias: true,
                        solicitud_evaluacion_financiera: true,
                        solicitud_metas: true,
                        solicitud_valores: true,
                        solicitud_flujo_caja: true,
                        usuarios: { select: { id: true, nombre: true, email: true } },
                    },
                },
                asignaciones_proceso: { include: { usuarios: { select: { id: true, nombre: true, email: true } } } },
                historico_aprobaciones: { include: { usuarios: { select: { id: true, nombre: true } } }, orderBy: { fecha_registro: 'desc' } },
            },
        });
        if (!proceso || proceso.eliminado_el)
            throw new common_1.NotFoundException('Proceso no encontrado.');
        const companiaId = proceso.proyectos?.compania_id;
        const esAdmin = await this.permisos.esAdminGlobal(usuarioId);
        const esResponsable = proceso.solicitudes_inversion?.responsable_pm_id === usuarioId;
        const esAsignado = proceso.asignaciones_proceso.some((a) => a.usuario_id === usuarioId);
        const tieneRolEnCompania = companiaId
            ? await this.permisos.tieneRolParaCompania(usuarioId, ['PMO', 'DIRECTOR_PMO', 'GERENCIA', 'PRESIDENCIA'], companiaId)
            : false;
        if (!esAdmin && !esResponsable && !esAsignado && !tieneRolEnCompania) {
            throw new common_1.ForbiddenException('No tienes acceso a este proceso.');
        }
        return proceso;
    }
    async enviarARevision(procesoId, usuarioId) {
        const { proceso, proyecto, companiaId } = await this.obtenerProcesoConCompania(procesoId);
        if (proceso.tipo_proceso !== 'SOLICITUD_INVERSION')
            throw new common_1.NotFoundException('Proceso no válido.');
        if (proceso.estado_actual !== 'BORRADOR')
            throw new common_1.BadRequestException('Solo enviar solicitudes en estado BORRADOR.');
        const solicitud = proceso.solicitudes_inversion;
        const esAdmin = await this.permisos.esAdminGlobal(usuarioId);
        if (solicitud?.responsable_pm_id !== usuarioId && !esAdmin) {
            throw new common_1.BadRequestException('Solo el PM responsable puede enviar esta solicitud.');
        }
        const estadoDestino = 'PENDIENTE_PMO';
        const resultado = await this.prisma.$transaction(async (tx) => {
            const { count } = await tx.procesos.updateMany({
                where: { id: procesoId, estado_actual: 'BORRADOR' },
                data: { estado_actual: estadoDestino },
            });
            if (count === 0)
                throw new common_1.BadRequestException('La solicitud ya cambió de estado. Refresca la pantalla.');
            await tx.historico_aprobaciones.create({
                data: { proceso_id: procesoId, etapa_origen: 'BORRADOR', etapa_destino: estadoDestino, accion: 'ENVIADO', usuario_id: usuarioId },
            });
            return { procesoId, estado_actual: estadoDestino, mensaje: 'Enviada a revisión PMO.' };
        });
        try {
            const destinatariosPmo = await this.obtenerEmailsPorRol(['PMO', 'ADMIN'], companiaId);
            if (destinatariosPmo.length) {
                await this.notificaciones.encolarNotificacion({
                    tipo: 'NUEVA_SOLICITUD',
                    destinatarios: destinatariosPmo,
                    datos: {
                        nombreUsuario: 'Equipo PMO',
                        etapaActual: 'Pendiente Revisión PMO',
                        codigoProyecto: proyecto.id.toString(),
                        nombreProyecto: proyecto.nombre,
                        nombrePM: solicitud?.usuarios?.nombre || 'Project Manager',
                    },
                });
            }
        }
        catch (error) {
            this.logger.error('Error al notificar (enviarARevision)', error);
        }
        return resultado;
    }
    async aprobarEtapa(procesoId, usuarioId, dto) {
        const { proceso, proyecto, companiaId } = await this.obtenerProcesoConCompania(procesoId);
        const estadoOrigen = proceso.estado_actual;
        await this.validarPermisoParaEtapa(usuarioId, procesoId, companiaId, estadoOrigen);
        let estadoDestino = '';
        switch (estadoOrigen) {
            case 'PENDIENTE_PMO':
                estadoDestino = 'VERIFICACION_PARTES_INTERESADAS';
                break;
            case 'VERIFICACION_PARTES_INTERESADAS':
                break;
            case 'DIRECCION_PMO':
                estadoDestino = 'GERENCIA';
                break;
            case 'GERENCIA':
                if (dto.enviar_a_presidencia === undefined) {
                    throw new common_1.BadRequestException('Debes indicar si el proceso continúa a Presidencia (enviar_a_presidencia: true) o si finaliza aquí (false).');
                }
                estadoDestino = dto.enviar_a_presidencia ? 'PRESIDENCIA' : 'APROBADO_FINAL';
                break;
            case 'PRESIDENCIA':
                estadoDestino = 'APROBADO_FINAL';
                break;
            default:
                throw new common_1.BadRequestException(`No se puede aprobar una solicitud en estado "${estadoOrigen}".`);
        }
        const resultado = await this.prisma.$transaction(async (tx) => {
            if (estadoOrigen === 'VERIFICACION_PARTES_INTERESADAS') {
                const res = await tx.asignaciones_proceso.updateMany({
                    where: {
                        proceso_id: procesoId,
                        etapa: estadoOrigen,
                        usuario_id: usuarioId,
                        estado_asignacion: 'PENDIENTE',
                    },
                    data: { estado_asignacion: 'RESUELTA', fecha_resolucion: new Date() },
                });
                if (res.count === 0) {
                    throw new common_1.BadRequestException('No tienes una asignación pendiente para aprobar en esta etapa.');
                }
                const pendientes = await tx.asignaciones_proceso.count({
                    where: {
                        proceso_id: procesoId,
                        etapa: estadoOrigen,
                        estado_asignacion: 'PENDIENTE',
                    },
                });
                await tx.historico_aprobaciones.create({
                    data: {
                        proceso_id: procesoId,
                        etapa_origen: estadoOrigen,
                        etapa_destino: pendientes === 0 ? 'DIRECCION_PMO' : estadoOrigen,
                        accion: pendientes === 0 ? 'APROBADO' : 'APROBADO_PARCIAL',
                        usuario_id: usuarioId,
                    },
                });
                if (pendientes > 0) {
                    return {
                        procesoId,
                        estado_anterior: estadoOrigen,
                        estado_actual: estadoOrigen,
                        mensaje: `Aprobación registrada correctamente. Faltan ${pendientes} parte(s) interesada(s) por verificar.`,
                    };
                }
                estadoDestino = 'DIRECCION_PMO';
                await tx.procesos.update({
                    where: { id: procesoId },
                    data: { estado_actual: estadoDestino },
                });
                return {
                    procesoId,
                    estado_anterior: estadoOrigen,
                    estado_actual: estadoDestino,
                    mensaje: 'Todas las partes interesadas han verificado. El proceso avanza a Dirección PMO.',
                };
            }
            const { count } = await tx.procesos.updateMany({
                where: { id: procesoId, estado_actual: estadoOrigen },
                data: { estado_actual: estadoDestino },
            });
            if (count === 0) {
                throw new common_1.BadRequestException('El proceso fue modificado por otro usuario. Refresca la pantalla.');
            }
            if (estadoDestino === 'VERIFICACION_PARTES_INTERESADAS') {
                await tx.asignaciones_proceso.updateMany({
                    where: { proceso_id: procesoId, etapa: 'VERIFICACION_PARTES_INTERESADAS' },
                    data: { estado_asignacion: 'PENDIENTE', fecha_resolucion: null },
                });
            }
            await tx.historico_aprobaciones.create({
                data: {
                    proceso_id: procesoId,
                    etapa_origen: estadoOrigen,
                    etapa_destino: estadoDestino,
                    accion: 'APROBADO',
                    usuario_id: usuarioId,
                },
            });
            return {
                procesoId,
                estado_anterior: estadoOrigen,
                estado_actual: estadoDestino,
                mensaje: 'Aprobado exitosamente.',
            };
        });
        try {
            const pmEmail = proceso.solicitudes_inversion?.usuarios?.email;
            const usuarioAprobador = await this.prisma.usuarios.findUnique({
                where: { id: usuarioId },
                select: { nombre: true },
            });
            if (pmEmail) {
                await this.notificaciones.encolarNotificacion({
                    tipo: 'SOLICITUD_APROBADA',
                    destinatarios: [pmEmail],
                    datos: {
                        nombrePM: proceso.solicitudes_inversion?.usuarios?.nombre,
                        codigoProyecto: proyecto.id.toString(),
                        nombreProyecto: proyecto.nombre,
                        nuevoEstado: resultado.estado_actual,
                        nombreAprobador: usuarioAprobador?.nombre || 'Parte Interesada / Aprobador',
                    },
                });
            }
        }
        catch (error) {
            this.logger.error('Error al notificar (aprobarEtapa)', error);
        }
        return resultado;
    }
    async rechazarEtapa(procesoId, usuarioId, dto) {
        const { proceso, proyecto, companiaId } = await this.obtenerProcesoConCompania(procesoId);
        if (proceso.estado_actual === 'BORRADOR' || proceso.estado_actual === 'APROBADO_FINAL') {
            throw new common_1.BadRequestException('No se puede rechazar en este estado.');
        }
        const estadoOrigen = proceso.estado_actual;
        await this.validarPermisoParaEtapa(usuarioId, procesoId, companiaId, estadoOrigen);
        const estadoDestino = 'BORRADOR';
        const resultado = await this.prisma.$transaction(async (tx) => {
            const { count } = await tx.procesos.updateMany({
                where: { id: procesoId, estado_actual: estadoOrigen },
                data: { estado_actual: estadoDestino },
            });
            if (count === 0)
                throw new common_1.BadRequestException('El proceso fue modificado. Refresca la pantalla.');
            if (REGLA_POR_ETAPA[estadoOrigen]?.tipo === 'ASIGNACION_INDIVIDUAL') {
                await tx.asignaciones_proceso.updateMany({
                    where: { proceso_id: procesoId, etapa: estadoOrigen, estado_asignacion: 'PENDIENTE' },
                    data: { estado_asignacion: 'CANCELADA', fecha_resolucion: new Date() },
                });
            }
            await tx.historico_aprobaciones.create({
                data: {
                    proceso_id: procesoId,
                    etapa_origen: estadoOrigen,
                    etapa_destino: estadoDestino,
                    accion: 'RECHAZADO',
                    razon_rechazo: dto.razon_rechazo,
                    usuario_id: usuarioId,
                },
            });
            return { procesoId, estado_anterior: estadoOrigen, estado_actual: estadoDestino, mensaje: 'Rechazado y devuelto a BORRADOR.' };
        });
        try {
            const pmEmail = proceso.solicitudes_inversion?.usuarios?.email;
            const usuarioRechazador = await this.prisma.usuarios.findUnique({ where: { id: usuarioId }, select: { nombre: true } });
            if (pmEmail) {
                await this.notificaciones.encolarNotificacion({
                    tipo: 'SOLICITUD_RECHAZADA',
                    destinatarios: [pmEmail],
                    datos: {
                        nombrePM: proceso.solicitudes_inversion?.usuarios?.nombre,
                        codigoProyecto: proyecto.id.toString(),
                        nombreProyecto: proyecto.nombre,
                        nombreRechazador: usuarioRechazador?.nombre || 'Revisor',
                        razonRechazo: dto.razon_rechazo,
                    },
                });
            }
        }
        catch (error) {
            this.logger.error('Error al notificar (rechazarEtapa)', error);
        }
        return resultado;
    }
    async cancelarDefinitivamente(procesoId, usuarioId, dto) {
        const { proceso, proyecto, companiaId } = await this.obtenerProcesoConCompania(procesoId);
        const estadoOrigen = proceso.estado_actual;
        if (['BORRADOR', 'APROBADO_FINAL', 'CANCELADO'].includes(estadoOrigen)) {
            throw new common_1.BadRequestException(`No se puede cancelar una solicitud en estado "${estadoOrigen}".`);
        }
        await this.permisos.exigirRolParaCompania(usuarioId, ['PMO', 'DIRECTOR_PMO', 'ADMIN'], companiaId);
        const estadoDestino = 'CANCELADO';
        const resultado = await this.prisma.$transaction(async (tx) => {
            const { count } = await tx.procesos.updateMany({
                where: { id: procesoId, estado_actual: estadoOrigen },
                data: { estado_actual: estadoDestino },
            });
            if (count === 0)
                throw new common_1.BadRequestException('El proceso fue modificado por otro usuario. Refresca la pantalla.');
            await tx.asignaciones_proceso.updateMany({
                where: { proceso_id: procesoId, estado_asignacion: 'PENDIENTE' },
                data: { estado_asignacion: 'CANCELADA', fecha_resolucion: new Date() },
            });
            await tx.historico_aprobaciones.create({
                data: {
                    proceso_id: procesoId,
                    etapa_origen: estadoOrigen,
                    etapa_destino: estadoDestino,
                    accion: 'CANCELADO',
                    razon_rechazo: dto.razon_cancelacion,
                    usuario_id: usuarioId,
                },
            });
            return { procesoId, estado_anterior: estadoOrigen, estado_actual: estadoDestino, mensaje: 'Solicitud cancelada definitivamente.' };
        });
        try {
            const pmEmail = proceso.solicitudes_inversion?.usuarios?.email;
            const usuarioQueCancela = await this.prisma.usuarios.findUnique({ where: { id: usuarioId }, select: { nombre: true } });
            if (pmEmail) {
                await this.notificaciones.encolarNotificacion({
                    tipo: 'SOLICITUD_RECHAZADA',
                    destinatarios: [pmEmail],
                    datos: {
                        nombrePM: proceso.solicitudes_inversion?.usuarios?.nombre,
                        codigoProyecto: proyecto.id.toString(),
                        nombreProyecto: proyecto.nombre,
                        nombreRechazador: usuarioQueCancela?.nombre || 'Administrador',
                        razonRechazo: `[CANCELACIÓN DEFINITIVA] ${dto.razon_cancelacion}`,
                    },
                });
            }
        }
        catch (error) {
            this.logger.error('Error al notificar cancelación', error);
        }
        return resultado;
    }
    async actualizarPartesInteresadas(procesoId, usuarioId, dto) {
        const { proceso, companiaId } = await this.obtenerProcesoConCompania(procesoId);
        if (!['BORRADOR', 'PENDIENTE_PMO'].includes(proceso.estado_actual)) {
            throw new common_1.BadRequestException('Solo se pueden actualizar partes interesadas antes de la etapa de verificación.');
        }
        const esPM = proceso.solicitudes_inversion?.responsable_pm_id === usuarioId;
        const esAdminOrPMO = await this.permisos.tieneRolParaCompania(usuarioId, ['PMO', 'ADMIN'], companiaId);
        if (!esPM && !esAdminOrPMO) {
            throw new common_1.ForbiddenException('Solo el PM responsable o un miembro de la PMO pueden modificar las partes interesadas.');
        }
        return await this.prisma.$transaction(async (tx) => {
            await tx.asignaciones_proceso.deleteMany({
                where: { proceso_id: procesoId, etapa: 'VERIFICACION_PARTES_INTERESADAS', estado_asignacion: 'PENDIENTE' },
            });
            await tx.asignaciones_proceso.createMany({
                data: dto.partes_interesadas_ids.map((id) => ({
                    proceso_id: procesoId,
                    etapa: 'VERIFICACION_PARTES_INTERESADAS',
                    usuario_id: id,
                    estado_asignacion: 'PENDIENTE',
                })),
            });
            return { procesoId, mensaje: 'Partes interesadas actualizadas exitosamente.' };
        });
    }
    async obtenerPartesInteresadasPorCompania(companiaId) {
        return await this.prisma.usuarios.findMany({
            where: {
                activo: true,
                eliminado_el: null,
                usuario_roles_compania: {
                    some: {
                        roles: { codigo: 'PARTE_INTERESADA' },
                        OR: [{ compania_id: null }, { compania_id: companiaId }],
                    },
                },
            },
            select: {
                id: true,
                nombre: true,
                email: true,
            },
            orderBy: { nombre: 'asc' },
        });
    }
    async actualizarBorrador(procesoId, usuarioId, dto) {
        const { proceso, companiaId } = await this.obtenerProcesoConCompania(procesoId);
        if (proceso.estado_actual !== 'BORRADOR') {
            throw new common_1.BadRequestException('Solo se pueden actualizar solicitudes en estado BORRADOR.');
        }
        const solicitud = proceso.solicitudes_inversion;
        if (!solicitud) {
            throw new common_1.NotFoundException('No existe la solicitud asociada a este proceso.');
        }
        const esAdmin = await this.permisos.esAdminGlobal(usuarioId);
        const esPMO = await this.permisos.tieneRolParaCompania(usuarioId, ['PMO'], companiaId);
        if (solicitud.responsable_pm_id !== usuarioId && !esAdmin && !esPMO) {
            throw new common_1.ForbiddenException('No tienes permisos para modificar este borrador.');
        }
        if (dto.tipo_clasificacion === 'NUEVA') {
            if (!dto.categoria_id) {
                throw new common_1.BadRequestException('Debes seleccionar una Categoría.');
            }
            const categoria = await this.prisma.categorias.findUnique({ where: { id: dto.categoria_id } });
            if (!categoria)
                throw new common_1.NotFoundException('La categoría seleccionada no existe.');
        }
        else {
            if (!dto.subprograma_id) {
                throw new common_1.BadRequestException('Debes seleccionar un Subprograma.');
            }
            const subprograma = await this.prisma.subprogramas.findUnique({ where: { id: dto.subprograma_id } });
            if (subprograma?.requiere_evaluacion_obligatoria && !dto.tiene_evaluacion_financiera) {
                throw new common_1.BadRequestException('El subprograma requiere evaluación financiera obligatoria.');
            }
        }
        try {
            return await this.prisma.$transaction(async (tx) => {
                await tx.solicitudes_inversion.update({
                    where: { id: solicitud.id },
                    data: {
                        tipo_clasificacion: dto.tipo_clasificacion || 'TRADICIONAL',
                        subprograma_id: dto.tipo_clasificacion === 'NUEVA' ? null : dto.subprograma_id,
                        categoria_id: dto.tipo_clasificacion === 'TRADICIONAL' ? null : dto.categoria_id,
                        entregable_planeado: dto.entregable_planeado,
                        tiene_evaluacion_financiera: dto.tiene_evaluacion_financiera,
                        trm: dto.trm,
                        justificacion_sin_evaluacion: dto.tiene_evaluacion_financiera ? null : dto.justificacion_sin_evaluacion,
                        link_acta_aprobacion: dto.link_acta_aprobacion,
                        link_plan_proyecto: dto.link_plan_proyecto,
                        link_presentacion_puertas_3: dto.link_presentacion_puertas_3,
                    },
                });
                await tx.solicitud_evaluacion_financiera.deleteMany({ where: { solicitud_id: solicitud.id } });
                if (dto.tiene_evaluacion_financiera && dto.evaluacion_financiera) {
                    await tx.solicitud_evaluacion_financiera.create({
                        data: { ...dto.evaluacion_financiera, solicitud_id: solicitud.id },
                    });
                }
                await tx.solicitud_metas.deleteMany({ where: { solicitud_id: solicitud.id } });
                if (dto.metas?.length) {
                    await tx.solicitud_metas.createMany({
                        data: dto.metas.map((m) => ({ ...m, fecha_inicio: new Date(m.fecha_inicio), solicitud_id: solicitud.id })),
                    });
                }
                await tx.solicitud_valores.deleteMany({ where: { solicitud_id: solicitud.id } });
                if (dto.valores?.length) {
                    await tx.solicitud_valores.createMany({
                        data: dto.valores.map((v) => ({ ...v, solicitud_id: solicitud.id })),
                    });
                }
                await tx.solicitud_flujo_caja.deleteMany({ where: { solicitud_id: solicitud.id } });
                if (dto.flujos_caja?.length) {
                    await tx.solicitud_flujo_caja.createMany({
                        data: dto.flujos_caja.map((f) => ({ ...f, solicitud_id: solicitud.id })),
                    });
                }
                if (dto.partes_interesadas_ids !== undefined) {
                    await tx.asignaciones_proceso.deleteMany({
                        where: { proceso_id: procesoId, etapa: 'VERIFICACION_PARTES_INTERESADAS' },
                    });
                    if (dto.partes_interesadas_ids.length) {
                        await tx.asignaciones_proceso.createMany({
                            data: dto.partes_interesadas_ids.map((piId) => ({
                                proceso_id: procesoId,
                                etapa: 'VERIFICACION_PARTES_INTERESADAS',
                                usuario_id: piId,
                                estado_asignacion: 'PENDIENTE',
                            })),
                        });
                    }
                }
                return { proceso_id: procesoId, mensaje: 'Borrador actualizado exitosamente.' };
            });
        }
        catch (error) {
            this.logger.error('Error actualizando borrador de la solicitud', error.stack);
            throw new common_1.InternalServerErrorException('Error al actualizar el borrador en la base de datos.');
        }
    }
    async obtenerMisPendientes(usuarioId) {
        const rolesUsuario = await this.prisma.usuario_roles_compania.findMany({
            where: { usuario_id: usuarioId },
            include: { roles: true },
        });
        const codigosGlobales = rolesUsuario
            .filter((r) => r.compania_id === null && r.roles)
            .map((r) => r.roles.codigo);
        const rolesPorCompania = rolesUsuario
            .filter((r) => r.compania_id !== null && r.roles)
            .map((r) => ({ rol: r.roles.codigo, companiaId: r.compania_id }));
        const etapasRolesMap = {
            PENDIENTE_PMO: ['PMO', 'ADMIN'],
            DIRECCION_PMO: ['DIRECTOR_PMO', 'ADMIN'],
            GERENCIA: ['GERENCIA', 'PMO', 'ADMIN'],
            PRESIDENCIA: ['PRESIDENCIA', 'ADMIN'],
        };
        const condicionesEtapas = [];
        Object.entries(etapasRolesMap).forEach(([etapa, rolesPermitidos]) => {
            const tieneGlobal = codigosGlobales.some((rol) => rolesPermitidos.includes(rol));
            if (tieneGlobal) {
                condicionesEtapas.push({ estado_actual: etapa });
            }
            else {
                const companiasValidas = rolesPorCompania
                    .filter((r) => rolesPermitidos.includes(r.rol))
                    .map((r) => r.companiaId);
                if (companiasValidas.length > 0) {
                    condicionesEtapas.push({
                        estado_actual: etapa,
                        proyectos: { compania_id: { in: companiasValidas } },
                    });
                }
            }
        });
        return await this.prisma.procesos.findMany({
            where: {
                eliminado_el: null,
                tipo_proceso: 'SOLICITUD_INVERSION',
                OR: [
                    ...condicionesEtapas,
                    {
                        asignaciones_proceso: {
                            some: {
                                usuario_id: usuarioId,
                                estado_asignacion: 'PENDIENTE',
                            },
                        },
                    },
                ],
            },
            include: {
                proyectos: {
                    select: {
                        id: true,
                        nombre: true,
                        companias: { select: { id: true, nombre: true } },
                        usuarios: { select: { id: true, nombre: true } },
                    },
                },
                solicitudes_inversion: {
                    select: {
                        id: true,
                        tipo_clasificacion: true,
                        entregable_planeado: true,
                        categorias: { select: { nombre: true } },
                        subprogramas: {
                            select: {
                                nombre: true,
                                programas: { select: { nombre: true } },
                            },
                        },
                    },
                },
                historico_aprobaciones: {
                    take: 1,
                    orderBy: { fecha_registro: 'desc' },
                    select: { fecha_registro: true },
                },
            },
            orderBy: { id: 'desc' },
        });
    }
    async obtenerCategorias() {
        return this.prisma.categorias.findMany({
            where: { eliminado_el: null },
            select: { id: true, nombre: true },
            orderBy: { nombre: 'asc' },
        });
    }
};
exports.SolicitudInversionService = SolicitudInversionService;
exports.SolicitudInversionService = SolicitudInversionService = SolicitudInversionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        permisos_service_1.PermisosService,
        notificaciones_service_1.NotificacionesService])
], SolicitudInversionService);
//# sourceMappingURL=solicitud-inversion.service.js.map