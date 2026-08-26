import { useState } from 'react';
import { useAuth } from './AuthContext';
import { Box, Button, Paper, Typography, Menu, MenuItem, Chip } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

// Lista de los 16 usuarios del seed de prueba
// ⚠️ Esta lista NO se lee de la base de datos — si vuelves a cambiar el seed
// (agregar/quitar usuarios), hay que actualizarla también aquí a mano.
const USUARIOS_PRUEBA = [
  { id: 1, nombre: 'Ana (Admin)', rol: 'ADMIN', compania: 'Global' },
  { id: 2, nombre: 'Laura (PM)', rol: 'PM', compania: 'Global' },
  { id: 8, nombre: 'Mateo (PM)', rol: 'PM', compania: 'Global' },
  { id: 3, nombre: 'Carlos (PMO)', rol: 'PMO', compania: 'Global' },
  { id: 9, nombre: 'Valentina (PMO)', rol: 'PMO', compania: 'Global' },
  { id: 4, nombre: 'Diana (Director PMO)', rol: 'DIRECTOR_PMO', compania: 'Global' },
  { id: 5, nombre: 'Gerardo (Gerencia)', rol: 'GERENCIA', compania: 'Galletas' },
  { id: 11, nombre: 'Gabriela (Gerencia)', rol: 'GERENCIA', compania: 'Galletas' },
  { id: 12, nombre: 'German (Gerencia)', rol: 'GERENCIA', compania: 'Pastas' },
  { id: 13, nombre: 'Gloria (Gerencia)', rol: 'GERENCIA', compania: 'Snacks' },
  { id: 6, nombre: 'Pedro (Presidencia)', rol: 'PRESIDENCIA', compania: 'Galletas' },
  { id: 14, nombre: 'Patricia (Presidencia)', rol: 'PRESIDENCIA', compania: 'Pastas' },
  { id: 15, nombre: 'Pablo (Presidencia)', rol: 'PRESIDENCIA', compania: 'Snacks' },
  { id: 7, nombre: 'Sofia (Parte Interesada)', rol: 'PARTE_INTERESADA', compania: 'Global' },
  { id: 16, nombre: 'Simon (Parte Interesada)', rol: 'PARTE_INTERESADA', compania: 'Global' },
  { id: 17, nombre: 'Camila (Control Gestión)', rol: 'CONTROL_GESTION', compania: 'Global' },
  { id: 18, nombre: 'Cristian (Control Gestión)', rol: 'CONTROL_GESTION', compania: 'Global' },
  { id: 10, nombre: 'Nuevo (sin rol)', rol: 'NINGUNO', compania: '—' },
];

export function DevSwitcher() {
  const { usuario, loginDev } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Solo se muestra en entorno de desarrollo
  if (!import.meta.env.DEV) return null;

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectUsuario = async (usuarioId: number) => {
    handleClose();
    try {
      await loginDev(usuarioId);
    } catch (error) {
      console.error('Error al cambiar de usuario:', error);
      alert('Error al autenticar usuario de prueba. ¿El backend está encendido?');
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 9999,
        p: 1.5,
        backgroundColor: '#1e293b',
        color: '#ffffff',
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box>
          <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>
            [DEV] Usuario Activo:
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {usuario ? usuario.nombre : 'Sin sesión'}
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="small"
          color="warning"
          startIcon={<SwapHorizIcon />}
          onClick={handleOpen}
        >
          Cambiar
        </Button>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{ paper: { sx: { maxHeight: 300 } } }}
        >
        <MenuItem disabled>
          <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
            SELECCIONAR USUARIO DE PRUEBA
          </Typography>
        </MenuItem>
        {USUARIOS_PRUEBA.map((u) => (
          <MenuItem
            key={u.id}
            selected={usuario?.id === u.id}
            onClick={() => handleSelectUsuario(u.id)}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: 2 }}>
              <span>{u.nombre}</span>
              <Chip label={u.rol} size="small" color="primary" variant="outlined" />
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Paper>
  );
}