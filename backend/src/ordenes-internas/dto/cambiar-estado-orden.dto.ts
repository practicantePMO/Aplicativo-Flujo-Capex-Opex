import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class AprobarOrdenInternaDto {
  // Sección 4: "Grupo de órdenes internas" — SÍ es obligatorio (según especificación)
  @IsString({ message: 'El grupo de órdenes internas es obligatorio.' })
  @IsNotEmpty({ message: 'El grupo de órdenes internas es obligatorio.' })
  grupo_texto: string;

  // Las observaciones NO son obligatorias en este proceso (a diferencia de Solicitud de Inversión)
  @IsString() @IsOptional()
  observaciones?: string;
}

export class RechazarOrdenInternaDto {
  @IsString({ message: 'La observación del rechazo es obligatoria.' })
  @IsNotEmpty({ message: 'La observación del rechazo es obligatoria.' })
  observaciones: string;
}