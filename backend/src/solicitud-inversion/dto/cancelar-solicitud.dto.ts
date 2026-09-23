import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { LIMITE } from '../../common/validaciones';

export class CancelarSolicitudDto {
  @IsString({ message: 'La razón de cancelación debe ser un texto.' })
  @IsNotEmpty({ message: 'La razón de cancelación es OBLIGATORIA.' })
  @MaxLength(LIMITE.TEXTO_LARGO, { message: `La razón de cancelación no puede superar ${LIMITE.TEXTO_LARGO} caracteres.` })
  razon_cancelacion: string;
}