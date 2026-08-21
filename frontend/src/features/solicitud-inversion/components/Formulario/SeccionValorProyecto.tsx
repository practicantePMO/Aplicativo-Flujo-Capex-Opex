import { Card, CardContent, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField, Paper, Box } from '@mui/material';

interface ValoresState {
  activoUsd: string;
  activoCop: string;
  gastoUsd: string;
  gastoCop: string;
}

interface Props {
  valoresProyecto: ValoresState;
  setValoresProyecto: React.Dispatch<React.SetStateAction<ValoresState>>;
  trm: string;
  setTrm: (val: string) => void;
  totalUsd: number;
  totalCop: number;
}

export function SeccionValorProyecto({ valoresProyecto, setValoresProyecto, trm, setTrm, totalUsd, totalCop }: Props) {
  return (
    <Card sx={{ mb: 3, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
          Valor Total del Proyecto
        </Typography>

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
                <TableCell sx={{ fontWeight: 600 }}>ACTIVO</TableCell>
                <TableCell align="center">
                  <TextField
                    size="small" type="number" fullWidth placeholder="0.00"
                    value={valoresProyecto.activoUsd}
                    onChange={(e) => setValoresProyecto({ ...valoresProyecto, activoUsd: e.target.value })}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    size="small" type="number" fullWidth placeholder="0.00"
                    value={valoresProyecto.activoCop}
                    onChange={(e) => setValoresProyecto({ ...valoresProyecto, activoCop: e.target.value })}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>GASTO</TableCell>
                <TableCell align="center">
                  <TextField
                    size="small" type="number" fullWidth placeholder="0.00"
                    value={valoresProyecto.gastoUsd}
                    onChange={(e) => setValoresProyecto({ ...valoresProyecto, gastoUsd: e.target.value })}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    size="small" type="number" fullWidth placeholder="0.00"
                    value={valoresProyecto.gastoCop}
                    onChange={(e) => setValoresProyecto({ ...valoresProyecto, gastoCop: e.target.value })}
                  />
                </TableCell>
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