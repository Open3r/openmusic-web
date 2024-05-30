import google from "../../assets/imgs/google.svg";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";
import * as S from "./style";
import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "../../cookies/cookie";

const Login = () => {
  const { login, loading, error } = useLogin();
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePw = (e: any) => {
    setPw(e.target.value);
  };

  const submit = async () => {
    try {
      const data = await login(email, pw);
      console.log("Login successful:", data);
      setCookie("accessToken", data.data.accessToken, { path: "/" });
      console.log(checked);
      if (checked) {
        const expires = new Date();
        expires.setDate(expires.getDate() + 30);
        setCookie("refreshToken", data.data.refreshToken, {
          path: "/",
          maxAge: 2600000,
        });
      } else {
        setCookie("refreshToken", data.data.refreshToken, { path: "/" });
      }
      console.log(getCookie("accessToken"));
      console.log(getCookie("refreshToken"));
      navigate("../");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const toggleChecked = () => {
    setChecked(!checked);
  };

  return (
    <S.Canvas>
      <S.LoginWrap>
        <S.InputArea>
          <S.Label htmlFor="email">이메일</S.Label>
          <S.Input
            id="email"
            type="email"
            onChange={handleEmail}
            value={email}
            placeholder="이메일을 입력하세요."
            onKeyDown={(e: any) => {
              if (e.key == "Enter") {
                submit();
              }
            }}
          />
        </S.InputArea>
        <S.InputArea>
          <S.Label htmlFor="pw">비밀번호</S.Label>
          <S.Input
            id="pw"
            type="password"
            onChange={handlePw}
            value={pw}
            placeholder="비밀번호를 입력하세요."
            onKeyDown={(e: any) => {
              if (e.key == "Enter") {
                submit();
              }
            }}
          />
        </S.InputArea>
        <S.ChkArea>
          <S.ChkboxContainer>
            <S.DefaultChkbox
              type="checkbox"
              checked={checked}
              onClick={toggleChecked}
              onChange={toggleChecked}
            />
            <S.CustomChkbox checked={checked} />
          </S.ChkboxContainer>
          <S.ChkLabel>자동로그인</S.ChkLabel>
        </S.ChkArea>
        <S.FindMeWrap>
          <S.FindMeText to={'/signup'}>회원이 아니신가요?</S.FindMeText>
          <S.FindMeText to={'/find'}>비밀번호 찾기</S.FindMeText>
        </S.FindMeWrap>
        <S.Button onClick={submit} disabled={loading}>
          {loading ? "로그인 중..." : "로그인"}
        </S.Button>
        <S.SeperWrap>
          <S.SeperLine></S.SeperLine>
          <S.SeperWord>간편로그인</S.SeperWord>
          <S.SeperLine></S.SeperLine>
        </S.SeperWrap>
        <S.SocialLoginWrap>
          <S.SocialIcon src={google} />
          <S.SocialLogin>구글로 로그인</S.SocialLogin>
        </S.SocialLoginWrap>
        {error}
      </S.LoginWrap>
    </S.Canvas>
  );
};

export default Login;
