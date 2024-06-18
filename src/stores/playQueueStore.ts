import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Song } from "../interfaces/Song";
import NotificationService from "../components/Notification/NotificationService";

interface PlayQueueStore {
  queue: Song[];
  addSong: (song: Song) => void;
  removeSong: (index: number) => void;
  clearQueue: () => void;
}

export const playQueueStore = create(
  persist<PlayQueueStore>(
    (set, get) => ({
      queue: [],

      addSong: (song) => {
        const { queue } = get();
        if (!queue.some((item) => item.title == song.title && item.artist == song.artist)) {
          set({ queue: [...queue, song] });
        }else{
          NotificationService.warn('이미 재생목록에 있는 곡입니다.')
        }
      },

      removeSong: (index) => set((state) => ({
        queue: state.queue.filter((_, i) => i !== index)
      })),

      clearQueue: () => set({ queue: [] })
    }),
    {
      name: "play-queue-store"
    }
  )
);

