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
exports.PermisosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PermisosService = class PermisosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async esAdminGlobal(usuarioId) {
        const asignacion = await this.prisma.usuario_roles_compania.findFirst({
            where: { usuario_id: usuarioId, roles: { codigo: 'ADMIN' } },
        });
        return !!asignacion;
    }
    async tieneRolParaCompania(usuarioId, codigosRol, companiaId) {
        const asignacion = await this.prisma.usuario_roles_compania.findFirst({
            where: {
                usuario_id: usuarioId,
                roles: { codigo: { in: codigosRol } },
                OR: [{ compania_id: null }, { compania_id: companiaId }],
            },
        });
        return !!asignacion;
    }
    async exigirRolParaCompania(usuarioId, codigosRol, companiaId) {
        const tiene = await this.tieneRolParaCompania(usuarioId, codigosRol, companiaId);
        if (!tiene) {
            throw new common_1.ForbiddenException(`No tienes el rol requerido [${codigosRol.join(', ')}] para esta compañía.`);
        }
    }
    async estaAsignadoAEtapa(usuarioId, procesoId, etapa) {
        const asignacion = await this.prisma.asignaciones_proceso.findFirst({
            where: {
                usuario_id: usuarioId,
                proceso_id: procesoId,
                etapa,
                estado_asignacion: 'PENDIENTE',
            },
        });
        return !!asignacion;
    }
    async exigirAsignacionAEtapa(usuarioId, procesoId, etapa) {
        const asignado = await this.estaAsignadoAEtapa(usuarioId, procesoId, etapa);
        if (!asignado) {
            throw new common_1.ForbiddenException('No fuiste asignado como verificador para esta solicitud.');
        }
    }
};
exports.PermisosService = PermisosService;
exports.PermisosService = PermisosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PermisosService);
//# sourceMappingURL=permisos.service.js.map