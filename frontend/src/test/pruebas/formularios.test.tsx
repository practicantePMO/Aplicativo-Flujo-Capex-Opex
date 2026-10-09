import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { FormularioOrdenInterna } from '../../features/ordenes-internas/components/FormularioOrdenInterna';
import { FormularioControlCambio } from '../../features/control-cambios/components/FormularioControlCambio';
import { FormularioActaCierre } from '../../features/acta-cierre/components/FormularioActaCierre';
import { peticiones, responder } from '../apiFalsa';
import { renderizarCon, type UsuarioPrueba } from '../renderizar';

const PLANTA = '2026001';

async function elegir(usuario: UsuarioPrueba, etiqueta: RegExp | string, opcion: RegExp | string) {
  await usuario.click(screen.getByRole('combobox', { name: etiqueta }));
  await usuario.click(await screen.findByRole('option', { name: opcion }));
}

async function escribir(usuario: UsuarioPrueba, etiqueta: RegExp | string, texto: string, indice = 0) {
  const campo = screen.getAllByLabelText(etiqueta)[indice];
  await usuario.clear(campo);
  await usuario.type(campo, texto);
}

async function guardarYVerError(usuario: UsuarioPrueba, mensaje: RegExp, boton = 'Guardar') {
  await usuario.click(screen.getByRole('button', { name: boton }));
  expect(await screen.findByText(mensaje)).toBeInTheDocument();
}

