import { IsArray, IsInt } from 'class-validator';

export class ActualizarPartesInteresadasCcDto {
  @IsArray()
  @IsInt({ each: true })
  partes_interesadas_ids: number[];
}
