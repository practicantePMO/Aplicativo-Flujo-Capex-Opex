import {
  IsString, IsNotEmpty, IsOptional, IsIn, IsInt, IsNumber, Min, Max,
  IsArray, ValidateNested, MaxLength, ArrayMaxSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LIMITE, EsLinkSeguro } from '../../common/validaciones';

export class ActaCierreMetaDto {
  @IsInt() solicitud_meta_id: number;
  @IsString() @IsOptional()
  @MaxLength(LIMITE.TEXTO_LARGO, { message: `El resultado de la meta no puede superar ${LIMITE.TEXTO_LARGO} caracteres.` })
  resultado_cierre?: string;
}

export class ActaCierreValorDto {
  @IsIn(['ACTIVO', 'GASTO']) categoria: 'ACTIVO' | 'GASTO';
  @IsNumber() @IsOptional() @Min(0) real_usd?: number;
  @IsNumber() @IsOptional() @Min(0) real_cop?: number;
}

export class ActaCierreFlujoCajaDto {
  @IsIn(['CAPEX', 'GCAPEX', 'OPEX']) tipo: 'CAPEX' | 'GCAPEX' | 'OPEX';
  @IsIn(['USD', 'COP']) moneda: 'USD' | 'COP';
  @IsInt() @Min(2000) @Max(2100) anio: number;
  @IsInt() @Min(1) @Max(12) mes: number;
  @IsNumber() @IsOptional() @Min(0) monto_real?: number;
}

export class ActaCierreEntregableDto {
  @IsString() @IsNotEmpty({ message: 'El Equipo/Sistema es obligatorio en cada entregable.' })
  @MaxLength(LIMITE.TEXTO_MEDIO, { message: `El Equipo/Sistema no puede superar ${LIMITE.TEXTO_MEDIO} caracteres.` })
  equipo_sistema: string;
  @IsString() @IsOptional() @MaxLength(LIMITE.TEXTO_CORTO) codigo_activo_produccion?: string;
  @IsString() @IsOptional() @MaxLength(LIMITE.TEXTO_CORTO) codigo_activo_montaje?: string;
  @IsString() @IsOptional() @MaxLength(LIMITE.TEXTO_CORTO) unidad_vida_util?: string;
  @IsInt() @IsOptional() @Min(0) vida_util?: number;
  @IsString() @IsOptional()
  @MaxLength(LIMITE.TEXTO_LARGO, { message: `Las observaciones del entregable no pueden superar ${LIMITE.TEXTO_LARGO} caracteres.` })
  observaciones?: string;
  @IsString() @IsOptional() @MaxLength(LIMITE.URL) @EsLinkSeguro()
  anexo_url?: string;
}
export class ActaCierreOiValorRealDto {
  @IsInt() orden_interna_id: number;
  @IsNumber() @IsOptional() @Min(0) valor_real?: number;
  @IsIn(['USD', 'COP']) @IsOptional() valor_real_moneda?: 'USD' | 'COP';
}

export class CrearActaCierreDto {
  @IsString() @IsNotEmpty() @MaxLength(20) proyecto_id: string;

  @IsIn(['CANCELACION', 'CULMINACION'], { message: 'El tipo de cierre debe ser CANCELACION o CULMINACION.' })
  tipo_cierre: 'CANCELACION' | 'CULMINACION';

  @IsInt({ message: 'Debes elegir quién de Control Gestión revisará este cierre.' })
  control_gestion_asignado_id: number;

  @IsString()
  @IsOptional()
  @MaxLength(LIMITE.URL)
  @EsLinkSeguro()
  presentacion_p5_link?: string;

  @IsString() @IsOptional()
  @MaxLength(LIMITE.TEXTO_LARGO, { message: `El entregable real no puede superar ${LIMITE.TEXTO_LARGO} caracteres.` })
  entregable_real?: string;

  @IsString() @IsOptional()
  @MaxLength(LIMITE.TEXTO_LARGO, { message: `La explicación de la ejecución no puede superar ${LIMITE.TEXTO_LARGO} caracteres.` })
  explicacion_ejecucion?: string;

  @IsString() @IsOptional()
  @MaxLength(LIMITE.TEXTO_LARGO, { message: `Los otros entregables no pueden superar ${LIMITE.TEXTO_LARGO} caracteres.` })
  otros_entregables?: string;

  @IsArray() @IsOptional() @ArrayMaxSize(LIMITE.LISTA) @ValidateNested({ each: true }) @Type(() => ActaCierreMetaDto)
  metas?: ActaCierreMetaDto[];

  @IsArray() @IsOptional() @ArrayMaxSize(10) @ValidateNested({ each: true }) @Type(() => ActaCierreValorDto)
  valores?: ActaCierreValorDto[];

  @IsArray() @IsOptional() @ArrayMaxSize(1000) @ValidateNested({ each: true }) @Type(() => ActaCierreFlujoCajaDto)
  flujo_caja?: ActaCierreFlujoCajaDto[];

  @IsArray() @IsOptional() @ArrayMaxSize(LIMITE.LISTA) @ValidateNested({ each: true }) @Type(() => ActaCierreEntregableDto)
  entregables?: ActaCierreEntregableDto[];

  @IsArray() @IsOptional() @ArrayMaxSize(LIMITE.LISTA) @ValidateNested({ each: true }) @Type(() => ActaCierreOiValorRealDto)
  oi_valores_reales?: ActaCierreOiValorRealDto[];
}