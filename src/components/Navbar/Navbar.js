import React, { Fragment, useState } from "react";
import style from "./navbar.module.css";
import { Link } from "react-router-dom";
// import Logo from "../../assets/img/logo.png";
import Logo from "../../assets/img/logo.svg";
import RegisterModal from "../Auth/RegisterModal";

const Navbar = () => {
  const [authModalActive, setAuthModalActive] = useState(false);

  const toggleAuthModal = () => {
    setAuthModalActive((prevActive) => !prevActive);
    console.log("toggling auth modal... " + authModalActive);
  };

  return (
    <Fragment>
      <div className={style.navbar}>
        <div className={style.container}>
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
            <div className={style.navlink}>
              <li>Search</li>
            </div>
          </ul>
          <ul className={style.right}>
            <Link className={style.navlink} to="/test">
              <li>Test</li>
            </Link>
            <div className={style.navlink} onClick={toggleAuthModal}>
              <li>Sign Up</li>
            </div>
            <div className={style.navlink}>
              <li>Login</li>
            </div>
          </ul>
        </div>
      </div>
      <RegisterModal active={authModalActive} />
    </Fragment>
  );
};

export default Navbar;
