import React from "react";
import { Container, Box, Flex, Heading, Avatar } from "@chakra-ui/react";

function UserProfile({ username, imageSrc }) {
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
        <Heading size="lg">{username}</Heading>
        <Avatar src={imageSrc} />
      </Box>
    </Container>
  );
}

export default UserProfile;
