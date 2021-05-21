import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import _ from "lodash";
import { default as queryString } from "query-string";

// assets

// FIX: create query builder here

// Constants
import * as Constants from "../constants";

// Components
// import SelectMenu from "../components/SelectMenu/SelectMenu";
import FilterChipsNew from "../components/FilterChips/FilterChipsNew";
import CheckboxListNew from "../components/Filter/CheckboxListNew";
// import SliderRange from "../components/Filter/SliderRange";
import SliderRangeNew from "../components/Filter/SliderRangeNew";

// Styles
import "./browse/browse.css";

// generateQueryString

// Change this to listConfig to change view and sort as well?
const filterConfig = {
  // sort: {
  //   defaultValue: "popularity",
  //   currentValue: "popularity",
  //   prepareValueForQuery: (value) => {
  //     if (!value) return null;
  //     return value;
  //   },
  //   parseQuery: (value) => {
  //     return value;
  //   },
  // },
  // order: {
  //   defaultValue: "desc",
  //   currentValue: "desc",
  //   prepareValueForQuery: (value) => {
  //     if (!value) return null;
  //     return value;
  //   },
  //   parseQuery: (value) => {
  //     return value;
  //   },
  // },
  score: {
    // range: [0, 100],
    currentValue: null,
    // prepareValueForQuery takes whatever our value data structure is and turns it into a URL-safe string
    prepareValueForQuery: (value) => {
      if (!value) return null;
      else return `${value[0]}..${value[1]}`;
    },
    // i recommend renaming to parseValueFromQuery -> takes whatever was in the URL, and very safely tries to unwind to a value
    parseQuery: (query) => {
      /// make this common helper functione for get range from query
      const querySplit = query.split("..");
      //const splitIsValid = querySplit.length === 2
      // isNumber check??
      // add safety to parse Int
      // alert(querySplit);
      return [parseInt(querySplit[0]), parseInt(querySplit[1])];
    },
    prepareValueForChips: (value) => {
      if (!value) return null;
      else return `${value[0]}-${value[1]}`;
    },
  },
  release: {
    currentValue: null,
    prepareValueForQuery: (value) => {
      if (!value) return null;
      else return `${value[0]}..${value[1]}`;
    },
    parseQuery: (query) => {
      const querySplit = query.split("..");
      return [parseInt(querySplit[0]), parseInt(querySplit[1])];
    },
    prepareValueForChips: (value) => {
      if (!value) return null;
      else return `${value[0]}-${value[1]}`;
    },
  },
  genre: {
    currentValue: null,
    prepareValueForQuery: (value) => {
      if (!value) return null;
      else return value.join(",");
    },
    parseQuery: (query) => {
      // console.log("query split: ", query.split(","));
      return query.split(",");
    },
    prepareValueForChips: (value) => {
      if (!value) return null;
      else return value.join(", ");
    },
  },
  runtime: {
    currentValue: null,
    prepareValueForQuery: (value) => {
      if (!value) return null;
      else return `${value[0]}..${value[1]}`;
    },
    parseQuery: (query) => {
      const querySplit = query.split("..");
      return [parseInt(querySplit[0]), parseInt(querySplit[1])];
    },
    prepareValueForChips: (value) => {
      if (!value) return null;
      else return `${value[0]}-${value[1]}`;
    },
  },
};

const Test1 = () => {
  useEffect(() => {
    getCurrentQueryString();
    // console.log(match);
  }, []);

  let history = useHistory();
  let location = useLocation();

  // TODO: This needs to use a new batchUpdate or something, instead of updateFiltering one by one as it parse thes
  const getCurrentQueryString = () => {
    const currentQueryString = queryString.parse(location.search);
    console.log("Query String: ", currentQueryString);

    for (const parameterKey of Object.keys(currentQueryString)) {
      // console.log(parameterKey);

      // const matchingFilter = Object.values(filterConfig).find(
      //   (i) => i.name === parameterKey
      // );
      updateFilters({
        name: parameterKey, // used to replace the value where filter returns the name
        newValue: filters[parameterKey].parseQuery(
          currentQueryString[parameterKey]
        ),
      });
    }
  };

  const handleHistory = (qs) => {
    history.push(`?${qs}`);
  };

  // const [view, setView] = useState("grid");
  // const [sort, setSort] = useState("popularity");
  // const [sortDirection, setSortDirection] = useState("desc");

  // const initialFilters = queryDictionary;

  const [filters, setFilters] = useState(filterConfig);
  // let filterQuery = "";

  useEffect(() => {
    handleHistory(createQueryString());
    // console.log(location.search);
  }, [filters]);

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
    setFilters(filterConfig);
  };

  const createQueryString = () => {
    // console.log(filters);

    const changedFiltersNameList = Object.keys(filters).filter(
      // deep comparison
      (name) => filters[name].currentValue !== null
    );

    return (
      changedFiltersNameList
        // .map((name) => filters[name])
        .map(
          (name) =>
            `${name}=${filters[name].prepareValueForQuery(
              filters[name].currentValue
            )}`
        )
        .join("&")
    );

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
            currentFilters={filters}
            updateFilters={updateFilters}
          />
          <SliderRangeNew
            name="release"
            unit="Years"
            min={1896}
            max={new Date().getFullYear() + 1}
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
            currentFilters={filters}
            updateFilters={updateFilters}
          />
        </section>
        <header className="header">
          <h1>Movies</h1>
          <div className="selectGroup">
            <p>Sort:</p>
            {/* <SelectMenu
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
            /> */}
          </div>
        </header>
        <main className="mainContent">
          {/* <button onClick={() => { pushHistory("/game/1942") }}>Push route /game/1942</button>
          <button onClick={() => { pushHistory("/game/11156") }}>Push route /game/11156</button> */}
          <FilterChipsNew
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

export default Test1;
