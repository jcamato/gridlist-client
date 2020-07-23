import React from "react";
import style from "./checkboxlist.module.css";

const CheckboxList = (props) => {
  const list = props.content;
  const defaultState = props.currentFilters.find((f) => f.name === props.name)
    .defaultValue;
  const selectedItems = props.currentFilters.find((f) => f.name === props.name)
    .currentValue;

  // Clear genres when empty Any is selected
  const onAnyClickHandler = () => {
    props.updateFilters({
      name: props.name,
      newValue: defaultState,
    });
  };

  const onClickHandler = (item) => {
    // if selectedItems doesn't have ID then add it
    if (!selectedItems.some((el) => el === item.id)) {
      const addItem = [...selectedItems, item.id];
      props.updateFilters({
        name: props.name,
        newValue: addItem,
      });
    } else {
      // remove id
      const removeItem = selectedItems.filter((el) => el !== item.id);
      props.updateFilters({
        name: props.name,
        newValue: removeItem,
      });
    }
    console.log(selectedItems);
  };

  // one source of truth
  const isAny = selectedItems.length === 0;

  return (
    <div className={[props.className, "disableSelect"].join(" ")}>
      <div className={style.checkboxlist}>
        <div className={style.filtertitle}>{props.title}</div>
        <ul>
          <li>
            <div>
              <i
                className="material-icons"
                onClick={() => {
                  if (!isAny) {
                    onAnyClickHandler();
                  }
                }}
              >
                {isAny ? "check_box" : "check_box_outline_blank"}
              </i>
            </div>
            <div>Any</div>
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
                    {selectedItems.some((el) => el === item.id)
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
