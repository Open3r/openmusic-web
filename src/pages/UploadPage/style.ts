import styled from "@emotion/styled";


export const Canvas = styled.div`
  width: 100%;
  height: calc(100vh - 12rem);
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
  padding: 3rem 0;
  display:flex;
  flex-direction:column;
`;

export const AlbumCoverInput = styled.div<{ $albumCover: string }>`
  background: url(${(props) => props.$albumCover}) center no-repeat;
  background-size: contain;
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
  font-size:2rem;
  border:0.1rem solid #ccc;
  outline:none;
  padding:1rem;
  border-radius:1rem;
  box-sizing:border-box;
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
  height:30rem;
  resize:none;
  border:0.1rem solid #ccc;
  outline:none;
  box-sizing:border-box;
  padding:1rem;
`

export const SongInputArea = styled.div`
  width:90rem;
  height:85%;
  border-radius:2rem;
  background-color:#F1F1F1;
  overflow:scroll;
  display:flex;
  flex-direction:column;
  align-items:center;
  padding: 2rem 0;
  box-sizing:border-box;
`

export const AddSong = styled.div`
  width: 95%;
  height: 7rem;
  background-color: white;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 7rem;
  color: #52a9f9;
  cursor: pointer;
`;

export const SongInput = styled.div`
  width: 95%;
  height: 7rem;
  background-color: white;
  border-radius: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom:2rem;
  padding: 0 3rem;
  box-sizing:border-box;
`;

export const SongTitleInput = styled.input`
  border:none;
  border-bottom: 0.1rem solid #ccc;
  font-size:2rem;
  padding:1rem;
  outline:none;
  width:50%;
`
export const SongFileInput = styled.div<{$file:string}>`
  background: url(${(props) => props.$file}) center no-repeat;
  background-size: contain;
  width: 5rem;
  height: 5rem;
  border-radius: 1rem;
  cursor: pointer;

  & > input {
    display: none;
  }
`;