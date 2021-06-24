import React, { Fragment, useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import style from "./moviecard.module.css";
import useOutsideClick from "../../hooks/useOutsideClick";
import { UserContext } from "../../contexts/UserContext";
import { LightTooltip } from "../External/material-ui";

import LibraryEntryModal from "../Modal/Library/LibraryEntryModal";

// FIX: Library related information needs to be specific to the owner. However, when a guest or different user looks at the owner user's library, it needs to show the owner's score and more info as read only. This will come when I set up unique user links

// MovieCard + Hover Overlay
const MovieCard = (props) => {
  const [auth] = useContext(UserContext);
  const [displayOverlay, setDisplayOverlay] = useState(false);
  // const [status, setStatus] = useState(0);

  const [libraryEntryModalActive, setLibraryEntryModalActive] = useState(false);

  // FIX: Because fetch status happens during onMouseEnter (now fetch happens on library load), icon color does not update when clicking from one status icon to the other on same hover

  const handleHover = () => {
    setDisplayOverlay(!displayOverlay);
    // console.log(displayOverlay);
  };

  const ref = useRef();
  const overlayRef = React.createRef();
  const refEdit = useRef();

  // FIX:
  // - sometimes an individual overlay stays shown. This is a temporary adjustment to reset it with an outside click.
  // - overlays spill off screen if on the right side
  useOutsideClick(ref, () => {
    if (displayOverlay) {
      setDisplayOverlay(false);
    }
  });

  useOutsideClick(refEdit, () => {
    if (libraryEntryModalActive) {
      toggleLibraryEntryModal();
    }
  });

  const toggleLibraryEntryModal = () => {
    setLibraryEntryModalActive((prevActive) => !prevActive);
  };

  // FIX: Need to allow user to switch between Want to Watch and Watched. Currently it errors out because it's already in library
  // and this is a post
  const handleClick = async (tmdb_movie_id, library_category_id, secret) => {
    // e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const body = { tmdb_movie_id, library_category_id, secret };
      const response = await fetch("http://localhost:5000/library/movie", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();

      console.log(parseResponse);

      // setTodosChange(true);
      // setDescription("");
      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className={style.movie}>
        <div
          className={style.movieCard}
          ref={ref}
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
        >
          {props.location === "library" && (
            <div
              className={
                props.libraryScore ? style.libraryScore : "displayNone"
              }
            >
              {props.libraryScore}
            </div>
          )}
          {displayOverlay && auth && (
            <div className={style.libActionContainer}>
              {/* FIX: null value problems now that I added other fields to edit */}
              <LightTooltip title="Want to Watch" placement="top" arrow>
                {props.libraryCategory === 1 ? (
                  <i
                    onClick={() =>
                      handleClick(props.tmdb_movie_id, 1, props.secret)
                    }
                    className="material-icons gridlistblue"
                  >
                    schedule
                  </i>
                ) : (
                  <i
                    onClick={() =>
                      handleClick(props.tmdb_movie_id, 1, props.secret)
                    }
                    className="material-icons"
                  >
                    schedule
                  </i>
                )}
              </LightTooltip>
              {/* Include for TV and Games */}
              {/* <LightTooltip title="Watching" placement="top" arrow>
              <i className="material-icons">visibility</i>
            </LightTooltip> */}
              <LightTooltip title="Watched" placement="top" arrow>
                {props.libraryCategory === 3 ? (
                  <i
                    onClick={() => handleClick(props.tmdb_movie_id, 3)}
                    className="material-icons gridlistblue"
                  >
                    done
                  </i>
                ) : (
                  <i
                    onClick={() => handleClick(props.tmdb_movie_id, 3)}
                    className="material-icons"
                  >
                    done
                  </i>
                )}
              </LightTooltip>
              <LightTooltip title="Edit Library Entry" placement="top" arrow>
                <i onClick={toggleLibraryEntryModal} className="material-icons">
                  more_horiz
                </i>
              </LightTooltip>
            </div>
          )}
          <Link
            key={props.tmdb_movie_id}
            to={`/movie/${props.tmdb_movie_id}`}
            className={style.link}
          >
            <img className={style.poster} src={props.poster} alt="" />
          </Link>
          {/* displayOverlay data for current sort? */}
          {/* <p className="score">{score}</p> */}
        </div>
        <div
          title="Card overlay"
          className={displayOverlay ? style.overlay : "displayNone"}
          ref={overlayRef}
        >
          <div className={style.content}>
            <div className={style.header}>
              <h2 className={style.title}>{props.title}</h2>
              <div className={style.score}>
                <i className="material-icons">star</i>
                <h3>{props.score}</h3>
              </div>
            </div>
            <p className={style.year}>{props.year}</p>
            <p className={style.body}>{props.description}</p>
          </div>
          <img className={style.background} src={props.background} alt="" />
        </div>
      </div>

      {auth && libraryEntryModalActive && (
        <div className="modalBackground">
          <div ref={refEdit}>
            <LibraryEntryModal
              // FIX:
              // -this only works in library, not browse because these aren't being fetched in browse currently
              // -This is prop drilling. Is this okay?
              title={props.title}
              tmdb_movie_id={props.tmdb_movie_id}
              libraryCategory={props.libraryCategory}
              libraryScore={props.libraryScore}
              watchDate={props.watchDate}
              watchCount={props.watchCount}
              secret={props.secret}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default MovieCard;
