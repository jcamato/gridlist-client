import React, { Fragment, useState } from "react";
import style from "./authmodal.module.css";

import useLockBodyScroll from "../../../hooks/useLockBodyScroll";
import { toast } from "react-toastify";

const LoginModal = ({ setAuth }) => {
  useLockBodyScroll();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      console.log(parseRes);

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Logged in successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <form
        onSubmit={onSubmitForm}
        className={[style.formContainer, "disableSelect"].join(" ")}
      >
        <h2 className={style.title}>Login to your account</h2>
        <div className={style.bar}>
          <div className={style.searchBarLeft}>
            <i className="material-icons">alternate_email</i>
          </div>
          <input
            className={style.searchBarRight}
            type="text"
            name="email"
            value={email}
            placeholder="email"
            onChange={(e) => onChange(e)}
            // className={style.input}
          />
        </div>
        <div className={style.bar}>
          <div className={style.searchBarLeft}>
            <i className="material-icons">vpn_key</i>
          </div>
          <input
            className={style.searchBarRight}
            type="password"
            name="password"
            value={password}
            placeholder="password"
            onChange={(e) => onChange(e)}
            // className={style.input}
          />
        </div>
        <button className={style.submitBtn}>Submit</button>
      </form>
    </Fragment>
  );
};

export default LoginModal;
