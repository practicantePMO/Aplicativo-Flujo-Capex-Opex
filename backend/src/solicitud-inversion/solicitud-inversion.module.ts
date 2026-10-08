import { Module } from '@nestjs/common';
import { SolicitudInversionService } from './solicitud-inversion.service';
import { SolicitudInversionConsultaService } from './solicitud-inversion-consulta.service';
import { SolicitudInversionHelpersService } from './solicitud-inversion-helpers.service';
import { SolicitudInversionController } from './solicitud-inversion.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PermisosModule } from 'src/permisos/permisos.module';
import { NotificacionesModule } from '../notificaciones/notificaciones.module';

@Module({
  imports: [PrismaModule, PermisosModule, NotificacionesModule],
  controllers: [SolicitudInversionController],
  providers: [SolicitudInversionService, SolicitudInversionConsultaService, SolicitudInversionHelpersService],
  exports: [SolicitudInversionConsultaService],
})
// skipcq: JS-0327 -- Los módulos de NestJS son clases vacías con @Module por diseño del framework.
export class SolicitudInversionModule {}
