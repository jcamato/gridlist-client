import React, { useEffect, useState } from "react";

// assets
import null_movie from "../assets/img/null_movie.png";

// Constants
import * as Constants from "../constants";

// Components
import MovieCard from "../components/MovieCard/MovieCard";

// Styles
import "./searchresults.css";

const Library = (props) => {
  // TMDB
  const APP_KEY = process.env.REACT_APP_TMDB_KEY;

  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState([]);

  const getLibrary = async () => {
    try {
      const res = await fetch("http://localhost:5000/library/movie", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();

      console.log(parseData);
      setMovies(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getMovie = async (id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${APP_KEY}`
    );
    const fetched_movie = await response.json();
    setMovie(fetched_movie);

    console.log(movie);
    // console.log(movie.videos);
    // console.log(movie.videos.results[0]);
    // console.log(baseBDImageURL + movie.backdrop_path);
    // console.log(youtubeURL + movie.videos.results[0].key);
    // genres = _.get(movie.genres, []);
    // console.log(movie.release_date.substr(0, 4));
    // console.log(movie.credits.cast);
    // console.log(movie.credits.crew);
    // console.log(movie.genres[0].name);

    // get only trailer, then teasers for videos, sorted that way and then by order
    console.log(movie.videos.results);
  };

  useEffect(() => {
    getLibrary();

    // console.log(movies);
  }, []);

  return (
    <div className="libraryMain">
      <h3>Check console for response</h3>
      {/* 
      <div className="movieGrid">
        {movies.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              // Card props
              tmdb_id={movie.id}
              poster={
                movie.poster_path
                  ? Constants.basePImageURL + movie.poster_path
                  : null_movie
              }
              // Overlay props
              title={movie.title}
              score={movie.vote_average * 10}
              year={movie.release_date && movie.release_date.substr(0, 4)}
              description={movie.overview}
              background={Constants.baseBDImageURL + movie.backdrop_path}
            />
          );
        })}
      </div> */}
    </div>
  );
};

export default Library;
