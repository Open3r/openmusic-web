import { useNavigate, useSearchParams } from "react-router-dom";
import * as S from "./style";
import { useEffect } from "react";
import instance from "../../../libs/axios/customAxios";
import { setCookie } from "../../../libs/cookies/cookie";
import { AxiosError } from "axios";
import NotificationService from "../../../libs/notification/NotificationService";

export const GoogleCallback = () => {
  const [searchParam] = useSearchParams();
  const navigate = useNavigate();

  const oauth = async () => {
    const code = searchParam.get("code");
    if (!code) {
      NotificationService.error("토큰에러");
      navigate("/login");
      return;
    }
    console.log(code);
    try {
      const response = await instance.get("/auth/google", { params: { code } });
      setCookie("accessToken", response.data.data.accessToken, { path: "/" });
      setCookie("refreshToken", response.data.data.refreshToken, { path: "/" });
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const status = error.response.status;
        if (status === 400) {
          NotificationService.error("잘못된 토큰 입니다.");
        } else {
          NotificationService.error(
            "네트워크 에러"
          );
        }
        navigate("/login");
      } else {
        NotificationService.error(
          "네트워크 에러"
        );
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    oauth();
  }, []); 

  return (
    <S.LoadingShadow>
      <S.Spinner />
      <h1 style={{ marginTop: "1rem", color: "#ccc" }}>로딩중...</h1>
    </S.LoadingShadow>
  );
};
