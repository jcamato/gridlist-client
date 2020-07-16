import React, { useState, useRef } from "react";
import style from "./selectmenu.module.css";
import useOutsideClick from "../useOutsideClick";

const SelectMenu = (props) => {
  const [active, setActive] = useState(false);
  const [display, setDisplay] = useState(props.defaultDisplay);
  const [icon, setIcon] = useState(props.defaultIcon);

  const ref = useRef();

  useOutsideClick(ref, () => {
    if (active) {
      toggleDropdown();
    }
  });

  const toggleDropdown = () => {
    setActive((prevActive) => !prevActive);
  };

  return (
    <div className={props.className}>
      <div
        onClick={toggleDropdown}
        className={[style.button, style.disableSelect].join(" ")}
      >
        <div>
          <i className="material-icons">{icon}</i>
        </div>
        <div className={style.text}>{display}</div>
        <div className={style.arrow}>
          <i className="material-icons">
            {active ? "arrow_drop_up" : "arrow_drop_down"}
          </i>
        </div>
      </div>
      {active && (
        <div ref={ref} className={style.dropdown}>
          <ul className={style.disableSelect}>
            {props.content.map((option) => {
              return (
                <li
                  className={
                    option.display === display
                      ? style.selected
                      : style.notSelected
                  }
                  key={option.value}
                  onClick={() => {
                    setDisplay(option.display);
                    setIcon(option.icon);
                    props.onSelect(option.value);
                    toggleDropdown();
                  }}
                >
                  <div>
                    <i className="material-icons">{option.icon}</i>
                  </div>
                  <div>{option.display}</div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectMenu;
