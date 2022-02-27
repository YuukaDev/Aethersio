import {
    Flex,
    Popover,
    PopoverTrigger,
    PopoverBody,
    PopoverArrow,
    PopoverHeader,
    PopoverContent,
    PopoverCloseButton,
    Portal,
    PopoverFooter,
    Icon,
    Avatar,
    Heading,
    Button,
    useColorMode,
} from '@chakra-ui/react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../auth/firebase'
import { AddIcon } from "@chakra-ui/icons";
import DarkMode from '../DarkMode/DarkMode';
import { HiDotsHorizontal } from "react-icons/hi";

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
                            <PopoverTrigger>
                                <Button
                                    fontSize="1em"
                                    variant="ghost"
                                    size="md">
                                    <Icon bg="none" cursor="pointer" as={AddIcon} />
                                </Button>
                            </PopoverTrigger>
                            <DarkMode />
                            <Portal>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverHeader>Header</PopoverHeader>
                                    <PopoverCloseButton />
                                    <PopoverBody>
                                        <Button colorScheme='blue'>Button</Button>
                                    </PopoverBody>
                                    <PopoverFooter>This is the footer</PopoverFooter>
                                </PopoverContent>
                            </Portal>
                        </Popover>
                    </Flex>
                </Flex>
            </Flex>
        </Flex >
    )
}