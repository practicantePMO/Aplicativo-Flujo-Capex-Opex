import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, Snackbar } from '@mui/material';
import { EVENTO_AVISO } from '../api/axiosClient';
import { NotificacionesContext, type TipoAviso } from './useNotificaciones';

export function NotificacionesProvider({ children }: { children: ReactNode }) {
  const [aviso, setAviso] = useState<{ mensaje: string; tipo: TipoAviso } | null>(null);
  const [preguntaConfirmacion, setPreguntaConfirmacion] = useState<string | null>(null);
  // Guarda la función que "responde" a quien llamó a confirmar()
  const responderConfirmacion = useRef<((acepto: boolean) => void) | null>(null);

  const avisar = useCallback((mensaje: string, tipo: TipoAviso = 'error') => {
    setAviso({ mensaje, tipo });
  }, []);

  const confirmar = useCallback((mensaje: string) => {
    setPreguntaConfirmacion(mensaje);
    return new Promise<boolean>((resolve) => {
      responderConfirmacion.current = resolve;
    });
  }, []);

  const cerrarConfirmacion = (acepto: boolean) => {
    responderConfirmacion.current?.(acepto);
    responderConfirmacion.current = null;
    setPreguntaConfirmacion(null);
  };

  // Avisos que llegan desde fuera de React (por ejemplo, desde axiosClient)
  useEffect(() => {
    const manejarAviso = (evento: Event) => {
      const { mensaje, tipo } = (evento as CustomEvent<{ mensaje: string; tipo?: TipoAviso }>).detail;
      avisar(mensaje, tipo);
    };
    window.addEventListener(EVENTO_AVISO, manejarAviso);
    return () => window.removeEventListener(EVENTO_AVISO, manejarAviso);
  }, [avisar]);

  return (
    <NotificacionesContext.Provider value={{ avisar, confirmar }}>
      {children}

      <Snackbar
        open={aviso !== null}
        autoHideDuration={6000}
        onClose={() => setAviso(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={aviso?.tipo ?? 'error'} variant="filled" onClose={() => setAviso(null)} sx={{ width: '100%' }}>
          {aviso?.mensaje}
        </Alert>
      </Snackbar>

      <Dialog open={preguntaConfirmacion !== null} onClose={() => cerrarConfirmacion(false)}>
        <DialogContent>
          <DialogContentText>{preguntaConfirmacion}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => cerrarConfirmacion(false)}>Cancelar</Button>
          <Button variant="contained" onClick={() => cerrarConfirmacion(true)} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </NotificacionesContext.Provider>
  );
}