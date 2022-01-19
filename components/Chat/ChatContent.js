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
import Login from "../Login/Login";

function ChatContent({ socket, username, room }) {
  const [user] = useAuthState(auth);
  const { currentMessage, setCurrentMessage, messageList, setMessageList } =
    useContext(Context);

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
    <Box className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        {messageList.map((messageContent, index) => {
          return (
            <Box>
              <Flex gap="10px">
                <Avatar src={user?.photoURL} />
                <Heading>{messageContent.author}</Heading>
              </Flex>
              <Text fontSize="1.5em">{messageContent.message}</Text>
              <Text fontSize="md" as="samp">
                {messageContent.time}
              </Text>
            </Box>
          );
        })}
      </div>
      <Box className="chat-footer">
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
              &#9658;
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}

export default ChatContent;
