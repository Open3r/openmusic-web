import { create } from "zustand";
import { persist } from "zustand/middleware";

// NowPlaying 인터페이스 정의
interface NowPlaying {
  nowPlaying: {
    artist: string;
    title: string;
    idx: number;
    musicUrl: string;
    thumbnailUrl: string;
  };
  setNowPlaying: (source: {
    artist: string;
    title: string;
    idx: number;
    musicUrl: string;
    thumbnailUrl: string;
  }) => void;
}

export const nowPlayingStore = create(
  persist<NowPlaying>(
    (set) => ({
      nowPlaying: {
        artist: "",
        title: "",
        idx: 0,
        musicUrl: "",
        thumbnailUrl: "",
      },
      setNowPlaying: (source) => set({ nowPlaying: source }),
    }),
    {
      name: "now-playing-store", // 로컬 스토리지에 저장될 키 이름
    }
  )
);

