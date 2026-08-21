import axios from 'axios';

// Instancia base conectada al backend de NestJS
const axiosClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de Peticiones: Adjunta el JWT automáticamente
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

// Interceptor de Respuestas: Maneja errores globales (como el conflicto 409)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 409) {
      alert('Conflicto de concurrencia: Este registro fue modificado por otro usuario. Se reintentará la carga.');
    }
    return Promise.reject(error);
  }
);

export default axiosClient;