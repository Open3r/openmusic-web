import { useState, useEffect, MutableRefObject } from "react";
import volMax from "../assets/imgs/max.svg";
import volMed from "../assets/imgs/medium.svg";
import volMin from "../assets/imgs/low.svg";
import mute from "../assets/imgs/mute.svg";

const useAudioControls = (audioRef: MutableRefObject<HTMLAudioElement | null>) => {
  const [volume, setVolume] = useState<number>(1);
  const [volIndicator, setVolIndicator] = useState<string>(volMax);
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
      setVolIndicator(volMax);
    } else if (volume >= 0.33) {
      setVolIndicator(volMed);
    } else if (volume > 0) {
      setVolIndicator(volMin);
    } else {
      setVolIndicator(mute);
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
