import { Heading, HStack, Box, Avatar, Button, Input, Flex } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../auth/firebase";
import UserProfile from "../UserProfile/UserProfile";

export default function SideBar() {
    const [user] = useAuthState(auth);
    return (
        <>
            <HStack h="100%" m="2em" maxW={16}>
                <UserProfile />
            </HStack>
        </>
    )
}