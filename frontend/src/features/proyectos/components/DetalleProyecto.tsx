import { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, Chip, Divider, CircularProgress, Stack, Avatar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlined';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import type { Proyecto, Proceso } from '../types/proyecto.types';
import { obtenerProcesosPorProyecto } from '../services/proyectos.service';
import { useAuth } from '../../../auth/AuthContext';
import { FormularioSolicitudInversion } from '../../solicitud-inversion/components/FormularioSolicitudInversion';
import { VistaSolicitudInversion } from '../../solicitud-inversion/components/VistaSolicitudInversion';
import { PanelOrdenesInternas } from '../../ordenes-internas/components/PanelOrdenesInternas';

interface DetalleProyectoProps {
  proyecto: Proyecto;
  onVolver: () => void;
}

export function DetalleProyecto({ proyecto, onVolver }: DetalleProyectoProps) {
  const { tieneRol } = useAuth();
  const [procesos, setProcesos] = useState<Proceso[]>([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [procesoAbierto, setProcesoAbierto] = useState<number | null>(null);
  const [verOrdenesInternas, setVerOrdenesInternas] = useState(false);

  const puedeCrearProceso = tieneRol('PM') || tieneRol('ADMIN');

  useEffect(() => { cargarProcesos(); }, [proyecto.id]);

  const cargarProcesos = async () => {
    try {
      setCargando(true);
      const data = await obtenerProcesosPorProyecto(proyecto.id);
      setProcesos(data);
    } catch {
      setProcesos([]);
    } finally {
      setCargando(false);
    }
  };

  // 1. Filtramos solo las solicitudes de inversión principales (excluimos ORDEN_INTERNA del listado general)
  const solicitudesInversion = procesos.filter(
    (p) => p.tipo_proceso === 'SOLICITUD_INVERSION'
  );

  // 2. Comprobamos si la solicitud de inversión fue aprobada para habilitar el módulo de Órdenes Internas
  const tieneSolicitudAprobada = solicitudesInversion.some(
    (p) => p.estado_actual === 'APROBADO_FINAL'
  );

  // Vista: Formulario de creación
  if (mostrarFormulario) {
    return (
      <FormularioSolicitudInversion
        proyecto={proyecto}
        onCancelar={() => setMostrarFormulario(false)}
        onCreada={(procesoId) => { setMostrarFormulario(false); setProcesoAbierto(procesoId); }}
      />
    );
  }

  // Vista: Detalle de Solicitud de Inversión
  if (procesoAbierto !== null) {
    return (
      <VistaSolicitudInversion
        procesoId={procesoAbierto}
        onVolver={() => { setProcesoAbierto(null); cargarProcesos(); }}
      />
    );
  }

  // Vista: Detalle de Órdenes Internas
  if (verOrdenesInternas) {
    return (
      <Box>
        <Button startIcon={<ArrowBackIcon />} onClick={() => setVerOrdenesInternas(false)} sx={styles.backBtn}>
          Volver a Procesos
        </Button>
        <PanelOrdenesInternas proyectoId={proyecto.id} companiaId={proyecto.companias?.id ?? proyecto.compania_id} />
      </Box>
    );
  }

  // Vista Principal: Lista en columna vertical (Stack)
  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={onVolver} sx={styles.backBtn}>
        Volver al Portafolio
      </Button>

      <Card sx={styles.headerCard}>
        <Box sx={styles.headerAccent} />
        <CardContent sx={{ p: '24px !important' }}>
          <Typography variant="caption" sx={styles.projectId}>PROYECTO: {proyecto.id}</Typography>
          <Typography variant="h5" sx={styles.projectTitle}>{proyecto.nombre}</Typography>
          <Chip label={proyecto.companias?.nombre || 'Compañía General'} size="small" sx={styles.companyChip} />
        </CardContent>
      </Card>

      <Typography variant="h6" sx={styles.sectionTitle}>Procesos del Proyecto</Typography>
      <Divider sx={{ mb: 3 }} />

      {cargando ? (
        <Box sx={styles.centerBox}><CircularProgress color="secondary" /></Box>
      ) : solicitudesInversion.length === 0 ? (
        <Box sx={styles.emptyBox}>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Este proyecto aún no tiene ningún proceso iniciado.
          </Typography>
          {puedeCrearProceso && (
            <Button variant="outlined" color="secondary" startIcon={<AddCircleOutlineIcon />}
              onClick={() => setMostrarFormulario(true)} sx={{ mt: 2 }}>
              Iniciar Solicitud de Inversión
            </Button>
          )}
        </Box>
      ) : (
        <Stack spacing={2} sx={{ width: '100%' }}>
          {/* Tarjeta 1 (Arriba): Solicitud de Inversión */}
          {solicitudesInversion.map((proceso) => (
            <Card key={proceso.id} sx={styles.processCard} onClick={() => setProcesoAbierto(proceso.id)}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={styles.processIcon}><AssignmentIcon /></Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0e381e' }}>
                    {proceso.tipo_proceso.replace(/_/g, ' ')}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Iniciado: {new Date(proceso.fecha_creacion).toLocaleDateString()}
                  </Typography>
                </Box>
                <Chip label={proceso.estado_actual.replace(/_/g, ' ')}
                  color={proceso.estado_actual === 'BORRADOR' ? 'default' : 'secondary'}
                  size="small" sx={{ fontWeight: 'bold' }} />
              </CardContent>
            </Card>
          ))}

          {/* Tarjeta 2 (Abajo): Módulo de Órdenes Internas */}
          {tieneSolicitudAprobada && (
            <Card sx={styles.processCard} onClick={() => setVerOrdenesInternas(true)}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={styles.processIcon}><ReceiptLongIcon /></Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0e381e' }}>
                    ÓRDENES INTERNAS
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Gestión y seguimiento de Órdenes Internas
                  </Typography>
                </Box>
                <Chip label="ACTIVO" color="secondary" size="small" sx={{ fontWeight: 'bold' }} />
              </CardContent>
            </Card>
          )}
        </Stack>
      )}
    </Box>
  );
}

const styles = {
  backBtn: { mb: 2, color: '#64748b', '&:hover': { backgroundColor: '#f1f5f9', color: '#0f172a' } },
  headerCard: { position: 'relative', mb: 4, borderRadius: 3, boxShadow: '0 4px 15px rgba(0,0,0,0.05)', overflow: 'hidden' },
  headerAccent: { position: 'absolute', left: 0, top: 0, bottom: 0, width: '6px', backgroundColor: '#75b70e' },
  projectId: { color: '#64748b', fontWeight: 700, letterSpacing: '1px', display: 'block', mb: 0.5 },
  projectTitle: { fontWeight: 800, color: '#0e381e', mb: 1 },
  companyChip: { backgroundColor: '#e6f7ed', color: '#0e381e', fontWeight: 600 },
  sectionTitle: { fontWeight: 700, color: '#0e381e', mb: 1 },
  centerBox: { display: 'flex', justifyContent: 'center', py: 5 },
  emptyBox: { textAlign: 'center', py: 6, backgroundColor: '#ffffff', borderRadius: 3, border: '1px dashed #cbd5e1' },
  processCard: {
    width: '100%',
    borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: 'none', transition: 'transform 0.2s', cursor: 'pointer',
    '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 6px 20px rgba(0,0,0,0.08)', borderColor: '#75b70e' },
  },
  processIcon: { backgroundColor: '#f0fdf4', color: '#75b70e' },
};