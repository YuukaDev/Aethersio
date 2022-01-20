import Login from "../components/Login/Login";
import Main from "../components/Main/Main";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase";

export default function Home() {
  const [user] = useAuthState(auth);

  return <>{!user ? <Login /> : <Main />}</>;
}
