import Login from "../components/Login/Login";
import Main from "../components/Main/Main";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase";
import { useRouter } from "next/router";
export default function Home() {
  const [user] = useAuthState(auth);
  //const router = useRouter();

  return <>{!user ? <Login /> : <Main />}</>;
}
