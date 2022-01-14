import React from "react";
import ChatContent from "../Chat/ChatContent";
import Layout from "../Layout/Layout";
import io from "socket.io-client";
import { Heading } from "@chakra-ui/react";
const socket = io.connect("http://localhost:3001");

function Main({ username, imageSrc }) {
  return (
    <div>
      <Layout username={username} imageSrc={imageSrc} />
    </div>
  );
}

export default Main;
