import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class LoginSsoDto {
  // El id_token que Microsoft Entra ID le entrega al frontend
  @IsString({ message: 'El idToken debe ser un texto' })
  @IsNotEmpty({ message: 'El idToken es obligatorio' })
  idToken: string;

  // Opcional. El único proveedor soportado es 'MICROSOFT'
  @IsString()
  @IsOptional()
  proveedor?: string;
}
