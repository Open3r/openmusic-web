import styled from "@emotion/styled";
import { Link } from "react-router-dom";
export const Container = styled.div`
  width:30rem;
  height:100vh;
  background-color:white;
  position: fixed;
  bottom:0;
  left:-30rem;
  z-index: 999999;
  transition: all 0.5s ease-in-out;
  box-sizing:border-box;
  display:inline;
`
export const MenuOnBtn = styled.div `
  width:0.7rem;
  height:12rem;
  border-radius:3rem;
  background-color:#52A9F9;
  position:fixed;
  top:calc(50% - 8rem);
  left: 0.5rem;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  &:active{
    width: 0.5rem;
    height:11rem;
  }
`
export const shadow = styled.div`
  width:100vw;
  height:100vh;
  background-color:rgba(0,0,0,0.1);
  position:fixed;
  z-index:99999;
  top:0;
  right:0;
  display:none;
  transition:all 0.5s;
`

export const ProfileWrap = styled.div`
  width:100%;
  height:13rem;
  display:flex;
  align-items:center;
  padding: 1rem 2rem;
  box-sizing:border-box;
  border-bottom:0.1rem solid #ccc;
`
export const Avatar = styled.img`
  width:9rem;
  height:9rem;
  border-radius:50%;
  object-fit:cover;
  object-position:center;
  border: 0.1rem solid #ccc;
`

export const Nickname = styled.p`
  font-size:2rem;
  margin-left:2rem;
`

export const Menu = styled(Link)`
  width:100%;
  height:6rem;
  border-bottom: 0.1rem solid #F1F1F1;
  display:flex;
  align-items:center;
  box-sizing:border-box;
  color:black;
  text-decoration:none;
  font-size:1.7rem;
  padding:0 1rem;
  transition: all 0.5s;
  &:hover {
    background-color:#F1F1F1;
  }
  &>img{
    width:3rem;
    height:3rem;
    margin-right:1rem;
  }
`

export const LogOut = styled.div`
  width: 100%;
  height: 6rem;
  border-bottom: 0.1rem solid #f1f1f1;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  color: red;
  text-decoration: none;
  font-size: 1.7rem;
  padding: 0 1rem;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    background-color: #f1f1f1;
  }
`;