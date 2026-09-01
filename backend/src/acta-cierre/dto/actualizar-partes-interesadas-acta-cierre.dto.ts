import { IsArray, IsInt, ArrayMinSize } from 'class-validator';

export class ActualizarPartesInteresadasActaCierreDto {
  @IsArray()
  @IsInt({ each: true })
  @ArrayMinSize(1, { message: 'Debes elegir al menos una parte interesada.' })
  partes_interesadas_ids: number[];
}
