import React from "react";
import style from "./filterchips.module.css";

const FilterChips = (props) => {
  const changedFiltersNameList = Object.keys(props.currentFilters).filter(
    // deep comparison
    (name) => props.currentFilters[name].currentValue !== null
  );

  const isFiltered = changedFiltersNameList.length !== 0;

  const handleClick = (name) => {
    props.updateFilters({
      name: name,
      newValue: null,
    });
  };

  return (
    <div className={props.className}>
      <div className={style.filterChips}>
        {changedFiltersNameList.map((name) => {
          return (
            <div
              key={name}
              className={style.filterChip}
              onClick={() => {
                handleClick(name);
              }}
            >
              {name.replace(/_/g, " ")}:{" "}
              {props.currentFilters[name].prepareValueForChips(
                props.currentFilters[name].currentValue
              )}
            </div>
          );
        })}

        {isFiltered && (
          <div
            className={style.clearChip}
            onClick={() => {
              props.clearFilters();
            }}
          >
            Clear Fliters
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterChips;
