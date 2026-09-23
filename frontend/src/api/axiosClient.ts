import axios from 'axios';

// Instancia base conectada al backend de NestJS
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Evento que escucha AuthContext cuando el backend rechaza la sesión (401):
// token vencido, token inválido o usuario desactivado.
export const EVENTO_SESION_INVALIDA = 'sesion-invalida';

// Adjunta el JWT automáticamente
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Maneja errores globales 
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url: string = error.config?.url || '';

    // 401 en cualquier ruta que NO sea de login = la sesión ya no sirve.
    // (En los logins un 401 solo significa "credenciales inválidas".)
    if (status === 401 && !url.includes('/auth/login')) {
      const mensaje: string = error.response?.data?.message || '';
      window.dispatchEvent(new CustomEvent(EVENTO_SESION_INVALIDA, { detail: { mensaje } }));
    }

    if (status === 409) {
      alert('Conflicto de concurrencia: Este registro fue modificado por otro usuario. Se reintentará la carga.');
    }
    return Promise.reject(error);
  }
);

export default axiosClient;