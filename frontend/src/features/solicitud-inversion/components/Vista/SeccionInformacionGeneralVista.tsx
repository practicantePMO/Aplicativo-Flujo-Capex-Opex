import { Card, CardContent, Typography, Grid } from '@mui/material';

interface Props {
  nombrePm?: string;
  categoriaTradicional?: string;
  categoriaNueva?: string;
  entregablePlaneado?: string;
}

export function SeccionInformacionGeneralVista({ nombrePm, categoriaTradicional, categoriaNueva, entregablePlaneado }: Props) {
  return (
    <Card
      elevation={0}
      sx={{
        mb: 3,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.04)',
      }}
    >
      <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            mb: 2.5,
            color: 'text.primary',
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,
            textAlign: 'left',
            '&::before': {
              content: '""',
              display: 'block',
              width: 4,
              height: 18,
              bgcolor: 'primary.main',
              borderRadius: 1,
            },
          }}
        >
          Información General
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4} sx={{ textAlign: 'left' }}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
                fontSize: '0.725rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                mb: 0.5,
                display: 'block',
                textAlign: 'left',
              }}
            >
              PM Responsable
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', display: 'block', textAlign: 'left' }}>
              {nombrePm || '—'}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4} sx={{ textAlign: 'left' }}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
                fontSize: '0.725rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                mb: 0.5,
                display: 'block',
                textAlign: 'left',
              }}
            >
              Categoría
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', display: 'block', textAlign: 'left' }}>
              {!categoriaTradicional && !categoriaNueva && '—'}
              {categoriaTradicional && (
                <Typography component="span" variant="body2" sx={{ display: 'block', fontWeight: 600 }}>
                  <Typography component="span" variant="caption" sx={{ color: 'text.secondary', fontWeight: 700 }}>Tradicional: </Typography>
                  {categoriaTradicional}
                </Typography>
              )}
              {categoriaNueva && (
                <Typography component="span" variant="body2" sx={{ display: 'block', fontWeight: 600, mt: categoriaTradicional ? 0.5 : 0 }}>
                  <Typography component="span" variant="caption" sx={{ color: 'text.secondary', fontWeight: 700 }}>Nueva: </Typography>
                  {categoriaNueva}
                </Typography>
              )}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4} sx={{ textAlign: 'left' }}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
                fontSize: '0.725rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                mb: 0.5,
                display: 'block',
                textAlign: 'left',
              }}
            >
              Entregable Planeado
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', display: 'block', textAlign: 'left' }}>
              {entregablePlaneado || '—'}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}