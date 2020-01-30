import React, { useEffect, useState } from "react";

import "./moviedetail.css";

const MovieDetail = ({ match }) => {
  // TMDB
  const APP_KEY = process.env.REACT_APP_TMDB_KEY;

  const basePImageURL = "http://image.tmdb.org/t/p/w500";
  const baseBDImageURL = "http://image.tmdb.org/t/p/original";

  const [movie, setMovie] = useState({});

  useEffect(() => {
    getMovie();
    console.log(match);
  }, []);

  const getMovie = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${APP_KEY}&append_to_response=credits,videos`
    );
    const movie = await response.json();
    setMovie(movie);

    console.log(movie);
    console.log(movie.videos.results[0].key);
  };

  return (
    <div className="moviedetailMain">
      <img
        className="backdrop"
        src={baseBDImageURL + movie.backdrop_path}
        alt=""
      />
      <div className="content">
        <div className="stickySidebar">
          <img
            className="poster"
            src={basePImageURL + movie.poster_path}
            alt=""
          />
        </div>
        <div className="mainText">
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <div className="score">
            <i className="material-icons">star</i>
            {/* I was getting a log warning without a string here */}
            <p>{String(movie.vote_average * 10)}</p>
          </div>
          {/* <iframe
            title={movie.title}
            width="958"
            height="549"
            src="https://www.youtube.com/embed/SUXWAEX2jlg"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe> */}
        </div>
        <div className="infobar">
          <div className="release_date">
            <h4>Release Date:</h4>
            <p>{movie.release_date}</p>
          </div>
          <div className="runtime">
            <h4>Runtime:</h4>
            <p>{movie.runtime} minutes</p>
          </div>
          <div className="budget">
            <h4>Budget:</h4>
            <p>${movie.budget}</p>
          </div>
          <div className="revenue">
            <h4>Revenue:</h4>
            <p>${movie.revenue}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
