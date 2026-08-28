import { Box, Typography, Chip } from '@mui/material';

interface Props {
  nombreProyecto: string;
  nombreProceso: string;
  estado: string;
}

const colorEstado = (est: string): 'success' | 'error' | 'default' | 'warning' | 'info' => {
  if (['APROBADO_FINAL', 'APROBADA', 'CERRADO'].includes(est)) return 'success';
  if (est === 'FINALIZADO') return 'success';
  if (['CANCELADO', 'RECHAZADO'].includes(est)) return 'error';
  if (est === 'BORRADOR') return 'default';
  return 'warning';
};

export function EncabezadoProceso({ nombreProyecto, nombreProceso, estado }: Props) {
  return (
    <Box
      sx={{
        mb: 3, px: 3, py: 2.5, borderRadius: 3,
        background: 'linear-gradient(90deg, #33533f 0%, #155d33 100%)',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', md: 'center' },
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      <Box>
        <Typography variant="overline" sx={{ opacity: 0.8, letterSpacing: 1 }}>
          {nombreProceso}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5 }}>
          {nombreProyecto}
        </Typography>
      </Box>
      <Chip
        label={estado.replace(/_/g, ' ')}
        color={colorEstado(estado)}
        sx={{ fontWeight: 800, fontSize: '.85rem', px: 1 }}
      />
    </Box>
  );
}