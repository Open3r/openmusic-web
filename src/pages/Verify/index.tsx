/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as S from "./style";
import { css } from "@emotion/react";
import { SignUpInfoStore } from "../../stores/signUpInfoStore";
import { useNavigate } from "react-router-dom";
import useSignUp from "../../hooks/useSignUp";
import NotificationService from "../../libs/notification/NotificationService";
import useVerify from "../../hooks/useVerify";
import { getCookie } from "../../libs/cookies/cookie";

const Verify = () => {
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(180);
  const email = SignUpInfoStore((state) => state.email);
  const pw = SignUpInfoStore((state) => state.pw);
  const nickname = SignUpInfoStore((state) => state.nickname);
  const clear = SignUpInfoStore((state) => state.clear);
  const navigate = useNavigate();
  const { signUp, loading } = useSignUp();
  const { verify } = useVerify();

  useEffect(() => {
    if (getCookie("accessToken")) {
      navigate("/");
    }
    if (email === "") {
      navigate("/signup");
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      NotificationService.error("시간이 만료되었습니다.");
      clear();
      navigate("/signup");
    }
  }, [timeLeft, navigate]);

  const extendExpire = async () => {
    try {
      const data = await verify(email);
      if (data.status === 201) {
        setTimeLeft(180);
        NotificationService.success("시간이 연장되었습니다.");
      }
    } catch (err: any) {
      NotificationService.error("네트워크 에러");
    }
  };

  const submit = async () => {
    try {
      const data = await signUp(nickname, email, pw, code);
      if (data.status === 201) {
        NotificationService.success("회원가입 성공");
        clear();
        navigate("/login");
      }
    } catch (err: any) {
      if (err.code === "ERR_NETWORK") {
        NotificationService.error("네트워크 에러");
      }
      if (err.response.data.code === "INVALID_EMAIL_CODE") {
        NotificationService.error("잘못된 이메일 인증 코드 입니다.");
      } else {
        NotificationService.error("네트워크 에러");
      }
    }
  };

  const moveInput = (e: any, nextFocus: any, prevFocus: any) => {
    let digitOne = document.getElementById("code1") as HTMLInputElement;
    let digitTwo = document.getElementById("code2") as HTMLInputElement;
    let digitThree = document.getElementById("code3") as HTMLInputElement;
    let digitFour = document.getElementById("code4") as HTMLInputElement;
    let digitFive = document.getElementById("code5") as HTMLInputElement;
    let digitSix = document.getElementById("code6") as HTMLInputElement;
    setCode(
      digitOne.value +
        digitTwo.value +
        digitThree.value +
        digitFour.value +
        digitFive.value +
        digitSix.value
    );
    if ("1234567890".includes(e.key) || e.key === "Backspace") {
      if (e.key !== "Backspace" && e.target.value.length === 1) {
        document.getElementById(nextFocus)?.focus();
      } else if (e.key === "Backspace" && e.target.value.length === 0) {
        document.getElementById(prevFocus)?.focus();
      }
    } else {
    }
  };

  document.querySelectorAll(".codeInput").forEach((input) => {
    input.addEventListener("paste", (e: any) => {
      let paste = e.clipboardData.getData("text");
      paste = paste.substr(0, 6);
      setCode(paste);
      document.querySelectorAll(".codeInput").forEach((inputBox, idx) => {
        const target = inputBox as HTMLInputElement;
        target.value = paste[idx];
      });
    });
  });

  const hover = css`
    &:hover {
      text-decoration: underline;
    }
  `;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }`;
  };

  return (
    <S.Canvas>
      <S.VerifyWrap>
        <S.Title>이메일 인증을 진행해주세요</S.Title>
        <S.CodeInputWrap>
          <S.CodeInput
            type="text"
            maxLength={1}
            id="code1"
            className="codeInput"
            onKeyDown={(e: any) => {
              moveInput(e, "code2", "");
            }}
          />
          <S.CodeInput
            type="text"
            maxLength={1}
            id="code2"
            className="codeInput"
            onKeyDown={(e: any) => {
              moveInput(e, "code3", "code1");
            }}
          />
          <S.CodeInput
            type="text"
            maxLength={1}
            id="code3"
            className="codeInput"
            onKeyDown={(e: any) => {
              moveInput(e, "code4", "code2");
            }}
          />
          <S.CodeInput
            type="text"
            maxLength={1}
            id="code4"
            className="codeInput"
            onKeyDown={(e: any) => {
              moveInput(e, "code5", "code3");
            }}
          />
          <S.CodeInput
            type="text"
            maxLength={1}
            id="code5"
            className="codeInput"
            onKeyDown={(e: any) => {
              moveInput(e, "code6", "code4");
            }}
          />
          <S.CodeInput
            type="text"
            maxLength={1}
            id="code6"
            className="codeInput"
            onKeyDown={(e: any) => {
              moveInput(e, "", "code5");
            }}
          />
        </S.CodeInputWrap>
        <S.CodeBtnWrap>
          <S.CodeBtn>{formatTime(timeLeft)} 후 만료</S.CodeBtn>
        </S.CodeBtnWrap>
        <S.CodeBtnWrap>
          <S.CodeBtn css={hover} onClick={extendExpire}>
            시간연장
          </S.CodeBtn>
        </S.CodeBtnWrap>
        <S.SignupBtn onClick={submit} disabled={loading}>
          {loading ? "회원가입중..." : "회원가입"}
        </S.SignupBtn>
      </S.VerifyWrap>
    </S.Canvas>
  );
};

export default Verify;
