import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Alert } from '@mui/material';
import type { Proyecto } from '../types/proyecto.types';
import { aplazarProyecto } from '../services/proyectos.service';

interface Props {
  proyecto: Proyecto | null;
  onClose: () => void;
  onAplazado: () => void;
}

export function DialogoAplazarProyecto({ proyecto, onClose, onAplazado }: Props) {
  const [anioNuevo, setAnioNuevo] = useState('');
  const [motivo, setMotivo] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  if (!proyecto) return null;

  const confirmar = async () => {
    setError(null);
    const anio = Number(anioNuevo);
    if (!anio || anio < 2000) {
      setError('Ingresa un año válido.');
      return;
    }
    if (!motivo.trim()) {
      setError('El motivo del aplazamiento es obligatorio.');
      return;
    }

    setEnviando(true);
    try {
      await aplazarProyecto(proyecto.id, { anio_nuevo: anio, motivo });
      setAnioNuevo('');
      setMotivo('');
      onAplazado();
    } catch (e: any) {
      setError(e.response?.data?.message || 'Error al aplazar el proyecto.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Dialog open={!!proyecto} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Aplazar proyecto {proyecto.id}</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TextField
          label="Año actualmente asignado"
          value={proyecto.anio_asignado ?? proyecto.anio_proyecto ?? ''}
          fullWidth
          disabled
          sx={{ mt: 1, mb: 2 }}
        />
        <TextField
          label="Nuevo año" type="number" fullWidth
          value={anioNuevo} onChange={(e) => setAnioNuevo(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Motivo del aplazamiento (obligatorio)" multiline minRows={3} fullWidth
          value={motivo} onChange={(e) => setMotivo(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" color="secondary" onClick={confirmar} disabled={enviando}>
          Confirmar aplazamiento
        </Button>
      </DialogActions>
    </Dialog>
  );
}