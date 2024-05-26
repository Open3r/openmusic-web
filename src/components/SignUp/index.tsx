import { useState } from "react";
import google from "../../assets/imgs/google.svg";
import useSignUp from "../../hooks/useSignUp";
import * as SS from "./style";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

  const { signUp, loading, error } = useSignUp();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [nickname, setNickname] = useState('');
  const [pwChk, setPwChk] = useState('');
  const navigate = useNavigate();



  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };

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
    if((email!=''&&nickname!=''&&pw!=''&&pwChk!='')&&pwChk==pw){
      try {
        const data = await signUp(nickname, email, pw);
        console.log("SignUp successful:", data);
        navigate('/login');
      } catch (err) {
        console.error("SignUp failed:", err);
      }
    }else{
      alert('확인좀');
    }
  };


  return (
    <SS.LoginWrap>
      <SS.InputArea>
        <SS.Label htmlFor="email">이메일</SS.Label>
        <SS.Input
          id="email"
          type="email"
          onChange={handleEmail}
          value={email}
          placeholder="이메일을 입력하세요."
          onKeyDown={(e:any)=>{
            if(e.key == 'Enter'){
              submit();
            }
          }}
        />
      </SS.InputArea>
      <SS.InputArea>
        <SS.Label htmlFor="name">닉네임</SS.Label>
        <SS.Input
          id="name"
          type="text"
          onChange={handleNickname}
          value={nickname}
          placeholder="닉네임을 입력하세요."
          onKeyDown={(e:any)=>{
            if(e.key == 'Enter'){
              submit();
            }
          }}
        />
      </SS.InputArea>
      <SS.InputArea>
        <SS.Label htmlFor="pw">비밀번호</SS.Label>
        <SS.Input
          id="pw"
          type="password"
          onChange={handlePw}
          value={pw}
          placeholder="비밀번호를 입력하세요."
          onKeyDown={(e:any)=>{
            if(e.key == 'Enter'){
              submit();
            }
          }}
        />
      </SS.InputArea>
      <SS.InputArea>
        <SS.Label htmlFor="pw">비밀번호확인</SS.Label>
        <SS.Input
          id="pwChk"
          type="password"
          onChange={handlePwChk}
          value={pwChk}
          placeholder="비밀번호를 한번 더 입력하세요."
          onKeyDown={(e:any)=>{
            if(e.key == 'Enter'){
              submit();
            }
          }}
        />
      </SS.InputArea>
      <SS.FindMeWrap>
        <SS.FindMeText to="/terms">개인정보 처리방침</SS.FindMeText>
        <SS.FindMeText to="/login">회원이신가요?</SS.FindMeText>
      </SS.FindMeWrap>
      <SS.Button onClick={submit} disabled={loading}>{loading ? '회원가입 중...':'회원가입'}</SS.Button>
      <SS.SeperWrap>
        <SS.SeperLine></SS.SeperLine>
        <SS.SeperWord>간편회원가입</SS.SeperWord>
        <SS.SeperLine></SS.SeperLine>
      </SS.SeperWrap>
      <SS.SocialLoginWrap>
        <SS.SocialIcon src={google} />
        <SS.SocialLogin>구글로 로그인</SS.SocialLogin>
      </SS.SocialLoginWrap>
      {error}
    </SS.LoginWrap>
  );
};

export default SignUp;
