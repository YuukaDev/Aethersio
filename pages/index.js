import { Heading, Button, Container, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";
import Chat from "../components/Chat";

import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

export default function Home() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = async () => {
    try {
      if (username !== "" && room !== "") {
        socket.emit("join_room", room);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
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
        <Chat socket={socket} username={username} room={room} />
      </Stack>
    </Container>
  );
}
