-- Evita dos Solicitudes de Inversión activas para el mismo proyecto
CREATE UNIQUE INDEX unique_solicitud_activa_por_proyecto ON procesos (proyecto_id, tipo_proceso)
WHERE
    eliminado_el IS NULL;

-- Evita que "estado_actual" termine con un valor que no existe en la máquina de estados
ALTER TABLE procesos
ADD CONSTRAINT chk_estado_actual_valido CHECK (
    estado_actual IN (
        'BORRADOR',
        'PENDIENTE_PMO',
        'VERIFICACION_PARTES_INTERESADAS',
        'DIRECCION_PMO',
        'GERENCIA',
        'PRESIDENCIA',
        'APROBADO_FINAL',
        'CANCELADO'
    )
);