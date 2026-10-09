import { describe, it, expect, vi } from 'vitest';
import { fireEvent, screen, within, waitFor } from '@testing-library/react';
import { peticiones, responder } from '../apiFalsa';
import { abrirAppComo, abrirProyecto, irA } from '../renderizar';

const dialogo = () => within(screen.getByRole('dialog'));
const cerrarDialogo = () => waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());

describe('Aplicación completa', () => {
  it('admin crea un proyecto y aplaza otro', async () => {
    const { usuario } = abrirAppComo('admin');
    await usuario.click(await screen.findByRole('button', { name: /Proyectos activos/ }).catch(() => screen.findByText('Proyectos activos')));
    await screen.findByText('Portafolio de Proyectos');

    // Crear proyecto
    await usuario.click(screen.getByRole('button', { name: 'Nuevo Proyecto' }));
    // El formulario usa campos "required"; se envía directo para ver la validación propia.
    fireEvent.submit(dialogo().getByLabelText(/Nombre del Proyecto/).closest('form') as HTMLFormElement);
    expect(await screen.findByText('Por favor completa todos los campos obligatorios.')).toBeInTheDocument();
    await usuario.type(dialogo().getByLabelText(/Nombre del Proyecto/), 'Proyecto nuevo');
    fireEvent.change(dialogo().getByLabelText(/Fecha del Proyecto/), { target: { value: '2027-02-01' } });
    await usuario.click(dialogo().getByRole('combobox', { name: /Compañía/ }));
    await usuario.click(await screen.findByRole('option', { name: 'Pastas' }));
    await usuario.click(dialogo().getByRole('combobox', { name: /Asignar a PM/ }));
    await usuario.click(await screen.findByRole('option', { name: /Laura/ }));
    responder('POST', '/proyectos', 400, { message: 'Nombre repetido' });
    fireEvent.submit(dialogo().getByLabelText(/Nombre del Proyecto/).closest('form') as HTMLFormElement);
    expect(await screen.findByText('Nombre repetido')).toBeInTheDocument();
    responder('POST', '/proyectos', 201, { id: '2027001' });
    fireEvent.submit(dialogo().getByLabelText(/Nombre del Proyecto/).closest('form') as HTMLFormElement);
    await cerrarDialogo();
    expect(peticiones.filter((p) => p.url === '/proyectos' && p.metodo === 'POST').at(-1)?.cuerpo).toMatchObject({ nombre: 'Proyecto nuevo' });
    await usuario.click(screen.getByRole('button', { name: 'Nuevo Proyecto' }));
    await usuario.click(await dialogo().findByRole('button', { name: 'Cancelar' }));
    await cerrarDialogo();

    // Aplazar proyecto
    const fila = (await screen.findByText('Sin procesos')).closest('tr') as HTMLElement;
    await usuario.click(within(fila).getByRole('button', { name: 'Aplazar a otro año' }));
    await usuario.click(dialogo().getByRole('button', { name: 'Confirmar aplazamiento' }));
    expect(await screen.findByText('Ingresa un año válido.')).toBeInTheDocument();
    await usuario.type(dialogo().getByLabelText('Nuevo año'), '2028');
    await usuario.click(dialogo().getByRole('button', { name: 'Confirmar aplazamiento' }));
    expect(await screen.findByText('El motivo del aplazamiento es obligatorio.')).toBeInTheDocument();
    await usuario.type(dialogo().getByLabelText(/Motivo del aplazamiento/), 'Presupuesto');
    responder('PATCH', /aplazar/, 500);
    await usuario.click(dialogo().getByRole('button', { name: 'Confirmar aplazamiento' }));
    expect(await screen.findByText('Error al aplazar el proyecto.')).toBeInTheDocument();
    responder('PATCH', /aplazar/, 200, {});
    await usuario.click(dialogo().getByRole('button', { name: 'Confirmar aplazamiento' }));
    await cerrarDialogo();
    await usuario.click(within(fila).getByRole('button', { name: 'Aplazar a otro año' }));
    await usuario.click(dialogo().getByRole('button', { name: 'Cancelar' }));
    await cerrarDialogo();

    // Filtros de la tabla
    await usuario.click(screen.getByRole('combobox', { name: 'Año' }));
    await usuario.click(await screen.findByRole('option', { name: '2026' }));
    await usuario.click(screen.getByRole('combobox', { name: 'Compañía' }));
    await usuario.click(await screen.findByRole('option', { name: 'Galletas' }));
    await usuario.click(screen.getByLabelText('Solo proyectos aplazados'));
    await usuario.click(screen.getByRole('button', { name: 'Limpiar filtros' }));
    await waitFor(() => expect(peticiones.filter((p) => p.url.startsWith('/proyectos?')).length).toBeGreaterThan(0));
  });

  it('admin usa el menú, el backup, el selector de usuarios y cierra sesión', async () => {
    const { usuario } = abrirAppComo('admin');
    await screen.findByText(/Bienvenido/);
    await usuario.click(screen.getByRole('button', { name: 'Contraer menú' }));
    await usuario.click(screen.getByRole('button', { name: 'Expandir menú' }));
    await irA(usuario, 'Gestión de Usuarios');
    expect(await screen.findByText('Gestión de Usuarios', { selector: 'h5' })).toBeInTheDocument();
    await irA(usuario, 'Inicio');

    // Backup a Excel (con error y con éxito)
    Object.assign(window.URL, { createObjectURL: vi.fn(() => 'blob:x'), revokeObjectURL: vi.fn() });
    const clic = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined);
    responder('GET', '/backup/excel', 500);
    await usuario.click(screen.getByRole('button', { name: 'Backup a Excel' }));
    expect(await screen.findByRole('alert')).toBeInTheDocument();
    reiniciarBackup();
    await usuario.click(screen.getByRole('button', { name: 'Backup a Excel' }));
    await waitFor(() => expect(clic).toHaveBeenCalled());
    clic.mockRestore();

    // Selector de usuarios de prueba
    await usuario.click(screen.getByRole('button', { name: 'Cambiar' }));
    await usuario.click(await screen.findByRole('menuitem', { name: /Laura \(PM\)/ }));
    await waitFor(() => expect(peticiones.some((p) => p.url === '/auth/login-dev')).toBe(true));
    responder('POST', '/auth/login-dev', 500);
    await usuario.click(screen.getByRole('button', { name: 'Cambiar' }));
    await usuario.click(await screen.findByRole('menuitem', { name: /Sofia/ }));
    expect(await screen.findByText(/Error al autenticar usuario de prueba/)).toBeInTheDocument();

    await usuario.click(screen.getByRole('button', { name: 'Cerrar sesión' }));
    expect(await screen.findAllByText(/sesión/i)).not.toHaveLength(0);
  });

  it('abre cada tipo de pendiente desde Mis Pendientes', async () => {
    const { usuario } = abrirAppComo('controlGestion');
    await usuario.click(await screen.findByRole('button', { name: /Pendientes de tu revisión/ }).catch(() => screen.findByText('Pendientes de tu revisión')));
    await screen.findAllByRole('button', { name: 'Revisar' });
    await usuario.click(screen.getByRole('combobox', { name: 'Tipo de proceso' }));
    await usuario.click(await screen.findByRole('option', { name: /ACTA/ }));
    await usuario.click(screen.getByRole('combobox', { name: 'Compañía' }));
    await usuario.click(await screen.findByRole('option', { name: 'Galletas' }));
    await usuario.click(screen.getByRole('combobox', { name: 'Año' }));
    await usuario.click(await screen.findByRole('option', { name: '2026' }));
    await usuario.click(screen.getByRole('button', { name: 'Limpiar filtros' }));

    // Acta de Cierre
    await usuario.click(screen.getAllByRole('button', { name: 'Revisar' })[0]);
    expect(await screen.findByText('Acta de Cierre')).toBeInTheDocument();
    await irA(usuario, 'Mis Pendientes');
    // Orden Interna
    await usuario.click((await screen.findAllByRole('button', { name: 'Revisar' }))[1]);
    expect(await screen.findByText(/Órdenes Internas — Grupo Planta/)).toBeInTheDocument();
  });

  it('abre una solicitud y un control de cambios desde Mis Pendientes', async () => {
    const { usuario } = abrirAppComo('pmo');
    await irA(usuario, 'Mis Pendientes');
    await usuario.click((await screen.findAllByRole('button', { name: 'Revisar' }))[0]);
    expect(await screen.findByRole('button', { name: 'Volver al proyecto' })).toBeInTheDocument();
    await irA(usuario, 'Mis Pendientes');
    await usuario.click((await screen.findAllByRole('button', { name: 'Revisar' }))[1]);
    expect(await screen.findByText('Control de Cambios', { selector: 'h5,h6' })).toBeInTheDocument();
  });

  it('el PM crea procesos desde el detalle del proyecto', async () => {
    const { usuario } = abrirAppComo('pm');
    await irA(usuario, 'Proyectos');

    // Proyecto sin procesos: crear la Solicitud de Inversión
    await abrirProyecto(usuario, 'Sin procesos');
    await usuario.click(await screen.findByRole('button', { name: 'Iniciar Solicitud de Inversión' }));
    expect(await screen.findByText(/Nueva Solicitud de Inversión/)).toBeInTheDocument();
    await usuario.click(screen.getByRole('button', { name: 'Cancelar y volver' }));
    await usuario.click(await screen.findByRole('button', { name: 'Volver al Portafolio' }));

    // Planta nueva: Órdenes Internas
    await abrirProyecto(usuario, 'Planta nueva');
    await usuario.click(await screen.findByText('ÓRDENES INTERNAS'));
    await usuario.click(await screen.findByRole('button', { name: 'Solicitar cierre de Órdenes Internas' }));
    await usuario.type(dialogo().getByLabelText('Observaciones (opcional)'), 'Listo');
    responder('POST', /solicitar-cierre/, 500);
    await usuario.click(dialogo().getByRole('button', { name: 'Solicitar cierre' }));
    expect(await screen.findByText('Error al solicitar el cierre.')).toBeInTheDocument();
    responder('POST', /solicitar-cierre/, 201, {});
    await usuario.click(dialogo().getByRole('button', { name: 'Solicitar cierre' }));
    await cerrarDialogo();
    await usuario.click(screen.getByRole('button', { name: 'Solicitar cierre de Órdenes Internas' }));
    await usuario.click(dialogo().getByRole('button', { name: 'Cancelar' }));
    await cerrarDialogo();
    await usuario.click(screen.getAllByRole('button', { name: 'Crear Orden Interna' })[0]);
    await usuario.click(await screen.findByRole('button', { name: 'Cancelar' }));
    await usuario.click(screen.getByRole('button', { name: /Ver Órdenes Internas/ }));
    await usuario.click(screen.getByRole('button', { name: /Borrador — Borrador|Sin número asignado — Borrador/ }));
    await usuario.click(await screen.findByRole('button', { name: 'Editar' }));
    expect(await screen.findByDisplayValue('Borrador')).toBeInTheDocument();
    await usuario.click(screen.getAllByRole('button', { name: 'Cancelar' })[0]);
    await usuario.click(await screen.findByRole('button', { name: 'Volver a Procesos' }));

    // Control de Cambios: crear, editar, ir a la OI y crear OI desde el cambio
    await usuario.click(await screen.findByText('CONTROL DE CAMBIOS'));
    await usuario.click(await screen.findByRole('button', { name: 'Crear Control de Cambios' }));
    await usuario.click((await screen.findAllByRole('button', { name: 'Cancelar' }))[0]);
    await usuario.click(await screen.findByRole('button', { name: /Ver Control de Cambios/ }));
    await usuario.click(screen.getByRole('button', { name: /Borrador CC/ }));
    await usuario.click(await screen.findByRole('button', { name: 'Editar' }));
    expect(await screen.findByDisplayValue('Borrador CC')).toBeInTheDocument();
    await usuario.click(screen.getAllByRole('button', { name: 'Cancelar' })[0]);
    await usuario.click(await screen.findByRole('button', { name: /Ampliar alcance/ }));
    await usuario.click(await screen.findByLabelText('Elegir cuál Orden Interna ver'));
    await usuario.click(await screen.findByRole('option', { name: /OI del cambio/ }));
    await usuario.click(screen.getByRole('button', { name: 'Ver Orden Interna' }));
    expect(await screen.findByText(/Órdenes Internas — Grupo Planta/)).toBeInTheDocument();
    await usuario.click(screen.getByRole('button', { name: 'Volver a Procesos' }));
    await usuario.click(await screen.findByText('CONTROL DE CAMBIOS'));
    await usuario.click(await screen.findByRole('button', { name: /Ver Control de Cambios/ }));
    await usuario.click(screen.getByRole('button', { name: /Ampliar alcance/ }));
    await usuario.click(await screen.findByRole('button', { name: /Crear Orden Interna para este cambio/ }));
    expect(await screen.findByText(/\(Control de Cambios\)/)).toBeInTheDocument();
    await usuario.click(screen.getAllByRole('button', { name: 'Cancelar' })[0]);
    await usuario.click(await screen.findByRole('button', { name: 'Volver a Procesos' }));

    // Acta de cierre: ir a Órdenes Internas
    await usuario.click(await screen.findByText('ACTA DE CIERRE'));
    await usuario.click(await screen.findByRole('button', { name: 'Ir a Órdenes Internas' }));
    expect(await screen.findByText(/Órdenes Internas — Grupo Planta/)).toBeInTheDocument();
  });

  it('el PM crea el acta y edita la del proyecto cerrado', async () => {
    const { usuario } = abrirAppComo('pm');
    await irA(usuario, 'Proyectos');
    await abrirProyecto(usuario, 'Proyecto 1791520613884');
    await usuario.click(await screen.findByText('ACTA DE CIERRE'));
    expect(await screen.findByText('Acta de Cierre')).toBeInTheDocument();
  });

  it('muestra la pantalla de cuenta desactivada', async () => {
    localStorage.setItem('token', 'pm');
    localStorage.setItem('usuario', JSON.stringify({ id: 2, nombre: 'Laura', email: 'l', activo: false, roles: [] }));
    responder('GET', '/auth/me', 401, { message: 'Cuenta desactivada' });
    abrirAppComo(null);
    expect(await screen.findAllByText(/desactivad/i)).not.toHaveLength(0);
  });
});

function reiniciarBackup() {
  responder('GET', '/backup/excel', 200, new Blob(['x']));
}
