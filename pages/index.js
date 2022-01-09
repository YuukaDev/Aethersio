import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

export default function Home() {
  return (
    <>
      <h1>Hello World</h1>
    </>
  );
}
