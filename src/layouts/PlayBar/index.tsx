import { useEffect, useState, useRef, useCallback } from "react";
import { nowPlayingStore } from "../../stores/nowPlayingStore";
import { PlayTimeStore } from "../../stores/PlayTimeStore";
import * as PB from "./style";
import { playQueueStore } from "../../stores/playQueueStore";
import { loopShuffleStore } from "../../stores/loopShuffleStore";

import next from "../../assets/imgs/next.svg";
import play from "../../assets/imgs/play.svg";
import pause from "../../assets/imgs/pause.svg";
import prev from "../../assets/imgs/prev.svg";
import shuffle from "../../assets/imgs/shuffleOn.svg";
import unShuffle from "../../assets/imgs/shuffleOff.svg";
import loop from "../../assets/imgs/repeatOn.svg";
import unloop from "../../assets/imgs/repeatOff.svg";
import volMax from "../../assets/imgs/max.svg";
import volMed from "../../assets/imgs/medium.svg";
import volMin from "../../assets/imgs/low.svg";
import mute from "../../assets/imgs/mute.svg";

const PlayBar = () => {
  const nowPlaying = nowPlayingStore((state) => state.nowPlaying);
  const setNowPlaying = nowPlayingStore((state) => state.setNowPlaying);

  const updateCurrTime = PlayTimeStore((state) => state.updateCurrTime);
  const setFullDuration = PlayTimeStore((state) => state.setFullDuration);
  const currTime = PlayTimeStore((state) => state.currTime);
  const fullDuration = PlayTimeStore((state) => state.fullDuration);

  const loopState = loopShuffleStore((state) => state.loopState);
  const shuffleState = loopShuffleStore((state) => state.shuffleState);
  const setLoopState = loopShuffleStore((state) => state.setLoopState);
  const setShuffleState = loopShuffleStore((state) => state.setShuffleState);

  const queue = playQueueStore((state) => state.queue);
  const currIdx = queue.findIndex((song) => song.title === nowPlaying.title);

  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState({ min: 0, sec: "00" });
  const [playState, setPlayState] = useState(false);
  const [volume, setVolume] = useState(1);
  const [volIndicator, setVolIndicator] = useState("max");
  const [volController, setVolController] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    if (nowPlaying.title && audioRef.current) {
      setPlayState(true);
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
  }, [nowPlaying, updateCurrTime]);

  useEffect(() => {
    const savedVolume = Number(localStorage.getItem("volume"));
    setVolume(savedVolume);
    if (audioRef.current) {
      audioRef.current.volume = savedVolume;
    }
  }, []);

  useEffect(() => {
    if (currTime > 0) {
      setProgress((currTime / fullDuration) * 100);
    }
    const seconds = Math.floor(currTime % 60);
    setTime({
      min: Math.floor(currTime / 60),
      sec: seconds < 10 ? `0${seconds}` : `${seconds}`,
    });
  }, [currTime, fullDuration]);

  useEffect(() => {
    if (volume >= 0.66) {
      setVolIndicator(volMax);
    } else if (volume >= 0.33) {
      setVolIndicator(volMed);
    } else if (volume > 0) {
      setVolIndicator(volMin);
    } else {
      setVolIndicator(mute);
    }
  }, [volume]);

  const updatePlayTime = (e: any) => {
    updateCurrTime({ currTime: e.currentTarget.currentTime });
    setFullDuration({ fullDuration: e.currentTarget.duration });
  };

  const changeProgress = useCallback(
    (e: MouseEvent) => {
      const progressBar = document.getElementById("progressBar") as HTMLDivElement;
      const progressWidth = progressBar.clientWidth;
      const mouseX = e.clientX - progressBar.getBoundingClientRect().left;
      if (audioRef.current) {
        audioRef.current.currentTime = (mouseX / progressWidth) * fullDuration;
      }
    },
    [fullDuration]
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    isDragging.current = true;
    changeProgress(e as unknown as MouseEvent);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging.current) {
        changeProgress(e);
      }
    },
    [changeProgress]
  );

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

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
      if (nowPlaying.title != "") {
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

  const isPlay = () => {
    if (audioRef.current?.paused) {
      setPlayState(false);
    }
  };

  const updateVolume = (e: any) => {
    const newVolume = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setVolume(newVolume);
    localStorage.setItem("volume", `${newVolume}`);
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

  const handleVolumeClick = useCallback((e: any) => {
    if (["volIndicator", "volConWrap", "volCon"].includes(e.target.id)) {
      setVolController((prev) => !prev);
    } else {
      setVolController(false);
    }
  }, []);

  useEffect(() => {
    document.documentElement.addEventListener("click", handleVolumeClick);
    return () => {
      document.documentElement.removeEventListener("click", handleVolumeClick);
    };
  }, [handleVolumeClick]);

  return (
    <PB.PlayBarWrap>
      <PB.ProgressBarWrap
        onMouseDown={handleMouseDown}
        id="progressBar"
      >
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
            onPause={isPlay}
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
