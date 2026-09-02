--
-- PostgreSQL database dump
--

\restrict pahpP981NIJHlDQfOLylKzk7jbQf50uTjNEJaZVi15WinzwtmBhvKkWhosG49UH

-- Dumped from database version 16.14
-- Dumped by pg_dump version 16.14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.usuario_roles_compania DROP CONSTRAINT IF EXISTS usuario_roles_compania_usuario_id_fkey;
ALTER TABLE IF EXISTS ONLY public.usuario_roles_compania DROP CONSTRAINT IF EXISTS usuario_roles_compania_rol_id_fkey;
ALTER TABLE IF EXISTS ONLY public.usuario_roles_compania DROP CONSTRAINT IF EXISTS usuario_roles_compania_compania_id_fkey;
ALTER TABLE IF EXISTS ONLY public.subprogramas DROP CONSTRAINT IF EXISTS subprogramas_programa_id_fkey;
ALTER TABLE IF EXISTS ONLY public.solicitudes_inversion DROP CONSTRAINT IF EXISTS solicitudes_inversion_subprograma_id_fkey;
ALTER TABLE IF EXISTS ONLY public.solicitudes_inversion DROP CONSTRAINT IF EXISTS solicitudes_inversion_responsable_pm_id_fkey;
ALTER TABLE IF EXISTS ONLY public.solicitudes_inversion DROP CONSTRAINT IF EXISTS solicitudes_inversion_proceso_id_fkey;
ALTER TABLE IF EXISTS ONLY public.solicitudes_inversion DROP CONSTRAINT IF EXISTS solicitudes_inversion_categoria_id_fkey;
ALTER TABLE IF EXISTS ONLY public.solicitud_valores DROP CONSTRAINT IF EXISTS solicitud_valores_solicitud_id_fkey;
ALTER TABLE IF EXISTS ONLY public.solicitud_metas DROP CONSTRAINT IF EXISTS solicitud_metas_solicitud_id_fkey;
ALTER TABLE IF EXISTS ONLY public.solicitud_flujo_caja DROP CONSTRAINT IF EXISTS solicitud_flujo_caja_solicitud_id_fkey;
ALTER TABLE IF EXISTS ONLY public.solicitud_evaluacion_financiera DROP CONSTRAINT IF EXISTS solicitud_evaluacion_financiera_solicitud_id_fkey;
ALTER TABLE IF EXISTS ONLY public.proyectos DROP CONSTRAINT IF EXISTS proyectos_creado_por_fkey;
ALTER TABLE IF EXISTS ONLY public.proyectos DROP CONSTRAINT IF EXISTS proyectos_compania_id_fkey;
ALTER TABLE IF EXISTS ONLY public.proyectos_aplazamientos DROP CONSTRAINT IF EXISTS proyectos_aplazamientos_usuario_id_fkey;
ALTER TABLE IF EXISTS ONLY public.proyectos_aplazamientos DROP CONSTRAINT IF EXISTS proyectos_aplazamientos_proyecto_id_fkey;
ALTER TABLE IF EXISTS ONLY public.programas DROP CONSTRAINT IF EXISTS programas_id_grupo_fkey;
ALTER TABLE IF EXISTS ONLY public.procesos DROP CONSTRAINT IF EXISTS procesos_proyecto_id_fkey;
ALTER TABLE IF EXISTS ONLY public.ordenes_internas DROP CONSTRAINT IF EXISTS ordenes_internas_responsable_pm_id_fkey;
ALTER TABLE IF EXISTS ONLY public.ordenes_internas DROP CONSTRAINT IF EXISTS ordenes_internas_proceso_id_fkey;
ALTER TABLE IF EXISTS ONLY public.ordenes_internas DROP CONSTRAINT IF EXISTS ordenes_internas_grupo_id_fkey;
ALTER TABLE IF EXISTS ONLY public.ordenes_internas DROP CONSTRAINT IF EXISTS ordenes_internas_control_gestion_asignado_id_fkey;
ALTER TABLE IF EXISTS ONLY public.ordenes_internas DROP CONSTRAINT IF EXISTS ordenes_internas_control_cambio_id_fkey;
ALTER TABLE IF EXISTS ONLY public.oi_valores DROP CONSTRAINT IF EXISTS oi_valores_orden_interna_id_fkey;
ALTER TABLE IF EXISTS ONLY public.historico_aprobaciones DROP CONSTRAINT IF EXISTS historico_aprobaciones_usuario_id_fkey;
ALTER TABLE IF EXISTS ONLY public.historico_aprobaciones DROP CONSTRAINT IF EXISTS historico_aprobaciones_proceso_id_fkey;
ALTER TABLE IF EXISTS ONLY public.grupos_ordenes_internas DROP CONSTRAINT IF EXISTS grupos_ordenes_internas_proyecto_id_fkey;
ALTER TABLE IF EXISTS ONLY public.grupo_oi_historico_cierre DROP CONSTRAINT IF EXISTS grupo_oi_historico_cierre_usuario_id_fkey;
ALTER TABLE IF EXISTS ONLY public.grupo_oi_historico_cierre DROP CONSTRAINT IF EXISTS grupo_oi_historico_cierre_grupo_id_fkey;
ALTER TABLE IF EXISTS ONLY public.controles_cambio DROP CONSTRAINT IF EXISTS controles_cambio_responsable_pm_id_fkey;
ALTER TABLE IF EXISTS ONLY public.controles_cambio DROP CONSTRAINT IF EXISTS controles_cambio_proyecto_id_fkey;
ALTER TABLE IF EXISTS ONLY public.controles_cambio DROP CONSTRAINT IF EXISTS controles_cambio_proceso_id_fkey;
ALTER TABLE IF EXISTS ONLY public.control_cambio_anexos DROP CONSTRAINT IF EXISTS control_cambio_anexos_control_cambio_id_fkey;
ALTER TABLE IF EXISTS ONLY public.asignaciones_proceso DROP CONSTRAINT IF EXISTS asignaciones_proceso_usuario_id_fkey;
ALTER TABLE IF EXISTS ONLY public.asignaciones_proceso DROP CONSTRAINT IF EXISTS asignaciones_proceso_rol_id_fkey;
ALTER TABLE IF EXISTS ONLY public.asignaciones_proceso DROP CONSTRAINT IF EXISTS asignaciones_proceso_proceso_id_fkey;
ALTER TABLE IF EXISTS ONLY public.actas_cierre DROP CONSTRAINT IF EXISTS actas_cierre_responsable_pm_id_fkey;
ALTER TABLE IF EXISTS ONLY public.actas_cierre DROP CONSTRAINT IF EXISTS actas_cierre_proyecto_id_fkey;
ALTER TABLE IF EXISTS ONLY public.actas_cierre DROP CONSTRAINT IF EXISTS actas_cierre_proceso_id_fkey;
ALTER TABLE IF EXISTS ONLY public.actas_cierre DROP CONSTRAINT IF EXISTS actas_cierre_control_gestion_asignado_id_fkey;
ALTER TABLE IF EXISTS ONLY public.acta_cierre_valores DROP CONSTRAINT IF EXISTS acta_cierre_valores_acta_cierre_id_fkey;
ALTER TABLE IF EXISTS ONLY public.acta_cierre_oi_valores_reales DROP CONSTRAINT IF EXISTS acta_cierre_oi_valores_reales_orden_interna_id_fkey;
ALTER TABLE IF EXISTS ONLY public.acta_cierre_oi_valores_reales DROP CONSTRAINT IF EXISTS acta_cierre_oi_valores_reales_acta_cierre_id_fkey;
ALTER TABLE IF EXISTS ONLY public.acta_cierre_metas DROP CONSTRAINT IF EXISTS acta_cierre_metas_solicitud_meta_id_fkey;
ALTER TABLE IF EXISTS ONLY public.acta_cierre_metas DROP CONSTRAINT IF EXISTS acta_cierre_metas_acta_cierre_id_fkey;
ALTER TABLE IF EXISTS ONLY public.acta_cierre_flujo_caja DROP CONSTRAINT IF EXISTS acta_cierre_flujo_caja_acta_cierre_id_fkey;
ALTER TABLE IF EXISTS ONLY public.acta_cierre_entregables DROP CONSTRAINT IF EXISTS acta_cierre_entregables_acta_cierre_id_fkey;
DROP TRIGGER IF EXISTS trigger_generar_proyecto_id ON public.proyectos;
DROP TRIGGER IF EXISTS trigger_bloq_update_delete_historico ON public.historico_aprobaciones;
DROP INDEX IF EXISTS public.unique_solicitud_activa_por_proyecto;
DROP INDEX IF EXISTS public.proyectos_anio_proyecto_consecutivo_idx;
DROP INDEX IF EXISTS public.idx_usuario_roles;
DROP INDEX IF EXISTS public.idx_asignaciones_usuario;
DROP INDEX IF EXISTS public.idx_asignaciones_rol;
DROP INDEX IF EXISTS public.controles_cambio_proceso_id_key;
DROP INDEX IF EXISTS public.actas_cierre_proyecto_id_key;
DROP INDEX IF EXISTS public.actas_cierre_proceso_id_key;
ALTER TABLE IF EXISTS ONLY public.usuarios DROP CONSTRAINT IF EXISTS usuarios_pkey;
ALTER TABLE IF EXISTS ONLY public.usuarios DROP CONSTRAINT IF EXISTS usuarios_email_key;
ALTER TABLE IF EXISTS ONLY public.usuario_roles_compania DROP CONSTRAINT IF EXISTS usuario_roles_compania_pkey;
ALTER TABLE IF EXISTS ONLY public.usuario_roles_compania DROP CONSTRAINT IF EXISTS unique_usuario_rol_compania;
ALTER TABLE IF EXISTS ONLY public.subprogramas DROP CONSTRAINT IF EXISTS subprogramas_pkey;
ALTER TABLE IF EXISTS ONLY public.solicitudes_inversion DROP CONSTRAINT IF EXISTS solicitudes_inversion_proceso_id_key;
ALTER TABLE IF EXISTS ONLY public.solicitudes_inversion DROP CONSTRAINT IF EXISTS solicitudes_inversion_pkey;
ALTER TABLE IF EXISTS ONLY public.solicitud_valores DROP CONSTRAINT IF EXISTS solicitud_valores_pkey;
ALTER TABLE IF EXISTS ONLY public.solicitud_metas DROP CONSTRAINT IF EXISTS solicitud_metas_pkey;
ALTER TABLE IF EXISTS ONLY public.solicitud_flujo_caja DROP CONSTRAINT IF EXISTS solicitud_flujo_caja_pkey;
ALTER TABLE IF EXISTS ONLY public.solicitud_evaluacion_financiera DROP CONSTRAINT IF EXISTS solicitud_evaluacion_financiera_solicitud_id_key;
ALTER TABLE IF EXISTS ONLY public.solicitud_evaluacion_financiera DROP CONSTRAINT IF EXISTS solicitud_evaluacion_financiera_pkey;
ALTER TABLE IF EXISTS ONLY public.roles DROP CONSTRAINT IF EXISTS roles_pkey;
ALTER TABLE IF EXISTS ONLY public.roles DROP CONSTRAINT IF EXISTS roles_codigo_key;
ALTER TABLE IF EXISTS ONLY public.proyectos DROP CONSTRAINT IF EXISTS proyectos_pkey;
ALTER TABLE IF EXISTS ONLY public.proyectos_aplazamientos DROP CONSTRAINT IF EXISTS proyectos_aplazamientos_pkey;
ALTER TABLE IF EXISTS ONLY public.programas DROP CONSTRAINT IF EXISTS programas_pkey;
ALTER TABLE IF EXISTS ONLY public.procesos DROP CONSTRAINT IF EXISTS procesos_pkey;
ALTER TABLE IF EXISTS ONLY public.ordenes_internas DROP CONSTRAINT IF EXISTS ordenes_internas_proceso_id_key;
ALTER TABLE IF EXISTS ONLY public.ordenes_internas DROP CONSTRAINT IF EXISTS ordenes_internas_pkey;
ALTER TABLE IF EXISTS ONLY public.oi_valores DROP CONSTRAINT IF EXISTS oi_valores_pkey;
ALTER TABLE IF EXISTS ONLY public.historico_aprobaciones DROP CONSTRAINT IF EXISTS historico_aprobaciones_pkey;
ALTER TABLE IF EXISTS ONLY public.grupos DROP CONSTRAINT IF EXISTS grupos_pkey;
ALTER TABLE IF EXISTS ONLY public.grupos_ordenes_internas DROP CONSTRAINT IF EXISTS grupos_ordenes_internas_proyecto_id_key;
ALTER TABLE IF EXISTS ONLY public.grupos_ordenes_internas DROP CONSTRAINT IF EXISTS grupos_ordenes_internas_pkey;
ALTER TABLE IF EXISTS ONLY public.grupo_oi_historico_cierre DROP CONSTRAINT IF EXISTS grupo_oi_historico_cierre_pkey;
ALTER TABLE IF EXISTS ONLY public.controles_cambio DROP CONSTRAINT IF EXISTS controles_cambio_pkey;
ALTER TABLE IF EXISTS ONLY public.control_cambio_anexos DROP CONSTRAINT IF EXISTS control_cambio_anexos_pkey;
ALTER TABLE IF EXISTS ONLY public.companias DROP CONSTRAINT IF EXISTS companias_pkey;
ALTER TABLE IF EXISTS ONLY public.companias DROP CONSTRAINT IF EXISTS companias_nombre_key;
ALTER TABLE IF EXISTS ONLY public.categorias DROP CONSTRAINT IF EXISTS categorias_pkey;
ALTER TABLE IF EXISTS ONLY public.asignaciones_proceso DROP CONSTRAINT IF EXISTS asignaciones_proceso_pkey;
ALTER TABLE IF EXISTS ONLY public.actas_cierre DROP CONSTRAINT IF EXISTS actas_cierre_pkey;
ALTER TABLE IF EXISTS ONLY public.acta_cierre_valores DROP CONSTRAINT IF EXISTS acta_cierre_valores_pkey;
ALTER TABLE IF EXISTS ONLY public.acta_cierre_oi_valores_reales DROP CONSTRAINT IF EXISTS acta_cierre_oi_valores_reales_pkey;
ALTER TABLE IF EXISTS ONLY public.acta_cierre_metas DROP CONSTRAINT IF EXISTS acta_cierre_metas_pkey;
ALTER TABLE IF EXISTS ONLY public.acta_cierre_flujo_caja DROP CONSTRAINT IF EXISTS acta_cierre_flujo_caja_pkey;
ALTER TABLE IF EXISTS ONLY public.acta_cierre_entregables DROP CONSTRAINT IF EXISTS acta_cierre_entregables_pkey;
ALTER TABLE IF EXISTS ONLY public._prisma_migrations DROP CONSTRAINT IF EXISTS _prisma_migrations_pkey;
ALTER TABLE IF EXISTS public.usuarios ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.usuario_roles_compania ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.subprogramas ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.solicitudes_inversion ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.solicitud_valores ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.solicitud_metas ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.solicitud_flujo_caja ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.solicitud_evaluacion_financiera ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.roles ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.proyectos_aplazamientos ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.programas ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.procesos ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.ordenes_internas ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.oi_valores ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.historico_aprobaciones ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.grupos_ordenes_internas ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.grupos ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.grupo_oi_historico_cierre ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.controles_cambio ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.control_cambio_anexos ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.companias ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.categorias ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.asignaciones_proceso ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.actas_cierre ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.acta_cierre_valores ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.acta_cierre_oi_valores_reales ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.acta_cierre_metas ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.acta_cierre_flujo_caja ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.acta_cierre_entregables ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.usuarios_id_seq;
DROP TABLE IF EXISTS public.usuarios;
DROP SEQUENCE IF EXISTS public.usuario_roles_compania_id_seq;
DROP TABLE IF EXISTS public.usuario_roles_compania;
DROP SEQUENCE IF EXISTS public.subprogramas_id_seq;
DROP TABLE IF EXISTS public.subprogramas;
DROP SEQUENCE IF EXISTS public.solicitudes_inversion_id_seq;
DROP TABLE IF EXISTS public.solicitudes_inversion;
DROP SEQUENCE IF EXISTS public.solicitud_valores_id_seq;
DROP TABLE IF EXISTS public.solicitud_valores;
DROP SEQUENCE IF EXISTS public.solicitud_metas_id_seq;
DROP TABLE IF EXISTS public.solicitud_metas;
DROP SEQUENCE IF EXISTS public.solicitud_flujo_caja_id_seq;
DROP TABLE IF EXISTS public.solicitud_flujo_caja;
DROP SEQUENCE IF EXISTS public.solicitud_evaluacion_financiera_id_seq;
DROP TABLE IF EXISTS public.solicitud_evaluacion_financiera;
DROP SEQUENCE IF EXISTS public.roles_id_seq;
DROP TABLE IF EXISTS public.roles;
DROP SEQUENCE IF EXISTS public.proyectos_aplazamientos_id_seq;
DROP TABLE IF EXISTS public.proyectos_aplazamientos;
DROP TABLE IF EXISTS public.proyectos;
DROP SEQUENCE IF EXISTS public.programas_id_seq;
DROP TABLE IF EXISTS public.programas;
DROP SEQUENCE IF EXISTS public.procesos_id_seq;
DROP TABLE IF EXISTS public.procesos;
DROP SEQUENCE IF EXISTS public.ordenes_internas_id_seq;
DROP TABLE IF EXISTS public.ordenes_internas;
DROP SEQUENCE IF EXISTS public.oi_valores_id_seq;
DROP TABLE IF EXISTS public.oi_valores;
DROP SEQUENCE IF EXISTS public.historico_aprobaciones_id_seq;
DROP TABLE IF EXISTS public.historico_aprobaciones;
DROP SEQUENCE IF EXISTS public.grupos_ordenes_internas_id_seq;
DROP TABLE IF EXISTS public.grupos_ordenes_internas;
DROP SEQUENCE IF EXISTS public.grupos_id_seq;
DROP TABLE IF EXISTS public.grupos;
DROP SEQUENCE IF EXISTS public.grupo_oi_historico_cierre_id_seq;
DROP TABLE IF EXISTS public.grupo_oi_historico_cierre;
DROP SEQUENCE IF EXISTS public.controles_cambio_id_seq;
DROP TABLE IF EXISTS public.controles_cambio;
DROP SEQUENCE IF EXISTS public.control_cambio_anexos_id_seq;
DROP TABLE IF EXISTS public.control_cambio_anexos;
DROP SEQUENCE IF EXISTS public.companias_id_seq;
DROP TABLE IF EXISTS public.companias;
DROP SEQUENCE IF EXISTS public.categorias_id_seq;
DROP TABLE IF EXISTS public.categorias;
DROP SEQUENCE IF EXISTS public.asignaciones_proceso_id_seq;
DROP TABLE IF EXISTS public.asignaciones_proceso;
DROP SEQUENCE IF EXISTS public.actas_cierre_id_seq;
DROP TABLE IF EXISTS public.actas_cierre;
DROP SEQUENCE IF EXISTS public.acta_cierre_valores_id_seq;
DROP TABLE IF EXISTS public.acta_cierre_valores;
DROP SEQUENCE IF EXISTS public.acta_cierre_oi_valores_reales_id_seq;
DROP TABLE IF EXISTS public.acta_cierre_oi_valores_reales;
DROP SEQUENCE IF EXISTS public.acta_cierre_metas_id_seq;
DROP TABLE IF EXISTS public.acta_cierre_metas;
DROP SEQUENCE IF EXISTS public.acta_cierre_flujo_caja_id_seq;
DROP TABLE IF EXISTS public.acta_cierre_flujo_caja;
DROP SEQUENCE IF EXISTS public.acta_cierre_entregables_id_seq;
DROP TABLE IF EXISTS public.acta_cierre_entregables;
DROP TABLE IF EXISTS public._prisma_migrations;
DROP FUNCTION IF EXISTS public.generar_proyecto_id();
DROP FUNCTION IF EXISTS public.bloq_update_delete_historico();
DROP TYPE IF EXISTS public."TipoClasificacion";
--
-- Name: TipoClasificacion; Type: TYPE; Schema: public; Owner: aplicativocapexopex
--

