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
exports.CatalogosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CatalogosService = class CatalogosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async obtenerJerarquiaCompleta() {
        return this.prisma.grupos.findMany({
            select: {
                id: true,
                nombre: true,
                programas: {
                    select: {
                        id: true,
                        nombre: true,
                        subprogramas: {
                            select: {
                                id: true,
                                nombre: true,
                                requiere_evaluacion_obligatoria: true,
                            },
                        },
                    },
                },
            },
            orderBy: { id: 'asc' },
        });
    }
    async obtenerGrupos() {
        return this.prisma.grupos.findMany({
            select: { id: true, nombre: true },
            orderBy: { id: 'asc' },
        });
    }
    async obtenerProgramasPorGrupo(grupoId) {
        return this.prisma.programas.findMany({
            where: { id_grupo: grupoId },
            select: { id: true, nombre: true },
            orderBy: { id: 'asc' },
        });
    }
    async obtenerSubprogramasPorPrograma(programaId) {
        return this.prisma.subprogramas.findMany({
            where: { programa_id: programaId },
            select: {
                id: true,
                nombre: true,
                requiere_evaluacion_obligatoria: true,
            },
            orderBy: { id: 'asc' },
        });
    }
};
exports.CatalogosService = CatalogosService;
exports.CatalogosService = CatalogosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CatalogosService);
//# sourceMappingURL=catalogos.service.js.map