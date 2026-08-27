import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsArray, ValidateNested, IsIn, IsInt, Min, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';

export class AnexoControlCambioDto {
  @IsString()
  @IsNotEmpty()
  tipo: string; // DOCUMENTO | IMAGEN | COTIZACION | CORREO | GRABACION | TICKET | ORDEN_INTERNA | PLANO | OTRO

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsOptional()
  descripcion?: string;
}

export class CrearControlCambioDto {
  @IsString()
  @IsNotEmpty()
  proyecto_id: string;

  @IsBoolean()
  requiere_orden_interna: boolean;

  @IsString()
  @IsOptional()
  descripcion_cambio?: string;

  @IsString()
  @IsOptional()
  antecedentes?: string;

  @IsString()
  @IsOptional()
  justificacion?: string;

  @IsString()
  @IsOptional()
  impacto_alcance?: string;

  @IsString()
  @IsOptional()
  impacto_tiempo?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AnexoControlCambioDto)
  anexos?: AnexoControlCambioDto[];

  // 🕒 GENERAL (default) o APLAZAMIENTO. Si es APLAZAMIENTO, exige el año nuevo.
  @IsIn(['GENERAL', 'APLAZAMIENTO'], { message: 'El tipo de Control de Cambios debe ser GENERAL o APLAZAMIENTO.' })
  @IsOptional()
  tipo_control_cambio?: 'GENERAL' | 'APLAZAMIENTO';

  @ValidateIf((o) => o.tipo_control_cambio === 'APLAZAMIENTO')
  @IsInt({ message: 'Debes indicar el año nuevo propuesto para el proyecto.' })
  @Min(2000, { message: 'El año propuesto no es válido.' })
  anio_nuevo_propuesto?: number;
}