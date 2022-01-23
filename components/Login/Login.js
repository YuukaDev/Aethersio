import { useContext } from "react";
import { auth } from "../../auth/firebase";
import { Button, HStack } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { Context } from "../../context";
import { useRouter } from "next/router";

import { useAuthState } from "react-firebase-hooks/auth";

function Login() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const { handleLogin } = useContext(Context);

  if (loading) {
    return (
      <div className="loading">
        <div className="loader"></div>
      </div>
    );
  }

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
              router.push("/room");
            }
          }}
        >
          Login With GitHub <FaGithub />
        </Button>
      </HStack>
    </>
  );
}

export default Login;
