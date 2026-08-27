-- CreateTable
CREATE TABLE "actas_cierre" (
    "id" SERIAL NOT NULL,
    "proceso_id" INTEGER NOT NULL,
    "proyecto_id" VARCHAR(20) NOT NULL,
    "tipo_cierre" VARCHAR(20) NOT NULL,
    "responsable_pm_id" INTEGER,
    "control_gestion_asignado_id" INTEGER,
    "presentacion_p5_link" TEXT,
    "entregable_real" TEXT,
    "explicacion_ejecucion" TEXT,
    "otros_entregables" TEXT,
    "fecha_creacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "actas_cierre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "acta_cierre_metas" (
    "id" SERIAL NOT NULL,
    "acta_cierre_id" INTEGER NOT NULL,
    "solicitud_meta_id" INTEGER NOT NULL,
    "resultado_cierre" TEXT,

    CONSTRAINT "acta_cierre_metas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "acta_cierre_valores" (
    "id" SERIAL NOT NULL,
    "acta_cierre_id" INTEGER NOT NULL,
    "categoria" VARCHAR(20) NOT NULL,
    "real_usd" DECIMAL(15,2),
    "real_cop" DECIMAL(15,2),

    CONSTRAINT "acta_cierre_valores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "acta_cierre_flujo_caja" (
    "id" SERIAL NOT NULL,
    "acta_cierre_id" INTEGER NOT NULL,
    "tipo" VARCHAR(20) NOT NULL,
    "moneda" VARCHAR(3) NOT NULL DEFAULT 'COP',
    "anio" INTEGER NOT NULL,
    "mes" INTEGER NOT NULL DEFAULT 1,
    "monto_real" DECIMAL(15,2) DEFAULT 0,

    CONSTRAINT "acta_cierre_flujo_caja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "acta_cierre_entregables" (
    "id" SERIAL NOT NULL,
    "acta_cierre_id" INTEGER NOT NULL,
    "equipo_sistema" TEXT NOT NULL,
    "codigo_activo_produccion" TEXT,
    "codigo_activo_montaje" TEXT,
    "unidad_vida_util" TEXT,
    "vida_util" INTEGER,
    "observaciones" TEXT,
    "anexo_url" TEXT,

    CONSTRAINT "acta_cierre_entregables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "acta_cierre_oi_valores_reales" (
    "id" SERIAL NOT NULL,
    "acta_cierre_id" INTEGER NOT NULL,
    "orden_interna_id" INTEGER NOT NULL,
    "valor_real" DECIMAL(15,2),
    "valor_real_moneda" VARCHAR(3) NOT NULL DEFAULT 'COP',

    CONSTRAINT "acta_cierre_oi_valores_reales_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "actas_cierre_proceso_id_key" ON "actas_cierre"("proceso_id");

-- CreateIndex
CREATE UNIQUE INDEX "actas_cierre_proyecto_id_key" ON "actas_cierre"("proyecto_id");

-- AddForeignKey
ALTER TABLE "actas_cierre" ADD CONSTRAINT "actas_cierre_proceso_id_fkey" FOREIGN KEY ("proceso_id") REFERENCES "procesos"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "actas_cierre" ADD CONSTRAINT "actas_cierre_proyecto_id_fkey" FOREIGN KEY ("proyecto_id") REFERENCES "proyectos"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "actas_cierre" ADD CONSTRAINT "actas_cierre_responsable_pm_id_fkey" FOREIGN KEY ("responsable_pm_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "actas_cierre" ADD CONSTRAINT "actas_cierre_control_gestion_asignado_id_fkey" FOREIGN KEY ("control_gestion_asignado_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "acta_cierre_metas" ADD CONSTRAINT "acta_cierre_metas_acta_cierre_id_fkey" FOREIGN KEY ("acta_cierre_id") REFERENCES "actas_cierre"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "acta_cierre_metas" ADD CONSTRAINT "acta_cierre_metas_solicitud_meta_id_fkey" FOREIGN KEY ("solicitud_meta_id") REFERENCES "solicitud_metas"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "acta_cierre_valores" ADD CONSTRAINT "acta_cierre_valores_acta_cierre_id_fkey" FOREIGN KEY ("acta_cierre_id") REFERENCES "actas_cierre"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "acta_cierre_flujo_caja" ADD CONSTRAINT "acta_cierre_flujo_caja_acta_cierre_id_fkey" FOREIGN KEY ("acta_cierre_id") REFERENCES "actas_cierre"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "acta_cierre_entregables" ADD CONSTRAINT "acta_cierre_entregables_acta_cierre_id_fkey" FOREIGN KEY ("acta_cierre_id") REFERENCES "actas_cierre"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "acta_cierre_oi_valores_reales" ADD CONSTRAINT "acta_cierre_oi_valores_reales_acta_cierre_id_fkey" FOREIGN KEY ("acta_cierre_id") REFERENCES "actas_cierre"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "acta_cierre_oi_valores_reales" ADD CONSTRAINT "acta_cierre_oi_valores_reales_orden_interna_id_fkey" FOREIGN KEY ("orden_interna_id") REFERENCES "ordenes_internas"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;
