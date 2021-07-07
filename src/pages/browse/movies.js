import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import _ from "lodash";
import { default as queryString } from "query-string";

// assets
import null_movie from "../../assets/img/null_movie.png";

// Constants
import * as Constants from "../../constants";

// Components
import Grid from "../../components/Grid/Grid";
// import List from "../../components/List/List";
import MovieCard from "../../components/MovieCard/MovieCard";
// import MovieRow from "../../components/MovieRow/MovieRow";
import SelectMenu from "../../components/SelectMenu/SelectMenu";
import FilterChips from "../../components/FilterChips/FilterChips";
import CheckboxList from "../../components/Filter/CheckboxList";
import SliderRange from "../../components/Filter/SliderRange";

// Hooks
// import useInfiniteScroll from "../../hooks/useInfiniteScroll";

// Styles
import style from "./browsemovies.module.css";

const BrowseMovies = () => {
  useEffect(() => {
    getCurrentQueryString();
    // console.log(match);
    // console.log(`http://localhost:5000/movies${location.search}`);
  }, []);

  let history = useHistory();
  let location = useLocation();

  // FIX: TODO, This needs to use a new batchUpdate or something, instead of updateFiltering one by one as it parses
  const getCurrentQueryString = () => {
    const currentQueryString = queryString.parse(location.search);
    console.log("Query String: ", currentQueryString);

    for (const parameterKey of Object.keys(currentQueryString)) {
      console.log("parameterkey", parameterKey);

      // const matchingFilter = Object.values(Constants.filterConfig).find(
      //   (i) => i.name === parameterKey
      // );

      if (parameterKey === "page") {
        const page = parseInt(currentQueryString[parameterKey]);
        if (page > 1) {
          setPage(page);
        }
      }

      if (sort[parameterKey]) {
        updateSort({
          name: parameterKey, // used to replace the value where filter returns the name
          newValue: sort[parameterKey].parseValueFromQuery(
            currentQueryString[parameterKey]
          ),
        });
      }

      if (filters[parameterKey]) {
        updateFilters({
          name: parameterKey, // used to replace the value where filter returns the name
          newValue: filters[parameterKey].parseValueFromQuery(
            currentQueryString[parameterKey]
          ),
        });
      }
    }
  };

  const handleHistory = (qs) => {
    history.push(`?${qs}`);
  };

  // set headers for GET request
  const myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");
  if (localStorage.token) {
    myHeaders.append("jwt_token", localStorage.token);
  }

  const getMovies = async () => {
    if (createQueryString().length > 0) {
      const response = await fetch(
        `http://localhost:5000/browse/movies?${createQueryString()}`,
        {
          method: "GET",
          headers: myHeaders,
        }
      );
      const data = await response.json();
      setMovies(data);
      console.log("resonse", data);
    } else {
      const response = await fetch(`http://localhost:5000/browse/movies`, {
        method: "GET",
        headers: myHeaders,
      });
      const data = await response.json();
      setMovies(data);
      console.log("resonse", data);
    }
  };

  const [movies, setMovies] = useState([]);

  const [sort, setSort] = useState(Constants.sortConfig);
  const [filters, setFilters] = useState(Constants.filterConfig);
  const [page, setPage] = useState(1);

  useEffect(() => {
    handleHistory(createQueryString());
    // console.log(location.search);
    getMovies();
  }, [sort, filters, page]);

  // FIX: change this to instead update in bulk depending on if array is passed or not
  const updateFilters = (filterUpdateInfo) => {
    console.log("filter updating", filterUpdateInfo);
    const newFilters = _.cloneDeep(filters);

    if (!Object.keys(newFilters).includes(filterUpdateInfo.name)) {
      console.log("Tried to update filter that couldn't be found");
      return;
    }

    _.set(
      newFilters,
      `${filterUpdateInfo.name}.currentValue`,
      filterUpdateInfo.newValue
    );

    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters(Constants.filterConfig);
  };

  const updateSort = (sortUpdateInfo) => {
    console.log("sort updating", sortUpdateInfo);
    const newSort = _.cloneDeep(sort);

    if (!Object.keys(newSort).includes(sortUpdateInfo.name)) {
      console.log("Tried to update sort that couldn't be found");
      return;
    }

    _.set(
      newSort,
      `${sortUpdateInfo.name}.currentValue`,
      sortUpdateInfo.newValue
    );

    setSort(newSort);
  };

  const incrementPage = () => {
    setPage(page + 1);
    // console.log(page);
  };

  const decrementPage = () => {
    setPage(page - 1);
    // console.log(page);
  };

  const createQueryString = () => {
    // console.log(filters);

    const changedSortNameList = Object.keys(sort).filter(
      // deep comparison
      (name) => sort[name].currentValue !== null
    );

    const changedSortString = changedSortNameList
      // .map((name) => filters[name])
      .map(
        (name) =>
          `${name}=${sort[name].prepareValueForQuery(sort[name].currentValue)}`
      );

    const changedFiltersNameList = Object.keys(filters).filter(
      // deep comparison
      (name) => filters[name].currentValue !== null
    );

    const changedFiltersString = changedFiltersNameList
      // .map((name) => filters[name])
      .map(
        (name) =>
          `${name}=${filters[name].prepareValueForQuery(
            filters[name].currentValue
          )}`
      );

    let changedPageString = [];

    // FIX: if doing infinite scroll for page incrase, change from page to pages
    if (page > 1) {
      changedPageString = [`page=${page}`];
    }

    // console.log(changedFiltersString);

    const changedList = changedSortString.concat(
      changedFiltersString,
      changedPageString
    );

    // console.log(changedList);

    return changedList.join("&");

    // console.log(filterQuery);
  };

  return (
    <Fragment>
      <div className={style.main}>
        <section className={style.filterContainer}>
          <SliderRange
            name="score"
            unit="Percent"
            min={0}
            max={100}
            step={1}
            currentFilters={filters}
            updateFilters={updateFilters}
          />
          {/* <SliderRange
            name="score_count"
            unit="count"
            min={0}
            max={50000}
            step={100}
            currentFilters={filters}
            updateFilters={updateFilters}
          /> */}
          <SliderRange
            name="release"
            unit="Years"
            min={1874}
            max={new Date().getFullYear() + 1}
            step={1}
            currentFilters={filters}
            updateFilters={updateFilters}
          />
          <CheckboxList
            name="genre"
            content={Constants.genres}
            currentFilters={filters}
            updateFilters={updateFilters}
          />
          <SliderRange
            name="runtime"
            unit="Minutes"
            min={0}
            max={300}
            step={1}
            currentFilters={filters}
            updateFilters={updateFilters}
          />
          {/* FIX: add cast / crew searching */}
        </section>
        <header className={style.header}>
          <h1>Movies</h1>
          <div className={style.selectGroup}>
            {/* <p>View:</p>
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
            /> */}
            <p>Sort:</p>
            <SelectMenu
              name="sort"
              width="12.5rem"
              content={Constants.sortOptions}
              currentSelection={sort}
              updateSelection={updateSort}
            />
            <SelectMenu
              name="order"
              width="12.5rem"
              content={Constants.orderOptions}
              currentSelection={sort}
              updateSelection={updateSort}
            />
          </div>
        </header>
        <main className={style.mainContent}>
          <FilterChips
            currentFilters={filters}
            updateFilters={updateFilters}
            clearFilters={clearFilters}
          />
          {/* {view === "grid" ? ( */}
          <Grid>
            {movies.map((movie) => {
              return (
                <MovieCard
                  key={movie.id}
                  // Card props
                  tmdb_movie_id={movie.id}
                  // poster={Constants.basePImageURL + movie.poster_path}
                  poster={
                    movie.poster_path
                      ? Constants.basePImageURL + movie.poster_path
                      : null_movie
                  }
                  // Library props
                  libraryCategory={
                    movie.authenticatedUserLibraryData.library_category_id
                  }
                  libraryScore={movie.authenticatedUserLibraryData.score}
                  watchDate={movie.authenticatedUserLibraryData.watch_date}
                  watchCount={movie.authenticatedUserLibraryData.watch_count}
                  secret={movie.authenticatedUserLibraryData.private}
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
          {/* ) : (
          <List>
            {movies.map((movie, index) => {
              return (
                <MovieRow
                  key={movie.id}
                  // Row props
                  tmdb_movie_id={movie.id}
                  // poster={Constants.basePImageURL + movie.poster_path}
                  title={movie.title}
                  score={movie.vote_average * 10}
                  year={movie.release_date.substr(0, 4)}
                  rank={index + 1}
                />
              );
            })}
          </List>
          )} */}
          {/* {isFetching && "Fetching more movies..."} */}
        </main>
        <aside className={style.adContainer}></aside>
      </div>
    </Fragment>
  );
};

export default BrowseMovies;
