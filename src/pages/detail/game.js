import React, { Fragment, useEffect, useState } from "react";
// import _ from "lodash";

// Constants
import * as Constants from "../../constants";

// assets
import null_avatar from "../../assets/img/null_avatar.png";
import null_game from "../../assets/img/null_game.png";

// Components
import { HashLink } from "react-router-hash-link";
// import HashLinkObserver from "react-hash-link";
import MemberCard from "../../components/MemberCard/MemberCard";
import Footer from "../../components/Footer/Footer";

// Styles
import "./detailgame.css";

const DetailGame = ({ match }) => {
  const [game, setGame] = useState({});

  // const getRandomInt = (max) => {
  //   return Math.floor(Math.random() * max);
  // }

  useEffect(() => {
    getGame();
    // console.log(match);
  }, []);

  const getGame = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/game/${match.params.id}`,
        {
          method: "GET",
        }
      );

      const game = await response.json();

      setGame(game);

      console.log("fetched from Database");
    } catch (err) {
      console.error(err.message);
    }
  };

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -50;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  console.log(game);

  const first_release_date = new Date(game.first_release_date*1000);

  // http://localhost:3000/game/11156

  return (
    <Fragment>
      <div className="detailgameMain">
        <div className="bg">
          <img
            className="backdrop"
            src={game.screenshots && game.screenshots[0].url && Constants.baseIGDBbackdropURL +
                    game.screenshots[0].url.substring(
                      game.screenshots[0].url.lastIndexOf("/") + 1
                    )
            }
            alt=""
          />
        </div>
        <div className="titleContainer">
          <div className="title">
            <h1>{game.name}</h1>
            <h3>{game.first_release_date && first_release_date.getFullYear()}</h3>
          </div>
        </div>
        <div className="scoreContainer">
          <div className="score">
            <i className="material-icons">star</i>
           
            <p>{String(Math.round(game.rating))}</p>
          </div>
        </div>
        <div className="side">
          <div className="stick">
            <img
              className="poster"
              src={game.cover && game.cover.url ? Constants.baseIGDBposterURL +
                    game.cover.url.substring(
                      game.cover.url.lastIndexOf("/") + 1) : null_game  
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
            <p>{game.summary}</p>
          </div>
          <div id="media" className="mediaSection">
            {/* <h1>Media</h1> */}
            <div className="video">
              <iframe
                title={game.name}
                src={game.videos && Constants.youtubeURL + game.videos[0].video_id}
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
          <div id="cast" className="cast">
            <h1>Cast</h1>
            
          </div>
          <div id="crew" className="crew">
            <h1>Crew</h1>
          
          </div>
        </div>
        <div className="info">
            <div className="infobar">
              <div className="side_score">
                <h4>Score:</h4>
                <p>{String(Math.round(game.rating))}</p>
              </div>
              <div className="release_date">
                <h4>Release Date:</h4>
                <p>{game.first_release_date && first_release_date.getUTCDate()}</p>
              </div>
              <div className="runtime">
                {/* <h4>Runtime:</h4>
                <p>{movie.runtime} minutes</p> */}
              </div>
              <div className="budget">
                {/* <h4>Budget:</h4>
                <p>${movie.budget}</p> */}
              </div>
              <div className="revenue">
                {/* <h4>Revenue:</h4>
                <p>${movie.revenue}</p> */}
              </div>
              <div className="genres">
                <h4>Genres:</h4>
                <p>
                  {game.genres && game.genres.map((e) => e.name).join(", ")}
                </p>
              </div>
              <div className="companies">
                <h4>Companies:</h4>
                {/* <p className="link">
                  {movie.production_companies &&
                    movie.production_companies.map((e) => e.name).join(", ")}
                </p> */}
              
              </div>
            </div>
          </div>
        </div>
      <Footer />
    </Fragment>
  );
};

export default DetailGame;
