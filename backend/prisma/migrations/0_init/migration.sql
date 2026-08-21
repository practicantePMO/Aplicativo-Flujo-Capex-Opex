-- ==========================================
-- LIMPIEZA INICIAL PARA RECREACIÓN LIMPIA
-- ==========================================
DROP TABLE IF EXISTS historico_aprobaciones CASCADE;

DROP TABLE IF EXISTS asignaciones_proceso CASCADE;

DROP TABLE IF EXISTS solicitud_flujo_caja CASCADE;

DROP TABLE IF EXISTS solicitud_valores CASCADE;

DROP TABLE IF EXISTS solicitud_metas CASCADE;

DROP TABLE IF EXISTS solicitud_evaluacion_financiera CASCADE;

DROP TABLE IF EXISTS solicitudes_inversion CASCADE;

DROP TABLE IF EXISTS categorias CASCADE;

DROP TABLE IF EXISTS procesos CASCADE;

DROP TABLE IF EXISTS proyectos CASCADE;

DROP TABLE IF EXISTS subprogramas CASCADE;

DROP TABLE IF EXISTS programas CASCADE;

DROP TABLE IF EXISTS grupos CASCADE;

DROP TABLE IF EXISTS usuario_roles_compania CASCADE;

DROP TABLE IF EXISTS roles CASCADE;

DROP TABLE IF EXISTS usuarios CASCADE;

DROP TABLE IF EXISTS companias CASCADE;

DROP TYPE IF EXISTS tipo_clasificacion_enum CASCADE;

-- ==========================================
-- 1. ESTRUCTURA DE USUARIOS Y GOBERNANZA MULTI-COMPAÑÍA
-- ==========================================

CREATE TABLE companias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    activa BOOLEAN DEFAULT TRUE
);

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NULL,
    proveedor_auth VARCHAR(50) NOT NULL DEFAULT 'GOOGLE' CHECK (
        proveedor_auth IN (
            'GOOGLE',
            'AWS_COGNITO',
            'AZURE_AD'
        )
    ),
    area VARCHAR(100),
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    eliminado_el TIMESTAMP NULL
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE usuario_roles_compania (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios (id) ON DELETE CASCADE,
    rol_id INT REFERENCES roles (id) ON DELETE CASCADE,
    compania_id INT REFERENCES companias (id) ON DELETE CASCADE,
    CONSTRAINT unique_usuario_rol_compania UNIQUE NULLS NOT DISTINCT (
        usuario_id,
        rol_id,
        compania_id
    )
);

-- ==========================================
-- 2. JERARQUÍA DE CATEGORÍAS Y CLASIFICACIÓN
-- ==========================================

