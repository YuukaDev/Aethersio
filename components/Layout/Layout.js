import { useContext } from "react";
import { Divider, VStack } from "@chakra-ui/react";

import Room from "../Rooms/Room";
import UserProfile from "../UserProfile/UserProfile";
import { Context } from "../../context";

function Layout() {
  const {
    username,
    setUsername,
    secret,
    setSecret,
    user,
    setUser,
    base,
    setBase,
  } = useContext(Context);
  return (
    <VStack height="100vh" bg="black" width="20%" overflow="hidden">
      <Room />
      <Divider />
      <UserProfile
        username={user?.email}
        imageSrc={user?.photoURL}
      />
    </VStack>
  );
}

export default Layout;
