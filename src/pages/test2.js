import React from "react";

// import Browsegames from "./games/browse-games.js";
// import RegisterModal from "../components/Auth/RegisterModal";
import LibraryEntryModal from "../components/Modal/LibraryEntry/LibraryEntryModal";
// import FilterContainer from "../components/FilterContainer/FilterContainer";
// import SelectMenu from "../components/SelectMenu/SelectMenu";

// Constants
// import * as Constants from "../constants";

// Styles
import style from "./test.module.css";

function Test2() {
  return (
    <div className={style.testMain}>
      <div className={style.testTop}>
        <h1>Test Components</h1>
      </div>

      <div className={style.content}>
        {/* <SelectMenu
          defaultDisplay="Grid"
          defaultIcon="view_module"
          content={Constants.viewOptions}
        />
        <SelectMenu
          defaultDisplay="Popularity"
          defaultIcon="whatshot"
          content={Constants.sortOptions}
        />
        <SelectMenu
          defaultDisplay="Descending"
          defaultIcon="keyboard_arrow_down"
          content={Constants.sortDirectionOptions}
        /> */}
        <LibraryEntryModal />
      </div>
    </div>
  );
}

export default Test2;
