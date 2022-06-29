import { Flex, Box, Popover, PopoverContent, PopoverTrigger, PopoverHeader, PopoverBody, Avatar, AvatarBadge, Text, Divider, Tooltip, useColorMode } from "@chakra-ui/react"

export const Messages = ({ author, image, displayName, tag, time, message, user }) => {
    const { colorMode } = useColorMode();
    return (
        <Flex w="2xl" flexDirection="column" p="3.5" px="6">
            <Box>
                <Flex py="10px" w="100%" justifyContent={{ sm: "start", lg: user.reloadUserInfo.screenName === author ? "start" : "end" }}>
                    <Popover>
                        <PopoverTrigger>
                            <Avatar cursor="pointer" border="5px solid #18191c" size="lg" src={image}>
                                <AvatarBadge border="5px solid #18191c" boxSize="1.2em" bg="green.500" />
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent h="sm" _focus={{ border: "none" }} bg={colorMode === "dark" ? "#18191c" : "gray.600"} px={3}>
                            <PopoverHeader border="none" pt={5}>
                                <Avatar cursor="pointer" border="5px solid #18191c" size="lg" src={image}>
                                    <Tooltip placement="top" hasArrow color="#cfd0d1" bg="#18191c" label="Online">
                                        <AvatarBadge border="5px solid #18191c" boxSize="1em" bg="green.500" />
                                    </Tooltip>
                                </Avatar>
                            </PopoverHeader>
                            <PopoverBody>
                                <Text fontSize="lg" fontWeight="bold">
                                    {displayName || "None"}
                                </Text>
                                <Text fontSize="sm" color="#949598">
                                    {author}#{tag}
                                </Text>
                                <Divider mt="15px" mb="15px" />
                                <Text color={!colorMode === "dark" ? "white" : "#b9bbbe"} fontWeight="bold" mt="10px" textTransform="uppercase">About Me</Text>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                    <Flex flexDirection="column" mx="5" justify="center">
                        <Flex alignItems="center" gap="10px">
                            <Text fontSize="lg" fontWeight="bold">
                                {author}
                            </Text>
                            {" | "}
                            <Text>
                                {time}
                            </Text>
                        </Flex>
                        <Text>
                            {message}
                        </Text>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    )
}
