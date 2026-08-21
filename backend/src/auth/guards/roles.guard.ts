import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  // Inyectamos PrismaService para hacer verificaciones en tiempo real
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. Leemos los roles exigidos por la ruta (@Roles('ADMIN', ...))
    const rolesRequeridos = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si la ruta no exige ningún rol específico, dejamos pasar
    if (!rolesRequeridos) {
      return true;
    }

    // 2. Extraemos el usuario autenticado por JWT
    const { user } = context.switchToHttp().getRequest();

    if (!user || !user.userId) {
      throw new ForbiddenException('No tienes un token de sesión válido.');
    }

    // 🛡️ SEGURIDAD EN TIEMPO REAL: Consultamos la base de datos EN VIVO
    const usuarioBD = await this.prisma.usuarios.findUnique({
      where: { id: user.userId },
      select: {
        activo: true,
        usuario_roles_compania: {
          select: {
            roles: { select: { codigo: true } },
          },
        },
      },
    });

    // Si el usuario fue desactivado en la BD, lo bloqueamos inmediatamente
    if (!usuarioBD || !usuarioBD.activo) {
      throw new ForbiddenException('Tu cuenta ha sido desactivada o no existe.');
    }

    // Extraemos la lista FRESCA de códigos de rol desde la BD
    const rolesActualesBD = usuarioBD.usuario_roles_compania.map(
      (urc) => urc.roles?.codigo,
    );

    // 3. Verificamos si sus roles ACTUALES coinciden con los requeridos por la ruta
    const tienePermiso = rolesRequeridos.some((rol) => rolesActualesBD.includes(rol));

    if (!tienePermiso) {
      throw new ForbiddenException(
        `Acceso denegado: Se requiere uno de los siguientes roles: [${rolesRequeridos.join(', ')}]`,
      );
    }

    return true;
  }
}