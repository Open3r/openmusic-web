import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PlayState {
  playState: boolean;
  setPlayState: (playState: boolean) => void;
}

export const PlayStateStore = create(
  persist<PlayState>(
    (set) => ({
      playState: false,
      setPlayState: (playState) => set({ playState }),
    }),
    {
      name: "play-state-store",
    }
  )
);