import { useState, useEffect } from 'react';
import {
  Box, Typography, Button, TextField, MenuItem, RadioGroup, FormControlLabel, Radio,
  Alert, CircularProgress, Divider, Card, CardContent, IconButton, FormLabel, Autocomplete,
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import type {
  CrearActaCierrePayload, TipoCierre, ActaCierreEntregablePayload,
} from '../types/actaCierre.types';
import type { UsuarioActivo } from '../../solicitud-inversion/types/solicitud.types';
import { crearActaCierre, actualizarActaCierre, obtenerActaCierreDetalle, actualizarPartesInteresadasAc } from '../service/actasCierre.service';
import {
  obtenerUsuariosPorRol, obtenerPartesInteresadas, obtenerSolicitudInversion,
} from '../../solicitud-inversion/services/solicitudInversion.service';
import { obtenerProcesosPorProyecto } from '../../proyectos/services/proyectos.service';
import { obtenerOrdenesInternasPorProyecto } from '../../ordenes-internas/services/ordenesInternas.service';

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

interface FilaMeta {
  solicitud_meta_id: number;
  compromiso: string;
  fecha_inicio: string;
  indicador: string;
  resultado_cierre: string;
}

interface FilaFlujoCaja {
  tipo: 'CAPEX' | 'GCAPEX' | 'OPEX';
  moneda: 'USD' | 'COP';
  anio: number;
  mes: number;
  planeado: number;
  monto_real: number;
}

interface FilaOiValorReal {
  orden_interna_id: number;
  numero_oi: string;
  nombre_descriptivo: string;
  tipo_orden: string;
  presupuesto?: number;
  presupuesto_moneda?: string;
  valor_real: number;
  valor_real_moneda: 'USD' | 'COP';
}

interface Props {
  proyectoId: string;
  companiaId: number;
  procesoId?: number; // si viene, es edición de un Borrador existente
  onCancelar: () => void;
  onGuardado: (procesoId: number) => void;
}

export function FormularioActaCierre({ proyectoId, companiaId, procesoId, onCancelar, onGuardado }: Props) {
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [tipoCierre, setTipoCierre] = useState<TipoCierre>('CULMINACION');
  const [cgAsignado, setCgAsignado] = useState<UsuarioActivo | null>(null);
  const [p5Link, setP5Link] = useState('');
  const [entregableInicial, setEntregableInicial] = useState<string | null>(null);
  const [entregableReal, setEntregableReal] = useState('');

  const [metas, setMetas] = useState<FilaMeta[]>([]);

  const [valorActivo, setValorActivo] = useState({ usd: 0, cop: 0 });
  const [valorGasto, setValorGasto] = useState({ usd: 0, cop: 0 });
  const [explicacionEjecucion, setExplicacionEjecucion] = useState('');

  const [flujoCaja, setFlujoCaja] = useState<FilaFlujoCaja[]>([]);

  const [oiValoresReales, setOiValoresReales] = useState<FilaOiValorReal[]>([]);

  const [entregables, setEntregables] = useState<ActaCierreEntregablePayload[]>([]);
  const [otrosEntregables, setOtrosEntregables] = useState('');

  const [usuariosCG, setUsuariosCG] = useState<UsuarioActivo[]>([]);
  const [usuariosDisponibles, setUsuariosDisponibles] = useState<UsuarioActivo[]>([]);
  const [partesSeleccionadas, setPartesSeleccionadas] = useState<UsuarioActivo[]>([]);

  useEffect(() => {
    (async () => {
      try {
        setCargando(true);

        const [cgDisponibles, partesDisponibles, procesos, ordenesGrupo] = await Promise.all([
          obtenerUsuariosPorRol('CONTROL_GESTION', companiaId),
          obtenerPartesInteresadas(companiaId),
          obtenerProcesosPorProyecto(proyectoId),
          obtenerOrdenesInternasPorProyecto(proyectoId).catch(() => null),
        ]);
        setUsuariosCG(cgDisponibles);
        setUsuariosDisponibles(partesDisponibles);

        // --- Datos de la SI aprobada (entregable, metas, flujo de caja planeado) ---
                const procesoSi = procesos.find((p) => p.tipo_proceso === 'SOLICITUD_INVERSION' && p.estado_actual === 'APROBADO_FINAL');
        if (procesoSi) {
          const si = await obtenerSolicitudInversion(procesoSi.id);
          setEntregableInicial(si.solicitudes_inversion?.entregable_planeado ?? null);

          if (!procesoId) {
            setMetas(
              (si.solicitudes_inversion?.solicitud_metas || []).map((m: any) => ({
                solicitud_meta_id: m.id,
                compromiso: m.compromiso,
                fecha_inicio: m.fecha_inicio,
                indicador: m.indicador,
                resultado_cierre: '',
              })),
            );
            setFlujoCaja(
              (si.solicitudes_inversion?.solicitud_flujo_caja || []).map((f: any) => ({
                tipo: f.tipo,
                moneda: f.moneda,
                anio: f.anio,
                mes: f.mes,
                planeado: Number(f.monto) || 0,
                monto_real: 0,
              })),
            );
          }
        }

        // --- Órdenes Internas del proyecto (para "Valor Real" por cada una) ---
        const ordenesInternas = ordenesGrupo?.ordenes_internas || [];
        if (!procesoId) {
          setOiValoresReales(
            ordenesInternas.map((oi: any) => ({
              orden_interna_id: oi.id,
              numero_oi: oi.numero_oi,
              nombre_descriptivo: oi.nombre_descriptivo,
              tipo_orden: oi.tipo_orden,
              presupuesto: oi.presupuesto ? Number(oi.presupuesto) : undefined,
              presupuesto_moneda: oi.presupuesto_moneda,
              valor_real: 0,
              valor_real_moneda: (oi.presupuesto_moneda as 'USD' | 'COP') || 'COP',
            })),
          );
        }

        // --- Si es edición, cargar lo ya guardado ---
        if (procesoId) {
          const detalle = await obtenerActaCierreDetalle(procesoId);
          setTipoCierre(detalle.tipo_cierre);
          setP5Link(detalle.presentacion_p5_link || '');
          setEntregableReal(detalle.entregable_real || '');
          setExplicacionEjecucion(detalle.explicacion_ejecucion || '');
          setOtrosEntregables(detalle.otros_entregables || '');
          setCgAsignado(detalle.control_gestion ? { id: detalle.control_gestion.id, nombre: detalle.control_gestion.nombre, email: detalle.control_gestion.email || '' } : null);

          setMetas(
            detalle.acta_cierre_metas.map((m) => ({
              solicitud_meta_id: m.solicitud_meta_id,
              compromiso: m.solicitud_metas.compromiso,
              fecha_inicio: m.solicitud_metas.fecha_inicio,
              indicador: m.solicitud_metas.indicador,
              resultado_cierre: m.resultado_cierre || '',
            })),
          );

          const vActivo = detalle.acta_cierre_valores.find((v) => v.categoria === 'ACTIVO');
          const vGasto = detalle.acta_cierre_valores.find((v) => v.categoria === 'GASTO');
          setValorActivo({ usd: Number(vActivo?.real_usd) || 0, cop: Number(vActivo?.real_cop) || 0 });
          setValorGasto({ usd: Number(vGasto?.real_usd) || 0, cop: Number(vGasto?.real_cop) || 0 });

          setFlujoCaja(
            detalle.acta_cierre_flujo_caja.map((f) => ({
              tipo: f.tipo, moneda: f.moneda, anio: f.anio, mes: f.mes,
              planeado: 0, // se re-cruza abajo con lo planeado de la SI
              monto_real: Number(f.monto_real) || 0,
            })),
          );

          setOiValoresReales(
            detalle.acta_cierre_oi_valores_reales.map((o) => ({
              orden_interna_id: o.orden_interna_id,
              numero_oi: o.ordenes_internas.numero_oi,
              nombre_descriptivo: o.ordenes_internas.nombre_descriptivo,
              tipo_orden: o.ordenes_internas.tipo_orden,
              presupuesto: o.ordenes_internas.presupuesto ? Number(o.ordenes_internas.presupuesto) : undefined,
              presupuesto_moneda: o.ordenes_internas.presupuesto_moneda || undefined,
              valor_real: Number(o.valor_real) || 0,
              valor_real_moneda: (o.valor_real_moneda as 'USD' | 'COP') || 'COP',
            })),
          );

          setEntregables(
            detalle.acta_cierre_entregables.map((e) => ({
              equipo_sistema: e.equipo_sistema,
              codigo_activo_produccion: e.codigo_activo_produccion || '',
              codigo_activo_montaje: e.codigo_activo_montaje || '',
              unidad_vida_util: e.unidad_vida_util || '',
              vida_util: e.vida_util ?? undefined,
              observaciones: e.observaciones || '',
              anexo_url: e.anexo_url || '',
            })),
          );

          const actuales = detalle.procesos.asignaciones_proceso
            .filter((a) => a.etapa === 'VERIFICACION_PARTES_INTERESADAS')
            .map((a) => a.usuarios)
            .filter((u): u is NonNullable<typeof u> => !!u) as UsuarioActivo[];
          setPartesSeleccionadas(actuales);
        }
      } catch {
        setError('No se pudieron cargar los datos necesarios para el Acta de Cierre.');
      } finally {
        setCargando(false);
      }
    })();
  }, [proyectoId, procesoId, companiaId]);

  const agregarEntregable = () =>
    setEntregables((prev) => [...prev, { equipo_sistema: '', codigo_activo_produccion: '', codigo_activo_montaje: '', unidad_vida_util: '', vida_util: undefined, observaciones: '', anexo_url: '' }]);
  const quitarEntregable = (index: number) => setEntregables((prev) => prev.filter((_, i) => i !== index));
  const actualizarEntregable = (index: number, patch: Partial<ActaCierreEntregablePayload>) =>
    setEntregables((prev) => prev.map((e, i) => (i === index ? { ...e, ...patch } : e)));

  const guardar = async () => {
    try {
      setGuardando(true);
      setError(null);

      if (!cgAsignado) throw new Error('Debes elegir quién de Control Gestión revisará este cierre.');

      const payload: CrearActaCierrePayload = {
        proyecto_id: proyectoId,
        tipo_cierre: tipoCierre,
        control_gestion_asignado_id: cgAsignado.id,
        presentacion_p5_link: p5Link.trim() || undefined,
        entregable_real: entregableReal.trim() || undefined,
        explicacion_ejecucion: explicacionEjecucion.trim() || undefined,
        otros_entregables: otrosEntregables.trim() || undefined,
        metas: metas.map((m) => ({ solicitud_meta_id: m.solicitud_meta_id, resultado_cierre: m.resultado_cierre.trim() || undefined })),
        valores: [
          { categoria: 'ACTIVO', real_usd: valorActivo.usd, real_cop: valorActivo.cop },
          { categoria: 'GASTO', real_usd: valorGasto.usd, real_cop: valorGasto.cop },
        ],
        flujo_caja: flujoCaja.map((f) => ({ tipo: f.tipo, moneda: f.moneda, anio: f.anio, mes: f.mes, monto_real: f.monto_real })),
        entregables: entregables.filter((e) => e.equipo_sistema.trim()),
        oi_valores_reales: oiValoresReales.map((o) => ({ orden_interna_id: o.orden_interna_id, valor_real: o.valor_real, valor_real_moneda: o.valor_real_moneda })),
      };

      let procesoIdResultante: number;
      if (procesoId) {
        await actualizarActaCierre(procesoId, payload);
        procesoIdResultante = procesoId;
      } else {
        const respuesta = await crearActaCierre(payload);
        procesoIdResultante = respuesta.proceso_id;
      }

      await actualizarPartesInteresadasAc(procesoIdResultante, partesSeleccionadas.map((u) => u.id));

      onGuardado(procesoIdResultante);
    } catch (err: any) {
      setError(err.message || err.response?.data?.message || 'Error al guardar el Acta de Cierre.');
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress color="secondary" /></Box>;

  const flujoPorTipo = (tipo: 'CAPEX' | 'GCAPEX' | 'OPEX') => flujoCaja.filter((f) => f.tipo === tipo);

  return (
    <Box sx={{ mt: 4, p: 3, border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
      <Button startIcon={<ArrowBackIcon />} onClick={onCancelar} sx={{ mb: 2, color: '#64748b' }}>Cancelar</Button>
      <Typography variant="h6" sx={{ mb: 0.5 }}>Acta de Cierre</Typography>

      {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}

      {/* Información General */}
      <Card sx={{ mb: 4, mt: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Información General</Typography>

          <FormLabel sx={{ fontWeight: 600, fontSize: '0.9rem', color: 'text.primary' }}>Tipo de cierre</FormLabel>
          <RadioGroup row value={tipoCierre} onChange={(e) => setTipoCierre(e.target.value as TipoCierre)} sx={{ mb: 2 }}>
            <FormControlLabel value="CULMINACION" control={<Radio />} label="Culminación (el proyecto se ejecutó)" />
            <FormControlLabel value="CANCELACION" control={<Radio />} label="Cancelación (el proyecto se cancela)" />
          </RadioGroup>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <Autocomplete
              options={usuariosCG}
              getOptionLabel={(u) => u.nombre}
              value={cgAsignado}
              onChange={(_, v) => setCgAsignado(v)}
              renderInput={(params) => <TextField {...params} label="¿Quién de Control Gestión revisa este cierre? *" />}
            />
            <TextField label="Presentación de Puertas 5 (link)" value={p5Link} onChange={(e) => setP5Link(e.target.value)} />
          </Box>
        </CardContent>
      </Card>

      {/* Entregable Planeado */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Entregable Planeado</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                        <TextField label="Entregable Inicial (de la SI)" value={entregableInicial || '—'} slotProps={{ input: { readOnly: true } }} sx={{ bgcolor: '#f1f5f9' }} />
            <TextField label="Entregable Real" multiline minRows={2} value={entregableReal} onChange={(e) => setEntregableReal(e.target.value)} />
          </Box>
        </CardContent>
      </Card>

      {/* Metas */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Metas</Typography>
          {metas.length === 0 ? (
            <Typography variant="body2" color="text.secondary">La Solicitud de Inversión de este proyecto no registró metas.</Typography>
          ) : (
            <TableContainer sx={{ overflowX: 'auto' }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Compromiso P3</TableCell>
                    <TableCell>Fecha inicio medición</TableCell>
                    <TableCell>Indicador</TableCell>
                    <TableCell sx={{ minWidth: 220 }}>Resultados del escalamiento / Cierre</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {metas.map((m, i) => (
                    <TableRow key={m.solicitud_meta_id}>
                      <TableCell>{m.compromiso}</TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>{new Date(m.fecha_inicio).toLocaleDateString()}</TableCell>
                      <TableCell>{m.indicador}</TableCell>
                      <TableCell>
                        <TextField size="small" fullWidth value={m.resultado_cierre}
                          onChange={(e) => setMetas((prev) => prev.map((x, j) => (j === i ? { ...x, resultado_cierre: e.target.value } : x)))} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Valor Total del Proyecto */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Valor Total del Proyecto (Real)</Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
            El comparativo contra lo planeado en la SI (y contra Control de Cambios, si aplica) se muestra en la vista una vez guardada el Acta.
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: 2, alignItems: 'center', mb: 1 }}>
            <Typography sx={{ fontWeight: 700 }}>ACTIVO</Typography>
            <TextField size="small" label="Real USD" type="number" value={valorActivo.usd || ''} onChange={(e) => setValorActivo((p) => ({ ...p, usd: Number(e.target.value) || 0 }))} />
            <TextField size="small" label="Real COP" type="number" value={valorActivo.cop || ''} onChange={(e) => setValorActivo((p) => ({ ...p, cop: Number(e.target.value) || 0 }))} />
            <Typography sx={{ fontWeight: 700 }}>GASTO</Typography>
            <TextField size="small" label="Real USD" type="number" value={valorGasto.usd || ''} onChange={(e) => setValorGasto((p) => ({ ...p, usd: Number(e.target.value) || 0 }))} />
            <TextField size="small" label="Real COP" type="number" value={valorGasto.cop || ''} onChange={(e) => setValorGasto((p) => ({ ...p, cop: Number(e.target.value) || 0 }))} />
          </Box>
          <TextField fullWidth multiline minRows={2} label="Explicación de sobre/sub-ejecución" value={explicacionEjecucion}
            onChange={(e) => setExplicacionEjecucion(e.target.value)} sx={{ mt: 1 }} />
        </CardContent>
      </Card>

      {/* Flujo de Caja */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Flujo de Caja — Planeado vs. Real</Typography>
          {flujoCaja.length === 0 ? (
            <Typography variant="body2" color="text.secondary">La SI de este proyecto no registró flujo de caja.</Typography>
          ) : (
            (['CAPEX', 'GCAPEX', 'OPEX'] as const).map((tipo) => {
              const filas = flujoPorTipo(tipo);
              if (filas.length === 0) return null;
              return (
                <Box key={tipo} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>{tipo}</Typography>
                  <TableContainer sx={{ overflowX: 'auto' }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Mes</TableCell>
                          <TableCell>Año</TableCell>
                          <TableCell>Moneda</TableCell>
                          <TableCell align="right">Planeado</TableCell>
                          <TableCell align="right" sx={{ minWidth: 140 }}>Real</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filas.map((f) => {
                          const idxGlobal = flujoCaja.findIndex((x) => x === f);
                          return (
                            <TableRow key={`${f.tipo}-${f.moneda}-${f.anio}-${f.mes}`}>
                              <TableCell>{MESES[f.mes - 1]}</TableCell>
                              <TableCell>{f.anio}</TableCell>
                              <TableCell>{f.moneda}</TableCell>
                              <TableCell align="right">{f.planeado.toLocaleString()}</TableCell>
                              <TableCell align="right">
                                <TextField size="small" type="number" value={f.monto_real || ''}
                                  onChange={(e) => setFlujoCaja((prev) => prev.map((x, j) => (j === idxGlobal ? { ...x, monto_real: Number(e.target.value) || 0 } : x)))} />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              );
            })
          )}
        </CardContent>
      </Card>

      {/* Órdenes Internas y de Mantenimiento */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Órdenes Internas y de Mantenimiento</Typography>
          {oiValoresReales.length === 0 ? (
            <Typography variant="body2" color="text.secondary">Este proyecto no tiene Órdenes Internas.</Typography>
          ) : (
            <TableContainer sx={{ overflowX: 'auto' }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>N° OI</TableCell>
                    <TableCell>Nombre descriptivo</TableCell>
                    <TableCell>Activo/Gasto</TableCell>
                    <TableCell align="right">PPT OI</TableCell>
                    <TableCell align="right" sx={{ minWidth: 140 }}>Valor Real</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {oiValoresReales.map((o, i) => (
                    <TableRow key={o.orden_interna_id}>
                      <TableCell sx={{ fontWeight: 600 }}>{o.numero_oi}</TableCell>
                      <TableCell>{o.nombre_descriptivo}</TableCell>
                      <TableCell>{o.tipo_orden === 'ACTIVO' ? 'Activo' : 'Gasto'}</TableCell>
                      <TableCell align="right">{o.presupuesto ? `${o.presupuesto_moneda === 'USD' ? 'US$' : '$'}${o.presupuesto.toLocaleString()}` : '—'}</TableCell>
                      <TableCell align="right">
                        <TextField size="small" type="number" value={o.valor_real || ''}
                          onChange={(e) => setOiValoresReales((prev) => prev.map((x, j) => (j === i ? { ...x, valor_real: Number(e.target.value) || 0 } : x)))} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Entregable (equipos/sistemas) */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Entregable</Typography>
          {entregables.map((ent, i) => (
            <Box key={i} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr 40px' }, gap: 1.5, mb: 1.5, alignItems: 'flex-start' }}>
              <TextField size="small" label="Equipo / Sistema *" value={ent.equipo_sistema} onChange={(e) => actualizarEntregable(i, { equipo_sistema: e.target.value })} />
              <TextField size="small" label="Código activo fijo en producción" value={ent.codigo_activo_produccion || ''} onChange={(e) => actualizarEntregable(i, { codigo_activo_produccion: e.target.value })} />
              <TextField size="small" label="Código activo fijo en montaje" value={ent.codigo_activo_montaje || ''} onChange={(e) => actualizarEntregable(i, { codigo_activo_montaje: e.target.value })} />
              <IconButton size="small" color="error" onClick={() => quitarEntregable(i)}><DeleteOutlineIcon fontSize="small" /></IconButton>
              <TextField size="small" label="Unidad de vida útil" value={ent.unidad_vida_util || ''} onChange={(e) => actualizarEntregable(i, { unidad_vida_util: e.target.value })} />
              <TextField size="small" label="Vida útil" type="number" value={ent.vida_util ?? ''} onChange={(e) => actualizarEntregable(i, { vida_util: e.target.value === '' ? undefined : Number(e.target.value) })} />
              <TextField size="small" label="Observaciones" value={ent.observaciones || ''} onChange={(e) => actualizarEntregable(i, { observaciones: e.target.value })} />
              <TextField size="small" label="Anexo (link)" value={ent.anexo_url || ''} onChange={(e) => actualizarEntregable(i, { anexo_url: e.target.value })} sx={{ gridColumn: { xs: 'auto', sm: '1 / span 3' } }} />
            </Box>
          ))}
          <Button size="small" startIcon={<AddIcon />} onClick={agregarEntregable} sx={{ mb: 2 }}>Agregar entregable</Button>

          <TextField fullWidth multiline minRows={2} label="Otros entregables" value={otrosEntregables} onChange={(e) => setOtrosEntregables(e.target.value)} />
        </CardContent>
      </Card>

      {/* Partes Interesadas */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Partes Interesadas</Typography>
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