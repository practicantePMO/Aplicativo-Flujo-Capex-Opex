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
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UsuariosService = class UsuariosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByEmail(email) {
        return this.prisma.usuarios.findUnique({
            where: { email },
            select: {
                id: true,
                nombre: true,
                email: true,
                proveedor_auth: true,
                area: true,
                activo: true,
                fecha_creacion: true,
                usuario_roles_compania: {
                    select: {
                        roles: { select: { id: true, codigo: true, nombre: true } },
                        companias: { select: { id: true, nombre: true } },
                    },
                },
            },
        });
    }
    async findOrCreateSSOUser(data) {
        let usuario = await this.findByEmail(data.email);
        if (!usuario) {
            const nuevo = await this.prisma.usuarios.create({
                data: {
                    email: data.email,
                    nombre: data.nombre,
                    proveedor_auth: data.proveedor_auth || 'GOOGLE',
                    activo: true,
                },
            });
            usuario = await this.findByEmail(nuevo.email);
        }
        return usuario;
    }
    async findPendientes() {
        return this.prisma.usuarios.findMany({
            where: {
                activo: true,
                eliminado_el: null,
                usuario_roles_compania: {
                    none: {},
                },
            },
            select: {
                id: true,
                nombre: true,
                email: true,
                area: true,
                fecha_creacion: true,
            },
            orderBy: { fecha_creacion: 'desc' },
        });
    }
    async asignarRolCompania(dto) {
        const usuario = await this.prisma.usuarios.findUnique({ where: { id: dto.usuario_id } });
        if (!usuario) {
            throw new common_1.NotFoundException('El usuario especificado no existe.');
        }
        try {
            return await this.prisma.usuario_roles_compania.create({
                data: {
                    usuario_id: dto.usuario_id,
                    rol_id: dto.rol_id,
                    compania_id: dto.compania_id,
                },
                select: {
                    id: true,
                    roles: { select: { codigo: true, nombre: true } },
                    companias: { select: { nombre: true } },
                },
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.ConflictException('Este usuario ya tiene ese rol asignado en esa compañía.');
            }
            throw error;
        }
    }
    async findActivos() {
        return this.prisma.usuarios.findMany({
            where: { activo: true, eliminado_el: null },
            select: { id: true, nombre: true, email: true, area: true },
            orderBy: { nombre: 'asc' },
        });
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map