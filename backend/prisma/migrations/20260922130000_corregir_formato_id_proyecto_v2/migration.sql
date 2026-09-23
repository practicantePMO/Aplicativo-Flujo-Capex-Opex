-- CORRECCION: formato del ID de proyecto a partir del consecutivo 1000.
-- (La migracion 20260922120000_corregir_formato_id_proyecto quedo vacia
-- por error y ya esta registrada como aplicada; esta es la que corrige.)
-- LPAD(texto, 3, '0') recorta los textos de mas de 3 caracteres: el
-- consecutivo 1000 generaba '2026100', que choca con el proyecto 100.
-- Ahora se rellena hasta 3 digitos como minimo, sin recortar nunca.
-- Los proyectos existentes NO cambian de ID.
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

    SELECT COALESCE(MAX(consecutivo), 0) + 1
    INTO v_siguiente_consecutivo
    FROM proyectos
    WHERE anio_proyecto = v_anio;

    NEW.consecutivo := v_siguiente_consecutivo;
    NEW.id := v_anio || LPAD(
        v_siguiente_consecutivo::TEXT,
        GREATEST(3, LENGTH(v_siguiente_consecutivo::TEXT)),
        '0'
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;