import { useState } from 'react';
import {
    Flex,
    Popover,
    PopoverTrigger,
    PopoverBody,
    PopoverArrow,
    Text,
    PopoverContent,
    Box,
    Portal,
    Icon,
    Avatar,
    Heading,
    Button,
    useColorMode,
    Input,
} from '@chakra-ui/react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../lib/firebase'
import { AddIcon } from "@chakra-ui/icons";
import DarkMode from '../DarkMode/DarkMode';
import { HiDotsHorizontal, HiQuestionMarkCircle } from "react-icons/hi";
import { BsFillGearFill, BsBoxArrowLeft, BsFillPeopleFill } from "react-icons/bs";
import { useRouter } from 'next/router';
import io from "socket.io-client";
import ChatContent from '../ChatContent/ChatContent';
const socket = io.connect("http://localhost:3001");

export default function Sidebar() {
    const [room, setRoom] = useState("");
    const [showRoom, setShowRoom] = useState(false);
    const { colorMode } = useColorMode();
    const [user] = useAuthState(auth);
    const router = useRouter()

    const joinRoom = () => {
        if (user !== "" && room !== "") {
            socket.emit("join_room", room);
            socket.emit("create_room", room);

            setShowRoom(true);
        }
    };

    return (
        <div
            style={{
                margin: "0 auto",
                padding: "35px",
                width: 500,
            }}>
            {showRoom ? <ChatContent socket={socket} username={user?.reloadUserInfo.screenName} room={room} /> :
                <Box
                    height="90vh"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDir="column"
                >
                    <Flex as="nav">
                        <Flex gap="10px" mt={5} alignItems="center">
                            <Avatar src={user?.photoURL} />
                            <Flex flexDir="column" >
                                <Heading as="h2" fontSize="1.7rem">{user?.reloadUserInfo.screenName}</Heading>
                            </Flex>
                            <Flex flexDir="row" ml="1.5rem" gap="10px" background="none">
                                <Popover>
                                    <PopoverTrigger>
                                        <Button
                                            fontSize="1em"
                                            variant="ghost"
                                            size="md"
                                        >
                                            <Icon bg="none" cursor="pointer" as={HiDotsHorizontal} />
                                        </Button>
                                    </PopoverTrigger>
                                    <Portal>
                                        <PopoverContent w="10rem" bg={colorMode === 'dark' ? "gray.800" : 'gray.200'}>
                                            <PopoverArrow bg={colorMode === 'dark' ? "gray.800" : 'gray.200'} />
                                            <PopoverBody>
                                                <Flex ml="-15px" flexDir="column">
                                                    <Flex width="200px" float="left">
                                                        <Button gap="10px" variant="ghost">
                                                            <Icon variant="ghost" as={BsFillGearFill} />
                                                            <Text size="xs">Preferences</Text>
                                                        </Button>
                                                    </Flex>
                                                    <Flex width="200px" float="left">
                                                        <Button gap="10px" variant="ghost">
                                                            <Icon variant="ghost" as={HiQuestionMarkCircle} />
                                                            <Text size="xs">Help</Text>
                                                        </Button>
                                                    </Flex>
                                                    <Flex width="200px" float="left">
                                                        <Button gap="10px" variant="ghost">
                                                            <Icon variant="ghost" as={BsBoxArrowLeft} />
                                                            <Text size="xs">Logout</Text>
                                                        </Button>
                                                    </Flex>
                                                </Flex>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Portal>
                                </Popover>
                                <Popover>
                                    <PopoverTrigger>
                                        <Button
                                            fontSize="1em"
                                            variant="ghost"
                                            size="md">
                                            <Icon bg="none" cursor="pointer" as={AddIcon} />
                                        </Button>
                                    </PopoverTrigger>
                                    <Portal>
                                        <PopoverContent w="10rem" bg={colorMode === 'dark' ? "gray.800" : 'gray.200'}>
                                            <PopoverArrow />
                                            <PopoverBody>
                                                <Flex ml="-15px" flexDir="column">
                                                    <Flex width="200px" float="left">
                                                        <Button gap="10px" variant="ghost">
                                                            <Icon variant="ghost" as={BsFillPeopleFill} />
                                                            <Text size="xs">Public</Text>
                                                        </Button>
                                                    </Flex>
                                                </Flex>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Portal>
                                </Popover>
                                <DarkMode />
                            </Flex>
                        </Flex>
                    </Flex >
                    <br />
                    <Box display="flex" gap="10px" justifyContent="space-between" alignItems="center">
                        <Input onChange={(e) => setRoom(e.target.value)} w="full" placeholder="Enter name of the chat..." />
                        <Button onClick={joinRoom}>Submit</Button>
                    </Box>
                </Box>
            }
        </div>

    )
}