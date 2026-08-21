import { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, Alert, Tabs, Tab, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoIcon from '@mui/icons-material/Info';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HistoryIcon from '@mui/icons-material/History';

import { useAuth } from '../../../auth/AuthContext';
import type { SolicitudInversionDetalle, FlujoCaja, UsuarioActivo } from '../types/solicitud.types';
import {
  obtenerSolicitudInversion, enviarARevision, aprobarEtapa, rechazarEtapa, cancelarDefinitivamente,
  actualizarPartesInteresadas, obtenerPartesInteresadas,
} from '../services/solicitudInversion.service';

// Formulario para modo edición
import { FormularioSolicitudInversion } from './FormularioSolicitudInversion';

// Subcomponentes modulares
import { EncabezadoSolicitud } from './vista/EncabezadoSolicitud';
import { BarraAccionesSolicitud } from './vista/BarraAccionesSolicitud';
import { SeccionInformacionGeneralVista } from './vista/SeccionInformacionGeneralVista';
import { SeccionEvaluacionFinancieraVista } from './vista/SeccionEvaluacionFinancieraVista';
import { SeccionMetasYValoresVista } from './vista/SeccionMetasYValoresVista';
import { SeccionFlujoCajaVista } from './vista/SeccionFlujoCajaVista';
import { SeccionPartesInteresadasVista } from './vista/SeccionPartesInteresadasVista';
import { SeccionHistoricoVista } from './vista/SeccionHistoricoVista';
import { DialogosAccionVista } from './vista/DialogosAccionVista';
import { SeccionDocumentosLinksVista } from './vista/SeccionDocumentosLinksVista';

interface Props {
  procesoId: number;
  onVolver: () => void;
  onEditar?: () => void;
}

const ROLES_POR_ETAPA: Record<string, string[]> = {
  PENDIENTE_PMO: ['PMO', 'ADMIN'],
  VERIFICACION_PARTES_INTERESADAS: [],
  DIRECCION_PMO: ['DIRECTOR_PMO', 'ADMIN'],
  GERENCIA: ['GERENCIA', 'PMO', 'ADMIN'],
  PRESIDENCIA: ['PRESIDENCIA', 'ADMIN'],
};

export function VistaSolicitudInversion({ procesoId, onVolver, onEditar }: Props) {
  const { usuario, tieneRol } = useAuth();
  const [data, setData] = useState<SolicitudInversionDetalle | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [procesando, setProcesando] = useState(false);

  const [modoEdicion, setModoEdicion] = useState(false);
  const [tabActual, setTabActual] = useState(0);

  const [dialogoRechazo, setDialogoRechazo] = useState(false);
  const [dialogoCancelacion, setDialogoCancelacion] = useState(false);
  const [dialogoGerencia, setDialogoGerencia] = useState(false);
  const [dialogoPartes, setDialogoPartes] = useState(false);

  const [razon, setRazon] = useState('');
  const [enviarPresidencia, setEnviarPresidencia] = useState<'si' | 'no'>('si');
  const [usuariosDisponibles, setUsuariosDisponibles] = useState<UsuarioActivo[]>([]);
  const [partesSeleccionadas, setPartesSeleccionadas] = useState<UsuarioActivo[]>([]);

  const [dialogoAprobar, setDialogoAprobar] = useState(false);

  const cargar = async () => {
    try {
      setCargando(true);
      const resultado = await obtenerSolicitudInversion(procesoId);
      setData(resultado);
    } catch {
      setError('No se pudo cargar la solicitud.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => { cargar(); }, [procesoId]);

  if (cargando) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress color="secondary" /></Box>;
  if (error || !data) return <Alert severity="error">{error || 'Solicitud no encontrada.'}</Alert>;

  if (modoEdicion && data) {
    return (
      <FormularioSolicitudInversion
        proyecto={data.proyectos as any}
        solicitudExistente={data}
        onCancelar={() => setModoEdicion(false)}
        onCreada={async () => {
          setModoEdicion(false);
          await cargar();
        }}
      />
    );
  }

  const solicitud = data.solicitudes_inversion;
  const estado = data.estado_actual;
  const esPmResponsable = Number(solicitud?.usuarios?.id) === Number(usuario?.id);

  const nombrePmExtraido =
    solicitud?.usuarios?.nombre ||
    solicitud?.usuario?.nombre ||
    data?.proyectos?.usuarios?.nombre ||
    data?.proyectos?.usuario?.nombre;

  const rolesQuePuedenAprobar = ROLES_POR_ETAPA[estado] || [];
  const tieneRolDeEtapa = rolesQuePuedenAprobar.some((r) => tieneRol(r));

  const estaAsignadoComoParteInteresada =
    estado === 'VERIFICACION_PARTES_INTERESADAS' &&
    data.asignaciones_proceso.some(
      (a) =>
        a.etapa === 'VERIFICACION_PARTES_INTERESADAS' &&
        a.estado_asignacion === 'PENDIENTE' &&
        Number(a.usuarios?.id) === Number(usuario?.id),
    );

  const puedeEditarBorrador = estado === 'BORRADOR' && (esPmResponsable || tieneRol('ADMIN'));
  const puedeEnviarARevision = estado === 'BORRADOR' && (esPmResponsable || tieneRol('ADMIN'));
  const puedeAprobarORechazar = tieneRolDeEtapa || estaAsignadoComoParteInteresada;
  const puedeCancelar = !['BORRADOR', 'APROBADO_FINAL', 'CANCELADO'].includes(estado) &&
    (tieneRol('PMO') || tieneRol('DIRECTOR_PMO') || tieneRol('ADMIN'));

  const puedeEditarPartesInteresadas =
    ['BORRADOR', 'PENDIENTE_PMO'].includes(estado) &&
    (esPmResponsable || tieneRol('PMO') || tieneRol('DIRECTOR_PMO') || tieneRol('ADMIN'));

  const manejarClickEditar = () => {
    setModoEdicion(true);
    if (onEditar) {
      onEditar();
    }
  };

  const abrirDialogoPartes = async () => {
    if (usuariosDisponibles.length === 0) {
      const companiaId = data?.proyectos?.companias?.id || data?.proyectos?.compania_id || 1;
      const usuarios = await obtenerPartesInteresadas(companiaId);
      setUsuariosDisponibles(usuarios);
    }
    const actuales = data!.asignaciones_proceso
      .filter((a) => a.etapa === 'VERIFICACION_PARTES_INTERESADAS')
      .map((a) => a.usuarios)
      .filter((u): u is NonNullable<typeof u> => !!u)
      .map((u) => ({ id: u.id, nombre: u.nombre, email: u.email }));
    setPartesSeleccionadas(actuales);
    setDialogoPartes(true);
  };

  const confirmarPartesInteresadas = async () => {
    setProcesando(true);
    try {
      await actualizarPartesInteresadas(procesoId, partesSeleccionadas.map((u) => u.id));
      setDialogoPartes(false);
      await cargar();
    } catch (e: any) {
      alert(e.response?.data?.message || 'Error al actualizar partes interesadas.');
    } finally {
      setProcesando(false);
    }
  };

  const manejarEnviar = async () => {
    setProcesando(true);
    try { await enviarARevision(procesoId); await cargar(); }
    catch (e: any) { alert(e.response?.data?.message || 'Error al enviar a revisión.'); }
    finally { setProcesando(false); }
  };

  const manejarAprobar = () => {
    if (estado === 'GERENCIA') { setDialogoGerencia(true); return; }
    setDialogoAprobar(true); // 👈 antes aprobaba directo, ahora abre el diálogo
  };

  const confirmarAprobar = async () => {
    if (!razon.trim()) return alert('La observación es obligatoria para aprobar.');
    setProcesando(true);
    try {
      await aprobarEtapa(procesoId, razon);
      setDialogoAprobar(false); setRazon('');
      await cargar();
    } catch (e: any) { alert(e.response?.data?.message || 'Error al aprobar.'); }
    finally { setProcesando(false); }
  };

  const confirmarAprobarGerencia = async () => {
    if (!razon.trim()) return alert('La observación es obligatoria para aprobar.');
    setProcesando(true);
    try {
      await aprobarEtapa(procesoId, razon, enviarPresidencia === 'si');
      setDialogoGerencia(false); setRazon('');
      await cargar();
    } catch (e: any) { alert(e.response?.data?.message || 'Error al aprobar.'); }
    finally { setProcesando(false); }
  };

  const confirmarRechazo = async () => {
    if (!razon.trim()) return alert('La razón del rechazo es obligatoria.');
    setProcesando(true);
    try {
      await rechazarEtapa(procesoId, razon);
      setDialogoRechazo(false); setRazon('');
      await cargar();
    } catch (e: any) { alert(e.response?.data?.message || 'Error al rechazar.'); }
    finally { setProcesando(false); }
  };

  const confirmarCancelacion = async () => {
    if (!razon.trim()) return alert('La razón de cancelación es obligatoria.');
    setProcesando(true);
    try {
      await cancelarDefinitivamente(procesoId, razon);
      setDialogoCancelacion(false); setRazon('');
      await cargar();
    } catch (e: any) { alert(e.response?.data?.message || 'Error al cancelar.'); }
    finally { setProcesando(false); }
  };

  // 👈 Formato condicional según el tipo de clasificación
  const esNueva = (solicitud as any)?.tipo_clasificacion === 'NUEVA';
  const categoriaTexto = esNueva
    ? `[Nueva Categoría] ${(solicitud as any)?.categorias?.nombre || '—'}`
    : `${solicitud?.subprogramas?.programas?.grupos?.nombre || '—'} / ${solicitud?.subprogramas?.programas?.nombre || '—'} / ${solicitud?.subprogramas?.nombre || '—'}`;

  return (
    <Box sx={{ maxWidth: '100%' }}>
      <Button startIcon={<ArrowBackIcon />} onClick={onVolver} sx={{ mb: 2, color: '#64748b' }}>
        Volver al proyecto
      </Button>

      <EncabezadoSolicitud
        nombreProyecto={data.proyectos.nombre}
        idProyecto={data.proyectos.id}
        nombreCompania={data.proyectos.companias?.nombre}
        nombrePm={nombrePmExtraido}
        estado={estado}
      />

      <Paper sx={{ borderRadius: 3, mb: 3, backgroundColor: '#ffffff' }} elevation={0} variant="outlined">
        <Tabs
          value={tabActual}
          onChange={(_, nuevoTab) => setTabActual(nuevoTab)}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
        >
          <Tab icon={<InfoIcon />} iconPosition="start" label="Información General" sx={{ fontWeight: 700 }} />
          <Tab icon={<AttachMoneyIcon />} iconPosition="start" label="Evaluación y Flujo" sx={{ fontWeight: 700 }} />
          <Tab icon={<HistoryIcon />} iconPosition="start" label="Histórico de Aprobaciones" sx={{ fontWeight: 700 }} />
        </Tabs>
      </Paper>

      {tabActual === 0 && (
        <Box>
          <SeccionInformacionGeneralVista
            nombrePm={nombrePmExtraido}
            categoriaTexto={categoriaTexto}
            entregablePlaneado={solicitud?.entregable_planeado || undefined}
          />
          <SeccionDocumentosLinksVista
            linkActa={solicitud?.link_acta_aprobacion}
            linkPlan={solicitud?.link_plan_proyecto}
            linkPresentacion={solicitud?.link_presentacion_puertas_3}
          />
          <SeccionPartesInteresadasVista
            asignaciones={data.asignaciones_proceso || []}
            puedeEditar={puedeEditarPartesInteresadas}
            onEditar={abrirDialogoPartes}
          />
        </Box>
      )}

      {tabActual === 1 && (
        <Box>
          <SeccionEvaluacionFinancieraVista
            tieneEvaluacion={solicitud?.tiene_evaluacion_financiera}
            tir={solicitud?.solicitud_evaluacion_financiera?.tir}
            vpn={solicitud?.solicitud_evaluacion_financiera?.vpn}
            payback={solicitud?.solicitud_evaluacion_financiera?.payback}
            justificacion={solicitud?.justificacion_sin_evaluacion}
          />
          <SeccionMetasYValoresVista
            metas={solicitud?.solicitud_metas || []}
            valores={solicitud?.solicitud_valores || []}
          />
          <SeccionFlujoCajaVista
            flujosGrabados={(solicitud?.solicitud_flujo_caja || []) as FlujoCaja[]}
          />
        </Box>
      )}

      {tabActual === 2 && (
        <Box>
          <SeccionHistoricoVista
            historico={data.historico_aprobaciones || []}
          />
        </Box>
      )}

      <DialogosAccionVista
        dialogoRechazo={dialogoRechazo} setDialogoRechazo={setDialogoRechazo}
        dialogoCancelacion={dialogoCancelacion} setDialogoCancelacion={setDialogoCancelacion}
        dialogoGerencia={dialogoGerencia} setDialogoGerencia={setDialogoGerencia}
        dialogoPartes={dialogoPartes} setDialogoPartes={setDialogoPartes}
        dialogoAprobar={dialogoAprobar} setDialogoAprobar={setDialogoAprobar}
        onConfirmarAprobar={confirmarAprobar}
        razon={razon} setRazon={setRazon}
        enviarPresidencia={enviarPresidencia} setEnviarPresidencia={setEnviarPresidencia}
        usuariosDisponibles={usuariosDisponibles}
        partesSeleccionadas={partesSeleccionadas} setPartesSeleccionadas={setPartesSeleccionadas}
        procesando={procesando}
        onConfirmarRechazo={confirmarRechazo}
        onConfirmarCancelacion={confirmarCancelacion}
        onConfirmarGerencia={confirmarAprobarGerencia}
        onConfirmarPartes={confirmarPartesInteresadas}
      />

      <BarraAccionesSolicitud
        puedeEditarBorrador={puedeEditarBorrador}
        puedeEnviarARevision={puedeEnviarARevision}
        puedeAprobarORechazar={puedeAprobarORechazar}
        puedeCancelar={puedeCancelar}
        procesando={procesando}
        onEditar={manejarClickEditar}
        onEnviar={manejarEnviar}
        onAprobar={manejarAprobar}
        onAbrirRechazo={() => setDialogoRechazo(true)}
        onAbrirCancelacion={() => setDialogoCancelacion(true)}
      />
    </Box>
  );
}