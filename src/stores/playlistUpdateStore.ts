import { create } from "zustand";

interface PlaylistUpdate {
  update: boolean;
  setUpdate: (update: boolean) => void;
}

export const playlistUpdateStore = create<PlaylistUpdate>((set) => ({
  update: false,
  setUpdate: (update) => set({ update })
}));