import { Module } from '@nestjs/common';
import { OrdenesInternasService } from './ordenes-internas.service';
import { OrdenesInternasConsultaService } from './ordenes-internas-consulta.service';
import { OrdenesInternasController } from './ordenes-internas.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PermisosModule } from 'src/permisos/permisos.module';
import { NotificacionesModule } from '../notificaciones/notificaciones.module';

@Module({
  imports: [PrismaModule, PermisosModule, NotificacionesModule],
  controllers: [OrdenesInternasController],
  providers: [OrdenesInternasService, OrdenesInternasConsultaService],
  exports: [OrdenesInternasConsultaService],
})
export class OrdenesInternasModule {}
