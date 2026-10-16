import {
  crearAppDePruebas,
  AppDePruebas,
  crearProyectoConSiEnviada,
  datosSolicitud,
  USUARIOS,
} from '../../test/utilidades/app-pruebas';

// Casos alternos de la Solicitud de Inversión: rechazos, cancelación, permisos y consultas.
describe('Flujo: Solicitud de Inversión (rechazos, cancelación y permisos)', () => {
  let entorno: AppDePruebas;

  beforeAll(async () => {
    entorno = await crearAppDePruebas();
  }, 120000);

  afterAll(async () => {
    await entorno.cerrar();
  });

  it('consulta catálogos de la SI', async () => {
    expect(
      (await entorno.llamar('pm', 'get', '/solicitud-inversion/categorias'))
        .status,
    ).toBe(200);
    expect(
      (
        await entorno.llamar(
          'pm',
          'get',
          '/solicitud-inversion/partes-interesadas/1',
        )
      ).status,
    ).toBe(200);
    expect(
      (
        await entorno.llamar(
          'pmo',
          'get',
          '/solicitud-inversion/mis-pendientes',
        )
      ).status,
    ).toBe(200);
  });

  it('crea una SI con evaluación financiera en una categoría que la exige', async () => {
    const proyecto = await entorno.llamar('pm', 'post', '/proyectos', {
      nombre: 'Con evaluación',
      compania_id: 1,
      fecha_proyecto: '2026-07-31',
    });
    const respuesta = await entorno.llamar(
      'pm',
      'post',
      '/solicitud-inversion',
      datosSolicitud(proyecto.body.id, {
        incluye_tradicional: true,
        incluye_nueva: true,
        categoria_id: 1,
        tiene_evaluacion_financiera: true,
        evaluacion_financiera: { tir: 12, vpn: 1000, payback: 3 },
        justificacion_sin_evaluacion: undefined,
      }),
    );
    expect(respuesta.status).toBe(201);
    // No se puede crear una segunda SI para el mismo proyecto
    const otra = await entorno.llamar(
      'pm',
      'post',
      '/solicitud-inversion',
      datosSolicitud(proyecto.body.id),
    );
    expect(otra.status).toBeGreaterThanOrEqual(400);
  });

  it('el PMO rechaza (con razón obligatoria) y la SI vuelve a borrador', async () => {
    const { siProcesoId } = await crearProyectoConSiEnviada(entorno);
    expect(
      (
        await entorno.llamar(
          'pmo',
          'post',
          `/solicitud-inversion/${siProcesoId}/rechazar`,
          {},
        )
      ).status,
    ).toBe(400);
    const respuesta = await entorno.llamar(
      'pmo',
      'post',
      `/solicitud-inversion/${siProcesoId}/rechazar`,
      { razon_rechazo: 'Falta información' },
    );
    expect(respuesta.status).toBe(201);
    const detalle = await entorno.llamar(
      'pm',
      'get',
      `/solicitud-inversion/${siProcesoId}`,
    );
    expect(detalle.body.estado_actual).toBe('BORRADOR');
    expect(
      (
        await entorno.llamar(
          'pm',
          'post',
          `/solicitud-inversion/${siProcesoId}/enviar`,
        )
      ).status,
    ).toBe(201);
  });

  it('una parte interesada rechaza en su etapa', async () => {
    const { siProcesoId } = await crearProyectoConSiEnviada(entorno);
    await entorno.llamar(
      'pmo',
      'post',
      `/solicitud-inversion/${siProcesoId}/aprobar`,
      { comentarios: 'ok' },
    );
    const respuesta = await entorno.llamar(
      'interesada',
      'post',
      `/solicitud-inversion/${siProcesoId}/rechazar`,
      { razon_rechazo: 'No estoy de acuerdo' },
    );
    expect(respuesta.status).toBe(201);
  });

  it('la Gerencia rechaza y solo el gerente asignado puede decidir', async () => {
    const { siProcesoId } = await crearProyectoConSiEnviada(entorno);
    await entorno.llamar(
      'pmo',
      'post',
      `/solicitud-inversion/${siProcesoId}/aprobar`,
      { comentarios: 'ok' },
    );
    await entorno.llamar(
      'interesada',
      'post',
      `/solicitud-inversion/${siProcesoId}/aprobar`,
      { comentarios: 'ok' },
    );
    await entorno.llamar(
      'director',
      'post',
      `/solicitud-inversion/${siProcesoId}/aprobar`,
      { comentarios: 'ok', gerente_id: USUARIOS.gerencia1 },
    );
    // otro gerente (no asignado) no puede aprobar
    expect(
      (
        await entorno.llamar(
          'gerencia',
          'post',
          `/solicitud-inversion/${siProcesoId}/aprobar`,
          { comentarios: 'ok' },
        )
      ).status,
    ).toBe(403);
    expect(
      (
        await entorno.llamar(
          'gerencia1',
          'post',
          `/solicitud-inversion/${siProcesoId}/rechazar`,
          { razon_rechazo: 'No' },
        )
      ).status,
    ).toBe(201);
  });

  it('el PMO actualiza las partes interesadas y luego cancela definitivamente', async () => {
    const { siProcesoId } = await crearProyectoConSiEnviada(entorno);
    const partes = await entorno.llamar(
      'pmo',
      'post',
      `/solicitud-inversion/${siProcesoId}/partes-interesadas`,
      { partes_interesadas_ids: [USUARIOS.interesada] },
    );
    expect(partes.status).toBe(201);
    expect(
      (
        await entorno.llamar(
          'pmo',
          'post',
          `/solicitud-inversion/${siProcesoId}/cancelar`,
          {},
        )
      ).status,
    ).toBe(400);
    const respuesta = await entorno.llamar(
      'pmo',
      'post',
      `/solicitud-inversion/${siProcesoId}/cancelar`,
      { razon_cancelacion: 'Ya no se hará' },
    );
    expect(respuesta.status).toBe(201);
    const detalle = await entorno.llamar(
      'pm',
      'get',
      `/solicitud-inversion/${siProcesoId}`,
    );
    expect(detalle.body.estado_actual).toBe('CANCELADO');
  });

  it('el administrador puede aprobar en cualquier etapa', async () => {
    const { siProcesoId } = await crearProyectoConSiEnviada(entorno);
    expect(
      (
        await entorno.llamar(
          'admin',
          'post',
          `/solicitud-inversion/${siProcesoId}/aprobar`,
          { comentarios: 'ok admin' },
        )
      ).status,
    ).toBe(201);
  });

  it('un PM no puede ver ni editar la SI de otro PM', async () => {
    const { siProcesoId } = await crearProyectoConSiEnviada(entorno);
    expect(
      (
        await entorno.llamar(
          'pm2',
          'get',
          `/solicitud-inversion/${siProcesoId}`,
        )
      ).status,
    ).toBe(403);
    expect(
      (
        await entorno.llamar(
          'pm2',
          'post',
          `/solicitud-inversion/${siProcesoId}/enviar`,
        )
      ).status,
    ).toBeGreaterThanOrEqual(400);
    expect(
      (
        await entorno.llamar(
          'sinRol',
          'get',
          `/solicitud-inversion/${siProcesoId}`,
        )
      ).status,
    ).toBe(403);
  });

  it('el Administrador puede aprobar todas las etapas, aunque no esté asignado', async () => {
    const { siProcesoId } = await crearProyectoConSiEnviada(entorno);
    const aprobar = (cuerpo: object) =>
      entorno.llamar(
        'admin',
        'post',
        `/solicitud-inversion/${siProcesoId}/aprobar`,
        cuerpo,
      );
    const estado = async () =>
      (
        await entorno.llamar(
          'admin',
          'get',
          `/solicitud-inversion/${siProcesoId}`,
        )
      ).body;

    expect((await aprobar({ comentarios: 'ok' })).status).toBe(201);
    expect((await estado()).estado_actual).toBe(
      'VERIFICACION_PARTES_INTERESADAS',
    );

    // Partes Interesadas: el Administrador no está asignado, pero puede aprobar.
    expect((await aprobar({ comentarios: 'ok' })).status).toBe(201);
    const enDireccion = await estado();
    expect(enDireccion.estado_actual).toBe('DIRECCION_PMO');
    expect(
      enDireccion.asignaciones_proceso
        .filter(
          (asignacion: { etapa: string }) =>
            asignacion.etapa === 'VERIFICACION_PARTES_INTERESADAS',
        )
        .every(
          (asignacion: { estado_asignacion: string }) =>
            asignacion.estado_asignacion === 'RESUELTA',
        ),
    ).toBe(true);

    expect(
      (await aprobar({ comentarios: 'ok', gerente_id: USUARIOS.gerencia1 }))
        .status,
    ).toBe(201);
    // Gerencia: la etapa es de la gerente elegida, pero el Administrador también puede aprobar.
    expect(
      (await aprobar({ comentarios: 'ok', enviar_a_presidencia: true })).status,
    ).toBe(201);
    expect((await aprobar({ comentarios: 'ok' })).status).toBe(201);
    expect((await estado()).estado_actual).toBe('APROBADO_FINAL');
  });
});
