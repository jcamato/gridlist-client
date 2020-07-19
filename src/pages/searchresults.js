import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// assets
import null_movie from "../assets/img/null_movie.png";

// Constants
import * as Constants from "../constants";

// Components
import MovieCard from "../components/MovieCard/MovieCard";

// Styles
import "./searchresults.css";

const SearchResults = (props) => {
  // TMDB
  const APP_KEY = process.env.REACT_APP_TMDB_KEY;

  const [movies, setMovies] = useState([]);

  const query = props.location.state.query;

  const searchMovies = async () => {
    const fetchCall = `https://api.themoviedb.org/3/search/movie?api_key=${APP_KEY}&query=${query}`;
    // console.log(`fetchLog: ${fetchLog}`);
    const response = await fetch(fetchCall);
    const data = await response.json();
    setMovies(data.results);
    console.log(data.results);
    console.log(data.results.length);
  };

  useEffect(() => {
    searchMovies();
    // console.log(match);
  }, [query]);

  return (
    <div className="searchresultsMain">
      <h3>{movies.length} movies found</h3>

      <div className="movieGrid">
        {movies.map((movie) => {
          return (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
              <MovieCard
                // Card props
                key={movie.id}
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
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResults;
