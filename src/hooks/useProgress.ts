import { useState, useRef, useCallback, useEffect, MutableRefObject } from "react";
import { PlayTimeStore } from "../stores/PlayTimeStore";

const useProgress = (audioRef: MutableRefObject<HTMLAudioElement | null>,fullDuration: number) => {
  const updateCurrTime = PlayTimeStore((state) => state.updateCurrTime);
  const setFullDuration = PlayTimeStore((state) => state.setFullDuration);
  const currTime = PlayTimeStore((state) => state.currTime);

  const [progress, setProgress] = useState<number>(0);
  const [time, setTime] = useState<{ min: number; sec: string }>({ min: 0, sec: "00" });
  const isDragging = useRef<boolean>(false);

  const updatePlayTime = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    const target = e.currentTarget;
    updateCurrTime({ currTime: target.currentTime });
    setFullDuration({ fullDuration: target.duration });
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
    [fullDuration, audioRef]
  );

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
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        changeProgress(e);
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [changeProgress]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    isDragging.current = true;
    changeProgress(e as unknown as MouseEvent);
  };

  return {
    progress,
    time,
    currTime,
    updatePlayTime,
    handleMouseDown,
    setProgress
  };
};

export default useProgress;
