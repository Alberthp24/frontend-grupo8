import axios from 'axios';

// En Vercel: VITE_API_URL = https://tu-api.onrender.com/api (nunca localhost)
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({ baseURL: API_URL });

// Si el backend entrega token, se envía en cada petición
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const mensajeError = (e) =>
  e.response?.data?.mensaje || e.response?.data?.error ||
  (e.response ? 'La operación fue rechazada.' : 'Sin conexión: Render puede estar despertando (espera ~50 s).');

export default api;
