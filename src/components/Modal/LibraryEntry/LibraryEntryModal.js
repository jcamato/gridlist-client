import React, { Fragment } from "react";
import style from "./libraryentrymodal.module.css";
import useLockBodyScroll from "../../../hooks/useLockBodyScroll";

import { LightTooltip } from "../../External/material-ui";

const LibraryEntryModal = () => {
  useLockBodyScroll();

  return (
    <Fragment>
      <form
        // onSubmit={onSubmitForm}
        className={[style.formContainer, "disableSelect"].join(" ")}
      >
        <div className={style.toprow}>
          <h2 className={style.title}>Library Item Name</h2>
          <div className={style.close}>
            <i className="material-icons-round">close</i>
          </div>
        </div> 
        
        <div className={style.row}>
          <div className={style.descriptor}>Status</div>
          <div className={style.field}>
            <select name="status">
              <option value="1">Want to Watch</option>
              <option value="2">Watching</option>
              <option value="3">Watched</option>
            </select>
          </div>
        </div>

        <div className={style.row}>
          <div className={style.descriptor}>Score</div>
          <div className={style.field}>
            <input type="number" name="score" min="1" max="100" step="1"></input>
          </div>
        </div>
        <div className={style.row}>
          <div className={style.descriptor}>Watch Date</div>
          <div className={style.field}>
            <input type="date" name="watch_date"></input>
          </div>
        </div>
        <div className={style.row}>
          <div className={style.descriptor}>Watch Count</div>
          <div className={style.field}>
            <input type="number" name="watch_count" min="1" max="999" step="1"></input>
          </div>
        </div>
        <div className={style.row}>
          <div className={style.descriptor}>Visibility</div>
          <div className={style.field}>
            <label>
              <input type="radio" name="visibility" value="public" checked />
              Public
            </label>
            <label>
              <input type="radio" name="visibility" value="private" checked />
              Private
            </label>
          </div>
        </div>
        {/* <div className={style.row}>
          <div className={style.descriptor}>Notes</div>
          <div className={style.field}>
            <input type="text" name="notes"></input>
          </div>
        </div> */}
        <button className={style.submitBtn}>Save</button>
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
