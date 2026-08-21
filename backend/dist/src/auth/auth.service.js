"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const usuarios_service_1 = require("../usuarios/usuarios.service");
const google_auth_library_1 = require("google-auth-library");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt = __importStar(require("jsonwebtoken"));
const jwks_rsa_1 = __importDefault(require("jwks-rsa"));
let AuthService = class AuthService {
    usuariosService;
    jwtService;
    prisma;
    googleClient = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    microsoftJwksClient = (0, jwks_rsa_1.default)({
        jwksUri: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}/discovery/v2.0/keys`,
    });
    constructor(usuariosService, jwtService, prisma) {
        this.usuariosService = usuariosService;
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    validarDominioCorporativo(email) {
        const dominioPermitido = process.env.ALLOWED_EMAIL_DOMAIN;
        if (!dominioPermitido) {
            throw new Error('🛑 Falta configurar ALLOWED_EMAIL_DOMAIN en el archivo .env');
        }
        if (!email.toLowerCase().endsWith(`@${dominioPermitido}`)) {
            throw new common_1.UnauthorizedException(`Acceso denegado: Solo se permiten correos corporativos con el dominio @${dominioPermitido}.`);
        }
    }
    async verificarTokenGoogle(idToken) {
        try {
            const ticket = await this.googleClient.verifyIdToken({
                idToken,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            if (!payload || !payload.email) {
                throw new common_1.UnauthorizedException('El token de Google no contiene un correo electrónico válido.');
            }
            const email = payload.email.toLowerCase();
            this.validarDominioCorporativo(email);
            return { email, nombre: payload.name || email.split('@')[0] };
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException)
                throw error;
            throw new common_1.UnauthorizedException('Token de autenticación de Google inválido o expirado.');
        }
    }
    obtenerLlaveFirmaMicrosoft(header, callback) {
        this.microsoftJwksClient.getSigningKey(header.kid, (err, key) => {
            if (err || !key) {
                return callback(err || new Error('No se pudo obtener la llave de firma de Microsoft'));
            }
            callback(null, key.getPublicKey());
        });
    }
    async verificarTokenMicrosoft(idToken) {
        return new Promise((resolve, reject) => {
            jwt.verify(idToken, (header, callback) => this.obtenerLlaveFirmaMicrosoft(header, callback), {
                audience: process.env.MICROSOFT_CLIENT_ID,
                issuer: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}/v2.0`,
            }, (err, decoded) => {
                if (err || !decoded) {
                    return reject(new common_1.UnauthorizedException('Token de autenticación de Microsoft inválido o expirado.'));
                }
                const emailCrudo = decoded.email || decoded.preferred_username;
                if (!emailCrudo) {
                    return reject(new common_1.UnauthorizedException('El token de Microsoft no contiene un correo electrónico válido.'));
                }
                try {
                    const email = emailCrudo.toLowerCase();
                    this.validarDominioCorporativo(email);
                    resolve({ email, nombre: decoded.name || email.split('@')[0] });
                }
                catch (domainError) {
                    reject(domainError);
                }
            });
        });
    }
    async loginSSO(idToken, proveedor = 'GOOGLE') {
        let emailSeguro;
        let nombreSeguro;
        if (proveedor === 'GOOGLE') {
            const datos = await this.verificarTokenGoogle(idToken);
            emailSeguro = datos.email;
            nombreSeguro = datos.nombre;
        }
        else if (proveedor === 'MICROSOFT') {
            const datos = await this.verificarTokenMicrosoft(idToken);
            emailSeguro = datos.email;
            nombreSeguro = datos.nombre;
        }
        else {
            throw new common_1.UnauthorizedException('Proveedor de autenticación no soportado.');
        }
        const usuario = await this.usuariosService.findOrCreateSSOUser({
            email: emailSeguro,
            nombre: nombreSeguro,
            proveedor_auth: proveedor,
        });
        if (!usuario) {
            throw new common_1.UnauthorizedException('No se pudo registrar ni verificar la información del usuario.');
        }
        const rolesCompania = usuario.usuario_roles_compania?.map((urc) => ({
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
                esPendiente: rolesCompania.length === 0,
                rolesCompania,
            },
        };
    }
    async loginDev(usuarioId) {
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
            throw new common_1.NotFoundException('Usuario de prueba no encontrado. Verifica que el seed de usuarios ya se corrió.');
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
                roles: rolesFormateados,
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService,
        jwt_1.JwtService,
        prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map