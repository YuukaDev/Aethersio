import { useEffect } from "react";

import Main from "../components/Main/Main";
import { useRouter } from "next/router";

import { auth } from "../lib/firebase";
import { Button } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
export default function Home() {
  const router = useRouter();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [])

  console.log(user);

  return (
    <div>
      <Main />
      <Button onClick={() => signOut(auth)}>Logout</Button>
    </div>
  )
}


