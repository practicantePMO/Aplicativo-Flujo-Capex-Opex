/*
  Warnings:

  - The `tipo_clasificacion` column on the `solicitudes_inversion` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TipoClasificacion" AS ENUM ('TRADICIONAL', 'NUEVA');

-- AlterTable
ALTER TABLE "solicitud_flujo_caja" ADD COLUMN     "mes" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "solicitudes_inversion" DROP COLUMN "tipo_clasificacion",
ADD COLUMN     "tipo_clasificacion" "TipoClasificacion" NOT NULL DEFAULT 'TRADICIONAL';

-- DropEnum
DROP TYPE "tipo_clasificacion_enum";
