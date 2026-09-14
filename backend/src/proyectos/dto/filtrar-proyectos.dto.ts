import { IsOptional, IsString, IsInt, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class FiltrarProyectosDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'El año debe ser un número entero.' })
  anio?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'La compañía debe ser un número entero.' })
  companiaId?: number;

  @IsOptional()
  @IsIn(['true', 'false'])
  aplazados?: string;
}