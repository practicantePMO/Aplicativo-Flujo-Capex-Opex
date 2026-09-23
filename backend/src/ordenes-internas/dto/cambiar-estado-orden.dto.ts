import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { LIMITE } from '../../common/validaciones';

export class AprobarOrdenInternaDto {
  // Siempre obligatorio: Control Gestión lo asigna en el momento de aprobar.
  @IsString({ message: 'El número de Orden Interna es obligatorio.' })
  @IsNotEmpty({ message: 'El número de Orden Interna es obligatorio.' })
  @MaxLength(50, { message: 'El número de Orden Interna no puede superar 50 caracteres.' })
  numero_oi: string;

  // Solo es obligatorio si el grupo todavía no tiene nombre — esa regla
  // depende de un dato en base de datos (no de otro campo del DTO), así
  // que se valida a mano dentro del servicio, no con un decorador aquí.
  @IsString() @IsOptional()
  @MaxLength(150, { message: 'El grupo no puede superar 150 caracteres.' })
  grupo_texto?: string;

  @IsString() @IsOptional()
  @MaxLength(LIMITE.TEXTO_LARGO, { message: `Las observaciones no pueden superar ${LIMITE.TEXTO_LARGO} caracteres.` })
  observaciones?: string;
}

export class RechazarOrdenInternaDto {
  @IsString({ message: 'La observación del rechazo es obligatoria.' })
  @IsNotEmpty({ message: 'La observación del rechazo es obligatoria.' })
  @MaxLength(LIMITE.TEXTO_LARGO, { message: `La observación no puede superar ${LIMITE.TEXTO_LARGO} caracteres.` })
  observaciones: string;
}