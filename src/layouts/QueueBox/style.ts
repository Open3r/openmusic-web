import styled from "@emotion/styled";

interface indicator {
  indicator:string
}

const QueueWrap = styled.div`
  width:20rem;
  height:70rem;
  overflow:scroll;
  border: 0.1rem solid #ccc;
  position:fixed;
  top:12rem;
  right:0rem;
`
const QueueSong = styled.div`
  width:20rem;
  height:7rem;
  display:flex;
  border-bottom:0.1rem solid #ccc;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  background-color:${(props:indicator) => props.indicator};
`
const AlbumCover = styled.img`
  width:5rem;
  height:5rem;
  border-radius:1rem;
`
const MusicInfoWrap = styled.div`
  width:13rem;
  padding-left:1rem;
  height:4rem;
  display:flex;
  flex-direction:column;
  justify-content:space-evenly;
`

export {
  QueueSong,
  QueueWrap,
  AlbumCover,
  MusicInfoWrap
}