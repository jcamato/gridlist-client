import React, { useEffect, useState } from "react";
import _ from "lodash";

// assets

// FIX: create query builder here

// Constants
import * as Constants from "../constants";

// Components
import SelectMenu from "../components/SelectMenu/SelectMenu";
import FilterChips from "../components/FilterChips/FilterChips";
import CheckboxList from "../components/Filter/CheckboxList";
import SliderRange from "../components/Filter/SliderRange";

// Styles
import "./browse/browse.css";

const Test1 = () => {
  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("popularity");
  const [sortDirection, setSortDirection] = useState("desc");

  // const initialNextPage = 2;
  // const [nextPage, setNextPage] = useState(initialNextPage);

  const initialFilters = Constants.movieFilters;

  const [filters, setFilters] = useState(initialFilters);
  let filterQuery = "";

  useEffect(() => {
    makeFilterQuery();
  
  }, [sort, sortDirection, filters]);

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
    // console.log(filters);

    const currentFilters = filters.filter(
      // deep comparison
      (filter) => !_.isEqual(filter.defaultValue, filter.currentValue)
    );

    // console.log(currentFilters);

    filterQuery = currentFilters
      .map(
        (filter) =>
          `${filter.query}=${filter.prepareValueForQuery(filter.currentValue)}`
      )
      .join("");
  };

  // const [isFetching, setIsFetching] = useInfiniteScroll(getMoreMovies);

  return (
    <div className="browseMain">
      <section className="filterContainer">
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
      </main>
      <aside className="adContainer">
      </aside>
    </div>
  );
};

export default Test1;
