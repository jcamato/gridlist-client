import React, { Fragment } from "react";
import style from "./libraryentrymodal.module.css";

import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

const LightTooltip = withStyles((theme) => ({
  arrow: {
    color: theme.palette.common.white,
  },
  tooltip: {
    fontFamily: "Open Sans",
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

const LibraryEntryModal = () => {
  return (
    <Fragment>
      <form
        // onSubmit={onSubmitForm}
        className={[style.formContainer, "disableSelect"].join(" ")}
      >
        <h2 className={style.title}>Edit Entry</h2>
        <select name="cat">
          <option value="1">Want to Watch</option>
          <option value="2">Watching</option>
          <option value="3">Watched</option>
        </select>

        <input type="range" name="score" min="0" max="100" step="1"></input>
        <input type="date" name="watch_date"></input>
        <input type="number" name="watch_count"></input>

        <label>
          <input type="radio" name="visibility" value="public" checked />
          Public
        </label>
        <label>
          <input type="radio" name="visibility" value="private" checked />
          Private
        </label>

        <input type="text" name="notes"></input>

        <button className={style.submitBtn}>Submit</button>
        <div className={style.delete}>
          <LightTooltip title="Delete from Library" placement="top" arrow>
            <i className="material-icons">delete</i>
          </LightTooltip>
        </div>
      </form>
    </Fragment>
  );
};

export default LibraryEntryModal;
