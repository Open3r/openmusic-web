import { create } from "zustand";

interface SongIdUpdate {
  songId: number;
  setSongIdUpdate: (songId: number) => void;
}

export const songIdUpdate = create<SongIdUpdate>((set) => ({
  songId: 0,
  setSongIdUpdate: (songId) => set({ songId }),
}));
