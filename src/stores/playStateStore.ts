import { create } from "zustand";

interface PlayState {
  playState: boolean;
  setPlayState: (playState: boolean) => void;
}

export const PlayStateStore = create<PlayState>((set) => ({
    playState: false,
    setPlayState: (playState) => set({ playState }),
  })
);