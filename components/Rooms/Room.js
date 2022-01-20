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
import useLocalStorage from "react-use-localstorage";
import { useEffect } from "react/cjs/react.production.min";
const socket = io.connect("http://localhost:3001");

function Room() {
  const [user] = useAuthState(auth);
  const [room, setRoom] = useState("");
  const [roomData, setRoomData] = useLocalStorage("room", room);
  const router = useRouter();
  const { handleLogout } = useContext(Context);

  const joinRoom = () => {
    if (user !== "" && room !== "") {
      socket.emit("join_room", room);
      router.push(`/room/${room}`);
      setRoomData(room);
      console.log(roomData);
    }
  };

  const createRoom = (e) => {
    return <Button>{e.target.value}</Button>;
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
        <Button mt="20px" onClick={createRoom}>
          Create Room
        </Button>
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
