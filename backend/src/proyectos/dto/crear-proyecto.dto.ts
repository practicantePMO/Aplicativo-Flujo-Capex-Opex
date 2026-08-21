import { IsString, IsNotEmpty, IsInt, IsDateString, IsOptional } from 'class-validator';

export class CrearProyectoDto {
  @IsString({ message: 'El nombre del proyecto debe ser un texto.' })
  @IsNotEmpty({ message: 'El nombre del proyecto es obligatorio.' })
  nombre: string;

  @IsInt({ message: 'El ID de la compañía debe ser un número entero.' })
  @IsNotEmpty({ message: 'Debe especificar la compañía a la que pertenece el proyecto.' })
  compania_id: number;

  @IsDateString({}, { message: 'La fecha del proyecto debe tener un formato de fecha válido (YYYY-MM-DD).' })
  @IsNotEmpty({ message: 'La fecha del proyecto es obligatoria.' })
  fecha_proyecto: string; // Formato esperado en el JSON: "2026-07-31"

  // Solo lo usan PMO/ADMIN: a qué PM le queda asignado el proyecto de verdad.
  // Si un PM crea su propio proyecto, no manda este campo — el dueño es él mismo.
  @IsInt({ message: 'El PM asignado debe ser un ID numérico.' })
  @IsOptional()
  pm_asignado_id?: number;
}
