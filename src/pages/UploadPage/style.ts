import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";


export const Canvas = styled.div`
  width: 100%;
  height: calc(100vh - 22rem);
  margin-top: 12rem;
  display: flex;
  align-items:center;
  justify-content:space-evenly;
  box-sizing: border-box;
  padding: 0 10rem;
`;

export const SongInfoWrap = styled.div`
  width: 30rem;
  height: 100%;
  box-sizing: border-box;
  padding-top: 3rem;
  display:flex;
  flex-direction:column;
`;

export const AlbumCoverInput = styled.div<{ $albumCover: string }>`
  background: url(${(props) => props.$albumCover}) center no-repeat;
  background-size: cover;
  width: 20rem;
  height: 20rem;
  border-radius: 3rem;
  cursor: pointer;

  & > input {
    display: none;
  }
  margin-bottom:2rem;
`;

export const AlbumTitleInput = styled.input`
  width:100%;
  font-size:1.5rem;
  border:0.1rem solid #ccc;
  outline:none;
  padding:1rem 0.5rem;
  border-radius:1rem;
  margin-bottom:3rem;
`
export const AlbumMetaLabel = styled.label`
  font-size:1.7rem;
  width:70%;
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:1rem;
`
export const AlbumMetaSelect = styled.select`
  width:60%;
  border:none;
  outline:none;
  padding:0.5rem;
  background-color:#F1F1F1;
  border-radius:1rem;
`


export const AlbumDescription = styled.textarea`
  font-size:1.5rem;
  width:100%;
  height:calc(100% - 45rem);
  resize:none;
  border:0.1rem solid #ccc;
  outline:none;
  box-sizing:border-box;
  padding:1rem;
`

export const SongInputArea = styled.div`
  width:90rem;
  height:70%;
  overflow:scroll;
  box-sizing:border-box;
  padding: 2rem 0;
`

export const AddSong = styled.div`
  width: 95%;
  height: 5rem;
  background-color: white;
  border-radius: 1rem;
  display:flex;
  justify-content: center;
  align-items: center;
  color: #52a9f9;
  cursor: pointer;
  margin: 0 auto 2rem auto;
  box-shadow: 0.1rem 0.1rem 1rem 0.1rem #ccc;
  & > img {
    height:50%;
  }
`;

export const SongInput = styled.div`
  width: 95%;
  height: 7rem;
  background-color: white;
  border-radius: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3rem;
  box-sizing:border-box;
  margin: 2rem auto;
`;

export const SongTitleInput = styled.input`
  border:none;
  font-size:2rem;
  padding:1rem;
  outline:none;
  width:50%;
  border-bottom:0.1rem #F1F1F1 solid;
`
export const SongFileInput = styled.div<{$file:string}>`
  background: url(${(props) => props.$file}) center no-repeat;
  background-size: contain;
  width: 4rem;
  height: 4rem;
  border-radius: 1rem;
  cursor: pointer;

  & > input {
    display: none;
  }
`;

export const UploadBtn = styled.button`
  font-size: 2rem;
  background-color: #52a9f9;
  padding: 1rem 1rem;
  color: white;
  border-radius: 1rem;
  min-width: 10rem;
  text-align: center;
  cursor: pointer;
  align-self: flex-end;
  border:none;
  outline:none;
  &:active {
    background-color: #558bbd;
  }
  &:disabled {
    background-color: #558bbd;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingShadow = styled.div`
  width:100vw;
  height:100vh;
  background-color:rgba(0,0,0,0.4);
  display:flex;
  justify-content:center;
  align-items:center;
  position:fixed;
  top:0;
  left:0;
  z-index:1000001;
`

export const Spinner = styled.div`
  display: inline-block;
  width: 4rem;
  height: 4rem;
  border: 0.3rem solid rgba(195, 195, 195, 0.6);
  border-radius: 50%;
  border-top-color: #636767;
  animation: ${rotate} 1s infinite linear;
`;