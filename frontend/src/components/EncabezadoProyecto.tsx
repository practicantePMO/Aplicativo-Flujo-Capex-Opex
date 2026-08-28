import { Card, CardContent, Box, Typography, Chip, Grid } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';

interface Props {
  nombreProyecto: string;
  idProyecto: string;
  nombreCompania?: string;
  nombrePm?: string;
  estado?: string;
}

const ESTADO_LABEL: Record<string, string> = {
  ACTIVO: 'Activo',
  APLAZADO: 'Aplazado',
  CANCELADO: 'Cancelado',
  FINALIZADO: 'Finalizado',
  EN_PROCESO_DE_CANCELACION: 'En proceso de cancelación',
  SUSPENDIDO: 'Suspendido',
};

const colorEstado = (est?: string): 'success' | 'error' | 'default' | 'warning' => {
  if (est === 'ACTIVO' || est === 'FINALIZADO') return 'success';
  if (est === 'CANCELADO') return 'error';
  if (est === 'APLAZADO' || est === 'EN_PROCESO_DE_CANCELACION') return 'warning';
  return 'default';
};

export function EncabezadoProyecto({ nombreProyecto, idProyecto, nombreCompania, nombrePm, estado }: Props) {
  const InfoCard = ({ icon, titulo, valor }: { icon: React.ReactNode; titulo: string; valor: string }) => (
    <Box
      sx={{
        display: 'flex', alignItems: 'center', gap: 1.5, p: 2, height: '100%',
        borderRadius: 1, bgcolor: '#f8fafc', border: '1px solid #e2e8f0', transition: 'background-color 0.15s ease',
        '&:hover': { bgcolor: '#f1f5f9' },
      }}
    >
      <Box sx={{ color: '#64748b', display: 'flex', alignItems: 'center' }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>{titulo}</Typography>
        <Typography variant="body2" sx={{ fontWeight: 700, wordBreak: 'break-word' }}>{valor}</Typography>
      </Box>
    </Box>
  );

  return (
    <Card elevation={0} sx={{ mb: 4, overflow: 'hidden' }}>
      <Box sx={{ px: 3, py: 3, backgroundColor: '#0e381e', color: 'white' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="overline" sx={{ opacity: 0.75, letterSpacing: 1 }}>PROYECTO</Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5 }}>{nombreProyecto}</Typography>
            <Typography variant="body2" sx={{ opacity: 0.85, mt: 0.5 }}>Proyecto #{idProyecto}</Typography>
          </Box>
          {estado && (
            <Chip label={ESTADO_LABEL[estado] || estado.replace(/_/g, ' ')} color={colorEstado(estado)} sx={{ fontWeight: 700, fontSize: '.85rem', px: 1 }} />
          )}
        </Box>
      </Box>

      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <InfoCard icon={<BusinessIcon fontSize="small" />} titulo="Compañía" valor={nombreCompania || 'Sin compañía'} />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoCard icon={<PersonIcon fontSize="small" />} titulo="Project Manager" valor={nombrePm || 'No asignado'} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}