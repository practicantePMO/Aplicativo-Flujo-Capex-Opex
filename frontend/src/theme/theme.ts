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
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#64748b',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
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
  },
});