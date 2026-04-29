import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, 
});

// attach API version header
api.interceptors.request.use((config) => {
  config.headers["X-API-Version"] = "1";
  return config;
});

// get refresh token
api.interceptors.response.use((response) => response, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/refresh`,
          { headers: 
              { 'X-API-Version': 1 }
          }
      );

      return api(originalRequest);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  return Promise.reject(error);
});

export default api;