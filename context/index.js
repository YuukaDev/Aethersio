import React, { useState, createContext } from "react";
import { signInWithPopup, GithubAuthProvider, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [userDataCred, setUserDataCred] = useState([]);
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [user] = useAuthState(auth);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const handleLogin = async () => {
    try {
      const userData = await signInWithPopup(auth, new GithubAuthProvider());
      setUserDataCred(userData);
      console.log(userDataCred);
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
    userDataCred,
    setUserDataCred,
    handleLogin,
    handleLogout,
    showChat,
    setShowChat,
    room,
    setRoom,
    currentMessage,
    setCurrentMessage,
    messageList,
    setMessageList,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
