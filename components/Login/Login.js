import { Button, HStack, CircularProgress, Box } from "@chakra-ui/react";

import db, { auth } from "../../lib/firebase";
import { addDoc, collection } from "firebase/firestore";

import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { FaGithub } from "react-icons/fa";
import Spinner from "../Spinner/Spinner";

function Login() {
  const [user, loading] = useAuthState(auth);

  const registerUser = async () => {
    try {
      const res = await signInWithPopup(auth, new GithubAuthProvider());
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        username: user.reloadUserInfo.screenName,
        authProvider: "local",
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <Spinner />
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
            registerUser();
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

