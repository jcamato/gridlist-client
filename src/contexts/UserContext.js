import React, { useState, useEffect, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [auth, setAuth] = useState(false);
  const [authUsername, setAuthUsername] = useState(null);

  const checkAuth = async () => {
    try {
      const myHeaders = new Headers();

      if (localStorage.token) {
        myHeaders.append("jwt_token", localStorage.token);
      }

      const res = await fetch("http://localhost:5000/auth/verify", {
        method: "GET",
        headers: myHeaders,
      });

      const parseRes = await res.json();

      parseRes === true ? setAuth(true) : setAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getAuthenticatedUsername = async () => {
    try {
      // set headers for GET request
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      if (localStorage.token) {
        myHeaders.append("jwt_token", localStorage.token);
      }

      const response = await fetch(
        "http://localhost:5000/user/getAuthenticatedUser",
        {
          method: "GET",
          headers: myHeaders,
        }
      );

      const user = await response.json();

      if (user) {
        setAuthUsername(user.username);
      }

      // return parseRes;
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuth();
    getAuthenticatedUsername();
  }, []);

  return (
    <UserContext.Provider
      value={{
        authProvider: [auth, setAuth],
        authUserProvider: [authUsername, setAuthUsername],
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
