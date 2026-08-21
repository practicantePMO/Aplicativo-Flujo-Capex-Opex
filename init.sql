-- Limpieza inicial para recreación limpia
DROP TABLE IF EXISTS historico_aprobaciones CASCADE;

DROP TABLE IF EXISTS asignaciones_proceso CASCADE;

DROP TABLE IF EXISTS solicitud_flujo_caja CASCADE;

DROP TABLE IF EXISTS solicitud_valores CASCADE;

DROP TABLE IF EXISTS solicitud_metas CASCADE;

DROP TABLE IF EXISTS solicitud_evaluacion_financiera CASCADE;

DROP TABLE IF EXISTS solicitudes_inversion CASCADE;

DROP TABLE IF EXISTS procesos CASCADE;

DROP TABLE IF EXISTS proyectos CASCADE;

DROP TABLE IF EXISTS subprogramas CASCADE;

DROP TABLE IF EXISTS programas CASCADE;

DROP TABLE IF EXISTS grupos CASCADE;

DROP TABLE IF EXISTS usuario_roles_compania CASCADE;

DROP TABLE IF EXISTS roles CASCADE;

DROP TABLE IF EXISTS usuarios CASCADE;

DROP TABLE IF EXISTS companias CASCADE;

-- ==========================================
-- 1. ESTRUCTURA DE USUARIOS Y GOBERNANZA MULTI-COMPAÑÍA
-- ==========================================

-- TABLA COMPAÑIAS --
CREATE TABLE IF NOT EXISTS companias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    activa BOOLEAN DEFAULT TRUE
);

-- TABLA USUARIOS --

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NULL, -- Permitimos NULL porque la autenticación será vía SSO (Google/Azure AD)
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

-- TABLA ROLES --

CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL
);

-- TABLA  USUARIOS_ROLES_COMPANIA --

CREATE TABLE IF NOT EXISTS usuario_roles_compania (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios (id) ON DELETE CASCADE,
    rol_id INT REFERENCES roles (id) ON DELETE CASCADE,
    compania_id INT REFERENCES companias (id) ON DELETE CASCADE,
    CONSTRAINT unique_usuario_rol_compania UNIQUE NULLS NOT DISTINCT (
        usuario_id,
        rol_id,
        compania_id
    ) -- Permite que no se puedan repetir los usuarios --
);

-- ==========================================
-- 2. JERARQUIA DE CATEGORIAS (GRUPO -> PROGRAMA -> SUBPROGRAMA)
-- ==========================================

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

-- Función con Candado Consultivo (pg_advisory_xact_lock) para evitar la condicion de carrera
-- Este evita que si hay varios usuarios creando proyectos al mismo tiempo no se interrumpa la generacion del id
-- y queden con id diferente todos

CREATE OR REPLACE FUNCTION generar_proyecto_id()
RETURNS TRIGGER AS $$
DECLARE 
    v_anio INT;
    v_siguiente_consecutivo INT;
BEGIN
    v_anio := EXTRACT(YEAR FROM NEW.fecha_proyecto);
    NEW.anio_proyecto := v_anio;

    -- Candado exclusivo con namespace aislado (hashtext + anio) anti-colisiones globales
    PERFORM pg_advisory_xact_lock(hashtext('proyectos_id_seq'), v_anio);--Fila de espera para anios iguales--

    SELECT COALESCE(MAX(consecutivo), 0)+1 --busca el ultimo proyecto creado, si es null lo convierte en 0 + 1 --
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
-- 4. MOTOR DE PROCESOS Y SOLICITUD DE INVERSIÓN (CON REGLAS CHECK)
-- ==========================================

CREATE TABLE procesos (
    id SERIAL PRIMARY KEY,
    proyecto_id VARCHAR(20) REFERENCES proyectos (id) ON DELETE RESTRICT,
    tipo_proceso VARCHAR NOT NULL,
    estado_actual VARCHAR(50) NOT NULL DEFAULT 'BORRADOR',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    eliminado_el TIMESTAMP NULL
);

CREATE TABLE solicitudes_inversion (
    id SERIAL PRIMARY KEY,
    proceso_id INT UNIQUE REFERENCES procesos (id) ON DELETE RESTRICT,
    subprograma_id INT REFERENCES subprogramas (id),
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
    monto NUMERIC(15, 2) DEFAULT 0
);

-- ==========================================
-- 5. ASIGNACIONES E HISTORICO INMUTABLE (BLOQUEO UPDATE/DELETE)
-- ==========================================

CREATE TABLE asignaciones_proceso (
    id SERIAL PRIMARY KEY,
    proceso_id INT REFERENCES procesos (id) ON DELETE RESTRICT,
    etapa VARCHAR(50) NOT NULL,
    rol_id INT REFERENCES roles (id) NULL,
    usuario_id INT REFERENCES usuarios (id) NULL,
    estado_asignacion VARCHAR(20) DEFAULT 'PENDIENTE',
    fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_resolucion TIMESTAMP NULL
);

CREATE TABLE historico_aprobaciones (
    id SERIAL PRIMARY KEY,
    proceso_id INT REFERENCES procesos (ID) ON DELETE RESTRICT,
    etapa_origen VARCHAR(50) NOT NULL,
    etapa_destino VARCHAR(50) NOT NULL,
    accion VARCHAR(20) NOT NULL,
    razon_rechazo TEXT NULL,
    usuario_id INT REFERENCES usuarios (id),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_razon_rechazo CHECK (
        accion <> 'RECHAZADO'
        OR (
            razon_rechazo IS NOT NULL
            AND TRIM(razon_rechazo) <> ''
        )
    )
);

-- Trigger para GARANTIZAR Inmutabilidad en historico_aprobaciones (No UPDATE, No DELETE)
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

--Acelera la busqueda de ciertos datos

CREATE INDEX idx_usuario_roles ON usuario_roles_compania (usuario_id, compania_id);

CREATE INDEX idx_asignaciones_usuario ON asignaciones_proceso (usuario_id, estado_asignacion);

CREATE INDEX idx_asignaciones_rol ON asignaciones_proceso (rol_id, estado_asignacion);

CREATE INDEX idx_proyectos_anio ON proyectos (anio_proyecto, consecutivo);

-- ==========================================
-- 7. DATOS MAESTROS INICIALES
-- ==========================================

INSERT INTO
    companias (id, nombre)
VALUES (1, 'Galletas'),
    (2, 'Pastas'),
    (3, 'Snacks') ON CONFLICT DO NOTHING;

INSERT INTO
    roles (codigo, nombre)
VALUES (
        'ADMIN',
        'Administrador General'
    ),
    ('PM', 'Project Manager'),
    ('PMO', 'Revisor PMO'),
    (
        'DIRECTOR_PMO',
        'Director PMO'
    ),
    (
        'PARTE_INTERESADA',
        'Parte Interesada'
    ),
    ('GERENCIA', 'Gerencia'),
    ('PRESIDENCIA', 'Presidencia') ON CONFLICT DO NOTHING;

INSERT INTO
    grupos (id, nombre)
VALUES (1, 'Fortalecer'),
    (2, 'Creer'),
    (3, 'Transformar') ON CONFLICT DO NOTHING;