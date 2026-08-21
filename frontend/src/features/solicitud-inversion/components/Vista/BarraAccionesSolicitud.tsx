import { Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';

interface Props {
  puedeEditarBorrador?: boolean;
  puedeEnviarARevision: boolean;
  puedeAprobarORechazar: boolean;
  puedeCancelar: boolean;
  procesando: boolean;
  onEditar?: () => void;
  onEnviar: () => void;
  onAprobar: () => void;
  onAbrirRechazo: () => void;
  onAbrirCancelacion: () => void;
}

export function BarraAccionesSolicitud({
  puedeEditarBorrador, puedeEnviarARevision, puedeAprobarORechazar, puedeCancelar, procesando,
  onEditar, onEnviar, onAprobar, onAbrirRechazo, onAbrirCancelacion,
}: Props) {
  // Si ninguna acción está permitida, ocultamos la barra por completo
  if (!puedeEditarBorrador && !puedeEnviarARevision && !puedeAprobarORechazar && !puedeCancelar) return null;

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', marginTop: 2 }}>
      
      {/* Botón de Editar Solicitud (Visible si está en Borrador) */}
      {puedeEditarBorrador && (
        <Button 
          variant="outlined" 
          color="primary" 
          startIcon={<EditIcon />} 
          onClick={onEditar} 
          disabled={procesando}
        >
          Editar Solicitud
        </Button>
      )}

      {puedeEnviarARevision && (
        <Button 
          variant="contained" 
          color="secondary" 
          endIcon={<SendIcon />} 
          onClick={onEnviar} 
          disabled={procesando}
        >
          Enviar a Revisión
        </Button>
      )}

      {puedeAprobarORechazar && (
        <>
          <Button variant="contained" color="success" onClick={onAprobar} disabled={procesando}>
            Aprobar
          </Button>
          <Button variant="outlined" color="error" onClick={onAbrirRechazo} disabled={procesando}>
            Rechazar
          </Button>
        </>
      )}

      {puedeCancelar && (
        <Button variant="outlined" color="error" onClick={onAbrirCancelacion} disabled={procesando}>
          Cancelar Definitivamente
        </Button>
      )}
    </Box>
  );
}