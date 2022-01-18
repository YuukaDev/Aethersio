import React, { useState, createContext } from "react";
import { signInWithPopup, GithubAuthProvider, signOut } from "firebase/auth";
import { auth } from "../auth/firebase";

export const Context = createContext();

export const ContextProvider = (props) => {
  const [userCred, setUserCred] = useState(null);
  //const [anotherUser, setAnotherUser] = useState({});
  const [base, setBase] = useState({});

  const value = {
    userCred,
    setUserCred,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
