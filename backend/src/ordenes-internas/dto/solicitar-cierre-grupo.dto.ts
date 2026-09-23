import { IsString, IsOptional, MaxLength } from 'class-validator';
import { LIMITE } from '../../common/validaciones';

export class SolicitarCierreGrupoDto {
  @IsString() @IsOptional()
  @MaxLength(LIMITE.TEXTO_LARGO, { message: `Las observaciones no pueden superar ${LIMITE.TEXTO_LARGO} caracteres.` })
  observaciones?: string;
}