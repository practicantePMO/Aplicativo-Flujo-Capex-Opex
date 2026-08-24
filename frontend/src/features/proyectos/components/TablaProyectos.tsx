import { useState, useEffect } from 'react';
import {
  Box, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, Button, TextField, InputAdornment, Chip, IconButton, Tooltip,
  CircularProgress, Alert, Stack, MenuItem, FormControlLabel, Switch, Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FolderIcon from '@mui/icons-material/Folder';
import UpdateIcon from '@mui/icons-material/Update';
import TuneIcon from '@mui/icons-material/Tune';
import type { Proyecto, Compania } from '../types/proyecto.types';
import { obtenerProyectos, crearProyecto, obtenerCompanias } from '../services/proyectos.service';
import { ModalCrearProyecto } from './ModalCrearProyecto';
import { DialogoAplazarProyecto } from './DialogoAplazarProyecto';
import { useAuth } from '../../../auth/AuthContext';

interface TablaProyectosProps {
  onSeleccionarProyecto?: (proyecto: Proyecto) => void;
}

const ESTADO_CONFIG: Record<string, { label: string; color: 'success' | 'warning' | 'error' | 'default' }> = {
  ACTIVO: { label: 'Activo', color: 'success' },
  APLAZADO: { label: 'Aplazado', color: 'warning' },
  CANCELADO: { label: 'Cancelado', color: 'error' },
  EN_PROCESO_DE_CANCELACION: { label: 'En proceso de cancelación', color: 'warning' },
  SUSPENDIDO: { label: 'Suspendido', color: 'default' },
};

export function TablaProyectos({ onSeleccionarProyecto }: TablaProyectosProps) {
  const { usuario, tieneRol } = useAuth();
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [companias, setCompanias] = useState<Compania[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [proyectoAAplazar, setProyectoAAplazar] = useState<Proyecto | null>(null);

  // Filtros
  const [filtroAnio, setFiltroAnio] = useState('');
  const [filtroCompania, setFiltroCompania] = useState('');
  const [filtroAplazados, setFiltroAplazados] = useState(false);

  const puedeCrear = tieneRol('PM') || tieneRol('PMO') || tieneRol('ADMIN');

  useEffect(() => {
    obtenerCompanias().then(setCompanias).catch(() => setCompanias([]));
  }, []);

  useEffect(() => {
    cargarListaProyectos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario?.id, filtroAnio, filtroCompania, filtroAplazados]);

  const cargarListaProyectos = async () => {
    try {
      setCargando(true);
      setError(null);
      const data = await obtenerProyectos({
        anio: filtroAnio ? Number(filtroAnio) : undefined,
        companiaId: filtroCompania ? Number(filtroCompania) : undefined,
        aplazados: filtroAplazados ? true : undefined,
      });
      setProyectos(data);
    } catch (err) {
      console.error('Error cargando proyectos:', err);
      setProyectos([]);
      setError('No se pudo cargar la lista de proyectos. Intenta de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  // Búsqueda libre por ID, nombre o compañía — se aplica sobre lo que ya trajo el backend
  const proyectosFiltrados = proyectos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.id.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.companias?.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  // Años disponibles para el desplegable, calculados de los proyectos ya cargados
  const aniosDisponibles = Array.from(
    new Set(proyectos.map((p) => p.anio_asignado ?? p.anio_proyecto).filter((a): a is number => !!a)),
  ).sort((a, b) => b - a);

  const puedeAplazar = (_proyecto: Proyecto) => tieneRol('PMO') || tieneRol('ADMIN');

  return (
    <Box>
      <Box sx={styles.headerBox}>
        <Box>
          <Typography variant="h5" sx={styles.title}>Portafolio de Proyectos</Typography>
        </Box>

        {puedeCrear && (
          <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={() => setModalOpen(true)} sx={styles.createBtn}>
            Nuevo Proyecto
          </Button>
        )}
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Barra de Filtros */}
      <Card sx={styles.filterCard}>
        {/* Fila 1: buscador, ancho completo, siempre lo primero que se ve */}
        <TextField
          placeholder="Buscar por ID, nombre o compañía..."
          size="medium" fullWidth
          value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
          slotProps={{ input: { startAdornment: (<InputAdornment position="start"><SearchIcon sx={{ color: '#94a3b8' }} /></InputAdornment>) } }}
          sx={{ mb: 2.5 }}
        />

        <Divider sx={{ mb: 2 }} />

        {/* Fila 2: filtros, con su propio encabezado para que no se confundan con la búsqueda */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
          <TuneIcon sx={{ fontSize: '1.1rem', color: '#94a3b8' }} />
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#94a3b8', letterSpacing: '0.5px' }}>
            FILTRAR POR
          </Typography>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'center' }} flexWrap="wrap" useFlexGap>
          <TextField
            select size="small" label="Año" value={filtroAnio} onChange={(e) => setFiltroAnio(e.target.value)}
            sx={{ minWidth: 140 }}
          >
            <MenuItem value="">Todos los años</MenuItem>
            {aniosDisponibles.map((a) => <MenuItem key={a} value={a}>{a}</MenuItem>)}
          </TextField>

          <TextField
            select size="small" label="Compañía" value={filtroCompania} onChange={(e) => setFiltroCompania(e.target.value)}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">Todas las compañías</MenuItem>
            {companias.map((c) => <MenuItem key={c.id} value={c.id}>{c.nombre}</MenuItem>)}
          </TextField>

          <FormControlLabel
            sx={{ ml: { xs: 0, sm: 1 } }}
            control={<Switch checked={filtroAplazados} onChange={(e) => setFiltroAplazados(e.target.checked)} />}
            label={<Typography variant="body2" sx={{ fontWeight: 600, color: '#475569' }}>Solo proyectos aplazados</Typography>}
          />

          {(filtroAnio || filtroCompania || filtroAplazados) && (
            <Button
              size="small" color="inherit"
              onClick={() => { setFiltroAnio(''); setFiltroCompania(''); setFiltroAplazados(false); }}
              sx={{ color: '#64748b', textTransform: 'none' }}
            >
              Limpiar filtros
            </Button>
          )}
        </Stack>
      </Card>

      {/* Tabla */}
      <Card sx={styles.tableCard}>
        {cargando ? (
          <Box sx={styles.loadingBox}><CircularProgress color="secondary" /></Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={styles.tableHeaderRow}>
                  <TableCell sx={styles.tableHeaderCell}>ID PROYECTO</TableCell>
                  <TableCell sx={styles.tableHeaderCell}>NOMBRE DEL PROYECTO</TableCell>
                  <TableCell sx={styles.tableHeaderCell}>COMPAÑÍA</TableCell>
                  <TableCell sx={styles.tableHeaderCell}>AÑO ASIGNADO</TableCell>
                  <TableCell sx={styles.tableHeaderCell}>ESTADO</TableCell>
                  <TableCell align="right" sx={styles.tableHeaderCell}>ACCIONES</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {proyectosFiltrados.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4, color: '#64748b' }}>
                      No se encontraron proyectos registrados.
                    </TableCell>
                  </TableRow>
                ) : (
                  proyectosFiltrados.map((proyecto) => {
                                        const estadoInfo = ESTADO_CONFIG[proyecto.estado || 'ACTIVO'] || { label: proyecto.estado || 'Desconocido', color: 'default' as const };
                    return (
                      <TableRow key={proyecto.id} hover sx={styles.tableRow}>
                        <TableCell sx={styles.idCell}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <FolderIcon sx={{ color: '#0e381e', fontSize: '1.2rem' }} />
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>{proyecto.id}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#0f172a' }}>{proyecto.nombre}</TableCell>
                        <TableCell>
                          <Chip label={proyecto.companias?.nombre || 'General'} size="small" sx={styles.companiaChip} />
                        </TableCell>
                        <TableCell sx={{ color: '#64748b', fontSize: '0.85rem' }}>
                          {proyecto.anio_asignado ?? proyecto.anio_proyecto ?? '—'}
                        </TableCell>
                        <TableCell>
                          <Chip label={estadoInfo.label} size="small" color={estadoInfo.color} sx={{ fontWeight: 700, fontSize: '0.7rem' }} />
                        </TableCell>
                        <TableCell align="right">
                          {puedeAplazar(proyecto) && (
                            <Tooltip title="Aplazar a otro año">
                              <IconButton color="warning" size="small" onClick={() => setProyectoAAplazar(proyecto)}>
                                <UpdateIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                          <Tooltip title="Abrir procesos del proyecto">
                            <IconButton color="primary" size="small" onClick={() => onSeleccionarProyecto?.(proyecto)}>
                              <ArrowForwardIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>

      <ModalCrearProyecto
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onProyectoCreado={cargarListaProyectos}
        onGuardar={crearProyecto}
      />

      <DialogoAplazarProyecto
        proyecto={proyectoAAplazar}
        onClose={() => setProyectoAAplazar(null)}
        onAplazado={() => { setProyectoAAplazar(null); cargarListaProyectos(); }}
      />
    </Box>
  );
}

const styles = {
  headerBox: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 },
  title: { fontWeight: 700, color: '#0e381e' },
  createBtn: { borderRadius: '10px', px: 2.5 },
  filterCard: { p: 2, mb: 2.5 },
  tableCard: { borderRadius: 3, overflow: 'hidden' },
  loadingBox: { display: 'flex', justifyContent: 'center', py: 6 },
  tableHeaderRow: { backgroundColor: '#f8fafc' },
  tableHeaderCell: { fontWeight: 700, color: '#0e381e', fontSize: '0.72rem', letterSpacing: '0.5px' },
  tableRow: { '&:last-child td, &:last-child th': { border: 0 } },
  idCell: { color: '#0e381e' },
  companiaChip: { backgroundColor: '#e6f7ed', color: '#0e381e', fontWeight: 700, fontSize: '0.73rem' },
};