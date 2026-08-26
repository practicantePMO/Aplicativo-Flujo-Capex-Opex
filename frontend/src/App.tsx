import { useState } from 'react';
import { AuthProvider, useAuth } from './auth/AuthContext';
import { DevSwitcher } from './auth/DevSwitcher';
import { AppLayout } from './layout/AppLayout';

// Vistas de Proyectos
import { TablaProyectos } from './features/proyectos/components/TablaProyectos';
import { DetalleProyecto } from './features/proyectos/components/DetalleProyecto';
import type { Proyecto } from './features/proyectos/types/proyecto.types';

// Vistas de Solicitud de Inversión y Pendientes
import { VistaMisPendientes } from './features/procesos/components/VistaMisPendientes';

// Gestión de usuarios
import { TablaUsuarios } from './features/usuarios/components/TablaUsuarios';

// Pantallas de inicio
import { PantallaEsperandoRol } from './features/inicio/components/PantallaEsperandoRol';
import { PantallaBienvenida } from './features/inicio/components/PantallaBienvenida';

import { PantallaSesionCerrada } from './features/inicio/components/PantallaSesionCerrada';

import { PantallaCuentaDesactivada } from './features/inicio/components/PantallaCuentaDesactivada';


function ContenidoPrincipal() {
  const { usuario } = useAuth();
  const [vistaActual, setVistaActual] = useState<string>('inicio');
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState<Proyecto | null>(null);
  const [procesoIdSeleccionado, setProcesoIdSeleccionado] = useState<number | null>(null);

  // 🆕 Si no hay nadie logueado (recién cerró sesión), mostramos ESTA pantalla,
  // no la de "esperando rol" — son cosas completamente distintas.
  if (!usuario) {
    return (
      <>
        <PantallaSesionCerrada />
        <DevSwitcher />
      </>
    );
  }

  if (usuario.activo === false) {
    return (
      <>
        <PantallaCuentaDesactivada />
        <DevSwitcher />
      </>
    );
  }

  const listaRoles = (usuario as any)?.roles || (usuario as any)?.usuario_roles_compania || [];
  const sinRoles = listaRoles.length === 0;

  if (sinRoles) {
    return (
      <>
        <PantallaEsperandoRol />
        <DevSwitcher />
      </>
    );
  }

  const manejarAbrirProyectoDesdePendientes = (proyecto: Proyecto, procesoId: number) => {
    setProyectoSeleccionado(proyecto);
    setProcesoIdSeleccionado(procesoId);
    setVistaActual('proyectos');
  };

  const manejarCambioVistaSidebar = (nuevaVista: string) => {
    setVistaActual(nuevaVista);
    if (nuevaVista !== 'proyectos') {
      setProyectoSeleccionado(null);
      setProcesoIdSeleccionado(null);
    }
  };

  const renderizarContenido = () => {
    switch (vistaActual) {
      case 'inicio':
        return (
          <PantallaBienvenida
            onIrAPendientes={() => setVistaActual('pendientes')}
            onIrAProyectos={() => setVistaActual('proyectos')}
          />
        );

      case 'pendientes':
        return <VistaMisPendientes onAbrirProyecto={manejarAbrirProyectoDesdePendientes} />;

      case 'proyectos':
        return proyectoSeleccionado ? (
          <DetalleProyecto
            proyecto={proyectoSeleccionado}
            procesoIdInicial={procesoIdSeleccionado}
            onVolver={() => {
              setProyectoSeleccionado(null);
              setProcesoIdSeleccionado(null);
            }}
          />
        ) : (
          <TablaProyectos
            onSeleccionarProyecto={(proyecto) => {
              setProyectoSeleccionado(proyecto);
              setProcesoIdSeleccionado(null);
            }}
          />
        );

      case 'usuarios':
        return <TablaUsuarios />;

      default:
        return (
          <PantallaBienvenida
            onIrAPendientes={() => setVistaActual('pendientes')}
            onIrAProyectos={() => setVistaActual('proyectos')}
          />
        );
    }
  };

  return (
    <AppLayout vistaActual={vistaActual} onCambiarVista={manejarCambioVistaSidebar}>
      {renderizarContenido()}
      <DevSwitcher />
    </AppLayout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ContenidoPrincipal />
    </AuthProvider>
  );
}