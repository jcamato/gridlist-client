import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

// Constants
import * as Constants from "../constants";

// Components
import MovieCard from "../components/MovieCard/MovieCard";
import SelectMenu from "../components/SelectMenu/SelectMenu";
import FilterChips from "../components/FilterChips/FilterChips";
import CheckboxFilter from "../components/Filters/CheckboxFilter";
import SliderFilter from "../components/Filters/SliderFilter";

import useInfiniteScroll from "../components/useInfiniteScroll";

// Styles
import "./browse.css";

const Browselift = () => {
  // TMDB
  const APP_KEY = process.env.REACT_APP_TMDB_KEY;

  const [movies, setMovies] = useState([]);

  const [sort, setSort] = useState("popularity");
  const [sortDirection, setSortDirection] = useState("desc");

  const initialNextPage = 2;
  const [nextPage, setNextPage] = useState(initialNextPage);

  const initialFilters = [
    // {
    //   name: "Genre",
    //   query: "&with_genres",
    //   defaultValue: [],
    //   currentValue: [],
    //   prepareValueForQuery: value => {
    //     return value;
    //   }
    // },
    {
      name: "Release GTE",
      query: "&primary_release_date.gte",
      defaultValue: 1896,
      currentValue: 1896,
      prepareValueForQuery: value => {
        return `${value}-01-01`;
      }
    },
    {
      name: "Release LTE",
      query: "&primary_release_date.lte",
      defaultValue: 2021,
      currentValue: 2021,
      prepareValueForQuery: value => {
        return `${value}-12-31`;
      }
    },
    {
      name: "Runtime GTE",
      query: "&with_runtime.gte",
      defaultValue: 0,
      currentValue: 0,
      prepareValueForQuery: value => {
        return value;
      }
    },
    {
      name: "Runtime LTE",
      query: "&with_runtime.lte",
      defaultValue: 240,
      currentValue: 240,
      prepareValueForQuery: value => {
        return value;
      }
    }
  ];

  const [filters, setFilters] = useState(initialFilters);
  let filterQuery = "";

  // For now use vote_count.gte until I can weigh the scores myself
  // const fetchCall = `https://api.themoviedb.org/3/discover/movie?api_key=${APP_KEY}&include_adult=false&vote_count.gte=200&sort_by=${sort}.${sortDirection}${filterQuery}`;

  useEffect(() => {
    makeFilterQuery();
    resetNextPage();
    getMovies();
  }, [sort, sortDirection, filters]);

  const resetNextPage = () => {
    setNextPage(initialNextPage);
  };

  const getMovies = async () => {
    const fetchCall = `https://api.themoviedb.org/3/discover/movie?api_key=${APP_KEY}&include_adult=false&vote_count.gte=200&sort_by=${sort}.${sortDirection}${filterQuery}`;
    const fetchLog = `&include_adult=false&vote_count.gte=200&sort_by=${sort}.${sortDirection}${filterQuery}`;
    console.log(`fetchLog: ${fetchLog}`);
    const response = await fetch(fetchCall);
    const data = await response.json();
    setMovies(data.results);
    console.log(data.results);
  };

  const getMoreMovies = async () => {
    const fetchCall = `https://api.themoviedb.org/3/discover/movie?api_key=${APP_KEY}&include_adult=false&vote_count.gte=200&sort_by=${sort}.${sortDirection}${filterQuery}`;
    const fetchLog = `&include_adult=false&vote_count.gte=200&sort_by=${sort}.${sortDirection}${filterQuery}`;
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

  const updateFilters = filterUpdateInfo => {
    const newFilters = _.cloneDeep(filters);
    const indexOfFilter = newFilters.findIndex(
      f => f.name === filterUpdateInfo.name
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

  const makeFilterQuery = () => {
    console.log(filters);

    const currentFilters = filters.filter(
      filter => filter.defaultValue !== filter.currentValue
    );

    filterQuery = currentFilters
      .map(
        filter =>
          `${filter.query}=${filter.prepareValueForQuery(filter.currentValue)}`
      )
      .join("");
  };

  const [isFetching, setIsFetching] = useInfiniteScroll(getMoreMovies);

  return (
    <div className="browseMain">
      <section className="filterMenu">
        <SliderFilter
          title="Release"
          unit="Years"
          lowerName="Release GTE"
          upperName="Release LTE"
          currentFilters={filters}
          updateFilters={updateFilters}
        />
        <CheckboxFilter
          onToggle={newFilter => {
            console.log("old set filter here");
            // setFilterQuery(newFilter);
          }}
        />
        <SliderFilter
          title="Runtime"
          unit="Minutes"
          lowerName="Runtime GTE"
          upperName="Runtime LTE"
          currentFilters={filters}
          updateFilters={updateFilters}
        />
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
        <FilterChips currentFilters={filters} updateFilters={updateFilters} />
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

export default Browselift;
