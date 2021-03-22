import logo from './logo.svg';
import './App.css';
import Movie from './Movie';
import { useEffect, useState } from 'react';

//const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=28e71744437d1971720d38092dbc2eb1";
//const IMG_API = "https://image.tmdb.org/t/p/w1280";
//const SEARCH_API ="https://api.themoviedb.org/3/search/movie?&api_key=28e71744437d1971720d38092dbc2eb1&query=";

const FEATURED_API = "https://yts.mx/api/v2/list_movies.json?quality=3D";
const IMG_API = "";
const SEARCH_API = "https://yts.mx/api/v2/list_movies.json?query_term=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(async() => {
   const moviesResp = await fetch(FEATURED_API);
   const moviesR = await moviesResp.json();
   console.log(moviesR);
   setMovies(moviesR.data.movies);
  }
, []
  );

  const onSubmitHandler = async(e) => {
   e.preventDefault();
   if(searchTerm != ''){
   const moviesResp = await fetch(SEARCH_API+searchTerm);
   const moviesR = await moviesResp.json();
   console.log(moviesR);
   setMovies(moviesR.data.movies);
   }
   else
   {
    const moviesResp = await fetch(FEATURED_API);
    const moviesR = await moviesResp.json();
    console.log(moviesR);
    setMovies(moviesR.data.movies);
   }

  };

  
  const onChangeHandler = (e) => {
    setSearchTerm(e.target.value);
   };

  return (
    <>
    <header>
      <form onSubmit={onSubmitHandler}>
        <input className="search" type="text" placeholder="Search..." value={searchTerm} onChange={onChangeHandler} />
      </form>
    
  </header>
<div className="movie-container">
{movies.length > 0 && movies.map((movie) => (
        <Movie key={movie.id} data={movie} imgapi={IMG_API}></Movie>   
      ))
      }
  
    </div>
    </>
  );
}

export default App;
