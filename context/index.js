import React, { useState, createContext } from "react";
import { signInWithPopup, GithubAuthProvider, signOut } from "firebase/auth";
import { auth } from "../auth/firebase";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [userCred, setUserCred] = useState(null);
  const [room, setRoom] = useState("");

  const handleLogin = async () => {
    try {
      const userData = await signInWithPopup(auth, new GithubAuthProvider());
      setUserCred(userData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogout = async () => {
    if (user) {
      await signOut(auth);
      console.log(`User is signed out ${user?.email}`);
    } else {
      console.log("User is not logged in");
    }
  };

  const value = {
    userCred,
    setUserCred,
    handleLogin,
    handleLogout,
    room,
    setRoom,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
