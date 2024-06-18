import { useEffect, useState } from "react";
import SongBox from "../../components/SongBox";
import * as HS from "./style";
import useGetUser from "../../hooks/useGetUser";
import { getCookie } from "../../cookies/cookie";
import { User } from "../../interfaces/User";
import { SignUpInfoStore } from "../../stores/signUpInfoStore";
import { recentlyPlayStore } from "../../stores/recentlyPlayStore";

const HomePage = () => {
  const { getUser } = useGetUser();
  const [user, setUser] = useState<User>();
  const clear = SignUpInfoStore(state=>(state.clear));
  const recentlyPlayed = recentlyPlayStore((state)=>state.recentlyPlayed);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await getUser(
          getCookie("accessToken"),
          getCookie("refreshToken")
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserInfo();
    clear();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);


  const songList = [
    {
      title: "Interlude",
      artist: "Changmo",
      musicUrl: "../../assets/Interlude.mp3",
      thumbnailUrl:
        "https://image.bugsm.co.kr/album/images/500/201722/20172253.jpg",
    },
    {
      title: "Interlude",
      artist: "keshi",
      musicUrl: "../../assets/skeletons.mp3",
      thumbnailUrl:
        "https://images.genius.com/87cac3cb929a14ca907df61abbb75761.1000x1000x1.jpg",
    },
    {
      title: "cool with you",
      artist: "NewJeans",
      musicUrl: "../../assets/cool-with-you.mp3",
      thumbnailUrl:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a8ae47b2-0a74-4f13-ab4a-044db0aa19e0/dg3baio-a522e3a4-b2c2-4323-807c-86b457916e2e.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2E4YWU0N2IyLTBhNzQtNGYxMy1hYjRhLTA0NGRiMGFhMTllMFwvZGczYmFpby1hNTIyZTNhNC1iMmMyLTQzMjMtODA3Yy04NmI0NTc5MTZlMmUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Bz_WD7Ht35U_Ia7XbcVQuuSKdRvIpg63iSSf7l5N_Dw",
    },
    {
      title: "ALWAYS",
      artist: "Forrest Frank",
      musicUrl: "../../assets/ALWAYS.mp3",
      thumbnailUrl:
        "https://i1.sndcdn.com/artworks-lF74qAS6BCYO-0-t500x500.jpg",
    },
    {
      title: "ALWAYS",
      artist: "Forrest Frank",
      musicUrl: "../../assets/ALWAYS.mp3",
      thumbnailUrl:
        "https://i1.sndcdn.com/artworks-lF74qAS6BCYO-0-t500x500.jpg",
    },
    {
      title: "ALWAYS",
      artist: "Forrest Frank",
      musicUrl: "../../assets/ALWAYS.mp3",
      thumbnailUrl:
        "https://i1.sndcdn.com/artworks-lF74qAS6BCYO-0-t500x500.jpg",
    },
    {
      title: "ALWAYS",
      artist: "Forrest Frank",
      musicUrl: "../../assets/ALWAYS.mp3",
      thumbnailUrl:
        "https://i1.sndcdn.com/artworks-lF74qAS6BCYO-0-t500x500.jpg",
    },
    {
      title: "ALWAYS",
      artist: "Forrest Frank",
      musicUrl: "../../assets/ALWAYS.mp3",
      thumbnailUrl:
        "https://i1.sndcdn.com/artworks-lF74qAS6BCYO-0-t500x500.jpg",
    },
    {
      title: "ALWAYS",
      artist: "Forrest Frank",
      musicUrl: "../../assets/ALWAYS.mp3",
      thumbnailUrl:
        "https://i1.sndcdn.com/artworks-lF74qAS6BCYO-0-t500x500.jpg",
    },
    {
      title: "ALWAYS",
      artist: "Forrest Frank",
      musicUrl: "../../assets/ALWAYS.mp3",
      thumbnailUrl:
        "https://i1.sndcdn.com/artworks-lF74qAS6BCYO-0-t500x500.jpg",
    },
    {
      title: "ALWAYS",
      artist: "Forrest Frank",
      musicUrl: "../../assets/ALWAYS.mp3",
      thumbnailUrl:
        "https://i1.sndcdn.com/artworks-lF74qAS6BCYO-0-t500x500.jpg",
    },
    {
      title: "ALWAYS",
      artist: "Forrest Frank",
      musicUrl: "../../assets/ALWAYS.mp3",
      thumbnailUrl:
        "https://i1.sndcdn.com/artworks-lF74qAS6BCYO-0-t500x500.jpg",
    },
  ];
  const RecentSongList = recentlyPlayed.slice(0,4);
  const RankList = [
    {
      title: "Interlude",
      artist: "Changmo",
      musicUrl: "../../assets/Interlude.mp3",
      thumbnailUrl:
        "https://image.bugsm.co.kr/album/images/500/201722/20172253.jpg",
    },
    {
      title: "Interlude",
      artist: "keshi",
      musicUrl: "../../assets/skeletons.mp3",
      thumbnailUrl:
        "https://images.genius.com/87cac3cb929a14ca907df61abbb75761.1000x1000x1.jpg",
    },
    {
      title: "cool with you",
      artist: "NewJeans",
      musicUrl: "../../assets/cool-with-you.mp3",
      thumbnailUrl:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a8ae47b2-0a74-4f13-ab4a-044db0aa19e0/dg3baio-a522e3a4-b2c2-4323-807c-86b457916e2e.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2E4YWU0N2IyLTBhNzQtNGYxMy1hYjRhLTA0NGRiMGFhMTllMFwvZGczYmFpby1hNTIyZTNhNC1iMmMyLTQzMjMtODA3Yy04NmI0NTc5MTZlMmUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Bz_WD7Ht35U_Ia7XbcVQuuSKdRvIpg63iSSf7l5N_Dw",
    },
    {
      title: "ALWAYS",
      artist: "Forrest Frank",
      musicUrl: "../../assets/ALWAYS.mp3",
      thumbnailUrl:
        "https://i1.sndcdn.com/artworks-lF74qAS6BCYO-0-t500x500.jpg",
    },
  ];

  return (
    <HS.Canvas>
      <HS.ChartSectionWrap>
        <HS.RecentlyListenWrap>
          <HS.SectionTitle>최근 들은 곡 {">"}</HS.SectionTitle>
          <HS.RecentlyListenBox>
            {RecentSongList.length > 0 ? (
              RecentSongList.map((content, idx) => (
                <SongBox 
                  title={content.title}
                  artist={content.artist}
                  idx={idx}
                  key={idx}
                  musicUrl={content.musicUrl}
                  thumbnailUrl={content.thumbnailUrl}
                  type={'history'}
                ></SongBox>
              ))
            ) : (
              <HS.NoSongAlert>최근들은 곡이 없습니다.</HS.NoSongAlert>
            )}
          </HS.RecentlyListenBox>
        </HS.RecentlyListenWrap>
        <HS.RankWrap>
          <HS.SectionTitle>랭킹 {'>'}</HS.SectionTitle>
          <HS.RankBox>
            {RankList.sort(()=> Math.random() - 0.5).slice(0,3).map((content, idx)=> (
              <SongBox
                title={content.title}
                artist={content.artist}
                idx={idx}
                key={idx}
                musicUrl={content.musicUrl}
                thumbnailUrl={content.thumbnailUrl}
                type={'rank'}
              ></SongBox>
            ))}
          </HS.RankBox>
        </HS.RankWrap>
      </HS.ChartSectionWrap>
      <HS.SectionWrap>
        <HS.SectionTitle>당신을 위한 추천 {">"}</HS.SectionTitle>
        <HS.BoxWrap>
          {songList.map((content, idx) => (
            <SongBox
              title={content.title}
              artist={content.artist}
              idx={idx}
              key={idx}
              musicUrl={content.musicUrl}
              thumbnailUrl={content.thumbnailUrl}
              type={'square'}
            ></SongBox>
          ))}
        </HS.BoxWrap>
      </HS.SectionWrap>
      <HS.SectionWrap>
        <HS.SectionTitle>오픈플레이리스트 {">"}</HS.SectionTitle>
        <HS.BoxWrap>
          {songList.map((content, idx) => (
            <SongBox
              title={content.title}
              artist={content.artist}
              idx={idx}
              key={idx}
              musicUrl={content.musicUrl}
              thumbnailUrl={content.thumbnailUrl}
              type={'square'}
            ></SongBox>
          ))}
        </HS.BoxWrap>
      </HS.SectionWrap>
      <HS.SectionWrap>
        <HS.SectionTitle>최신곡 {">"}</HS.SectionTitle>
        <HS.BoxWrap>
          {songList.map((content, idx) => (
            <SongBox
              title={content.title}
              artist={content.artist}
              idx={idx}
              key={idx}
              musicUrl={content.musicUrl}
              thumbnailUrl={content.thumbnailUrl}
              type={'square'}
            ></SongBox>
          ))}
        </HS.BoxWrap>
      </HS.SectionWrap>
      <HS.SectionWrap>
        <HS.SectionTitle>나의 플레이리스트 {">"}</HS.SectionTitle>
        <HS.BoxWrap>
          {songList.map((content, idx) => (
            <SongBox
              title={content.title}
              artist={content.artist}
              idx={idx}
              key={idx}
              musicUrl={content.musicUrl}
              thumbnailUrl={content.thumbnailUrl}
              type={'square'}
            ></SongBox>
          ))}
        </HS.BoxWrap>
      </HS.SectionWrap>
    </HS.Canvas>
  );
};

export default HomePage;
