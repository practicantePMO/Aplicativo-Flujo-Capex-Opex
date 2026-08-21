import { useState, useEffect } from 'react';
import {
  Card, CardContent, Box, Typography, Button, Paper, FormGroup, FormControlLabel, Checkbox,
  Alert, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField,
  MenuItem, IconButton, Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import type { FlujoCaja } from '../../types/solicitud.types';

const TODOS_LOS_MESES = [
  { num: 1, nombre: 'Enero' },
  { num: 2, nombre: 'Febrero' },
  { num: 3, nombre: 'Marzo' },
  { num: 4, nombre: 'Abril' },
  { num: 5, nombre: 'Mayo' },
  { num: 6, nombre: 'Junio' },
  { num: 7, nombre: 'Julio' },
  { num: 8, nombre: 'Agosto' },
  { num: 9, nombre: 'Septiembre' },
  { num: 10, nombre: 'Octubre' },
  { num: 11, nombre: 'Noviembre' },
  { num: 12, nombre: 'Diciembre' },
];

interface Props {
  aniosFlujo?: number[];
  setAniosFlujo: React.Dispatch<React.SetStateAction<number[]>>;
  tiposSeleccionados?: Record<number, ('CAPEX' | 'GCAPEX' | 'OPEX')[]>;
  setTiposSeleccionados: React.Dispatch<React.SetStateAction<Record<number, ('CAPEX' | 'GCAPEX' | 'OPEX')[]>>>;
  flujos?: FlujoCaja[];
  setFlujos: React.Dispatch<React.SetStateAction<FlujoCaja[]>>;
}

export function SeccionFlujoCaja({
  aniosFlujo = [],
  setAniosFlujo,
  tiposSeleccionados = {},
  setTiposSeleccionados,
  flujos = [],
  setFlujos,
}: Props) {
  const [mesesPorAnio, setMesesPorAnio] = useState<Record<number, number[]>>({});
  const [mesAAgregar, setMesAAgregar] = useState<Record<number, number | ''>>({});

  // Garantizar arreglos seguros ante valores undefined/null
  const safeAniosFlujo = Array.isArray(aniosFlujo) ? aniosFlujo : [];
  const safeFlujos = Array.isArray(flujos) ? flujos : [];
  const safeTiposSeleccionados = tiposSeleccionados || {};

  useEffect(() => {
    setMesesPorAnio((prev) => {
      const nuevo = { ...prev };
      safeAniosFlujo.forEach((anio) => {
        const mesesEnFlujo = Array.from(
          new Set(
            safeFlujos
              .filter((f) => f && Number(f.anio) === Number(anio))
              .map((f) => Number(f.mes))
          )
        ).sort((a, b) => a - b);

        if (!nuevo[anio]) {
          nuevo[anio] = mesesEnFlujo.length > 0 ? mesesEnFlujo : [1];
        }
      });
      return nuevo;
    });
  }, [safeAniosFlujo.join(','), safeFlujos.length]);

  const agregarAnioFlujo = () => {
    const anioActual = new Date().getFullYear();
    const nuevoAnio = safeAniosFlujo.length > 0
      ? Number(safeAniosFlujo[safeAniosFlujo.length - 1]) + 1
      : anioActual;

    setAniosFlujo([...safeAniosFlujo, nuevoAnio]);
    setTiposSeleccionados((prev) => ({ ...(prev || {}), [nuevoAnio]: ['CAPEX'] }));
    setMesesPorAnio((prev) => ({ ...prev, [nuevoAnio]: [1] }));
  };

  const eliminarAnioFlujo = (anioEliminar: number) => {
    if (safeAniosFlujo.length <= 1) return;
    setAniosFlujo(safeAniosFlujo.filter((a) => Number(a) !== Number(anioEliminar)));
    setFlujos((prev) =>
      Array.isArray(prev) ? prev.filter((f) => Number(f.anio) !== Number(anioEliminar)) : []
    );
  };

  const handleToggleCapex = (anio: number, checked: boolean) => {
    const actuales = safeTiposSeleccionados[anio] || [];
    let nuevos: ('CAPEX' | 'GCAPEX' | 'OPEX')[];

    if (checked) {
      nuevos = [...actuales, 'CAPEX'];
    } else {
      nuevos = actuales.filter((t) => t !== 'CAPEX' && t !== 'GCAPEX');
      setFlujos((prev) =>
        (Array.isArray(prev) ? prev : []).filter(
          (f) =>
            !(
              Number(f.anio) === Number(anio) &&
              (((f as any).tipo === 'CAPEX' || (f as any).tipo_flujo === 'CAPEX') ||
               ((f as any).tipo === 'GCAPEX' || (f as any).tipo_flujo === 'GCAPEX'))
            )
        )
      );
    }
    setTiposSeleccionados({ ...safeTiposSeleccionados, [anio]: nuevos });
  };

  const handleToggleGcapex = (anio: number, checked: boolean) => {
    const actuales = safeTiposSeleccionados[anio] || [];
    let nuevos: ('CAPEX' | 'GCAPEX' | 'OPEX')[];

    if (checked) {
      nuevos = Array.from(new Set([...actuales, 'GCAPEX']));
    } else {
      nuevos = actuales.filter((t) => t !== 'GCAPEX');
      setFlujos((prev) =>
        (Array.isArray(prev) ? prev : []).filter(
          (f) =>
            !(
              Number(f.anio) === Number(anio) &&
              ((f as any).tipo === 'GCAPEX' || (f as any).tipo_flujo === 'GCAPEX')
            )
        )
      );
    }
    setTiposSeleccionados({ ...safeTiposSeleccionados, [anio]: nuevos });
  };

  const handleToggleOpex = (anio: number, checked: boolean) => {
    const actuales = safeTiposSeleccionados[anio] || [];
    let nuevos: ('CAPEX' | 'GCAPEX' | 'OPEX')[];

    if (checked) {
      nuevos = [...actuales, 'OPEX'];
    } else {
      nuevos = actuales.filter((t) => t !== 'OPEX');
      setFlujos((prev) =>
        (Array.isArray(prev) ? prev : []).filter(
          (f) =>
            !(
              Number(f.anio) === Number(anio) &&
              ((f as any).tipo === 'OPEX' || (f as any).tipo_flujo === 'OPEX')
            )
        )
      );
    }
    setTiposSeleccionados({ ...safeTiposSeleccionados, [anio]: nuevos });
  };

  const agregarMes = (anio: number) => {
    const mesNum = mesAAgregar[anio];
    if (!mesNum) return;

    setMesesPorAnio((prev) => {
      const listaActual = prev[anio] || [];
      if (listaActual.includes(Number(mesNum))) return prev;
      const nuevaLista = [...listaActual, Number(mesNum)].sort((a, b) => a - b);
      return { ...prev, [anio]: nuevaLista };
    });

    setMesAAgregar((prev) => ({ ...prev, [anio]: '' }));
  };

  const eliminarMes = (anio: number, mesNum: number) => {
    setMesesPorAnio((prev) => ({
      ...prev,
      [anio]: (prev[anio] || []).filter((m) => m !== mesNum),
    }));

    setFlujos((prev) =>
      (Array.isArray(prev) ? prev : []).filter(
        (f) => !(Number(f.anio) === Number(anio) && Number(f.mes) === Number(mesNum))
      )
    );
  };

  const obtenerMonto = (anio: number, tipo: string, mesNum: number): string => {
    const registro = safeFlujos.find(
      (f) =>
        f &&
        Number(f.anio) === Number(anio) &&
        ((f as any).tipo === tipo || (f as any).tipo_flujo === tipo) &&
        Number(f.mes) === Number(mesNum)
    );
    if (!registro || registro.monto === null || registro.monto === undefined) return '';
    return registro.monto.toString();
  };

  const actualizarMonto = (anio: number, tipo: 'CAPEX' | 'GCAPEX' | 'OPEX', mesNum: number, valorStr: string) => {
    const valorLimpio = valorStr.replace(/[^0-9.]/g, '');
    const monto = valorLimpio === '' ? 0 : parseFloat(valorLimpio) || 0;

    setFlujos((prev) => {
      const listaActual = Array.isArray(prev) ? prev : [];
      const sinActual = listaActual.filter(
        (f) =>
          !(
            Number(f.anio) === Number(anio) &&
            ((f as any).tipo === tipo || (f as any).tipo_flujo === tipo) &&
            Number(f.mes) === Number(mesNum)
          )
      );

      if (valorLimpio === '' || monto === 0) return sinActual;

      return [
        ...sinActual,
        {
          anio: Number(anio),
          tipo: tipo,
          tipo_flujo: tipo,
          mes: Number(mesNum),
          monto: monto,
        } as any,
      ];
    });
  };

  const calcularTotalMes = (anio: number, mesNum: number, tipos: string[]) => {
    return safeFlujos
      .filter(
        (f) =>
          f &&
          Number(f.anio) === Number(anio) &&
          Number(f.mes) === Number(mesNum) &&
          tipos.includes((f as any).tipo || (f as any).tipo_flujo)
      )
      .reduce((sum, f) => sum + (Number(f.monto) || 0), 0);
  };

  const calcularTotalColumna = (anio: number, tipo: string) => {
    return safeFlujos
      .filter(
        (f) =>
          f &&
          Number(f.anio) === Number(anio) &&
          ((f as any).tipo === tipo || (f as any).tipo_flujo === tipo)
      )
      .reduce((sum, f) => sum + (Number(f.monto) || 0), 0);
  };

  const calcularGranTotalAnio = (anio: number, tipos: string[]) => {
    return safeFlujos
      .filter(
        (f) =>
          f &&
          Number(f.anio) === Number(anio) &&
          tipos.includes((f as any).tipo || (f as any).tipo_flujo)
      )
      .reduce((sum, f) => sum + (Number(f.monto) || 0), 0);
  };

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

          const tiposColumnasActivos = (['CAPEX', 'GCAPEX', 'OPEX'] as const).filter((t) =>
            tiposAnio.includes(t)
          );

          // Copia explícita antes de ordenar para evitar mutación directa de estado
          const mesesListados = [...(mesesPorAnio[anio] || [])].sort((a, b) => a - b);
          const mesesDisponiblesParaAgregar = TODOS_LOS_MESES.filter(
            (m) => !mesesListados.includes(m.num)
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
                  ¿Qué tipo de flujo requiere el año {anio}?
                </Typography>
                <FormGroup row sx={{ gap: 3, alignItems: 'center' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={tieneCapex}
                        onChange={(e) => handleToggleCapex(anio, e.target.checked)}
                      />
                    }
                    label={<Typography variant="body2" sx={{ fontWeight: 700 }}>CAPEX</Typography>}
                  />

                  {tieneCapex && (
                    <Box sx={{ borderLeft: '2px solid #cbd5e1', pl: 1.5, my: 0.5 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            color="secondary"
                            checked={tieneGcapex}
                            onChange={(e) => handleToggleGcapex(anio, e.target.checked)}
                          />
                        }
                        label={
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569' }}>
                            ¿Incluye GCAPEX?
                          </Typography>
                        }
                      />
                    </Box>
                  )}

                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={tieneOpex}
                        onChange={(e) => handleToggleOpex(anio, e.target.checked)}
                      />
                    }
                    label={<Typography variant="body2" sx={{ fontWeight: 700 }}>OPEX</Typography>}
                  />
                </FormGroup>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5, flexWrap: 'wrap' }}>
                <TextField
                  select
                  size="small"
                  label="Seleccionar Mes"
                  value={mesAAgregar[anio] || ''}
                  onChange={(e) =>
                    setMesAAgregar((prev) => ({ ...prev, [anio]: Number(e.target.value) || '' }))
                  }
                  sx={{ minWidth: 180 }}
                  disabled={mesesDisponiblesParaAgregar.length === 0}
                >
                  <MenuItem value="" disabled>
                    <em>Selecciona un mes...</em>
                  </MenuItem>
                  {mesesDisponiblesParaAgregar.map((m) => (
                    <MenuItem key={m.num} value={m.num}>
                      {m.nombre}
                    </MenuItem>
                  ))}
                </TextField>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => agregarMes(anio)}
                  disabled={!mesAAgregar[anio]}
                >
                  Agregar Mes
                </Button>
              </Box>

              {tiposColumnasActivos.length === 0 ? (
                <Alert severity="info">Selecciona CAPEX u OPEX para desplegar la tabla de flujo de caja.</Alert>
              ) : mesesListados.length === 0 ? (
                <Alert severity="warning">No hay meses agregados para este año. Selecciona un mes en el desplegable superior.</Alert>
              ) : (
                <TableContainer sx={{ overflowX: 'auto', maxWidth: '100%', borderRadius: 1.5, border: '1px solid #e2e8f0' }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#f1f5f9' }}>
                        <TableCell sx={{ fontWeight: 700, minWidth: 140, width: 140 }}>Mes</TableCell>
                        {tiposColumnasActivos.map((tipo) => (
                          <TableCell key={tipo} align="center" sx={{ fontWeight: 700, minWidth: 160 }}>
                            {tipo}
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
                            <TableCell sx={{ fontWeight: 600, color: '#334155' }}>
                              {infoMes?.nombre || `Mes ${mesNum}`}
                            </TableCell>

                            {tiposColumnasActivos.map((tipo) => (
                              <TableCell key={tipo} align="center" sx={{ p: 1 }}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  placeholder="0"
                                  slotProps={{
                                    htmlInput: {
                                      style: { textAlign: 'center', padding: '8px' },
                                    },
                                  }}
                                  value={obtenerMonto(anio, tipo, mesNum)}
                                  onChange={(e) => actualizarMonto(anio, tipo, mesNum, e.target.value)}
                                />
                              </TableCell>
                            ))}

                            <TableCell align="right" sx={{ fontWeight: 700, color: '#0f172a' }}>
                              ${totalMes.toLocaleString()}
                            </TableCell>

                            <TableCell align="center">
                              <Tooltip title="Quitar mes">
                                <IconButton size="small" color="error" onClick={() => eliminarMes(anio, mesNum)}>
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        );
                      })}

                      <TableRow sx={{ backgroundColor: '#f8fafc', borderTop: '2px solid #cbd5e1' }}>
                        <TableCell sx={{ fontWeight: 800, color: '#0e381e' }}>
                          Total Año {anio}
                        </TableCell>
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
              )}
            </Paper>
          );
        })}
      </CardContent>
    </Card>
  );
}