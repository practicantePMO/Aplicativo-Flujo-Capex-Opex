import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CatalogosService } from './catalogos.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('catalogos')
// Exigimos que el usuario tenga un token JWT válido para consultar los catálogos 
@UseGuards(JwtAuthGuard)
export class CatalogosController {
  constructor(private readonly catalogosService: CatalogosService) {}

  // GET /catalogos/jerarquia
  @Get('jerarquia')
  obtenerJerarquia() {
    return this.catalogosService.obtenerJerarquiaCompleta();
  }

  // GET /catalogos/grupos
  @Get('grupos')
  obtenerGrupos() {
    return this.catalogosService.obtenerGrupos();
  }

  // GET /catalogos/programas/grupo/1
  @Get('programas/grupo/:grupoId')
  obtenerProgramasPorGrupo(@Param('grupoId', ParseIntPipe) grupoId: number) {
    return this.catalogosService.obtenerProgramasPorGrupo(grupoId);
  }

  // GET /catalogos/subprogramas/programa/2
  @Get('subprogramas/programa/:programaId')
  obtenerSubprogramasPorPrograma(@Param('programaId', ParseIntPipe) programaId: number) {
    return this.catalogosService.obtenerSubprogramasPorPrograma(programaId);
  }

  // GET /catalogos/empresas — todas las empresas de todas las compañías.
  @Get('empresas')
  obtenerEmpresas() {
    return this.catalogosService.obtenerEmpresas();
  }
}
