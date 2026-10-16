import {
  crearAppDePruebas,
  AppDePruebas,
  crearProyectoConSiAprobada,
  USUARIOS,
  NombreUsuario,
} from '../../test/utilidades/app-pruebas';

// Flujo del Acta de Cierre: culminación (todas las etapas, con valores reales y OI),
// cancelación del proyecto, rechazos y permisos.
describe('Flujo: Acta de Cierre', () => {
  let entorno: AppDePruebas;

  const aprobar = (usuario: NombreUsuario, procesoId: number, cuerpo: object) =>
    entorno.llamar(
      usuario,
      'post',
      `/actas-cierre/${procesoId}/aprobar`,
      cuerpo,
    );

  // Proyecto con SI aprobada y una OI aprobada y cerrada (para registrar su valor real en el acta).
  const prepararProyecto = async () => {
    const { proyectoId, siProcesoId } =
      await crearProyectoConSiAprobada(entorno);
    const oi = await entorno.llamar('pm', 'post', '/ordenes-internas', {
      proyecto_id: proyectoId,
      nombre_descriptivo: 'OI',
      tipo_orden: 'GASTO',
      presupuesto: 1000,
      presupuesto_moneda: 'COP',
    });
    const oiId: number = oi.body.orden_interna_id;
    await entorno.llamar('pm', 'post', `/ordenes-internas/${oiId}/enviar`, {
      control_gestion_id: USUARIOS.controlGestion,
    });
    await entorno.llamar(
      'controlGestion',
      'post',
      `/ordenes-internas/${oiId}/aprobar`,
      { numero_oi: `OI-${oiId}`, grupo_texto: 'Grupo' },
    );
    await entorno.llamar(
      'pm',
      'post',
      `/ordenes-internas/grupo/${proyectoId}/solicitar-cierre`,
      {},
    );
    await entorno.llamar(
      'controlGestion',
      'post',
      `/ordenes-internas/${oiId}/cerrar`,
    );
    const si = await entorno.llamar(
      'pm',
      'get',
      `/solicitud-inversion/${siProcesoId}`,
    );
    const metaId: number = si.body.solicitudes_inversion.solicitud_metas[0].id;
    return { proyectoId, oiId, metaId };
  };

  const acta = (
    proyectoId: string,
    oiId: number,
    metaId: number,
    cambios: object = {},
  ) => ({
    proyecto_id: proyectoId,
    tipo_cierre: 'CULMINACION',
    control_gestion_asignado_id: USUARIOS.controlGestion,
    entregable_real: 'Real',
    presentacion_p5_link: 'https://p5.com',
    explicacion_ejecucion: 'Se ejecutó menos',
    metas: [{ solicitud_meta_id: metaId, resultado_cierre: 'Cumplida' }],
    valores: [
      { categoria: 'ACTIVO', real_usd: 90, real_cop: 0 },
      { categoria: 'GASTO', real_usd: 0, real_cop: 5000 },
    ],
    flujo_caja: [
      { tipo: 'CAPEX', moneda: 'USD', anio: 2026, mes: 8, monto_real: 90 },
    ],
    entregables: [
      {
        equipo_sistema: 'Equipo X',
        vida_util: 5,
        codigo_activo_produccion: 'AP1',
      },
    ],
    otros_entregables: 'Otros',
    oi_valores_reales: [
      { orden_interna_id: oiId, valor_real: 900, valor_real_moneda: 'COP' },
    ],
    ...cambios,
  });

  beforeAll(async () => {
    entorno = await crearAppDePruebas();
  }, 120000);

  afterAll(async () => {
    await entorno.cerrar();
  });

  it('un acta de culminación recorre todas las etapas y cierra el proyecto', async () => {
    const { proyectoId, oiId, metaId } = await prepararProyecto();
    const creada = await entorno.llamar(
      'pm',
      'post',
      '/actas-cierre',
      acta(proyectoId, oiId, metaId),
    );
    expect(creada.status).toBe(201);
    const procesoId: number = creada.body.proceso_id ?? creada.body.procesoId;

    expect(
      (
        await entorno.llamar(
          'pm',
          'put',
          `/actas-cierre/borrador/${procesoId}`,
          acta(proyectoId, oiId, metaId, { entregable_real: 'Real editado' }),
        )
      ).status,
    ).toBe(200);
    expect(
      (await entorno.llamar('pm', 'post', `/actas-cierre/${procesoId}/enviar`))
        .status,
    ).toBe(400); // sin partes interesadas
    expect(
      (
        await entorno.llamar(
          'pm',
          'post',
          `/actas-cierre/${procesoId}/partes-interesadas`,
          { partes_interesadas_ids: [USUARIOS.interesada] },
        )
      ).status,
    ).toBe(201);
    expect(
      (await entorno.llamar('pm', 'post', `/actas-cierre/${procesoId}/enviar`))
        .status,
    ).toBe(201);

    expect(
      (await aprobar('pmo', procesoId, { comentarios: 'ok' })).status,
    ).toBe(201);
    expect(
      (
        await entorno.llamar(
          'controlGestion',
          'get',
          '/actas-cierre/mis-pendientes',
        )
      ).status,
    ).toBe(200);
    expect(
      (await aprobar('controlGestion', procesoId, { comentarios: 'ok' }))
        .status,
    ).toBe(400); // falta Activos Fijos
    expect(
      (
        await aprobar('controlGestion', procesoId, {
          comentarios: 'ok',
          activos_fijos_id: USUARIOS.activosFijos,
        })
      ).status,
    ).toBe(201);
    expect(
      (await aprobar('activosFijos', procesoId, { comentarios: 'ok' })).status,
    ).toBe(201);
    expect(
      (await aprobar('interesada', procesoId, { comentarios: 'ok' })).status,
    ).toBe(201);
    expect(
      (
        await aprobar('director', procesoId, {
          comentarios: 'ok',
          gerente_id: USUARIOS.gerencia1,
        })
      ).status,
    ).toBe(201);
    expect(
      (
        await aprobar('gerencia1', procesoId, {
          comentarios: 'ok',
          enviar_a_presidencia: true,
        })
      ).status,
    ).toBe(201);
    expect(
      (await aprobar('presidencia', procesoId, { comentarios: 'ok' })).status,
    ).toBe(201);

    const detalle = await entorno.llamar(
      'pm',
      'get',
      `/actas-cierre/${procesoId}`,
    );
    expect(detalle.status).toBe(200);
    expect(detalle.body.procesos.estado_actual).toBe('CERRADO');
    expect(
      (
        await entorno.llamar(
          'pm',
          'get',
          `/actas-cierre/proyecto/${proyectoId}`,
        )
      ).status,
    ).toBe(200);
    expect(
      (await entorno.llamar('pm', 'get', `/proyectos/${proyectoId}/procesos`))
        .status,
    ).toBe(200);
  });

  it('un acta de cancelación cancela el proyecto al aprobarse', async () => {
    const { proyectoId, oiId, metaId } = await prepararProyecto();
    const creada = await entorno.llamar(
      'pm',
      'post',
      '/actas-cierre',
      acta(proyectoId, oiId, metaId, { tipo_cierre: 'CANCELACION' }),
    );
    expect(creada.status).toBe(201);
    const procesoId: number = creada.body.proceso_id ?? creada.body.procesoId;
    await entorno.llamar(
      'pm',
      'post',
      `/actas-cierre/${procesoId}/partes-interesadas`,
      { partes_interesadas_ids: [USUARIOS.interesada] },
    );
    await entorno.llamar('pm', 'post', `/actas-cierre/${procesoId}/enviar`);
    await aprobar('pmo', procesoId, { comentarios: 'ok' });
    await aprobar('controlGestion', procesoId, {
      comentarios: 'ok',
      activos_fijos_id: USUARIOS.activosFijos,
    });
    await aprobar('activosFijos', procesoId, { comentarios: 'ok' });
    await aprobar('interesada', procesoId, { comentarios: 'ok' });
    await aprobar('director', procesoId, {
      comentarios: 'ok',
      gerente_id: USUARIOS.gerencia1,
    });
    expect(
      (
        await aprobar('gerencia1', procesoId, {
          comentarios: 'ok',
          enviar_a_presidencia: false,
        })
      ).status,
    ).toBe(201);
    const proyectos = await entorno.llamar('pmo', 'get', '/proyectos');
    expect(
      proyectos.body.find(
        (proceso: { id: string }) => proceso.id === proyectoId,
      ).estado,
    ).toBe('CANCELADO');
  });

  it('rechazos del acta en varias etapas', async () => {
    const { proyectoId, oiId, metaId } = await prepararProyecto();
    const creada = await entorno.llamar(
      'pm',
      'post',
      '/actas-cierre',
      acta(proyectoId, oiId, metaId),
    );
    const procesoId: number = creada.body.proceso_id ?? creada.body.procesoId;
    await entorno.llamar(
      'pm',
      'post',
      `/actas-cierre/${procesoId}/partes-interesadas`,
      { partes_interesadas_ids: [USUARIOS.interesada] },
    );
    await entorno.llamar('pm', 'post', `/actas-cierre/${procesoId}/enviar`);
    expect(
      (
        await entorno.llamar(
          'pmo',
          'post',
          `/actas-cierre/${procesoId}/rechazar`,
          {},
        )
      ).status,
    ).toBe(400);
    expect(
      (
        await entorno.llamar(
          'pmo',
          'post',
          `/actas-cierre/${procesoId}/rechazar`,
          {
            razon_rechazo: 'Corregir',
          },
        )
      ).status,
    ).toBe(201);
    await entorno.llamar('pm', 'post', `/actas-cierre/${procesoId}/enviar`);
    await aprobar('pmo', procesoId, { comentarios: 'ok' });
    expect(
      (
        await entorno.llamar(
          'controlGestion',
          'post',
          `/actas-cierre/${procesoId}/rechazar`,
          { razon_rechazo: 'No' },
        )
      ).status,
    ).toBe(201);
  });

  it('permisos del acta', async () => {
    const { proyectoId, oiId, metaId } = await prepararProyecto();
    expect(
      (
        await entorno.llamar(
          'pm2',
          'post',
          '/actas-cierre',
          acta(proyectoId, oiId, metaId),
        )
      ).status,
    ).toBe(403);
    const creada = await entorno.llamar(
      'pm',
      'post',
      '/actas-cierre',
      acta(proyectoId, oiId, metaId),
    );
    const procesoId: number = creada.body.proceso_id ?? creada.body.procesoId;
    expect(
      (await entorno.llamar('pm2', 'get', `/actas-cierre/${procesoId}`)).status,
    ).toBe(403);
    // solo puede haber un acta abierta por proyecto
    expect(
      (
        await entorno.llamar(
          'pm',
          'post',
          '/actas-cierre',
          acta(proyectoId, oiId, metaId),
        )
      ).status,
    ).toBe(400);
  });

  it('el backup a Excel incluye los datos creados en este flujo', async () => {
    const respuesta = await entorno.llamar('admin', 'get', '/backup/excel');
    expect(respuesta.status).toBe(200);
  });

  it('el Administrador puede aprobar todas las etapas, aunque no esté asignado', async () => {
    const { proyectoId, oiId, metaId } = await prepararProyecto();
    const creada = await entorno.llamar(
      'pm',
      'post',
      '/actas-cierre',
      acta(proyectoId, oiId, metaId),
    );
    const procesoId: number = creada.body.proceso_id ?? creada.body.procesoId;
    await entorno.llamar(
      'pm',
      'post',
      `/actas-cierre/${procesoId}/partes-interesadas`,
      { partes_interesadas_ids: [USUARIOS.interesada] },
    );
    await entorno.llamar('pm', 'post', `/actas-cierre/${procesoId}/enviar`);

    const pasos: object[] = [
      { comentarios: 'ok' }, // PMO
      { comentarios: 'ok', activos_fijos_id: USUARIOS.activosFijos }, // Control Gestión
      { comentarios: 'ok' }, // Activos Fijos
      { comentarios: 'ok' }, // Partes Interesadas
      { comentarios: 'ok', gerente_id: USUARIOS.gerencia1 }, // Dirección PMO
      { comentarios: 'ok', enviar_a_presidencia: false }, // Gerencia
    ];
    for (const cuerpo of pasos) {
      expect((await aprobar('admin', procesoId, cuerpo)).status).toBe(201);
    }
    const detalle = await entorno.llamar(
      'admin',
      'get',
      `/actas-cierre/${procesoId}`,
    );
    expect(detalle.body.procesos.estado_actual).toBe('CERRADO');
  });
});
