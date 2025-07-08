import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL ;
//const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: backendUrl,
  credentials: "include",
  withCredentials: true, // send cookies if needed
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;
// Usage: api.get('/api/user/route'), api.post('/api/user/route', data)
