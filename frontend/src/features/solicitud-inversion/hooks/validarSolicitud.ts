import type { CrearSolicitudPayload, FlujoCaja, Meta } from '../types/solicitud.types';

type Tipo = 'CAPEX' | 'GCAPEX' | 'OPEX';

// Campos del formulario de la Solicitud de Inversión que se validan al guardar.
export interface FormSolicitud {
  incluyeTradicional: boolean;
  incluyeNueva: boolean;
  subprogramaId: number | '';
  categoriaId: number | '';
  entregablePlaneado: string;
  tieneEvaluacionFinanciera: boolean;
  trm: string;
  justificacion: string;
  tir: string;
  vpn: string;
  payback: string;
  metas: Meta[];
  aniosFlujo: number[];
  tiposSeleccionados: Record<number, Tipo[]>;
  mesesSeleccionados: Record<number, number[]>;
  tiposPorMes: Record<string, Tipo[]>;
  flujos: FlujoCaja[];
  partesInteresadas: { id: number }[];
  linkActa: string;
  linkPlan: string;
  linkPresentacion: string;
}

// --- Categorización: al menos una de las dos, y completa la que se marque ---
function validarClasificacion(form: FormSolicitud) {
  if (!form.incluyeTradicional && !form.incluyeNueva) {
    throw new Error('Debes marcar al menos una clasificación: Tradicional, Nueva, o ambas.');
  }
  if (form.incluyeTradicional && !form.subprogramaId) {
    throw new Error('Debes seleccionar el Grupo, Programa y Subprograma (clasificación Tradicional).');
  }
  if (form.incluyeNueva && !form.categoriaId) {
    throw new Error('Debes seleccionar una Categoría (clasificación Nueva).');
  }
}

// --- Entregable planeado y evaluación financiera / justificación ---
function validarEntregableYEvaluacion(form: FormSolicitud) {
  if (!form.entregablePlaneado?.trim()) {
    throw new Error('Debes describir el entregable planeado.');
  }
  if (form.tieneEvaluacionFinanciera) {
    if (form.tir === '' || form.vpn === '' || form.payback === '') {
      throw new Error('Debes ingresar TIR, VPN y Payback si el proyecto tiene evaluación financiera.');
    }
  } else if (!form.justificacion?.trim()) {
    throw new Error('Debes ingresar una justificación si el proyecto no tiene evaluación financiera.');
  }
}

// --- Metas: al menos una, completa ---
function obtenerMetasCompletas(form: FormSolicitud): Meta[] {
  const metasCompletas = (form.metas || [])
    .filter((m) => m.compromiso?.trim() && m.fecha_inicio && m.indicador?.trim())
    .map((m) => ({ compromiso: m.compromiso.trim(), fecha_inicio: m.fecha_inicio, indicador: m.indicador.trim() }));
  if (metasCompletas.length === 0) {
    throw new Error('Debes registrar al menos una meta completa (compromiso, fecha e indicador).');
  }
  return metasCompletas;
}

function validarTrm(form: FormSolicitud) {
  if (!form.trm || form.trm.trim() === '') {
    throw new Error('Debes ingresar la TRM.');
  }
}

// Un mes marcado debe tener valor > 0 en cada tipo que aplique ese mes.
function validarMesDelFlujo(form: FormSolicitud, anio: number, mesNum: number, tiposAnio: Tipo[]) {
  const claveMes = `${anio}_${mesNum}`;
  // Si el mes no tiene selección puntual, por defecto aplican todos los del año.
  const tiposDeEsteMes = form.tiposPorMes[claveMes] || tiposAnio;
  if (tiposDeEsteMes.length === 0) {
    throw new Error(`Elige al menos un tipo (CAPEX/GCAPEX/OPEX) para el mes seleccionado (año ${anio}).`);
  }
  for (const tipo of tiposDeEsteMes) {
    const monto = (form.flujos || [])
      .find((f) => Number(f.anio) === Number(anio) && Number(f.mes) === Number(mesNum) && f.tipo === tipo)
      ?.monto;
    if (!monto || Number(monto) <= 0) {
      throw new Error(`Falta ingresar el valor de ${tipo} para el mes seleccionado (año ${anio}). No puede quedar en blanco o en 0.`);
    }
  }
}

// --- Flujo de caja: cada mes que el PM marcó debe tener valor > 0 SOLO
// en los tipos que él mismo dijo que aplican ese mes puntual ---
function validarFlujoCaja(form: FormSolicitud) {
  for (const anio of form.aniosFlujo || []) {
    const tiposAnio = form.tiposSeleccionados[anio] || [];
    const mesesAnio = form.mesesSeleccionados[anio] || [];
    if (tiposAnio.length > 0 && mesesAnio.length === 0) {
      throw new Error(`Marca al menos un mes para el año ${anio} en el Flujo de Caja.`);
    }
    for (const mesNum of mesesAnio) {
      validarMesDelFlujo(form, anio, mesNum, tiposAnio);
    }
  }
}

function obtenerFlujosLimpios(form: FormSolicitud) {
  const flujosLimpios = (form.flujos || [])
    .filter((f) => Number(f.monto) > 0)
    .map((f) => ({
      anio: Number(f.anio),
      mes: Number(f.mes),
      tipo: f.tipo,
      moneda: f.moneda || 'COP',
      monto: Number(f.monto),
    }));
  if (flujosLimpios.length === 0) {
    throw new Error('Debes registrar al menos un monto en la tabla de Flujo de Caja.');
  }
  return flujosLimpios;
}

// --- Partes interesadas (al menos una) y documentos (los 3 links obligatorios) ---
function validarPartesYDocumentos(form: FormSolicitud) {
  if (!form.partesInteresadas || form.partesInteresadas.length === 0) {
    throw new Error('Debes asignar al menos una parte interesada para la etapa de verificación.');
  }
  if (!form.linkActa?.trim() || !form.linkPlan?.trim() || !form.linkPresentacion?.trim()) {
    throw new Error('Debes adjuntar los 3 links de documentos (Acta, Plan de proyecto y Presentación).');
  }
}

function construirPayload(
  form: FormSolicitud,
  proyectoId: string,
  metas: Meta[],
  flujos: CrearSolicitudPayload['flujos_caja'],
): CrearSolicitudPayload {
  return {
    proyecto_id: proyectoId,
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
    metas,
    flujos_caja: flujos,
    partes_interesadas_ids: (form.partesInteresadas || []).map((u) => u.id),
    link_acta_aprobacion: form.linkActa || undefined,
    link_plan_proyecto: form.linkPlan || undefined,
    link_presentacion_puertas_3: form.linkPresentacion || undefined,
  };
}

// Valida el formulario en el mismo orden de siempre (lanza un Error con el
// primer problema encontrado) y arma el payload que se envía al backend.
export function validarYConstruirPayload(form: FormSolicitud, proyectoId: string): CrearSolicitudPayload {
  validarClasificacion(form);
  validarEntregableYEvaluacion(form);
  const metas = obtenerMetasCompletas(form);
  validarTrm(form);
  validarFlujoCaja(form);
  const flujos = obtenerFlujosLimpios(form);
  validarPartesYDocumentos(form);
  return construirPayload(form, proyectoId, metas, flujos);
}
