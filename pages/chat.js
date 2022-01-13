import ChatContent from "../components/Chat/ChatContent";
import io from "socket.io-client";

export default function Chat() {
  const socket = io.connect("http://localhost:3001");
  const username = "Mario";
  const room = "Anime Fans"
  return (
    <>
      <ChatContent socket={socket} username={username} room={room} />
    </>
  );
}
