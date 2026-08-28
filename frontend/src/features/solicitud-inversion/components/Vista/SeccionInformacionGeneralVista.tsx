import { Card, CardContent, Typography, Stack, Divider } from '@mui/material';

interface Props {
  nombrePm?: string;
  categoriaTradicional?: string;
  categoriaNueva?: string;
  entregablePlaneado?: string;
}

export function SeccionInformacionGeneralVista({ nombrePm, categoriaTradicional, categoriaNueva, entregablePlaneado }: Props) {
  const campo = (label: string, contenido: React.ReactNode) => (
    <div>
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
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', display: 'block', textAlign: 'left' }}>
        {contenido}
      </Typography>
    </div>
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
        <Typography variant="h6" sx={{ mb: 2.5 }}>
          Información General
        </Typography>

        <Stack divider={<Divider flexItem />} spacing={2}>
          {campo('PM Responsable', nombrePm || '—')}

          {campo(
            'Categoría',
            <>
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
            </>
          )}

          {campo('Entregable Planeado', entregablePlaneado || '—')}
        </Stack>
      </CardContent>
    </Card>
  );
}