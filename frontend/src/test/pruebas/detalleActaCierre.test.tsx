import { describe, it, expect, vi } from 'vitest';
import { screen, within, waitFor } from '@testing-library/react';
import { DetalleActaCierre } from '../../features/acta-cierre/components/DetalleActaCierre';
import type { ActaCierreDetalle } from '../../features/acta-cierre/types/actaCierre.types';
import { datoGrabado, peticiones, responder, type Rol } from '../apiFalsa';
import { cerrarAviso, renderizarCon, type UsuarioPrueba } from '../renderizar';

function abrir(rol: Rol, procesoId = 11) {
  const props = { onCambio: vi.fn(), onEditar: vi.fn() };
  const resultado = renderizarCon(rol, <DetalleActaCierre procesoId={procesoId} companiaId={1} {...props} />);
  return { ...resultado, ...props };
}

// Acta 11 movida a otra etapa, con una persona asignada pendiente en cada etapa.
function actaEnEtapa(estado: string, cambios: Partial<ActaCierreDetalle> = {}) {
  const detalle = structuredClone(datoGrabado<ActaCierreDetalle>('admin', 'GET /actas-cierre/11'));
  detalle.procesos.estado_actual = estado;
  detalle.procesos.asignaciones_proceso = [
    { id: 90, etapa: 'VERIFICACION_PARTES_INTERESADAS', estado_asignacion: 'PENDIENTE', usuarios: { id: 7, nombre: 'Sofia Interesada' } },
    { id: 91, etapa: 'GERENCIA', estado_asignacion: 'PENDIENTE', usuarios: { id: 11, nombre: 'Gabriela' } },
    { id: 92, etapa: 'ACTIVOS_FIJOS', estado_asignacion: 'PENDIENTE', usuarios: { id: 19, nombre: 'Andrea' } },
  ] as ActaCierreDetalle['procesos']['asignaciones_proceso'];
  Object.assign(detalle, cambios);
  responder('GET', '/actas-cierre/11', 200, detalle);
}

const dialogo = () => within(screen.getByRole('dialog'));
const cerrarDialogo = () => waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
const aprobaciones = () => peticiones.filter((p) => p.url === '/actas-cierre/11/aprobar');

// Recorre el diálogo de aprobación: sin observación, con error del backend y con éxito.
async function aprobarConDialogo(usuario: UsuarioPrueba, boton: string, elegir?: { etiqueta: RegExp; opcion: RegExp; aviso: string }) {
  await usuario.click(await screen.findByRole('button', { name: 'Aprobar' }));
  await usuario.click(await within(await screen.findByRole('dialog')).findByRole('button', { name: boton }));
  await cerrarAviso(usuario, 'La observación es obligatoria para aprobar.');
  await usuario.type(dialogo().getByLabelText(/Observación/), 'Ok');
  if (elegir) {
    await usuario.click(dialogo().getByRole('button', { name: boton }));
    await cerrarAviso(usuario, elegir.aviso);
    await usuario.click(dialogo().getByLabelText(elegir.etiqueta));
    await usuario.click(await screen.findByRole('option', { name: elegir.opcion }));
  }
  responder('POST', '/actas-cierre/11/aprobar', 500);
  await usuario.click(dialogo().getByRole('button', { name: boton }));
  await cerrarAviso(usuario, 'Error al aprobar.');
  responder('POST', '/actas-cierre/11/aprobar', 201, {});
  await usuario.click(dialogo().getByRole('button', { name: boton }));
  await cerrarDialogo();
  await usuario.click(screen.getByRole('button', { name: 'Aprobar' }));
  await usuario.click(dialogo().getByRole('button', { name: 'Cancelar' }));
  await cerrarDialogo();
}

