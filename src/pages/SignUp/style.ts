import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Canvas = styled.div`
  width:100vw;
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
`

const LoginWrap = styled.div`
  width:50rem;
  height:65rem;
  display:flex;
  background-color:transparent;
  backdrop-filter:blur(2rem);
  flex-direction:column;
  align-items:center;
  justify-content:center;
  border-radius:1rem;
`
const InputArea = styled.div`
  width: 90%;
  height:10rem;
  display:flex;
  flex-direction:column;
`
const Input = styled.input`
  width: 100%;
  font-size: 2rem;
  outline: none;
  margin: 0;
  padding: 1rem 0.5rem;
  border: 0.1rem solid #ccc;
  border-radius: 0.5rem;
  box-sizing: border-box;
  background-color: transparent;
  color: black;
  &::placeholder {
    color: lightgray;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: black;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
    transition: background-color 5000s ease-in-out 0s;
  }
`;
const Label = styled.label`
  font-size:2.5rem;
  margin:0;
  color:black;
`
const WarningWrap = styled.div`
  width:100%;
  height: 2rem;
  font-size:1rem;
  color:red;
  padding: 0 0.5rem;
  display:flex;
  align-items:center;
`
const Button = styled.button`
  width:90%;
  font-size:2rem;
  padding:1rem;
  background-color:#52A9F9;
  color:white;
  border:none;
  outline:none;
  cursor:pointer;
  border-radius:0.5rem;
  &:active{
    background-color:#558bbd;
  }
  &:disabled{
    background-color:#558bbd;
    color:#ccc;
  }
`

const SeperWrap = styled.div`
  width:90%;
  height: 3rem;
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-top:1rem;
`
const SeperLine = styled.div`
  width:40%;
  height:0.1rem;
  background-color:gray;
`
const SeperWord = styled.span`
  font-size:1.5rem;
  color:gray;
  left:calc(50% - 5rem);
  top:-1rem;
  text-align:center;
`
const FindMeWrap = styled.div`
  width:90%;
  height:3rem;
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:1rem;
`
const FindMeText = styled(Link)`
  font-size:1.3rem;
  color:gray;
  text-decoration:none;
  cursor:pointer;
  &:hover{
    text-decoration:underline;
  }
`


export {
  Canvas,
  LoginWrap,
  InputArea,
  Input,
  Label,
  WarningWrap,
  Button,
  SeperWrap,
  SeperLine,
  SeperWord,
  FindMeWrap,
  FindMeText
}