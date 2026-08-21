import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AuthService', () => {
  let service: AuthService;
  const dominioOriginal = process.env.ALLOWED_EMAIL_DOMAIN;

  beforeEach(async () => {
    // Fijamos el dominio permitido para que la prueba no dependa
    // de lo que tengas configurado en tu .env real
    process.env.ALLOWED_EMAIL_DOMAIN = 'empresa.com';

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsuariosService, useValue: {} },
        { provide: JwtService, useValue: { sign: jest.fn() } },
        { provide: PrismaService, useValue: {} },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterAll(() => {
    // Dejamos la variable de entorno como estaba, para no afectar otras pruebas
    process.env.ALLOWED_EMAIL_DOMAIN = dominioOriginal;
  });

  describe('validarDominioCorporativo', () => {
    it('debe aceptar un correo del dominio corporativo permitido', () => {
      // "as any" nos deja llamar un método privado solo para esta prueba,
      // sin tener que hacerlo público en el código real.
      expect(() => (service as any).validarDominioCorporativo('laura.pm@empresa.com')).not.toThrow();
    });

    it('debe RECHAZAR un correo de un dominio externo (ej. gmail personal)', () => {
      expect(() => (service as any).validarDominioCorporativo('cualquiera@gmail.com')).toThrow(
        UnauthorizedException,
      );
    });

    it('no debe dejarse engañar por un dominio que solo termina parecido (ej. "empresa.com.malicioso.com")', () => {
      // Este es el caso más importante de los tres: confirma que la validación
      // usa "termina en @empresa.com" de forma exacta, y no un simple
      // "contiene la palabra empresa.com en algún lado" (que sería fácil de burlar).
      expect(() =>
        (service as any).validarDominioCorporativo('atacante@empresa.com.malicioso.com'),
      ).toThrow(UnauthorizedException);
    });

    it('debe fallar de forma segura si ALLOWED_EMAIL_DOMAIN no está configurado', () => {
      delete process.env.ALLOWED_EMAIL_DOMAIN;
      expect(() => (service as any).validarDominioCorporativo('laura.pm@empresa.com')).toThrow(
        'Falta configurar ALLOWED_EMAIL_DOMAIN',
      );
    });
  });
});