import google from "../../assets/imgs/google.svg";
import { useEffect, useState } from "react";
import useLogin from "../../hooks/useLogin";
import * as S from "./style";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../cookies/cookie";
import NotificationService from "../../components/Notification/NotificationService";

const Login = () => {
  const { login, loading } = useLogin();
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

  useEffect(()=>{
    if (email.length > 0) {
      let warnMessage = document.getElementById("warnEmail") as HTMLDivElement;
      warnMessage.innerHTML = "";
    }
    if (pw.length > 0) {
      let warnMessage = document.getElementById("warnPw") as HTMLDivElement;
      warnMessage.innerHTML = "";
    }
  },[email,pw])

  const submit = async () => {
    if (email.length > 0 && pw.length > 0) {
      try {
        const data = await login(email, pw);
        if (data.status == 200) {
          console.log("Login successful:", data);
          setCookie("accessToken", data.data.accessToken, { path: "/" });
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
          NotificationService.success('로그인 성공');
          navigate("/");
        } else {
          NotificationService.error("이메일 또는 비밀번호를 확인해주세요.");
        }
      } catch (err) {
        NotificationService.error("네트워크 에러");
      }

    }else{
      if(email.length <= 0) {
        let warnMessage = document.getElementById("warnEmail") as HTMLDivElement;
        warnMessage.innerHTML = '이메일을 입력해주세요.';
      }
      if (pw.length <= 0) {
        let warnMessage = document.getElementById("warnPw") as HTMLDivElement;
        warnMessage.innerHTML = "비밀번호를 입력해주세요.";
      }
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
          <S.WarningWrap id="warnEmail"></S.WarningWrap>
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
          <S.WarningWrap id="warnPw"></S.WarningWrap>
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
          <S.FindMeText to={"/signup"}>회원이 아니신가요?</S.FindMeText>
          <S.FindMeText to={"/find"}>비밀번호 찾기</S.FindMeText>
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
      </S.LoginWrap>
    </S.Canvas>
  );
};

export default Login;
