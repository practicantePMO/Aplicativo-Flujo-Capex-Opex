import { useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { PublicClientApplication, BrowserAuthError } from '@azure/msal-browser';
import { useAuth } from './AuthContext';
import { mensajeDelBackend } from '../utils/errores';

// Logo de Microsoft (4 cuadros de colores).
function LogoMicrosoft() {
  return (
    <svg width="18" height="18" viewBox="0 0 21 21" aria-hidden="true">
      <rect x="1" y="1" width="9" height="9" fill="#f25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
      <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
    </svg>
  );
}

let clienteMsal: PublicClientApplication | null = null;

// Crea (una sola vez) el cliente de Microsoft (MSAL) con los datos de la app registrada en Azure.
async function obtenerClienteMsal(clientId: string, tenantId: string) {
  if (!clienteMsal) {
    clienteMsal = new PublicClientApplication({
      auth: {
        clientId,
        authority: `https://login.microsoftonline.com/${tenantId}`,
        // Página vacía donde Microsoft devuelve el resultado del popup (frontend/public/blank.html).
        redirectUri: `${window.location.origin}/blank.html`,
      },
      cache: { cacheLocation: 'sessionStorage' },
    });
    await clienteMsal.initialize();
  }
  return clienteMsal;
}

// Botón "Iniciar sesión con Microsoft". Abre el popup de Microsoft, obtiene el id_token
// y se lo envía al backend (/auth/login-sso con proveedor MICROSOFT), que lo valida.
// Solo aparece si están configuradas VITE_MICROSOFT_CLIENT_ID y VITE_MICROSOFT_TENANT_ID.
export function MicrosoftLoginButton() {
  const { loginSSO } = useAuth();
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clientId = import.meta.env.VITE_MICROSOFT_CLIENT_ID as string | undefined;
  const tenantId = import.meta.env.VITE_MICROSOFT_TENANT_ID as string | undefined;

  if (!clientId || !tenantId) return null;

  const iniciarSesion = async () => {
    setError(null);
    setCargando(true);
    try {
      const msal = await obtenerClienteMsal(clientId, tenantId);
      const respuesta = await msal.loginPopup({ scopes: ['openid', 'profile', 'email'], prompt: 'select_account' });
      await loginSSO(respuesta.idToken, 'MICROSOFT');
    } catch (err) {
      // Si la persona cerró el popup, no es un error que haya que mostrar.
      if (err instanceof BrowserAuthError && err.errorCode === 'user_cancelled') return;
      setError(mensajeDelBackend(err) || 'No se pudo iniciar sesión con Microsoft. Verifica que uses tu correo corporativo.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
      <Button
        variant="outlined"
        onClick={iniciarSesion}
        disabled={cargando}
        startIcon={cargando ? <CircularProgress size={18} /> : <LogoMicrosoft />}
        sx={{ width: 280, textTransform: 'none', color: '#1f2937', borderColor: '#cbd5e1', fontWeight: 600 }}
      >
        Iniciar sesión con Microsoft
      </Button>
      {error && (
        <Typography variant="caption" color="error">
          {error}
        </Typography>
      )}
    </Box>
  );
}
