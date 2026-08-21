"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NotificacionesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificacionesService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mailer_1 = require("@nestjs-modules/mailer");
const amqp = __importStar(require("amqp-connection-manager"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const handlebars = __importStar(require("handlebars"));
let NotificacionesService = NotificacionesService_1 = class NotificacionesService {
    configService;
    mailerService;
    logger = new common_1.Logger(NotificacionesService_1.name);
    connection;
    channelWrapper;
    queueName;
    retryQueue;
    deadLetterQueue;
    maxReintentos;
    pausaMs;
    constructor(configService, mailerService) {
        this.configService = configService;
        this.mailerService = mailerService;
        this.queueName = this.configService.get('RABBITMQ_QUEUE', 'cola_notificaciones_pmo');
        this.retryQueue = `${this.queueName}_retry`;
        this.deadLetterQueue = `${this.queueName}_fallidos`;
        this.maxReintentos = Number(this.configService.get('NOTIF_MAX_REINTENTOS', 3));
        this.pausaMs = Number(this.configService.get('NOTIF_PAUSA_MS', 5000));
    }
    async onModuleInit() {
        const rabbitUrl = this.configService.get('RABBITMQ_URL', 'amqp://guest:guest@localhost:5672');
        this.connection = amqp.connect([rabbitUrl]);
        this.channelWrapper = this.connection.createChannel({
            json: true,
            setup: async (channel) => {
                await channel.assertQueue(this.queueName, { durable: true });
                await channel.assertQueue(this.deadLetterQueue, { durable: true });
                await channel.assertQueue(this.retryQueue, {
                    durable: true,
                    deadLetterExchange: '',
                    deadLetterRoutingKey: this.queueName,
                    messageTtl: this.pausaMs,
                });
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
    renderTemplate(templateName, datos) {
        const posiblesRutas = [
            path.join(process.cwd(), 'src', 'notificaciones', 'templates', `${templateName}.hbs`),
            path.join(__dirname, 'templates', `${templateName}.hbs`),
            path.join(process.cwd(), 'dist', 'src', 'notificaciones', 'templates', `${templateName}.hbs`),
        ];
        const templatePath = posiblesRutas.find((ruta) => fs.existsSync(ruta));
        if (!templatePath) {
            throw new Error(`Plantilla no existe: ${templateName}.hbs`);
        }
        return handlebars.compile(fs.readFileSync(templatePath, 'utf8'))(datos);
    }
    async encolarNotificacion(evento) {
        try {
            await this.channelWrapper.sendToQueue(this.queueName, evento, { persistent: true, headers: { 'x-retries': 0 } });
            this.logger.log(`Evento [${evento.tipo}] encolado exitosamente.`);
        }
        catch (error) {
            this.logger.error(`Error al encolar evento [${evento.tipo}]:`, error);
        }
    }
    async procesarMensaje(channel, msg) {
        if (!msg)
            return;
        let contenido;
        const headers = msg.properties.headers || {};
        const intentosActuales = (headers['x-retries'] || 0) + 1;
        try {
            contenido = JSON.parse(msg.content.toString());
        }
        catch (parseError) {
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
            };
            const config = configMap[contenido.tipo];
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
        }
        catch (error) {
            this.logger.warn(`Falla SMTP (Intento ${intentosActuales}): ${error.message}`);
            if (intentosActuales < this.maxReintentos) {
                await this.channelWrapper.sendToQueue(this.retryQueue, contenido, {
                    persistent: true,
                    headers: { ...headers, 'x-retries': intentosActuales },
                });
            }
            else {
                this.logger.error(`Max reintentos superado. Moviendo a DLQ: ${this.deadLetterQueue}`);
                await this.channelWrapper.sendToQueue(this.deadLetterQueue, contenido, {
                    persistent: true,
                    headers: { ...headers, 'x-error': error.message },
                });
            }
            channel.ack(msg);
        }
    }
};
exports.NotificacionesService = NotificacionesService;
exports.NotificacionesService = NotificacionesService = NotificacionesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        mailer_1.MailerService])
], NotificacionesService);
//# sourceMappingURL=notificaciones.service.js.map