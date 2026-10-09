import {
  crearAppDePruebas,
  AppDePruebas,
  crearProyectoConSiAprobada,
  crearProyectoConSiEnviada,
  datosSolicitud,
  USUARIOS,
  NombreUsuario,
} from '../../test/utilidades/app-pruebas';

// Validaciones y permisos de cada proceso: los casos en los que la API debe negarse.
describe('Validaciones de los procesos', () => {
  let t: AppDePruebas;

  beforeAll(async () => {
    t = await crearAppDePruebas();
  }, 120000);

  afterAll(async () => {
    await t.cerrar();
  });

  const estado = async (
    usuario: NombreUsuario,
    metodo: 'get' | 'post' | 'put' | 'patch',
    ruta: string,
    cuerpo?: object,
  ) => (await t.llamar(usuario, metodo, ruta, cuerpo)).status;

  describe('Solicitud de Inversión', () => {
    it('valida proyecto, dueño y estado', async () => {
      expect(
        await estado(
          'pm',
          'post',
          '/solicitud-inversion',
          datosSolicitud('NOEXISTE'),
        ),
      ).toBe(404);
      const proyecto = await t.llamar('pm', 'post', '/proyectos', {
        nombre: 'Ajeno',
        compania_id: 1,
        fecha_proyecto: '2026-07-31',
      });
      expect(
        await estado(
          'pmo',
          'post',
          '/solicitud-inversion',
          datosSolicitud(proyecto.body.id),
        ),
      ).toBe(403);

      const creada = await t.llamar(
        'pm',
        'post',
        '/solicitud-inversion',
        datosSolicitud(proyecto.body.id),
      );
      const id = creada.body.proceso_id;
      expect(
        await estado('admin', 'post', `/solicitud-inversion/${id}/aprobar`, {
          comentarios: 'x',
        }),
      ).toBe(400);
      expect(
        await estado('admin', 'post', `/solicitud-inversion/${id}/rechazar`, {
          razon_rechazo: 'x',
        }),
      ).toBe(400);
      expect(
        await estado(
          'pm2',
          'put',
          `/solicitud-inversion/borrador/${id}`,
          datosSolicitud(proyecto.body.id),
        ),
      ).toBe(403);
      // edita el borrador con evaluación financiera
      expect(
        await estado(
          'pm',
          'put',
          `/solicitud-inversion/borrador/${id}`,
          datosSolicitud(proyecto.body.id, {
            tiene_evaluacion_financiera: true,
            evaluacion_financiera: { tir: 10, vpn: 5, payback: 2 },
            justificacion_sin_evaluacion: undefined,
          }),
        ),
      ).toBe(200);
      await t.llamar('pm', 'post', `/solicitud-inversion/${id}/enviar`);
      expect(
        await estado(
          'pm',
          'put',
          `/solicitud-inversion/borrador/${id}`,
          datosSolicitud(proyecto.body.id),
        ),
      ).toBe(400);
      expect(
        await estado('pm', 'post', `/solicitud-inversion/${id}/enviar`),
      ).toBe(400);
    });

    it('valida aprobaciones por etapa, partes interesadas y cancelación', async () => {
      const { siProcesoId: id } = await crearProyectoConSiEnviada(t);
      expect(
        await estado(
          'pm2',
          'post',
          `/solicitud-inversion/${id}/partes-interesadas`,
          { partes_interesadas_ids: [USUARIOS.interesada] },
        ),
      ).toBe(403);
      await t.llamar('pmo', 'post', `/solicitud-inversion/${id}/aprobar`, {
        comentarios: 'ok',
      });
      // el admin no tiene asignación como parte interesada
      expect(
        await estado('admin', 'post', `/solicitud-inversion/${id}/aprobar`, {
          comentarios: 'ok',
        }),
      ).toBe(400);
      expect(
        await estado(
          'pmo',
          'post',
          `/solicitud-inversion/${id}/partes-interesadas`,
          { partes_interesadas_ids: [USUARIOS.interesada] },
        ),
      ).toBe(400);
      await t.llamar(
        'interesada',
        'post',
        `/solicitud-inversion/${id}/aprobar`,
        { comentarios: 'ok' },
      );
      expect(
        await estado('director', 'post', `/solicitud-inversion/${id}/aprobar`, {
          comentarios: 'ok',
          gerente_id: USUARIOS.pm,
        }),
      ).toBe(400);
      await t.llamar('director', 'post', `/solicitud-inversion/${id}/aprobar`, {
        comentarios: 'ok',
        gerente_id: USUARIOS.gerencia1,
      });
      expect(
        await estado(
          'gerencia1',
          'post',
          `/solicitud-inversion/${id}/aprobar`,
          { comentarios: 'ok' },
        ),
      ).toBe(400);
      await t.llamar(
        'gerencia1',
        'post',
        `/solicitud-inversion/${id}/aprobar`,
        { comentarios: 'ok', enviar_a_presidencia: false },
      );
      expect(
        await estado('pmo', 'post', `/solicitud-inversion/${id}/cancelar`, {
          razon_cancelacion: 'x',
        }),
      ).toBe(400);
    });
  });

  describe('Órdenes Internas', () => {
    let proyectoId: string;
    const oi = (cambios: object = {}) => ({
      proyecto_id: proyectoId,
      nombre_descriptivo: 'OI',
      tipo_orden: 'GASTO',
      presupuesto: 100,
      ...cambios,
    });

    beforeAll(async () => {
      ({ proyectoId } = await crearProyectoConSiAprobada(t));
    });

    it('valida proyecto, dueño y Control de Cambios vinculado', async () => {
      expect(
        await estado(
          'pm',
          'post',
          '/ordenes-internas',
          oi({ proyecto_id: 'NOEXISTE' }),
        ),
      ).toBe(404);
      expect(await estado('pm2', 'post', '/ordenes-internas', oi())).toBe(403);
      expect(
        await estado(
          'pm',
          'post',
          '/ordenes-internas',
          oi({ es_control_cambios: true }),
        ),
      ).toBe(400);
      expect(
        await estado(
          'pm',
          'post',
          '/ordenes-internas',
          oi({ es_control_cambios: true, control_cambio_id: 99999 }),
        ),
      ).toBe(400);
      expect(await estado('pm', 'get', '/ordenes-internas/99999')).toBe(404);
      expect(
        await estado(
          'pm',
          'post',
          `/ordenes-internas/grupo/${proyectoId}/solicitar-cierre`,
          {},
        ),
      ).toBe(400);
      expect(
        await estado(
          'pm',
          'post',
          '/ordenes-internas/grupo/NOEXISTE/solicitar-cierre',
          {},
        ),
      ).toBe(404);
    });

    it('valida cada transición de estado', async () => {
      const creada = await t.llamar('pm', 'post', '/ordenes-internas', oi());
      const id = creada.body.orden_interna_id;
      expect(await estado('pm2', 'put', `/ordenes-internas/${id}`, oi())).toBe(
        403,
      );
      expect(
        await estado('pm2', 'post', `/ordenes-internas/${id}/enviar`, {
          control_gestion_id: USUARIOS.controlGestion,
        }),
      ).toBe(403);
      expect(
        await estado('pm', 'post', `/ordenes-internas/${id}/enviar`, {
          control_gestion_id: USUARIOS.pm,
        }),
      ).toBe(400);
      expect(
        await estado(
          'controlGestion',
          'post',
          `/ordenes-internas/${id}/aprobar`,
          { numero_oi: '1', grupo_texto: 'G' },
        ),
      ).toBe(400);
      expect(
        await estado(
          'controlGestion',
          'post',
          `/ordenes-internas/${id}/rechazar`,
          { observaciones: 'x' },
        ),
      ).toBe(400);
      expect(
        await estado(
          'controlGestion',
          'post',
          `/ordenes-internas/${id}/cerrar`,
        ),
      ).toBe(400);
      expect(
        await estado(
          'pm',
          'post',
          `/ordenes-internas/grupo/${proyectoId}/solicitar-cierre`,
          {},
        ),
      ).toBe(400);

      await t.llamar('pm', 'post', `/ordenes-internas/${id}/enviar`, {
        control_gestion_id: USUARIOS.controlGestion,
      });
      expect(await estado('pm', 'put', `/ordenes-internas/${id}`, oi())).toBe(
        400,
      );
      expect(
        await estado('pm', 'post', `/ordenes-internas/${id}/enviar`, {
          control_gestion_id: USUARIOS.controlGestion,
        }),
      ).toBe(400);
      expect(
        await estado('pm', 'post', `/ordenes-internas/${id}/cancelar`),
      ).toBe(400);

      await t.llamar(
        'controlGestion',
        'post',
        `/ordenes-internas/${id}/aprobar`,
        { numero_oi: 'OI-9', grupo_texto: 'G' },
      );
      expect(
        await estado(
          'pm2',
          'post',
          `/ordenes-internas/grupo/${proyectoId}/solicitar-cierre`,
          {},
        ),
      ).toBe(403);
      await t.llamar(
        'pm',
        'post',
        `/ordenes-internas/grupo/${proyectoId}/solicitar-cierre`,
        {},
      );
      expect(
        await estado(
          'pm',
          'post',
          `/ordenes-internas/grupo/${proyectoId}/solicitar-cierre`,
          {},
        ),
      ).toBe(400);
    });
  });

  describe('Control de Cambios', () => {
    const cc = (proyectoId: string, cambios: object = {}) => ({
      proyecto_id: proyectoId,
      requiere_orden_interna: false,
      descripcion_cambio: 'x',
      ...cambios,
    });

    it('valida proyecto, SI aprobada, dueño y estados', async () => {
      const enviada = await crearProyectoConSiEnviada(t);
      expect(
        await estado('pm', 'post', '/control-cambios', cc(enviada.proyectoId)),
      ).toBe(400);
      expect(
        await estado('pm', 'post', '/control-cambios', cc('NOEXISTE')),
      ).toBe(404);
      const { proyectoId } = await crearProyectoConSiAprobada(t);
      expect(
        await estado('pm2', 'post', '/control-cambios', cc(proyectoId)),
      ).toBe(403);

      const creado = await t.llamar(
        'pm',
        'post',
        '/control-cambios',
        cc(proyectoId),
      );
      const id = creado.body.proceso_id;
      // una OI no se puede vincular a un CC que no requiere OI
      expect(
        await estado('pm', 'post', '/ordenes-internas', {
          proyecto_id: proyectoId,
          nombre_descriptivo: 'OI',
          tipo_orden: 'GASTO',
          presupuesto: 1,
          es_control_cambios: true,
          control_cambio_id: creado.body.control_cambio_id,
        }),
      ).toBe(400);
      // el endpoint de la SI no acepta un proceso de otro tipo
      expect(
        await estado('pm', 'post', `/solicitud-inversion/${id}/enviar`),
      ).toBe(404);
      expect(
        await estado(
          'pm2',
          'put',
          `/control-cambios/borrador/${id}`,
          cc(proyectoId),
        ),
      ).toBe(403);
      expect(
        await estado(
          'pm2',
          'post',
          `/control-cambios/${id}/partes-interesadas`,
          { partes_interesadas_ids: [USUARIOS.interesada] },
        ),
      ).toBe(403);
      expect(
        await estado('admin', 'post', `/control-cambios/${id}/rechazar`, {
          razon_rechazo: 'x',
        }),
      ).toBe(400);

      await t.llamar(
        'pm',
        'post',
        `/control-cambios/${id}/partes-interesadas`,
        { partes_interesadas_ids: [USUARIOS.interesada] },
      );
      await t.llamar('pm', 'post', `/control-cambios/${id}/enviar`);
      expect(
        await estado(
          'pm',
          'put',
          `/control-cambios/borrador/${id}`,
          cc(proyectoId),
        ),
      ).toBe(400);
      expect(await estado('pm', 'post', `/control-cambios/${id}/enviar`)).toBe(
        400,
      );
      await t.llamar('pmo', 'post', `/control-cambios/${id}/aprobar`, {
        comentarios: 'ok',
      });
      expect(
        await estado('admin', 'post', `/control-cambios/${id}/aprobar`, {
          comentarios: 'ok',
        }),
      ).toBe(400);
      expect(
        await estado(
          'pm',
          'post',
          `/control-cambios/${id}/partes-interesadas`,
          { partes_interesadas_ids: [USUARIOS.interesada] },
        ),
      ).toBe(400);
    });
  });

  describe('Acta de Cierre', () => {
    const acta = (proyectoId: string, cambios: object = {}) => ({
      proyecto_id: proyectoId,
      tipo_cierre: 'CULMINACION',
      control_gestion_asignado_id: USUARIOS.controlGestion,
      entregable_real: 'Real',
      ...cambios,
    });

    it('valida SI aprobada, OI, CC en trámite y proyecto', async () => {
      const enviada = await crearProyectoConSiEnviada(t);
      expect(
        await estado('pm', 'post', '/actas-cierre', acta(enviada.proyectoId)),
      ).toBe(400);
      expect(
        await estado('pm', 'post', '/actas-cierre', acta('NOEXISTE')),
      ).toBe(404);
      const { proyectoId } = await crearProyectoConSiAprobada(t);
      expect(
        await estado('pm', 'post', '/actas-cierre', acta(proyectoId)),
      ).toBe(400); // culminación sin OI
      expect(
        await estado(
          'pm',
          'post',
          '/actas-cierre',
          acta(proyectoId, {
            tipo_cierre: 'CANCELACION',
            control_gestion_asignado_id: USUARIOS.pm,
          }),
        ),
      ).toBe(400);

      // con una OI creada, la culminación sigue bloqueada mientras haya un CC en trámite
      await t.llamar('pm', 'post', '/ordenes-internas', {
        proyecto_id: proyectoId,
        nombre_descriptivo: 'OI',
        tipo_orden: 'GASTO',
        presupuesto: 1,
      });
      const cc = await t.llamar('pm', 'post', '/control-cambios', {
        proyecto_id: proyectoId,
        requiere_orden_interna: false,
      });
      await t.llamar(
        'pm',
        'post',
        `/control-cambios/${cc.body.proceso_id}/partes-interesadas`,
        { partes_interesadas_ids: [USUARIOS.interesada] },
      );
      await t.llamar(
        'pm',
        'post',
        `/control-cambios/${cc.body.proceso_id}/enviar`,
      );
      expect(
        await estado('pm', 'post', '/actas-cierre', acta(proyectoId)),
      ).toBe(400); // CC en trámite
      // la cancelación no espera al CC, pero sí exige cerrar antes las Órdenes Internas
      expect(
        await estado(
          'pm',
          'post',
          '/actas-cierre',
          acta(proyectoId, { tipo_cierre: 'CANCELACION' }),
        ),
      ).toBe(400);
    });

    it('valida metas/OI ajenas, dueño, etapas y partes interesadas', async () => {
      const { proyectoId } = await crearProyectoConSiAprobada(t);
      const base = acta(proyectoId, { tipo_cierre: 'CANCELACION' });
      expect(
        await estado('pm', 'post', '/actas-cierre', {
          ...base,
          metas: [{ solicitud_meta_id: 99999, resultado_cierre: 'x' }],
        }),
      ).toBe(400);
      expect(
        await estado('pm', 'post', '/actas-cierre', {
          ...base,
          oi_valores_reales: [{ orden_interna_id: 99999, valor_real: 1 }],
        }),
      ).toBe(400);

      const creada = await t.llamar('pm', 'post', '/actas-cierre', base);
      const id = creada.body.proceso_id ?? creada.body.procesoId;
      expect(
        await estado('pm2', 'put', `/actas-cierre/borrador/${id}`, base),
      ).toBe(403);
      expect(
        await estado('pm', 'put', `/actas-cierre/borrador/${id}`, {
          ...base,
          control_gestion_asignado_id: USUARIOS.pm,
        }),
      ).toBe(400);
      expect(await estado('pm2', 'post', `/actas-cierre/${id}/enviar`)).toBe(
        403,
      );
      expect(
        await estado('pm2', 'post', `/actas-cierre/${id}/partes-interesadas`, {
          partes_interesadas_ids: [USUARIOS.interesada],
        }),
      ).toBe(403);
      expect(
        await estado('admin', 'post', `/actas-cierre/${id}/aprobar`, {
          comentarios: 'x',
        }),
      ).toBe(400);
      expect(
        await estado('admin', 'post', `/actas-cierre/${id}/rechazar`, {
          razon_rechazo: 'x',
        }),
      ).toBe(400);

      await t.llamar('pm', 'post', `/actas-cierre/${id}/partes-interesadas`, {
        partes_interesadas_ids: [USUARIOS.interesada],
      });
      await t.llamar('pm', 'post', `/actas-cierre/${id}/enviar`);
      expect(
        await estado('pm', 'put', `/actas-cierre/borrador/${id}`, base),
      ).toBe(400);
      expect(await estado('pm', 'post', `/actas-cierre/${id}/enviar`)).toBe(
        400,
      );
      await t.llamar('pmo', 'post', `/actas-cierre/${id}/aprobar`, {
        comentarios: 'ok',
      });
      expect(
        await estado('controlGestion', 'post', `/actas-cierre/${id}/aprobar`, {
          comentarios: 'ok',
          activos_fijos_id: USUARIOS.pm,
        }),
      ).toBe(400);
      await t.llamar('controlGestion', 'post', `/actas-cierre/${id}/aprobar`, {
        comentarios: 'ok',
        activos_fijos_id: USUARIOS.activosFijos,
      });
      expect(
        await estado('pm', 'post', `/actas-cierre/${id}/partes-interesadas`, {
          partes_interesadas_ids: [USUARIOS.interesada],
        }),
      ).toBe(400);
      await t.llamar('activosFijos', 'post', `/actas-cierre/${id}/aprobar`, {
        comentarios: 'ok',
      });
      expect(
        await estado('admin', 'post', `/actas-cierre/${id}/aprobar`, {
          comentarios: 'ok',
        }),
      ).toBe(400);
      await t.llamar('interesada', 'post', `/actas-cierre/${id}/aprobar`, {
        comentarios: 'ok',
      });
      expect(
        await estado('director', 'post', `/actas-cierre/${id}/aprobar`, {
          comentarios: 'ok',
          gerente_id: USUARIOS.pm,
        }),
      ).toBe(400);
      await t.llamar('director', 'post', `/actas-cierre/${id}/aprobar`, {
        comentarios: 'ok',
        gerente_id: USUARIOS.gerencia1,
      });
      expect(
        await estado('gerencia1', 'post', `/actas-cierre/${id}/aprobar`, {
          comentarios: 'ok',
        }),
      ).toBe(400);
      await t.llamar('gerencia1', 'post', `/actas-cierre/${id}/aprobar`, {
        comentarios: 'ok',
        enviar_a_presidencia: false,
      });
      // con el proyecto ya cancelado no se crean Controles de Cambio ni Órdenes Internas
      expect(
        await estado('pm', 'post', '/control-cambios', {
          proyecto_id: proyectoId,
          requiere_orden_interna: false,
        }),
      ).toBe(400);
      expect(
        await estado('pm', 'post', '/ordenes-internas', {
          proyecto_id: proyectoId,
          nombre_descriptivo: 'OI',
          tipo_orden: 'GASTO',
          presupuesto: 1,
        }),
      ).toBe(400);
    });
  });

  describe('Proyectos', () => {
    it('valida la compañía y el acceso a los procesos de cada rol', async () => {
      expect(
        await estado('pm', 'post', '/proyectos', {
          nombre: 'X',
          compania_id: 99999,
          fecha_proyecto: '2026-07-31',
        }),
      ).toBe(404);
      expect(await estado('pm', 'get', '/proyectos/NOEXISTE/procesos')).toBe(
        404,
      );
      const { proyectoId } = await crearProyectoConSiAprobada(t);
      for (const usuario of [
        'pm',
        'pmo',
        'director',
        'interesada',
        'gerencia1',
        'admin',
      ] as const) {
        expect(
          await estado(usuario, 'get', `/proyectos/${proyectoId}/procesos`),
        ).toBe(200);
      }
      for (const usuario of [
        'presidencia',
        'controlGestion',
        'activosFijos',
        'gerencia',
      ] as const) {
        expect([200, 403]).toContain(
          await estado(usuario, 'get', `/proyectos/${proyectoId}/procesos`),
        );
        expect(await estado(usuario, 'get', '/proyectos')).toBe(200);
      }
    });
  });
});

