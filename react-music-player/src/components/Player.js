import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleRight, faAngleLeft, faPause, faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react"

const Player = ({ currentSong, isPlaying, setIsPlaying, songInfo, setCurrentSong, audioRef, setSongInfo }) => {

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

    const dragVolumeHandler = (e) => {
        let volValue = e.target.value;

        if (volValue < 10) {
            audioRef.current.volume = 0;
        }
        else if (volValue < 20) {
            audioRef.current.volume = .1;
        }
        else if (volValue < 30) {
            audioRef.current.volume = .2;
        }
        else if (volValue < 40) {
            audioRef.current.volume = .3;
        }
        else if (volValue < 50) {
            audioRef.current.volume = .4;
        }
        else if (volValue < 60) {
            audioRef.current.volume = .5;
        }
        else if (volValue < 70) {
            audioRef.current.volume = .6;
        }
        else if (volValue < 80) {
            audioRef.current.volume = .7;
        }
        else if (volValue < 90) {
            audioRef.current.volume = .8;
        }
        else if (volValue < 100) {
            audioRef.current.volume = .9;
        }
        else if (volValue < 110) {
            audioRef.current.volume = 1;
        }
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input onChange={dragHandler} min={0} max={songInfo.duration} value={songInfo.currentTime} type="range" ></input>
                <FontAwesomeIcon icon={faVolumeMute}></FontAwesomeIcon>
                <input onChange={dragVolumeHandler} min={0} type="range" max={100} className="volControl"></input>
                <FontAwesomeIcon icon={faVolumeUp}></FontAwesomeIcon>
                <p>{getTime(songInfo.duration)}</p>
            </div>

            <div class="player-controls">
                <FontAwesomeIcon size="1x" icon={faAngleLeft} className="skip-back"></FontAwesomeIcon>
                <FontAwesomeIcon size="2x" icon={isPlaying ? faPause : faPlay} className="play" onClick={playsongHandler}></FontAwesomeIcon>
                <FontAwesomeIcon size="1x" icon={faAngleRight} className="skip-forward"></FontAwesomeIcon>
            </div>

        </div>

    );
}

export default Player;