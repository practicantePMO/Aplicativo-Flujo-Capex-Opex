import {
  crearAppDePruebas,
  AppDePruebas,
} from '../../test/utilidades/app-pruebas';

// Flujo completo de una Solicitud de Inversión contra la API real (base en memoria):
// creación del proyecto, borrador, envío y aprobación por todas las etapas.
describe('Flujo: Solicitud de Inversión', () => {
  let entorno: AppDePruebas;
  let proyectoId: string;
  let procesoId: number;

  const solicitud = () => ({
    proyecto_id: proyectoId,
    incluye_tradicional: true,
    subprograma_id: 2,
    entregable_planeado: 'Entregable',
    trm: 4000,
    tiene_evaluacion_financiera: false,
    justificacion_sin_evaluacion: 'No aplica',
    metas: [
      { compromiso: 'Meta 1', fecha_inicio: '2026-08-01', indicador: 'Ind' },
    ],
    flujos_caja: [
      { tipo: 'CAPEX', moneda: 'USD', anio: 2026, mes: 8, monto: 100 },
      { tipo: 'OPEX', moneda: 'COP', anio: 2026, mes: 9, monto: 5000 },
      { tipo: 'GCAPEX', moneda: 'COP', anio: 2026, mes: 9, monto: 700 },
    ],
    partes_interesadas_ids: [7],
    link_acta_aprobacion: 'https://a.com/1',
    link_plan_proyecto: 'https://a.com/2',
    link_presentacion_puertas_3: 'https://a.com/3',
  });

  beforeAll(async () => {
    entorno = await crearAppDePruebas();
  }, 120000);

  afterAll(async () => {
    await entorno.cerrar();
  });

  it('el PM crea el proyecto', async () => {
    const respuesta = await entorno.llamar('pm', 'post', '/proyectos', {
      nombre: 'Proyecto prueba',
      compania_id: 1,
      fecha_proyecto: '2026-07-31',
    });
    expect(respuesta.status).toBe(201);
    proyectoId = respuesta.body.id;
    expect(proyectoId).toBeDefined();
  });

  it('rechaza una solicitud sin clasificación', async () => {
    const respuesta = await entorno.llamar(
      'pm',
      'post',
      '/solicitud-inversion',
      {
        ...solicitud(),
        incluye_tradicional: false,
        incluye_nueva: false,
      },
    );
    expect(respuesta.status).toBe(400);
  });

  it('rechaza una categoría que exige evaluación financiera si no la trae', async () => {
    const respuesta = await entorno.llamar(
      'pm',
      'post',
      '/solicitud-inversion',
      {
        ...solicitud(),
        incluye_tradicional: false,
        incluye_nueva: true,
        categoria_id: 1,
      },
    );
    expect(respuesta.status).toBe(400);
  });

  it('el PM crea el borrador y lo edita', async () => {
    const respuesta = await entorno.llamar(
      'pm',
      'post',
      '/solicitud-inversion',
      solicitud(),
    );
    expect(respuesta.status).toBe(201);
    procesoId =
      respuesta.body.proceso_id ??
      respuesta.body.procesoId ??
      respuesta.body.id;
    expect(procesoId).toBeDefined();

    const editar = await entorno.llamar(
      'pm',
      'put',
      `/solicitud-inversion/borrador/${procesoId}`,
      { ...solicitud(), entregable_planeado: 'Entregable editado' },
    );
    expect(editar.status).toBe(200);

    const detalle = await entorno.llamar(
      'pm',
      'get',
      `/solicitud-inversion/${procesoId}`,
    );
    expect(detalle.status).toBe(200);
    expect(detalle.body.estado_actual).toBe('BORRADOR');
    expect(detalle.body.solicitudes_inversion.entregable_planeado).toBe(
      'Entregable editado',
    );
  });

  it('el PM la envía a revisión y aparece en los pendientes del PMO', async () => {
    const respuesta = await entorno.llamar(
      'pm',
      'post',
      `/solicitud-inversion/${procesoId}/enviar`,
    );
    expect(respuesta.status).toBe(201);
    const pendientes = await entorno.llamar(
      'pmo',
      'get',
      '/pendientes/mis-pendientes',
    );
    expect(pendientes.status).toBe(200);
    expect(
      pendientes.body.some(
        (proceso: { id: number }) => proceso.id === procesoId,
      ),
    ).toBe(true);
  });

  it('el PM no puede aprobar su propia solicitud', async () => {
    const respuesta = await entorno.llamar(
      'pm',
      'post',
      `/solicitud-inversion/${procesoId}/aprobar`,
      { comentarios: 'ok' },
    );
    expect(respuesta.status).toBe(403);
  });

  it('pasa por PMO, partes interesadas, Dirección PMO, Gerencia y Presidencia', async () => {
    expect(
      (
        await entorno.llamar(
          'pmo',
          'post',
          `/solicitud-inversion/${procesoId}/aprobar`,
          { comentarios: 'ok pmo' },
        )
      ).status,
    ).toBe(201);
    expect(
      (
        await entorno.llamar(
          'interesada',
          'post',
          `/solicitud-inversion/${procesoId}/aprobar`,
          { comentarios: 'ok pi' },
        )
      ).status,
    ).toBe(201);
    // Dirección PMO debe elegir a qué gerente se envía
    expect(
      (
        await entorno.llamar(
          'director',
          'post',
          `/solicitud-inversion/${procesoId}/aprobar`,
          { comentarios: 'ok dir' },
        )
      ).status,
    ).toBe(400);
    expect(
      (
        await entorno.llamar(
          'director',
          'post',
          `/solicitud-inversion/${procesoId}/aprobar`,
          { comentarios: 'ok dir', gerente_id: 11 },
        )
      ).status,
    ).toBe(201);
    expect(
      (
        await entorno.llamar(
          'gerencia1',
          'post',
          `/solicitud-inversion/${procesoId}/aprobar`,
          { comentarios: 'ok ger', enviar_a_presidencia: true },
        )
      ).status,
    ).toBe(201);
    expect(
      (
        await entorno.llamar(
          'presidencia',
          'post',
          `/solicitud-inversion/${procesoId}/aprobar`,
          { comentarios: 'ok pres' },
        )
      ).status,
    ).toBe(201);

    const detalle = await entorno.llamar(
      'pm',
      'get',
      `/solicitud-inversion/${procesoId}`,
    );
    expect(detalle.body.estado_actual).toBe('APROBADO_FINAL');
    expect(entorno.notificaciones.length).toBeGreaterThan(0);
  });
});
