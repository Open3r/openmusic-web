import styled from "@emotion/styled";

interface ProgressProps {
  progress:number;
}

const PlayBarWrap = styled.div`
  width:100%;
  height:10rem;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  position:fixed;
  bottom:0;
  left:0;
  background-color:white;
`
const SongControlWrap = styled.div`
  width:100%;
  height:9rem;
  display:flex;
  justify-content:space-between;
  align-items:center;
`
const SongWrap = styled.div`
  width:30rem;
  height:100%;
  display:flex;
  align-items:center;
`
const AlbumCoverWrap = styled.div`
  width:9rem;
  height:9rem;
  display:flex;
  justify-content:center;
  align-items:center;
`
const MusicInfoWrap = styled.div`
  width:21rem;
  height:6rem;
  display:flex;
  flex-direction:column;
  justify-content:space-evenly;
`
const Artist = styled.p`
  margin:0;
  font-size:1.3rem;
  color:gray;
`
const Title = styled.h3`
  margin:0;
  font-size:1.7rem;
`

const AlbumCover = styled.img`
  width:7rem;
  height:7rem;
  border-radius:1rem;
`
const ProgressBarWrap = styled.div`
  width:100%;
  height:0.5rem;
  background-color:#ccc;
  transition:all 0.3s;
  cursor:pointer;
  &:hover{
    height:1rem;
  }
`
const ProgressBar = styled.div<ProgressProps>`
  width:${props=>props.progress}%;
  height:100%;
  background-color:#52A9F9;
  border-radius:0 2rem 2rem 0;
`
const PlayBtnsWrap = styled.div`
  width:calc(100%-60rem);
  height:100%;
  display:flex;
  align-items:center;
  justify-content:center;
`
const TimeIndicatorWrap = styled.div`
  width:30rem;
  height:100%;
  display:flex;
  justify-content:flex-end;
  align-items:center;
  position:relative;
`
const TimeIndicator = styled.p`
  font-size:1.3rem;
  margin:0 1rem;
  align-self:flex-start;
`
const PlayBtn = styled.img`
  width:4rem;
  height:4rem;
  margin: 0 2rem;
`
const stateIndicator = styled.img`
  width:4rem;
  height:4rem;
  margin-left:2rem;
  cursor:pointer;
`
const volumeControllerWrap = styled.div`
  background-color:white;
  display:flex;
  justify-content:center:
  align-items:center;
  position:absolute;
  top:-15rem;
  right:5rem;
  padding: 1rem 0;
`
const volumeController = styled.input`
  transfrom:rotate(90deg);
  writing-mode: bt-lr;
  -webkit-appearance: slider-vertical;
  background-color:white;
  width:3rem;
`

export {
  AlbumCover,
  PlayBarWrap,
  MusicInfoWrap,
  AlbumCoverWrap,
  SongWrap,
  Artist,
  Title,
  ProgressBarWrap,
  ProgressBar,
  TimeIndicator,
  TimeIndicatorWrap,
  PlayBtnsWrap,
  SongControlWrap,
  PlayBtn,
  stateIndicator,
  volumeController,
  volumeControllerWrap
}