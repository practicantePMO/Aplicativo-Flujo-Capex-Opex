import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
export interface EventoNotificacion {
    tipo: 'NUEVA_SOLICITUD' | 'SOLICITUD_APROBADA' | 'SOLICITUD_RECHAZADA';
    destinatarios: string[];
    datos: Record<string, any>;
}
export declare class NotificacionesService implements OnModuleInit, OnModuleDestroy {
    private readonly configService;
    private readonly mailerService;
    private readonly logger;
    private connection;
    private channelWrapper;
    private readonly queueName;
    private readonly retryQueue;
    private readonly deadLetterQueue;
    private readonly maxReintentos;
    private readonly pausaMs;
    constructor(configService: ConfigService, mailerService: MailerService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    private renderTemplate;
    encolarNotificacion(evento: EventoNotificacion): Promise<void>;
    private procesarMensaje;
}
