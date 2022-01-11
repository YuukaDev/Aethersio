import React from "react";
import { auth, provider } from "../auth/firebase";

function Login() {
  const handleLogin = () => {
    auth.signInWithPopup(provider);
  };
  const handleLogout = () => {
    auth.signOut();
  };
  return (
    <div>
      <button onClick={handleLogin}>Sign In With GitHub</button>
      <button onClick={handleLogout}>Sign Out</button>
    </div>
  );
}

export default Login;
