import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding:2rem;
  box-sizing:border-box;
`;

export const Title = styled.h1`
  font-size:2.5rem;
  height:5rem;
`
export const Main = styled.div`
  overflow-y: scroll;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  padding: 1rem;
  padding-top:2rem;
  grid-auto-rows: 22rem;
  box-sizing: border-box;
  grid-gap: 3rem;
  gap: 3rem;
`;
export const AddPlaylist = styled.div`
  height: 22rem;
  box-shadow: 0.1rem 0.1rem 1rem #ccc;
  display:flex;
  justify-content:center;
  align-items:center;
  cursor: pointer;
  &>img{
    width:3rem;
    height:3rem;
  }
`;

export const CreatModalWrap = styled.div`
  width:100vW;
  height:100vh;
  background-color:rgba(0,0,0,0.4);
  display:flex;
  justify-content:center;
  align-items:center;
  position:fixed;
  z-index:1000001;
  top:0;
  left:0;
`

export const Modal = styled.div`
  width:35rem;
  height:45rem;
  background-color:#F5F5F5;
  padding:1rem;
  box-sizing:border-box;
`;

export const ModalTitle = styled.h1`
  font-size:2rem;
  height:3rem;
  display:flex;
  justify-content:space-between;
  align-items:center;
`;
export const PlaylistCoverWrap = styled.div`
  width:100%;
  height:25rem;
  display:flex;
  justify-content:center;
  align-items:center;
`;
export const PlaylistInputWrap = styled.div`
  width:100%;
  height:10rem;
  display:flex;
  justify-content:space-between;
  align-items:center;
`;
export const PlaylistTitle = styled.input`
  width:70%;
  font-size:1.7rem;
  border:none;
  outline:none;
  border-bottom:0.1rem solid black;
  padding: 1rem;
  background-color:transparent;
`;
export const PlaylistScope = styled.select`
  width:20%;
  border: none;
  outline: none;
  padding: 0.5rem;
  background-color: #ccc;
  border-radius: 1rem;
`;

export const PlaylistBtnWrap = styled.div`
  width:100%;
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
  border:none;
  outline:none;
  &:active {
    background-color: #558bbd;
  }
  &:disabled {
    background-color: #558bbd;
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