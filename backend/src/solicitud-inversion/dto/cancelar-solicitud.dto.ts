import { IsString, IsNotEmpty } from 'class-validator';

export class CancelarSolicitudDto {
  @IsString({ message: 'La razón de cancelación debe ser un texto.' })
  @IsNotEmpty({ message: 'La razón de cancelación es OBLIGATORIA.' })
  razon_cancelacion: string;
}
