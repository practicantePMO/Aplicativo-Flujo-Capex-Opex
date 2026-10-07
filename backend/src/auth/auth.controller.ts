import { Controller, Post, Get, Body, Req, UseGuards, NotFoundException } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { LoginSsoDto } from './dto/login-sso.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import type { RequestConUsuario } from './interfaces/usuario-autenticado.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Throttle({ default: { ttl: 60000, limit: 5 } }) // máx 5 intentos de login por minuto por IP
  @Post('login-sso')
  loginSSO(@Body() dto: LoginSsoDto) {
    return this.authService.loginSSO(dto.idToken, dto.proveedor);
  }

  // Perfil actual del usuario autenticado (roles al día desde la base de datos).
  // Si el token venció o el usuario fue desactivado, responde 401.
  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: RequestConUsuario) {
    return this.authService.obtenerPerfil(req.user.userId);
  }

  // RUTA TEMPORAL PARA PRUEBAS EN DevSwitcher — cerrada por defecto,
  // solo se habilita si pones ALLOW_DEV_LOGIN=true a propósito en tu .env local.
  // En producción esa variable NO debe existir (o debe ser false).
  @Throttle({ default: { ttl: 60000, limit: 30 } })
  @Post('login-dev')
  loginDev(@Body() body: { usuarioId: number }) {
    if (process.env.ALLOW_DEV_LOGIN !== 'true') {
      throw new NotFoundException();
    }
    return this.authService.loginDev(body.usuarioId || 1);
  }
}