import { Card, CardContent, Typography, Paper, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import type { FlujoCaja } from '../../types/solicitud.types';

const NOMBRES_MES = ['', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

interface Props {
  flujosGrabados: FlujoCaja[];
}

export function SeccionFlujoCajaVista({ flujosGrabados }: Props) {
  const aniosUnicos = Array.from(new Set(flujosGrabados.map((f) => f.anio))).sort((a, b) => a - b);

  const obtenerMontoGrabado = (anio: number, tipo: string, mesNum: number) => {
    const f = flujosGrabados.find((x) => x.anio === anio && x.tipo === tipo && x.mes === mesNum);
    return f && f.monto ? Number(f.monto) : 0;
  };

  const calcularTotalFilaGrabado = (anio: number, tipo: string) => {
    return flujosGrabados
      .filter((x) => x.anio === anio && x.tipo === tipo)
      .reduce((sum, x) => sum + (Number(x.monto) || 0), 0);
  };

  return (
    <Card sx={{ mb: 3, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Flujo de Caja Planeado</Typography>
        {aniosUnicos.length === 0 ? (
          <Typography variant="body2" color="text.secondary">Sin registros de flujo de caja.</Typography>
        ) : (
          aniosUnicos.map((anio) => {
            const flujosDelAnio = flujosGrabados.filter((f) => f.anio === anio);
            const tiposEnAnio = Array.from(new Set(flujosDelAnio.map((f) => f.tipo)));
            // 👈 Solo los meses que realmente tienen al menos un registro con monto > 0
            const mesesConDatos = Array.from(
              new Set(flujosDelAnio.filter((f) => Number(f.monto) > 0).map((f) => f.mes)),
            ).sort((a, b) => a - b);

            return (
              <Paper key={anio} variant="outlined" sx={{ p: 2, mb: 3, borderRadius: 2 }}>
                <Box sx={{ mb: 1.5 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#0e381e' }}>
                    Año {anio}
                  </Typography>
                </Box>

                <TableContainer sx={{ overflowX: 'auto' }}>
                  <Table size="small" sx={{ width: 'auto' }}>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#f1f5f9' }}>
                        <TableCell sx={{ fontWeight: 700, minWidth: 100 }}>Tipo</TableCell>
                        {mesesConDatos.map((mesNum) => (
                          <TableCell key={mesNum} align="center" sx={{ fontWeight: 700, minWidth: 90 }}>
                            {NOMBRES_MES[mesNum]} {anio}
                          </TableCell>
                        ))}
                        <TableCell align="right" sx={{ fontWeight: 700, minWidth: 100 }}>
                          Total {anio}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tiposEnAnio.map((tipo) => (
                        <TableRow key={tipo}>
                          <TableCell sx={{ fontWeight: 600 }}>{tipo}</TableCell>
                          {mesesConDatos.map((mesNum) => {
                            const monto = obtenerMontoGrabado(anio, tipo, mesNum);
                            return (
                              <TableCell key={mesNum} align="center">
                                {monto > 0 ? `$${monto.toLocaleString()}` : '—'}
                              </TableCell>
                            );
                          })}
                          <TableCell align="right" sx={{ fontWeight: 700, color: '#0e381e' }}>
                            ${calcularTotalFilaGrabado(anio, tipo).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}