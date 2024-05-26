import { create } from "zustand";

interface PlayTime {
  currTime: number;
  fullDuration: number;
  setFullDuration: (source: { fullDuration: number }) => void;
  updateCurrTime: (source: { currTime: number }) => void;
}

export const PlayTimeStore = create<PlayTime>((set)=>({
  currTime: 0,
  fullDuration: 0,
  setFullDuration: ({ fullDuration }) => set({ fullDuration }),
  updateCurrTime: ({ currTime }) => set({ currTime }),
}));

