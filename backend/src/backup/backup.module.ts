// backend/src/backup/backup.module.ts
//
// No hace falta importar PrismaModule aquí: en este proyecto es @Global()
// (ver prisma/prisma.module.ts), así que PrismaService ya está disponible
// para inyectar en cualquier servicio de cualquier módulo.

import { Module } from '@nestjs/common';
import { BackupController } from './backup.controller';
import { BackupService } from './backup.service';

@Module({
  controllers: [BackupController],
  providers: [BackupService],
})
export class BackupModule {}