-- Clasificación Tradicional --
CREATE TABLE grupos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE programas (
    id SERIAL PRIMARY KEY,
    id_grupo INT REFERENCES grupos (id) ON DELETE CASCADE,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE subprogramas (
    id SERIAL PRIMARY KEY,
    programa_id INT REFERENCES programas (id) ON DELETE CASCADE,
    nombre VARCHAR(100) NOT NULL,
    requiere_evaluacion_obligatoria BOOLEAN DEFAULT FALSE
);

-- Clasificación Nueva Directa --
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    eliminado_el TIMESTAMP NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enum para solicitudes --
CREATE TYPE tipo_clasificacion_enum AS ENUM ('TRADICIONAL', 'NUEVA');

-- ==========================================
-- 3. PROYECTOS E ID ÚNICO CON CANDADO ANTI-CONCURRENCIA
-- ==========================================

CREATE TABLE proyectos (
    id VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    compania_id INT REFERENCES companias (id),
    fecha_proyecto DATE NOT NULL,
    anio_proyecto INT NOT NULL,
    consecutivo INT NOT NULL,
    creado_por INT REFERENCES usuarios (id),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    eliminado_el TIMESTAMP NULL
);

CREATE OR REPLACE FUNCTION generar_proyecto_id()
RETURNS TRIGGER AS $$
DECLARE 
    v_anio INT;
    v_siguiente_consecutivo INT;
BEGIN
    v_anio := EXTRACT(YEAR FROM NEW.fecha_proyecto);
    NEW.anio_proyecto := v_anio;

    -- Candado exclusivo para evitar condiciones de carrera en solicitudes simultáneas
    PERFORM pg_advisory_xact_lock(hashtext('proyectos_id_seq'), v_anio);

    SELECT COALESCE(MAX(consecutivo), 0) + 1
    INTO v_siguiente_consecutivo
    FROM proyectos
    WHERE anio_proyecto = v_anio;

    NEW.consecutivo := v_siguiente_consecutivo;
    NEW.id := v_anio || LPAD(v_siguiente_consecutivo::TEXT, 3, '0');

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generar_proyecto_id
BEFORE INSERT ON proyectos 
FOR EACH ROW
EXECUTE FUNCTION generar_proyecto_id();

-- ==========================================
-- 4. MOTOR DE PROCESOS Y SOLICITUD DE INVERSIÓN
-- ==========================================

CREATE TABLE procesos (
    id SERIAL PRIMARY KEY,
    proyecto_id VARCHAR(20) REFERENCES proyectos (id) ON DELETE CASCADE,
    tipo_proceso VARCHAR NOT NULL,
    estado_actual VARCHAR(50) NOT NULL DEFAULT 'BORRADOR',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    eliminado_el TIMESTAMP NULL
);

CREATE TABLE solicitudes_inversion (
    id SERIAL PRIMARY KEY,
    proceso_id INT UNIQUE REFERENCES procesos (id) ON DELETE CASCADE,
    tipo_clasificacion tipo_clasificacion_enum NOT NULL DEFAULT 'TRADICIONAL',
    subprograma_id INT REFERENCES subprogramas (id),
    categoria_id INT REFERENCES categorias (id),
    entregable_planeado TEXT,
    tiene_evaluacion_financiera BOOLEAN NOT NULL DEFAULT FALSE,
    justificacion_sin_evaluacion TEXT,
    responsable_pm_id INT REFERENCES usuarios (id),
    link_acta_aprobacion TEXT NULL,
    link_plan_proyecto TEXT NULL,
    link_presentacion_puertas_3 TEXT NULL,
    CONSTRAINT chk_justificacion_evaluacion CHECK (
        tiene_evaluacion_financiera = TRUE
        OR (
            justificacion_sin_evaluacion IS NOT NULL
            AND TRIM(justificacion_sin_evaluacion) <> ''
        )
    )
);

CREATE TABLE solicitud_evaluacion_financiera (
    id SERIAL PRIMARY KEY,
    solicitud_id INT UNIQUE REFERENCES solicitudes_inversion (id) ON DELETE CASCADE,
    tir NUMERIC(8, 2),
    vpn NUMERIC(15, 2),
    payback NUMERIC(8, 2)
);

CREATE TABLE solicitud_metas (
    id SERIAL PRIMARY KEY,
    solicitud_id INT REFERENCES solicitudes_inversion (id) ON DELETE CASCADE,
    compromiso TEXT NOT NULL,
    fecha_inicio DATE NOT NULL,
    indicador TEXT NOT NULL
);

CREATE TABLE solicitud_valores (
    id SERIAL PRIMARY KEY,
    solicitud_id INT REFERENCES solicitudes_inversion (id) ON DELETE CASCADE,
    categoria VARCHAR(20) NOT NULL,
    usd NUMERIC(15, 2),
    cop NUMERIC(15, 2)
);

CREATE TABLE solicitud_flujo_caja (
    id SERIAL PRIMARY KEY,
    solicitud_id INT REFERENCES solicitudes_inversion (id) ON DELETE CASCADE,
    tipo VARCHAR(20) NOT NULL,
    anio INT NOT NULL,
    mes INT NOT NULL CHECK (mes BETWEEN 1 AND 12),
    monto NUMERIC(15, 2) DEFAULT 0
);

-- ==========================================
-- 5. ASIGNACIONES E HISTÓRICO INMUTABLE
-- ==========================================

CREATE TABLE asignaciones_proceso (
    id SERIAL PRIMARY KEY,
    proceso_id INT REFERENCES procesos (id) ON DELETE CASCADE,
    etapa VARCHAR(50) NOT NULL,
    rol_id INT REFERENCES roles (id) NULL,
    usuario_id INT REFERENCES usuarios (id) NULL,
    estado_asignacion VARCHAR(20) DEFAULT 'PENDIENTE',
    fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_resolucion TIMESTAMP NULL
);

CREATE TABLE historico_aprobaciones (
    id SERIAL PRIMARY KEY,
    proceso_id INT REFERENCES procesos (id) ON DELETE CASCADE,
    etapa_origen VARCHAR(50) NOT NULL,
    etapa_destino VARCHAR(50) NOT NULL,
    accion VARCHAR(20) NOT NULL,
    razon_rechazo TEXT NULL,
    usuario_id INT REFERENCES usuarios (id),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_razon_rechazo CHECK (
        accion NOT IN('RECHAZADO', 'CANCELADO')
        OR (
            razon_rechazo IS NOT NULL
            AND TRIM(razon_rechazo) <> ''
        )
    )
);

CREATE OR REPLACE FUNCTION bloq_update_delete_historico()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'Operación denegada por seguridad: La tabla historico_aprobaciones es inmutable (Append-Only) para proteger la pista de auditoría.';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_bloq_update_delete_historico
BEFORE UPDATE OR DELETE ON historico_aprobaciones
FOR EACH ROW
EXECUTE FUNCTION bloq_update_delete_historico();

-- ==========================================
-- 6. ÍNDICES DE ALTO RENDIMIENTO
-- ==========================================

CREATE INDEX idx_usuario_roles ON usuario_roles_compania (usuario_id, compania_id);

CREATE INDEX idx_asignaciones_usuario ON asignaciones_proceso (usuario_id, estado_asignacion);

CREATE INDEX idx_asignaciones_rol ON asignaciones_proceso (rol_id, estado_asignacion);

CREATE INDEX idx_proyectos_anio ON proyectos (anio_proyecto, consecutivo);

-- ==========================================
-- 7. DATOS MAESTROS INICIALES (SEED INTEGRADO)
-- ==========================================

INSERT INTO
    companias (id, nombre, activa)
VALUES (1, 'Galletas', true),
    (2, 'Pasas', true),
    (3, 'Snacks', true);

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
    );

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
    );

