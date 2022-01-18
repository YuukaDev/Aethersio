import { useContext, useEffect } from "react";
import {
  signInWithPopup,
  GithubAuthProvider,
  onAuthStateChanged,
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
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const { userCred, setUserCred } = useContext(Context);

  const handleLogin = async () => {
    try {
      const userData = await signInWithPopup(auth, new GithubAuthProvider());
      console.log(user._tokenResponse.screenName);

      setUserCred(userData);
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogout = async () => {
    if (user) {
      await signOut(auth);
      console.log(`User is signed out ${user?.email}`);
    } else {
      console.log("User is not logged in");
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loader"></div>;
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
