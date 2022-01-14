import io from "socket.io-client";
import { useState } from "react";
import ChatContent from "../Chat/ChatContent";
import { Button, Divider, Input } from "@chakra-ui/react";

const socket = io.connect("http://localhost:3001");

function AnotherChat() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
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
          <h3>Join A Chat</h3>
          <Input
            w="20%"
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <br
            style={{
              marginTop: "30px",
            }}
          />
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
        <ChatContent socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default AnotherChat;
