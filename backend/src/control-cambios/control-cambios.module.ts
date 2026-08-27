import { Module } from '@nestjs/common';
import { ControlCambiosService } from './control-cambios.service';
import { ControlCambiosConsultaService } from './control-cambios-consulta.service';
import { ControlCambiosHelpersService } from './control-cambios-helpers.service';
import { ControlCambiosController } from './control-cambios.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PermisosModule } from '../permisos/permisos.module';
import { NotificacionesModule } from '../notificaciones/notificaciones.module';

@Module({
  imports: [PrismaModule, PermisosModule, NotificacionesModule],
  controllers: [ControlCambiosController],
  providers: [ControlCambiosService, ControlCambiosConsultaService, ControlCambiosHelpersService],
  exports: [ControlCambiosConsultaService],
})
export class ControlCambiosModule {}