import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsArray, ValidateNested, IsIn, IsInt, Min, Max, ValidateIf, MaxLength, ArrayMaxSize } from 'class-validator';
import { Type } from 'class-transformer';
import { LIMITE, EsLinkSeguro } from '../../common/validaciones';

export class AnexoControlCambioDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  tipo: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(LIMITE.URL)
  @EsLinkSeguro()
  url: string;

  @IsString()
  @IsOptional()
  @MaxLength(LIMITE.TEXTO_CORTO, { message: `La descripción del anexo no puede superar ${LIMITE.TEXTO_CORTO} caracteres.` })
  descripcion?: string;
}

export class CrearControlCambioDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  proyecto_id: string;

  @IsBoolean()
  requiere_orden_interna: boolean;

  @IsString()
  @IsOptional()
  @MaxLength(LIMITE.TEXTO_LARGO, { message: `La descripción del cambio no puede superar ${LIMITE.TEXTO_LARGO} caracteres.` })
  descripcion_cambio?: string;

  @IsString()
  @IsOptional()
  @MaxLength(LIMITE.TEXTO_LARGO, { message: `Los antecedentes no pueden superar ${LIMITE.TEXTO_LARGO} caracteres.` })
  antecedentes?: string;

  @IsString()
  @IsOptional()
  @MaxLength(LIMITE.TEXTO_LARGO, { message: `La justificación no puede superar ${LIMITE.TEXTO_LARGO} caracteres.` })
  justificacion?: string;

  @IsString()
  @IsOptional()
  @MaxLength(LIMITE.TEXTO_LARGO, { message: `El impacto en alcance no puede superar ${LIMITE.TEXTO_LARGO} caracteres.` })
  impacto_alcance?: string;

  @IsString()
  @IsOptional()
  @MaxLength(LIMITE.TEXTO_LARGO, { message: `El impacto en tiempo no puede superar ${LIMITE.TEXTO_LARGO} caracteres.` })
  impacto_tiempo?: string;

  @IsArray()
  @IsOptional()
  @ArrayMaxSize(LIMITE.LISTA)
  @ValidateNested({ each: true })
  @Type(() => AnexoControlCambioDto)
  anexos?: AnexoControlCambioDto[];

  // GENERAL (default) o APLAZAMIENTO. Si es APLAZAMIENTO, exige el año nuevo.
  @IsIn(['GENERAL', 'APLAZAMIENTO'], { message: 'El tipo de Control de Cambios debe ser GENERAL o APLAZAMIENTO.' })
  @IsOptional()
  tipo_control_cambio?: 'GENERAL' | 'APLAZAMIENTO';

  @ValidateIf((o) => o.tipo_control_cambio === 'APLAZAMIENTO')
  @IsInt({ message: 'Debes indicar el año nuevo propuesto para el proyecto.' })
  @Min(2000, { message: 'El año propuesto no es válido.' })
  @Max(2100, { message: 'El año propuesto no es válido.' })
  anio_nuevo_propuesto?: number;
}