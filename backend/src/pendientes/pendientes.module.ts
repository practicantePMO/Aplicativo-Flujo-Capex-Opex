import { Module } from '@nestjs/common';
import { PendientesController } from './pendientes.controller';
import { PendientesService } from './pendientes.service';
import { SolicitudInversionModule } from '../solicitud-inversion/solicitud-inversion.module';
import { OrdenesInternasModule } from '../ordenes-internas/ordenes-internas.module';

@Module({
  imports: [SolicitudInversionModule, OrdenesInternasModule],
  controllers: [PendientesController],
  providers: [PendientesService],
})
export class PendientesModule {}
