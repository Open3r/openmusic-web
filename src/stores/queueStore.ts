import { create } from "zustand";
import { Song } from "../interfaces/Song";

export interface QueueUpdate {
  queueUpdate: Song[];
  setQueueUpdate: (update: Song[]) => void;
  clearQueue : () => void;
}

export const queueUpdateStore = create<QueueUpdate>((set) => ({
  queueUpdate: [],
  setQueueUpdate: (queueUpdate) => set({ queueUpdate }),
  clearQueue : () => set({queueUpdate:[]})
}));
