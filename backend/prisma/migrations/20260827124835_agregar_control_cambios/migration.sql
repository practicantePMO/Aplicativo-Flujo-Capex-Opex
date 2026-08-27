-- CreateTable
CREATE TABLE "controles_cambio" (
    "id" SERIAL NOT NULL,
    "proceso_id" INTEGER NOT NULL,
    "proyecto_id" VARCHAR(20) NOT NULL,
    "responsable_pm_id" INTEGER,
    "requiere_orden_interna" BOOLEAN NOT NULL DEFAULT false,
    "descripcion_cambio" TEXT,
    "antecedentes" TEXT,
    "justificacion" TEXT,
    "impacto_alcance" TEXT,
    "impacto_tiempo" TEXT,
    "fecha_creacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "controles_cambio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "control_cambio_anexos" (
    "id" SERIAL NOT NULL,
    "control_cambio_id" INTEGER NOT NULL,
    "tipo" VARCHAR(30) NOT NULL,
    "url" TEXT NOT NULL,
    "descripcion" VARCHAR(255),

    CONSTRAINT "control_cambio_anexos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "controles_cambio_proceso_id_key" ON "controles_cambio"("proceso_id");

-- AddForeignKey
ALTER TABLE "controles_cambio" ADD CONSTRAINT "controles_cambio_proceso_id_fkey" FOREIGN KEY ("proceso_id") REFERENCES "procesos"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "controles_cambio" ADD CONSTRAINT "controles_cambio_proyecto_id_fkey" FOREIGN KEY ("proyecto_id") REFERENCES "proyectos"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "controles_cambio" ADD CONSTRAINT "controles_cambio_responsable_pm_id_fkey" FOREIGN KEY ("responsable_pm_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "control_cambio_anexos" ADD CONSTRAINT "control_cambio_anexos_control_cambio_id_fkey" FOREIGN KEY ("control_cambio_id") REFERENCES "controles_cambio"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;
