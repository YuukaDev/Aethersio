//import ChatContent from "../components/Chat/ChatContent";

import { useContext } from "react";
import { Context } from "../context";

import io from "socket.io-client";
import Main from "../components/Main/Main";
import Login from "../components/Login/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase";
import { useRouter } from "next/router";

export default function Chat() {
  const router = useRouter();
  const [currentUser] = useAuthState(auth);
  const { userCred } = useContext(Context);

  return (
    <>
      {currentUser ? (
        <Main username={currentUser?.email} imageSrc={currentUser?.photoURL} />
      ) : (
        <Login />
      )}
    </>
  );
}
