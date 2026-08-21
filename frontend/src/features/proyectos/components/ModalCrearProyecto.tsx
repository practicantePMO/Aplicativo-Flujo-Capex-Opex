import { useState, useEffect, type FormEvent } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Alert,
  CircularProgress,
} from '@mui/material';
import type { Compania, CrearProyectoDto } from '../types/proyecto.types';
import { obtenerCompanias } from '../services/proyectos.service';
import { obtenerUsuarios } from '../../usuarios/services/usuarios.service';
import { useAuth } from '../../../auth/AuthContext';

interface ModalCrearProyectoProps {
  open: boolean;
  onClose: () => void;
  onProyectoCreado: () => void;
  onGuardar: (datos: CrearProyectoDto) => Promise<void>;
}

interface PmDisponible {
  id: number;
  nombre: string;
  email: string;
}

export function ModalCrearProyecto({ open, onClose, onProyectoCreado, onGuardar }: ModalCrearProyectoProps) {
  const [nombre, setNombre] = useState('');
  const [companiaId, setCompaniaId] = useState<number | ''>('');
  const [fechaProyecto, setFechaProyecto] = useState(new Date().toISOString().split('T')[0]);
  const [pmAsignadoId, setPmAsignadoId] = useState<number | ''>('');
  const [companias, setCompanias] = useState<Compania[]>([]);
  const [pmsDisponibles, setPmsDisponibles] = useState<PmDisponible[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { usuario, tieneRol } = useAuth();

  // Solo un PMO/ADMIN puede asignarle el proyecto a otro PM al crearlo
  const puedeAsignarAOtroPm = tieneRol('PMO') || tieneRol('ADMIN');

  useEffect(() => {
    if (open) {
      cargarCompanias();
      if (puedeAsignarAOtroPm) cargarPms();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const cargarCompanias = async () => {
    try {
      const data = await obtenerCompanias();
      setCompanias(data);
      if (data.length > 0) setCompaniaId(data[0].id);
    } catch (error) {
      console.error('Error cargando compañías:', error);
      setCompanias([{ id: 1, nombre: 'Galletas' }]);
      setCompaniaId(1);
    }
  };

  const cargarPms = async () => {
    try {
      const data = await obtenerUsuarios();
      const soloPm = data.filter((u) => u.usuario_roles_compania.some((r) => r.roles?.codigo === 'PM'));
      setPmsDisponibles(soloPm.map((u) => ({ id: u.id, nombre: u.nombre, email: u.email })));
    } catch (error) {
      console.error('Error cargando la lista de PM:', error);
      setPmsDisponibles([]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !companiaId || !fechaProyecto) {
      setError('Por favor completa todos los campos obligatorios.');
      return;
    }

    try {
      setCargando(true);
      setError(null);
      await onGuardar({
        nombre: nombre.trim(),
        compania_id: Number(companiaId),
        fecha_proyecto: fechaProyecto,
        pm_asignado_id: pmAsignadoId ? Number(pmAsignadoId) : undefined,
      });
      setNombre('');
      setPmAsignadoId('');
      onProyectoCreado();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear el proyecto. Intenta nuevamente.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: styles.dialogPaper }}>
      <DialogTitle sx={styles.title}>Crear Nuevo Proyecto</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={styles.content}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            label="Nombre del Proyecto"
            fullWidth
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            sx={{ mb: 2.5 }}
          />

          <TextField
            select
            label="Compañía"
            fullWidth
            required
            value={companiaId}
            onChange={(e) => setCompaniaId(Number(e.target.value))}
            sx={{ mb: 2.5 }}
          >
            {companias.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.nombre}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Fecha del Proyecto"
            type="date"
            fullWidth
            required
            value={fechaProyecto}
            onChange={(e) => setFechaProyecto(e.target.value)}
            InputLabelProps={{ shrink: true }}
            helperText="El año seleccionado determinará el prefijo del ID (ej. 2026001)"
            sx={{ mb: puedeAsignarAOtroPm ? 2.5 : 0 }}
          />

          {puedeAsignarAOtroPm && (
            <TextField
              select
              label="Asignar a PM (opcional)"
              fullWidth
              value={pmAsignadoId}
              onChange={(e) => setPmAsignadoId(e.target.value ? Number(e.target.value) : '')}
              helperText={
                pmAsignadoId
                  ? 'El proyecto quedará como si ese PM lo hubiera creado (él tendrá el control total).'
                  : `Si lo dejas vacío, el proyecto queda a tu nombre (${usuario?.nombre}).`
              }
            >
              <MenuItem value="">— Ninguno (queda a mi nombre) —</MenuItem>
              {pmsDisponibles.map((pm) => (
                <MenuItem key={pm.id} value={pm.id}>
                  {pm.nombre} ({pm.email})
                </MenuItem>
              ))}
            </TextField>
          )}
        </DialogContent>

        <DialogActions sx={styles.actions}>
          <Button onClick={onClose} disabled={cargando} color="inherit">
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="secondary" disabled={cargando}>
            {cargando ? <CircularProgress size={24} color="inherit" /> : 'Crear Proyecto'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

const styles = {
  dialogPaper: { borderRadius: 3, p: 1 },
  title: { fontWeight: 700, color: '#0e381e', pb: 1 },
  content: { pt: 1 },
  actions: { px: 3, pb: 2 },
};