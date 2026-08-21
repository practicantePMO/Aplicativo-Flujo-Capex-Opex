import { Card, CardContent, Typography, Grid, Box } from '@mui/material';

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
  return (
    <Card
      elevation={0}
      sx={{
        mb: 3,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: '#0e381e',
            mb: 3,
          }}
        >
          Evaluación Financiera
        </Typography>

        {tieneEvaluacion ? (
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#f8fafc',
                  height: '100%',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    fontWeight: 700,
                  }}
                >
                  TIR
                </Typography>

                <Typography
                  sx={{
                    mt: 1,
                    fontSize: '1.7rem',
                    fontWeight: 700,
                    color: '#0e381e',
                  }}
                >
                  {tir ?? '—'}%
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#f8fafc',
                  height: '100%',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    fontWeight: 700,
                  }}
                >
                  VPN
                </Typography>

                <Typography
                  sx={{
                    mt: 1,
                    fontSize: '1.7rem',
                    fontWeight: 700,
                    color: '#0e381e',
                  }}
                >
                  {vpn ?? '—'}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#f8fafc',
                  height: '100%',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    fontWeight: 700,
                  }}
                >
                  Payback
                </Typography>

                <Typography
                  sx={{
                    mt: 1,
                    fontSize: '1.7rem',
                    fontWeight: 700,
                    color: '#0e381e',
                  }}
                >
                  {payback ?? '—'} <Typography component="span" sx={{ fontSize: '0.9rem', fontWeight: 500 }}>meses</Typography>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: '#fff7ed',
              border: '1px solid #fed7aa',
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                color: '#9a3412',
                mb: 1,
              }}
            >
              No se realizó evaluación financiera
            </Typography>

            <Typography color="text.secondary">
              <strong>Justificación:</strong> {justificacion || '—'}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}