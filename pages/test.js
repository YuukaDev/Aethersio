import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import useProvider from "../utils/StoreContext"

export default function Test() {
    const [user] = useAuthState(auth);
    
    console.log(user);
    return (
        <h1>Hello World</h1>
    )
}