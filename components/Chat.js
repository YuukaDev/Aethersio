import { Box, Button, Flex, Text, Input } from "@chakra-ui/react";
import { useState } from "react";
import moment from "moment";

export default function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const sendMessage = async () => {
    try {
      if (currentMessage !== "") {
        const messageData = {
          room: room,
          author: username,
          message: currentMessage,
          time: moment().startOf("hour").fromNow(),
        };
        await socket.emit("send_message", messageData);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Box className="chat-header">
        <Text>Live Chat</Text>
      </Box>
      <Box className="chat-body"></Box>
      <Box className="chat-footer">
        <Flex gap="10px">
          <Input
            onChange={(e) => {
              setCurrentMessage(e.target.value);
            }}
            type="text"
            placeholder="Hey..."
          />
          <Button
            _hover={{
              backgroundColor: "darkcyan",
            }}
            _active={{
              backgroundColor: "darkcyan",
            }}
            bg="darkcyan"
            onClick={sendMessage}
          >
            &#9658;
          </Button>
        </Flex>
      </Box>
    </div>
  );
}
