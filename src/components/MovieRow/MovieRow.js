import React from "react";
import { Link } from "react-router-dom";
import style from "./movierow.module.css";

const MovieRow = (props) => {
  return (
    <div className={style.movies}>
      <div className={style.movieRow}>
        <p className={style.rank}>{props.rank}</p>
        <Link
          className={style.textLink}
          key={props.id}
          to={`/movie/${props.id}`}
        >
          <h4 className={style.title}>{props.title}</h4>
        </Link>
        <p className={style.year}>{props.year}</p>
        <div className={style.score}>
          <i className="material-icons">star</i>
          <h3>{props.score}</h3>
        </div>
      </div>
    </div>
  );
};

export default MovieRow;
