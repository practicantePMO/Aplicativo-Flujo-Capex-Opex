import { Module } from '@nestjs/common';
import { CompaniasController } from './companias.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [CompaniasController],
  providers: [PrismaService],
})
export class CompaniasModule {}
