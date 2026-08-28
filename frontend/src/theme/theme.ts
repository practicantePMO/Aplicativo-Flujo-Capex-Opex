import { createTheme } from '@mui/material/styles';

export const nutresaTheme = createTheme({
  palette: {
    primary: {
      main: '#0e381e',
      light: '#1b5e20',
      dark: '#082212',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#75b70e',
      light: '#91d61a',
      dark: '#528308',
      contrastText: '#ffffff',
    },
    success: {
      main: '#1a7f37',
      light: '#3fa35a',
      dark: '#0f5c26',
      contrastText: '#ffffff',
    },
    error: {
      main: '#d32f2f',
      light: '#e5534b',
      dark: '#a02525',
      contrastText: '#ffffff',
    },
    info: {
      main: '#0056b3',
      light: '#3378c4',
      dark: '#003d80',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#b45309',
      light: '#d97706',
      dark: '#7c3a06',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#64748b',
    },
    divider: '#e2e8f0',
  },
  shape: {
    borderRadius: 6,
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    h4: { fontWeight: 700, letterSpacing: '-0.3px' },
    h5: { fontWeight: 700, letterSpacing: '-0.2px' },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 600 },
    subtitle2: { fontWeight: 600 },
    body1: { fontWeight: 400 },
    body2: { fontWeight: 400 },
    button: { fontWeight: 600, textTransform: 'none' },
    overline: { fontWeight: 600, letterSpacing: '0.6px' },
    caption: { fontWeight: 500 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#cbd5e1 #f1f5f9',
        },
        '*::-webkit-scrollbar': { width: 10, height: 10 },
        '*::-webkit-scrollbar-track': { background: '#f1f5f9' },
        '*::-webkit-scrollbar-thumb': { background: '#cbd5e1', borderRadius: 8 },
        '*::-webkit-scrollbar-thumb:hover': { background: '#94a3b8' },
        '*::selection': { backgroundColor: 'rgba(14, 56, 30, 0.15)' },
      },
    },
    // 🔘 Botones: sin sombra ni siquiera en hover — solo un cambio sutil de
    // tono (eso ya lo hace MUI por defecto al mezclar con el fondo).
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 6,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        outlined: {
          borderColor: '#e2e8f0',
        },
      },
    },
    // 🃏 Cards planas: borde 1px, sin sombra decorativa, radio bajo.
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          boxShadow: 'none',
          border: '1px solid #e2e8f0',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 6,
        },
        sizeSmall: {
          fontSize: '0.72rem',
        },
      },
    },
    // 📊 Tablas: encabezado discreto, mayúsculas pequeñas, líneas finas
    // entre filas — nada de zebra-striping ni bordes gruesos.
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          fontSize: '0.7rem',
          color: '#64748b',
          backgroundColor: '#f8fafc',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          borderBottom: '1px solid #e2e8f0',
        },
        body: {
          fontSize: '0.85rem',
          borderBottom: '1px solid #f1f5f9',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-child td': { borderBottom: 0 },
        },
      },
    },
    // 📝 Inputs: borde simple, radio bajo, y label SIEMPRE arriba del campo
    // (nunca flotando adentro) — esto se logra forzando "shrink" por defecto.
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
      styleOverrides: {
        root: {
          fontWeight: 500,
          color: '#64748b',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
        notchedOutline: {
          borderColor: '#e2e8f0',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          fontSize: '1.1rem',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 400,
          border: '1px solid transparent',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 2,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    // 💬 Tooltips: elemento flotante — sombra sutil sí permitida aquí.
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#0f172a',
          fontSize: '0.75rem',
          borderRadius: 6,
        },
      },
    },
  },
});