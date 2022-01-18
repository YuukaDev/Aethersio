//import ChatContent from "../components/Chat/ChatContent";

import { useContext } from "react";

import io from "socket.io-client";
import Main from "../components/Main/Main";
import Login from "../components/Login/Login";
import { Context } from "../context";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase";

export default function Chat() {
  const { userCred } = useContext(Context);
  const [currentUser] = useAuthState(auth);
  return (
    <>
      {currentUser ? (
        <Main username={userCred?.email} imageSrc={currentUser?.photoURL} />
      ) : (
        <Login />
      )}
    </>
  );
}
