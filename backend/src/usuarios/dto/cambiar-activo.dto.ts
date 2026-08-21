import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CambiarActivoDto {
  @IsBoolean({ message: 'activo debe ser true o false.' })
  @IsNotEmpty({ message: 'Debes indicar si el usuario queda activo o inactivo.' })
  activo: boolean;
}