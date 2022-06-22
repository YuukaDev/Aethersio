import { useState, useEffect, useContext } from "react";

import Login from "../components/Login/Login";
import Main from "../components/Main/Main";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../lib/firebase";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { Context } from "../context";
import { Button } from "@chakra-ui/react";
export default function Home() {
  const { handleLogout } = useContext(Context);
  const [user] = useAuthState(auth);

  return <>
    {
      !user ?
        <Login />
        :
        <>
          <Main />
          <Button>Logout</Button>
        </>
    };
  </>
}


