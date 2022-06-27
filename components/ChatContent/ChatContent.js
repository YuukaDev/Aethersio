import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Input,
  Button,
  AvatarBadge,
  Avatar,
  Text,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverTrigger,
  PopoverBody,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  Heading,
  Divider,
  Link,
} from "@chakra-ui/react";
import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import { ChatIcon } from "@chakra-ui/icons";

function ChatContent({ socket, room }) {
  const [user] = useAuthState(auth);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [userData, setUserData] = useState([]);
  //const [show, setShow] = useState(false);

  /*
  const onEmojiClick = (emojiObject) => {
    setCurrentMessage(emojiObject.symbol)
  }
  */

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        displayName: user.displayName,
        image: user.photoURL,
        author: user?.reloadUserInfo.screenName,
        message: currentMessage,
        tag: Math.floor(1000 + Math.random() * 9000),
        time: moment().calendar()
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  console.log(user);

  return (
    <>
      <Box display="flex" flexDir="column" justifyContent="center" alignItems="center">
        <Box w="3xl" maxH="2xl" bg="#32353b" borderRadius="lg" overflowY="scroll">
          {messageList.map((messageContent, index) => {
            return (
              <Flex key={index} w="2xl" h="full" flexDirection="column" p="5">
                <Box>
                  <Flex py="10px" w="100%" justifyContent={user.reloadUserInfo.screenName === messageContent.author ? "start" : "end"}>
                    <Popover>
                      <PopoverTrigger>
                        <Avatar cursor="pointer" border="5px solid #18191c" size="lg" src={messageContent.image}>
                          <AvatarBadge border="5px solid #18191c" boxSize="1.2em" bg="green.500" />
                        </Avatar>
                      </PopoverTrigger>
                      <PopoverContent h="sm" _focus={{ border: "none" }} bg="#18191c" px={3}>
                        <PopoverHeader border="none" pt={5}>
                          <Avatar cursor="pointer" border="5px solid #18191c" size="lg" src={messageContent.image}>
                            <AvatarBadge border="5px solid #18191c" boxSize="1em" bg="green.500" />
                          </Avatar>
                        </PopoverHeader>
                        <PopoverBody>
                          <Text fontSize="lg" fontWeight="bold">
                            {messageContent.displayName}
                          </Text>
                          <Text fontSize="sm" color="#949598">
                            {messageContent.author}#{messageContent.tag}
                          </Text>
                          <Divider mt="15px" mb="15px" />
                          <Text color="#b9bbbe" fontWeight="bold" mt="10px" textTransform="uppercase">About Me</Text>
                          {/*
                          <Flex flexDir="column">
                            <Text fontSize="sm" mt="10px" color="#b6b7b9">
                              GitHub - <a href={userData.html_url}>Link</a>
                            </Text>
                            <Text fontSize="sm" mt="10px" color="#b6b7b9">
                              Website - <a href={userData.blog}>Link</a>
                            </Text>
                            <Text fontSize="sm" mt="10px" color="#b6b7b9">
                              Location - {userData.location}
                            </Text>
                          </Flex>
                          */}
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                    <Flex flexDirection="column" mx="5" justify="center">
                      <Flex alignItems="center" gap="10px">
                        <Text _hover={{
                          cursor: "pointer",
                          textDecoration: "underline",
                        }} fontSize="lg" fontWeight="bold">
                          {messageContent.author}
                        </Text>
                        {" | "}
                        <Text>
                          {messageContent.time}
                        </Text>
                      </Flex>
                      <Text>
                        {messageContent.message}
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              </Flex>
            );
          })}
        </Box>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const value = e.target.elements.inputValue.value;
            setCurrentMessage(value);
          }}
        >
          <Flex flexDir="column" justifyContent="center" alignItems="center">
            <InputGroup size='lg' w="md" mt="50px">
              <Input
                border="none"
                _focus={{
                  border: "none"
                }}
                bg="#40444b"
                id="inputValue"
                type="text"
                value={currentMessage}
                placeholder={`Message #${room}`}
                onChange={(e) => {
                  setCurrentMessage(e.target.value);
                }}
              />
              <InputRightElement>
                <Button variant="ghost" type="submit" onClick={sendMessage}>
                  <ChatIcon />
                </Button>
              </InputRightElement>
            </InputGroup>
            <Link mt="10px" textDecor="none" _focus={{ textDecoration: "none" }} href="/">
              <Text fontSize="lg" fontWeight="bold">
                Go Back
              </Text>
            </Link>
          </Flex>
        </form>
      </Box >
    </>
  );
}

export default ChatContent;