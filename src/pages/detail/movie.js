import React, { Fragment, useEffect, useState } from "react";
// import _ from "lodash";

// assets
import null_avatar from "../../assets/img/null_avatar.png";
import null_movie from "../../assets/img/null_movie.png";

// Components
import { HashLink } from "react-router-hash-link";
// import HashLinkObserver from "react-hash-link";
import MemberCard from "../../components/MemberCard/MemberCard";
import Footer from "../../components/Footer/Footer";

// Styles
import "./detailmovie.css";

const DetailMovie = ({ match }) => {
  const basePImageURL = "http://image.tmdb.org/t/p/w500";
  const baseBDImageURL = "http://image.tmdb.org/t/p/original";

  const youtubeURL = "https://www.youtube.com/embed/";

  const [movie, setMovie] = useState({});

  useEffect(() => {
    getMovie();
    // console.log(match);
  }, []);

  const getMovie = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/movie/${match.params.id}`,
        {
          method: "GET",
        }
      );

      const movie = await response.json();

      console.log(movie);
      setMovie(movie);

      console.log("fetched from Database");
    } catch (err) {
      console.error(err.message);
    }
  };

  // FIX: Use lodash to merge cast / crew objects that repeat the ID (crew members with multiple roles should appear once with their roles concatenated with ", ")

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -50;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  return (
    <Fragment>
      <div className="detailmovieMain">
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
            <h3>{movie.release_date && movie.release_date.substr(0, 4)}</h3>
          </div>
        </div>

        <div className="side">
          <div className="stick">
            <img
              className="poster"
              src={
                movie.poster_path
                  ? basePImageURL + movie.poster_path
                  : null_movie
              }
              alt=""
            />
            <div className="sideNav">
              <div className="libButton">Library button</div>
              {/* FIX: HashLinks do not work when sharing the link */}
              <HashLink
                smooth
                to="#overview"
                scroll={(el) => scrollWithOffset(el)}
                className="hashLink"
              >
                <h3>Overview</h3>
              </HashLink>
              <HashLink
                smooth
                to="#media"
                scroll={(el) => scrollWithOffset(el)}
                className="hashLink"
              >
                <h3>Media</h3>
              </HashLink>
              <HashLink
                smooth
                to="#cast"
                scroll={(el) => scrollWithOffset(el)}
                className="hashLink"
              >
                <h3>Cast</h3>
              </HashLink>
              <HashLink
                smooth
                to="#crew"
                scroll={(el) => scrollWithOffset(el)}
                className="hashLink"
              >
                <h3>Crew</h3>
              </HashLink>
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
          <div id="overview">
            {/* <h1>Overview</h1> */}
            <p>{movie.overview}</p>
          </div>
          <div id="media" className="mediaSection">
            {/* <h1>Media</h1> */}
            <div className="video">
              {movie.results && movie.results.length > 0 ? (
                <iframe
                  title={movie.title}
                  src={youtubeURL + movie.results[0].key}
                  // src={
                  //   movie.videos &&
                  //   movie.videos.results &&
                  //   youtubeURL + movie.videos.results[0].key
                  // }
                  frameBorder="0"
                  allowFullScreen
                />
              ) : (
                <h2>No Video</h2>
              )}
            </div>
            {/* FIX: Add picture gallery here */}
            {/* <div className="pictures"></div> */}
          </div>
          <div id="cast" className="cast">
            <h1>Cast</h1>
            <div className="memberGrid">
              {/* {movie.credits &&
          movie.credits.cast &&
          movie.credits.cast.map((member) => { */}
              {movie.cast_list &&
                movie.cast_list.map((member) => {
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
          <div id="crew" className="crew">
            <h1>Crew</h1>
            <div className="memberGrid">
              {/* {movie.credits &&
          movie.credits.crew &&
          movie.credits.crew.map((member) => { */}
              {movie.crew &&
                movie.crew.map((member) => {
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
      <Footer />
    </Fragment>
  );
};

export default DetailMovie;
