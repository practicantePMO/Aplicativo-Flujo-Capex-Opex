// API simulada para las pruebas: responde con datos REALES grabados del backend
// (src/test/fixtures/respuestas-api.json), según el rol de quien hace la petición.
// El "token" de las pruebas es el nombre del rol (admin, pm, pmo, ...).
import { AxiosError, AxiosHeaders, type AxiosAdapter, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import axiosClient from '../api/axiosClient';
import grabadas from './fixtures/respuestas-api.json';

interface Respuesta {
  status: number;
  data: unknown;
}

type Datos = { usuarios: Record<string, number>; respuestas: Record<string, Record<string, Respuesta>> };
const datos = grabadas as unknown as Datos;

export type Rol = keyof typeof grabadas.usuarios;

export interface Peticion {
  metodo: string;
  url: string;
  cuerpo: unknown;
}

type Manejador = (peticion: Peticion) => Respuesta | undefined;

let manejadores: Manejador[] = [];
export let peticiones: Peticion[] = [];

function armarUrl(config: InternalAxiosRequestConfig): string {
  const url = config.url || '';
  const params = config.params as Record<string, unknown> | undefined;
  if (!params) return url;
  const query = Object.entries(params)
    .filter(([, valor]) => valor !== undefined && valor !== null && valor !== '')
    .map(([clave, valor]) => `${clave}=${String(valor)}`)
    .join('&');
  return query ? `${url}?${query}` : url;
}

function rolActual(config: InternalAxiosRequestConfig): string {
  const autorizacion = String(config.headers?.Authorization || '');
  return autorizacion.replace('Bearer ', '');
}

function respuestaGrabada(rol: string, metodo: string, url: string): Respuesta | undefined {
  const clave = `${metodo} ${url}`;
  const sinQuery = `${metodo} ${url.split('?')[0]}`;
  const delRol = datos.respuestas[rol] || {};
  if (delRol[clave]) return delRol[clave];
  if (delRol[sinQuery]) return delRol[sinQuery];
  // Si el rol no tiene la ruta grabada, se usa la del administrador.
  return datos.respuestas.admin[clave] || datos.respuestas.admin[sinQuery];
}

function respuestaPorDefecto(metodo: string, url: string): Respuesta {
  if (url.startsWith('/backup/excel')) return { status: 200, data: new Blob(['xlsx']) };
  if (metodo === 'GET') return { status: 200, data: [] };
  if (url === '/auth/login-dev') {
    return { status: 201, data: { access_token: 'admin', usuario: datos.respuestas.admin['GET /auth/me'].data } };
  }
  return { status: metodo === 'POST' ? 201 : 200, data: { id: 999, proceso_id: 999, ok: true } };
}

const adaptador: AxiosAdapter = (config) => {
  const metodo = (config.method || 'get').toUpperCase();
  const url = armarUrl(config);
  let cuerpo: unknown = config.data;
  if (typeof cuerpo === 'string') {
    try {
      cuerpo = JSON.parse(cuerpo);
    } catch {
      // se deja como texto
    }
  }
  const peticion = { metodo, url, cuerpo };
  peticiones.push(peticion);

  const rol = rolActual(config);
  let respuesta: Respuesta | undefined;
  for (const manejador of manejadores) {
    respuesta = manejador(peticion);
    if (respuesta) break;
  }
  respuesta ??= (metodo === 'GET' ? respuestaGrabada(rol, metodo, url) : undefined) ?? respuestaPorDefecto(metodo, url);

  const final: AxiosResponse = {
    data: structuredClone(respuesta.data),
    status: respuesta.status,
    statusText: String(respuesta.status),
    headers: new AxiosHeaders(),
    config,
  };
  if (respuesta.status >= 400) {
    return Promise.reject(new AxiosError(`Request failed with status code ${respuesta.status}`, 'ERR_BAD_RESPONSE', config, null, final));
  }
  return Promise.resolve(final);
};

axiosClient.defaults.adapter = adaptador;

/** Agrega una respuesta personalizada (por ejemplo, un error) para las rutas que coincidan. */
export function responder(metodo: string, ruta: string | RegExp, status: number, data: unknown = {}) {
  manejadores.unshift((peticion) => {
    const coincide = typeof ruta === 'string' ? peticion.url === ruta : ruta.test(peticion.url);
    return peticion.metodo === metodo && coincide ? { status, data } : undefined;
  });
}

export function reiniciarApiFalsa() {
  manejadores = [];
  peticiones = [];
}

/** Datos grabados de una ruta para un rol (útil para pruebas de componentes sueltos). */
export function datoGrabado<T = unknown>(rol: Rol, clave: string): T {
  return (datos.respuestas[rol][clave] ?? datos.respuestas.admin[clave]).data as T;
}

/** Deja la sesión iniciada como el rol indicado (lo que AuthContext lee de localStorage). */
export function iniciarSesionComo(rol: Rol) {
  localStorage.setItem('token', rol);
  localStorage.setItem('usuario', JSON.stringify(datoGrabado(rol, 'GET /auth/me')));
}
