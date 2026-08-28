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
    // 🎯 Formalizamos estos 3 colores al mismo tono que ya se usa a mano en
    // varias pantallas y en las plantillas de correo — así el sistema queda
    // consistente sin tener que salir a cambiar cada archivo.
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
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    h4: { fontWeight: 800, letterSpacing: '-0.5px' },
    h5: { fontWeight: 800, letterSpacing: '-0.3px' },
    h6: { fontWeight: 700 },
    subtitle1: { fontWeight: 700 },
    subtitle2: { fontWeight: 700 },
    button: { fontWeight: 600, textTransform: 'none' },
    overline: { fontWeight: 700, letterSpacing: '1px' },
    caption: { fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#c7d2c9 #f1f5f9',
        },
        '*::-webkit-scrollbar': { width: 10, height: 10 },
        '*::-webkit-scrollbar-track': { background: '#f1f5f9' },
        '*::-webkit-scrollbar-thumb': { background: '#c7d2c9', borderRadius: 8 },
        '*::-webkit-scrollbar-thumb:hover': { background: '#9fb3a2' },
        '*::selection': { backgroundColor: 'rgba(117, 183, 14, 0.28)' },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(117, 183, 14, 0.25)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px -2px rgba(14, 56, 30, 0.06)',
          border: '1px solid #f1f5f9',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0 2px 12px -2px rgba(14, 56, 30, 0.06)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          borderRadius: 8,
        },
        sizeSmall: {
          fontSize: '0.72rem',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          fontSize: '0.78rem',
          color: '#334155',
          backgroundColor: '#f8fafc',
          borderBottom: '2px solid #e2e8f0',
        },
        body: {
          fontSize: '0.85rem',
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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 18,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontWeight: 800,
          fontSize: '1.15rem',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 500,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderRadius: 3,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 700,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#0f172a',
          fontSize: '0.75rem',
          borderRadius: 8,
        },
      },
    },
  },
});