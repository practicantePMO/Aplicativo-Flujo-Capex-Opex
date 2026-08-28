import { useState, useEffect } from 'react';
import {
  Box, Typography, Chip, Grid, Button, TextField, Dialog, DialogTitle, DialogContent,
  DialogActions, Autocomplete, CircularProgress, Card, CardContent,
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
} from '@mui/material';
import { useAuth } from '../../../auth/AuthContext';
import type { OrdenInternaResumen, OrdenInternaDetalle, UsuarioResumen } from '../types/ordenInterna.types';
import {
  obtenerOrdenInternaDetalle, enviarOrdenInterna, aprobarOrdenInterna, rechazarOrdenInterna, cerrarOrdenInterna,
} from '../services/ordenesInternas.service';
import { obtenerUsuariosPorRol } from '../../solicitud-inversion/services/solicitudInversion.service';
import { EncabezadoProceso } from '../../../components/EncabezadoProceso';

const ESTADO_CONFIG: Record<string, { label: string; color: 'default' | 'warning' | 'success' | 'info' }> = {
  BORRADOR: { label: 'Borrador', color: 'default' },
  PENDIENTE: { label: 'Pendiente Control Gestión', color: 'warning' },
  APROBADA: { label: 'Aprobada', color: 'success' },
  CERRADA: { label: 'Cerrada', color: 'info' },
};

interface Props {
  resumen: OrdenInternaResumen;
  companiaId: number;
  grupoEstado: 'ABIERTO' | 'SOLICITADO_CIERRE' | 'CERRADO';
  onCambio: () => void;
  onEditar: () => void;
  onVerControlCambio?: (procesoId: number) => void;
}


