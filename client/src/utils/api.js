import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: backendUrl,
  withCredentials: true, // send cookies if needed
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
// Usage: api.get('/api/user/route'), api.post('/api/user/route', data)
