import { useContext } from "react";
import { Divider, VStack } from "@chakra-ui/react";

import Room from "../Rooms/Room";
import UserProfile from "../UserProfile/UserProfile";
import { Context } from "../../context";

function Layout() {
  return (
    <VStack
      className="room-wrapper"
      height="100vh"
      bg="black"
      width="20%"
      overflow="hidden"
    >
      <Room />
      <UserProfile />
    </VStack>
  );
}

export default Layout;
