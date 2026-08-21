import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { SolicitudInversionService } from './solicitud-inversion.service';
import { SolicitudInversionHelpersService } from './solicitud-inversion-helpers.service';
import { PrismaService } from '../prisma/prisma.service';
import { PermisosService } from '../permisos/permisos.service';
import { NotificacionesService } from '../notificaciones/notificaciones.service';

describe('SolicitudInversionService', () => {
  let service: SolicitudInversionService;

  const prismaMock = {
    $transaction: jest.fn(),
  };

  const permisosMock = {
    esAdminGlobal: jest.fn(),
  };

  const notificacionesMock = {
    encolarNotificacion: jest.fn(),
  };

  // 🎭 Ahora también simulamos SolicitudInversionHelpersService — desde la
  // división en archivos, enviarARevision ya no le habla directo a Prisma,
  // le pide el proceso a este helper.
  const helpersMock = {
    obtenerProcesoConCompania: jest.fn(),
    obtenerEmailsPorRol: jest.fn().mockResolvedValue([]),
    obtenerEmailsAsignados: jest.fn().mockResolvedValue([]),
    validarPermisoParaEtapa: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SolicitudInversionService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: PermisosService, useValue: permisosMock },
        { provide: NotificacionesService, useValue: notificacionesMock },
        { provide: SolicitudInversionHelpersService, useValue: helpersMock },
      ],
    }).compile();

    service = module.get<SolicitudInversionService>(SolicitudInversionService);

    jest.clearAllMocks();
    // clearAllMocks borra también el mockResolvedValue por defecto de obtenerEmailsPorRol,
    // así que lo volvemos a fijar aquí para que todas las pruebas lo tengan listo.
    helpersMock.obtenerEmailsPorRol.mockResolvedValue([]);
  });

  describe('enviarARevision', () => {
    const PROCESO_ID = 5;
    const PM_RESPONSABLE_ID = 2; // Laura
    const OTRO_USUARIO_ID = 3; // Carlos, no es el PM responsable

    // Esto simula exactamente lo que devuelve helpers.obtenerProcesoConCompania:
    // { proceso, proyecto, companiaId } — no un objeto "proceso" suelto como antes.
    const respuestaHelperBorrador = {
      proceso: {
        id: PROCESO_ID,
        tipo_proceso: 'SOLICITUD_INVERSION',
        estado_actual: 'BORRADOR',
        eliminado_el: null,
        solicitudes_inversion: { responsable_pm_id: PM_RESPONSABLE_ID, usuarios: { id: PM_RESPONSABLE_ID, nombre: 'Laura', email: 'laura.pm@empresa.com' } },
      },
      proyecto: { id: '2026005', nombre: 'Proyecto de prueba', consecutivo: 1, compania_id: 1 },
      companiaId: 1,
    };

    it('debe permitir que el PM responsable envíe su propia solicitud en BORRADOR', async () => {
      helpersMock.obtenerProcesoConCompania.mockResolvedValue(respuestaHelperBorrador);
      permisosMock.esAdminGlobal.mockResolvedValue(false);

      prismaMock.$transaction.mockImplementation(async (callback) => {
        const txMock = {
          procesos: { updateMany: jest.fn().mockResolvedValue({ count: 1 }) },
          historico_aprobaciones: { create: jest.fn().mockResolvedValue({}) },
        };
        return callback(txMock);
      });

      const resultado = await service.enviarARevision(PROCESO_ID, PM_RESPONSABLE_ID);

      expect(resultado.estado_actual).toBe('PENDIENTE_PMO');
    });

    it('NO debe permitir que un usuario que no es el PM responsable envíe la solicitud', async () => {
      helpersMock.obtenerProcesoConCompania.mockResolvedValue(respuestaHelperBorrador);
      permisosMock.esAdminGlobal.mockResolvedValue(false); // Carlos no es admin

      await expect(
        service.enviarARevision(PROCESO_ID, OTRO_USUARIO_ID),
      ).rejects.toThrow(BadRequestException);

      await expect(
        service.enviarARevision(PROCESO_ID, OTRO_USUARIO_ID),
      ).rejects.toThrow('Solo el PM responsable puede enviar esta solicitud.');
    });

    it('SÍ debe permitir que un ADMIN envíe la solicitud aunque no sea el PM responsable', async () => {
      helpersMock.obtenerProcesoConCompania.mockResolvedValue(respuestaHelperBorrador);
      permisosMock.esAdminGlobal.mockResolvedValue(true); // Ana es admin

      prismaMock.$transaction.mockImplementation(async (callback) => {
        const txMock = {
          procesos: { updateMany: jest.fn().mockResolvedValue({ count: 1 }) },
          historico_aprobaciones: { create: jest.fn().mockResolvedValue({}) },
        };
        return callback(txMock);
      });

      const resultado = await service.enviarARevision(PROCESO_ID, 1 /* Ana, ADMIN */);

      expect(resultado.estado_actual).toBe('PENDIENTE_PMO');
    });

    it('NO debe permitir enviar una solicitud que ya no está en BORRADOR', async () => {
      const respuestaHelperEnviado = {
        ...respuestaHelperBorrador,
        proceso: { ...respuestaHelperBorrador.proceso, estado_actual: 'PENDIENTE_PMO' },
      };
      helpersMock.obtenerProcesoConCompania.mockResolvedValue(respuestaHelperEnviado);

      await expect(
        service.enviarARevision(PROCESO_ID, PM_RESPONSABLE_ID),
      ).rejects.toThrow('Solo enviar solicitudes en estado BORRADOR.');

      expect(prismaMock.$transaction).not.toHaveBeenCalled();
    });
  });
});