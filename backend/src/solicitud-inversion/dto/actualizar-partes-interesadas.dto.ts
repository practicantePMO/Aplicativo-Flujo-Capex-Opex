import { IsArray, IsInt, ArrayMinSize } from 'class-validator';

export class ActualizarPartesInteresadasDto {
  @IsArray({ message: 'Las partes interesadas deben ser una lista de IDs de usuarios.' })
  @IsInt({ each: true, message: 'Cada ID debe ser un número entero.' })
  @ArrayMinSize(1, { message: 'Debes elegir al menos una parte interesada.' })
  partes_interesadas_ids: number[];
}