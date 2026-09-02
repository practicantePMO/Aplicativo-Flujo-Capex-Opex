// backend/scripts/exportar-excel.ts
//
// Backup completo en Excel de TODOS los proyectos: cada tabla del schema
// (incluidos flujo de caja, valores, metas y los links/anexos) sale en su
// propia hoja. Se corre localmente (usa el mismo DATABASE_URL del .env).
//
// Uso (desde la carpeta backend/):
//   npm install exceljs
//   npx ts-node scripts/exportar-excel.ts
//
// El archivo queda en backend/exports/ (carpeta aparte del código, con su
// propia entrada en .gitignore para que no se suba por accidente).

import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import ExcelJS from 'exceljs';
import * as fs from 'fs';
import * as path from 'path';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
const CARPETA_EXPORTS = path.join(__dirname, '..', 'exports');

function encabezado(hoja: ExcelJS.Worksheet) {
  hoja.getRow(1).font = { bold: true };
  hoja.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: hoja.columns?.length || 1 } };
  hoja.views = [{ state: 'frozen', ySplit: 1 }];
}

async function main() {
  const workbook = new ExcelJS.Workbook();
  const conteos: Record<string, number> = {};

  // =====================================================================
  // Proyectos
  // =====================================================================
  const proyectos = await prisma.proyectos.findMany({
    where: { eliminado_el: null },
    include: {
      companias: { select: { nombre: true } },
      usuarios: { select: { nombre: true, email: true } },
    },
    orderBy: { fecha_creacion: 'desc' },
  });
  conteos['Proyectos'] = proyectos.length;

  const hojaProyectos = workbook.addWorksheet('Proyectos');
  hojaProyectos.columns = [
    { header: 'ID Proyecto', key: 'id', width: 16 },
    { header: 'Nombre', key: 'nombre', width: 40 },
    { header: 'Compañía', key: 'compania', width: 15 },
    { header: 'PM Creador', key: 'pm', width: 25 },
    { header: 'Correo PM', key: 'pmEmail', width: 30 },
    { header: 'Año Proyecto', key: 'anioProyecto', width: 12 },
    { header: 'Año Asignado', key: 'anioAsignado', width: 12 },
    { header: 'Consecutivo', key: 'consecutivo', width: 12 },
    { header: 'Fecha Proyecto', key: 'fechaProyecto', width: 16 },
    { header: 'Fecha Creación', key: 'fechaCreacion', width: 18 },
  ];
  for (const p of proyectos) {
    hojaProyectos.addRow({
      id: p.id,
      nombre: p.nombre,
      compania: p.companias?.nombre || '',
      pm: p.usuarios?.nombre || '',
      pmEmail: p.usuarios?.email || '',
      anioProyecto: p.anio_proyecto,
      anioAsignado: p.anio_asignado,
      consecutivo: p.consecutivo,
      fechaProyecto: p.fecha_proyecto,
      fechaCreacion: p.fecha_creacion,
    });
  }
  encabezado(hojaProyectos);

  // =====================================================================
  // Solicitudes de Inversión
  // =====================================================================
  const solicitudes = await prisma.solicitudes_inversion.findMany({
    include: {
      procesos: { select: { estado_actual: true, proyecto_id: true, fecha_creacion: true } },
      usuarios: { select: { nombre: true } },
      categorias: { select: { nombre: true } },
      subprogramas: { select: { nombre: true } },
      solicitud_evaluacion_financiera: true,
    },
  });
  conteos['Solicitudes de Inversión'] = solicitudes.length;

  const hojaSI = workbook.addWorksheet('Solicitudes de Inversión');
  hojaSI.columns = [
    { header: 'ID Proyecto', key: 'proyectoId', width: 16 },
    { header: 'Estado', key: 'estado', width: 22 },
    { header: 'PM Responsable', key: 'pm', width: 25 },
    { header: 'Clasificación', key: 'clasificacion', width: 15 },
    { header: 'Categoría', key: 'categoria', width: 20 },
    { header: 'Subprograma', key: 'subprograma', width: 20 },
    { header: 'Entregable Planeado', key: 'entregable', width: 40 },
    { header: '¿Evaluación Financiera?', key: 'tieneEval', width: 15 },
    { header: 'TIR (%)', key: 'tir', width: 10 },
    { header: 'VPN', key: 'vpn', width: 15 },
    { header: 'Payback', key: 'payback', width: 10 },
    { header: 'Justificación sin Evaluación', key: 'justificacion', width: 35 },
    { header: 'TRM', key: 'trm', width: 10 },
    { header: 'Link Acta Aprobación', key: 'linkActa', width: 40 },
    { header: 'Link Plan Proyecto', key: 'linkPlan', width: 40 },
    { header: 'Link Presentación Puertas 3', key: 'linkP3', width: 40 },
    { header: 'Fecha Creación', key: 'fecha', width: 18 },
  ];
  for (const s of solicitudes) {
    hojaSI.addRow({
      proyectoId: s.procesos?.proyecto_id || '',
      estado: s.procesos?.estado_actual || '',
      pm: s.usuarios?.nombre || '',
      clasificacion: s.tipo_clasificacion || '',
      categoria: s.categorias?.nombre || '',
      subprograma: s.subprogramas?.nombre || '',
      entregable: s.entregable_planeado || '',
      tieneEval: s.tiene_evaluacion_financiera ? 'Sí' : 'No',
      tir: s.solicitud_evaluacion_financiera?.tir ? Number(s.solicitud_evaluacion_financiera.tir) : '',
      vpn: s.solicitud_evaluacion_financiera?.vpn ? Number(s.solicitud_evaluacion_financiera.vpn) : '',
      payback: s.solicitud_evaluacion_financiera?.payback ? Number(s.solicitud_evaluacion_financiera.payback) : '',
      justificacion: s.justificacion_sin_evaluacion || '',
      trm: s.trm ? Number(s.trm) : '',
      linkActa: s.link_acta_aprobacion || '',
      linkPlan: s.link_plan_proyecto || '',
      linkP3: s.link_presentacion_puertas_3 || '',
      fecha: s.procesos?.fecha_creacion || '',
    });
  }
  encabezado(hojaSI);

  // ---------- SI - Flujo de Caja Planeado ----------
  const flujoPlaneado = await prisma.solicitud_flujo_caja.findMany({
    include: { solicitudes_inversion: { include: { procesos: { select: { proyecto_id: true } } } } },
    orderBy: [{ anio: 'asc' }, { mes: 'asc' }],
  });
  conteos['SI - Flujo de Caja'] = flujoPlaneado.length;

  const hojaFlujoPlaneado = workbook.addWorksheet('SI - Flujo de Caja');
  hojaFlujoPlaneado.columns = [
    { header: 'ID Proyecto', key: 'proyectoId', width: 16 },
    { header: 'Tipo', key: 'tipo', width: 12 },
    { header: 'Moneda', key: 'moneda', width: 10 },
    { header: 'Año', key: 'anio', width: 8 },
    { header: 'Mes', key: 'mes', width: 8 },
    { header: 'Monto Planeado', key: 'monto', width: 18 },
  ];
  for (const f of flujoPlaneado) {
    hojaFlujoPlaneado.addRow({
      proyectoId: f.solicitudes_inversion?.procesos?.proyecto_id || '',
      tipo: f.tipo,
      moneda: f.moneda,
      anio: f.anio,
      mes: f.mes,
      monto: f.monto ? Number(f.monto) : 0,
    });
  }
  encabezado(hojaFlujoPlaneado);

  // ---------- SI - Valores Planeados (Valor Total) ----------
  const valoresPlaneados = await prisma.solicitud_valores.findMany({
    include: { solicitudes_inversion: { include: { procesos: { select: { proyecto_id: true } } } } },
  });
  conteos['SI - Valores'] = valoresPlaneados.length;

  const hojaValoresPlaneados = workbook.addWorksheet('SI - Valores');
  hojaValoresPlaneados.columns = [
    { header: 'ID Proyecto', key: 'proyectoId', width: 16 },
    { header: 'Categoría', key: 'categoria', width: 12 },
    { header: 'USD', key: 'usd', width: 16 },
    { header: 'COP', key: 'cop', width: 18 },
  ];
  for (const v of valoresPlaneados) {
    hojaValoresPlaneados.addRow({
      proyectoId: v.solicitudes_inversion?.procesos?.proyecto_id || '',
      categoria: v.categoria,
      usd: v.usd ? Number(v.usd) : '',
      cop: v.cop ? Number(v.cop) : '',
    });
  }
  encabezado(hojaValoresPlaneados);

  // ---------- SI - Metas ----------
  const metas = await prisma.solicitud_metas.findMany({
    include: { solicitudes_inversion: { include: { procesos: { select: { proyecto_id: true } } } } },
  });
  conteos['SI - Metas'] = metas.length;

  const hojaMetas = workbook.addWorksheet('SI - Metas');
  hojaMetas.columns = [
    { header: 'ID Proyecto', key: 'proyectoId', width: 16 },
    { header: 'Compromiso', key: 'compromiso', width: 40 },
    { header: 'Fecha Inicio', key: 'fechaInicio', width: 16 },
    { header: 'Indicador', key: 'indicador', width: 30 },
  ];
  for (const m of metas) {
    hojaMetas.addRow({
      proyectoId: m.solicitudes_inversion?.procesos?.proyecto_id || '',
      compromiso: m.compromiso,
      fechaInicio: m.fecha_inicio,
      indicador: m.indicador,
    });
  }
  encabezado(hojaMetas);

  // =====================================================================
  // Órdenes Internas
  // =====================================================================
  const ordenes = await prisma.ordenes_internas.findMany({
    include: {
      procesos: { select: { estado_actual: true } },
      grupos_ordenes_internas: { select: { proyecto_id: true, nombre: true } },
      pm: { select: { nombre: true } },
      control_gestion: { select: { nombre: true } },
    },
  });
  conteos['Órdenes Internas'] = ordenes.length;

  const hojaOI = workbook.addWorksheet('Órdenes Internas');
  hojaOI.columns = [
    { header: 'ID Proyecto', key: 'proyectoId', width: 16 },
    { header: 'Grupo', key: 'grupo', width: 20 },
    { header: 'N° OI', key: 'numeroOi', width: 15 },
    { header: 'Nombre Descriptivo', key: 'nombre', width: 35 },
    { header: 'Tipo', key: 'tipo', width: 10 },
    { header: 'Estado', key: 'estado', width: 15 },
    { header: 'PM', key: 'pm', width: 25 },
    { header: 'Control Gestión', key: 'cg', width: 25 },
    { header: 'Centro de Costos', key: 'centroCostos', width: 18 },
    { header: 'Oficina de Ventas', key: 'oficinaVentas', width: 18 },
    { header: 'Línea/Marca', key: 'lineaMarca', width: 18 },
    { header: 'Cliente', key: 'cliente', width: 20 },
    { header: 'Ramo', key: 'ramo', width: 15 },
    { header: 'Activo Fijo en Curso', key: 'activoFijo', width: 25 },
    { header: 'Tipo de Activo', key: 'tipoActivo', width: 20 },
    { header: '¿Activo Real Productivo?', key: 'activoReal', width: 20 },
    { header: 'Presupuesto', key: 'presupuesto', width: 15 },
    { header: 'Moneda', key: 'moneda', width: 10 },
    { header: 'Grupo (nombre asignado)', key: 'grupoTexto', width: 25 },
    { header: 'Observaciones PM', key: 'obsPm', width: 35 },
    { header: 'Observaciones CG', key: 'obsCg', width: 35 },
    { header: '¿Es Control de Cambios?', key: 'esCC', width: 18 },
  ];
  for (const o of ordenes) {
    hojaOI.addRow({
      proyectoId: o.grupos_ordenes_internas?.proyecto_id || '',
      grupo: o.grupos_ordenes_internas?.nombre || '',
      numeroOi: o.numero_oi || '(sin asignar)',
      nombre: o.nombre_descriptivo,
      tipo: o.tipo_orden,
      estado: o.procesos?.estado_actual || '',
      pm: o.pm?.nombre || '',
      cg: o.control_gestion?.nombre || '',
      centroCostos: o.centro_costos || '',
      oficinaVentas: o.oficina_ventas || '',
      lineaMarca: o.linea_marca || '',
      cliente: o.cliente || '',
      ramo: o.ramo || '',
      activoFijo: o.activo_fijo_curso || '',
      tipoActivo: o.tipo_activo || '',
      activoReal: o.activo_real_productivo || '',
      presupuesto: o.presupuesto ? Number(o.presupuesto) : '',
      moneda: o.presupuesto_moneda,
      grupoTexto: o.grupo_texto || '',
      obsPm: o.observaciones_pm || '',
      obsCg: o.observaciones_cg || '',
      esCC: o.es_control_cambios ? 'Sí' : 'No',
    });
  }
  encabezado(hojaOI);

  // ---------- OI - Valores (Sección 3) ----------
  const oiValores = await prisma.oi_valores.findMany({
    include: {
      ordenes_internas: {
        select: { numero_oi: true, nombre_descriptivo: true, grupos_ordenes_internas: { select: { proyecto_id: true } } },
      },
    },
  });
  conteos['OI - Valores'] = oiValores.length;

  const hojaOiValores = workbook.addWorksheet('OI - Valores');
  hojaOiValores.columns = [
    { header: 'ID Proyecto', key: 'proyectoId', width: 16 },
    { header: 'N° OI', key: 'numeroOi', width: 15 },
    { header: 'Nombre OI', key: 'nombreOi', width: 30 },
    { header: 'Categoría', key: 'categoria', width: 12 },
    { header: 'USD', key: 'usd', width: 16 },
    { header: 'COP', key: 'cop', width: 18 },
  ];
  for (const v of oiValores) {
    hojaOiValores.addRow({
      proyectoId: v.ordenes_internas?.grupos_ordenes_internas?.proyecto_id || '',
      numeroOi: v.ordenes_internas?.numero_oi || '(sin asignar)',
      nombreOi: v.ordenes_internas?.nombre_descriptivo || '',
      categoria: v.categoria,
      usd: v.usd ? Number(v.usd) : '',
      cop: v.cop ? Number(v.cop) : '',
    });
  }
  encabezado(hojaOiValores);

  // =====================================================================
  // Controles de Cambio
  // =====================================================================
  const controles = await prisma.controles_cambio.findMany({
    include: {
      procesos: { select: { estado_actual: true } },
      usuarios: { select: { nombre: true } },
      ordenes_internas: { select: { numero_oi: true } },
    },
  });
  conteos['Controles de Cambio'] = controles.length;

  const hojaCC = workbook.addWorksheet('Controles de Cambio');
  hojaCC.columns = [
    { header: 'ID Proyecto', key: 'proyectoId', width: 16 },
    { header: 'Estado', key: 'estado', width: 22 },
    { header: 'PM', key: 'pm', width: 25 },
    { header: 'Tipo', key: 'tipo', width: 15 },
    { header: 'Año Nuevo Propuesto', key: 'anioNuevo', width: 15 },
    { header: '¿Requiere OI?', key: 'requiereOi', width: 12 },
    { header: 'OI Generadas', key: 'oiGeneradas', width: 25 },
    { header: 'Descripción del Cambio', key: 'descripcion', width: 45 },
    { header: 'Antecedentes', key: 'antecedentes', width: 35 },
    { header: 'Justificación', key: 'justificacion', width: 35 },
    { header: 'Impacto en Alcance', key: 'impactoAlcance', width: 35 },
    { header: 'Impacto en Tiempo', key: 'impactoTiempo', width: 35 },
    { header: 'Fecha Creación', key: 'fecha', width: 18 },
  ];
  for (const c of controles) {
    hojaCC.addRow({
      proyectoId: c.proyecto_id,
      estado: c.procesos?.estado_actual || '',
      pm: c.usuarios?.nombre || '',
      tipo: c.tipo_control_cambio || 'GENERAL',
      anioNuevo: c.anio_nuevo_propuesto || '',
      requiereOi: c.requiere_orden_interna ? 'Sí' : 'No',
      oiGeneradas: c.ordenes_internas.map((o) => o.numero_oi || '(sin asignar)').join(', '),
      descripcion: c.descripcion_cambio || '',
      antecedentes: c.antecedentes || '',
      justificacion: c.justificacion || '',
      impactoAlcance: c.impacto_alcance || '',
      impactoTiempo: c.impacto_tiempo || '',
      fecha: c.fecha_creacion,
    });
  }
  encabezado(hojaCC);

  // ---------- CC - Anexos y Links ----------
  const ccAnexos = await prisma.control_cambio_anexos.findMany({
    include: { controles_cambio: { select: { proyecto_id: true } } },
  });
  conteos['CC - Anexos'] = ccAnexos.length;

  const hojaCcAnexos = workbook.addWorksheet('CC - Anexos');
  hojaCcAnexos.columns = [
    { header: 'ID Proyecto', key: 'proyectoId', width: 16 },
    { header: 'Tipo', key: 'tipo', width: 18 },
    { header: 'Link / URL', key: 'url', width: 50 },
    { header: 'Descripción', key: 'descripcion', width: 35 },
  ];
  for (const a of ccAnexos) {
    hojaCcAnexos.addRow({
      proyectoId: a.controles_cambio?.proyecto_id || '',
      tipo: a.tipo,
      url: a.url,
      descripcion: a.descripcion || '',
    });
  }
  encabezado(hojaCcAnexos);

  // =====================================================================
  // Actas de Cierre
  // =====================================================================
  const actas = await prisma.actas_cierre.findMany({
    include: {
      procesos: { select: { estado_actual: true } },
      pm: { select: { nombre: true } },
      control_gestion: { select: { nombre: true } },
    },
  });
  conteos['Actas de Cierre'] = actas.length;

  const hojaAC = workbook.addWorksheet('Actas de Cierre');
  hojaAC.columns = [
    { header: 'ID Proyecto', key: 'proyectoId', width: 16 },
    { header: 'Tipo de Cierre', key: 'tipoCierre', width: 15 },
    { header: 'Estado', key: 'estado', width: 22 },
    { header: 'PM', key: 'pm', width: 25 },
    { header: 'Control Gestión', key: 'cg', width: 25 },
    { header: 'Link Presentación P5', key: 'linkP5', width: 40 },
    { header: 'Entregable Real', key: 'entregableReal', width: 35 },
    { header: 'Explicación Sobre/Sub-ejecución', key: 'explicacion', width: 40 },
    { header: 'Otros Entregables', key: 'otros', width: 35 },
    { header: 'Fecha Creación', key: 'fecha', width: 18 },
  ];
  for (const a of actas) {
    hojaAC.addRow({
      proyectoId: a.proyecto_id,
      tipoCierre: a.tipo_cierre,
      estado: a.procesos?.estado_actual || '',
      pm: a.pm?.nombre || '',
      cg: a.control_gestion?.nombre || '',
      linkP5: a.presentacion_p5_link || '',
      entregableReal: a.entregable_real || '',
      explicacion: a.explicacion_ejecucion || '',
      otros: a.otros_entregables || '',
      fecha: a.fecha_creacion,
    });
  }
  encabezado(hojaAC);

  // ---------- AC - Metas (resultado del cierre) ----------
  const acMetas = await prisma.acta_cierre_metas.findMany({
    include: {
      actas_cierre: { select: { proyecto_id: true } },
      solicitud_metas: { select: { compromiso: true, fecha_inicio: true, indicador: true } },
    },
  });
  conteos['AC - Metas'] = acMetas.length;

  const hojaAcMetas = workbook.addWorksheet('AC - Metas');
  hojaAcMetas.columns = [
    { header: 'ID Proyecto', key: 'proyectoId', width: 16 },
    { header: 'Compromiso (de la SI)', key: 'compromiso', width: 40 },
    { header: 'Fecha Inicio', key: 'fechaInicio', width: 16 },
    { header: 'Indicador', key: 'indicador', width: 30 },
    { header: 'Resultado al Cierre', key: 'resultado', width: 40 },
  ];
  for (const m of acMetas) {
    hojaAcMetas.addRow({
      proyectoId: m.actas_cierre?.proyecto_id || '',
      compromiso: m.solicitud_metas?.compromiso || '',
      fechaInicio: m.solicitud_metas?.fecha_inicio || '',
      indicador: m.solicitud_metas?.indicador || '',
      resultado: m.resultado_cierre || '',
    });
  }
  encabezado(hojaAcMetas);

  // ---------- AC - Valores Reales (Valor Total Real) ----------
  const acValores = await prisma.acta_cierre_valores.findMany({
    include: { actas_cierre: { select: { proyecto_id: true } } },
  });
  conteos['AC - Valores Reales'] = acValores.length;

  const hojaAcValores = workbook.addWorksheet('AC - Valores Reales');
  hojaAcValores.columns = [
    { header: 'ID Proyecto', key: 'proyectoId', width: 16 },
    { header: 'Categoría', key: 'categoria', width: 12 },
    { header: 'Real USD', key: 'realUsd', width: 16 },
    { header: 'Real COP', key: 'realCop', width: 18 },
  ];
  for (const v of acValores) {
    hojaAcValores.addRow({
      proyectoId: v.actas_cierre?.proyecto_id || '',
      categoria: v.categoria,
      realUsd: v.real_usd ? Number(v.real_usd) : '',
      realCop: v.real_cop ? Number(v.real_cop) : '',
    });
  }
  encabezado(hojaAcValores);

  // ---------- AC - Flujo de Caja Real ----------
  const acFlujo = await prisma.acta_cierre_flujo_caja.findMany({
    include: { actas_cierre: { select: { proyecto_id: true } } },
    orderBy: [{ anio: 'asc' }, { mes: 'asc' }],
  });
  conteos['AC - Flujo de Caja Real'] = acFlujo.length;

  const hojaAcFlujo = workbook.addWorksheet('AC - Flujo de Caja Real');
  hojaAcFlujo.columns = [
    { header: 'ID Proyecto', key: 'proyectoId', width: 16 },
    { header: 'Tipo', key: 'tipo', width: 12 },
    { header: 'Moneda', key: 'moneda', width: 10 },
    { header: 'Año', key: 'anio', width: 8 },
    { header: 'Mes', key: 'mes', width: 8 },
    { header: 'Monto Real', key: 'montoReal', width: 18 },
  ];
  for (const f of acFlujo) {
    hojaAcFlujo.addRow({
      proyectoId: f.actas_cierre?.proyecto_id || '',
      tipo: f.tipo,
      moneda: f.moneda,
      anio: f.anio,
      mes: f.mes,
      montoReal: f.monto_real ? Number(f.monto_real) : 0,
    });
  }
  encabezado(hojaAcFlujo);

  // ---------- AC - Entregables (con links a anexos) ----------
  const acEntregables = await prisma.acta_cierre_entregables.findMany({
    include: { actas_cierre: { select: { proyecto_id: true } } },
  });
  conteos['AC - Entregables'] = acEntregables.length;

  const hojaAcEntregables = workbook.addWorksheet('AC - Entregables');
  hojaAcEntregables.columns = [
    { header: 'ID Proyecto', key: 'proyectoId', width: 16 },
    { header: 'Equipo/Sistema', key: 'equipo', width: 30 },
    { header: 'Código Activo (Producción)', key: 'codProduccion', width: 22 },
    { header: 'Código Activo (Montaje)', key: 'codMontaje', width: 22 },
    { header: 'Unidad Vida Útil', key: 'unidadVida', width: 15 },
    { header: 'Vida Útil', key: 'vidaUtil', width: 10 },
    { header: 'Observaciones', key: 'observaciones', width: 35 },
    { header: 'Link Anexo', key: 'anexoUrl', width: 40 },
  ];
  for (const e of acEntregables) {
    hojaAcEntregables.addRow({
      proyectoId: e.actas_cierre?.proyecto_id || '',
      equipo: e.equipo_sistema,
      codProduccion: e.codigo_activo_produccion || '',
      codMontaje: e.codigo_activo_montaje || '',
      unidadVida: e.unidad_vida_util || '',
      vidaUtil: e.vida_util ?? '',
      observaciones: e.observaciones || '',
      anexoUrl: e.anexo_url || '',
    });
  }
  encabezado(hojaAcEntregables);

  // ---------- AC - OI Valores Reales ----------
  const acOiValores = await prisma.acta_cierre_oi_valores_reales.findMany({
    include: {
      actas_cierre: { select: { proyecto_id: true } },
      ordenes_internas: { select: { numero_oi: true, nombre_descriptivo: true } },
    },
  });
  conteos['AC - OI Valores Reales'] = acOiValores.length;

  const hojaAcOiValores = workbook.addWorksheet('AC - OI Valores Reales');
  hojaAcOiValores.columns = [
    { header: 'ID Proyecto', key: 'proyectoId', width: 16 },
    { header: 'N° OI', key: 'numeroOi', width: 15 },
    { header: 'Nombre OI', key: 'nombreOi', width: 30 },
    { header: 'Valor Real', key: 'valorReal', width: 18 },
    { header: 'Moneda', key: 'moneda', width: 10 },
  ];
  for (const v of acOiValores) {
    hojaAcOiValores.addRow({
      proyectoId: v.actas_cierre?.proyecto_id || '',
      numeroOi: v.ordenes_internas?.numero_oi || '(sin asignar)',
      nombreOi: v.ordenes_internas?.nombre_descriptivo || '',
      valorReal: v.valor_real ? Number(v.valor_real) : '',
      moneda: v.valor_real_moneda,
    });
  }
  encabezado(hojaAcOiValores);

  // =====================================================================
  // Guardar
  // =====================================================================
  if (!fs.existsSync(CARPETA_EXPORTS)) {
    fs.mkdirSync(CARPETA_EXPORTS, { recursive: true });
  }

  const fecha = new Date().toISOString().slice(0, 10);
  const nombreArchivo = `backup-proyectos-${fecha}.xlsx`;
  const rutaCompleta = path.join(CARPETA_EXPORTS, nombreArchivo);
  await workbook.xlsx.writeFile(rutaCompleta);

  console.log(`✅ Excel generado: exports/${nombreArchivo}`);
  console.log('   Filas por hoja:');
  for (const [hoja, n] of Object.entries(conteos)) {
    console.log(`     - ${hoja}: ${n}`);
  }
}

main()
  .catch((e) => {
    console.error('❌ Error generando el Excel:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
