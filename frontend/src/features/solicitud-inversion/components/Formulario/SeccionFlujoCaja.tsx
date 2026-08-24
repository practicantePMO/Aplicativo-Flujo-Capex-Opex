import {
  Card, CardContent, Box, Typography, Button, Paper, FormGroup, FormControlLabel, Checkbox,
  Alert, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField,
  MenuItem, IconButton, Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import type { FlujoCaja } from '../../types/solicitud.types';

const TODOS_LOS_MESES = [
  { num: 1, nombre: 'Enero' }, { num: 2, nombre: 'Febrero' }, { num: 3, nombre: 'Marzo' },
  { num: 4, nombre: 'Abril' }, { num: 5, nombre: 'Mayo' }, { num: 6, nombre: 'Junio' },
  { num: 7, nombre: 'Julio' }, { num: 8, nombre: 'Agosto' }, { num: 9, nombre: 'Septiembre' },
  { num: 10, nombre: 'Octubre' }, { num: 11, nombre: 'Noviembre' }, { num: 12, nombre: 'Diciembre' },
];

type Tipo = 'CAPEX' | 'GCAPEX' | 'OPEX';
type Moneda = 'USD' | 'COP';

interface Props {
  aniosFlujo?: number[];
  setAniosFlujo: React.Dispatch<React.SetStateAction<number[]>>;
  tiposSeleccionados?: Record<number, Tipo[]>;
  setTiposSeleccionados: React.Dispatch<React.SetStateAction<Record<number, Tipo[]>>>;
  mesesSeleccionados?: Record<number, number[]>;
  setMesesSeleccionados: React.Dispatch<React.SetStateAction<Record<number, number[]>>>;
  monedaPorColumna?: Record<string, Moneda>;
  setMonedaPorColumna: React.Dispatch<React.SetStateAction<Record<string, Moneda>>>;
  flujos?: FlujoCaja[];
  setFlujos: React.Dispatch<React.SetStateAction<FlujoCaja[]>>;
}

export function SeccionFlujoCaja({
  aniosFlujo = [],
  setAniosFlujo,
  tiposSeleccionados = {},
  setTiposSeleccionados,
  mesesSeleccionados = {},
  setMesesSeleccionados,
  monedaPorColumna = {},
  setMonedaPorColumna,
  flujos = [],
  setFlujos,
}: Props) {
  const safeAniosFlujo = Array.isArray(aniosFlujo) ? aniosFlujo : [];
  const safeFlujos = Array.isArray(flujos) ? flujos : [];
  const safeTiposSeleccionados = tiposSeleccionados || {};
  const safeMesesSeleccionados = mesesSeleccionados || {};
  const safeMonedaPorColumna = monedaPorColumna || {};

  const claveColumna = (anio: number, tipo: string) => `${anio}_${tipo}`;
  const monedaDeColumna = (anio: number, tipo: string): Moneda => safeMonedaPorColumna[claveColumna(anio, tipo)] || 'COP';

  const agregarAnioFlujo = () => {
    const anioActual = new Date().getFullYear();
    const nuevoAnio = safeAniosFlujo.length > 0 ? Number(safeAniosFlujo[safeAniosFlujo.length - 1]) + 1 : anioActual;

    setAniosFlujo([...safeAniosFlujo, nuevoAnio]);
    setTiposSeleccionados((prev) => ({ ...(prev || {}), [nuevoAnio]: ['CAPEX'] }));
    setMesesSeleccionados((prev) => ({ ...(prev || {}), [nuevoAnio]: [] }));
  };

  const eliminarAnioFlujo = (anioEliminar: number) => {
    if (safeAniosFlujo.length <= 1) return;
    setAniosFlujo(safeAniosFlujo.filter((a) => Number(a) !== Number(anioEliminar)));
    setFlujos((prev) => (Array.isArray(prev) ? prev.filter((f) => Number(f.anio) !== Number(anioEliminar)) : []));
    setMesesSeleccionados((prev) => {
      const nuevo = { ...(prev || {}) };
      delete nuevo[anioEliminar];
      return nuevo;
    });
  };

  const quitarFlujosDeTipo = (anio: number, tipos: Tipo[]) => {
    setFlujos((prev) =>
      (Array.isArray(prev) ? prev : []).filter(
        (f) => !(Number(f.anio) === Number(anio) && tipos.includes((f as any).tipo)),
      ),
    );
  };

  // 🔀 CAPEX y OPEX son mutuamente excluyentes: marcar uno apaga el otro
  // (y su hijo GCAPEX, si aplica).
  const handleToggleCapex = (anio: number, checked: boolean) => {
    const actuales = safeTiposSeleccionados[anio] || [];
    let nuevos: Tipo[];
    if (checked) {
      nuevos = Array.from(new Set([...actuales.filter((t) => t !== 'OPEX'), 'CAPEX' as Tipo]));
      quitarFlujosDeTipo(anio, ['OPEX']);
    } else {
      nuevos = actuales.filter((t) => t !== 'CAPEX' && t !== 'GCAPEX');
      quitarFlujosDeTipo(anio, ['CAPEX', 'GCAPEX']);
    }
    setTiposSeleccionados({ ...safeTiposSeleccionados, [anio]: nuevos });
  };

  const handleToggleGcapex = (anio: number, checked: boolean) => {
    const actuales = safeTiposSeleccionados[anio] || [];
    let nuevos: Tipo[];
    if (checked) {
      nuevos = Array.from(new Set([...actuales, 'GCAPEX' as Tipo]));
    } else {
      nuevos = actuales.filter((t) => t !== 'GCAPEX');
      quitarFlujosDeTipo(anio, ['GCAPEX']);
    }
    setTiposSeleccionados({ ...safeTiposSeleccionados, [anio]: nuevos });
  };

  const handleToggleOpex = (anio: number, checked: boolean) => {
    const actuales = safeTiposSeleccionados[anio] || [];
    let nuevos: Tipo[];
    if (checked) {
      nuevos = ['OPEX'];
      quitarFlujosDeTipo(anio, ['CAPEX', 'GCAPEX']);
    } else {
      nuevos = actuales.filter((t) => t !== 'OPEX');
      quitarFlujosDeTipo(anio, ['OPEX']);
    }
    setTiposSeleccionados({ ...safeTiposSeleccionados, [anio]: nuevos });
  };

  // ✅ Selección múltiple de meses: marcar/desmarcar un checkbox agrega o
  // quita ese mes de una vez (ya no es de a uno con un dropdown).
  const handleToggleMes = (anio: number, mesNum: number, checked: boolean) => {
    setMesesSeleccionados((prev) => {
      const actuales = (prev || {})[anio] || [];
      const nuevos = checked
        ? Array.from(new Set([...actuales, mesNum])).sort((a, b) => a - b)
        : actuales.filter((m) => m !== mesNum);
      return { ...(prev || {}), [anio]: nuevos };
    });
    if (!checked) {
      setFlujos((prev) =>
        (Array.isArray(prev) ? prev : []).filter(
          (f) => !(Number(f.anio) === Number(anio) && Number(f.mes) === Number(mesNum)),
        ),
      );
    }
  };

  const cambiarMonedaColumna = (anio: number, tipo: Tipo, moneda: Moneda) => {
    setMonedaPorColumna((prev) => ({ ...(prev || {}), [claveColumna(anio, tipo)]: moneda }));
    // Re-etiquetamos las filas ya cargadas de esa columna para que queden consistentes.
    setFlujos((prev) =>
      (Array.isArray(prev) ? prev : []).map((f) =>
        Number(f.anio) === Number(anio) && (f as any).tipo === tipo ? { ...f, moneda } : f,
      ),
    );
  };

  const obtenerMonto = (anio: number, tipo: string, mesNum: number): string => {
    const registro = safeFlujos.find(
      (f) => f && Number(f.anio) === Number(anio) && (f as any).tipo === tipo && Number(f.mes) === Number(mesNum),
    );
    if (!registro || registro.monto === null || registro.monto === undefined) return '';
    return registro.monto.toString();
  };

  const actualizarMonto = (anio: number, tipo: Tipo, mesNum: number, valorStr: string) => {
    const valorLimpio = valorStr.replace(/[^0-9.]/g, '');
    const monto = valorLimpio === '' ? 0 : parseFloat(valorLimpio) || 0;
    const moneda = monedaDeColumna(anio, tipo);

    setFlujos((prev) => {
      const listaActual = Array.isArray(prev) ? prev : [];
      const sinActual = listaActual.filter(
        (f) => !(Number(f.anio) === Number(anio) && (f as any).tipo === tipo && Number(f.mes) === Number(mesNum)),
      );
      if (valorLimpio === '' || monto === 0) return sinActual;
      return [...sinActual, { anio: Number(anio), tipo, moneda, mes: Number(mesNum), monto } as FlujoCaja];
    });
  };

  const calcularTotalMes = (anio: number, mesNum: number, tipos: string[]) =>
    safeFlujos
      .filter((f) => f && Number(f.anio) === Number(anio) && Number(f.mes) === Number(mesNum) && tipos.includes((f as any).tipo))
      .reduce((sum, f) => sum + (Number(f.monto) || 0), 0);

  const calcularTotalColumna = (anio: number, tipo: string) =>
    safeFlujos
      .filter((f) => f && Number(f.anio) === Number(anio) && (f as any).tipo === tipo)
      .reduce((sum, f) => sum + (Number(f.monto) || 0), 0);

  const calcularGranTotalAnio = (anio: number, tipos: string[]) =>
    safeFlujos
      .filter((f) => f && Number(f.anio) === Number(anio) && tipos.includes((f as any).tipo))
      .reduce((sum, f) => sum + (Number(f.monto) || 0), 0);

  return (
    <Card sx={{ mb: 3, borderRadius: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Flujo de Caja Planeado</Typography>
          <Button size="small" startIcon={<AddIcon />} onClick={agregarAnioFlujo} variant="contained" color="primary">
            Agregar Año
          </Button>
        </Box>

        {safeAniosFlujo.map((anio) => {
          const tiposAnio = safeTiposSeleccionados[anio] || [];
          const tieneCapex = tiposAnio.includes('CAPEX');
          const tieneGcapex = tiposAnio.includes('GCAPEX');
          const tieneOpex = tiposAnio.includes('OPEX');
          const tiposColumnasActivos = (['CAPEX', 'GCAPEX', 'OPEX'] as const).filter((t) => tiposAnio.includes(t));
          const mesesListados = [...(safeMesesSeleccionados[anio] || [])].sort((a, b) => a - b);

          // ⚠️ Meses marcados pero sin ningún valor cargado todavía en ninguna
          // de las columnas activas — aviso visual antes de que intenten guardar.
          const mesesIncompletos = mesesListados.filter(
            (mesNum) => calcularTotalMes(anio, mesNum, tiposColumnasActivos) <= 0,
          );

          return (
            <Paper key={anio} variant="outlined" sx={{ p: 2.5, mb: 3, borderRadius: 2, backgroundColor: '#f8fafc' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#0e381e' }}>Año {anio}</Typography>
                {safeAniosFlujo.length > 1 && (
                  <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => eliminarAnioFlujo(anio)}>
                    Eliminar Año
                  </Button>
                )}
              </Box>

              <Box sx={{ mb: 3, p: 2, border: '1px dashed #cbd5e1', borderRadius: 2, backgroundColor: '#ffffff' }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', display: 'block', mb: 1 }}>
                  ¿Qué tipo de flujo requiere el año {anio}? (CAPEX y OPEX son excluyentes)
                </Typography>
                <FormGroup row sx={{ gap: 3, alignItems: 'center' }}>
                  <FormControlLabel
                    control={<Checkbox size="small" checked={tieneCapex} onChange={(e) => handleToggleCapex(anio, e.target.checked)} />}
                    label={<Typography variant="body2" sx={{ fontWeight: 700 }}>CAPEX (Activo)</Typography>}
                  />
                  {tieneCapex && (
                    <Box sx={{ borderLeft: '2px solid #cbd5e1', pl: 1.5, my: 0.5 }}>
                      <FormControlLabel
                        control={<Checkbox size="small" color="secondary" checked={tieneGcapex} onChange={(e) => handleToggleGcapex(anio, e.target.checked)} />}
                        label={<Typography variant="body2" sx={{ fontWeight: 600, color: '#475569' }}>¿Incluye GCAPEX? (Gasto)</Typography>}
                      />
                    </Box>
                  )}
                  <FormControlLabel
                    control={<Checkbox size="small" checked={tieneOpex} onChange={(e) => handleToggleOpex(anio, e.target.checked)} />}
                    label={<Typography variant="body2" sx={{ fontWeight: 700 }}>OPEX (Gasto)</Typography>}
                  />
                </FormGroup>
              </Box>

              {/* ✅ Selección múltiple de meses: marca todos los que necesites de una vez */}
              <Box sx={{ mb: 2.5, p: 2, border: '1px dashed #cbd5e1', borderRadius: 2, backgroundColor: '#ffffff' }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', display: 'block', mb: 1 }}>
                  ¿Qué meses vas a usar en {anio}?
                </Typography>
                <FormGroup row sx={{ columnGap: 2, rowGap: 0.5 }}>
                  {TODOS_LOS_MESES.map((m) => (
                    <FormControlLabel
                      key={m.num}
                      control={
                        <Checkbox
                          size="small"
                          checked={mesesListados.includes(m.num)}
                          onChange={(e) => handleToggleMes(anio, m.num, e.target.checked)}
                        />
                      }
                      label={<Typography variant="body2">{m.nombre}</Typography>}
                    />
                  ))}
                </FormGroup>
              </Box>

              {tiposColumnasActivos.length === 0 ? (
                <Alert severity="info">Selecciona CAPEX u OPEX para desplegar la tabla de flujo de caja.</Alert>
              ) : mesesListados.length === 0 ? (
                <Alert severity="warning">Marca al menos un mes arriba para empezar a cargar montos.</Alert>
              ) : (
                <>
                  {mesesIncompletos.length > 0 && (
                    <Alert severity="error" sx={{ mb: 1.5 }}>
                      Falta ingresar el valor de: {mesesIncompletos.map((m) => TODOS_LOS_MESES.find((x) => x.num === m)?.nombre).join(', ')}.
                      No puede quedar en blanco ni en 0 para un mes seleccionado.
                    </Alert>
                  )}
                  <TableContainer sx={{ overflowX: 'auto', maxWidth: '100%', borderRadius: 1.5, border: '1px solid #e2e8f0' }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ backgroundColor: '#f1f5f9' }}>
                          <TableCell sx={{ fontWeight: 700, minWidth: 140, width: 140 }}>Mes</TableCell>
                          {tiposColumnasActivos.map((tipo) => (
                            <TableCell key={tipo} align="center" sx={{ fontWeight: 700, minWidth: 190 }}>
                              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                                <span>{tipo}</span>
                                <TextField
                                  select size="small" value={monedaDeColumna(anio, tipo)}
                                  onChange={(e) => cambiarMonedaColumna(anio, tipo, e.target.value as Moneda)}
                                  sx={{ minWidth: 90 }}
                                  slotProps={{ select: { sx: { fontSize: '0.75rem', py: 0.5 } } }}
                                >
                                  <MenuItem value="COP">COP</MenuItem>
                                  <MenuItem value="USD">USD</MenuItem>
                                </TextField>
                              </Box>
                            </TableCell>
                          ))}
                          <TableCell align="right" sx={{ fontWeight: 700, minWidth: 150 }}>Total Mes</TableCell>
                          <TableCell align="center" sx={{ width: 60 }}></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {mesesListados.map((mesNum) => {
                          const infoMes = TODOS_LOS_MESES.find((m) => m.num === mesNum);
                          const totalMes = calcularTotalMes(anio, mesNum, tiposColumnasActivos);
                          return (
                            <TableRow key={mesNum} hover>
                              <TableCell sx={{ fontWeight: 600, color: '#334155' }}>{infoMes?.nombre || `Mes ${mesNum}`}</TableCell>
                              {tiposColumnasActivos.map((tipo) => (
                                <TableCell key={tipo} align="center" sx={{ p: 1 }}>
                                  <TextField
                                    fullWidth size="small" placeholder="0"
                                    error={obtenerMonto(anio, tipo, mesNum) === ''}
                                    slotProps={{ htmlInput: { style: { textAlign: 'center', padding: '8px' } } }}
                                    value={obtenerMonto(anio, tipo, mesNum)}
                                    onChange={(e) => actualizarMonto(anio, tipo, mesNum, e.target.value)}
                                  />
                                </TableCell>
                              ))}
                              <TableCell align="right" sx={{ fontWeight: 700, color: '#0f172a' }}>${totalMes.toLocaleString()}</TableCell>
                              <TableCell align="center">
                                <Tooltip title="Quitar mes">
                                  <IconButton size="small" color="error" onClick={() => handleToggleMes(anio, mesNum, false)}>
                                    <DeleteIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                        <TableRow sx={{ backgroundColor: '#f8fafc', borderTop: '2px solid #cbd5e1' }}>
                          <TableCell sx={{ fontWeight: 800, color: '#0e381e' }}>Total Año {anio}</TableCell>
                          {tiposColumnasActivos.map((tipo) => (
                            <TableCell key={tipo} align="center" sx={{ fontWeight: 800, color: '#0e381e' }}>
                              ${calcularTotalColumna(anio, tipo).toLocaleString()}
                            </TableCell>
                          ))}
                          <TableCell align="right" sx={{ fontWeight: 800, color: '#0e381e', fontSize: '0.95rem' }}>
                            ${calcularGranTotalAnio(anio, tiposColumnasActivos).toLocaleString()}
                          </TableCell>
                          <TableCell />
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}
            </Paper>
          );
        })}
      </CardContent>
    </Card>
  );
}