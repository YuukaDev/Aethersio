import { useContext } from "react";
import { Divider, Stack, VStack } from "@chakra-ui/react";

import Room from "../Rooms/Room";
import UserProfile from "../UserProfile/UserProfile";
import { Context } from "../../context";

function Layout() {
  return (
    <Stack ml="20%">
      <Room />
    </Stack>
  );
}

export default Layout;
