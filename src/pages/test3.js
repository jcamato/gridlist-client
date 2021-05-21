import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import _ from "lodash";
import { default as queryString } from "query-string";

// assets

// FIX: create query builder here

// Constants
import * as Constants from "../constants";

// Components
import SelectMenu from "../components/SelectMenu/SelectMenu";
import FilterChips from "../components/FilterChips/FilterChips";
import CheckboxListNew from "../components/Filter/CheckboxListNew";
// import SliderRange from "../components/Filter/SliderRange";
import SliderRangeNew from "../components/Filter/SliderRangeNew";

// Styles
import "./browse/browse.css";

// generateQueryString

const queryDictionary = {
  sort: {
    defaultValue: "popularity",
    currentValue: "popularity",
    prepareValueForQuery: (value) => {
      return value;
    },
    parseQuery: (value) => {
      return value;
    },
  },
  order: {
    defaultValue: "desc",
    currentValue: "desc",
    prepareValueForQuery: (value) => {
      return value;
    },
    parseQuery: (value) => {
      return value;
    },
  },
  genre: {
    defaultValue: [],
    currentValue: [],
    prepareValueForQuery: (value) => {
      return value;
    },
    parseQuery: (value) => {
      return value.split(",");
    },
  },
  score: {
    defaultValue: [0, 100],
    currentValue: [0, 100],
    prepareValueForQuery: (value) => {
      return `${value[0]}..${value[1]}`;
    },
    parseQuery: (value) => {
      return value;
    },
  },
  release: {
    defaultValue: [1896, new Date().getFullYear() + 1],
    currentValue: [1896, new Date().getFullYear() + 1],
    prepareValueForQuery: (value) => {
      return `${value[0]}..${value[1]}`;
    },
    parseQuery: (value) => {
      return value;
    },
  },
  runtime: {
    defaultValue: [0, 240],
    currentValue: [0, 240],
    prepareValueForQuery: (value) => {
      return `${value[0]}..${value[1]}`;
    },
    parseQuery: (value) => {
      return value;
    },
  },
};

const queryBuilder = [
  {
    name: "genre",
    query: "&genre",
    defaultValue: [],
    currentValue: [],
    prepareValueForQuery: (value) => {
      // return value.map(id => Constants.genres.find(i => i.id === id).name);
      // console.log(`prepareValueForQuery(${value})`);
      // console.log(value.map(id => Constants.genres.find(i => i.id === id).name));
      return value;
    },
    parseQuery: (value) => {
      return value.split(",");
    },
  },
  {
    name: "score",
    query: "&score",
    defaultValue: [0, 100],
    currentValue: [0, 100],
    prepareValueForQuery: (value) => {
      return `${value[0]}..${value[1]}`;
    },
    parseQuery: (value) => {
      return value;
    },
  },
  {
    name: "release",
    query: "&release",
    defaultValue: [1896, new Date().getFullYear() + 1],
    currentValue: [1896, new Date().getFullYear() + 1],
    prepareValueForQuery: (value) => {
      return `${value[0]}..${value[1]}`;
    },
    parseQuery: (value) => {
      return value;
    },
  },
  {
    name: "runtime",
    query: "&runtime",
    defaultValue: [0, 240],
    currentValue: [0, 240],
    prepareValueForQuery: (value) => {
      return `${value[0]}..${value[1]}`;
    },
    parseQuery: (value) => {
      return value;
    },
  },
];

const Test3 = () => {
  useEffect(() => {
    getCurrentQueryString();
    // console.log(match);
  }, []);

  let history = useHistory();
  let location = useLocation();

  const getCurrentQueryString = () => {
    const queryParameters = queryString.parse(location.search);
    console.log(queryParameters);

    for (const parameterKey of Object.keys(queryParameters)) {
      // console.log(parameterKey);
      const matchingFilter = queryBuilder.find((i) => i.name === parameterKey);
      updateFilters({
        name: parameterKey, // used to replace the value where filter returns the name
        newValue: matchingFilter.parseQuery(queryParameters[parameterKey]),
      });
    }
  };

  const handleHistory = (qs) => {
    history.push(`?${qs}`);
  };

  // const pushHistory = (route) => {
  //     history.push(`${route}`);
  // }

  // const [view, setView] = useState("grid");
  const [sort, setSort] = useState("popularity");
  const [sortDirection, setSortDirection] = useState("desc");

  const initialFilters = queryBuilder;

  const [filters, setFilters] = useState(initialFilters);
  let filterQuery = "";

  useEffect(() => {
    makeFilterQuery();
    handleHistory(filterQuery);
    // console.log(location.search);
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

    // console.log(filterQuery);
  };

  return (
    <Fragment>
      <div className="browseMain">
        <section className="filterContainer">
          <SliderRangeNew
            name="score"
            unit="Percent"
            currentFilters={filters}
            updateFilters={updateFilters}
          />
          <SliderRangeNew
            name="release"
            unit="Years"
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
            currentFilters={filters}
            updateFilters={updateFilters}
          />
        </section>
        <header className="header">
          <h1>Movies</h1>
          <div className="selectGroup">
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
          {/* <button onClick={() => { pushHistory("/game/1942") }}>Push route /game/1942</button>
          <button onClick={() => { pushHistory("/game/11156") }}>Push route /game/11156</button> */}
          <FilterChips
            currentFilters={filters}
            updateFilters={updateFilters}
            clearFilters={clearFilters}
          />
        </main>
        <aside className="adContainer"></aside>
      </div>
    </Fragment>
  );
};

export default Test3;
