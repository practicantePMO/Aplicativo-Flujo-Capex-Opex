import { Controller, Get, Post, Delete, Patch, Body, Param, ParseIntPipe, Query, Req, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { AsignarRolDto } from './dto/asignar-rol.dto';
import { CambiarActivoDto } from './dto/cambiar-activo.dto';
import { EditarAreaDto } from './dto/editar-area.dto';
import { EditarEmpresaDto } from './dto/editar-empresa.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import type { RequestConUsuario } from '../auth/interfaces/usuario-autenticado.interface';

@Controller('usuarios')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get('pendientes')
  @Roles('ADMIN', 'PMO')
  obtenerPendientes() {
    return this.usuariosService.findPendientes();
  }

  @Get('activos')
  @Roles('ADMIN', 'PMO', 'PM')
  obtenerActivos() {
    return this.usuariosService.findActivos();
  }

  @Get()
  @Roles('ADMIN', 'PMO')
  obtenerTodos() {
    return this.usuariosService.findTodos();
  }

  @Get('por-rol')
  @Roles('ADMIN', 'PMO', 'DIRECTOR_PMO', 'PM', 'CONTROL_GESTION')
  obtenerPorRol(@Query('rol') rol: string, @Query('companiaId') companiaIdRaw?: string) {
    const companiaId = companiaIdRaw ? parseInt(companiaIdRaw, 10) : 0;
    return this.usuariosService.findPorRolYCompania(rol, companiaId);
  }

  @Get('roles-disponibles')
  @Roles('ADMIN', 'PMO')
  obtenerRolesDisponibles() {
    return this.usuariosService.findRolesDisponibles();
  }

  @Post('asignar-rol')
  @Roles('ADMIN', 'PMO')
  asignarRol(@Req() req: RequestConUsuario, @Body() dto: AsignarRolDto) {
    return this.usuariosService.asignarRolCompania(req.user.userId, dto);
  }

  @Delete('roles/:asignacionId')
  @Roles('ADMIN', 'PMO')
  quitarRol(@Req() req: RequestConUsuario, @Param('asignacionId', ParseIntPipe) asignacionId: number) {
    return this.usuariosService.quitarRol(req.user.userId, asignacionId);
  }

  @Patch(':id/activo')
  @Roles('ADMIN', 'PMO')
  cambiarActivo(
    @Req() req: RequestConUsuario,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CambiarActivoDto,
  ) {
    return this.usuariosService.cambiarActivo(req.user.userId, id, dto.activo);
  }

  @Patch(':id/area')
  @Roles('ADMIN', 'PMO')
  editarArea(
    @Req() req: RequestConUsuario,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditarAreaDto,
  ) {
    return this.usuariosService.editarArea(req.user.userId, id, dto.area);
  }

  @Patch(':id/empresa')
  @Roles('ADMIN', 'PMO')
  editarEmpresa(
    @Req() req: RequestConUsuario,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditarEmpresaDto,
  ) {
    return this.usuariosService.editarEmpresa(req.user.userId, id, dto.empresa_id ?? null);
  }
}
