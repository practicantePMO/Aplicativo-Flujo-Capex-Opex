-- DropForeignKey
ALTER TABLE "grupo_oi_historico_cierre"
DROP CONSTRAINT "grupo_oi_historico_cierre_grupo_id_fkey";

-- DropForeignKey
ALTER TABLE "grupos_ordenes_internas"
DROP CONSTRAINT "grupos_ordenes_internas_proyecto_id_fkey";

-- DropForeignKey
ALTER TABLE "oi_valores"
DROP CONSTRAINT "oi_valores_orden_interna_id_fkey";

-- DropForeignKey
ALTER TABLE "ordenes_internas"
DROP CONSTRAINT "ordenes_internas_grupo_id_fkey";

-- DropForeignKey
ALTER TABLE "ordenes_internas"
DROP CONSTRAINT "ordenes_internas_proceso_id_fkey";

-- DropIndex
DROP INDEX "idx_grupo_oi_historico_grupo";

-- DropIndex
DROP INDEX "idx_oi_valores_orden";

-- DropIndex
DROP INDEX "idx_ordenes_internas_grupo";

-- AddForeignKey
ALTER TABLE "grupos_ordenes_internas"
ADD CONSTRAINT "grupos_ordenes_internas_proyecto_id_fkey" FOREIGN KEY ("proyecto_id") REFERENCES "proyectos" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ordenes_internas"
ADD CONSTRAINT "ordenes_internas_grupo_id_fkey" FOREIGN KEY ("grupo_id") REFERENCES "grupos_ordenes_internas" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ordenes_internas"
ADD CONSTRAINT "ordenes_internas_proceso_id_fkey" FOREIGN KEY ("proceso_id") REFERENCES "procesos" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "oi_valores"
ADD CONSTRAINT "oi_valores_orden_interna_id_fkey" FOREIGN KEY ("orden_interna_id") REFERENCES "ordenes_internas" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "grupo_oi_historico_cierre"
ADD CONSTRAINT "grupo_oi_historico_cierre_grupo_id_fkey" FOREIGN KEY ("grupo_id") REFERENCES "grupos_ordenes_internas" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION;