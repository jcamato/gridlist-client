import React, { Fragment, useEffect, useState } from "react";
// import _ from "lodash";

// Constants
import * as Constants from "../constants";

// assets
import null_game from "../assets/img/null_game.png";

// Components
import { HashLink } from "react-router-hash-link";
import Footer from "../components/Footer/Footer";

// Styles
import style from "./test2.module.css";

const Test2 = ({ match }) => {
  const [game, setGame] = useState({});

  useEffect(() => {
    getGame();
    // console.log(match);
  }, []);

  const getGame = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/game/11156`,
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
      <div className={style.detailgameMain}>
        <div className={style.bg}>
          <img
            className={style.backdrop}
            src={game.screenshots && game.screenshots[0].url && Constants.baseIGDBbackdropURL +
                    game.screenshots[0].url.substring(
                      game.screenshots[0].url.lastIndexOf("/") + 1
                    )
            }
            alt=""
          />
        </div>
        <div className={style.titleContainer}>
          <div className={style.title}>
            <h1>{game.name}</h1>
            <h3>{game.first_release_date && first_release_date.getFullYear()}</h3>
          </div>
        </div>
        <div className={style.scoreContainer}>
          <div className={style.score}>
            <i className="material-icons">star</i>
           
            <p>{String(Math.round(game.rating))}</p>
          </div>
        </div>
        <div className={style.side}>
          <div className={style.stick}>
            <img
              className={style.poster}
              src={game.cover && game.cover.url ? Constants.baseIGDBposterURL +
                    game.cover.url.substring(
                      game.cover.url.lastIndexOf("/") + 1) : null_game  
            }
              alt=""
            />
            <div className={style.sideNav}>
              <div className={style.libButton}>Library button</div>
              {/* FIX: HashLinks do not work when sharing the link */}
              <HashLink
                smooth
                to="#overview"
                scroll={(el) => scrollWithOffset(el)}
                className={style.hashLink}
              >
                <h3>Overview</h3>
              </HashLink>
              <HashLink
                smooth
                to="#media"
                scroll={(el) => scrollWithOffset(el)}
                className={style.hashLink}
              >
                <h3>Media</h3>
              </HashLink>
              <h3>Reviews</h3>
            </div>
          </div>
        </div>
        <div className={style.detailHeader}>
          <h3 className={style.first}>Info</h3>
          <h3>Cast</h3>
          <h3>Crew</h3>
          <h3>Series</h3>
          <h3>Reviews</h3>
        </div>
        <div className={style.main}>
          <div id={style.overview}>
            <p>{game.summary}</p>
          </div>
          <div id={style.media} className={style.mediaSection}>
            {/* <h1>Media</h1> */}
            <div className={style.video}>
              <iframe
                title={game.name}
                src={game.videos && Constants.youtubeURL + game.videos[0].video_id}
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
          <div id={style.cast} className={style.cast}>
            <h1>Cast</h1>
            
          </div>
          <div id={style.crew} className={style.crew}>
            <h1>Crew</h1>
          
          </div>
        </div>
        <div className={style.info}>
          <div className={style.infobar}>
            <div className={style.side_score}>
                <h4>Score:</h4>
                <p>{String(Math.round(game.rating))}</p>
              </div>
            <div className={style.release_date}>
                <h4>Release Date:</h4>
                <p>{game.first_release_date && first_release_date.getUTCDate()}</p>
              </div>
            <div className={style.runtime}>
                {/* <h4>Runtime:</h4>
                <p>{movie.runtime} minutes</p> */}
              </div>
            <div className={style.budget}>
                {/* <h4>Budget:</h4>
                <p>${movie.budget}</p> */}
              </div>
            <div className={style.revenue}>
                {/* <h4>Revenue:</h4>
                <p>${movie.revenue}</p> */}
              </div>
            <div className={style.genres}>
                <h4>Genres:</h4>
                <p>
                  {game.genres && game.genres.map((e) => e.name).join(", ")}
                </p>
              </div>
            <div className={style.companies}>
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

export default Test2;
