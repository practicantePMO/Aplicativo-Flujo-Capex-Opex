import { Box, Card, Typography, Avatar } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { GoogleLoginButton } from '../../../auth/GoogleLoginButton';

export function PantallaSesionCerrada() {
  return (
    <Box sx={styles.wrapper}>
      <Card sx={styles.card}>
        <Avatar sx={styles.avatar}>
          <CheckCircleOutlineIcon sx={{ fontSize: 32, color: '#0e381e' }} />
        </Avatar>
        <Typography variant="h5" sx={styles.title}>
          Sesión cerrada
        </Typography>
        <Typography variant="body1" sx={styles.subtitle}>
          Saliste del Sistema de Gestión de Proyectos correctamente.
        </Typography>
        <GoogleLoginButton />
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
    maxWidth: 420,
    width: '100%',
    p: 4,
    borderRadius: 4,
    textAlign: 'center',
    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
  },
  avatar: { width: 64, height: 64, mx: 'auto', mb: 2, backgroundColor: '#e6f7ed' },
  title: { fontWeight: 700, color: '#0e381e', mb: 1.5 },
  subtitle: { color: '#475569' },
};