import { useState } from "react";
import {
  signInWithPopup,
  GithubAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../auth/firebase";

function Login() {
  const [user, setUser] = useState({});

  const handleLogin = async () => {
    try {
      const user = await signInWithPopup(auth, new GithubAuthProvider());
      console.log(user);
      setUser(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="App">
      <h3> GitHub Login </h3>

      <button onClick={handleLogin}>Login With GitHub</button>

      <h4> User Logged In: {user.email}</h4>

      <button onClick={handleLogout}> Sign Out </button>
    </div>
  );
}

export default Login;
