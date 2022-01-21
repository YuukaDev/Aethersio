import {
  Container,
  Box,
  Flex,
  Button,
  Input,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../auth/firebase";
import { useRouter } from "next/router";
import { Context } from "../../context";
import ChatContent from "../Chat/ChatContent";

import io from "socket.io-client";
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
      setShowChat(true);
    }
  };

  return (
    <>
      {!showChat ? (
        <Box height="100%">
          <Box>
            <Input
              mt="30px"
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
          <Button bg="blue.300" mt="20px" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      ) : (
        <ChatContent
          socket={socket}
          username={user?.reloadUserInfo.screenName}
          room={room}
        />
      )}
    </>
  );
}

export default Room;
