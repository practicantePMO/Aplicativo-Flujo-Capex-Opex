UPDATE subprogramas
SET
    requiere_evaluacion_obligatoria = true
WHERE
    id IN (1, 12, 13, 14);