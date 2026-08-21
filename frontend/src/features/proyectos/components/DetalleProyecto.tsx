import { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, Chip, Divider, CircularProgress, Grid, Avatar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlined';
import type { Proyecto, Proceso } from '../types/proyecto.types';
import { obtenerProcesosPorProyecto } from '../services/proyectos.service';
import { useAuth } from '../../../auth/AuthContext';
import { FormularioSolicitudInversion } from '../../solicitud-inversion/components/FormularioSolicitudInversion';
import { VistaSolicitudInversion } from '../../solicitud-inversion/components/VistaSolicitudInversion';

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

  // Vista: formulario de creación
  if (mostrarFormulario) {
    return (
      <FormularioSolicitudInversion
        proyecto={proyecto}
        onCancelar={() => setMostrarFormulario(false)}
        onCreada={(procesoId) => { setMostrarFormulario(false); setProcesoAbierto(procesoId); }}
      />
    );
  }

  // Vista: detalle de un proceso específico
  if (procesoAbierto !== null) {
    return (
      <VistaSolicitudInversion
        procesoId={procesoAbierto}
        onVolver={() => { setProcesoAbierto(null); cargarProcesos(); }}
      />
    );
  }

  // Vista: lista de procesos del proyecto
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
      ) : (
        <Grid container spacing={3}>
          {procesos.length === 0 ? (
            <Grid xs={12}>
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
            </Grid>
          ) : (
            procesos.map((proceso) => (
              <Grid item xs={12} md={6} key={proceso.id}>
                <Card sx={styles.processCard} onClick={() => setProcesoAbierto(proceso.id)}>
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
              </Grid>
            ))
          )}
        </Grid>
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
    borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: 'none', transition: 'transform 0.2s', cursor: 'pointer',
    '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 6px 20px rgba(0,0,0,0.08)', borderColor: '#75b70e' },
  },
  processIcon: { backgroundColor: '#f0fdf4', color: '#75b70e' },
};