
import Main from "../components/Main/Main";
import Login from "../components/Login/Login";

import { auth } from "../lib/firebase";
import { Button } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user] = useAuthState(auth);
  return (
    <div>
      {!user ? <Login /> :
        <>
          <Main />
          <Button onClick={() => signOut(auth)}>Logout</Button>
        </>
      }
    </div>
  )
}


