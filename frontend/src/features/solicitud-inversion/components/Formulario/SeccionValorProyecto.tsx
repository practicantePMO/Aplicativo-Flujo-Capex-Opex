import { Card, CardContent, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField, Paper, Box, Alert } from '@mui/material';

interface Props {
  trm: string;
  setTrm: (val: string) => void;
  activoUsd: number;
  activoCop: number;
  gastoUsd: number;
  gastoCop: number;
}

function EncabezadoTablaValores() {
  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{ width: '34%' }}>Categoría</TableCell>
        <TableCell align="center" sx={{ width: '33%' }}>Valor USD</TableCell>
        <TableCell align="center" sx={{ width: '33%' }}>Valor COP</TableCell>
      </TableRow>
    </TableHead>
  );
}

function FilaValor({ categoria, usd, cop }: { categoria: string; usd: number; cop: number }) {
  return (
    <TableRow>
      <TableCell sx={{ fontWeight: 600 }}>{categoria}</TableCell>
      <TableCell align="center">${usd.toLocaleString()}</TableCell>
      <TableCell align="center">COP{cop.toLocaleString()}</TableCell>
    </TableRow>
  );
}

function FilaTotal({ usd, cop }: { usd: number; cop: number }) {
  return (
    <TableRow>
      <TableCell sx={{ fontWeight: 700 }}>TOTAL</TableCell>
      <TableCell align="center" sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
        ${usd.toLocaleString()}
      </TableCell>
      <TableCell align="center" sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
        COP{cop.toLocaleString()}
      </TableCell>
    </TableRow>
  );
}

interface PropsTablaValores {
  activoUsd: number;
  activoCop: number;
  gastoUsd: number;
  gastoCop: number;
}

function TablaValores({ activoUsd, activoCop, gastoUsd, gastoCop }: PropsTablaValores) {
  const totalUsd = activoUsd + gastoUsd;
  const totalCop = activoCop + gastoCop;

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        <EncabezadoTablaValores />
        <TableBody>
          <FilaValor categoria="ACTIVO (CAPEX)" usd={activoUsd} cop={activoCop} />
          <FilaValor categoria="GASTO (GCAPEX + OPEX)" usd={gastoUsd} cop={gastoCop} />
          <FilaTotal usd={totalUsd} cop={totalCop} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function SeccionValorProyecto({ trm, setTrm, activoUsd, activoCop, gastoUsd, gastoCop }: Props) {
  return (
    <Card sx={{ mb: 4 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Valor Total del Proyecto
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          Estos valores se calculan automáticamente sumando la sección "Flujo de Caja Planeado" de abajo
          (CAPEX = Activo; GCAPEX + OPEX = Gasto), separados por la moneda de cada fila. Para cambiarlos, edita el flujo de caja.
        </Alert>

        <Box sx={{ mb: 3, maxWidth: 220 }}>
          <TextField
            label="TRM" type="number" fullWidth size="small" placeholder="0.00"
            value={trm}
            onChange={(e) => setTrm(e.target.value)}
          />
        </Box>

        <TablaValores activoUsd={activoUsd} activoCop={activoCop} gastoUsd={gastoUsd} gastoCop={gastoCop} />
      </CardContent>
    </Card>
  );
}
