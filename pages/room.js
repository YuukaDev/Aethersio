import Main from "../components/Main/Main";
import Login from "../components/Login/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase";
import { Context } from "../context";
import { useContext } from "react";

export default function Chat() {
  const [user] = useAuthState(auth);

  return (
    <>
      {user ? (
        <>
          <Main />
        </>
      ) : (
        <Login />
      )}
    </>
  );
}
