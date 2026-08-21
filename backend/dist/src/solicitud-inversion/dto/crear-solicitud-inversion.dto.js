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
exports.CrearSolicitudInversionDto = exports.SolicitudFlujoCajaDto = exports.SolicitudValorDto = exports.SolicitudMetaDto = exports.EvaluacionFinancieraDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class EvaluacionFinancieraDto {
    tir;
    vpn;
    payback;
}
exports.EvaluacionFinancieraDto = EvaluacionFinancieraDto;
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'La TIR debe ser un número.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La TIR es obligatoria.' }),
    __metadata("design:type", Number)
], EvaluacionFinancieraDto.prototype, "tir", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'El VPN debe ser un número.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El VPN es obligatorio.' }),
    __metadata("design:type", Number)
], EvaluacionFinancieraDto.prototype, "vpn", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'El Payback debe ser un número.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El Payback es obligatorio.' }),
    __metadata("design:type", Number)
], EvaluacionFinancieraDto.prototype, "payback", void 0);
class SolicitudMetaDto {
    compromiso;
    fecha_inicio;
    indicador;
}
exports.SolicitudMetaDto = SolicitudMetaDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SolicitudMetaDto.prototype, "compromiso", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SolicitudMetaDto.prototype, "fecha_inicio", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SolicitudMetaDto.prototype, "indicador", void 0);
class SolicitudValorDto {
    categoria;
    usd;
    cop;
}
exports.SolicitudValorDto = SolicitudValorDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SolicitudValorDto.prototype, "categoria", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], SolicitudValorDto.prototype, "usd", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], SolicitudValorDto.prototype, "cop", void 0);
class SolicitudFlujoCajaDto {
    tipo;
    anio;
    mes;
    monto;
}
exports.SolicitudFlujoCajaDto = SolicitudFlujoCajaDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SolicitudFlujoCajaDto.prototype, "tipo", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], SolicitudFlujoCajaDto.prototype, "anio", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(12),
    __metadata("design:type", Number)
], SolicitudFlujoCajaDto.prototype, "mes", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SolicitudFlujoCajaDto.prototype, "monto", void 0);
class CrearSolicitudInversionDto {
    proyecto_id;
    tipo_clasificacion;
    subprograma_id;
    categoria_id;
    entregable_planeado;
    trm;
    tiene_evaluacion_financiera;
    justificacion_sin_evaluacion;
    evaluacion_financiera;
    metas;
    valores;
    flujos_caja;
    partes_interesadas_ids;
    link_acta_aprobacion;
    link_plan_proyecto;
    link_presentacion_puertas_3;
}
exports.CrearSolicitudInversionDto = CrearSolicitudInversionDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CrearSolicitudInversionDto.prototype, "proyecto_id", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['TRADICIONAL', 'NUEVA'], { message: 'tipo_clasificacion debe ser TRADICIONAL o NUEVA.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CrearSolicitudInversionDto.prototype, "tipo_clasificacion", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.tipo_clasificacion !== 'NUEVA'),
    (0, class_validator_1.IsInt)({ message: 'Debes seleccionar un subprograma.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El subprograma es obligatorio para solicitudes tradicionales.' }),
    __metadata("design:type", Number)
], CrearSolicitudInversionDto.prototype, "subprograma_id", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.tipo_clasificacion === 'NUEVA'),
    (0, class_validator_1.IsInt)({ message: 'Debes seleccionar una categoría.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La categoría es obligatoria para clasificación Nueva.' }),
    __metadata("design:type", Number)
], CrearSolicitudInversionDto.prototype, "categoria_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El entregable planeado es obligatorio.' }),
    __metadata("design:type", String)
], CrearSolicitudInversionDto.prototype, "entregable_planeado", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'La TRM debe ser un número.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La TRM es obligatoria.' }),
    __metadata("design:type", Number)
], CrearSolicitudInversionDto.prototype, "trm", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], CrearSolicitudInversionDto.prototype, "tiene_evaluacion_financiera", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.tiene_evaluacion_financiera === false),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Justificación requerida si no hay evaluación financiera.' }),
    __metadata("design:type", String)
], CrearSolicitudInversionDto.prototype, "justificacion_sin_evaluacion", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.tiene_evaluacion_financiera === true),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => EvaluacionFinancieraDto),
    (0, class_validator_1.IsNotEmpty)({ message: 'La evaluación financiera (TIR, VPN, Payback) es obligatoria si el proyecto la tiene.' }),
    __metadata("design:type", EvaluacionFinancieraDto)
], CrearSolicitudInversionDto.prototype, "evaluacion_financiera", void 0);
__decorate([
    (0, class_validator_1.IsArray)({ message: 'Las metas deben ser una lista.' }),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'Debes registrar al menos una meta.' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SolicitudMetaDto),
    __metadata("design:type", Array)
], CrearSolicitudInversionDto.prototype, "metas", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SolicitudValorDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CrearSolicitudInversionDto.prototype, "valores", void 0);
__decorate([
    (0, class_validator_1.IsArray)({ message: 'El flujo de caja debe ser una lista.' }),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'Debes registrar al menos una fila de flujo de caja.' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SolicitudFlujoCajaDto),
    __metadata("design:type", Array)
], CrearSolicitudInversionDto.prototype, "flujos_caja", void 0);
__decorate([
    (0, class_validator_1.IsArray)({ message: 'Las partes interesadas deben ser una lista.' }),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'Debes asignar al menos una parte interesada.' }),
    (0, class_validator_1.IsInt)({ each: true }),
    __metadata("design:type", Array)
], CrearSolicitudInversionDto.prototype, "partes_interesadas_ids", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El link del acta de aprobación es obligatorio.' }),
    __metadata("design:type", String)
], CrearSolicitudInversionDto.prototype, "link_acta_aprobacion", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El link del plan de proyecto es obligatorio.' }),
    __metadata("design:type", String)
], CrearSolicitudInversionDto.prototype, "link_plan_proyecto", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El link de la presentación es obligatorio.' }),
    __metadata("design:type", String)
], CrearSolicitudInversionDto.prototype, "link_presentacion_puertas_3", void 0);
//# sourceMappingURL=crear-solicitud-inversion.dto.js.map