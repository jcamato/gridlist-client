import React from "react";
import style from "./footer.module.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.svg";

/* FIX:
  -figure out how to add footer to the bottom of pages without infinite scroll
  -add footer to bottom of content on pages. Currently it's layered over other content with position: fixed / sticky (subtract height of footer to all main content on pages with a footer?)
*/
const Footer = () => {
  return (
    <footer className={[style.footer, "disableSelect"].join(" ")}>
      <nav className={style.container}>
        <ul className={style.left}>
          <Link className={style.navlink} to="/">
            <li className={style.logoContainer}>
              <img src={Logo} alt="" />
            </li>
          </Link>
          <Link className={style.navlink} to="/movies">
            <li>Movies</li>
          </Link>
          <Link className={style.navlink} to="/games">
            <li>Games</li>
          </Link>
          <Link className={style.navlink} to="/library">
            <li>Library</li>
          </Link>
          <div className={style.search}>
            <form className={style.searchContainer}>
              <div className={style.searchBarLeft}>
                <i className="material-icons">search</i>
              </div>
              <input
                className={style.searchBarRight}
                placeholder="Search"
                type="text"
              />
            </form>
          </div>
        </ul>
        <ul className={style.right}>
          <Link className={style.navlink} to="/test">
            <li>Test</li>
          </Link>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
