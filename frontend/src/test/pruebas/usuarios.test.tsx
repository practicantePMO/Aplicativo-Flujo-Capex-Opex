import { describe, it, expect } from 'vitest';
import { screen, within, waitFor } from '@testing-library/react';
import { TablaUsuarios } from '../../features/usuarios/components/TablaUsuarios';
import type { Usuario } from '../../features/usuarios/types/usuario.types';
import { datoGrabado, peticiones, responder } from '../apiFalsa';
import { renderizarCon, type UsuarioPrueba } from '../renderizar';

// Se ajustan los datos grabados para tener un usuario inactivo y uno con empresa.
function usuariosDePrueba(): Usuario[] {
  const usuarios = structuredClone(datoGrabado<Usuario[]>('admin', 'GET /usuarios'));
  const sofia = usuarios.find((u) => u.nombre === 'Sofia Interesada') as Usuario;
  sofia.activo = false;
  const laura = usuarios.find((u) => u.nombre === 'Laura PM') as Usuario;
  laura.empresa = { id: 1, nombre: 'Noel' } as Usuario['empresa'];
  return usuarios;
}

async function esperarCierreDialogo() {
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
}

function fila(nombre: string) {
  return screen.getByText(nombre).closest('tr') as HTMLElement;
}

async function elegir(usuario: UsuarioPrueba, etiqueta: string, opcion: string | RegExp) {
  await usuario.click(screen.getByRole('combobox', { name: etiqueta }));
  await usuario.click(await screen.findByRole('option', { name: opcion }));
}

