import React, { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import style from "./moviecard.module.css";
import useOutsideClick from "../useOutsideClick";
import { UserContext } from "../../UserContext";

import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

const LightTooltip = withStyles((theme) => ({
  arrow: {
    color: theme.palette.common.white,
  },
  tooltip: {
    fontFamily: "Open Sans",
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

// MovieCard + Hover Overlay
const MovieCard = (props) => {
  const [auth] = useContext(UserContext);
  const [display, setDisplay] = useState(false);

  const handleHover = () => {
    setDisplay(!display);
  };

  const ref = useRef();

  // FIX:
  // - sometimes an individual overlay stays shown.This is a temporary adjustment to reset it with an outside click.
  // - overlays spill off screen if on the right side
  useOutsideClick(ref, () => {
    if (display) {
      setDisplay(false);
    }
  });

  const overlayRef = React.createRef();

  const onClick = async (tmdb_id, library_category_id) => {
    // e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const body = { tmdb_id, library_category_id };
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
    <div className={style.movie}>
      <div
        className={style.movieCard}
        ref={ref}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        {/* <div
              onClick={() => onClick(props.tmdb_id, 1)}
              className={style.libraryButton}
            >
              Want to Watch
            </div> */}
        {display && auth && (
          <div className={style.libActionContainer}>
            <LightTooltip title="Want to Watch" placement="top" arrow>
              <i
                onClick={() => onClick(props.tmdb_id, 1)}
                className="material-icons"
              >
                schedule
              </i>
            </LightTooltip>
            {/* Include for TV and Games */}
            {/* <LightTooltip title="Watching" placement="top" arrow>
              <i className="material-icons">visibility</i>
            </LightTooltip> */}
            <LightTooltip title="Watched" placement="top" arrow>
              <i className="material-icons">done</i>
            </LightTooltip>
            <LightTooltip title="Edit Library Entry" placement="top" arrow>
              <i className="material-icons">more_horiz</i>
            </LightTooltip>
          </div>
        )}
        <Link
          key={props.tmdb_id}
          to={`/movie/${props.tmdb_id}`}
          className={style.link}
        >
          <img className={style.poster} src={props.poster} alt="" />
        </Link>
        {/* display data for current sort? */}
        {/* <p className="score">{score}</p> */}
        {/* {auth && <p>auth true</p>} */}
      </div>
      {/* <div className={display ? style.overlay : style.null}>Test</div> */}
      <div
        title="Card overlay"
        className={display ? style.overlay : "displayNone"}
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
  );
};

export default MovieCard;
