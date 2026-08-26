import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useAuth } from './AuthContext';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          renderButton: (parent: HTMLElement, options: Record<string, unknown>) => void;
        };
      };
    };
  }
}

const GOOGLE_SCRIPT_SRC = 'https://accounts.google.com/gsi/client';

function cargarScriptGoogle(): Promise<void> {
  if (window.google?.accounts?.id) return Promise.resolve();

  const existente = document.querySelector<HTMLScriptElement>(`script[src="${GOOGLE_SCRIPT_SRC}"]`);
  if (existente) {
    return new Promise((resolve) => existente.addEventListener('load', () => resolve()));
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = GOOGLE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('No se pudo cargar el script de Google Identity Services.'));
    document.head.appendChild(script);
  });
}

export function GoogleLoginButton() {
  const { loginSSO } = useAuth();
  const contenedorRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

  useEffect(() => {
    if (!clientId || !contenedorRef.current) return;

    let cancelado = false;

    cargarScriptGoogle()
      .then(() => {
        if (cancelado || !window.google || !contenedorRef.current) return;

        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async (response) => {
            try {
              await loginSSO(response.credential, 'GOOGLE');
            } catch (err: any) {
              const mensaje =
                err?.response?.data?.message || 'No se pudo iniciar sesión con Google. Verifica el dominio permitido.';
              setError(mensaje);
            }
          },
        });

        window.google.accounts.id.renderButton(contenedorRef.current, {
          theme: 'outline',
          size: 'large',
          text: 'signin_with',
          width: 280,
        });
      })
      .catch(() => setError('No se pudo cargar el botón de Google. Revisa tu conexión a internet.'));

    return () => {
      cancelado = true;
    };
  }, [clientId, loginSSO]);

  if (!clientId) return null;

  return (
    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
      <div ref={contenedorRef} />
      {error && (
        <Typography variant="caption" color="error">
          {error}
        </Typography>
      )}
    </Box>
  );
}