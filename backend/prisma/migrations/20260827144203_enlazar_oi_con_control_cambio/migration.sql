-- AlterTable
ALTER TABLE "ordenes_internas" ADD COLUMN     "control_cambio_id" INTEGER;

-- AddForeignKey
ALTER TABLE "ordenes_internas" ADD CONSTRAINT "ordenes_internas_control_cambio_id_fkey" FOREIGN KEY ("control_cambio_id") REFERENCES "controles_cambio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
