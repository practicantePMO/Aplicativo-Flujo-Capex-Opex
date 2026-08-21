import { PrismaService } from '../prisma/prisma.service';
export declare class CompaniasController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listar(): Promise<{
        id: number;
        nombre: string;
    }[]>;
}
