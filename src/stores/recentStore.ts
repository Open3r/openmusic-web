import { create } from "zustand";
import { Song } from "../interfaces/Song";

export interface RecentUpdate {
  recentUpdate: Song[];
  setRecentUpdate: (update: Song[]) => void;
}

export const recentUpdateStore = create<RecentUpdate>((set) => ({
  recentUpdate: [],
  setRecentUpdate: (recentUpdate) => set({ recentUpdate }),
}));
