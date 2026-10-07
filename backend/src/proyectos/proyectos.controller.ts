import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { CrearProyectoDto } from './dto/crear-proyecto.dto';
import { FiltrarProyectosDto } from './dto/filtrar-proyectos.dto';
import { AplazarProyectoDto } from './dto/aplazar-proyecto.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import type { RequestConUsuario } from '../auth/interfaces/usuario-autenticado.interface';

@Controller('proyectos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}

  @Post()
  @Roles('ADMIN', 'PMO', 'PM')
  crearProyecto(@Req() req: RequestConUsuario, @Body() dto: CrearProyectoDto) {
    const usuarioId = req.user.userId;
    return this.proyectosService.crearProyecto(usuarioId, dto);
  }

  @Get()
  @Roles('ADMIN', 'PMO', 'DIRECTOR_PMO', 'PM', 'PARTE_INTERESADA', 'GERENCIA', 'PRESIDENCIA', 'CONTROL_GESTION', 'ACTIVOS_FIJOS')
  listarProyectos(@Req() req: RequestConUsuario, @Query() filtros: FiltrarProyectosDto) {
    const usuarioId = req.user.userId;
    return this.proyectosService.listarProyectos(usuarioId, filtros);
  }

  @Get(':id/procesos')
  @Roles('ADMIN', 'PMO', 'DIRECTOR_PMO', 'PM', 'PARTE_INTERESADA', 'GERENCIA', 'PRESIDENCIA', 'CONTROL_GESTION', 'ACTIVOS_FIJOS')
  obtenerProcesos(@Req() req: RequestConUsuario, @Param('id') id: string) {
    return this.proyectosService.obtenerProcesosPorProyecto(req.user.userId, id);
  }

  @Patch(':id/aplazar')
  @Roles('ADMIN', 'PMO')
  aplazarProyecto(@Req() req: RequestConUsuario, @Param('id') id: string, @Body() dto: AplazarProyectoDto) {
    return this.proyectosService.aplazarProyecto(req.user.userId, id, dto);
  }
}