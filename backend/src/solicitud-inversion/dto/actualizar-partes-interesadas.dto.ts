import { IsArray, IsInt, ArrayMinSize, ArrayMaxSize } from 'class-validator';
import { LIMITE } from '../../common/validaciones';

export class ActualizarPartesInteresadasDto {
  @IsArray({ message: 'Las partes interesadas deben ser una lista de IDs de usuarios.' })
  @IsInt({ each: true, message: 'Cada ID debe ser un número entero.' })
  @ArrayMinSize(1, { message: 'Debes elegir al menos una parte interesada.' })
  @ArrayMaxSize(LIMITE.LISTA)
  partes_interesadas_ids: number[];
}