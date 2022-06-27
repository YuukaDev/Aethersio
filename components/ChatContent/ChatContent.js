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
} from "@chakra-ui/react";
import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import { ChatIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';

function ChatContent({ socket, room }) {
  const [user] = useAuthState(auth);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [show, setShow] = useState(false);

  const onEmojiClick = (emojiObject) => {
    setCurrentMessage(emojiObject.symbol)
  }

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        image: user.photoURL,
        author: user?.reloadUserInfo.screenName,
        message: currentMessage,
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
        {messageList.map((messageContent, index) => {
          return (
            <Flex w="2xl" h="full" flexDirection="column" p="3">
              <Box key={index}>
                <Flex py="10px" w="100%" justifyContent={user.reloadUserInfo.screenName === messageContent.author ? "start" : "end"}>
                  <Avatar size="lg" name="Dan Abrahmov" src={messageContent.image}>
                    <AvatarBadge boxSize="1.25em" bg="green.500" />
                  </Avatar>
                  <Flex flexDirection="column" mx="5" justify="center">
                    <Flex alignItems="center" gap="10px">
                      <Text fontSize="lg" fontWeight="bold">
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const value = e.target.elements.inputValue.value;
            setCurrentMessage(value);
          }}
        >
          <Flex justifyContent="center" alignItems="center">
            <InputGroup size='lg' w="md" mt="50px">
              <Input
                id="inputValue"
                type="text"
                value={currentMessage}
                placeholder="Hey..."
                onChange={(e) => {
                  setCurrentMessage(e.target.value);
                }}
              />
              <InputRightElement>
                <Button variant="ghost" type="submit" onClick={sendMessage}>
                  <ChatIcon />
                </Button>
                <Button variant="ghost" type="submit" onClick={sendMessage}>
                  {show ? (
                    <div onMouseLeave={() => setShow(false)}>
                      <Picker
                        onEmojiClick={onEmojiClick}
                        disableAutoFocus={true}
                        skinTone={SKIN_TONE_MEDIUM_DARK}
                        groupNames={{ smileys_people: 'PEOPLE' }}
                        native
                      />
                    </div>
                  ) : (
                    <ExternalLinkIcon />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Flex>
        </form>
      </Box>
    </>
  );
}

export default ChatContent;