import React, { useState } from "react";
import style from "./sliderrange.module.css";
import _ from "lodash";
import { toTitleCase } from "../../utils";

import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    color: "#34b9e0",
  },
});

const SliderRange = (props) => {
  const [draftBounds, setDraftBounds] = useState(null);

  function valuetext(value) {
    return `${props.name} ${value} ${props.unit}`;
  }

  const classes = useStyles();

  let resolvedValue;
  if (draftBounds) {
    resolvedValue = draftBounds;
  } else if (props.currentFilters[props.name].currentValue) {
    resolvedValue = props.currentFilters[props.name].currentValue;
  } else {
    resolvedValue = [props.min, props.max];
  }

  const handleChange = (event, sliderValue) => {
    setDraftBounds(sliderValue);
  };

  const handleCommittedChange = (event, sliderValue) => {
    // set committed value to null if it equals min and max of slider
    const committedValue = _.isEqual(sliderValue, [props.min, props.max])
      ? null
      : sliderValue;
    props.updateFilters({
      name: props.name,
      newValue: committedValue,
    });
    setDraftBounds(null);
  };

  return (
    // <div className={props.className}>
    <div className="disableSelect">
      <div className={style.sliderFilter}>
        <div className={style.filterTitle}>
          {toTitleCase(props.name.replace(/_/g, " "))}
        </div>
        <div className={style.sliderContainer}>
          <Slider
            className={classes.root}
            min={props.min}
            max={props.max}
            step={props.step}
            value={resolvedValue}
            onChange={handleChange}
            onChangeCommitted={handleCommittedChange}
            valueLabelDisplay="off"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
          />
        </div>
        <div className={style.valuesContainer}>
          <div className={style.values}>{resolvedValue[0]}</div>
          <div className={style.values}>{resolvedValue[1]}</div>
        </div>
      </div>
    </div>
  );
};

export default SliderRange;
