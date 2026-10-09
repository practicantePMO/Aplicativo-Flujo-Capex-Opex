import { generateKeyPairSync } from 'crypto';
import { sign } from 'jsonwebtoken';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { PrismaService } from '../prisma/prisma.service';

// Login SSO (Google y Microsoft), perfil y login de desarrollo, con los proveedores simulados.
describe('AuthService (SSO y perfil)', () => {
  const { privateKey, publicKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
  });
  const llavePublica = publicKey
    .export({ type: 'spki', format: 'pem' })
    .toString();

  const usuariosService = { findOrCreateSSOUser: jest.fn() };
  const jwtService = { sign: jest.fn(() => 'token-firmado') };
  const prisma = { usuarios: { findFirst: jest.fn() } };
  let servicio: AuthService;
  let google: { verifyIdToken: jest.Mock };
  let jwks: { getSigningKey: jest.Mock };

  const tokenMicrosoft = (datos: object, opciones: object = {}) =>
    sign(datos, privateKey, {
      algorithm: 'RS256',
      keyid: 'llave-1',
      audience: process.env.MICROSOFT_CLIENT_ID,
      issuer: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}/v2.0`,
      ...opciones,
    });

  const usuarioConRoles = {
    id: 5,
    nombre: 'Ana',
    email: 'ana@empresa.com',
    activo: true,
    usuario_roles_compania: [
      {
        id: 1,
        usuario_id: 5,
        rol_id: 2,
        compania_id: 1,
        roles: { id: 2, codigo: 'PM', nombre: 'PM' },
        companias: { id: 1, nombre: 'Galletas' },
      },
      {
        id: 2,
        usuario_id: 5,
        rol_id: 3,
        compania_id: null,
        roles: null,
        companias: null,
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    servicio = new AuthService(
      usuariosService as unknown as UsuariosService,
      jwtService as unknown as JwtService,
      prisma as unknown as PrismaService,
    );
    google = { verifyIdToken: jest.fn() };
    jwks = {
      getSigningKey: jest.fn((_kid, cb) =>
        cb(null, { getPublicKey: () => llavePublica }),
      ),
    };
    Object.assign(servicio, {
      googleClient: google,
      microsoftJwksClient: jwks,
    });
  });

  describe('Google', () => {
    const ticket = (payload: object | undefined) => ({
      getPayload: () => payload,
    });

    it('acepta un token con correo corporativo', async () => {
      google.verifyIdToken.mockResolvedValue(
        ticket({ email: 'Ana@Empresa.com', name: 'Ana' }),
      );
      await expect(servicio.verificarTokenGoogle('t')).resolves.toEqual({
        email: 'ana@empresa.com',
        nombre: 'Ana',
      });
      google.verifyIdToken.mockResolvedValue(
        ticket({ email: 'luis@empresa.com' }),
      );
      await expect(servicio.verificarTokenGoogle('t')).resolves.toEqual({
        email: 'luis@empresa.com',
        nombre: 'luis',
      });
    });

    it('rechaza tokens sin correo, de otro dominio o inválidos', async () => {
      google.verifyIdToken.mockResolvedValue(ticket(undefined));
      await expect(servicio.verificarTokenGoogle('t')).rejects.toThrow(
        'no contiene un correo',
      );
      google.verifyIdToken.mockResolvedValue(ticket({ email: 'x@gmail.com' }));
      await expect(servicio.verificarTokenGoogle('t')).rejects.toThrow(
        'Acceso denegado',
      );
      google.verifyIdToken.mockRejectedValue(new Error('expirado'));
      await expect(servicio.verificarTokenGoogle('t')).rejects.toThrow(
        'Google inválido o expirado',
      );
    });
  });

  describe('Microsoft', () => {
    it('acepta un token firmado con correo o preferred_username', async () => {
      await expect(
        servicio.verificarTokenMicrosoft(
          tokenMicrosoft({ email: 'Ana@empresa.com', name: 'Ana' }),
        ),
      ).resolves.toEqual({ email: 'ana@empresa.com', nombre: 'Ana' });
      await expect(
        servicio.verificarTokenMicrosoft(
          tokenMicrosoft({ preferred_username: 'luis@empresa.com' }),
        ),
      ).resolves.toEqual({ email: 'luis@empresa.com', nombre: 'luis' });
    });

    it('rechaza tokens sin correo, de otro dominio, mal firmados o sin llave', async () => {
      await expect(
        servicio.verificarTokenMicrosoft(
          tokenMicrosoft({ name: 'Sin correo' }),
        ),
      ).rejects.toThrow('no contiene un correo');
      await expect(
        servicio.verificarTokenMicrosoft(
          tokenMicrosoft({ email: 'x@gmail.com' }),
        ),
      ).rejects.toThrow('Acceso denegado');
      await expect(
        servicio.verificarTokenMicrosoft(
          tokenMicrosoft({ email: 'a@empresa.com' }, { audience: 'otra-app' }),
        ),
      ).rejects.toThrow('Microsoft inválido');
      jwks.getSigningKey.mockImplementation((_kid, cb) =>
        cb(new Error('sin llave')),
      );
      await expect(
        servicio.verificarTokenMicrosoft(
          tokenMicrosoft({ email: 'a@empresa.com' }),
        ),
      ).rejects.toThrow(UnauthorizedException);
      jwks.getSigningKey.mockImplementation((_kid, cb) => cb(null, undefined));
      await expect(
        servicio.verificarTokenMicrosoft(
          tokenMicrosoft({ email: 'a@empresa.com' }),
        ),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('loginSSO', () => {
    it('inicia sesión con Google y con Microsoft y arma los roles', async () => {
      google.verifyIdToken.mockResolvedValue({
        getPayload: () => ({ email: 'ana@empresa.com', name: 'Ana' }),
      });
      usuariosService.findOrCreateSSOUser.mockResolvedValue(usuarioConRoles);
      const r = await servicio.loginSSO('t');
      expect(r.access_token).toBe('token-firmado');
      expect(r.usuario.rolesCompania).toHaveLength(2);
      expect(r.usuario.esPendiente).toBe(false);

      usuariosService.findOrCreateSSOUser.mockResolvedValue({
        ...usuarioConRoles,
        usuario_roles_compania: undefined,
      });
      const m = await servicio.loginSSO(
        tokenMicrosoft({ email: 'ana@empresa.com' }),
        'MICROSOFT',
      );
      expect(m.usuario.esPendiente).toBe(true);
    });

    it('rechaza un proveedor no soportado o un usuario que no se pudo registrar', async () => {
      await expect(servicio.loginSSO('t', 'FACEBOOK')).rejects.toThrow(
        'Proveedor de autenticación no soportado',
      );
      google.verifyIdToken.mockResolvedValue({
        getPayload: () => ({ email: 'ana@empresa.com' }),
      });
      usuariosService.findOrCreateSSOUser.mockResolvedValue(null);
      await expect(servicio.loginSSO('t')).rejects.toThrow(
        'No se pudo registrar',
      );
    });
  });

  describe('perfil y login de desarrollo', () => {
    it('devuelve el perfil con sus roles y rechaza cuentas inexistentes', async () => {
      prisma.usuarios.findFirst.mockResolvedValue(usuarioConRoles);
      const perfil = await servicio.obtenerPerfil(5);
      expect(perfil.roles[0].rol).toEqual({
        id: 2,
        codigo: 'PM',
        nombre: 'PM',
      });
      expect(perfil.roles[1].rol).toBeNull();
      prisma.usuarios.findFirst.mockResolvedValue(null);
      await expect(servicio.obtenerPerfil(5)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('login de desarrollo con y sin usuario indicado', async () => {
      prisma.usuarios.findFirst.mockResolvedValue(usuarioConRoles);
      expect((await servicio.loginDev()).usuario.roles).toHaveLength(2);
      prisma.usuarios.findFirst.mockResolvedValue(null);
      await expect(servicio.loginDev(99)).rejects.toThrow(NotFoundException);
    });
  });
});
