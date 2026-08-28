import { Box, Typography, Chip } from '@mui/material';

interface Props {
  nombreProyecto: string;
  nombreProceso: string;
  estado: string;
  chipLabel?: string;
  chipColor?: 'success' | 'error' | 'default' | 'warning' | 'info';
}

const colorEstado = (est: string): 'success' | 'error' | 'default' | 'warning' | 'info' => {
  if (['APROBADO_FINAL', 'APROBADA', 'CERRADO'].includes(est)) return 'success';
  if (est === 'FINALIZADO') return 'success';
  if (['CANCELADO', 'RECHAZADO'].includes(est)) return 'error';
  if (est === 'BORRADOR') return 'default';
  return 'warning';
};

export function EncabezadoProceso({ nombreProyecto, nombreProceso, estado, chipLabel, chipColor }: Props) {
  const colorResuelto = chipColor ?? colorEstado(estado);
  const esNeutro = colorResuelto === 'default';

  return (
    <Box
      sx={{
        mb: 4, px: 3, py: 2.5, borderRadius: 1,
        backgroundColor: '#0e381e',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', md: 'center' },
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      <Box>
        <Typography variant="overline" sx={{ opacity: 0.75, letterSpacing: 1 }}>
          {nombreProceso}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>
          {nombreProyecto}
        </Typography>
      </Box>
      <Chip
        label={chipLabel ?? estado.replace(/_/g, ' ')}
        color={esNeutro ? undefined : colorResuelto}
        sx={{
          fontWeight: 700, fontSize: '.85rem', px: 1,
          ...(esNeutro && {
            color: '#fff',
            backgroundColor: 'rgba(255,255,255,.14)',
            border: '1px solid rgba(255,255,255,.3)',
          }),
        }}
      />
    </Box>
  );
}