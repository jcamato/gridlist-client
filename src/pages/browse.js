import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Constants
import * as Constants from "../constants";

// Components
import MovieCard from "../components/MovieCard/MovieCard";
import SelectMenu from "../components/SelectMenu/SelectMenu";
// import FilterChips from "../components/FilterChips/FilterChips";
import CheckboxFilter from "../components/Filters/CheckboxFilter";
// import SliderFilter from "../components/Filters/SliderFilter";

import useInfiniteScroll from "../components/useInfiniteScroll";

// Styles
import "./browse.css";

const Browse = () => {
  // TMDB
  const APP_KEY = process.env.REACT_APP_TMDB_KEY;

  const [movies, setMovies] = useState([]);

  const [sort, setSort] = useState("popularity");
  const [sortDirection, setSortDirection] = useState("desc");
  const [filters, setFilters] = useState("");

  // const [releaseFilter, setReleaseFilter] = useState("");

  // const test = () => {
  //   const filter = `&primary_release_date.gte=${min}&primary_release_date.lte=${max}`;
  // };

  const initialNextPage = 2;
  const [nextPage, setNextPage] = useState(initialNextPage);

  // For now use vote_count.gte until I can weigh the scores myself
  const fetchCall = `https://api.themoviedb.org/3/discover/movie?api_key=${APP_KEY}&include_adult=false&vote_count.gte=200&sort_by=${sort}.${sortDirection}${filters}`;
  const fetchLog = `&include_adult=false&vote_count.gte=200&sort_by=${sort}.${sortDirection}${filters}`;

  useEffect(() => {
    resetNextPage();
    getMovies();
  }, [sort, sortDirection, filters]);

  const resetNextPage = () => {
    setNextPage(initialNextPage);
  };

  const getMovies = async () => {
    const response = await fetch(fetchCall);
    const data = await response.json();
    setMovies(data.results);
    console.log(`fetchLog: ${fetchLog}`);
    console.log(data.results);
  };

  const getMoreMovies = async () => {
    const nextFetchCall = `${fetchCall}&page=${nextPage}`;
    const nextFetchLog = `${fetchLog}&page=${nextPage}`;
    console.log(`nextFetchLog: ${nextFetchLog}`);
    const response = await fetch(nextFetchCall);
    const data = await response.json();
    console.log(data.results);
    setMovies(prevMovies => [...prevMovies, ...data.results]);
    setIsFetching(false);
    setNextPage(prevPage => prevPage + 1);
  };

  const [isFetching, setIsFetching] = useInfiniteScroll(getMoreMovies);

  return (
    <div className="browseMain">
      <section className="filterMenu">
        {/* <SliderFilter
          title="Release"
          min={1896}
          max={2020}
          unit="Years"
          qString="primary_release_date"
          qMinExtra="-01-01"
          qMaxExtra="-12-31"
          sendFilter={newFilter => {
            setFilters(newFilter);
          }}
        /> */}
        <CheckboxFilter
          onToggle={newFilter => {
            setFilters(newFilter);
          }}
        />
        {/* <SliderFilter
          title="Runtime"
          min={0}
          max={240}
          unit="Minutes"
          qString="with_runtime"
          qMinExtra=""
          qMaxExtra=""
          sendFilter={newFilter => {
            setFilters(newFilter);
          }}
        /> */}
        <div className="filterWidget"></div>
        <div className="filterWidget"></div>
        <div className="filterWidget"></div>
        <div className="filterWidget"></div>
        <div className="filterWidget"></div>
        <div className="filterWidget"></div>
      </section>
      <header className="header">
        <h1>Movies</h1>

        <div className="sortGroup">
          <p>Sort:</p>
          <SelectMenu
            className="SortMenu"
            defaultDisplay="Popularity"
            defaultIcon="whatshot"
            content={Constants.sortOptions}
            onSelect={newSort => {
              setSort(newSort);
            }}
          />
          <p>Direction:</p>
          <SelectMenu
            className="SortDirectionMenu"
            defaultDisplay="Descending"
            defaultIcon="keyboard_arrow_down"
            content={Constants.sortDirectionOptions}
            onSelect={newSortDirection => {
              setSortDirection(newSortDirection);
            }}
          />
        </div>
      </header>
      <main className="moviesContainer">
        {/* <FilterChips /> */}
        <div className="movieGrid">
          {movies.map(movie => {
            return (
              <Link key={movie.id} to={`/movie/${movie.id}`}>
                <MovieCard
                  // Card props
                  key={movie.id}
                  poster={Constants.basePImageURL + movie.poster_path}
                  // Overlay props
                  title={movie.title}
                  score={movie.vote_average * 10}
                  year={movie.release_date.substr(0, 4)}
                  description={movie.overview}
                  background={Constants.baseBDImageURL + movie.backdrop_path}
                />
              </Link>
            );
          })}
        </div>
        {isFetching && "Fetching more movies..."}
      </main>
      <aside className="adContainer"></aside>
    </div>
  );
};

export default Browse;
