import { describe, it, expect, vi } from 'vitest';
import { screen, within, waitFor } from '@testing-library/react';
import { FormularioSolicitudInversion } from '../../features/solicitud-inversion/components/FormularioSolicitudInversion';
import type { Proyecto } from '../../features/proyectos/types/proyecto.types';
import type { SolicitudInversionDetalle } from '../../features/solicitud-inversion/types/solicitud.types';
import { datoGrabado, peticiones, responder } from '../apiFalsa';
import { renderizarCon, type UsuarioPrueba } from '../renderizar';

const proyectos = datoGrabado<Proyecto[]>('admin', 'GET /proyectos');
const sinProcesos = proyectos.find((p) => p.nombre === 'Sin procesos') as Proyecto;
const plantaNueva = proyectos.find((p) => p.nombre === 'Planta nueva') as Proyecto;

async function elegir(usuario: UsuarioPrueba, etiqueta: RegExp | string, opcion: RegExp | string) {
  await usuario.click(screen.getByRole('combobox', { name: etiqueta }));
  await usuario.click(await screen.findByRole('option', { name: opcion }));
}

async function escribir(usuario: UsuarioPrueba, etiqueta: RegExp | string, texto: string) {
  const campo = screen.getByLabelText(etiqueta);
  await usuario.clear(campo);
  await usuario.type(campo, texto);
}

async function guardarYVerError(usuario: UsuarioPrueba, mensaje: RegExp) {
  await usuario.click(screen.getByRole('button', { name: 'Guardar Cambios' }));
  expect(await screen.findByText(mensaje).catch(() => { throw new Error(screen.queryAllByRole('alert').map((a) => a.textContent).join(' | ')); })).toBeInTheDocument();
}

