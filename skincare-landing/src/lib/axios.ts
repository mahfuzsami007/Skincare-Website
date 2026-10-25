import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Your Laravel API URL
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor: Before every request, check if we have a token and attach it
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;