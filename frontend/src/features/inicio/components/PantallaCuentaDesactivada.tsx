import { Box, Card, Typography, Button, Avatar } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../../auth/AuthContext';

export function PantallaCuentaDesactivada() {
  const { usuario, logout } = useAuth();

  return (
    <Box sx={styles.wrapper}>
      <Card sx={styles.card}>
        <Avatar sx={styles.avatar}>
          <BlockIcon sx={{ fontSize: 32, color: '#b91c1c' }} />
        </Avatar>

        <Typography variant="h5" sx={styles.title}>
          Tu acceso está desactivado
        </Typography>

        <Typography variant="body1" sx={styles.subtitle}>
          Hola{usuario?.nombre ? `, ${usuario.nombre}` : ''}. Un administrador de la PMO
          desactivó tu acceso al sistema. Si crees que esto es un error, contáctalos
          directamente para que lo revisen.
        </Typography>

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
  avatar: { width: 64, height: 64, mx: 'auto', mb: 2, backgroundColor: '#fee2e2' },
  title: { fontWeight: 700, color: '#0e381e', mb: 1.5 },
  subtitle: { color: '#475569', mb: 3, lineHeight: 1.6 },
  emailText: { display: 'block', color: '#94a3b8', mb: 3 },
  logoutBtn: { borderRadius: '10px' },
};