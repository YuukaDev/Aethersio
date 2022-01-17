import React, { useState, createContext } from "react";
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";

export const Context = createContext();

export const ContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [base, setBase] = useState({});

  const handleLogin = async () => {
    try {
      const user = await signInWithPopup(auth, new GithubAuthProvider());
      setUser(user);
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogout = async () => {
    if (user != null) {
      console.log("User is not logged in");
    } else {
      await signOut(auth);
      console.log(`User is signed out ${user?.email}`);
    }
  };

  const value = {
    user,
    setUser,
    base,
    setBase,
    handleLogin,
    handleLogout,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
