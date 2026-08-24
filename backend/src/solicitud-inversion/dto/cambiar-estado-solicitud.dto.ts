import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsInt } from 'class-validator';

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

  // Solo se usa (y se exige) cuando la etapa actual es DIRECCION_PMO: a qué
  // gerente puntual se le envía el proceso (hay varias gerencias).
  @IsInt({ message: 'Debes seleccionar a qué gerente enviar el proceso.' })
  @IsOptional()
  gerente_id?: number;
}
