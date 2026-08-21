import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { LoginSsoDto } from './dto/login-sso.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Throttle({ default: { ttl: 60000, limit: 5 } }) // máx 5 intentos de login por minuto por IP
  @Post('login-sso')
  async loginSSO(@Body() dto: LoginSsoDto) {
    return this.authService.loginSSO(dto.idToken, dto.proveedor);
  }

  // 🟢 RUTA TEMPORAL PARA PRUEBAS EN POSTMAN — bloqueada fuera de desarrollo (Paso 1)
  @Post('login-dev')
  async loginDev(@Body() body: { usuarioId: number }) {
    if (process.env.NODE_ENV === 'production') {
      throw new NotFoundException();
    }
    return this.authService.loginDev(body.usuarioId || 1);
  }
}