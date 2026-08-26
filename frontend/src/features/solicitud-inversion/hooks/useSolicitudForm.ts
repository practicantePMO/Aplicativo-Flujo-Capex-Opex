import { useState, useEffect } from 'react';
import type { Proyecto } from '../../proyectos/types/proyecto.types';
import type { SolicitudInversionDetalle, FlujoCaja, Meta } from '../types/solicitud.types';
import {
  obtenerJerarquia,
  obtenerCategorias,
  obtenerPartesInteresadas,
  crearSolicitudInversion,
  actualizarSolicitudInversion,
} from '../services/solicitudInversion.service';

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

  const [grupos, setGrupos] = useState<any[]>([]);
  const [programas, setProgramas] = useState<any[]>([]);
  const [subprogramas, setSubprogramas] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<{ id: number; nombre: string; requiere_evaluacion_obligatoria: boolean }[]>([]);
  const [usuarios, setUsuarios] = useState<any[]>([]);

  // 1. Extraer flujos existentes (si es modo edición)
  const flujosGuardados = (solicitudExistente?.solicitudes_inversion?.solicitud_flujo_caja || []) as FlujoCaja[];

  // 2. Determinar el año base (del proyecto)
  const anioBase = (proyecto as any)?.anio_proyecto || new Date().getFullYear();

  // 3. Configurar años iniciales (flujos existentes o el año base si es nuevo)
  const initialAnios = flujosGuardados.length > 0
    ? Array.from(new Set(flujosGuardados.map((f) => Number(f.anio))))
    : [anioBase];

    // 4. Configurar tipos (CAPEX/GCAPEX/OPEX), meses y moneda por columna, a partir de lo guardado
  const initialTipos: Record<number, Tipo[]> = {};
  const initialMeses: Record<number, number[]> = {};
  const initialMoneda: Record<string, Moneda> = {};
  // 🎯 Qué tipos aplican en cada mes puntual (ej: "2026_2": ['CAPEX']) — se
  // reconstruye a partir de qué filas de flujo_caja existían para ese mes.
  const initialTiposPorMes: Record<string, Tipo[]> = {};

  if (flujosGuardados.length > 0) {
    flujosGuardados.forEach((f) => {
      const anio = Number(f.anio);
      const tipo = (f as any).tipo as Tipo;
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

  const esNuevaGuardada = Boolean((solicitudExistente?.solicitudes_inversion as any)?.categoria_id);
  const esTradicionalGuardada = Boolean(solicitudExistente?.solicitudes_inversion?.subprograma_id);

  // 5. INICIALIZAR EL FORMULARIO
  const [form, setForm] = useState({
    // 🏷️ Clasificación doble: ya no es un radio excluyente, son 2 checkboxes
    // independientes que se pueden marcar juntos.
    incluyeTradicional: solicitudExistente ? esTradicionalGuardada : true,
    incluyeNueva: esNuevaGuardada,

    grupoId: solicitudExistente?.solicitudes_inversion?.subprogramas?.programas?.id_grupo || ('' as number | ''),
    programaId: solicitudExistente?.solicitudes_inversion?.subprogramas?.programa_id || ('' as number | ''),
    subprogramaId: solicitudExistente?.solicitudes_inversion?.subprograma_id || ('' as number | ''),
    categoriaId: (solicitudExistente?.solicitudes_inversion as any)?.categoria_id || ('' as number | ''),

    entregablePlaneado: solicitudExistente?.solicitudes_inversion?.entregable_planeado || '',
    tieneEvaluacionFinanciera: solicitudExistente?.solicitudes_inversion?.tiene_evaluacion_financiera ?? false,
    trm: solicitudExistente?.solicitudes_inversion?.trm?.toString() || '',
    justificacion: solicitudExistente?.solicitudes_inversion?.justificacion_sin_evaluacion || '',

    tir: solicitudExistente?.solicitudes_inversion?.solicitud_evaluacion_financiera?.tir?.toString() || '',
    vpn: solicitudExistente?.solicitudes_inversion?.solicitud_evaluacion_financiera?.vpn?.toString() || '',
    payback: solicitudExistente?.solicitudes_inversion?.solicitud_evaluacion_financiera?.payback?.toString() || '',

    metas: (solicitudExistente?.solicitudes_inversion?.solicitud_metas?.length
      ? solicitudExistente.solicitudes_inversion.solicitud_metas.map((m: any) => ({
          compromiso: m.compromiso || '',
          fecha_inicio: m.fecha_inicio ? String(m.fecha_inicio).split('T')[0] : '',
          indicador: m.indicador || '',
        }))
      : [{ compromiso: '', fecha_inicio: '', indicador: '' }]) as Meta[],

    // 💰 "Valor Total del Proyecto" ya NO se digita: se calcula solo a partir
    // de "flujos" (ver activoUsd/activoCop/gastoUsd/gastoCop más abajo).
    aniosFlujo: initialAnios,
    tiposSeleccionados: initialTipos,
    mesesSeleccionados: initialMeses,
    tiposPorMes: initialTiposPorMes,
    monedaPorColumna: initialMoneda,
    flujos: flujosGuardados,

    partesInteresadas: (solicitudExistente?.asignaciones_proceso || [])
      .filter((a) => a.etapa === 'VERIFICACION_PARTES_INTERESADAS')
      .map((a) => a.usuarios)
      .filter((u): u is any => !!u),

    linkActa: solicitudExistente?.solicitudes_inversion?.link_acta_aprobacion || '',
    linkPlan: solicitudExistente?.solicitudes_inversion?.link_plan_proyecto || '',
    linkPresentacion: solicitudExistente?.solicitudes_inversion?.link_presentacion_puertas_3 || '',
  });

  useEffect(() => {
    (async () => {
      try {
        setCargandoCatalogos(true);
        const companiaId = proyecto?.companias?.id || (proyecto as any)?.compania_id || 1;

        const [resJerarquia, resCategorias, resUsuarios] = await Promise.allSettled([
          obtenerJerarquia(),
          obtenerCategorias(),
          obtenerPartesInteresadas(companiaId),
        ]);

        if (resJerarquia.status === 'fulfilled') setGrupos(resJerarquia.value);
        if (resCategorias.status === 'fulfilled') setCategorias(resCategorias.value as any);
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
      const g = grupos.find((item) => item.id === Number(form.grupoId));
      setProgramas(g?.programas || []);
    } else {
      setProgramas([]);
    }
  }, [form.grupoId, grupos]);

  useEffect(() => {
    if (form.programaId && programas.length > 0) {
      const p = programas.find((item) => item.id === Number(form.programaId));
      setSubprogramas(p?.subprogramas || []);
    } else {
      setSubprogramas([]);
    }
  }, [form.programaId, programas]);

  const updateForm = (patch: Partial<typeof form>) => {
    setForm((prev) => ({ ...prev, ...patch }));
  };

  const subprogramaSeleccionado = subprogramas.find((s) => s.id === Number(form.subprogramaId));
  const categoriaSeleccionada = categorias.find((c) => c.id === Number(form.categoriaId));

  // 📌 Si CUALQUIERA de las dos clasificaciones marcadas exige evaluación
  // financiera obligatoria (subprograma o categoría), se activa sola.
  useEffect(() => {
    const obligaSubprograma = form.incluyeTradicional && subprogramaSeleccionado?.requiere_evaluacion_obligatoria;
    const obligaCategoria = form.incluyeNueva && categoriaSeleccionada?.requiere_evaluacion_obligatoria;
    if ((obligaSubprograma || obligaCategoria) && !form.tieneEvaluacionFinanciera) {
      updateForm({ tieneEvaluacionFinanciera: true });
    }
  }, [subprogramaSeleccionado?.id, categoriaSeleccionada?.id, form.incluyeTradicional, form.incluyeNueva]);

  // 🧮 Totales de "Valor Total del Proyecto", calculados a partir del flujo
  // de caja: CAPEX = Activo; GCAPEX + OPEX = Gasto; separados por moneda.
  const sumarFlujos = (tipos: Tipo[], moneda: Moneda) =>
    (form.flujos || [])
      .filter((f) => tipos.includes((f as any).tipo) && ((f as any).moneda || 'COP') === moneda)
      .reduce((acc, f) => acc + (Number(f.monto) || 0), 0);

  const activoUsd = sumarFlujos(['CAPEX'], 'USD');
  const activoCop = sumarFlujos(['CAPEX'], 'COP');
  const gastoUsd = sumarFlujos(['GCAPEX', 'OPEX'], 'USD');
  const gastoCop = sumarFlujos(['GCAPEX', 'OPEX'], 'COP');

  const guardar = async () => {
    try {
      setGuardando(true);
      setError(null);

      // --- Categorización: al menos una de las dos, y completa la que se marque ---
      if (!form.incluyeTradicional && !form.incluyeNueva) {
        throw new Error('Debes marcar al menos una clasificación: Tradicional, Nueva, o ambas.');
      }
      if (form.incluyeTradicional && !form.subprogramaId) {
        throw new Error('Debes seleccionar el Grupo, Programa y Subprograma (clasificación Tradicional).');
      }
      if (form.incluyeNueva && !form.categoriaId) {
        throw new Error('Debes seleccionar una Categoría (clasificación Nueva).');
      }

      // --- Entregable planeado ---
      if (!form.entregablePlaneado || !form.entregablePlaneado.trim()) {
        throw new Error('Debes describir el entregable planeado.');
      }

      // --- Evaluación financiera / justificación ---
      if (form.tieneEvaluacionFinanciera) {
        if (form.tir === '' || form.vpn === '' || form.payback === '') {
          throw new Error('Debes ingresar TIR, VPN y Payback si el proyecto tiene evaluación financiera.');
        }
      } else if (!form.justificacion || !form.justificacion.trim()) {
        throw new Error('Debes ingresar una justificación si el proyecto no tiene evaluación financiera.');
      }

      // --- Metas: al menos una, completa ---
      const metasCompletas = (form.metas || [])
        .filter((m) => m.compromiso?.trim() && m.fecha_inicio && m.indicador?.trim())
        .map((m) => ({ compromiso: m.compromiso.trim(), fecha_inicio: m.fecha_inicio, indicador: m.indicador.trim() }));
      if (metasCompletas.length === 0) {
        throw new Error('Debes registrar al menos una meta completa (compromiso, fecha e indicador).');
      }

      if (!form.trm || form.trm.trim() === '') {
        throw new Error('Debes ingresar la TRM.');
      }

                 // --- Flujo de caja: cada mes que el PM marcó debe tener valor > 0 SOLO
      // en los tipos que él mismo dijo que aplican ese mes puntual ---
      for (const anio of form.aniosFlujo || []) {
        const tiposAnio = form.tiposSeleccionados[anio] || [];
        const mesesAnio = form.mesesSeleccionados[anio] || [];
        if (tiposAnio.length > 0 && mesesAnio.length === 0) {
          throw new Error(`Marca al menos un mes para el año ${anio} en el Flujo de Caja.`);
        }
        for (const mesNum of mesesAnio) {
          const claveMes = `${anio}_${mesNum}`;
          // Si el mes no tiene selección puntual, por defecto aplican todos los del año.
          const tiposDeEsteMes = form.tiposPorMes[claveMes] || tiposAnio;
          if (tiposDeEsteMes.length === 0) {
            throw new Error(`Elige al menos un tipo (CAPEX/GCAPEX/OPEX) para el mes seleccionado (año ${anio}).`);
          }
          for (const tipo of tiposDeEsteMes) {
            const monto = (form.flujos || [])
              .find((f) => Number(f.anio) === Number(anio) && Number(f.mes) === Number(mesNum) && (f as any).tipo === tipo)
              ?.monto;
            if (!monto || Number(monto) <= 0) {
              throw new Error(`Falta ingresar el valor de ${tipo} para el mes seleccionado (año ${anio}). No puede quedar en blanco o en 0.`);
            }
          }
        }
      }

      const flujosLimpios = (form.flujos || [])
        .filter((f) => Number(f.monto) > 0)
        .map((f) => ({
          anio: Number(f.anio),
          mes: Number(f.mes),
          tipo: (f as any).tipo,
          moneda: (f as any).moneda || 'COP',
          monto: Number(f.monto),
        }));
      if (flujosLimpios.length === 0) {
        throw new Error('Debes registrar al menos un monto en la tabla de Flujo de Caja.');
      }

      // --- Partes interesadas: al menos una ---
      if (!form.partesInteresadas || form.partesInteresadas.length === 0) {
        throw new Error('Debes asignar al menos una parte interesada para la etapa de verificación.');
      }

      // --- Documentos: los 3 links son obligatorios ---
      if (!form.linkActa?.trim() || !form.linkPlan?.trim() || !form.linkPresentacion?.trim()) {
        throw new Error('Debes adjuntar los 3 links de documentos (Acta, Plan de proyecto y Presentación).');
      }

      const dtoPayload: any = {
        proyecto_id: proyecto.id,
        incluye_tradicional: form.incluyeTradicional,
        incluye_nueva: form.incluyeNueva,
        subprograma_id: form.incluyeTradicional && form.subprogramaId ? Number(form.subprogramaId) : undefined,
        categoria_id: form.incluyeNueva && form.categoriaId ? Number(form.categoriaId) : undefined,
        entregable_planeado: form.entregablePlaneado || undefined,
        tiene_evaluacion_financiera: Boolean(form.tieneEvaluacionFinanciera),
        trm: Number(form.trm),
        justificacion_sin_evaluacion: !form.tieneEvaluacionFinanciera ? form.justificacion.trim() : undefined,
        evaluacion_financiera: form.tieneEvaluacionFinanciera
          ? { tir: Number(form.tir) || 0, vpn: Number(form.vpn) || 0, payback: Number(form.payback) || 0 }
          : undefined,
        metas: metasCompletas,
        flujos_caja: flujosLimpios,
        partes_interesadas_ids: (form.partesInteresadas || []).map((u) => u.id),
        link_acta_aprobacion: form.linkActa || undefined,
        link_plan_proyecto: form.linkPlan || undefined,
        link_presentacion_puertas_3: form.linkPresentacion || undefined,
      };

      let resProcesoId: number;
      if (solicitudExistente) {
        await actualizarSolicitudInversion(solicitudExistente.id, dtoPayload);
        resProcesoId = solicitudExistente.id;
      } else {
        const respuesta = await crearSolicitudInversion(dtoPayload);
        resProcesoId = respuesta.proceso_id;
      }

      if (onCreada) onCreada(resProcesoId);
    } catch (err: any) {
      setError(err.message || err.response?.data?.message || 'Error al guardar la solicitud.');
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