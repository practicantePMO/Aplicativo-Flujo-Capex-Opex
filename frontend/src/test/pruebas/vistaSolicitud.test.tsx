import { describe, it, expect, vi } from 'vitest';
import { screen, within, waitFor } from '@testing-library/react';
import { VistaSolicitudInversion } from '../../features/solicitud-inversion/components/VistaSolicitudInversion';
import { peticiones, responder, type Rol } from '../apiFalsa';
import { cerrarAviso, renderizarCon, type UsuarioPrueba } from '../renderizar';

function abrir(rol: Rol, procesoId: number) {
  const onVolver = vi.fn();
  const onEditar = vi.fn();
  const resultado = renderizarCon(rol, <VistaSolicitudInversion procesoId={procesoId} onVolver={onVolver} onEditar={onEditar} />);
  return { ...resultado, onVolver, onEditar };
}

function dialogo() {
  return within(screen.getByRole('dialog'));
}

async function cerrarDialogo() {
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
}

async function escribirRazon(usuario: UsuarioPrueba, etiqueta: RegExp, texto: string) {
  await usuario.type(dialogo().getByLabelText(etiqueta), texto);
}

const huboPost = (sufijo: string) => peticiones.some((p) => p.metodo === 'POST' && p.url.endsWith(sufijo));

