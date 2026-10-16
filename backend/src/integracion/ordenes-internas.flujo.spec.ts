import {
  crearAppDePruebas,
  AppDePruebas,
  crearProyectoConSiAprobada,
  crearProyectoConSiEnviada,
  USUARIOS,
} from '../../test/utilidades/app-pruebas';

// Flujo de Órdenes Internas: borrador, envío a Control Gestión, rechazo, aprobación,
// solicitud de cierre del grupo, cierre y cancelación de borradores.
describe('Flujo: Órdenes Internas', () => {
  let entorno: AppDePruebas;
  let proyectoId: string;
  let oiGasto: number;
  let oiActivo: number;

  const oi = (cambios: object = {}) => ({
    proyecto_id: proyectoId,
    nombre_descriptivo: 'OI prueba',
    tipo_orden: 'GASTO',
    presupuesto: 1000,
    presupuesto_moneda: 'COP',
    centro_costos: 'CC1',
    ...cambios,
  });

  beforeAll(async () => {
    entorno = await crearAppDePruebas();
    ({ proyectoId } = await crearProyectoConSiAprobada(entorno));
  }, 120000);

  afterAll(async () => {
    await entorno.cerrar();
  });

  it('no deja crear Órdenes Internas si la SI no está aprobada', async () => {
    const otro = await crearProyectoConSiEnviada(entorno);
    const respuesta = await entorno.llamar(
      'pm',
      'post',
      '/ordenes-internas',
      oi({ proyecto_id: otro.proyectoId }),
    );
    expect(respuesta.status).toBe(400);
  });

  it('el PM crea una OI de gasto y una de activo y edita el borrador', async () => {
    const gasto = await entorno.llamar('pm', 'post', '/ordenes-internas', oi());
    expect(gasto.status).toBe(201);
    oiGasto = gasto.body.orden_interna_id;

    const activo = await entorno.llamar(
      'pm',
      'post',
      '/ordenes-internas',
      oi({
        tipo_orden: 'ACTIVO',
        activo_fijo_curso: 'AF1',
        tipo_activo: 'EXPANSION',
        activo_real_productivo: 'SI',
        porcentaje_2: 50,
      }),
    );
    expect(activo.status).toBe(201);
    oiActivo = activo.body.orden_interna_id;

    const editar = await entorno.llamar(
      'pm',
      'put',
      `/ordenes-internas/${oiGasto}`,
      oi({ nombre_descriptivo: 'OI editada' }),
    );
    expect(editar.status).toBe(200);
    expect(
      (await entorno.llamar('pm', 'get', `/ordenes-internas/${oiGasto}`)).body
        .nombre_descriptivo,
    ).toBe('OI editada');
  });

  it('envía la OI a Control Gestión, que la rechaza y luego la aprueba', async () => {
    expect(
      (
        await entorno.llamar(
          'pm',
          'post',
          `/ordenes-internas/${oiGasto}/enviar`,
          {
            control_gestion_id: USUARIOS.controlGestion,
          },
        )
      ).status,
    ).toBe(201);
    expect(
      (
        await entorno.llamar(
          'controlGestion',
          'post',
          `/ordenes-internas/${oiGasto}/rechazar`,
          { observaciones: 'Corregir centro de costos' },
        )
      ).status,
    ).toBe(201);
    expect(
      (
        await entorno.llamar(
          'pm',
          'post',
          `/ordenes-internas/${oiGasto}/enviar`,
          {
            control_gestion_id: USUARIOS.controlGestion,
          },
        )
      ).status,
    ).toBe(201);

    // La primera OI del grupo exige el nombre del grupo
    expect(
      (
        await entorno.llamar(
          'controlGestion',
          'post',
          `/ordenes-internas/${oiGasto}/aprobar`,
          { numero_oi: 'OI-0001' },
        )
      ).status,
    ).toBe(400);
    const aprobar = await entorno.llamar(
      'controlGestion',
      'post',
      `/ordenes-internas/${oiGasto}/aprobar`,
      { numero_oi: 'OI-0001', grupo_texto: '  Grupo A  ', observaciones: 'ok' },
    );
    expect(aprobar.status).toBe(201);
  });

  it('la segunda OI se aprueba sin pedir grupo', async () => {
    await entorno.llamar('pm', 'post', `/ordenes-internas/${oiActivo}/enviar`, {
      control_gestion_id: USUARIOS.controlGestion,
    });
    const respuesta = await entorno.llamar(
      'controlGestion',
      'post',
      `/ordenes-internas/${oiActivo}/aprobar`,
      { numero_oi: 'OI-0002' },
    );
    expect(respuesta.status).toBe(201);
  });

  it('consulta las OI del proyecto', async () => {
    const respuesta = await entorno.llamar(
      'pm',
      'get',
      `/ordenes-internas/proyecto/${proyectoId}`,
    );
    expect(respuesta.status).toBe(200);
    expect(respuesta.body.ordenes_internas.length).toBe(2);
    expect(
      (
        await entorno.llamar(
          'controlGestion',
          'get',
          `/ordenes-internas/${oiActivo}`,
        )
      ).status,
    ).toBe(200);
  });

  it('no se puede cerrar una OI antes de solicitar el cierre del grupo', async () => {
    expect(
      (
        await entorno.llamar(
          'controlGestion',
          'post',
          `/ordenes-internas/${oiGasto}/cerrar`,
        )
      ).status,
    ).toBe(400);
  });

  it('el PM solicita el cierre y Control Gestión cierra cada OI', async () => {
    const solicitar = await entorno.llamar(
      'pm',
      'post',
      `/ordenes-internas/grupo/${proyectoId}/solicitar-cierre`,
      { observaciones: 'cerrar' },
    );
    expect(solicitar.status).toBe(201);
    // ya no se pueden crear OI nuevas
    expect(
      (await entorno.llamar('pm', 'post', '/ordenes-internas', oi())).status,
    ).toBe(400);
    expect(
      (
        await entorno.llamar(
          'controlGestion',
          'post',
          `/ordenes-internas/${oiGasto}/cerrar`,
        )
      ).status,
    ).toBe(201);
    expect(
      (
        await entorno.llamar(
          'controlGestion',
          'post',
          `/ordenes-internas/${oiActivo}/cerrar`,
        )
      ).status,
    ).toBe(201);
    const grupo = await entorno.llamar(
      'pm',
      'get',
      `/ordenes-internas/proyecto/${proyectoId}`,
    );
    expect(grupo.body.estado).toBe('CERRADO');
  });

  it('el PM cancela una OI en borrador de otro proyecto', async () => {
    const otro = await crearProyectoConSiAprobada(entorno);
    const creada = await entorno.llamar(
      'pm',
      'post',
      '/ordenes-internas',
      oi({ proyecto_id: otro.proyectoId }),
    );
    const id = creada.body.orden_interna_id;
    expect(
      (await entorno.llamar('pm2', 'post', `/ordenes-internas/${id}/cancelar`))
        .status,
    ).toBe(403);
    expect(
      (await entorno.llamar('pm', 'post', `/ordenes-internas/${id}/cancelar`))
        .status,
    ).toBe(201);
  });
});
