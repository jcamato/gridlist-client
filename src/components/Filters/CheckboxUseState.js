import React, { useState } from "react";
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

const CheckboxUseState = props => {
  const initialState = [];
  const [selectedGenres, setSelectedGenres] = useState(initialState);

  // Clear genres when empty Any is selected
  const onAnyClickHandler = () => {
    setSelectedGenres(initialState);
  };

  const onClickHandler = genre => {
    // if selectedGenres doesn't have current genre then add it
    if (!selectedGenres.some(el => el.id === genre.id)) {
      // slower array manipulation results in fetch getting called sooner than setState, everything gets jammed
      const addGenre = [...selectedGenres, genre];
      // const addGenre = selectedGenres;
      // addGenre.push(genre);
      setSelectedGenres(addGenre);
      // if selectedGenres has current genre then remove it
    } else {
      // remove id
      const removeGenre = selectedGenres.filter(el => el.id !== genre.id);
      setSelectedGenres(removeGenre);
    }
  };

  const isAny = selectedGenres.length === 0;

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
                    // onAnyClickHandler();
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

export default CheckboxUseState;
