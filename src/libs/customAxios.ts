import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getCookie, setCookie } from "../cookies/cookie";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
  },
  withCredentials: true
});

instance.interceptors.request.use(
  async (config) => {
    config.headers["Content-Type"] = "application/json";
    config.headers.Authorization = `Bearer ${getCookie("accessToken")}`;
    return config;
  },
  (error) => {
    console.log('req err:',error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    originalRequest.headers["Content-Type"] = "application/json";
    console.log('res err:',error);
    console.log(originalRequest.headers["Content-Type"]);
    if (
      originalRequest &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = getCookie("refreshToken");
      if (refreshToken) {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/refresh`,
            {
              refreshToken,
            }
          );
          const newAccessToken = response.data.accessToken;
          const newRefreshToken = response.data.refreshToken;

          setCookie("accessToken", newAccessToken, { path: "/" });
          setCookie("refreshToken", newRefreshToken, {
            path: "/",
            maxAge: "2600000",
          });
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          console.log('refreshErr:',refreshError);
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  }
);

export default instance;
