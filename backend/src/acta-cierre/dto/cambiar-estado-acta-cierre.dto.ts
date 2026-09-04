import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsInt } from 'class-validator';

export class AprobarActaCierreDto {
  @IsString() @IsNotEmpty({ message: 'La observación es obligatoria para aprobar.' })
  comentarios: string;

  @IsBoolean() @IsOptional()
  enviar_a_presidencia?: boolean;

  @IsInt() @IsOptional()
  gerente_id?: number;

  // 🆕 Solo se usa (y se exige) cuando la etapa actual es CONTROL_GESTION:
  // a quién de Activos Fijos se le envía el proceso.
  @IsInt() @IsOptional()
  activos_fijos_id?: number;
}

export class RechazarActaCierreDto {
  @IsString() @IsNotEmpty({ message: 'La razón del rechazo es obligatoria.' })
  razon_rechazo: string;
}
