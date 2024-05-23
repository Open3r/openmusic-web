import { useEffect, useState, useRef, useCallback } from "react";
import { nowPlayingStore } from "../../store/nowPlayingStore";
import { PlayTimeStore } from "../../store/PlayTImeStore";
import * as PB from "./PlayBar.style";
import { playQueueStore } from "../../store/playQueueStore";
import { loopShuffleStore } from "../../store/loopShuffleStore";

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

  useEffect(() => {
    if (nowPlaying.title && audioRef.current) {
      setPlayState(true);
      audioRef.current.play().catch((err) => {
        if (err instanceof DOMException) {
          setPlayState(false);
          if(audioRef.current) {
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
      setVolIndicator("max");
    } else if (volume >= 0.33) {
      setVolIndicator("medium");
    } else if (volume > 0) {
      setVolIndicator("low");
    } else {
      setVolIndicator("mute");
    }
  }, [volume]);

  const updatePlayTime = (e:any) => {
    updateCurrTime({ currTime: e.currentTarget.currentTime });
    setFullDuration({ fullDuration: e.currentTarget.duration });
  };

  const changeProgress = (e:any) => {
    const progressBar = document.getElementById("progressBar") as HTMLDivElement;
    const progressWidth = progressBar.clientWidth;
    const mouseX = e.clientX - progressBar.getBoundingClientRect().left;
    if (audioRef.current) {
      audioRef.current.currentTime = (mouseX / progressWidth) * fullDuration;
    }
  };

  const getRandom = (min:number, max:number) => Math.floor(Math.random() * (max - min + 1)) + min;

  const musicEndEvent = () => {
    if (loopState && shuffleState) {
      setNowPlaying(queue[getRandom(0, queue.length - 1)]);
    } else {
      nextMusic();
    }
  };

  const playMusic = () => {
    if(audioRef.current) {
      if (nowPlaying.title != "") {
        audioRef.current.play();
        setPlayState(true);
      }
    }
    
  };

  const pauseMusic = () => {
    if(audioRef.current) {
      audioRef.current.pause();
   }
    setPlayState(false);
  };

  const prevMusic = () => {
    if (queue.length && currIdx > 0) {
      setNowPlaying(queue[currIdx - 1]);
    } else {
      alert("재생목록에 곡이 없습니다.");
    }
  };

  const nextMusic = () => {
    if (queue.length) {
      if (currIdx < queue.length - 1) {
        setNowPlaying(queue[currIdx + 1]);
      } else if (loopState) {
        setNowPlaying(queue[0]);
      }
    } else {
      alert("재생목록에 곡이 없습니다.");
    }
  };

  const updateVolume = (e:any) => {
    const newVolume = Number(e.target.value);
    if(audioRef.current) {
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
    if (loopState && shuffleState) {
      setLoopState({ loopState: false });
    }
  };

  const handleVolumeClick = useCallback((e:any) => {
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
      <PB.ProgressBarWrap onClick={changeProgress} id="progressBar">
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
          ></audio>
          <PB.AlbumCoverWrap>
            <PB.AlbumCover
              src={nowPlaying.thumbnailUrl || "https://static-00.iconduck.com/assets.00/music-notes-icon-2048x2046-o5kli2nk.png"}
              alt={`${nowPlaying.idx}`}
            />
          </PB.AlbumCoverWrap>
          <PB.MusicInfoWrap>
            <PB.Title>{nowPlaying.title || "재생 중인 곡이 없습니다."}</PB.Title>
            <PB.Artist>{nowPlaying.artist}</PB.Artist>
          </PB.MusicInfoWrap>
        </PB.SongWrap>
        <PB.PlayBtnsWrap>
          <PB.PlayBtn src="../assets/imgs/prev.svg" onClick={prevMusic} />
          {playState ? (
            <PB.PlayBtn src="../assets/imgs/pause.svg" onClick={pauseMusic} />
          ) : (
            <PB.PlayBtn src="../assets/imgs/play.svg" onClick={playMusic} />
          )}
          <PB.PlayBtn src="../assets/imgs/next.svg" onClick={nextMusic} />
        </PB.PlayBtnsWrap>
        <PB.TimeIndicatorWrap>
          <PB.stateIndicator
            src={`../assets/imgs/repeat${loopState ? "On" : "Off"}.svg`}
            onClick={swapLoopState}
          />
          <PB.stateIndicator
            src={`../assets/imgs/shuffle${shuffleState ? "On" : "Off"}.svg`}
            onClick={swapShuffleState}
          />
          <PB.stateIndicator
            src={`../assets/imgs/${volIndicator}.svg`}
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
