import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

export const winstonConfig: winston.LoggerOptions = {
  transports: [
    // 1) Consola: igual de legible que hoy, en desarrollo
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike('SistemaProyectos', {
          colors: true,
          prettyPrint: true,
        }),
      ),
    }),

    // 2) Archivo con TODO (info, warn, error), rotado por día
    new winston.transports.DailyRotateFile({
      dirname: 'logs',
      filename: 'combinado-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d', // se borran solos después de 14 días
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),

    // 3) Archivo SOLO con errores, para poder revisar rápido
    //    qué salió mal sin tener que buscar entre miles de líneas normales
    new winston.transports.DailyRotateFile({
      dirname: 'logs',
      filename: 'errores-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxFiles: '30d', // los errores los guardamos más tiempo que lo normal
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],
};