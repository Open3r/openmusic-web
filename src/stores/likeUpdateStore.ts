import { create } from "zustand";

interface LikeUpdate {
  likeUpdate: boolean;
  setLikeUpdate: (update: boolean) => void;
}

export const likeUpdateStore = create<LikeUpdate>((set) => ({
  likeUpdate: false,
  setLikeUpdate: (likeUpdate) => set({ likeUpdate }),
}));
