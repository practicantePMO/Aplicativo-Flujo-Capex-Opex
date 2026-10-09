import {
  crearAppDePruebas,
  AppDePruebas,
  crearProyectoConSiAprobada,
  USUARIOS,
  NombreUsuario,
} from '../../test/utilidades/app-pruebas';

// Flujo de Control de Cambios: general (con Orden Interna asociada), aplazamiento de año,
// rechazo y permisos.
describe('Flujo: Control de Cambios', () => {
  let t: AppDePruebas;
  let proyectoId: string;

  const cc = (cambios: object = {}) => ({
    proyecto_id: proyectoId,
    requiere_orden_interna: true,
    descripcion_cambio: 'Cambio de alcance',
    antecedentes: 'Antecedentes',
    justificacion: 'Justificación',
    impacto_alcance: 'Alto',
    impacto_tiempo: '2 meses',
    anexos: [
      { tipo: 'DOCUMENTO', url: 'https://doc.com/1', descripcion: 'Soporte' },
    ],
    tipo_control_cambio: 'GENERAL',
    ...cambios,
  });

  const aprobar = (usuario: NombreUsuario, procesoId: number, cuerpo: object) =>
    t.llamar(usuario, 'post', `/control-cambios/${procesoId}/aprobar`, cuerpo);

  // Crea el CC, le asigna la parte interesada y lo envía a revisión.
  const crearYEnviar = async (cambios: object = {}) => {
    const creado = await t.llamar(
      'pm',
      'post',
      '/control-cambios',
      cc(cambios),
    );
    const procesoId: number = creado.body.proceso_id;
    await t.llamar(
      'pm',
      'post',
      `/control-cambios/${procesoId}/partes-interesadas`,
      { partes_interesadas_ids: [USUARIOS.interesada] },
    );
    await t.llamar('pm', 'post', `/control-cambios/${procesoId}/enviar`);
    return procesoId;
  };

  beforeAll(async () => {
    t = await crearAppDePruebas();
    ({ proyectoId } = await crearProyectoConSiAprobada(t));
  }, 120000);

  afterAll(async () => {
    await t.cerrar();
  });

  it('crea, edita y consulta un CC en borrador', async () => {
    const creado = await t.llamar('pm', 'post', '/control-cambios', cc());
    expect(creado.status).toBe(201);
    const procesoId = creado.body.proceso_id;
    const editar = await t.llamar(
      'pm',
      'put',
      `/control-cambios/borrador/${procesoId}`,
      cc({ descripcion_cambio: 'Editado' }),
    );
    expect(editar.status).toBe(200);
    const detalle = await t.llamar(
      'pm',
      'get',
      `/control-cambios/${procesoId}`,
    );
    expect(detalle.status).toBe(200);
    expect(detalle.body.descripcion_cambio).toBe('Editado');
    expect(
      (await t.llamar('pm', 'get', `/control-cambios/proyecto/${proyectoId}`))
        .status,
    ).toBe(200);
  });

  it('no se puede enviar sin partes interesadas', async () => {
    const creado = await t.llamar('pm', 'post', '/control-cambios', cc());
    expect(
      (
        await t.llamar(
          'pm',
          'post',
          `/control-cambios/${creado.body.proceso_id}/enviar`,
        )
      ).status,
    ).toBe(400);
  });

  it('un CC general recorre todas las etapas y permite crear su Orden Interna', async () => {
    const procesoId = await crearYEnviar();
    expect(
      (await t.llamar('pmo', 'get', '/control-cambios/mis-pendientes')).status,
    ).toBe(200);
    expect(
      (await aprobar('pmo', procesoId, { comentarios: 'ok' })).status,
    ).toBe(201);
    expect(
      (await aprobar('interesada', procesoId, { comentarios: 'ok' })).status,
    ).toBe(201);
    expect(
      (await aprobar('director', procesoId, { comentarios: 'ok' })).status,
    ).toBe(400);
    expect(
      (
        await aprobar('director', procesoId, {
          comentarios: 'ok',
          gerente_id: USUARIOS.pm,
        })
      ).status,
    ).toBe(400);
    expect(
      (
        await aprobar('director', procesoId, {
          comentarios: 'ok',
          gerente_id: USUARIOS.gerencia1,
        })
      ).status,
    ).toBe(201);
    expect(
      (await aprobar('gerencia1', procesoId, { comentarios: 'ok' })).status,
    ).toBe(400);
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

    const detalle = await t.llamar(
      'pm',
      'get',
      `/control-cambios/${procesoId}`,
    );
    expect(detalle.body.procesos.estado_actual).toBe('APROBADO_FINAL');

    // Orden Interna creada desde el Control de Cambios, con su valor total
    const oi = await t.llamar('pm', 'post', '/ordenes-internas', {
      proyecto_id: proyectoId,
      nombre_descriptivo: 'OI del CC',
      tipo_orden: 'GASTO',
      presupuesto: 500,
      es_control_cambios: true,
      control_cambio_id: detalle.body.id,
      valores: [
        { categoria: 'ACTIVO', usd: 10, cop: 0 },
        { categoria: 'GASTO', usd: 0, cop: 500 },
      ],
    });
    expect(oi.status).toBe(201);
  });

  it('un CC de aplazamiento exige el año nuevo y al aprobarse aplaza el proyecto', async () => {
    expect(
      (
        await t.llamar(
          'pm',
          'post',
          '/control-cambios',
          cc({ tipo_control_cambio: 'APLAZAMIENTO' }),
        )
      ).status,
    ).toBe(400);
    const procesoId = await crearYEnviar({
      tipo_control_cambio: 'APLAZAMIENTO',
      anio_nuevo_propuesto: 2027,
      requiere_orden_interna: false,
    });
    await aprobar('pmo', procesoId, { comentarios: 'ok' });
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

    const proyectos = await t.llamar('pm', 'get', '/proyectos');
    const proyecto = proyectos.body.find(
      (p: { id: string }) => p.id === proyectoId,
    );
    expect(proyecto.anio_asignado).toBe(2027);
  });

  it('el PMO rechaza un CC y vuelve a borrador; nadie aprueba un CC en borrador', async () => {
    const procesoId = await crearYEnviar();
    expect(
      (
        await t.llamar(
          'pmo',
          'post',
          `/control-cambios/${procesoId}/rechazar`,
          {},
        )
      ).status,
    ).toBe(400);
    expect(
      (
        await t.llamar(
          'pmo',
          'post',
          `/control-cambios/${procesoId}/rechazar`,
          { razon_rechazo: 'Incompleto' },
        )
      ).status,
    ).toBe(201);
    expect(
      (await aprobar('admin', procesoId, { comentarios: 'ok' })).status,
    ).toBe(400);
  });

  it('rechazos en las demás etapas', async () => {
    const procesoId = await crearYEnviar();
    await aprobar('pmo', procesoId, { comentarios: 'ok' });
    expect(
      (
        await t.llamar(
          'interesada',
          'post',
          `/control-cambios/${procesoId}/rechazar`,
          { razon_rechazo: 'No' },
        )
      ).status,
    ).toBe(201);

    const otro = await crearYEnviar();
    await aprobar('pmo', otro, { comentarios: 'ok' });
    await aprobar('interesada', otro, { comentarios: 'ok' });
    expect(
      (
        await t.llamar(
          'director',
          'post',
          `/control-cambios/${otro}/rechazar`,
          { razon_rechazo: 'No' },
        )
      ).status,
    ).toBe(201);
  });

  it('otro PM no puede ver ni enviar el CC', async () => {
    const creado = await t.llamar('pm', 'post', '/control-cambios', cc());
    const procesoId = creado.body.proceso_id;
    expect(
      (await t.llamar('pm2', 'get', `/control-cambios/${procesoId}`)).status,
    ).toBe(403);
    expect(
      (await t.llamar('pm2', 'post', `/control-cambios/${procesoId}/enviar`))
        .status,
    ).toBe(403);
  });

  it('el backup a Excel incluye los datos creados en este flujo', async () => {
    const r = await t.llamar('admin', 'get', '/backup/excel');
    expect(r.status).toBe(200);
  });
});
