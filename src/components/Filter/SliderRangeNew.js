import React, { useState } from "react";
import style from "./sliderrange.module.css";
import { toTitleCase } from "../../utils";

import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    color: "#34b9e0",
  },
});

const SliderRangeNew = (props) => {
  // MUI's implementation for this prop
  function valuetext(value) {
    return `${props.name} ${value} ${props.unit}`;
  }

  const classes = useStyles();

  // new method
  const defaultBound = props.currentFilters.find((f) => f.name === props.name)
    .defaultValue;
  
  const currentBound = props.currentFilters.find(
    (f) => f.name === props.name
  ).currentValue;

  // FIX: Lift state up to fix slider not updating with chips?
  const [bounds, setBounds] = useState(defaultBound);

  const handleChange = (event, newValue) => {
    setBounds(newValue);
    // console.log(newValue);
  };

  const handleCommittedChange = (event, newValue) => {
    // send back to update filter if one of the bounds changes
    if (currentBound !== bounds) {
      props.updateFilters({
        name: props.name, // used to replace the value where filter returns the name
        newValue: bounds,
      });
    };
  };

  return (
    // <div className={props.className}>
    <div className="disableSelect">
      <div className={style.sliderFilter}>
        <div className={style.filterTitle}>{toTitleCase(props.name)}</div>
        <div className={style.sliderContainer}>
          <Slider
            className={classes.root}
            min={defaultBound[0]}
            max={defaultBound[1]}
            value={bounds}
            onChange={handleChange}
            onChangeCommitted={handleCommittedChange}
            valueLabelDisplay="off"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
          />
        </div>
        <div className={style.valuesContainer}>
          <div className={style.values}>{bounds[0]}</div>
          <div className={style.values}>{bounds[1]}</div>
        </div>
      </div>
    </div>
  );
};

export default SliderRangeNew;
