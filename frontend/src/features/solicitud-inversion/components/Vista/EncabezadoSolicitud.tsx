import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Grid,
} from '@mui/material';

import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import FolderIcon from '@mui/icons-material/Folder';
import AssignmentIcon from '@mui/icons-material/Assignment';

interface Props {
  nombreProyecto: string;
  idProyecto: string;
  nombreCompania?: string;
  nombrePm?: string;
  estado: string;
}

export function EncabezadoSolicitud({
  nombreProyecto,
  idProyecto,
  nombreCompania,
  nombrePm,
  estado,
}: Props) {
  const colorEstado = (est: string) => {
    if (est === 'APROBADO_FINAL') return 'success';
    if (est === 'CANCELADO') return 'error';
    if (est === 'BORRADOR') return 'default';
    return 'warning';
  };

  const InfoCard = ({
    icon,
    titulo,
    valor,
  }: {
    icon: React.ReactNode;
    titulo: string;
    valor: string;
  }) => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        p: 2,
        height: '100%',
        borderRadius: 2,
        bgcolor: '#f8fafc',
        border: '1px solid #e2e8f0',
        transition: '0.2s',
        '&:hover': {
          bgcolor: '#f1f5f9',
        },
      }}
    >
      <Box
        sx={{
          width: 42,
          height: 42,
          borderRadius: '50%',
          bgcolor: '#e8f5e9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#2e7d32',
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            display: 'block',
          }}
        >
          {titulo}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            wordBreak: 'break-word',
          }}
        >
          {valor}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Card
      elevation={2}
      sx={{
        mb: 3,
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      {/* Cabecera */}
      <Box
        sx={{
          px: 3,
          py: 3,
          background:
            'linear-gradient(90deg, #33533f 0%, #155d33 100%)',
          color: 'white',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: {
              xs: 'flex-start',
              md: 'center',
            },
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{
                opacity: .8,
                letterSpacing: 1,
              }}
            >
              SOLICITUD DE INVERSIÓN
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                mt: .5,
              }}
            >
              {nombreProyecto}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                opacity: .85,
                mt: .5,
              }}
            >
              Proyecto #{idProyecto}
            </Typography>
          </Box>

          <Chip
            label={estado.replace(/_/g, ' ')}
            color={colorEstado(estado) as any}
            sx={{
              fontWeight: 800,
              fontSize: '.85rem',
              px: 1,
            }}
          />
        </Box>
      </Box>

      {/* Información */}
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <InfoCard
              icon={<BusinessIcon fontSize="small" />}
              titulo="Compañía"
              valor={nombreCompania || 'Sin compañía'}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InfoCard
              icon={<PersonIcon fontSize="small" />}
              titulo="Project Manager"
              valor={nombrePm || 'No asignado'}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InfoCard
              icon={<AssignmentIcon fontSize="small" />}
              titulo="Proceso"
              valor="Solicitud de Inversión"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}