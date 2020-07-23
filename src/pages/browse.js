import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import _ from "lodash";

// assets
import null_movie from "../assets/img/null_movie.png";

// Constants
import * as Constants from "../constants";

// Components
import Grid from "../components/Grid/Grid";
import List from "../components/List/List";
import MovieCard from "../components/MovieCard/MovieCard";
import MovieRow from "../components/MovieRow/MovieRow";
import SelectMenu from "../components/SelectMenu/SelectMenu";
import FilterChips from "../components/FilterChips/FilterChips";
import CheckboxList from "../components/Filter/CheckboxList";
import SliderRange from "../components/Filter/SliderRange";

import useInfiniteScroll from "../hooks/useInfiniteScroll";

// Styles
import "./browse.css";

const Browse = () => {
  // TMDB
  const APP_KEY = process.env.REACT_APP_TMDB_KEY;

  const [movies, setMovies] = useState([]);

  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("popularity");
  const [sortDirection, setSortDirection] = useState("desc");

  const initialNextPage = 2;
  const [nextPage, setNextPage] = useState(initialNextPage);

  const initialFilters = Constants.movieFilters;

  const [filters, setFilters] = useState(initialFilters);
  let filterQuery = "";

  // For now use vote_count.gte until I can weigh the scores myself
  // const fetchCall = `https://api.themoviedb.org/3/discover/movie?api_key=${APP_KEY}&without_keywords=210024&include_adult=false&vote_count.gte=200&sort_by=${sort}.${sortDirection}${filterQuery}`;

  useEffect(() => {
    makeFilterQuery();
    resetNextPage();
    getMovies();
  }, [sort, sortDirection, filters]);

  const resetNextPage = () => {
    setNextPage(initialNextPage);
  };

  // FIX:
  // - Refactor these two fetches into one function
  // - Add progress indicator during fetch loads
  // - Filters are not preserved across additional pages
  // - Filters need to display the associated text
  // - Coming back to page resets filters, sort, etc.
  const getMovies = async () => {
    const fetchCall = `https://api.themoviedb.org/3/discover/movie?api_key=${APP_KEY}&without_keywords=210024&include_adult=false&vote_count.gte=200&sort_by=${sort}.${sortDirection}${filterQuery}`;
    // const serverCall = `http://localhost:5000/movies?&without_keywords=210024&include_adult=false&vote_count.gte=200&sort_by=${sort}.${sortDirection}${filterQuery}`;
    const fetchLog = `&without_keywords=210024&include_adult=false&vote_count.gte=200&sort_by=${sort}.${sortDirection}${filterQuery}`;
    console.log(`fetchLog: ${fetchLog}`);
    const response = await fetch(fetchCall);
    const data = await response.json();
    setMovies(data.results);
    console.log(data.results);
  };

  const getMoreMovies = async () => {
    const fetchCall = `https://api.themoviedb.org/3/discover/movie?api_key=${APP_KEY}&without_keywords=210024&include_adult=false&vote_count.gte=200&sort_by=${sort}.${sortDirection}${filterQuery}`;
    const fetchLog = `&without_keywords=210024&include_adult=false&vote_count.gte=200&sort_by=${sort}.${sortDirection}${filterQuery}`;
    const nextFetchCall = `${fetchCall}&page=${nextPage}`;
    const nextFetchLog = `${fetchLog}&page=${nextPage}`;
    console.log(`nextFetchLog: ${nextFetchLog}`);
    const response = await fetch(nextFetchCall);
    const data = await response.json();
    console.log(data.results);
    setMovies((prevMovies) => [...prevMovies, ...data.results]);
    setIsFetching(false);
    setNextPage((prevPage) => prevPage + 1);
  };

  const updateFilters = (filterUpdateInfo) => {
    const newFilters = _.cloneDeep(filters);
    const indexOfFilter = newFilters.findIndex(
      (f) => f.name === filterUpdateInfo.name
    );

    if (indexOfFilter < 0) {
      console.log("Tried to update filter that couldn't be found");
      return;
    }

    _.set(
      newFilters,
      `[${indexOfFilter}].currentValue`,
      filterUpdateInfo.newValue
    );

    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  const makeFilterQuery = () => {
    console.log(filters);

    const currentFilters = filters.filter(
      // deep comparison
      (filter) => !_.isEqual(filter.defaultValue, filter.currentValue)
    );

    filterQuery = currentFilters
      .map(
        (filter) =>
          `${filter.query}=${filter.prepareValueForQuery(filter.currentValue)}`
      )
      .join("");
  };

  const [isFetching, setIsFetching] = useInfiniteScroll(getMoreMovies);

  return (
    <div className="browseMain">
      <section className="filterMenu">
        <SliderRange
          title="Score"
          unit="Percent"
          lowerName="Score GTE"
          upperName="Score LTE"
          currentFilters={filters}
          updateFilters={updateFilters}
        />
        <SliderRange
          title="Release"
          unit="Years"
          lowerName="Release GTE"
          upperName="Release LTE"
          currentFilters={filters}
          updateFilters={updateFilters}
        />
        <CheckboxList
          title="Genre"
          name="Genre"
          content={Constants.genres}
          currentFilters={filters}
          updateFilters={updateFilters}
        />
        <SliderRange
          title="Runtime"
          unit="Minutes"
          lowerName="Runtime GTE"
          upperName="Runtime LTE"
          currentFilters={filters}
          updateFilters={updateFilters}
        />
        {/* <div className="filterWidget"></div>
        <div className="filterWidget"></div>
        <div className="filterWidget"></div>
        <div className="filterWidget"></div>
        <div className="filterWidget"></div>
        <div className="filterWidget"></div> */}
      </section>
      <header className="header">
        <h1>Movies</h1>
        <div className="selectGroup">
          <p>View:</p>
          <SelectMenu
            width="9rem"
            defaultDisplay="Grid"
            defaultIcon="view_module"
            content={Constants.viewOptions}
            onSelect={(newView) => {
              if (newView === "list") {
                getMoreMovies();
              }
              setView(newView);
            }}
          />
          <p>Sort:</p>
          <SelectMenu
            width="12.5rem"
            defaultDisplay="Popularity"
            defaultIcon="whatshot"
            content={Constants.sortOptions}
            onSelect={(newSort) => {
              setSort(newSort);
            }}
          />
          <p>Direction:</p>
          <SelectMenu
            width="12.5rem"
            defaultDisplay="Descending"
            defaultIcon="keyboard_arrow_down"
            content={Constants.sortDirectionOptions}
            onSelect={(newSortDirection) => {
              setSortDirection(newSortDirection);
            }}
          />
        </div>
      </header>
      <main className="mainContent">
        <FilterChips
          currentFilters={filters}
          updateFilters={updateFilters}
          clearFilters={clearFilters}
        />

        {view === "grid" ? (
          <Grid>
            {movies.map((movie) => {
              return (
                <MovieCard
                  key={movie.id}
                  // Card props
                  tmdb_id={movie.id}
                  // poster={Constants.basePImageURL + movie.poster_path}
                  poster={
                    movie.poster_path
                      ? Constants.basePImageURL + movie.poster_path
                      : null_movie
                  }
                  // Overlay props
                  title={movie.title}
                  score={movie.vote_average * 10}
                  year={movie.release_date.substr(0, 4)}
                  description={movie.overview}
                  background={Constants.baseBDImageURL + movie.backdrop_path}
                />
              );
            })}
          </Grid>
        ) : (
          <List>
            {movies.map((movie, index) => {
              return (
                <MovieRow
                  key={movie.id}
                  // Row props
                  tmdb_id={movie.id}
                  // poster={Constants.basePImageURL + movie.poster_path}
                  title={movie.title}
                  score={movie.vote_average * 10}
                  year={movie.release_date.substr(0, 4)}
                  rank={index + 1}
                />
              );
            })}
          </List>
        )}

        {isFetching && "Fetching more movies..."}
      </main>
      <aside className="adContainer">
        <div>
          Movie data powered by{" "}
          <a
            href="https://www.themoviedb.org/"
            rel="noopener noreferrer"
            target="_blank"
          >
            TMDb
          </a>
        </div>
      </aside>
    </div>
  );
};

export default Browse;
