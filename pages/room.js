import Main from "../components/Main/Main";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Chat() {
  const router = useRouter();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  })

  return (
    <>
      <Main />
    </>
  );
}
