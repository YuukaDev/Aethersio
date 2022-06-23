import { Button, HStack, CircularProgress, Box } from "@chakra-ui/react";
import { auth } from "../../lib/firebase";
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { FaGithub } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "../../utils/StoreContext";
import { useRouter } from "next/router";

function Login() {
  const router = useRouter();
  const { setUser } = useDispatch();
  const [user, loading] = useAuthState(auth);

  const handleLogin = async () => {
    try {
      const userData = await signInWithPopup(auth, new GithubAuthProvider());
      setUser(userData);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <Box height="95vh" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress size="10rem" isIndeterminate color='blue' />
      </Box>
    );
  }

  return (
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
          }
        }}
      >
        Login With GitHub
        <FaGithub />
      </Button>
    </HStack>
  );
}

export default Login;
