import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class RechazarSolicitudDto {
  @IsString({ message: 'La razón del rechazo debe ser un texto.' })
  @IsNotEmpty({ message: 'La razón del rechazo es OBLIGATORIA al rechazar una solicitud.' })
  razon_rechazo: string;
}

export class AprobarSolicitudDto {
  @IsString({ message: 'La observación debe ser un texto.' })
  @IsNotEmpty({ message: 'La observación es OBLIGATORIA al aprobar una etapa.' })
  comentarios: string;

  // Solo se usa (y se exige) cuando la etapa actual es GERENCIA
  @IsBoolean({ message: 'enviar_a_presidencia debe ser true o false.' })
  @IsOptional()
  enviar_a_presidencia?: boolean;
}
