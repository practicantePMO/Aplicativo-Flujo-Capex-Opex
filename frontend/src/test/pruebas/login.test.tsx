import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { MicrosoftLoginButton } from '../../auth/MicrosoftLoginButton';
import { autoridadMicrosoft } from '../../auth/autoridadMicrosoft';
import { peticiones, responder } from '../apiFalsa';
import { renderizarCon } from '../renderizar';

const msal = vi.hoisted(() => {
  class BrowserAuthError extends Error {
    errorCode: string;
    constructor(errorCode: string) {
      super(errorCode);
      this.errorCode = errorCode;
    }
  }
  return { loginPopup: vi.fn(), initialize: vi.fn(), BrowserAuthError };
});

vi.mock('@azure/msal-browser', () => ({
  BrowserAuthError: msal.BrowserAuthError,
  PublicClientApplication: class {
    initialize = msal.initialize;
    loginPopup = msal.loginPopup;
  },
}));

const respuestaLogin = {
  access_token: 'pm',
  usuario: { id: 2, nombre: 'Laura PM', email: 'l@empresa.com', rolesCompania: [{ rolCodigo: 'PM', rolNombre: 'PM' }] },
};

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('Botón de Microsoft', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_MICROSOFT_CLIENT_ID', 'cliente');
    vi.stubEnv('VITE_MICROSOFT_TENANT_ID', 'inquilino');
  });

  it('sin configuración muestra un aviso en lugar del botón', () => {
    vi.stubEnv('VITE_MICROSOFT_CLIENT_ID', '');
    renderizarCon(null, <MicrosoftLoginButton />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByText(/aún no está configurado/u)).toBeInTheDocument();
  });

  it('inicia sesión, ignora la cancelación y muestra los errores', async () => {
    responder('POST', '/auth/login-sso', 201, respuestaLogin);
    msal.loginPopup.mockResolvedValueOnce({ idToken: 'token-ms' });
    const { usuario } = renderizarCon(null, <MicrosoftLoginButton />);
    await usuario.click(screen.getByRole('button', { name: /Iniciar sesión con Microsoft/u }));
    await waitFor(() => expect(peticiones.at(-1)?.cuerpo).toEqual({ idToken: 'token-ms', proveedor: 'MICROSOFT' }));

    msal.loginPopup.mockRejectedValueOnce(new msal.BrowserAuthError('user_cancelled'));
    await usuario.click(screen.getByRole('button', { name: /Iniciar sesión con Microsoft/u }));
    await waitFor(() => expect(screen.getByRole('button', { name: /Iniciar sesión con Microsoft/u })).toBeEnabled());
    expect(screen.queryByText(/No se pudo iniciar sesión/u)).not.toBeInTheDocument();

    msal.loginPopup.mockRejectedValueOnce(new Error('popup bloqueado'));
    await usuario.click(screen.getByRole('button', { name: /Iniciar sesión con Microsoft/u }));
    expect(await screen.findByText(/No se pudo iniciar sesión con Microsoft/u)).toBeInTheDocument();

    msal.loginPopup.mockResolvedValueOnce({ idToken: 'token-ms' });
    responder('POST', '/auth/login-sso', 403, { message: 'Dominio no permitido' });
    await usuario.click(screen.getByRole('button', { name: /Iniciar sesión con Microsoft/u }));
    expect(await screen.findByText('Dominio no permitido')).toBeInTheDocument();
    expect(msal.initialize).toHaveBeenCalledTimes(1);
  });
});

describe('Autoridad de Microsoft', () => {
  it('usa el inquilino, o "organizations" si hay varios', () => {
    expect(autoridadMicrosoft(' inquilino ')).toBe('https://login.microsoftonline.com/inquilino');
    expect(autoridadMicrosoft('inquilino-1,inquilino-2')).toBe('https://login.microsoftonline.com/organizations');
  });
});
