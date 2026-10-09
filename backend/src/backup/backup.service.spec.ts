import ExcelJS from 'exceljs';
import { BackupService } from './backup.service';
import { PrismaService } from '../prisma/prisma.service';

describe('BackupService', () => {
  it('genera el Excel con las 15 hojas del respaldo, en orden', async () => {
    // Prisma "falso": cualquier tabla que se consulte devuelve una lista vacía.
    const tablaVacia = { findMany: jest.fn().mockResolvedValue([]) };
    const prismaFalso = new Proxy({}, { get: () => tablaVacia });
    const servicio = new BackupService(prismaFalso as unknown as PrismaService);

    const buffer = await servicio.generarExcel();

    const libro = new ExcelJS.Workbook();
    await libro.xlsx.load(new Uint8Array(buffer).buffer);
    expect(libro.worksheets.map((hoja) => hoja.name)).toEqual([
      'Proyectos',
      'Solicitudes de Inversión',
      'SI - Flujo de Caja',
      'SI - Valores',
      'SI - Metas',
      'Órdenes Internas',
      'OI - Valores',
      'Controles de Cambio',
      'CC - Anexos',
      'Actas de Cierre',
      'AC - Metas',
      'AC - Valores Reales',
      'AC - Flujo de Caja Real',
      'AC - Entregables',
      'AC - OI Valores Reales',
    ]);
  });

  it('deja las celdas vacías cuando a una fila le faltan datos opcionales', async () => {
    // Cada tabla devuelve una fila sin datos (solo la lista de OI del CC, que siempre viene,
    // con una OI todavía sin número): todos los campos opcionales quedan en blanco.
    const filaVacia = { ordenes_internas: [{}] };
    const tablaConFilaVacia = {
      findMany: jest.fn().mockResolvedValue([filaVacia]),
    };
    const prismaFalso = new Proxy({}, { get: () => tablaConFilaVacia });
    const servicio = new BackupService(prismaFalso as unknown as PrismaService);

    const buffer = await servicio.generarExcel();

    const libro = new ExcelJS.Workbook();
    await libro.xlsx.load(new Uint8Array(buffer).buffer);
    // cada hoja tiene el encabezado y la fila (vacía) de datos
    for (const hoja of libro.worksheets) {
      expect(hoja.rowCount).toBe(2);
    }
  });
});
