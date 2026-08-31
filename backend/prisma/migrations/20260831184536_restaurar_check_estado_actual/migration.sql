ALTER TABLE procesos
ADD CONSTRAINT chk_estado_actual_valido CHECK (
    (
        tipo_proceso = 'SOLICITUD_INVERSION'
        AND estado_actual IN (
            'BORRADOR',
            'PENDIENTE_PMO',
            'VERIFICACION_PARTES_INTERESADAS',
            'DIRECCION_PMO',
            'GERENCIA',
            'PRESIDENCIA',
            'APROBADO_FINAL',
            'CANCELADO'
        )
    )
    OR (
        tipo_proceso = 'ORDEN_INTERNA'
        AND estado_actual IN (
            'BORRADOR',
            'PENDIENTE',
            'APROBADA',
            'CERRADA'
        )
    )
    OR (
        tipo_proceso = 'CONTROL_CAMBIO'
        AND estado_actual IN (
            'BORRADOR',
            'PENDIENTE_PMO',
            'VERIFICACION_PARTES_INTERESADAS',
            'DIRECCION_PMO',
            'GERENCIA',
            'PRESIDENCIA',
            'APROBADO_FINAL'
        )
    )
    OR (
        tipo_proceso = 'ACTA_CIERRE'
        AND estado_actual IN (
            'BORRADOR',
            'PENDIENTE_PMO',
            'CONTROL_GESTION',
            'VERIFICACION_PARTES_INTERESADAS',
            'DIRECCION_PMO',
            'GERENCIA',
            'PRESIDENCIA',
            'CERRADO'
        )
    )
);