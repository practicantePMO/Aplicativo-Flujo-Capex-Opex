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
    <Card sx={{ mb: 3, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
          Valor Total del Proyecto
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          Estos valores se calculan automáticamente sumando la sección "Flujo de Caja Planeado" de abajo
          (CAPEX = Activo; GCAPEX + OPEX = Gasto), separados por la moneda de cada fila. Para cambiarlos, edita el flujo de caja.
        </Alert>

        <Box sx={{ mb: 2, maxWidth: 220 }}>
          <TextField
            label="TRM" type="number" fullWidth size="small" placeholder="0.00"
            value={trm}
            onChange={(e) => setTrm(e.target.value)}
          />
        </Box>

        <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f1f5f9' }}>
                <TableCell sx={{ fontWeight: 700, width: '34%' }}>Categoría</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, width: '33%' }}>Valor USD</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, width: '33%' }}>Valor COP</TableCell>
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
              <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                <TableCell sx={{ fontWeight: 800, color: '#0e381e' }}>TOTAL</TableCell>
                <TableCell align="center" sx={{ fontWeight: 800, color: '#0e381e', fontSize: '1rem' }}>
                  ${totalUsd.toLocaleString()}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 800, color: '#0e381e', fontSize: '1rem' }}>
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