import { describe, it, expect, vi } from 'vitest';
import { screen, within, waitFor } from '@testing-library/react';
import { DetalleOrdenInterna } from '../../features/ordenes-internas/components/DetalleOrdenInterna';
import type { GrupoOrdenesInternas, OrdenInternaDetalle, OrdenInternaResumen } from '../../features/ordenes-internas/types/ordenInterna.types';
import { datoGrabado, peticiones, responder, type Rol } from '../apiFalsa';
import { cerrarAviso, renderizarCon } from '../renderizar';

const grupo = datoGrabado<GrupoOrdenesInternas>('pm', 'GET /ordenes-internas/proyecto/2026001');
const resumen = (id: number) => grupo.ordenes_internas.find((o) => o.id === id) as OrdenInternaResumen;

function abrir(rol: Rol, id: number, grupoEstado: 'ABIERTO' | 'SOLICITADO_CIERRE' | 'CERRADO' = 'ABIERTO') {
  const props = { onCambio: vi.fn(), onEditar: vi.fn(), onVerControlCambio: vi.fn() };
  const resultado = renderizarCon(rol, <DetalleOrdenInterna resumen={resumen(id)} companiaId={1} grupoEstado={grupoEstado} {...props} />);
  return { ...resultado, ...props };
}

const dialogo = () => within(screen.getByRole('dialog'));
const cerrarDialogo = () => waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
const huboPost = (url: string) => peticiones.some((p) => p.metodo === 'POST' && p.url === url);

