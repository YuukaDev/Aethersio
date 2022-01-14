import Login from "../components/Login/Login";
import Main from "../components/Main/Main";

export default function Home() {
  //const [room, setRoom] = useState("");
  const showChat = false;

  return <div>{!showChat ? <Login /> : <Main />}</div>;
}

/*
  const handleLogout = async () => {
    if (user) {
      await signOut(auth);
      console.log(`User is signed out ${user.email}`);
    } else {
      console.log("user is not logged in");
    }
  };
*/

/*
{!showChat ? (
        <Stack spacing={3}>
          <Heading>Join a Chat</Heading>
          <Input
            size="md"
            width="xs"
            variant="outline"
            type="text"
            placeholder="Name..."
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Input
            type="text"
            size="md"
            variant="outline"
            width="xs"
            placeholder="Room ID..."
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          <Button
            _hover={{
              backgroundColor: "darkcyan",
            }}
            _active={{
              backgroundColor: "darkcyan",
            }}
            bg="darkcyan"
            maxWidth="25%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            onClick={joinRoom}
          >
            Join A Room
          </Button>
        </Stack>
      ) : (
        <ChatContent socket={socket} username={username} room={room} />
      )}
      */
