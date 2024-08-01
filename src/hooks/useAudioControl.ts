import { useState, useEffect, MutableRefObject } from "react";

const useAudioControls = (audioRef: MutableRefObject<HTMLAudioElement | null>) => {
  const [volume, setVolume] = useState<number>(1);
  const [volIndicator, setVolIndicator] = useState<string>(
    "/assets/imgs/max.svg"
  );
  const [volController, setVolController] = useState<boolean>(false);

  const updateVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setVolume(newVolume);
    localStorage.setItem("volume", `${newVolume}`);
  };

  useEffect(() => {
    const savedVolume = Number(localStorage.getItem("volume"));
    setVolume(savedVolume);
    if (audioRef.current) {
      audioRef.current.volume = savedVolume;
    }
  }, [audioRef]);

  useEffect(() => {
    if (volume >= 0.66) {
      setVolIndicator("/assets/imgs/max.svg");
    } else if (volume >= 0.33) {
      setVolIndicator("/assets/imgs/medium.svg");
    } else if (volume > 0) {
      setVolIndicator("/assets/imgs/low.svg");
    } else {
      setVolIndicator("/assets/imgs/mute.svg");
    }
  }, [volume]);

  return {
    volume,
    volIndicator,
    volController,
    setVolController,
    updateVolume,
  };
};

export default useAudioControls;
