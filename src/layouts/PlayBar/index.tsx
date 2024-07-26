import React, { useEffect, useRef, useCallback, useState } from "react";
import { nowPlayingStore } from "../../stores/nowPlayingStore";
import { PlayTimeStore } from "../../stores/PlayTimeStore";
import * as PB from "./style";
import { playQueueStore } from "../../stores/playQueueStore";
import { loopShuffleStore } from "../../stores/loopShuffleStore";
import { PlayStateStore } from "../../stores/playStateStore";
import useAudioControls from "../../hooks/useAudioControl";
import useProgress from "../../hooks/useProgress";

import next from "../../assets/imgs/next.svg";
import play from "../../assets/imgs/play.svg";
import pause from "../../assets/imgs/pause.svg";
import prev from "../../assets/imgs/prev.svg";
import shuffle from "../../assets/imgs/shuffleOn.svg";
import unShuffle from "../../assets/imgs/shuffleOff.svg";
import loop from "../../assets/imgs/repeatOn.svg";
import unloop from "../../assets/imgs/repeatOff.svg";
import playlistPlus from '../../assets/imgs/playlistPlus.svg';

const PlayBar: React.FC = () => {
  const playState = PlayStateStore((state) => state.playState);
  const setPlayState = PlayStateStore((state) => state.setPlayState);

  const nowPlaying = nowPlayingStore((state) => state.nowPlaying);
  const setNowPlaying = nowPlayingStore((state) => state.setNowPlaying);

  const updateCurrTime = PlayTimeStore((state) => state.updateCurrTime);
  const fullDuration = PlayTimeStore((state) => state.fullDuration);

  const loopState = loopShuffleStore((state) => state.loopState);
  const shuffleState = loopShuffleStore((state) => state.shuffleState);
  const setLoopState = loopShuffleStore((state) => state.setLoopState);
  const setShuffleState = loopShuffleStore((state) => state.setShuffleState);

  const queue = playQueueStore((state) => state.queue);
  const currIdx = queue.findIndex((song) => song.title === nowPlaying.title);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const {
    volume,
    volIndicator,
    volController,
    setVolController,
    updateVolume,
  } = useAudioControls(audioRef);

  const [initialRender, setInitialRender] = useState(true);

  const { progress, time, updatePlayTime, handleMouseDown, currTime } = useProgress(audioRef, fullDuration);

  const getRandom = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  const musicEndEvent = () => {
    if (loopState && shuffleState) {
      setNowPlaying(queue[getRandom(0, queue.length - 1)]);
    } else {
      nextMusic();
    }
  };

  const initializeTime = () => {
    if(audioRef.current){
      updateCurrTime({ currTime: 0 });
      audioRef.current.currentTime = 0;
    }
  }

  const playMusic = () => {
    if (audioRef.current) {
      if (nowPlaying.title !== "") {
        audioRef.current.play();
        setPlayState(true);
      }
    }
  };

  const pauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setPlayState(false);
  };


  const prevMusic = () => {
    if (currTime < 20) {
      if (queue.length && currIdx > 0) {
        setNowPlaying(queue[currIdx - 1]);
      }else{
        initializeTime();
      }
    }else{
      initializeTime();
    }
  };

  const nextMusic = () => {
    if (queue.length) {
      if (currIdx < queue.length - 1) {
        setNowPlaying(queue[currIdx + 1]);
      } else if (loopState) {
        setNowPlaying(queue[0]);
      }
    }
  };

  const stopPlay = () => {
    if (audioRef.current?.paused) {
      setPlayState(false);
    }
  };

  const startPlay = () => {
    if (audioRef.current?.played) {
      setPlayState(true);
    }
  };

  const swapLoopState = () => {
    setLoopState({ loopState: !loopState });
    if (loopState && shuffleState) {
      setShuffleState({ shuffleState: false });
    }
  };

  const swapShuffleState = () => {
    setShuffleState({ shuffleState: !shuffleState });
    if (!loopState && !shuffleState) {
      setLoopState({ loopState: true });
    }
  };

  const handleVolumeClick = useCallback(
    (e: MouseEvent) => {
      if ((e.target as HTMLElement).className.includes('volume')) {
        if((e.target as HTMLElement).className.includes('volBtn')) {
          setVolController(prev=>!prev);
        }
      } else {
        setVolController(false);
      }
    },
    [setVolController]
  );

  useEffect(() => {
    document.documentElement.addEventListener("click", handleVolumeClick);
    return () => {
      document.documentElement.removeEventListener("click", handleVolumeClick);
    };
  }, [handleVolumeClick]);

  useEffect(() => {
    if(initialRender) {
      setPlayState(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      updateCurrTime({ currTime: 0 });
      setInitialRender(false);
    }else{
      if (nowPlaying.title && audioRef.current) {
        audioRef.current.play().catch((err) => {
          if (err instanceof DOMException) {
            setPlayState(false);
            if (audioRef.current) {
              audioRef.current.pause();
            }
            updateCurrTime({ currTime: 0 });
          }
        });
      }
    }
  }, [nowPlaying]);

  return (
    <PB.PlayBarWrap>
      <PB.ProgressBarWrap onMouseDown={handleMouseDown} id="progressBar">
        <PB.ProgressBar progress={progress}></PB.ProgressBar>
      </PB.ProgressBarWrap>
      <PB.SongControlWrap>
        <PB.SongWrap>
          <audio
            src={nowPlaying.url}
            id="audio"
            onTimeUpdate={updatePlayTime}
            onEnded={musicEndEvent}
            ref={audioRef}
            onPause={stopPlay}
            onPlay={startPlay}
          ></audio>
          <PB.AlbumCoverWrap>
            <PB.AlbumCover
              src={
                nowPlaying.thumbnailUrl ||
                "https://static-00.iconduck.com/assets.00/music-notes-icon-2048x2046-o5kli2nk.png"
              }
              alt={`${nowPlaying.id}`}
            />
          </PB.AlbumCoverWrap>
          <PB.MusicInfoWrap>
            <PB.Title>
              {nowPlaying.title || "재생 중인 곡이 없습니다."}
            </PB.Title>
            <PB.Artist>{nowPlaying.artist.nickname}</PB.Artist>
          </PB.MusicInfoWrap>
        </PB.SongWrap>
        <PB.PlayBtnsWrap>
          <PB.PlayBtn src={prev} onClick={prevMusic} />
          {playState ? (
            <PB.PlayBtn src={pause} onClick={pauseMusic} />
          ) : (
            <PB.PlayBtn src={play} onClick={playMusic} />
          )}
          <PB.PlayBtn src={next} onClick={nextMusic} />
        </PB.PlayBtnsWrap>
        <PB.TimeIndicatorWrap>
          <PB.StateIndicator
            src={playlistPlus}
            style={{ width: "3rem", height: "3rem" }}
          />
          {loopState ? (
            <PB.StateIndicator src={loop} onClick={swapLoopState} />
          ) : (
            <PB.StateIndicator src={unloop} onClick={swapLoopState} />
          )}
          {shuffleState ? (
            <PB.StateIndicator src={shuffle} onClick={swapShuffleState} />
          ) : (
            <PB.StateIndicator src={unShuffle} onClick={swapShuffleState} />
          )}
          <PB.StateIndicator
            src={volIndicator}
            alt="Volume Indicator"
            className="volume volBtn"
          />
          {volController && (
            <PB.VolumeControllerWrap className="volume">
              <PB.VolumeController
                type="range"
                min={0}
                max={1}
                step={0.1}
                onChange={updateVolume}
                value={volume}
                className="volume"
              />
            </PB.VolumeControllerWrap>
          )}
          <PB.TimeIndicator>
            {time.min}:{time.sec}
          </PB.TimeIndicator>
        </PB.TimeIndicatorWrap>
      </PB.SongControlWrap>
    </PB.PlayBarWrap>
  );
};

export default PlayBar;