describe('Detalle de Orden Interna', () => {
  it('el PM edita, cancela y envía su borrador', async () => {
    const { usuario, onEditar, onCambio } = abrir('pm', 3);
    await usuario.click(await screen.findByRole('button', { name: 'Editar' }));
    expect(onEditar).toHaveBeenCalled();

    await usuario.click(screen.getByRole('button', { name: 'Cancelar' }));
    await usuario.click(await screen.findByRole('button', { name: 'Cancelar' }));
    await cerrarDialogo();
    await usuario.click(screen.getByRole('button', { name: 'Cancelar' }));
    await usuario.click(await screen.findByRole('button', { name: 'Aceptar' }));
    await waitFor(() => expect(huboPost('/ordenes-internas/3/cancelar')).toBe(true));
    expect(onCambio).toHaveBeenCalled();
    await cerrarDialogo();
    responder('POST', '/ordenes-internas/3/cancelar', 500);
    await usuario.click(screen.getByRole('button', { name: 'Cancelar' }));
    await usuario.click(await screen.findByRole('button', { name: 'Aceptar' }));
    await cerrarAviso(usuario, 'Error al cancelar.');

    await usuario.click(screen.getByRole('button', { name: 'Enviar a Control Gestión' }));
    expect(dialogo().getByRole('button', { name: 'Enviar' })).toBeDisabled();
    await usuario.click(dialogo().getByLabelText(/A quién de Control Gestión/));
    await usuario.click(await screen.findByRole('option', { name: /Camila/ }));
    responder('POST', '/ordenes-internas/3/enviar', 500);
    await usuario.click(dialogo().getByRole('button', { name: 'Enviar' }));
    expect(await screen.findByText('Error al enviar.')).toBeInTheDocument();
    responder('POST', '/ordenes-internas/3/enviar', 201, {});
    await usuario.click(dialogo().getByRole('button', { name: 'Enviar' }));
    await cerrarDialogo();
    expect(peticiones.filter((p) => p.url === '/ordenes-internas/3/enviar').at(-1)?.cuerpo).toEqual({ control_gestion_id: 17 });
  });

  it('avisa cuando no hay Control Gestión o no carga la lista', async () => {
    responder('GET', /usuarios\/por-rol/, 200, []);
    const { usuario, unmount } = abrir('pm', 3);
    await usuario.click(await screen.findByRole('button', { name: 'Enviar a Control Gestión' }));
    expect(await screen.findByText(/No hay ningún usuario con el rol Control Gestión/)).toBeInTheDocument();
    unmount();
    responder('GET', /usuarios\/por-rol/, 500);
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const segundo = abrir('pm', 3);
    await segundo.usuario.click(await screen.findByRole('button', { name: 'Enviar a Control Gestión' }));
    expect(await screen.findByText(/No se pudo cargar la lista de Control Gestión/)).toBeInTheDocument();
  });

  it('Control Gestión aprueba (primera OI del grupo) y rechaza', async () => {
    const detalle = structuredClone(datoGrabado<OrdenInternaDetalle>('controlGestion', 'GET /ordenes-internas/2'));
    detalle.grupos_ordenes_internas.nombre = null as unknown as string;
    responder('GET', '/ordenes-internas/2', 200, detalle);
    const { usuario } = abrir('controlGestion', 2);

    await usuario.click(await screen.findByRole('button', { name: 'Aprobar' }));
    await usuario.click(dialogo().getByRole('button', { name: 'Aprobar' }));
    await cerrarAviso(usuario, 'El número de Orden Interna es obligatorio.');
    await usuario.type(dialogo().getByLabelText('Número de Orden Interna *'), 'OI-2');
    await usuario.click(dialogo().getByRole('button', { name: 'Aprobar' }));
    await cerrarAviso(usuario, 'El grupo de órdenes internas es obligatorio.');
    await usuario.type(dialogo().getByLabelText('Grupo de Órdenes Internas *'), 'Grupo');
    await usuario.type(dialogo().getByLabelText('Observaciones (opcional)'), 'Bien');
    responder('POST', '/ordenes-internas/2/aprobar', 500);
    await usuario.click(dialogo().getByRole('button', { name: 'Aprobar' }));
    await cerrarAviso(usuario, 'Error al aprobar.');
    responder('POST', '/ordenes-internas/2/aprobar', 201, {});
    await usuario.click(dialogo().getByRole('button', { name: 'Aprobar' }));
    await cerrarDialogo();
    expect(peticiones.filter((p) => p.url === '/ordenes-internas/2/aprobar').at(-1)?.cuerpo).toMatchObject({ numero_oi: 'OI-2', grupo_texto: 'Grupo' });

    await usuario.click(screen.getByRole('button', { name: 'Rechazar' }));
    await usuario.click(dialogo().getByRole('button', { name: 'Rechazar' }));
    await cerrarAviso(usuario, 'La observación del rechazo es obligatoria.');
    await usuario.type(dialogo().getByLabelText(/Observación del rechazo/), 'Mal');
    responder('POST', '/ordenes-internas/2/rechazar', 500);
    await usuario.click(dialogo().getByRole('button', { name: 'Rechazar' }));
    await cerrarAviso(usuario, 'Error al rechazar.');
    responder('POST', '/ordenes-internas/2/rechazar', 201, {});
    await usuario.click(dialogo().getByRole('button', { name: 'Rechazar' }));
    await cerrarDialogo();
    await usuario.click(screen.getByRole('button', { name: 'Aprobar' }));
    await usuario.click(dialogo().getByRole('button', { name: 'Cancelar' }));
    await cerrarDialogo();
    await usuario.click(screen.getByRole('button', { name: 'Rechazar' }));
    await usuario.click(dialogo().getByRole('button', { name: 'Cancelar' }));
    await cerrarDialogo();
  });

  it('Control Gestión cierra una OI aprobada cuando se solicitó el cierre', async () => {
    const { usuario, onCambio } = abrir('controlGestion', 1, 'SOLICITADO_CIERRE');
    await usuario.click(await screen.findByRole('button', { name: 'Cerrar Orden' }));
    await waitFor(() => expect(huboPost('/ordenes-internas/1/cerrar')).toBe(true));
    expect(onCambio).toHaveBeenCalled();
    responder('POST', '/ordenes-internas/1/cerrar', 500);
    await usuario.click(await screen.findByRole('button', { name: 'Cerrar Orden' }));
    expect(await screen.findByText('Error al cerrar.')).toBeInTheDocument();
  });

  it('una OI de Control de Cambios permite ir al cambio; muestra error si no carga', async () => {
    const { usuario, onVerControlCambio, unmount } = abrir('admin', 4);
    expect(await screen.findByText('Control de Cambios')).toBeInTheDocument();
    const boton = screen.queryByRole('button', { name: /Ver Control de Cambios/ });
    if (boton) {
      await usuario.click(boton);
      expect(onVerControlCambio).toHaveBeenCalled();
    }
    unmount();
    responder('GET', '/ordenes-internas/1', 500);
    abrir('pm', 1);
    expect(await screen.findByText('No se pudo cargar la Orden Interna.')).toBeInTheDocument();
  });
});
