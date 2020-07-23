import React, { useState } from "react";
import style from "./sliderrange.module.css";

import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    color: "#34b9e0",
  },
});

const SliderRange = (props) => {
  // MUI's implementation for this prop
  function valuetext(value) {
    return `${props.title} ${value} ${props.unit}`;
  }

  const classes = useStyles();

  const min = props.currentFilters.find((f) => f.name === props.lowerName)
    .defaultValue;
  const max = props.currentFilters.find((f) => f.name === props.upperName)
    .defaultValue;

  const lowerBound = props.currentFilters.find(
    (f) => f.name === props.lowerName
  ).currentValue;
  const upperBound = props.currentFilters.find(
    (f) => f.name === props.upperName
  ).currentValue;

  // FIX: Lift state up to fix slider not updating with chips
  const [bounds, setBounds] = useState([min, max]);

  const handleChange = (event, newValue) => {
    setBounds(newValue);
    // console.log(newValue);
  };

  const handleCommittedChange = (event, newValue) => {
    console.log(bounds);
    // console.log(valuetext(newValue));

    // send back to update filter if one of the bounds changes
    if (lowerBound !== bounds[0]) {
      props.updateFilters({
        name: props.lowerName, // used to replace the value where filter returns the name
        newValue: bounds[0],
      });
    } else if (upperBound !== bounds[1]) {
      props.updateFilters({
        name: props.upperName, // used to replace the value where filter returns the name
        newValue: bounds[1],
      });
    }
  };

  return (
    // <div className={props.className}>
    <div className="disableSelect">
      <div className={style.sliderFilter}>
        <div className={style.filterTitle}>{props.title}</div>
        <div className={style.sliderContainer}>
          <Slider
            className={classes.root}
            min={min}
            max={max}
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

export default SliderRange;
