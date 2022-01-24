import { useContext, useState } from "react";
import { Context } from "../../context";
import io from "socket.io-client";

import { Text, Box } from "@chakra-ui/react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../auth/firebase";

import TypeAnimation from "react-type-animation";

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
    <>
      <Box margin="25px">
        <Text className="typer" color="red">
          {`Welcome to [ < Aethersio@: ~$ /> ]`}
        </Text>
        <Text className="typer-2" color="red">
          {`You are currently authenticated as a ${user?.reloadUserInfo.screenName}@: ~$`}
        </Text>
      </Box>
    </>
  )

}

export default AnotherChat;
