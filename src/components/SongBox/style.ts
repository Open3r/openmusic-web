import styled from "@emotion/styled";


const SongBox = styled.div<{thumbnailUrl : string}>`
  width:15rem;
  height:15rem;
  background:url(${props => props.thumbnailUrl}) no-repeat center;
  background-size:cover;
  overflow:hidden;
  border-radius:1.5rem;
  display:flex;
  flex-direction:column;
  justify-content:flex-end;
  align-items:flex-end;
  text-align:end;
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
  font-size: 1.3rem;
  color: lightgray;
  margin: 0 1rem;
  background: rgba(0, 0, 0, 0.7);
  padding: 0 1rem;
  margin-bottom: 1rem;
`;
const Title = styled.p`
  font-size: 1.7rem;
  color: lightgray;
  margin: 0 1rem;
  background: rgba(0, 0, 0, 0.7);
  padding: 0 1rem;
`;
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
const RecentlyListen = styled.div`
  width:40rem;
  height:9rem;
  margin:0.5rem 0;
  border: 0.1rem solid rgba(200,200,200,0.4);
  box-sizing:border-box;
  border-radius:1rem;
  background:rgba(200,200,200,0.2);
  position:relative;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:0 1rem;
  box-sizing:border-box;
`
const RecentlyListenHover = styled.div`
  width: 100%;
  height: 100%;
  background-color:black;
  opacity:0;
  transition:all 0.3s;
  position:absolute;
  top:0%;
  left:0%;
  border-radius:1rem;
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:1.5rem;
  color:gray;
  cursor: pointer;
  &:hover{
    opacity:0.4;
  }
`
const RecentlyListenInfoWrap = styled.div`
  width: calc(100% - 8rem);
  height: 6rem;
  display:flex;
  flex-direction:column;
  justify-content:space-around;
`
const RecentlyListenTitle = styled.h1`
  font-size:1.5rem;
  margin:0;
`
const RecentlyListenArtist = styled.p`
  font-size:1.2rem;
  margin:0;
`

const Rank = styled.div`
  width:100%;
  height:7rem;
  display:flex;
`
const RankNumWrap = styled.div`
  width:4rem;
  height:100%;
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:2rem;
  color:#52A9F9;
  font-weight:bolder;
  box-sizing:border-box;
  padding-left:1rem;
`
const RankSongWrap = styled.div`
  width:calc(100% - 4rem);
  height:100%;
  position:relative;
  display:flex;
  align-items:center;
  box-sizing:border-box;
  padding: 0 1rem;
`
const RankSongLikeWrap = styled.div`
  width:4rem;
  height:7rem;
  display:flex;
  justify-content:center;
  align-items:center;
`
const RankSongInfoWrap = styled.div`
  width:10rem;
  height:80%;
  display:flex;
  flex-direction:column;
  justify-content:space-evenly;
  box-sizing:border-box;
  padding: 0 1rem;
`
const RankSongAlbum = styled.div`
  width:12rem;
  height:7rem;
  display:flex;
  justify-content:center;
  align-items:center;
  color:gray;
  font-size:1.7rem;
  margin-right:10rem;
`
const RankSongTitle = styled.h1`
  font-size: 1.2rem;
  margin: 0;
`
const RankSongArtist = styled.p`
  font-size: 1rem;
  margin:0;
`
const RankSongHover = styled.div`
  position:absolute;
  width:100%;
  height:100%;
  opacity:0;
  top:0;
  left:0;
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:1.5rem;
  color:gray;
  background-color:black;
  transition:all 0.3s;
  border-radius:1rem;
  cursor: pointer;
  &:hover{
    opacity:0.4;
  }
`

const ListMusic = styled.div`
  max-width: 100%;
  min-width:calc(100% - 5rem);
  height: 10rem;
  display: flex;
  position: relative;
  &:hover :first-of-type {
    opacity: 0.4;
  }
  align-items:center;
  border-bottom: 0.1rem solid #ccc;
`;
const ListMusicHover = styled.div`
  position:absolute;
  top:0;
  left:0;
  background-color:black;
  display:flex;
  justify-content:center;
  align-items:center;
  opacity:0;
  &:hover{
    opacity:0.4;
  }
  width:100%;
  height:100%;
  transition:all 0.3s;
  cursor: pointer;
`
const ListNum = styled.div`
  width: 5rem;
  height:5rem;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #52a9f9;
`;
const ListCover = styled.img`
  width:8rem;
  height:8rem;
  object-fit:cover;
  object-position:center;
  border-radius:1rem;
`
const ListMusicInfoWrap = styled.div`
  width:35%;
  height:90%;
  display:flex;
  flex-direction:column;
  justify-content:space-evenly;
  padding:0 1rem;
  box-sizing:border-box;
`
export const ListMusicAlbum = styled.div`
  width:55%;
  height:90%;
  display:flex;
  align-items:center;
  color:gray;
  font-size:1.6rem;
`
export const ListMusicTitle = styled.h1`
  font-size:1.5rem;
  font-weight:bold;
`
export const ListMusicArtist = styled.p`
  font-size: 1.2rem;
  color:gray;
`

export {
  SongBox,
  Artist,
  Title,
  BoxHover,
  HoverWord,
  RecentlyListen,
  RecentlyListenHover,
  RecentlyListenTitle,
  RecentlyListenArtist,
  RecentlyListenInfoWrap,
  Rank,
  RankNumWrap,
  RankSongWrap,
  RankSongAlbum,
  RankSongLikeWrap,
  RankSongHover,
  RankSongInfoWrap,
  RankSongTitle,
  RankSongArtist,
  ListMusic,
  ListMusicHover,
  ListNum,
  ListCover,
  ListMusicInfoWrap,
}