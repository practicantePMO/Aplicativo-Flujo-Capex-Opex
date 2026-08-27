import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsArray, ValidateNested } from 'class-validator';
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
}
