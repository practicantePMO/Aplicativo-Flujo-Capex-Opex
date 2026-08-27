import { IsInt, IsOptional, IsBoolean, IsString } from 'class-validator';

export class AprobarControlCambioDto {
  @IsInt()
  @IsOptional()
  gerente_id?: number;

  @IsBoolean()
  @IsOptional()
  enviar_a_presidencia?: boolean;

  @IsString()
  @IsOptional()
  comentarios?: string;
}

export class RechazarControlCambioDto {
  @IsString()
  @IsOptional()
  razon_rechazo?: string;
}