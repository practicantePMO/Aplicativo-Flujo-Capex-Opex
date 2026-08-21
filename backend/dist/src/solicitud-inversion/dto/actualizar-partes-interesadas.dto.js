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
exports.ActualizarPartesInteresadasDto = void 0;
const class_validator_1 = require("class-validator");
class ActualizarPartesInteresadasDto {
    partes_interesadas_ids;
}
exports.ActualizarPartesInteresadasDto = ActualizarPartesInteresadasDto;
__decorate([
    (0, class_validator_1.IsArray)({ message: 'Las partes interesadas deben ser una lista de IDs de usuarios.' }),
    (0, class_validator_1.IsInt)({ each: true, message: 'Cada ID debe ser un número entero.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La lista de partes interesadas no puede estar vacía.' }),
    __metadata("design:type", Array)
], ActualizarPartesInteresadasDto.prototype, "partes_interesadas_ids", void 0);
//# sourceMappingURL=actualizar-partes-interesadas.dto.js.map