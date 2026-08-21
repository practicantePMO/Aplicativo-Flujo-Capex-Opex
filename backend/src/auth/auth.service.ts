import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { OAuth2Client } from 'google-auth-library';
import { PrismaService } from '../prisma/prisma.service';
import * as jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

@Injectable()
export class AuthService {
  private googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  private microsoftJwksClient = jwksClient({
    jwksUri: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}/discovery/v2.0/keys`,
  });

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  private validarDominioCorporativo(email: string) {
    const dominioPermitido = process.env.ALLOWED_EMAIL_DOMAIN;
    if (!dominioPermitido) {
      throw new Error('🛑 Falta configurar ALLOWED_EMAIL_DOMAIN en el archivo .env');
    }
    if (!email.toLowerCase().endsWith(`@${dominioPermitido}`)) {
      throw new UnauthorizedException(
        `Acceso denegado: Solo se permiten correos corporativos con el dominio @${dominioPermitido}.`,
      );
    }
  }

  async verificarTokenGoogle(idToken: string) {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      if (!payload || !payload.email) {
        throw new UnauthorizedException('El token de Google no contiene un correo electrónico válido.');
      }
      const email = payload.email.toLowerCase();
      this.validarDominioCorporativo(email);
      return { email, nombre: payload.name || email.split('@')[0] };
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new UnauthorizedException('Token de autenticación de Google inválido o expirado.');
    }
  }

  // 🛡️ CORRECCIÓN 1: Validamos que 'key' exista antes de llamar a getPublicKey()
  private obtenerLlaveFirmaMicrosoft(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) {
    this.microsoftJwksClient.getSigningKey(header.kid, (err, key) => {
      if (err || !key) {
        return callback(err || new Error('No se pudo obtener la llave de firma de Microsoft'));
      }
      callback(null, key.getPublicKey());
    });
  }

  async verificarTokenMicrosoft(idToken: string) {
    return new Promise<{ email: string; nombre: string }>((resolve, reject) => {
      jwt.verify(
        idToken,
        (header, callback) => this.obtenerLlaveFirmaMicrosoft(header, callback),
        {
          audience: process.env.MICROSOFT_CLIENT_ID,
          issuer: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}/v2.0`,
        },
        (err, decoded: any) => {
          if (err || !decoded) {
            return reject(new UnauthorizedException('Token de autenticación de Microsoft inválido o expirado.'));
          }

          const emailCrudo = decoded.email || decoded.preferred_username;
          if (!emailCrudo) {
            return reject(new UnauthorizedException('El token de Microsoft no contiene un correo electrónico válido.'));
          }

          try {
            const email = emailCrudo.toLowerCase();
            this.validarDominioCorporativo(email);
            resolve({ email, nombre: decoded.name || email.split('@')[0] });
          } catch (domainError) {
            reject(domainError);
          }
        },
      );
    });
  }

  async loginSSO(idToken: string, proveedor: string = 'GOOGLE') {
    let emailSeguro: string;
    let nombreSeguro: string;

    if (proveedor === 'GOOGLE') {
      const datos = await this.verificarTokenGoogle(idToken);
      emailSeguro = datos.email;
      nombreSeguro = datos.nombre;
    } else if (proveedor === 'MICROSOFT') {
      const datos = await this.verificarTokenMicrosoft(idToken);
      emailSeguro = datos.email;
      nombreSeguro = datos.nombre;
    } else {
      throw new UnauthorizedException('Proveedor de autenticación no soportado.');
    }

    const usuario = await this.usuariosService.findOrCreateSSOUser({
      email: emailSeguro,
      nombre: nombreSeguro,
      proveedor_auth: proveedor,
    });

    // 🛡️ CORRECCIÓN 2: Le garantizamos a TypeScript que 'usuario' NO es nulo
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
        activo: usuario.activo,   // 👈 nueva línea
        esPendiente: rolesCompania.length === 0,
        rolesCompania,
      },
    };
  }

 // 🟢 ATAJO DE DESARROLLO: Genera token con payload completo para JwtStrategy
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

  // 👇 Transformamos la forma "cruda" de Prisma (usuario_roles_compania / roles / companias)
  //    a la forma que el frontend espera (roles / rol / compania), para no depender
  //    de que el frontend adivine el nombre exacto de cada relación.
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
      activo: usuario.activo,   // 👈 nueva línea
      roles: rolesFormateados, // 👈 ahora sí viaja al frontend
    },
  };
}
}
