import styled from "@emotion/styled";
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
