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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProyectosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProyectosService = class ProyectosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async crearProyecto(usuarioId, dto) {
        const compania = await this.prisma.companias.findUnique({
            where: { id: dto.compania_id },
        });
        if (!compania) {
            throw new common_1.NotFoundException('La compañía seleccionada no existe.');
        }
        try {
            return await this.prisma.proyectos.create({
                data: {
                    nombre: dto.nombre,
                    compania_id: dto.compania_id,
                    fecha_proyecto: new Date(dto.fecha_proyecto),
                    creado_por: usuarioId,
                },
                select: {
                    id: true,
                    nombre: true,
                    fecha_proyecto: true,
                    anio_proyecto: true,
                    consecutivo: true,
                    fecha_creacion: true,
                    companias: { select: { id: true, nombre: true } },
                    usuarios: { select: { id: true, nombre: true, email: true } },
                },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error al registrar el proyecto en la base de datos.');
        }
    }
    async listarProyectos(usuarioId) {
        const rolesUsuario = await this.prisma.usuario_roles_compania.findMany({
            where: { usuario_id: usuarioId },
            include: { roles: true },
        });
        const codigosRoles = rolesUsuario
            .filter((r) => r.roles)
            .map((r) => r.roles.codigo);
        const rolesAccesoTotal = ['PMO', 'DIRECTOR_PMO', 'GERENCIA', 'PRESIDENCIA', 'ADMIN'];
        const tieneAccesoTotal = codigosRoles.some((rol) => rolesAccesoTotal.includes(rol));
        const selectCampos = {
            id: true,
            nombre: true,
            fecha_proyecto: true,
            anio_proyecto: true,
            consecutivo: true,
            fecha_creacion: true,
            companias: { select: { id: true, nombre: true } },
            usuarios: { select: { id: true, nombre: true } },
        };
        if (tieneAccesoTotal) {
            return this.prisma.proyectos.findMany({
                where: { eliminado_el: null },
                select: selectCampos,
                orderBy: { fecha_creacion: 'desc' },
            });
        }
        const condicionesOR = [];
        if (codigosRoles.includes('PM')) {
            condicionesOR.push({ creado_por: usuarioId });
        }
        if (codigosRoles.includes('PARTE_INTERESADA')) {
            condicionesOR.push({
                procesos: {
                    some: {
                        eliminado_el: null,
                        asignaciones_proceso: {
                            some: { usuario_id: usuarioId },
                        },
                    },
                },
            });
        }
        if (condicionesOR.length === 0) {
            condicionesOR.push({ creado_por: usuarioId }, {
                procesos: {
                    some: {
                        eliminado_el: null,
                        asignaciones_proceso: {
                            some: { usuario_id: usuarioId },
                        },
                    },
                },
            });
        }
        return this.prisma.proyectos.findMany({
            where: {
                eliminado_el: null,
                OR: condicionesOR,
            },
            select: selectCampos,
            orderBy: { fecha_creacion: 'desc' },
        });
    }
    async eliminarProyecto(usuarioId, proyectoId) {
        const proyecto = await this.prisma.proyectos.findFirst({
            where: { id: proyectoId, eliminado_el: null },
            include: { procesos: { where: { eliminado_el: null } } },
        });
        if (!proyecto)
            throw new common_1.NotFoundException('Proyecto no encontrado o ya eliminado.');
        const tieneProcesoAvanzado = proyecto.procesos.some((p) => p.estado_actual !== 'BORRADOR');
        if (tieneProcesoAvanzado) {
            throw new common_1.BadRequestException('No se puede eliminar: este proyecto ya tiene procesos que avanzaron más allá de Borrador. Contacta a un Administrador.');
        }
        return await this.prisma.$transaction(async (tx) => {
            const ahora = new Date();
            await tx.procesos.updateMany({
                where: { proyecto_id: proyectoId, eliminado_el: null },
                data: { eliminado_el: ahora },
            });
            await tx.proyectos.update({
                where: { id: proyectoId },
                data: { eliminado_el: ahora },
            });
            return { proyectoId, mensaje: 'Proyecto eliminado (lógicamente) exitosamente.' };
        });
    }
    async obtenerProcesosPorProyecto(usuarioId, proyectoId) {
        const proyecto = await this.prisma.proyectos.findFirst({
            where: { id: proyectoId, eliminado_el: null },
        });
        if (!proyecto) {
            throw new common_1.NotFoundException('El proyecto no existe o fue eliminado.');
        }
        await this.validarAccesoAProyecto(usuarioId, proyecto);
        return await this.prisma.procesos.findMany({
            where: {
                proyecto_id: proyectoId,
                eliminado_el: null,
            },
            select: {
                id: true,
                proyecto_id: true,
                tipo_proceso: true,
                estado_actual: true,
                fecha_creacion: true,
            },
            orderBy: { fecha_creacion: 'desc' },
        });
    }
    async validarAccesoAProyecto(usuarioId, proyecto) {
        const rolesUsuario = await this.prisma.usuario_roles_compania.findMany({
            where: { usuario_id: usuarioId },
            include: { roles: true },
        });
        const codigosRoles = rolesUsuario.filter((r) => r.roles).map((r) => r.roles.codigo);
        const rolesAccesoTotal = ['PMO', 'DIRECTOR_PMO', 'GERENCIA', 'PRESIDENCIA', 'ADMIN'];
        if (codigosRoles.some((rol) => rolesAccesoTotal.includes(rol)))
            return;
        if (codigosRoles.includes('PM') && proyecto.creado_por === usuarioId)
            return;
        const estaAsignado = await this.prisma.procesos.findFirst({
            where: {
                proyecto_id: proyecto.id,
                eliminado_el: null,
                asignaciones_proceso: { some: { usuario_id: usuarioId } },
            },
        });
        if (estaAsignado)
            return;
        throw new common_1.ForbiddenException('No tienes acceso a este proyecto.');
    }
};
exports.ProyectosService = ProyectosService;
exports.ProyectosService = ProyectosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProyectosService);
//# sourceMappingURL=proyectos.service.js.map