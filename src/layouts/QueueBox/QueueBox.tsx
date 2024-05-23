import { nowPlayingStore } from "../../store/nowPlayingStore";
import { playQueueStore } from "../../store/playQueueStore";
import * as QB from "./QueueBox.style";

const QueueBox = () => {
  const queue = playQueueStore((state) => state.queue);
  const clearQueue = playQueueStore((state) => state.clearQueue);

  const setNowPlaying = nowPlayingStore((state) => state.setNowPlaying);
  const nowPlaying = nowPlayingStore((state) => state.nowPlaying);

  const playSong = (info: any) => {
    setNowPlaying({
      artist: info.artist,
      title: info.title,
      idx: info.idx,
      thumbnailUrl: info.thumbnailUrl,
      musicUrl: info.musicUrl,
    });
  };

  return (
    <QB.QueueWrap>
      <button onClick={clearQueue}>clear</button>
      {queue.map((content) => {
        let indicator = "transparent";
        if (nowPlaying.title == content.title) {
          indicator = "#F1F1F1";
        }
        return (
          <QB.QueueSong
            onClick={() => {
              playSong(content);
            }}
            indicator={indicator}
          >
            <QB.AlbumCover src={content.thumbnailUrl} />
            <QB.MusicInfoWrap>
              <h3>{content.title}</h3>
              <p>{content.artist}</p>
            </QB.MusicInfoWrap>
          </QB.QueueSong>
        );
      })}
    </QB.QueueWrap>
  );
};

export default QueueBox;
