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
    Input,
    Grid,
    HStack,
    Container,
} from '@chakra-ui/react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../auth/firebase'
import { AddIcon } from "@chakra-ui/icons";
import DarkMode from '../DarkMode/DarkMode';
import { HiDotsHorizontal, HiQuestionMarkCircle } from "react-icons/hi";
import { BsFillGearFill, BsBoxArrowLeft, BsFillPeopleFill } from "react-icons/bs";
import RoomList from '../RoomList/RoomList';

export default function Sidebar() {
    const { colorMode } = useColorMode();
    const [user] = useAuthState(auth);
    return (
        <Box
            h="100vh"
            w="425px"
            borderRight={colorMode === 'dark' ? "1px solid white" : '1px solid black'}
            flexDir="column"
        >
            <Flex m="0 auto" w="90%" as="nav">
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
            <Box display="flex" justifyContent="center" alignItems="center">
                <Input borderRadius="16px" placeholder="Search chat..." w="85%" />
            </Box>
            <Flex gap="20px" flexDir="column" w="-20%" float="left" ml="35px" mt="50px">
                <Button height="70px" variant="ghost">
                    <RoomList />
                </Button>
                <Button height="70px" variant="ghost">
                    <RoomList />
                </Button>
            </Flex>
        </Box >
    )
}