
import Main from "../components/Main/Main";
import Login from "../components/Login/Login";

import { auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import useShop from "../utils/StoreContext";

export default function Home() {
  const [user] = useAuthState(auth);
  const { customer } = useShop();
  console.log(customer);
  return (
    <div>
      {!user ? <Login /> :
        <>
          <Main />
        </>
      }
    </div>
  )
}


