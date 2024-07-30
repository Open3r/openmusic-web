import SongBox from "../../components/SongBox";
import * as HS from "./style";
import { recentlyPlayStore } from "../../stores/recentlyPlayStore";
import useGetMusic from "../../hooks/useGetMusic";
import { useEffect, useState } from "react";
import { Song } from "../../interfaces/Song";
import useGetRank from "../../hooks/useGetRank";
import NotificationService from "../../libs/notification/NotificationService";
import instance from "../../libs/axios/customAxios";
import { PlaylistType } from "../../interfaces/playlist";
import PlaylistBox from "../../components/PlaylistBox";
import { paging } from "../../libs/axios/paging";
import { likeUpdateStore } from "../../stores/likeUpdateStore";

const HomePage = () => {
  const recentlyPlayed = recentlyPlayStore((state)=>state.recentlyPlayed);
  const [songList, setSongList] = useState<Song[]>();
  const [songRank, setSongRank] = useState<Song[]>();
  const [myPlaylists,setMyPlaylists] = useState<PlaylistType[]>();
  const [playlists, setPlaylists] = useState<PlaylistType[]>();

  const likeUpdate = likeUpdateStore(state=>state.likeUpdate);
  const setLikeUpdate = likeUpdateStore((state) => state.setLikeUpdate);


  const RecentSongList = recentlyPlayed.reverse().slice(0,4);
  

  const { getMusic } = useGetMusic();
  const { getRank } = useGetRank();

  const musicReq = async () => {
    try{
      const res = await getMusic();
      setSongList(res);
      const rank = await getRank(3);
      setSongRank(rank);
    }catch(err){
      NotificationService.error('네트워크 에러');
    }
  }

  const myPlaylistReq = async () => {
    await instance
      .get("/users/me/playlists")
      .then((res) => {
        setMyPlaylists(res.data.data.content);
      })
  };

  const playlistReq = async () => {
    await instance.get("/playlists",{params:paging}).then((res) => {
      setPlaylists(res.data.data.content);
    });
  };

  const rankReload = async () => {
    const res = await getRank(3);
    setSongRank(res);
  }

  useEffect(()=>{
    myPlaylistReq();
    playlistReq();
    musicReq();
  },[]);

  useEffect(()=>{
    if(likeUpdate){
      rankReload();
      setLikeUpdate(false);
    }
  },[likeUpdate]);

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
                  id={content.id}
                  key={idx}
                  url={content.url}
                  thumbnailUrl={content.thumbnailUrl}
                  type={"history"}
                  genre={content.genre}
                  scope={content.scope}
                  liked={content.liked}
                  likeCount={content.likeCount}
                ></SongBox>
              ))
            ) : (
              <HS.NoSongAlert>최근들은 곡이 없습니다.</HS.NoSongAlert>
            )}
          </HS.RecentlyListenBox>
        </HS.RecentlyListenWrap>
        <HS.RankWrap>
          <HS.SectionTitle>오픈차트 {">"}</HS.SectionTitle>
          <HS.RankBox>
            {songRank
              ?.sort(() => Math.random() - 0.5)
              .slice(0, 3)
              .map((content, idx) => (
                <SongBox
                  title={content.title}
                  artist={content.artist}
                  id={content.id}
                  key={idx}
                  rank={idx}
                  url={content.url}
                  thumbnailUrl={content.thumbnailUrl}
                  type={"rank"}
                  genre={content.genre}
                  scope={content.scope}
                  liked={content.liked}
                  likeCount={content.likeCount}
                ></SongBox>
              ))}
          </HS.RankBox>
        </HS.RankWrap>
      </HS.ChartSectionWrap>
      <HS.SectionWrap>
        <HS.SectionTitle>당신을 위한 추천 {">"}</HS.SectionTitle>
        <HS.BoxWrap>
          {songList?.map((content, idx) => (
            <SongBox
              title={content.title}
              artist={content.artist}
              id={content.id}
              key={idx}
              url={content.url}
              thumbnailUrl={content.thumbnailUrl}
              type={"square"}
              genre={content.genre}
              scope={content.scope}
              liked={content.liked}
              likeCount={content.likeCount}
            ></SongBox>
          ))}
        </HS.BoxWrap>
      </HS.SectionWrap>
      <HS.SectionWrap>
        <HS.SectionTitle>오픈플레이리스트 {">"}</HS.SectionTitle>
        <HS.BoxWrap>
          {playlists?.map((content) => (
            <PlaylistBox item={content} key={content.id} type="box" />
          ))}
        </HS.BoxWrap>
      </HS.SectionWrap>
      <HS.SectionWrap>
        <HS.SectionTitle>최신곡 {">"}</HS.SectionTitle>
        <HS.BoxWrap>
          {songList?.map((content, idx) => (
            <SongBox
              title={content.title}
              artist={content.artist}
              id={content.id}
              key={idx}
              url={content.url}
              thumbnailUrl={content.thumbnailUrl}
              type={"square"}
              genre={content.genre}
              scope={content.scope}
              liked={content.liked}
              likeCount={content.likeCount}
            ></SongBox>
          ))}
        </HS.BoxWrap>
      </HS.SectionWrap>
      <HS.SectionWrap>
        <HS.SectionTitle>나의 플레이리스트 {">"}</HS.SectionTitle>
        <HS.BoxWrap>
          {myPlaylists?.map((content) => (
            <PlaylistBox item={content} key={content.id} type="box" />
          ))}
        </HS.BoxWrap>
      </HS.SectionWrap>
    </HS.Canvas>
  );
};

export default HomePage;
