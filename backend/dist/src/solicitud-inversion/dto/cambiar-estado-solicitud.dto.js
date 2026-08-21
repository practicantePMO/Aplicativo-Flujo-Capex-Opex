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
exports.AprobarSolicitudDto = exports.RechazarSolicitudDto = void 0;
const class_validator_1 = require("class-validator");
class RechazarSolicitudDto {
    razon_rechazo;
}
exports.RechazarSolicitudDto = RechazarSolicitudDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'La razón del rechazo debe ser un texto.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La razón del rechazo es OBLIGATORIA al rechazar una solicitud.' }),
    __metadata("design:type", String)
], RechazarSolicitudDto.prototype, "razon_rechazo", void 0);
class AprobarSolicitudDto {
    comentarios;
    enviar_a_presidencia;
}
exports.AprobarSolicitudDto = AprobarSolicitudDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AprobarSolicitudDto.prototype, "comentarios", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)({ message: 'enviar_a_presidencia debe ser true o false.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], AprobarSolicitudDto.prototype, "enviar_a_presidencia", void 0);
//# sourceMappingURL=cambiar-estado-solicitud.dto.js.map