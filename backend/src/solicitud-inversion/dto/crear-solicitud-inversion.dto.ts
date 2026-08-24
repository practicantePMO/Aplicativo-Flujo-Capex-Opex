import {
  IsString, IsNotEmpty, IsInt, IsOptional, IsBoolean, IsNumber,
  IsArray, ValidateNested, ValidateIf, Min, Max, ArrayMinSize, IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

export class EvaluacionFinancieraDto {
  @IsNumber({}, { message: 'La TIR debe ser un número.' }) @IsNotEmpty({ message: 'La TIR es obligatoria.' }) tir: number;
  @IsNumber({}, { message: 'El VPN debe ser un número.' }) @IsNotEmpty({ message: 'El VPN es obligatorio.' }) vpn: number;
  @IsNumber({}, { message: 'El Payback debe ser un número.' }) @IsNotEmpty({ message: 'El Payback es obligatorio.' }) payback: number;
}

export class SolicitudMetaDto {
  @IsString() @IsNotEmpty() compromiso: string;
  @IsString() @IsNotEmpty() fecha_inicio: string;
  @IsString() @IsNotEmpty() indicador: string;
}

export class SolicitudValorDto {
  @IsString() @IsNotEmpty() categoria: string;
  @IsNumber() @Min(0) usd: number;
  @IsNumber() @Min(0) cop: number;
}

export class SolicitudFlujoCajaDto {
  @IsString() @IsNotEmpty() tipo: string;
  @IsIn(['USD', 'COP'], { message: 'La moneda debe ser USD o COP.' })
  moneda: 'USD' | 'COP';
  @IsInt() anio: number;
  @IsInt() @Min(1) @Max(12) mes: number;
  @IsNumber({}, { message: 'El monto debe ser un número.' })
  @Min(0.01, { message: 'El monto no puede quedar en blanco o en 0 para un mes seleccionado.' })
  monto: number;
}

export class CrearSolicitudInversionDto {
  @IsString() @IsNotEmpty() proyecto_id: string;

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
  entregable_planeado: string;

  @IsNumber({}, { message: 'La TRM debe ser un número.' })
  @IsNotEmpty({ message: 'La TRM es obligatoria.' })
  trm: number;
  
  @IsBoolean() @IsNotEmpty() tiene_evaluacion_financiera: boolean;

  @ValidateIf((o) => o.tiene_evaluacion_financiera === false)
  @IsString() @IsNotEmpty({ message: 'Justificación requerida si no hay evaluación financiera.' })
  justificacion_sin_evaluacion?: string;

  @ValidateIf((o) => o.tiene_evaluacion_financiera === true)
  @ValidateNested()
  @Type(() => EvaluacionFinancieraDto)
  @IsNotEmpty({ message: 'La evaluación financiera (TIR, VPN, Payback) es obligatoria si el proyecto la tiene.' })
  evaluacion_financiera?: EvaluacionFinancieraDto;

  @IsArray({ message: 'Las metas deben ser una lista.' })
  @ArrayMinSize(1, { message: 'Debes registrar al menos una meta.' })
  @ValidateNested({ each: true }) @Type(() => SolicitudMetaDto)
  metas: SolicitudMetaDto[];

  // 🧮 Ya NO se recibe manual: "Valor Total del Proyecto" (ACTIVO/GASTO en
  // USD/COP) se calcula en el backend sumando flujos_caja según su tipo y
  // moneda. Ver SolicitudInversionHelpersService.calcularValoresDesdeFlujo().

  @IsArray({ message: 'El flujo de caja debe ser una lista.' })
  @ArrayMinSize(1, { message: 'Debes registrar al menos una fila de flujo de caja.' })
  @ValidateNested({ each: true }) @Type(() => SolicitudFlujoCajaDto)
  flujos_caja: SolicitudFlujoCajaDto[];

  @IsArray({ message: 'Las partes interesadas deben ser una lista.' })
  @ArrayMinSize(1, { message: 'Debes asignar al menos una parte interesada.' })
  @IsInt({ each: true })
  partes_interesadas_ids: number[];

  @IsString() @IsNotEmpty({ message: 'El link del acta de aprobación es obligatorio.' })
  link_acta_aprobacion: string;

  @IsString() @IsNotEmpty({ message: 'El link del plan de proyecto es obligatorio.' })
  link_plan_proyecto: string;

  @IsString() @IsNotEmpty({ message: 'El link de la presentación es obligatorio.' })
  link_presentacion_puertas_3: string;
}