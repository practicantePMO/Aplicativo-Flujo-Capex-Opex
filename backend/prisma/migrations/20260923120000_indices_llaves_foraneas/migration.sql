-- Indices para las llaves foraneas mas consultadas (listados, detalle de
-- procesos y pendientes). Solo agrega indices: no modifica ni borra datos.
CREATE INDEX "acta_cierre_entregables_acta_cierre_id_idx" ON "acta_cierre_entregables"("acta_cierre_id");
CREATE INDEX "acta_cierre_flujo_caja_acta_cierre_id_idx" ON "acta_cierre_flujo_caja"("acta_cierre_id");
CREATE INDEX "acta_cierre_metas_acta_cierre_id_idx" ON "acta_cierre_metas"("acta_cierre_id");
CREATE INDEX "acta_cierre_oi_valores_reales_acta_cierre_id_idx" ON "acta_cierre_oi_valores_reales"("acta_cierre_id");
CREATE INDEX "acta_cierre_valores_acta_cierre_id_idx" ON "acta_cierre_valores"("acta_cierre_id");
CREATE INDEX "asignaciones_proceso_proceso_id_idx" ON "asignaciones_proceso"("proceso_id");
CREATE INDEX "control_cambio_anexos_control_cambio_id_idx" ON "control_cambio_anexos"("control_cambio_id");
CREATE INDEX "controles_cambio_proyecto_id_idx" ON "controles_cambio"("proyecto_id");
CREATE INDEX "grupo_oi_historico_cierre_grupo_id_idx" ON "grupo_oi_historico_cierre"("grupo_id");
CREATE INDEX "historico_aprobaciones_proceso_id_idx" ON "historico_aprobaciones"("proceso_id");
CREATE INDEX "oi_valores_orden_interna_id_idx" ON "oi_valores"("orden_interna_id");
CREATE INDEX "ordenes_internas_grupo_id_idx" ON "ordenes_internas"("grupo_id");
CREATE INDEX "ordenes_internas_control_cambio_id_idx" ON "ordenes_internas"("control_cambio_id");
CREATE INDEX "procesos_proyecto_id_idx" ON "procesos"("proyecto_id");
CREATE INDEX "proyectos_compania_id_idx" ON "proyectos"("compania_id");
CREATE INDEX "proyectos_creado_por_idx" ON "proyectos"("creado_por");
CREATE INDEX "proyectos_aplazamientos_proyecto_id_idx" ON "proyectos_aplazamientos"("proyecto_id");
CREATE INDEX "solicitud_flujo_caja_solicitud_id_idx" ON "solicitud_flujo_caja"("solicitud_id");
CREATE INDEX "solicitud_metas_solicitud_id_idx" ON "solicitud_metas"("solicitud_id");
CREATE INDEX "solicitud_valores_solicitud_id_idx" ON "solicitud_valores"("solicitud_id");