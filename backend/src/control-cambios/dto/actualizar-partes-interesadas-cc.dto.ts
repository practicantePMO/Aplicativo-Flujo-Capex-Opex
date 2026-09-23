import { IsArray, IsInt, ArrayMaxSize } from 'class-validator';
import { LIMITE } from '../../common/validaciones';

export class ActualizarPartesInteresadasCcDto {
  @IsArray()
  @IsInt({ each: true })
  @ArrayMaxSize(LIMITE.LISTA)
  partes_interesadas_ids: number[];
}