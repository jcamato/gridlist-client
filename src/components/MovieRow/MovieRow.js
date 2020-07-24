import React from "react";
import { Link } from "react-router-dom";
import style from "./movierow.module.css";

// FIX: when resizing page, sometimes grid items don't fill container border
const MovieRow = (props) => {
  return (
    <div className={style.row}>
      <div className={style.gridItem}>
        <div className={style.rank}>{props.rank}</div>
      </div>
      <div className={style.gridItem}>
        <Link
          className={style.link}
          key={props.tmdb_id}
          to={`/movie/${props.tmdb_id}`}
        >
          <div className={style.title}>{props.title}</div>
        </Link>
      </div>
      <div className={style.gridItem}>
        <div className={style.release}>{props.year}</div>
      </div>
      <div className={style.gridItem}>
        <div className={style.score}>
          <i className={["material-icons", style.icon].join(" ")}>star</i>
          <div>{props.score}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieRow;
