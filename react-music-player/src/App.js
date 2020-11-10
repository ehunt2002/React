import "../src/styles/app.scss"
import Song from "./components/Song"
import Player from "./components/Player"
import data from "./util"
import { useState } from "react"

function App() {
  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="App">
      <Song currentSong={currentSong}></Song>
      <Player currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying}></Player>
    </div>
  );
}

export default App;
