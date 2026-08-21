import { Box, Card, Typography, Button, Avatar } from '@mui/material';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../../auth/AuthContext';

export function PantallaEsperandoRol() {
  const { usuario, logout } = useAuth();

  return (
    <Box sx={styles.wrapper}>
      <Card sx={styles.card}>
        <Avatar sx={styles.avatar}>
          <HourglassTopIcon sx={{ fontSize: 32, color: '#b45309' }} />
        </Avatar>

        <Typography variant="h5" sx={styles.title}>
          Tu cuenta está lista, casi
        </Typography>

        <Typography variant="body1" sx={styles.subtitle}>
          Hola{usuario?.nombre ? `, ${usuario.nombre}` : ''}. Tu cuenta ya se creó correctamente,
          pero todavía necesitas que un administrador de la PMO te asigne un rol antes de poder
          entrar al sistema.
        </Typography>

        <Box sx={styles.infoBox}>
          <Typography variant="body2" sx={{ color: '#475569' }}>
            La PMO ya recibió una notificación automática sobre tu registro. Si después de un
            tiempo prudencial no te han asignado acceso, puedes contactarlos directamente para
            darles seguimiento.
          </Typography>
        </Box>

        <Typography variant="caption" sx={styles.emailText}>
          Conectado como {usuario?.email}
        </Typography>

        <Button
          variant="outlined" color="inherit" startIcon={<LogoutIcon />}
          onClick={logout} sx={styles.logoutBtn}
        >
          Cerrar sesión
        </Button>
      </Card>
    </Box>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    p: 2,
  },
  card: {
    maxWidth: 480,
    width: '100%',
    p: 4,
    borderRadius: 4,
    textAlign: 'center',
    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
  },
  avatar: {
    width: 64, height: 64, mx: 'auto', mb: 2,
    backgroundColor: '#fffbeb',
  },
  title: { fontWeight: 700, color: '#0e381e', mb: 1.5 },
  subtitle: { color: '#475569', mb: 3, lineHeight: 1.6 },
  infoBox: {
    backgroundColor: '#fffbeb',
    border: '1px solid #fde68a',
    borderRadius: 2,
    p: 2,
    mb: 3,
    textAlign: 'left',
  },
  emailText: { display: 'block', color: '#94a3b8', mb: 3 },
  logoutBtn: { borderRadius: '10px' },
};