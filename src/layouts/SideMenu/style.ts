import styled from "@emotion/styled";

export const Container = styled.div`
  width:30rem;
  height:calc(100% - 10rem);
  background-color:white;
  position: fixed;
  bottom:10rem;
  left:-30rem;
  z-index: 999999;
  transition: all 0.5s;
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
  transition: all 0.5s;
  &:active{
    width: 0.5rem;
    height:11rem;
  }
`
export const shadow = styled.div`
  width:100%;
  height:calc(100% - 10rem);
  background-color:rgba(0,0,0,0.1);
  position:fixed;
  z-index:99999;
  right:0;
  top:0;
  display:none;
  transition:all 0.5s;
`
