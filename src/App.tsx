import { nowPlayingStore } from "./store/nowPlayingStore";
import { PlayTimeStore } from "./store/PlayTImeStore";
import { playQueueStore } from "./store/playQueueStore";
import { useEffect } from "react";
import Router from "./components/Router/Router";

function App() {

  const nowPlaying = nowPlayingStore(state=>state.nowPlaying);
  const fullDuration = PlayTimeStore(state=>state.fullDuration);
  const currTime = PlayTimeStore(state=>state.currTime);
  const queue = playQueueStore(state=>state.queue);

  useEffect(()=>{
    console.log(nowPlaying);
  },[nowPlaying]);

  useEffect(()=>{
    console.log(fullDuration);
  },[fullDuration]);

  useEffect(()=>{
    if(fullDuration == currTime) {
      console.log('노래끝');
    }
  },[currTime]);
  useEffect(()=>{
    console.log(queue);
  },[queue])


  return (
    <>
      <Router />
    </>
  )
}

export default App
