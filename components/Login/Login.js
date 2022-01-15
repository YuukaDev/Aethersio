import { useState, useEffect } from "react";
import {
  signInWithPopup,
  GithubAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../auth/firebase";
import { Button, HStack } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/router";

import io from "socket.io-client";
import Main from "../Main/Main";
const socket = io.connect("http://localhost:3001");

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [base, setBase] = useState({});
  const [user, setUser] = useState(null);
  const router = useRouter();
  onAuthStateChanged(auth, async (currentUser) => {
    setUser(currentUser);
    setIsLoggedIn(true);
  });

  const handleLogin = async (username) => {
    try {
      const user = await signInWithPopup(auth, new GithubAuthProvider());
      const url = await fetch(
        `https://api.github.com/users/${user._tokenResponse.screenName}`
      );
      const random = await url.json();

      console.log(random);
      console.log(user);

      setBase(random);
      setUsername(random.login);
      setUser(user);
      router.push("/chat");
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

  useEffect(() => {});

  return (
    <>
      {!user ? (
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
      ) : (
        <Main username={10} imageSrc={base.avatar_url} />
      )}
    </>
  );
}

export default Login;

//<ChatContent username={username} socket={socket} />
