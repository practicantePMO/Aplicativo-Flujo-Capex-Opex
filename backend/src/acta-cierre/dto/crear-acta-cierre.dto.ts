import {
  IsString, IsNotEmpty, IsOptional, IsIn, IsInt, IsNumber, Min, Max,
  IsArray, ValidateNested, Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ActaCierreMetaDto {
  @IsInt() solicitud_meta_id: number;
  @IsString() @IsOptional() resultado_cierre?: string;
}

export class ActaCierreValorDto {
  @IsIn(['ACTIVO', 'GASTO']) categoria: 'ACTIVO' | 'GASTO';
  @IsNumber() @IsOptional() @Min(0) real_usd?: number;
  @IsNumber() @IsOptional() @Min(0) real_cop?: number;
}

export class ActaCierreFlujoCajaDto {
  @IsIn(['CAPEX', 'GCAPEX', 'OPEX']) tipo: 'CAPEX' | 'GCAPEX' | 'OPEX';
  @IsIn(['USD', 'COP']) moneda: 'USD' | 'COP';
  @IsInt() anio: number;
  @IsInt() @Min(1) @Max(12) mes: number;
  @IsNumber() @IsOptional() @Min(0) monto_real?: number;
}

export class ActaCierreEntregableDto {
  @IsString() @IsNotEmpty({ message: 'El Equipo/Sistema es obligatorio en cada entregable.' })
  equipo_sistema: string;
  @IsString() @IsOptional() codigo_activo_produccion?: string;
  @IsString() @IsOptional() codigo_activo_montaje?: string;
  @IsString() @IsOptional() unidad_vida_util?: string;
  @IsInt() @IsOptional() vida_util?: number;
  @IsString() @IsOptional() observaciones?: string;
  @IsString() @IsOptional()
  @Matches(/^(?!\s*(javascript|data|vbscript|file):)/i, { message: 'Ese link no es válido.' })
  anexo_url?: string;
}
export class ActaCierreOiValorRealDto {
  @IsInt() orden_interna_id: number;
  @IsNumber() @IsOptional() @Min(0) valor_real?: number;
  @IsIn(['USD', 'COP']) @IsOptional() valor_real_moneda?: 'USD' | 'COP';
}

export class CrearActaCierreDto {
  @IsString() @IsNotEmpty() proyecto_id: string;

  @IsIn(['CANCELACION', 'CULMINACION'], { message: 'El tipo de cierre debe ser CANCELACION o CULMINACION.' })
  tipo_cierre: 'CANCELACION' | 'CULMINACION';

  @IsInt({ message: 'Debes elegir quién de Control Gestión revisará este cierre.' })
  control_gestion_asignado_id: number;

@IsString()
  @IsOptional()
  @Matches(/^(?!\s*(javascript|data|vbscript|file):)/i, { message: 'Ese link no es válido.' })
  presentacion_p5_link?: string;

  @IsString() @IsOptional() entregable_real?: string;
  @IsString() @IsOptional() explicacion_ejecucion?: string;
  @IsString() @IsOptional() otros_entregables?: string;

  @IsArray() @IsOptional() @ValidateNested({ each: true }) @Type(() => ActaCierreMetaDto)
  metas?: ActaCierreMetaDto[];

  @IsArray() @IsOptional() @ValidateNested({ each: true }) @Type(() => ActaCierreValorDto)
  valores?: ActaCierreValorDto[];

  @IsArray() @IsOptional() @ValidateNested({ each: true }) @Type(() => ActaCierreFlujoCajaDto)
  flujo_caja?: ActaCierreFlujoCajaDto[];

  @IsArray() @IsOptional() @ValidateNested({ each: true }) @Type(() => ActaCierreEntregableDto)
  entregables?: ActaCierreEntregableDto[];

  @IsArray() @IsOptional() @ValidateNested({ each: true }) @Type(() => ActaCierreOiValorRealDto)
  oi_valores_reales?: ActaCierreOiValorRealDto[];
}