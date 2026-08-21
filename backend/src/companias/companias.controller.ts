import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('companias')
@UseGuards(JwtAuthGuard)
export class CompaniasController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async listar() {
    return this.prisma.companias.findMany({
      where: { activa: true },
      select: {
        id: true,
        nombre: true,
      },
      orderBy: { nombre: 'asc' },
    });
  }
}
