import React, { Fragment } from "react";

// Styles
import style from "./notfound.module.css";

// Components
import Footer from "../components/Footer/Footer";

const NotFound = () => (
  <Fragment>
    <div className={style.errorContainer}>
      <h1>404</h1>
      <p>Oops! We can’t find the page you requested.</p>
    </div>
    <Footer />
  </Fragment>
);

export default NotFound;
