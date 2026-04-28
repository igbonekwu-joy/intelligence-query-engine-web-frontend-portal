import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, // REQUIRED for HTTP-only cookies
});

// attach API version header
api.interceptors.request.use((config) => {
  config.headers["X-API-Version"] = "1";
  return config;
});

export default api;