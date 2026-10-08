import { isAxiosError } from 'axios';

// Devuelve el mensaje de error que envió el backend (por ejemplo,
// "No tienes acceso a este proceso."), o undefined si no hay ninguno.
export function mensajeDelBackend(error: unknown): string | undefined {
  if (!isAxiosError<{ message?: string | string[] }>(error)) return undefined;
  const mensaje = error.response?.data?.message;
  return mensaje === undefined ? undefined : String(mensaje);
}