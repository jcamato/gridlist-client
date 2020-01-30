import React, { useState, useReducer } from "react";
import style from "./checkboxfilter.module.css";

const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" }
];

const CheckboxUseReducer = props => {
  const [isAny, setIsAny] = useState(true);

  const initialState = [];
  const [selectedGenres, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    switch (action.type) {
      case "add":
        // This is always slightly behind the props fetch call so it doesn't update until the next render call
        return [...state, action.value];
      case "remove":
        // unsure about this one?
        return state.filter(el => el.id !== action.value.id);
      case "reset":
        return initialState;
      default:
        throw new Error();
    }
  }

  // Toggle boolean state of Any
  const toggleAny = () => {
    setIsAny(prevAny => !prevAny);
  };

  // Clear genres when empty Any is selected
  const onAnyClickHandler = () => {
    toggleAny();
    dispatch({ type: "reset" });
  };

  const onClickHandler = genre => {
    // if selectedGenres doesn't have current genre then add it
    if (!selectedGenres.some(el => el.id === genre.id)) {
      // if current state is Any, toggle off
      if (selectedGenres.length === 0) {
        toggleAny();
      }
      dispatch({ type: "add", value: genre });
      // if selectedGenres has current genre then remove it
    } else {
      // if last remaining genre, switch to "Any";
      if (selectedGenres.length === 1) {
        toggleAny();
      }
      // remove id
      dispatch({ type: "remove", value: genre });
    }
  };

  return (
    <div className={props.className}>
      <div className={style.checkboxfilter}>
        <div className={style.filtertitle}>Genre</div>
        <ul>
          <li>
            <div>
              <i
                className="material-icons"
                onClick={() => {
                  if (!isAny) {
                    onAnyClickHandler();
                    console.log("fetch genres:");
                    console.log(JSON.stringify(selectedGenres));
                    props.onToggle("");
                  }
                }}
              >
                {/* show "Any" icon type depending on its state */}
                {isAny ? "check_box" : "check_box_outline_blank"}
              </i>
            </div>
            <div>Any</div>
          </li>
          {genres.map(genre => {
            return (
              <li key={genre.id}>
                <div>
                  <i
                    className="material-icons"
                    onClick={() => {
                      onClickHandler(genre);
                      console.log("fetch genres:");
                      console.log(JSON.stringify(selectedGenres));
                      if (selectedGenres.length !== 0) {
                        props.onToggle(
                          "&with_genres=" +
                            selectedGenres.map(el => el.id).join(",")
                        );
                      } else {
                        props.onToggle("");
                      }
                    }}
                  >
                    {/* show genre icon type depending on their state */}
                    {selectedGenres.some(el => el.id === genre.id)
                      ? "check_box"
                      : "check_box_outline_blank"}
                  </i>
                </div>
                <div>{genre.name}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CheckboxUseReducer;
