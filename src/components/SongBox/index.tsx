import { nowPlayingStore } from "../../stores/nowPlayingStore";
import { playQueueStore } from "../../stores/playQueueStore";
import * as S from "./style";
import { Song } from "../../interfaces/Song";
import { recentlyPlayStore } from "../../stores/recentlyPlayStore";
import NotificationService from "../../libs/notification/NotificationService";
import instance from "../../libs/axios/customAxios";
import { PlayStateStore } from "../../stores/playStateStore";
import Like from '../../assets/imgs/unlike.svg';

interface SongBoxProps extends Song {
  type: string;
  rank?:number
}

const SongBox = (props: SongBoxProps) => {
  const setNowPlaying = nowPlayingStore((state) => state.setNowPlaying);
  const addSong = playQueueStore((state) => state.addSong);
  const queue = playQueueStore((state) => state.queue);
  const storeRecently = recentlyPlayStore((state) => state.storeRecently);
  const recentlyPlayed = recentlyPlayStore((state) => state.recentlyPlayed);
  const setPlaystate = PlayStateStore(state=>state.setPlayState);

  const isSongInQueue = (queue: Song[], newSong: Song): boolean => {
    return queue.some((song) => song.id === newSong.id);
  };



  const addSongQueue = async () => {

    const res = await instance.get(`/songs/${props.id}`);

    const newSong = res.data.data;

    setNowPlaying(newSong);

    if (!isSongInQueue(queue, newSong)) {
      addSong(newSong);
    } else {
      NotificationService.warn("이미 재생목록에 있는 곡입니다.");
    }

    if (!isSongInQueue(recentlyPlayed, newSong)) {
      storeRecently(newSong);
    }

    setPlaystate(true);
  };

  if (props.type === "square") {
    return (
      <S.SongBox onClick={addSongQueue} thumbnailUrl={props.thumbnailUrl}>
        <S.BoxHover>
          <S.HoverWord>눌러서 재생</S.HoverWord>
        </S.BoxHover>
        <S.Title>{props.title}</S.Title>
        <S.Artist>{props.artist.nickname}</S.Artist>
      </S.SongBox>
    );
  }

  if (props.type === "history") {
    return (
      <S.RecentlyListen onClick={addSongQueue}>
        <S.RecentlyListenHover>눌러서 재생</S.RecentlyListenHover>
        <img
          src={props.thumbnailUrl}
          alt=""
          style={{ width: "7rem", height: "7rem", borderRadius: "1rem",objectFit:'cover',objectPosition:'center' }}
        />
        <S.RecentlyListenInfoWrap>
          <S.RecentlyListenTitle>{props.title}</S.RecentlyListenTitle>
          <S.RecentlyListenArtist>
            {props.artist.nickname}
          </S.RecentlyListenArtist>
        </S.RecentlyListenInfoWrap>
      </S.RecentlyListen>
    );
  }

  if (props.type === "rank") {
    return (
      <S.Rank onClick={addSongQueue}>
        <S.RankNumWrap>
          {props.rank !== undefined && props.rank + 1}
        </S.RankNumWrap>
        <S.RankSongWrap>
          <S.RankSongHover>눌러서 재생</S.RankSongHover>
          <img
            src={props.thumbnailUrl}
            alt=""
            style={{
              width: "5rem",
              height: "5rem",
              borderRadius: "0.5rem",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          <S.RankSongInfoWrap>
            <S.RankSongTitle>
              {props.title.length > 14
                ? props.title.slice(0, 14) + "..."
                : props.title}
            </S.RankSongTitle>
            <S.RankSongArtist>{props.artist.nickname}</S.RankSongArtist>
          </S.RankSongInfoWrap>
          <S.RankSongAlbum>
            {"example album".length > 7
              ? "example album".slice(0, 7) + "..."
              : "example album"}
          </S.RankSongAlbum>
          <S.RankSongLikeWrap>
            <img src={Like} alt="" style={{ width: "2rem", height: "2rem" }} />
            <span style={{ marginLeft: "0.5rem", fontSize: "1.3rem" }}>
              {props.likeCount}
            </span>
          </S.RankSongLikeWrap>
        </S.RankSongWrap>
      </S.Rank>
    );
  }
  if (props.type === 'list') {
    return (
      <S.ListMusic onClick={addSongQueue}>
        <S.ListMusicHover>
          <S.HoverWord>눌러서 재생</S.HoverWord>
        </S.ListMusicHover>
        <S.ListNum>{props.rank !== undefined && props.rank + 1}</S.ListNum>
        <S.ListCover src={props.thumbnailUrl} />
        <S.ListMusicInfoWrap>
          <S.ListMusicTitle>
            {props.title.length > 35
              ? props.title.slice(0, 35) + "..."
              : props.title}
          </S.ListMusicTitle>
          <S.ListMusicArtist>{props.artist.nickname}</S.ListMusicArtist>
        </S.ListMusicInfoWrap>
        <S.ListMusicAlbum>
          {"example album".length > 15
            ? "example album".slice(0, 15) + "..."
            : "example album"}
        </S.ListMusicAlbum>
        <S.RankSongLikeWrap>
          <img src={Like} alt="" style={{ width: "2rem", height: "2rem" }} />
          <span style={{ marginLeft: "0.5rem", fontSize: "1.3rem" }}>
            {props.likeCount}
          </span>
        </S.RankSongLikeWrap>
      </S.ListMusic>
    );
  }
};

export default SongBox;
