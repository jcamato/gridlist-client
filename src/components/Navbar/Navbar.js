import React, { Fragment, useState, useRef, useContext } from "react";
import style from "./navbar.module.css";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
// import Logo from "../../assets/img/logo.png";
import Logo from "../../assets/img/logo.svg";
import RegisterModal from "../Modal/Auth/RegisterModal";
import LoginModal from "../Modal/Auth/LoginModal";
import useOutsideClick from "../../hooks/useOutsideClick";
import { UserContext } from "../../contexts/UserContext";

const Navbar = () => {
  const history = useHistory();

  const [auth, setAuth] = useContext(UserContext);

  const [search, setSearch] = useState("");

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const sendToSearch = (e) => {
    e.preventDefault();
    // history.push({
    //   pathname: "/search",
    //   // search: "?query=abc",
    //   state: { query: search },
    // });
    history.push({
      pathname: `/search/${search}`,
      // search: "?query=abc",
      // state: { query: search },
    });
    setSearch("");
  };

  const [registerModalActive, setRegisterModalActive] = useState(false);
  const [loginModalActive, setLoginModalActive] = useState(false);

  const refRegister = useRef();
  const refLogin = useRef();

  useOutsideClick(refRegister, () => {
    if (registerModalActive) {
      toggleRegisterModal();
    }
  });

  useOutsideClick(refLogin, () => {
    if (loginModalActive) {
      toggleLoginModal();
    }
  });

  // FIX:
  // - Auth modals need to toggle on successful submission
  // - Auth modals need alternative notification and error handling because I don't like toastify
  const toggleRegisterModal = () => {
    setRegisterModalActive((prevActive) => !prevActive);
  };

  const toggleLoginModal = () => {
    setLoginModalActive((prevActive) => !prevActive);
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logged out successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <header className={[style.navbar, "disableSelect"].join(" ")}>
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
            <Link className={style.navlink} to="/library/movies">
              <li>Library</li>
            </Link>
            <div className={style.search}>
              <form className={style.searchContainer} onSubmit={sendToSearch}>
                <div className={style.searchBarLeft}>
                  <i className="material-icons">search</i>
                </div>
                <input
                  className={style.searchBarRight}
                  placeholder="Search"
                  type="text"
                  value={search}
                  onChange={updateSearch}
                />
              </form>
            </div>
          </ul>
          <ul className={style.right}>
            <Link className={style.navlink} to="/test1">
              <li>Test1</li>
            </Link>
            <Link className={style.navlink} to="/test2">
              <li>Test2</li>
            </Link>
            <Link className={style.navlink} to="/test3">
              <li>Test3</li>
            </Link>
            {!auth && (
              <Fragment>
                <div className={style.navlink} onClick={toggleRegisterModal}>
                  <li>Sign Up</li>
                </div>
                <div className={style.navlink} onClick={toggleLoginModal}>
                  <li>Login</li>
                </div>
              </Fragment>
            )}
            {auth && (
              <Fragment>
                <div className={style.navlink}>
                  <li>Profile</li>
                </div>
                <div className={style.navlink} onClick={logout}>
                  <li>Logout</li>
                </div>
              </Fragment>
            )}
          </ul>
        </nav>
      </header>
      {/* FIX: when modal is open, user is able to navigate back/forward pages */}
      {registerModalActive && (
        <div className={style.modalBackground}>
          <div ref={refRegister}>
            <RegisterModal setAuth={setAuth} />
          </div>
        </div>
      )}
      {loginModalActive && (
        <div className={style.modalBackground}>
          <div ref={refLogin}>
            <LoginModal setAuth={setAuth} />
          </div>
        </div>
      )}

      {/* {query && <Link to={`/search`} query={query}></Link>} */}
    </Fragment>
  );
};

export default Navbar;
