import React from "react";
import { Container, Box, Flex, Heading, Avatar } from "@chakra-ui/react";

function UserProfile({ username, imageSrc }) {
  return (
    <Container w="100%" h="100%" bg="red">
      <Box>
        <Flex mt="1em" gap="10px" justifyContent="center" alignItems="center">
          <Heading size="lg">{username}</Heading>
          <Avatar src={imageSrc} />
        </Flex>
      </Box>
    </Container>
  );
}

export default UserProfile;
