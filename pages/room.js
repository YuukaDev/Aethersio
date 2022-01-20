import Main from "../components/Main/Main";
import Login from "../components/Login/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase";
import { Context } from "../context";
import { useContext } from "react";

export default function Chat() {
  const [user] = useAuthState(auth);
  const { userDataCred } = useContext(Context);
  const sendData = async () => {
    console.log(userDataCred);
  };

  const joinRoom = () => {
    if (user !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <>
      {user ? (
        <>
          <Main />
          <button onClick={sendData}>Click Me</button>
        </>
      ) : (
        <Login />
      )}
    </>
  );
}
