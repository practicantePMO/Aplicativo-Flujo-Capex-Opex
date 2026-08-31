import { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, Chip, Divider, CircularProgress, Stack, Avatar, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlined';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import GavelIcon from '@mui/icons-material/Gavel';
import type { Proyecto, Proceso } from '../types/proyecto.types';
import { obtenerProcesosPorProyecto } from '../services/proyectos.service';
import { obtenerOrdenesInternasPorProyecto } from '../../ordenes-internas/services/ordenesInternas.service';
import { useAuth } from '../../../auth/AuthContext';
import { EncabezadoProyecto } from '../../../components/EncabezadoProyecto';
import { FormularioSolicitudInversion } from '../../solicitud-inversion/components/FormularioSolicitudInversion';
import { VistaSolicitudInversion } from '../../solicitud-inversion/components/VistaSolicitudInversion';
import { PanelOrdenesInternas } from '../../ordenes-internas/components/PanelOrdenesInternas';
import { PanelControlCambios } from '../../control-cambios/components/PanelControlCambios';
import { PanelActaCierre } from '../../acta-cierre/components/PanelActaCierre';

interface DetalleProyectoProps {
  proyecto: Proyecto;
  onVolver: () => void;
}

const ESTADO_GRUPO_OI_CONFIG: Record<string, { label: string; color: 'success' | 'warning' | 'default' }> = {
  ABIERTO: { label: 'Activo', color: 'success' },
  SOLICITADO_CIERRE: { label: 'Cierre solicitado', color: 'warning' },
  CERRADO: { label: 'Cerrado', color: 'default' },
};

export function DetalleProyecto({ proyecto, onVolver }: DetalleProyectoProps) {
  const { tieneRol } = useAuth();
  const [procesos, setProcesos] = useState<Proceso[]>([]);
  const [grupoOiEstado, setGrupoOiEstado] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [procesoAbierto, setProcesoAbierto] = useState<number | null>(null);
  const [verOrdenesInternas, setVerOrdenesInternas] = useState(false);
  const [verControlCambios, setVerControlCambios] = useState(false);
  const [verActaCierre, setVerActaCierre] = useState(false);

  // 🔗 Navegación cruzada entre los dos paneles: al crear un CC que requiere
  // OI, o al querer ver el CC ligado a una OI, cambiamos de panel y le
  // decimos al panel destino con qué abrirse (crear pre-llenado, o expandido).
  const [oiPrefillControlCambioId, setOiPrefillControlCambioId] = useState<number | null>(null);
  const [ccProcesoIdParaAbrir, setCcProcesoIdParaAbrir] = useState<number | null>(null);

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
    cargarEstadoOi();
  };

  // 🎯 Estado real del grupo de Órdenes Internas (Activo/Cierre solicitado/Cerrado).
  const cargarEstadoOi = async () => {
    try {
      const grupo = await obtenerOrdenesInternasPorProyecto(proyecto.id);
      setGrupoOiEstado(grupo?.estado ?? null);
    } catch {
      setGrupoOiEstado(null);
    }
  };

  const solicitudesInversion = procesos.filter(
    (p) => p.tipo_proceso === 'SOLICITUD_INVERSION'
  );

  const tieneSolicitudAprobada = solicitudesInversion.some(
    (p) => p.estado_actual === 'APROBADO_FINAL'
  );

  // 🎯 Si ya existe un Acta de Cierre en CERRADO, el proyecto terminó
  // (Finalizado o Cancelado) — Control de Cambios y el Acta misma deben
  // reflejarlo en vez de seguir mostrando "Activo".
  const proyectoCerrado = procesos.some(
    (p) => p.tipo_proceso === 'ACTA_CIERRE' && p.estado_actual === 'CERRADO'
  );

  const tieneControlCambios = procesos.some((p) => p.tipo_proceso === 'CONTROL_CAMBIO');
  const tieneActaCierre = procesos.some((p) => p.tipo_proceso === 'ACTA_CIERRE');
    // 🚧 Hay una Acta de Cierre por CANCELACIÓN en curso (creada pero todavía
  // no CERRADA) — mientras no se resuelva, hay que avisar en todos lados
  // para que nadie siga avanzando otros procesos sin saberlo.
  const cancelacionEnCurso = procesos.some(
    (p) => p.tipo_proceso === 'ACTA_CIERRE' && p.actas_cierre?.tipo_cierre === 'CANCELACION' && p.estado_actual !== 'CERRADO'
  );

  const manejarCrearOiDesdeCc = (controlCambioId: number) => {
    setVerControlCambios(false);
    setCcProcesoIdParaAbrir(null);
    setOiPrefillControlCambioId(controlCambioId);
    setVerOrdenesInternas(true);
  };

  const manejarVerControlCambio = (procesoId: number) => {
    setVerOrdenesInternas(false);
    setOiPrefillControlCambioId(null);
    setCcProcesoIdParaAbrir(procesoId);
    setVerControlCambios(true);
  };

  if (mostrarFormulario) {
    return (
      <FormularioSolicitudInversion
        proyecto={proyecto}
        onCancelar={() => setMostrarFormulario(false)}
        onCreada={(procesoId) => { setMostrarFormulario(false); setProcesoAbierto(procesoId); }}
      />
    );
  }

  if (procesoAbierto !== null) {
    return (
      <VistaSolicitudInversion
        procesoId={procesoAbierto}
        onVolver={() => { setProcesoAbierto(null); cargarProcesos(); }}
      />
    );
  }

  if (verOrdenesInternas) {
    return (
      <Box>
        <Button startIcon={<ArrowBackIcon />} onClick={() => { setVerOrdenesInternas(false); setOiPrefillControlCambioId(null); cargarEstadoOi(); }} sx={styles.backBtn}>
          Volver a Procesos
        </Button>
        <PanelOrdenesInternas
          proyectoId={proyecto.id}
          companiaId={proyecto.companias?.id ?? proyecto.compania_id}
          crearParaControlCambioId={oiPrefillControlCambioId}
          onVerControlCambio={manejarVerControlCambio}
        />
      </Box>
    );
  }

  if (verControlCambios) {
    return (
      <Box>
        <Button startIcon={<ArrowBackIcon />} onClick={() => { setVerControlCambios(false); setCcProcesoIdParaAbrir(null); }} sx={styles.backBtn}>
          Volver a Procesos
        </Button>
        <PanelControlCambios
          proyectoId={proyecto.id}
          companiaId={proyecto.companias?.id ?? proyecto.compania_id}
          creadoPor={proyecto.creado_por}
          procesoIdInicial={ccProcesoIdParaAbrir}
          onCrearOi={manejarCrearOiDesdeCc}
        />
      </Box>
    );
  }

  if (verActaCierre) {
    return (
      <Box>
        <Button startIcon={<ArrowBackIcon />} onClick={() => { setVerActaCierre(false); cargarProcesos(); }} sx={styles.backBtn}>
          Volver a Procesos
        </Button>
        <PanelActaCierre
          proyectoId={proyecto.id}
          companiaId={proyecto.companias?.id ?? proyecto.compania_id}
          creadoPor={proyecto.creado_por}
          onIrAOrdenesInternas={() => { setVerActaCierre(false); setVerOrdenesInternas(true); }}
        />
      </Box>
    );
  }

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={onVolver} sx={styles.backBtn}>
        Volver al Portafolio
      </Button>

      <EncabezadoProyecto
        nombreProyecto={proyecto.nombre}
        idProyecto={proyecto.id}
        nombreCompania={proyecto.companias?.nombre}
        nombrePm={proyecto.usuarios?.nombre}
        estado={proyecto.estado}
      />

      {cancelacionEnCurso && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          Este proyecto tiene un Acta de Cierre por <strong>Cancelación</strong> en curso. Evita avanzar otros procesos hasta que se resuelva.
        </Alert>
      )}

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
                <Chip
                  label={grupoOiEstado ? ESTADO_GRUPO_OI_CONFIG[grupoOiEstado]?.label || grupoOiEstado : 'Sin Órdenes'}
                  color={grupoOiEstado ? ESTADO_GRUPO_OI_CONFIG[grupoOiEstado]?.color || 'default' : 'default'}
                  size="small" sx={{ fontWeight: 'bold' }}
                />
              </CardContent>
            </Card>
          )}

          {tieneSolicitudAprobada && (
            <Card sx={styles.processCard} onClick={() => setVerControlCambios(true)}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={styles.processIcon}><SyncAltIcon /></Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0e381e' }}>
                    CONTROL DE CAMBIOS
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Cambios registrados sobre este proyecto
                  </Typography>
                </Box>
                <Chip
                  label={!tieneControlCambios ? 'Sin CC' : proyectoCerrado ? 'Cerrado' : 'Activo'}
                  color={!tieneControlCambios ? 'default' : proyectoCerrado ? 'default' : 'secondary'}
                  size="small" sx={{ fontWeight: 'bold' }}
                />
              </CardContent>
            </Card>
          )}

          {solicitudesInversion.length > 0 && (
            <Card sx={styles.processCard} onClick={() => setVerActaCierre(true)}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={styles.processIcon}><GavelIcon /></Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0e381e' }}>
                    ACTA DE CIERRE
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Cierre por culminación o cancelación del proyecto
                  </Typography>
                </Box>
                <Chip
                  label={!tieneActaCierre ? 'Sin Acta' : proyectoCerrado ? 'Cerrado' : 'Activo'}
                  color={!tieneActaCierre ? 'default' : proyectoCerrado ? 'default' : 'secondary'}
                  size="small" sx={{ fontWeight: 'bold' }}
                />
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