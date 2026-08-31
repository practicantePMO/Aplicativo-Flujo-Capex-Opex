import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class AprobarOrdenInternaDto {
  // Siempre obligatorio: Control Gestión lo asigna en el momento de aprobar.
  @IsString({ message: 'El número de Orden Interna es obligatorio.' })
  @IsNotEmpty({ message: 'El número de Orden Interna es obligatorio.' })
  numero_oi: string;

  // Solo es obligatorio si el grupo todavía no tiene nombre — esa regla
  // depende de un dato en base de datos (no de otro campo del DTO), así
  // que se valida a mano dentro del servicio, no con un decorador aquí.
  @IsString() @IsOptional()
  grupo_texto?: string;

  @IsString() @IsOptional()
  observaciones?: string;
}

export class RechazarOrdenInternaDto {
  @IsString({ message: 'La observación del rechazo es obligatoria.' })
  @IsNotEmpty({ message: 'La observación del rechazo es obligatoria.' })
  observaciones: string;
}