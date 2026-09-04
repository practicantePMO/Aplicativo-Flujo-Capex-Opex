-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "empresa_id" INTEGER;

-- CreateTable
CREATE TABLE "empresas" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "compania_id" INTEGER NOT NULL,

    CONSTRAINT "empresas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "empresas_compania_id_nombre_key" ON "empresas"("compania_id", "nombre");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "empresas" ADD CONSTRAINT "empresas_compania_id_fkey" FOREIGN KEY ("compania_id") REFERENCES "companias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
