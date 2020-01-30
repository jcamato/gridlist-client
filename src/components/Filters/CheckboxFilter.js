import React, { useState } from "react";
import style from "./checkboxfilter.module.css";

const CheckboxFilter = props => {
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

  const initialState = new Set();
  const [selectedGenres, setSelectedGenres] = useState(initialState);

  // Clear genres when empty Any is selected
  const onAnyClickHandler = () => {
    // const tempClear = selectedGenres;
    // tempClear.clear();
    setSelectedGenres(initialState);
  };

  const onClickHandler = genre => {
    // if selectedGenres doesn't have ID then add it
    if (!selectedGenres.has(genre.id)) {
      const tempAdd = selectedGenres;
      tempAdd.add(genre.id);
      setSelectedGenres(tempAdd);
    } else {
      // remove id
      const tempDelete = selectedGenres;
      tempDelete.delete(genre.id);
      setSelectedGenres(tempDelete);
    }
    console.log(selectedGenres);
  };

  // one source of truth
  const isAny = selectedGenres.size === 0;

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
                    // console.log("fetch names:");
                    // console.log(selectedGenres);
                    props.onToggle("");
                  }
                }}
              >
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
                      // console.log("fetch names:");
                      // console.log(selectedGenres);
                      if (selectedGenres.size !== 0) {
                        props.onToggle(
                          "&with_genres=" + [...selectedGenres].join(",")
                        );
                      } else {
                        props.onToggle("");
                      }
                    }}
                  >
                    {selectedGenres.has(genre.id)
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

export default CheckboxFilter;
