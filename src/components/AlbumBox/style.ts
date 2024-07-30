import styled from "@emotion/styled";

export const Container = styled.div`
  width:34rem;
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