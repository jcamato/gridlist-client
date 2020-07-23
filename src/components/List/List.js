import React from "react";
import style from "./list.module.css";

const List = (props) => {
  return (
    <div className={style.list}>
      <header className={style.header}>
        <div className={style.gridItem}>
          <div className={style.rank}>Rank</div>
        </div>
        <div className={style.gridItem}>
          <div className={style.title}>Title</div>
        </div>
        <div className={style.gridItem}>
          <div className={style.release}>Release</div>
        </div>
        <div className={style.gridItem}>
          <div className={style.score}>Score</div>
        </div>
      </header>
      {props.children}
    </div>
  );
};

export default List;
