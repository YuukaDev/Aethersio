import { createContext, useReducer, useContext, useEffect } from "react";
import shopReducer, { initialState } from "./ShopReducer";
import { collection, getDocs, query, where } from "firebase/firestore";
import db, { auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const ContextProvider = createContext(initialState);
const DispatchContext = createContext();

export const AetherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shopReducer, initialState);
  const [user] = useAuthState(auth);
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
    <DispatchContext.Provider value={{ setUser }}>
      <ContextProvider.Provider value={value}>
        {children}
      </ContextProvider.Provider>
    </DispatchContext.Provider>
  );
};

const useProvider = () => {
  const context = useContext(ContextProvider);

  if (context === undefined) {
    throw new Error("useShop must be used within ShopContext");
  }

  return context;
};

export default useProvider;
export const useDispatch = () => useContext(DispatchContext);
