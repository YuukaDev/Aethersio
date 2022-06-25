import { useRouter } from "next/router";

import ChatContent from "../../components/ChatContent/ChatContent";
import io from "socket.io-client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";

import { Container, Box, Button } from "@chakra-ui/react";

function RoomPage() {
  const [user] = useAuthState(auth);
  const socket = io.connect("http://localhost:3001");
  const router = useRouter();
  let { room } = router.query;
  const goBack = () => {
    router.push("/room");
  }

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
