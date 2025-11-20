import axios from "axios";

const user = import.meta.env.VITE_API_USER || "admin";
const password = import.meta.env.VITE_API_PASSWORD || "password";

const token = btoa(`${user}:${password}`);
const isLocal = false;

export const api = axios.create({
  baseURL: isLocal
    ? import.meta.env.VITE_LOCAL_API_URL
    : import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    Authorization: `Basic ${token}`,
  },
});

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Não autorizado, redirecionar login");
    return Promise.reject(error);
  }
);

export default api;
