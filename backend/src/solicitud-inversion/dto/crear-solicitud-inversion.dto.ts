import {
  IsString, IsNotEmpty, IsInt, IsOptional, IsBoolean, IsNumber,
  IsArray, ValidateNested, ValidateIf, Min, Max, ArrayMinSize, ArrayMaxSize, IsIn, MaxLength, IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LIMITE, EsLinkSeguro } from '../../common/validaciones';

export class EvaluacionFinancieraDto {
  @IsNumber({}, { message: 'La TIR debe ser un número.' }) @IsNotEmpty({ message: 'La TIR es obligatoria.' }) tir: number;
  @IsNumber({}, { message: 'El VPN debe ser un número.' }) @IsNotEmpty({ message: 'El VPN es obligatorio.' }) vpn: number;
  @IsNumber({}, { message: 'El Payback debe ser un número.' }) @IsNotEmpty({ message: 'El Payback es obligatorio.' }) payback: number;
}

export class SolicitudMetaDto {
  @IsString() @IsNotEmpty() @MaxLength(LIMITE.TEXTO_MEDIO, { message: `El compromiso no puede superar ${LIMITE.TEXTO_MEDIO} caracteres.` })
  compromiso: string;

  @IsDateString({}, { message: 'La fecha de inicio de cada meta debe ser una fecha válida.' })
  fecha_inicio: string;

  @IsString() @IsNotEmpty() @MaxLength(LIMITE.TEXTO_MEDIO, { message: `El indicador no puede superar ${LIMITE.TEXTO_MEDIO} caracteres.` })
  indicador: string;
}

export class SolicitudValorDto {
  @IsString() @IsNotEmpty() categoria: string;
  @IsNumber() @Min(0) usd: number;
  @IsNumber() @Min(0) cop: number;
}

export class SolicitudFlujoCajaDto {
  @IsIn(['CAPEX', 'GCAPEX', 'OPEX'], { message: 'El tipo de flujo debe ser CAPEX, GCAPEX u OPEX.' })
  tipo: string;
  @IsIn(['USD', 'COP'], { message: 'La moneda debe ser USD o COP.' })
  moneda: 'USD' | 'COP';
  @IsInt() @Min(2000) @Max(2100) anio: number;
  @IsInt() @Min(1) @Max(12) mes: number;
  @IsNumber({}, { message: 'El monto debe ser un número.' })
  @Min(0.01, { message: 'El monto no puede quedar en blanco o en 0 para un mes seleccionado.' })
  monto: number;
}

export class CrearSolicitudInversionDto {
  @IsString() @IsNotEmpty() @MaxLength(20) proyecto_id: string;

  // El PM puede marcar Tradicional, Nueva, o ambas a la vez.
  @IsBoolean() @IsOptional()
  incluye_tradicional?: boolean;

  @IsBoolean() @IsOptional()
  incluye_nueva?: boolean;

  @ValidateIf((o) => o.incluye_tradicional === true)
  @IsInt({ message: 'Debes seleccionar un subprograma.' })
  @IsNotEmpty({ message: 'El subprograma es obligatorio para la clasificación Tradicional.' })
  subprograma_id?: number;

  @ValidateIf((o) => o.incluye_nueva === true)
  @IsInt({ message: 'Debes seleccionar una categoría.' })
  @IsNotEmpty({ message: 'La categoría es obligatoria para la clasificación Nueva.' })
  categoria_id?: number;

  @IsString() @IsNotEmpty({ message: 'El entregable planeado es obligatorio.' })
  @MaxLength(LIMITE.TEXTO_LARGO, { message: `El entregable planeado no puede superar ${LIMITE.TEXTO_LARGO} caracteres.` })
  entregable_planeado: string;

  @IsNumber({}, { message: 'La TRM debe ser un número.' })
  @IsNotEmpty({ message: 'La TRM es obligatoria.' })
  @Min(0, { message: 'La TRM no puede ser negativa.' })
  trm: number;
  
  @IsBoolean() @IsNotEmpty() tiene_evaluacion_financiera: boolean;

  @ValidateIf((o) => o.tiene_evaluacion_financiera === false)
  @IsString() @IsNotEmpty({ message: 'Justificación requerida si no hay evaluación financiera.' })
  @MaxLength(LIMITE.TEXTO_LARGO, { message: `La justificación no puede superar ${LIMITE.TEXTO_LARGO} caracteres.` })
  justificacion_sin_evaluacion?: string;

  @ValidateIf((o) => o.tiene_evaluacion_financiera === true)
  @ValidateNested()
  @Type(() => EvaluacionFinancieraDto)
  @IsNotEmpty({ message: 'La evaluación financiera (TIR, VPN, Payback) es obligatoria si el proyecto la tiene.' })
  evaluacion_financiera?: EvaluacionFinancieraDto;

  @IsArray({ message: 'Las metas deben ser una lista.' })
  @ArrayMinSize(1, { message: 'Debes registrar al menos una meta.' })
  @ArrayMaxSize(LIMITE.LISTA)
  @ValidateNested({ each: true }) @Type(() => SolicitudMetaDto)
  metas: SolicitudMetaDto[];

  @IsArray({ message: 'El flujo de caja debe ser una lista.' })
  @ArrayMinSize(1, { message: 'Debes registrar al menos una fila de flujo de caja.' })
  @ArrayMaxSize(1000)
  @ValidateNested({ each: true }) @Type(() => SolicitudFlujoCajaDto)
  flujos_caja: SolicitudFlujoCajaDto[];

  @IsArray({ message: 'Las partes interesadas deben ser una lista.' })
  @ArrayMinSize(1, { message: 'Debes asignar al menos una parte interesada.' })
  @ArrayMaxSize(LIMITE.LISTA)
  @IsInt({ each: true })
  partes_interesadas_ids: number[];

  @IsString() @IsNotEmpty({ message: 'El link del acta de aprobación es obligatorio.' })
  @MaxLength(LIMITE.URL) @EsLinkSeguro()
  link_acta_aprobacion: string;

  @IsString() @IsNotEmpty({ message: 'El link del plan de proyecto es obligatorio.' })
  @MaxLength(LIMITE.URL) @EsLinkSeguro()
  link_plan_proyecto: string;

  @IsString() @IsNotEmpty({ message: 'El link de la presentación es obligatorio.' })
  @MaxLength(LIMITE.URL) @EsLinkSeguro()
  link_presentacion_puertas_3: string;
}