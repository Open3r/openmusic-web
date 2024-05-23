import GenreBox from "../components/GenreBox/GenreBox";
import SongBox from "../components/SongBox/SongBox";
import * as HS from './style/Home.style'

const Home = () => {
  const genreList = [
    {
      genre : "POP",
      id:0
    },
    {
      genre : "K-POP",
      id:1
    },
    {
      genre : "Hip-Hop",
      id:2
    },
    {
      genre : "Lo-Fi",
      id:3
    },
  ]
  const songList = [
    {
      title: "Interlude",
      artist: "Changmo",
      musicUrl: "../assets/Interlude.mp3",
      thumbnailUrl: "https://image.bugsm.co.kr/album/images/500/201722/20172253.jpg",
    },
    {
      title: "skeletons",
      artist: "keshi",
      musicUrl: "../assets/skeletons.mp3",
      thumbnailUrl: "https://images.genius.com/87cac3cb929a14ca907df61abbb75761.1000x1000x1.jpg",
    },
    {
      title: "cool with you",
      artist: "NewJeans",
      musicUrl: "../assets/cool-with-you.mp3",
      thumbnailUrl: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a8ae47b2-0a74-4f13-ab4a-044db0aa19e0/dg3baio-a522e3a4-b2c2-4323-807c-86b457916e2e.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2E4YWU0N2IyLTBhNzQtNGYxMy1hYjRhLTA0NGRiMGFhMTllMFwvZGczYmFpby1hNTIyZTNhNC1iMmMyLTQzMjMtODA3Yy04NmI0NTc5MTZlMmUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Bz_WD7Ht35U_Ia7XbcVQuuSKdRvIpg63iSSf7l5N_Dw",
    },
    {
      title: "ALWAYS",
      artist: "Forrest Frank",
      musicUrl: "../assets/ALWAYS.mp3",
      thumbnailUrl: "https://i1.sndcdn.com/artworks-lF74qAS6BCYO-0-t500x500.jpg",
    },
  ];


  return (
    <>
      <HS.BoxWrap>
        {genreList.map((content) => (
          <GenreBox genre={content.genre} key={content.id}></GenreBox>
        ))}
      </HS.BoxWrap>
      <HS.BoxWrap>
        {songList.map((content, idx) => (
          <SongBox
            title={content.title}
            artist={content.artist}
            idx={idx}
            musicUrl={content.musicUrl}
            thumbnailUrl={content.thumbnailUrl}
          ></SongBox>
        ))}
      </HS.BoxWrap>
      
    </>
  );
};

export default Home;
