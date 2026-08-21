-- AlterTable
ALTER TABLE "proyectos" ADD COLUMN "anio_asignado" INTEGER;

-- CreateTable
CREATE TABLE "proyectos_aplazamientos" (
    "id" SERIAL NOT NULL,
    "proyecto_id" VARCHAR(20) NOT NULL,
    "anio_anterior" INTEGER NOT NULL,
    "anio_nuevo" INTEGER NOT NULL,
    "motivo" TEXT NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "fecha_registro" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "proyectos_aplazamientos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "proyectos_aplazamientos"
ADD CONSTRAINT "proyectos_aplazamientos_proyecto_id_fkey" FOREIGN KEY ("proyecto_id") REFERENCES "proyectos" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "proyectos_aplazamientos"
ADD CONSTRAINT "proyectos_aplazamientos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Rellenamos anio_asignado para proyectos que ya existían, con el mismo valor
-- que ya tenían en anio_proyecto (para ellos, hoy, no hay ningún aplazamiento)
UPDATE "proyectos"
SET
    "anio_asignado" = "anio_proyecto"
WHERE
    "anio_asignado" IS NULL;

ALTER TABLE "proyectos" ALTER COLUMN "anio_asignado" SET NOT NULL;

-- Extendemos el trigger existente para que TAMBIÉN inicialice anio_asignado
-- en cada proyecto nuevo. El candado anti-concurrencia y el resto de la
-- lógica de generación del ID quedan exactamente igual, sin tocarlos.
CREATE OR REPLACE FUNCTION generar_proyecto_id()
RETURNS TRIGGER AS $$
DECLARE
    v_anio INT;
    v_siguiente_consecutivo INT;
BEGIN
    v_anio := EXTRACT(YEAR FROM NEW.fecha_proyecto);
    NEW.anio_proyecto := v_anio;
    NEW.anio_asignado := v_anio;

    PERFORM pg_advisory_xact_lock(hashtext('proyectos_id_seq'), v_anio);

    SELECT COALESCE(MAX(consecutivo), 0)+1
    INTO v_siguiente_consecutivo
    FROM proyectos
    WHERE anio_proyecto = v_anio;

    NEW.consecutivo := v_siguiente_consecutivo;
    NEW.id := v_anio || LPAD(v_siguiente_consecutivo::TEXT, 3, '0');

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;