-- AlterTable
ALTER TABLE "controles_cambio" ADD COLUMN     "anio_nuevo_propuesto" INTEGER,
ADD COLUMN     "tipo_control_cambio" VARCHAR(20) NOT NULL DEFAULT 'GENERAL';
