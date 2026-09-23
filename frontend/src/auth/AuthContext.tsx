import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import axiosClient, { EVENTO_SESION_INVALIDA } from '../api/axiosClient';
import type { Usuario, AuthResponse } from './types';

interface AuthContextType {
  usuario: Usuario | null;
  token: string | null;
  cargando: boolean;
  // true cuando la sesión se cerró sola porque el token venció o dejó de ser válido
  sesionExpirada: boolean;
  loginDev: (usuarioId: number) => Promise<void>;
  loginSSO: (idToken: string, proveedor?: 'GOOGLE' | 'MICROSOFT') => Promise<void>;
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
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(leerUsuarioGuardado);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [cargando] = useState<boolean>(false);
  const [sesionExpirada, setSesionExpirada] = useState(false);

  const guardarUsuario = (nuevo: Usuario) => {
    localStorage.setItem('usuario', JSON.stringify(nuevo));
    setUsuario(nuevo);
  };

  const cerrarSesion = useCallback((porExpiracion: boolean) => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setToken(null);
    setUsuario(null);
    setSesionExpirada(porExpiracion);
  }, []);

  const logout = () => cerrarSesion(false);

  // Trae del backend el perfil ACTUAL (roles al día). Si el token ya no
  // sirve, el interceptor de axios dispara el evento y se cierra la sesión.
  const refrescarUsuario = useCallback(async () => {
    if (!localStorage.getItem('token')) return;
    try {
      const { data } = await axiosClient.get<Usuario>('/auth/me');
      guardarUsuario(data);
    } catch {
      // El 401 lo maneja el listener de abajo; otros errores (red caída,
      // backend reiniciando) no deben sacar al usuario de la app.
    }
  }, []);

  // El backend rechazó la sesión (401).
  useEffect(() => {
    const manejarSesionInvalida = (evento: Event) => {
      const mensaje = ((evento as CustomEvent).detail?.mensaje || '').toLowerCase();
      if (mensaje.includes('desactivada')) {
        // Mostramos la pantalla de "acceso desactivado" en vez de cerrar sesión.
        setUsuario((actual) => {
          if (!actual) return actual;
          const desactivado = { ...actual, activo: false };
          localStorage.setItem('usuario', JSON.stringify(desactivado));
          return desactivado;
        });
      } else {
        cerrarSesion(true);
      }
    };
    window.addEventListener(EVENTO_SESION_INVALIDA, manejarSesionInvalida);
    return () => window.removeEventListener(EVENTO_SESION_INVALIDA, manejarSesionInvalida);
  }, [cerrarSesion]);

  // Al abrir la app y cada vez que el usuario vuelve a esta pestaña,
  // verificamos la sesión y actualizamos los roles.
  useEffect(() => {
    refrescarUsuario();
    window.addEventListener('focus', refrescarUsuario);
    return () => window.removeEventListener('focus', refrescarUsuario);
  }, [refrescarUsuario]);

  const loginDev = async (usuarioId: number) => {
    const response = await axiosClient.post<AuthResponse>('/auth/login-dev', { usuarioId });
    const { access_token, usuario } = response.data;

    localStorage.setItem('token', access_token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    setToken(access_token);
    setUsuario(usuario);
    setSesionExpirada(false);
  };

  // Login vía SSO — el backend ya valida el idToken y el dominio
  // corporativo; acá solo guardamos la sesión resultante.
  const loginSSO = async (idToken: string, proveedor: 'GOOGLE' | 'MICROSOFT' = 'GOOGLE') => {
    const response = await axiosClient.post<AuthResponse>('/auth/login-sso', { idToken, proveedor });
    const { access_token, usuario } = response.data;

    const rolesNormalizados = ((usuario as any).rolesCompania || []).map((rc: any) => ({
      rol: { codigo: rc.rolCodigo, nombre: rc.rolNombre },
      compania: rc.companiaId ? { id: rc.companiaId, nombre: rc.companiaNombre } : null,
    }));
    const usuarioNormalizado = { ...usuario, roles: rolesNormalizados };

    localStorage.setItem('token', access_token);
    localStorage.setItem('usuario', JSON.stringify(usuarioNormalizado));

    setToken(access_token);
    setUsuario(usuarioNormalizado);
    setSesionExpirada(false);
  };

  const tieneRol = (codigoRol: string): boolean => {
    if (!usuario) return false;
    const listaRoles = usuario.roles || (usuario as any).usuario_roles_compania || [];
    if (!Array.isArray(listaRoles) || listaRoles.length === 0) return false;

    const objetivo = codigoRol.trim().toUpperCase();

    return listaRoles.some((item: any) => {
      if (!item) return false;
      const codigo = (item.rol?.codigo || item.roles?.codigo || item.codigo || '').toUpperCase();
      return codigo === objetivo; 
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
        sesionExpirada,
        loginDev,
        loginSSO,
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