describe('Vista de la Solicitud de Inversión', () => {
  it('el PM edita y envía su borrador', async () => {
    const { usuario, onVolver, onEditar } = abrir('pm', 14);
    await usuario.click(await screen.findByRole('button', { name: 'Editar Solicitud' }));
    expect(onEditar).toHaveBeenCalled();
    expect(await screen.findByText(/Editar Solicitud —/)).toBeInTheDocument();
    await usuario.click(screen.getByRole('button', { name: 'Cancelar y volver' }));
    await usuario.click(await screen.findByRole('button', { name: 'Editar Solicitud' }));
    await usuario.click(await screen.findByRole('button', { name: 'Guardar Cambios' }));
    await waitFor(() => expect(peticiones.some((p) => p.metodo === 'PUT')).toBe(true));
    await usuario.click(await screen.findByRole('button', { name: 'Enviar a Revisión' }));
    await waitFor(() => expect(huboPost('/14/enviar')).toBe(true));
    responder('POST', '/solicitud-inversion/14/enviar', 400, { message: 'Faltan datos' });
    await usuario.click(await screen.findByRole('button', { name: 'Enviar a Revisión' }));
    expect(await screen.findByText('Faltan datos')).toBeInTheDocument();
    await usuario.click(screen.getByRole('button', { name: 'Volver al proyecto' }));
    expect(onVolver).toHaveBeenCalled();
  });

  it('PMO aprueba, rechaza, cancela y edita partes interesadas', async () => {
    const { usuario } = abrir('pmo', 15);
    // Aprobar
    await usuario.click(await screen.findByRole('button', { name: 'Aprobar' }));
    await usuario.click(dialogo().getByRole('button', { name: 'Confirmar aprobación' }));
    expect(await screen.findByText('La observación es obligatoria para aprobar.')).toBeInTheDocument();
    await escribirRazon(usuario, /Observación/, 'Ok');
    responder('POST', '/solicitud-inversion/15/aprobar', 500);
    await usuario.click(dialogo().getByRole('button', { name: 'Confirmar aprobación' }));
    expect(await screen.findByText('Error al aprobar.')).toBeInTheDocument();
    await usuario.click(dialogo().getByRole('button', { name: 'Cancelar' }));
    await cerrarDialogo();

    // Rechazar
    await usuario.click(screen.getByRole('button', { name: 'Rechazar' }));
    await usuario.clear(dialogo().getByLabelText(/Razón del rechazo/));
    await usuario.click(dialogo().getByRole('button', { name: 'Confirmar rechazo' }));
    expect(await screen.findByText('La razón del rechazo es obligatoria.')).toBeInTheDocument();
    await escribirRazon(usuario, /Razón del rechazo/, 'No');
    await usuario.click(dialogo().getByRole('button', { name: 'Confirmar rechazo' }));
    await waitFor(() => expect(huboPost('/15/rechazar')).toBe(true));
    await cerrarDialogo();
    responder('POST', '/solicitud-inversion/15/rechazar', 500);
    await usuario.click(screen.getByRole('button', { name: 'Rechazar' }));
    await escribirRazon(usuario, /Razón del rechazo/, 'No');
    await usuario.click(dialogo().getByRole('button', { name: 'Confirmar rechazo' }));
    expect(await screen.findByText('Error al rechazar.')).toBeInTheDocument();
    await usuario.click(dialogo().getByRole('button', { name: 'Cancelar' }));
    await cerrarDialogo();

    // Cancelar definitivamente
    await usuario.click(screen.getByRole('button', { name: 'Cancelar Definitivamente' }));
    await usuario.clear(dialogo().getByLabelText(/Razón de la cancelación/));
    await usuario.click(dialogo().getByRole('button', { name: 'Confirmar cancelación' }));
    expect(await screen.findByText('La razón de cancelación es obligatoria.')).toBeInTheDocument();
    await escribirRazon(usuario, /Razón de la cancelación/, 'Fin');
    await usuario.click(dialogo().getByRole('button', { name: 'Confirmar cancelación' }));
    await waitFor(() => expect(huboPost('/15/cancelar')).toBe(true));
    await cerrarDialogo();
    responder('POST', '/solicitud-inversion/15/cancelar', 500);
    await usuario.click(screen.getByRole('button', { name: 'Cancelar Definitivamente' }));
    await escribirRazon(usuario, /Razón de la cancelación/, 'Fin');
    await usuario.click(dialogo().getByRole('button', { name: 'Confirmar cancelación' }));
    expect(await screen.findByText('Error al cancelar.')).toBeInTheDocument();
    await usuario.click(dialogo().getByRole('button', { name: 'Volver' }));
    await cerrarDialogo();

    // Partes interesadas
    await usuario.click(screen.getByRole('button', { name: /Editar/ }));
    await usuario.click(dialogo().getByLabelText('Selecciona las partes interesadas'));
    await usuario.click(await screen.findByRole('option', { name: /Simon/ }));
    await usuario.click(dialogo().getByRole('button', { name: 'Guardar' }));
    await waitFor(() => expect(huboPost('/15/partes-interesadas')).toBe(true));
    await cerrarDialogo();
    responder('POST', '/solicitud-inversion/15/partes-interesadas', 500);
    await usuario.click(screen.getByRole('button', { name: /Editar/ }));
    await usuario.click(dialogo().getByRole('button', { name: 'Guardar' }));
    expect(await screen.findByText('Error al actualizar partes interesadas.')).toBeInTheDocument();
    await usuario.click(dialogo().getByRole('button', { name: 'Cancelar' }));
    await cerrarDialogo();

    // Aprobación exitosa
    await usuario.click(screen.getByRole('button', { name: 'Aprobar' }));
    await escribirRazon(usuario, /Observación/, 'Bien');
    await usuario.click(dialogo().getByRole('button', { name: 'Confirmar aprobación' }));
    await waitFor(() => expect(huboPost('/15/aprobar')).toBe(true));
  });

  it('Dirección PMO elige el gerente', async () => {
    const { usuario } = abrir('director', 17);
    await usuario.click(await screen.findByRole('button', { name: 'Aprobar' }));
    await usuario.click(await screen.findByRole('button', { name: 'Confirmar envío' }));
    await cerrarAviso(usuario, 'La observación es obligatoria para aprobar.');
    await escribirRazon(usuario, /Observación/, 'Va');
    await usuario.click(dialogo().getByRole('button', { name: 'Confirmar envío' }));
    expect(await screen.findByText('Debes elegir a qué gerente enviar el proceso.')).toBeInTheDocument();
    await usuario.click(dialogo().getByLabelText(/A qué gerente/));
    await usuario.click(await screen.findByRole('option', { name: /Gabriela/ }));
    responder('POST', '/solicitud-inversion/17/aprobar', 500);
    await usuario.click(dialogo().getByRole('button', { name: 'Confirmar envío' }));
    expect(await screen.findByText('Error al aprobar.')).toBeInTheDocument();
    await usuario.click(dialogo().getByRole('button', { name: 'Cancelar' }));
    await cerrarDialogo();
    await usuario.click(screen.getByRole('button', { name: 'Aprobar' }));
    await escribirRazon(usuario, /Observación/, 'Va');
    await usuario.click(dialogo().getByLabelText(/A qué gerente/));
    await usuario.click(await screen.findByRole('option', { name: /Gabriela/ }));
    responder('POST', '/solicitud-inversion/17/aprobar', 201, {});
    await usuario.click(dialogo().getByRole('button', { name: 'Confirmar envío' }));
    await waitFor(() => expect(peticiones.filter((p) => p.url.endsWith('/17/aprobar')).length).toBe(2));
  });

  it('la gerente asignada decide si va a Presidencia', async () => {
    const { usuario } = abrir('gerencia1', 18);
    await usuario.click(await screen.findByRole('button', { name: 'Aprobar' }));
    await usuario.click(dialogo().getByRole('button', { name: 'Confirmar' }));
    expect(await screen.findByText('La observación es obligatoria para aprobar.')).toBeInTheDocument();
    await escribirRazon(usuario, /Observación/, 'Ok');
    await usuario.click(dialogo().getByLabelText(/No, finaliza aquí/));
    responder('POST', '/solicitud-inversion/18/aprobar', 500);
    await usuario.click(dialogo().getByRole('button', { name: 'Confirmar' }));
    expect(await screen.findByText('Error al aprobar.')).toBeInTheDocument();
    responder('POST', '/solicitud-inversion/18/aprobar', 201, {});
    await usuario.click(dialogo().getByRole('button', { name: 'Confirmar' }));
    await cerrarDialogo();
    expect(peticiones.filter((p) => p.url.endsWith('/18/aprobar')).at(-1)?.cuerpo).toMatchObject({ enviar_a_presidencia: false });
  });

  it('Presidencia y partes interesadas ven sus acciones; otros roles no', async () => {
    const { unmount } = abrir('presidencia', 19);
    expect(await screen.findByRole('button', { name: 'Aprobar' })).toBeInTheDocument();
    unmount();
    const segunda = abrir('interesada', 16);
    expect(await screen.findByRole('button', { name: 'Aprobar' })).toBeInTheDocument();
    segunda.unmount();
    abrir('pm', 18);
    await screen.findByText('Solicitud de Inversión');
    expect(screen.queryByRole('button', { name: 'Aprobar' })).not.toBeInTheDocument();
  });

  it('muestra error si no carga', async () => {
    responder('GET', '/solicitud-inversion/99', 404);
    abrir('pm', 99);
    expect(await screen.findByText('No se pudo cargar la solicitud.')).toBeInTheDocument();
  });
});
