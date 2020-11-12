import React from 'react';
import LibrarySong from '../components/LibrarySong';
import "@fortawesome/fontawesome-svg-core";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

function Library({ songs }) {

    return (
        <>
            <div className="library">

                <div className="library-title">
                    <faMusic size="1x" icon={faMusic}></faMusic>   My Songs Library
                </div>
                <div className="library-songs">
                    {
                        songs.map(song =>
                            <LibrarySong
                                songInfo={song}>
                            </LibrarySong>
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default Library;