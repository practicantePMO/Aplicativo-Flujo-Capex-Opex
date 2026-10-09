import { Module } from '@nestjs/common';
import { CompaniasController } from './companias.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [CompaniasController],
  providers: [PrismaService],
})

// skipcq: JS-0327 -- Los módulos de NestJS son clases vacías con @Module por diseño del framework.
export class CompaniasModule {}
