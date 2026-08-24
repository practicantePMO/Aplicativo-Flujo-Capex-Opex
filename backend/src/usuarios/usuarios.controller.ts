import { Controller, Get, Post, Delete, Patch, Body, Param, ParseIntPipe, Query, Req, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { AsignarRolDto } from './dto/asignar-rol.dto';
import { CambiarActivoDto } from './dto/cambiar-activo.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('usuarios')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get('pendientes')
  @Roles('ADMIN', 'PMO')
  async obtenerPendientes() {
    return this.usuariosService.findPendientes();
  }

  @Get('activos')
  @Roles('ADMIN', 'PMO', 'PM')
  async obtenerActivos() {
    return this.usuariosService.findActivos();
  }

  // Todos los usuarios (activos e inactivos) con sus roles — para la pantalla de gestión
  @Get()
  @Roles('ADMIN', 'PMO')
  async obtenerTodos() {
    return this.usuariosService.findTodos();
  }

  // Ej: GET /usuarios/por-rol?rol=GERENCIA&companiaId=3 (elegir a qué gerente enviar el proceso)
  @Get('por-rol')
  @Roles('ADMIN', 'PMO', 'DIRECTOR_PMO', 'PM')
  async obtenerPorRol(@Query('rol') rol: string, @Query('companiaId', ParseIntPipe) companiaId: number) {
    return this.usuariosService.findPorRolYCompania(rol, companiaId);
  }

  @Get('roles-disponibles')
  @Roles('ADMIN', 'PMO')
  async obtenerRolesDisponibles() {
    return this.usuariosService.findRolesDisponibles();
  }

  // Solo ADMIN o PMO pueden entrar aquí; el service valida internamente
  // qué puede otorgar exactamente cada uno (ver asignarRolCompania).
  @Post('asignar-rol')
  @Roles('ADMIN', 'PMO', 'DIRECTOR_PMO')
  async asignarRol(@Req() req: any, @Body() dto: AsignarRolDto) {
    return this.usuariosService.asignarRolCompania(req.user.userId, dto);
  }

  @Delete('roles/:asignacionId')
  @Roles('ADMIN', 'PMO')
  async quitarRol(@Req() req: any, @Param('asignacionId', ParseIntPipe) asignacionId: number) {
    return this.usuariosService.quitarRol(req.user.userId, asignacionId);
  }

  @Patch(':id/activo')
  @Roles('ADMIN', 'PMO')
  async cambiarActivo(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CambiarActivoDto,
  ) {
    return this.usuariosService.cambiarActivo(req.user.userId, id, dto.activo);
  }
}