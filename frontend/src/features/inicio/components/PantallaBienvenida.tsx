import { useState, useEffect } from 'react';
import { Box, Card, Typography, CircularProgress } from '@mui/material';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import FolderIcon from '@mui/icons-material/Folder';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAuth } from '../../../auth/AuthContext';
import { obtenerMisPendientes } from '../../procesos/services/procesos.service';
import { obtenerProyectos } from '../../proyectos/services/proyectos.service';
import { BotonBackupExcel } from '../../backup/components/BotonBackupExcel';

interface Props {
  onIrAPendientes: () => void;
  onIrAProyectos: () => void;
}

export function PantallaBienvenida({ onIrAPendientes, onIrAProyectos }: Props) {
  const { usuario, tieneRol } = useAuth();
  const [totalPendientes, setTotalPendientes] = useState<number | null>(null);
  const [totalProyectos, setTotalProyectos] = useState<number | null>(null);
  const [proyectosActivos, setProyectosActivos] = useState<number | null>(null);

  useEffect(() => {
    obtenerMisPendientes()
      .then((data: any[]) => setTotalPendientes(data.length))
      .catch(() => setTotalPendientes(null));

    obtenerProyectos()
      .then((data) => {
        setTotalProyectos(data.length);
        setProyectosActivos(data.filter((p) => p.estado === 'ACTIVO').length);
      })
      .catch(() => { setTotalProyectos(null); setProyectosActivos(null); });
  }, [usuario?.id]);

  const listaRoles = (usuario as any)?.roles || (usuario as any)?.usuario_roles_compania || [];
  const primerRol = listaRoles[0];
  const nombreRol = primerRol?.rol?.nombre || primerRol?.roles?.nombre;
  const nombreCompania = primerRol?.compania?.nombre || primerRol?.companias?.nombre || 'Global';

  const stat = (
    icon: React.ReactNode,
    label: string,
    value: number | null,
    onClick: () => void,
  ) => (
    <Card variant="outlined" sx={styles.statCard} onClick={onClick}>
      <Box sx={styles.iconBox}>{icon}</Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body2" color="text.secondary">{label}</Typography>
        {value === null ? (
          <CircularProgress size={18} sx={{ mt: 0.5 }} />
        ) : (
          <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.25 }}>{value}</Typography>
        )}
      </Box>
      <ArrowForwardIcon sx={{ color: '#94a3b8', fontSize: '1.2rem' }} />
    </Card>
  );

  return (
    <Box>
      <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
  <Box>
    <Typography variant="h5" sx={{ fontWeight: 700 }}>
      Bienvenido de nuevo, {usuario?.nombre?.split(' ')[0] || ''}
    </Typography>
    {nombreRol && (
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        {nombreRol} · {nombreCompania}
      </Typography>
    )}
  </Box>
  <BotonBackupExcel />
</Box>

      <Box sx={styles.cardsRow}>
        {stat(<AssignmentLateIcon sx={{ color: '#64748b' }} />, 'Pendientes de tu revisión', totalPendientes, onIrAPendientes)}
        {stat(<TrendingUpIcon sx={{ color: '#0e381e' }} />, 'Proyectos activos', proyectosActivos, onIrAProyectos)}
        {stat(
          <FolderIcon sx={{ color: '#64748b' }} />,
          tieneRol('PMO') || tieneRol('ADMIN') || tieneRol('DIRECTOR_PMO') ? 'Proyectos en el portafolio' : 'Tus proyectos',
          totalProyectos,
          onIrAProyectos,
        )}
      </Box>
    </Box>
  );
}

const styles = {
  cardsRow: { display: 'flex', gap: 2, flexWrap: 'wrap' as const },
  statCard: {
    flex: '1 1 240px',
    p: 2.5,
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    cursor: 'pointer',
    transition: 'border-color 0.15s ease, background-color 0.15s ease',
    '&:hover': { borderColor: '#94a3b8', backgroundColor: '#f8fafc' },
  },
  iconBox: {
    width: 40, height: 40,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
};