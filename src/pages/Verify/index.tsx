/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as S from "./style";
import { css } from "@emotion/react";
import { SignUpInfoStore } from "../../stores/signUpInfoStore";
import { useNavigate } from "react-router-dom";
import useSignUp from "../../hooks/useSignUp";

const Verify = () => {
  const [code, setCode] = useState("");
  const email = SignUpInfoStore(state=>(state.email));
  const pw = SignUpInfoStore((state) => state.pw);
  const nickname = SignUpInfoStore((state) => state.nickname);
  const navigate = useNavigate();
  const { signUp } = useSignUp();

  useEffect(()=>{
    if(email.length > 0 && pw.length > 0 && nickname.length > 0) {
      //code
    }else{
      navigate('/signup');
    }
  },[email,pw,nickname]);

  const submit = () => {
    try {
      const data = signUp(nickname,email,pw,code);
      console.log(data);
      navigate('/login');
    }catch (err) {
      console.log(err)
    }
  }

  const moveInput = (e: any, nextFocus: any, prevFocus: any) => {
    console.log(e.key);
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
    if ("1234567890".includes(e.key) || e.key == "Backspace") {
      if (e.key != "Backspace" && e.target.value.length == 1) {
        document.getElementById(nextFocus)?.focus();
      } else if (e.key == "Backspace" && e.target.value.length == 0) {
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

  useEffect(() => {
    console.log(code);
  }, [code]);

  const hover = css`
    &:hover {
      text-decoration: underline;
    }
  `;

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
          <S.CodeBtn>3:00후 만료</S.CodeBtn>
        </S.CodeBtnWrap>
        <S.CodeBtnWrap>
          <S.CodeBtn css={hover}>재발급</S.CodeBtn>
        </S.CodeBtnWrap>
        <button onClick={submit}>회원가입</button>
      </S.VerifyWrap>
    </S.Canvas>
  );
};

export default Verify;
