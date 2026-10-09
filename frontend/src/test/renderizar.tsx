import type { ReactNode } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { AuthProvider } from '../auth/AuthContext';
import { NotificacionesProvider } from '../notificaciones/NotificacionesProvider';
import { iniciarSesionComo, type Rol } from './apiFalsa';

/** Abre la aplicación completa con la sesión iniciada como el rol indicado. */
export function abrirAppComo(rol: Rol | null) {
  if (rol) iniciarSesionComo(rol);
  const usuario = userEvent.setup({ delay: null });
  return { usuario, ...render(<App />) };
}

/** Renderiza un componente suelto con los proveedores de la app. */
export function renderizarCon(rol: Rol | null, ui: ReactNode) {
  if (rol) iniciarSesionComo(rol);
  const usuario = userEvent.setup({ delay: null });
  return {
    usuario,
    ...render(
      <AuthProvider>
        <NotificacionesProvider>{ui}</NotificacionesProvider>
      </AuthProvider>,
    ),
  };
}

export type UsuarioPrueba = ReturnType<typeof userEvent.setup>;

/** Entra a una opción del menú lateral (Inicio, Mis Pendientes, Proyectos, Gestión de Usuarios). */
export async function irA(usuario: UsuarioPrueba, opcion: string) {
  const { screen } = await import('@testing-library/react');
  await usuario.click(screen.getByRole('button', { name: new RegExp(opcion) }));
}

/** Abre el detalle de un proyecto desde la tabla de proyectos. */
export async function abrirProyecto(usuario: UsuarioPrueba, nombre: string) {
  const { screen, within } = await import('@testing-library/react');
  const celda = await screen.findByText(nombre);
  const fila = celda.closest('tr');
  if (!fila) throw new Error(`No se encontró la fila de ${nombre}`);
  await usuario.click(within(fila).getByRole('button', { name: 'Abrir procesos del proyecto' }));
}

/**
 * Cierra el aviso (Snackbar) y espera a que desaparezca, para que el siguiente
 * aviso se pueda ver (un clic con el aviso abierto lo cierra por "clic afuera").
 */
export async function cerrarAviso(usuario: UsuarioPrueba, mensaje: string) {
  const { screen, within, waitFor } = await import('@testing-library/react');
  const aviso = await screen.findByText(mensaje);
  await usuario.click(within(aviso.closest('[role="alert"]') as HTMLElement).getByLabelText('Close'));
  await waitFor(() => {
    if (document.querySelector('.MuiSnackbar-root')) throw new Error('El aviso sigue abierto');
  });
}
