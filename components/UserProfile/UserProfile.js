import React from "react";

import { Box, Flex, Heading, Avatar, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../auth/firebase";



function UserProfile() {
  const [user] = useAuthState(auth);
  return (
    <>
      <Flex gap="20px">
        <Avatar src={user?.photoURL} />
        <Heading as="h3" variant="h3">Chats</Heading>
      </Flex>
      <IconButton icon={<AddIcon />} />
    </>
  );
}

export default UserProfile;
