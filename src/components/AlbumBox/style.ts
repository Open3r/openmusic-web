import styled from "@emotion/styled";

export const Container = styled.div`
  width:93%;
  height:10rem;
  background-color:white;
  box-shadow:0.1rem 0.1rem 1rem 0.1rem #ccc;
  margin: 1rem auto;
  margin-bottom:3rem;
  display:flex;
  align-items:center;
  padding:0 1rem;
  box-sizing:border-box;
  cursor: pointer;
  &:hover {
    transform:translateY(-3px);
  }
  transition: all 0.3s;
`
export const AlbumCover = styled.div<{cover:string}>`
  width:8rem;
  height:8rem;
  background:url(${props=>props.cover}) no-repeat center;
  background-size:cover;
  border:0.1rem solid #f1f1f1;
`
export const AlbumTitle = styled.h1`
  font-size:2rem;
  font-weight:bold;
  margin-left:2rem;
`

export const AlbumSongCount = styled.p`
  font-size:1.5rem;
  color:gray;
  margin-left:1rem;
`

export const ListContainer = styled.div`
  width: 93%;
  height: 17rem;
  background-color: white;
  box-shadow: 0.1rem 0.1rem 1rem 0.1rem #ccc;
  margin: 1rem auto;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    transform: translateY(-3px);
  }
  transition: all 0.3s;
`;

export const ListAlbumCover = styled.div<{ cover: string }>`
  width: 15rem;
  height: 15rem;
  background: url(${(props) => props.cover}) no-repeat center;
  background-size: cover;
  border: 0.1rem solid #f1f1f1;
`;

export const ListAlbumInfoWrap = styled.div`
  display:flex;
  flex-direction:column;
  width:calc(100% - 15rem);
  height:100%;
  justify-content:space-evenly;
`
export const ListAlbumArtist = styled.h1`
  font-size: 1.5rem;
  margin-left: 2rem;
  color:gray;
`;

export const ListAlbumMeta = styled.div`
  width:100%;
  display:flex;
  justify-content:space-between;
  align-items:center;
  height:3rem;
  padding: 0 1rem;
  box-sizing:border-box;
  margin-top:2rem;
`
export const ListAlbumLikeWrap = styled.div`
  width:7rem;
  height:3rem;
  display:flex;
  align-items:center;
  justify-content:flex-end;
  &>img{
    width:2rem;
    height:2rem;
  }
`