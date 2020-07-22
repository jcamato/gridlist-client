import React from "react";

// import Browsegames from "./games/browse-games.js";
// import RegisterModal from "../components/Auth/RegisterModal";
// import LibraryEntryModal from "../components/Modal/LibraryEntry/LibraryEntryModal";
import FilterContainer from "../components/FilterContainer/FilterContainer";

// Styles
import style from "./test.module.css";

function Test() {
  return (
    <div className={style.testMain}>
      <div className={style.testTop}>
        <h1>Test Components</h1>
      </div>
      <div className={style.testItem}>
        <FilterContainer />
      </div>
      <div className={style.content}></div>
    </div>
  );
}

export default Test;
