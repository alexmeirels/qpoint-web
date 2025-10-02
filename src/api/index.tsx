// src/api/axiosInstance.ts
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000", // pega do .env
  timeout: 10000, // 10 segundos
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  // const token = localStorage.getItem("token");
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
});

// Interceptor de resposta (tratamento de erro global)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response?.status === 401) {
      console.error("Não autorizado, redirecionar login");
    // }
    return Promise.reject(error);
  }
);

export default api;
