import { Module } from '@nestjs/common';
import { BackupController } from './backup.controller';
import { BackupService } from './backup.service';
import { PermisosModule } from '../permisos/permisos.module';

@Module({
  imports: [PermisosModule],
  controllers: [BackupController],
  providers: [BackupService],
})

// skipcq: JS-0327 -- Los módulos de NestJS son clases vacías con @Module por diseño del framework.
export class BackupModule {}