import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsInt, MaxLength } from 'class-validator';
import { LIMITE } from '../../common/validaciones';

export class AprobarActaCierreDto {
  @IsString() @IsNotEmpty({ message: 'La observación es obligatoria para aprobar.' })
  @MaxLength(LIMITE.TEXTO_LARGO, { message: `La observación no puede superar ${LIMITE.TEXTO_LARGO} caracteres.` })
  comentarios: string;

  @IsBoolean() @IsOptional()
  enviar_a_presidencia?: boolean;

  @IsInt() @IsOptional()
  gerente_id?: number;

  @IsInt() @IsOptional()
  activos_fijos_id?: number;
}

export class RechazarActaCierreDto {
  @IsString() @IsNotEmpty({ message: 'La razón del rechazo es obligatoria.' })
  @MaxLength(LIMITE.TEXTO_LARGO, { message: `La razón del rechazo no puede superar ${LIMITE.TEXTO_LARGO} caracteres.` })
  razon_rechazo: string;
}