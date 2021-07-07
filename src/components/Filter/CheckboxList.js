import React from "react";
import style from "./checkboxlist.module.css";
import { toTitleCase } from "../../utils";

const CheckboxList = (props) => {
  const list = props.content;
  const currentValue = props.currentFilters[props.name].currentValue;
  const selectedItems = currentValue === null ? [] : currentValue;

  // one source of truth
  const isAll = selectedItems.length === 0;

  // Clear genres when empty All is selected
  const onAllClickHandler = () => {
    props.updateFilters({
      name: props.name,
      newValue: null,
    });
  };

  const onClickHandler = (item) => {
    // if selectedItems doesn't have ID then add it
    if (!selectedItems.some((el) => el === item.name.toLowerCase())) {
      const addItem = [...selectedItems, item.name.toLowerCase()];
      props.updateFilters({
        name: props.name,
        newValue: addItem,
      });
    } else {
      // remove id
      const removeItem = selectedItems.filter(
        (el) => el !== item.name.toLowerCase()
      );

      if (removeItem.length === 0) {
        props.updateFilters({
          name: props.name,
          newValue: null,
        });
      } else {
        props.updateFilters({
          name: props.name,
          newValue: removeItem,
        });
      }
    }
  };

  return (
    <div className={[props.className, "disableSelect"].join(" ")}>
      <div className={style.checkboxlist}>
        <div className={style.filtertitle}>{toTitleCase(props.name)}</div>
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
                {isAll ? "check_box" : "check_box_outline_blank"}
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
                    {selectedItems.some((el) => el === item.name.toLowerCase())
                      ? "check_box"
                      : "check_box_outline_blank"}
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

export default CheckboxList;
