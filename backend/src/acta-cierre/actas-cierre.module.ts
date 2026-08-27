import { Module } from '@nestjs/common';
import { ActasCierreService } from './actas-cierre.service';
import { ActasCierreConsultaService } from './actas-cierre-consulta.service';
import { ActasCierreHelpersService } from './actas-cierre-helpers.service';
import { ActasCierreController } from './actas-cierre.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PermisosModule } from '../permisos/permisos.module';
import { NotificacionesModule } from '../notificaciones/notificaciones.module';

@Module({
  imports: [PrismaModule, PermisosModule, NotificacionesModule],
  controllers: [ActasCierreController],
  providers: [ActasCierreService, ActasCierreConsultaService, ActasCierreHelpersService],
  exports: [ActasCierreConsultaService],
})
export class ActasCierreModule {}