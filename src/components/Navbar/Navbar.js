import React from "react";
import style from "./navbar.module.css";
import { Link } from "react-router-dom";
// import Logo from "../../assets/img/logo.png";
import Logo from "../../assets/img/logo.svg";

const Navbar = () => {
  return (
    <div className={style.navbar}>
      <div className={style.container}>
        <ul className={style.left}>
          <Link className={style.navlink} to="/">
            <li className={style.logoContainer}>
              <img src={Logo} alt="" />
            </li>
          </Link>
          <Link className={style.navlink} to="/browse">
            <li>Browse</li>
          </Link>
          <Link className={style.navlink} to="/library">
            <li>Library</li>
          </Link>
          <div className={style.navlink}>
            <li>Search</li>
          </div>
        </ul>
        <ul className={style.right}>
          <Link className={style.navlink} to="/test">
            <li>Test</li>
          </Link>
          <div className={style.navlink}>
            <li>Login</li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
