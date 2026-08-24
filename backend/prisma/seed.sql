-- ==============================================================================
-- SEED DE BASE DE DATOS - SISTEMA DE PROYECTOS
-- Ruta: backend/prisma/seed.sql
-- ==============================================================================

-- 1. INSERTAR ROLES DEL SISTEMA
INSERT INTO
    roles (id, codigo, nombre)
VALUES (
        1,
        'ADMIN',
        'Administrador Global'
    ),
    (2, 'PM', 'Project Manager'),
    (3, 'PMO', 'PMO'),
    (
        4,
        'DIRECTOR_PMO',
        'Director PMO'
    ),
    (5, 'GERENCIA', 'Gerencia'),
    (
        6,
        'PRESIDENCIA',
        'Presidencia'
    ),
    (
        7,
        'PARTE_INTERESADA',
        'Parte Interesada'
    ) ON CONFLICT (id) DO NOTHING;

-- 2. INSERTAR COMPAÑÍAS
INSERT INTO
    companias (id, nombre, activa)
VALUES (1, 'Galletas', true),
    (2, 'Pasas', true),
    (3, 'Snacks', true) ON CONFLICT (id) DO NOTHING;

-- 3. INSERTAR USUARIOS DE PRUEBA
INSERT INTO
    usuarios (
        id,
        nombre,
        email,
        proveedor_auth,
        area,
        activo
    )
VALUES (
        1,
        'Ana Admin',
        'ana.admin@empresa.com',
        'GOOGLE',
        'TI',
        true
    ),
    (
        2,
        'Laura PM',
        'laura.pm@empresa.com',
        'GOOGLE',
        'Proyectos',
        true
    ),
    (
        3,
        'Carlos PMO',
        'carlos.pmo@empresa.com',
        'GOOGLE',
        'PMO',
        true
    ),
    (
        4,
        'Diana Directora PMO',
        'diana.director@empresa.com',
        'GOOGLE',
        'PMO',
        true
    ),
    (
        5,
        'Gerardo Gerente',
        'gerardo.gerencia@empresa.com',
        'GOOGLE',
        'Gerencia',
        true
    ),
    (
        6,
        'Pedro Presidencia',
        'pedro.presidencia@empresa.com',
        'GOOGLE',
        'Presidencia',
        true
    ),
    (
        7,
        'Sofia Interesada',
        'sofia.interesada@empresa.com',
        'GOOGLE',
        'Operaciones',
        true
    ) ON CONFLICT (id) DO NOTHING;

-- 4. INSERTAR ASIGNACIÓN DE ROLES Y COMPAÑÍAS (Con NULL::integer para evitar error de tipos)
INSERT INTO usuario_roles_compania (usuario_id, rol_id, compania_id) VALUES
    (7, (SELECT id FROM roles WHERE codigo = 'PARTE_INTERESADA'), NULL::integer)
ON CONFLICT DO NOTHING;

INSERT INTO usuario_roles_compania (usuario_id, rol_id, compania_id)
SELECT 1, id, NULL::integer FROM roles WHERE codigo = 'ADMIN'
UNION ALL
SELECT 2, id, NULL::integer FROM roles WHERE codigo = 'PM'
UNION ALL
SELECT 3, id, NULL::integer FROM roles WHERE codigo = 'PMO'
UNION ALL
SELECT 4, id, NULL::integer FROM roles WHERE codigo = 'DIRECTOR_PMO'
UNION ALL
SELECT 5, id, NULL::integer FROM roles WHERE codigo = 'GERENCIA'
UNION ALL
SELECT 6, id, NULL::integer FROM roles WHERE codigo = 'PRESIDENCIA'
ON CONFLICT DO NOTHING;

-- 4.1 USUARIOS ADICIONALES DE PRUEBA (para validar visibilidad con roles duplicados)
INSERT INTO
    usuarios (
        id,
        nombre,
        email,
        proveedor_auth,
        area,
        activo
    )
VALUES (
        8,
        'Mateo PM',
        'mateo.pm@empresa.com',
        'GOOGLE',
        'Proyectos',
        true
    ),
    (
        9,
        'Valentina PMO',
        'valentina.pmo@empresa.com',
        'GOOGLE',
        'PMO',
        true
    ) ON CONFLICT (id) DO NOTHING;

INSERT INTO usuario_roles_compania (usuario_id, rol_id, compania_id)
SELECT 8, id, NULL::integer FROM roles WHERE codigo = 'PM'
UNION ALL
SELECT 9, id, NULL::integer FROM roles WHERE codigo = 'PMO'
ON CONFLICT DO NOTHING;

