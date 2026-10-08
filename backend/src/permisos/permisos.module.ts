import { Module } from '@nestjs/common';
import { PermisosService } from './permisos.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PermisosService],
  exports: [PermisosService],
})

// skipcq: JS-0327 -- Los módulos de NestJS son clases vacías con @Module por diseño del framework.
export class PermisosModule {}
