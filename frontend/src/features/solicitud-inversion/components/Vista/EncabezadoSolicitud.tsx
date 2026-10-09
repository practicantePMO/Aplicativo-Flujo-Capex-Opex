import type { ReactNode } from 'react';
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
import AssignmentIcon from '@mui/icons-material/Assignment';

interface Props {
  nombreProyecto: string;
  idProyecto: string;
  nombreCompania?: string;
  nombrePm?: string;
  estado: string;
}

const colorEstado = (est: string) => {
  if (est === 'APROBADO_FINAL') return 'success';
  if (est === 'CANCELADO') return 'error';
  if (est === 'BORRADOR') return 'default';
  return 'warning';
};

function InfoCard({
  icon,
  titulo,
  valor,
}: {
  icon: ReactNode;
  titulo: string;
  valor: string;
}) {
  return (
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
}

function TituloSolicitud({
  nombreProyecto,
  idProyecto,
}: Pick<Props, 'nombreProyecto' | 'idProyecto'>) {
  return (
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
  );
}

function CabeceraSolicitud({
  nombreProyecto,
  idProyecto,
  estado,
}: Pick<Props, 'nombreProyecto' | 'idProyecto' | 'estado'>) {
  return (
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
        <TituloSolicitud nombreProyecto={nombreProyecto} idProyecto={idProyecto} />

        <Chip
          label={estado.replace(/_/g, ' ')}
          color={colorEstado(estado)}
          sx={{
            fontWeight: 800,
            fontSize: '.85rem',
            px: 1,
          }}
        />
      </Box>
    </Box>
  );
}

function DatosSolicitud({
  nombreCompania,
  nombrePm,
}: Pick<Props, 'nombreCompania' | 'nombrePm'>) {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 4 }}>
        <InfoCard
          icon={<BusinessIcon fontSize="small" />}
          titulo="Compañía"
          valor={nombreCompania || 'Sin compañía'}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <InfoCard
          icon={<PersonIcon fontSize="small" />}
          titulo="Project Manager"
          valor={nombrePm || 'No asignado'}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <InfoCard
          icon={<AssignmentIcon fontSize="small" />}
          titulo="Proceso"
          valor="Solicitud de Inversión"
        />
      </Grid>
    </Grid>
  );
}

export function EncabezadoSolicitud({
  nombreProyecto,
  idProyecto,
  nombreCompania,
  nombrePm,
  estado,
}: Props) {
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
      <CabeceraSolicitud nombreProyecto={nombreProyecto} idProyecto={idProyecto} estado={estado} />

      {/* Información */}
      <CardContent sx={{ p: 3 }}>
        <DatosSolicitud nombreCompania={nombreCompania} nombrePm={nombrePm} />
      </CardContent>
    </Card>
  );
}
