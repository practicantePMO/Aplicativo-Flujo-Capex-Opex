import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import * as amqp from 'amqp-connection-manager';
import { ChannelWrapper } from 'amqp-connection-manager';
import { ConfirmChannel, ConsumeMessage } from 'amqplib';
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';

export interface EventoNotificacion {
  tipo: 'NUEVA_SOLICITUD' | 'SOLICITUD_APROBADA' | 'SOLICITUD_RECHAZADA' | 'USUARIO_NUEVO_PENDIENTE' | 'ROL_ASIGNADO';
  destinatarios: string[];
  datos: Record<string, any>;
}

@Injectable()
export class NotificacionesService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(NotificacionesService.name);
  private connection: amqp.AmqpConnectionManager;
  private channelWrapper: ChannelWrapper;

  private readonly queueName: string;
  private readonly retryQueue: string;
  private readonly deadLetterQueue: string;
  private readonly maxReintentos: number;
  private readonly pausaMs: number;

  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {
    this.queueName = this.configService.get<string>('RABBITMQ_QUEUE', 'cola_notificaciones_pmo');
    this.retryQueue = `${this.queueName}_retry`;
    this.deadLetterQueue = `${this.queueName}_fallidos`;
    this.maxReintentos = Number(this.configService.get<number>('NOTIF_MAX_REINTENTOS', 3));
    this.pausaMs = Number(this.configService.get<number>('NOTIF_PAUSA_MS', 5000));
  }

  async onModuleInit() {
    const rabbitUrl = this.configService.get<string>('RABBITMQ_URL', 'amqp://guest:guest@localhost:5672');

    this.connection = amqp.connect([rabbitUrl]);
    this.channelWrapper = this.connection.createChannel({
      json: true,
      setup: async (channel: ConfirmChannel) => {
        // 1. Cola principal y de errores
        await channel.assertQueue(this.queueName, { durable: true });
        await channel.assertQueue(this.deadLetterQueue, { durable: true });

        // 2. 🟢 NUEVO: Cola de reintentos nativa con TTL
        await channel.assertQueue(this.retryQueue, {
          durable: true,
          deadLetterExchange: '', // Exchange por defecto
          deadLetterRoutingKey: this.queueName, // Cuando pase el TTL, regresa a la cola principal
          messageTtl: this.pausaMs, // Tiempo de espera (Backoff) nativo en RabbitMQ
        });

        // 3. 🟢 NUEVO: Control de flujo (Prefetch) para no saturar la memoria
        await channel.prefetch(10); 

        await channel.consume(this.queueName, (msg) => this.procesarMensaje(channel, msg));
      },
    });

    this.logger.log('🐰 Conectado exitosamente a RabbitMQ (DLX Nativo Configurado).');
  }

  async onModuleDestroy() {
    await this.channelWrapper.close();
    await this.connection.close();
  }

  private renderTemplate(templateName: string, datos: Record<string, any>): string {
    // 🟢 Lista de rutas donde buscar la plantilla (dist y src directo)
    const posiblesRutas = [
      path.join(process.cwd(), 'src', 'notificaciones', 'templates', `${templateName}.hbs`), // 1. Directo en tu carpeta src (Garantizado)
      path.join(__dirname, 'templates', `${templateName}.hbs`),                              // 2. Ruta dist estándar
      path.join(process.cwd(), 'dist', 'src', 'notificaciones', 'templates', `${templateName}.hbs`), // 3. Ruta dist/src
    ];

    // Busca la primera ruta que exista físicamente en el disco
    const templatePath = posiblesRutas.find((ruta) => fs.existsSync(ruta));

    if (!templatePath) {
      throw new Error(`Plantilla no existe: ${templateName}.hbs`);
    }

    return handlebars.compile(fs.readFileSync(templatePath, 'utf8'))(datos);
  }

  async encolarNotificacion(evento: EventoNotificacion) {
    try {
      await this.channelWrapper.sendToQueue(this.queueName, evento, { persistent: true, headers: { 'x-retries': 0 } });
      this.logger.log(`Evento [${evento.tipo}] encolado exitosamente.`);
    } catch (error) {
      this.logger.error(`Error al encolar evento [${evento.tipo}]:`, error);
    }
  }

  private async procesarMensaje(channel: ConfirmChannel, msg: ConsumeMessage | null) {
    if (!msg) return;

    let contenido: EventoNotificacion;
    const headers = msg.properties.headers || {};
    const intentosActuales = (headers['x-retries'] || 0) + 1;

    // 🟢 CORRECCIÓN 1: Poison Message asíncrono y seguro para channelWrapper
    try {
      contenido = JSON.parse(msg.content.toString());
    } catch (parseError) {
      this.logger.error('Poison Message recibido (No es JSON). Descartando a DLQ.', parseError);
      await this.channelWrapper.sendToQueue(this.deadLetterQueue, {
        raw_message: msg.content.toString(),
        error: 'JSON_PARSE_ERROR'
      }, { persistent: true, headers: { 'x-error': 'JSON_PARSE_ERROR' } });
      channel.ack(msg);
      return;
    }

    try {
      this.logger.log(`Procesando notificación [${contenido.tipo}] - Intento ${intentosActuales}/${this.maxReintentos}`);

      const configMap = {
        NUEVA_SOLICITUD: { template: 'nueva-solicitud', subject: `📌 Tarea Pendiente: ${contenido.datos.codigoProyecto}` },
        SOLICITUD_APROBADA: { template: 'solicitud-aprobada', subject: `✅ Aprobada: ${contenido.datos.codigoProyecto}` },
        SOLICITUD_RECHAZADA: { template: 'solicitud-rechazada', subject: `❌ Devuelta: ${contenido.datos.codigoProyecto}` },
        USUARIO_NUEVO_PENDIENTE: { template: 'usuario-nuevo-pendiente', subject: `👤 Nuevo Usuario Pendiente` },
        ROL_ASIGNADO: { template: 'rol-asignado', subject: `🔑 Se te asignó un rol en el Sistema de Proyectos` },
      };
      
      const config = configMap[contenido.tipo];

      // 🟢 CORRECCIÓN 2: Validar que el tipo de evento exista y fallar rápido
      if (!config) {
        this.logger.error(`Tipo de evento desconocido [${contenido.tipo}]. Moviendo directo a DLQ sin reintentos.`);
        await this.channelWrapper.sendToQueue(this.deadLetterQueue, contenido, { persistent: true, headers: { 'x-error': 'UNKNOWN_EVENT_TYPE' } });
        channel.ack(msg);
        return;
      }

      await this.mailerService.sendMail({
        to: contenido.destinatarios,
        subject: config.subject,
        html: this.renderTemplate(config.template, contenido.datos),
      });

      this.logger.log(`Correo enviado a: ${contenido.destinatarios.join(', ')}`);
      channel.ack(msg);
    } catch (error) {
      this.logger.error(`Falla SMTP (Intento ${intentosActuales}): ${error.message}`, error.stack);

      if (intentosActuales < this.maxReintentos) {
        await this.channelWrapper.sendToQueue(this.retryQueue, contenido, {
          persistent: true,
          headers: { ...headers, 'x-retries': intentosActuales },
        });
      } else {
        this.logger.error(`Max reintentos superado. Moviendo a DLQ: ${this.deadLetterQueue}`);
        await this.channelWrapper.sendToQueue(this.deadLetterQueue, contenido, {
          persistent: true,
          headers: { ...headers, 'x-error': error.message },
        });
      }
      
      channel.ack(msg);
    }
  }
}
