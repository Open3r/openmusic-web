import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 22rem);
  margin-bottom: 10rem

;
  position: relative;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
export const CoverArea = styled.div`
  width:100%;
  height:37rem;
  position:relative;
`
export const CoverImg = styled.img`
  width:100%;
  height:100%;
  object-fit:cover;
  object-position:center;
`
export const Main = styled.div`
  width:100%;
  min-height:calc(100vh - 47rem);
`

export const InfoWrap = styled.div`
  height: 4rem;
  max-width: 70%;
  position: absolute;
  top: 29rem;
  left: 5rem;
  z-index: 9;
`;
export const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: white;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 0 2rem;
  height:100%;
  display:flex;
  justify-content:center;
  align-items:center;
`;
export const PlayBtn = styled.img`
  position: absolute;
  top: 32rem;
  right: 5rem;
  width: 10rem;
  height: 10rem;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    width: 10.5rem;
    height: 10.5rem;
  }
`;

export const PageTitleWrap = styled.div`
  min-height:8rem;
  width:100%;
  padding: 0 5rem;
  box-sizing:border-box;
  box-shadow: 0.1rem 0.1rem 1rem 0.1rem #ccc;
  margin-bottom:1rem;
  border-top:0.1rem solid #F1F1F1;
`
export const Username = styled(Link)`
  text-decoration:none;
  color:black;
  cursor: pointer;
  &:hover {
    text-decoration:underline;
  }
`
export const AlbumDescription = styled.div`
  width:30rem;
  min-height:2rem;
  border-bottom:0.1rem solid #f1f1f1;
  padding:1rem;
  font-size:1.6rem;
`
export const AlbumInfoWrap = styled.div`
  height: 5rem;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const PageTitle = styled.h1`
  font-size:2rem;
`
export const SongCount = styled.h1`
  color:gray;
  font-size:1.7rem;
`

export const SongList = styled.div`
  width:60%;
  min-height:10rem;
  display:flex;
  flex-direction:column;
  margin: 0 auto;
  justify-content:center;
`
export const CreditWrap = styled.div`
  width:60%;
  background-color:#F3F3F3;
  min-height:5rem;
  display:flex;
  flex-direction:column;
  justify-content:center;
  margin:0 auto;
  color:gray;
  padding: 1rem;
  box-sizing:border-box;
  &>span {
    font-size:1.4rem;
    margin-bottom:0.5rem;
  }
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingShadow = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000001;
`;

export const Spinner = styled.div`
  display: inline-block;
  width: 4rem;
  height: 4rem;
  border: 0.3rem solid rgba(195, 195, 195, 0.6);
  border-radius: 50%;
  border-top-color: #636767;
  animation: ${rotate} 1s infinite linear;
`;
