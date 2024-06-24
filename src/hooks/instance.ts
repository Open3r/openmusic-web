import axios, { AxiosError } from "axios";
import { getCookie, setCookie } from "../cookies/cookie";


const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

instance.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${getCookie("accessToken")}`;
    console.log("리퀘스트 인터셉티드");
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
  async (error: AxiosError) => {
    console.log("리스폰스 인터셉티드 에러");
    console.log(error);
    const originalReq = error.config!;
    originalReq.headers["Content-Type"] = "application/json";
    const refreshToken = getCookie("refreshToken");
    try {
      console.log("재발급 시도");
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/reissue`,
        { refreshToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const newAccessToken = res.data.accessToken;
      const newRefreshToken = res.data.refreshToken;

      console.log(newAccessToken, newRefreshToken);

      setCookie("accessToken", newAccessToken, { path: "/" });
      setCookie("refreshToken", newRefreshToken, {
        path: "/",
        maxAge: "2600000",
      });
      originalReq.headers.Authorization = `Bearer ${getCookie("accessToken")}`;
      return instance(originalReq);
    } catch (error) {
      console.log(error, "안녕하세요");
    }
    return Promise.reject(error);
  }
);

export default instance;
