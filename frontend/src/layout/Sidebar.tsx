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

export const DRAWER_WIDTH = 270;
export const DRAWER_WIDTH_COLAPSADO = 72;

interface SidebarProps {
  vistaActual: string;
  onCambiarVista: (vista: string) => void;
  abierto: boolean;
  onToggleAbierto: () => void;
}

export function Sidebar({
  vistaActual,
  onCambiarVista,
  abierto,
  onToggleAbierto,
}: SidebarProps) {
  const { tieneRol } = useAuth();

  const puedeAdministrarUsuarios =
    tieneRol('PMO') || tieneRol('ADMIN');

  const [usuariosPendientes, setUsuariosPendientes] = useState(0);

  useEffect(() => {
    if (!puedeAdministrarUsuarios) return;

    obtenerUsuarios()
      .then((data) =>
        setUsuariosPendientes(
          data.filter(
            (u) => u.usuario_roles_compania.length === 0
          ).length
        )
      )
      .catch(() => setUsuariosPendientes(0));
  }, [puedeAdministrarUsuarios]);

  const anchoActual = abierto
    ? DRAWER_WIDTH
    : DRAWER_WIDTH_COLAPSADO;

  const renderItem = (
    vista: string,
    icono: React.ReactNode,
    titulo: string,
    subtitulo: string,
    badge?: number
  ) => {
    const contenido = (
      <ListItemButton
        selected={vistaActual === vista}
        onClick={() => onCambiarVista(vista)}
        sx={{
          ...styles.navButton,
          justifyContent: abierto ? 'flex-start' : 'center',
        }}
      >
        <ListItemIcon
          sx={{
            ...styles.navIcon,
            minWidth: abierto ? 42 : 0,
            marginRight: abierto ? 0.5 : 0,
          }}
        >
          {badge !== undefined && badge > 0 ? (
            <Badge
              badgeContent={badge}
              color="warning"
              sx={styles.badge}
            >
              {icono}
            </Badge>
          ) : (
            icono
          )}
        </ListItemIcon>

        {abierto && (
          <ListItemText
            primary={
              <Typography sx={styles.primaryText}>
                {titulo}
              </Typography>
            }
            secondary={
              <Typography sx={styles.secondaryText}>
                {subtitulo}
              </Typography>
            }
          />
        )}
      </ListItemButton>
    );

    return (
      <ListItem disablePadding key={vista}>
        {abierto ? (
          contenido
        ) : (
          <Tooltip title={titulo} placement="right">
            {contenido}
          </Tooltip>
        )}
      </ListItem>
    );
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: anchoActual,
        flexShrink: 0,

        '& .MuiDrawer-paper': {
          width: anchoActual,
          boxSizing: 'border-box',

          backgroundColor: '#0e381e',

          borderRight: 'none',
          boxShadow: '2px 0 6px rgba(0,0,0,.12)',

          overflowX: 'hidden',

          transition: 'width 0.2s ease',
        },
      }}
    >
      {/* Espacio reservado para el Topbar */}
      <Toolbar sx={{ minHeight: '76px !important' }} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: abierto
            ? '20px 14px'
            : '20px 8px',
          overflowY: 'auto',
        }}
      >
        {/* Botón contraer / expandir */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: abierto
              ? 'flex-end'
              : 'center',
            marginBottom: 2.5,
          }}
        >
          <Tooltip
            title={
              abierto
                ? 'Contraer menú'
                : 'Expandir menú'
            }
            placement="right"
          >
            <IconButton
              onClick={onToggleAbierto}
              size="small"
              sx={styles.toggleButton}
            >
              {abierto ? (
                <ChevronLeftIcon fontSize="small" />
              ) : (
                <ChevronRightIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Box>

        {/* MENÚ PRINCIPAL */}
        {abierto && (
          <Typography sx={styles.sectionTitle}>
            MENÚ PRINCIPAL
          </Typography>
        )}

        <List disablePadding>
          {renderItem(
            'inicio',
            <HomeRoundedIcon />,
            'Inicio',
            'Resumen general'
          )}

          {renderItem(
            'pendientes',
            <InboxRoundedIcon />,
            'Mis Pendientes',
            'Tareas por aprobar'
          )}

          {renderItem(
            'proyectos',
            <FolderSpecialRoundedIcon />,
            'Proyectos',
            'Gestión del portafolio'
          )}
        </List>

        {/* ADMINISTRACIÓN */}
        {puedeAdministrarUsuarios && (
          <>
            <Divider sx={styles.divider} />

            {abierto && (
              <Typography sx={styles.sectionTitle}>
                ADMINISTRACIÓN
              </Typography>
            )}

            <List disablePadding>
              {renderItem(
                'usuarios',
                <ManageAccountsRoundedIcon />,
                'Gestión de Usuarios',
                'Roles y permisos',
                usuariosPendientes
              )}
            </List>
          </>
        )}

        {/* Información inferior */}
        {abierto && (
          <Box sx={styles.footer}>
            <Typography sx={styles.footerTitle}>
              Sistema PMO
            </Typography>

            <Typography sx={styles.footerText}>
              Grupo Nutresa · v1.0.0
            </Typography>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}

const styles = {
  toggleButton: {
    width: 32,
    height: 32,

    color: 'rgba(255,255,255,.75)',

    backgroundColor: 'transparent',

    border: '1px solid rgba(255,255,255,.18)',

    borderRadius: '6px',

    '&:hover': {
      backgroundColor: 'rgba(255,255,255,.08)',
      color: '#ffffff',
      borderColor: 'rgba(255,255,255,.3)',
    },
  },

  sectionTitle: {
    fontSize: '0.67rem',

    fontWeight: 700,

    letterSpacing: '1px',

    color: 'rgba(255,255,255,.45)',

    marginLeft: '10px',

    marginBottom: '8px',

    marginTop: '4px',
  },

  navButton: {
    position: 'relative',

    minHeight: 54,

    padding: '7px 10px',

    marginBottom: '4px',

    borderRadius: '6px',

    color: 'rgba(255,255,255,.75)',

    transition:
      'background-color 0.15s ease, color 0.15s ease',

    '&:hover': {
      backgroundColor: 'rgba(255,255,255,.06)',
      color: '#ffffff',
    },

    /*
     * Elemento seleccionado:
     * leve overlay claro + barra de acento en verde secundario
     */
    '&.Mui-selected': {
      backgroundColor: 'rgba(255,255,255,.12)',

      color: '#ffffff',

      '&::before': {
        content: '""',

        position: 'absolute',

        left: 0,

        top: 8,

        bottom: 8,

        width: '3px',

        borderRadius: '0 3px 3px 0',

        backgroundColor: '#91d61a',
      },

      '& .MuiListItemIcon-root': {
        color: '#ffffff',
      },

      '& .MuiTypography-root': {
        color: '#ffffff',
      },

      '&:hover': {
        backgroundColor: 'rgba(255,255,255,.14)',
      },
    },
  },

  navIcon: {
    color: 'rgba(255,255,255,.7)',

    '& svg': {
      fontSize: '1.3rem',
    },
  },

  primaryText: {
    fontSize: '0.84rem',

    fontWeight: 600,

    lineHeight: 1.25,

    color: 'rgba(255,255,255,.9)',
  },

  secondaryText: {
    fontSize: '0.7rem',

    lineHeight: 1.2,

    color: 'rgba(255,255,255,.55)',

    marginTop: '3px',
  },

  badge: {
    '& .MuiBadge-badge': {
      fontSize: '0.6rem',

      minWidth: 17,

      height: 17,

      padding: '0 4px',
    },
  },

  divider: {
    margin: '22px 4px',

    borderColor: 'rgba(255,255,255,.12)',
  },

  footer: {
    marginTop: 'auto',

    padding: '16px 10px 4px',

    borderTop: '1px solid rgba(255,255,255,.12)',
  },

  footerTitle: {
    fontSize: '0.72rem',

    fontWeight: 600,

    color: 'rgba(255,255,255,.9)',
  },

  footerText: {
    fontSize: '0.68rem',

    color: 'rgba(255,255,255,.55)',

    marginTop: '3px',
  },
};