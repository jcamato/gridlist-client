import React, { Fragment, useState, useRef } from "react";
import style from "./navbar.module.css";
import { Link } from "react-router-dom";
// import Logo from "../../assets/img/logo.png";
import Logo from "../../assets/img/logo.svg";
import RegisterModal from "../Auth/RegisterModal";
import LoginModal from "../Auth/LoginModal";
import useOutsideClick from "../useOutsideClick";

const Navbar = () => {
  const [registerModalActive, setRegisterModalActive] = useState(false);
  const [loginModalActive, setLoginModalActive] = useState(false);

  const refRegister = useRef();
  const refLogin = useRef();

  useOutsideClick(refRegister, () => {
    if (registerModalActive) {
      toggleRegisterModal();
      // console.log("Outside click detected");
    }
  });

  useOutsideClick(refLogin, () => {
    if (loginModalActive) {
      toggleLoginModal();
      // console.log("Outside click detected");
    }
  });

  const toggleRegisterModal = () => {
    setRegisterModalActive((prevActive) => !prevActive);
  };

  const toggleLoginModal = () => {
    setLoginModalActive((prevActive) => !prevActive);
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
            <div className={style.navlink} onClick={toggleRegisterModal}>
              <li>Sign Up</li>
            </div>
            <div className={style.navlink} onClick={toggleLoginModal}>
              <li>Login</li>
            </div>
          </ul>
        </div>
      </div>
      {/* FIX: when modal is open, user is able to go forward/back pages, as well as scroll */}
      {registerModalActive && (
        <div className={style.modalBackground}>
          <div ref={refRegister}>
            <RegisterModal />
          </div>
        </div>
      )}
      {loginModalActive && (
        <div className={style.modalBackground}>
          <div ref={refLogin}>
            <LoginModal />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Navbar;
