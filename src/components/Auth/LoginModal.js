import React, { Fragment } from "react";
import style from "./authmodal.module.css";

const LoginModal = (props) => {
  return (
    <Fragment>
      <form className={[style.formContainer, "disableSelect"].join(" ")}>
        <h2 className={style.title}>Login to your account</h2>
        <input
          type="text"
          name="email"
          // value={email}
          placeholder="email"
          // onChange={(e) => onChange(e)}
          className={style.input}
        />
        <input
          type="password"
          name="password"
          // value={password}
          placeholder="password"
          // onChange={(e) => onChange(e)}
          className={style.input}
        />
        <button className={style.submitBtn}>Submit</button>
      </form>
    </Fragment>
  );
};

export default LoginModal;
