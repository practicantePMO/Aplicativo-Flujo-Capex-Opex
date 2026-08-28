import { useState } from 'react';
import {
  Card, CardContent, Box, Typography, Button, FormGroup, FormControlLabel, Checkbox,
  Alert, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField,
  MenuItem, IconButton, Tooltip, Accordion, AccordionSummary, AccordionDetails, Chip,
  Select, OutlinedInput, ToggleButtonGroup, ToggleButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { FlujoCaja } from '../../types/solicitud.types';

const TODOS_LOS_MESES = [
  { num: 1, nombre: 'Enero' }, { num: 2, nombre: 'Febrero' }, { num: 3, nombre: 'Marzo' },
  { num: 4, nombre: 'Abril' }, { num: 5, nombre: 'Mayo' }, { num: 6, nombre: 'Junio' },
  { num: 7, nombre: 'Julio' }, { num: 8, nombre: 'Agosto' }, { num: 9, nombre: 'Septiembre' },
  { num: 10, nombre: 'Octubre' }, { num: 11, nombre: 'Noviembre' }, { num: 12, nombre: 'Diciembre' },
];
const NOMBRE_CORTO: Record<number, string> = {
  1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun',
  7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic',
};

type Tipo = 'CAPEX' | 'GCAPEX' | 'OPEX';
type Moneda = 'USD' | 'COP';

interface Props {
  aniosFlujo?: number[];
  setAniosFlujo: React.Dispatch<React.SetStateAction<number[]>>;
  tiposSeleccionados?: Record<number, Tipo[]>;
  setTiposSeleccionados: React.Dispatch<React.SetStateAction<Record<number, Tipo[]>>>;
  mesesSeleccionados?: Record<number, number[]>;
  setMesesSeleccionados: React.Dispatch<React.SetStateAction<Record<number, number[]>>>;
  tiposPorMes?: Record<string, Tipo[]>;
  setTiposPorMes: React.Dispatch<React.SetStateAction<Record<string, Tipo[]>>>;
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
  tiposPorMes = {},
  setTiposPorMes,
  monedaPorColumna = {},
  setMonedaPorColumna,
  flujos = [],
  setFlujos,
}: Props) {
  const safeAniosFlujo = Array.isArray(aniosFlujo) ? aniosFlujo : [];
  const safeFlujos = Array.isArray(flujos) ? flujos : [];
  const safeTiposSeleccionados = tiposSeleccionados || {};
  const safeMesesSeleccionados = mesesSeleccionados || {};
  const safeTiposPorMes = tiposPorMes || {};
  const safeMonedaPorColumna = monedaPorColumna || {};

  const [anioExpandido, setAnioExpandido] = useState<number | false>(
    safeAniosFlujo.length ? safeAniosFlujo[safeAniosFlujo.length - 1] : false,
  );

  const claveMes = (anio: number, mesNum: number) => `${anio}_${mesNum}`;
  const tiposDelMes = (anio: number, mesNum: number, tiposAnio: Tipo[]): Tipo[] =>
    safeTiposPorMes[claveMes(anio, mesNum)] || tiposAnio;

  const claveColumna = (anio: number, tipo: string) => `${anio}_${tipo}`;
  const monedaDeColumna = (anio: number, tipo: string): Moneda => safeMonedaPorColumna[claveColumna(anio, tipo)] || 'COP';

  const agregarAnioFlujo = () => {
    const anioActual = new Date().getFullYear();
    const nuevoAnio = safeAniosFlujo.length > 0 ? Number(safeAniosFlujo[safeAniosFlujo.length - 1]) + 1 : anioActual;

    setAniosFlujo([...safeAniosFlujo, nuevoAnio]);
    setTiposSeleccionados((prev) => ({ ...(prev || {}), [nuevoAnio]: ['CAPEX'] }));
    setMesesSeleccionados((prev) => ({ ...(prev || {}), [nuevoAnio]: [] }));
    setAnioExpandido(nuevoAnio);
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
    setTiposPorMes((prev) => {
      const nuevo = { ...(prev || {}) };
      Object.keys(nuevo).forEach((clave) => {
        if (clave.startsWith(`${anioEliminar}_`)) delete nuevo[clave];
      });
      return nuevo;
    });
  };

  const quitarFlujosDeTipo = (anio: number, tipos: Tipo[]) => {
    setFlujos((prev) =>
      (Array.isArray(prev) ? prev : []).filter(
        (f) => !(Number(f.anio) === Number(anio) && tipos.includes((f as any).tipo)),
      ),
    );
    setTiposPorMes((prev) => {
      const nuevo = { ...(prev || {}) };
      Object.keys(nuevo).forEach((clave) => {
        if (clave.startsWith(`${anio}_`)) {
          nuevo[clave] = nuevo[clave].filter((t) => !tipos.includes(t));
        }
      });
      return nuevo;
    });
  };

  const handleToggleTipoDelMes = (anio: number, mesNum: number, tipo: Tipo, checked: boolean, tiposAnio: Tipo[]) => {
    const clave = claveMes(anio, mesNum);
    setTiposPorMes((prev) => {
      const actuales = (prev || {})[clave] || tiposAnio;
      const nuevos = checked ? Array.from(new Set([...actuales, tipo])) : actuales.filter((t) => t !== tipo);
      return { ...(prev || {}), [clave]: nuevos };
    });
    if (!checked) {
      setFlujos((prev) =>
        (Array.isArray(prev) ? prev : []).filter(
          (f) => !(Number(f.anio) === Number(anio) && Number(f.mes) === Number(mesNum) && (f as any).tipo === tipo),
        ),
      );
    }
  };

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

  const handleCambiarMeses = (anio: number, valores: number[]) => {
    const nuevos = [...valores].sort((a, b) => a - b);
    const actuales = safeMesesSeleccionados[anio] || [];
    const quitados = actuales.filter((m) => !nuevos.includes(m));

    setMesesSeleccionados((prev) => ({ ...(prev || {}), [anio]: nuevos }));

    if (quitados.length) {
      setFlujos((prev) =>
        (Array.isArray(prev) ? prev : []).filter(
          (f) => !(Number(f.anio) === Number(anio) && quitados.includes(Number(f.mes))),
        ),
      );
      setTiposPorMes((prev) => {
        const nuevo = { ...(prev || {}) };
        quitados.forEach((m) => delete nuevo[claveMes(anio, m)]);
        return nuevo;
      });
    }
  };

  const cambiarMonedaColumna = (anio: number, tipo: Tipo, moneda: Moneda) => {
    setMonedaPorColumna((prev) => ({ ...(prev || {}), [claveColumna(anio, tipo)]: moneda }));
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

  const calcularTotalColumna = (anio: number, tipo: string) =>
    safeFlujos
      .filter((f) => f && Number(f.anio) === Number(anio) && (f as any).tipo === tipo)
      .reduce((sum, f) => sum + (Number(f.monto) || 0), 0);

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">Flujo de Caja Planeado</Typography>
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

          const mesesIncompletos = mesesListados.filter((mesNum) => {
            const tiposDeEsteMes = tiposDelMes(anio, mesNum, tiposColumnasActivos);
            if (tiposDeEsteMes.length === 0) return true;
            return tiposDeEsteMes.some((tipo) => {
              const monto = safeFlujos.find(
                (f) => f && Number(f.anio) === Number(anio) && Number(f.mes) === Number(mesNum) && (f as any).tipo === tipo,
              )?.monto;
              return !monto || Number(monto) <= 0;
            });
          });

          const resumenMeses = mesesListados.length
            ? mesesListados.map((m) => NOMBRE_CORTO[m]).join(', ')
            : 'sin meses';

          return (
            <Accordion
              key={anio}
              expanded={anioExpandido === anio}
              onChange={(_, expandido) => setAnioExpandido(expandido ? anio : false)}
              disableGutters
              sx={{ mb: 1.5, border: '1px solid #e2e8f0', '&:before': { display: 'none' } }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: '#f8fafc' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', width: '100%', pr: 1 }}>
                  <Typography sx={{ fontWeight: 700 }}>Año {anio}</Typography>
                  {tiposColumnasActivos.map((t) => (
                    <Chip key={t} label={t} size="small" color={mesesIncompletos.length > 0 ? 'default' : 'success'} variant="outlined" />
                  ))}
                  <Typography variant="caption" color="text.secondary">{resumenMeses}</Typography>
                  {mesesIncompletos.length > 0 && (
                    <Chip label={`${mesesIncompletos.length} sin completar`} size="small" color="error" />
                  )}
                  <Box sx={{ flexGrow: 1 }} />
                  {safeAniosFlujo.length > 1 && (
                    <Tooltip title="Eliminar año">
                      <IconButton
                        size="small" color="error"
                        onClick={(e) => { e.stopPropagation(); eliminarAnioFlujo(anio); }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </AccordionSummary>

              <AccordionDetails sx={{ pt: 1 }}>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: 2,
                    mb: 2,
                    width: '100%',
                  }}
                >
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', display: 'block', mb: 0.5 }}>
                      Tipo de flujo (CAPEX y OPEX son excluyentes)
                    </Typography>
                    <FormGroup row sx={{ gap: 1.5, alignItems: 'center' }}>
                      <FormControlLabel
                        control={<Checkbox size="small" checked={tieneCapex} onChange={(e) => handleToggleCapex(anio, e.target.checked)} />}
                        label={<Typography variant="body2" sx={{ fontWeight: 700 }}>CAPEX</Typography>}
                      />
                      {tieneCapex && (
                        <FormControlLabel
                          control={<Checkbox size="small" color="secondary" checked={tieneGcapex} onChange={(e) => handleToggleGcapex(anio, e.target.checked)} />}
                          label={<Typography variant="body2" sx={{ color: '#475569' }}>+ GCAPEX</Typography>}
                        />
                      )}
                      <FormControlLabel
                        control={<Checkbox size="small" checked={tieneOpex} onChange={(e) => handleToggleOpex(anio, e.target.checked)} />}
                        label={<Typography variant="body2" sx={{ fontWeight: 700 }}>OPEX</Typography>}
                      />
                    </FormGroup>
                  </Box>

                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', display: 'block', mb: 0.5 }}>
                      Meses a usar en {anio}
                    </Typography>
                    <Select
                      multiple size="small" fullWidth displayEmpty
                      value={mesesListados}
                      onChange={(e) => handleCambiarMeses(anio, (typeof e.target.value === 'string' ? [] : e.target.value) as number[])}
                      input={<OutlinedInput />}
                      renderValue={(seleccionados) =>
                        (seleccionados as number[]).length === 0
                          ? <Typography variant="body2" sx={{ color: '#94a3b8' }}>Selecciona meses...</Typography>
                          : (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {[...(seleccionados as number[])].sort((a, b) => a - b).map((m) => (
                                <Chip key={m} label={NOMBRE_CORTO[m]} size="small" />
                              ))}
                            </Box>
                          )
                      }
                    >
                      {TODOS_LOS_MESES.map((m) => (
                        <MenuItem key={m.num} value={m.num}>
                          <Checkbox size="small" checked={mesesListados.includes(m.num)} />
                          {m.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                </Box>

                {tiposColumnasActivos.length === 0 ? (
                  <Alert severity="info">Selecciona CAPEX u OPEX para desplegar la tabla de flujo de caja.</Alert>
                ) : mesesListados.length === 0 ? (
                  <Alert severity="warning">Elige al menos un mes arriba para empezar a cargar montos.</Alert>
                ) : (
                  <TableContainer sx={{ overflowX: 'auto', width: '100%', border: '1px solid #e2e8f0' }}>
                    <Table size="small" sx={{ width: '100%', '& .MuiTableCell-root': { py: 0.5 } }}>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ minWidth: 70, width: 70 }}>Mes</TableCell>
                          {tiposColumnasActivos.map((tipo) => (
                            <TableCell key={tipo} align="center" sx={{ minWidth: 210 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                <span>{tipo}</span>
                                <ToggleButtonGroup
                                  size="small" exclusive value={monedaDeColumna(anio, tipo)}
                                  onChange={(_, val) => val && cambiarMonedaColumna(anio, tipo, val)}
                                  sx={{ '& .MuiToggleButton-root': { py: 0, px: 1, fontSize: '0.7rem' } }}
                                >
                                  <ToggleButton value="COP">COP</ToggleButton>
                                  <ToggleButton value="USD">USD</ToggleButton>
                                </ToggleButtonGroup>
                              </Box>
                            </TableCell>
                          ))}
                          <TableCell align="center" sx={{ width: 40 }} />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {mesesListados.map((mesNum) => {
                          const tiposDeEsteMes = tiposDelMes(anio, mesNum, tiposColumnasActivos);
                          return (
                            <TableRow key={mesNum} hover>
                              <TableCell sx={{ fontWeight: 600, color: '#334155' }}>{NOMBRE_CORTO[mesNum]}</TableCell>
                              {tiposColumnasActivos.map((tipo) => {
                                const aplicaEsteMes = tiposDeEsteMes.includes(tipo);
                                return (
                                  <TableCell key={tipo} align="center" sx={{ p: 0.5 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                      <Tooltip title={`¿${tipo} aplica en ${NOMBRE_CORTO[mesNum]}?`}>
                                        <Checkbox
                                          size="small"
                                          checked={aplicaEsteMes}
                                          onChange={(e) => handleToggleTipoDelMes(anio, mesNum, tipo, e.target.checked, tiposColumnasActivos)}
                                          sx={{ p: 0.5 }}
                                        />
                                      </Tooltip>
                                      {aplicaEsteMes ? (
                                        <TextField
                                          fullWidth size="small" placeholder="0"
                                          slotProps={{ htmlInput: { style: { textAlign: 'center', padding: '6px' } } }}
                                          value={obtenerMonto(anio, tipo, mesNum)}
                                          onChange={(e) => actualizarMonto(anio, tipo, mesNum, e.target.value)}
                                        />
                                      ) : (
                                        <Typography variant="caption" sx={{ color: '#94a3b8', flexGrow: 1 }}>N/A</Typography>
                                      )}
                                    </Box>
                                  </TableCell>
                                );
                              })}
                              <TableCell align="center">
                                <Tooltip title="Quitar mes">
                                  <IconButton size="small" color="error" onClick={() => handleCambiarMeses(anio, mesesListados.filter((m) => m !== mesNum))}>
                                    <DeleteIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          );
                        })}

                        <TableRow sx={{ backgroundColor: '#f8fafc', borderTop: '2px solid #cbd5e1' }}>
                          <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>
                          {tiposColumnasActivos.map((tipo) => (
                            <TableCell key={tipo} align="center" sx={{ fontWeight: 700 }}>
                              {monedaDeColumna(anio, tipo) === 'USD' ? 'US$' : '$'}{calcularTotalColumna(anio, tipo).toLocaleString()}
                              {monedaDeColumna(anio, tipo) === 'COP' ? ' COP' : ''}
                            </TableCell>
                          ))}
                          <TableCell />
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </CardContent>
    </Card>
  );
}