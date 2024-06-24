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
  (error: AxiosError) => {
    const originalReq = error.config!;
    originalReq.headers["Content-Type"] = "application/json";
    const refreshToken = getCookie("refreshToken");
    try {
      axios.post(
        `${import.meta.env.VITE_API_URL}/auth/reissue`,{ refreshToken }
      ).then((response)=>{
        const newAccessToken = response.data.data.accessToken;
        const newRefreshToken = response.data.data.refreshToken;

        setCookie("accessToken", newAccessToken, { path: "/" });
        setCookie("refreshToken", newRefreshToken, {
          path: "/",
          maxAge: "2600000",
        });
        originalReq.headers.Authorization = `Bearer ${getCookie(
          "accessToken"
        )}`;
        return instance(originalReq);
      }).catch((err)=>{
        console.log(err);
      });
      
    } catch (error) {
      console.log(error);
    }
    return Promise.reject(error);
  }
);

export default instance;