describe('Formulario de Orden Interna', () => {
  it('crea una OI de activo validando los campos', async () => {
    const onGuardada = vi.fn();
    const onCancelar = vi.fn();
    const { usuario } = renderizarCon('pm', <FormularioOrdenInterna proyectoId={PLANTA} onCancelar={onCancelar} onGuardada={onGuardada} />);

    // Pregunta inicial: ¿es por Control de Cambios?
    await usuario.click(await screen.findByLabelText('Sí, es por Control de Cambios'));
    expect(screen.getByRole('button', { name: 'Continuar' })).toBeDisabled();
    await elegir(usuario, /A qué Control de Cambios/, /^#1/);
    await usuario.click(screen.getByLabelText('No'));
    await usuario.click(screen.getByRole('button', { name: 'Continuar' }));

    await guardarYVerError(usuario, /nombre descriptivo es obligatorio/);
    await escribir(usuario, 'Nombre Descriptivo *', 'Compra de equipos');
    await guardarYVerError(usuario, /presupuesto debe ser mayor a 0/);
    await escribir(usuario, 'Presupuesto *', '5000');
    await guardarYVerError(usuario, /Activo Fijo en curso es obligatorio/);
    await escribir(usuario, 'Activo Fijo en curso *', 'AF-9');
    await guardarYVerError(usuario, /Tipo de activo es obligatorio/);
    await elegir(usuario, 'Tipo de activo *', 'Inversión Reemplazo');
    await guardarYVerError(usuario, /Activo Real Productivo es obligatorio/);
    await elegir(usuario, 'Activo Real Productivo *', 'No');
    await escribir(usuario, 'Centro de Costos', 'CC1');
    await escribir(usuario, 'Oficina de Ventas', 'OV');
    await escribir(usuario, 'Línea de Marca', 'LM');
    await escribir(usuario, 'Cliente', 'Cli');
    await escribir(usuario, 'Ramo', 'R');
    await escribir(usuario, '%', '30', 0);
    await escribir(usuario, '%', '40', 1);
    await usuario.clear(screen.getAllByLabelText('%')[0]);
    await usuario.clear(screen.getAllByLabelText('%')[1]);
    await elegir(usuario, 'Moneda', 'USD');
    await escribir(usuario, 'Observaciones (opcional)', 'Nada');
    await usuario.click(screen.getByRole('button', { name: 'Guardar' }));
    await waitFor(() => expect(onGuardada).toHaveBeenCalled());
    expect(peticiones.find((p) => p.metodo === 'POST' && p.url === '/ordenes-internas')?.cuerpo).toMatchObject({
      tipo_orden: 'ACTIVO', presupuesto: 5000, presupuesto_moneda: 'USD', es_control_cambios: false,
    });

    responder('POST', '/ordenes-internas', 400, { message: 'No permitido' });
    await usuario.click(screen.getByRole('button', { name: 'Guardar' }));
    expect(await screen.findByText(/Request failed|No permitido/)).toBeInTheDocument();
    await usuario.click(screen.getAllByRole('button', { name: 'Cancelar' })[0]);
    expect(onCancelar).toHaveBeenCalled();
  });

  it('crea una OI de gasto por Control de Cambios con valores', async () => {
    const onGuardada = vi.fn();
    const { usuario } = renderizarCon('pm', <FormularioOrdenInterna proyectoId={PLANTA} prefillControlCambioId={1} onCancelar={vi.fn()} onGuardada={onGuardada} />);
    expect(await screen.findByText(/\(Control de Cambios\)/)).toBeInTheDocument();
    await escribir(usuario, 'Nombre Descriptivo *', 'Gasto');
    await elegir(usuario, 'Tipo de orden *', 'Gasto');
    await escribir(usuario, 'Presupuesto *', '10');
    await escribir(usuario, 'USD', '5', 0);
    await escribir(usuario, 'COP', '7a', 1);
    await usuario.click(screen.getByRole('button', { name: 'Guardar' }));
    await waitFor(() => expect(onGuardada).toHaveBeenCalled());
    expect(peticiones.find((p) => p.metodo === 'POST' && p.url === '/ordenes-internas')?.cuerpo).toMatchObject({
      tipo_orden: 'GASTO', control_cambio_id: 1,
      valores: [{ categoria: 'ACTIVO', usd: 5, cop: 0 }, { categoria: 'GASTO', usd: 0, cop: 7 }],
    });
  });

  it('pide elegir el Control de Cambios si no hay ninguno que requiera OI', async () => {
    responder('GET', /control-cambios\/proyecto/, 500);
    const { usuario } = renderizarCon('pm', <FormularioOrdenInterna proyectoId={PLANTA} onCancelar={vi.fn()} onGuardada={vi.fn()} />);
    await usuario.click(await screen.findByLabelText('Sí, es por Control de Cambios'));
    expect(screen.getByText(/No hay ningún Control de Cambios/)).toBeInTheDocument();
  });

  it('edita una OI existente y avisa si no carga', async () => {
    const onGuardada = vi.fn();
    const { usuario, unmount } = renderizarCon('pm', <FormularioOrdenInterna proyectoId={PLANTA} ordenInternaId={4} onCancelar={vi.fn()} onGuardada={onGuardada} />);
    expect(await screen.findByDisplayValue('OI del cambio')).toBeInTheDocument();
    await usuario.click(screen.getByRole('button', { name: 'Guardar' }));
    await waitFor(() => expect(onGuardada).toHaveBeenCalledWith(4));
    expect(peticiones.some((p) => p.metodo === 'PUT' && p.url === '/ordenes-internas/4')).toBe(true);
    unmount();

    renderizarCon('pm', <FormularioOrdenInterna proyectoId={PLANTA} ordenInternaId={1} onCancelar={vi.fn()} onGuardada={vi.fn()} />);
    expect(await screen.findByDisplayValue('Compra maquinaria')).toBeInTheDocument();
  });

  it('muestra error si la OI no se puede cargar', async () => {
    responder('GET', '/ordenes-internas/77', 404);
    renderizarCon('pm', <FormularioOrdenInterna proyectoId={PLANTA} ordenInternaId={77} onCancelar={vi.fn()} onGuardada={vi.fn()} />);
    expect(await screen.findByText('No se pudo cargar la Orden Interna.')).toBeInTheDocument();
  });

  it('exige elegir el Control de Cambios al guardar', async () => {
    const { usuario } = renderizarCon('pm', <FormularioOrdenInterna proyectoId={PLANTA} prefillControlCambioId={1} onCancelar={vi.fn()} onGuardada={vi.fn()} />);
    await screen.findByText(/\(Control de Cambios\)/);
    await escribir(usuario, 'Nombre Descriptivo *', 'X');
    await elegir(usuario, 'Tipo de orden *', 'Gasto');
    await escribir(usuario, 'Presupuesto *', '10');
    responder('POST', '/ordenes-internas', 500, {});
    await guardarYVerError(usuario, /Request failed|Error al guardar/);
  });
});

describe('Formulario de Control de Cambios', () => {
  it('crea un control de cambios de aplazamiento con anexos y partes interesadas', async () => {
    const onGuardado = vi.fn();
    const { usuario } = renderizarCon('pm', <FormularioControlCambio proyectoId={PLANTA} companiaId={1} onCancelar={vi.fn()} onGuardado={onGuardado} />);
    await screen.findByText('Descripción del Cambio');
    await usuario.click(screen.getByLabelText('Aplazamiento de año del proyecto'));
    await guardarYVerError(usuario, /año nuevo propuesto/, 'Guardar');
    await escribir(usuario, 'Año nuevo propuesto *', '2028');
    await usuario.clear(screen.getByLabelText('Año nuevo propuesto *'));
    await escribir(usuario, 'Año nuevo propuesto *', '2029');
    await usuario.click(screen.getByLabelText('Sí'));
    await usuario.click(screen.getByRole('button', { name: 'Agregar anexo' }));
    await usuario.click(screen.getByRole('button', { name: 'Agregar anexo' }));
    await escribir(usuario, 'URL / link', 'https://doc.com', 0);
    await escribir(usuario, 'Descripción (opcional)', 'Soporte', 0);
    await usuario.click(screen.getAllByRole('combobox', { name: 'Tipo' })[0]);
    await usuario.click(await screen.findByRole('option', { name: 'Plano / diseño' }));
    await usuario.click(screen.getAllByTestId('DeleteOutlineOutlinedIcon')[1]);
    for (const campo of ['Descripción del cambio', 'Antecedentes', 'Justificación', 'Impacto en el alcance', 'Impacto en el tiempo']) {
      await escribir(usuario, campo, 'Texto');
    }
    await usuario.click(screen.getByLabelText('Elige quiénes son las partes interesadas'));
    await usuario.click(await screen.findByRole('option', { name: /Sofia/ }));
    await usuario.click(screen.getByRole('button', { name: /Guardar/ }));
    await waitFor(() => expect(onGuardado).toHaveBeenCalledWith(999));
    expect(peticiones.find((p) => p.metodo === 'POST' && p.url === '/control-cambios')?.cuerpo).toMatchObject({
      tipo_control_cambio: 'APLAZAMIENTO', anio_nuevo_propuesto: 2029, requiere_orden_interna: true,
      anexos: [{ tipo: 'PLANO', url: 'https://doc.com', descripcion: 'Soporte' }],
    });
    await usuario.click(screen.getByLabelText('General'));
    responder('POST', '/control-cambios', 400, { message: 'x' });
    await guardarYVerError(usuario, /Request failed/, 'Guardar');
  });

  it('edita un control de cambios existente', async () => {
    const onGuardado = vi.fn();
    const { usuario } = renderizarCon('pm', <FormularioControlCambio proyectoId={PLANTA} companiaId={1} procesoId={7} onCancelar={vi.fn()} onGuardado={onGuardado} />);
    expect(await screen.findByDisplayValue('Aplazar')).toBeInTheDocument();
    await usuario.click(screen.getByRole('button', { name: /Guardar/ }));
    await waitFor(() => expect(onGuardado).toHaveBeenCalledWith(7));
    expect(peticiones.some((p) => p.metodo === 'PUT' && p.url === '/control-cambios/borrador/7')).toBe(true);
  });

  it('avisa si no puede cargar el control de cambios', async () => {
    responder('GET', '/control-cambios/70', 404);
    responder('GET', /partes-interesadas/, 500);
    renderizarCon('pm', <FormularioControlCambio proyectoId={PLANTA} companiaId={1} procesoId={70} onCancelar={vi.fn()} onGuardado={vi.fn()} />);
    expect(await screen.findByText('No se pudo cargar el Control de Cambios.')).toBeInTheDocument();
  });
});

describe('Formulario de Acta de Cierre', () => {
  it('crea un acta con los datos de la SI y de las OI', async () => {
    const onGuardado = vi.fn();
    const onCancelar = vi.fn();
    const { usuario } = renderizarCon('pm', <FormularioActaCierre proyectoId={PLANTA} companiaId={1} onCancelar={onCancelar} onGuardado={onGuardado} />);
    await screen.findByText('Flujo de Caja — Planeado vs. Real');
    await guardarYVerError(usuario, /Control Gestión revisará/);
    await usuario.click(screen.getByLabelText(/Quién de Control Gestión/));
    await usuario.click(await screen.findByRole('option', { name: /Camila/ }));
    await guardarYVerError(usuario, /al menos una parte interesada/);
    await usuario.click(screen.getByLabelText('Elige quiénes son las partes interesadas'));
    await usuario.click(await screen.findByRole('option', { name: /Sofia/ }));
    await usuario.click(screen.getByLabelText(/Cancelación \(el proyecto/));
    await usuario.click(screen.getByLabelText(/Culminación \(el proyecto/));
    await escribir(usuario, 'Presentación de Puertas 5 (link)', 'https://p5');
    await escribir(usuario, 'Entregable Real', 'Real');
    await escribir(usuario, 'Real USD', '1', 0);
    await escribir(usuario, 'Real COP', '2', 0);
    await escribir(usuario, 'Real USD', '3', 1);
    await escribir(usuario, 'Real COP', '4', 1);
    await escribir(usuario, 'Explicación de sobre/sub-ejecución', 'Ok');
    for (const campo of screen.getAllByRole('spinbutton').filter((c) => !c.getAttribute('id')?.length || !(c as HTMLInputElement).value)) {
      await usuario.type(campo, '9');
    }
    const textos = screen.getAllByRole('textbox').filter((c) => !(c as HTMLInputElement).value && !c.getAttribute('aria-autocomplete'));
    for (const campo of textos.slice(0, 2)) await usuario.type(campo, 'Resultado');
    await usuario.click(screen.getByRole('button', { name: 'Agregar entregable' }));
    await usuario.click(screen.getByRole('button', { name: 'Agregar entregable' }));
    await escribir(usuario, 'Equipo / Sistema *', 'Horno', 0);
    await escribir(usuario, 'Código activo fijo en producción', 'P1', 0);
    await escribir(usuario, 'Código activo fijo en montaje', 'M1', 0);
    await escribir(usuario, 'Unidad de vida útil', 'Años', 0);
    await escribir(usuario, 'Vida útil', '10', 0);
    await usuario.clear(screen.getAllByLabelText('Vida útil')[0]);
    await escribir(usuario, 'Observaciones', 'Obs', 0);
    await escribir(usuario, 'Anexo (link)', 'https://x', 0);
    await usuario.click(screen.getAllByTestId('DeleteOutlineOutlinedIcon')[1]);
    await escribir(usuario, 'Otros entregables', 'Otros');
    await usuario.click(screen.getByRole('button', { name: 'Guardar' }));
    await waitFor(() => expect(onGuardado).toHaveBeenCalled());
    expect(peticiones.find((p) => p.metodo === 'POST' && p.url === '/actas-cierre')?.cuerpo).toMatchObject({
      tipo_cierre: 'CULMINACION', presentacion_p5_link: 'https://p5', entregables: [{ equipo_sistema: 'Horno' }],
    });

    responder('POST', '/actas-cierre', 400, {});
    await guardarYVerError(usuario, /Request failed|Error al guardar/);
    await usuario.click(screen.getAllByRole('button', { name: 'Cancelar' })[0]);
    expect(onCancelar).toHaveBeenCalled();
  });

  it('edita un acta existente', async () => {
    const onGuardado = vi.fn();
    const { usuario } = renderizarCon('pm', <FormularioActaCierre proyectoId="2026002" companiaId={1} procesoId={11} onCancelar={vi.fn()} onGuardado={onGuardado} />);
    expect(await screen.findByDisplayValue('https://p5.com')).toBeInTheDocument();
    await usuario.click(screen.getByRole('button', { name: 'Guardar' }));
    await waitFor(() => expect(onGuardado).toHaveBeenCalledWith(11));
    expect(peticiones.some((p) => p.metodo === 'PUT' && p.url === '/actas-cierre/borrador/11')).toBe(true);
  });

  it('muestra los mensajes cuando no hay datos y cuando falla la carga', async () => {
    const { unmount } = renderizarCon('pm', <FormularioActaCierre proyectoId="2026012" companiaId={3} onCancelar={vi.fn()} onGuardado={vi.fn()} />);
    expect(await screen.findByText(/no registró flujo de caja/)).toBeInTheDocument();
    expect(screen.getByText(/no registró metas/)).toBeInTheDocument();
    expect(screen.getByText(/no tiene Órdenes Internas/)).toBeInTheDocument();
    unmount();
    responder('GET', /usuarios\/por-rol/, 500);
    renderizarCon('pm', <FormularioActaCierre proyectoId={PLANTA} companiaId={1} onCancelar={vi.fn()} onGuardado={vi.fn()} />);
    expect(await screen.findByText(/No se pudieron cargar los datos/)).toBeInTheDocument();
  });
});
