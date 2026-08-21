import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { JwtStrategy } from './jwt.strategy';

// 🔥 REGLA DE SEGURIDAD: Si no hay clave secreta, el servidor NO ARRANCA.
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error('🛑 ERROR CRÍTICO: Falta la variable JWT_SECRET en el archivo .env');
}

@Module({
  imports: [
    UsuariosModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret, // Ya no hay "clave_por_defecto"
      signOptions: { expiresIn: '8h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
