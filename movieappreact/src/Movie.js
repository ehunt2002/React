import React from 'react';
import ReactDOM from 'react-dom';

const Movie = (props) => {
    
    const setVoteClass = (vote) => {
        if(vote >= 8){
            return 'green';
        }else if(vote >= 6) {
            return 'orange';
        }else { return 'red'}
    }
    
    const onWatchTrailer = async (movieid) => {
  //      alert(movieid);
        //const TRAILER_API = "http://api.themoviedb.org/3/movie/"+movieid+"/videos?api_key=28e71744437d1971720d38092dbc2eb1";
        //const movieResp = await fetch(TRAILER_API);
        //const movieR = await movieResp.json();
        //console.log(movieR.results[0]);
        window.open("https://www.youtube.com/watch?v=" + movieid, "_blank");
    };

    return (
    <div className="movie">
        
        <img src={props.data.large_cover_image ? props.data.large_cover_image : 
        "https://images.unsplash.com/photo-1512113569142-8a60fccc7caa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"} alt={props.data.title} />
        <div className="movie-info">
            <h3>{props.data.title} </h3>
            <span>{props.data.release_date}</span><br />
            <span className={`tag ${setVoteClass(props.data.rating)}` }>{props.data.rating}</span>
        </div>

        <div className="movie-over">
            <h2>Overview:</h2>
            <p>{props.data.description_full }</p>
            <span className="trailer" onClick={() => onWatchTrailer(props.data.yt_trailer_code)}>WATCH TRAILER</span>
           <br/> <span className="trailer" ><a href={props.data.torrents[0].url}>Watch Movie</a></span>

        
        </div>
    </div>);
};

export default Movie;