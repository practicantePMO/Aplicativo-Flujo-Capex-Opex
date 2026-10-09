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

const estiloTarjeta = {
  height: '100%',
  border: '1px solid',
  borderColor: 'divider',
};

function SinRegistros({ texto }: { texto: string }) {
  return (
    <Box sx={{ p: 3, textAlign: 'center', backgroundColor: '#f8fafc' }}>
      <Typography color="text.secondary">
        {texto}
      </Typography>
    </Box>
  );
}

function TarjetaMeta({ meta }: { meta: Meta }) {
  return (
    <Box
      sx={{
        p: 2,
        mb: 2,
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
      }}
    >
      <Typography sx={{ fontWeight: 700, mb: 1 }}>
        {meta.compromiso}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        <strong>Inicio:</strong> {meta.fecha_inicio}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        <strong>Indicador:</strong> {meta.indicador}
      </Typography>
    </Box>
  );
}

function TarjetaMetas({ metas }: { metas: Meta[] }) {
  return (
    <Card elevation={0} sx={estiloTarjeta}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Metas
        </Typography>

        {metas.length ? (
          metas.map((m, i) => <TarjetaMeta key={i} meta={m} />)
        ) : (
          <SinRegistros texto="Sin metas registradas." />
        )}
      </CardContent>
    </Card>
  );
}

function EncabezadoTablaValores() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Categoría</TableCell>
        <TableCell align="right">USD</TableCell>
        <TableCell align="right">COP</TableCell>
      </TableRow>
    </TableHead>
  );
}

function FilaValor({ valor }: { valor: Valor }) {
  return (
    <TableRow hover>
      <TableCell sx={{ fontWeight: 600 }}>
        {valor.categoria}
      </TableCell>

      <TableCell align="right">
        ${valor.usd.toLocaleString()}
      </TableCell>

      <TableCell align="right" sx={{ fontWeight: 700 }}>
        ${valor.cop.toLocaleString()}
      </TableCell>
    </TableRow>
  );
}

function TablaValores({ valores }: { valores: Valor[] }) {
  return (
    <TableContainer>
      <Table size="small">
        <EncabezadoTablaValores />

        <TableBody>
          {valores.map((v, i) => <FilaValor key={i} valor={v} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function TarjetaValores({ valores }: { valores: Valor[] }) {
  return (
    <Card elevation={0} sx={estiloTarjeta}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Valor del Proyecto
        </Typography>

        {valores.length ? (
          <TablaValores valores={valores} />
        ) : (
          <SinRegistros texto="Sin valores registrados." />
        )}
      </CardContent>
    </Card>
  );
}

export function SeccionMetasYValoresVista({ metas, valores }: Props) {
  return (
    <Grid container spacing={3} sx={{ mb: 4, justifyContent: 'center' }}>
      {/* METAS */}
      <Grid size={{ xs: 12, md: 6 }}>
        <TarjetaMetas metas={metas} />
      </Grid>

      {/* VALORES */}
      <Grid size={{ xs: 12, md: 6 }}>
        <TarjetaValores valores={valores} />
      </Grid>
    </Grid>
  );
}
