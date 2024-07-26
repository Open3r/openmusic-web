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