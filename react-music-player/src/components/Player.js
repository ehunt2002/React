import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleRight, faAngleLeft, faPause } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react"

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {

    const audioRef = useRef(null);

    const playsongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        }
        else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }

    //State 
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0
    });

    const timeUpdateHandler = (e) => {
        const currentTime = e.target.currentTime;
        const duration = e.target.duration;

        setSongInfo({
            ...songInfo,
            currentTime,
            duration
        })
    }

    const getTime = (time) => {

        return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({
            ...songInfo,
            currentTime: e.target.value,
        });

    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input onChange={dragHandler} min={0} max={songInfo.duration} value={songInfo.currentTime} type="range" ></input>
                <p>{getTime(songInfo.duration)}</p>
            </div>

            <div class="player-controls">
                <FontAwesomeIcon size="1x" icon={faAngleLeft} className="skip-back"></FontAwesomeIcon>
                <FontAwesomeIcon size="2x" icon={isPlaying ? faPause : faPlay} className="play" onClick={playsongHandler}></FontAwesomeIcon>
                <FontAwesomeIcon size="1x" icon={faAngleRight} className="skip-forward"></FontAwesomeIcon>
            </div>
            <audio onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} src={currentSong.audio} ref={audioRef}></audio>
        </div>

    );
}

export default Player;