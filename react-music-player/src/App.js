import "../src/styles/app.scss"
import Song from "./components/Song"
import Player from "./components/Player"
import data from "./util"
import { useState, useRef } from "react"
import Library from '../src/components/Library';

function App() {
  //audioRef Handler
  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    setSongInfo({
      ...songInfo,
      currentTime,
      duration
    })
  }

  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0
  });

  const audioRef = useRef(null);

  return (
    <div className="App">
      <Song currentSong={currentSong}></Song>
      <Player audioRef={audioRef} songInfo={songInfo} setCurrentSong={setCurrentSong} setSongInfo={setSongInfo} currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying}></Player>
      <Library songs={songs} audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} setCurrentSong={setCurrentSong}></Library>
      <audio onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} src={currentSong.audio} ref={audioRef}></audio>
    </div>
  );
}

export default App;
