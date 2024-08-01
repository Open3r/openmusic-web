import { useState, useEffect } from "react";
import * as SS from "./style";
import { SignUpInfoStore } from "../../stores/signUpInfoStore";
import { useNavigate } from "react-router-dom";
import useVerify from "../../hooks/useVerify";
import NotificationService from "../../libs/notification/NotificationService";
import { getCookie, removeCookie } from "../../libs/cookies/cookie";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [nickname, setNickname] = useState("");
  const [pwChk, setPwChk] = useState("");
  const navigate = useNavigate();

  const storeEmail = SignUpInfoStore((state) => state.storeEmail);
  const storePw = SignUpInfoStore((state) => state.storePw);
  const storeNickname = SignUpInfoStore((state) => state.storeNickname);

  const { verify, loading } = useVerify();
  
  const accessToken = getCookie('accessToken');

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };

  useEffect(()=>{
    if(accessToken){
      removeCookie('accessToken');
      removeCookie('refreshToken');
    }
  },[]);

  useEffect(() => {
    const validateInput = (
      regex: RegExp | null,
      input: string,
      warnMessageElement: HTMLDivElement,
      warnMessage: string,
      lengthCheck: boolean = false,
      minLength: number = 0,
      matchInput: string = ""
    ) => {
      if (lengthCheck && input.length > 0 && input.length < minLength) {
        warnMessageElement.innerHTML = warnMessage;
      } else if (regex && !regex.test(input) && input.length > 0) {
        warnMessageElement.innerHTML = warnMessage;
      } else if (matchInput && input !== matchInput && input.length > 0) {
        warnMessageElement.innerHTML = warnMessage;
      } else {
        warnMessageElement.innerHTML = "";
      }
    };

    const emailRegex =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{1,}$/i;
    let emailWarnMessage = document.getElementById(
      "warnEmail"
    ) as HTMLDivElement;
    validateInput(
      emailRegex,
      email,
      emailWarnMessage,
      "이메일 형식이 올바르지 않습니다."
    );

    let nicknameWarnMessage = document.getElementById(
      "warnNickname"
    ) as HTMLDivElement;
    validateInput(
      null,
      nickname,
      nicknameWarnMessage,
      "4글자 이상 입력해주세요.",
      true,
      4
    );

    const pwRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    let pwWarnMessage = document.getElementById("warnPw") as HTMLDivElement;
    validateInput(
      pwRegex,
      pw,
      pwWarnMessage,
      "영문, 숫자, 특수문자를 포함해 8자 이상 입력해주세요."
    );

    let pwChkWarnMessage = document.getElementById(
      "warnPwChk"
    ) as HTMLDivElement;
    validateInput(
      null,
      pwChk,
      pwChkWarnMessage,
      "비밀번호가 틀립니다.",
      false,
      0,
      pw
    );
  }, [email, pw, pwChk, nickname]);

  const handlePw = (e: any) => {
    setPw(e.target.value);
  };
  const handleNickname = (e: any) => {
    setNickname(e.target.value);
  };

  const handlePwChk = (e: any) => {
    setPwChk(e.target.value);
  };

  const submit = async () => {
    if (
      email != "" &&
      nickname != "" &&
      pw != "" &&
      pwChk != "" &&
      pwChk == pw
    ) {
      storeEmail(email);
      storePw(pw);
      storeNickname(nickname);
      try {
        const data = await verify(email);
        if (data.status == 200) {
          navigate("/verify");
        }
      } catch (err: any) {
        if (err.code == "ERR_NETWORK") {
          NotificationService.error("네트워크 에러");
        }
        if (err.response.data.status == 400) {
          NotificationService.error("이미 가입된 이메일 입니다.");
        } else {
          NotificationService.error("네트워크 에러");
        }
      }
    } else {
      NotificationService.error("모든 입력 필드를 채워주세요.");
    }
  };

  const googleLogin = async () => {
    const redirectUri = encodeURIComponent(
      `${import.meta.env.VITE_WEB_URL}/callback/google`
    );

    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=342167564331-ac40i5tr38b3v3ete4hd4kq69u41hcdf.apps.googleusercontent.com&redirect_uri=${redirectUri}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;
  };

  return (
    <SS.Canvas>
      <SS.LoginWrap>
        <SS.InputArea>
          <SS.Label htmlFor="email">이메일</SS.Label>
          <SS.Input
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
          <SS.WarningWrap id="warnEmail">이메일을 입력해주세요.</SS.WarningWrap>
        </SS.InputArea>
        <SS.InputArea>
          <SS.Label htmlFor="name">닉네임</SS.Label>
          <SS.Input
            id="name"
            type="text"
            onChange={handleNickname}
            value={nickname}
            placeholder="닉네임을 입력하세요."
            onKeyDown={(e: any) => {
              if (e.key == "Enter") {
                submit();
              }
            }}
          />
          <SS.WarningWrap id="warnNickname">
            닉네임을 입력해주세요.
          </SS.WarningWrap>
        </SS.InputArea>
        <SS.InputArea>
          <SS.Label htmlFor="pw">비밀번호</SS.Label>
          <SS.Input
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
          <SS.WarningWrap id="warnPw">비밀번호를 입력해주세요.</SS.WarningWrap>
        </SS.InputArea>
        <SS.InputArea>
          <SS.Label htmlFor="pw">비밀번호확인</SS.Label>
          <SS.Input
            id="pwChk"
            type="password"
            onChange={handlePwChk}
            value={pwChk}
            placeholder="비밀번호를 한번 더 입력하세요."
            onKeyDown={(e: any) => {
              if (e.key == "Enter") {
                submit();
              }
            }}
          />
          <SS.WarningWrap id="warnPwChk">
            비밀번호가 일치하지 않습니다.
          </SS.WarningWrap>
        </SS.InputArea>
        <SS.FindMeWrap>
          <SS.FindMeText
            to="https://copper-wedge-be0.notion.site/Openmusic-481b7ce9c03443e9ab28c34a12f66b4e"
            target="blank"
          >
            개인정보 처리방침
          </SS.FindMeText>
          <SS.FindMeText to="/login">회원이신가요?</SS.FindMeText>
        </SS.FindMeWrap>
        <SS.Button onClick={submit} disabled={loading}>
          {loading ? "회원가입 중..." : "회원가입"}
        </SS.Button>
        <SS.SeperWrap>
          <SS.SeperLine></SS.SeperLine>
          <SS.SeperWord>간편회원가입</SS.SeperWord>
          <SS.SeperLine></SS.SeperLine>
        </SS.SeperWrap>
        <div
          style={{
            width: "90%",
            height: "4rem",
            borderRadius: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "0.1rem solid #ccc",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
          onClick={googleLogin}
        >
          <img
            src="/assets/imgs/google.svg"
            style={{
              width: "2rem",
              height: "2rem",
              marginRight: "1rem",
              boxSizing: "border-box",
            }}
            alt=""
          />
          구글로그인
        </div>
      </SS.LoginWrap>
    </SS.Canvas>
  );
};

export default SignUp;