describe('Formulario de Solicitud de Inversión', () => {
  it('valida y crea una solicitud nueva', async () => {
    const onCreada = vi.fn();
    const onCancelar = vi.fn();
    const { usuario } = renderizarCon(
      'pm',
      <FormularioSolicitudInversion proyecto={sinProcesos} onCancelar={onCancelar} onCreada={onCreada} />,
    );
    expect(await screen.findByText(/Nueva Solicitud de Inversión/)).toBeInTheDocument();

    await guardarYVerError(usuario, /al menos una clasificación/);

    // Clasificación tradicional y nueva
    await usuario.click(screen.getByLabelText(/Tradicional \(Grupo/));
    await guardarYVerError(usuario, /Grupo, Programa y Subprograma/);
    await elegir(usuario, /Grupo/, 'Fortalecer');
    await elegir(usuario, /Programa/, /^Sostenimiento de negocio/);
    await elegir(usuario, /Subprograma/, /Actualización por Obsolescencia/);
    await elegir(usuario, /Programa/, /^Productividad/);
    await elegir(usuario, /Subprograma/, /^Productividad/);
    await usuario.click(screen.getByLabelText(/Nueva Clasificación/));
    await guardarYVerError(usuario, /seleccionar una Categoría/);
    await elegir(usuario, /Categoría/, 'Sostenimiento y Continuidad');

    // Entregable y evaluación financiera (obligatoria por el subprograma)
    await guardarYVerError(usuario, /entregable planeado/);
    await escribir(usuario, /Entregable Planeado/, 'Planta nueva');
    await guardarYVerError(usuario, /TIR, VPN y Payback/);
    await escribir(usuario, /TIR/, '12');
    await escribir(usuario, /VPN/, '1000');
    await escribir(usuario, /Payback/, '24');

    // Metas
    await guardarYVerError(usuario, /al menos una meta/);
    await usuario.click(screen.getByRole('button', { name: 'Agregar meta' }));
    expect(screen.getAllByLabelText('Compromiso')).toHaveLength(2);
    const borrarMeta = screen.getAllByTestId('DeleteIcon');
    await usuario.click(borrarMeta[borrarMeta.length - 1]);
    await escribir(usuario, 'Compromiso', 'Producir más');
    await escribir(usuario, 'Fecha inicio', '2026-03-01');
    await escribir(usuario, 'Indicador', 'Toneladas');

    // TRM y flujo de caja
    await guardarYVerError(usuario, /Debes ingresar la TRM/);
    await escribir(usuario, /TRM/, '4000');
    await guardarYVerError(usuario, /Marca al menos un mes/);
    expect(screen.getByText(/Elige al menos un mes/)).toBeInTheDocument();
    await usuario.click(screen.getByRole('button', { name: 'Agregar Año' }));
    await usuario.click(screen.getAllByLabelText('Eliminar año')[1]);
    await usuario.click(screen.getByText('Selecciona meses...'));
    const listaMeses = await screen.findByRole('listbox');
    await usuario.click(within(listaMeses).getByText('Enero'));
    await usuario.click(within(listaMeses).getByText('Febrero'));
    await usuario.click(within(listaMeses).getByText('Marzo'));
    await usuario.click(within(listaMeses).getByText('Marzo'));
    await usuario.keyboard('{Escape}');
    await guardarYVerError(usuario, /Falta ingresar el valor de CAPEX/);

    // Tipos del año y montos
    await usuario.click(screen.getByLabelText('+ GCAPEX'));
    await usuario.click(screen.getByLabelText('+ GCAPEX'));
    await usuario.click(screen.getByLabelText('OPEX'));
    await usuario.click(screen.getByLabelText('CAPEX'));
    await usuario.click(screen.getByLabelText('+ GCAPEX'));
    let montos = screen.getAllByPlaceholderText('0');
    expect(montos).toHaveLength(4);
    await usuario.type(montos[0], '100');
    await usuario.type(montos[1], '50');
    await usuario.type(montos[2], '1a5');
    await usuario.click(screen.getAllByText('USD')[0]);
    await usuario.click(screen.getByLabelText('¿GCAPEX aplica en Feb?'));
    for (const campo of screen.getAllByPlaceholderText('0')) {
      if (!(campo as HTMLInputElement).value) await usuario.type(campo, '7');
    }
    await guardarYVerError(usuario, /parte interesada/);
    await usuario.click(screen.getByLabelText('¿GCAPEX aplica en Feb?'));
    montos = screen.getAllByPlaceholderText('0');
    await usuario.clear(montos[3]);
    await usuario.type(montos[3], '30');

    // Partes interesadas y documentos
    await usuario.click(screen.getByLabelText('Seleccionar partes interesadas'));
    await usuario.click(await screen.findByRole('option', { name: /Sofia/ }));
    await guardarYVerError(usuario, /3 links/);
    await escribir(usuario, 'Link Acta de Aprobación', 'https://a.com');
    await escribir(usuario, 'Link Plan de Proyecto', 'https://b.com');
    await escribir(usuario, 'Link Presentación Puerta 3', 'https://c.com');

    await usuario.click(screen.getByRole('button', { name: 'Guardar Cambios' }));
    await waitFor(() => expect(onCreada).toHaveBeenCalledWith(999));
    const envio = peticiones.find((p) => p.metodo === 'POST' && p.url === '/solicitud-inversion');
    expect(envio?.cuerpo).toMatchObject({ proyecto_id: sinProcesos.id, partes_interesadas_ids: [7], trm: 4000 });

    // Quitar el mes de marzo ya no aplica; se quita febrero de la lista
    await usuario.click(screen.getAllByText('Ene')[0]);
    await usuario.click(within(await screen.findByRole('listbox')).getByText('Febrero'));
    await usuario.keyboard('{Escape}');

    responder('POST', '/solicitud-inversion', 400, { message: 'Error del backend' });
    await usuario.click(screen.getByRole('button', { name: 'Guardar Cambios' }));
    expect(await screen.findByText(/Request failed|Error del backend/)).toBeInTheDocument();

    await usuario.click(screen.getByRole('button', { name: 'Cancelar y volver' }));
    expect(onCancelar).toHaveBeenCalled();
  });

  it('edita una solicitud existente sin evaluación financiera', async () => {
    const existente = datoGrabado<SolicitudInversionDetalle>('admin', 'GET /solicitud-inversion/1');
    const onCreada = vi.fn();
    const { usuario } = renderizarCon(
      'admin',
      <FormularioSolicitudInversion proyecto={plantaNueva} solicitudExistente={existente} onCancelar={vi.fn()} onCreada={onCreada} />,
    );
    expect(await screen.findByText(/Editar Solicitud/)).toBeInTheDocument();
    expect(screen.getByText('Año 2026')).toBeInTheDocument();
    expect(screen.getByText('Año 2027')).toBeInTheDocument();
    await usuario.click(screen.getByLabelText(/Nueva Clasificación/));
    await usuario.click(screen.getByLabelText(/Tradicional \(Grupo/));
    await usuario.click(screen.getByLabelText(/Tradicional \(Grupo/));
    await elegir(usuario, /Grupo/, 'Fortalecer');
    await elegir(usuario, /Programa/, /^Sostenimiento de negocio/);
    await elegir(usuario, /Subprograma/, /Actualización por Obsolescencia/);
    const evaluacion = screen.getByLabelText('¿Tiene evaluación financiera?');
    if ((evaluacion as HTMLInputElement).checked) await usuario.click(evaluacion);
    await guardarYVerError(usuario, /justificación/);
    await escribir(usuario, /Justificación/, 'No aplica');
    await usuario.click(screen.getByText('Año 2026'));
    await usuario.click(screen.getAllByLabelText('Eliminar año')[0]);
    await usuario.click(screen.getByRole('button', { name: 'Guardar Cambios' }));
    await waitFor(() => expect(onCreada).toHaveBeenCalledWith(existente.id));
    expect(peticiones.some((p) => p.metodo === 'PUT' && p.url === `/solicitud-inversion/borrador/${existente.id}`)).toBe(true);
  });

  it('muestra el formulario aunque fallen los catálogos', async () => {
    responder('GET', '/catalogos/jerarquia', 500);
    responder('GET', '/solicitud-inversion/categorias', 500);
    responder('GET', /partes-interesadas/, 500);
    renderizarCon('pm', <FormularioSolicitudInversion proyecto={{ ...sinProcesos, companias: undefined }} onCancelar={vi.fn()} onCreada={vi.fn()} />);
    expect(await screen.findByText(/Nueva Solicitud de Inversión/)).toBeInTheDocument();
  });
});
