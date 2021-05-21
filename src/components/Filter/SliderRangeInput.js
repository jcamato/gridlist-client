import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles({
  root: {
    color: "#34b9e0",
    width: 250,
  },
  input: {
    width: 42,
  },
});

export default function InputSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState([0, 100]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange0 = (event) => {
    const thisValue =
      event.target.value === "" ? "" : Number(event.target.value);
    setValue([thisValue, value[1]]);
  };

  const handleInputChange1 = (event) => {
    const thisValue =
      event.target.value === "" ? "" : Number(event.target.value);
    setValue([value[0], thisValue]);
  };

  const handleBlur = () => {
    if (value[0] < 0) {
      setValue([0, value[1]]);
    } else if (value[1] > 100) {
      setValue([value[0], 100]);
    }
  };

  return (
    <div className={classes.root}>
      <Slider
        value={
          typeof value[0] === "number" && typeof value[1] === "number"
            ? value
            : [0, 100]
        }
        onChange={handleSliderChange}
        aria-labelledby="input-slider"
      />
      <Input
        className={classes.input}
        value={value[0]}
        margin="dense"
        onChange={handleInputChange0}
        onBlur={handleBlur}
        inputProps={{
          step: 1,
          min: 0,
          max: 100,
          type: "number",
          "aria-labelledby": "input-slider",
        }}
      />
      <Input
        className={classes.input}
        value={value[1]}
        margin="dense"
        onChange={handleInputChange1}
        onBlur={handleBlur}
        inputProps={{
          step: 1,
          min: 0,
          max: 100,
          type: "number",
          "aria-labelledby": "input-slider",
        }}
      />
    </div>
  );
}
