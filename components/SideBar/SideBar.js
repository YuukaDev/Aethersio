import { useState } from 'react';

import Image from 'next/image';
import Link from "next/link";

import {
    Flex,
    Popover,
    PopoverTrigger,
    PopoverBody,
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
    useToast,
} from '@chakra-ui/react'
import { AddIcon } from "@chakra-ui/icons";

import { auth } from '../../lib/firebase'
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth'
import { HiDotsHorizontal, HiQuestionMarkCircle } from "react-icons/hi";
import { BsFillGearFill, BsBoxArrowLeft, BsGithub, BsTwitter } from "react-icons/bs";

import DarkMode from '../DarkMode/DarkMode';
import ChatContent from '../ChatContent/ChatContent';

import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

import cloudImage from "../../images/cloud.png";

export default function Sidebar() {
    const [room, setRoom] = useState("");
    const [showRoom, setShowRoom] = useState(false);
    const { colorMode } = useColorMode();
    const [user] = useAuthState(auth);
    const toast = useToast();

    const joinRoom = () => {
        if (room !== "") {
            socket.emit("join_room", room);
            socket.emit("create_room", room);

            setShowRoom(true);
        } else {
            toast({
                title: "Room Is Required",
                description: "Please enter a room name to continue",
                status: "error",
                duration: "3000",
                isClosable: true,
            })
        }
    };

    return (
        <div
            style={{
                margin: "0 auto",
                padding: "35px",
                width: 500,
            }}>
            {showRoom ?
                <>
                    <ChatContent socket={socket} username={user?.reloadUserInfo.screenName} room={room} />
                </>
                :
                <Box
                    height="80vh"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDir="column"
                >
                    <Image src={cloudImage} />
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
                                        <PopoverContent _focus={{ border: "none" }} w="10rem" bg={colorMode === 'dark' ? "#18191c" : 'gray.200'}>
                                            <PopoverBody>
                                                <Flex flexDir="column" justifyContent="start" alignItems="start">
                                                    <Button gap="10px" variant="ghost">
                                                        <Icon variant="ghost" as={BsFillGearFill} />
                                                        <Text size="xs">Preferences</Text>
                                                    </Button>
                                                    <Button gap="10px" variant="ghost">
                                                        <Icon variant="ghost" as={HiQuestionMarkCircle} />
                                                        <Text size="xs">Help</Text>
                                                    </Button>
                                                    <Button gap="10px" variant="ghost" onClick={() => signOut(auth)}>
                                                        <Icon variant="ghost" as={BsBoxArrowLeft} />
                                                        <Text size="xs">Logout</Text>
                                                    </Button>
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
                                        <PopoverContent _focus={{ border: "none" }} w="10rem" bg={colorMode === 'dark' ? "#18191c" : 'gray.200'}>
                                            <PopoverBody>
                                                <Flex flexDir="column" justifyContent="flex-start" alignItems="flex-start">
                                                    <Link href="https://github.com/yuukadev">
                                                        <Button gap="10px" variant="ghost">
                                                            <Icon variant="ghost" as={BsGithub} />
                                                            <Text size="xs">Github</Text>
                                                        </Button>
                                                    </Link>
                                                    <Link href="https://twitter.com/yuukasuoh">
                                                        <Button gap="10px" variant="ghost">
                                                            <Icon variant="ghost" as={BsTwitter} />
                                                            <Text size="xs">Twitter</Text>
                                                        </Button>
                                                    </Link>
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
        </div >

    )
}
