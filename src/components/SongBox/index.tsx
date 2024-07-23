import { nowPlayingStore } from '../../stores/nowPlayingStore';
import { playQueueStore } from '../../stores/playQueueStore';
import * as S from './style';
import { Song } from '../../interfaces/Song';
import { recentlyPlayStore } from '../../stores/recentlyPlayStore';
import NotificationService from '../Notification/NotificationService';

interface SongBoxProps extends Song {
  type: string;
}

const SongBox = (props: SongBoxProps) => {
  const setNowPlaying = nowPlayingStore((state) => state.setNowPlaying);
  const addSong = playQueueStore((state) => state.addSong);
  const queue = playQueueStore((state) => state.queue);
  const storeRecently = recentlyPlayStore((state) => state.storeRecently);
  const recentlyPlayed = recentlyPlayStore((state) => state.recentlyPlayed);

  const isSongInQueue = (queue: Song[], newSong: Song): boolean => {
    return queue.some(song => song.musicUrl === newSong.musicUrl);
  };

  const addSongQueue = () => {
    const newSong = {
      artist: props.artist,
      title: props.title,
      idx: props.idx,
      thumbnailUrl: props.thumbnailUrl,
      musicUrl: props.musicUrl
    };

    setNowPlaying(newSong);

    if (!isSongInQueue(queue, newSong)) {
      addSong({ ...newSong, idx: queue.length });
    }else{
      NotificationService.warn("이미 재생목록에 있는 곡입니다.");
    }

    if (!isSongInQueue(recentlyPlayed, newSong)) {
      storeRecently(newSong);
    }
  };

  if (props.type === 'square') {
    return (
      <S.SongBox onClick={addSongQueue} thumbnailUrl={props.thumbnailUrl}>
        <S.BoxHover>
          <S.HoverWord>눌러서 재생</S.HoverWord>
        </S.BoxHover>
        <S.Title>{props.title}</S.Title>
        <S.Artist>{props.artist}</S.Artist>
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
          style={{ width: "7rem", borderRadius: "1rem" }}
        />
        <S.RecentlyListenInfoWrap>
          <S.RecentlyListenTitle>{props.title}</S.RecentlyListenTitle>
          <S.RecentlyListenArtist>{props.artist}</S.RecentlyListenArtist>
        </S.RecentlyListenInfoWrap>
      </S.RecentlyListen>
    );
  }

  if (props.type === "rank") {
    return (
      <S.Rank onClick={addSongQueue}>
        <S.RankNumWrap>{props.idx + 1}</S.RankNumWrap>
        <S.RankSongWrap>
          <S.RankSongHover>눌러서 재생</S.RankSongHover>
          <img
            src={props.thumbnailUrl}
            alt=""
            style={{ width: "5rem", borderRadius: "0.5rem" }}
          />
          <S.RankSongInfoWrap>
            <S.RankSongTitle>{props.title}</S.RankSongTitle>
            <S.RankSongArtist>{props.artist}</S.RankSongArtist>
          </S.RankSongInfoWrap>
        </S.RankSongWrap>
      </S.Rank>
    );
  }
};

export default SongBox;
