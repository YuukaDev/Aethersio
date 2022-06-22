import {
  Flex,
  Input,
  IconButton,
  Divider,
  Avatar,
  Heading,
  Box,
  Button
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/router";
import { Context } from "../../context";
import ChatContent from "../ChatContent/ChatContent";

import io from "socket.io-client";
import UserProfile from '../UserProfile/UserProfile';
const socket = io.connect("http://localhost:3001");

function Room() {
  const [user] = useAuthState(auth);
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();
  const { handleLogout, setMessageList } = useContext(Context);

  const joinRoom = () => {
    if (user !== "" && room !== "") {
      socket.emit("join_room", room);
      socket.emit("create_room", room);
      setShowChat(true);

      router.push(`/room/${room}`);
    }
  };

  return (
    <Flex
      pos="sticky"
      left="5"
      h="95vh"
      marginTop="2.5vh"
      borderRadius="36px"
      width="400px"
      flexDir="column"
      backgroundColor="#efc050"
      justifyContent="space-between"
    >
      <Flex
        borderRadius="36px"
        backgroundColor="#efc050"
        p="5%"
        flexDir="column"
        w="100%"
        alignItems="flex-start"
        as="nav"
      >
        <Avatar />
      </Flex>
      <Input bg="black" type="text" />
      <Button onClick={joinRoom}>Join Room</Button>
      <Flex
        backgroundColor="#efc050"
        p="5%"
        flexDir="column"
        w="100%"
        alignItems="flex-start"
        borderRadius="36px"
      >
        <Button onClick={handleLogout}>Logout</Button>
        <Divider display="flex" />
        <Box ml="20%" mt="5%">
          <UserProfile />
        </Box>
      </Flex>
    </Flex>
  );
}

export default Room;
