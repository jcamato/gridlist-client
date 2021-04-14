import React, { useEffect, useState } from "react";

// assets
import null_movie from "../assets/img/null_movie.png";
import bannerPhoto from "../development/img/bannerPhoto.jpg";

// Constants
import * as Constants from "../constants";

// Components
import MovieCard from "../components/MovieCard/MovieCard";
import Grid from "../components/Grid/Grid";
import SelectMenu from "../components/SelectMenu/SelectMenu";
import CategoryMenu from "../components/CategoryMenu/CategoryMenu";

// Libraries
import _ from "lodash";

// Styles
import style from "./library.module.css";
import "./browse/browse.css";

const Library = (props) => {
  const [allMovies, setAllMovies] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [catSelection, setCatSelection] = useState(0);

  const getLibrary = async () => {
    try {
      const response = await fetch("http://localhost:5000/library/movie", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const movies = await response.json();

      setAllMovies(movies);

      if (catSelection === 0) {
        setDisplayedMovies(movies);
        console.log(movies);
      } else {
        const catMovies = _.filter(movies, {
          library_category_id: catSelection,
        });
        setDisplayedMovies(catMovies);
        console.log(catMovies);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getLibrary();
    // console.log(movies);
  }, [catSelection]);

  const counts = {};
  counts.all = allMovies.length;
  counts.want = _.filter(allMovies, { library_category_id: 1 }).length;
  counts.done = _.filter(allMovies, { library_category_id: 3 }).length;

  // console.log(counts);

  return (
    <div className={style.main}>
      <div className={style.bannerContainer}>
        <img className={style.bannerPhoto} src={bannerPhoto} alt="" />
      </div>
      <nav className={style.navContainer}></nav>

      <section className={style.filterContainer}>
        <div className="filterWidget"></div>
        <div className="filterWidget"></div>
        <div className="filterWidget"></div>
        <div className="filterWidget"></div>
        <div className="filterWidget"></div>
      </section>

      <header className={style.header}>
        <h1>Movies</h1>
        <div className={style.selectGroup}>
          <p>View:</p>
          <SelectMenu
            width="9rem"
            defaultDisplay="Grid"
            defaultIcon="view_module"
            content={Constants.viewOptions}
            // onSelect={(newView) => {
            //   if (newView === "list") {
            //     getMoreMovies();
            //   }
            //   setView(newView);
            // }}
          />
          <p>Sort:</p>
          <SelectMenu
            width="12.5rem"
            defaultDisplay="Popularity"
            defaultIcon="whatshot"
            // content={Constants.sortOptions}
            // onSelect={(newSort) => {
            //   setSort(newSort);
            // }}
          />
          <p>Direction:</p>
          <SelectMenu
            width="12.5rem"
            defaultDisplay="Descending"
            defaultIcon="keyboard_arrow_down"
            // content={Constants.sortDirectionOptions}
            // onSelect={(newSortDirection) => {
            //   setSortDirection(newSortDirection);
            // }}
          />
        </div>
      </header>

      <main className={style.content}>
        {displayedMovies.length > 0 && (
          <Grid>
            {displayedMovies.map((movie) => {
              return (
                <MovieCard
                  key={movie.tmdb_id}
                  // Card props
                  tmdb_id={movie.tmdb_id}
                  poster={
                    movie.poster_path
                      ? Constants.basePImageURL + movie.poster_path
                      : null_movie
                  }
                  // Overlay props
                  title={movie.title}
                  score={movie.vote_average * 10}
                  year={movie.release_date && movie.release_date.substr(0, 4)}
                  description={movie.overview}
                  background={Constants.baseBDImageURL + movie.backdrop_path}
                />
              );
            })}
          </Grid>
        )}
      </main>
      <aside className={style.sideContainer}>
        <CategoryMenu
          content={Constants.movieCategoryOptions}
          onSelect={(newCategory) => {
            setCatSelection(newCategory);
          }}
          counts={counts}
          category={catSelection}
          // wantCount={wantCount}
          // watchCount={watchCount}
        />
      </aside>
    </div>
  );
};

export default Library;
