import React, { useState } from "react";
import style from "./moviecard.module.css";

// MovieCard + Hover Overlay
const MovieCard = props => {
  const [display, setDisplay] = useState(false);

  const handleHover = () => {
    setDisplay(!display);
  };

  const overlayRef = React.createRef();

  // if (display) {
  //   const bounding = overlayRef.current.getBoundingClientRect();
  //   console.log(bounding);
  // }

  return (
    <div className={style.movie}>
      <div
        className={style.movieCard}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        <img className={style.poster} src={props.poster} alt="" />
        {/* display data for current sort? */}
        {/* <p className="score">{score}</p> */}
      </div>
      {/* <div className={display ? style.overlay : style.null}>Test</div> */}
      <div className={display ? style.overlay : style.null} ref={overlayRef}>
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
