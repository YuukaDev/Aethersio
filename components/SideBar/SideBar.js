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
    PopoverFooter,
    Icon,
    Avatar,
    Heading,
    Button,
    useColorMode,
    IconButton,
} from '@chakra-ui/react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../auth/firebase'
import { AddIcon } from "@chakra-ui/icons";
import DarkMode from '../DarkMode/DarkMode';
import { HiDotsHorizontal, HiQuestionMarkCircle } from "react-icons/hi";
import { BsFillGearFill, BsBoxArrowLeft } from "react-icons/bs";

export default function Sidebar() {
    const { colorMode } = useColorMode();
    const [user] = useAuthState(auth);
    return (
        <Flex
            pos="sticky"
            h="100vh"
            w="425px"
            borderRight={colorMode === 'dark' ? "1px solid white" : '1px solid black'}
            flexDir="column"
            justifyContent="space-between"
        >

            <Flex ml="20px" as="nav">
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
                                <PopoverContent w="10rem">
                                    <PopoverArrow />
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
                        </Popover>
                        <DarkMode />
                    </Flex>
                </Flex>
            </Flex >
        </Flex >
    )
}