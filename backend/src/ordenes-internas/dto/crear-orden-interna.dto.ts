import {
  IsString, IsNotEmpty, IsOptional, IsBoolean, IsIn, IsNumber, IsInt, Min, Max,
  ValidateIf, IsArray, ValidateNested, MaxLength, ArrayMaxSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LIMITE } from '../../common/validaciones';

export class OiValorDto {
  @IsIn(['ACTIVO', 'GASTO']) categoria: 'ACTIVO' | 'GASTO';
  @IsNumber() @Min(0) usd: number;
  @IsNumber() @Min(0) cop: number;
}

export class CrearOrdenInternaDto {
  @IsString() @IsNotEmpty() @MaxLength(20) proyecto_id: string;

  @IsString() @IsNotEmpty({ message: 'El nombre descriptivo es obligatorio.' })
  @MaxLength(LIMITE.TEXTO_CORTO, { message: `El nombre descriptivo no puede superar ${LIMITE.TEXTO_CORTO} caracteres.` })
  nombre_descriptivo: string;

  @IsIn(['ACTIVO', 'GASTO'], { message: 'El tipo de orden debe ser ACTIVO o GASTO.' })
  tipo_orden: 'ACTIVO' | 'GASTO';

  // Los límites de estos campos son los mismos de sus columnas en la base de datos.
  @IsString() @IsOptional() @MaxLength(100, { message: 'El centro de costos no puede superar 100 caracteres.' }) centro_costos?: string;
  @IsString() @IsOptional() @MaxLength(100, { message: 'La oficina de ventas no puede superar 100 caracteres.' }) oficina_ventas?: string;
  @IsString() @IsOptional() @MaxLength(100, { message: 'La línea/marca no puede superar 100 caracteres.' }) linea_marca?: string;
  @IsString() @IsOptional() @MaxLength(150, { message: 'El cliente no puede superar 150 caracteres.' }) cliente?: string;
  @IsString() @IsOptional() @MaxLength(100, { message: 'El ramo no puede superar 100 caracteres.' }) ramo?: string;
  @IsNumber() @IsOptional() @Min(0) @Max(999.99) porcentaje_1?: number;

  // Decide si se muestra/exige la Sección 3.
  @IsBoolean() @IsOptional()
  es_control_cambios?: boolean;

  // Obligatorio si es_control_cambios = true — a qué Control de Cambios
  // real corresponde esta Orden Interna. Se valida en el servicio que ese
  // Control de Cambios exista, sea del mismo proyecto, y de verdad tenga
  // marcado "Requiere Orden Interna".
  @ValidateIf((o) => o.es_control_cambios === true)
  @IsInt({ message: 'Debes indicar a qué Control de Cambios corresponde esta Orden Interna.' })
  control_cambio_id?: number;

  // --- Sección 2 (solo si tipo_orden = ACTIVO se exigen todos; si es GASTO solo "presupuesto") ---
  @ValidateIf((o) => o.tipo_orden === 'ACTIVO')
  @IsString() @IsNotEmpty({ message: 'El Activo Fijo en curso es obligatorio para órdenes de tipo Activo.' })
  @MaxLength(150, { message: 'El Activo Fijo en curso no puede superar 150 caracteres.' })
  activo_fijo_curso?: string;

  @ValidateIf((o) => o.tipo_orden === 'ACTIVO')
  @IsIn(['EXPANSION', 'REEMPLAZO'], { message: 'El Tipo de activo debe ser Inversión Expansión o Inversión Reemplazo.' })
  tipo_activo?: string;

  @ValidateIf((o) => o.tipo_orden === 'ACTIVO')
  @IsNumber() @IsOptional() @Min(0) @Max(999.99)
  porcentaje_2?: number;

  @IsNumber({}, { message: 'El presupuesto es obligatorio.' })
  @Min(0.01, { message: 'El presupuesto debe ser mayor a 0.' })
  presupuesto: number;

  @IsIn(['USD', 'COP'], { message: 'La moneda del presupuesto debe ser USD o COP.' })
  @IsOptional()
  presupuesto_moneda?: 'USD' | 'COP';

  @ValidateIf((o) => o.tipo_orden === 'ACTIVO')
  @IsIn(['SI', 'NO'], { message: 'El Activo Real Productivo debe ser Sí o No.' })
  activo_real_productivo?: string;

  @IsString() @IsOptional()
  @MaxLength(LIMITE.TEXTO_LARGO, { message: `Las observaciones no pueden superar ${LIMITE.TEXTO_LARGO} caracteres.` })
  observaciones_pm?: string;

  // --- Sección 3 (solo si es_control_cambios = true) ---
  @ValidateIf((o) => o.es_control_cambios === true)
  @IsArray({ message: 'Debes registrar el valor total del proyecto.' })
  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => OiValorDto)
  valores?: OiValorDto[];
}