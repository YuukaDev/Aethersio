import { useContext } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  GithubAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "../../auth/firebase";
import { Button, HStack } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { Context } from "../../context";
import { useRouter } from "next/router";

import { useAuthState } from "react-firebase-hooks/auth";

import io from "socket.io-client";
import Main from "../Main/Main";
const socket = io.connect("http://localhost:3001");

function Login() {
  const [currentUser] = useAuthState(auth);
  const { setSecret, user, setUser, base, setBase } = useContext(Context);
  const router = useRouter();

  



  const handleLogin = async () => {
    try {
      const user = await signInWithPopup(auth, new GithubAuthProvider());
      const url = await fetch(
        `https://api.github.com/users/${user._tokenResponse.screenName}`
      );
      const random = await url.json();

      console.log(random);
      console.log(user);

      setBase(random);
      setUser(currentUser);
      setSecret(user._tokenResponse.screenNam);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogout = async () => {
    if (currentUser) {
      await signOut(auth);
      console.log(`User is signed out ${user?.email}`);
    } else {
      console.log("User is not logged in");
    }
  };

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
