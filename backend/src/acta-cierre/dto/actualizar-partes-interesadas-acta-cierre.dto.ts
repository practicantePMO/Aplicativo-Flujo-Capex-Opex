import { IsArray, IsInt, ArrayMinSize, ArrayMaxSize } from 'class-validator';
import { LIMITE } from '../../common/validaciones';

export class ActualizarPartesInteresadasActaCierreDto {
  @IsArray()
  @IsInt({ each: true })
  @ArrayMinSize(1, { message: 'Debes elegir al menos una parte interesada.' })
  @ArrayMaxSize(LIMITE.LISTA)
  partes_interesadas_ids: number[];
}