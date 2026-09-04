import { Controller, Post, Get, Put, Body, Param, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { ActasCierreService } from './actas-cierre.service';
import { ActasCierreConsultaService } from './actas-cierre-consulta.service';
import { CrearActaCierreDto } from './dto/crear-acta-cierre.dto';
import { AprobarActaCierreDto, RechazarActaCierreDto } from './dto/cambiar-estado-acta-cierre.dto';
import { ActualizarPartesInteresadasActaCierreDto } from './dto/actualizar-partes-interesadas-acta-cierre.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('actas-cierre')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ActasCierreController {
  constructor(
    private readonly service: ActasCierreService,
    private readonly consulta: ActasCierreConsultaService,
  ) {}

  @Post()
  @Roles('PM', 'ADMIN')
  async crear(@Req() req: any, @Body() dto: CrearActaCierreDto) {
    return this.service.crear(req.user.userId, dto);
  }

  @Get('mis-pendientes')
  @Roles('PM', 'PMO', 'DIRECTOR_PMO', 'CONTROL_GESTION', 'ACTIVOS_FIJOS', 'PARTE_INTERESADA', 'GERENCIA', 'PRESIDENCIA', 'ADMIN')
  async obtenerMisPendientes(@Req() req: any) {
    return this.consulta.obtenerMisPendientes(req.user.userId);
  }

  @Get('proyecto/:proyectoId')
  @Roles('PM', 'PMO', 'DIRECTOR_PMO', 'CONTROL_GESTION', 'ACTIVOS_FIJOS', 'PARTE_INTERESADA', 'GERENCIA', 'PRESIDENCIA', 'ADMIN')
  async obtenerPorProyecto(@Req() req: any, @Param('proyectoId') proyectoId: string) {
    return this.consulta.obtenerPorProyecto(req.user.userId, proyectoId);
  }

  @Get(':procesoId')
  @Roles('PM', 'PMO', 'DIRECTOR_PMO', 'CONTROL_GESTION', 'ACTIVOS_FIJOS', 'PARTE_INTERESADA', 'GERENCIA', 'PRESIDENCIA', 'ADMIN')
  async obtenerDetalle(@Req() req: any, @Param('procesoId', ParseIntPipe) procesoId: number) {
    return this.consulta.obtenerDetalle(req.user.userId, procesoId);
  }

  @Put('borrador/:procesoId')
  @Roles('PM', 'ADMIN')
  async actualizarBorrador(@Req() req: any, @Param('procesoId', ParseIntPipe) procesoId: number, @Body() dto: CrearActaCierreDto) {
    return this.service.actualizarBorrador(procesoId, req.user.userId, dto);
  }

  @Post(':procesoId/enviar')
  @Roles('PM', 'ADMIN')
  async enviarARevision(@Req() req: any, @Param('procesoId', ParseIntPipe) procesoId: number) {
    return this.service.enviarARevision(procesoId, req.user.userId);
  }

  @Post(':procesoId/aprobar')
  @Roles('PMO', 'DIRECTOR_PMO', 'CONTROL_GESTION', 'ACTIVOS_FIJOS', 'PARTE_INTERESADA', 'GERENCIA', 'PRESIDENCIA', 'ADMIN')
  async aprobarEtapa(@Req() req: any, @Param('procesoId', ParseIntPipe) procesoId: number, @Body() dto: AprobarActaCierreDto) {
    return this.service.aprobarEtapa(procesoId, req.user.userId, dto);
  }

  @Post(':procesoId/rechazar')
  @Roles('PMO', 'DIRECTOR_PMO', 'CONTROL_GESTION', 'ACTIVOS_FIJOS', 'PARTE_INTERESADA', 'GERENCIA', 'PRESIDENCIA', 'ADMIN')
  async rechazarEtapa(@Req() req: any, @Param('procesoId', ParseIntPipe) procesoId: number, @Body() dto: RechazarActaCierreDto) {
    return this.service.rechazarEtapa(procesoId, req.user.userId, dto);
  }

  @Post(':procesoId/partes-interesadas')
  @Roles('PM', 'ADMIN')
  async actualizarPartesInteresadas(@Req() req: any, @Param('procesoId', ParseIntPipe) procesoId: number, @Body() dto: ActualizarPartesInteresadasActaCierreDto) {
    return this.service.actualizarPartesInteresadas(procesoId, req.user.userId, dto);
  }
}
