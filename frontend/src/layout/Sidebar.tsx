import { useState, useEffect } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
  Divider,
  IconButton,
  Tooltip,
  Badge,
} from '@mui/material';

import FolderSpecialRoundedIcon from '@mui/icons-material/FolderSpecialRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useAuth } from '../auth/AuthContext';
import { obtenerUsuarios } from '../features/usuarios/services/usuarios.service';

export const DRAWER_WIDTH = 280;
export const DRAWER_WIDTH_COLAPSADO = 76;

interface SidebarProps {
  vistaActual: string;
  onCambiarVista: (vista: string) => void;
  abierto: boolean;
  onToggleAbierto: () => void;
}

export function Sidebar({ vistaActual, onCambiarVista, abierto, onToggleAbierto }: SidebarProps) {
  const { tieneRol } = useAuth();
  const puedeAdministrarUsuarios = tieneRol('PMO') || tieneRol('ADMIN');

  const [usuariosPendientes, setUsuariosPendientes] = useState(0);

  useEffect(() => {
    if (!puedeAdministrarUsuarios) return;
    obtenerUsuarios()
      .then((data) => setUsuariosPendientes(data.filter((u) => u.usuario_roles_compania.length === 0).length))
      .catch(() => setUsuariosPendientes(0));
  }, [puedeAdministrarUsuarios]);

  const anchoActual = abierto ? DRAWER_WIDTH : DRAWER_WIDTH_COLAPSADO;

  const renderItem = (
    vista: string,
    icono: React.ReactNode,
    titulo: string,
    subtitulo: string,
    badge?: number,
  ) => {
    const boton = (
      <ListItemButton
        selected={vistaActual === vista}
        onClick={() => onCambiarVista(vista)}
        sx={{ ...styles.navButton, justifyContent: abierto ? 'flex-start' : 'center' }}
      >
        <ListItemIcon sx={{ ...styles.navIcon, minWidth: abierto ? 48 : 0, justifyContent: 'center' }}>
          {badge ? <Badge badgeContent={badge} color="warning">{icono}</Badge> : icono}
        </ListItemIcon>

        {abierto && (
          <ListItemText
            primary={<Typography sx={styles.primaryText}>{titulo}</Typography>}
            secondary={<Typography sx={styles.secondaryText}>{subtitulo}</Typography>}
          />
        )}
      </ListItemButton>
    );

    return (
      <ListItem disablePadding key={vista}>
        {abierto ? boton : <Tooltip title={titulo} placement="right">{boton}</Tooltip>}
      </ListItem>
    );
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: anchoActual,
        flexShrink: 0,
        transition: 'width 0.2s ease',
        [`& .MuiDrawer-paper`]: {
          width: anchoActual,
          boxSizing: 'border-box',
          background: '#f8fafc',
          borderRight: '1px solid #e2e8f0',
          overflowX: 'hidden',
          transition: 'width 0.2s ease',
        },
      }}
    >
      <Toolbar sx={{ minHeight: '76px !important' }} />

      <Box sx={{ ...styles.container, padding: abierto ? '24px 18px' : '24px 8px' }}>
        {/* Botón de colapsar/expandir */}
        <Box sx={{ display: 'flex', justifyContent: abierto ? 'flex-end' : 'center', mb: 1 }}>
          <Tooltip title={abierto ? 'Contraer menú' : 'Expandir menú'}>
            <IconButton size="small" onClick={onToggleAbierto} sx={styles.toggleBtn}>
              {abierto ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Tooltip>
        </Box>

        {abierto && <Typography sx={styles.sectionHeader}>MENÚ PRINCIPAL</Typography>}

        <List sx={styles.list}>
          {renderItem('inicio', <HomeRoundedIcon />, 'Inicio', 'Resumen general')}
          {renderItem('pendientes', <InboxRoundedIcon />, 'Mis Pendientes', 'Tareas por aprobar')}
          {renderItem('proyectos', <FolderSpecialRoundedIcon />, 'Proyectos', 'Gestión del portafolio')}
        </List>

        {puedeAdministrarUsuarios && (
          <>
            <Divider sx={styles.divider} />
            {abierto && <Typography sx={styles.sectionHeader}>ADMINISTRACIÓN</Typography>}
            <List sx={styles.list}>
              {renderItem('usuarios', <ManageAccountsRoundedIcon />, 'Gestión de Usuarios', 'Roles y permisos', usuariosPendientes)}
            </List>
          </>
        )}

        {abierto && (
          <Box sx={styles.footer}>
            <Typography sx={styles.footerTitle}>Sistema PMO</Typography>
            <Typography sx={styles.footerSubtitle}>Grupo Nutresa · v1.0.0</Typography>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
  },

  toggleBtn: {
    backgroundColor: '#eef7f0',
    '&:hover': { backgroundColor: '#e0f0e5' },
  },

  sectionHeader: {
    color: '#94a3b8',
    fontWeight: 700,
    fontSize: '.72rem',
    letterSpacing: '1.4px',
    ml: 1.5,
    mb: 1.5,
    mt: 1,
  },

  divider: { my: 2.5, borderColor: '#e2e8f0' },

  list: { padding: 0 },

  navButton: {
    minHeight: 66,
    borderRadius: '16px',
    marginBottom: '10px',
    paddingX: 2,
    transition: 'all .25s ease',

    '&:hover': { backgroundColor: '#eef7f0' },

    '&.Mui-selected': {
      backgroundColor: '#edf8ef',
      borderLeft: '5px solid #75b70e',
      boxShadow: '0 8px 20px rgba(117,183,14,.15)',
      '& .MuiListItemIcon-root': { color: '#0e381e' },
      '& .MuiTypography-root': { color: '#0e381e' },
      '&:hover': { backgroundColor: '#e7f5ea' },
    },
  },

  navIcon: {
    color: '#64748b',
    '& svg': { fontSize: '1.55rem' },
  },

  primaryText: { fontSize: '.92rem', fontWeight: 700, lineHeight: 1.1 },
  secondaryText: { fontSize: '.74rem', color: '#64748b', mt: .4 },

  footer: {
    marginTop: 'auto',
    paddingTop: 3,
    borderTop: '1px solid #e2e8f0',
    textAlign: 'center',
  },
  footerTitle: { fontWeight: 700, color: '#0e381e', fontSize: '.82rem' },
  footerSubtitle: { color: '#94a3b8', fontSize: '.72rem', marginTop: .5 },
};