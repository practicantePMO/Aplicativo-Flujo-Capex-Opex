import { useState, useEffect } from 'react';
import { Box, Typography, Button, Accordion, AccordionSummary, AccordionDetails, Chip, Alert, CircularProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useAuth } from '../../../auth/AuthContext';
import type { ControlCambioResumen } from '../types/controlCambio.types';
import { obtenerControlCambiosPorProyecto } from '../services/controlCambios.service';
import { DetalleControlCambio } from './DetalleControlCambio';
import { FormularioControlCambio } from './FormularioControlCambio';

const ESTADO_CC_CONFIG: Record<string, { label: string; color: 'default' | 'warning' | 'success' | 'info' }> = {
  BORRADOR: { label: 'Borrador', color: 'default' },
  PENDIENTE_PMO: { label: 'Pendiente PMO', color: 'warning' },
  VERIFICACION_PARTES_INTERESADAS: { label: 'Verificación Partes Interesadas', color: 'warning' },
  DIRECCION_PMO: { label: 'Dirección PMO', color: 'warning' },
  GERENCIA: { label: 'Gerencia', color: 'warning' },
  PRESIDENCIA: { label: 'Presidencia', color: 'warning' },
  APROBADO_FINAL: { label: 'Aprobado Final', color: 'success' },
};

interface Props {
  proyectoId: string;
  companiaId: number;
  creadoPor?: number | null;
  procesoIdInicial?: number | null;
  onCrearOi?: (controlCambioId: number) => void;
}

export function PanelControlCambios({ proyectoId, companiaId, creadoPor, procesoIdInicial, onCrearOi }: Props) {
  const { usuario, tieneRol } = useAuth();
  const [items, setItems] = useState<ControlCambioResumen[] | undefined>(undefined); // undefined = cargando
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarLista, setMostrarLista] = useState(!!procesoIdInicial);
  const [expandidoId, setExpandidoId] = useState<number | false>(procesoIdInicial ?? false);
  const [enEdicionId, setEnEdicionId] = useState<number | null>(null);

  const puedeCrear = tieneRol('ADMIN') || (tieneRol('PM') && Number(creadoPor) === Number(usuario?.id));

  const cargar = async () => {
    try {
      const data = await obtenerControlCambiosPorProyecto(proyectoId);
      setItems(data);
    } catch {
      setItems([]);
    }
  };

  useEffect(() => { cargar(); }, [proyectoId]);

  if (items === undefined) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}><CircularProgress size={24} color="secondary" /></Box>;
  }

  if (mostrarFormulario || enEdicionId !== null) {
    return (
      <FormularioControlCambio
        proyectoId={proyectoId}
        companiaId={companiaId}
        procesoId={enEdicionId ?? undefined}
        onCancelar={() => { setMostrarFormulario(false); setEnEdicionId(null); }}
        onGuardado={(procesoId) => {
          setMostrarFormulario(false);
          setEnEdicionId(null);
          setMostrarLista(true);
          setExpandidoId(procesoId);
          cargar();
        }}
      />
    );
  }

  const hayItems = items.length > 0;

  return (
        <Box sx={{ mt: 4, p: 3, border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Control de Cambios
      </Typography>

      {!hayItems ? (
        <Box>
          <Alert severity="info" sx={{ mb: 2 }}>Todavía no se ha creado ningún Control de Cambios para este proyecto.</Alert>
          {puedeCrear && (
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setMostrarFormulario(true)}>
              Crear Control de Cambios
            </Button>
          )}
        </Box>
      ) : !mostrarLista ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button variant="outlined" color="secondary" startIcon={<ListAltIcon />} onClick={() => setMostrarLista(true)}>
            Ver Control de Cambios ({items.length})
          </Button>
          {puedeCrear && (
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setMostrarFormulario(true)}>
              Crear Control de Cambios
            </Button>
          )}
        </Box>
      ) : (
        <Box>
          {puedeCrear && (
            <Button size="small" variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setMostrarFormulario(true)} sx={{ mb: 2 }}>
              Crear Control de Cambios
            </Button>
          )}

          {items.map((cc) => (
            <Accordion
              key={cc.id}
              expanded={expandidoId === cc.procesos.id}
              onChange={(_, expandido) => setExpandidoId(expandido ? cc.procesos.id : false)}
              disableGutters
              sx={{ mb: 1, border: '1px solid #e2e8f0', '&:before': { display: 'none' } }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%', flexWrap: 'wrap' }}>
                  <Typography sx={{ fontWeight: 700 }}>
                    {cc.descripcion_cambio ? cc.descripcion_cambio.slice(0, 60) : `Control de Cambios #${cc.id}`}
                  </Typography>
                  <Chip
                    label={ESTADO_CC_CONFIG[cc.procesos.estado_actual]?.label || cc.procesos.estado_actual}
                    color={ESTADO_CC_CONFIG[cc.procesos.estado_actual]?.color || 'default'}
                    size="small"
                  />
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                {expandidoId === cc.procesos.id && (
                  <DetalleControlCambio
                    procesoId={cc.procesos.id}
                    companiaId={companiaId}
                    onCambio={cargar}
                    onEditar={() => setEnEdicionId(cc.procesos.id)}
                    onCrearOi={onCrearOi}
                  />
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}
    </Box>
  );
}