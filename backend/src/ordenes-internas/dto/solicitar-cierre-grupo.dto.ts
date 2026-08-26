import { IsString, IsOptional } from 'class-validator';

export class SolicitarCierreGrupoDto {
  @IsString() @IsOptional()
  observaciones?: string;
}