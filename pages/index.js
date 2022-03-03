import { useState, useEffect, useContext } from "react";

import Login from "../components/Login/Login";
import Main from "../components/Main/Main";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/firebase";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { Context } from "../context";
import { Button } from "@chakra-ui/react";
export default function Home() {
  const { handleLogout } = useContext(Context);
  const [user] = useAuthState(auth);

  const getUsers = async () => {
    const userCollection = collection(db, 'users');
    await addDoc(userCollection, {
      displayName: user.uid,
      email: user?.email,
      photoURL: user?.photoURL
    })
  }

  useEffect(() => {
    getUsers();
  }, [])

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
