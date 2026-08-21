import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class AsignarRolDto {
  @IsInt({ message: 'El ID de usuario debe ser un número entero' })
  @IsNotEmpty({ message: 'El ID de usuario es obligatorio' })
  usuario_id: number;

  @IsInt({ message: 'El ID de rol debe ser un número entero' })
  @IsNotEmpty({ message: 'El ID de rol es obligatorio' })
  rol_id: number;

  // Opcional: si se omite, el rol queda GLOBAL (aplica a todas las compañías)
  @IsInt({ message: 'El ID de compañía debe ser un número entero' })
  @IsOptional()
  compania_id?: number;
}
