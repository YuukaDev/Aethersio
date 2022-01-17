import React, { useState, createContext } from "react";
import { signInWithPopup, GithubAuthProvider, signOut } from "firebase/auth";
import { auth } from "../auth/firebase";

export const Context = createContext();

export const ContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [base, setBase] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const { currentUser } = await signInWithPopup(auth, new GithubAuthProvider());
      const url = await fetch(
        `https://api.github.com/users/${user._tokenResponse.screenName}`
      );
      const random = await url.json();
      setBase(random);
      setUser(currentUser);
      setLoggedIn(true);

      console.log(random);
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleLogout = async () => {
    await signOut(auth);
    console.log(`User is signed out ${user?.email}`);
  };

  const value = {
    user,
    setUser,
    base,
    setBase,
    handleLogin,
    handleLogout,
    loggedIn,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
