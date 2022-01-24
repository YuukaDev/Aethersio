import React from "react";
import { Container, Box, Heading, Avatar } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../auth/firebase";

function UserProfile() {
  const [user] = useAuthState(auth);
  return (
    <Box
      width="50px"
      backgroundColor="#efc050"
      display="flex"
      gap="10px"
    >
      <Heading bg="#efc050" color="#000">{user?.reloadUserInfo.screenName}</Heading>
      <Avatar src={user?.photoURL} />
    </Box>
  );
}

export default UserProfile;
