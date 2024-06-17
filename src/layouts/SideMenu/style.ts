import styled from "@emotion/styled";

export const Container = styled.div`
  width:0rem;
  height:calc(100% - 10rem);
  background-color:white;
  border-left:0.1rem solid #ccc;
  position: fixed;
  bottom:10rem;
  right:0;
  z-index: 999999;
  transition: all 0.5s;
`
export const MenuOnBtn = styled.div `
  width:0.7rem;
  height:10rem;
  border-radius:3rem;
  background-color:#ccc;
  position:fixed;
  top:calc(50% - 5rem);
  right: 0.5rem;
  cursor: pointer;
  transition: all 0.5s;
  &:active{
    width:0.5rem;
    height:9rem;
  }
`