import { nowPlayingStore } from '../../store/nowPlayingStore'
import { playQueueStore } from '../../store/playQueueStore'
import * as SB from './SongBox.style'
import { Song } from './Interfaces'

const SongBox = (props:Song) => {
  const setNowPlaying = nowPlayingStore((state) => state.setNowPlaying);
  const addSong = playQueueStore((state)=>state.addSong);
  const queue = playQueueStore((state)=>state.queue);
  
  const addSongQueue = () => {
    setNowPlaying({
      artist: props.artist,
      title: props.title,
      idx: props.idx,
      thumbnailUrl: props.thumbnailUrl,
      musicUrl: props.musicUrl
    });
    addSong({
      artist: props.artist,
      title: props.title,
      idx: queue.length,
      thumbnailUrl: props.thumbnailUrl,
      musicUrl: props.musicUrl
    });
  }

  return (
    <SB.SongBox onClick={addSongQueue} thumbailUrl={props.thumbnailUrl}>
      <SB.BoxHover>
        <SB.HoverWord>눌러서 재생</SB.HoverWord>
      </SB.BoxHover>
      <SB.Title>{props.title}</SB.Title>
      <SB.Artist>{props.artist}</SB.Artist>
    </SB.SongBox>
  )
}

export default SongBox