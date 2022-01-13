import { useState } from "react";

import Login from "../components/Login/Login";
import ChatContent from "../components/Chat/ChatContent";

import io from "socket.io-client";
import Chat from "./chat";
const socket = io.connect("http://localhost:3001");

export default function Home() {
  //const [room, setRoom] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const joinRoom = () => {
    if (username !== "") {
      console.log("showing chat");
      setIsLoggedIn(true);
      setUsername(username);
    }
  };

  return (
    <>
      {username ? (
        <ChatContent socket={socket} username={username} room={room} />
      ) : (
        <Login username={username} />
      )}
    </>
  );
}

/*
  const handleLogout = async () => {
    if (user) {
      await signOut(auth);
      console.log(`User is signed out ${user.email}`);
    } else {
      console.log("user is not logged in");
    }
  };
*/

/*
{!showChat ? (
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
        </Stack>
      ) : (
        <ChatContent socket={socket} username={username} room={room} />
      )}
      */
