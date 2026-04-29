import axios from "axios";

const getCsrfToken = () => {
  const match = document.cookie.match(/(^|;)\s*csrf_token=([^;]+)/);
  console.log(document.cookie);
  return match ? decodeURIComponent(match[2]) : null;
};

console.log(getCsrfToken());

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, 
});

// attach API version header
api.interceptors.request.use((config) => {
  config.headers["X-API-Version"] = "1";
  const mutatingMethods = ['post', 'put', 'patch', 'delete'];
  if (mutatingMethods.includes(config.method)) {
    const token = getCsrfToken();
    if (token) {
      config.headers['X-CSRF-Token'] = token;
    }
  }

  return config;
});

// get refresh token
api.interceptors.response.use((response) => response, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry && !originalRequest.url.includes("/auth/refresh")) {
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
