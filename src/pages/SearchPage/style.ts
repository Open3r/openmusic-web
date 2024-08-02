import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 22rem);
  margin-top: 12rem;
  margin-bottom: 10rem;
  padding-top: 3rem;
  box-sizing: border-box;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
export const SectionTitle = styled.h1`
  font-size:3rem;
  font-weight:bold;
  height:5rem;
  display:flex;
  align-items:center;
  border-bottom: 0.1rem #F1F1F1 solid;
`
export const SectionArea = styled.div`
  width:70%;
  margin: 0 auto;
`
export const SongResultWrap = styled.div`
  width: 100%;
  display: flex;
  overflow-x: scroll;
  box-sizing: border-box;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  padding: 0 2rem;
  box-sizing:border-box;
  margin-bottom:5rem;
`;

export const PlaylistResultWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  padding: 1rem;
  padding-top: 2rem;
  grid-auto-rows: 22rem;
  box-sizing: border-box;
  grid-gap: 3rem;
  gap: 3rem;
  margin-bottom:5rem;
`;

export const AlbumResultWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  padding: 1rem;
  padding-top: 2rem;
  grid-auto-rows: 22rem;
  box-sizing: border-box;
  grid-gap: 3rem;
  gap: 3rem;
  margin-bottom:5rem;
`;

export const ArtistResultWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  padding: 1rem;
  padding-top: 2rem;
  grid-auto-rows: 30rem;
  box-sizing: border-box;
  grid-gap: 3rem;
  gap: 3rem;
  margin-bottom: 5rem;
`;


export const ResultCountWrap = styled.div`
  width:70%;
  height:7rem;
  margin: 0 auto;
  display:flex;
  align-items:center;
  justify-content:flex-end;
`
export const ResultCount = styled.h1`
  font-size:2rem;
`