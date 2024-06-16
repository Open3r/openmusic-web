import React, { useEffect, useRef, useCallback } from "react";
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

  const {volume, volIndicator, volController, setVolController, updateVolume} = useAudioControls(audioRef);

  const { progress, time, updatePlayTime, handleMouseDown } = useProgress(audioRef,fullDuration);


  const getRandom = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const musicEndEvent = () => {
    if (loopState && shuffleState) {
      setNowPlaying(queue[getRandom(0, queue.length - 1)]);
    } else {
      nextMusic();
    }
  };

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
    if (queue.length && currIdx > 0) {
      setNowPlaying(queue[currIdx - 1]);
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
      if (
        ["volIndicator", "volConWrap", "volCon"].includes(
          (e.target as HTMLElement).id
        )
      ) {
        setVolController((prev) => !prev);
      } else {
        setVolController(false);
      }
    },[setVolController]);

  useEffect(() => {
    document.documentElement.addEventListener("click", handleVolumeClick);
    return () => {
      document.documentElement.removeEventListener("click", handleVolumeClick);
    };
  }, [handleVolumeClick]);

  useEffect(() => {
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
  }, [nowPlaying, updateCurrTime, setPlayState]);

  if (
    window.location.pathname == "/login" ||
    window.location.pathname == "/signup" ||
    window.location.pathname == "/verify"
  ) {
    return null;
  }

  return (
    <PB.PlayBarWrap>
      <PB.ProgressBarWrap onMouseDown={handleMouseDown} id="progressBar">
        <PB.ProgressBar progress={progress}></PB.ProgressBar>
      </PB.ProgressBarWrap>
      <PB.SongControlWrap>
        <PB.SongWrap>
          <audio
            src={nowPlaying.musicUrl}
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
              alt={`${nowPlaying.idx}`}
            />
          </PB.AlbumCoverWrap>
          <PB.MusicInfoWrap>
            <PB.Title>
              {nowPlaying.title || "재생 중인 곡이 없습니다."}
            </PB.Title>
            <PB.Artist>{nowPlaying.artist}</PB.Artist>
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
          {loopState ? (
            <PB.stateIndicator src={loop} onClick={swapLoopState} />
          ) : (
            <PB.stateIndicator src={unloop} onClick={swapLoopState} />
          )}
          {shuffleState ? (
            <PB.stateIndicator src={shuffle} onClick={swapShuffleState} />
          ) : (
            <PB.stateIndicator src={unShuffle} onClick={swapShuffleState} />
          )}
          <PB.stateIndicator
            src={volIndicator}
            alt="Volume Indicator"
            id="volIndicator"
          />
          {volController && (
            <PB.volumeControllerWrap id="volConWrap">
              <PB.volumeController
                type="range"
                min={0}
                max={1}
                step={0.1}
                onChange={updateVolume}
                value={volume}
                id="volCon"
              />
            </PB.volumeControllerWrap>
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
