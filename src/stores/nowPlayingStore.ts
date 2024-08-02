import { create } from "zustand";

interface SongIdUpdate {
  songId: {songIdentify:number};
  setSongIdUpdate: ({songIdentify}:{songIdentify:number}) => void;
}

export const songIdUpdate = create<SongIdUpdate>((set) => ({
  songId: {songIdentify:0},
  setSongIdUpdate: ({songIdentify}) => set({ songId:{songIdentify}}),
}));
