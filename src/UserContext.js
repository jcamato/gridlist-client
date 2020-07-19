import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  console.log("user provider");

  return <UserContext.Provider>{props.children}</UserContext.Provider>;
};
