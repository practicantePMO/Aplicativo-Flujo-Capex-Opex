import { describe, it, expect, vi } from 'vitest';
import { screen, within, waitFor } from '@testing-library/react';
import { DetalleControlCambio } from '../../features/control-cambios/components/DetalleControlCambio';
import type { ControlCambioDetalle } from '../../features/control-cambios/types/controlCambio.types';
import { datoGrabado, peticiones, responder, type Rol } from '../apiFalsa';
import { cerrarAviso, renderizarCon } from '../renderizar';

function abrir(rol: Rol, procesoId: number) {
  const props = { onCambio: vi.fn(), onEditar: vi.fn(), onCrearOi: vi.fn(), onVerOrdenInterna: vi.fn() };
  const resultado = renderizarCon(rol, <DetalleControlCambio procesoId={procesoId} companiaId={1} {...props} />);
  return { ...resultado, ...props };
}

// Detalle del CC 7 (Pendiente PMO) movido a otra etapa, con asignaciones pendientes.
function ccEnEtapa(estado: string) {
  const detalle = structuredClone(datoGrabado<ControlCambioDetalle>('admin', 'GET /control-cambios/7'));
  detalle.procesos.estado_actual = estado;
  detalle.procesos.asignaciones_proceso = [
    { id: 90, etapa: 'VERIFICACION_PARTES_INTERESADAS', estado_asignacion: 'PENDIENTE', usuarios: { id: 7, nombre: 'Sofia Interesada' } },
    { id: 91, etapa: 'GERENCIA', estado_asignacion: 'PENDIENTE', usuarios: { id: 11, nombre: 'Gabriela' } },
  ] as ControlCambioDetalle['procesos']['asignaciones_proceso'];
  detalle.procesos.historico_aprobaciones = [];
  responder('GET', '/control-cambios/7', 200, detalle);
}

const dialogo = () => within(screen.getByRole('dialog'));
const cerrarDialogo = () => waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
const aprobaciones = () => peticiones.filter((p) => p.url === '/control-cambios/7/aprobar');

