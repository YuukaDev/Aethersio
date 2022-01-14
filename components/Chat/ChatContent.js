import { useEffect, useState } from "react";
import { Box, Flex, Input, Button } from "@chakra-ui/react";
import moment from "moment";

function ChatContent({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: moment().startOf("hour").fromNow(),
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
            <div
              key={index}
              className="message"
              id={username === messageContent.author ? "you" : "other"}
            >
              <div>
                <div className="message-content">
                  <p>{messageContent.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                  <p id="author">{messageContent.author}</p>
                </div>
              </div>
            </div>
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
