-- =====================================================================
-- CORRECCIÓN: estas 2 restricciones se crearon pensando SOLO en Solicitud
-- de Inversión (antes de que existiera Órdenes Internas), y como cada Orden
-- Interna también es un "proceso" genérico, estaban bloqueando por error:
--   1. Crear una SEGUNDA Orden Interna en el mismo proyecto (error 500 al crear).
--   2. Que una Orden Interna pasara a estado PENDIENTE/APROBADA/CERRADA
--      (esos estados no existían en la lista permitida).
-- =====================================================================

-- 1. El índice único "una SI activa por proyecto" ahora debe aplicar SOLO a
--    tipo_proceso = 'SOLICITUD_INVERSION' (un proyecto sí puede tener varias
--    Órdenes Internas al mismo tiempo).
DROP INDEX IF EXISTS unique_solicitud_activa_por_proyecto;

CREATE UNIQUE INDEX unique_solicitud_activa_por_proyecto ON procesos (proyecto_id, tipo_proceso)
WHERE
    eliminado_el IS NULL
    AND tipo_proceso = 'SOLICITUD_INVERSION';

-- 2. Quitamos por completo esta restricción (en vez de solo ampliarla).
-- ¿Por qué es seguro? "estado_actual" nunca lo escribe el usuario directo —
-- siempre lo pone el backend, y cada proceso (solicitud-inversion.service.ts,
-- ordenes-internas.service.ts, y los que sigan) ya controla sus propios
-- estados válidos en su propio código. Mantener esta lista fija a nivel de
-- base de datos obligaba a tocar este archivo compartido CADA VEZ que se
-- agregara un proceso nuevo con estados propios — es justo lo que rompió
-- Órdenes Internas, y volvería a romper el próximo proceso (Acta de Cierre).
ALTER TABLE procesos
DROP CONSTRAINT IF EXISTS chk_estado_actual_valido;