import { create } from "zustand";
import { User } from "../interfaces/User";

export interface UserStore {
  user: User;
  setUser: (user: User) => void;
}

export const userStore = create<UserStore>((set) => ({
  user: {
    id: 0,
    nickname: "",
    avatarUrl: "",
    provider: "",
    email: "",
    status: "",
    role: "",
  },
  setUser: (user: User) => set(() => ({ user })),
}));
