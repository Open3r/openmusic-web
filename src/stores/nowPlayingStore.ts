import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Artist } from "../interfaces/artist";

interface NowPlaying {
  nowPlaying: {
    artist: Artist;
    title: string;
    id: number;
    url: string;
    thumbnailUrl: string;
  };
  setNowPlaying: (source: {
    artist: Artist;
    title: string;
    id: number;
    url: string;
    thumbnailUrl: string;
  }) => void;
}

export const nowPlayingStore = create(
  persist<NowPlaying>(
    (set) => ({
      nowPlaying: {
        artist: {
          id:0,
          nickname:"",
          avatarUrl:"",
        },
        title: "",
        id: 0,
        url: "",
        thumbnailUrl: "",
      },
      setNowPlaying: (source) => set({ nowPlaying: source }),
    }),
    {
      name: "now-playing-store",
    }
  )
);

