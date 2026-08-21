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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolicitudInversionController = void 0;
const common_1 = require("@nestjs/common");
const solicitud_inversion_service_1 = require("./solicitud-inversion.service");
const crear_solicitud_inversion_dto_1 = require("./dto/crear-solicitud-inversion.dto");
const cambiar_estado_solicitud_dto_1 = require("./dto/cambiar-estado-solicitud.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const actualizar_partes_interesadas_dto_1 = require("./dto/actualizar-partes-interesadas.dto");
const cancelar_solicitud_dto_1 = require("./dto/cancelar-solicitud.dto");
let SolicitudInversionController = class SolicitudInversionController {
    service;
    constructor(service) {
        this.service = service;
    }
    async crear(req, dto) {
        return this.service.crear(req.user.userId, dto);
    }
    async obtenerCategorias() {
        return this.service.obtenerCategorias();
    }
    async obtenerMisPendientes(req) {
        return this.service.obtenerMisPendientes(req.user.userId);
    }
    async obtenerPartesInteresadas(companiaId) {
        return await this.service.obtenerPartesInteresadasPorCompania(companiaId);
    }
    async enviarARevision(req, procesoId) {
        return this.service.enviarARevision(procesoId, req.user.userId);
    }
    async aprobarEtapa(req, procesoId, dto) {
        return this.service.aprobarEtapa(procesoId, req.user.userId, dto);
    }
    async rechazarEtapa(req, procesoId, dto) {
        return this.service.rechazarEtapa(procesoId, req.user.userId, dto);
    }
    async obtener(req, procesoId) {
        return this.service.obtenerPorProcesoId(req.user.userId, procesoId);
    }
    async actualizarPartesInteresadas(req, procesoId, dto) {
        return this.service.actualizarPartesInteresadas(procesoId, req.user.userId, dto);
    }
    async cancelarDefinitivamente(req, procesoId, dto) {
        return this.service.cancelarDefinitivamente(procesoId, req.user.userId, dto);
    }
    async actualizarBorrador(req, procesoId, dto) {
        return this.service.actualizarBorrador(procesoId, req.user.userId, dto);
    }
};
exports.SolicitudInversionController = SolicitudInversionController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('PM', 'ADMIN'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, crear_solicitud_inversion_dto_1.CrearSolicitudInversionDto]),
    __metadata("design:returntype", Promise)
], SolicitudInversionController.prototype, "crear", null);
__decorate([
    (0, common_1.Get)('categorias'),
    (0, roles_decorator_1.Roles)('PM', 'PMO', 'DIRECTOR_PMO', 'PARTE_INTERESADA', 'GERENCIA', 'PRESIDENCIA', 'ADMIN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SolicitudInversionController.prototype, "obtenerCategorias", null);
__decorate([
    (0, common_1.Get)('mis-pendientes'),
    (0, roles_decorator_1.Roles)('PM', 'PMO', 'DIRECTOR_PMO', 'PARTE_INTERESADA', 'GERENCIA', 'PRESIDENCIA', 'ADMIN'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SolicitudInversionController.prototype, "obtenerMisPendientes", null);
__decorate([
    (0, common_1.Get)('partes-interesadas/:companiaId'),
    (0, roles_decorator_1.Roles)('PM', 'PMO', 'DIRECTOR_PMO', 'PARTE_INTERESADA', 'GERENCIA', 'PRESIDENCIA', 'ADMIN'),
    __param(0, (0, common_1.Param)('companiaId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SolicitudInversionController.prototype, "obtenerPartesInteresadas", null);
__decorate([
    (0, common_1.Post)(':procesoId/enviar'),
    (0, roles_decorator_1.Roles)('PM', 'ADMIN'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('procesoId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], SolicitudInversionController.prototype, "enviarARevision", null);
__decorate([
    (0, common_1.Post)(':procesoId/aprobar'),
    (0, roles_decorator_1.Roles)('PMO', 'DIRECTOR_PMO', 'PARTE_INTERESADA', 'GERENCIA', 'PRESIDENCIA', 'ADMIN'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('procesoId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, cambiar_estado_solicitud_dto_1.AprobarSolicitudDto]),
    __metadata("design:returntype", Promise)
], SolicitudInversionController.prototype, "aprobarEtapa", null);
__decorate([
    (0, common_1.Post)(':procesoId/rechazar'),
    (0, roles_decorator_1.Roles)('PMO', 'DIRECTOR_PMO', 'PARTE_INTERESADA', 'GERENCIA', 'PRESIDENCIA', 'ADMIN'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('procesoId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, cambiar_estado_solicitud_dto_1.RechazarSolicitudDto]),
    __metadata("design:returntype", Promise)
], SolicitudInversionController.prototype, "rechazarEtapa", null);
__decorate([
    (0, common_1.Get)(':procesoId'),
    (0, roles_decorator_1.Roles)('ADMIN', 'PMO', 'DIRECTOR_PMO', 'PM', 'PARTE_INTERESADA', 'GERENCIA', 'PRESIDENCIA'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('procesoId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], SolicitudInversionController.prototype, "obtener", null);
__decorate([
    (0, common_1.Post)(':procesoId/partes-interesadas'),
    (0, roles_decorator_1.Roles)('PM', 'PMO', 'ADMIN'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('procesoId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, actualizar_partes_interesadas_dto_1.ActualizarPartesInteresadasDto]),
    __metadata("design:returntype", Promise)
], SolicitudInversionController.prototype, "actualizarPartesInteresadas", null);
__decorate([
    (0, common_1.Post)(':procesoId/cancelar'),
    (0, roles_decorator_1.Roles)('PMO', 'DIRECTOR_PMO', 'ADMIN'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('procesoId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, cancelar_solicitud_dto_1.CancelarSolicitudDto]),
    __metadata("design:returntype", Promise)
], SolicitudInversionController.prototype, "cancelarDefinitivamente", null);
__decorate([
    (0, common_1.Put)('borrador/:procesoId'),
    (0, roles_decorator_1.Roles)('PM', 'ADMIN'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('procesoId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, crear_solicitud_inversion_dto_1.CrearSolicitudInversionDto]),
    __metadata("design:returntype", Promise)
], SolicitudInversionController.prototype, "actualizarBorrador", null);
exports.SolicitudInversionController = SolicitudInversionController = __decorate([
    (0, common_1.Controller)('solicitud-inversion'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [solicitud_inversion_service_1.SolicitudInversionService])
], SolicitudInversionController);
//# sourceMappingURL=solicitud-inversion.controller.js.map