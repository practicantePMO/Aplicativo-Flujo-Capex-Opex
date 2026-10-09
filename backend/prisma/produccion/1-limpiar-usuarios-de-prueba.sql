-- =====================================================================
-- PRODUCCIÓN — ejecutar UNA SOLA VEZ, después del primer despliegue.
-- Desactiva los usuarios de prueba (correos @empresa.com) que crean la
-- migración inicial y el seed.sql, y les quita los roles. No borra filas,
-- así no se rompe ninguna referencia.
-- NO lo ejecutes en tu base local de desarrollo (ahí sí los necesitas).
-- =====================================================================
DELETE FROM usuario_roles_compania
WHERE usuario_id IN (
    SELECT id FROM usuarios WHERE email IN (
        'ana.admin@empresa.com', 'laura.pm@empresa.com', 'mateo.pm@empresa.com',
        'carlos.pmo@empresa.com', 'valentina.pmo@empresa.com', 'diana.director@empresa.com',
        'gerardo.gerencia@empresa.com', 'gabriela.gerencia@empresa.com', 'german.gerencia@empresa.com',
        'gloria.gerencia@empresa.com', 'pedro.presidencia@empresa.com', 'patricia.presidencia@empresa.com',
        'pablo.presidencia@empresa.com', 'sofia.interesada@empresa.com', 'simon.interesado@empresa.com',
        'camila.cg@empresa.com', 'cristian.cg@empresa.com', 'andrea.activosfijos@empresa.com',
        'nuevo.sinrol@empresa.com'
    )
);

UPDATE usuarios
SET activo = false, eliminado_el = NOW()
WHERE email IN (
    'ana.admin@empresa.com', 'laura.pm@empresa.com', 'mateo.pm@empresa.com',
    'carlos.pmo@empresa.com', 'valentina.pmo@empresa.com', 'diana.director@empresa.com',
    'gerardo.gerencia@empresa.com', 'gabriela.gerencia@empresa.com', 'german.gerencia@empresa.com',
    'gloria.gerencia@empresa.com', 'pedro.presidencia@empresa.com', 'patricia.presidencia@empresa.com',
    'pablo.presidencia@empresa.com', 'sofia.interesada@empresa.com', 'simon.interesado@empresa.com',
    'camila.cg@empresa.com', 'cristian.cg@empresa.com', 'andrea.activosfijos@empresa.com',
    'nuevo.sinrol@empresa.com'
);
