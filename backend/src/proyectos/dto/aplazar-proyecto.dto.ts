import { IsInt, IsString, IsNotEmpty, Min } from 'class-validator';

export class AplazarProyectoDto {
  @IsInt({ message: 'El año nuevo debe ser un número entero.' })
  @Min(2000, { message: 'El año nuevo no es válido.' })
  anio_nuevo: number;

  @IsString({ message: 'El motivo debe ser un texto.' })
  @IsNotEmpty({ message: 'El motivo del aplazamiento es obligatorio.' })
  motivo: string;
}
