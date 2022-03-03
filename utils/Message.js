import { createContext, useReducer } from "react";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";

const userCollection = collection(db, 'users');

export const Store = createContext();
const initialState = {
    users: [],
};

async function reducer(state, action) {
    switch (action.type) {
        case 'CREATE_USER':
            return {
                
            }
    }
}

export function MessageProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <MessageProvider value={value}>{children}</MessageProvider>
}