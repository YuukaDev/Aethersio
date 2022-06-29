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
  PopoverHeader,
  Divider,
  Link,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";

import { ChatIcon } from "@chakra-ui/icons";
import moment from "moment";
import { Messages } from "../Messages/Messages";

function ChatContent({ socket, room }) {
  const [user] = useAuthState(auth);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const { colorMode } = useColorMode();

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

  return (
    <>
      <Box display="flex" flexDir="column" justifyContent="center" alignItems="center">
        <Box height="2xl" w={{ sm: "md", lg: "3xl" }} maxH={{ sm: "3xl", lg: "2xl" }} bg={colorMode === "dark" ? "#32353b" : "gray.400"} borderRadius="lg" overflowY="scroll">
          {messageList.map((messageContent, index) => {
            return (
              <div key={index}>
                <Messages {...messageContent} index={index} user={user} />
              </div>
            );
          })}
        </Box>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const inputValue = e.target.elements.inputValue.value;
            setCurrentMessage(inputValue);
          }}
        >
          <Flex flexDir="column" justifyContent="center" alignItems="center">
            <InputGroup size='lg' w="md" mt="50px">
              <Input
                border="none"
                _focus={{
                  border: "none"
                }}
                bg={colorMode === "dark" ? "#40444b" : "gray.400"}
                id="inputValue"
                type="text"
                value={currentMessage}
                color={colorMode === "dark" ? "white" : "black"}
                placeholder={`Message #${room}`}
                onChange={(e) => {
                  setCurrentMessage(e.target.value);
                }}
              />
              <InputRightElement>
                <Button w="full" h="full" variant="ghost" type="submit" onClick={sendMessage}>
                  <ChatIcon />
                </Button>
              </InputRightElement>
            </InputGroup>
            <Link mt="10px" textDecor="none" _hover={{ textDecoration: "none" }} _focus={{ textDecoration: "none" }} href="/">
              <Button variant="ghost" fontSize="lg" fontWeight="bold">
                Go Back
              </Button>
            </Link>
          </Flex>
        </form>
      </Box >
    </>
  );
}

export default ChatContent;