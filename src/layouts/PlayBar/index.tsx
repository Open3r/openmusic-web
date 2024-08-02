import { useEffect, useRef, useCallback, useState } from "react";
import { PlayTimeStore } from "../../stores/PlayTimeStore";
import * as PB from "./style";
import { loopShuffleStore } from "../../stores/loopShuffleStore";
import { PlayStateStore } from "../../stores/playStateStore";
import useAudioControls from "../../hooks/useAudioControl";
import useProgress from "../../hooks/useProgress";
import { PlaylistType } from "../../interfaces/playlist";
import instance from "../../libs/axios/customAxios";
import PlaylistBox from "../../components/PlaylistBox";
import { playlistUpdateStore } from "../../stores/playlistUpdateStore";
import { paging } from "../../libs/axios/paging";
import { likeUpdateStore } from "../../stores/likeUpdateStore";
import { Song } from "../../interfaces/Song";
import { songIdUpdate } from "../../stores/nowPlayingStore";
import { queueUpdateStore } from "../../stores/queueStore";
import { AxiosError } from "axios";
import { recentUpdateStore } from "../../stores/recentStore";
import NotificationService from "../../libs/notification/NotificationService";
import { queueStateUpdateStore } from "../../stores/queueStateStore";
import { getCookie } from "../../libs/cookies/cookie";

