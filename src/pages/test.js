import React from "react";

// import Browsegames from "./games/browse-games.js";
import RegisterModal from "../components/Auth/RegisterModal";

function Test() {
  let style = {
    backgroundColor: "lightgrey",
    height: "100vh",
  };

  let h1style = {
    color: "#34b9e0",
  };

  return (
    <div className="App">
      <div style={style}>
        <h1 style={h1style}>Test Components</h1>
        {/* <RegisterModal /> */}
      </div>
    </div>
  );
}

export default Test;
