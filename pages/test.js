import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import useShop from "../utils/StoreContext";

export default function Test() {
    const { user } = useShop();

    console.log(user);
    return (
        <h1>Hello World</h1>
    )
}