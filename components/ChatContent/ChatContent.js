import { useEffect, useContext } from "react";
import { Context } from "../../context";
import {
  Box,
  Flex,
  Input,
  Button,
  Heading,
  Avatar,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../auth/firebase";
import { ChatIcon } from "@chakra-ui/icons";

function ChatContent({ socket, username, room }) {
  const [user] = useAuthState(auth);
  const {
    userDataCred,
    currentMessage,
    setCurrentMessage,
    messageList,
    setMessageList,
  } = useContext(Context);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: moment().format("MMM Do YY"),
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
      <Box>
        {messageList.map((messageContent, index) => {
          return (
            <Box mt="25px" key={index}>
              <Box
                gap="10px"
                display="flex"
                justifyContent="center"
                alignContent="center"
              >
                <Avatar src={user.photoURL} />
                <Heading fontSize="1.5em">{messageContent.author}</Heading>
                <Text fontSize="1.3em"> | </Text>
                <Text fontSize="1.3em" as="samp">
                  {messageContent.time}
                </Text>
              </Box>
              <Box>
                <Flex justifyContent="left" alignItems="center" ml="60px">
                  <Text textAlign="left" mt="-20px" fontSize="1.5em">
                    {messageContent.message}
                  </Text>
                </Flex>
              </Box>
            </Box>
          );
        })}
        <br />
        <Box width="100%" margin="0 auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const value = e.target.elements.inputValue.value;
              setCurrentMessage(value);
            }}
          >
            <Flex gap="10px">
              <Input
                id="inputValue"
                type="text"
                value={currentMessage}
                placeholder="Hey..."
                onChange={(e) => {
                  setCurrentMessage(e.target.value);
                }}
              />
              <Button type="submit" onClick={sendMessage}>
                <ChatIcon />
              </Button>
            </Flex>
          </form>
        </Box>
      </Box>
    </>
  );
}

export default ChatContent;
