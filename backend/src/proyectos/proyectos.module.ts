import { Module } from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { ProyectosController } from './proyectos.controller';
import { PermisosModule } from '../permisos/permisos.module';

@Module({
  imports: [PermisosModule],
  providers: [ProyectosService],
  controllers: [ProyectosController],
})

// skipcq: JS-0327 -- Los módulos de NestJS son clases vacías con @Module por diseño del framework.
export class ProyectosModule {}
