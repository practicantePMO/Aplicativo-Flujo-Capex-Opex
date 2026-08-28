import { Card, CardContent, Box, Typography, Button, Grid, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Meta } from '../../types/solicitud.types';

interface Props {
  metas: Meta[];
  setMetas: React.Dispatch<React.SetStateAction<Meta[]>>;
}

export function SeccionMetas({ metas, setMetas }: Props) {
  const agregarMeta = () => setMetas([...metas, { compromiso: '', fecha_inicio: '', indicador: '' }]);

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">Metas</Typography>
          <Button size="small" startIcon={<AddIcon />} onClick={agregarMeta}>Agregar meta</Button>
        </Box>
        {metas.map((m, i) => (
          <Grid container spacing={2} key={i} sx={{ mb: 1.5, alignItems: 'center' }}>
            <Grid item xs={12} md={5}>
              <TextField label="Compromiso" fullWidth value={m.compromiso}
                onChange={(e) => setMetas(metas.map((x, idx) => idx === i ? { ...x, compromiso: e.target.value } : x))} />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                label="Fecha inicio" type="date" fullWidth
                slotProps={{ inputLabel: { shrink: true } }} value={m.fecha_inicio}
                onChange={(e) => setMetas(metas.map((x, idx) => idx === i ? { ...x, fecha_inicio: e.target.value } : x))}
              />
            </Grid>
            <Grid item xs={5} md={3}>
              <TextField label="Indicador" fullWidth value={m.indicador}
                onChange={(e) => setMetas(metas.map((x, idx) => idx === i ? { ...x, indicador: e.target.value } : x))} />
            </Grid>
            <Grid item xs={1}>
              <IconButton color="error" onClick={() => setMetas(metas.filter((_, idx) => idx !== i))}><DeleteIcon /></IconButton>
            </Grid>
          </Grid>
        ))}
      </CardContent>
    </Card>
  );
}