"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolicitudInversionModule = void 0;
const common_1 = require("@nestjs/common");
const solicitud_inversion_service_1 = require("./solicitud-inversion.service");
const solicitud_inversion_controller_1 = require("./solicitud-inversion.controller");
const prisma_module_1 = require("../prisma/prisma.module");
const permisos_module_1 = require("../permisos/permisos.module");
const notificaciones_module_1 = require("../notificaciones/notificaciones.module");
let SolicitudInversionModule = class SolicitudInversionModule {
};
exports.SolicitudInversionModule = SolicitudInversionModule;
exports.SolicitudInversionModule = SolicitudInversionModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, permisos_module_1.PermisosModule, notificaciones_module_1.NotificacionesModule],
        controllers: [solicitud_inversion_controller_1.SolicitudInversionController],
        providers: [solicitud_inversion_service_1.SolicitudInversionService],
    })
], SolicitudInversionModule);
//# sourceMappingURL=solicitud-inversion.module.js.map