import { IsArray, IsInt, IsNotEmpty } from 'class-validator';

export class ActualizarPartesInteresadasDto {
  @IsArray({ message: 'Las partes interesadas deben ser una lista de IDs de usuarios.' })
  @IsInt({ each: true, message: 'Cada ID debe ser un número entero.' })
  @IsNotEmpty({ message: 'La lista de partes interesadas no puede estar vacía.' })
  partes_interesadas_ids: number[];
}
