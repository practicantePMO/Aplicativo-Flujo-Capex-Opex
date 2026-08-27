import { useState, useEffect } from 'react';
import { Box, Typography, Button, Alert, CircularProgress } from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel';
import { useAuth } from '../../../auth/AuthContext';
import type { ActaCierreResumen } from '../types/actaCierre.types';
import { obtenerActaCierrePorProyecto } from '../service/actasCierre.service';
import { FormularioActaCierre } from './FormularioActaCierre';
import { DetalleActaCierre } from './DetalleActaCierre';

interface Props {
  proyectoId: string;
  companiaId: number;
  creadoPor?: number | null;
}

export function PanelActaCierre({ proyectoId, companiaId, creadoPor }: Props) {
  const { usuario, tieneRol } = useAuth();
  const [acta, setActa] = useState<ActaCierreResumen | null | undefined>(undefined); // undefined = cargando
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const puedeCrear = tieneRol('ADMIN') || (tieneRol('PM') && Number(creadoPor) === Number(usuario?.id));

  const cargar = async () => {
    try {
      const data = await obtenerActaCierrePorProyecto(proyectoId);
      setActa(data);
    } catch {
      setActa(null);
    }
  };

  useEffect(() => { cargar(); }, [proyectoId]);

  if (acta === undefined) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}><CircularProgress size={24} color="secondary" /></Box>;
  }

  if (mostrarFormulario) {
    return (
      <FormularioActaCierre
        proyectoId={proyectoId}
        companiaId={companiaId}
        onCancelar={() => setMostrarFormulario(false)}
        onGuardado={() => { setMostrarFormulario(false); cargar(); }}
      />
    );
  }

  if (!acta) {
    return (
      <Box sx={{ mt: 3, p: 3, borderRadius: 3, border: '1px solid #e2e8f0', backgroundColor: '#fafafa' }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#0e381e', mb: 1 }}>Acta de Cierre</Typography>
        <Alert severity="info" sx={{ mb: 2 }}>Este proyecto todavía no tiene un Acta de Cierre.</Alert>
        {puedeCrear && (
          <Button variant="contained" color="error" startIcon={<GavelIcon />} onClick={() => setMostrarFormulario(true)}>
            Crear Acta de Cierre
          </Button>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
      <DetalleActaCierre
        procesoId={acta.procesos.id}
        companiaId={companiaId}
        onCambio={cargar}
        onEditar={() => setMostrarFormulario(true)}
      />
    </Box>
  );
}