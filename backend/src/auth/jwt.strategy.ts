import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';
import type { JwtPayload, UsuarioAutenticado } from './interfaces/usuario-autenticado.interface';

function obtenerJwtSecret(): string {
  const secreto = process.env.JWT_SECRET;
  if (!secreto) {
    throw new Error('Falta configurar JWT_SECRET en el archivo .env');
  }
  return secreto;
}

const jwtSecret = obtenerJwtSecret();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: JwtPayload): Promise<UsuarioAutenticado> {
    // Revalida en vivo que el usuario siga existiendo y activo, en TODAS
    // las rutas autenticadas.
    const usuarioBD = await this.prisma.usuarios.findUnique({
      where: { id: payload.sub },
      select: { activo: true },
    });
    if (!usuarioBD || !usuarioBD.activo) {
      throw new UnauthorizedException('Tu cuenta ha sido desactivada o no existe.');
    }

    return {
      userId: payload.sub,
      email: payload.email,
      nombre: payload.nombre,
      rolesCompania: payload.rolesCompania,
    };
  }
}