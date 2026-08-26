import {
  IsString, IsNotEmpty, IsOptional, IsBoolean, IsIn, IsNumber, Min, Max,
  ValidateIf, IsArray, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class OiValorDto {
  @IsIn(['ACTIVO', 'GASTO']) categoria: 'ACTIVO' | 'GASTO';
  @IsNumber() @Min(0) usd: number;
  @IsNumber() @Min(0) cop: number;
}

export class CrearOrdenInternaDto {
  @IsString() @IsNotEmpty() proyecto_id: string;

  // --- Sección 1 ---
  @IsString() @IsNotEmpty({ message: 'El número de Orden Interna es obligatorio.' })
  numero_oi: string;

  @IsString() @IsNotEmpty({ message: 'El nombre descriptivo es obligatorio.' })
  nombre_descriptivo: string;

  @IsIn(['ACTIVO', 'GASTO'], { message: 'El tipo de orden debe ser ACTIVO o GASTO.' })
  tipo_orden: 'ACTIVO' | 'GASTO';

  @IsString() @IsOptional() centro_costos?: string;
  @IsString() @IsOptional() oficina_ventas?: string;
  @IsString() @IsOptional() linea_marca?: string;
  @IsString() @IsOptional() cliente?: string;
  @IsString() @IsOptional() ramo?: string;
  @IsNumber() @IsOptional() porcentaje_1?: number;

  // 🎯 Decide si se muestra/exige la Sección 3 (por ahora es solo un booleano;
  // el proceso "Control de Cambios" en sí se construirá más adelante).
  @IsBoolean() @IsOptional()
  es_control_cambios?: boolean;

  // --- Sección 2 (solo si tipo_orden = ACTIVO se exigen todos; si es GASTO solo "presupuesto") ---
  @ValidateIf((o) => o.tipo_orden === 'ACTIVO')
  @IsString() @IsNotEmpty({ message: 'El Activo Fijo en curso es obligatorio para órdenes de tipo Activo.' })
  activo_fijo_curso?: string;

  @ValidateIf((o) => o.tipo_orden === 'ACTIVO')
  @IsString() @IsNotEmpty({ message: 'El Tipo de activo es obligatorio para órdenes de tipo Activo.' })
  tipo_activo?: string;

  @ValidateIf((o) => o.tipo_orden === 'ACTIVO')
  @IsNumber() @IsOptional()
  porcentaje_2?: number;

  @IsNumber({}, { message: 'El presupuesto es obligatorio.' })
  @Min(0.01, { message: 'El presupuesto debe ser mayor a 0.' })
  presupuesto: number;

  @IsIn(['USD', 'COP'], { message: 'La moneda del presupuesto debe ser USD o COP.' })
  @IsOptional()
  presupuesto_moneda?: 'USD' | 'COP';

  @ValidateIf((o) => o.tipo_orden === 'ACTIVO')
  @IsString() @IsNotEmpty({ message: 'El Activo Real Productivo es obligatorio para órdenes de tipo Activo.' })
  activo_real_productivo?: string;

  // --- Sección 3 (solo si es_control_cambios = true) ---
  @ValidateIf((o) => o.es_control_cambios === true)
  @IsArray({ message: 'Debes registrar el valor total del proyecto.' })
  @ValidateNested({ each: true })
  @Type(() => OiValorDto)
  valores?: OiValorDto[];
}