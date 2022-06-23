import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "../components/Login/Login";
import { auth } from "../lib/firebase";

export default function LoginPage() {
    const router = useRouter();
    const [user] = useAuthState(auth);

    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user])

    return (
        <div>
            <Login />
        </div>
    )
}