CREATE TYPE public."TipoClasificacion" AS ENUM (
    'TRADICIONAL',
    'NUEVA',
    'AMBAS'
);


ALTER TYPE public."TipoClasificacion" OWNER TO aplicativocapexopex;

--
-- Name: bloq_update_delete_historico(); Type: FUNCTION; Schema: public; Owner: aplicativocapexopex
--

CREATE FUNCTION public.bloq_update_delete_historico() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    RAISE EXCEPTION 'Operación denegada por seguridad: La tabla historico_aprobaciones es inmutable (Append-Only) para proteger la pista de auditoría.';
END;
$$;


ALTER FUNCTION public.bloq_update_delete_historico() OWNER TO aplicativocapexopex;

--
-- Name: generar_proyecto_id(); Type: FUNCTION; Schema: public; Owner: aplicativocapexopex
--

CREATE FUNCTION public.generar_proyecto_id() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    v_anio INT;
    v_siguiente_consecutivo INT;
BEGIN
    v_anio := EXTRACT(YEAR FROM NEW.fecha_proyecto);
    NEW.anio_proyecto := v_anio;
    NEW.anio_asignado := v_anio;

    PERFORM pg_advisory_xact_lock(hashtext('proyectos_id_seq'), v_anio);

    SELECT COALESCE(MAX(consecutivo), 0)+1
    INTO v_siguiente_consecutivo
    FROM proyectos
    WHERE anio_proyecto = v_anio;

    NEW.consecutivo := v_siguiente_consecutivo;
    NEW.id := v_anio || LPAD(v_siguiente_consecutivo::TEXT, 3, '0');

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.generar_proyecto_id() OWNER TO aplicativocapexopex;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: aplicativocapexopex
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO aplicativocapexopex;

--
-- Name: acta_cierre_entregables; Type: TABLE; Schema: public; Owner: aplicativocapexopex
--

CREATE TABLE public.acta_cierre_entregables (
    id integer NOT NULL,
    acta_cierre_id integer NOT NULL,
    equipo_sistema text NOT NULL,
    codigo_activo_produccion text,
    codigo_activo_montaje text,
    unidad_vida_util text,
    vida_util integer,
    observaciones text,
    anexo_url text
);


ALTER TABLE public.acta_cierre_entregables OWNER TO aplicativocapexopex;

--
-- Name: acta_cierre_entregables_id_seq; Type: SEQUENCE; Schema: public; Owner: aplicativocapexopex
--

CREATE SEQUENCE public.acta_cierre_entregables_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.acta_cierre_entregables_id_seq OWNER TO aplicativocapexopex;

--
-- Name: acta_cierre_entregables_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aplicativocapexopex
--

ALTER SEQUENCE public.acta_cierre_entregables_id_seq OWNED BY public.acta_cierre_entregables.id;


--
-- Name: acta_cierre_flujo_caja; Type: TABLE; Schema: public; Owner: aplicativocapexopex
--

CREATE TABLE public.acta_cierre_flujo_caja (
    id integer NOT NULL,
    acta_cierre_id integer NOT NULL,
    tipo character varying(20) NOT NULL,
    moneda character varying(3) DEFAULT 'COP'::character varying NOT NULL,
    anio integer NOT NULL,
    mes integer DEFAULT 1 NOT NULL,
    monto_real numeric(15,2) DEFAULT 0
);


ALTER TABLE public.acta_cierre_flujo_caja OWNER TO aplicativocapexopex;

--
-- Name: acta_cierre_flujo_caja_id_seq; Type: SEQUENCE; Schema: public; Owner: aplicativocapexopex
--

CREATE SEQUENCE public.acta_cierre_flujo_caja_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.acta_cierre_flujo_caja_id_seq OWNER TO aplicativocapexopex;

--
-- Name: acta_cierre_flujo_caja_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aplicativocapexopex
--

ALTER SEQUENCE public.acta_cierre_flujo_caja_id_seq OWNED BY public.acta_cierre_flujo_caja.id;


--
-- Name: acta_cierre_metas; Type: TABLE; Schema: public; Owner: aplicativocapexopex
--

CREATE TABLE public.acta_cierre_metas (
    id integer NOT NULL,
    acta_cierre_id integer NOT NULL,
    solicitud_meta_id integer NOT NULL,
    resultado_cierre text
);


ALTER TABLE public.acta_cierre_metas OWNER TO aplicativocapexopex;

--
-- Name: acta_cierre_metas_id_seq; Type: SEQUENCE; Schema: public; Owner: aplicativocapexopex
--

CREATE SEQUENCE public.acta_cierre_metas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.acta_cierre_metas_id_seq OWNER TO aplicativocapexopex;

--
-- Name: acta_cierre_metas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aplicativocapexopex
--

ALTER SEQUENCE public.acta_cierre_metas_id_seq OWNED BY public.acta_cierre_metas.id;


--
-- Name: acta_cierre_oi_valores_reales; Type: TABLE; Schema: public; Owner: aplicativocapexopex
--

CREATE TABLE public.acta_cierre_oi_valores_reales (
    id integer NOT NULL,
    acta_cierre_id integer NOT NULL,
    orden_interna_id integer NOT NULL,
    valor_real numeric(15,2),
    valor_real_moneda character varying(3) DEFAULT 'COP'::character varying NOT NULL
);


ALTER TABLE public.acta_cierre_oi_valores_reales OWNER TO aplicativocapexopex;

--
-- Name: acta_cierre_oi_valores_reales_id_seq; Type: SEQUENCE; Schema: public; Owner: aplicativocapexopex
--

CREATE SEQUENCE public.acta_cierre_oi_valores_reales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.acta_cierre_oi_valores_reales_id_seq OWNER TO aplicativocapexopex;

--
-- Name: acta_cierre_oi_valores_reales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aplicativocapexopex
--

ALTER SEQUENCE public.acta_cierre_oi_valores_reales_id_seq OWNED BY public.acta_cierre_oi_valores_reales.id;


--
-- Name: acta_cierre_valores; Type: TABLE; Schema: public; Owner: aplicativocapexopex
--

CREATE TABLE public.acta_cierre_valores (
    id integer NOT NULL,
    acta_cierre_id integer NOT NULL,
    categoria character varying(20) NOT NULL,
    real_usd numeric(15,2),
    real_cop numeric(15,2)
);


ALTER TABLE public.acta_cierre_valores OWNER TO aplicativocapexopex;

--
-- Name: acta_cierre_valores_id_seq; Type: SEQUENCE; Schema: public; Owner: aplicativocapexopex
--

CREATE SEQUENCE public.acta_cierre_valores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.acta_cierre_valores_id_seq OWNER TO aplicativocapexopex;

--
-- Name: acta_cierre_valores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aplicativocapexopex
--

ALTER SEQUENCE public.acta_cierre_valores_id_seq OWNED BY public.acta_cierre_valores.id;


--
-- Name: actas_cierre; Type: TABLE; Schema: public; Owner: aplicativocapexopex
--

