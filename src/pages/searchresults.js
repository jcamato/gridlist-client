import React, { useEffect, useState } from "react";

import _ from "lodash";

// assets
import null_movie from "../assets/img/null_movie.png";

// Constants
import * as Constants from "../constants";

// Components
import Grid from "../components/Grid/Grid";
import MovieCard from "../components/MovieCard/MovieCard";

// Styles
import "./searchresults.css";

const SearchResults = ({ match }) => {
  // TMDB
  // const APP_KEY = process.env.REACT_APP_TMDB_KEY;

  const [movies, setMovies] = useState([]);
  const [results, setResults] = useState(undefined);

  // const query = props.location.state.query;
  const searchtext = match.params.searchtext;

  const searchMovies = async () => {
    // const fetchCall = `https://api.themoviedb.org/3/search/movie?api_key=${APP_KEY}&query=${query}`;
    const serverCall = `http://localhost:5000/search/${searchtext}`;
    // console.log(`fetchLog: ${fetchLog}`);
    // const response = await fetch(fetchCall);
    const response = await fetch(serverCall);
    const data = await response.json();

    // console.log(data);
    console.log(data);
    console.log(data.length);

    setMovies(_.take(data, 100));

    if (data.length > 100) {
      setResults("More than 100");
    } else {
      setResults(data.length);
    }
  };

  useEffect(() => {
    searchMovies();
    // console.log(match);
  }, [searchtext]);

  return (
    <div className="searchresultsMain">
      <h3>
        {results &&
          `${results} movies where the title includes "${searchtext}"`}
      </h3>

      <Grid>
        {movies.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              // Card props
              tmdb_movie_id={movie.id}
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
      </Grid>
    </div>
  );
};

export default SearchResults;
