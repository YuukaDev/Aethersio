import { useContext } from "react";
import { useRouter } from "next/router";

import { Context } from "../../context";

import ChatContent from "../../components/Chat/ChatContent";
import io from "socket.io-client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../auth/firebase";

import { Container, Box, Button } from "@chakra-ui/react";

function RoomPage() {
  const [user] = useAuthState(auth);
  const socket = io.connect("http://localhost:3001");
  const { room } = useContext(Context);
  const router = useRouter();

  const goBack = () => {
    router.push("/room");
  };

  return (
    <Container>
      <Box
        mt="3em"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <ChatContent
          socket={socket}
          username={user?.reloadUserInfo.screenName}
          room={room}
        />
      </Box>
      <Button onClick={goBack}>Go Back?</Button>
    </Container>
  );
}

export default RoomPage;
