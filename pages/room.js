import Main from "../components/Main/Main";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Context } from "../context";

export default function Chat() {
  const router = useRouter();
  const { userDataCred } = useContext(Context)
  const [user] = useAuthState(auth);

  return (
    <>
      <button onClick={() => console.log(userDataCred)}>Click</button>
    </>
  );
}
