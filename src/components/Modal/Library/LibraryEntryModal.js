import React, { Fragment, useState } from "react";
import style from "./libraryentrymodal.module.css";
import useLockBodyScroll from "../../../hooks/useLockBodyScroll";

import { LightTooltip } from "../../External/material-ui";

const LibraryEntryModal = (props) => {
  useLockBodyScroll();

  // FIX: database doesn't like these empty strings, but component doesn't like null props. catch 22. I think the database should process the empty strings. Also, setting to "watched" should change watchCount to 1. Setting to 'want to watch' should change watchCount to 0. Changing date watched should changed cat to 'watched' and watchCount to 1 if not already or at 0. other rules?

  const [inputs, setInputs] = useState({
    library_category_id: props.libraryCategory,
    score: props.libraryScore ? props.libraryScore : "",
    watch_date: props.watchDate ? props.watchDate.split("T")[0] : "",
    watch_count: props.watchCount ? props.watchCount : "",
    secret: props.secret,
  });

  const { library_category_id, score, watch_date, watch_count, secret } =
    inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSave = async (tmdb_movie_id) => {
    // e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      if (localStorage.token) {
        myHeaders.append("jwt_token", localStorage.token);
      }

      const body = {
        tmdb_movie_id,
        library_category_id,
        score,
        watch_date,
        watch_count,
        secret,
      };
      const response = await fetch("http://localhost:5000/library/movie", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();

      console.log(parseResponse);

      console.log("form saved");

      // setTodosChange(true);
      // setDescription("");
      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (tmdb_movie_id) => {
    // e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      if (localStorage.token) {
        myHeaders.append("jwt_token", localStorage.token);
      }

      const response = await fetch(
        `http://localhost:5000/user/library/movie/${tmdb_movie_id}`,
        {
          method: "DELETE",
          headers: myHeaders,
        }
      );

      const parseResponse = await response.json();
      console.log(parseResponse);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <form
        // FIX: when do event action need arrow functions and when do they not. when something is passed???
        onSubmit={() => handleSave(props.tmdb_movie_id)}
        // className={[style.formContainer, "disableSelect"].join(" ")}
        className={style.formContainer}
      >
        <div className={style.toprow}>
          <h3 className={style.title}>{props.title}</h3>
          <div className={style.close}>
            <i className="material-icons-round">close</i>
          </div>
        </div>

        <div className={style.row}>
          <div className={style.descriptor}>Status</div>
          <div className={style.field}>
            <select
              name="library_category_id"
              value={library_category_id}
              onChange={(e) => onChange(e)}
            >
              <option value="1">Want to Watch</option>
              {/* <option value="2">Watching</option> */}
              <option value="3">Watched</option>
            </select>
          </div>
        </div>

        <div className={style.row}>
          <div className={style.descriptor}>Score</div>
          <div className={style.field}>
            <input
              type="number"
              name="score"
              value={score}
              onChange={(e) => onChange(e)}
              placeholder="1-100"
              min="1"
              max="100"
              step="1"
            ></input>
          </div>
        </div>
        <div className={style.row}>
          <div className={style.descriptor}>Watch Date</div>
          <div className={style.field}>
            <input
              type="date"
              name="watch_date"
              value={watch_date}
              onChange={(e) => onChange(e)}
            ></input>
          </div>
        </div>
        <div className={style.row}>
          <div className={style.descriptor}>Watch Count</div>
          <div className={style.field}>
            <input
              type="number"
              name="watch_count"
              value={watch_count}
              onChange={(e) => onChange(e)}
              min="0"
              max="999"
              step="1"
            ></input>
          </div>
        </div>
        <div className={style.row}>
          <div className={style.descriptor}>Visibility</div>
          <div className={style.field}>
            <select name="secret" value={secret} onChange={(e) => onChange(e)}>
              <option value="false">Public</option>
              <option value="true">Private</option>
            </select>
          </div>
        </div>
        <button className={style.submitBtn}>Save</button>
        <div className={style.delete}>
          <LightTooltip title="Delete from Library" placement="top" arrow>
            <i
              onClick={() => handleDelete(props.tmdb_movie_id)}
              className="material-icons"
            >
              delete
            </i>
          </LightTooltip>
        </div>
      </form>
    </Fragment>
  );
};

export default LibraryEntryModal;
