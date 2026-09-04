import { IsInt, IsOptional } from 'class-validator';

export class EditarEmpresaDto {
  // Opcional a propósito: se puede mandar null/omitir para DEJAR AL USUARIO
  // SIN EMPRESA (es un dato opcional, no todos la necesitan).
  @IsInt({ message: 'La empresa seleccionada no es válida.' })
  @IsOptional()
  empresa_id?: number | null;
}
