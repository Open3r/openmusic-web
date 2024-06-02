import { create } from "zustand";

interface SignUpInfo {
  email: string;
  pw: string;
  nickname: string;
  storeEmail: (email: string) => void;
  storePw: (pw: string) => void;
  storeNickname: (nickname: string) => void;
}

export const SignUpInfoStore = create<SignUpInfo>((set) => ({
  email: '',
  pw: '',
  nickname: '',
  storeEmail: (email) => set(() => ({ email })),
  storePw: (pw) => set(() => ({ pw })),
  storeNickname: (nickname) => set(() => ({ nickname }))
}));