describe('Gestión de usuarios', () => {
  it('filtra, asigna y quita roles, edita área y empresa, y activa o desactiva usuarios', async () => {
    responder('GET', '/usuarios', 200, usuariosDePrueba());
    const { usuario } = renderizarCon('admin', <TablaUsuarios />);
    expect(await screen.findByText('Gestión de Usuarios')).toBeInTheDocument();

    // Filtros
    await usuario.type(screen.getByPlaceholderText('Buscar por nombre o correo...'), 'zzz');
    expect(screen.getByText('No se encontraron usuarios con estos filtros.')).toBeInTheDocument();
    await usuario.clear(screen.getByPlaceholderText('Buscar por nombre o correo...'));
    await usuario.type(screen.getByPlaceholderText('Buscar por nombre o correo...'), 'empresa.com');
    await usuario.clear(screen.getByPlaceholderText('Buscar por nombre o correo...'));
    await usuario.click(screen.getByRole('button', { name: /Solo en espera de rol/ }));
    expect(screen.getByText('Nuevo Sin Rol')).toBeInTheDocument();
    expect(screen.queryByText('Laura PM')).not.toBeInTheDocument();
    await usuario.click(screen.getByRole('button', { name: 'Limpiar filtros' }));
    await elegir(usuario, 'Área', 'Calidad');
    expect(screen.getByText('Simon Interesado')).toBeInTheDocument();
    await elegir(usuario, 'Área', 'Todas las áreas');
    await elegir(usuario, 'Estado', 'Inactivos');
    expect(screen.getByText('Sofia Interesada')).toBeInTheDocument();
    await elegir(usuario, 'Estado', 'Activos');
    expect(screen.queryByText('Sofia Interesada')).not.toBeInTheDocument();
    await usuario.click(screen.getByRole('button', { name: 'Limpiar filtros' }));

    // Asignar rol
    await usuario.click(within(fila('Nuevo Sin Rol')).getByLabelText('Asignar rol'));
    await usuario.click(screen.getByRole('button', { name: 'Asignar rol' }));
    expect(await screen.findByText('Selecciona un rol.')).toBeInTheDocument();
    await elegir(usuario, 'Rol', 'Project Manager');
    await elegir(usuario, 'Compañía', 'Galletas');
    await usuario.click(screen.getByRole('button', { name: 'Asignar rol' }));
    await waitFor(() => expect(peticiones.some((p) => p.url === '/usuarios/asignar-rol')).toBe(true));
    expect(peticiones.find((p) => p.url === '/usuarios/asignar-rol')?.cuerpo).toMatchObject({ usuario_id: 10, compania_id: 1 });

    await usuario.click(within(fila('Nuevo Sin Rol')).getByLabelText('Asignar rol'));
    await elegir(usuario, 'Rol', 'Project Manager');
    responder('POST', '/usuarios/asignar-rol', 400, { message: 'Ya tiene ese rol' });
    await usuario.click(screen.getByRole('button', { name: 'Asignar rol' }));
    expect(await screen.findByText('Ya tiene ese rol')).toBeInTheDocument();
    await usuario.click(screen.getByRole('button', { name: 'Cancelar' }));

    // Quitar rol (se cancela y luego se acepta; luego falla)
    const chipRol = within(fila('Mateo PM')).getByTestId('CloseIcon');
    await usuario.click(chipRol);
    await usuario.click(await screen.findByRole('button', { name: 'Cancelar' }));
    await usuario.click(within(fila('Mateo PM')).getByTestId('CloseIcon'));
    await usuario.click(await screen.findByRole('button', { name: 'Aceptar' }));
    await waitFor(() => expect(peticiones.some((p) => p.metodo === 'DELETE')).toBe(true));
    responder('DELETE', /usuarios\/roles/, 500);
    await usuario.click(within(fila('Mateo PM')).getByTestId('CloseIcon'));
    await usuario.click(await screen.findByRole('button', { name: 'Aceptar' }));
    expect(await screen.findByText('Error al quitar el rol.')).toBeInTheDocument();

    // Editar área
    await usuario.click(within(fila('Mateo PM')).getByLabelText('Editar área'));
    const campoArea = within(screen.getByRole('dialog')).getByLabelText('Área');
    await usuario.clear(campoArea);
    await usuario.type(campoArea, 'Ingeniería');
    await usuario.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Guardar' }));
    await waitFor(() => expect(peticiones.some((p) => p.url === '/usuarios/8/area')).toBe(true));
    responder('PATCH', '/usuarios/8/area', 500);
    await usuario.click(within(fila('Mateo PM')).getByLabelText('Editar área'));
    await usuario.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Guardar' }));
    expect(await screen.findByText('Error al actualizar el área.')).toBeInTheDocument();
    await usuario.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Cancelar' }));
    await esperarCierreDialogo();

    // Editar empresa
    await usuario.click(within(fila('Laura PM')).getByLabelText('Editar empresa'));
    await usuario.click(within(screen.getByRole('dialog')).getByLabelText('Empresa (opcional)'));
    await usuario.click(await screen.findByRole('option', { name: /Pozuelo/ }));
    await usuario.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Guardar' }));
    await waitFor(() => expect(peticiones.some((p) => p.url === '/usuarios/2/empresa')).toBe(true));
    responder('PATCH', '/usuarios/8/empresa', 500);
    await usuario.click(within(fila('Mateo PM')).getByLabelText('Editar empresa'));
    await usuario.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Guardar' }));
    expect(await screen.findByText('Error al actualizar la empresa.')).toBeInTheDocument();
    await usuario.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Cancelar' }));
    await esperarCierreDialogo();

    // Activar y desactivar
    await usuario.click(within(fila('Sofia Interesada')).getByRole('switch', { hidden: true }));
    await waitFor(() => expect(peticiones.some((p) => p.url === '/usuarios/7/activo')).toBe(true));
    responder('PATCH', '/usuarios/7/activo', 500);
    await usuario.click(within(fila('Sofia Interesada')).getByRole('switch', { hidden: true }));
    expect(await screen.findByText('Error al activar al usuario.')).toBeInTheDocument();
    await usuario.click(within(fila('Mateo PM')).getByRole('switch', { hidden: true }));
    await usuario.click(await screen.findByRole('button', { name: 'Cancelar' }));
    await esperarCierreDialogo();
    await usuario.click(within(fila('Mateo PM')).getByRole('switch', { hidden: true }));
    await usuario.click(await screen.findByRole('button', { name: 'Sí, desactivar' }));
    await waitFor(() => expect(peticiones.some((p) => p.url === '/usuarios/8/activo')).toBe(true));
    await esperarCierreDialogo();
    responder('PATCH', '/usuarios/8/activo', 500);
    await usuario.click(within(fila('Mateo PM')).getByRole('switch', { hidden: true }));
    await usuario.click(await screen.findByRole('button', { name: 'Sí, desactivar' }));
    expect(await screen.findByText('Error al desactivar al usuario.')).toBeInTheDocument();
  });

  it('como PMO no puede modificar administradores', async () => {
    renderizarCon('pmo', <TablaUsuarios />);
    expect(await screen.findByText('Ana Admin')).toBeInTheDocument();
    expect(within(fila('Ana Admin')).getByRole('switch', { hidden: true })).toBeDisabled();
    expect(within(fila('Carlos PMO')).getByRole('switch', { hidden: true })).toBeDisabled();
  });

  it('muestra el error si no carga la lista', async () => {
    responder('GET', '/usuarios', 500);
    renderizarCon('admin', <TablaUsuarios />);
    expect(await screen.findByRole('alert')).toBeInTheDocument();
  });
});
