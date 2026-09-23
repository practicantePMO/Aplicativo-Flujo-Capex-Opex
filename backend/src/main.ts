import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import helmet from 'helmet';
import { winstonConfig } from './logger/winston.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });
  const logger = new Logger('Bootstrap');

  app.enableShutdownHooks();

  // Cabeceras de seguridad HTTP (X-Content-Type-Options, HSTS, etc.).
  // "same-site" permite que el frontend (otro puerto/subdominio del mismo
  // sitio) siga consumiendo la API y descargando el Excel sin problema.
  app.use(helmet({ crossOriginResourcePolicy: { policy: 'same-site' } }));

  // Detrás de un proxy / balanceador (nginx, IIS, Azure...) la IP real del
  // usuario llega en X-Forwarded-For. Sin esto, TODOS los usuarios parecen
  // venir de la IP del proxy y el límite de peticiones los bloquea juntos.
  // En local no se define y todo queda igual que antes.
  if (process.env.TRUST_PROXY) {
    app.set('trust proxy', Number(process.env.TRUST_PROXY) || process.env.TRUST_PROXY);
  }

  if (process.env.ALLOW_DEV_LOGIN === 'true') {
    logger.warn(
      '⚠️  ALLOW_DEV_LOGIN=true: /auth/login-dev está ACTIVO (cualquiera puede entrar como cualquier usuario). NUNCA lo actives en producción.',
    );
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') ?? 'http://localhost:5173',
    credentials: true,
  });

  await app.listen(Number(process.env.PORT) || 3000);
}
bootstrap();