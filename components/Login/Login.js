import { useState, useEffect } from "react";
import {
  signInWithPopup,
  GithubAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../auth/firebase";
import { Button, HStack, Input } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import ChatContent from "../Chat/ChatContent";

import io from "socket.io-client";
import Main from "../Main/Main";
const socket = io.connect("http://localhost:3001");

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [data, setData] = useState({});
  const [user, setUser] = useState({});
  onAuthStateChanged(auth, async (currentUser) => {
    setUser(currentUser);
    setUsername(currentUser?.email);
  });

  const getUsersData = async (query) => {
    try {
      const url = await fetch(`https://api.github.com/user/${query}`);
      const random = await url.json();
      console.log(random);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = async () => {
    try {
      const user = await signInWithPopup(auth, new GithubAuthProvider());
      console.log(user);
      if (user) {
        console.log("Already logged in");
        setIsLoggedIn(true);
      } else {
        setUser(user);
      }
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
      {user ? (
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
          <Input
            onChange={(e) => {
              e.preventDefault();
              setData(e.target.value);
            }}
          />
        </HStack>
      ) : (
        <Main username={user?.additionalUserInfo} />
      )}
    </>
  );
}

export default Login;

//<ChatContent username={username} socket={socket} />
