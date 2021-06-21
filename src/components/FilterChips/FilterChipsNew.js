import React from "react";
import style from "./filterchips.module.css";
// import _ from "lodash";

const FilterChipsNew = (props) => {
  // const changedFilters = Object.values(props.currentFilters).filter(
  //   // deep comparison
  //   (filter) => !_.isEqual(null, filter.currentValue)
  // );

  const changedFiltersNameList = Object.keys(props.currentFilters).filter(
    // deep comparison
    (name) => props.currentFilters[name].currentValue !== null
  );

  const isFiltered = changedFiltersNameList.length !== 0;

  // const makeFilterChip = filter => {
  //   // take currentFilters and create formatted string
  // };

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
              {/* {props.currentFilters[name].currentValue} */}
            </div>
          );
        })}

        {/* <div className={style.filterChip}>Score: 85-100</div>
        <div className={style.filterChip}>Release: 1980-2010</div>
        <div className={style.filterChip}>Genre: Action & Comedy & Fantasy</div>
        <div className={style.filterChip}>Runtime: 0-120</div> */}
        {/* add any applicable widgets that can be accessed by discover call */}
        {/* <div className={style.filterChip}>Cast: Tom Hanks | Jack Nicholson</div>
        <div className={style.filterChip}>Crew: David Fincher</div> */}

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

export default FilterChipsNew;
