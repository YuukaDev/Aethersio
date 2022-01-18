import {
  Container,
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";

import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function Room() {
  const [room, setRoom] = useState("");
  const router = useRouter();
  const joinRoom = () => {
    console.log(room);
    socket.emit("join_room", room);
  };
  return (
    <Container>
      <Box alignItems="center" justifyContent="center" display="flex" mt="15px">
        <Flex
          width="50%"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap="2em"
        >
          <Input
            type="text"
            placeholder="ROOM ID..."
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          <Button
            onClick={() => {
              router.push("/chat");
            }}
          >
            Join This Room
          </Button>
          <Button
            onClick={() => {
              router.push("/chat");
            }}
          >
            Join This Room
          </Button>
          <Button
            onClick={() => {
              router.push("/chat");
            }}
          >
            Join This Room
          </Button>
          <Button
            onClick={() => {
              router.push("/chat");
            }}
          >
            Join This Room
          </Button>
          <Button
            onClick={() => {
              router.push("/chat");
            }}
          >
            Join This Room
          </Button>
        </Flex>
      </Box>
    </Container>
  );
}

export default Room;

const Content = () => {
  return (
    <>
      <HStack width="full" flex="1" overflow="hidden"></HStack>
    </>
  );
};
