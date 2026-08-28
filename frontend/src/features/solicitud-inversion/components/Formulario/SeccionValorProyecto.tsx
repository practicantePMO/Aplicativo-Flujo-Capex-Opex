import { Card, CardContent, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField, Paper, Box, Alert } from '@mui/material';

interface Props {
  trm: string;
  setTrm: (val: string) => void;
  activoUsd: number;
  activoCop: number;
  gastoUsd: number;
  gastoCop: number;
}

export function SeccionValorProyecto({ trm, setTrm, activoUsd, activoCop, gastoUsd, gastoCop }: Props) {
  const totalUsd = activoUsd + gastoUsd;
  const totalCop = activoCop + gastoCop;

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

        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '34%' }}>Categoría</TableCell>
                <TableCell align="center" sx={{ width: '33%' }}>Valor USD</TableCell>
                <TableCell align="center" sx={{ width: '33%' }}>Valor COP</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>ACTIVO (CAPEX)</TableCell>
                <TableCell align="center">${activoUsd.toLocaleString()}</TableCell>
                <TableCell align="center">COP{activoCop.toLocaleString()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>GASTO (GCAPEX + OPEX)</TableCell>
                <TableCell align="center">${gastoUsd.toLocaleString()}</TableCell>
                <TableCell align="center">COP{gastoCop.toLocaleString()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>TOTAL</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
                  ${totalUsd.toLocaleString()}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
                  COP{totalCop.toLocaleString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}