import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { SolicitudInversionService } from './solicitud-inversion.service';
import { SolicitudInversionConsultaService } from './solicitud-inversion-consulta.service';
import { CrearSolicitudInversionDto } from './dto/crear-solicitud-inversion.dto';
import { AprobarSolicitudDto, RechazarSolicitudDto } from './dto/cambiar-estado-solicitud.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ActualizarPartesInteresadasDto } from './dto/actualizar-partes-interesadas.dto';
import { CancelarSolicitudDto } from './dto/cancelar-solicitud.dto';

@Controller('solicitud-inversion')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SolicitudInversionController {
  constructor(
    private readonly service: SolicitudInversionService,
    private readonly consulta: SolicitudInversionConsultaService,
  ) {}

  @Post()
  @Roles('PM', 'PMO', 'ADMIN')
  async crear(@Req() req: any, @Body() dto: CrearSolicitudInversionDto) {
    return this.service.crear(req.user.userId, dto);
  }

  // ------------------------------------------------------------------
  // RUTAS ESTÁTICAS DE CATÁLOGOS (CON PERMISOS DE ROLES AGREGADOS)
  // ------------------------------------------------------------------

  @Get('categorias')
  @Roles('PM', 'PMO', 'DIRECTOR_PMO', 'PARTE_INTERESADA', 'GERENCIA', 'PRESIDENCIA', 'ADMIN')
  async obtenerCategorias() {
    return this.consulta.obtenerCategorias();
  }

  @Get('mis-pendientes')
  @Roles('PM', 'PMO', 'DIRECTOR_PMO', 'PARTE_INTERESADA', 'GERENCIA', 'PRESIDENCIA', 'ADMIN')
  async obtenerMisPendientes(@Req() req: any) {
    return this.consulta.obtenerMisPendientes(req.user.userId);
  }

  @Get('partes-interesadas/:companiaId')
  @Roles('PM', 'PMO', 'DIRECTOR_PMO', 'PARTE_INTERESADA', 'GERENCIA', 'PRESIDENCIA', 'ADMIN')
  async obtenerPartesInteresadas(@Param('companiaId', ParseIntPipe) companiaId: number) {
    return await this.consulta.obtenerPartesInteresadasPorCompania(companiaId);
  }

  // ------------------------------------------------------------------
  // RUTAS DINÁMICAS POR ID
  // ------------------------------------------------------------------

  @Post(':procesoId/enviar')
  @Roles('PM', 'ADMIN')
  async enviarARevision(@Req() req: any, @Param('procesoId', ParseIntPipe) procesoId: number) {
    return this.service.enviarARevision(procesoId, req.user.userId);
  }

  @Post(':procesoId/aprobar')
  @Roles('PMO', 'DIRECTOR_PMO', 'PARTE_INTERESADA', 'GERENCIA', 'PRESIDENCIA', 'ADMIN')
  async aprobarEtapa(
    @Req() req: any,
    @Param('procesoId', ParseIntPipe) procesoId: number,
    @Body() dto: AprobarSolicitudDto,
  ) {
    return this.service.aprobarEtapa(procesoId, req.user.userId, dto);
  }

  @Post(':procesoId/rechazar')
  @Roles('PMO', 'DIRECTOR_PMO', 'PARTE_INTERESADA', 'GERENCIA', 'PRESIDENCIA', 'ADMIN')
  async rechazarEtapa(
    @Req() req: any,
    @Param('procesoId', ParseIntPipe) procesoId: number,
    @Body() dto: RechazarSolicitudDto,
  ) {
    return this.service.rechazarEtapa(procesoId, req.user.userId, dto);
  }

  @Get(':procesoId')
  @Roles('ADMIN', 'PMO', 'DIRECTOR_PMO', 'PM', 'PARTE_INTERESADA', 'GERENCIA', 'PRESIDENCIA')
  async obtener(@Req() req: any, @Param('procesoId', ParseIntPipe) procesoId: number) {
    return this.consulta.obtenerPorProcesoId(req.user.userId, procesoId);
  }

  @Post(':procesoId/partes-interesadas')
  @Roles('PM', 'PMO', 'DIRECTOR_PMO', 'ADMIN')
  async actualizarPartesInteresadas(
    @Req() req: any,
    @Param('procesoId', ParseIntPipe) procesoId: number,
    @Body() dto: ActualizarPartesInteresadasDto,
  ) {
    return this.service.actualizarPartesInteresadas(procesoId, req.user.userId, dto);
  }

  @Post(':procesoId/cancelar')
  @Roles('PMO', 'DIRECTOR_PMO', 'ADMIN')
  async cancelarDefinitivamente(
    @Req() req: any,
    @Param('procesoId', ParseIntPipe) procesoId: number,
    @Body() dto: CancelarSolicitudDto,
  ) {
    return this.service.cancelarDefinitivamente(procesoId, req.user.userId, dto);
  }

  @Put('borrador/:procesoId')
  @Roles('PM', 'PMO', 'ADMIN')
  async actualizarBorrador(
    @Req() req: any,
    @Param('procesoId', ParseIntPipe) procesoId: number,
    @Body() dto: CrearSolicitudInversionDto,
  ) {
    return this.service.actualizarBorrador(procesoId, req.user.userId, dto);
  }
}