export function DetalleOrdenInterna({ resumen, companiaId, grupoEstado, onCambio, onEditar, onVerControlCambio }: Props) {
  const { usuario, tieneRol } = useAuth();
  const [detalle, setDetalle] = useState<OrdenInternaDetalle | null>(null);
  const [cargando, setCargando] = useState(true);
  const [procesando, setProcesando] = useState(false);

  const [dialogoEnviar, setDialogoEnviar] = useState(false);
  const [cgDisponibles, setCgDisponibles] = useState<UsuarioResumen[]>([]);
  const [cgElegido, setCgElegido] = useState<UsuarioResumen | null>(null);

  const [dialogoAprobar, setDialogoAprobar] = useState(false);
  const [grupoTexto, setGrupoTexto] = useState('');
  const [observaciones, setObservaciones] = useState('');

  const [dialogoRechazar, setDialogoRechazar] = useState(false);
  const [razonRechazo, setRazonRechazo] = useState('');

  const cargar = async () => {
    try {
      setCargando(true);
      const data = await obtenerOrdenInternaDetalle(resumen.id);
      setDetalle(data);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => { cargar(); }, [resumen.id]);

  if (cargando || !detalle) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}><CircularProgress size={24} color="secondary" /></Box>;

  const estado = detalle.procesos.estado_actual;
  const esDueno = detalle.pm?.id === usuario?.id;
  const esCgAsignado = detalle.control_gestion?.id === usuario?.id;
  const esAdmin = tieneRol('ADMIN');

  const puedeEditarYEnviar = estado === 'BORRADOR' && (esDueno || esAdmin);
  const puedeAprobarORechazar = estado === 'PENDIENTE' && (esCgAsignado || esAdmin);
  const puedeCerrar = estado === 'APROBADA' && grupoEstado === 'SOLICITADO_CIERRE' && (esCgAsignado || esAdmin);

  const abrirDialogoEnviar = async () => {
    try {
      if (cgDisponibles.length === 0) {
        const disponibles = await obtenerUsuariosPorRol('CONTROL_GESTION', companiaId);
        setCgDisponibles(disponibles);
        if (disponibles.length === 0) {
          alert('No hay ningún usuario con el rol Control Gestión todavía. Pídele a un Admin que le asigne ese rol a alguien.');
          return;
        }
      }
      setCgElegido(null);
      setDialogoEnviar(true);
    } catch (e: any) {
      alert(e.response?.data?.message || 'No se pudo cargar la lista de Control Gestión. Revisa la consola para más detalle.');
      console.error('Error en abrirDialogoEnviar:', e);
    }
  };

  const confirmarEnviar = async () => {
    if (!cgElegido) return;
    setProcesando(true);
    try {
      await enviarOrdenInterna(resumen.id, cgElegido.id);
      setDialogoEnviar(false);
      await cargar();
      onCambio();
    } catch (e: any) {
      alert(e.response?.data?.message || 'Error al enviar.');
    } finally {
      setProcesando(false);
    }
  };

  const confirmarAprobar = async () => {
    if (!grupoTexto.trim()) return alert('El grupo de órdenes internas es obligatorio.');
    setProcesando(true);
    try {
      await aprobarOrdenInterna(resumen.id, grupoTexto.trim(), observaciones.trim() || undefined);
      setDialogoAprobar(false);
      setGrupoTexto(''); setObservaciones('');
      await cargar();
      onCambio();
    } catch (e: any) {
      alert(e.response?.data?.message || 'Error al aprobar.');
    } finally {
      setProcesando(false);
    }
  };

  const confirmarRechazar = async () => {
    if (!razonRechazo.trim()) return alert('La observación del rechazo es obligatoria.');
    setProcesando(true);
    try {
      await rechazarOrdenInterna(resumen.id, razonRechazo.trim());
      setDialogoRechazar(false);
      setRazonRechazo('');
      await cargar();
      onCambio();
    } catch (e: any) {
      alert(e.response?.data?.message || 'Error al rechazar.');
    } finally {
      setProcesando(false);
    }
  };

  const confirmarCerrar = async () => {
    setProcesando(true);
    try {
      await cerrarOrdenInterna(resumen.id);
      await cargar();
      onCambio();
    } catch (e: any) {
      alert(e.response?.data?.message || 'Error al cerrar.');
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

  // 🎯 Cada campo ahora vive dentro de su propia "casilla" gris clara, para
  // que se distingan mejor unos de otros en vez de verse todos pegados.
  const campo = (label: string, valor?: string | number | null) => (
    <Grid item xs={12} sm={6} md={4}>
      <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#f8fafc', border: '1px solid #eef2f6', height: '100%' }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px', mb: 0.5, display: 'block' }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', wordBreak: 'break-word' }}>
          {valor === undefined || valor === null || valor === '' ? '—' : valor}
        </Typography>
      </Box>
    </Grid>
  );

  // 🆕 Versión "tablita" para Datos Generales — filas de [etiqueta, valor].
  const tablaCampos = (filas: [string, string | number | null | undefined][]) => (
    <TableContainer component={Card} variant="outlined" sx={{ borderRadius: 2, boxShadow: 'none' }}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f1f5f9' }}>
            <TableCell sx={{ fontWeight: 700, width: '40%' }}>Campo</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filas.map(([label, valor]) => (
            <TableRow key={label}>
              <TableCell sx={{ fontWeight: 600 }}>{label}</TableCell>
              <TableCell sx={{ wordBreak: 'break-word' }}>{valor === undefined || valor === null || valor === '' ? '—' : valor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const tarjeta = (children: React.ReactNode) => (
    <Card elevation={0} sx={{ mb: 2.5, borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.04)' }}>
      <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>{children}</CardContent>
    </Card>
  );

  // 💰 Formatea un valor de moneda; si es 0 (o no se ingresó), devuelve null
  // para que la tabla no lo muestre — "solo lo que sí se ingresó".
  const fmtMoneda = (valor: number | undefined, simbolo: string, sufijo = '') =>
    valor && valor > 0 ? `${simbolo}${Number(valor).toLocaleString()}${sufijo}` : null;

  return (
    <Box>
      <EncabezadoProceso
        nombreProyecto={detalle.proyecto_nombre || ''}
        nombreProceso={`Orden Interna — ${detalle.numero_oi}`}
        estado={estado}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
        <Chip label={detalle.tipo_orden} size="small" variant="outlined" sx={{ fontWeight: 600 }} />
        {detalle.es_control_cambios && <Chip label="Control de Cambios" size="small" color="secondary" variant="outlined" sx={{ fontWeight: 600 }} />}
        <Box sx={{ flexGrow: 1 }} />
        {puedeEditarYEnviar && (
          <>
            <Button size="small" onClick={onEditar}>Editar</Button>
            <Button size="small" variant="contained" color="primary" onClick={abrirDialogoEnviar}>Enviar a Control Gestión</Button>
          </>
        )}
        {puedeAprobarORechazar && (
          <>
            <Button size="small" color="error" onClick={() => setDialogoRechazar(true)}>Rechazar</Button>
            <Button size="small" variant="contained" color="success" onClick={() => setDialogoAprobar(true)}>Aprobar</Button>
          </>
        )}
        {puedeCerrar && (
          <Button size="small" variant="contained" color="warning" onClick={confirmarCerrar} disabled={procesando}>Cerrar Orden</Button>
        )}
      </Box>

      {tituloSeccion('Datos Generales')}
      {tarjeta(
        tablaCampos([
          ['Centro de Costos', detalle.centro_costos],
          ['Oficina de Ventas', detalle.oficina_ventas],
          ['Línea de Marca', detalle.linea_marca],
          ['Cliente', detalle.cliente],
          ['Ramo', detalle.ramo],
          ['%', detalle.porcentaje_1],
        ])
      )}

      {tarjeta(
        tablaCampos([
          ...(detalle.tipo_orden === 'ACTIVO'
            ? ([
                ['Activo Fijo en curso', detalle.activo_fijo_curso],
                ['Tipo de activo', detalle.tipo_activo],
                ['%', detalle.porcentaje_2],
                ['Activo Real Productivo', detalle.activo_real_productivo],
              ] as [string, string | number | null | undefined][])
            : []),
          [
            'Presupuesto',
            detalle.presupuesto
              ? `${detalle.presupuesto_moneda === 'USD' ? 'US$' : '$'}${Number(detalle.presupuesto).toLocaleString()}${detalle.presupuesto_moneda === 'COP' ? ' COP' : ''}`
              : undefined,
          ],
        ])
      )}

      {detalle.es_control_cambios && detalle.oi_valores?.length > 0 && (
        <>
          {tituloSeccion('Valor Total del Proyecto')}
          <Card elevation={0} sx={{ mb: 2.5, borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.04)' }}>
            <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
              <TableContainer component={Card} variant="outlined" sx={{ borderRadius: 2, boxShadow: 'none' }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f1f5f9' }}>
                      <TableCell sx={{ fontWeight: 700, width: '34%' }}>Categoría</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>Valor USD</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>Valor COP</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {detalle.oi_valores.map((v, i) => (
                      <TableRow key={i}>
                        <TableCell sx={{ fontWeight: 600 }}>{v.categoria === 'ACTIVO' ? 'Activo' : 'Gasto'}</TableCell>
                        <TableCell align="center">{fmtMoneda(v.usd, 'US$') || '—'}</TableCell>
                        <TableCell align="center">{fmtMoneda(v.cop, '$', ' COP') || '—'}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                      <TableCell sx={{ fontWeight: 800, color: '#0e381e' }}>TOTAL</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 800, color: '#0e381e' }}>
                        {fmtMoneda(detalle.oi_valores.reduce((s, v) => s + Number(v.usd || 0), 0), 'US$') || '—'}
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 800, color: '#0e381e' }}>
                        {fmtMoneda(detalle.oi_valores.reduce((s, v) => s + Number(v.cop || 0), 0), '$', ' COP') || '—'}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </>
      )}

      {(detalle.grupo_texto || detalle.observaciones_cg) && (
        <>
          {tituloSeccion('Sección 4 — Control Gestión')}
          {tarjeta(
            <Grid container spacing={2}>
              {campo('Grupo de Órdenes Internas', detalle.grupo_texto)}
              {campo('Observaciones', detalle.observaciones_cg)}
            </Grid>
          )}
        </>
      )}

      {tituloSeccion('Histórico de esta Orden Interna')}
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

      {detalle.controles_cambio && onVerControlCambio && (
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="info" onClick={() => onVerControlCambio(detalle.controles_cambio!.proceso_id)}>
            Ver Control de Cambios relacionado
          </Button>
        </Box>
      )}

      {/* Diálogo: enviar */}
      <Dialog open={dialogoEnviar} onClose={() => setDialogoEnviar(false)} fullWidth maxWidth="xs">
        <DialogTitle>Enviar a Control Gestión</DialogTitle>
        <DialogContent>
          <Autocomplete
            options={cgDisponibles}
            getOptionLabel={(u) => u.nombre}
            value={cgElegido}
            onChange={(_, v) => setCgElegido(v)}
            renderInput={(params) => <TextField {...params} label="¿A quién de Control Gestión se envía?" sx={{ mt: 1 }} />}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogoEnviar(false)}>Cancelar</Button>
          <Button variant="contained" onClick={confirmarEnviar} disabled={procesando || !cgElegido}>Enviar</Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo: aprobar (Sección 4) */}
      <Dialog open={dialogoAprobar} onClose={() => setDialogoAprobar(false)} fullWidth maxWidth="sm">
        <DialogTitle>Aprobar Orden Interna</DialogTitle>
        <DialogContent>
          <TextField autoFocus fullWidth label="Grupo de Órdenes Internas *" value={grupoTexto}
            onChange={(e) => setGrupoTexto(e.target.value)} sx={{ mt: 1, mb: 2 }} />
          <TextField fullWidth multiline minRows={2} label="Observaciones (opcional)" value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogoAprobar(false)}>Cancelar</Button>
          <Button variant="contained" color="success" onClick={confirmarAprobar} disabled={procesando}>Aprobar</Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo: rechazar */}
      <Dialog open={dialogoRechazar} onClose={() => setDialogoRechazar(false)} fullWidth maxWidth="sm">
        <DialogTitle>Rechazar Orden Interna</DialogTitle>
        <DialogContent>
          <TextField autoFocus fullWidth multiline minRows={3} label="Observación del rechazo (obligatoria)" value={razonRechazo}
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