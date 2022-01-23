import React from "react";
import { Container, Box, Heading, Avatar } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../auth/firebase";

function UserProfile() {
  const [user] = useAuthState(auth);
  return (
    <Container w="100%" bg="red">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="10px"
        mt="1em"
        mb="1em"
      >
        <Heading size="lg">{user?.reloadUserInfo.screenName}</Heading>
        <Avatar src={user?.photoURL} />
      </Box>
    </Container>
  );
}

export default UserProfile;
