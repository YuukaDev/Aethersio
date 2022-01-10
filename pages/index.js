import { Heading, Button, Container, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";
import ChatContent from "../components/ChatContent";

import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

export default function Home() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = async () => {
    try {
      if (username !== "" && room !== "") {
        socket.emit("join_room", room);
        setShowChat(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      {!showChat ? (
        <Stack spacing={3}>
          <Heading>Join a Chat</Heading>
          <Input
            size="md"
            width="xs"
            variant="outline"
            type="text"
            placeholder="Name..."
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Input
            type="text"
            size="md"
            variant="outline"
            width="xs"
            placeholder="Room ID..."
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          <Button
            _hover={{
              backgroundColor: "darkcyan",
            }}
            _active={{
              backgroundColor: "darkcyan",
            }}
            bg="darkcyan"
            maxWidth="25%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            onClick={joinRoom}
          >
            Join A Room
          </Button>
        </Stack>
      ) : (
        <ChatContent socket={socket} username={username} room={room} />
      )}
    </Container>
  );
}
