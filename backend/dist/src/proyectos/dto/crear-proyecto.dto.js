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
exports.CrearProyectoDto = void 0;
const class_validator_1 = require("class-validator");
class CrearProyectoDto {
    nombre;
    compania_id;
    fecha_proyecto;
}
exports.CrearProyectoDto = CrearProyectoDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'El nombre del proyecto debe ser un texto.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre del proyecto es obligatorio.' }),
    __metadata("design:type", String)
], CrearProyectoDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: 'El ID de la compañía debe ser un número entero.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Debe especificar la compañía a la que pertenece el proyecto.' }),
    __metadata("design:type", Number)
], CrearProyectoDto.prototype, "compania_id", void 0);
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: 'La fecha del proyecto debe tener un formato de fecha válido (YYYY-MM-DD).' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La fecha del proyecto es obligatoria.' }),
    __metadata("design:type", String)
], CrearProyectoDto.prototype, "fecha_proyecto", void 0);
//# sourceMappingURL=crear-proyecto.dto.js.map