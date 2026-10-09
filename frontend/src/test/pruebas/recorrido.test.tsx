import { describe, it, expect } from 'vitest';
import { act, screen } from '@testing-library/react';
import { abrirAppComo, irA, abrirProyecto, type UsuarioPrueba } from '../renderizar';
import type { Rol } from '../apiFalsa';

// Recorre las pantallas de lectura de cada proceso con distintos roles,
// usando las respuestas reales grabadas del backend.

async function recorrerPestanas(usuario: UsuarioPrueba) {
  for (const pestana of screen.queryAllByRole('tab')) {
    await usuario.click(pestana);
  }
}

async function esperarCarga() {
  await act(async () => {
    await new Promise((resolver) => setTimeout(resolver, 20));
  });
}

async function volver(usuario: UsuarioPrueba, texto: RegExp) {
  await usuario.click(await screen.findByRole('button', { name: texto }));
}

async function abrirTarjeta(usuario: UsuarioPrueba, titulo: string) {
  await usuario.click(await screen.findByText(titulo));
}

async function recorrerLista(usuario: UsuarioPrueba, ver: RegExp, item: RegExp) {
  const botonVer = screen.queryByRole('button', { name: ver });
  if (botonVer) await usuario.click(botonVer);
  const items = screen.queryAllByRole('button', { name: item });
  for (let i = 0; i < items.length; i++) {
    const actuales = screen.queryAllByRole('button', { name: item });
    if (!actuales[i]) break;
    await usuario.click(actuales[i]);
    await esperarCarga();
    await recorrerPestanas(usuario);
  }
}

async function recorrerProyecto(usuario: UsuarioPrueba, nombre: string) {
  await abrirProyecto(usuario, nombre);
  await screen.findByText('Procesos del Proyecto');

  if (screen.queryByText('SOLICITUD INVERSION')) {
    await abrirTarjeta(usuario, 'SOLICITUD INVERSION');
    await esperarCarga();
    await recorrerPestanas(usuario);
    if (!screen.queryByRole('button', { name: /Volver al proyecto/ })) {
      // Sin permiso para ver la solicitud: se vuelve desde el menú.
      await irA(usuario, 'Inicio');
      await irA(usuario, 'Proyectos');
      return;
    }
    await volver(usuario, /Volver al proyecto/);
  }
  for (const [tarjeta, ver, item] of [
    ['ÓRDENES INTERNAS', /^Ver Órdenes Internas/, /—/],
    ['CONTROL DE CAMBIOS', /^Ver Control de Cambios/, /(Borrador|Pendiente [\wÁÉÍÓÚáéíóú ]+|Aprobado Final|Rechazado)$/],
  ] as const) {
    if (!screen.queryByText(tarjeta)) continue;
    await abrirTarjeta(usuario, tarjeta);
    await screen.findByRole('button', { name: /Volver a Procesos/ });
    await recorrerLista(usuario, ver, item);
    await volver(usuario, /Volver a Procesos/);
  }
  if (screen.queryByText('ACTA DE CIERRE')) {
    await abrirTarjeta(usuario, 'ACTA DE CIERRE');
    await screen.findByRole('button', { name: /Volver a Procesos/ });
    await recorrerPestanas(usuario);
    await volver(usuario, /Volver a Procesos/);
  }
  await volver(usuario, /Volver al Portafolio/);
}

const PROYECTOS = [
  'Planta nueva',
  'Proyecto 1791520613884',
  'Proyecto 1791520614297',
  'SI borrador',
  'SI en PMO',
  'SI con partes',
  'SI en Dirección',
  'SI en Gerencia',
  'SI en Presidencia',
  'SI rechazada',
  'SI cancelada',
  'Sin procesos',
];

const ROLES: Rol[] = ['admin', 'pm', 'pmo', 'director', 'gerencia', 'presidencia', 'interesada', 'controlGestion', 'activosFijos'];

// Los proyectos se recorren en tres grupos para que cada prueba sea corta.
const GRUPOS = [PROYECTOS.slice(0, 3), PROYECTOS.slice(3, 8), PROYECTOS.slice(8)];

describe.each(ROLES)('recorrido como %s', (rol) => {
  it.each(GRUPOS.map((grupo, i) => [i + 1, grupo] as const))('recorre el grupo %i de proyectos', async (_n, grupo) => {
    const { usuario } = abrirAppComo(rol);
    await screen.findByText(/Bienvenido/);
    await irA(usuario, 'Mis Pendientes');
    await irA(usuario, 'Proyectos');
    for (const nombre of grupo) {
      await screen.findByText(/Portafolio de Proyectos/);
      if (!screen.queryByText(nombre)) continue;
      await recorrerProyecto(usuario, nombre);
    }
    expect(await screen.findByText(/Portafolio de Proyectos/)).toBeInTheDocument();
  }, 120000);
});

describe('vistas sin acceso', () => {
  it('sin rol muestra la pantalla de espera', async () => {
    abrirAppComo('sinRol');
    expect((await screen.findAllByText(/rol/i)).length).toBeGreaterThan(0);
  });
  it('sin sesión muestra la pantalla de inicio de sesión', async () => {
    abrirAppComo(null);
    expect(await screen.findAllByText(/sesión/i)).not.toHaveLength(0);
  });
});
