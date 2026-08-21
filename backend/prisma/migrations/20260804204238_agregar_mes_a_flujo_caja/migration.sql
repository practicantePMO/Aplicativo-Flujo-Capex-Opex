/*
  Warnings:

  - You are about to drop the column `mes` on the `solicitud_flujo_caja` table. All the data in the column will be lost.
  - Made the column `usuario_id` on table `historico_aprobaciones` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "asignaciones_proceso" DROP CONSTRAINT "asignaciones_proceso_proceso_id_fkey";

-- DropForeignKey
ALTER TABLE "historico_aprobaciones" DROP CONSTRAINT "historico_aprobaciones_proceso_id_fkey";

-- DropForeignKey
ALTER TABLE "procesos" DROP CONSTRAINT "procesos_proyecto_id_fkey";

-- DropForeignKey
ALTER TABLE "proyectos" DROP CONSTRAINT "proyectos_compania_id_fkey";

-- DropForeignKey
ALTER TABLE "solicitud_evaluacion_financiera" DROP CONSTRAINT "solicitud_evaluacion_financiera_solicitud_id_fkey";

-- DropForeignKey
ALTER TABLE "solicitud_flujo_caja" DROP CONSTRAINT "solicitud_flujo_caja_solicitud_id_fkey";

-- DropForeignKey
ALTER TABLE "solicitud_metas" DROP CONSTRAINT "solicitud_metas_solicitud_id_fkey";

-- DropForeignKey
ALTER TABLE "solicitud_valores" DROP CONSTRAINT "solicitud_valores_solicitud_id_fkey";

-- DropForeignKey
ALTER TABLE "solicitudes_inversion" DROP CONSTRAINT "solicitudes_inversion_proceso_id_fkey";

-- DropIndex
DROP INDEX "idx_proyectos_anio";

-- AlterTable
ALTER TABLE "historico_aprobaciones" ALTER COLUMN "usuario_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "solicitud_flujo_caja" DROP COLUMN "mes";

-- AlterTable
ALTER TABLE "usuarios" ALTER COLUMN "proveedor_auth" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "asignaciones_proceso" ADD CONSTRAINT "asignaciones_proceso_proceso_id_fkey" FOREIGN KEY ("proceso_id") REFERENCES "procesos"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "historico_aprobaciones" ADD CONSTRAINT "historico_aprobaciones_proceso_id_fkey" FOREIGN KEY ("proceso_id") REFERENCES "procesos"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "procesos" ADD CONSTRAINT "procesos_proyecto_id_fkey" FOREIGN KEY ("proyecto_id") REFERENCES "proyectos"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "proyectos" ADD CONSTRAINT "proyectos_compania_id_fkey" FOREIGN KEY ("compania_id") REFERENCES "companias"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitud_evaluacion_financiera" ADD CONSTRAINT "solicitud_evaluacion_financiera_solicitud_id_fkey" FOREIGN KEY ("solicitud_id") REFERENCES "solicitudes_inversion"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "solicitud_flujo_caja" ADD CONSTRAINT "solicitud_flujo_caja_solicitud_id_fkey" FOREIGN KEY ("solicitud_id") REFERENCES "solicitudes_inversion"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "solicitud_metas" ADD CONSTRAINT "solicitud_metas_solicitud_id_fkey" FOREIGN KEY ("solicitud_id") REFERENCES "solicitudes_inversion"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "solicitud_valores" ADD CONSTRAINT "solicitud_valores_solicitud_id_fkey" FOREIGN KEY ("solicitud_id") REFERENCES "solicitudes_inversion"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "solicitudes_inversion" ADD CONSTRAINT "solicitudes_inversion_proceso_id_fkey" FOREIGN KEY ("proceso_id") REFERENCES "procesos"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;
