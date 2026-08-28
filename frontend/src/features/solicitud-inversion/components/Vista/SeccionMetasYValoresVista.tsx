import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from '@mui/material';

interface Meta {
  compromiso: string;
  fecha_inicio: string;
  indicador: string;
}

interface Valor {
  categoria: string;
  usd: number;
  cop: number;
}

interface Props {
  metas: Meta[];
  valores: Valor[];
}

export function SeccionMetasYValoresVista({ metas, valores }: Props) {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }} justifyContent="center">
      {/* METAS */}
      <Grid item xs={12} md={6}>
        <Card
          elevation={0}
          sx={{
            height: '100%',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Metas
            </Typography>

            {metas.length ? (
              metas.map((m, i) => (
                <Box
                  key={i}
                  sx={{
                    p: 2,
                    mb: 2,
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <Typography sx={{ fontWeight: 700, mb: 1 }}>
                    {m.compromiso}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    <strong>Inicio:</strong> {m.fecha_inicio}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    <strong>Indicador:</strong> {m.indicador}
                  </Typography>
                </Box>
              ))
            ) : (
              <Box sx={{ p: 3, textAlign: 'center', backgroundColor: '#f8fafc' }}>
                <Typography color="text.secondary">
                  Sin metas registradas.
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* VALORES */}
      <Grid item xs={12} md={6}>
        <Card
          elevation={0}
          sx={{
            height: '100%',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Valor del Proyecto
            </Typography>

            {valores.length ? (
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Categoría</TableCell>
                      <TableCell align="right">USD</TableCell>
                      <TableCell align="right">COP</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {valores.map((v, i) => (
                      <TableRow key={i} hover>
                        <TableCell sx={{ fontWeight: 600 }}>
                          {v.categoria}
                        </TableCell>

                        <TableCell align="right">
                          ${v.usd.toLocaleString()}
                        </TableCell>

                        <TableCell align="right" sx={{ fontWeight: 700 }}>
                          ${v.cop.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Box sx={{ p: 3, textAlign: 'center', backgroundColor: '#f8fafc' }}>
                <Typography color="text.secondary">
                  Sin valores registrados.
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}