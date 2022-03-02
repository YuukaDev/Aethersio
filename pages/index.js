import Login from "../components/Login/Login";
import Main from "../components/Main/Main";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../auth/firebase";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Context } from "../context";
import { collection, getDocs } from "firebase/firestore";
export default function Home() {
  const [user] = useAuthState(auth);
  const colRef = collection(db, 'user');
  const { userDataCred } = useContext(Context);
  //const router = useRouter();

  useEffect(() => {
    getDocs(colRef)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          userDataCred.push({
            user
          })
        })
      })
      console.log(userDataCred);
  }, [])

  const fetchUserData = async () => {

  }

  return <>{!user ? <Login /> : <Main />}</>;
}
