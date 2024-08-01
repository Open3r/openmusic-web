import * as S from "./style";
import { Song } from "../../interfaces/Song";
import { songIdUpdate } from "../../stores/nowPlayingStore";
import instance from "../../libs/axios/customAxios";
import { queueUpdateStore } from "../../stores/queueStore";
import { AxiosError } from "axios";
import { recentUpdateStore } from "../../stores/recentStore";
import NotificationService from "../../libs/notification/NotificationService";

interface SongBoxProps extends Song {
  type: string;
  rank?:number;
  nowPlaying?:boolean;
}

const SongBox = (props: SongBoxProps) => {
  const setSongIdUpdate = songIdUpdate(state=>state.setSongIdUpdate);
  const setQueueUpdate = queueUpdateStore(state=>state.setQueueUpdate);
  const setRecentUpdate = recentUpdateStore(state=>state.setRecentUpdate);

  const addSongQueue = () => {
    instance.post('/users/me/queue',{songId:props.id}).then(()=>{
      instance.get('/users/me/queue').then((res)=>{
        setQueueUpdate(res.data.data);
        setSongIdUpdate(props.id);
        instance.post('/users/me/recents',{songId:props.id}).then(()=>{
          instance.get('/users/me/recents').then((res)=>{
            setRecentUpdate(res.data.data);
          });
        });
      });
    }).catch((err:AxiosError)=>{
      if(err.response && err.response.status === 400) {
        NotificationService.warn('재생목록에 존재합니다.')
        instance.get("/users/me/queue").then((res) => {
          setQueueUpdate(res.data.data);
          setSongIdUpdate(props.id);
          instance.post("/users/me/recents", { songId: props.id }).then(() => {
            instance.get("/users/me/recents").then((res) => {
              setRecentUpdate(res.data.data);
            });
          });
        });
      }
    });
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
            {props.album.title.length > 7
              ? props.album.title.slice(0, 7) + "..."
              : props.album.title}
          </S.RankSongAlbum>
          <S.RankSongLikeWrap>
            <img src="/assets/imgs/unlike.svg" alt="" style={{ width: "2rem", height: "2rem" }} />
            <span style={{ marginLeft: "0.5rem", fontSize: "1.3rem" }}>
              {props.likeCount}
            </span>
          </S.RankSongLikeWrap>
        </S.RankSongWrap>
      </S.Rank>
    );
  }
  if (props.type === 'queue') {
    return (
      <S.ListMusic onClick={addSongQueue} style={props.nowPlaying !== undefined && props.nowPlaying ? {background:'#F5F5F5'} : {}}>
        {
          props.nowPlaying !== undefined && !props.nowPlaying ? (
            <S.ListMusicHover>
              <S.HoverWord>눌러서 재생</S.HoverWord>
            </S.ListMusicHover>
          ) : (
            null
          )
        }
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
          {props.album.title.length > 15
            ? props.album.title.slice(0, 15) + "..."
            : props.album.title}
        </S.ListMusicAlbum>
        <S.RankSongLikeWrap>
          <img src='/assets/imgs/unlike.svg' alt="" style={{ width: "2rem", height: "2rem" }} />
          <span style={{ marginLeft: "0.5rem", fontSize: "1.3rem" }}>
            {props.likeCount}
          </span>
        </S.RankSongLikeWrap>
      </S.ListMusic>
    );
  }

  if (props.type === "list") {
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
          {props.album.title.length > 15
            ? props.album.title.slice(0, 15) + "..."
            : props.album.title}
        </S.ListMusicAlbum>
        <S.RankSongLikeWrap>
          <img src='/assets/imgs/unlike.svg' alt="" style={{ width: "2rem", height: "2rem" }} />
          <span style={{ marginLeft: "0.5rem", fontSize: "1.3rem" }}>
            {props.likeCount}
          </span>
        </S.RankSongLikeWrap>
      </S.ListMusic>
    );
  }
};

export default SongBox;
