import { useState, useEffect } from 'react';
import {
  Box, Typography, Button, TextField, MenuItem, RadioGroup, FormControlLabel, Radio,
  Alert, CircularProgress, Divider, Card, CardContent, IconButton, FormLabel, Autocomplete,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import type { CrearControlCambioPayload, AnexoControlCambio } from '../types/controlCambio.types';
import type { UsuarioActivo } from '../../solicitud-inversion/types/solicitud.types';
import { crearControlCambio, actualizarControlCambio, obtenerControlCambioDetalle, actualizarPartesInteresadasCc } from '../services/controlCambios.service';
import { obtenerPartesInteresadas } from '../../solicitud-inversion/services/solicitudInversion.service';

interface Props {
  proyectoId: string;
  companiaId: number;
  procesoId?: number; // si viene, es edición de un Borrador existente
  onCancelar: () => void;
  onGuardado: (procesoId: number) => void;
}

const TIPOS_ANEXO = [
  { value: 'DOCUMENTO', label: 'Documento (Word/PDF/Excel)' },
  { value: 'IMAGEN', label: 'Imagen / captura' },
  { value: 'COTIZACION', label: 'Cotización / proforma' },
  { value: 'CORREO', label: 'Correo / hilo de Teams' },
  { value: 'GRABACION', label: 'Grabación de reunión' },
  { value: 'TICKET', label: 'Ticket / tablero' },
  { value: 'ORDEN_INTERNA', label: 'Orden Interna relacionada' },
  { value: 'PLANO', label: 'Plano / diseño' },
  { value: 'OTRO', label: 'Otro' },
];

const CAMPO_VACIO: CrearControlCambioPayload = {
  proyecto_id: '',
  requiere_orden_interna: false,
  descripcion_cambio: '',
  antecedentes: '',
  justificacion: '',
  impacto_alcance: '',
  impacto_tiempo: '',
  anexos: [],
};

export function FormularioControlCambio({ proyectoId, companiaId, procesoId, onCancelar, onGuardado }: Props) {
  const [form, setForm] = useState<CrearControlCambioPayload>({ ...CAMPO_VACIO, proyecto_id: proyectoId });
  const [cargando, setCargando] = useState(!!procesoId);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [usuariosDisponibles, setUsuariosDisponibles] = useState<UsuarioActivo[]>([]);
  const [partesSeleccionadas, setPartesSeleccionadas] = useState<UsuarioActivo[]>([]);

  useEffect(() => {
    obtenerPartesInteresadas(companiaId).then(setUsuariosDisponibles).catch(() => setUsuariosDisponibles([]));
  }, [companiaId]);

  useEffect(() => {
    if (!procesoId) return;
    (async () => {
      try {
        const detalle = await obtenerControlCambioDetalle(procesoId);
        setForm({
          proyecto_id: proyectoId,
          requiere_orden_interna: detalle.requiere_orden_interna,
          descripcion_cambio: detalle.descripcion_cambio || '',
          antecedentes: detalle.antecedentes || '',
          justificacion: detalle.justificacion || '',
          impacto_alcance: detalle.impacto_alcance || '',
          impacto_tiempo: detalle.impacto_tiempo || '',
          anexos: detalle.control_cambio_anexos || [],
        });
        const actuales = detalle.procesos.asignaciones_proceso
          .filter((a) => a.etapa === 'VERIFICACION_PARTES_INTERESADAS')
          .map((a) => a.usuarios)
          .filter((u): u is NonNullable<typeof u> => !!u) as UsuarioActivo[];
        setPartesSeleccionadas(actuales);
      } catch {
        setError('No se pudo cargar el Control de Cambios.');
      } finally {
        setCargando(false);
      }
    })();
  }, [procesoId]);

  const actualizar = (patch: Partial<CrearControlCambioPayload>) => setForm((prev) => ({ ...prev, ...patch }));

  const agregarAnexo = () => actualizar({ anexos: [...(form.anexos || []), { tipo: 'DOCUMENTO', url: '', descripcion: '' }] });
  const quitarAnexo = (index: number) => actualizar({ anexos: (form.anexos || []).filter((_, i) => i !== index) });
  const actualizarAnexo = (index: number, patch: Partial<AnexoControlCambio>) =>
    actualizar({ anexos: (form.anexos || []).map((a, i) => (i === index ? { ...a, ...patch } : a)) });

  const guardar = async () => {
    try {
      setGuardando(true);
      setError(null);

      const anexosValidos = (form.anexos || []).filter((a) => a.url.trim());
      const payload: CrearControlCambioPayload = { ...form, anexos: anexosValidos };

      let procesoIdResultante: number;
      if (procesoId) {
        await actualizarControlCambio(procesoId, payload);
        procesoIdResultante = procesoId;
      } else {
        const respuesta = await crearControlCambio(payload);
        procesoIdResultante = respuesta.proceso_id;
      }

      await actualizarPartesInteresadasCc(procesoIdResultante, partesSeleccionadas.map((u) => u.id));

      onGuardado(procesoIdResultante);
    } catch (err: any) {
      setError(err.message || err.response?.data?.message || 'Error al guardar el Control de Cambios.');
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress color="secondary" /></Box>;

  return (
    <Box sx={{ mt: 3, p: 3, borderRadius: 3, border: '1px solid #e2e8f0', backgroundColor: '#fafafa' }}>
      <Button startIcon={<ArrowBackIcon />} onClick={onCancelar} sx={{ mb: 2, color: '#64748b' }}>Cancelar</Button>
      <Typography variant="h6" sx={{ fontWeight: 800, color: '#0e381e', mb: 0.5 }}>Control de Cambios</Typography>

      {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}

      <Card sx={{ mb: 2, mt: 2, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Información General</Typography>
          <FormLabel sx={{ fontWeight: 600, fontSize: '0.9rem', color: 'text.primary' }}>¿Requiere Orden Interna?</FormLabel>
          <RadioGroup
            row
            value={form.requiere_orden_interna ? 'si' : 'no'}
            onChange={(e) => actualizar({ requiere_orden_interna: e.target.value === 'si' })}
            sx={{ mb: 2 }}
          >
            <FormControlLabel value="no" control={<Radio />} label="No" />
            <FormControlLabel value="si" control={<Radio />} label="Sí" />
          </RadioGroup>

          
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Anexos</Typography>
          {(form.anexos || []).map((anexo, i) => (
            <Box key={i} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '200px 1fr 1fr 40px' }, gap: 1.5, mb: 1.5, alignItems: 'flex-start' }}>
              <TextField select size="small" label="Tipo" value={anexo.tipo} onChange={(e) => actualizarAnexo(i, { tipo: e.target.value })}>
                {TIPOS_ANEXO.map((t) => <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>)}
              </TextField>
              <TextField size="small" label="URL / link" value={anexo.url} onChange={(e) => actualizarAnexo(i, { url: e.target.value })} />
              <TextField size="small" label="Descripción (opcional)" value={anexo.descripcion || ''} onChange={(e) => actualizarAnexo(i, { descripcion: e.target.value })} />
              <IconButton size="small" color="error" onClick={() => quitarAnexo(i)}><DeleteOutlineIcon fontSize="small" /></IconButton>
            </Box>
          ))}
          <Button size="small" startIcon={<AddIcon />} onClick={agregarAnexo}>Agregar anexo</Button>
        </CardContent>
      </Card>

      <Card sx={{ mb: 2, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Descripción del Cambio</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Descripción del cambio" multiline minRows={2} value={form.descripcion_cambio} onChange={(e) => actualizar({ descripcion_cambio: e.target.value })} />
            <TextField label="Antecedentes" multiline minRows={2} value={form.antecedentes} onChange={(e) => actualizar({ antecedentes: e.target.value })} />
            <TextField label="Justificación" multiline minRows={2} value={form.justificacion} onChange={(e) => actualizar({ justificacion: e.target.value })} />
            <TextField label="Impacto en el alcance" multiline minRows={2} value={form.impacto_alcance} onChange={(e) => actualizar({ impacto_alcance: e.target.value })} />
            <TextField label="Impacto en el tiempo" multiline minRows={2} value={form.impacto_tiempo} onChange={(e) => actualizar({ impacto_tiempo: e.target.value })} />
          </Box>
        </CardContent>
      </Card>
          <Card sx={{ mb: 2, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Partes Interesadas</Typography>
          <Autocomplete
            multiple
            options={usuariosDisponibles}
            getOptionLabel={(u) => u.nombre}
            value={partesSeleccionadas}
            onChange={(_, v) => setPartesSeleccionadas(v)}
            renderInput={(params) => <TextField {...params} label="Elige quiénes son las partes interesadas" />}
          />
        </CardContent>
      </Card>

      <Divider sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button onClick={onCancelar} disabled={guardando}>Cancelar</Button>
        <Button variant="contained" color="secondary" onClick={guardar} disabled={guardando}>
          {guardando ? <CircularProgress size={22} color="inherit" /> : 'Guardar'}
        </Button>
      </Box>
    </Box>
  );
}