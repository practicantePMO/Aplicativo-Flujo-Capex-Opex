import { useState, useEffect } from 'react';
import type { Proyecto } from '../../proyectos/types/proyecto.types';
import type { SolicitudInversionDetalle, FlujoCaja, Metainterface, ValoresProyecto } from '../types/solicitud.types';
import {
  obtenerJerarquia,
  obtenerCategorias,
  obtenerPartesInteresadas,
  crearSolicitudInversion,
  actualizarSolicitudInversion,
} from '../services/solicitudInversion.service';

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
  const [categorias, setCategorias] = useState<{ id: number; nombre: string }[]>([]);
  const [usuarios, setUsuarios] = useState<any[]>([]);

  // 1. Extraer flujos existentes (si es modo edición)
  const flujosGuardados = (solicitudExistente?.solicitudes_inversion?.solicitud_flujo_caja || []) as FlujoCaja[];
  
  // 2. Determinar el año base (del proyecto)
  const anioBase = (proyecto as any)?.anio_proyecto || new Date().getFullYear();

  // 3. Configurar años iniciales (flujos existentes o el año base si es nuevo)
  const initialAnios = flujosGuardados.length > 0 
    ? Array.from(new Set(flujosGuardados.map((f) => Number(f.anio)))) 
    : [anioBase];

  // 4. Configurar tipos (CAPEX, OPEX) y trimestres abiertos por defecto
  const initialTipos: Record<number, ('CAPEX' | 'GCAPEX' | 'OPEX')[]> = {};
  const initialTrimestres: Record<number, number[]> = {};

  if (flujosGuardados.length > 0) {
    flujosGuardados.forEach((f) => {
      const anio = Number(f.anio);
      const tipo = (f as any).tipo || (f as any).tipo_flujo;
      const trimestre = Math.ceil(Number(f.mes) / 3);

      if (!initialTipos[anio]) initialTipos[anio] = [];
      if (!initialTipos[anio].includes(tipo)) initialTipos[anio].push(tipo);

      if (!initialTrimestres[anio]) initialTrimestres[anio] = [];
      if (!initialTrimestres[anio].includes(trimestre)) initialTrimestres[anio].push(trimestre);
    });
  } else {
    // Si es un proyecto NUEVO, arranca con CAPEX seleccionado y Q1 abierto
    initialTipos[anioBase] = ['CAPEX'];
    initialTrimestres[anioBase] = [1];
  }

  // 5. INICIALIZAR EL FORMULARIO
  const [form, setForm] = useState({
    tipoClasificacion: (solicitudExistente?.solicitudes_inversion as any)?.tipo_clasificacion || 'TRADICIONAL',
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
      : [{ compromiso: '', fecha_inicio: '', indicador: '' }]) as Metainterface[],
    
    valoresProyecto: {
      activoUsd: solicitudExistente?.solicitudes_inversion?.solicitud_valores?.find((v) => v.categoria === 'ACTIVO')?.usd?.toString() || '',
      activoCop: solicitudExistente?.solicitudes_inversion?.solicitud_valores?.find((v) => v.categoria === 'ACTIVO')?.cop?.toString() || '',
      gastoUsd: solicitudExistente?.solicitudes_inversion?.solicitud_valores?.find((v) => v.categoria === 'GASTO')?.usd?.toString() || '',
      gastoCop: solicitudExistente?.solicitudes_inversion?.solicitud_valores?.find((v) => v.categoria === 'GASTO')?.cop?.toString() || '',
    } as ValoresProyecto,

    // 👈 CONECTADO A LOS VALORES CALCULADOS
    aniosFlujo: initialAnios,
    tiposSeleccionados: initialTipos,
    trimestresAbiertos: initialTrimestres,
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

  useEffect(() => {
    if (subprogramaSeleccionado?.requiere_evaluacion_obligatoria && !form.tieneEvaluacionFinanciera) {
      updateForm({ tieneEvaluacionFinanciera: true });
    }
  }, [subprogramaSeleccionado?.id]);

  const guardar = async () => {
    try {
      setGuardando(true);
      setError(null);

      // --- Categorización ---
      if (form.tipoClasificacion === 'TRADICIONAL' && !form.subprogramaId) {
        throw new Error('Debes seleccionar el Grupo, Programa y Subprograma.');
      }
      if (form.tipoClasificacion === 'NUEVA' && !form.categoriaId) {
        throw new Error('Debes seleccionar una Categoría.');
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
        .map((m) => ({
          compromiso: m.compromiso.trim(),
          fecha_inicio: m.fecha_inicio,
          indicador: m.indicador.trim(),
        }));
      if (metasCompletas.length === 0) {
        throw new Error('Debes registrar al menos una meta completa (compromiso, fecha e indicador).');
      }

      // --- Valores del proyecto: no dejar los campos en blanco ---
      const { activoUsd, activoCop, gastoUsd, gastoCop } = form.valoresProyecto;
      if ([activoUsd, activoCop, gastoUsd, gastoCop].some((v) => v === '' || v === undefined)) {
        throw new Error('Debes diligenciar los 4 valores del proyecto (Activo y Gasto, en USD y COP). Usa 0 si no aplica.');
      }
      if (!form.trm || form.trm.trim() === '') {
        throw new Error('Debes ingresar la TRM.');
      }

      // --- Flujo de caja: sanitizar y exigir al menos una fila con monto ---
      const flujosLimpios = (form.flujos || [])
        .filter((f) => Number(f.monto) > 0)
        .map((f) => ({
          anio: Number(f.anio),
          mes: Number(f.mes),
          tipo: (f as any).tipo || (f as any).tipo_flujo,
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
        tipo_clasificacion: form.tipoClasificacion,
        subprograma_id: form.tipoClasificacion === 'TRADICIONAL' && form.subprogramaId ? Number(form.subprogramaId) : undefined,
        categoria_id: form.tipoClasificacion === 'NUEVA' && form.categoriaId ? Number(form.categoriaId) : undefined,
        entregable_planeado: form.entregablePlaneado || undefined,
        tiene_evaluacion_financiera: Boolean(form.tieneEvaluacionFinanciera),
        trm: Number(form.trm), 
        justificacion_sin_evaluacion: !form.tieneEvaluacionFinanciera ? form.justificacion.trim() : undefined,
        evaluacion_financiera: form.tieneEvaluacionFinanciera
          ? {
              tir: Number(form.tir) || 0,
              vpn: Number(form.vpn) || 0,
              payback: Number(form.payback) || 0,
            }
          : undefined,
        metas: metasCompletas,
        valores: [
          { categoria: 'ACTIVO', usd: Number(form.valoresProyecto.activoUsd) || 0, cop: Number(form.valoresProyecto.activoCop) || 0 },
          { categoria: 'GASTO', usd: Number(form.valoresProyecto.gastoUsd) || 0, cop: Number(form.valoresProyecto.gastoCop) || 0 },
        ],
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
    usuarios,
    cargandoCatalogos,
    guardando,
    error,
    guardar,
  };
}