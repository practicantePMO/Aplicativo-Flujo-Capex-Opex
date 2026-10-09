import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { ProyectosModule } from './proyectos/proyectos.module';
import { CatalogosModule } from './catalogos/catalogos.module';
import { SolicitudInversionModule } from './solicitud-inversion/solicitud-inversion.module';
import { OrdenesInternasModule } from './ordenes-internas/ordenes-internas.module';
import { ControlCambiosModule } from './control-cambios/control-cambios.module';
import { PendientesModule } from './pendientes/pendientes.module';
import { PermisosModule } from './permisos/permisos.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';
import { CompaniasModule } from './companias/companias.module';
import { ActasCierreModule } from './acta-cierre/actas-cierre.module';
import { BackupModule } from './backup/backup.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: Number(process.env.THROTTLE_LIMIT) || 300,
      },
    ]),
    PrismaModule,
    UsuariosModule,
    AuthModule,
    ProyectosModule,
    CatalogosModule,
    SolicitudInversionModule,
    OrdenesInternasModule,
    ControlCambiosModule,
    ActasCierreModule,
    PendientesModule,
    PermisosModule,
    NotificacionesModule,
    CompaniasModule,
    BackupModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, 
    },
  ],
})

// skipcq: JS-0327 -- Los módulos de NestJS son clases vacías con @Module por diseño del framework.
export class AppModule {}