-- 5. CLASIFICACIÓN NUEVA (CATEGORÍAS DIRECTAS)
-- "Crecimiento Estratégico" y "Productividad y Mejora" exigen evaluación
-- financiera obligatoria; "Sostenimiento y Continuidad" no.
INSERT INTO
    categorias (id, nombre, requiere_evaluacion_obligatoria)
VALUES (1, 'Crecimiento Estratégico', true),
    (2, 'Productividad y Mejora', true),
    (
        3,
        'Sostenimiento y Continuidad',
        false
    ) ON CONFLICT (id) DO NOTHING;

-- 6. CLASIFICACIÓN TRADICIONAL - GRUPOS
INSERT INTO
    grupos (id, nombre)
VALUES (1, 'Fortalecer'),
    (2, 'Crecer'),
    (3, 'Transformar') ON CONFLICT (id) DO NOTHING;

-- 7. CLASIFICACIÓN TRADICIONAL - PROGRAMAS
INSERT INTO
    programas (id, id_grupo, nombre)
VALUES (
        1,
        1,
        'Productividad y/o Mejoras Costo-Gasto'
    ),
    (
        2,
        1,
        'Sostenimiento de negocio'
    ),
    (3, 1, 'Desarrollo Sostenible'),
    (
        4,
        1,
        'SST & Bienestar Social'
    ),
    (5, 2, 'Capacidad vs Demanda'),
    (
        6,
        2,
        'Innovación Incremental (H1)'
    ),
    (
        7,
        3,
        'Innovación Radical (H2 y H3)'
    ) ON CONFLICT (id) DO NOTHING;

-- 8. CLASIFICACIÓN TRADICIONAL - SUBPROGRAMAS
INSERT INTO
    subprogramas (
        id,
        programa_id,
        nombre,
        requiere_evaluacion_obligatoria
    )
VALUES (
        1,
        1,
        'Productividad y/o Mejoras Costo-Gasto',
        true
    ),
    (
        2,
        2,
        'Mantenimiento Industrial (Actualización por Obsolescencia)',
        false
    ),
    (
        3,
        2,
        'Mantenimiento Industrial (Mantener Vida Útil de los Activos/Reemplazar)',
        false
    ),
    (
        4,
        2,
        'Riesgo no SST (Red contra incendios-PML)',
        false
    ),
    (
        5,
        2,
        'Cumplimiento Normativo - Calidad - Certificaciones',
        false
    ),
    (
        6,
        2,
        'Mantenimiento Obras Civiles',
        false
    ),
    (7, 3, 'Agua', false),
    (
        8,
        3,
        'Energía (eléctrica-térmica)',
        false
    ),
    (
        9,
        3,
        'Generación de Residuos',
        false
    ),
    (
        10,
        4,
        'Reducción accidental - Ausentismo',
        false
    ),
    (
        11,
        4,
        'Bienestar Social',
        false
    ),
    (
        12,
        5,
        'Capacidad vs Demanda',
        true
    ),
    (
        13,
        6,
        'Innovación Incremental (H1)',
        true
    ),
    (
        14,
        7,
        'Innovación Radical (H2 y H3)',
        true
    ) ON CONFLICT (id) DO NOTHING;

-- Usuario de prueba SIN NINGÚN ROL (para probar la pantalla de "pendiente")
INSERT INTO
    usuarios (
        id,
        nombre,
        email,
        proveedor_auth,
        area,
        activo
    )
VALUES (
        10,
        'Nuevo Sin Rol',
        'nuevo.sinrol@empresa.com',
        'GOOGLE',
        'Sin asignar',
        true
    ) ON CONFLICT (id) DO NOTHING;

-- 9. REINICIAR Y SINCRONIZAR SECUENCIAS AUTOINCREMENTALES
SELECT setval ( 'roles_id_seq', ( SELECT MAX(id) FROM roles ) );

SELECT setval (
        'companias_id_seq', (
            SELECT MAX(id)
            FROM companias
        )
    );

SELECT setval (
        'usuarios_id_seq', (
            SELECT MAX(id)
            FROM usuarios
        )
    );

SELECT setval (
        'categorias_id_seq', (
            SELECT MAX(id)
            FROM categorias
        )
    );

SELECT setval ( 'grupos_id_seq', ( SELECT MAX(id) FROM grupos ) );

SELECT setval (
        'programas_id_seq', (
            SELECT MAX(id)
            FROM programas
        )
    );

SELECT setval (
        'subprogramas_id_seq', (
            SELECT MAX(id)
            FROM subprogramas
        )
    );