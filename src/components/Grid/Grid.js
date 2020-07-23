import React from "react";
import style from "./grid.module.css";

const Grid = (props) => {
  return <div className={style.grid}>{props.children}</div>;
};

export default Grid;