// Si RabbitMQ falla al encolar, los procesos igual avanzan (el error solo se registra).
describe('Procesos con las notificaciones caídas', () => {
  let t: AppDePruebas;

  beforeAll(async () => {
    t = await crearAppDePruebas({ notificacionesFallan: true });
  }, 120000);

  afterAll(async () => {
    await t.cerrar();
  });

  it('la SI, el CC y el acta avanzan aunque no se pueda notificar', async () => {
    const { proyectoId, siProcesoId } = await crearProyectoConSiAprobada(t);
    const si = await t.llamar(
      'pm',
      'get',
      `/solicitud-inversion/${siProcesoId}`,
    );
    expect(si.body.estado_actual).toBe('APROBADO_FINAL');

    const otra = await crearProyectoConSiEnviada(t);
    expect(
      (
        await t.llamar(
          'pmo',
          'post',
          `/solicitud-inversion/${otra.siProcesoId}/rechazar`,
          { razon_rechazo: 'x' },
        )
      ).status,
    ).toBe(201);
    await t.llamar(
      'pm',
      'post',
      `/solicitud-inversion/${otra.siProcesoId}/enviar`,
    );
    expect(
      (
        await t.llamar(
          'pmo',
          'post',
          `/solicitud-inversion/${otra.siProcesoId}/cancelar`,
          { razon_cancelacion: 'x' },
        )
      ).status,
    ).toBe(201);

    const cc = await t.llamar('pm', 'post', '/control-cambios', {
      proyecto_id: proyectoId,
      requiere_orden_interna: false,
    });
    const ccId = cc.body.proceso_id;
    await t.llamar(
      'pm',
      'post',
      `/control-cambios/${ccId}/partes-interesadas`,
      { partes_interesadas_ids: [USUARIOS.interesada] },
    );
    expect(
      (await t.llamar('pm', 'post', `/control-cambios/${ccId}/enviar`)).status,
    ).toBe(201);
    expect(
      (
        await t.llamar('pmo', 'post', `/control-cambios/${ccId}/aprobar`, {
          comentarios: 'ok',
        })
      ).status,
    ).toBe(201);
    expect(
      (
        await t.llamar(
          'interesada',
          'post',
          `/control-cambios/${ccId}/rechazar`,
          { razon_rechazo: 'x' },
        )
      ).status,
    ).toBe(201);
    await t.llamar('pm', 'post', `/control-cambios/${ccId}/enviar`);
    await t.llamar('pmo', 'post', `/control-cambios/${ccId}/aprobar`, {
      comentarios: 'ok',
    });
    await t.llamar('interesada', 'post', `/control-cambios/${ccId}/aprobar`, {
      comentarios: 'ok',
    });
    await t.llamar('director', 'post', `/control-cambios/${ccId}/aprobar`, {
      comentarios: 'ok',
      gerente_id: USUARIOS.gerencia1,
    });
    expect(
      (
        await t.llamar(
          'gerencia1',
          'post',
          `/control-cambios/${ccId}/aprobar`,
          { comentarios: 'ok', enviar_a_presidencia: false },
        )
      ).status,
    ).toBe(201);

    const acta = await t.llamar('pm', 'post', '/actas-cierre', {
      proyecto_id: proyectoId,
      tipo_cierre: 'CANCELACION',
      control_gestion_asignado_id: USUARIOS.controlGestion,
    });
    const actaId = acta.body.proceso_id ?? acta.body.procesoId;
    await t.llamar('pm', 'post', `/actas-cierre/${actaId}/partes-interesadas`, {
      partes_interesadas_ids: [USUARIOS.interesada],
    });
    expect(
      (await t.llamar('pm', 'post', `/actas-cierre/${actaId}/enviar`)).status,
    ).toBe(201);
    expect(
      (
        await t.llamar('pmo', 'post', `/actas-cierre/${actaId}/aprobar`, {
          comentarios: 'ok',
        })
      ).status,
    ).toBe(201);
    expect(
      (
        await t.llamar(
          'controlGestion',
          'post',
          `/actas-cierre/${actaId}/rechazar`,
          { razon_rechazo: 'x' },
        )
      ).status,
    ).toBe(201);
  });
});
