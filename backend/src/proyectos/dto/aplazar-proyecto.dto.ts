import { IsInt, IsString, IsNotEmpty, Min, Max, MaxLength } from 'class-validator';
import { LIMITE } from '../../common/validaciones';

export class AplazarProyectoDto {
  @IsInt({ message: 'El año nuevo debe ser un número entero.' })
  @Min(2000, { message: 'El año nuevo no es válido.' })
  @Max(2100, { message: 'El año nuevo no es válido.' })
  anio_nuevo: number;

  @IsString({ message: 'El motivo debe ser un texto.' })
  @IsNotEmpty({ message: 'El motivo del aplazamiento es obligatorio.' })
  @MaxLength(LIMITE.TEXTO_LARGO, { message: `El motivo no puede superar ${LIMITE.TEXTO_LARGO} caracteres.` })
  motivo: string;
}