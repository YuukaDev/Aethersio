import React from "react";

import { Box, Flex, Heading, Avatar, Icon, Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";



function UserProfile() {
  const [user] = useAuthState(auth);
  return (
    <Box justifyContent="center" alignItems="center" display="flex" gap="8rem" mt="20px">
      <Flex gap="20px">
        <Avatar src={user?.photoURL} />
        <Heading as="h3" variant="h3">Chats</Heading>
      </Flex>
      <Button>
        <Icon as={AddIcon} />
      </Button>
    </Box>
  );
}

export default UserProfile;

