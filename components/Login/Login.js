import { useContext } from "react";

import { Button, HStack } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { Context } from "../../context";
import { useRouter } from "next/router";

import { useAuthState } from "react-firebase-hooks/auth";

function Login() {
  //const [currentUser] = useAuthState(auth);
  const { handleLogin, handleLogout, user } = useContext(Context);
  const router = useRouter();

  return (
    <>
      <HStack
        flexDirection="column"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button
          display="flex"
          padding="2%"
          gap="10px"
          colorScheme="purple"
          variant="outline"
          fontSize="1.5em"
          className="learn-more"
          position="relative"
          cursor="pointer"
          onClick={() => {
            if (user) {
              console.log("u are already logged in");
            } else {
              handleLogin();
              router.push("/chat");
            }
          }}
        >
          Login With GitHub <FaGithub />
        </Button>
        <Button
          onClick={handleLogout}
          style={{
            marginTop: "20px",
          }}
        >
          Logout
        </Button>
      </HStack>
    </>
  );
}

export default Login;

//<ChatContent username={username} socket={socket} />
