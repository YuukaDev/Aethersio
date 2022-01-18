//import io from "socket.io-client";

import Main from "../components/Main/Main";
import Login from "../components/Login/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase";

export default function Chat() {
  const [currentUser] = useAuthState(auth);

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
