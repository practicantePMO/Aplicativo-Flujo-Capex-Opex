import { describe, it, expect, vi } from 'vitest';
import { act, renderHook, screen, waitFor } from '@testing-library/react';
import { AxiosError, AxiosHeaders } from 'axios';
import { mensajeDelBackend } from '../../utils/errores';
import { useClavesFilas } from '../../hooks/useClavesFilas';
import axiosClient, { EVENTO_AVISO, EVENTO_SESION_INVALIDA } from '../../api/axiosClient';
import { responder, peticiones, iniciarSesionComo } from '../apiFalsa';
import { renderizarCon } from '../renderizar';
import { useAuth } from '../../auth/AuthContext';
import { useNotificaciones } from '../../notificaciones/useNotificaciones';
import { descargarBackupExcel } from '../../features/backup/services/backup.service';

function errorAxios(data: unknown) {
  const config = { headers: new AxiosHeaders() };
  return new AxiosError('fallo', 'ERR', config, null, { data, status: 400, statusText: '', headers: {}, config });
}

describe('mensajeDelBackend', () => {
  it('devuelve el mensaje del backend o undefined', () => {
    expect(mensajeDelBackend(new Error('x'))).toBeUndefined();
    expect(mensajeDelBackend(errorAxios({}))).toBeUndefined();
    expect(mensajeDelBackend(errorAxios({ message: 'Sin acceso' }))).toBe('Sin acceso');
    expect(mensajeDelBackend(errorAxios({ message: ['a', 'b'] }))).toBe('a,b');
  });
});

describe('useClavesFilas', () => {
  it('mantiene claves estables al agregar y quitar filas', () => {
    const { result, rerender } = renderHook(({ n }) => useClavesFilas(n), { initialProps: { n: 2 } });
    const [a, b] = result.current.claves;
    rerender({ n: 3 });
    expect(result.current.claves.slice(0, 2)).toEqual([a, b]);
    act(() => result.current.quitarClave(0));
    rerender({ n: 2 });
    expect(result.current.claves[0]).toBe(b);
    rerender({ n: 1 });
    expect(result.current.claves).toEqual([b]);
  });
});

describe('axiosClient', () => {
  it('avisa la sesión inválida en un 401 y el conflicto en un 409', async () => {
    const sesion = vi.fn();
    const aviso = vi.fn();
    window.addEventListener(EVENTO_SESION_INVALIDA, sesion);
    window.addEventListener(EVENTO_AVISO, aviso);
    responder('GET', '/x', 401, { message: 'Token vencido' });
    responder('GET', '/y', 409);
    responder('GET', '/z', 401);
    responder('POST', '/auth/login-dev', 401);
    await expect(axiosClient.get('/x')).rejects.toThrow();
    await expect(axiosClient.get('/y')).rejects.toThrow();
    await expect(axiosClient.get('/z')).rejects.toThrow();
    await expect(axiosClient.post('/auth/login-dev')).rejects.toThrow();
    expect(sesion).toHaveBeenCalledTimes(2);
    expect(aviso).toHaveBeenCalledTimes(1);
    window.removeEventListener(EVENTO_SESION_INVALIDA, sesion);
    window.removeEventListener(EVENTO_AVISO, aviso);
  });

  it('no envía Authorization sin token', async () => {
    await axiosClient.get('/companias');
    expect(peticiones.at(-1)?.url).toBe('/companias');
  });
});

describe('descargarBackupExcel', () => {
  it('descarga el archivo', async () => {
    const crear = vi.fn(() => 'blob:x');
    const revocar = vi.fn();
    Object.assign(window.URL, { createObjectURL: crear, revokeObjectURL: revocar });
    const clic = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined);
    iniciarSesionComo('admin');
    await descargarBackupExcel();
    expect(crear).toHaveBeenCalled();
    expect(revocar).toHaveBeenCalledWith('blob:x');
    clic.mockRestore();
  });
});

function SondaAuth() {
  const { usuario, tieneRol, esAdminGlobal, loginSSO, loginDev, logout, sesionExpirada } = useAuth();
  const { avisar, confirmar } = useNotificaciones();
  return (
    <div>
      <span>usuario:{usuario?.nombre ?? 'ninguno'}</span>
      <span>activo:{String(usuario?.activo)}</span>
      <span>expirada:{String(sesionExpirada)}</span>
      <span>pm:{String(tieneRol(' pm '))}</span>
      <span>admin:{String(esAdminGlobal())}</span>
      <button onClick={() => loginSSO('tok', 'MICROSOFT')}>sso</button>
      <button onClick={() => loginSSO('tok')}>sso-google</button>
      <button onClick={() => loginDev(1)}>dev</button>
      <button onClick={logout}>salir</button>
      <button onClick={() => avisar('Hola aviso', 'success')}>avisar</button>
      <button onClick={async () => avisar(String(await confirmar('¿Seguro?')), 'info')}>confirmar</button>
    </div>
  );
}

