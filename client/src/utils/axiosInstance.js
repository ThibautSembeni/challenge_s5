import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      error.config.url !== "/token/refresh"
    ) {
      originalRequest._retry = true;

      try {
        if (localStorage.getItem("refresh_token")) {
          const tokenRefreshResponse = await api
            .post("/token/refresh", {
              refresh_token: localStorage.getItem("refresh_token"),
            })
            .then((res) => {
              localStorage.setItem("access_token", res.data.token);
              localStorage.setItem("refresh_token", res.data.refresh_token);
            });

          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
export default api;
