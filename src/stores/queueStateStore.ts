import { create } from "zustand";

interface QueueStateUpdate {
  queueStateUpdate: boolean;
  setQueueStateUpdate: (QueueStateUpdate: boolean) => void;
}

export const queueStateUpdateStore = create<QueueStateUpdate>((set) => ({
  queueStateUpdate: false,
  setQueueStateUpdate: (queueStateUpdate) => set({ queueStateUpdate }),
}));
