import React, { Fragment, useState } from "react";
import style from "./authmodal.module.css";

import useLockBodyScroll from "../../../hooks/useLockBodyScroll";
import { toast } from "react-toastify";

const RegisterModal = ({ setAuth }) => {
  useLockBodyScroll();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { username, email, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { username, email, password };
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Registered successfully");
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
        <h2 className={style.title}>Create an account</h2>
        <input
          type="text"
          name="username"
          value={username}
          placeholder="username"
          onChange={(e) => onChange(e)}
          className={style.input}
        />
        <input
          type="text"
          name="email"
          value={email}
          placeholder="email"
          onChange={(e) => onChange(e)}
          className={style.input}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={(e) => onChange(e)}
          className={style.input}
        />
        <button className={style.submitBtn}>Submit</button>
      </form>
    </Fragment>
  );
};

export default RegisterModal;
