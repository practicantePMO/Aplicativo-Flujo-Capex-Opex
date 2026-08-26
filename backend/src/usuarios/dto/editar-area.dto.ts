import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class EditarAreaDto {
  @IsString({ message: 'El área debe ser un texto.' })
  @IsNotEmpty({ message: 'El área no puede quedar vacía.' })
  @MaxLength(100, { message: 'El área no puede tener más de 100 caracteres.' })
  area: string;
}