INSERT INTO
    usuario_roles_compania (
        usuario_id,
        rol_id,
        compania_id
    )
VALUES (1, 1, NULL),
    (2, 2, NULL),
    (3, 3, NULL),
    (4, 4, NULL),
    (5, 5, NULL),
    (6, 6, NULL),
    (7, 7, NULL);

INSERT INTO
    categorias (id, nombre)
VALUES (1, 'Conocimiento Estratégico'),
    (2, 'Productividad y Mejora'),
    (
        3,
        'Sostenimiento y Continuidad'
    );

INSERT INTO
    grupos (id, nombre)
VALUES (1, 'Fortalecer'),
    (2, 'Crecer'),
    (3, 'Transformar');

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
    );

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
        false
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
        false
    ),
    (
        13,
        6,
        'Innovación Incremental (H1)',
        false
    ),
    (
        14,
        7,
        'Innovación Radical (H2 y H3)',
        false
    );

SELECT setval (
        'companias_id_seq', (
            SELECT MAX(id)
            FROM companias
        )
    );

SELECT setval ( 'roles_id_seq', ( SELECT MAX(id) FROM roles ) );

SELECT setval (
        'usuarios_id_seq', (
            SELECT MAX(id)
            FROM usuarios
        )
    );

SELECT setval (
        'usuario_roles_compania_id_seq', (
            SELECT MAX(id)
            FROM usuario_roles_compania
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