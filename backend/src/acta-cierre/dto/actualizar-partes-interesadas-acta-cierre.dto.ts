import { IsArray, IsInt } from 'class-validator';

export class ActualizarPartesInteresadasActaCierreDto {
  @IsArray()
  @IsInt({ each: true })
  partes_interesadas_ids: number[];
}