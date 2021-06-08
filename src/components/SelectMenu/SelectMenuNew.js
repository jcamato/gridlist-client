import React, { useState, useRef } from "react";
import style from "./selectmenu.module.css";
import useOutsideClick from "../../hooks/useOutsideClick";

import _ from "lodash";

const SelectMenuNew = (props) => {
  // console.log(" ");
  let currentSelection = _.filter(props.content, [
    "value",
    props.currentSelection[props.name].currentValue,
  ])[0];

  let defaultSelection = _.filter(props.content, "default")[0];
  // console.log("defaultSelection", defaultSelection);

  if (!currentSelection) {
    currentSelection = defaultSelection;
  }

  // console.log("CurrentSelection", currentSelection);

  const [active, setActive] = useState(false);
  // const [display, setDisplay] = useState(currentSelection.display);
  // const [icon, setIcon] = useState(currentSelection.icon);

  const ref = useRef();

  useOutsideClick(ref, () => {
    if (active) {
      toggleDropdown();
    }
  });

  const toggleDropdown = () => {
    setActive((prevActive) => !prevActive);
  };

  const onClickHandler = (item) => {
    if (defaultSelection.value === item) {
      props.updateSelection({
        name: props.name,
        newValue: null,
      });
    } else {
      props.updateSelection({
        name: props.name,
        newValue: item,
      });
    }

    toggleDropdown();
  };

  return (
    // FIX: Instead of passing a width prop, make width dynamic depending on content that fills it
    <div className={style.selectMenu}>
      <div
        onClick={toggleDropdown}
        style={{ width: props.width }}
        className={[style.button, "disableSelect"].join(" ")}
      >
        <div>
          <i className="material-icons">{currentSelection.icon}</i>
        </div>
        <div className={style.text}>{currentSelection.display}</div>
        <div className={style.arrow}>
          <i className="material-icons">
            {active ? "arrow_drop_up" : "arrow_drop_down"}
          </i>
        </div>
      </div>
      {active && (
        <div
          ref={ref}
          style={{ width: props.width }}
          className={[style.dropdown, "disableSelect"].join(" ")}
        >
          <ul>
            {props.content.map((option) => {
              return (
                <li
                  className={
                    option.display === currentSelection.display
                      ? style.selected
                      : style.notSelected
                  }
                  key={option.value}
                  onClick={() => {
                    // setDisplay(option.display);
                    // setIcon(option.icon);
                    onClickHandler(option.value);
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

export default SelectMenuNew;
