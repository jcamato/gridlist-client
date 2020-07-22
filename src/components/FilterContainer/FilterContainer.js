import React, { Fragment } from "react";
import style from "./filtercontainer.module.css";

const FilterContainer = () => {
  // state and functions here

  let filterWidgets = [
    { id: 1, filter: "test1" },
    { id: 2, filter: "test2" },
    { id: 3, filter: "test3" },
    { id: 4, filter: "test4" },
    { id: 5, filter: "test5" },
    { id: 6, filter: "test6" },
    { id: 7, filter: "test7" },
    { id: 8, filter: "test8" },
  ];

  return (
    <Fragment>
      {/* component here */}
      <section className={style.container}>
        {filterWidgets.map((filterWidget) => {
          return (
            <div key={filterWidget.id} className={style.filterWidget}></div>
          );
        })}
      </section>
    </Fragment>
  );
};

export default FilterContainer;