describe('Detalle del Acta de Cierre', () => {
  it('el PM edita y envía el borrador', async () => {
    actaEnEtapa('BORRADOR');
    const { usuario, onEditar, onCambio } = abrir('pm');
    await usuario.click(await screen.findByRole('button', { name: 'Editar' }));
    expect(onEditar).toHaveBeenCalled();
    await usuario.click(screen.getByRole('button', { name: 'Enviar a revisión' }));
    await waitFor(() => expect(onCambio).toHaveBeenCalled());
    responder('POST', '/actas-cierre/11/enviar', 500);
    await usuario.click(screen.getByRole('button', { name: 'Enviar a revisión' }));
    expect(await screen.findByText('Error al enviar a revisión.')).toBeInTheDocument();
  });

  it('Control Gestión elige a Activos Fijos y rechaza', async () => {
    const { usuario } = abrir('controlGestion');
    await aprobarConDialogo(usuario, 'Aprobar y enviar', {
      etiqueta: /A quién de Activos Fijos/, opcion: /Andrea/, aviso: 'Debes elegir a quién de Activos Fijos enviar el proceso.',
    });
    expect(aprobaciones().at(-1)?.cuerpo).toMatchObject({ activos_fijos_id: 19 });

    await usuario.click(screen.getByRole('button', { name: 'Rechazar' }));
    await usuario.click(dialogo().getByRole('button', { name: 'Rechazar' }));
    await cerrarAviso(usuario, 'La razón del rechazo es obligatoria.');
    await usuario.type(dialogo().getByLabelText(/Razón del rechazo/), 'No');
    responder('POST', '/actas-cierre/11/rechazar', 500);
    await usuario.click(dialogo().getByRole('button', { name: 'Rechazar' }));
    await cerrarAviso(usuario, 'Error al rechazar.');
    responder('POST', '/actas-cierre/11/rechazar', 201, {});
    await usuario.click(dialogo().getByRole('button', { name: 'Rechazar' }));
    await cerrarDialogo();
    await usuario.click(screen.getByRole('button', { name: 'Rechazar' }));
    await usuario.click(dialogo().getByRole('button', { name: 'Cancelar' }));
    await cerrarDialogo();
  });

  it('Activos Fijos aprueba', async () => {
    actaEnEtapa('ACTIVOS_FIJOS');
    const { usuario } = abrir('activosFijos');
    await aprobarConDialogo(usuario, 'Aprobar');
  });

  it('Dirección PMO elige gerente', async () => {
    const base = datoGrabado<ActaCierreDetalle>('admin', 'GET /actas-cierre/11');
    actaEnEtapa('DIRECCION_PMO', {
      comparacion: { ...base.comparacion, valores_cc: [{ categoria: 'ACTIVO', usd: 50, cop: 0 }] },
    } as unknown as Partial<ActaCierreDetalle>);
    const { usuario } = abrir('director');
    await usuario.click(await screen.findByRole('tab', { name: /Valores y Flujo/ }));
    expect(screen.getByText('Inicial (Control de Cambios)')).toBeInTheDocument();
    await aprobarConDialogo(usuario, 'Aprobar y enviar', {
      etiqueta: /A qué gerente/, opcion: /Gabriela/, aviso: 'Debes elegir a qué gerente enviar el proceso.',
    });
    expect(aprobaciones().at(-1)?.cuerpo).toMatchObject({ gerente_id: 11 });
  });

  it('la gerente asignada decide si continúa a Presidencia', async () => {
    actaEnEtapa('GERENCIA', { tipo_cierre: 'CANCELACION' } as Partial<ActaCierreDetalle>);
    const { usuario } = abrir('gerencia1');
    expect(await screen.findByText('Cancelación')).toBeInTheDocument();
    await usuario.click(await screen.findByRole('button', { name: 'Aprobar' }));
    await usuario.click(dialogo().getByLabelText('Finaliza aquí'));
    await usuario.click(dialogo().getByRole('button', { name: 'Cancelar' }));
    await cerrarDialogo();
    await aprobarConDialogo(usuario, 'Aprobar');
  });

  it('las partes interesadas, PMO y Presidencia ven sus acciones', async () => {
    actaEnEtapa('VERIFICACION_PARTES_INTERESADAS');
    const primera = abrir('interesada');
    expect(await screen.findByRole('button', { name: 'Aprobar' })).toBeInTheDocument();
    primera.unmount();
    actaEnEtapa('PENDIENTE_PMO');
    const segunda = abrir('pmo');
    expect(await screen.findByRole('button', { name: 'Aprobar' })).toBeInTheDocument();
    segunda.unmount();
    actaEnEtapa('PRESIDENCIA');
    abrir('presidencia');
    expect(await screen.findByRole('button', { name: 'Aprobar' })).toBeInTheDocument();
  });

  it('muestra las pestañas del acta cerrada y el error si no carga', async () => {
    const { usuario, unmount } = abrir('admin', 13);
    for (const pestana of await screen.findAllByRole('tab')) await usuario.click(pestana);
    unmount();
    responder('GET', '/actas-cierre/60', 500);
    abrir('pm', 60);
    expect(await screen.findByText(/No se pudo cargar/)).toBeInTheDocument();
  });
});
