import { IsInt, IsOptional } from 'class-validator';

export class EditarEmpresaDto {
  @IsInt({ message: 'La empresa seleccionada no es válida.' })
  @IsOptional()
  empresa_id?: number | null;
}
