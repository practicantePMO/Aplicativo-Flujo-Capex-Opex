import { Module } from '@nestjs/common';
import { BackupController } from './backup.controller';
import { BackupService } from './backup.service';
import { PermisosModule } from '../permisos/permisos.module';

@Module({
  imports: [PermisosModule],
  controllers: [BackupController],
  providers: [BackupService],
})
export class BackupModule {}