CREATE TABLE public.actas_cierre (
    id integer NOT NULL,
    proceso_id integer NOT NULL,
    proyecto_id character varying(20) NOT NULL,
    tipo_cierre character varying(20) NOT NULL,
    responsable_pm_id integer,
    control_gestion_asignado_id integer,
    presentacion_p5_link text,
    entregable_real text,
    explicacion_ejecucion text,
    otros_entregables text,
    fecha_creacion timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.actas_cierre OWNER TO aplicativocapexopex;

--
-- Name: actas_cierre_id_seq; Type: SEQUENCE; Schema: public; Owner: aplicativocapexopex
--

CREATE SEQUENCE public.actas_cierre_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.actas_cierre_id_seq OWNER TO aplicativocapexopex;

--
-- Name: actas_cierre_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aplicativocapexopex
--

ALTER SEQUENCE public.actas_cierre_id_seq OWNED BY public.actas_cierre.id;


--
-- Name: asignaciones_proceso; Type: TABLE; Schema: public; Owner: aplicativocapexopex
--

CREATE TABLE public.asignaciones_proceso (
    id integer NOT NULL,
    proceso_id integer,
    etapa character varying(50) NOT NULL,
    rol_id integer,
    usuario_id integer,
    estado_asignacion character varying(20) DEFAULT 'PENDIENTE'::character varying,
    fecha_asignacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    fecha_resolucion timestamp without time zone
);


ALTER TABLE public.asignaciones_proceso OWNER TO aplicativocapexopex;

--
-- Name: asignaciones_proceso_id_seq; Type: SEQUENCE; Schema: public; Owner: aplicativocapexopex
--

CREATE SEQUENCE public.asignaciones_proceso_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.asignaciones_proceso_id_seq OWNER TO aplicativocapexopex;

--
-- Name: asignaciones_proceso_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aplicativocapexopex
--

ALTER SEQUENCE public.asignaciones_proceso_id_seq OWNED BY public.asignaciones_proceso.id;


--
-- Name: categorias; Type: TABLE; Schema: public; Owner: aplicativocapexopex
--

CREATE TABLE public.categorias (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    eliminado_el timestamp without time zone,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    requiere_evaluacion_obligatoria boolean DEFAULT false
);


ALTER TABLE public.categorias OWNER TO aplicativocapexopex;

--
-- Name: categorias_id_seq; Type: SEQUENCE; Schema: public; Owner: aplicativocapexopex
--

CREATE SEQUENCE public.categorias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categorias_id_seq OWNER TO aplicativocapexopex;

--
-- Name: categorias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aplicativocapexopex
--

ALTER SEQUENCE public.categorias_id_seq OWNED BY public.categorias.id;


--
-- Name: companias; Type: TABLE; Schema: public; Owner: aplicativocapexopex
--

CREATE TABLE public.companias (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    activa boolean DEFAULT true
);


ALTER TABLE public.companias OWNER TO aplicativocapexopex;

--
-- Name: companias_id_seq; Type: SEQUENCE; Schema: public; Owner: aplicativocapexopex
--

CREATE SEQUENCE public.companias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.companias_id_seq OWNER TO aplicativocapexopex;

--
-- Name: companias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aplicativocapexopex
--

ALTER SEQUENCE public.companias_id_seq OWNED BY public.companias.id;


--
-- Name: control_cambio_anexos; Type: TABLE; Schema: public; Owner: aplicativocapexopex
--

CREATE TABLE public.control_cambio_anexos (
    id integer NOT NULL,
    control_cambio_id integer NOT NULL,
    tipo character varying(30) NOT NULL,
    url text NOT NULL,
    descripcion character varying(255)
);


ALTER TABLE public.control_cambio_anexos OWNER TO aplicativocapexopex;

--
-- Name: control_cambio_anexos_id_seq; Type: SEQUENCE; Schema: public; Owner: aplicativocapexopex
--

CREATE SEQUENCE public.control_cambio_anexos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.control_cambio_anexos_id_seq OWNER TO aplicativocapexopex;

--
-- Name: control_cambio_anexos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aplicativocapexopex
--

ALTER SEQUENCE public.control_cambio_anexos_id_seq OWNED BY public.control_cambio_anexos.id;


--
-- Name: controles_cambio; Type: TABLE; Schema: public; Owner: aplicativocapexopex
--

CREATE TABLE public.controles_cambio (
    id integer NOT NULL,
    proceso_id integer NOT NULL,
    proyecto_id character varying(20) NOT NULL,
    responsable_pm_id integer,
    requiere_orden_interna boolean DEFAULT false NOT NULL,
    descripcion_cambio text,
    antecedentes text,
    justificacion text,
    impacto_alcance text,
    impacto_tiempo text,
    fecha_creacion timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP,
    anio_nuevo_propuesto integer,
    tipo_control_cambio character varying(20) DEFAULT 'GENERAL'::character varying NOT NULL
);


ALTER TABLE public.controles_cambio OWNER TO aplicativocapexopex;

--
-- Name: controles_cambio_id_seq; Type: SEQUENCE; Schema: public; Owner: aplicativocapexopex
--

CREATE SEQUENCE public.controles_cambio_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.controles_cambio_id_seq OWNER TO aplicativocapexopex;

--
-- Name: controles_cambio_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aplicativocapexopex
--

ALTER SEQUENCE public.controles_cambio_id_seq OWNED BY public.controles_cambio.id;


--
-- Name: grupo_oi_historico_cierre; Type: TABLE; Schema: public; Owner: aplicativocapexopex
--

CREATE TABLE public.grupo_oi_historico_cierre (
    id integer NOT NULL,
    grupo_id integer NOT NULL,
    accion character varying(30) NOT NULL,
    observaciones text,
    usuario_id integer NOT NULL,
    fecha_registro timestamp without time zone DEFAULT now()
);


ALTER TABLE public.grupo_oi_historico_cierre OWNER TO aplicativocapexopex;

--
-- Name: grupo_oi_historico_cierre_id_seq; Type: SEQUENCE; Schema: public; Owner: aplicativocapexopex
--

CREATE SEQUENCE public.grupo_oi_historico_cierre_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.grupo_oi_historico_cierre_id_seq OWNER TO aplicativocapexopex;

--
-- Name: grupo_oi_historico_cierre_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aplicativocapexopex
--

ALTER SEQUENCE public.grupo_oi_historico_cierre_id_seq OWNED BY public.grupo_oi_historico_cierre.id;


--
-- Name: grupos; Type: TABLE; Schema: public; Owner: aplicativocapexopex
--

CREATE TABLE public.grupos (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL
);


ALTER TABLE public.grupos OWNER TO aplicativocapexopex;

--
-- Name: grupos_id_seq; Type: SEQUENCE; Schema: public; Owner: aplicativocapexopex
--

CREATE SEQUENCE public.grupos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.grupos_id_seq OWNER TO aplicativocapexopex;

--
-- Name: grupos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aplicativocapexopex
--

ALTER SEQUENCE public.grupos_id_seq OWNED BY public.grupos.id;


--
-- Name: grupos_ordenes_internas; Type: TABLE; Schema: public; Owner: aplicativocapexopex
--

CREATE TABLE public.grupos_ordenes_internas (
    id integer NOT NULL,
    proyecto_id character varying(20) NOT NULL,
    nombre character varying(150),
    estado character varying(20) DEFAULT 'ABIERTO'::character varying NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT now()
);


ALTER TABLE public.grupos_ordenes_internas OWNER TO aplicativocapexopex;

--
-- Name: grupos_ordenes_internas_id_seq; Type: SEQUENCE; Schema: public; Owner: aplicativocapexopex
--

CREATE SEQUENCE public.grupos_ordenes_internas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.grupos_ordenes_internas_id_seq OWNER TO aplicativocapexopex;

--
-- Name: grupos_ordenes_internas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aplicativocapexopex
--

ALTER SEQUENCE public.grupos_ordenes_internas_id_seq OWNED BY public.grupos_ordenes_internas.id;


--
-- Name: historico_aprobaciones; Type: TABLE; Schema: public; Owner: aplicativocapexopex
--

CREATE TABLE public.historico_aprobaciones (
    id integer NOT NULL,
    proceso_id integer,
    etapa_origen character varying(50) NOT NULL,
    etapa_destino character varying(50) NOT NULL,
    accion character varying(20) NOT NULL,
    razon_rechazo text,
    usuario_id integer NOT NULL,
    fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    observaciones text,
    CONSTRAINT chk_razon_rechazo CHECK ((((accion)::text <> ALL ((ARRAY['RECHAZADO'::character varying, 'CANCELADO'::character varying])::text[])) OR ((razon_rechazo IS NOT NULL) AND (TRIM(BOTH FROM razon_rechazo) <> ''::text))))
);


ALTER TABLE public.historico_aprobaciones OWNER TO aplicativocapexopex;

--
-- Name: historico_aprobaciones_id_seq; Type: SEQUENCE; Schema: public; Owner: aplicativocapexopex
--

CREATE SEQUENCE public.historico_aprobaciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.historico_aprobaciones_id_seq OWNER TO aplicativocapexopex;

--
-- Name: historico_aprobaciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aplicativocapexopex
--

ALTER SEQUENCE public.historico_aprobaciones_id_seq OWNED BY public.historico_aprobaciones.id;


--
-- Name: oi_valores; Type: TABLE; Schema: public; Owner: aplicativocapexopex
--

CREATE TABLE public.oi_valores (
    id integer NOT NULL,
    orden_interna_id integer NOT NULL,
    categoria character varying(20) NOT NULL,
    usd numeric(15,2),
    cop numeric(15,2)
);


ALTER TABLE public.oi_valores OWNER TO aplicativocapexopex;

--
-- Name: oi_valores_id_seq; Type: SEQUENCE; Schema: public; Owner: aplicativocapexopex
--

CREATE SEQUENCE public.oi_valores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.oi_valores_id_seq OWNER TO aplicativocapexopex;

--
-- Name: oi_valores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aplicativocapexopex
--

ALTER SEQUENCE public.oi_valores_id_seq OWNED BY public.oi_valores.id;


--
-- Name: ordenes_internas; Type: TABLE; Schema: public; Owner: aplicativocapexopex
--

CREATE TABLE public.ordenes_internas (
    id integer NOT NULL,
    grupo_id integer NOT NULL,
    proceso_id integer NOT NULL,
    numero_oi character varying(50),
    nombre_descriptivo character varying(255) NOT NULL,
    tipo_orden character varying(10) NOT NULL,
    es_control_cambios boolean DEFAULT false NOT NULL,
    centro_costos character varying(100),
    oficina_ventas character varying(100),
    linea_marca character varying(100),
    cliente character varying(150),
    ramo character varying(100),
    porcentaje_1 numeric(5,2),
    activo_fijo_curso character varying(150),
    tipo_activo character varying(100),
    porcentaje_2 numeric(5,2),
    presupuesto numeric(15,2),
    activo_real_productivo character varying(150),
    grupo_texto character varying(150),
    observaciones_cg text,
    responsable_pm_id integer,
    control_gestion_asignado_id integer,
    fecha_creacion timestamp without time zone DEFAULT now(),
    presupuesto_moneda character varying(3) DEFAULT 'COP'::character varying NOT NULL,
    control_cambio_id integer,
    observaciones_pm text
);


ALTER TABLE public.ordenes_internas OWNER TO aplicativocapexopex;

--
-- Name: ordenes_internas_id_seq; Type: SEQUENCE; Schema: public; Owner: aplicativocapexopex
--

CREATE SEQUENCE public.ordenes_internas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ordenes_internas_id_seq OWNER TO aplicativocapexopex;

--
-- Name: ordenes_internas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aplicativocapexopex
--

ALTER SEQUENCE public.ordenes_internas_id_seq OWNED BY public.ordenes_internas.id;


--
-- Name: procesos; Type: TABLE; Schema: public; Owner: aplicativocapexopex
--

CREATE TABLE public.procesos (
    id integer NOT NULL,
    proyecto_id character varying(20),
    tipo_proceso character varying NOT NULL,
    estado_actual character varying(50) DEFAULT 'BORRADOR'::character varying NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    eliminado_el timestamp without time zone,
    CONSTRAINT chk_estado_actual_valido CHECK (((((tipo_proceso)::text = 'SOLICITUD_INVERSION'::text) AND ((estado_actual)::text = ANY ((ARRAY['BORRADOR'::character varying, 'PENDIENTE_PMO'::character varying, 'VERIFICACION_PARTES_INTERESADAS'::character varying, 'DIRECCION_PMO'::character varying, 'GERENCIA'::character varying, 'PRESIDENCIA'::character varying, 'APROBADO_FINAL'::character varying, 'CANCELADO'::character varying])::text[]))) OR (((tipo_proceso)::text = 'ORDEN_INTERNA'::text) AND ((estado_actual)::text = ANY ((ARRAY['BORRADOR'::character varying, 'PENDIENTE'::character varying, 'APROBADA'::character varying, 'CERRADA'::character varying])::text[]))) OR (((tipo_proceso)::text = 'CONTROL_CAMBIO'::text) AND ((estado_actual)::text = ANY ((ARRAY['BORRADOR'::character varying, 'PENDIENTE_PMO'::character varying, 'VERIFICACION_PARTES_INTERESADAS'::character varying, 'DIRECCION_PMO'::character varying, 'GERENCIA'::character varying, 'PRESIDENCIA'::character varying, 'APROBADO_FINAL'::character varying])::text[]))) OR (((tipo_proceso)::text = 'ACTA_CIERRE'::text) AND ((estado_actual)::text = ANY ((ARRAY['BORRADOR'::character varying, 'PENDIENTE_PMO'::character varying, 'CONTROL_GESTION'::character varying, 'VERIFICACION_PARTES_INTERESADAS'::character varying, 'DIRECCION_PMO'::character varying, 'GERENCIA'::character varying, 'PRESIDENCIA'::character varying, 'CERRADO'::character varying])::text[])))))
);


ALTER TABLE public.procesos OWNER TO aplicativocapexopex;

--
-- Name: procesos_id_seq; Type: SEQUENCE; Schema: public; Owner: aplicativocapexopex
--

CREATE SEQUENCE public.procesos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.procesos_id_seq OWNER TO aplicativocapexopex;

--
-- Name: procesos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aplicativocapexopex
--

ALTER SEQUENCE public.procesos_id_seq OWNED BY public.procesos.id;


--
-- Name: programas; Type: TABLE; Schema: public; Owner: aplicativocapexopex
--

CREATE TABLE public.programas (
    id integer NOT NULL,
    id_grupo integer,
    nombre character varying(100) NOT NULL
);


ALTER TABLE public.programas OWNER TO aplicativocapexopex;

--
-- Name: programas_id_seq; Type: SEQUENCE; Schema: public; Owner: aplicativocapexopex
--

CREATE SEQUENCE public.programas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.programas_id_seq OWNER TO aplicativocapexopex;

--
-- Name: programas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aplicativocapexopex
--

ALTER SEQUENCE public.programas_id_seq OWNED BY public.programas.id;


--
-- Name: proyectos; Type: TABLE; Schema: public; Owner: aplicativocapexopex
--

CREATE TABLE public.proyectos (
    id character varying(20) NOT NULL,
    nombre character varying(255) NOT NULL,
    compania_id integer,
    fecha_proyecto date NOT NULL,
    anio_proyecto integer NOT NULL,
    consecutivo integer NOT NULL,
    creado_por integer,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    eliminado_el timestamp without time zone,
    anio_asignado integer NOT NULL
);


ALTER TABLE public.proyectos OWNER TO aplicativocapexopex;

--
-- Name: proyectos_aplazamientos; Type: TABLE; Schema: public; Owner: aplicativocapexopex
--

CREATE TABLE public.proyectos_aplazamientos (
    id integer NOT NULL,
    proyecto_id character varying(20) NOT NULL,
    anio_anterior integer NOT NULL,
    anio_nuevo integer NOT NULL,
    motivo text NOT NULL,
    usuario_id integer NOT NULL,
    fecha_registro timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.proyectos_aplazamientos OWNER TO aplicativocapexopex;

--
-- Name: proyectos_aplazamientos_id_seq; Type: SEQUENCE; Schema: public; Owner: aplicativocapexopex
--

CREATE SEQUENCE public.proyectos_aplazamientos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.proyectos_aplazamientos_id_seq OWNER TO aplicativocapexopex;

--
-- Name: proyectos_aplazamientos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aplicativocapexopex
--

ALTER SEQUENCE public.proyectos_aplazamientos_id_seq OWNED BY public.proyectos_aplazamientos.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: aplicativocapexopex
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    codigo character varying(50) NOT NULL,
    nombre character varying(100) NOT NULL
);


ALTER TABLE public.roles OWNER TO aplicativocapexopex;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: aplicativocapexopex
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO aplicativocapexopex;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aplicativocapexopex
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: solicitud_evaluacion_financiera; Type: TABLE; Schema: public; Owner: aplicativocapexopex
--

CREATE TABLE public.solicitud_evaluacion_financiera (
    id integer NOT NULL,
    solicitud_id integer,
    tir numeric(8,2),
    vpn numeric(15,2),
    payback numeric(8,2)
);


ALTER TABLE public.solicitud_evaluacion_financiera OWNER TO aplicativocapexopex;

--
-- Name: solicitud_evaluacion_financiera_id_seq; Type: SEQUENCE; Schema: public; Owner: aplicativocapexopex
--

CREATE SEQUENCE public.solicitud_evaluacion_financiera_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.solicitud_evaluacion_financiera_id_seq OWNER TO aplicativocapexopex;

--
-- Name: solicitud_evaluacion_financiera_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aplicativocapexopex
--

ALTER SEQUENCE public.solicitud_evaluacion_financiera_id_seq OWNED BY public.solicitud_evaluacion_financiera.id;


--
-- Name: solicitud_flujo_caja; Type: TABLE; Schema: public; Owner: aplicativocapexopex
--

CREATE TABLE public.solicitud_flujo_caja (
    id integer NOT NULL,
    solicitud_id integer,
    tipo character varying(20) NOT NULL,
    anio integer NOT NULL,
    monto numeric(15,2) DEFAULT 0,
    mes integer DEFAULT 1 NOT NULL,
    moneda character varying(3) DEFAULT 'COP'::character varying NOT NULL
);


ALTER TABLE public.solicitud_flujo_caja OWNER TO aplicativocapexopex;

--
-- Name: solicitud_flujo_caja_id_seq; Type: SEQUENCE; Schema: public; Owner: aplicativocapexopex
--

CREATE SEQUENCE public.solicitud_flujo_caja_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.solicitud_flujo_caja_id_seq OWNER TO aplicativocapexopex;

--
-- Name: solicitud_flujo_caja_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aplicativocapexopex
--

ALTER SEQUENCE public.solicitud_flujo_caja_id_seq OWNED BY public.solicitud_flujo_caja.id;


--
-- Name: solicitud_metas; Type: TABLE; Schema: public; Owner: aplicativocapexopex
--

CREATE TABLE public.solicitud_metas (
    id integer NOT NULL,
    solicitud_id integer,
    compromiso text NOT NULL,
    fecha_inicio date NOT NULL,
    indicador text NOT NULL
);


ALTER TABLE public.solicitud_metas OWNER TO aplicativocapexopex;

--
-- Name: solicitud_metas_id_seq; Type: SEQUENCE; Schema: public; Owner: aplicativocapexopex
--

CREATE SEQUENCE public.solicitud_metas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.solicitud_metas_id_seq OWNER TO aplicativocapexopex;

--
-- Name: solicitud_metas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aplicativocapexopex
--

ALTER SEQUENCE public.solicitud_metas_id_seq OWNED BY public.solicitud_metas.id;


--
-- Name: solicitud_valores; Type: TABLE; Schema: public; Owner: aplicativocapexopex
--

CREATE TABLE public.solicitud_valores (
    id integer NOT NULL,
    solicitud_id integer,
    categoria character varying(20) NOT NULL,
    usd numeric(15,2),
    cop numeric(15,2)
);


ALTER TABLE public.solicitud_valores OWNER TO aplicativocapexopex;

--
-- Name: solicitud_valores_id_seq; Type: SEQUENCE; Schema: public; Owner: aplicativocapexopex
--

CREATE SEQUENCE public.solicitud_valores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.solicitud_valores_id_seq OWNER TO aplicativocapexopex;

--
-- Name: solicitud_valores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aplicativocapexopex
--

ALTER SEQUENCE public.solicitud_valores_id_seq OWNED BY public.solicitud_valores.id;


--
-- Name: solicitudes_inversion; Type: TABLE; Schema: public; Owner: aplicativocapexopex
--

CREATE TABLE public.solicitudes_inversion (
    id integer NOT NULL,
    proceso_id integer,
    subprograma_id integer,
    categoria_id integer,
    entregable_planeado text,
    tiene_evaluacion_financiera boolean DEFAULT false NOT NULL,
    justificacion_sin_evaluacion text,
    responsable_pm_id integer,
    link_acta_aprobacion text,
    link_plan_proyecto text,
    link_presentacion_puertas_3 text,
    tipo_clasificacion public."TipoClasificacion" DEFAULT 'TRADICIONAL'::public."TipoClasificacion" NOT NULL,
    trm numeric(10,2),
    CONSTRAINT chk_justificacion_evaluacion CHECK (((tiene_evaluacion_financiera = true) OR ((justificacion_sin_evaluacion IS NOT NULL) AND (TRIM(BOTH FROM justificacion_sin_evaluacion) <> ''::text))))
);


ALTER TABLE public.solicitudes_inversion OWNER TO aplicativocapexopex;

--
-- Name: solicitudes_inversion_id_seq; Type: SEQUENCE; Schema: public; Owner: aplicativocapexopex
--

CREATE SEQUENCE public.solicitudes_inversion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.solicitudes_inversion_id_seq OWNER TO aplicativocapexopex;

--
-- Name: solicitudes_inversion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aplicativocapexopex
--

ALTER SEQUENCE public.solicitudes_inversion_id_seq OWNED BY public.solicitudes_inversion.id;


--
-- Name: subprogramas; Type: TABLE; Schema: public; Owner: aplicativocapexopex
--

CREATE TABLE public.subprogramas (
    id integer NOT NULL,
    programa_id integer,
    nombre character varying(100) NOT NULL,
    requiere_evaluacion_obligatoria boolean DEFAULT false
);


ALTER TABLE public.subprogramas OWNER TO aplicativocapexopex;

--
-- Name: subprogramas_id_seq; Type: SEQUENCE; Schema: public; Owner: aplicativocapexopex
--

CREATE SEQUENCE public.subprogramas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.subprogramas_id_seq OWNER TO aplicativocapexopex;

--
-- Name: subprogramas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aplicativocapexopex
--

ALTER SEQUENCE public.subprogramas_id_seq OWNED BY public.subprogramas.id;


--
-- Name: usuario_roles_compania; Type: TABLE; Schema: public; Owner: aplicativocapexopex
--

CREATE TABLE public.usuario_roles_compania (
    id integer NOT NULL,
    usuario_id integer,
    rol_id integer,
    compania_id integer
);


ALTER TABLE public.usuario_roles_compania OWNER TO aplicativocapexopex;

--
-- Name: usuario_roles_compania_id_seq; Type: SEQUENCE; Schema: public; Owner: aplicativocapexopex
--

CREATE SEQUENCE public.usuario_roles_compania_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuario_roles_compania_id_seq OWNER TO aplicativocapexopex;

--
-- Name: usuario_roles_compania_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aplicativocapexopex
--

ALTER SEQUENCE public.usuario_roles_compania_id_seq OWNED BY public.usuario_roles_compania.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: aplicativocapexopex
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(150) NOT NULL,
    email character varying(150) NOT NULL,
    password_hash character varying(255),
    proveedor_auth character varying(50) DEFAULT 'GOOGLE'::character varying,
    area character varying(100),
    activo boolean DEFAULT true,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    eliminado_el timestamp without time zone,
    CONSTRAINT usuarios_proveedor_auth_check CHECK (((proveedor_auth)::text = ANY ((ARRAY['GOOGLE'::character varying, 'AWS_COGNITO'::character varying, 'AZURE_AD'::character varying])::text[])))
);


