import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { PrismaService } from '../prisma/prisma.service';
import { verify, type JwtHeader, type SigningKeyCallback } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

// Dominios de correo corporativo permitidos. Se configuran en ALLOWED_EMAIL_DOMAIN,
// separados por comas, por ejemplo: "empresa.com,filial.com.co,otraempresa.com".
export function dominiosPermitidos(): string[] {
  return (process.env.ALLOWED_EMAIL_DOMAIN || '')
    .split(',')
    .map((dominio) => dominio.trim().toLowerCase().replace(/^@/, ''))
    .filter(Boolean);
}

export function validarDominioCorporativo(email: string) {
  const dominios = dominiosPermitidos();
  if (dominios.length === 0) {
    throw new Error('🛑 Falta configurar ALLOWED_EMAIL_DOMAIN en el archivo .env');
  }
  const correo = email.toLowerCase();
  if (!dominios.some((dominio) => correo.endsWith(`@${dominio}`))) {
    throw new UnauthorizedException(
      `Acceso denegado: Solo se permiten correos corporativos (${dominios.map((dominio) => `@${dominio}`).join(', ')}).`,
    );
  }
}
// Inquilinos (tenants) de Microsoft Entra ID permitidos. Se configuran en MICROSOFT_TENANT_ID.
// Normalmente es uno solo; si alguna compañía tiene su propio inquilino, se separan por comas.
export function inquilinosMicrosoft(): string[] {
  return (process.env.MICROSOFT_TENANT_ID || '')
    .split(',')
    .map((inquilino) => inquilino.trim())
    .filter(Boolean);
}

@Injectable()
export class AuthService {
  // Con un solo inquilino se usan sus llaves; con varios, las llaves comunes de Microsoft
  // (son las mismas para todos los inquilinos). El emisor se valida aparte, inquilino por inquilino.
  private microsoftJwksClient = jwksClient({
    jwksUri: `https://login.microsoftonline.com/${
      inquilinosMicrosoft().length > 1 ? 'common' : inquilinosMicrosoft()[0]
    }/discovery/v2.0/keys`,
  });

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  // Validamos que 'key' exista antes de llamar a getPublicKey()
  private obtenerLlaveFirmaMicrosoft(header: JwtHeader, callback: SigningKeyCallback) {
    this.microsoftJwksClient.getSigningKey(header.kid, (err, key) => {
      if (err || !key) {
        callback(err || new Error('No se pudo obtener la llave de firma de Microsoft'));
        return;
      }
      callback(null, key.getPublicKey());
    });
  }

  verificarTokenMicrosoft(idToken: string) {
    return new Promise<{ email: string; nombre: string }>((resolve, reject) => {
      verify(
        idToken,
        (header, callback) => this.obtenerLlaveFirmaMicrosoft(header, callback),
        {
          audience: process.env.MICROSOFT_CLIENT_ID,
          issuer: inquilinosMicrosoft().map(
            (inquilino) => `https://login.microsoftonline.com/${inquilino}/v2.0`,
          ) as [string, ...string[]],
        },
        (err, decoded) => {
          if (err || !decoded || typeof decoded === 'string') {
            reject(new UnauthorizedException('Token de autenticación de Microsoft inválido o expirado.'));
            return;
          }

          const emailCrudo = decoded.email || decoded.preferred_username;
          if (!emailCrudo) {
            reject(new UnauthorizedException('El token de Microsoft no contiene un correo electrónico válido.'));
            return;
          }

          try {
            const email = emailCrudo.toLowerCase();
            validarDominioCorporativo(email);
            resolve({ email, nombre: decoded.name || email.split('@')[0] });
          } catch (domainError) {
            reject(domainError);
          }
        },
      );
    });
  }

  // El único proveedor de inicio de sesión es Microsoft Entra ID.
  async loginSSO(idToken: string, proveedor = 'MICROSOFT') {
    if (proveedor !== 'MICROSOFT') {
      throw new UnauthorizedException('Proveedor de autenticación no soportado.');
    }
    const { email, nombre } = await this.verificarTokenMicrosoft(idToken);

    const usuario = await this.usuariosService.findOrCreateSSOUser({
      email,
      nombre,
      // En la base de datos el proveedor de Microsoft se guarda como 'AZURE_AD'.
      proveedor_auth: 'AZURE_AD',
    });

    // Le garantizamos a TypeScript que 'usuario' NO es nulo
    if (!usuario) {
      throw new UnauthorizedException('No se pudo registrar ni verificar la información del usuario.');
    }

    const rolesCompania =
      usuario.usuario_roles_compania?.map((urc) => ({
        companiaId: urc.companias?.id,
        companiaNombre: urc.companias?.nombre,
        rolCodigo: urc.roles?.codigo,
        rolNombre: urc.roles?.nombre,
      })) || [];

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      nombre: usuario.nombre,
      rolesCompania,
    };

    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        activo: usuario.activo,
        esPendiente: rolesCompania.length === 0,
        rolesCompania,
      },
    };
  }

  // Perfil ACTUAL del usuario (leído de la base de datos, no del token).
  // Lo usa el frontend al abrir la app y al volver a la pestaña, para que
  // los roles recién asignados o quitados se reflejen sin volver a iniciar sesión.
  async obtenerPerfil(usuarioId: number) {
    const usuario = await this.prisma.usuarios.findFirst({
      where: { id: usuarioId, eliminado_el: null },
      include: {
        usuario_roles_compania: {
          include: {
            roles: { select: { id: true, codigo: true, nombre: true } },
            companias: { select: { id: true, nombre: true } },
          },
        },
      },
    });

    if (!usuario) {
      throw new UnauthorizedException('Tu cuenta ha sido desactivada o no existe.');
    }

    return {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      activo: usuario.activo,
      roles: usuario.usuario_roles_compania.map((urc) => ({
        id: urc.id,
        usuario_id: urc.usuario_id,
        rol_id: urc.rol_id,
        compania_id: urc.compania_id,
        rol: urc.roles ? { id: urc.roles.id, codigo: urc.roles.codigo, nombre: urc.roles.nombre } : null,
        compania: urc.companias ? { id: urc.companias.id, nombre: urc.companias.nombre } : null,
      })),
    };
  }


 // Genera token con payload completo para JwtStrategy
  async loginDev(usuarioId?: number) {
  const whereClause = usuarioId ? { id: usuarioId, eliminado_el: null } : { eliminado_el: null };

  const usuario = await this.prisma.usuarios.findFirst({
    where: whereClause,
    include: {
      usuario_roles_compania: {
        include: {
          roles: { select: { id: true, codigo: true, nombre: true } },
          companias: { select: { id: true, nombre: true } },
        },
      },
    },
  });

  if (!usuario) {
    throw new NotFoundException('Usuario de prueba no encontrado. Verifica que el seed de usuarios ya se corrió.');
  }

  const payload = {
    sub: usuario.id,
    id: usuario.id,
    userId: usuario.id,
    email: usuario.email,
  };

  const rolesFormateados = usuario.usuario_roles_compania.map((urc) => ({
    id: urc.id,
    usuario_id: urc.usuario_id,
    rol_id: urc.rol_id,
    compania_id: urc.compania_id,
    rol: urc.roles ? { id: urc.roles.id, codigo: urc.roles.codigo, nombre: urc.roles.nombre } : null,
    compania: urc.companias ? { id: urc.companias.id, nombre: urc.companias.nombre } : null,
  }));

  return {
    access_token: this.jwtService.sign(payload),
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      activo: usuario.activo,
      roles: rolesFormateados, 
    },
  };
}
}
