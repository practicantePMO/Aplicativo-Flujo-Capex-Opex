import { Card, CardContent, Typography, Grid, Box, Alert } from '@mui/material';

interface Props {
  tieneEvaluacion?: boolean;
  tir?: number | null;
  vpn?: number | null;
  payback?: number | null;
  justificacion?: string | null;
}

export function SeccionEvaluacionFinancieraVista({
  tieneEvaluacion,
  tir,
  vpn,
  payback,
  justificacion,
}: Props) {
  const stat = (label: string, valor: React.ReactNode) => (
    <Box
      sx={{
        p: 2.5,
        border: '1px solid #e2e8f0',
        backgroundColor: '#f8fafc',
        height: '100%',
      }}
    >
      <Typography
        variant="caption"
        sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}
      >
        {label}
      </Typography>
      <Typography sx={{ mt: 1, fontSize: '1.7rem', fontWeight: 700 }}>
        {valor}
      </Typography>
    </Box>
  );

  return (
    <Card
      elevation={0}
      sx={{
        mb: 4,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Evaluación Financiera
        </Typography>

        {tieneEvaluacion ? (
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>{stat('TIR', <>{tir ?? '—'}%</>)}</Grid>
            <Grid item xs={12} md={4}>{stat('VPN', <>{vpn ?? '—'}</>)}</Grid>
            <Grid item xs={12} md={4}>
              {stat('Payback', <>{payback ?? '—'} <Typography component="span" sx={{ fontSize: '0.9rem', fontWeight: 500 }}>meses</Typography></>)}
            </Grid>
          </Grid>
        ) : (
          <Alert severity="warning">
            <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
              No se realizó evaluación financiera
            </Typography>
            <Typography variant="body2">
              <strong>Justificación:</strong> {justificacion || '—'}
            </Typography>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}