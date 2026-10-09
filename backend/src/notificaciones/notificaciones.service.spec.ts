import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { connect } from 'amqp-connection-manager';
import {
  NotificacionesService,
  EventoNotificacion,
} from './notificaciones.service';

jest.mock('amqp-connection-manager', () => ({ connect: jest.fn() }));

// Pruebas de la cola de notificaciones con RabbitMQ y el correo simulados.
describe('NotificacionesService', () => {
  const channelWrapper = { sendToQueue: jest.fn(), close: jest.fn() };
  const conexion = {
    createChannel: jest.fn<
      typeof channelWrapper,
      [{ setup: (canal: unknown) => Promise<void> }]
    >(() => channelWrapper),
    close: jest.fn(),
  };
  const canal = {
    assertQueue: jest.fn(),
    prefetch: jest.fn(),
    consume: jest.fn(),
    ack: jest.fn(),
  };
  const mailer = { sendMail: jest.fn() };
  const valoresConfig: Record<string, string> = {
    RABBITMQ_URL: 'amqp://localhost',
    NOTIF_MAX_REINTENTOS: '2',
  };
  const config = {
    get: jest.fn(
      (clave: string, porDefecto?: unknown) =>
        valoresConfig[clave] ?? porDefecto,
    ),
    getOrThrow: jest.fn((clave: string) => valoresConfig[clave]),
  };

  let servicio: NotificacionesService;
  let consumir: (msg: unknown) => Promise<void>;

  const mensaje = (contenido: string, headers?: Record<string, unknown>) => ({
    content: Buffer.from(contenido),
    properties: { headers },
  });

  const evento = (tipo: string): EventoNotificacion => ({
    tipo: tipo as EventoNotificacion['tipo'],
    destinatarios: ['a@empresa.com'],
    datos: {
      codigoProyecto: '2026001',
      nombreProyecto: 'Proyecto',
      numeroOi: 'OI-1',
      nombreUsuario: 'Ana',
    },
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    (connect as jest.Mock).mockReturnValue(conexion);
    servicio = new NotificacionesService(
      config as unknown as ConfigService,
      mailer as unknown as MailerService,
    );
    servicio.onModuleInit();
    // Ejecuta la configuración del canal como lo haría amqp-connection-manager al conectar
    const { setup } = conexion.createChannel.mock.calls[0][0];
    await setup(canal);
    consumir = (canal.consume.mock.calls[0] as unknown[])[1] as (
      msg: unknown,
    ) => Promise<void>;
  });

  it('configura las colas principal, de reintentos y de fallidos', () => {
    expect(canal.assertQueue).toHaveBeenCalledTimes(3);
    expect(canal.prefetch).toHaveBeenCalledWith(10);
  });

  it('encola un evento y registra el error si falla', async () => {
    await servicio.encolarNotificacion(evento('NUEVA_SOLICITUD'));
    expect(channelWrapper.sendToQueue).toHaveBeenCalledWith(
      'cola_notificaciones_pmo',
      expect.anything(),
      expect.anything(),
    );

    channelWrapper.sendToQueue.mockRejectedValueOnce(new Error('sin conexión'));
    await expect(
      servicio.encolarNotificacion(evento('NUEVA_SOLICITUD')),
    ).resolves.toBeUndefined();
  });

  it('ignora mensajes vacíos', async () => {
    await consumir(null);
    expect(canal.ack).not.toHaveBeenCalled();
  });

  it('manda a la cola de fallidos un mensaje que no es JSON', async () => {
    await consumir(mensaje('esto no es json'));
    expect(channelWrapper.sendToQueue).toHaveBeenCalledWith(
      'cola_notificaciones_pmo_fallidos',
      expect.objectContaining({ error: 'JSON_PARSE_ERROR' }),
      expect.anything(),
    );
    expect(canal.ack).toHaveBeenCalled();
  });

  it('manda a fallidos un tipo de evento desconocido', async () => {
    await consumir(mensaje(JSON.stringify(evento('NO_EXISTE'))));
    expect(channelWrapper.sendToQueue).toHaveBeenCalledWith(
      'cola_notificaciones_pmo_fallidos',
      expect.anything(),
      expect.objectContaining({ headers: { 'x-error': 'UNKNOWN_EVENT_TYPE' } }),
    );
  });

  it.each([
    'NUEVA_SOLICITUD',
    'SOLICITUD_APROBADA',
    'SOLICITUD_RECHAZADA',
    'USUARIO_NUEVO_PENDIENTE',
    'ROL_ASIGNADO',
    'OI_PENDIENTE',
    'OI_APROBADA',
    'OI_RECHAZADA',
    'CC_NUEVA_ETAPA',
    'CC_APROBADO',
    'CC_RECHAZADO',
    'AC_NUEVA_ETAPA',
    'AC_APROBADO',
    'AC_RECHAZADO',
  ])('envía el correo con la plantilla de %s', async (tipo) => {
    await consumir(mensaje(JSON.stringify(evento(tipo)), { 'x-retries': 0 }));
    expect(mailer.sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: ['a@empresa.com'],
        html: expect.any(String),
      }),
    );
    expect(canal.ack).toHaveBeenCalled();
  });

  it('reintenta si falla el correo y lo manda a fallidos al superar los reintentos', async () => {
    mailer.sendMail.mockRejectedValue(new Error('SMTP caído'));
    await consumir(mensaje(JSON.stringify(evento('NUEVA_SOLICITUD'))));
    expect(channelWrapper.sendToQueue).toHaveBeenCalledWith(
      'cola_notificaciones_pmo_retry',
      expect.anything(),
      expect.anything(),
    );

    await consumir(
      mensaje(JSON.stringify(evento('NUEVA_SOLICITUD')), { 'x-retries': 1 }),
    );
    expect(channelWrapper.sendToQueue).toHaveBeenCalledWith(
      'cola_notificaciones_pmo_fallidos',
      expect.anything(),
      expect.objectContaining({
        headers: expect.objectContaining({ 'x-error': 'SMTP caído' }),
      }),
    );
    mailer.sendMail.mockReset();
  });

  it('cierra la conexión al apagar el módulo', async () => {
    await servicio.onModuleDestroy();
    expect(channelWrapper.close).toHaveBeenCalled();
    expect(conexion.close).toHaveBeenCalled();
  });
});
