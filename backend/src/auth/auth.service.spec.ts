import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService, validarDominioCorporativo } from './auth.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AuthService', () => {
  let service: AuthService;
  const dominioOriginal = process.env.ALLOWED_EMAIL_DOMAIN;

  beforeEach(async () => {
    // Fijamos el dominio permitido para que la prueba no dependa
    // de lo que este configurado en el .env real
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

  it('debe crearse correctamente', () => {
    expect(service).toBeDefined();
  });

  describe('validarDominioCorporativo', () => {
    it('debe aceptar un correo del dominio corporativo permitido', () => {
      expect(() => validarDominioCorporativo('laura.pm@empresa.com')).not.toThrow();
    });

    it('debe RECHAZAR un correo de un dominio externo (ej. gmail personal)', () => {
      expect(() => validarDominioCorporativo('cualquiera@gmail.com')).toThrow(
        UnauthorizedException,
      );
    });

    it('no debe dejarse engañar por un dominio que solo termina parecido (ej. "empresa.com.malicioso.com")', () => {
      expect(() =>
        validarDominioCorporativo('atacante@empresa.com.malicioso.com'),
      ).toThrow(UnauthorizedException);
    });

    it('acepta varios dominios separados por comas (con o sin @ y espacios)', () => {
      process.env.ALLOWED_EMAIL_DOMAIN = 'empresa.com, @filial.com.co ,otra.com';
      expect(() => validarDominioCorporativo('ana@empresa.com')).not.toThrow();
      expect(() => validarDominioCorporativo('Luis@Filial.com.co')).not.toThrow();
      expect(() => validarDominioCorporativo('eva@otra.com')).not.toThrow();
      expect(() => validarDominioCorporativo('x@gmail.com')).toThrow(UnauthorizedException);
      expect(() => validarDominioCorporativo('x@filial.com')).toThrow(UnauthorizedException);
    });

    it('debe fallar de forma segura si ALLOWED_EMAIL_DOMAIN no está configurado', () => {
      delete process.env.ALLOWED_EMAIL_DOMAIN;
      expect(() => validarDominioCorporativo('laura.pm@empresa.com')).toThrow(
        'Falta configurar ALLOWED_EMAIL_DOMAIN',
      );
    });
  });
});