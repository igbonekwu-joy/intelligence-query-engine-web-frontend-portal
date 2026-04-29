import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

let csrfToken = null;

// Response interceptor — cache CSRF token from header + handle token refresh
api.interceptors.response.use(
  (response) => {
    const token = response.headers['x-csrf-token'];
    if (token) {
      csrfToken = token; // cache it whenever backend sends it
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/refresh`,
          {},
          { headers: { 'X-API-Version': 1 } } // ← also fixed: headers go as 3rd arg
        );
        return api(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

// Request interceptor — attach cached CSRF token to mutating requests
api.interceptors.request.use((config) => {
  config.headers["X-API-Version"] = "1";
  const mutatingMethods = ["post", "put", "patch", "delete"];
  if (mutatingMethods.includes(config.method) && csrfToken) {
    config.headers["X-CSRF-Token"] = csrfToken;
  }
  return config;
});

export default api;