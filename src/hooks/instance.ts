import axios from "axios";
import useReissue from "./useReissue";
import { getCookie, setCookie } from "../cookies/cookie";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getCookie("accessToken")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error);
    const originalReq = error.config;
    originalReq.headers["Content-Type"] = "application/json";

    if (error.response?.status == 401 && !originalReq._retry) {
      originalReq._retry = true;

      const { reissue } = useReissue();
      const res = await reissue();

      const newAccessToken = res.data.accessToken;
      const newRefreshToken = res.data.refreshToken;

      setCookie("accessToken", newAccessToken, { path: "/" });
      setCookie("refreshToken", newRefreshToken, {
        path: "/",
        maxAge: "2600000",
      });

      return instance(originalReq);
    }
    return Promise.reject(error);
  }
);

export default instance;
