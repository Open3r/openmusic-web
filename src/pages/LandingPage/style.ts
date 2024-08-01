import styled from "@emotion/styled";
import { Link } from "react-router-dom";


export const Container = styled.div<{ bg: string }>`
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  background: url(${(props) => props.bg}) no-repeat center;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
`;

export const First = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  padding: 10rem;
  color: #f1f1f1;
  font-size: 3rem;
  font-weight: bold;
  overflow: hidden;
  position: relative;
  scroll-snap-align: start;
`;

export const MobileMockUp = styled.img`
  position: absolute;
  right: 35rem;
  bottom: -20rem;
  z-index: 999;
  opacity: 0;
  transform: translateY(100px);
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Second = styled.div`
  background-color: #52a9f9;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 5rem;
  color: white;
  font-size: 5rem;
  font-weight: bold;
  scroll-snap-align: start;
  position: relative;
  overflow-y:scroll;
`;

export const Third = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
  box-sizing: border-box;
  padding: 10rem;
  color: #f1f1f1;
  font-size: 3rem;
  font-weight: bold;
  scroll-snap-align: start;
  font-size:5rem;
`;

export const navigateWrap = styled.div`
  width:30rem;
  height:5rem;
  display:flex;
  justify-content:space-around;
  align-items:center;
  border-top:0.1rem solid #ccc;
  margin-top:1rem;
`
export const Navigate = styled(Link)`
  font-size:2rem;
  text-decoration:none;
  color:#F1F1F1;
  cursor: pointer;
`

export const Header = styled.div`
  width:100%;
  height:5rem;
  display:flex;
  justify-content:space-between;
  align-items:center;
  position:fixed;
  top:0;
  left:0;
  background-color:rgba(0,0,0,0.2);
  z-index:999;
  padding: 0 2rem;
  box-sizing:border-box;
`
export const H1 = styled.h1`
  font-size:3rem;
  color:#52a9f9;
  display:flex;
  align-items:center;
`

export const HeaderButtonWrap = styled.div`
  width:20rem;
  height:100%;
  display:flex;
  align-items:center;
  justify-content:space-between;
`

export const HeaderLogin = styled(Link)`
  background:none;
  border:0.1rem #52a9f9 solid;
  outline:none;
  font-size:1.5rem;
  padding: 0.7rem 2rem;
  text-decoration:none;
  color:#52a9f9;
`

export const HeaderSignIn = styled(Link)`
  background: none;
  border: 0.1rem #CCC solid;
  outline: none;
  font-size: 1.5rem;
  padding: 0.7rem 2rem;
  text-decoration: none;
  color: #CCC;
`;