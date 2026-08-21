import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import axiosClient from '../api/axiosClient';
import type { Usuario, AuthResponse } from './types';

interface AuthContextType {
  usuario: Usuario | null;
  token: string | null;
  cargando: boolean;
  loginDev: (usuarioId: number) => Promise<void>;
  logout: () => void;
  tieneRol: (codigoRol: string, companiaId?: number | null) => boolean;
  esAdminGlobal: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Lee y valida el usuario guardado ANTES de que el componente termine de crearse,
// para que nunca exista un instante donde otros componentes vean "usuario: null"
// por error, solo porque todavía no había dado tiempo de restaurarlo.
function leerUsuarioGuardado(): Usuario | null {
  const usuarioGuardado = localStorage.getItem('usuario');
  if (!usuarioGuardado) return null;
  try {
    return JSON.parse(usuarioGuardado);
  } catch {
    // Datos corruptos en localStorage: los limpiamos y seguimos como si no hubiera sesión
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(leerUsuarioGuardado);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [cargando, setCargando] = useState<boolean>(false);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setToken(null);
    setUsuario(null);
  };

  const loginDev = async (usuarioId: number) => {
    const response = await axiosClient.post<AuthResponse>('/auth/login-dev', { usuarioId });
    const { access_token, usuario } = response.data;

    localStorage.setItem('token', access_token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    setToken(access_token);
    setUsuario(usuario);
  };

  const MODO_MULTICOMPANIA_ACTIVO = false;

  const tieneRol = (codigoRol: string): boolean => {
    if (!usuario) return false;
    const listaRoles = usuario.roles || (usuario as any).usuario_roles_compania || [];
    if (!Array.isArray(listaRoles) || listaRoles.length === 0) return false;

    const objetivo = codigoRol.trim().toUpperCase();

    return listaRoles.some((item: any) => {
      if (!item) return false;
      const codigo = (item.rol?.codigo || item.roles?.codigo || item.codigo || '').toUpperCase();
      return codigo === objetivo; // 👈 comparación exacta, nada de includes()
    });
  };

  const esAdminGlobal = (): boolean => {
    return tieneRol('ADMIN');
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        cargando,
        loginDev,
        logout,
        tieneRol,
        esAdminGlobal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};