import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Song } from "../interfaces/Song";

interface RecentlyPlay {
  recentlyPlayed: Song[];
  storeRecently: (song: Song) => void;
}

export const recentlyPlayStore = create(
  persist<RecentlyPlay>(
    (set, get) => ({
      recentlyPlayed: [],
      storeRecently: (song) => {
        const { recentlyPlayed } = get();
        if (!recentlyPlayed.some((item) => item.idx === song.idx && item.artist == song.artist)) {
          set({ recentlyPlayed: [...recentlyPlayed, song] });
        }
      }
    }),
    {
      name: "recently-play-store"
    }
  )
);