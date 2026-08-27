import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Alert, Typography } from '@mui/material';
import type { Usuario, RolDisponible, AsignarRolDto } from '../types/usuario.types';
import type { Compania } from '../../proyectos/types/proyecto.types';
import { asignarRol } from '../services/usuarios.service';

interface Props {
  usuario: Usuario | null;
  roles: RolDisponible[];
  companias: Compania[];
  onClose: () => void;
  onAsignado: () => void;
}

const GLOBAL = 'GLOBAL';

export function DialogoAsignarRol({ usuario, roles, companias, onClose, onAsignado }: Props) {
  const [rolId, setRolId] = useState('');
  const [companiaId, setCompaniaId] = useState(GLOBAL); // GLOBAL = todas las compañías
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  if (!usuario) return null;

  const confirmar = async () => {
    setError(null);
    if (!rolId) {
      setError('Selecciona un rol.');
      return;
    }

    const dto: AsignarRolDto = {
      usuario_id: usuario.id,
      rol_id: Number(rolId),
      compania_id: companiaId === GLOBAL ? undefined : Number(companiaId),
    };

    setEnviando(true);
    try {
      await asignarRol(dto);
      setRolId('');
      setCompaniaId(GLOBAL);
      onAsignado();
    } catch (e: any) {
      setError(e.response?.data?.message || 'Error al asignar el rol.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Dialog open={!!usuario} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Asignar rol a {usuario.nombre}</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField
          select fullWidth label="Rol" value={rolId} onChange={(e) => setRolId(e.target.value)}
          sx={{ mt: 1, mb: 2 }}
        >
          {roles.map((r) => <MenuItem key={r.id} value={r.id}>{r.nombre}</MenuItem>)}
        </TextField>

        <TextField
          select fullWidth label="Compañía" value={companiaId} onChange={(e) => setCompaniaId(e.target.value)}
        >
          <MenuItem value={GLOBAL}>Global (todas las compañías)</MenuItem>
          {companias.map((c) => <MenuItem key={c.id} value={String(c.id)}>{c.nombre}</MenuItem>)}
        </TextField>

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
          Si dejas "Global", este rol aplicará para todas las compañías. Elige una compañía puntual
          solo si quieres limitar este rol a esa compañía específicamente.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" color="secondary" onClick={confirmar} disabled={enviando}>
          Asignar rol
        </Button>
      </DialogActions>
    </Dialog>
  );
}