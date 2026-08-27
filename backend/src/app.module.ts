import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // ventana de 60 segundos
        limit: 30,  // máximo 30 peticiones por IP en esa ventana, para el resto de la app
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
    PendientesModule,
    PermisosModule,
    NotificacionesModule,
    CompaniasModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, // aplica el límite a TODAS las rutas por defecto
    },
  ],
})
export class AppModule {}