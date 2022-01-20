import io from "socket.io-client";
import { useContext, useState } from "react";
import ChatContent from "../Chat/ChatContent";
import { Button, Input } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../auth/firebase";
import { Context } from "../../context";

const socket = io.connect("http://localhost:3001");

function AnotherChat() {
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [user] = useAuthState(auth);

  const joinRoom = () => {
    if (user !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div
      style={{
        marginLeft: "20px",
      }}
      className="App"
    >
      {!showChat ? (
        <div className="joinChatContainer">
          <Input
            w="20%"
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <br />
          <Button mt="20px" onClick={joinRoom}>
            Join A Room
          </Button>
        </div>
      ) : (
        <ChatContent
          socket={socket}
          username={user?.reloadUserInfo.screenName}
          room={room}
        />
      )}
    </div>
  );
}

export default AnotherChat;
