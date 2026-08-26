import { IsInt, IsNotEmpty } from 'class-validator';

export class EnviarOrdenInternaDto {
  @IsInt({ message: 'Debes elegir a qué persona de Control Gestión enviar la Orden Interna.' })
  @IsNotEmpty()
  control_gestion_id: number;
}