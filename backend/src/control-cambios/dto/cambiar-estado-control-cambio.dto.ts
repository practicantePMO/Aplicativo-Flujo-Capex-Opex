import { IsInt, IsOptional, IsBoolean, IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { LIMITE } from '../../common/validaciones';

export class AprobarControlCambioDto {
  @IsInt()
  @IsOptional()
  gerente_id?: number;

  @IsBoolean()
  @IsOptional()
  enviar_a_presidencia?: boolean;

  @IsString()
  @IsOptional()
  @MaxLength(LIMITE.TEXTO_LARGO, { message: `Los comentarios no pueden superar ${LIMITE.TEXTO_LARGO} caracteres.` })
  comentarios?: string;
}

export class RechazarControlCambioDto {
  @IsString({ message: 'La razón del rechazo debe ser un texto.' })
  @IsNotEmpty({ message: 'La razón del rechazo es obligatoria.' })
  @MaxLength(LIMITE.TEXTO_LARGO, { message: `La razón del rechazo no puede superar ${LIMITE.TEXTO_LARGO} caracteres.` })
  razon_rechazo: string;
}