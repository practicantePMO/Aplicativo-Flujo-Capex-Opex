import { useState, useEffect } from 'react';
import { Box, Card, Typography, CircularProgress, Button } from '@mui/material';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import FolderIcon from '@mui/icons-material/Folder';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAuth } from '../../../auth/AuthContext';
import { obtenerMisPendientes } from '../../procesos/services/procesos.service';
import { obtenerProyectos } from '../../proyectos/services/proyectos.service';

interface Props {
  onIrAPendientes: () => void;
  onIrAProyectos: () => void;
}

export function PantallaBienvenida({ onIrAPendientes, onIrAProyectos }: Props) {
  const { usuario, tieneRol } = useAuth();
  const [totalPendientes, setTotalPendientes] = useState<number | null>(null);
  const [totalProyectos, setTotalProyectos] = useState<number | null>(null);

  useEffect(() => {
    obtenerMisPendientes()
      .then((data: any[]) => setTotalPendientes(data.length))
      .catch(() => setTotalPendientes(null));

    obtenerProyectos()
      .then((data) => setTotalProyectos(data.length))
      .catch(() => setTotalProyectos(null));
  }, [usuario?.id]);

  // Rol principal a mostrar (el primero que tenga, solo para el saludo)
  const listaRoles = (usuario as any)?.roles || (usuario as any)?.usuario_roles_compania || [];
  const primerRol = listaRoles[0];
  const nombreRol = primerRol?.rol?.nombre || primerRol?.roles?.nombre;
  const nombreCompania = primerRol?.compania?.nombre || primerRol?.companias?.nombre || 'Global';

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#0e381e' }}>
          Bienvenido de nuevo, {usuario?.nombre?.split(' ')[0] || ''}
        </Typography>
        {nombreRol && (
          <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
            {nombreRol} · {nombreCompania}
          </Typography>
        )}
      </Box>

      <Box sx={styles.cardsRow}>
        <Card sx={styles.card} onClick={onIrAPendientes}>
          <Box sx={{ ...styles.iconBox, backgroundColor: '#fef3c7' }}>
            <AssignmentLateIcon sx={{ color: '#b45309' }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary">Pendientes de tu revisión</Typography>
            {totalPendientes === null ? (
              <CircularProgress size={20} sx={{ mt: 0.5 }} />
            ) : (
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#0e381e' }}>{totalPendientes}</Typography>
            )}
          </Box>
          <ArrowForwardIcon sx={{ color: '#94a3b8' }} />
        </Card>

        <Card sx={styles.card} onClick={onIrAProyectos}>
          <Box sx={{ ...styles.iconBox, backgroundColor: '#e6f7ed' }}>
            <FolderIcon sx={{ color: '#0e381e' }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {tieneRol('PMO') || tieneRol('ADMIN') || tieneRol('DIRECTOR_PMO') ? 'Proyectos en el portafolio' : 'Tus proyectos'}
            </Typography>
            {totalProyectos === null ? (
              <CircularProgress size={20} sx={{ mt: 0.5 }} />
            ) : (
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#0e381e' }}>{totalProyectos}</Typography>
            )}
          </Box>
          <ArrowForwardIcon sx={{ color: '#94a3b8' }} />
        </Card>
      </Box>

      {totalPendientes !== null && totalPendientes > 0 && (
        <Button
          variant="contained" color="secondary" onClick={onIrAPendientes}
          sx={{ mt: 3, borderRadius: '10px' }}
        >
          Ir a revisar pendientes
        </Button>
      )}
    </Box>
  );
}

const styles = {
  cardsRow: { display: 'flex', gap: 2, flexWrap: 'wrap' as const },
  card: {
    flex: '1 1 260px',
    p: 2.5,
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    cursor: 'pointer',
    transition: 'box-shadow 0.15s ease',
    '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.08)' },
  },
  iconBox: {
    width: 44, height: 44, borderRadius: 2,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
};