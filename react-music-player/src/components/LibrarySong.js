import React from 'react';

function LibrarySong({ songInfo }) {

    return (
        <>
            <div className="library-song">
                <div className="song-container">
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