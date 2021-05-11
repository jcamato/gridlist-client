import React from "react";
import style from "./filterchips.module.css";
import _ from "lodash";

const FilterChips = (props) => {
  const currentFilters = props.currentFilters.filter(
    // deep comparison
    (filter) => !_.isEqual(filter.defaultValue, filter.currentValue)
  );

  const isFiltered = currentFilters.length === 0;

  // const makeFilterChip = filter => {
  //   // take currentFilters and create formatted string
  // };

  const handleClick = (filter) => {
    props.updateFilters({
      name: filter.name,
      newValue: filter.defaultValue,
    });
  };

  return (
    <div className={props.className}>
      <div className={style.filterChips}>
        {currentFilters.map((filter) => {
          return (
            <div
              key={filter.name}
              className={style.filterChip}
              onClick={() => {
                handleClick(filter);
              }}
            >
              {filter.name}: {filter.prepareValueForQuery(filter.currentValue)}
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

        {!isFiltered && (
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
