import { useContext } from "react";
import { auth } from "../../firebase/firebase";
import { Button, HStack, CircularProgress, Box } from "@chakra-ui/react";
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
      <Box height="95vh" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress size="10rem" isIndeterminate color='red' />
      </Box>
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
          padding="2%"
          gap="10px"
          color="#f67599"
          border="1px"
          borderColor="#f67599"
          variant="outline"
          fontSize="1.5em"
          cursor="pointer"
          _hover={{
            transform: "scale(1.1)",
            border: "1px solid #f67599",
            boxShadow: "10px 10px #f67599"
          }}
          _active={{
            transform: "scale(1.1)",
            border: "1px solid #f67599",
            boxShadow: "10px 10px #f67599"
          }}
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
