import React, { Fragment } from "react";
import style from "./registermodal.module.css";

const RegisterModal = (props) => {
  return (
    <Fragment>
      <div className={props.active ? style.modal : style.displayNone}>
        <form className={[style.formContainer, "disableSelect"].join(" ")}>
          <h2 className={style.title}>Create an account</h2>
          <input
            type="text"
            name="username"
            // value={username}
            placeholder="username"
            // onChange={(e) => onChange(e)}
            className={style.input}
          />
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
      </div>
    </Fragment>
  );
};

export default RegisterModal;
