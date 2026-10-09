import { createContext, useContext } from 'react';

export type TipoAviso = 'error' | 'warning' | 'info' | 'success';

export interface NotificacionesContextType {
  // Muestra un mensaje en la parte inferior de la pantalla (reemplaza a alert).
  avisar: (mensaje: string, tipo?: TipoAviso) => void;
  // Pide confirmación al usuario; devuelve true si acepta (reemplaza a confirm).
  confirmar: (mensaje: string) => Promise<boolean>;
}

export const NotificacionesContext = createContext<NotificacionesContextType | undefined>(undefined);

export function useNotificaciones() {
  const contexto = useContext(NotificacionesContext);
  if (!contexto) {
    throw new Error('useNotificaciones debe usarse dentro de un NotificacionesProvider');
  }
  return contexto;
}