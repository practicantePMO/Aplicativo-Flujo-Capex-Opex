import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
  Avatar,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { useAuth } from '../auth/AuthContext';

export function Topbar() {
  const { usuario, logout } = useAuth();

  const rolPrincipal = usuario?.roles?.[0]?.rol.nombre || 'Sin Rol';
  const inicial = usuario?.nombre?.charAt(0)?.toUpperCase() || 'U';

  return (
    <AppBar position="fixed" elevation={0} sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        <Box sx={styles.brandBox}>
          <BusinessCenterIcon sx={styles.brandIcon} />
          <Box>
            <Typography sx={styles.brandTitle}>
              Aplicativo Flujo CAPEX - OPEX
            </Typography>
            <Typography sx={styles.brandSubtitle}>
              Grupo Nutresa
            </Typography>
          </Box>
        </Box>

        {usuario && (
          <Box sx={styles.userSection}>
            <Box sx={styles.userInfo}>
              <Avatar sx={styles.avatar}>{inicial}</Avatar>
              <Box sx={styles.userDetails}>
                <Typography sx={styles.userName}>{usuario.nombre}</Typography>
                <Typography sx={styles.userEmail}>{usuario.email}</Typography>
              </Box>
            </Box>

            <Chip label={rolPrincipal} sx={styles.roleChip} />

            <Box sx={styles.separator} />

            <Tooltip title="Cerrar sesión">
              <IconButton onClick={logout} sx={styles.logoutBtn}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

const styles = {
  appBar: {
    zIndex: (theme: any) => theme.zIndex.drawer + 1,
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px rgba(0,0,0,.04)',
  },

  toolbar: {
    minHeight: '76px !important',
    px: { xs: 2, md: 3 },
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },

  brandBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
  },

  brandIcon: {
    color: '#0e381e',
    fontSize: '1.7rem',
  },

  brandTitle: {
    color: '#0f172a',
    fontWeight: 700,
    fontSize: { xs: '1rem', md: '1.1rem' },
    lineHeight: 1.2,
  },

  brandSubtitle: {
    color: '#64748b',
    fontSize: '.75rem',
    mt: 0.3,
  },

  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
  },

  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.1,
  },

  avatar: {
    width: 34,
    height: 34,
    backgroundColor: '#0e381e',
    color: '#fff',
    fontSize: '.8rem',
    fontWeight: 700,
  },

  userDetails: {
    display: { xs: 'none', sm: 'block' },
  },

  userName: {
    color: '#0f172a',
    fontWeight: 600,
    fontSize: '.84rem',
    lineHeight: 1.2,
  },

  userEmail: {
    color: '#64748b',
    fontSize: '.7rem',
    mt: 0.2,
  },

  roleChip: {
    backgroundColor: '#75b70e',
    color: '#fff',
    fontWeight: 600,
    fontSize: '.7rem',
    height: 28,
    '& .MuiChip-label': { px: 1.1 },
  },

  separator: {
    width: '1px',
    height: 28,
    backgroundColor: '#e2e8f0',
  },

  logoutBtn: {
    width: 38,
    height: 38,
    color: '#64748b',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: '#fef2f2',
      color: '#dc2626',
    },
  },
};