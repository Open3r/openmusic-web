import styled from "@emotion/styled";

export const Canvas = styled.div`
  width:100vw;
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
`

export const VerifyWrap = styled.div`
  width: 100rem;
  height: 50rem;
  background-color: rgba(82, 169, 249,0.3);
  box-sizing: border-box;
  border-top: 0.5rem solid #52A9F9;
  display: flex;
  align-items: center;
  flex-direction: column;
`
export const Title = styled.h1`
  font-size: 3rem;
  margin: 1.5rem 0;
`
export const CodeInputWrap = styled.div`
  width: 60rem;
  margin-top:10rem;
  height: 9rem;
  display:flex;
  justify-content:space-evenly;
  align-items:center;
`
export const CodeInput = styled.input`
  width: 7rem;
  height: 7rem;
  outline: none;
  border: 0.1rem solid #ccc;
  font-size: 5rem;
  border-radius: 1rem;
  text-align:center;
`
export const CodeBtnWrap = styled.div`
  width:60rem;
  height:3rem;
  display:flex;
  align-items:center;
  justify-content:center;
`
export const CodeBtn = styled.p`
  color:gray;
  margin:0;
  font-size:2rem;
`

export const SignupBtn = styled.button`
  font-size:2rem;
  padding: 1rem 5rem;
  background-color: #52A9F9;
  border-radius:2rem;
  color:white;
  border: none;
  outline:none;
  box-shadow: 0.3rem 0.3rem 1rem 0.3rem #ccc;
  margin-top:10rem;
  &:active{
    box-shadow:none;
    background-color:#558bbd;
  }
  &:disabled{
    box-shadow:none;
    background-color:#558bbd;
    color:#ccc;
  }
`