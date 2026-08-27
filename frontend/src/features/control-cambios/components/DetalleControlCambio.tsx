import { useState, useEffect } from 'react';
import {
  Box, Typography, Chip, Button, TextField, Dialog, DialogTitle, DialogContent,
  DialogActions, Autocomplete, CircularProgress, Card, CardContent, RadioGroup,
  FormControlLabel, Radio, Link, TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
} from '@mui/material';
import { useAuth } from '../../../auth/AuthContext';
import type { ControlCambioDetalle } from '../types/controlCambio.types';
import type { UsuarioActivo } from '../../solicitud-inversion/types/solicitud.types';
import {
  obtenerControlCambioDetalle, enviarControlCambio, aprobarControlCambio, rechazarControlCambio,
} from '../services/controlCambios.service';
import { obtenerUsuariosPorRol } from '../../solicitud-inversion/services/solicitudInversion.service';

const ESTADO_CONFIG: Record<string, { label: string; color: 'default' | 'warning' | 'success' | 'info' }> = {
  BORRADOR: { label: 'Borrador', color: 'default' },
  PENDIENTE_PMO: { label: 'Pendiente PMO', color: 'warning' },
  VERIFICACION_PARTES_INTERESADAS: { label: 'Verificación Partes Interesadas', color: 'warning' },
  DIRECCION_PMO: { label: 'Dirección PMO', color: 'warning' },
  GERENCIA: { label: 'Gerencia', color: 'warning' },
  PRESIDENCIA: { label: 'Presidencia', color: 'warning' },
  APROBADO_FINAL: { label: 'Aprobado Final', color: 'success' },
};

const ROLES_POR_ETAPA: Record<string, string[]> = {
  PENDIENTE_PMO: ['PMO', 'ADMIN'],
  VERIFICACION_PARTES_INTERESADAS: [],
  DIRECCION_PMO: ['DIRECTOR_PMO', 'ADMIN'],
  GERENCIA: [],
  PRESIDENCIA: ['PRESIDENCIA', 'ADMIN'],
};

interface Props {
  procesoId: number;
  companiaId: number;
  onCambio: () => void;
  onEditar: () => void;
  onCrearOi?: (controlCambioId: number) => void;
}

