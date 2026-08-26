import { Controller, Post, Put, Get, Body, Param, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { OrdenesInternasService } from './ordenes-internas.service';
import { OrdenesInternasConsultaService } from './ordenes-internas-consulta.service';
import { CrearOrdenInternaDto } from './dto/crear-orden-interna.dto';
import { EnviarOrdenInternaDto } from './dto/enviar-orden-interna.dto';
import { AprobarOrdenInternaDto, RechazarOrdenInternaDto } from './dto/cambiar-estado-orden.dto';
import { SolicitarCierreGrupoDto } from './dto/solicitar-cierre-grupo.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('ordenes-internas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdenesInternasController {
  constructor(
    private readonly service: OrdenesInternasService,
    private readonly consulta: OrdenesInternasConsultaService,
  ) {}

  @Post()
  @Roles('PM', 'ADMIN')
  async crear(@Req() req: any, @Body() dto: CrearOrdenInternaDto) {
    return this.service.crear(req.user.userId, dto);
  }

  @Get('proyecto/:proyectoId')
  @Roles('PM', 'PMO', 'DIRECTOR_PMO', 'CONTROL_GESTION', 'ADMIN')
  async obtenerPorProyecto(@Req() req: any, @Param('proyectoId') proyectoId: string) {
    return this.consulta.obtenerPorProyecto(req.user.userId, proyectoId);
  }

  @Get(':id')
  @Roles('PM', 'PMO', 'DIRECTOR_PMO', 'CONTROL_GESTION', 'ADMIN')
  async obtenerDetalle(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.consulta.obtenerDetalle(req.user.userId, id);
  }

  @Put(':id')
  @Roles('PM', 'ADMIN')
  async actualizarBorrador(@Req() req: any, @Param('id', ParseIntPipe) id: number, @Body() dto: CrearOrdenInternaDto) {
    return this.service.actualizarBorrador(id, req.user.userId, dto);
  }

  @Post(':id/enviar')
  @Roles('PM', 'ADMIN')
  async enviar(@Req() req: any, @Param('id', ParseIntPipe) id: number, @Body() dto: EnviarOrdenInternaDto) {
    return this.service.enviar(id, req.user.userId, dto);
  }

  @Post(':id/aprobar')
  @Roles('CONTROL_GESTION', 'ADMIN')
  async aprobar(@Req() req: any, @Param('id', ParseIntPipe) id: number, @Body() dto: AprobarOrdenInternaDto) {
    return this.service.aprobar(id, req.user.userId, dto);
  }

  @Post(':id/rechazar')
  @Roles('CONTROL_GESTION', 'ADMIN')
  async rechazar(@Req() req: any, @Param('id', ParseIntPipe) id: number, @Body() dto: RechazarOrdenInternaDto) {
    return this.service.rechazar(id, req.user.userId, dto);
  }

  @Post(':id/cerrar')
  @Roles('CONTROL_GESTION', 'ADMIN')
  async cerrarOrden(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.service.cerrarOrden(id, req.user.userId);
  }

  // 🔒 Este endpoint lo disparará el futuro proceso "Acta de Cierre" — lo
  // dejamos listo desde ya para no tener que retocar este módulo después.
  @Post('grupo/:proyectoId/solicitar-cierre')
  @Roles('PM', 'PMO', 'DIRECTOR_PMO', 'ADMIN')
  async solicitarCierreGrupo(@Req() req: any, @Param('proyectoId') proyectoId: string, @Body() dto: SolicitarCierreGrupoDto) {
    return this.service.solicitarCierreGrupo(proyectoId, req.user.userId, dto);
  }
}