describe('Detalle de Control de Cambios', () => {
  it('el PM edita y envía su borrador', async () => {
    const { usuario, onEditar, onCambio } = abrir('pm', 8);
    await usuario.click(await screen.findByRole('button', { name: 'Editar' }));
    expect(onEditar).toHaveBeenCalled();
    await usuario.click(screen.getByRole('button', { name: 'Enviar a revisión' }));
    await waitFor(() => expect(onCambio).toHaveBeenCalled());
    responder('POST', '/control-cambios/8/enviar', 500);
    await usuario.click(screen.getByRole('button', { name: 'Enviar a revisión' }));
    expect(await screen.findByText('Error al enviar a revisión.')).toBeInTheDocument();
  });

  it('PMO aprueba y rechaza', async () => {
    const { usuario } = abrir('pmo', 7);
    await usuario.click(await screen.findByRole('button', { name: 'Aprobar' }));
    await usuario.click(dialogo().getByRole('button', { name: 'Aprobar' }));
    await cerrarAviso(usuario, 'La observación es obligatoria para aprobar.');
    await usuario.type(dialogo().getByLabelText(/Observación/), 'Ok');
    responder('POST', '/control-cambios/7/aprobar', 500);
    await usuario.click(dialogo().getByRole('button', { name: 'Aprobar' }));
    await cerrarAviso(usuario, 'Error al aprobar.');
    responder('POST', '/control-cambios/7/aprobar', 201, {});
    await usuario.click(dialogo().getByRole('button', { name: 'Aprobar' }));
    await cerrarDialogo();
    await usuario.click(screen.getByRole('button', { name: 'Aprobar' }));
    await usuario.click(dialogo().getByRole('button', { name: 'Cancelar' }));
    await cerrarDialogo();

    await usuario.click(screen.getByRole('button', { name: 'Rechazar' }));
    await usuario.click(dialogo().getByRole('button', { name: 'Rechazar' }));
    await cerrarAviso(usuario, 'La razón del rechazo es obligatoria.');
    await usuario.type(dialogo().getByLabelText(/Razón del rechazo/), 'No');
    responder('POST', '/control-cambios/7/rechazar', 500);
    await usuario.click(dialogo().getByRole('button', { name: 'Rechazar' }));
    await cerrarAviso(usuario, 'Error al rechazar.');
    responder('POST', '/control-cambios/7/rechazar', 201, {});
    await usuario.click(dialogo().getByRole('button', { name: 'Rechazar' }));
    await cerrarDialogo();
    await usuario.click(screen.getByRole('button', { name: 'Rechazar' }));
    await usuario.click(dialogo().getByRole('button', { name: 'Cancelar' }));
    await cerrarDialogo();
  });

  it('Dirección PMO elige gerente', async () => {
    ccEnEtapa('DIRECCION_PMO');
    const { usuario } = abrir('director', 7);
    await usuario.click(await screen.findByRole('button', { name: 'Aprobar' }));
    await usuario.click(await screen.findByRole('button', { name: 'Aprobar y enviar' }));
    await cerrarAviso(usuario, 'La observación es obligatoria para aprobar.');
    await usuario.type(dialogo().getByLabelText(/Observación/), 'Va');
    await usuario.click(dialogo().getByRole('button', { name: 'Aprobar y enviar' }));
    await cerrarAviso(usuario, 'Debes elegir a qué gerente enviar el proceso.');
    await usuario.click(dialogo().getByLabelText(/A qué gerente/));
    await usuario.click(await screen.findByRole('option', { name: /Gabriela/ }));
    responder('POST', '/control-cambios/7/aprobar', 500);
    await usuario.click(dialogo().getByRole('button', { name: 'Aprobar y enviar' }));
    await cerrarAviso(usuario, 'Error al aprobar.');
    responder('POST', '/control-cambios/7/aprobar', 201, {});
    await usuario.click(dialogo().getByRole('button', { name: 'Aprobar y enviar' }));
    await cerrarDialogo();
    expect(aprobaciones().at(-1)?.cuerpo).toMatchObject({ gerente_id: 11 });
    await usuario.click(screen.getByRole('button', { name: 'Aprobar' }));
    await usuario.click(dialogo().getByRole('button', { name: 'Cancelar' }));
    await cerrarDialogo();
  });

  it('la gerente asignada decide si continúa a Presidencia', async () => {
    ccEnEtapa('GERENCIA');
    const { usuario } = abrir('gerencia1', 7);
    await usuario.click(await screen.findByRole('button', { name: 'Aprobar' }));
    await usuario.click(dialogo().getByRole('button', { name: 'Aprobar' }));
    await cerrarAviso(usuario, 'La observación es obligatoria para aprobar.');
    await usuario.type(dialogo().getByLabelText(/Observación/), 'Ok');
    await usuario.click(dialogo().getByLabelText('Finaliza aquí'));
    responder('POST', '/control-cambios/7/aprobar', 500);
    await usuario.click(dialogo().getByRole('button', { name: 'Aprobar' }));
    await cerrarAviso(usuario, 'Error al aprobar.');
    responder('POST', '/control-cambios/7/aprobar', 201, {});
    await usuario.click(dialogo().getByRole('button', { name: 'Aprobar' }));
    await cerrarDialogo();
    expect(aprobaciones().at(-1)?.cuerpo).toMatchObject({ enviar_a_presidencia: false });
    await usuario.click(screen.getByRole('button', { name: 'Aprobar' }));
    await usuario.click(dialogo().getByRole('button', { name: 'Cancelar' }));
    await cerrarDialogo();
  });

  it('la parte interesada asignada puede aprobar', async () => {
    ccEnEtapa('VERIFICACION_PARTES_INTERESADAS');
    abrir('interesada', 7);
    expect(await screen.findByRole('button', { name: 'Aprobar' })).toBeInTheDocument();
    expect(screen.getByText('Sin movimientos todavía.')).toBeInTheDocument();
  });

  it('un CC aprobado permite ver y crear Órdenes Internas', async () => {
    const { usuario, onCrearOi, onVerOrdenInterna } = abrir('pm', 5);
    await usuario.click(await screen.findByLabelText('Elegir cuál Orden Interna ver'));
    await usuario.click(await screen.findByRole('option', { name: /OI del cambio/ }));
    await usuario.click(screen.getByRole('button', { name: 'Ver Orden Interna' }));
    expect(onVerOrdenInterna).toHaveBeenCalledWith(4);
    await usuario.click(screen.getByRole('button', { name: /Crear Orden Interna para este cambio/ }));
    expect(onCrearOi).toHaveBeenCalledWith(1);
  });

  it('muestra error si no carga', async () => {
    responder('GET', '/control-cambios/50', 500);
    abrir('pm', 50);
    expect(await screen.findByText('No se pudo cargar el Control de Cambios.')).toBeInTheDocument();
  });
});
