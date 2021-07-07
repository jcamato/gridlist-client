import React from "react";
import style from "./radiolist.module.css";
import { toTitleCase } from "../../utils";

const RadioList = (props) => {
  const list = props.content;
  const currentValue = props.currentFilters[props.name].currentValue;
  const selectedItem = currentValue === null ? [] : currentValue;
  const display = props.display || props.currentFilters[props.name].display;

  // one source of truth
  const isAll = selectedItem.length === 0;

  // Clear genres when empty All is selected
  const onAllClickHandler = () => {
    props.updateFilters({
      name: props.name,
      newValue: null,
    });
  };

  const onClickHandler = (item) => {
    // if selectedItem doesn't have ID then add it
    if (!selectedItem.some((el) => el === item.name.toLowerCase())) {
      const newItem = [item.name.toLowerCase()];
      props.updateFilters({
        name: props.name,
        newValue: newItem,
      });
    }
  };

  return (
    <div className={[props.className, "disableSelect"].join(" ")}>
      <div className={style.radiolist}>
        <div className={style.filtertitle}>{display}</div>
        <ul>
          <li>
            <div>
              <i
                className="material-icons"
                onClick={() => {
                  if (!isAll) {
                    onAllClickHandler();
                  }
                }}
              >
                {isAll ? "radio_button_checked" : "radio_button_unchecked"}
              </i>
            </div>
            <div>All</div>
          </li>
          {list.map((item) => {
            return (
              <li key={item.id}>
                <div>
                  <i
                    className="material-icons"
                    onClick={() => {
                      onClickHandler(item);
                    }}
                  >
                    {selectedItem.some((el) => el === item.name.toLowerCase())
                      ? "radio_button_checked"
                      : "radio_button_unchecked"}
                  </i>
                </div>
                <div>{item.name}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RadioList;
