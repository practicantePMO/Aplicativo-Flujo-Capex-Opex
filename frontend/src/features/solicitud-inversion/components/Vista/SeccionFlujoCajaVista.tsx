import { Card, CardContent, Typography, Paper, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import type { FlujoCaja } from '../../types/solicitud.types';

const NOMBRES_MES = ['', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

interface Props {
  flujosGrabados: FlujoCaja[];
}

const obtenerMontoGrabado = (flujos: FlujoCaja[], anio: number, tipo: string, mesNum: number) => {
  const f = flujos.find((x) => x.anio === anio && x.tipo === tipo && x.mes === mesNum);
  return f && f.monto ? Number(f.monto) : 0;
};

const calcularTotalFilaGrabado = (flujos: FlujoCaja[], anio: number, tipo: string) => {
  return flujos
    .filter((x) => x.anio === anio && x.tipo === tipo)
    .reduce((sum, x) => sum + (Number(x.monto) || 0), 0);
};

function EncabezadoFlujo({ anio, mesesConDatos }: { anio: number; mesesConDatos: number[] }) {
  return (
    <TableRow>
      <TableCell sx={{ minWidth: 100 }}>Tipo</TableCell>
      {mesesConDatos.map((mesNum) => (
        <TableCell key={mesNum} align="center" sx={{ minWidth: 90 }}>
          {NOMBRES_MES[mesNum]} {anio}
        </TableCell>
      ))}
      <TableCell align="right" sx={{ minWidth: 100 }}>
        Total {anio}
      </TableCell>
    </TableRow>
  );
}

function FilaFlujo({ flujos, anio, tipo, mesesConDatos }: { flujos: FlujoCaja[]; anio: number; tipo: string; mesesConDatos: number[] }) {
  return (
    <TableRow>
      <TableCell sx={{ fontWeight: 600 }}>{tipo}</TableCell>
      {mesesConDatos.map((mesNum) => {
        const monto = obtenerMontoGrabado(flujos, anio, tipo, mesNum);
        return (
          <TableCell key={mesNum} align="center">
            {monto > 0 ? `$${monto.toLocaleString()}` : '—'}
          </TableCell>
        );
      })}
      <TableCell align="right" sx={{ fontWeight: 700 }}>
        ${calcularTotalFilaGrabado(flujos, anio, tipo).toLocaleString()}
      </TableCell>
    </TableRow>
  );
}

function TablaFlujoAnio({ flujos, anio }: { flujos: FlujoCaja[]; anio: number }) {
  const flujosDelAnio = flujos.filter((f) => f.anio === anio);
  const tiposEnAnio = Array.from(new Set(flujosDelAnio.map((f) => f.tipo)));
  // 👈 Solo los meses que realmente tienen al menos un registro con monto > 0
  const mesesConDatos = Array.from(
    new Set(flujosDelAnio.filter((f) => Number(f.monto) > 0).map((f) => f.mes)),
  ).sort((a, b) => a - b);

  return (
    <TableContainer sx={{ overflowX: 'auto' }}>
      <Table size="small" sx={{ width: 'auto' }}>
        <TableHead>
          <EncabezadoFlujo anio={anio} mesesConDatos={mesesConDatos} />
        </TableHead>
        <TableBody>
          {tiposEnAnio.map((tipo) => (
            <FilaFlujo key={tipo} flujos={flujos} anio={anio} tipo={tipo} mesesConDatos={mesesConDatos} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function FlujoAnio({ flujos, anio }: { flujos: FlujoCaja[]; anio: number }) {
  return (
    <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
      <Box sx={{ mb: 1.5 }}>
        <Typography sx={{ fontWeight: 700 }}>
          Año {anio}
        </Typography>
      </Box>

      <TablaFlujoAnio flujos={flujos} anio={anio} />
    </Paper>
  );
}

export function SeccionFlujoCajaVista({ flujosGrabados }: Props) {
  const aniosUnicos = Array.from(new Set(flujosGrabados.map((f) => f.anio))).sort((a, b) => a - b);

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>Flujo de Caja Planeado</Typography>
        {aniosUnicos.length === 0 ? (
          <Typography variant="body2" color="text.secondary">Sin registros de flujo de caja.</Typography>
        ) : (
          aniosUnicos.map((anio) => (
            <FlujoAnio key={anio} flujos={flujosGrabados} anio={anio} />
          ))
        )}
      </CardContent>
    </Card>
  );
}
