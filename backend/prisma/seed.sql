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
    ),
    (
        8,
        'CONTROL_GESTION',
        'Control de Gestión'
    ),
    (
        9,
        'ACTIVOS_FIJOS',
        'Activos Fijos'
    ) ON CONFLICT (id) DO NOTHING;

-- 2. INSERTAR COMPAÑÍAS
INSERT INTO
    companias (id, nombre, activa)
VALUES (1, 'Galletas', true),
    (2, 'Pastas', true),
    (3, 'Snacks', true) ON CONFLICT (id) DO NOTHING;

-- 3. USUARIOS DE PRUEBA
-- Set amplio a propósito para poder probar visibilidad real: varios PM,
-- varios GERENCIA por compañía (para probar el selector de "a qué gerente
-- enviar"), PRESIDENCIA por compañía, y varias PARTES INTERESADAS.
INSERT INTO
    usuarios (
        id,
        nombre,
        email,
        proveedor_auth,
        area,
        activo
    )
VALUES
    -- Administración
    (
        1,
        'Ana Admin',
        'ana.admin@empresa.com',
        'GOOGLE',
        'TI',
        true
    ),

-- Project Managers
(
    2,
    'Laura PM',
    'laura.pm@empresa.com',
    'GOOGLE',
    'Proyectos',
    true
),
(
    8,
    'Mateo PM',
    'mateo.pm@empresa.com',
    'GOOGLE',
    'Proyectos',
    true
),

-- PMO
(
    3,
    'Carlos PMO',
    'carlos.pmo@empresa.com',
    'GOOGLE',
    'PMO',
    true
),
(
    9,
    'Valentina PMO',
    'valentina.pmo@empresa.com',
    'GOOGLE',
    'PMO',
    true
),

-- Dirección PMO
(
    4,
    'Diana Directora PMO',
    'diana.director@empresa.com',
    'GOOGLE',
    'PMO',
    true
),

-- Gerencia: 2 gerentes en Galletas (para probar el selector con varias
-- opciones en la MISMA compañía) + 1 en Pastas + 1 en Snacks
(
    5,
    'Gerardo Gerente (Galletas)',
    'gerardo.gerencia@empresa.com',
    'GOOGLE',
    'Gerencia',
    true
),
(
    11,
    'Gabriela Gerente (Galletas)',
    'gabriela.gerencia@empresa.com',
    'GOOGLE',
    'Gerencia',
    true
),
(
    12,
    'German Gerente (Pastas)',
    'german.gerencia@empresa.com',
    'GOOGLE',
    'Gerencia',
    true
),
(
    13,
    'Gloria Gerente (Snacks)',
    'gloria.gerencia@empresa.com',
    'GOOGLE',
    'Gerencia',
    true
),

-- Presidencia: 1 por compañía
(
    6,
    'Pedro Presidencia (Galletas)',
    'pedro.presidencia@empresa.com',
    'GOOGLE',
    'Presidencia',
    true
),
(
    14,
    'Patricia Presidencia (Pastas)',
    'patricia.presidencia@empresa.com',
    'GOOGLE',
    'Presidencia',
    true
),
(
    15,
    'Pablo Presidencia (Snacks)',
    'pablo.presidencia@empresa.com',
    'GOOGLE',
    'Presidencia',
    true
),

-- Partes Interesadas
(
    7,
    'Sofia Interesada',
    'sofia.interesada@empresa.com',
    'GOOGLE',
    'Operaciones',
    true
),
(
    16,
    'Simon Interesado',
    'simon.interesado@empresa.com',
    'GOOGLE',
    'Calidad',
    true
),

-- Usuario SIN ningún rol todavía (para probar la pantalla de "pendiente
-- de asignación" y el correo automático de ROL_ASIGNADO cuando se lo den)
(
    10,
    'Nuevo Sin Rol',
    'nuevo.sinrol@empresa.com',
    'GOOGLE',
    'Sin asignar',
    true
),
(
    17,
    'Camila Control Gestion',
    'camila.cg@empresa.com',
    'GOOGLE',
    'Control de Gestión',
    true
),
(
    18,
    'Cristian Control Gestion',
    'cristian.cg@empresa.com',
    'GOOGLE',
    'Control de Gestión',
    true
),
(
    19,
    'Andrea Activos Fijos',
    'andrea.activosfijos@empresa.com',
    'GOOGLE',
    'Activos Fijos',
    true
) ON CONFLICT (id) DO NOTHING;

-- 4. ASIGNACIÓN DE ROLES POR COMPAÑÍA
-- Roles "globales" (compania_id = NULL): actúan en cualquier compañía.
INSERT INTO usuario_roles_compania (usuario_id, rol_id, compania_id)
SELECT 1, id, NULL::integer FROM roles WHERE codigo = 'ADMIN'
UNION ALL
SELECT 2, id, NULL::integer FROM roles WHERE codigo = 'PM'
UNION ALL
SELECT 8, id, NULL::integer FROM roles WHERE codigo = 'PM'
UNION ALL
SELECT 3, id, NULL::integer FROM roles WHERE codigo = 'PMO'
UNION ALL
SELECT 9, id, NULL::integer FROM roles WHERE codigo = 'PMO'
UNION ALL
SELECT 4, id, NULL::integer FROM roles WHERE codigo = 'DIRECTOR_PMO'
UNION ALL
SELECT 7, id, NULL::integer FROM roles WHERE codigo = 'PARTE_INTERESADA'
UNION ALL
SELECT 16, id, NULL::integer FROM roles WHERE codigo = 'PARTE_INTERESADA'
UNION ALL
SELECT 17, id, NULL::integer FROM roles WHERE codigo = 'CONTROL_GESTION'
UNION ALL
SELECT 18, id, NULL::integer FROM roles WHERE codigo = 'CONTROL_GESTION'
UNION ALL
SELECT 19, id, NULL::integer FROM roles WHERE codigo = 'ACTIVOS_FIJOS'
ON CONFLICT DO NOTHING;

-- Roles puntuales por compañía (GERENCIA y PRESIDENCIA sí quedan atados a UNA
-- compañía específica, para poder probar bien la visibilidad y el selector).
INSERT INTO
    usuario_roles_compania (
        usuario_id,
        rol_id,
        compania_id
    )
SELECT 5, id, 1
FROM roles
WHERE
    codigo = 'GERENCIA' -- Gerardo -> Galletas
UNION ALL
SELECT 11, id, 1
FROM roles
WHERE
    codigo = 'GERENCIA' -- Gabriela -> Galletas (2do gerente, mismo compañía)
UNION ALL
SELECT 12, id, 2
FROM roles
WHERE
    codigo = 'GERENCIA' -- German -> Pastas
UNION ALL
SELECT 13, id, 3
FROM roles
WHERE
    codigo = 'GERENCIA' -- Gloria -> Snacks
UNION ALL
SELECT 6, id, 1
FROM roles
WHERE
    codigo = 'PRESIDENCIA' -- Pedro -> Galletas
UNION ALL
SELECT 14, id, 2
FROM roles
WHERE
    codigo = 'PRESIDENCIA' -- Patricia -> Pastas
UNION ALL
SELECT 15, id, 3
FROM roles
WHERE
    codigo = 'PRESIDENCIA' -- Pablo -> Snacks
    ON CONFLICT DO NOTHING;

-- 5. CLASIFICACIÓN NUEVA (CATEGORÍAS DIRECTAS)
-- "Crecimiento Estratégico" y "Productividad y Mejora" exigen evaluación
-- financiera obligatoria; "Sostenimiento y Continuidad" no.
INSERT INTO
    categorias (
        id,
        nombre,
        requiere_evaluacion_obligatoria
    )
VALUES (
        1,
        'Crecimiento Estratégico',
        true
    ),
    (
        2,
        'Productividad y Mejora',
        true
    ),
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

-- 10. EMPRESAS DENTRO DE CADA COMPAÑÍA
-- ⚠️ AJUSTA esta lista con los nombres reales — dejé Noel y Pozuelo para
-- Galletas como ejemplo (los mencionaste tú), pero agrega las que falten
-- de Pastas y Snacks, y las que falten de Galletas también.
INSERT INTO
    empresas (id, nombre, compania_id)
VALUES (1, 'Noel', 1),
    (2, 'Pozuelo', 1) ON CONFLICT (id) DO NOTHING;

SELECT setval (
        'empresas_id_seq', (
            SELECT MAX(id)
            FROM empresas
        )
    );

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