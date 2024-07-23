import { create } from "zustand";
import { persist } from "zustand/middleware";

interface loopShuffle {
  loopState:boolean;
  shuffleState:boolean;
  setLoopState:(loopState:{loopState:boolean})=>void;
  setShuffleState:(shuffleState:{shuffleState:boolean})=>void;
}

export const loopShuffleStore = create(
  persist<loopShuffle>(
    (set)=>({
      loopState:false,
      shuffleState:false,
      setLoopState: ({ loopState }) => set({ loopState }),
      setShuffleState : ({ shuffleState }) => set({ shuffleState })
    }),
    {
      name : 'loop-shuffle-store'
    }
  )
)