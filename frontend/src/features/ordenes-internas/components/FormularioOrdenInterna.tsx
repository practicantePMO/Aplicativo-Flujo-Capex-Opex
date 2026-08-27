import { useState, useEffect } from 'react';
import {
  Box, Typography, Button, TextField, MenuItem, RadioGroup, FormControlLabel, Radio,
  Alert, CircularProgress, Divider, Card, CardContent,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { CrearOrdenInternaPayload } from '../types/ordenInterna.types';
import { crearOrdenInterna, actualizarOrdenInterna, obtenerOrdenInternaDetalle } from '../services/ordenesInternas.service';
import { obtenerControlCambiosPorProyecto } from '../../control-cambios/services/controlCambios.service';
import type { ControlCambioResumen } from '../../control-cambios/types/controlCambio.types';

interface Props {
  proyectoId: string;
  ordenInternaId?: number; // si viene, es edición de un Borrador existente
  prefillControlCambioId?: number; // si viene, es un atajo desde un Control de Cambios
  onCancelar: () => void;
  onGuardada: (ordenInternaId: number) => void;
}

const CAMPO_VACIO: CrearOrdenInternaPayload = {
  proyecto_id: '',
  numero_oi: '',
  nombre_descriptivo: '',
  tipo_orden: 'ACTIVO',
  centro_costos: '',
  oficina_ventas: '',
  linea_marca: '',
  cliente: '',
  ramo: '',
  porcentaje_1: undefined,
  es_control_cambios: false,
  control_cambio_id: undefined,
  activo_fijo_curso: '',
  tipo_activo: '',
  porcentaje_2: undefined,
  presupuesto: 0,
  presupuesto_moneda: 'COP',
  activo_real_productivo: '',
  valores: [
    { categoria: 'ACTIVO', usd: 0, cop: 0 },
    { categoria: 'GASTO', usd: 0, cop: 0 },
  ],
};

export function FormularioOrdenInterna({ proyectoId, ordenInternaId, prefillControlCambioId, onCancelar, onGuardada }: Props) {
  // null = todavía no respondió la pregunta inicial. Si viene prefillControlCambioId,
  // ya sabemos la respuesta (es un atajo desde el Control de Cambios).
  const [preguntaRespondida, setPreguntaRespondida] = useState(!!ordenInternaId || !!prefillControlCambioId);
  const [form, setForm] = useState<CrearOrdenInternaPayload>({
    ...CAMPO_VACIO,
    proyecto_id: proyectoId,
    ...(prefillControlCambioId ? { es_control_cambios: true, control_cambio_id: prefillControlCambioId } : {}),
  });
  const [cargando, setCargando] = useState(!!ordenInternaId);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [controlesCambio, setControlesCambio] = useState<ControlCambioResumen[]>([]);

  useEffect(() => {
    obtenerControlCambiosPorProyecto(proyectoId).then(setControlesCambio).catch(() => setControlesCambio([]));
  }, [proyectoId]);

  useEffect(() => {
    if (!ordenInternaId) return;
    (async () => {
      try {
        const detalle = await obtenerOrdenInternaDetalle(ordenInternaId);
        setForm({
          proyecto_id: proyectoId,
          numero_oi: detalle.numero_oi,
          nombre_descriptivo: detalle.nombre_descriptivo,
          tipo_orden: detalle.tipo_orden,
          centro_costos: detalle.centro_costos || '',
          oficina_ventas: detalle.oficina_ventas || '',
          linea_marca: detalle.linea_marca || '',
          cliente: detalle.cliente || '',
          ramo: detalle.ramo || '',
          // 🔧 Decimal de Prisma llega como string desde el backend — hay que
          // convertirlo a número explícitamente o el DTO de guardado lo rechaza.
          porcentaje_1: detalle.porcentaje_1 !== null && detalle.porcentaje_1 !== undefined ? Number(detalle.porcentaje_1) : undefined,
          es_control_cambios: detalle.es_control_cambios,
          control_cambio_id: detalle.control_cambio_id ?? undefined,
          activo_fijo_curso: detalle.activo_fijo_curso || '',
          tipo_activo: detalle.tipo_activo || '',
          porcentaje_2: detalle.porcentaje_2 !== null && detalle.porcentaje_2 !== undefined ? Number(detalle.porcentaje_2) : undefined,
          presupuesto: Number(detalle.presupuesto) || 0,
          presupuesto_moneda: detalle.presupuesto_moneda || 'COP',
          activo_real_productivo: detalle.activo_real_productivo || '',
          // 🔧 Igual que arriba: quitamos "id"/"orden_interna_id" (que el DTO no
          // acepta) y convertimos usd/cop de string a número.
          valores: detalle.oi_valores?.length
            ? detalle.oi_valores.map((v: any) => ({ categoria: v.categoria, usd: Number(v.usd) || 0, cop: Number(v.cop) || 0 }))
            : CAMPO_VACIO.valores,
        });
      } catch {
        setError('No se pudo cargar la Orden Interna.');
      } finally {
        setCargando(false);
      }
    })();
  }, [ordenInternaId]);

  const actualizar = (patch: Partial<CrearOrdenInternaPayload>) => setForm((prev) => ({ ...prev, ...patch }));

  const actualizarValor = (categoria: 'ACTIVO' | 'GASTO', moneda: 'usd' | 'cop', valor: string) => {
    const num = parseFloat(valor.replace(/[^0-9.]/g, '')) || 0;
    setForm((prev) => ({
      ...prev,
      valores: (prev.valores || []).map((v) => (v.categoria === categoria ? { ...v, [moneda]: num } : v)),
    }));
  };

  const guardar = async () => {
    try {
      setGuardando(true);
      setError(null);

      if (!form.numero_oi.trim()) throw new Error('El número de Orden Interna es obligatorio.');
      if (!form.nombre_descriptivo.trim()) throw new Error('El nombre descriptivo es obligatorio.');
      if (!form.presupuesto || form.presupuesto <= 0) throw new Error('El presupuesto debe ser mayor a 0.');
      if (form.tipo_orden === 'ACTIVO') {
        if (!form.activo_fijo_curso?.trim()) throw new Error('El Activo Fijo en curso es obligatorio.');
        if (!form.tipo_activo?.trim()) throw new Error('El Tipo de activo es obligatorio.');
        if (!form.activo_real_productivo?.trim()) throw new Error('El Activo Real Productivo es obligatorio.');
      }
      if (form.es_control_cambios && !form.control_cambio_id) {
        throw new Error('Debes elegir a qué Control de Cambios corresponde esta Orden Interna.');
      }

      const payload: CrearOrdenInternaPayload = {
        ...form,
        valores: form.es_control_cambios ? form.valores : undefined,
      };

      if (ordenInternaId) {
        await actualizarOrdenInterna(ordenInternaId, payload);
        onGuardada(ordenInternaId);
      } else {
        const respuesta = await crearOrdenInterna(payload);
        onGuardada(respuesta.orden_interna_id);
      }
    } catch (err: any) {
      setError(err.message || err.response?.data?.message || 'Error al guardar la Orden Interna.');
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress color="secondary" /></Box>;

  const controlesCambioElegibles = controlesCambio.filter((cc) => cc.requiere_orden_interna);

  // 🔀 Primera pregunta: ¿es una OI por Control de Cambios? Decide si se ve la Sección 3
  // Y, si es "Sí", exige elegir un Control de Cambios real que ya exista para este proyecto.
  if (!preguntaRespondida) {
    return (
      <Box sx={{ mt: 3, p: 3, borderRadius: 3, border: '1px solid #e2e8f0', backgroundColor: '#fafafa' }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#0e381e', mb: 2 }}>Solicitud de Ordenes Interna</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>¿Esta Orden Interna es por Control de Cambios?</Typography>
        <RadioGroup
          value={form.es_control_cambios ? 'si' : 'no'}
          onChange={(e) => {
            const esCC = e.target.value === 'si';
            actualizar({ es_control_cambios: esCC, control_cambio_id: esCC ? form.control_cambio_id : undefined });
          }}
        >
          <FormControlLabel value="no" control={<Radio />} label="No" />
          <FormControlLabel value="si" control={<Radio />} label="Sí, es por Control de Cambios" />
        </RadioGroup>

        {form.es_control_cambios && (
          <Box sx={{ mt: 2 }}>
            {controlesCambioElegibles.length === 0 ? (
              <Alert severity="warning">
                No hay ningún Control de Cambios de este proyecto marcado como "Requiere Orden Interna". Primero crea (o marca) el Control de Cambios correspondiente.
              </Alert>
            ) : (
              <TextField
                select
                fullWidth
                label="¿A qué Control de Cambios corresponde? *"
                value={form.control_cambio_id ?? ''}
                onChange={(e) => actualizar({ control_cambio_id: Number(e.target.value) })}
              >
                {controlesCambioElegibles.map((cc) => (
                  <MenuItem key={cc.id} value={cc.id}>
                    #{cc.id} — {cc.descripcion_cambio ? cc.descripcion_cambio.slice(0, 60) : 'Sin descripción'}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Box>
        )}

        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button onClick={onCancelar}>Cancelar</Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setPreguntaRespondida(true)}
            disabled={form.es_control_cambios && !form.control_cambio_id}
          >
            Continuar
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 3, p: 3, borderRadius: 3, border: '1px solid #e2e8f0', backgroundColor: '#fafafa' }}>
      <Button startIcon={<ArrowBackIcon />} onClick={onCancelar} sx={{ mb: 2, color: '#64748b' }}>Cancelar</Button>
      <Typography variant="h6" sx={{ fontWeight: 800, color: '#0e381e', mb: 0.5 }}>
        Solicitud de Ordenes Interna {form.es_control_cambios ? '(Control de Cambios)' : ''}
      </Typography>

      {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}

      {/* Sección 1 */}
      <Card sx={{ mb: 2, mt: 2, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Sección 1</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <TextField label="Número de Orden Interna *" value={form.numero_oi} onChange={(e) => actualizar({ numero_oi: e.target.value })} />
            <TextField label="Nombre Descriptivo *" value={form.nombre_descriptivo} onChange={(e) => actualizar({ nombre_descriptivo: e.target.value })} />
            <TextField select label="Tipo de orden *" value={form.tipo_orden} onChange={(e) => actualizar({ tipo_orden: e.target.value as 'ACTIVO' | 'GASTO' })}>
              <MenuItem value="ACTIVO">Activo</MenuItem>
              <MenuItem value="GASTO">Gasto</MenuItem>
            </TextField>
            <TextField label="Centro de Costos" value={form.centro_costos} onChange={(e) => actualizar({ centro_costos: e.target.value })} />
            <TextField label="Oficina de Ventas" value={form.oficina_ventas} onChange={(e) => actualizar({ oficina_ventas: e.target.value })} />
            <TextField label="Línea de Marca" value={form.linea_marca} onChange={(e) => actualizar({ linea_marca: e.target.value })} />
            <TextField label="Cliente" value={form.cliente} onChange={(e) => actualizar({ cliente: e.target.value })} />
            <TextField label="Ramo" value={form.ramo} onChange={(e) => actualizar({ ramo: e.target.value })} />
            <TextField label="%" type="number" value={form.porcentaje_1 ?? ''} onChange={(e) => actualizar({ porcentaje_1: e.target.value === '' ? undefined : Number(e.target.value) })} />
          </Box>
        </CardContent>
      </Card>

      {/* Sección 2 */}
      <Card sx={{ mb: 2, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Sección 2</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            {form.tipo_orden === 'ACTIVO' && (
              <>
                <TextField label="Activo Fijo en curso *" value={form.activo_fijo_curso} onChange={(e) => actualizar({ activo_fijo_curso: e.target.value })} />
                <TextField label="Tipo de activo *" value={form.tipo_activo} onChange={(e) => actualizar({ tipo_activo: e.target.value })} />
                <TextField label="%" type="number" value={form.porcentaje_2 ?? ''} onChange={(e) => actualizar({ porcentaje_2: e.target.value === '' ? undefined : Number(e.target.value) })} />
                <TextField label="Activo Real Productivo *" value={form.activo_real_productivo} onChange={(e) => actualizar({ activo_real_productivo: e.target.value })} />
              </>
            )}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField label="Presupuesto *" type="number" fullWidth value={form.presupuesto || ''} onChange={(e) => actualizar({ presupuesto: Number(e.target.value) || 0 })} />
              <TextField select label="Moneda" value={form.presupuesto_moneda || 'COP'} onChange={(e) => actualizar({ presupuesto_moneda: e.target.value as 'USD' | 'COP' })} sx={{ minWidth: 110 }}>
                <MenuItem value="COP">COP</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
              </TextField>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Sección 3 (solo si es Control de Cambios) */}
      {form.es_control_cambios && (
        <Card sx={{ mb: 2, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Sección 3 — Valor Total del Proyecto</Typography>
            <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mb: 2 }}>
              A diferencia de Solicitud de Inversión, aquí se llena manual.
            </Typography>
            {(['ACTIVO', 'GASTO'] as const).map((cat) => {
              const valor = form.valores?.find((v) => v.categoria === cat);
              return (
                <Box key={cat} sx={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: 2, alignItems: 'center', mb: 1 }}>
                  <Typography sx={{ fontWeight: 700 }}>{cat}</Typography>
                  <TextField size="small" label="USD" type="number" value={valor?.usd || ''} onChange={(e) => actualizarValor(cat, 'usd', e.target.value)} />
                  <TextField size="small" label="COP" type="number" value={valor?.cop || ''} onChange={(e) => actualizarValor(cat, 'cop', e.target.value)} />
                </Box>
              );
            })}
          </CardContent>
        </Card>
      )}

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