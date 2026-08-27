import { useState, useEffect } from 'react';
import {
  Box, Typography, Chip, Button, TextField, Dialog, DialogTitle, DialogContent,
  DialogActions, Autocomplete, CircularProgress, Card, CardContent, RadioGroup,
  FormControlLabel, Radio, Link, TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
} from '@mui/material';
import { useAuth } from '../../../auth/AuthContext';
import type { ActaCierreDetalle } from '../types/actaCierre.types';
import type { UsuarioActivo } from '../../solicitud-inversion/types/solicitud.types';
import {
  obtenerActaCierreDetalle, enviarActaCierre, aprobarActaCierre, rechazarActaCierre,
} from '../service/actasCierre.service';
import { obtenerUsuariosPorRol } from '../../solicitud-inversion/services/solicitudInversion.service';

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

const ESTADO_CONFIG: Record<string, { label: string; color: 'default' | 'warning' | 'success' | 'info' }> = {
  BORRADOR: { label: 'Borrador', color: 'default' },
  PENDIENTE_PMO: { label: 'Pendiente PMO', color: 'warning' },
  CONTROL_GESTION: { label: 'Control Gestión', color: 'warning' },
  VERIFICACION_PARTES_INTERESADAS: { label: 'Verificación Partes Interesadas', color: 'warning' },
  DIRECCION_PMO: { label: 'Dirección PMO', color: 'warning' },
  GERENCIA: { label: 'Gerencia', color: 'warning' },
  PRESIDENCIA: { label: 'Presidencia', color: 'warning' },
  CERRADO: { label: 'Cerrado', color: 'success' },
};

const ROLES_POR_ETAPA: Record<string, string[]> = {
  PENDIENTE_PMO: ['PMO', 'ADMIN'],
  CONTROL_GESTION: [],
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
}

