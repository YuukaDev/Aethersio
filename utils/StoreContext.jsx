import { createContext, useReducer, useContext, useEffect } from "react";
import shopReducer, { initialState } from "./ShopReducer";
import { collection, getDocs, query, where } from "firebase/firestore";
import db, { auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const ContextProvider = createContext(initialState);

export const AetherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shopReducer, initialState);
  const setUser = (payload) =>
    dispatch({ type: "SET_USER", payload: { user: payload } });

  useEffect(() => {
    fetchUser();
  });

  const fetchUser = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setUser(data);
    } catch (err) {
      console.error(err);
    }
  };

  const value = {
    user: state.user,
    message: state.message,
  };

  return (
    <ContextProvider.Provider value={{ setUser, value }}>
      {children}
    </ContextProvider.Provider>
  );
};

const useProvider = () => {
  const context = useContext(ShopContext);

  if (context === undefined) {
    throw new Error("useShop must be used within ShopContext");
  }

  return context;
};

export default useProvider;
