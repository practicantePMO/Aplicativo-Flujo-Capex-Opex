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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { useAuth } from '../auth/AuthContext';

export function Topbar() {
  const { usuario, logout } = useAuth();

  const rolPrincipal = usuario?.roles?.[0]?.rol.nombre || 'Sin Rol';

  return (
    <AppBar position="fixed" elevation={0} sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        {/* Marca */}
        <Box sx={styles.brandBox}>

          <Box>
            <Typography sx={styles.brandTitle}>
              Aplicativo Flujo CAPEX - OPEX
            </Typography>

            <Typography sx={styles.brandSubtitle}>
               Grupo Nutresa
            </Typography>
          </Box>
        </Box>

        {/* Usuario */}
        {usuario && (
          <Box sx={styles.userSection}>
            <Box sx={styles.userPill}>
              <AccountCircleIcon sx={styles.userIcon} />

              <Box sx={styles.userDetails}>
                <Typography sx={styles.userName}>
                  {usuario.nombre}
                </Typography>

                <Typography sx={styles.userEmail}>
                  {usuario.email}
                </Typography>
              </Box>
            </Box>

            <Chip
              label={rolPrincipal}
              sx={styles.roleChip}
            />

            <Box sx={styles.separator} />

            <Tooltip title="Cerrar sesión">
              <IconButton
                onClick={logout}
                sx={styles.logoutBtn}
              >
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
    background:
      'linear-gradient(135deg,#0b3118 0%,#155228 45%,#1b6a36 100%)',
    borderBottom: '1px solid rgba(255,255,255,.08)',
    boxShadow: '0 8px 25px rgba(0,0,0,.18)',
    position: 'fixed',

    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '3px',
      background:
        'linear-gradient(90deg,#75b70e,#b4db52,#75b70e)',
    },
  },

  toolbar: {
    minHeight: '78px !important',
    px: 4,
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },

  brandBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },

  logo: {
    width: 50,
    height: 50,
    bgcolor: '#75b70e',
    color: '#fff',
    boxShadow: '0 6px 16px rgba(117,183,14,.45)',
  },

  brandTitle: {
    color: '#fff',
    fontWeight: 800,
    fontSize: '1.35rem',
    lineHeight: 1.1,
    letterSpacing: '-0.4px',
  },

  brandSubtitle: {
    color: 'rgba(255,255,255,.72)',
    fontSize: '.8rem',
    mt: .3,
    letterSpacing: '.3px',
  },

  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },

  userPill: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.4,
    px: 2,
    py: 1,
    borderRadius: '28px',
    background: 'rgba(255,255,255,.09)',
    border: '1px solid rgba(255,255,255,.12)',
    backdropFilter: 'blur(12px)',

    transition: '.25s',

    '&:hover': {
      background: 'rgba(255,255,255,.14)',
    },
  },

  userIcon: {
    color: '#91d61a',
    fontSize: '1.8rem',
  },

  userDetails: {
    display: { xs: 'none', sm: 'block' },
  },

  userName: {
    color: '#fff',
    fontWeight: 700,
    fontSize: '.92rem',
    lineHeight: 1.2,
  },

  userEmail: {
    color: 'rgba(255,255,255,.70)',
    fontSize: '.73rem',
  },

  roleChip: {
    background: '#75b70e',
    color: '#fff',
    fontWeight: 700,
    fontSize: '.74rem',
    height: 30,
    px: .5,

    boxShadow:
      '0 4px 12px rgba(117,183,14,.35)',

    '& .MuiChip-label': {
      px: 1.3,
    },
  },

  separator: {
    width: '1px',
    height: 30,
    bgcolor: 'rgba(255,255,255,.18)',
  },

  logoutBtn: {
    width: 42,
    height: 42,
    color: '#fff',
    background: 'rgba(255,255,255,.08)',

    transition: '.25s',

    '&:hover': {
      background: 'rgba(220,38,38,.18)',
      color: '#ffb4b4',
      transform: 'translateY(-2px)',
    },
  },
};