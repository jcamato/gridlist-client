import React, { useState, useEffect, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [auth, setAuth] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/verify", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await res.json();

      parseRes === true ? setAuth(true) : setAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <UserContext.Provider value={[auth, setAuth]}>
      {props.children}
    </UserContext.Provider>
  );
};
