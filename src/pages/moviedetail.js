import React, { useEffect, useState } from "react";
// import _ from "lodash";

// assets
import null_avatar from "../assets/img/null_avatar.png";

// Components
import MemberCard from "../components/MemberCard/MemberCard";

// Styles
import "./moviedetail.css";

const MovieDetail = ({ match }) => {
  // TMDB
  const APP_KEY = process.env.REACT_APP_TMDB_KEY;

  const basePImageURL = "http://image.tmdb.org/t/p/w500";
  const baseBDImageURL = "http://image.tmdb.org/t/p/original";

  const youtubeURL = "https://www.youtube.com/embed/";

  const [movie, setMovie] = useState({});

  useEffect(() => {
    getMovie();
    // console.log(match);
  }, []);

  const getMovie = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${APP_KEY}&append_to_response=credits,videos`
    );
    const movie = await response.json();
    setMovie(movie);

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

  return (
    <div className="moviedetailMain">
      <div className="bg">
        <img
          className="backdrop"
          src={baseBDImageURL + movie.backdrop_path}
          alt=""
        />
      </div>
      <div className="titleContainer">
        <div className="title">
          <h1>{movie.title}</h1>
          {/* <h3>{movie.release_date}</h3> */}
          <h3>{movie.release_date && movie.release_date.substr(0, 4)}</h3>
          {/* <h3>{movie.release_date.substr(0, 4)}</h3> */}
        </div>
      </div>
      <div className="scoreContainer">
        <div className="score">
          <i className="material-icons">star</i>
          {/* I was getting a log warning without a string here */}
          <p>{String(movie.vote_average * 10)}</p>
        </div>
      </div>
      <div className="side">
        <div className="stick">
          <img
            className="poster"
            src={basePImageURL + movie.poster_path}
            alt=""
          />
          <div className="sideNav">
            <div className="libButton">Library button</div>
            <h3>Overview</h3>
            <h3>Media</h3>
            <h3>Cast</h3>
            <h3>Crew</h3>
            <h3>Series</h3>
            <h3>Reviews</h3>
          </div>
        </div>
      </div>
      <div className="detailHeader">
        <h3 className="first">Info</h3>
        <h3>Cast</h3>
        <h3>Crew</h3>
        <h3>Series</h3>
        <h3>Reviews</h3>
      </div>
      <div className="main">
        <p>{movie.overview}</p>
        <div className="video">
          <iframe
            title={movie.title}
            src={
              movie.videos &&
              movie.videos.results &&
              youtubeURL + movie.videos.results[0].key
            }
            frameBorder="0"
            allowFullScreen
          />
        </div>
        <div className="cast">
          <h1>Cast</h1>
          <div className="memberGrid">
            {movie.credits &&
              movie.credits.cast &&
              movie.credits.cast.map((member) => {
                return (
                  <MemberCard
                    key={member.credit_id}
                    poster={
                      member.profile_path
                        ? basePImageURL + member.profile_path
                        : null_avatar
                    }
                    name={member.name}
                    position={member.character}
                  />
                );
              })}
          </div>
        </div>
        <div className="crew">
          <h1>Crew</h1>
          <div className="memberGrid">
            {movie.credits &&
              movie.credits.crew &&
              movie.credits.crew.map((member) => {
                return (
                  <MemberCard
                    key={member.credit_id}
                    poster={
                      member.profile_path
                        ? basePImageURL + member.profile_path
                        : null_avatar
                    }
                    name={member.name}
                    position={member.job}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <div className="info">
        <div className="infobar">
          <div className="side_score">
            <h4>Score:</h4>
            <p>{String(movie.vote_average * 10)}</p>
          </div>
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
          <div className="genres">
            <h4>Genres:</h4>
            <p className="link">
              {movie.genres && movie.genres.map((e) => e.name).join(", ")}
            </p>
            {/* {tempGenres.map((genre) => {
              return <p>{genre.name}</p>;
            })} */}
          </div>
          <div className="companies">
            <h4>Companies:</h4>
            <p className="link">
              {movie.production_companies &&
                movie.production_companies.map((e) => e.name).join(", ")}
            </p>
            {/* {movie.production_companies.map((company) => {
              return <p>{company.name}</p>;
            })} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
