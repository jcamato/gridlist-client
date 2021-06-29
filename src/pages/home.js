import React from "react";

import Banner from "../assets/img/home-banner-text.jpg";

// Styles
import style from "./home.module.css";

function Home() {
  return (
    <div className={style.homeMain}>
      <div className={style.banner}>
        {/* <div className="title">
          <div>The best way to discover, track, and share media content.</div>
          <div>All in one place.</div>
        </div> */}

        <img src={Banner} alt="" />
      </div>
    </div>
  );
}

export default Home;
