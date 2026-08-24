-- 0. Ahora una solicitud puede marcar Tradicional Y Nueva clasificación a la vez.
ALTER TYPE "TipoClasificacion"
ADD VALUE IF NOT EXISTS 'AMBAS';

-- 1. Nueva clasificación: marcar por CATEGORÍA (no solo por subprograma) si la
--    evaluación financiera es obligatoria.
ALTER TABLE categorias
ADD COLUMN requiere_evaluacion_obligatoria BOOLEAN DEFAULT false;

-- 2. Flujo de caja: cada monto ahora declara en qué moneda fue ingresado
--    (USD o COP), para poder sumar el Valor Total del Proyecto automáticamente.
ALTER TABLE solicitud_flujo_caja
ADD COLUMN moneda VARCHAR(3) NOT NULL DEFAULT 'COP';

-- 3. Marcamos como obligatorias las categorías "Crecimiento Estratégico"
--    (el seed la tenía mal escrita como "Conocimiento Estratégico") y
--    "Productividad y Mejora".
UPDATE categorias
SET nombre = 'Crecimiento Estratégico'
WHERE nombre = 'Conocimiento Estratégico';

UPDATE categorias
SET requiere_evaluacion_obligatoria = true
WHERE
    nombre IN (
        'Crecimiento Estratégico',
        'Productividad y Mejora'
    );
