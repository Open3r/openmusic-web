import styled from "@emotion/styled";


const SongBox = styled.div<{thumbailUrl : string}>`
  width:15rem;
  height:15rem;
  background:url(${props=>props.thumbailUrl}) no-repeat center;
  background-size:cover;
  overflow:hidden;
  border-radius:1.5rem;
  display:flex;
  flex-direction:column;
  justify-content:flex-end;
  align-items:flex-end;
  position:relative;
  border: 0.1rem solid #ccc;
  flex-shrink:0;
  margin-right:1rem;
  &:last-of-type{
    margin:0;
  }
  scroll-snap-align:start;
  cursor:pointer;
  &:hover :first-of-type{
    opacity:0.4;
  }
`
const Artist = styled.p`
  font-size:1.3rem;
  color:lightgray;
  margin:0 1rem;
`
const Title = styled.p`
  font-size:1.7rem;
  color:lightgray;
  margin:0 1rem;
`
const BoxHover = styled.div`
  position:absolute;
  background-color:black;
  opacity:0;
  z-index:10;
  top:0;
  left:0;
  width:100%;
  height:100%;
  transition: all 0.3s;
  display:flex;
  justify-content:center;
  align-items:center;
  &:hover{
    opacity:0.4;
  }
`
const HoverWord = styled.p`
  font-size:1.5rem;
  color:white;
`

export {
  SongBox,
  Artist,
  Title,
  BoxHover,
  HoverWord
}