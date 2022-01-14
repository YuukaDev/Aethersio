import React from "react";
import ChatContent from "../Chat/ChatContent";
import Room from "../Rooms/Room";

import io from "socket.io-client";
import { Heading } from "@chakra-ui/react";
const socket = io.connect("http://localhost:3001");

function Main() {
  return (
    <div>
      <Heading>Hello World</Heading>
      <ChatContent socket={socket} room={room} />
    </div>
  );
}

export default Main;