ALTER TABLE public.usuarios OWNER TO aplicativocapexopex;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: aplicativocapexopex
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO aplicativocapexopex;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aplicativocapexopex
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: acta_cierre_entregables id; Type: DEFAULT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.acta_cierre_entregables ALTER COLUMN id SET DEFAULT nextval('public.acta_cierre_entregables_id_seq'::regclass);


--
-- Name: acta_cierre_flujo_caja id; Type: DEFAULT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.acta_cierre_flujo_caja ALTER COLUMN id SET DEFAULT nextval('public.acta_cierre_flujo_caja_id_seq'::regclass);


--
-- Name: acta_cierre_metas id; Type: DEFAULT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.acta_cierre_metas ALTER COLUMN id SET DEFAULT nextval('public.acta_cierre_metas_id_seq'::regclass);


--
-- Name: acta_cierre_oi_valores_reales id; Type: DEFAULT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.acta_cierre_oi_valores_reales ALTER COLUMN id SET DEFAULT nextval('public.acta_cierre_oi_valores_reales_id_seq'::regclass);


--
-- Name: acta_cierre_valores id; Type: DEFAULT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.acta_cierre_valores ALTER COLUMN id SET DEFAULT nextval('public.acta_cierre_valores_id_seq'::regclass);


--
-- Name: actas_cierre id; Type: DEFAULT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.actas_cierre ALTER COLUMN id SET DEFAULT nextval('public.actas_cierre_id_seq'::regclass);


--
-- Name: asignaciones_proceso id; Type: DEFAULT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.asignaciones_proceso ALTER COLUMN id SET DEFAULT nextval('public.asignaciones_proceso_id_seq'::regclass);


--
-- Name: categorias id; Type: DEFAULT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.categorias ALTER COLUMN id SET DEFAULT nextval('public.categorias_id_seq'::regclass);


--
-- Name: companias id; Type: DEFAULT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.companias ALTER COLUMN id SET DEFAULT nextval('public.companias_id_seq'::regclass);


--
-- Name: control_cambio_anexos id; Type: DEFAULT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.control_cambio_anexos ALTER COLUMN id SET DEFAULT nextval('public.control_cambio_anexos_id_seq'::regclass);


--
-- Name: controles_cambio id; Type: DEFAULT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.controles_cambio ALTER COLUMN id SET DEFAULT nextval('public.controles_cambio_id_seq'::regclass);


--
-- Name: grupo_oi_historico_cierre id; Type: DEFAULT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.grupo_oi_historico_cierre ALTER COLUMN id SET DEFAULT nextval('public.grupo_oi_historico_cierre_id_seq'::regclass);


--
-- Name: grupos id; Type: DEFAULT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.grupos ALTER COLUMN id SET DEFAULT nextval('public.grupos_id_seq'::regclass);


--
-- Name: grupos_ordenes_internas id; Type: DEFAULT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.grupos_ordenes_internas ALTER COLUMN id SET DEFAULT nextval('public.grupos_ordenes_internas_id_seq'::regclass);


--
-- Name: historico_aprobaciones id; Type: DEFAULT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.historico_aprobaciones ALTER COLUMN id SET DEFAULT nextval('public.historico_aprobaciones_id_seq'::regclass);


--
-- Name: oi_valores id; Type: DEFAULT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.oi_valores ALTER COLUMN id SET DEFAULT nextval('public.oi_valores_id_seq'::regclass);


--
-- Name: ordenes_internas id; Type: DEFAULT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.ordenes_internas ALTER COLUMN id SET DEFAULT nextval('public.ordenes_internas_id_seq'::regclass);


--
-- Name: procesos id; Type: DEFAULT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.procesos ALTER COLUMN id SET DEFAULT nextval('public.procesos_id_seq'::regclass);


--
-- Name: programas id; Type: DEFAULT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.programas ALTER COLUMN id SET DEFAULT nextval('public.programas_id_seq'::regclass);


