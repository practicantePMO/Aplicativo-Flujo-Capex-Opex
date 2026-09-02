// backend/src/backup/backup.controller.ts

import { Controller, Get, Res, UseGuards, StreamableFile } from '@nestjs/common';
import type { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { BackupService } from './backup.service';

@Controller('backup')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BackupController {
  constructor(private readonly backupService: BackupService) {}

  @Get('excel')
  @Roles('ADMIN', 'PMO', 'DIRECTOR_PMO')
  async descargarExcel(@Res({ passthrough: true }) res: Response): Promise<StreamableFile> {
    const buffer = await this.backupService.generarExcel();
    const fecha = new Date().toISOString().slice(0, 10);

    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="backup-proyectos-${fecha}.xlsx"`,
    });

    return new StreamableFile(buffer);
  }
}
