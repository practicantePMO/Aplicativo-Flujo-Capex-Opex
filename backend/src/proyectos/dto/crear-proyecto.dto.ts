import { IsString, IsNotEmpty, IsInt, IsDateString, IsOptional, MaxLength } from 'class-validator';
import { LIMITE } from '../../common/validaciones';

export class CrearProyectoDto {
  @IsString({ message: 'El nombre del proyecto debe ser un texto.' })
  @IsNotEmpty({ message: 'El nombre del proyecto es obligatorio.' })
  @MaxLength(LIMITE.TEXTO_CORTO, { message: `El nombre del proyecto no puede superar ${LIMITE.TEXTO_CORTO} caracteres.` })
  nombre: string;

  @IsInt({ message: 'El ID de la compañía debe ser un número entero.' })
  @IsNotEmpty({ message: 'Debe especificar la compañía a la que pertenece el proyecto.' })
  compania_id: number;

  @IsDateString({}, { message: 'La fecha del proyecto debe tener un formato de fecha válido (YYYY-MM-DD).' })
  @IsNotEmpty({ message: 'La fecha del proyecto es obligatoria.' })
  fecha_proyecto: string; // Formato esperado en el JSON: "2026-07-31"

  @IsInt({ message: 'El PM asignado debe ser un ID numérico.' })
  @IsOptional()
  pm_asignado_id?: number;
}