describe('AuthProvider y NotificacionesProvider', () => {
  it('inicia sesión con SSO normalizando los roles', async () => {
    responder('POST', '/auth/login-sso', 201, {
      access_token: 'pm',
      usuario: {
        id: 2,
        nombre: 'Laura SSO',
        email: 'l@x.com',
        rolesCompania: [
          { rolCodigo: 'PM', rolNombre: 'PM', companiaId: 1, companiaNombre: 'Galletas' },
          { rolCodigo: 'PMO', rolNombre: 'PMO' },
        ],
      },
    });
    const { usuario } = renderizarCon(null, <SondaAuth />);
    expect(screen.getByText('usuario:ninguno')).toBeInTheDocument();
    expect(screen.getByText('pm:false')).toBeInTheDocument();
    await usuario.click(screen.getByText('sso'));
    expect(await screen.findByText('usuario:Laura SSO')).toBeInTheDocument();
    expect(screen.getByText('pm:true')).toBeInTheDocument();
    expect(peticiones.at(-1)?.cuerpo).toEqual({ idToken: 'tok', proveedor: 'MICROSOFT' });
    await usuario.click(screen.getByText('sso-google'));
    await waitFor(() => expect(peticiones.at(-1)?.cuerpo).toEqual({ idToken: 'tok', proveedor: 'GOOGLE' }));
    responder('POST', '/auth/login-sso', 201, { access_token: 'x', usuario: { id: 9, nombre: 'Sin roles', email: 'e' } });
    await usuario.click(screen.getByText('sso-google'));
    expect(await screen.findByText('usuario:Sin roles')).toBeInTheDocument();
    expect(screen.getByText('pm:false')).toBeInTheDocument();
  });

  it('inicia sesión de desarrollo y la cierra', async () => {
    const { usuario } = renderizarCon(null, <SondaAuth />);
    await usuario.click(screen.getByText('dev'));
    expect(await screen.findByText('admin:true')).toBeInTheDocument();
    await usuario.click(screen.getByText('salir'));
    expect(screen.getByText('usuario:ninguno')).toBeInTheDocument();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('marca la cuenta desactivada o la sesión expirada según el 401', async () => {
    iniciarSesionComo('pm');
    renderizarCon(null, <SondaAuth />);
    expect(await screen.findByText('usuario:Laura PM')).toBeInTheDocument();
    act(() => {
      window.dispatchEvent(new CustomEvent(EVENTO_SESION_INVALIDA, { detail: { mensaje: 'Cuenta DESACTIVADA' } }));
    });
    expect(screen.getByText('activo:false')).toBeInTheDocument();
    act(() => {
      window.dispatchEvent(new CustomEvent(EVENTO_SESION_INVALIDA, { detail: {} }));
    });
    expect(screen.getByText('expirada:true')).toBeInTheDocument();
    act(() => {
      window.dispatchEvent(new CustomEvent(EVENTO_SESION_INVALIDA, { detail: { mensaje: 'desactivada' } }));
    });
    expect(screen.getByText('usuario:ninguno')).toBeInTheDocument();
  });

  it('descarta un usuario guardado dañado y tolera errores de red en /auth/me', async () => {
    localStorage.setItem('token', 'pm');
    localStorage.setItem('usuario', '{dañado');
    responder('GET', '/auth/me', 500);
    renderizarCon(null, <SondaAuth />);
    expect(screen.getByText('usuario:ninguno')).toBeInTheDocument();
    expect(localStorage.getItem('token')).toBeNull();
    localStorage.setItem('token', 'pm');
    act(() => {
      window.dispatchEvent(new Event('focus'));
    });
    await waitFor(() => expect(peticiones.some((p) => p.url === '/auth/me')).toBe(true));
  });

  it('muestra avisos y confirmaciones', async () => {
    const { usuario } = renderizarCon(null, <SondaAuth />);
    await usuario.click(screen.getByText('avisar'));
    expect(await screen.findByText('Hola aviso')).toBeInTheDocument();
    await usuario.click(screen.getByText('confirmar'));
    expect(await screen.findByText('¿Seguro?')).toBeInTheDocument();
    await usuario.click(screen.getByRole('button', { name: 'Aceptar' }));
    expect(await screen.findByText('true')).toBeInTheDocument();
    await usuario.click(screen.getByText('confirmar'));
    await usuario.click(await screen.findByRole('button', { name: 'Cancelar' }));
    expect(await screen.findByText('false')).toBeInTheDocument();
    act(() => {
      window.dispatchEvent(new CustomEvent(EVENTO_AVISO, { detail: { mensaje: 'Desde axios', tipo: 'warning' } }));
    });
    expect(await screen.findByText('Desde axios')).toBeInTheDocument();
    act(() => {
      window.dispatchEvent(new CustomEvent(EVENTO_AVISO, { detail: { mensaje: 'Error por defecto' } }));
    });
    expect(await screen.findByText('Error por defecto')).toBeInTheDocument();
  });
});