const PlayBar = () => {
  const playState = PlayStateStore((state) => state.playState);
  const setPlayState = PlayStateStore((state) => state.setPlayState);

  const [nowPlaying, setNowPlaying] = useState<Song>();

  const updateCurrTime = PlayTimeStore((state) => state.updateCurrTime);
  const fullDuration = PlayTimeStore((state) => state.fullDuration);

  const loopState = loopShuffleStore((state) => state.loopState);
  const shuffleState = loopShuffleStore((state) => state.shuffleState);
  const setLoopState = loopShuffleStore((state) => state.setLoopState);
  const setShuffleState = loopShuffleStore((state) => state.setShuffleState);

  const update = playlistUpdateStore(state=>state.update);
  const setUpdate = playlistUpdateStore(state=>state.setUpdate);

  const queue = queueUpdateStore(state=>state.queueUpdate);
  const [currIdx, setCurrIdx] = useState<number | undefined>(0);

  const setLikeUpdate = likeUpdateStore(state=>state.setLikeUpdate);

  const setSongIdUpdate = songIdUpdate((state) => state.setSongIdUpdate);
  const setQueueUpdate = queueUpdateStore((state) => state.setQueueUpdate);
  const setRecentUpdate = recentUpdateStore((state) => state.setRecentUpdate);
  const setQueueStateUpdate = queueStateUpdateStore(state=>state.setQueueStateUpdate);

  const songId = songIdUpdate(state=>state.songId);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const {
    volume,
    volIndicator,
    volController,
    setVolController,
    updateVolume,
  } = useAudioControls(audioRef);

  const [initialRender, setInitialRender] = useState(true);
  const [myPlaylists, setMyPlaylists] = useState<PlaylistType[]>();
  const [playlistModal, setPlaylistModal] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  const accessToken = getCookie('accessToken');

  const { progress, time, updatePlayTime, handleMouseDown, currTime } = useProgress(audioRef, fullDuration);

  const getRandom = (min: number, max: number) => {
    const prev = currIdx;
    let rand = Math.floor(Math.random() * (max - min + 1)) + min;
    while(prev == rand) {
      rand = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return rand;
  }

  const myPlaylistReq = async () => {
    await instance
      .get("/users/me/playlists", { params: paging })
      .then((res) => {
        setMyPlaylists(res.data.data.content);
      });
  };


  useEffect(() => {
    if(accessToken) {
      myPlaylistReq();
      setUpdate(false);
    } 
  }, [update]);

  const queueReq = async () => {
    const res = await instance.get('users/me/queue');
    setQueueUpdate(res.data.data);
  }

  useEffect(()=>{
    if(accessToken) {
      queueReq();
    }
  },[]);

  
  
  
  const likeReq = async () => {
    setLikeLoading(true);
    if (!likeLoading) {
      await instance
        .post(`/songs/${nowPlaying?.id}/likes`)
        .then((res) => {
          setNowPlaying(res.data.data);
          setLikeUpdate(true);
        })
        .finally(() => {
          setLikeLoading(false);
        });
    }
  };

  const unlikeReq = async () => {
    setLikeLoading(true);
    if (!likeLoading) {
      await instance
        .delete(`/songs/${nowPlaying?.id}/likes`)
        .then((res) => {
          setNowPlaying(res.data.data);
          setLikeUpdate(true);
        })
        .finally(() => {
          setLikeLoading(false);
        });
    }
  };

  const nowPlayingReq = async () => {
    if (songId.songIdentify !== 0) {
      if (queue) {
        const idx = queue.findIndex((song) => songId.songIdentify === song.id);
        if (idx === -1) {
          const res = await instance.get(`/songs/${songId}`);
          setNowPlaying(res.data.data);
          setCurrIdx(queue.length);
        } else {
          setCurrIdx(queue.length);
          setNowPlaying(queue[idx]);
          setCurrIdx(idx);
        }
        setPlayState(true);
      }
    }
  };

  useEffect(()=>{
    if(accessToken){
      nowPlayingReq();
      if (initialRender) {
        initializeTime();
        setPlayState(false);
        if (audioRef.current) {
          audioRef.current.pause();
        }
        updateCurrTime({ currTime: 0 });
        setInitialRender(false);
      } else {
        if (songId && audioRef.current) {
          updateCurrTime({ currTime: 0 });
          initializeTime();
          audioRef.current.oncanplaythrough = () => {
            if (audioRef.current) {
              audioRef.current.play();
            }
          };
        }
      }
    }
  },[songId]);


  const initializeTime = () => {
    if(audioRef.current){
      updateCurrTime({ currTime: 0 });
      audioRef.current.currentTime = 0;
    }
  }

  const playMusic = () => {
    if (audioRef.current) {
      if (nowPlaying?.title !== "") {
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


  const playAnother = (song:Song) => {
    instance
      .post("/users/me/queue", { songId: song.id })
      .then(() => {
        instance.get("/users/me/queue").then((res) => {
          setQueueUpdate(res.data.data);
          setSongIdUpdate({songIdentify:song.id});
          instance.post("/users/me/recents", { songId: song.id }).then(() => {
            instance.get("/users/me/recents").then((res) => {
              setRecentUpdate(res.data.data);
            });
          });
        });
      })
      .catch((err: AxiosError) => {
        if (err.response && err.response.status === 400) {
          instance.get("/users/me/queue").then((res) => {
            setQueueUpdate(res.data.data);
            setSongIdUpdate({songIdentify:song.id});
            instance
              .post("/users/me/recents", { songId: song.id })
              .then(() => {
                instance.get("/users/me/recents").then((res) => {
                  setRecentUpdate(res.data.data);
                });
              });
          });
        }
      });
  }

  const nextMusic = () => {
    if (currIdx !== undefined && queue && queue.length) {
      if (currIdx < queue.length - 1) {
        if(shuffleState){
          playAnother(queue[getRandom(0,queue.length - 1)]);
        }else{
          playAnother(queue[currIdx + 1]);
        }
      }
      if (currIdx === queue.length - 1) {
        if(loopState) {
          if(shuffleState) {
            playAnother(queue[getRandom(0, queue.length - 1)]);
          }else{
            playAnother(queue[0]);
          }
        }
      }
    }
  };

  const prevMusic = () => {
    if (currTime < 20) {
      if (queue && currIdx && queue.length && currIdx > 0) {
        playAnother(queue[currIdx - 1]);
      } else if (queue?.length && currIdx === 0) {
        playAnother(queue[queue.length - 1]);
      } else {
        initializeTime();
      }
    } else {
      initializeTime();
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

  const handleSpace = useCallback(
    (e:KeyboardEvent) => {
      if (
        (e.target as HTMLElement).tagName === "INPUT" ||
        (e.target as HTMLElement).tagName === "TEXTAREA"
      ) {
        return;
      }
      if (e.key === " ") {
        e.preventDefault();
        if (playState) {
          audioRef.current?.pause();
          setPlayState(false);
        } else {
          audioRef.current?.play();
          setPlayState(true);
        }
      }
    },
    [playState, setPlayState]
  );

  useEffect(() => {
    document.documentElement.addEventListener("click", handleVolumeClick);
    return () => {
      document.documentElement.removeEventListener("click", handleVolumeClick);
    };
  }, [handleVolumeClick]);

  useEffect(() => {
    document.addEventListener("keydown", handleSpace);
    return () => {
      document.removeEventListener("keydown", handleSpace);
    }
  }, [handleSpace]);


  const handleAddPlaylistClick = useCallback(
    (e: MouseEvent) => {
      if ((e.target as HTMLElement).className.includes("playlist")) {
        if ((e.target as HTMLElement).className.includes("addBtn")) {
          setPlaylistModal((prev) => !prev);
        }
      } else {
        setPlaylistModal(false);
      }
    },
    [setPlaylistModal]
  );

  useEffect(() => {
    document.addEventListener("click", handleAddPlaylistClick);
    return () => {
      document.removeEventListener("click", handleAddPlaylistClick);
    };
  }, [handleAddPlaylistClick]);

  const addToQueue = async () => {
    await instance.post('/users/me/queue',{songId})
    .then(()=>{
      NotificationService.success('재생목록에 곡이 추가되었습니다.');
      setQueueStateUpdate(true);
    })
    .catch((err:AxiosError)=>{
      if(err.response && err.response.status === 400) {
        NotificationService.warn('이미 추가된 곡입니다.');
      }
    });
  }

  return (
    <PB.PlayBarWrap>
      <PB.ProgressBarWrap onMouseDown={handleMouseDown} id="progressBar">
        <PB.ProgressBar progress={progress}></PB.ProgressBar>
      </PB.ProgressBarWrap>
      <PB.SongControlWrap>
        <PB.SongWrap>
          <audio
            src={nowPlaying?.url}
            id="audio"
            onTimeUpdate={updatePlayTime}
            onEnded={nextMusic}
            ref={audioRef}
            onPause={stopPlay}
            onPlay={startPlay}
            controlsList="nodownload"
          ></audio>
          <PB.AlbumCoverWrap>
            <PB.AlbumCover
              src={
                nowPlaying?.thumbnailUrl ||
                "https://static-00.iconduck.com/assets.00/music-notes-icon-2048x2046-o5kli2nk.png"
              }
              alt={`${nowPlaying?.id}`}
            />
          </PB.AlbumCoverWrap>
          <PB.MusicInfoWrap>
            <PB.Title>
              {nowPlaying?.title || "재생 중인 곡이 없습니다."}
            </PB.Title>
            <PB.Artist>{nowPlaying?.artist.nickname}</PB.Artist>
          </PB.MusicInfoWrap>
        </PB.SongWrap>
        <PB.PlayBtnsWrap>
          <PB.PlayBtn src="/assets/imgs/prev.svg" onClick={prevMusic} />
          {playState ? (
            <PB.PlayBtn src="/assets/imgs/pause.svg" onClick={pauseMusic} />
          ) : (
            <PB.PlayBtn src="/assets/imgs/play.svg" onClick={playMusic} />
          )}
          <PB.PlayBtn src="/assets/imgs/next.svg" onClick={nextMusic} />
        </PB.PlayBtnsWrap>
        <PB.TimeIndicatorWrap>
          {!nowPlaying?.liked ? (
            <PB.StateIndicator
              src="/assets/imgs/unlike.svg"
              style={{ width: "3rem", height: "3rem" }}
              onClick={likeReq}
            />
          ) : (
            <PB.StateIndicator
              src="/assets/imgs/like.svg"
              style={{ width: "3rem", height: "3rem" }}
              onClick={unlikeReq}
            />
          )}

          <PB.StateIndicator
            src="/assets/imgs/playlistPlus.svg"
            style={{ width: "3rem", height: "3rem" }}
            className="addBtn playlist"
          />
          {playlistModal ? (
            <PB.AddToPlaylistWrap className="playlist">
              <h1
                style={{
                  height: "3rem",
                  padding: "0 1rem",
                  boxSizing: "border-box",
                  fontSize: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                }}
                className="playlist"
              >
                플레이리스트에 추가
              </h1>
              <PB.AddToPlaylistMain className="playlist">
                {myPlaylists?.map((item) => (
                  <PlaylistBox
                    item={item}
                    key={item.id}
                    type="playbar"
                    songId={nowPlaying?.id}
                  />
                ))}
                <PB.AddToQueue onClick={addToQueue}>
                  재생목록에 추가
                </PB.AddToQueue>
              </PB.AddToPlaylistMain>
            </PB.AddToPlaylistWrap>
          ) : null}
          {loopState ? (
            <PB.StateIndicator
              src="/assets/imgs/repeatOn.svg"
              onClick={swapLoopState}
            />
          ) : (
            <PB.StateIndicator
              src="/assets/imgs/repeatOff.svg"
              onClick={swapLoopState}
            />
          )}
          {shuffleState ? (
            <PB.StateIndicator
              src="/assets/imgs/shuffleOn.svg"
              onClick={swapShuffleState}
            />
          ) : (
            <PB.StateIndicator
              src="/assets/imgs/shuffleOff.svg"
              onClick={swapShuffleState}
            />
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