export function DetalleActaCierre({ procesoId, companiaId, onCambio, onEditar }: Props) {
  const { usuario, tieneRol } = useAuth();
  const [detalle, setDetalle] = useState<ActaCierreDetalle | null>(null);
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
      const data = await obtenerActaCierreDetalle(procesoId);
      setDetalle(data);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => { cargar(); }, [procesoId]);

  if (cargando || !detalle) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}><CircularProgress size={24} color="secondary" /></Box>;

  const estado = detalle.procesos.estado_actual;
  const esDueno = detalle.pm?.id === usuario?.id;
  const esAdmin = tieneRol('ADMIN');

  const rolesQuePuedenAprobar = ROLES_POR_ETAPA[estado] || [];
  const tieneRolDeEtapa = rolesQuePuedenAprobar.some((r) => tieneRol(r));

  const estaAsignadoComoControlGestion =
    estado === 'CONTROL_GESTION' &&
    detalle.procesos.asignaciones_proceso.some(
      (a) => a.etapa === 'CONTROL_GESTION' && a.estado_asignacion === 'PENDIENTE' && Number(a.usuarios?.id) === Number(usuario?.id),
    );
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
  const puedeAprobarORechazar = tieneRolDeEtapa || estaAsignadoComoControlGestion || estaAsignadoComoParteInteresada || estaAsignadoComoGerente;

  const manejarEnviar = async () => {
    setProcesando(true);
    try {
      await enviarActaCierre(procesoId);
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
      await aprobarActaCierre(procesoId, comentarios, undefined, gerenteElegido.id);
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
      await aprobarActaCierre(procesoId, comentarios);
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
      await aprobarActaCierre(procesoId, comentarios, enviarPresidencia === 'si');
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
      await rechazarActaCierre(procesoId, razonRechazo);
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

  const fmt = (valor: number | null | undefined, simbolo: string) =>
    valor && valor > 0 ? `${simbolo}${Number(valor).toLocaleString()}` : '—';

  const partesActuales = detalle.procesos.asignaciones_proceso.filter((a) => a.etapa === 'VERIFICACION_PARTES_INTERESADAS');
  const hayCc = detalle.comparacion.valores_cc.length > 0;

  // 🔗 Cruzamos flujo de caja Planeado (SI) con Real (Acta) por tipo/moneda/año/mes
  const filasFlujo = detalle.comparacion.flujo_caja_planeado.map((p) => {
    const real = detalle.acta_cierre_flujo_caja.find(
      (r) => r.tipo === p.tipo && r.moneda === p.moneda && r.anio === p.anio && r.mes === p.mes,
    );
    return { ...p, real: Number(real?.monto_real) || 0 };
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
        <Chip label={detalle.tipo_cierre === 'CULMINACION' ? 'Culminación' : 'Cancelación'} size="small" variant="outlined" sx={{ fontWeight: 600 }} />
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

      {tituloSeccion('Información General')}
      {tarjeta(
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          {campo('Control Gestión asignado', detalle.control_gestion?.nombre)}
          {detalle.presentacion_p5_link
            ? (
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#f8fafc', border: '1px solid #eef2f6' }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px', mb: 0.5, display: 'block' }}>
                  Presentación de Puertas 5
                </Typography>
                <Link href={detalle.presentacion_p5_link} target="_blank" rel="noopener noreferrer" sx={{ wordBreak: 'break-all' }}>{detalle.presentacion_p5_link}</Link>
              </Box>
            )
            : campo('Presentación de Puertas 5', null)}
        </Box>
      )}

      {tituloSeccion('Entregable Planeado')}
      {tarjeta(
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          {campo('Entregable Inicial (SI)', detalle.comparacion.entregable_inicial)}
          {campo('Entregable Real', detalle.entregable_real)}
        </Box>
      )}

      {detalle.acta_cierre_metas.length > 0 && (
        <>
          {tituloSeccion('Metas')}
          <Card elevation={0} sx={{ mb: 2.5, borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.04)' }}>
            <CardContent sx={{ p: 3 }}>
              <TableContainer sx={{ overflowX: 'auto' }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f1f5f9' }}>
                      <TableCell sx={{ fontWeight: 700 }}>Compromiso P3</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Fecha inicio medición</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Indicador</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Resultados del escalamiento / Cierre</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {detalle.acta_cierre_metas.map((m) => (
                      <TableRow key={m.id}>
                        <TableCell>{m.solicitud_metas.compromiso}</TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>{new Date(m.solicitud_metas.fecha_inicio).toLocaleDateString()}</TableCell>
                        <TableCell>{m.solicitud_metas.indicador}</TableCell>
                        <TableCell>{m.resultado_cierre || '—'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </>
      )}

      {tituloSeccion('Valor Total del Proyecto')}
      <Card elevation={0} sx={{ mb: 2.5, borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.04)' }}>
        <CardContent sx={{ p: 3 }}>
          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table size="small" sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f1f5f9' }}>
                  <TableCell sx={{ fontWeight: 700 }}>Categoría</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700 }}>Inicial (SI)</TableCell>
                  {hayCc && <TableCell align="center" sx={{ fontWeight: 700 }}>Inicial (Control de Cambios)</TableCell>}
                  <TableCell align="center" sx={{ fontWeight: 700 }}>Real</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(['ACTIVO', 'GASTO'] as const).map((cat) => {
                  const si = detalle.comparacion.valores_si.find((v) => v.categoria === cat);
                  const cc = detalle.comparacion.valores_cc.find((v) => v.categoria === cat);
                  const real = detalle.acta_cierre_valores.find((v) => v.categoria === cat);
                  return (
                    <TableRow key={cat}>
                      <TableCell sx={{ fontWeight: 700 }}>{cat === 'ACTIVO' ? 'Activo' : 'Gasto'}</TableCell>
                      <TableCell align="center">{fmt(si?.usd, 'US$')} / {fmt(si?.cop, '$')}</TableCell>
                      {hayCc && <TableCell align="center">{fmt(cc?.usd, 'US$')} / {fmt(cc?.cop, '$')}</TableCell>}
                      <TableCell align="center">{fmt(real?.real_usd, 'US$')} / {fmt(real?.real_cop, '$')}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {detalle.explicacion_ejecucion && (
            <Box sx={{ mt: 2 }}>{campo('Explicación de sobre/sub-ejecución', detalle.explicacion_ejecucion)}</Box>
          )}
        </CardContent>
      </Card>

      {filasFlujo.length > 0 && (
        <>
          {tituloSeccion('Flujo de Caja — Planeado vs. Real')}
          <Card elevation={0} sx={{ mb: 2.5, borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.04)' }}>
            <CardContent sx={{ p: 3 }}>
              {(['CAPEX', 'GCAPEX', 'OPEX'] as const).map((tipo) => {
                const filas = filasFlujo.filter((f) => f.tipo === tipo);
                if (filas.length === 0) return null;
                return (
                  <Box key={tipo} sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>{tipo}</Typography>
                    <TableContainer sx={{ overflowX: 'auto' }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ backgroundColor: '#f1f5f9' }}>
                            <TableCell sx={{ fontWeight: 700 }}>Mes</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Año</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Moneda</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 700 }}>Planeado</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 700 }}>Real</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filas.map((f, i) => (
                            <TableRow key={i}>
                              <TableCell>{MESES[f.mes - 1]}</TableCell>
                              <TableCell>{f.anio}</TableCell>
                              <TableCell>{f.moneda}</TableCell>
                              <TableCell align="right">{Number(f.monto || 0).toLocaleString()}</TableCell>
                              <TableCell align="right">{f.real.toLocaleString()}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                );
              })}
            </CardContent>
          </Card>
        </>
      )}

      {detalle.acta_cierre_oi_valores_reales.length > 0 && (
        <>
          {tituloSeccion('Órdenes Internas y de Mantenimiento')}
          <Card elevation={0} sx={{ mb: 2.5, borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.04)' }}>
            <CardContent sx={{ p: 3 }}>
              <TableContainer sx={{ overflowX: 'auto' }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f1f5f9' }}>
                      <TableCell sx={{ fontWeight: 700 }}>N° OI</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Nombre descriptivo</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Activo/Gasto</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>PPT OI</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>Valor Real</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {detalle.acta_cierre_oi_valores_reales.map((o) => (
                      <TableRow key={o.id}>
                        <TableCell sx={{ fontWeight: 600 }}>{o.ordenes_internas.numero_oi}</TableCell>
                        <TableCell>{o.ordenes_internas.nombre_descriptivo}</TableCell>
                        <TableCell>{o.ordenes_internas.tipo_orden === 'ACTIVO' ? 'Activo' : 'Gasto'}</TableCell>
                        <TableCell align="right">{fmt(o.ordenes_internas.presupuesto, o.ordenes_internas.presupuesto_moneda === 'USD' ? 'US$' : '$')}</TableCell>
                        <TableCell align="right">{fmt(o.valor_real, o.valor_real_moneda === 'USD' ? 'US$' : '$')}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </>
      )}

      {(detalle.acta_cierre_entregables.length > 0 || detalle.otros_entregables) && (
        <>
          {tituloSeccion('Entregable')}
          <Card elevation={0} sx={{ mb: 2.5, borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.04)' }}>
            <CardContent sx={{ p: 3 }}>
              {detalle.acta_cierre_entregables.length > 0 && (
                <TableContainer sx={{ overflowX: 'auto', mb: detalle.otros_entregables ? 2 : 0 }}>
                  <Table size="small" sx={{ minWidth: 750 }}>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#f1f5f9' }}>
                        <TableCell sx={{ fontWeight: 700 }}>Equipo / Sistema</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Cód. activo en producción</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Cód. activo en montaje</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Unidad vida útil</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Vida útil</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Observaciones</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Anexo</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {detalle.acta_cierre_entregables.map((e) => (
                        <TableRow key={e.id}>
                          <TableCell sx={{ fontWeight: 600 }}>{e.equipo_sistema}</TableCell>
                          <TableCell>{e.codigo_activo_produccion || '—'}</TableCell>
                          <TableCell>{e.codigo_activo_montaje || '—'}</TableCell>
                          <TableCell>{e.unidad_vida_util || '—'}</TableCell>
                          <TableCell>{e.vida_util ?? '—'}</TableCell>
                          <TableCell>{e.observaciones || '—'}</TableCell>
                          <TableCell>{e.anexo_url ? <Link href={e.anexo_url} target="_blank" rel="noopener noreferrer">Ver</Link> : '—'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              {detalle.otros_entregables && campo('Otros entregables', detalle.otros_entregables)}
            </CardContent>
          </Card>
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

      {tituloSeccion('Histórico de este Acta de Cierre')}
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

      {/* Diálogo: aprobar simple */}
      <Dialog open={dialogoAprobar} onClose={() => setDialogoAprobar(false)} fullWidth maxWidth="sm">
        <DialogTitle>Aprobar Acta de Cierre</DialogTitle>
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
        <DialogTitle>Rechazar Acta de Cierre</DialogTitle>
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