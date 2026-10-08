import { Module } from '@nestjs/common';
import { PendientesController } from './pendientes.controller';
import { PendientesService } from './pendientes.service';
import { SolicitudInversionModule } from '../solicitud-inversion/solicitud-inversion.module';
import { OrdenesInternasModule } from '../ordenes-internas/ordenes-internas.module';
import { ControlCambiosModule } from '../control-cambios/control-cambios.module';
import { ActasCierreModule } from '../acta-cierre/actas-cierre.module';

@Module({
  imports: [SolicitudInversionModule, OrdenesInternasModule, ControlCambiosModule, ActasCierreModule],
  controllers: [PendientesController],
  providers: [PendientesService],
})

// skipcq: JS-0327 -- Los módulos de NestJS son clases vacías con @Module por diseño del framework.
export class PendientesModule {}