import axios from "axios";
import useReissue from "./useReissue";
import { getCookie, setCookie } from "../cookies/cookie";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getCookie("accessToken")}`;
    // config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    console.log('리퀘스트 인터셉티드');
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
    console.log("리스폰스 인터셉티드 에러");
    console.log(error);
    const originalReq = error.config;
    originalReq.headers["Content-Type"] = "application/json";
    // originalReq.headers['withCredentials'] = 'true';

    if (error.response?.status == 401) {

      const { reissue } = useReissue();
      const res = await reissue();

      const newAccessToken = res.data.accessToken;
      const newRefreshToken = res.data.refreshToken;
      console.log(newAccessToken, newRefreshToken);

      setCookie("accessToken", newAccessToken, { path: "/" });
      setCookie("refreshToken", newRefreshToken, {
        path: "/",
        maxAge: "2600000",
      });

      originalReq.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;

      return instance(originalReq);
    }
    return Promise.reject(error);
  }
);

export default instance;
