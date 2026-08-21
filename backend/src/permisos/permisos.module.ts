import { Module } from '@nestjs/common';
import { PermisosService } from './permisos.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PermisosService],
  exports: [PermisosService],
})
export class PermisosModule {}
