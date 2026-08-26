import { useState, useEffect } from 'react';
import {
  Box, Typography, CircularProgress, Alert, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button,
  Card, TextField, MenuItem, Stack, Divider,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InboxIcon from '@mui/icons-material/Inbox';
import TuneIcon from '@mui/icons-material/Tune';
import { obtenerMisPendientes } from '../services/procesos.service';
import { useAuth } from '../../../auth/AuthContext';

interface Props {
  onAbrirProyecto: (proyecto: any, procesoId: number) => void;
}

const getEstadoChip = (estado: string) => {
  const configs: Record<string, { label: string; color: 'warning' | 'info' | 'primary' | 'secondary' | 'default' | 'success' }> = {
    // Solicitud de Inversión
    PENDIENTE_PMO: { label: 'Revisión PMO', color: 'warning' },
    VERIFICACION_PARTES_INTERESADAS: { label: 'Partes Interesadas', color: 'info' },
    DIRECCION_PMO: { label: 'Dirección PMO', color: 'primary' },
    GERENCIA: { label: 'Gerencia', color: 'secondary' },
    PRESIDENCIA: { label: 'Presidencia', color: 'default' },
    // Órdenes Internas
    BORRADOR: { label: 'Falta enviar', color: 'warning' },
    PENDIENTE: { label: 'Pendiente de aprobar', color: 'warning' },
    APROBADA: { label: 'Falta cerrar', color: 'success' },
  };
  const conf = configs[estado] || { label: estado, color: 'default' };
  return <Chip label={conf.label} color={conf.color} size="small" sx={{ fontWeight: 600 }} />;
};

export function VistaMisPendientes({ onAbrirProyecto }: Props) {
  const { usuario } = useAuth();
  const [pendientes, setPendientes] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtros (todos client-side, ya que la lista de "pendientes" de una persona
  // normalmente es corta — no vale la pena ir y volver al backend por esto)
  const [filtroTipoProceso, setFiltroTipoProceso] = useState('');
  const [filtroCompania, setFiltroCompania] = useState('');
  const [filtroAnio, setFiltroAnio] = useState('');

  useEffect(() => {
    setCargando(true);
    (async () => {
      try {
        const data = await obtenerMisPendientes();
        setPendientes(data);
        setError(null);
      } catch (err) {
        setError('No se pudieron cargar tus tareas pendientes.');
      } finally {
        setCargando(false);
      }
    })();
  }, [usuario?.id]); // 👈 antes era [] — nunca se enteraba de un cambio de usuario

  const tiposDisponibles = Array.from(new Set(pendientes.map((p) => p.tipo_proceso).filter(Boolean)));
  const companiasDisponibles = Array.from(
    new Map(pendientes.map((p) => [p.proyectos?.companias?.id, p.proyectos?.companias]).filter(([id]) => id)).values(),
  );
  const aniosDisponibles = Array.from(
    new Set(pendientes.map((p) => p.proyectos?.anio_asignado).filter(Boolean)),
  ).sort((a, b) => b - a);

  const pendientesFiltrados = pendientes.filter((p) => {
    if (filtroTipoProceso && p.tipo_proceso !== filtroTipoProceso) return false;
    if (filtroCompania && String(p.proyectos?.companias?.id) !== filtroCompania) return false;
    if (filtroAnio && String(p.proyectos?.anio_asignado) !== filtroAnio) return false;
    return true;
  });

  if (cargando) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress color="secondary" /></Box>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <InboxIcon sx={{ color: '#0e381e', fontSize: 32 }} />
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#0e381e' }}>
          Mis Pendientes
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {pendientes.length > 0 && (
        <Card sx={{ p: 2, mb: 2.5 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
            <TuneIcon sx={{ fontSize: '1.1rem', color: '#94a3b8' }} />
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#94a3b8', letterSpacing: '0.5px' }}>
              FILTRAR POR
            </Typography>
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'center' }} flexWrap="wrap" useFlexGap>
            <TextField
              select size="small" label="Tipo de proceso" value={filtroTipoProceso}
              onChange={(e) => setFiltroTipoProceso(e.target.value)} sx={{ minWidth: 220 }}
            >
              <MenuItem value="">Todos los tipos</MenuItem>
              {tiposDisponibles.map((t) => (
                <MenuItem key={t} value={t}>{t.replace(/_/g, ' ')}</MenuItem>
              ))}
            </TextField>

            <TextField
              select size="small" label="Compañía" value={filtroCompania}
              onChange={(e) => setFiltroCompania(e.target.value)} sx={{ minWidth: 200 }}
            >
              <MenuItem value="">Todas las compañías</MenuItem>
              {companiasDisponibles.map((c: any) => (
                <MenuItem key={c.id} value={String(c.id)}>{c.nombre}</MenuItem>
              ))}
            </TextField>

            <TextField
              select size="small" label="Año" value={filtroAnio}
              onChange={(e) => setFiltroAnio(e.target.value)} sx={{ minWidth: 140 }}
            >
              <MenuItem value="">Todos los años</MenuItem>
              {aniosDisponibles.map((a) => (
                <MenuItem key={a} value={String(a)}>{a}</MenuItem>
              ))}
            </TextField>

            {(filtroTipoProceso || filtroCompania || filtroAnio) && (
              <Button
                size="small" color="inherit"
                onClick={() => { setFiltroTipoProceso(''); setFiltroCompania(''); setFiltroAnio(''); }}
                sx={{ color: '#64748b', textTransform: 'none' }}
              >
                Limpiar filtros
              </Button>
            )}
          </Stack>
        </Card>
      )}

      {pendientesFiltrados.length === 0 && !error ? (
        <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3, backgroundColor: '#f8fafc' }} elevation={0} variant="outlined">
          <Typography variant="h6" color="text.secondary">
            {pendientes.length === 0 ? '¡Todo al día!' : 'Nada coincide con estos filtros'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {pendientes.length === 0
              ? 'No tienes solicitudes pendientes de aprobación en este momento.'
              : 'Intenta limpiar alguno de los filtros activos.'}
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper} elevation={0} variant="outlined" sx={{ borderRadius: 3 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: '#f8fafc' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: '#64748b' }}>Proyecto</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#64748b' }}>Tipo de Proceso</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#64748b' }}>Compañía</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#64748b' }}>Etapa Actual</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#64748b' }}>Fecha Ingreso</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: '#64748b' }}>Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendientesFiltrados.map((proceso) => (
                <TableRow key={proceso.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>
                    <Typography variant="body2" fontWeight={700} color="#0e381e">
                      {proceso.proyectos.id}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {proceso.proyectos.nombre}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={proceso.tipo_proceso ? proceso.tipo_proceso.replace(/_/g, ' ') : 'SOLICITUD INVERSION'}
                      variant="outlined"
                      size="small"
                      sx={{ fontWeight: 700, borderColor: '#75b70e', color: '#0e381e' }}
                    />
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2">{proceso.proyectos.companias?.nombre || '—'}</Typography>
                  </TableCell>
                  <TableCell>
                    {getEstadoChip(proceso.estado_actual)}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {proceso.historico_aprobaciones?.[0]?.fecha_registro
                        ? new Date(proceso.historico_aprobaciones[0].fecha_registro).toLocaleDateString()
                        : '—'}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      endIcon={<PlayArrowIcon />}
                      onClick={() => onAbrirProyecto(proceso.proyectos, proceso.id)}
                      sx={{ borderRadius: 2, textTransform: 'none' }}
                    >
                      Revisar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}