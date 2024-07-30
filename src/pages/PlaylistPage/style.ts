import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 22rem);
  margin-bottom: 10rem;
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
  height:5rem;
  max-width:70%;
  position:absolute;
  top:29rem;
  left:5rem;
  z-index:9;
`
export const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: white;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 0 2rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const PlayBtn = styled.img`
  position: absolute;
  top:32rem;
  right:5rem;
  width: 10rem;
  height: 10rem;
  background-color: white;
  border-radius: 50%;
  display:flex;
  justify-content:center;
  align-items:center;
  cursor: pointer;
  transition: all 0.5s;
  &:hover{
    width:10.5rem;
    height:10.5rem;
  }
`;

export const PageTitleWrap = styled.div`
  height:8rem;
  width:100%;
  display:flex;
  align-items:center;
  padding: 0 5rem;
  box-sizing:border-box;
  box-shadow: 0.1rem 0.1rem 1rem 0.1rem #ccc;
  margin-bottom:1rem;
  border-top:0.1rem solid #f1f1f1;
`
export const Username = styled(Link)`
  text-decoration: none;
  color: black;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
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
export const PlaylistSongWrap = styled.div`
  width:100%;
  height:10rem;
  display:flex;
  justify-content:space-between;
  align-items:center;
`
export const DeleteSong = styled.div`
  width:5rem;
  height:10rem;
  border-bottom:0.1rem solid #ccc;
  display:flex;
  justify-content:center;
  align-items:center;
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

export const CreatModalWrap = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000001;
  top: 0;
  left: 0;
`;

export const Modal = styled.div`
  width: 35rem;
  height: 45rem;
  background-color: #f5f5f5;
  padding: 1rem;
  box-sizing: border-box;
`;

export const ModalTitle = styled.h1`
  font-size: 2rem;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const PlaylistCoverWrap = styled.div`
  width: 100%;
  height: 25rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const PlaylistInputWrap = styled.div`
  width: 100%;
  height: 10rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const PlaylistTitle = styled.input`
  width: 70%;
  font-size: 1.7rem;
  border: none;
  outline: none;
  border-bottom: 0.1rem solid black;
  padding: 1rem;
  background-color: transparent;
`;
export const PlaylistScope = styled.select`
  width: 20%;
  border: none;
  outline: none;
  padding: 0.5rem;
  background-color: #ccc;
  border-radius: 1rem;
`;

export const PlaylistBtnWrap = styled.div`
  width: 100%;
`;
export const PlaylistBtn = styled.button`
  font-size: 2rem;
  background-color: #52a9f9;
  padding: 1rem 1rem;
  color: white;
  border-radius: 1rem;
  min-width: 10rem;
  text-align: center;
  cursor: pointer;
  align-self: flex-end;
  border: none;
  outline: none;
  &:active {
    background-color: #558bbd;
  }
  &:disabled {
    background-color: #558bbd;
  }
`;
export const PlaylistDeleteBtn = styled.button`
  font-size: 2rem;
  background-color: #ff3b30;
  padding: 1rem 1rem;
  color: white;
  border-radius: 1rem;
  min-width: 10rem;
  text-align: center;
  cursor: pointer;
  align-self: flex-end;
  border: none;
  outline: none;
  &:active {
    background-color: #ff1b00;
  }
  &:disabled {
    background-color: #ff1b00;
  }
`;

export const PlaylistCoverInput = styled.div<{ $playlistCover: string }>`
  background: url(${(props) => props.$playlistCover}) center no-repeat;
  background-size: cover;
  width: 20rem;
  height: 20rem;
  border-radius: 3rem;
  cursor: pointer;

  & > input {
    display: none;
  }
  margin-bottom: 2rem;
`;