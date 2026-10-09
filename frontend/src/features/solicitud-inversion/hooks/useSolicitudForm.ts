import { useState, useEffect } from 'react';
import type { Proyecto } from '../../proyectos/types/proyecto.types';
import type { SolicitudInversionDetalle, FlujoCaja, Meta, Grupo, Programa, Subprograma, UsuarioActivo } from '../types/solicitud.types';
import { mensajeDelBackend } from '../../../utils/errores';
import {
  obtenerJerarquia,
  obtenerCategorias,
  obtenerPartesInteresadas,
  crearSolicitudInversion,
  actualizarSolicitudInversion,
} from '../services/solicitudInversion.service';
import { validarYConstruirPayload } from './validarSolicitud';

type Tipo = 'CAPEX' | 'GCAPEX' | 'OPEX';
type Moneda = 'USD' | 'COP';

export function useSolicitudForm(
  proyecto: Proyecto,
  solicitudExistente?: SolicitudInversionDetalle,
  onCreada?: (procesoId: number) => void
) {
  const [cargandoCatalogos, setCargandoCatalogos] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [programas, setProgramas] = useState<Programa[]>([]);
  const [subprogramas, setSubprogramas] = useState<Subprograma[]>([]);
  const [categorias, setCategorias] = useState<{ id: number; nombre: string; requiere_evaluacion_obligatoria: boolean }[]>([]);
  const [usuarios, setUsuarios] = useState<UsuarioActivo[]>([]);

  // 1. Extraer flujos existentes 
  const flujosGuardados = (solicitudExistente?.solicitudes_inversion?.solicitud_flujo_caja || []) as FlujoCaja[];

  // 2. Determinar el año base 
  const anioBase = proyecto?.anio_proyecto || new Date().getFullYear();

  // 3. Configurar años iniciales (flujos existentes o el año base si es nuevo)
  const initialAnios = flujosGuardados.length > 0
    ? Array.from(new Set(flujosGuardados.map((f) => Number(f.anio))))
    : [anioBase];

    // 4. Configurar tipos (CAPEX/GCAPEX/OPEX), meses y moneda por columna, a partir de lo guardado
  const initialTipos: Record<number, Tipo[]> = {};
  const initialMeses: Record<number, number[]> = {};
  const initialMoneda: Record<string, Moneda> = {};
  const initialTiposPorMes: Record<string, Tipo[]> = {};

  if (flujosGuardados.length > 0) {
    flujosGuardados.forEach((f) => {
      const anio = Number(f.anio);
      const tipo = f.tipo;
      const mes = Number(f.mes);

      if (!initialTipos[anio]) initialTipos[anio] = [];
      if (!initialTipos[anio].includes(tipo)) initialTipos[anio].push(tipo);

      if (!initialMeses[anio]) initialMeses[anio] = [];
      if (!initialMeses[anio].includes(mes)) initialMeses[anio].push(mes);

      initialMoneda[`${anio}_${tipo}`] = (f.moneda as Moneda) || 'COP';

      const claveMes = `${anio}_${mes}`;
      if (!initialTiposPorMes[claveMes]) initialTiposPorMes[claveMes] = [];
      if (!initialTiposPorMes[claveMes].includes(tipo)) initialTiposPorMes[claveMes].push(tipo);
    });
  } else {
    // Si es un proyecto NUEVO, arranca con CAPEX seleccionado
    initialTipos[anioBase] = ['CAPEX'];
    initialMeses[anioBase] = [];
  }

  const esNuevaGuardada = Boolean(solicitudExistente?.solicitudes_inversion?.categoria_id);
  const esTradicionalGuardada = Boolean(solicitudExistente?.solicitudes_inversion?.subprograma_id);

  // 5. INICIALIZAR EL FORMULARIO
  const [form, setForm] = useState({
    incluyeTradicional: esTradicionalGuardada,
    incluyeNueva: esNuevaGuardada,

    grupoId: solicitudExistente?.solicitudes_inversion?.subprogramas?.programas?.id_grupo || ('' as number | ''),
    programaId: solicitudExistente?.solicitudes_inversion?.subprogramas?.programa_id || ('' as number | ''),
    subprogramaId: solicitudExistente?.solicitudes_inversion?.subprograma_id || ('' as number | ''),
    categoriaId: solicitudExistente?.solicitudes_inversion?.categoria_id || ('' as number | ''),

    entregablePlaneado: solicitudExistente?.solicitudes_inversion?.entregable_planeado || '',
    tieneEvaluacionFinanciera: solicitudExistente?.solicitudes_inversion?.tiene_evaluacion_financiera ?? false,
    trm: solicitudExistente?.solicitudes_inversion?.trm?.toString() || '',
    justificacion: solicitudExistente?.solicitudes_inversion?.justificacion_sin_evaluacion || '',

    tir: solicitudExistente?.solicitudes_inversion?.solicitud_evaluacion_financiera?.tir?.toString() || '',
    vpn: solicitudExistente?.solicitudes_inversion?.solicitud_evaluacion_financiera?.vpn?.toString() || '',
    payback: solicitudExistente?.solicitudes_inversion?.solicitud_evaluacion_financiera?.payback?.toString() || '',

    metas: (solicitudExistente?.solicitudes_inversion?.solicitud_metas?.length
      ? solicitudExistente.solicitudes_inversion.solicitud_metas.map((m) => ({
          compromiso: m.compromiso || '',
          fecha_inicio: m.fecha_inicio ? String(m.fecha_inicio).split('T')[0] : '',
          indicador: m.indicador || '',
        }))
      : [{ compromiso: '', fecha_inicio: '', indicador: '' }]) as Meta[],

    aniosFlujo: initialAnios,
    tiposSeleccionados: initialTipos,
    mesesSeleccionados: initialMeses,
    tiposPorMes: initialTiposPorMes,
    monedaPorColumna: initialMoneda,
    flujos: flujosGuardados,

    partesInteresadas: (solicitudExistente?.asignaciones_proceso || [])
      .filter((a) => a.etapa === 'VERIFICACION_PARTES_INTERESADAS')
      .map((a) => a.usuarios)
      .filter((u): u is NonNullable<typeof u> => Boolean(u)),

    linkActa: solicitudExistente?.solicitudes_inversion?.link_acta_aprobacion || '',
    linkPlan: solicitudExistente?.solicitudes_inversion?.link_plan_proyecto || '',
    linkPresentacion: solicitudExistente?.solicitudes_inversion?.link_presentacion_puertas_3 || '',
  });

  useEffect(() => {
    (async () => {
      try {
        setCargandoCatalogos(true);
        const companiaId = proyecto?.companias?.id || proyecto?.compania_id || 1;

        const [resJerarquia, resCategorias, resUsuarios] = await Promise.allSettled([
          obtenerJerarquia(),
          obtenerCategorias(),
          obtenerPartesInteresadas(companiaId),
        ]);

        if (resJerarquia.status === 'fulfilled') setGrupos(resJerarquia.value);
        if (resCategorias.status === 'fulfilled') setCategorias(resCategorias.value);
        if (resUsuarios.status === 'fulfilled') setUsuarios(resUsuarios.value);
      } catch (err) {
        console.error('Error cargando catálogos:', err);
        setError('Error al cargar los catálogos del formulario.');
      } finally {
        setCargandoCatalogos(false);
      }
    })();
  }, [proyecto.id]);

  useEffect(() => {
    if (form.grupoId && grupos.length > 0) {
      const grupo = grupos.find((item) => item.id === Number(form.grupoId));
      setProgramas(grupo?.programas || []);
    } else {
      setProgramas([]);
    }
  }, [form.grupoId, grupos]);

  useEffect(() => {
    if (form.programaId && programas.length > 0) {
      const programa = programas.find((item) => item.id === Number(form.programaId));
      setSubprogramas(programa?.subprogramas || []);
    } else {
      setSubprogramas([]);
    }
  }, [form.programaId, programas]);

  const updateForm = (patch: Partial<typeof form>) => {
    setForm((prev) => ({ ...prev, ...patch }));
  };

  const subprogramaSeleccionado = subprogramas.find((s) => s.id === Number(form.subprogramaId));
  const categoriaSeleccionada = categorias.find((c) => c.id === Number(form.categoriaId));

  useEffect(() => {
    const obligaSubprograma = form.incluyeTradicional && subprogramaSeleccionado?.requiere_evaluacion_obligatoria;
    const obligaCategoria = form.incluyeNueva && categoriaSeleccionada?.requiere_evaluacion_obligatoria;
    if ((obligaSubprograma || obligaCategoria) && !form.tieneEvaluacionFinanciera) {
      updateForm({ tieneEvaluacionFinanciera: true });
    }
  }, [subprogramaSeleccionado?.id, categoriaSeleccionada?.id, form.incluyeTradicional, form.incluyeNueva]);

  const sumarFlujos = (tipos: Tipo[], moneda: Moneda) =>
    (form.flujos || [])
      .filter((f) => tipos.includes(f.tipo) && (f.moneda || 'COP') === moneda)
      .reduce((acc, f) => acc + (Number(f.monto) || 0), 0);

  const activoUsd = sumarFlujos(['CAPEX'], 'USD');
  const activoCop = sumarFlujos(['CAPEX'], 'COP');
  const gastoUsd = sumarFlujos(['GCAPEX', 'OPEX'], 'USD');
  const gastoCop = sumarFlujos(['GCAPEX', 'OPEX'], 'COP');

  const guardar = async () => {
    try {
      setGuardando(true);
      setError(null);

      const dtoPayload = validarYConstruirPayload(form, proyecto.id);

      let resProcesoId: number;
      if (solicitudExistente) {
        await actualizarSolicitudInversion(solicitudExistente.id, dtoPayload);
        resProcesoId = solicitudExistente.id;
      } else {
        const respuesta = await crearSolicitudInversion(dtoPayload);
        resProcesoId = respuesta.proceso_id;
      }

      if (onCreada) onCreada(resProcesoId);
    } catch (err) {
      setError((err instanceof Error ? err.message : '') || mensajeDelBackend(err) || 'Error al guardar la solicitud.');
    } finally {
      setGuardando(false);
    }
  };

  return {
    form,
    updateForm,
    grupos,
    programas,
    subprogramas,
    subprogramaSeleccionado,
    categorias,
    categoriaSeleccionada,
    usuarios,
    cargandoCatalogos,
    guardando,
    error,
    guardar,
    activoUsd,
    activoCop,
    gastoUsd,
    gastoCop,
  };
}