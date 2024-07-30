import styled from "@emotion/styled";

export const Container = styled.div`
  height:22rem;
  box-shadow: 0.1rem 0.1rem 1rem #ccc;
  cursor: pointer;
  box-sizing:border-box;
  transition:all 0.5s;
  &:hover{
    transform:translateY(-1rem);
  }
`
export const Cover = styled.div<{cover:string}>`
  width:100%;
  height:22rem;
  background:url(${props=>props.cover}) no-repeat center;
  background-size:cover;
  padding:1rem;
  box-sizing:border-box;
  display:flex;
`
export const PlaylistTitle = styled.h1`
  font-size:2rem;
  padding: 0 1rem;
  width:fit-content;
  background-color:rgba(0,0,0,0.5);
  border-radius:1rem;
  color:white;
  align-self:flex-end;
`

export const SongBox = styled.div<{ thumbnailUrl: string }>`
  width: 15rem;
  height: 15rem;
  background: url(${(props) => props.thumbnailUrl}) no-repeat center;
  background-size: cover;
  overflow: hidden;
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  text-align: end;
  position: relative;
  border: 0.1rem solid #ccc;
  flex-shrink: 0;
  margin-right: 1rem;
  &:last-of-type {
    margin: 0;
  }
  scroll-snap-align: start;
  cursor: pointer;
  &:hover :first-of-type {
    opacity: 0.4;
  }
`;
export const Artist = styled.p`
  font-size: 1.3rem;
  color: lightgray;
  margin: 0 1rem;
  background: rgba(0, 0, 0, 0.7);
  padding: 0 1rem;
  margin-bottom: 1rem;
`;
export const Title = styled.p`
  font-size: 1.7rem;
  color: lightgray;
  margin: 0 1rem;
  background: rgba(0, 0, 0, 0.7);
  padding: 0 1rem;
`;
export const BoxHover = styled.div`
  position: absolute;
  background-color: black;
  opacity: 0;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 0.4;
  }
`;
export const HoverWord = styled.p`
  font-size: 1.5rem;
  color: white;
`;

export const AddListWrap = styled.div`
  width: 100%;
  height: 6rem;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  box-sizing: border-box;
  cursor: pointer;
  &:hover :first-of-type {
    opacity: 0.4;
  }
`;

export const AddListCover = styled.img`
  width:4rem;
  height:4rem;
  object-fit:cover;
  object-position:center;
`
export const AddListTitle = styled.h1`
  font-size:1.5rem;
  margin-left:1rem;
`