import {
  crearAppDePruebas,
  AppDePruebas,
  crearProyectoConSiEnviada,
  datosSolicitud,
  USUARIOS,
} from '../../test/utilidades/app-pruebas';

// Casos alternos de la Solicitud de Inversión: rechazos, cancelación, permisos y consultas.
describe('Flujo: Solicitud de Inversión (rechazos, cancelación y permisos)', () => {
  let t: AppDePruebas;

  beforeAll(async () => {
    t = await crearAppDePruebas();
  }, 120000);

  afterAll(async () => {
    await t.cerrar();
  });

  it('consulta catálogos de la SI', async () => {
    expect(
      (await t.llamar('pm', 'get', '/solicitud-inversion/categorias')).status,
    ).toBe(200);
    expect(
      (await t.llamar('pm', 'get', '/solicitud-inversion/partes-interesadas/1'))
        .status,
    ).toBe(200);
    expect(
      (await t.llamar('pmo', 'get', '/solicitud-inversion/mis-pendientes'))
        .status,
    ).toBe(200);
  });

  it('crea una SI con evaluación financiera en una categoría que la exige', async () => {
    const proyecto = await t.llamar('pm', 'post', '/proyectos', {
      nombre: 'Con evaluación',
      compania_id: 1,
      fecha_proyecto: '2026-07-31',
    });
    const r = await t.llamar(
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
    expect(r.status).toBe(201);
    // No se puede crear una segunda SI para el mismo proyecto
    const otra = await t.llamar(
      'pm',
      'post',
      '/solicitud-inversion',
      datosSolicitud(proyecto.body.id),
    );
    expect(otra.status).toBeGreaterThanOrEqual(400);
  });

  it('el PMO rechaza (con razón obligatoria) y la SI vuelve a borrador', async () => {
    const { siProcesoId } = await crearProyectoConSiEnviada(t);
    expect(
      (
        await t.llamar(
          'pmo',
          'post',
          `/solicitud-inversion/${siProcesoId}/rechazar`,
          {},
        )
      ).status,
    ).toBe(400);
    const r = await t.llamar(
      'pmo',
      'post',
      `/solicitud-inversion/${siProcesoId}/rechazar`,
      { razon_rechazo: 'Falta información' },
    );
    expect(r.status).toBe(201);
    const detalle = await t.llamar(
      'pm',
      'get',
      `/solicitud-inversion/${siProcesoId}`,
    );
    expect(detalle.body.estado_actual).toBe('BORRADOR');
    expect(
      (
        await t.llamar(
          'pm',
          'post',
          `/solicitud-inversion/${siProcesoId}/enviar`,
        )
      ).status,
    ).toBe(201);
  });

  it('una parte interesada rechaza en su etapa', async () => {
    const { siProcesoId } = await crearProyectoConSiEnviada(t);
    await t.llamar(
      'pmo',
      'post',
      `/solicitud-inversion/${siProcesoId}/aprobar`,
      { comentarios: 'ok' },
    );
    const r = await t.llamar(
      'interesada',
      'post',
      `/solicitud-inversion/${siProcesoId}/rechazar`,
      { razon_rechazo: 'No estoy de acuerdo' },
    );
    expect(r.status).toBe(201);
  });

  it('la Gerencia rechaza y solo el gerente asignado puede decidir', async () => {
    const { siProcesoId } = await crearProyectoConSiEnviada(t);
    await t.llamar(
      'pmo',
      'post',
      `/solicitud-inversion/${siProcesoId}/aprobar`,
      { comentarios: 'ok' },
    );
    await t.llamar(
      'interesada',
      'post',
      `/solicitud-inversion/${siProcesoId}/aprobar`,
      { comentarios: 'ok' },
    );
    await t.llamar(
      'director',
      'post',
      `/solicitud-inversion/${siProcesoId}/aprobar`,
      { comentarios: 'ok', gerente_id: USUARIOS.gerencia1 },
    );
    // otro gerente (no asignado) no puede aprobar
    expect(
      (
        await t.llamar(
          'gerencia',
          'post',
          `/solicitud-inversion/${siProcesoId}/aprobar`,
          { comentarios: 'ok' },
        )
      ).status,
    ).toBe(403);
    expect(
      (
        await t.llamar(
          'gerencia1',
          'post',
          `/solicitud-inversion/${siProcesoId}/rechazar`,
          { razon_rechazo: 'No' },
        )
      ).status,
    ).toBe(201);
  });

  it('el PMO actualiza las partes interesadas y luego cancela definitivamente', async () => {
    const { siProcesoId } = await crearProyectoConSiEnviada(t);
    const partes = await t.llamar(
      'pmo',
      'post',
      `/solicitud-inversion/${siProcesoId}/partes-interesadas`,
      { partes_interesadas_ids: [USUARIOS.interesada] },
    );
    expect(partes.status).toBe(201);
    expect(
      (
        await t.llamar(
          'pmo',
          'post',
          `/solicitud-inversion/${siProcesoId}/cancelar`,
          {},
        )
      ).status,
    ).toBe(400);
    const r = await t.llamar(
      'pmo',
      'post',
      `/solicitud-inversion/${siProcesoId}/cancelar`,
      { razon_cancelacion: 'Ya no se hará' },
    );
    expect(r.status).toBe(201);
    const detalle = await t.llamar(
      'pm',
      'get',
      `/solicitud-inversion/${siProcesoId}`,
    );
    expect(detalle.body.estado_actual).toBe('CANCELADO');
  });

  it('el administrador puede aprobar en cualquier etapa', async () => {
    const { siProcesoId } = await crearProyectoConSiEnviada(t);
    expect(
      (
        await t.llamar(
          'admin',
          'post',
          `/solicitud-inversion/${siProcesoId}/aprobar`,
          { comentarios: 'ok admin' },
        )
      ).status,
    ).toBe(201);
  });

  it('un PM no puede ver ni editar la SI de otro PM', async () => {
    const { siProcesoId } = await crearProyectoConSiEnviada(t);
    expect(
      (await t.llamar('pm2', 'get', `/solicitud-inversion/${siProcesoId}`))
        .status,
    ).toBe(403);
    expect(
      (
        await t.llamar(
          'pm2',
          'post',
          `/solicitud-inversion/${siProcesoId}/enviar`,
        )
      ).status,
    ).toBeGreaterThanOrEqual(400);
    expect(
      (await t.llamar('sinRol', 'get', `/solicitud-inversion/${siProcesoId}`))
        .status,
    ).toBe(403);
  });
});
