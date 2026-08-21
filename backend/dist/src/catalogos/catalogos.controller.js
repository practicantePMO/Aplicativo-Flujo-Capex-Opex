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
exports.CatalogosController = void 0;
const common_1 = require("@nestjs/common");
const catalogos_service_1 = require("./catalogos.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let CatalogosController = class CatalogosController {
    catalogosService;
    constructor(catalogosService) {
        this.catalogosService = catalogosService;
    }
    async obtenerJerarquia() {
        return this.catalogosService.obtenerJerarquiaCompleta();
    }
    async obtenerGrupos() {
        return this.catalogosService.obtenerGrupos();
    }
    async obtenerProgramasPorGrupo(grupoId) {
        return this.catalogosService.obtenerProgramasPorGrupo(grupoId);
    }
    async obtenerSubprogramasPorPrograma(programaId) {
        return this.catalogosService.obtenerSubprogramasPorPrograma(programaId);
    }
};
exports.CatalogosController = CatalogosController;
__decorate([
    (0, common_1.Get)('jerarquia'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CatalogosController.prototype, "obtenerJerarquia", null);
__decorate([
    (0, common_1.Get)('grupos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CatalogosController.prototype, "obtenerGrupos", null);
__decorate([
    (0, common_1.Get)('programas/grupo/:grupoId'),
    __param(0, (0, common_1.Param)('grupoId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CatalogosController.prototype, "obtenerProgramasPorGrupo", null);
__decorate([
    (0, common_1.Get)('subprogramas/programa/:programaId'),
    __param(0, (0, common_1.Param)('programaId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CatalogosController.prototype, "obtenerSubprogramasPorPrograma", null);
exports.CatalogosController = CatalogosController = __decorate([
    (0, common_1.Controller)('catalogos'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [catalogos_service_1.CatalogosService])
], CatalogosController);
//# sourceMappingURL=catalogos.controller.js.map