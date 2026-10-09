import type { Request } from 'express';

// Rol de un usuario en una compañía, tal como viaja dentro del token.
export interface RolCompaniaToken {
  companiaId?: number;
  companiaNombre?: string;
  rolCodigo?: string;
  rolNombre?: string;
}

// Contenido (payload) del JWT que firma AuthService.
// nombre y rolesCompania son opcionales porque el token de login-dev no los incluye.
export interface JwtPayload {
  sub: number;
  email: string;
  nombre?: string;
  rolesCompania?: RolCompaniaToken[];
}

// Lo que JwtStrategy.validate() devuelve y Passport guarda en req.user.
export interface UsuarioAutenticado {
  userId: number;
  email: string;
  nombre?: string;
  rolesCompania?: RolCompaniaToken[];
}

// Petición HTTP de una ruta protegida con JwtAuthGuard.
export interface RequestConUsuario extends Request {
  user: UsuarioAutenticado;
}