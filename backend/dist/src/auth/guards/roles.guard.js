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
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const roles_decorator_1 = require("../decorators/roles.decorator");
const prisma_service_1 = require("../../prisma/prisma.service");
let RolesGuard = class RolesGuard {
    reflector;
    prisma;
    constructor(reflector, prisma) {
        this.reflector = reflector;
        this.prisma = prisma;
    }
    async canActivate(context) {
        const rolesRequeridos = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!rolesRequeridos) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        if (!user || !user.userId) {
            throw new common_1.ForbiddenException('No tienes un token de sesión válido.');
        }
        const usuarioBD = await this.prisma.usuarios.findUnique({
            where: { id: user.userId },
            select: {
                activo: true,
                usuario_roles_compania: {
                    select: {
                        roles: { select: { codigo: true } },
                    },
                },
            },
        });
        if (!usuarioBD || !usuarioBD.activo) {
            throw new common_1.ForbiddenException('Tu cuenta ha sido desactivada o no existe.');
        }
        const rolesActualesBD = usuarioBD.usuario_roles_compania.map((urc) => urc.roles?.codigo);
        const tienePermiso = rolesRequeridos.some((rol) => rolesActualesBD.includes(rol));
        if (!tienePermiso) {
            throw new common_1.ForbiddenException(`Acceso denegado: Se requiere uno de los siguientes roles: [${rolesRequeridos.join(', ')}]`);
        }
        return true;
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        prisma_service_1.PrismaService])
], RolesGuard);
//# sourceMappingURL=roles.guard.js.map