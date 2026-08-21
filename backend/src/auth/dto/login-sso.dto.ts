import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class LoginSsoDto {
  // El token encriptado que Google le da al Frontend
  @IsString({ message: 'El idToken debe ser un texto' })
  @IsNotEmpty({ message: 'El idToken es obligatorio' })
  idToken: string;

  // Opcional, por si en el futuro agregas Azure/Microsoft
  @IsString()
  @IsOptional()
  proveedor?: string;
}
