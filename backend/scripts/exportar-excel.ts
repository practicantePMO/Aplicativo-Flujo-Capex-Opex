// backend/scripts/exportar-excel.ts
//
// Saca TODOS los proyectos y sus 4 procesos (Solicitud de Inversión, Órdenes
// Internas, Controles de Cambio, Actas de Cierre) a un Excel con una hoja por
// tipo. Se corre localmente (usa el mismo DATABASE_URL que "npx prisma migrate dev").
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

  // ---------- Hoja: Proyectos ----------
  const proyectos = await prisma.proyectos.findMany({
    where: { eliminado_el: null },
    include: {
      companias: { select: { nombre: true } },
      usuarios: { select: { nombre: true, email: true } },
    },
    orderBy: { fecha_creacion: 'desc' },
  });

  const hojaProyectos = workbook.addWorksheet('Proyectos');
  hojaProyectos.columns = [
    { header: 'ID Proyecto', key: 'id', width: 16 },
    { header: 'Nombre', key: 'nombre', width: 40 },
    { header: 'Compañía', key: 'compania', width: 15 },
    { header: 'PM Responsable', key: 'pm', width: 25 },
    { header: 'Correo PM', key: 'pmEmail', width: 30 },
    { header: 'Año Proyecto', key: 'anioProyecto', width: 12 },
    { header: 'Año Asignado', key: 'anioAsignado', width: 12 },
    { header: 'Consecutivo', key: 'consecutivo', width: 12 },
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
      fechaCreacion: p.fecha_creacion,
    });
  }
  encabezado(hojaProyectos);

  // ---------- Hoja: Solicitudes de Inversión ----------
  const solicitudes = await prisma.solicitudes_inversion.findMany({
    include: {
      procesos: { select: { estado_actual: true, proyecto_id: true, fecha_creacion: true } },
      usuarios: { select: { nombre: true } },
    },
  });
  const hojaSI = workbook.addWorksheet('Solicitudes de Inversión');
  hojaSI.columns = [
    { header: 'ID Proyecto', key: 'proyectoId', width: 16 },
    { header: 'Estado', key: 'estado', width: 22 },
    { header: 'PM', key: 'pm', width: 25 },
    { header: 'Clasificación', key: 'clasificacion', width: 15 },
    { header: 'Entregable Planeado', key: 'entregable', width: 40 },
    { header: '¿Evaluación Financiera?', key: 'tieneEval', width: 15 },
    { header: 'Fecha Creación', key: 'fecha', width: 18 },
  ];
  for (const s of solicitudes) {
    hojaSI.addRow({
      proyectoId: s.procesos?.proyecto_id || '',
      estado: s.procesos?.estado_actual || '',
      pm: s.usuarios?.nombre || '',
      clasificacion: s.tipo_clasificacion || '',
      entregable: s.entregable_planeado || '',
      tieneEval: s.tiene_evaluacion_financiera ? 'Sí' : 'No',
      fecha: s.procesos?.fecha_creacion || '',
    });
  }
  encabezado(hojaSI);

  // ---------- Hoja: Órdenes Internas ----------
  const ordenes = await prisma.ordenes_internas.findMany({
    include: {
      procesos: { select: { estado_actual: true } },
      grupos_ordenes_internas: { select: { proyecto_id: true, nombre: true } },
      pm: { select: { nombre: true } },
      control_gestion: { select: { nombre: true } },
    },
  });
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
    { header: 'Presupuesto', key: 'presupuesto', width: 15 },
    { header: 'Moneda', key: 'moneda', width: 10 },
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
      presupuesto: o.presupuesto ? Number(o.presupuesto) : '',
      moneda: o.presupuesto_moneda,
    });
  }
  encabezado(hojaOI);

  // ---------- Hoja: Controles de Cambio ----------
  const controles = await prisma.controles_cambio.findMany({
    include: {
      procesos: { select: { estado_actual: true } },
      usuarios: { select: { nombre: true } },
    },
  });
  const hojaCC = workbook.addWorksheet('Controles de Cambio');
  hojaCC.columns = [
    { header: 'ID Proyecto', key: 'proyectoId', width: 16 },
    { header: 'Estado', key: 'estado', width: 22 },
    { header: 'PM', key: 'pm', width: 25 },
    { header: 'Requiere OI', key: 'requiereOi', width: 12 },
    { header: 'Descripción del Cambio', key: 'descripcion', width: 45 },
    { header: 'Tipo', key: 'tipo', width: 15 },
  ];
  for (const c of controles) {
    hojaCC.addRow({
      proyectoId: c.proyecto_id,
      estado: c.procesos?.estado_actual || '',
      pm: c.usuarios?.nombre || '',
      requiereOi: c.requiere_orden_interna ? 'Sí' : 'No',
      descripcion: c.descripcion_cambio || '',
      tipo: c.tipo_control_cambio || 'GENERAL',
    });
  }
  encabezado(hojaCC);

  // ---------- Hoja: Actas de Cierre ----------
  const actas = await prisma.actas_cierre.findMany({
    include: {
      procesos: { select: { estado_actual: true } },
      pm: { select: { nombre: true } },
      control_gestion: { select: { nombre: true } },
    },
  });
  const hojaAC = workbook.addWorksheet('Actas de Cierre');
  hojaAC.columns = [
    { header: 'ID Proyecto', key: 'proyectoId', width: 16 },
    { header: 'Tipo de Cierre', key: 'tipoCierre', width: 15 },
    { header: 'Estado', key: 'estado', width: 22 },
    { header: 'PM', key: 'pm', width: 25 },
    { header: 'Control Gestión', key: 'cg', width: 25 },
  ];
  for (const a of actas) {
    hojaAC.addRow({
      proyectoId: a.proyecto_id,
      tipoCierre: a.tipo_cierre,
      estado: a.procesos?.estado_actual || '',
      pm: a.pm?.nombre || '',
      cg: a.control_gestion?.nombre || '',
    });
  }
  encabezado(hojaAC);

  if (!fs.existsSync(CARPETA_EXPORTS)) {
    fs.mkdirSync(CARPETA_EXPORTS, { recursive: true });
  }

  const fecha = new Date().toISOString().slice(0, 10);
  const nombreArchivo = `backup-proyectos-${fecha}.xlsx`;
  const rutaCompleta = path.join(CARPETA_EXPORTS, nombreArchivo);
  await workbook.xlsx.writeFile(rutaCompleta);
  console.log(`✅ Excel generado: exports/${nombreArchivo}`);
  console.log(`   Proyectos: ${proyectos.length} | SI: ${solicitudes.length} | OI: ${ordenes.length} | CC: ${controles.length} | Actas: ${actas.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Error generando el Excel:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