--
-- Name: proyectos_aplazamientos id; Type: DEFAULT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.proyectos_aplazamientos ALTER COLUMN id SET DEFAULT nextval('public.proyectos_aplazamientos_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: solicitud_evaluacion_financiera id; Type: DEFAULT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.solicitud_evaluacion_financiera ALTER COLUMN id SET DEFAULT nextval('public.solicitud_evaluacion_financiera_id_seq'::regclass);


--
-- Name: solicitud_flujo_caja id; Type: DEFAULT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.solicitud_flujo_caja ALTER COLUMN id SET DEFAULT nextval('public.solicitud_flujo_caja_id_seq'::regclass);


--
-- Name: solicitud_metas id; Type: DEFAULT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.solicitud_metas ALTER COLUMN id SET DEFAULT nextval('public.solicitud_metas_id_seq'::regclass);


--
-- Name: solicitud_valores id; Type: DEFAULT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.solicitud_valores ALTER COLUMN id SET DEFAULT nextval('public.solicitud_valores_id_seq'::regclass);


--
-- Name: solicitudes_inversion id; Type: DEFAULT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.solicitudes_inversion ALTER COLUMN id SET DEFAULT nextval('public.solicitudes_inversion_id_seq'::regclass);


--
-- Name: subprogramas id; Type: DEFAULT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.subprogramas ALTER COLUMN id SET DEFAULT nextval('public.subprogramas_id_seq'::regclass);


--
-- Name: usuario_roles_compania id; Type: DEFAULT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.usuario_roles_compania ALTER COLUMN id SET DEFAULT nextval('public.usuario_roles_compania_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: aplicativocapexopex
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
8402fb59-b4e8-4f37-8b44-31f9d6f6fc37	d7d642b85a7af6d59626be361aef85aeac84642b0f0207a871b84ac50c6ab52b	2026-08-31 16:37:18.55723+00	0_init	\N	\N	2026-08-31 16:37:18.201691+00	1
a9f32f90-27fc-46e3-8003-576e8d364b7c	1f15ec5aa2e32baf1d04401fedbc7f3a0bf51b039a401d3c0cdd4a62d84ae7b7	2026-08-31 16:37:19.19345+00	20260827124835_agregar_control_cambios	\N	\N	2026-08-31 16:37:19.098954+00	1
f7d2bce9-f30f-44ca-b30d-0c9e3a24d59d	237d0febf97f2040e6b4598b2ac6ec922593639ece439c2481e2f3583e856ed3	2026-08-31 16:37:18.646533+00	20260804204238_agregar_mes_a_flujo_caja	\N	\N	2026-08-31 16:37:18.559589+00	1
cdfcad99-45e5-4383-927f-edcd0ac525f1	0c7b953472114a9045bf0827f21b789bff2f88e46ceca916cd26bb6e7cb04248	2026-08-31 16:37:18.670316+00	20260806163739_integridad_procesos	\N	\N	2026-08-31 16:37:18.648528+00	1
d8ba19f3-1bf7-4370-9694-072be8835000	3c12a2f3293a195a1e0a3a0c28e88ce2a8f18a2e8dcb215ed7d007fa3e9e71ac	2026-08-31 16:37:18.713255+00	20260806181653_npx_prisma_studio	\N	\N	2026-08-31 16:37:18.674263+00	1
0d3fc470-ce9e-45af-98d9-377bc00622bc	b5ba64acf4d4f522565267ffd433c3164f8ba77df9fbcb13e11d6710844f9eef	2026-08-31 16:37:19.211204+00	20260827144203_enlazar_oi_con_control_cambio	\N	\N	2026-08-31 16:37:19.19757+00	1
1cad2f7e-daa9-41fb-b272-ec3743dafcde	2459b108c457f71f1b18e3c9d5ba0980bf27ae908548d1faa197a787755b53d4	2026-08-31 16:37:18.728494+00	20260806191350_marcar_evaluacion_obligatoria	\N	\N	2026-08-31 16:37:18.71751+00	1
54ba2bfc-d408-46a5-8e73-798b654c71f6	3bbb36b7191b12b1d06fa0a821a5a35da7eeafa2e555660d1da3d465042edc60	2026-08-31 16:37:18.749626+00	20260806221026_agregar_trm_solicitud	\N	\N	2026-08-31 16:37:18.733667+00	1
fbcff04c-2175-4074-a5a9-434c59c2ee29	1e006f15dace7da3198efbe69464d71c33d495d6689564df6a9b8d171fe204c5	2026-08-31 16:37:18.768089+00	20260811124404_agregar_observaciones_historico	\N	\N	2026-08-31 16:37:18.753778+00	1
b5423b30-af80-4965-ae4a-e6b1e33b5abd	2cad80bdce2fbef3f3f981472c6fb4b133656fbd87fcfb8686876711966b9fc9	2026-08-31 16:37:19.228037+00	20260827184410_control_cambio_aplazamiento	\N	\N	2026-08-31 16:37:19.214096+00	1
101d1c44-75ed-4b09-9185-e6e29494bdd2	3d98e6096b611a298728f5df29fa54fb143c25a13feabe85251fa66204bfa2bd	2026-08-31 16:37:18.825072+00	20260811141147_aplazamiento_proyectos	\N	\N	2026-08-31 16:37:18.771851+00	1
9995bb8a-520f-40e5-8eba-b8a4cc159179	7c1f4fa14f24a696b7b9434a1d283944ffabae2a1f624168cb5ee68e0ea1ba8f	2026-08-31 16:37:18.856004+00	20260824140853_categoria_obligatoria_y_moneda_flujo	\N	\N	2026-08-31 16:37:18.828688+00	1
24ab9cb9-40dc-43c6-a8ca-f7e779b93198	5038fa6c3eb1d95878048f6e84d4c0a8cb13d8fb44aa5e112bea4bd6bde77432	2026-08-31 16:37:18.970157+00	20260825185214_ordenes_internas	\N	\N	2026-08-31 16:37:18.862069+00	1
fb75680d-f3ad-49c4-bd1c-2b23c2e6467e	91e82048e3c6314b117a2017e00a016ad95bbfd1436ad9f11a8914bbadb74534	2026-08-31 16:37:19.437412+00	20260827200903_acta_cierre	\N	\N	2026-08-31 16:37:19.234121+00	1
2777cfc4-b99a-4f2e-94e6-edc3cf50a224	33eaafbb40a2552a384594d5f59327f2523844969d25f489031478aa4d3591e3	2026-08-31 16:37:19.03+00	20260825191558	\N	\N	2026-08-31 16:37:18.972175+00	1
4cc238c1-2874-450a-8bdb-6cd08c1f1297	49b3da071e9f1138242424c2e437a7efa10b51119de697afec877bd75a0dc074	2026-08-31 16:37:19.067169+00	20260826134652_permitir_ordenes_internas	\N	\N	2026-08-31 16:37:19.032768+00	1
a513fe1f-fd6f-4096-8012-ccf8ace18623	57c50ed9b06aab2336bff5db12a734b0824ec7d70563da5003cd2de526f4cb6f	2026-08-31 16:37:19.092119+00	20260826142812_moneda_presupuesto_oi	\N	\N	2026-08-31 16:37:19.071564+00	1
78f4ff96-1821-4113-aba0-33cf6b11a1c4	ed5e839dfd3759fc7097664ed62b143a42c6d190da50349579a204cbb8e63c19	2026-08-31 17:02:49.339307+00	20260831170249_agregar_indice_proyectos	\N	\N	2026-08-31 17:02:49.32402+00	1
6385490c-3d5f-4d16-9570-ab8d47de4f1c	2d27e54c0c524195b13806a08b88b64001eeac724e2c0902b4e1f4702b6ece93	2026-08-31 18:47:54.934249+00	20260831184536_restaurar_check_estado_actual	\N	\N	2026-08-31 18:47:54.917537+00	1
56ad9c28-75b8-4172-bbe3-571015ba6eca	6a4a98e60deb8116220662afdd93b10631ebe651bc668984f66faa14ef04c8a0	2026-08-31 19:59:43.967082+00	20260831195943_numero_oi_lo_asigna_cg	\N	\N	2026-08-31 19:59:43.95008+00	1
57622353-dabd-430d-8f37-2b657b1b6fab	2f1474c21df0e2c35298fbe873d9e2cd04464b45aa8fc84dfdec60ffeca8f311	2026-09-02 14:31:57.481899+00	20260902143157_oi_observaciones_pm	\N	\N	2026-09-02 14:31:57.467605+00	1
\.


--
-- Data for Name: acta_cierre_entregables; Type: TABLE DATA; Schema: public; Owner: aplicativocapexopex
--

COPY public.acta_cierre_entregables (id, acta_cierre_id, equipo_sistema, codigo_activo_produccion, codigo_activo_montaje, unidad_vida_util, vida_util, observaciones, anexo_url) FROM stdin;
\.


--
-- Data for Name: acta_cierre_flujo_caja; Type: TABLE DATA; Schema: public; Owner: aplicativocapexopex
--

COPY public.acta_cierre_flujo_caja (id, acta_cierre_id, tipo, moneda, anio, mes, monto_real) FROM stdin;
1	2	CAPEX	COP	2026	4	0.00
2	2	GCAPEX	COP	2026	4	0.00
3	2	GCAPEX	COP	2026	6	0.00
4	3	CAPEX	COP	2026	1	1231.00
5	3	GCAPEX	USD	2026	2	12312.00
6	3	GCAPEX	USD	2026	3	123123.00
7	4	CAPEX	COP	2026	1	12316.00
\.


--
-- Data for Name: acta_cierre_metas; Type: TABLE DATA; Schema: public; Owner: aplicativocapexopex
--

COPY public.acta_cierre_metas (id, acta_cierre_id, solicitud_meta_id, resultado_cierre) FROM stdin;
1	2	2	\N
2	3	4	asc
3	4	7	asfsa
\.


--
-- Data for Name: acta_cierre_oi_valores_reales; Type: TABLE DATA; Schema: public; Owner: aplicativocapexopex
--

COPY public.acta_cierre_oi_valores_reales (id, acta_cierre_id, orden_interna_id, valor_real, valor_real_moneda) FROM stdin;
\.


--
-- Data for Name: acta_cierre_valores; Type: TABLE DATA; Schema: public; Owner: aplicativocapexopex
--

COPY public.acta_cierre_valores (id, acta_cierre_id, categoria, real_usd, real_cop) FROM stdin;
3	1	ACTIVO	1231.00	0.00
4	1	GASTO	0.00	1231.00
5	2	ACTIVO	0.00	0.00
6	2	GASTO	0.00	0.00
7	3	ACTIVO	123.00	0.00
8	3	GASTO	0.00	12312.00
9	4	ACTIVO	123123.00	0.00
10	4	GASTO	0.00	12311.00
\.


--
-- Data for Name: actas_cierre; Type: TABLE DATA; Schema: public; Owner: aplicativocapexopex
--

COPY public.actas_cierre (id, proceso_id, proyecto_id, tipo_cierre, responsable_pm_id, control_gestion_asignado_id, presentacion_p5_link, entregable_real, explicacion_ejecucion, otros_entregables, fecha_creacion) FROM stdin;
1	2	2026001	CANCELACION	8	17	asd	efwef	\N	sdsdfs	2026-08-31 20:35:18.948
2	4	2026002	CANCELACION	8	17	\N	\N	\N	\N	2026-08-31 20:54:14.719
3	9	2026004	CULMINACION	2	17	ascas	asc	czxc	vsdv	2026-09-02 13:57:59.01
4	15	2026007	CANCELACION	8	17	aas	assafsa	vxcvxc	sdvs	2026-09-02 15:15:22.156
\.


--
-- Data for Name: asignaciones_proceso; Type: TABLE DATA; Schema: public; Owner: aplicativocapexopex
--

COPY public.asignaciones_proceso (id, proceso_id, etapa, rol_id, usuario_id, estado_asignacion, fecha_asignacion, fecha_resolucion) FROM stdin;
1	1	VERIFICACION_PARTES_INTERESADAS	\N	16	PENDIENTE	2026-08-31 19:36:43.021	\N
2	1	VERIFICACION_PARTES_INTERESADAS	\N	7	PENDIENTE	2026-08-31 19:36:43.021	\N
4	2	VERIFICACION_PARTES_INTERESADAS	\N	16	PENDIENTE	2026-08-31 20:44:37.8	\N
5	3	VERIFICACION_PARTES_INTERESADAS	\N	16	PENDIENTE	2026-08-31 20:46:36.983	\N
6	5	VERIFICACION_PARTES_INTERESADAS	\N	16	RESUELTA	2026-08-31 21:23:53.226	2026-08-31 21:24:18.064
7	5	GERENCIA	\N	11	RESUELTA	2026-08-31 21:24:31.554	2026-08-31 21:24:46.798
8	6	CONTROL_GESTION	\N	17	RESUELTA	2026-08-31 21:25:29.111	2026-08-31 21:26:06.723
9	7	CONTROL_GESTION	\N	17	RESUELTA	2026-08-31 21:26:34.993	2026-08-31 21:26:47.388
11	8	VERIFICACION_PARTES_INTERESADAS	\N	7	RESUELTA	2026-09-02 13:47:28.322	2026-09-02 13:55:09.884
10	8	VERIFICACION_PARTES_INTERESADAS	\N	16	RESUELTA	2026-09-02 13:47:28.322	2026-09-02 13:56:12.806
12	8	GERENCIA	\N	11	RESUELTA	2026-09-02 13:56:33.917	2026-09-02 13:56:50.019
13	9	VERIFICACION_PARTES_INTERESADAS	\N	16	PENDIENTE	2026-09-02 13:57:59.067	\N
14	10	VERIFICACION_PARTES_INTERESADAS	\N	16	RESUELTA	2026-09-02 13:59:24.597	2026-09-02 13:59:48.704
15	10	GERENCIA	\N	11	RESUELTA	2026-09-02 14:00:12.348	2026-09-02 14:00:20.305
16	11	VERIFICACION_PARTES_INTERESADAS	\N	7	RESUELTA	2026-09-02 14:01:18.198	2026-09-02 14:11:48.102
17	11	GERENCIA	\N	11	RESUELTA	2026-09-02 14:11:58.248	2026-09-02 14:12:04.937
18	12	CONTROL_GESTION	\N	18	PENDIENTE	2026-09-02 14:25:31.604	\N
19	13	CONTROL_GESTION	\N	18	RESUELTA	2026-09-02 15:11:41.076	2026-09-02 15:11:52.639
20	14	VERIFICACION_PARTES_INTERESADAS	\N	16	RESUELTA	2026-09-02 15:13:13.788	2026-09-02 15:14:05.85
21	14	GERENCIA	\N	5	RESUELTA	2026-09-02 15:14:14.344	2026-09-02 15:14:24.3
22	15	VERIFICACION_PARTES_INTERESADAS	\N	16	PENDIENTE	2026-09-02 15:15:22.215	\N
23	16	VERIFICACION_PARTES_INTERESADAS	\N	16	RESUELTA	2026-09-02 15:25:39.256	2026-09-02 15:26:06.23
24	16	GERENCIA	\N	11	RESUELTA	2026-09-02 15:26:13.147	2026-09-02 15:26:24.204
\.


--
-- Data for Name: categorias; Type: TABLE DATA; Schema: public; Owner: aplicativocapexopex
--

COPY public.categorias (id, nombre, eliminado_el, fecha_creacion, requiere_evaluacion_obligatoria) FROM stdin;
3	Sostenimiento y Continuidad	\N	2026-08-31 16:37:18.528699	f
2	Productividad y Mejora	\N	2026-08-31 16:37:18.528699	t
1	Crecimiento Estratégico	\N	2026-08-31 16:37:18.528699	t
\.


--
-- Data for Name: companias; Type: TABLE DATA; Schema: public; Owner: aplicativocapexopex
--

COPY public.companias (id, nombre, activa) FROM stdin;
1	Galletas	t
2	Pasas	t
3	Snacks	t
\.


--
-- Data for Name: control_cambio_anexos; Type: TABLE DATA; Schema: public; Owner: aplicativocapexopex
--

COPY public.control_cambio_anexos (id, control_cambio_id, tipo, url, descripcion) FROM stdin;
\.


--
-- Data for Name: controles_cambio; Type: TABLE DATA; Schema: public; Owner: aplicativocapexopex
--

COPY public.controles_cambio (id, proceso_id, proyecto_id, responsable_pm_id, requiere_orden_interna, descripcion_cambio, antecedentes, justificacion, impacto_alcance, impacto_tiempo, fecha_creacion, anio_nuevo_propuesto, tipo_control_cambio) FROM stdin;
\.


--
-- Data for Name: grupo_oi_historico_cierre; Type: TABLE DATA; Schema: public; Owner: aplicativocapexopex
--

COPY public.grupo_oi_historico_cierre (id, grupo_id, accion, observaciones, usuario_id, fecha_registro) FROM stdin;
\.


--
-- Data for Name: grupos; Type: TABLE DATA; Schema: public; Owner: aplicativocapexopex
--

COPY public.grupos (id, nombre) FROM stdin;
1	Fortalecer
2	Crecer
3	Transformar
\.


--
-- Data for Name: grupos_ordenes_internas; Type: TABLE DATA; Schema: public; Owner: aplicativocapexopex
--

COPY public.grupos_ordenes_internas (id, proyecto_id, nombre, estado, fecha_creacion) FROM stdin;
1	2026003	OI2345	ABIERTO	2026-08-31 21:24:46.808
2	2026004	\N	ABIERTO	2026-09-02 13:56:50.04
3	2026005	\N	ABIERTO	2026-09-02 14:00:20.313
4	2026006	fsdf21323	ABIERTO	2026-09-02 14:12:04.942
5	2026007	\N	ABIERTO	2026-09-02 15:14:24.305
6	2026008	\N	ABIERTO	2026-09-02 15:26:24.214
\.


--
-- Data for Name: historico_aprobaciones; Type: TABLE DATA; Schema: public; Owner: aplicativocapexopex
--

COPY public.historico_aprobaciones (id, proceso_id, etapa_origen, etapa_destino, accion, razon_rechazo, usuario_id, fecha_registro, observaciones) FROM stdin;
1	1	BORRADOR	PENDIENTE_PMO	ENVIADO	\N	8	2026-08-31 19:36:55.253	\N
2	1	PENDIENTE_PMO	VERIFICACION_PARTES_INTERESADAS	APROBADO	\N	3	2026-08-31 19:37:29.389	prueba de aprobacion
3	2	BORRADOR	PENDIENTE_PMO	ENVIADO	\N	8	2026-08-31 20:37:06.686	\N
4	2	PENDIENTE_PMO	BORRADOR	RECHAZADO	s	3	2026-08-31 20:43:36.588	\N
5	3	BORRADOR	PENDIENTE_PMO	ENVIADO	\N	8	2026-08-31 20:46:40.655	\N
6	5	BORRADOR	PENDIENTE_PMO	ENVIADO	\N	8	2026-08-31 21:23:55.241	\N
7	5	PENDIENTE_PMO	VERIFICACION_PARTES_INTERESADAS	APROBADO	\N	3	2026-08-31 21:24:05.22	qwertyui\n
8	5	VERIFICACION_PARTES_INTERESADAS	DIRECCION_PMO	APROBADO	\N	16	2026-08-31 21:24:18.075	qwerty
9	5	DIRECCION_PMO	GERENCIA	APROBADO	\N	4	2026-08-31 21:24:31.557	grfgcf
10	5	GERENCIA	APROBADO_FINAL	APROBADO	\N	11	2026-08-31 21:24:46.8	hggjjhb
11	6	BORRADOR	PENDIENTE	ENVIADO	\N	8	2026-08-31 21:25:29.112	\N
12	6	PENDIENTE	APROBADA	APROBADO	\N	17	2026-08-31 21:26:06.725	KKKN
13	7	BORRADOR	PENDIENTE	ENVIADO	\N	8	2026-08-31 21:26:34.995	\N
14	7	PENDIENTE	APROBADA	APROBADO	\N	17	2026-08-31 21:26:47.392	\N
15	8	BORRADOR	PENDIENTE_PMO	ENVIADO	\N	2	2026-09-02 13:47:39.425	\N
16	8	PENDIENTE_PMO	VERIFICACION_PARTES_INTERESADAS	APROBADO	\N	9	2026-09-02 13:48:01.499	aprobar
17	8	VERIFICACION_PARTES_INTERESADAS	BORRADOR	RECHAZADO	falta	7	2026-09-02 13:48:13.064	\N
18	8	BORRADOR	PENDIENTE_PMO	ENVIADO	\N	2	2026-09-02 13:53:39.721	\N
19	8	PENDIENTE_PMO	VERIFICACION_PARTES_INTERESADAS	APROBADO	\N	3	2026-09-02 13:54:49.381	aprobado
20	8	VERIFICACION_PARTES_INTERESADAS	VERIFICACION_PARTES_INTERESADAS	APROBADO_PARCIAL	\N	7	2026-09-02 13:55:09.892	aprobado
21	8	VERIFICACION_PARTES_INTERESADAS	DIRECCION_PMO	APROBADO	\N	16	2026-09-02 13:56:12.809	a
22	8	DIRECCION_PMO	GERENCIA	APROBADO	\N	4	2026-09-02 13:56:33.92	a
23	8	GERENCIA	APROBADO_FINAL	APROBADO	\N	11	2026-09-02 13:56:50.021	a
24	10	BORRADOR	PENDIENTE_PMO	ENVIADO	\N	8	2026-09-02 13:59:26.983	\N
25	10	PENDIENTE_PMO	VERIFICACION_PARTES_INTERESADAS	APROBADO	\N	3	2026-09-02 13:59:31.964	rgre
26	10	VERIFICACION_PARTES_INTERESADAS	DIRECCION_PMO	APROBADO	\N	16	2026-09-02 13:59:48.706	erge
27	10	DIRECCION_PMO	GERENCIA	APROBADO	\N	4	2026-09-02 14:00:12.349	regerg
28	10	GERENCIA	APROBADO_FINAL	APROBADO	\N	11	2026-09-02 14:00:20.308	rege
29	11	BORRADOR	PENDIENTE_PMO	ENVIADO	\N	2	2026-09-02 14:03:11.495	\N
30	11	PENDIENTE_PMO	VERIFICACION_PARTES_INTERESADAS	APROBADO	\N	3	2026-09-02 14:03:24.643	asfasf
31	11	VERIFICACION_PARTES_INTERESADAS	DIRECCION_PMO	APROBADO	\N	7	2026-09-02 14:11:48.104	adasd
32	11	DIRECCION_PMO	GERENCIA	APROBADO	\N	4	2026-09-02 14:11:58.251	asdas
33	11	GERENCIA	APROBADO_FINAL	APROBADO	\N	11	2026-09-02 14:12:04.939	asdsa
34	12	BORRADOR	PENDIENTE	ENVIADO	\N	2	2026-09-02 14:25:31.605	\N
35	13	BORRADOR	PENDIENTE	ENVIADO	\N	2	2026-09-02 15:11:41.079	\N
36	13	PENDIENTE	APROBADA	APROBADO	\N	18	2026-09-02 15:11:52.645	zxvxvd
37	14	BORRADOR	PENDIENTE_PMO	ENVIADO	\N	8	2026-09-02 15:13:16.971	\N
38	14	PENDIENTE_PMO	VERIFICACION_PARTES_INTERESADAS	APROBADO	\N	3	2026-09-02 15:13:31.286	adf
39	14	VERIFICACION_PARTES_INTERESADAS	DIRECCION_PMO	APROBADO	\N	16	2026-09-02 15:14:05.859	sdv
40	14	DIRECCION_PMO	GERENCIA	APROBADO	\N	4	2026-09-02 15:14:14.346	vsd
41	14	GERENCIA	APROBADO_FINAL	APROBADO	\N	5	2026-09-02 15:14:24.302	vsdv
42	16	BORRADOR	PENDIENTE_PMO	ENVIADO	\N	8	2026-09-02 15:25:44.622	\N
43	16	PENDIENTE_PMO	VERIFICACION_PARTES_INTERESADAS	APROBADO	\N	3	2026-09-02 15:25:59.817	dfbxdfb
44	16	VERIFICACION_PARTES_INTERESADAS	DIRECCION_PMO	APROBADO	\N	16	2026-09-02 15:26:06.243	dfbdf
45	16	DIRECCION_PMO	GERENCIA	APROBADO	\N	4	2026-09-02 15:26:13.148	bdbdf
46	16	GERENCIA	APROBADO_FINAL	APROBADO	\N	11	2026-09-02 15:26:24.207	fdbfd
\.


--
-- Data for Name: oi_valores; Type: TABLE DATA; Schema: public; Owner: aplicativocapexopex
--

COPY public.oi_valores (id, orden_interna_id, categoria, usd, cop) FROM stdin;
\.


--
-- Data for Name: ordenes_internas; Type: TABLE DATA; Schema: public; Owner: aplicativocapexopex
--

COPY public.ordenes_internas (id, grupo_id, proceso_id, numero_oi, nombre_descriptivo, tipo_orden, es_control_cambios, centro_costos, oficina_ventas, linea_marca, cliente, ramo, porcentaje_1, activo_fijo_curso, tipo_activo, porcentaje_2, presupuesto, activo_real_productivo, grupo_texto, observaciones_cg, responsable_pm_id, control_gestion_asignado_id, fecha_creacion, presupuesto_moneda, control_cambio_id, observaciones_pm) FROM stdin;
1	1	6	oi9879	Caso 1	GASTO	f						\N	\N	\N	\N	123123.00	\N	OI2345	KKKN	8	17	2026-08-31 21:25:19.496	COP	\N	\N
2	1	7	oi1236	Caso2	GASTO	f						\N	\N	\N	\N	12345678.00	\N	OI2345	\N	8	17	2026-08-31 21:26:30.039	COP	\N	\N
3	4	12	\N	asdasd	GASTO	f	asdas	asd	asdasd	asdsa		\N	\N	\N	\N	231231231.00	\N	\N	\N	2	18	2026-09-02 14:25:11.612	COP	\N	\N
4	4	13	32423	sadsa	ACTIVO	f	asdsad		asd			\N	asd	EXPANSION	\N	1231.00	NO	fsdf21323	zxvxvd	2	18	2026-09-02 15:10:35.527	COP	\N	cdaasfsdgfdhfghg
\.


--
-- Data for Name: procesos; Type: TABLE DATA; Schema: public; Owner: aplicativocapexopex
--

COPY public.procesos (id, proyecto_id, tipo_proceso, estado_actual, fecha_creacion, eliminado_el) FROM stdin;
1	2026001	SOLICITUD_INVERSION	VERIFICACION_PARTES_INTERESADAS	2026-08-31 19:36:42.969	\N
2	2026001	ACTA_CIERRE	BORRADOR	2026-08-31 20:35:18.933	\N
3	2026002	SOLICITUD_INVERSION	PENDIENTE_PMO	2026-08-31 20:46:36.955	\N
4	2026002	ACTA_CIERRE	BORRADOR	2026-08-31 20:54:14.714	\N
5	2026003	SOLICITUD_INVERSION	APROBADO_FINAL	2026-08-31 21:23:53.182	\N
6	2026003	ORDEN_INTERNA	APROBADA	2026-08-31 21:25:19.493	\N
7	2026003	ORDEN_INTERNA	APROBADA	2026-08-31 21:26:30.035	\N
8	2026004	SOLICITUD_INVERSION	APROBADO_FINAL	2026-09-02 13:47:28.289	\N
9	2026004	ACTA_CIERRE	BORRADOR	2026-09-02 13:57:59.008	\N
10	2026005	SOLICITUD_INVERSION	APROBADO_FINAL	2026-09-02 13:59:24.584	\N
11	2026006	SOLICITUD_INVERSION	APROBADO_FINAL	2026-09-02 14:01:18.187	\N
12	2026006	ORDEN_INTERNA	PENDIENTE	2026-09-02 14:25:11.607	\N
13	2026006	ORDEN_INTERNA	APROBADA	2026-09-02 15:10:35.518	\N
14	2026007	SOLICITUD_INVERSION	APROBADO_FINAL	2026-09-02 15:13:13.527	\N
15	2026007	ACTA_CIERRE	BORRADOR	2026-09-02 15:15:22.154	\N
16	2026008	SOLICITUD_INVERSION	APROBADO_FINAL	2026-09-02 15:25:39.234	\N
\.


--
-- Data for Name: programas; Type: TABLE DATA; Schema: public; Owner: aplicativocapexopex
--

COPY public.programas (id, id_grupo, nombre) FROM stdin;
1	1	Productividad y/o Mejoras Costo-Gasto
2	1	Sostenimiento de negocio
3	1	Desarrollo Sostenible
4	1	SST & Bienestar Social
5	2	Capacidad vs Demanda
6	2	Innovación Incremental (H1)
7	3	Innovación Radical (H2 y H3)
\.


--
-- Data for Name: proyectos; Type: TABLE DATA; Schema: public; Owner: aplicativocapexopex
--

COPY public.proyectos (id, nombre, compania_id, fecha_proyecto, anio_proyecto, consecutivo, creado_por, fecha_creacion, eliminado_el, anio_asignado) FROM stdin;
2026001	Prueba 1	3	2026-08-31	2026	1	8	2026-08-31 19:34:40.006	\N	2026
2026002	PRUEBA 2	1	2026-08-31	2026	2	8	2026-08-31 20:45:47.729	\N	2026
2026003	Prueba 3	1	2026-08-31	2026	3	8	2026-08-31 21:23:01.082	\N	2026
2026004	Proyecto de Prueba General	1	2026-09-02	2026	4	2	2026-09-02 13:45:46.967	\N	2026
2026005	werw	1	2026-09-02	2026	5	8	2026-09-02 13:58:57.607	\N	2026
2026006	fdfds	1	2026-09-02	2026	6	2	2026-09-02 14:00:33.678	\N	2026
2026007	jhbh	1	2026-09-02	2026	7	8	2026-09-02 15:12:31.894	\N	2026
2026008	sdfsdf	1	2026-09-02	2026	8	8	2026-09-02 15:25:04.354	\N	2026
\.


--
-- Data for Name: proyectos_aplazamientos; Type: TABLE DATA; Schema: public; Owner: aplicativocapexopex
--

COPY public.proyectos_aplazamientos (id, proyecto_id, anio_anterior, anio_nuevo, motivo, usuario_id, fecha_registro) FROM stdin;
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: aplicativocapexopex
--

COPY public.roles (id, codigo, nombre) FROM stdin;
1	ADMIN	Administrador Global
2	PM	Project Manager
3	PMO	PMO
4	DIRECTOR_PMO	Director PMO
5	GERENCIA	Gerencia
6	PRESIDENCIA	Presidencia
7	PARTE_INTERESADA	Parte Interesada
8	CONTROL_GESTION	Control de Gestión
\.


--
-- Data for Name: solicitud_evaluacion_financiera; Type: TABLE DATA; Schema: public; Owner: aplicativocapexopex
--

COPY public.solicitud_evaluacion_financiera (id, solicitud_id, tir, vpn, payback) FROM stdin;
1	1	11.00	12000.00	2.00
2	2	12.00	121.00	1.00
3	3	12.00	1234567890.00	12.00
4	4	11.00	12.00	2.00
5	5	21.00	12.00	2.00
\.


--
-- Data for Name: solicitud_flujo_caja; Type: TABLE DATA; Schema: public; Owner: aplicativocapexopex
--

COPY public.solicitud_flujo_caja (id, solicitud_id, tipo, anio, monto, mes, moneda) FROM stdin;
1	1	CAPEX	2026	15000000.00	1	COP
2	1	GCAPEX	2026	15000000.00	2	COP
3	2	CAPEX	2026	2131233.00	4	COP
4	2	GCAPEX	2026	2323.00	4	COP
5	2	GCAPEX	2026	2332323.00	6	COP
6	3	CAPEX	2026	123.00	1	COP
7	3	GCAPEX	2026	1234.00	1	COP
8	3	GCAPEX	2026	1234.00	2	COP
9	4	CAPEX	2026	1122432.00	1	COP
10	4	GCAPEX	2026	1212.00	2	USD
11	4	GCAPEX	2026	1231.00	3	USD
12	5	CAPEX	2026	2342.00	1	COP
13	5	GCAPEX	2026	23423.00	1	COP
14	6	GCAPEX	2026	1231.00	1	COP
15	6	CAPEX	2026	123123.00	1	COP
16	7	CAPEX	2026	124123.00	1	COP
17	8	CAPEX	2026	12123.00	1	COP
\.


--
-- Data for Name: solicitud_metas; Type: TABLE DATA; Schema: public; Owner: aplicativocapexopex
--

COPY public.solicitud_metas (id, solicitud_id, compromiso, fecha_inicio, indicador) FROM stdin;
1	1	prueba	2026-08-18	prueba
2	2	SDFSD	2026-08-12	SDFSDF
3	3	jvvh	2026-08-05	njjn
4	4	Compromiso	2026-09-17	indicador
5	5	sdfs	2026-09-03	sdfs
6	6	gsdg	2026-09-24	sdgsd
7	7	dfg	2026-09-22	dsvsd
8	8	sdfsdf	2026-09-16	sdfsdf
\.


--
-- Data for Name: solicitud_valores; Type: TABLE DATA; Schema: public; Owner: aplicativocapexopex
--

COPY public.solicitud_valores (id, solicitud_id, categoria, usd, cop) FROM stdin;
1	1	ACTIVO	0.00	15000000.00
2	1	GASTO	0.00	15000000.00
3	2	ACTIVO	0.00	2131233.00
4	2	GASTO	0.00	2334646.00
5	3	ACTIVO	0.00	123.00
6	3	GASTO	0.00	2468.00
7	4	ACTIVO	0.00	1122432.00
8	4	GASTO	2443.00	0.00
9	5	ACTIVO	0.00	2342.00
10	5	GASTO	0.00	23423.00
11	6	ACTIVO	0.00	123123.00
12	6	GASTO	0.00	1231.00
13	7	ACTIVO	0.00	124123.00
14	7	GASTO	0.00	0.00
15	8	ACTIVO	0.00	12123.00
16	8	GASTO	0.00	0.00
\.


--
-- Data for Name: solicitudes_inversion; Type: TABLE DATA; Schema: public; Owner: aplicativocapexopex
--

COPY public.solicitudes_inversion (id, proceso_id, subprograma_id, categoria_id, entregable_planeado, tiene_evaluacion_financiera, justificacion_sin_evaluacion, responsable_pm_id, link_acta_aprobacion, link_plan_proyecto, link_presentacion_puertas_3, tipo_clasificacion, trm) FROM stdin;
1	1	1	\N	Prueba de entregable 	t	\N	8	prueba	prueba	prueba	TRADICIONAL	1.00
2	3	13	\N	ASD	t	\N	8	asd	asdasd	asdasd	TRADICIONAL	12.00
3	5	1	\N	bhbjhb	t	\N	8	werty	cvbn	vbnm	TRADICIONAL	12.00
4	8	1	\N	Prueba Entregable 	t	\N	2	link	link	link	TRADICIONAL	11.00
5	10	1	\N	werwer	t	\N	8	e	wer	wer	TRADICIONAL	23.00
6	11	4	\N	sefefs	f	sfes	2	dgd	dfg	dfg	TRADICIONAL	32.00
7	14	4	\N	asf	f	svsd	8	sdfs	sdf	sdfsd	TRADICIONAL	123.00
8	16	7	\N	sdfsdf	f	sdfsdfs	8	df	sdf	sd	TRADICIONAL	12.00
\.


--
-- Data for Name: subprogramas; Type: TABLE DATA; Schema: public; Owner: aplicativocapexopex
--

COPY public.subprogramas (id, programa_id, nombre, requiere_evaluacion_obligatoria) FROM stdin;
2	2	Mantenimiento Industrial (Actualización por Obsolescencia)	f
3	2	Mantenimiento Industrial (Mantener Vida Útil de los Activos/Reemplazar)	f
4	2	Riesgo no SST (Red contra incendios-PML)	f
5	2	Cumplimiento Normativo - Calidad - Certificaciones	f
6	2	Mantenimiento Obras Civiles	f
7	3	Agua	f
8	3	Energía (eléctrica-térmica)	f
9	3	Generación de Residuos	f
10	4	Reducción accidental - Ausentismo	f
11	4	Bienestar Social	f
1	1	Productividad y/o Mejoras Costo-Gasto	t
12	5	Capacidad vs Demanda	t
13	6	Innovación Incremental (H1)	t
14	7	Innovación Radical (H2 y H3)	t
\.


--
-- Data for Name: usuario_roles_compania; Type: TABLE DATA; Schema: public; Owner: aplicativocapexopex
--

COPY public.usuario_roles_compania (id, usuario_id, rol_id, compania_id) FROM stdin;
1	1	1	\N
2	2	2	\N
3	3	3	\N
4	4	4	\N
5	5	5	\N
6	6	6	\N
7	7	7	\N
10	8	2	\N
12	9	3	\N
15	16	7	\N
16	17	8	\N
17	18	8	\N
18	5	5	1
19	11	5	1
20	12	5	2
21	13	5	3
22	6	6	1
23	14	6	2
24	15	6	3
25	19	3	\N
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: aplicativocapexopex
--

COPY public.usuarios (id, nombre, email, password_hash, proveedor_auth, area, activo, fecha_creacion, eliminado_el) FROM stdin;
1	Ana Admin	ana.admin@empresa.com	\N	GOOGLE	TI	t	2026-08-31 16:37:18.520867	\N
2	Laura PM	laura.pm@empresa.com	\N	GOOGLE	Proyectos	t	2026-08-31 16:37:18.520867	\N
3	Carlos PMO	carlos.pmo@empresa.com	\N	GOOGLE	PMO	t	2026-08-31 16:37:18.520867	\N
4	Diana Directora PMO	diana.director@empresa.com	\N	GOOGLE	PMO	t	2026-08-31 16:37:18.520867	\N
5	Gerardo Gerente	gerardo.gerencia@empresa.com	\N	GOOGLE	Gerencia	t	2026-08-31 16:37:18.520867	\N
6	Pedro Presidencia	pedro.presidencia@empresa.com	\N	GOOGLE	Presidencia	t	2026-08-31 16:37:18.520867	\N
7	Sofia Interesada	sofia.interesada@empresa.com	\N	GOOGLE	Operaciones	t	2026-08-31 16:37:18.520867	\N
8	Mateo PM	mateo.pm@empresa.com	\N	GOOGLE	Proyectos	t	2026-08-31 16:59:06.068907	\N
9	Valentina PMO	valentina.pmo@empresa.com	\N	GOOGLE	PMO	t	2026-08-31 16:59:06.068907	\N
11	Gabriela Gerente (Galletas)	gabriela.gerencia@empresa.com	\N	GOOGLE	Gerencia	t	2026-08-31 16:59:06.068907	\N
12	German Gerente (Pastas)	german.gerencia@empresa.com	\N	GOOGLE	Gerencia	t	2026-08-31 16:59:06.068907	\N
13	Gloria Gerente (Snacks)	gloria.gerencia@empresa.com	\N	GOOGLE	Gerencia	t	2026-08-31 16:59:06.068907	\N
14	Patricia Presidencia (Pastas)	patricia.presidencia@empresa.com	\N	GOOGLE	Presidencia	t	2026-08-31 16:59:06.068907	\N
15	Pablo Presidencia (Snacks)	pablo.presidencia@empresa.com	\N	GOOGLE	Presidencia	t	2026-08-31 16:59:06.068907	\N
16	Simon Interesado	simon.interesado@empresa.com	\N	GOOGLE	Calidad	t	2026-08-31 16:59:06.068907	\N
10	Nuevo Sin Rol	nuevo.sinrol@empresa.com	\N	GOOGLE	Sin asignar	t	2026-08-31 16:59:06.068907	\N
17	Camila Control Gestion	camila.cg@empresa.com	\N	GOOGLE	Control de Gestión	t	2026-08-31 16:59:06.068907	\N
18	Cristian Control Gestion	cristian.cg@empresa.com	\N	GOOGLE	Control de Gestión	t	2026-08-31 16:59:06.068907	\N
19	Yein Alexa	yein301206@gmail.com	\N	GOOGLE	\N	t	2026-09-01 12:44:50.326	\N
\.


--
-- Name: acta_cierre_entregables_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aplicativocapexopex
--

SELECT pg_catalog.setval('public.acta_cierre_entregables_id_seq', 1, false);


--
-- Name: acta_cierre_flujo_caja_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aplicativocapexopex
--

SELECT pg_catalog.setval('public.acta_cierre_flujo_caja_id_seq', 7, true);


--
-- Name: acta_cierre_metas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aplicativocapexopex
--

SELECT pg_catalog.setval('public.acta_cierre_metas_id_seq', 3, true);


--
-- Name: acta_cierre_oi_valores_reales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aplicativocapexopex
--

SELECT pg_catalog.setval('public.acta_cierre_oi_valores_reales_id_seq', 1, false);


--
-- Name: acta_cierre_valores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aplicativocapexopex
--

SELECT pg_catalog.setval('public.acta_cierre_valores_id_seq', 10, true);


--
-- Name: actas_cierre_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aplicativocapexopex
--

SELECT pg_catalog.setval('public.actas_cierre_id_seq', 4, true);


--
-- Name: asignaciones_proceso_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aplicativocapexopex
--

SELECT pg_catalog.setval('public.asignaciones_proceso_id_seq', 24, true);


--
-- Name: categorias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aplicativocapexopex
--

SELECT pg_catalog.setval('public.categorias_id_seq', 3, true);


--
-- Name: companias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aplicativocapexopex
--

SELECT pg_catalog.setval('public.companias_id_seq', 3, true);


--
-- Name: control_cambio_anexos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aplicativocapexopex
--

SELECT pg_catalog.setval('public.control_cambio_anexos_id_seq', 1, false);


--
-- Name: controles_cambio_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aplicativocapexopex
--

SELECT pg_catalog.setval('public.controles_cambio_id_seq', 1, false);


--
-- Name: grupo_oi_historico_cierre_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aplicativocapexopex
--

SELECT pg_catalog.setval('public.grupo_oi_historico_cierre_id_seq', 1, false);


--
-- Name: grupos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aplicativocapexopex
--

SELECT pg_catalog.setval('public.grupos_id_seq', 3, true);


--
-- Name: grupos_ordenes_internas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aplicativocapexopex
--

SELECT pg_catalog.setval('public.grupos_ordenes_internas_id_seq', 6, true);


--
-- Name: historico_aprobaciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aplicativocapexopex
--

SELECT pg_catalog.setval('public.historico_aprobaciones_id_seq', 46, true);


--
-- Name: oi_valores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aplicativocapexopex
--

SELECT pg_catalog.setval('public.oi_valores_id_seq', 1, false);


--
-- Name: ordenes_internas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aplicativocapexopex
--

SELECT pg_catalog.setval('public.ordenes_internas_id_seq', 4, true);


--
-- Name: procesos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aplicativocapexopex
--

SELECT pg_catalog.setval('public.procesos_id_seq', 16, true);


--
-- Name: programas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aplicativocapexopex
--

SELECT pg_catalog.setval('public.programas_id_seq', 7, true);


--
-- Name: proyectos_aplazamientos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aplicativocapexopex
--

SELECT pg_catalog.setval('public.proyectos_aplazamientos_id_seq', 1, false);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aplicativocapexopex
--

SELECT pg_catalog.setval('public.roles_id_seq', 8, true);


--
-- Name: solicitud_evaluacion_financiera_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aplicativocapexopex
--

SELECT pg_catalog.setval('public.solicitud_evaluacion_financiera_id_seq', 5, true);


--
-- Name: solicitud_flujo_caja_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aplicativocapexopex
--

SELECT pg_catalog.setval('public.solicitud_flujo_caja_id_seq', 17, true);


--
-- Name: solicitud_metas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aplicativocapexopex
--

SELECT pg_catalog.setval('public.solicitud_metas_id_seq', 8, true);


--
-- Name: solicitud_valores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aplicativocapexopex
--

SELECT pg_catalog.setval('public.solicitud_valores_id_seq', 16, true);


--
-- Name: solicitudes_inversion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aplicativocapexopex
--

SELECT pg_catalog.setval('public.solicitudes_inversion_id_seq', 8, true);


--
-- Name: subprogramas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aplicativocapexopex
--

SELECT pg_catalog.setval('public.subprogramas_id_seq', 14, true);


--
-- Name: usuario_roles_compania_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aplicativocapexopex
--

SELECT pg_catalog.setval('public.usuario_roles_compania_id_seq', 25, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aplicativocapexopex
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 19, true);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: acta_cierre_entregables acta_cierre_entregables_pkey; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.acta_cierre_entregables
    ADD CONSTRAINT acta_cierre_entregables_pkey PRIMARY KEY (id);


--
-- Name: acta_cierre_flujo_caja acta_cierre_flujo_caja_pkey; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.acta_cierre_flujo_caja
    ADD CONSTRAINT acta_cierre_flujo_caja_pkey PRIMARY KEY (id);


--
-- Name: acta_cierre_metas acta_cierre_metas_pkey; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.acta_cierre_metas
    ADD CONSTRAINT acta_cierre_metas_pkey PRIMARY KEY (id);


--
-- Name: acta_cierre_oi_valores_reales acta_cierre_oi_valores_reales_pkey; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.acta_cierre_oi_valores_reales
    ADD CONSTRAINT acta_cierre_oi_valores_reales_pkey PRIMARY KEY (id);


--
-- Name: acta_cierre_valores acta_cierre_valores_pkey; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.acta_cierre_valores
    ADD CONSTRAINT acta_cierre_valores_pkey PRIMARY KEY (id);


--
-- Name: actas_cierre actas_cierre_pkey; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.actas_cierre
    ADD CONSTRAINT actas_cierre_pkey PRIMARY KEY (id);


--
-- Name: asignaciones_proceso asignaciones_proceso_pkey; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.asignaciones_proceso
    ADD CONSTRAINT asignaciones_proceso_pkey PRIMARY KEY (id);


--
-- Name: categorias categorias_pkey; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (id);


--
-- Name: companias companias_nombre_key; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.companias
    ADD CONSTRAINT companias_nombre_key UNIQUE (nombre);


--
-- Name: companias companias_pkey; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.companias
    ADD CONSTRAINT companias_pkey PRIMARY KEY (id);


--
-- Name: control_cambio_anexos control_cambio_anexos_pkey; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.control_cambio_anexos
    ADD CONSTRAINT control_cambio_anexos_pkey PRIMARY KEY (id);


--
-- Name: controles_cambio controles_cambio_pkey; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.controles_cambio
    ADD CONSTRAINT controles_cambio_pkey PRIMARY KEY (id);


--
-- Name: grupo_oi_historico_cierre grupo_oi_historico_cierre_pkey; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.grupo_oi_historico_cierre
    ADD CONSTRAINT grupo_oi_historico_cierre_pkey PRIMARY KEY (id);


--
-- Name: grupos_ordenes_internas grupos_ordenes_internas_pkey; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.grupos_ordenes_internas
    ADD CONSTRAINT grupos_ordenes_internas_pkey PRIMARY KEY (id);


--
-- Name: grupos_ordenes_internas grupos_ordenes_internas_proyecto_id_key; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.grupos_ordenes_internas
    ADD CONSTRAINT grupos_ordenes_internas_proyecto_id_key UNIQUE (proyecto_id);


--
-- Name: grupos grupos_pkey; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.grupos
    ADD CONSTRAINT grupos_pkey PRIMARY KEY (id);


--
-- Name: historico_aprobaciones historico_aprobaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.historico_aprobaciones
    ADD CONSTRAINT historico_aprobaciones_pkey PRIMARY KEY (id);


--
-- Name: oi_valores oi_valores_pkey; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.oi_valores
    ADD CONSTRAINT oi_valores_pkey PRIMARY KEY (id);


--
-- Name: ordenes_internas ordenes_internas_pkey; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.ordenes_internas
    ADD CONSTRAINT ordenes_internas_pkey PRIMARY KEY (id);


--
-- Name: ordenes_internas ordenes_internas_proceso_id_key; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.ordenes_internas
    ADD CONSTRAINT ordenes_internas_proceso_id_key UNIQUE (proceso_id);


--
-- Name: procesos procesos_pkey; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.procesos
    ADD CONSTRAINT procesos_pkey PRIMARY KEY (id);


--
-- Name: programas programas_pkey; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.programas
    ADD CONSTRAINT programas_pkey PRIMARY KEY (id);


--
-- Name: proyectos_aplazamientos proyectos_aplazamientos_pkey; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.proyectos_aplazamientos
    ADD CONSTRAINT proyectos_aplazamientos_pkey PRIMARY KEY (id);


--
-- Name: proyectos proyectos_pkey; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT proyectos_pkey PRIMARY KEY (id);


--
-- Name: roles roles_codigo_key; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_codigo_key UNIQUE (codigo);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: solicitud_evaluacion_financiera solicitud_evaluacion_financiera_pkey; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.solicitud_evaluacion_financiera
    ADD CONSTRAINT solicitud_evaluacion_financiera_pkey PRIMARY KEY (id);


--
-- Name: solicitud_evaluacion_financiera solicitud_evaluacion_financiera_solicitud_id_key; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.solicitud_evaluacion_financiera
    ADD CONSTRAINT solicitud_evaluacion_financiera_solicitud_id_key UNIQUE (solicitud_id);


--
-- Name: solicitud_flujo_caja solicitud_flujo_caja_pkey; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.solicitud_flujo_caja
    ADD CONSTRAINT solicitud_flujo_caja_pkey PRIMARY KEY (id);


--
-- Name: solicitud_metas solicitud_metas_pkey; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.solicitud_metas
    ADD CONSTRAINT solicitud_metas_pkey PRIMARY KEY (id);


--
-- Name: solicitud_valores solicitud_valores_pkey; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.solicitud_valores
    ADD CONSTRAINT solicitud_valores_pkey PRIMARY KEY (id);


--
-- Name: solicitudes_inversion solicitudes_inversion_pkey; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.solicitudes_inversion
    ADD CONSTRAINT solicitudes_inversion_pkey PRIMARY KEY (id);


--
-- Name: solicitudes_inversion solicitudes_inversion_proceso_id_key; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.solicitudes_inversion
    ADD CONSTRAINT solicitudes_inversion_proceso_id_key UNIQUE (proceso_id);


--
-- Name: subprogramas subprogramas_pkey; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.subprogramas
    ADD CONSTRAINT subprogramas_pkey PRIMARY KEY (id);


--
-- Name: usuario_roles_compania unique_usuario_rol_compania; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.usuario_roles_compania
    ADD CONSTRAINT unique_usuario_rol_compania UNIQUE NULLS NOT DISTINCT (usuario_id, rol_id, compania_id);


--
-- Name: usuario_roles_compania usuario_roles_compania_pkey; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.usuario_roles_compania
    ADD CONSTRAINT usuario_roles_compania_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: actas_cierre_proceso_id_key; Type: INDEX; Schema: public; Owner: aplicativocapexopex
--

CREATE UNIQUE INDEX actas_cierre_proceso_id_key ON public.actas_cierre USING btree (proceso_id);


--
-- Name: actas_cierre_proyecto_id_key; Type: INDEX; Schema: public; Owner: aplicativocapexopex
--

CREATE UNIQUE INDEX actas_cierre_proyecto_id_key ON public.actas_cierre USING btree (proyecto_id);


--
-- Name: controles_cambio_proceso_id_key; Type: INDEX; Schema: public; Owner: aplicativocapexopex
--

CREATE UNIQUE INDEX controles_cambio_proceso_id_key ON public.controles_cambio USING btree (proceso_id);


--
-- Name: idx_asignaciones_rol; Type: INDEX; Schema: public; Owner: aplicativocapexopex
--

CREATE INDEX idx_asignaciones_rol ON public.asignaciones_proceso USING btree (rol_id, estado_asignacion);


--
-- Name: idx_asignaciones_usuario; Type: INDEX; Schema: public; Owner: aplicativocapexopex
--

CREATE INDEX idx_asignaciones_usuario ON public.asignaciones_proceso USING btree (usuario_id, estado_asignacion);


--
-- Name: idx_usuario_roles; Type: INDEX; Schema: public; Owner: aplicativocapexopex
--

CREATE INDEX idx_usuario_roles ON public.usuario_roles_compania USING btree (usuario_id, compania_id);


--
-- Name: proyectos_anio_proyecto_consecutivo_idx; Type: INDEX; Schema: public; Owner: aplicativocapexopex
--

CREATE INDEX proyectos_anio_proyecto_consecutivo_idx ON public.proyectos USING btree (anio_proyecto, consecutivo);


--
-- Name: unique_solicitud_activa_por_proyecto; Type: INDEX; Schema: public; Owner: aplicativocapexopex
--

CREATE UNIQUE INDEX unique_solicitud_activa_por_proyecto ON public.procesos USING btree (proyecto_id, tipo_proceso) WHERE ((eliminado_el IS NULL) AND ((tipo_proceso)::text = 'SOLICITUD_INVERSION'::text));


--
-- Name: historico_aprobaciones trigger_bloq_update_delete_historico; Type: TRIGGER; Schema: public; Owner: aplicativocapexopex
--

CREATE TRIGGER trigger_bloq_update_delete_historico BEFORE DELETE OR UPDATE ON public.historico_aprobaciones FOR EACH ROW EXECUTE FUNCTION public.bloq_update_delete_historico();


--
-- Name: proyectos trigger_generar_proyecto_id; Type: TRIGGER; Schema: public; Owner: aplicativocapexopex
--

CREATE TRIGGER trigger_generar_proyecto_id BEFORE INSERT ON public.proyectos FOR EACH ROW EXECUTE FUNCTION public.generar_proyecto_id();


--
-- Name: acta_cierre_entregables acta_cierre_entregables_acta_cierre_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.acta_cierre_entregables
    ADD CONSTRAINT acta_cierre_entregables_acta_cierre_id_fkey FOREIGN KEY (acta_cierre_id) REFERENCES public.actas_cierre(id) ON DELETE RESTRICT;


--
-- Name: acta_cierre_flujo_caja acta_cierre_flujo_caja_acta_cierre_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.acta_cierre_flujo_caja
    ADD CONSTRAINT acta_cierre_flujo_caja_acta_cierre_id_fkey FOREIGN KEY (acta_cierre_id) REFERENCES public.actas_cierre(id) ON DELETE RESTRICT;


--
-- Name: acta_cierre_metas acta_cierre_metas_acta_cierre_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.acta_cierre_metas
    ADD CONSTRAINT acta_cierre_metas_acta_cierre_id_fkey FOREIGN KEY (acta_cierre_id) REFERENCES public.actas_cierre(id) ON DELETE RESTRICT;


--
-- Name: acta_cierre_metas acta_cierre_metas_solicitud_meta_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.acta_cierre_metas
    ADD CONSTRAINT acta_cierre_metas_solicitud_meta_id_fkey FOREIGN KEY (solicitud_meta_id) REFERENCES public.solicitud_metas(id) ON DELETE RESTRICT;


--
-- Name: acta_cierre_oi_valores_reales acta_cierre_oi_valores_reales_acta_cierre_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.acta_cierre_oi_valores_reales
    ADD CONSTRAINT acta_cierre_oi_valores_reales_acta_cierre_id_fkey FOREIGN KEY (acta_cierre_id) REFERENCES public.actas_cierre(id) ON DELETE RESTRICT;


--
-- Name: acta_cierre_oi_valores_reales acta_cierre_oi_valores_reales_orden_interna_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.acta_cierre_oi_valores_reales
    ADD CONSTRAINT acta_cierre_oi_valores_reales_orden_interna_id_fkey FOREIGN KEY (orden_interna_id) REFERENCES public.ordenes_internas(id) ON DELETE RESTRICT;


--
-- Name: acta_cierre_valores acta_cierre_valores_acta_cierre_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.acta_cierre_valores
    ADD CONSTRAINT acta_cierre_valores_acta_cierre_id_fkey FOREIGN KEY (acta_cierre_id) REFERENCES public.actas_cierre(id) ON DELETE RESTRICT;


--
-- Name: actas_cierre actas_cierre_control_gestion_asignado_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.actas_cierre
    ADD CONSTRAINT actas_cierre_control_gestion_asignado_id_fkey FOREIGN KEY (control_gestion_asignado_id) REFERENCES public.usuarios(id);


--
-- Name: actas_cierre actas_cierre_proceso_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.actas_cierre
    ADD CONSTRAINT actas_cierre_proceso_id_fkey FOREIGN KEY (proceso_id) REFERENCES public.procesos(id) ON DELETE RESTRICT;


--
-- Name: actas_cierre actas_cierre_proyecto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.actas_cierre
    ADD CONSTRAINT actas_cierre_proyecto_id_fkey FOREIGN KEY (proyecto_id) REFERENCES public.proyectos(id) ON DELETE RESTRICT;


--
-- Name: actas_cierre actas_cierre_responsable_pm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.actas_cierre
    ADD CONSTRAINT actas_cierre_responsable_pm_id_fkey FOREIGN KEY (responsable_pm_id) REFERENCES public.usuarios(id);


--
-- Name: asignaciones_proceso asignaciones_proceso_proceso_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.asignaciones_proceso
    ADD CONSTRAINT asignaciones_proceso_proceso_id_fkey FOREIGN KEY (proceso_id) REFERENCES public.procesos(id) ON DELETE RESTRICT;


--
-- Name: asignaciones_proceso asignaciones_proceso_rol_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.asignaciones_proceso
    ADD CONSTRAINT asignaciones_proceso_rol_id_fkey FOREIGN KEY (rol_id) REFERENCES public.roles(id);


--
-- Name: asignaciones_proceso asignaciones_proceso_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.asignaciones_proceso
    ADD CONSTRAINT asignaciones_proceso_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


--
-- Name: control_cambio_anexos control_cambio_anexos_control_cambio_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.control_cambio_anexos
    ADD CONSTRAINT control_cambio_anexos_control_cambio_id_fkey FOREIGN KEY (control_cambio_id) REFERENCES public.controles_cambio(id) ON DELETE RESTRICT;


--
-- Name: controles_cambio controles_cambio_proceso_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.controles_cambio
    ADD CONSTRAINT controles_cambio_proceso_id_fkey FOREIGN KEY (proceso_id) REFERENCES public.procesos(id) ON DELETE RESTRICT;


--
-- Name: controles_cambio controles_cambio_proyecto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.controles_cambio
    ADD CONSTRAINT controles_cambio_proyecto_id_fkey FOREIGN KEY (proyecto_id) REFERENCES public.proyectos(id) ON DELETE RESTRICT;


--
-- Name: controles_cambio controles_cambio_responsable_pm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.controles_cambio
    ADD CONSTRAINT controles_cambio_responsable_pm_id_fkey FOREIGN KEY (responsable_pm_id) REFERENCES public.usuarios(id);


--
-- Name: grupo_oi_historico_cierre grupo_oi_historico_cierre_grupo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.grupo_oi_historico_cierre
    ADD CONSTRAINT grupo_oi_historico_cierre_grupo_id_fkey FOREIGN KEY (grupo_id) REFERENCES public.grupos_ordenes_internas(id) ON DELETE RESTRICT;


--
-- Name: grupo_oi_historico_cierre grupo_oi_historico_cierre_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.grupo_oi_historico_cierre
    ADD CONSTRAINT grupo_oi_historico_cierre_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


--
-- Name: grupos_ordenes_internas grupos_ordenes_internas_proyecto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.grupos_ordenes_internas
    ADD CONSTRAINT grupos_ordenes_internas_proyecto_id_fkey FOREIGN KEY (proyecto_id) REFERENCES public.proyectos(id) ON DELETE RESTRICT;


--
-- Name: historico_aprobaciones historico_aprobaciones_proceso_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.historico_aprobaciones
    ADD CONSTRAINT historico_aprobaciones_proceso_id_fkey FOREIGN KEY (proceso_id) REFERENCES public.procesos(id) ON DELETE RESTRICT;


--
-- Name: historico_aprobaciones historico_aprobaciones_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.historico_aprobaciones
    ADD CONSTRAINT historico_aprobaciones_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


--
-- Name: oi_valores oi_valores_orden_interna_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.oi_valores
    ADD CONSTRAINT oi_valores_orden_interna_id_fkey FOREIGN KEY (orden_interna_id) REFERENCES public.ordenes_internas(id) ON DELETE RESTRICT;


--
-- Name: ordenes_internas ordenes_internas_control_cambio_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.ordenes_internas
    ADD CONSTRAINT ordenes_internas_control_cambio_id_fkey FOREIGN KEY (control_cambio_id) REFERENCES public.controles_cambio(id);


--
-- Name: ordenes_internas ordenes_internas_control_gestion_asignado_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.ordenes_internas
    ADD CONSTRAINT ordenes_internas_control_gestion_asignado_id_fkey FOREIGN KEY (control_gestion_asignado_id) REFERENCES public.usuarios(id);


--
-- Name: ordenes_internas ordenes_internas_grupo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.ordenes_internas
    ADD CONSTRAINT ordenes_internas_grupo_id_fkey FOREIGN KEY (grupo_id) REFERENCES public.grupos_ordenes_internas(id) ON DELETE RESTRICT;


--
-- Name: ordenes_internas ordenes_internas_proceso_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.ordenes_internas
    ADD CONSTRAINT ordenes_internas_proceso_id_fkey FOREIGN KEY (proceso_id) REFERENCES public.procesos(id) ON DELETE RESTRICT;


--
-- Name: ordenes_internas ordenes_internas_responsable_pm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.ordenes_internas
    ADD CONSTRAINT ordenes_internas_responsable_pm_id_fkey FOREIGN KEY (responsable_pm_id) REFERENCES public.usuarios(id);


--
-- Name: procesos procesos_proyecto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.procesos
    ADD CONSTRAINT procesos_proyecto_id_fkey FOREIGN KEY (proyecto_id) REFERENCES public.proyectos(id) ON DELETE RESTRICT;


--
-- Name: programas programas_id_grupo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.programas
    ADD CONSTRAINT programas_id_grupo_fkey FOREIGN KEY (id_grupo) REFERENCES public.grupos(id) ON DELETE CASCADE;


--
-- Name: proyectos_aplazamientos proyectos_aplazamientos_proyecto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.proyectos_aplazamientos
    ADD CONSTRAINT proyectos_aplazamientos_proyecto_id_fkey FOREIGN KEY (proyecto_id) REFERENCES public.proyectos(id) ON DELETE RESTRICT;


--
-- Name: proyectos_aplazamientos proyectos_aplazamientos_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.proyectos_aplazamientos
    ADD CONSTRAINT proyectos_aplazamientos_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


--
-- Name: proyectos proyectos_compania_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT proyectos_compania_id_fkey FOREIGN KEY (compania_id) REFERENCES public.companias(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: proyectos proyectos_creado_por_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT proyectos_creado_por_fkey FOREIGN KEY (creado_por) REFERENCES public.usuarios(id);


--
-- Name: solicitud_evaluacion_financiera solicitud_evaluacion_financiera_solicitud_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.solicitud_evaluacion_financiera
    ADD CONSTRAINT solicitud_evaluacion_financiera_solicitud_id_fkey FOREIGN KEY (solicitud_id) REFERENCES public.solicitudes_inversion(id) ON DELETE RESTRICT;


--
-- Name: solicitud_flujo_caja solicitud_flujo_caja_solicitud_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.solicitud_flujo_caja
    ADD CONSTRAINT solicitud_flujo_caja_solicitud_id_fkey FOREIGN KEY (solicitud_id) REFERENCES public.solicitudes_inversion(id) ON DELETE RESTRICT;


--
-- Name: solicitud_metas solicitud_metas_solicitud_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.solicitud_metas
    ADD CONSTRAINT solicitud_metas_solicitud_id_fkey FOREIGN KEY (solicitud_id) REFERENCES public.solicitudes_inversion(id) ON DELETE RESTRICT;


--
-- Name: solicitud_valores solicitud_valores_solicitud_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.solicitud_valores
    ADD CONSTRAINT solicitud_valores_solicitud_id_fkey FOREIGN KEY (solicitud_id) REFERENCES public.solicitudes_inversion(id) ON DELETE RESTRICT;


--
-- Name: solicitudes_inversion solicitudes_inversion_categoria_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.solicitudes_inversion
    ADD CONSTRAINT solicitudes_inversion_categoria_id_fkey FOREIGN KEY (categoria_id) REFERENCES public.categorias(id);


--
-- Name: solicitudes_inversion solicitudes_inversion_proceso_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.solicitudes_inversion
    ADD CONSTRAINT solicitudes_inversion_proceso_id_fkey FOREIGN KEY (proceso_id) REFERENCES public.procesos(id) ON DELETE RESTRICT;


--
-- Name: solicitudes_inversion solicitudes_inversion_responsable_pm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.solicitudes_inversion
    ADD CONSTRAINT solicitudes_inversion_responsable_pm_id_fkey FOREIGN KEY (responsable_pm_id) REFERENCES public.usuarios(id);


--
-- Name: solicitudes_inversion solicitudes_inversion_subprograma_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.solicitudes_inversion
    ADD CONSTRAINT solicitudes_inversion_subprograma_id_fkey FOREIGN KEY (subprograma_id) REFERENCES public.subprogramas(id);


--
-- Name: subprogramas subprogramas_programa_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.subprogramas
    ADD CONSTRAINT subprogramas_programa_id_fkey FOREIGN KEY (programa_id) REFERENCES public.programas(id) ON DELETE CASCADE;


--
-- Name: usuario_roles_compania usuario_roles_compania_compania_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.usuario_roles_compania
    ADD CONSTRAINT usuario_roles_compania_compania_id_fkey FOREIGN KEY (compania_id) REFERENCES public.companias(id) ON DELETE CASCADE;


--
-- Name: usuario_roles_compania usuario_roles_compania_rol_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.usuario_roles_compania
    ADD CONSTRAINT usuario_roles_compania_rol_id_fkey FOREIGN KEY (rol_id) REFERENCES public.roles(id) ON DELETE CASCADE;


--
-- Name: usuario_roles_compania usuario_roles_compania_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aplicativocapexopex
--

ALTER TABLE ONLY public.usuario_roles_compania
    ADD CONSTRAINT usuario_roles_compania_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict pahpP981NIJHlDQfOLylKzk7jbQf50uTjNEJaZVi15WinzwtmBhvKkWhosG49UH

