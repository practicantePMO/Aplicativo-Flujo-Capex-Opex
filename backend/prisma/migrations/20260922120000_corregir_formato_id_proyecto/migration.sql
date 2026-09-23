-- =====================================================================
-- CORRECCIÓN: formato del ID de proyecto a partir del consecutivo 1000.
--
-- LPAD(texto, 3, '0') completa con ceros hasta 3 caracteres, pero TAMBIÉN
-- RECORTA los textos más largos: el consecutivo 1000 generaba '2026' + '100'
-- = '2026100', que choca con el proyecto 100 y bloquea la creación de
-- proyectos ese año.
--
-- Ahora se rellena hasta 3 dígitos como mínimo, sin recortar nunca:
--   1    -> 2026001   (igual que antes)
--   999  -> 2026999   (igual que antes)
--   1000 -> 20261000  (antes fallaba)
--
-- Solo se reemplaza la función; los proyectos existentes NO cambian de ID.
-- =====================================================================
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