import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Song } from "../interfaces/Song";

interface NowPlaying {
  nowPlaying: Song;
  setNowPlaying: (source: Song) => void;
}

export const nowPlayingStore = create(
  persist<NowPlaying>(
    (set) => ({
      nowPlaying: {
        artist: {
          id: 0,
          nickname: "",
          avatarUrl: "",
          email: '',
          role: '',
          status: '',
          provider: '',
        },
        title: "",
        id: 0,
        url: "",
        thumbnailUrl: "",
        liked: false,
        likeCount: 0,
        genre: "",
        scope: "",
      },
      setNowPlaying: (source) => set({ nowPlaying: { ...source } }),
    }),
    {
      name: "now-playing-store",
    }
  )
);
