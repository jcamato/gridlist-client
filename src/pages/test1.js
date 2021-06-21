import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import _ from "lodash";
import { default as queryString } from "query-string";

// assets

// FIX: create query builder here

// Constants
import * as Constants from "../constants";

// Components
import SelectMenuNew from "../components/SelectMenu/SelectMenuNew";
import FilterChipsNew from "../components/FilterChips/FilterChipsNew";
import CheckboxListNew from "../components/Filter/CheckboxListNew";
// import SliderRange from "../components/Filter/SliderRange";
import SliderRangeNew from "../components/Filter/SliderRangeNew";

// Hooks
// import useInfiniteScroll from "../hooks/useInfiniteScroll";

// Styles
import "./browse/browse.css";
// import style from "./test1.module.css";

const Test1 = () => {
  useEffect(() => {
    getCurrentQueryString();
    // console.log(match);
  }, []);

  let history = useHistory();
  let location = useLocation();

  // TODO: This needs to use a new batchUpdate or something, instead of updateFiltering one by one as it parses
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

  const [sort, setSort] = useState(Constants.sortConfig);
  const [filters, setFilters] = useState(Constants.filterConfig);
  const [page, setPage] = useState(1);

  useEffect(() => {
    handleHistory(createQueryString());
    // console.log(location.search);
  }, [sort, filters, page]);

  // change this to instead update in bulk depending on if array is passed or not
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
      <div className="browseMain">
        <section className="filterContainer">
          <SliderRangeNew
            name="score"
            unit="Percent"
            min={0}
            max={100}
            step={1}
            currentFilters={filters}
            updateFilters={updateFilters}
          />
          {/* <SliderRangeNew
            name="score_count"
            unit="count"
            min={0}
            max={50000}
            step={100}
            currentFilters={filters}
            updateFilters={updateFilters}
          /> */}
          <SliderRangeNew
            name="release"
            unit="Years"
            min={1896}
            max={new Date().getFullYear() + 1}
            step={1}
            currentFilters={filters}
            updateFilters={updateFilters}
          />
          <CheckboxListNew
            name="genre"
            content={Constants.genres}
            currentFilters={filters}
            updateFilters={updateFilters}
          />
          <SliderRangeNew
            name="runtime"
            unit="Minutes"
            min={0}
            max={300}
            step={1}
            currentFilters={filters}
            updateFilters={updateFilters}
          />
        </section>
        <header className="header">
          <h1>Movies</h1>
          <div className="selectGroup">
            <p>Sort:</p>
            <SelectMenuNew
              name="sort"
              width="12.5rem"
              content={Constants.sortOptionsNew}
              currentSelection={sort}
              updateSelection={updateSort}
            />
            <SelectMenuNew
              name="order"
              width="12.5rem"
              content={Constants.orderOptionsNew}
              currentSelection={sort}
              updateSelection={updateSort}
            />
          </div>
        </header>
        <main className="mainContent">
          <FilterChipsNew
            currentFilters={filters}
            updateFilters={updateFilters}
            clearFilters={clearFilters}
          />
          {page > 1 && <button onClick={decrementPage}>Previous Page</button>}
          <span>Page: {page}</span>
          <button onClick={incrementPage}>Next Page</button>
        </main>
        <aside className="adContainer"></aside>
      </div>
    </Fragment>
  );
};

export default Test1;
