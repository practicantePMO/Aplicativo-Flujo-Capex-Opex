"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const throttler_1 = require("@nestjs/throttler");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const usuarios_module_1 = require("./usuarios/usuarios.module");
const auth_module_1 = require("./auth/auth.module");
const proyectos_module_1 = require("./proyectos/proyectos.module");
const catalogos_module_1 = require("./catalogos/catalogos.module");
const solicitud_inversion_module_1 = require("./solicitud-inversion/solicitud-inversion.module");
const permisos_module_1 = require("./permisos/permisos.module");
const notificaciones_module_1 = require("./notificaciones/notificaciones.module");
const companias_module_1 = require("./companias/companias.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60000,
                    limit: 30,
                },
            ]),
            prisma_module_1.PrismaModule,
            usuarios_module_1.UsuariosModule,
            auth_module_1.AuthModule,
            proyectos_module_1.ProyectosModule,
            catalogos_module_1.CatalogosModule,
            solicitud_inversion_module_1.SolicitudInversionModule,
            permisos_module_1.PermisosModule,
            notificaciones_module_1.NotificacionesModule,
            companias_module_1.CompaniasModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map