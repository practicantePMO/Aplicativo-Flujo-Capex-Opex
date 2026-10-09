import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { act, screen, waitFor } from '@testing-library/react';
import { MicrosoftLoginButton } from '../../auth/MicrosoftLoginButton';
import { GoogleLoginButton } from '../../auth/GoogleLoginButton';
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

  it('no aparece sin configuración', () => {
    vi.stubEnv('VITE_MICROSOFT_CLIENT_ID', '');
    renderizarCon(null, <MicrosoftLoginButton />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('inicia sesión, ignora la cancelación y muestra los errores', async () => {
    responder('POST', '/auth/login-sso', 201, respuestaLogin);
    msal.loginPopup.mockResolvedValueOnce({ idToken: 'token-ms' });
    const { usuario } = renderizarCon(null, <MicrosoftLoginButton />);
    await usuario.click(screen.getByRole('button', { name: /Iniciar sesión con Microsoft/ }));
    await waitFor(() => expect(peticiones.at(-1)?.cuerpo).toEqual({ idToken: 'token-ms', proveedor: 'MICROSOFT' }));

    msal.loginPopup.mockRejectedValueOnce(new msal.BrowserAuthError('user_cancelled'));
    await usuario.click(screen.getByRole('button', { name: /Iniciar sesión con Microsoft/ }));
    await waitFor(() => expect(screen.getByRole('button', { name: /Iniciar sesión con Microsoft/ })).toBeEnabled());
    expect(screen.queryByText(/No se pudo iniciar sesión/)).not.toBeInTheDocument();

    msal.loginPopup.mockRejectedValueOnce(new Error('popup bloqueado'));
    await usuario.click(screen.getByRole('button', { name: /Iniciar sesión con Microsoft/ }));
    expect(await screen.findByText(/No se pudo iniciar sesión con Microsoft/)).toBeInTheDocument();

    msal.loginPopup.mockResolvedValueOnce({ idToken: 'token-ms' });
    responder('POST', '/auth/login-sso', 403, { message: 'Dominio no permitido' });
    await usuario.click(screen.getByRole('button', { name: /Iniciar sesión con Microsoft/ }));
    expect(await screen.findByText('Dominio no permitido')).toBeInTheDocument();
    expect(msal.initialize).toHaveBeenCalledTimes(1);
  });
});

describe('Botón de Google', () => {
  afterEach(() => {
    delete window.google;
    document.head.querySelectorAll('script').forEach((s) => s.remove());
  });

  function simularGoogle() {
    const google = {
      callback: undefined as undefined | ((r: { credential: string }) => Promise<void>),
      renderButton: vi.fn(),
    };
    window.google = {
      accounts: {
        id: {
          initialize: (config) => {
            google.callback = config.callback as typeof google.callback;
          },
          renderButton: google.renderButton,
        },
      },
    };
    return google;
  }

  it('no aparece sin configuración', () => {
    renderizarCon(null, <GoogleLoginButton />);
    expect(document.querySelector('script')).toBeNull();
  });

  it('dibuja el botón e inicia sesión con la credencial', async () => {
    vi.stubEnv('VITE_GOOGLE_CLIENT_ID', 'google-id');
    const google = simularGoogle();
    responder('POST', '/auth/login-sso', 201, respuestaLogin);
    renderizarCon(null, <GoogleLoginButton />);
    await waitFor(() => expect(google.renderButton).toHaveBeenCalled());
    await act(async () => {
      await google.callback?.({ credential: 'cred' });
    });
    expect(peticiones.at(-1)?.cuerpo).toEqual({ idToken: 'cred', proveedor: 'GOOGLE' });
    responder('POST', '/auth/login-sso', 403, {});
    await act(async () => {
      await google.callback?.({ credential: 'cred' });
    });
    expect(screen.getByText(/No se pudo iniciar sesión con Google/)).toBeInTheDocument();
  });

  it('carga el script de Google y avisa si falla', async () => {
    vi.stubEnv('VITE_GOOGLE_CLIENT_ID', 'google-id');
    const { unmount } = renderizarCon(null, <GoogleLoginButton />);
    const script = document.querySelector('script') as HTMLScriptElement;
    expect(script.src).toContain('accounts.google.com');
    act(() => {
      script.onerror?.(new Event('error'));
    });
    expect(await screen.findByText(/No se pudo cargar el botón de Google/)).toBeInTheDocument();
    unmount();

    // Con el script ya en la página, espera su evento "load".
    const google = simularGoogle();
    const guardado = window.google;
    delete window.google;
    renderizarCon(null, <GoogleLoginButton />);
    window.google = guardado;
    act(() => {
      script.dispatchEvent(new Event('load'));
    });
    await waitFor(() => expect(google.renderButton).toHaveBeenCalled());
  });
});
