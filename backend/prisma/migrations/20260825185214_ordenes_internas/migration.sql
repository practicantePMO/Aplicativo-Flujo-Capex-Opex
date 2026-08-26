-- =====================================================================
-- PROCESO NUEVO: ÓRDENES INTERNAS
-- =====================================================================

-- 1. Grupo contenedor (1 por proyecto)
CREATE TABLE grupos_ordenes_internas (
    id SERIAL PRIMARY KEY,
    proyecto_id VARCHAR(20) NOT NULL UNIQUE REFERENCES proyectos (id),
    nombre VARCHAR(150),
    estado VARCHAR(20) NOT NULL DEFAULT 'ABIERTO',
    fecha_creacion TIMESTAMP DEFAULT now()
);

-- 2. Cada Orden Interna individual (también es un "proceso" genérico)
CREATE TABLE ordenes_internas (
    id SERIAL PRIMARY KEY,
    grupo_id INT NOT NULL REFERENCES grupos_ordenes_internas (id),
    proceso_id INT NOT NULL UNIQUE REFERENCES procesos (id),
    numero_oi VARCHAR(50) NOT NULL,
    nombre_descriptivo VARCHAR(255) NOT NULL,
    tipo_orden VARCHAR(10) NOT NULL,
    es_control_cambios BOOLEAN NOT NULL DEFAULT false,

-- Sección 1
centro_costos VARCHAR(100),
oficina_ventas VARCHAR(100),
linea_marca VARCHAR(100),
cliente VARCHAR(150),
ramo VARCHAR(100),
porcentaje_1 DECIMAL(5, 2),

-- Sección 2
activo_fijo_curso VARCHAR(150),
tipo_activo VARCHAR(100),
porcentaje_2 DECIMAL(5, 2),
presupuesto DECIMAL(15, 2),
activo_real_productivo VARCHAR(150),

-- Sección 4 (solo Control Gestión, mientras está PENDIENTE)
grupo_texto VARCHAR(150),
    observaciones_cg TEXT,

    responsable_pm_id INT REFERENCES usuarios (id),
    control_gestion_asignado_id INT REFERENCES usuarios (id),
    fecha_creacion TIMESTAMP DEFAULT now()
);

-- 3. Sección 3: Valor Total manual (solo si es_control_cambios = true)
CREATE TABLE oi_valores (
    id SERIAL PRIMARY KEY,
    orden_interna_id INT NOT NULL REFERENCES ordenes_internas (id),
    categoria VARCHAR(20) NOT NULL,
    usd DECIMAL(15, 2),
    cop DECIMAL(15, 2)
);

-- 4. Histórico SOLO del cierre del grupo completo
CREATE TABLE grupo_oi_historico_cierre (
    id SERIAL PRIMARY KEY,
    grupo_id INT NOT NULL REFERENCES grupos_ordenes_internas (id),
    accion VARCHAR(30) NOT NULL,
    observaciones TEXT,
    usuario_id INT NOT NULL REFERENCES usuarios (id),
    fecha_registro TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_ordenes_internas_grupo ON ordenes_internas (grupo_id);

CREATE INDEX idx_oi_valores_orden ON oi_valores (orden_interna_id);

CREATE INDEX idx_grupo_oi_historico_grupo ON grupo_oi_historico_cierre (grupo_id);