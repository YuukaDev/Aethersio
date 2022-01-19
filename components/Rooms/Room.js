import {
  Container,
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Input,
} from "@chakra-ui/react";
import { useContext, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../auth/firebase";

import { useRouter } from "next/router";
import ChatContent from "../Chat/ChatContent";

import io from "socket.io-client";
import { Context } from "../../context";
const socket = io.connect("http://localhost:3001");

function Room() {
  const [user] = useAuthState(auth);
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();
  const { handleLogout } = useContext(Context);

  const joinRoom = () => {
    if (user !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
      router.push(`/room/${room}`);
    }
  };

  const createRoom = () => {};

  return (
    <Box height="100%">
      <br />
      <Box>
        <Input
          type="text"
          placeholder="Room ID..."
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />
        <Button mt="20px" onClick={joinRoom}>
          Join A Room
        </Button>
      </Box>
      <br />
      <Box>
        <Input type="text" placeholder="Name of the room..." />
        <Button mt="20px" onClick={joinRoom}>
          Create Room
        </Button>
      </Box>
    </Box>
  );
}

export default Room;
