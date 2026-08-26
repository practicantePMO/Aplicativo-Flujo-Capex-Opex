import { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Accordion, AccordionSummary, AccordionDetails, Chip, Alert,
  CircularProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useAuth } from '../../../auth/AuthContext';
import type { GrupoOrdenesInternas } from '../types/ordenInterna.types';
import { obtenerOrdenesInternasPorProyecto } from '../services/ordenesInternas.service';
import { DetalleOrdenInterna } from './DetalleOrdenInterna';
import { FormularioOrdenInterna } from './FormularioOrdenInterna';

const ESTADO_OI_CONFIG: Record<string, { label: string; color: 'default' | 'warning' | 'success' | 'info' }> = {
  BORRADOR: { label: 'Borrador', color: 'default' },
  PENDIENTE: { label: 'Pendiente', color: 'warning' },
  APROBADA: { label: 'Aprobada', color: 'success' },
  CERRADA: { label: 'Cerrada', color: 'info' },
};

const ESTADO_GRUPO_CONFIG: Record<string, { label: string; color: 'success' | 'warning' | 'default' }> = {
  ABIERTO: { label: 'Abierto', color: 'success' },
  SOLICITADO_CIERRE: { label: 'Cierre solicitado', color: 'warning' },
  CERRADO: { label: 'Cerrado', color: 'default' },
};

interface Props {
  proyectoId: string;
  companiaId: number;
}

export function PanelOrdenesInternas({ proyectoId, companiaId }: Props) {
  const { tieneRol } = useAuth();
  const [grupo, setGrupo] = useState<GrupoOrdenesInternas | null | undefined>(undefined); // undefined = cargando
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarLista, setMostrarLista] = useState(false);
  const [ordenExpandidaId, setOrdenExpandidaId] = useState<number | false>(false);
  const [ordenEnEdicionId, setOrdenEnEdicionId] = useState<number | null>(null);

  const puedeCrear = tieneRol('PM') || tieneRol('ADMIN');

  const cargar = async () => {
    try {
      const data = await obtenerOrdenesInternasPorProyecto(proyectoId);
      setGrupo(data);
    } catch {
      setGrupo(null);
    }
  };

  useEffect(() => { cargar(); }, [proyectoId]);

  if (grupo === undefined) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}><CircularProgress size={24} color="secondary" /></Box>;
  }

  // El grupo no existe todavía → la Solicitud de Inversión no ha llegado a
  // APROBADO_FINAL (se crea automáticamente en ese momento). No mostramos nada.
  if (grupo === null) return null;

  // 🛡️ Defensivo: si por algún motivo la respuesta llega con forma distinta
  // a la esperada, no tronamos — tratamos las listas faltantes como vacías.
  const ordenesInternas = Array.isArray(grupo.ordenes_internas) ? grupo.ordenes_internas : [];
  const historicoCierre = Array.isArray(grupo.grupo_oi_historico_cierre) ? grupo.grupo_oi_historico_cierre : [];

  if (mostrarFormulario || ordenEnEdicionId !== null) {
    return (
      <FormularioOrdenInterna
        proyectoId={proyectoId}
        ordenInternaId={ordenEnEdicionId ?? undefined}
        onCancelar={() => { setMostrarFormulario(false); setOrdenEnEdicionId(null); }}
        onGuardada={(ordenId) => {
          setMostrarFormulario(false);
          setOrdenEnEdicionId(null);
          setMostrarLista(true);
          setOrdenExpandidaId(ordenId);
          cargar();
        }}
      />
    );
  }

  const hayOrdenes = ordenesInternas.length > 0;

  return (
    <Box sx={{ mt: 3, p: 3, borderRadius: 3, border: '1px solid #e2e8f0', backgroundColor: '#fafafa' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, flexWrap: 'wrap' }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#0e381e' }}>
          Órdenes Internas {grupo.nombre ? `— ${grupo.nombre}` : ''}
        </Typography>
        <Chip label={ESTADO_GRUPO_CONFIG[grupo.estado]?.label || grupo.estado} color={ESTADO_GRUPO_CONFIG[grupo.estado]?.color || 'default'} size="small" />
      </Box>

      {!hayOrdenes ? (
        <Box>
          <Alert severity="info" sx={{ mb: 2 }}>Todavía no se ha creado ninguna Orden Interna para este proyecto.</Alert>
          {puedeCrear && (
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setMostrarFormulario(true)}>
              Crear Orden Interna
            </Button>
          )}
        </Box>
      ) : !mostrarLista ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button variant="outlined" color="secondary" startIcon={<ListAltIcon />} onClick={() => setMostrarLista(true)}>
            Ver Órdenes Internas ({ordenesInternas.length})
          </Button>
          {puedeCrear && grupo.estado === 'ABIERTO' && (
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setMostrarFormulario(true)}>
              Crear Orden Interna
            </Button>
          )}
        </Box>
      ) : (
        <Box>
          {puedeCrear && grupo.estado === 'ABIERTO' && (
            <Button size="small" variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setMostrarFormulario(true)} sx={{ mb: 2 }}>
              Crear Orden Interna
            </Button>
          )}

          {ordenesInternas.map((oi) => (
            <Accordion
              key={oi.id}
              expanded={ordenExpandidaId === oi.id}
              onChange={(_, expandido) => setOrdenExpandidaId(expandido ? oi.id : false)}
              disableGutters
              sx={{ mb: 1, borderRadius: 2, border: '1px solid #e2e8f0', '&:before': { display: 'none' } }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%', flexWrap: 'wrap' }}>
                  <Typography sx={{ fontWeight: 700 }}>{oi.numero_oi} — {oi.nombre_descriptivo}</Typography>
                  <Chip label={ESTADO_OI_CONFIG[oi.procesos.estado_actual]?.label || oi.procesos.estado_actual}
                    color={ESTADO_OI_CONFIG[oi.procesos.estado_actual]?.color || 'default'} size="small" />
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                {ordenExpandidaId === oi.id && (
                  <DetalleOrdenInterna
                    resumen={oi}
                    companiaId={companiaId}
                    grupoEstado={grupo.estado}
                    onCambio={cargar}
                    onEditar={() => setOrdenEnEdicionId(oi.id)}
                  />
                )}
              </AccordionDetails>
            </Accordion>
          ))}

          {historicoCierre.length > 0 && (
            <Accordion disableGutters sx={{ mt: 2, borderRadius: 2, border: '1px solid #e2e8f0', '&:before': { display: 'none' } }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 700, color: '#64748b' }}>Histórico de cierre del grupo</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {historicoCierre.map((h) => (
                  <Box key={h.id} sx={{ py: 1, borderBottom: '1px solid #f1f5f9' }}>
                    <Typography variant="body2">
                      <strong>{h.accion === 'SOLICITADO' ? 'Cierre solicitado' : 'Grupo cerrado'}</strong> — {h.usuarios?.nombre || 'Sistema'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(h.fecha_registro).toLocaleString()}{h.observaciones ? ` — "${h.observaciones}"` : ''}
                    </Typography>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          )}
        </Box>
      )}
    </Box>
  );
}