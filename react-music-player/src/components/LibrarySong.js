import React from 'react';

function LibrarySong({ songInfo, isPlaying, setIsPlaying, audioRef, setCurrentSong }) {

    //Handlers
    const playsongHandler = async () => {

        await setCurrentSong(songInfo);
        audioRef.current.play();
        setIsPlaying(true);

    }

    return (
        <>
            <div className="library-song">
                <div className="song-container" onClick={playsongHandler}>
                    <img src={songInfo.cover} alt="" className="song-img" />
                    <div className="song-description">
                        <h2 className="song-title">{songInfo.name}</h2>
                        <h3 className="song-info">{songInfo.artist}</h3>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LibrarySong;