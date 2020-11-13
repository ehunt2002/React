import React, { useState } from 'react';
import LibrarySong from '../components/LibrarySong';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose, faWindowRestore } from "@fortawesome/free-solid-svg-icons";


function Library({ songs, audioRef, isPlaying, setIsPlaying, setCurrentSong }) {

    const [libraryOpen, setLibraryOpen] = useState(true);

    const libraryOpenHandler = (e) => {
        if (libraryOpen) {
            setLibraryOpen(false);
        }
        else {
            setLibraryOpen(false);
        }
    }

    return (
        <>
            <FontAwesomeIcon size="1x" icon={faWindowRestore} onClick={libraryOpenHandler} className="openLibrary"></FontAwesomeIcon>
            Open Library
            <div className={`library ${libraryOpen ? '' : 'close'}`}>

                <div className="library-title">
                    My Songs Library
                    <FontAwesomeIcon size="1x" icon={faWindowClose} onClick={libraryOpenHandler}></FontAwesomeIcon>
                </div>
                <div className="library-songs">
                    {
                        songs.map(song =>
                            <LibrarySong
                                songInfo={song} audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} setCurrentSong={setCurrentSong}>
                            </LibrarySong>
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default Library;