export function DetalleControlCambio({ procesoId, companiaId, onCambio, onEditar, onCrearOi }: Props) {
  const { usuario, tieneRol } = useAuth();
  const [detalle, setDetalle] = useState<ControlCambioDetalle | null>(null);
  const [cargando, setCargando] = useState(true);
  const [procesando, setProcesando] = useState(false);

  const [dialogoAprobar, setDialogoAprobar] = useState(false);
  const [dialogoElegirGerente, setDialogoElegirGerente] = useState(false);
  const [dialogoGerencia, setDialogoGerencia] = useState(false);
  const [dialogoRechazar, setDialogoRechazar] = useState(false);

  const [comentarios, setComentarios] = useState('');
  const [razonRechazo, setRazonRechazo] = useState('');
  const [enviarPresidencia, setEnviarPresidencia] = useState<'si' | 'no'>('si');

  const [gerentesDisponibles, setGerentesDisponibles] = useState<UsuarioActivo[]>([]);
  const [gerenteElegido, setGerenteElegido] = useState<UsuarioActivo | null>(null);

  const cargar = async () => {
    try {
      setCargando(true);
      const data = await obtenerControlCambioDetalle(procesoId);
      setDetalle(data);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => { cargar(); }, [procesoId]);

  if (cargando || !detalle) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}><CircularProgress size={24} color="secondary" /></Box>;

  const estado = detalle.procesos.estado_actual;
  const esDueno = detalle.usuarios?.id === usuario?.id;
  const esAdmin = tieneRol('ADMIN');

  const rolesQuePuedenAprobar = ROLES_POR_ETAPA[estado] || [];
  const tieneRolDeEtapa = rolesQuePuedenAprobar.some((r) => tieneRol(r));

  const estaAsignadoComoParteInteresada =
    estado === 'VERIFICACION_PARTES_INTERESADAS' &&
    detalle.procesos.asignaciones_proceso.some(
      (a) => a.etapa === 'VERIFICACION_PARTES_INTERESADAS' && a.estado_asignacion === 'PENDIENTE' && Number(a.usuarios?.id) === Number(usuario?.id),
    );
  const estaAsignadoComoGerente =
    estado === 'GERENCIA' &&
    detalle.procesos.asignaciones_proceso.some(
      (a) => a.etapa === 'GERENCIA' && a.estado_asignacion === 'PENDIENTE' && Number(a.usuarios?.id) === Number(usuario?.id),
    );

  const puedeEditarYEnviar = estado === 'BORRADOR' && (esDueno || esAdmin);
  const puedeAprobarORechazar = tieneRolDeEtapa || estaAsignadoComoParteInteresada || estaAsignadoComoGerente;

  const manejarEnviar = async () => {
    setProcesando(true);
    try {
      await enviarControlCambio(procesoId);
      await cargar();
      onCambio();
    } catch (e: any) {
      alert(e.response?.data?.message || 'Error al enviar a revisión.');
    } finally {
      setProcesando(false);
    }
  };

  const manejarAprobar = async () => {
    if (estado === 'DIRECCION_PMO') {
      if (gerentesDisponibles.length === 0) {
        const gerentes = await obtenerUsuariosPorRol('GERENCIA', companiaId);
        setGerentesDisponibles(gerentes);
      }
      setGerenteElegido(null);
      setDialogoElegirGerente(true);
      return;
    }
    if (estado === 'GERENCIA') { setDialogoGerencia(true); return; }
    setDialogoAprobar(true);
  };

  const confirmarElegirGerente = async () => {
    if (!comentarios.trim()) return alert('La observación es obligatoria para aprobar.');
    if (!gerenteElegido) return alert('Debes elegir a qué gerente enviar el proceso.');
    setProcesando(true);
    try {
      await aprobarControlCambio(procesoId, comentarios, undefined, gerenteElegido.id);
      setDialogoElegirGerente(false); setComentarios(''); setGerenteElegido(null);
      await cargar(); onCambio();
    } catch (e: any) {
      alert(e.response?.data?.message || 'Error al aprobar.');
    } finally {
      setProcesando(false);
    }
  };

  const confirmarAprobar = async () => {
    if (!comentarios.trim()) return alert('La observación es obligatoria para aprobar.');
    setProcesando(true);
    try {
      await aprobarControlCambio(procesoId, comentarios);
      setDialogoAprobar(false); setComentarios('');
      await cargar(); onCambio();
    } catch (e: any) {
      alert(e.response?.data?.message || 'Error al aprobar.');
    } finally {
      setProcesando(false);
    }
  };

  const confirmarAprobarGerencia = async () => {
    if (!comentarios.trim()) return alert('La observación es obligatoria para aprobar.');
    setProcesando(true);
    try {
      await aprobarControlCambio(procesoId, comentarios, enviarPresidencia === 'si');
      setDialogoGerencia(false); setComentarios('');
      await cargar(); onCambio();
    } catch (e: any) {
      alert(e.response?.data?.message || 'Error al aprobar.');
    } finally {
      setProcesando(false);
    }
  };

  const confirmarRechazar = async () => {
    if (!razonRechazo.trim()) return alert('La razón del rechazo es obligatoria.');
    setProcesando(true);
    try {
      await rechazarControlCambio(procesoId, razonRechazo);
      setDialogoRechazar(false); setRazonRechazo('');
      await cargar(); onCambio();
    } catch (e: any) {
      alert(e.response?.data?.message || 'Error al rechazar.');
    } finally {
      setProcesando(false);
    }
  };

  const tituloSeccion = (texto: string) => (
    <Typography
      variant="subtitle1"
      sx={{
        fontWeight: 700, mb: 2, mt: 3, color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1.25,
        '&::before': { content: '""', display: 'block', width: 4, height: 18, bgcolor: 'primary.main', borderRadius: 1 },
      }}
    >
      {texto}
    </Typography>
  );

  const campo = (label: string, valor?: string | number | null) => (
    <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#f8fafc', border: '1px solid #eef2f6' }}>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px', mb: 0.5, display: 'block' }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
        {valor === undefined || valor === null || valor === '' ? '—' : valor}
      </Typography>
    </Box>
  );

  const tarjeta = (children: React.ReactNode) => (
    <Card elevation={0} sx={{ mb: 2.5, borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.04)' }}>
      <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>{children}</CardContent>
    </Card>
  );

  const partesActuales = detalle.procesos.asignaciones_proceso.filter((a) => a.etapa === 'VERIFICACION_PARTES_INTERESADAS');

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
        <Chip label={detalle.requiere_orden_interna ? 'Requiere Orden Interna' : 'No requiere Orden Interna'} size="small" variant="outlined" sx={{ fontWeight: 600 }} />
        <Box sx={{ flexGrow: 1 }} />
        {puedeEditarYEnviar && (
          <>
            <Button size="small" onClick={onEditar}>Editar</Button>
            <Button size="small" variant="contained" color="primary" onClick={manejarEnviar} disabled={procesando}>Enviar a revisión</Button>
          </>
        )}
        {puedeAprobarORechazar && (
          <>
            <Button size="small" color="error" onClick={() => setDialogoRechazar(true)}>Rechazar</Button>
            <Button size="small" variant="contained" color="success" onClick={manejarAprobar}>Aprobar</Button>
          </>
        )}
      </Box>

      {tituloSeccion('Descripción del Cambio')}
      {tarjeta(
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {campo('Descripción del cambio', detalle.descripcion_cambio)}
          {campo('Antecedentes', detalle.antecedentes)}
          {campo('Justificación', detalle.justificacion)}
          {campo('Impacto en el alcance', detalle.impacto_alcance)}
          {campo('Impacto en el tiempo', detalle.impacto_tiempo)}
        </Box>
      )}

      {detalle.control_cambio_anexos?.length > 0 && (
        <>
          {tituloSeccion('Anexos')}
          {tarjeta(
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {detalle.control_cambio_anexos.map((a, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Chip label={a.tipo} size="small" />
                  <Link href={a.url} target="_blank" rel="noopener noreferrer" sx={{ wordBreak: 'break-all' }}>{a.url}</Link>
                  {a.descripcion && <Typography variant="caption" color="text.secondary">— {a.descripcion}</Typography>}
                </Box>
              ))}
            </Box>
          )}
        </>
      )}

      {tituloSeccion('Partes Interesadas')}
      {tarjeta(
        partesActuales.length === 0 ? (
          <Typography variant="body2" color="text.secondary">Sin partes interesadas asignadas.</Typography>
        ) : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {partesActuales.map((a) => (
              <Chip
                key={a.id}
                label={a.usuarios?.nombre || 'Usuario'}
                size="small"
                color={a.estado_asignacion === 'RESUELTA' ? 'success' : 'default'}
                variant={a.estado_asignacion === 'PENDIENTE' ? 'outlined' : 'filled'}
              />
            ))}
          </Box>
        )
      )}

      {tituloSeccion('Histórico de este Control de Cambios')}
      <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.04)' }}>
        <CardContent sx={{ p: 3 }}>
          {detalle.procesos.historico_aprobaciones.length === 0 ? (
            <Typography variant="body2" color="text.secondary">Sin movimientos todavía.</Typography>
          ) : (
            <TableContainer sx={{ overflowX: 'auto' }}>
              <Table size="small" sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f1f5f9' }}>
                    <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>Fecha</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Usuario</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Acción</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Observación</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {detalle.procesos.historico_aprobaciones.map((h) => (
                    <TableRow key={h.id}>
                      <TableCell sx={{ whiteSpace: 'nowrap', fontSize: '0.8rem' }}>{new Date(h.fecha_registro).toLocaleString()}</TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap', fontSize: '0.82rem', fontWeight: 600 }}>{h.usuarios?.nombre || 'Sistema'}</TableCell>
                      <TableCell>
                        <Chip size="small" label={h.accion} color={h.accion === 'RECHAZADO' ? 'error' : 'success'} sx={{ fontWeight: 700, fontSize: '0.72rem' }} />
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.8rem', wordBreak: 'break-word' }}>{h.observaciones || h.razon_rechazo || '—'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {detalle.requiere_orden_interna && onCrearOi && (
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="info" onClick={() => onCrearOi(detalle.id)}>
            Crear Orden Interna para este cambio
          </Button>
        </Box>
      )}

      {/* Diálogo: aprobar simple (PENDIENTE_PMO / VERIFICACION_PARTES_INTERESADAS / PRESIDENCIA) */}
      <Dialog open={dialogoAprobar} onClose={() => setDialogoAprobar(false)} fullWidth maxWidth="sm">
        <DialogTitle>Aprobar Control de Cambios</DialogTitle>
        <DialogContent>
          <TextField autoFocus fullWidth multiline minRows={2} label="Observación (obligatoria) *" value={comentarios}
            onChange={(e) => setComentarios(e.target.value)} sx={{ mt: 1 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogoAprobar(false)}>Cancelar</Button>
          <Button variant="contained" color="success" onClick={confirmarAprobar} disabled={procesando}>Aprobar</Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo: Dirección PMO elige gerente */}
      <Dialog open={dialogoElegirGerente} onClose={() => setDialogoElegirGerente(false)} fullWidth maxWidth="sm">
        <DialogTitle>Elegir Gerente</DialogTitle>
        <DialogContent>
          <Autocomplete
            options={gerentesDisponibles}
            getOptionLabel={(u) => u.nombre}
            value={gerenteElegido}
            onChange={(_, v) => setGerenteElegido(v)}
            renderInput={(params) => <TextField {...params} label="¿A qué gerente se envía?" sx={{ mt: 1, mb: 2 }} />}
          />
          <TextField fullWidth multiline minRows={2} label="Observación (obligatoria) *" value={comentarios}
            onChange={(e) => setComentarios(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogoElegirGerente(false)}>Cancelar</Button>
          <Button variant="contained" color="success" onClick={confirmarElegirGerente} disabled={procesando}>Aprobar y enviar</Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo: Gerencia decide si sigue a Presidencia */}
      <Dialog open={dialogoGerencia} onClose={() => setDialogoGerencia(false)} fullWidth maxWidth="sm">
        <DialogTitle>Aprobar en Gerencia</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 1 }}>¿El proceso continúa a Presidencia, o finaliza aquí?</Typography>
          <RadioGroup row value={enviarPresidencia} onChange={(e) => setEnviarPresidencia(e.target.value as 'si' | 'no')} sx={{ mb: 2 }}>
            <FormControlLabel value="si" control={<Radio />} label="Continúa a Presidencia" />
            <FormControlLabel value="no" control={<Radio />} label="Finaliza aquí" />
          </RadioGroup>
          <TextField fullWidth multiline minRows={2} label="Observación (obligatoria) *" value={comentarios}
            onChange={(e) => setComentarios(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogoGerencia(false)}>Cancelar</Button>
          <Button variant="contained" color="success" onClick={confirmarAprobarGerencia} disabled={procesando}>Aprobar</Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo: rechazar */}
      <Dialog open={dialogoRechazar} onClose={() => setDialogoRechazar(false)} fullWidth maxWidth="sm">
        <DialogTitle>Rechazar Control de Cambios</DialogTitle>
        <DialogContent>
          <TextField autoFocus fullWidth multiline minRows={3} label="Razón del rechazo (obligatoria) *" value={razonRechazo}
            onChange={(e) => setRazonRechazo(e.target.value)} sx={{ mt: 1 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogoRechazar(false)}>Cancelar</Button>
          <Button variant="contained" color="error" onClick={confirmarRechazar} disabled={procesando}>Rechazar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}