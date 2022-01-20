import {
  Container,
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Input,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../auth/firebase";
import { useRouter } from "next/router";
import { Context } from "../../context";

import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

function Room() {
  const [user] = useAuthState(auth);
  const [room, setRoom] = useState("");
  const router = useRouter();
  const { handleLogout, setMessageList } = useContext(Context);

  const joinRoom = () => {
    if (user !== "" && room !== "") {
      socket.emit("join_room", room);
      router.push(`/room/${room}`);
    }
  };

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
        <Input
          onChange={(e) => {
            setRoom(e.target.value);
          }}
          type="text"
          placeholder="Name of the room..."
        />
      </Box>
      <br />
      <Box>
        <Button bg="blue.300" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Box>
  );
}

export default Room;
