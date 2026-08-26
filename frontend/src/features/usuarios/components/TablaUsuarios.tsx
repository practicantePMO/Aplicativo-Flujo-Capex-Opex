import { useState, useEffect } from 'react';
import {
  Box, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, TextField, InputAdornment, Chip, IconButton, Tooltip,
  CircularProgress, Alert, Switch, Stack, Button, MenuItem, Divider,
  Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';
import EditIcon from '@mui/icons-material/Edit';
import type { Usuario, RolDisponible } from '../types/usuario.types';
import type { Compania } from '../../proyectos/types/proyecto.types';
import { obtenerUsuarios, obtenerRolesDisponibles, quitarRol, cambiarActivoUsuario, editarAreaUsuario } from '../services/usuarios.service';
import { obtenerCompanias } from '../../proyectos/services/proyectos.service';
import { DialogoAsignarRol } from './DialogoAsignarRol';
import { useAuth } from '../../../auth/AuthContext';

export function TablaUsuarios() {
  const { usuario: usuarioActual, tieneRol } = useAuth();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [roles, setRoles] = useState<RolDisponible[]>([]);
  const [companias, setCompanias] = useState<Compania[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usuarioParaAsignar, setUsuarioParaAsignar] = useState<Usuario | null>(null);
  const [usuarioParaDesactivar, setUsuarioParaDesactivar] = useState<Usuario | null>(null);
  const [usuarioParaEditarArea, setUsuarioParaEditarArea] = useState<Usuario | null>(null);
  const [nuevaArea, setNuevaArea] = useState('');
  const [guardandoArea, setGuardandoArea] = useState(false);

  // Filtros
  const [filtroSoloPendientes, setFiltroSoloPendientes] = useState(false);
  const [filtroArea, setFiltroArea] = useState('');
  const [filtroEstado, setFiltroEstado] = useState(''); // '' | 'activo' | 'inactivo'

  const esAdmin = tieneRol('ADMIN');

  useEffect(() => {
    obtenerRolesDisponibles().then(setRoles).catch(() => setRoles([]));
    obtenerCompanias().then(setCompanias).catch(() => setCompanias([]));
  }, []);

  useEffect(() => {
    cargarUsuarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuarioActual?.id]);

  const cargarUsuarios = async () => {
    try {
      setCargando(true);
      setError(null);
      const data = await obtenerUsuarios();
      setUsuarios(data);
    } catch (err) {
      console.error('Error cargando usuarios:', err);
      setUsuarios([]);
      setError('No se pudo cargar la lista de usuarios. Intenta de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  const areasDisponibles = Array.from(new Set(usuarios.map((u) => u.area).filter(Boolean))) as string[];

  const usuariosFiltrados = usuarios.filter((u) => {
    if (busqueda && !(u.nombre.toLowerCase().includes(busqueda.toLowerCase()) || u.email.toLowerCase().includes(busqueda.toLowerCase()))) {
      return false;
    }
    if (filtroSoloPendientes && u.usuario_roles_compania.length > 0) return false;
    if (filtroArea && u.area !== filtroArea) return false;
    if (filtroEstado === 'activo' && !u.activo) return false;
    if (filtroEstado === 'inactivo' && u.activo) return false;
    return true;
  });

  const manejarQuitarRol = async (asignacionId: number) => {
    if (!window.confirm('¿Quitar este rol al usuario?')) return;
    try {
      await quitarRol(asignacionId);
      await cargarUsuarios();
    } catch (e: any) {
      alert(e.response?.data?.message || 'Error al quitar el rol.');
    }
  };

  // Activar es reversible y de bajo riesgo -> directo.
  // Desactivar sí pide confirmación explícita (bloquea el acceso de alguien).
  const manejarCambiarActivo = async (u: Usuario) => {
    if (u.activo) {
      setUsuarioParaDesactivar(u);
      return;
    }
    try {
      await cambiarActivoUsuario(u.id, true);
      await cargarUsuarios();
    } catch (e: any) {
      alert(e.response?.data?.message || 'Error al activar al usuario.');
    }
  };

    const confirmarDesactivar = async () => {
    if (!usuarioParaDesactivar) return;
    try {
      await cambiarActivoUsuario(usuarioParaDesactivar.id, false);
      setUsuarioParaDesactivar(null);
      await cargarUsuarios();
    } catch (e: any) {
      alert(e.response?.data?.message || 'Error al desactivar al usuario.');
    }
  };

  const abrirEditarArea = (u: Usuario) => {
    setNuevaArea(u.area || '');
    setUsuarioParaEditarArea(u);
  };

  const confirmarEditarArea = async () => {
    if (!usuarioParaEditarArea || !nuevaArea.trim()) return;
    try {
      setGuardandoArea(true);
      await editarAreaUsuario(usuarioParaEditarArea.id, nuevaArea.trim());
      setUsuarioParaEditarArea(null);
      await cargarUsuarios();
    } catch (e: any) {
      alert(e.response?.data?.message || 'Error al actualizar el área.');
    } finally {
      setGuardandoArea(false);
    }
  };

  return (
    <Box>
      <Box sx={styles.headerBox}>
        <Box>
          <Typography variant="h5" sx={styles.title}>Gestión de Usuarios</Typography>
          <Typography variant="body2" color="text.secondary">
            Roles, permisos y estado de cada persona en el sistema
          </Typography>
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Card sx={styles.filterCard}>
        <TextField
          placeholder="Buscar por nombre o correo..."
          size="medium" fullWidth
          value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
          slotProps={{ input: { startAdornment: (<InputAdornment position="start"><SearchIcon sx={{ color: '#94a3b8' }} /></InputAdornment>) } }}
          sx={{ mb: 2.5 }}
        />

        <Divider sx={{ mb: 2 }} />

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
          <TuneIcon sx={{ fontSize: '1.1rem', color: '#94a3b8' }} />
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#94a3b8', letterSpacing: '0.5px' }}>
            FILTRAR POR
          </Typography>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'center' }} flexWrap="wrap" useFlexGap>
          <TextField
            select size="small" label="Área" value={filtroArea}
            onChange={(e) => setFiltroArea(e.target.value)} sx={{ minWidth: 180 }}
          >
            <MenuItem value="">Todas las áreas</MenuItem>
            {areasDisponibles.map((a) => <MenuItem key={a} value={a}>{a}</MenuItem>)}
          </TextField>

          <TextField
            select size="small" label="Estado" value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)} sx={{ minWidth: 160 }}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="activo">Activos</MenuItem>
            <MenuItem value="inactivo">Inactivos</MenuItem>
          </TextField>

          <Button
            size="small"
            variant={filtroSoloPendientes ? 'contained' : 'outlined'}
            color="warning"
            onClick={() => setFiltroSoloPendientes((v) => !v)}
            sx={{ borderRadius: '10px', textTransform: 'none' }}
          >
            {filtroSoloPendientes ? '✓ ' : ''}Solo en espera de rol
          </Button>

          {(filtroArea || filtroEstado || filtroSoloPendientes) && (
            <Button
              size="small" color="inherit"
              onClick={() => { setFiltroArea(''); setFiltroEstado(''); setFiltroSoloPendientes(false); }}
              sx={{ color: '#64748b', textTransform: 'none' }}
            >
              Limpiar filtros
            </Button>
          )}
        </Stack>
      </Card>

      <Card sx={styles.tableCard}>
        {cargando ? (
          <Box sx={styles.loadingBox}><CircularProgress color="secondary" /></Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={styles.tableHeaderRow}>
                  <TableCell sx={styles.tableHeaderCell}>USUARIO</TableCell>
                  <TableCell sx={styles.tableHeaderCell}>ÁREA</TableCell>
                  <TableCell sx={styles.tableHeaderCell}>ROLES</TableCell>
                  <TableCell sx={styles.tableHeaderCell}>ESTADO</TableCell>
                  <TableCell align="right" sx={styles.tableHeaderCell}>ACCIONES</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usuariosFiltrados.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4, color: '#64748b' }}>
                      No se encontraron usuarios con estos filtros.
                    </TableCell>
                  </TableRow>
                ) : (
                  usuariosFiltrados.map((u) => {
                    const esAdminObjetivo = u.usuario_roles_compania.some((r) => r.roles?.codigo === 'ADMIN');
                    const puedeModificar = esAdmin || !esAdminObjetivo;
                    const esUnoMismo = u.id === usuarioActual?.id;

                    return (
                      <TableRow key={u.id} hover sx={styles.tableRow}>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f172a' }}>{u.nombre}</Typography>
                          <Typography variant="caption" color="text.secondary">{u.email}</Typography>
                        </TableCell>
                        <TableCell sx={{ color: '#64748b', fontSize: '0.85rem' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            {u.area || '—'}
                            {puedeModificar && (
                              <Tooltip title="Editar área">
                                <IconButton size="small" onClick={() => abrirEditarArea(u)}>
                                  <EditIcon sx={{ fontSize: '0.9rem' }} />
                                </IconButton>
                              </Tooltip>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>
                          {u.usuario_roles_compania.length === 0 ? (
                            <Chip label="Sin rol — en espera" size="small" color="warning" sx={{ fontWeight: 700, fontSize: '0.68rem' }} />
                          ) : (
                            <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                              {u.usuario_roles_compania.map((asignacion) => {
                                const esRolAdmin = asignacion.roles?.codigo === 'ADMIN';
                                const puedeQuitarEste = esAdmin || !esRolAdmin;
                                return (
                                  <Chip
                                    key={asignacion.id}
                                    size="small"
                                    label={`${asignacion.roles?.nombre || '—'}${asignacion.companias ? ` · ${asignacion.companias.nombre}` : ' · Global'}`}
                                    onDelete={puedeQuitarEste ? () => manejarQuitarRol(asignacion.id) : undefined}
                                    deleteIcon={<CloseIcon />}
                                    sx={styles.rolChip}
                                  />
                                );
                              })}
                            </Stack>
                          )}
                        </TableCell>
                        <TableCell>
                          <Tooltip title={esUnoMismo ? 'No puedes modificar tu propia cuenta' : (!puedeModificar ? 'No tienes permiso para modificar a un Administrador' : '')}>
                            <span>
                              <Switch
                                checked={u.activo}
                                disabled={esUnoMismo || !puedeModificar}
                                onChange={() => manejarCambiarActivo(u)}
                                color="secondary"
                              />
                            </span>
                          </Tooltip>
                          <Chip
                            size="small"
                            label={u.activo ? 'Activo' : 'Inactivo'}
                            color={u.activo ? 'success' : 'default'}
                            sx={{ fontWeight: 700, fontSize: '0.65rem' }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          {puedeModificar && (
                            <Tooltip title="Asignar rol">
                              <IconButton color="secondary" size="small" onClick={() => setUsuarioParaAsignar(u)}>
                                <PersonAddIcon />
                              </IconButton>
                            </Tooltip>
                          )}
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

      <DialogoAsignarRol
        usuario={usuarioParaAsignar}
        roles={roles}
        companias={companias}
        onClose={() => setUsuarioParaAsignar(null)}
        onAsignado={() => { setUsuarioParaAsignar(null); cargarUsuarios(); }}
      />

      <Dialog open={!!usuarioParaDesactivar} onClose={() => setUsuarioParaDesactivar(null)}>
        <DialogTitle>¿Desactivar a {usuarioParaDesactivar?.nombre}?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Esta persona perderá acceso al sistema de inmediato — no podrá hacer nada hasta que
            alguien vuelva a activarla. ¿Confirmas que quieres desactivarla?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUsuarioParaDesactivar(null)}>Cancelar</Button>
          <Button variant="contained" color="error" onClick={confirmarDesactivar}>
            Sí, desactivar
          </Button>
        </DialogActions>
      </Dialog>
          <Dialog open={!!usuarioParaEditarArea} onClose={() => setUsuarioParaEditarArea(null)} fullWidth maxWidth="xs">
        <DialogTitle>Editar área de {usuarioParaEditarArea?.nombre}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus fullWidth label="Área" value={nuevaArea}
            onChange={(e) => setNuevaArea(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUsuarioParaEditarArea(null)}>Cancelar</Button>
          <Button variant="contained" color="secondary" onClick={confirmarEditarArea} disabled={guardandoArea || !nuevaArea.trim()}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

const styles = {
  headerBox: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 },
  title: { fontWeight: 700, color: '#0e381e' },
  filterCard: { p: 2, mb: 2.5 },
  tableCard: { borderRadius: 3, overflow: 'hidden' },
  loadingBox: { display: 'flex', justifyContent: 'center', py: 6 },
  tableHeaderRow: { backgroundColor: '#f8fafc' },
  tableHeaderCell: { fontWeight: 700, color: '#0e381e', fontSize: '0.72rem', letterSpacing: '0.5px' },
  tableRow: { '&:last-child td, &:last-child th': { border: 0 } },
  rolChip: { backgroundColor: '#e6f7ed', color: '#0e381e', fontWeight: 700, fontSize: '0.7rem' },
};