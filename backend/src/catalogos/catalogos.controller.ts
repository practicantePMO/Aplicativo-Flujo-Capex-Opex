import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CatalogosService } from './catalogos.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('catalogos')
// Exigimos que el usuario tenga un token JWT válido para consultar los catálogos 🔒
@UseGuards(JwtAuthGuard)
export class CatalogosController {
  constructor(private readonly catalogosService: CatalogosService) {}

  // GET /catalogos/jerarquia
  @Get('jerarquia')
  async obtenerJerarquia() {
    return this.catalogosService.obtenerJerarquiaCompleta();
  }

  // GET /catalogos/grupos
  @Get('grupos')
  async obtenerGrupos() {
    return this.catalogosService.obtenerGrupos();
  }

  // GET /catalogos/programas/grupo/1
  @Get('programas/grupo/:grupoId')
  async obtenerProgramasPorGrupo(@Param('grupoId', ParseIntPipe) grupoId: number) {
    return this.catalogosService.obtenerProgramasPorGrupo(grupoId);
  }

  // GET /catalogos/subprogramas/programa/2
  @Get('subprogramas/programa/:programaId')
  async obtenerSubprogramasPorPrograma(@Param('programaId', ParseIntPipe) programaId: number) {
    return this.catalogosService.obtenerSubprogramasPorPrograma(programaId);
  }
}
