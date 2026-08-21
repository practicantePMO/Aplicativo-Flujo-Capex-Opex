import { Module } from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { ProyectosController } from './proyectos.controller';
import { PermisosModule } from '../permisos/permisos.module';

@Module({
  imports: [PermisosModule],
  providers: [ProyectosService],
  controllers: [ProyectosController],
})
export class ProyectosModule {}
