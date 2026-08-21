import { useState, type ReactNode } from 'react';
import { ThemeProvider, Box, CssBaseline } from '@mui/material';
import { nutresaTheme } from '../theme/theme';
import { Topbar } from './Topbar';
import { Sidebar, DRAWER_WIDTH, DRAWER_WIDTH_COLAPSADO } from './Sidebar';

interface AppLayoutProps {
  children?: ReactNode;
  vistaActual?: string;
  onCambiarVista?: (vista: string) => void;
}

export function AppLayout({
  children,
  vistaActual: vistaProp,
  onCambiarVista: onCambiarVistaProp,
}: AppLayoutProps) {
  const [vistaInterna, setVistaInterna] = useState('pendientes');
  const [sidebarAbierto, setSidebarAbierto] = useState(true);

  const vistaActiva = vistaProp ?? vistaInterna;
  const manejarCambioVista = onCambiarVistaProp ?? setVistaInterna;

  const anchoSidebar = sidebarAbierto ? DRAWER_WIDTH : DRAWER_WIDTH_COLAPSADO;

  return (
    <ThemeProvider theme={nutresaTheme}>
      <CssBaseline />

      <Box sx={styles.layoutWrapper}>
        <Topbar />

        <Sidebar
          vistaActual={vistaActiva}
          onCambiarVista={manejarCambioVista}
          abierto={sidebarAbierto}
          onToggleAbierto={() => setSidebarAbierto((v) => !v)}
        />

        <Box
          component="main"
          sx={{
            ...styles.mainContent,
            // El contenido no necesita margen extra: el Sidebar ya reserva su
            // propio ancho con "flexShrink: 0" — pero como el ancho cambia con
            // una transición, dejamos que fluya junto con ella.
            transition: 'margin-left 0.2s ease',
          }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

const styles = {
  layoutWrapper: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f4f6f8',
    overflow: 'hidden',
  },

  mainContent: {
    flexGrow: 1,
    minWidth: 0,
    padding: 3,
    marginTop: '90px',
    overflowY: 'auto',
    boxSizing: 'border-box',
  },
};