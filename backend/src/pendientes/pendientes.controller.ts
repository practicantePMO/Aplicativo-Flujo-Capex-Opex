import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { PendientesService } from './pendientes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('pendientes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PendientesController {
  constructor(private readonly service: PendientesService) {}

  @Get('mis-pendientes')
  @Roles('PM', 'PMO', 'DIRECTOR_PMO', 'PARTE_INTERESADA', 'GERENCIA', 'PRESIDENCIA', 'CONTROL_GESTION', 'ADMIN')
  async obtenerMisPendientes(@Req() req: any) {
    return this.service.obtenerMisPendientes(req.user.userId);
  }
}