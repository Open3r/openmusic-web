import styled from "@emotion/styled";

export const Conatainer = styled.div`
  width:20rem;
  height:28rem;
  box-sizing:border-box;
  box-shadow:0.1rem 0.1rem 1rem 0.1rem #ccc; 
  padding:1rem;
  border-radius:1rem;
  cursor: pointer;
  display:flex;
  flex-direction:column;
  align-items:center;
  transition:all 1s;
  &:hover {
    transform:translateY(-1rem);
  }
`

export const ArtistAvatar = styled.img`
  width:15rem;
  height:15rem;
  border: 0.1rem solid #ccc;
  border-radius:50%;
  object-fit:cover;
  object-position:center;
  margin: 0 auto;
`
export const ArtistName = styled.p`
  font-size:2rem;
  margin-top:1rem;
  align-self: flex-start;
`;

export const ArtistGenreWrap = styled.div`
  width:100%;
  height:6rem;
  display:flex;
  flex-wrap:wrap;
  margin-top:1rem;
`
export const GenreBox = styled.div`
  padding: 0 1rem;
  height:2rem;
  border-radius:2rem;
  background-color:#52a9f9;
  margin-right:0.5rem;
  display:flex;
  justify-content:center;
  align-items:center;
  color:white;
`