import React from "react";
import { Divider, VStack } from "@chakra-ui/react";

import Room from "../Rooms/Room";
import UserProfile from "../UserProfile/UserProfile";

function Layout({ username, imageSrc }) {
  return (
    <VStack height="100vh" bg="black" width="20%" overflow="hidden">
      <Room />
      <Divider />
      <UserProfile username={username} imageSrc={imageSrc} />
    </VStack>
  );
}

export default Layout;
