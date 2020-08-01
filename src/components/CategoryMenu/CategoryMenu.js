import React from "react";
import style from "./categorymenu.module.css";

const CategoryMenu = (props) => {
  return (
    <ul className={[style.categoryMenu, "disableSelect"].join(" ")}>
      {props.content.map((option) => {
        return (
          <li
            onClick={() => {
              props.onSelect(option.value);
            }}
            className={
              option.value === props.category
                ? style.selected
                : style.notSelected
            }
            key={option.value}
          >
            <div>
              <i className="material-icons">{option.icon}</i>
            </div>
            <div className={style.text}>{option.display}</div>
            <div className={style.count}>{props.counts[option.text]}</div>
          </li>
        );
      })}
    </ul>
  );
};

export default CategoryMenu;
